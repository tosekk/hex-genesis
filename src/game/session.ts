// OWNER: sonnet — stub from O1, replace freely
import { DEFAULT_CONFIG } from '../config';
import type { GameSession, SessionEvent } from '../core/contracts';
import { createInitialState } from '../core/state';
import type { GameConfig, GameState } from '../core/types';

const ni = (fn: string): never => { throw new Error(`NOT_IMPLEMENTED: session.${fn} (owner: sonnet)`); };

export function createGameSession(opts?: { config?: GameConfig; now?: () => number }): GameSession {
  const config = opts?.config ?? DEFAULT_CONFIG;
  const now = opts?.now ?? (() => 0);
  const listeners = new Set<(e: SessionEvent) => void>();
  let state: GameState = createInitialState(0, config, now());
  return {
    get state() { return state; },
    newRun(seed) {
      state = createInitialState(seed, config, now());
      for (const l of listeners) l({ type: 'runStarted', seed });
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    chooseOffer: () => ni('chooseOffer'),
    reshuffleOffer: () => ni('reshuffleOffer'),
    placeCore: () => ni('placeCore'),
    placeBuilding: () => ni('placeBuilding'),
    demolish: () => ni('demolish'),
    preview: () => null,
    endRun() {},
    advance() {},
  };
}
