import { describe, expect, it } from 'vitest';
import { ECONOMY } from '../../config/economy';
import { parentsOf } from '../../core/biomes';
import { canAfford } from '../../core/resources';
import { MAIN_BIOMES, MIXED_BIOMES } from '../../core/types';
import type { Resources } from '../../core/types';

describe('C0b approved economy data integrity (§22, §45, ECONOMY_SPEC v1)', () => {
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
});
