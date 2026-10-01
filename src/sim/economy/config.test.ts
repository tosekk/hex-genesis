import { describe, expect, it } from 'vitest';
import { ECONOMY } from '../../config/economy';
import { parentsOf } from '../../core/biomes';
import { canAfford } from '../../core/resources';
import { MAIN_BIOMES, MIXED_BIOMES } from '../../core/types';
import type { Resources } from '../../core/types';
import v3 from './__fixtures__/economy-v3.json';

describe('C0b approved economy data integrity (§22, §45, ECONOMY_SPEC v5)', () => {
  it('R4: starting stock affords the cheapest building in every main biome', () => {
    for (const biome of MAIN_BIOMES) {
      const buildings = ECONOMY.rosters[biome].map(id => ECONOMY.buildings[id]);
      const total = (cost: Resources) => Object.values(cost).reduce((a, b) => a + b, 0);
      const cheapest = Math.min(...buildings.map(b => total(b.cost)));
      expect(buildings.filter(b => total(b.cost) === cheapest)
        .some(b => canAfford(ECONOMY.startingResources, b.cost)), biome).toBe(true);
    }
  });
  it('R1: water and food producers never charge their own output', () => {
    for (const building of Object.values(ECONOMY.buildings)) for (const resource of ['water', 'food']) {
      if ((building.baseYield[resource] ?? 0) > 0) expect(building.cost[resource], `${building.id}:${resource}`).toBeUndefined();
    }
  });
  it('R2: a cost in a produced resource never exceeds its raw yield', () => {
    for (const building of Object.values(ECONOMY.buildings)) for (const [resource, yieldAmount] of Object.entries(building.baseYield)) {
      if (yieldAmount > 0) expect(building.cost[resource] ?? 0, `${building.id}:${resource}`).toBeLessThanOrEqual(yieldAmount);
    }
  });
  it('R3: every building costs at least two total and has no zero cost entries', () => {
    for (const building of Object.values(ECONOMY.buildings)) {
      expect(Object.values(building.cost).reduce((a, b) => a + b, 0), building.id).toBeGreaterThanOrEqual(2);
      for (const value of Object.values(building.cost)) expect(value, building.id).toBeGreaterThanOrEqual(1);
    }
  });
  it('every building returns at least 75% of its total cost in raw base yield', () => {
    for (const building of Object.values(ECONOMY.buildings)) {
      const cost = Object.values(building.cost).reduce((a, b) => a + b, 0);
      const baseYield = Object.values(building.baseYield).reduce((a, b) => a + b, 0);
      expect(4 * baseYield, building.id).toBeGreaterThanOrEqual(3 * cost);
    }
  });
  it('main rosters have five; mixed have three from each parent plus three unique', () => {
    for (const biome of MAIN_BIOMES) expect(ECONOMY.rosters[biome]).toHaveLength(5);
    const mainIds = MAIN_BIOMES.flatMap(b => ECONOMY.rosters[b]);
    for (const biome of MIXED_BIOMES) {
      const [a, b] = parentsOf(biome);
      const roster = ECONOMY.rosters[biome];
      expect(roster).toHaveLength(9);
      expect(new Set(roster).size).toBe(9);
      expect(roster.filter(id => ECONOMY.rosters[a].includes(id))).toHaveLength(3);
      expect(roster.filter(id => ECONOMY.rosters[b].includes(id))).toHaveLength(3);
      const own = roster.filter(id => !mainIds.includes(id));
      expect(own).toHaveLength(3);
      for (const other of MIXED_BIOMES.filter(b => b !== biome)) {
        expect(own.some(id => ECONOMY.rosters[other].includes(id))).toBe(false);
      }
    }
  });
  it('all roster ids exist and every building is reachable in a roster', () => {
    const rosterIds = new Set(Object.values(ECONOMY.rosters).flat());
    expect([...rosterIds].sort()).toEqual(Object.keys(ECONOMY.buildings).sort());
    for (const [id, b] of Object.entries(ECONOMY.buildings)) expect(b.id).toBe(id);
  });
  it('all recipes have 2–3 known buildings that coexist in at least one roster', () => {
    const ids = ECONOMY.combos.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    const recipes = ECONOMY.combos.map(c => [...c.buildings].sort().join('|'));
    expect(new Set(recipes).size).toBe(recipes.length);
    for (const combo of ECONOMY.combos) {
      expect([2, 3]).toContain(combo.buildings.length);
      for (const id of combo.buildings) expect(ECONOMY.buildings[id], combo.id).toBeDefined();
      expect(Object.values(ECONOMY.rosters).some(roster => combo.buildings.every(id => roster.includes(id))), combo.id).toBe(true);
    }
  });
  it('terrain and zone modifiers refer only to known buildings', () => {
    const modifiers = [...ECONOMY.terrainBonuses, ...Object.values(ECONOMY.zoneModifiers).flat()];
    for (const modifier of modifiers) {
      if (modifier.buildings === 'any') continue;
      for (const id of modifier.buildings) expect(ECONOMY.buildings[id], id).toBeDefined();
    }
  });
  it('every resource key in all tables is declared', () => {
    const resources: Resources[] = [
      ECONOMY.startingResources, ECONOMY.adjacencyAmount, ...ECONOMY.thresholds,
      ...Object.values(ECONOMY.buildings).flatMap(b => [b.cost, b.baseYield]),
      ...ECONOMY.combos.map(c => c.amount), ...ECONOMY.terrainBonuses.map(b => b.bonus),
      ...Object.values(ECONOMY.zoneModifiers).flat().map(m => m.delta),
    ];
    for (const values of resources) for (const [resource, amount] of Object.entries(values)) {
      expect(ECONOMY.resources).toContain(resource);
      expect(Number.isFinite(amount)).toBe(true);
    }
  });
  it('thresholds never decrease per resource and each new threshold increases at least one target', () => {
    let previous: Resources = {};
    for (const threshold of ECONOMY.thresholds) {
      for (const resource of ECONOMY.resources) expect(threshold[resource] ?? 0).toBeGreaterThanOrEqual(previous[resource] ?? 0);
      expect(ECONOMY.resources.some(r => (threshold[r] ?? 0) > (previous[r] ?? 0))).toBe(true);
      previous = threshold;
    }
  });
  it('v5 pairs use different buildings and combo totals stay inside guardrails', () => {
    for (const combo of ECONOMY.combos) {
      const total = Object.values(combo.amount).reduce((sum, n) => sum + n, 0);
      if (combo.buildings.length === 2) {
        expect(combo.buildings[0]).not.toBe(combo.buildings[1]);
        expect(total).toBeGreaterThanOrEqual(3);
        expect(total).toBeLessThanOrEqual(12);
      } else {
        expect(total).toBeGreaterThanOrEqual(8);
        expect(total).toBeLessThanOrEqual(20);
      }
    }
  });
  it('has exactly eight non-decreasing thresholds, with the last as the win goal', () => {
    expect(ECONOMY.thresholds).toHaveLength(8);
    for (const threshold of ECONOMY.thresholds) for (const amount of Object.values(threshold)) {
      expect(Number.isInteger(amount)).toBe(true); expect(amount).toBeGreaterThanOrEqual(0);
    }
  });
  it('preserves v5 frozen identities/targets and respects all numeric guardrails', () => {
    for (const key of ['resources', 'rosters', 'demolishRefundRatio', 'reshufflesPerRun'] as const) expect(ECONOMY[key]).toEqual(v3[key]);
    expect(Object.keys(ECONOMY.buildings)).toEqual(Object.keys(v3.buildings));
    for (const [id, original] of Object.entries(v3.buildings)) {
      const actual = ECONOMY.buildings[id];
      expect({ id: actual.id, name: actual.name }).toEqual({ id, name: original.name });
      for (const cost of Object.values(actual.cost)) { expect(Number.isInteger(cost)).toBe(true); expect(cost).toBeGreaterThanOrEqual(1); expect(cost).toBeLessThanOrEqual(10); }
      const total = Object.values(actual.baseYield).reduce((a, b) => a + b, 0);
      expect(total).toBeGreaterThanOrEqual(1); expect(total).toBeLessThanOrEqual(8);
      for (const value of Object.values(actual.baseYield)) { expect(Number.isInteger(value)).toBe(true); expect(value).toBeGreaterThanOrEqual(0); }
    }
    for (const stock of Object.values(ECONOMY.startingResources)) { expect(Number.isInteger(stock)).toBe(true); expect(stock).toBeGreaterThanOrEqual(0); }
    expect(ECONOMY.combos.map(({ amount: _, ...recipe }) => recipe)).toEqual(v3.combos.map(({ amount: _, ...recipe }) => recipe));
    for (const resource of ECONOMY.resources) { expect(ECONOMY.adjacencyAmount[resource] ?? 0).toBeGreaterThanOrEqual(0); expect(ECONOMY.adjacencyAmount[resource] ?? 0).toBeLessThanOrEqual(4); }
    // V5 does not list terrain or zone modifiers among tunable values.
    expect(ECONOMY.terrainBonuses).toEqual(v3.terrainBonuses);
    expect(ECONOMY.zoneModifiers).toEqual(v3.zoneModifiers);
  });
});
