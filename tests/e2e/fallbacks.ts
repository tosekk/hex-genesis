// Minimal stand-ins for sim functions whose owners have not landed them yet (NOT_IMPLEMENTED stubs).
// Used ONLY by autoplay.fallback.test.ts so the bot and invariants run before every module is real.
// Once deepseek's offers/endgame land, `withFallback` always calls the real function.
import { err, ok } from '../../src/core/result';
import { rngFromState } from '../../src/core/rng';
import type { BiomeOffer, GameState, MainBiome, Result } from '../../src/core/types';
import { MAIN_BIOMES } from '../../src/core/types';
import { legalCoreSites } from '../../src/sim/spread/spread';

export const fallbackUsed = new Set<string>();

/** Calls `real`; if it throws NOT_IMPLEMENTED, calls `fake` instead and remembers that it did. */
export function withFallback<A extends unknown[], R>(name: string, real: (...a: A) => R, fake: (...a: A) => R): (...a: A) => R {
  return (...args: A) => {
    try {
      return real(...args);
    } catch (e) {
      if (!(e instanceof Error) || !e.message.includes('NOT_IMPLEMENTED')) throw e;
      fallbackUsed.add(name);
      return fake(...args);
    }
  };
}

function roll(state: GameState, distinct: boolean): [MainBiome, MainBiome] {
  const rng = rngFromState(state.offerRng);
  const a = MAIN_BIOMES[rng.nextInt(3)];
  let b = MAIN_BIOMES[rng.nextInt(3)];
  if (distinct && b === a) b = MAIN_BIOMES[(MAIN_BIOMES.indexOf(a) + 1) % 3];
  state.offerRng = rng.getState();
  return [a, b];
}

export const fakeOffers = {
  awardCore(state: GameState): BiomeOffer {
    if (state.pendingOffer) throw new Error('offer already pending');
    state.pendingOffer = { options: roll(state, state.offerHistory.length === 0), reshuffled: false };
    return state.pendingOffer;
  },
  reshuffleOffer(state: GameState): Result<BiomeOffer> {
    if (!state.pendingOffer) return err('no offer');
    if (state.reshufflesUsed >= state.config.reshufflesPerRun) return err('no reshuffles left');
    state.reshufflesUsed++;
    state.pendingOffer = { options: roll(state, state.offerHistory.length === 0), reshuffled: true };
    return ok(state.pendingOffer);
  },
  resolveOffer(state: GameState, index: 0 | 1): Result<MainBiome> {
    const o = state.pendingOffer;
    if (!o) return err('no offer');
    const biome = o.options[index];
    state.coreStack.push(biome);
    state.offerHistory.push([...o.options]);
    state.pendingOffer = null;
    return ok(biome);
  },
};

export const fakeEndgame = {
  checkWin(state: Readonly<GameState>): boolean {
    return legalCoreSites(state).length === 0 && state.activeSpread === null
      && state.hexes.every((h) => !h.placeable || h.biome === null || h.slots.every((s) => s.building !== null));
  },
  isProvablySoftLocked(_state: Readonly<GameState>): boolean {
    return false;
  },
};
