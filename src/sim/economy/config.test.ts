import { describe, expect, it } from 'vitest';
import { ECONOMY } from '../../config/economy';
import { parentsOf } from '../../core/biomes';
import { canAfford } from '../../core/resources';
import { MAIN_BIOMES, MIXED_BIOMES } from '../../core/types';
import type { Resources } from '../../core/types';
import v2 from './__fixtures__/economy-v2.json';

describe('C0b approved economy data integrity (§22, §45, ECONOMY_SPEC v2)', () => {
  it('starting stock affords the cheapest building in every main biome', () => {
    for (const biome of MAIN_BIOMES) {
      const buildings = ECONOMY.rosters[biome].map(id => ECONOMY.buildings[id]);
      const total = (cost: Resources) => Object.values(cost).reduce((a, b) => a + b, 0);
      const cheapest = Math.min(...buildings.map(b => total(b.cost)));
      expect(buildings.filter(b => total(b.cost) === cheapest)
        .some(b => canAfford(ECONOMY.startingResources, b.cost)), biome).toBe(true);
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
  it('v2 pairs use different buildings and combo totals stay inside guardrails', () => {
    for (const combo of ECONOMY.combos) {
      const total = Object.values(combo.amount).reduce((sum, n) => sum + n, 0);
      if (combo.buildings.length === 2) {
        expect(combo.buildings[0]).not.toBe(combo.buildings[1]);
        expect(total).toBeGreaterThanOrEqual(4);
        expect(total).toBeLessThanOrEqual(7);
      } else {
        expect(total).toBeGreaterThanOrEqual(11);
        expect(total).toBeLessThanOrEqual(15);
      }
    }
  });
  it('has six thresholds with water first at T3 and food first at T4', () => {
    expect(ECONOMY.thresholds).toHaveLength(6);
    expect(ECONOMY.thresholds.findIndex(t => (t.water ?? 0) > 0)).toBe(2);
    expect(ECONOMY.thresholds.findIndex(t => (t.food ?? 0) > 0)).toBe(3);
  });
  it('preserves frozen v2 data and keeps base yields and adjacency inside tuning guardrails', () => {
    for (const key of ['resources', 'startingResources', 'rosters', 'terrainBonuses', 'zoneModifiers', 'demolishRefundRatio', 'reshufflesPerRun'] as const) {
      expect(ECONOMY[key], key).toEqual(v2[key]);
    }
    expect(Object.keys(ECONOMY.buildings)).toEqual(Object.keys(v2.buildings));
    for (const [id, original] of Object.entries(v2.buildings)) {
      const actual = ECONOMY.buildings[id];
      expect({ id: actual.id, name: actual.name, cost: actual.cost }).toEqual({ id, name: original.name, cost: original.cost });
      // Resources are sparse: a missing v2 yield is zero, so +1 is inside the per-resource guardrail.
      for (const resource of ECONOMY.resources) {
        const amount = (original.baseYield as Resources)[resource] ?? 0;
        const actualAmount = actual.baseYield[resource] ?? 0;
        expect(Number.isInteger(actualAmount)).toBe(true);
        expect(actualAmount).toBeGreaterThanOrEqual(0);
        expect(Math.abs(actualAmount - amount), `${id}/${resource}`).toBeLessThanOrEqual(1);
      }
    }
    expect(ECONOMY.combos.map(({ amount: _, ...recipe }) => recipe))
      .toEqual(v2.combos.map(({ amount: _, ...recipe }) => recipe));
    for (const resource of ECONOMY.resources) {
      expect(ECONOMY.adjacencyAmount[resource]).toBeGreaterThanOrEqual(1);
      expect(ECONOMY.adjacencyAmount[resource]).toBeLessThanOrEqual(3);
    }
  });

});
