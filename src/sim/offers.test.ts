import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../config';
import { createRng, deriveSeed } from '../core/rng';
import { makeTestState } from '../core/testing';
import { MAIN_BIOMES } from '../core/types';
import type { MainBiome } from '../core/types';
import { awardCore, reshuffleOffer, resolveOffer } from './offers';
import { generateMap } from './world/mapgen';

function offerState(seed: number, reshufflesPerRun = DEFAULT_CONFIG.reshufflesPerRun) {
  const state = makeTestState({ cols: 1, rows: 1, config: { reshufflesPerRun } });
  state.offerRng = createRng(deriveSeed(seed, 'offers')).getState();
  return state;
}

function sequence(seed: number) {
  const state = offerState(seed);
  const offers = [];
  for (let i = 0; i < 30; i++) {
    awardCore(state);
    if (i === 3) expect(reshuffleOffer(state).ok).toBe(true);
    offers.push(structuredClone(state.pendingOffer));
    expect(resolveOffer(state, (i % 2) as 0 | 1).ok).toBe(true);
  }
  return { offers, history: state.offerHistory, stack: state.coreStack, rng: state.offerRng };
}

describe('D2 biome offers (§5, §9)', () => {
  it('replays identical offers and RNG state for the same seed and choices', () => {
    for (let seed = 1; seed <= 20; seed++) expect(sequence(seed)).toEqual(sequence(seed));
    expect(sequence(1).offers).not.toEqual(sequence(2).offers);
  });
  it('first offers and their reshuffles have two distinct main biomes for seeds 1–500', () => {
    for (let seed = 1; seed <= 500; seed++) {
      const s = offerState(seed);
      const offer = awardCore(s);
      expect(offer.reshuffled).toBe(false);
      expect(new Set(offer.options).size, `seed ${seed}`).toBe(2);
      expect(offer.options.every(b => MAIN_BIOMES.includes(b))).toBe(true);
      const rerolled = reshuffleOffer(s);
      expect(rerolled.ok).toBe(true);
      expect(new Set(s.pendingOffer!.options).size, `reshuffled seed ${seed}`).toBe(2);
      expect(s.pendingOffer!.reshuffled).toBe(true);
    }
  });
  it.each<MainBiome>(['forest', 'desert', 'arctic'])('prevents a third identical %s pair, including reshuffles, for seeds 1–500', biome => {
    for (let seed = 1; seed <= 500; seed++) {
      const s = offerState(seed);
      s.offerHistory = [[biome, biome], [biome, biome]];
      expect(awardCore(s).options.every(b => b === biome), `seed ${seed}`).toBe(false);
      expect(reshuffleOffer(s).ok).toBe(true);
      expect(s.pendingOffer!.options.every(b => b === biome), `reshuffled seed ${seed}`).toBe(false);
    }
  });
  it('later offers allow every same-biome pair even with no core placed yet', () => {
    const duplicates = new Set<MainBiome>();
    for (let seed = 1; seed <= 500; seed++) {
      const s = offerState(seed);
      s.offerHistory = [['forest', 'desert']];
      const { options } = awardCore(s);
      if (options[0] === options[1]) duplicates.add(options[0]);
    }
    expect([...duplicates].sort()).toEqual([...MAIN_BIOMES].sort());
  });
  it('a placed core makes an empty-history state a later offer', () => {
    let duplicates = 0;
    for (let seed = 1; seed <= 500; seed++) {
      const s = offerState(seed);
      s.cores = [0];
      const { options } = awardCore(s);
      if (options[0] === options[1]) duplicates++;
    }
    expect(duplicates).toBeGreaterThan(0);
  });
  it('different-biome pairs can repeat freely and do not invoke repeat protection', () => {
    let repeats = 0;
    for (let seed = 1; seed <= 500; seed++) {
      const once = offerState(seed), twice = offerState(seed);
      once.offerHistory = [['forest', 'desert']];
      twice.offerHistory = [['forest', 'desert'], ['forest', 'desert']];
      const offer = awardCore(once);
      expect(awardCore(twice)).toEqual(offer);
      expect(twice.offerRng).toEqual(once.offerRng);
      if (offer.options[0] === 'forest' && offer.options[1] === 'desert') repeats++;
    }
    expect(repeats).toBeGreaterThan(0);
  });
  it('a different intervening pair breaks the protection streak', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const baseline = offerState(seed), interrupted = offerState(seed);
      baseline.offerHistory = [['forest', 'forest']];
      interrupted.offerHistory = [['forest', 'forest'], ['forest', 'desert'], ['forest', 'forest']];
      expect(awardCore(interrupted)).toEqual(awardCore(baseline));
      expect(interrupted.offerRng).toEqual(baseline.offerRng);
    }
  });
  it('reshuffles only once per run, including across successive offers, without mutating on rejection', () => {
    const s = offerState(1);
    awardCore(s);
    expect(reshuffleOffer(s).ok).toBe(true);
    expect(s.reshufflesUsed).toBe(1);
    const before = structuredClone(s);
    expect(reshuffleOffer(s).ok).toBe(false);
    expect(s).toEqual(before);
    resolveOffer(s, 0);
    awardCore(s);
    expect(s.pendingOffer!.reshuffled).toBe(false);
    const next = structuredClone(s);
    expect(reshuffleOffer(s).ok).toBe(false);
    expect(s).toEqual(next);
  });
  it('records the final reshuffled pair, binds the selected core, and preserves existing stack entries', () => {
    const s = offerState(1);
    s.coreStack = ['arctic'];
    const initialRng = { ...s.offerRng };
    awardCore(s);
    expect(s.offerRng).not.toEqual(initialRng);
    expect(s.offerHistory).toEqual([]);
    expect(s.coreStack).toEqual(['arctic']);
    expect(reshuffleOffer(s).ok).toBe(true);
    const finalOffer = s.pendingOffer!;
    const pair: [MainBiome, MainBiome] = [...finalOffer.options];
    const beforeResolve = { ...s.offerRng };
    expect(resolveOffer(s, 1)).toEqual({ ok: true, value: pair[1] });
    expect(s.pendingOffer).toBe(null);
    expect(s.coreStack).toEqual(['arctic', pair[1]]);
    expect(s.offerHistory).toEqual([pair]);
    expect(s.offerRng).toEqual(beforeResolve);
    // Retaining a displayed offer must not allow later edits to historical pairs.
    finalOffer.options[0] = pair[0] === 'forest' ? 'arctic' : 'forest';
    expect(s.offerHistory).toEqual([pair]);
  });
  it('throws on award while an offer is pending without consuming RNG or changing state', () => {
    const s = offerState(1);
    awardCore(s);
    const before = structuredClone(s);
    expect(() => awardCore(s)).toThrow(/pending/i);
    expect(s).toEqual(before);
  });
  it('rejects reshuffle and resolution with no pending offer without mutation', () => {
    const s = offerState(1), before = structuredClone(s);
    expect(reshuffleOffer(s).ok).toBe(false);
    expect(resolveOffer(s, 0).ok).toBe(false);
    expect(s).toEqual(before);
  });
  it.each([-1, 2, 0.5, NaN])('rejects invalid option index %s before mutation', index => {
    const s = offerState(1);
    awardCore(s);
    const before = structuredClone(s);
    expect(resolveOffer(s, index as 0 | 1).ok).toBe(false);
    expect(s).toEqual(before);
  });
  it('respects a configured zero reshuffle allowance', () => {
    const s = offerState(1, 0);
    awardCore(s);
    const before = structuredClone(s);
    expect(reshuffleOffer(s).ok).toBe(false);
    expect(s).toEqual(before);
  });
  it('map generation and offers consume independent RNG streams', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const beforeMap = sequence(seed);
      const terrainSeed = deriveSeed(seed, 'terrain');
      const map = generateMap(terrainSeed, DEFAULT_CONFIG.map);
      const afterMap = sequence(seed);
      expect(afterMap).toEqual(beforeMap);
      expect(generateMap(terrainSeed, DEFAULT_CONFIG.map)).toEqual(map);
    }
  });
});
