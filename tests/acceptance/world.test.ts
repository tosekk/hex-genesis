import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/config';
import { hexDistance, neighbors } from '../../src/core/hex';
import { makeTestState } from '../../src/core/testing';
import { finishSpread, startSpread } from '../../src/sim/spread/spread';
import { generateMap } from '../../src/sim/world/mapgen';

const maps = Array.from({ length: 50 }, (_, i) => ({ seed: i + 1, hexes: generateMap(i + 1, DEFAULT_CONFIG.map) }));
const { cols, rows, levels } = DEFAULT_CONFIG.map;

describe('C3 terrain acceptance: seeds 1–50 (owner astra, reassigned D1; opus review requested)', () => {
  it('T1: hills have a mountain within one to three flat hexes', () => {
    let hills = 0;
    for (const { seed, hexes } of maps) {
      const mountains = hexes.filter(h => h.terrain === 'mountain');
      for (const hill of hexes.filter(h => h.terrain === 'hill')) {
        hills++;
        const distance = Math.min(...mountains.map(m => hexDistance(hill.id, m.id, cols)));
        expect(distance, `seed ${seed}, hill ${hill.id}`).toBeGreaterThanOrEqual(1);
        expect(distance, `seed ${seed}, hill ${hill.id}`).toBeLessThanOrEqual(3);
      }
    }
    expect(hills, 'suite must exercise generated hills, not a flat-map stub').toBeGreaterThan(0);
  });
  it('T2: a three-hill ascending approach ends next to a mountain, not a fourth higher hill', () => {
    let hills = 0;
    for (const { seed, hexes } of maps) {
      for (const first of hexes.filter(h => h.terrain === 'hill')) {
        hills++;
        const uphill = (id: number) => neighbors(id, cols, rows).map(n => hexes[n])
          .filter(n => n.terrain === 'hill' && n.elevation === hexes[id].elevation + 1);
        // §6: follow an ascending approach, not arbitrary sideways walks through terraces.
        for (const second of uphill(first.id)) for (const third of uphill(second.id)) {
          const next = neighbors(third.id, cols, rows).map(id => hexes[id]);
          expect(next.some(h => h.terrain === 'mountain'), `seed ${seed}, route ${first.id}/${second.id}/${third.id}`).toBe(true);
          expect(uphill(third.id), `seed ${seed}, fourth ascending hill`).toHaveLength(0);
        }
      }
    }
    expect(hills, 'suite must exercise generated hills').toBeGreaterThan(0);
  });
  it('T3: hill approaches rise one level from lower neighbors; mountains use the highest level', () => {
    let hills = 0;
    for (const { seed, hexes } of maps) {
      for (const h of hexes) {
        expect(Number.isInteger(h.elevation)).toBe(true);
        expect(h.elevation).toBeGreaterThanOrEqual(0);
        expect(h.elevation).toBeLessThan(levels);
        if (h.terrain === 'mountain') expect(h.elevation).toBe(levels - 1);
        if (h.terrain !== 'hill') continue;
        hills++;
        const ns = neighbors(h.id, cols, rows).map(id => hexes[id]);
        expect(ns.some(n => n.elevation === h.elevation - 1 || (n.terrain === 'hill' && n.elevation === h.elevation)), `seed ${seed}, hill ${h.id} approach`).toBe(true);
        for (const lower of ns.filter(n => n.elevation < h.elevation)) {
          expect(h.elevation - lower.elevation, `seed ${seed}, hill ${h.id}, lower ${lower.id}`).toBe(1);
        }
      }
    }
    expect(hills, 'suite must exercise generated hills').toBeGreaterThan(0);
  });
  it('T4: natural terrain is unplaceable from generation and terraforming preserves terrain/placeability', () => {
    const seen = new Set<string>();
    for (const { seed, hexes } of maps) {
      expect(hexes).toHaveLength(cols * rows);
      for (const h of hexes) {
        seen.add(h.terrain);
        expect(h.biome).toBe(null);
        expect(h.placeable, `seed ${seed}, hex ${h.id}`).toBe(h.terrain === 'plain' || h.terrain === 'hill');
      }
      const state = makeTestState();
      state.hexes = structuredClone(hexes);
      state.coreStack = ['forest'];
      const site = state.hexes.find(h => h.placeable);
      expect(site, `seed ${seed} has placeable land`).toBeDefined();
      const before = state.hexes.map(h => [h.id, h.terrain, h.placeable, h.decoration, h.elevation]);
      expect(startSpread(state, site!.id, 0).ok).toBe(true);
      finishSpread(state);
      expect(state.hexes.map(h => [h.id, h.terrain, h.placeable, h.decoration, h.elevation])).toEqual(before);
    }
    for (const terrain of ['mountain', 'riverbed', 'basin', 'woods', 'marsh']) {
      expect(seen.has(terrain), `50-seed suite must exercise ${terrain}`).toBe(true);
    }
  });
  it('same seeds reproduce the generated board including decorations', () => {
    for (const { seed, hexes } of maps) expect(generateMap(seed, DEFAULT_CONFIG.map)).toEqual(hexes);
  });
});
