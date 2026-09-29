import { describe, expect, it } from 'vitest';
import { ECONOMY } from '../../config/economy';
import { parentsOf } from '../../core/biomes';
import { canAfford } from '../../core/resources';
import { MAIN_BIOMES, MIXED_BIOMES } from '../../core/types';

describe('C0 placeholder economy (§21, §22, §45, §53)', () => {
  it('uses only Wood and Stone and affords a building in every main biome', () => {
    expect(ECONOMY.resources).toEqual(['wood', 'stone']);
    for (const biome of MAIN_BIOMES) {
      const roster = ECONOMY.rosters[biome];
      expect(roster).toHaveLength(5);
      expect(roster.some(id => canAfford(ECONOMY.startingResources, ECONOMY.buildings[id].cost))).toBe(true);
    }
  });
  it('has three buildings from each parent and three unique mixed buildings', () => {
    for (const biome of MIXED_BIOMES) {
      const [a, b] = parentsOf(biome);
      const roster = ECONOMY.rosters[biome];
      expect(roster).toHaveLength(9);
      expect(new Set(roster).size).toBe(9);
      expect(roster.slice(0, 3)).toEqual(ECONOMY.rosters[a].slice(0, 3));
      expect(roster.slice(3, 6)).toEqual(ECONOMY.rosters[b].slice(0, 3));
      expect(roster.slice(6).every(id => id.startsWith(`${biome}_`))).toBe(true);
    }
  });
  it('labels all content and supplies viable yields, recipes, and spaced thresholds', () => {
    for (const building of Object.values(ECONOMY.buildings)) {
      expect(building.name).toContain('(placeholder)');
      expect(Object.values(building.baseYield).reduce((a, b) => a + b, 0))
        .toBeGreaterThanOrEqual(Object.values(building.cost).reduce((a, b) => a + b, 0));
    }
    for (const biome of [...MAIN_BIOMES, ...MIXED_BIOMES]) {
      const recipes = ECONOMY.combos.filter(c => c.id.startsWith(`${biome}_`));
      expect(recipes.filter(c => c.buildings.length === 2).length).toBeGreaterThanOrEqual(MAIN_BIOMES.includes(biome as typeof MAIN_BIOMES[number]) ? 2 : 1);
      expect(recipes.filter(c => c.buildings.length === 3)).toHaveLength(1);
      for (const combo of recipes) expect(combo.buildings.every(id => ECONOMY.rosters[biome].includes(id))).toBe(true);
    }
    expect(ECONOMY.thresholds.length).toBeGreaterThanOrEqual(8);
    expect(ECONOMY.thresholds.length).toBeLessThanOrEqual(12);
    // Conservative per-resource upper bound: base + 6 of each terrain rule +
    // all positive zone modifiers + 3 largest pairs + largest triple + 6 adjacencies.
    for (const resource of ECONOMY.resources) {
      const max = (values: number[]) => Math.max(0, ...values);
      const bound = max(Object.values(ECONOMY.buildings).map(b => b.baseYield[resource] ?? 0))
        + 6 * ECONOMY.terrainBonuses.reduce((n, b) => n + (b.bonus[resource] ?? 0), 0)
        + max(Object.values(ECONOMY.zoneModifiers).map(ms => ms.reduce((n, m) => n + Math.max(0, m.delta[resource] ?? 0), 0)))
        + 3 * max(ECONOMY.combos.filter(c => c.buildings.length === 2).map(c => c.amount[resource] ?? 0))
        + max(ECONOMY.combos.filter(c => c.buildings.length === 3).map(c => c.amount[resource] ?? 0))
        + 6 * (ECONOMY.adjacencyAmount[resource] ?? 0);
      let previous = 0;
      for (const threshold of ECONOMY.thresholds) {
        expect(threshold[resource] - previous).toBeGreaterThan(bound);
        previous = threshold[resource];
      }
    }
  });
});
