import { describe, expect, it } from 'vitest';
import { makeTestState } from '../../../src/core/testing';
import type { GameConfig } from '../../../src/core/types';
import { auditState, replayWitness } from './audit';

const fixture: Partial<GameConfig> = {
  resources: ['wood'], startingResources: {},
  buildings: Object.fromEntries(['a', 'b', 'c'].map(id => [id, { id, name: id, cost: { wood: 2 }, baseYield: { wood: 1 } }])),
  rosters: { forest: ['a', 'b', 'c'], desert: [], arctic: [], steppe: [], taiga: [], polarDesert: [] },
  combos: [{ id: 'bc', name: 'BC', buildings: ['b', 'c'], amount: { wood: 3 } }],
  thresholds: [{ wood: 1000 }], terrainBonuses: [], zoneModifiers: {}, adjacencyAmount: {},
};
const state = (cols = 2, config = fixture) => makeTestState({ cols, rows: 1, config, resources: {}, hex: () => ({ biome: 'forest' }) });

describe('Night 2 constructive stuck-state audit', () => {
  it('replays multiple refunds funding an unpaid base and never mutates the captured state', () => {
    const s = state();
    s.hexes[0].slots[0] = { building: 'a', yieldPaid: true };
    s.hexes[0].slots[1] = { building: 'a', yieldPaid: true };
    const before = structuredClone(s), result = auditState(s);
    expect(result.classification).toBe('recoverable');
    expect(result.witness!.actions.filter(a => a.kind === 'demolish')).toHaveLength(2);
    expect(replayWitness(s, result.witness!).lifetime.wood).toBeGreaterThan(0);
    expect(s).toEqual(before);
  });
  it('finds a two-replacement first combo that a one-replacement detector misses', () => {
    const s = state();
    for (const h of s.hexes) { h.everCompleted = true; for (const slot of h.slots) { slot.building = 'a'; slot.yieldPaid = true; } }
    const result = auditState(s);
    expect(result.classification).toBe('recoverable');
    expect(result.witness!.kind).toBe('combo');
    expect(result.witness!.actions.filter(a => a.kind === 'build')).toHaveLength(2);
    expect(replayWitness(s, result.witness!).lifetime.wood).toBe(3);
    // Assert constructive evidence, not a permanent expectation that Opus's detector stays buggy.
    expect(result.falsePositive).toBe(result.detector);
  });
  it('audits a declared loss counterfactually, rather than trusting the status guard', () => {
    const s = state(); s.resources = { wood: 2 }; s.status = 'lost';
    const result = auditState(s);
    expect(result.falsePositive).toBe(true);
    expect(replayWitness(s, result.witness!).lifetime.wood).toBe(1);
    expect(s.status).toBe('lost');
  });
  it('certifies exhausted slots with no remaining recipes or adjacency even if the detector hits its cap', () => {
    const s = state(30, { ...fixture, combos: [] }); s.resources = { wood: 100 };
    for (const h of s.hexes) { h.everCompleted = true; for (const slot of h.slots) { slot.building = 'a'; slot.yieldPaid = true; } }
    const result = auditState(s);
    expect(result.classification).toBe('proven-dead');
    expect(result.falseNegative).toBe(!result.detector);
  });
  it('does not invent buildings, refunds or capacity on a core', () => {
    const s = state(1); s.cores = [0];
    s.hexes[0].slots[0] = { building: 'a', yieldPaid: false };
    s.resources = { wood: 100 };
    expect(auditState(s).classification).toBe('proven-dead');
  });
  it('handles a currently present unpaid pair triggered through a cheaper third slot', () => {
    const s = state(1); s.resources = { wood: 2 };
    for (const slot of s.hexes[0].slots) slot.yieldPaid = true;
    s.hexes[0].slots[0].building = 'b'; s.hexes[0].slots[1].building = 'c';
    const result = auditState(s);
    expect(result.classification).toBe('recoverable');
    expect(replayWitness(s, result.witness!).lifetime.wood).toBe(3);
  });
  it('preserves a paid neighboring combo when funding first-completion adjacency', () => {
    const s = state(2, { ...fixture, adjacencyAmount: { wood: 2 } }); s.resources = { wood: 2 };
    for (const h of s.hexes) {
      for (const slot of h.slots) slot.yieldPaid = true;
      h.pairPaid = [{ comboId: 'bc', amount: { wood: 3 } }, { comboId: 'bc', amount: { wood: 3 } }, { comboId: 'bc', amount: { wood: 3 } }];
    }
    s.hexes[0].slots[0].building = 'a'; s.hexes[0].slots[1].building = 'a';
    s.hexes[1].slots[0].building = 'b'; s.hexes[1].slots[1].building = 'c';
    const result = auditState(s);
    expect(result.witness?.kind).toBe('adjacency');
    expect(replayWitness(s, result.witness!).lifetime.wood).toBe(2);
  });
  it('returns unknown for unresolved adjacency or bounded search, never a false proof', () => {
    const s = state(2, { ...fixture, adjacencyAmount: { wood: 2 } });
    for (const h of s.hexes) { for (const slot of h.slots) slot.yieldPaid = true; h.pairPaid = [{ comboId: 'bc', amount: { wood: 3 } }, { comboId: 'bc', amount: { wood: 3 } }, { comboId: 'bc', amount: { wood: 3 } }]; }
    expect(auditState(s).classification).toBe('unknown');
    expect(auditState(state(), 0).classification).toBe('unknown');
  });
  it('keeps progression actions and refund arbitrage outside dead-state proofs', () => {
    const s = state(); s.pendingOffer = { options: ['forest', 'arctic'], reshuffled: false };
    expect(auditState(s).classification).toBe('progression');
    s.pendingOffer = null;
    const exotic = state(1, { ...fixture, demolishRefundRatio: 2 });
    expect(auditState(exotic).classification).toBe('unknown');
  });
});
