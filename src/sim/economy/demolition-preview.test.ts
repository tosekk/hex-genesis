import { describe, expect, it } from 'vitest';
import { addRes } from '../../core/resources';
import type { GameState, SlotIndex } from '../../core/types';
import { advanceThreshold, currentComboMatches, demolishBuilding, demolishRefund, previewPlacement } from './index';
import { build, economyState, fill } from './__fixtures__/economy';

function demolish(s: GameState, id: number, slot: SlotIndex) {
  const result = demolishBuilding(s, id, slot);
  if (!result.ok) throw new Error(result.reason);
  return result.value;
}

describe('C2 demolition and persistent history (§26, §31–§36)', () => {
  it('refunds half cost rounded up per resource without changing lifetime or config', () => {
    const s = economyState();
    build(s, 4, 0, 'sawmill');
    const stock = { ...s.resources }, lifetime = { ...s.lifetime };
    expect(demolishRefund(s, 'sawmill')).toEqual({ wood: 2, stone: 1 });
    expect(demolish(s, 4, 0)).toEqual({ building: 'sawmill', refund: { wood: 2, stone: 1 } });
    expect(s.resources).toEqual(addRes(stock, { wood: 2, stone: 1 }));
    expect(s.lifetime).toEqual(lifetime);
    expect(s.config.buildings.sawmill.cost).toEqual({ wood: 3, stone: 1 });
  });
  it('demolish/rebuild preserves all histories and never repays base, pairs, triple, or adjacency', () => {
    const s = economyState();
    fill(s, 5);
    fill(s, 4);
    const before = structuredClone(s);
    demolish(s, 4, 1);
    expect(currentComboMatches(s, 4)).toEqual([{ comboId: 'ss', pair: 1 }]);
    expect(s.hexes[4].everCompleted).toBe(true);
    expect(s.hexes[4].pairPaid).toEqual(before.hexes[4].pairPaid);
    expect(s.hexes[4].triplePaid).toEqual(before.hexes[4].triplePaid);
    expect(s.adjacencyPaid).toEqual(before.adjacencyPaid);
    expect(s.discoveredCombos).toEqual(before.discoveredCombos);
    expect(s.hexes[4].slots.map(v => v.yieldPaid)).toEqual([true, true, true]);
    expect(build(s, 4, 1, 'farm')).toEqual({ payouts: [], discovered: [], firstCompletion: false });
    expect(s.lifetime).toEqual(before.lifetime);
  });
  it('demolition removes ghost adjacency; rebuilding restores current eligibility only', () => {
    const s = economyState({}, 5, 5);
    build(s, 12, 0, 'sawmill');
    build(s, 12, 1, 'farm');
    demolish(s, 12, 1);
    expect(currentComboMatches(s, 12)).toEqual([]);
    expect(fill(s, 11).payouts.filter(p => p.kind === 'adjacency')).toEqual([]);
    const rebuilt = build(s, 12, 1, 'farm');
    expect(rebuilt.payouts).toEqual([]);
    expect(currentComboMatches(s, 12)).toEqual([{ comboId: 'sf', pair: 0 }]);
    expect(fill(s, 13).payouts.filter(p => p.kind === 'adjacency')).toMatchObject([{ neighborId: 12 }]);
    demolish(s, 13, 2);
    expect(build(s, 13, 2, 'sawmill').payouts).toEqual([]);
    // Completion of 12 may pay the still-unpaid 11↔12 edge, never paid 12↔13.
    expect(build(s, 12, 2, 'sawmill').payouts.filter(p => p.kind === 'adjacency')).toMatchObject([{ neighborId: 11 }]);
  });
  it('allows removal of a converted legacy building but rejects rebuilding outside the current roster', () => {
    const s = economyState();
    build(s, 4, 0, 'sawmill');
    s.hexes[4].biome = 'steppe';
    demolish(s, 4, 0);
    const preview = previewPlacement(s, 4, 0, 'sawmill');
    expect(preview.base).toEqual({});
    expect(build(s, 4, 0, 'quarry').payouts).toEqual([]);
  });
  it.each(['empty', 'locked', 'ended', 'missing', 'invalid slot'])('rejects %s demolition without mutation', reason => {
    const s = economyState();
    build(s, 4, 0, 'sawmill');
    let id = 4, slot: SlotIndex = 0;
    if (reason === 'empty') slot = 1;
    if (reason === 'locked') s.activeSpread = { result: { origin: 4, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: { 4: true } };
    if (reason === 'ended') s.status = 'won';
    if (reason === 'missing') id = 99;
    if (reason === 'invalid slot') slot = -1 as SlotIndex;
    const before = structuredClone(s);
    expect(demolishBuilding(s, id, slot).ok).toBe(false);
    expect(s).toEqual(before);
  });
});

describe('C2 projected placement (§32, §38)', () => {
  it('hides unknown recipes entirely, shows discovered payable ones, and never mutates state', () => {
    const s = economyState();
    build(s, 4, 0, 'sawmill');
    const before = structuredClone(s);
    const hidden = previewPlacement(s, 4, 1, 'farm');
    expect(hidden).toMatchObject({ cost: { wood: 2 }, affordable: true, slotAlreadyPaid: false, base: { wood: 3, stone: 1 }, combos: [] });
    expect(s).toEqual(before);
    s.discoveredCombos.push('sf');
    const known = structuredClone(s);
    expect(previewPlacement(s, 4, 1, 'farm').combos).toEqual([{ match: { comboId: 'sf', pair: 0 }, amount: { wood: 7, stone: 2 } }]);
    expect(s).toEqual(known);
  });
  it('matches actual base and discovered combo payouts, but excludes adjacency', () => {
    const s = economyState({ zoneModifiers: { forest: [{ buildings: 'any', delta: { wood: -1 } }] } });
    fill(s, 5);
    build(s, 4, 0, 'sawmill');
    build(s, 4, 1, 'farm');
    const before = structuredClone(s);
    const preview = previewPlacement(s, 4, 2, 'sawmill');
    expect(s).toEqual(before);
    const actual = build(s, 4, 2, 'sawmill');
    expect(preview.base).toEqual(actual.payouts[0].amount);
    expect(preview.baseBreakdown).toEqual(actual.payouts[0].breakdown);
    expect(preview.combos.map(c => c.amount)).toEqual(actual.payouts.filter(p => p.kind === 'pair' || p.kind === 'triple').map(p => p.amount));
    expect(preview.combos).toHaveLength(3);
    expect(actual.payouts.at(-1)?.kind).toBe('adjacency');
  });
  it('projects unaffordable placements without pretending they are affordable', () => {
    const s = economyState();
    s.resources = {};
    const before = structuredClone(s);
    const preview = previewPlacement(s, 4, 0, 'sawmill');
    expect(preview.affordable).toBe(false);
    expect(preview.base).toEqual({ wood: 5, stone: 2 });
    expect(s).toEqual(before);
  });
  it('does not preview consumed payouts and returned data cannot mutate config or history', () => {
    const s = economyState();
    fill(s, 4);
    demolish(s, 4, 2);
    const before = structuredClone(s);
    const preview = previewPlacement(s, 4, 2, 'sawmill');
    expect(preview.slotAlreadyPaid).toBe(true);
    expect(preview.base).toEqual({});
    expect(preview.combos).toEqual([]);
    preview.cost.wood = 999;
    preview.baseBreakdown.raw.wood = 999;
    expect(s).toEqual(before);
  });
});

describe('C2 lifetime thresholds (§39)', () => {
  it('checks after all placement payouts, never spending/refunds, and requires every resource', () => {
    const s = economyState({ thresholds: [{ wood: 42, stone: 12 }] });
    build(s, 4, 0, 'sawmill');
    build(s, 4, 1, 'farm');
    expect(advanceThreshold(s)).toBe(false);
    build(s, 4, 2, 'sawmill');
    expect(s.thresholdIndex).toBe(0);
    expect(s.lifetime).toEqual({ wood: 42, stone: 12 });
    expect(advanceThreshold(s)).toBe(true);
    expect(s.thresholdIndex).toBe(1);
    const earned = structuredClone(s.lifetime);
    demolish(s, 4, 2);
    build(s, 4, 2, 'sawmill');
    expect(s.lifetime).toEqual(earned);
    expect(advanceThreshold(s)).toBe(false);
  });
  it('treats missing resource totals as zero and never substitutes spendable stock', () => {
    const s = economyState();
    s.lifetime = { wood: 500 };
    expect(advanceThreshold(s)).toBe(false);
    s.lifetime.stone = 4;
    expect(advanceThreshold(s)).toBe(false);
    s.lifetime.stone = 5;
    expect(advanceThreshold(s)).toBe(true);
  });
  it('advances at most one per call and never awards or changes cores/offers itself', () => {
    const s = economyState();
    s.lifetime = { wood: 999, stone: 999 };
    s.coreStack = ['forest'];
    expect(advanceThreshold(s)).toBe(true);
    expect(s.thresholdIndex).toBe(1);
    expect(s.coreStack).toEqual(['forest']);
    expect(s.pendingOffer).toBe(null);
    expect(advanceThreshold(s)).toBe(true);
    expect(s.thresholdIndex).toBe(2);
    expect(advanceThreshold(s)).toBe(false);
  });
});
