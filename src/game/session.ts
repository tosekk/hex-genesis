// OWNER: sonnet
import { DEFAULT_CONFIG } from '../config';
import type { GameSession, SessionEvent } from '../core/contracts';
import { err } from '../core/result';
import { createInitialState } from '../core/state';
import type { GameConfig, GameState, HexId, RunStats, RunStatus } from '../core/types';
import {
  advanceThreshold, canPlaceBuilding, demolishBuilding, placeBuilding, previewPlacement,
} from '../sim/economy';
import { checkWin, isProvablySoftLocked } from '../sim/endgame';
import { awardCore, reshuffleOffer, resolveOffer } from '../sim/offers';
import { finishSpread, isHexLocked, revealSpread, startSpread } from '../sim/spread/spread';

/** GameSession: the only place actions are sequenced (spread pacing, gating, end checks). */
export function createGameSession(opts?: { config?: GameConfig; now?: () => number }): GameSession {
  const config = opts?.config ?? DEFAULT_CONFIG;
  const now = opts?.now ?? (() => Date.now());
  const listeners = new Set<(e: SessionEvent) => void>();
  let state: GameState = createInitialState(0, config, now());
  /** Time since the active spread started. Drives reveal pacing only. */
  let spreadElapsedMs = 0;

  const emit = (e: SessionEvent): void => {
    for (const l of [...listeners]) l(e);
  };

  const stats = (): RunStats => ({
    status: state.status,
    lifetime: { ...state.lifetime },
    elapsedMs: (state.runEndMs ?? now()) - state.runStartMs,
    seed: state.seed,
  });

  const finishRun = (status: RunStatus): void => {
    state.status = status;
    state.runEndMs = now();
    state.pendingOffer = null;
    emit({ type: 'runEnded', status, stats: stats() });
  };

  /** §41: a win beats everything (even a just-awarded core with no legal site); then provable soft-lock. */
  const endCheck = (): void => {
    if (state.status !== 'playing') return;
    if (checkWin(state)) finishRun('won');
    else if (isProvablySoftLocked(state)) finishRun('lost');
  };

  const awardAndShow = (): void => {
    awardCore(state);
    emit({ type: 'coreAwarded' });
    if (state.pendingOffer) emit({ type: 'offerShown', offer: state.pendingOffer });
  };

  const notPlaying = () => (state.status !== 'playing' ? err<never>('The run is over.') : null);

  const blockedByOffer = () => (state.pendingOffer ? err<never>('Choose a biome offer first (§9).') : null);

  return {
    get state() { return state; },

    newRun(seed) {
      state = createInitialState(seed, config, now());
      spreadElapsedMs = 0;
      emit({ type: 'runStarted', seed });
      awardAndShow();
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },

    chooseOffer(index) {
      const g = notPlaying();
      if (g) return g;
      if (!state.pendingOffer) return err('No offer is pending.');
      const r = resolveOffer(state, index);
      if (!r.ok) return r;
      emit({ type: 'offerResolved', biome: r.value });
      endCheck();
      return r;
    },

    reshuffleOffer() {
      const g = notPlaying();
      if (g) return g;
      if (!state.pendingOffer) return err('No offer is pending.');
      const r = reshuffleOffer(state);
      if (!r.ok) return r;
      emit({ type: 'offerShown', offer: r.value });
      return r;
    },

    placeCore(hexId, stackIndex = 0) {
      const g = notPlaying() ?? blockedByOffer();
      if (g) return g;
      if (state.activeSpread) return err('A spread is still animating (§11).');
      if (state.coreStack.length === 0) return err('No core to place.');
      const r = startSpread(state, hexId, stackIndex);
      if (!r.ok) return r;
      spreadElapsedMs = 0;
      emit({ type: 'spreadStarted', result: r.value });
      return r;
    },

    placeBuilding(hexId, slot, building) {
      const g = notPlaying() ?? blockedByOffer();
      if (g) return g;
      if (isHexLocked(state, hexId)) return err('This tile is spreading (§11).');
      const r = placeBuilding(state, hexId, slot, building);
      if (!r.ok) return r;
      emit({ type: 'hexChanged', hexId });
      if (r.value.payouts.length > 0) emit({ type: 'payouts', events: r.value.payouts });
      if (r.value.discovered.length > 0) emit({ type: 'combosDiscovered', comboIds: r.value.discovered });
      emit({ type: 'resourcesChanged' });
      // §29: the transaction is complete; only now check the threshold.
      if (advanceThreshold(state)) awardAndShow();
      endCheck();
      return r;
    },

    demolish(hexId, slot) {
      const g = notPlaying() ?? blockedByOffer();
      if (g) return g;
      if (isHexLocked(state, hexId)) return err('This tile is spreading (§11).');
      const r = demolishBuilding(state, hexId, slot);
      if (!r.ok) return r;
      emit({ type: 'hexChanged', hexId });
      emit({ type: 'resourcesChanged' });
      endCheck();
      return r;
    },

    preview(hexId, slot, building) {
      if (state.status !== 'playing' || state.pendingOffer || isHexLocked(state, hexId)) return null;
      // Unaffordable is still previewable: probe with unlimited resources so only
      // non-cost failures (wrong roster, occupied, dead tile…) reject.
      const rich = Object.fromEntries(config.resources.map((r) => [r, 1e9]));
      if (!canPlaceBuilding({ ...state, resources: rich }, hexId, slot, building).ok) return null;
      return previewPlacement(state, hexId, slot, building);
    },

    endRun() {
      if (state.status !== 'playing') return;
      finishRun('ended');
    },

    advance(dtMs) {
      const active = state.activeSpread;
      if (!active || state.status !== 'playing') return;
      spreadElapsedMs += Math.max(0, dtMs);
      const n = active.result.claims.length;
      const w = Math.max(0, config.animation.spreadMaxMs - config.animation.tileFlipMs);
      const target = w === 0 || n <= 1
        ? n
        : Math.min(n, 1 + Math.floor((spreadElapsedMs * (n - 1)) / w));
      const delta = target - active.revealed;
      if (delta > 0) {
        const claims = revealSpread(state, delta);
        const ids: HexId[] = claims.map((c) => c.hexId);
        if (ids.length > 0) emit({ type: 'tilesRevealed', hexIds: ids });
      }
      // §11/§15: the spread stays locked until the last tile's flip has finished.
      if (active.revealed >= n && spreadElapsedMs >= config.animation.spreadMaxMs) {
        finishSpread(state);
        emit({ type: 'spreadFinished' });
        endCheck();
      }
    },
  };
}
