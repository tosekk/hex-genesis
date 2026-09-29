import { describe, expect, it } from 'vitest';
import { neighbors, pairKey } from '../../core/hex';
import { makeTestState } from '../../core/testing';
import type { SlotIndex } from '../../core/types';
import { canPlaceBuilding, currentComboMatches, placeBuilding, rosterFor } from './index';
import { build, economyState, fill, FIXTURE } from './__fixtures__/economy';

describe('C1 placement transaction (§19–§37)', () => {
  it('pays a new slot once, commits cost and lifetime, and does not advance thresholds', () => {
    const s = economyState();
    const out = build(s, 4, 0, 'sawmill');
    expect(out.payouts).toMatchObject([{ kind: 'base', slot: 0, amount: { wood: 5, stone: 2 } }]);
    expect(s.resources).toEqual({ wood: 102, stone: 101 });
    expect(s.lifetime).toEqual({ wood: 5, stone: 2 });
    expect(s.hexes[4].slots[0].yieldPaid).toBe(true);
    s.hexes[4].slots[0].building = null; // C1 isolates placement; actual demolition is tested in C2.
    expect(build(s, 4, 0, 'farm').payouts).toEqual([]);
    expect(s.thresholdIndex).toBe(0);
  });
  it('resolves all three pairs and triple atomically in contract order', () => {
    const s = economyState();
    build(s, 4, 0, 'sawmill');
    const second = build(s, 4, 1, 'farm');
    expect(second.payouts.map(p => p.kind)).toEqual(['base', 'pair']);
    const third = build(s, 4, 2, 'sawmill');
    expect(third.payouts.map(p => [p.kind, p.pair])).toEqual([
      ['base', undefined], ['pair', 1], ['pair', 2], ['triple', undefined],
    ]);
    expect(second.payouts[1].amount).toEqual(third.payouts[2].amount);
    expect(s.hexes[4].pairPaid.map(p => p?.comboId)).toEqual(['sf', 'ss', 'sf']);
    expect(s.hexes[4].triplePaid?.comboId).toBe('sfs');
    expect(s.lifetime).toEqual({ wood: 42, stone: 12 });
    expect(s.thresholdIndex).toBe(0);
    expect(third.discovered).toEqual(['ss', 'sfs']);
    expect(s.discoveredCombos).toEqual(['sf', 'ss', 'sfs']);
  });
  it('discovers a different recipe on paid pairs and triple without repaying them', () => {
    const s = economyState();
    fill(s, 4);
    const history = structuredClone({ pair: s.hexes[4].pairPaid, triple: s.hexes[4].triplePaid });
    s.hexes[4].slots[0].building = null;
    expect(build(s, 4, 0, 'quarry').discovered).toEqual(['fq']);
    s.hexes[4].slots[2].building = null;
    const out = build(s, 4, 2, 'quarry');
    expect(out.discovered).toEqual(['qfq']);
    expect(out.payouts).toEqual([]);
    expect(out.firstCompletion).toBe(false);
    expect({ pair: s.hexes[4].pairPaid, triple: s.hexes[4].triplePaid }).toEqual(history);
  });
  it('first completion without neighbors pays no adjacency, later neighbor pays once', () => {
    const s = economyState();
    expect(fill(s, 4).payouts.filter(p => p.kind === 'adjacency')).toEqual([]);
    const out = fill(s, 5);
    expect(out.firstCompletion).toBe(true);
    expect(out.payouts.at(-1)).toMatchObject({ kind: 'adjacency', neighborId: 4 });
    expect(s.adjacencyPaid).toEqual({ [pairKey(4, 5)]: { wood: 2, stone: 1 } });
    s.hexes[4].slots[2].building = null;
    const refill = build(s, 4, 2, 'sawmill');
    expect(refill.firstCompletion).toBe(false);
    expect(refill.payouts).toEqual([]);
  });
  it('pays six unordered adjacencies in ascending neighbor order for partial current combos', () => {
    const s = economyState({}, 5, 5);
    const ns = neighbors(12, 5, 5);
    for (const id of ns) {
      // Valid current recipe, never paid on its own hex, only two buildings.
      s.hexes[id].slots[0].building = 'farm';
      s.hexes[id].slots[1].building = 'sawmill';
    }
    const out = fill(s, 12);
    expect(out.payouts.filter(p => p.kind === 'adjacency').map(p => p.neighborId)).toEqual(ns);
    expect(Object.keys(s.adjacencyPaid)).toHaveLength(6);
    expect(s.hexes[ns[0]].pairPaid).toEqual([null, null, null]);
    expect(out.payouts.at(-1)?.kind).toBe('adjacency');
  });
  it('counts a current combo even when its pair historically paid a different recipe', () => {
    const s = economyState();
    s.hexes[5].slots[0].building = 'farm';
    s.hexes[5].slots[1].building = 'quarry';
    s.hexes[5].pairPaid[0] = { comboId: 'sf', amount: { wood: 7 } };
    expect(fill(s, 4).payouts.at(-1)).toMatchObject({ kind: 'adjacency', neighborId: 5 });
  });
  it('applies only visible natural terrain and zone to base, never combo or adjacency', () => {
    const s = makeTestState({ cols: 3, rows: 3, config: {
      ...FIXTURE,
      terrainBonuses: [
        { adjacentTerrain: ['woods'], buildings: ['sawmill'], bonus: { wood: 10 } },
        { adjacentTerrain: ['mountain'], buildings: 'any', bonus: { stone: 3 } },
      ], zoneModifiers: { forest: [{ buildings: ['sawmill'], delta: { wood: -2 } }] },
    }, hex: (c, r) => r === 0 && c === 1 ? { terrain: 'woods' } : r === 0 && c === 2 ? { terrain: 'mountain' } : { biome: 'forest' } });
    s.hexes[5].slots[0].building = 'farm';
    s.hexes[5].slots[1].building = 'sawmill';
    expect(build(s, 4, 0, 'sawmill').payouts[0]).toMatchObject({
      amount: { wood: 3, stone: 5 }, breakdown: { raw: { wood: 5, stone: 2 }, terrain: { stone: 3 }, zone: { wood: -2 } },
    });
    build(s, 4, 1, 'farm');
    s.hexes[1].biome = 'forest';
    const out = build(s, 4, 2, 'sawmill');
    expect(out.payouts[0].amount).toEqual({ wood: 13, stone: 5 });
    expect(out.payouts.slice(1).map(p => p.amount)).toEqual([{ wood: 4 }, { wood: 7, stone: 2 }, { wood: 11, stone: 3 }, { wood: 2, stone: 1 }]);
  });
  it('clamps negative modified yields per resource, including resources absent from raw yield', () => {
    const s = economyState({ zoneModifiers: { forest: [{ buildings: 'any', delta: { wood: -100, stone: -100, extra: -1 } }] } });
    expect(build(s, 4, 0, 'quarry').payouts[0].amount).toEqual({ stone: 0, wood: 0, extra: 0 });
    expect(s.hexes[4].slots[0].yieldPaid).toBe(true);
  });
  it('uses the current biome roster and retains pre-existing converted buildings', () => {
    const s = economyState();
    build(s, 4, 0, 'sawmill');
    s.hexes[4].biome = 'steppe';
    expect(s.hexes[4].slots[0].building).toBe('sawmill');
    expect(rosterFor(s, 4)).toEqual(['farm', 'quarry']);
    expect(canPlaceBuilding(s, 4, 1, 'sawmill').ok).toBe(false);
    expect(build(s, 4, 1, 'farm').payouts.some(p => p.comboId === 'sf')).toBe(true);
  });
  it.each(['ended', 'missing hex', 'dead', 'natural', 'occupied', 'unknown building', 'wrong biome', 'poor', 'locked', 'invalid slot'])('rejects %s without mutation', reason => {
    const s = economyState();
    let id = 4, slot: SlotIndex = 0, building = 'sawmill';
    if (reason === 'ended') s.status = 'ended';
    if (reason === 'missing hex') id = 99;
    if (reason === 'dead') s.hexes[id].biome = null;
    if (reason === 'natural') s.hexes[id] = { ...s.hexes[id], terrain: 'woods', placeable: false };
    if (reason === 'occupied') s.hexes[id].slots[0].building = 'farm';
    if (reason === 'unknown building') building = 'unknown';
    if (reason === 'wrong biome') s.hexes[id].biome = 'desert';
    if (reason === 'poor') s.resources = {};
    if (reason === 'invalid slot') slot = 3 as SlotIndex;
    if (reason === 'locked') s.activeSpread = { result: { origin: 4, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: { 4: true } };
    const before = structuredClone(s);
    expect(placeBuilding(s, id, slot, building).ok).toBe(false);
    expect(s).toEqual(before);
  });
  it('keeps tiles outside a spread buildable and returns no roster/matches for missing or dead tiles', () => {
    const s = economyState();
    s.activeSpread = { result: { origin: 4, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: { 4: true } };
    expect(canPlaceBuilding(s, 5, 0, 'farm').ok).toBe(true);
    s.hexes[0].biome = null;
    expect(rosterFor(s, 0)).toEqual([]);
    expect(rosterFor(s, 99)).toEqual([]);
    expect(currentComboMatches(s, 99)).toEqual([]);
  });
});
