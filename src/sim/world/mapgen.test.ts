import { describe, expect, it } from 'vitest';
import { MAP } from '../../config/map';
import { hexDistance, neighbors } from '../../core/hex';
import type { Hex } from '../../core/types';
import { generateMap } from './mapgen';

const seeds = Array.from({ length: 200 }, (_, i) => i + 1);

function hillPath(hexes: Hex[], start: number, cols: number, rows: number): number {
  let frontier = [start];
  const visited = new Set(frontier);
  for (let depth = 1; depth <= 3; depth++) {
    const next: number[] = [];
    for (const id of frontier) for (const n of neighbors(id, cols, rows)) {
      if (hexes[n].terrain === 'mountain') return depth;
      if (hexes[n].terrain === 'hill' && !visited.has(n)) { visited.add(n); next.push(n); }
    }
    frontier = next.sort((a, b) => a - b);
  }
  return Infinity;
}

describe('D1 deterministic map generation, seeds 1–200', () => {
  it('replays all terrain and decoration for the same seed and varies with different seeds', () => {
    let prior: Hex[] | undefined;
    for (const seed of seeds) {
      const board = generateMap(seed, MAP);
      expect(generateMap(seed, MAP), `seed ${seed}`).toEqual(board);
      if (prior) expect(board).not.toEqual(prior);
      prior = board;
    }
  });
  it('creates 280 indexed, dead tiles with complete empty histories and integer elevations', () => {
    for (const seed of seeds) {
      const board = generateMap(seed, MAP);
      expect(board).toHaveLength(280);
      for (let id = 0; id < board.length; id++) {
        const h = board[id];
        expect(h).toMatchObject({ id, col: id % MAP.cols, row: Math.floor(id / MAP.cols), biome: null,
          slots: [{ building: null, yieldPaid: false }, { building: null, yieldPaid: false }, { building: null, yieldPaid: false }],
          everCompleted: false, pairPaid: [null, null, null], triplePaid: null });
        expect(Number.isInteger(h.elevation)).toBe(true);
        expect(h.elevation).toBeGreaterThanOrEqual(0);
        expect(h.elevation).toBeLessThan(MAP.levels);
        expect(h.terrain === 'mountain').toBe(h.elevation === MAP.levels - 1);
        expect(h.decoration >>> 0).toBe(h.decoration);
        expect(h.placeable).toBe(h.terrain === 'plain' || h.terrain === 'hill');
      }
    }
  });
  it('builds hill paths of at most three tiles, with supported one-level approaches', () => {
    for (const seed of seeds) {
      const board = generateMap(seed, MAP);
      const mountains = board.filter(h => h.terrain === 'mountain');
      const hills = board.filter(h => h.terrain === 'hill');
      expect(mountains.length, `seed ${seed}`).toBeGreaterThan(0);
      expect(hills.length, `seed ${seed}`).toBeGreaterThan(0);
      for (const h of hills) {
        expect(hillPath(board, h.id, MAP.cols, MAP.rows), `seed ${seed}, hill ${h.id}`).toBeLessThanOrEqual(3);
        expect(Math.min(...mountains.map(m => hexDistance(h.id, m.id, MAP.cols)))).toBeLessThanOrEqual(3);
        const ns = neighbors(h.id, MAP.cols, MAP.rows).map(n => board[n]);
        expect(ns.some(n => n.elevation === h.elevation - 1 || (n.terrain === 'hill' && n.elevation === h.elevation)), `seed ${seed}, hill ${h.id}`).toBe(true);
        for (const n of ns) {
          if (n.elevation < h.elevation) expect(h.elevation - n.elevation).toBe(1);
          if (n.terrain !== 'mountain' && n.terrain !== 'hill') expect(n.elevation).toBeLessThan(h.elevation);
        }
      }
    }
  });
  it('generates four-level maps with the same hill-path constraints', () => {
    const map = { ...MAP, levels: 4 };
    for (const seed of seeds) {
      const board = generateMap(seed, map);
      for (const h of board) {
        expect(h.elevation).toBeLessThan(4);
        if (h.terrain === 'hill') {
          expect(hillPath(board, h.id, map.cols, map.rows)).toBeLessThanOrEqual(3);
          const ns = neighbors(h.id, map.cols, map.rows).map(n => board[n]);
          expect(ns.some(n => n.elevation === h.elevation - 1 || (n.terrain === 'hill' && n.elevation === h.elevation))).toBe(true);
        }
      }
    }
  });
  it('generates each map in under 20 ms after warmup', () => {
    generateMap(0, MAP);
    const timings = seeds.map(seed => {
      const start = performance.now();
      generateMap(seed, MAP);
      return performance.now() - start;
    });
    expect(Math.max(...timings)).toBeLessThan(20);
  });
});
