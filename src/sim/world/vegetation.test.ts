import { describe, expect, it } from 'vitest';
import { MAP } from '../../config/map';
import { neighbors } from '../../core/hex';
import { generateMap } from './mapgen';

const noVegetation = { ...MAP, params: { ...MAP.params, woodsChance: 0, woodsMidBonus: 0, marshChance: 0, marshLowBonus: 0, marshWaterBonus: 0 } };

describe('D1 step 3 natural vegetation', () => {
  it('seeds 1–200 contain woods and marsh without altering relief, water or placeable hills', () => {
    let woods = 0, marsh = 0;
    for (let seed = 1; seed <= 200; seed++) {
      const board = generateMap(seed, MAP), bare = generateMap(seed, noVegetation);
      for (const h of board) {
        const prior = bare[h.id];
        expect(h.elevation).toBe(prior.elevation);
        if (prior.terrain !== 'plain') expect(h.terrain).toBe(prior.terrain);
        if (h.terrain === 'woods' || h.terrain === 'marsh') {
          expect(prior.terrain).toBe('plain');
          expect(h.placeable).toBe(false);
          expect(h.biome).toBe(null);
          if (h.terrain === 'woods') woods++;
          else marsh++;
        }
      }
    }
    expect(woods).toBeGreaterThan(0);
    expect(marsh).toBeGreaterThan(0);
  });
  it('woods favor mid elevations and marsh favors low ground by water across seeds 1–200', () => {
    const woods = { mid: 0, low: 0, midLand: 0, lowLand: 0 };
    const marsh = { wetLow: 0, other: 0, wetLowLand: 0, otherLand: 0 };
    for (let seed = 1; seed <= 200; seed++) {
      const board = generateMap(seed, MAP), bare = generateMap(seed, noVegetation);
      for (const h of bare.filter(h => h.terrain === 'plain')) {
        const actual = board[h.id].terrain;
        if (h.elevation > 0 && h.elevation < MAP.levels - 2) {
          woods.midLand++;
          if (actual === 'woods') woods.mid++;
        } else {
          woods.lowLand++;
          if (actual === 'woods') woods.low++;
        }
        const byWater = neighbors(h.id, MAP.cols, MAP.rows).some(n => bare[n].terrain === 'riverbed' || bare[n].terrain === 'basin');
        if (h.elevation <= 1 && byWater) {
          marsh.wetLowLand++;
          if (actual === 'marsh') marsh.wetLow++;
        } else {
          marsh.otherLand++;
          if (actual === 'marsh') marsh.other++;
        }
      }
    }
    expect(woods.midLand).toBeGreaterThan(0);
    expect(woods.lowLand).toBeGreaterThan(0);
    expect(woods.mid / woods.midLand).toBeGreaterThan(woods.low / woods.lowLand);
    expect(marsh.wetLow / marsh.wetLowLand).toBeGreaterThan(marsh.other / marsh.otherLand);
  });
});
