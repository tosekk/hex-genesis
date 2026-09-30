import { describe, expect, it } from 'vitest';
import { createRng } from '../../src/core/rng';
import { makeTestState } from '../../src/core/testing';
import { PayoutScorer } from './bot';
import { assessV5 } from './report';
import type { RunReport } from './bot';

describe('v5 random policy and target definitions', () => {
  it('samples every eligible physical slot and affordable building uniformly with two seeded draws', () => {
    const state = makeTestState({ cols: 3, rows: 1, resources: { wood: 2 }, hex: () => ({ biome: 'forest' }), config: {
      buildings: { a: { id: 'a', name: 'A', cost: { wood: 1 }, baseYield: { wood: 1 } }, b: { id: 'b', name: 'B', cost: { wood: 2 }, baseYield: { wood: 2 } }, poor: { id: 'poor', name: 'Poor', cost: { stone: 1 }, baseYield: { stone: 1 } } },
      rosters: { forest: ['a', 'b', 'poor'], desert: [], arctic: [], taiga: [], steppe: [], polarDesert: [] }, combos: [], terrainBonuses: [], zoneModifiers: {},
    } });
    state.cores = [0]; state.hexes[1].slots[0].building = 'a';
    const before = structuredClone(state), scorer = new PayoutScorer(state);
    const eligible = [[1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    for (let seed = 1; seed <= 100; seed++) {
      const rng = createRng(seed), reference = createRng(seed);
      const slot = eligible[reference.nextInt(5)], building = ['a', 'b'][reference.nextInt(2)];
      expect(scorer.chooseRandom(rng)).toMatchObject({ hexId: slot[0], slot: slot[1], building });
      expect(rng.getState()).toEqual(reference.getState());
    }
    expect(state).toEqual(before);
    expect(scorer.choose('combo')?.hexId).not.toBe(0);
    state.resources = {};
    const rng = createRng(1), start = rng.getState();
    expect(scorer.chooseRandom(rng)).toBeNull(); expect(rng.getState()).toEqual(start);
  });
  it('counts unproven careless stalls but not action caps, requires both bots, and censors missed T4', () => {
    const run = (strategy: RunReport['strategy']): RunReport => ({ seed: 1, strategy, stop: strategy === 'combo' ? 'won' : 'stuck', outcome: strategy === 'combo' ? 'win' : 'stuck', placements: 100, actions: 100, cores: 1, winPlacements: strategy === 'combo' ? 100 : null, softLocks: 0, lifetime: {}, resources: {}, livingSlots: 150, mapSlots: 180, boardUse: 2 / 3, buildings: {}, legalSitesRemaining: 0, heldCores: 0, emptySlots: 50, openingStall: false, falseSoftLocks: 0,
      thresholds: Array.from({ length: 8 }, (_, i) => strategy !== 'combo' && i >= 3 ? null : ({ placements: (i + 1) * 10, fill: .5, boardUse: .5, lifetime: {}, stock: {}, biome: 'forest', maxCost: {} })) });
    const runs = [run('combo'), run('spam'), run('random')];
    expect(assessV5(runs).targets).toEqual([true, true, true, true, true, true]);
    expect(assessV5(runs).tension).toEqual({ spam: Infinity, random: Infinity });
    runs[2].stop = 'action-cap'; expect(assessV5(runs).targets[1]).toBe(false);
    runs[2].stop = 'stuck'; runs[2].thresholds[3] = { ...runs[0].thresholds[3]!, placements: 59 };
    expect(assessV5(runs).targets[2]).toBe(false);
    runs[2].thresholds[3]!.placements = 60; expect(assessV5(runs).targets[2]).toBe(true);
    expect(assessV5(runs.slice(0, 2)).targets[1]).toBe(false);
  });
});
