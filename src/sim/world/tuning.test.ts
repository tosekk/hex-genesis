import { describe, expect, it } from 'vitest';
import { MAP } from '../../config/map';
import { neighbors } from '../../core/hex';
import type { Hex } from '../../core/types';
import { generateMap } from './mapgen';
import { downhillWalk } from './water';

function mountainSizes(board: Hex[]): number[] {
  const visited = new Set<number>();
  const sizes: number[] = [];
  for (const h of board) {
    if (h.terrain !== 'mountain' || visited.has(h.id)) continue;
    const queue = [h.id];
    visited.add(h.id);
    for (let i = 0; i < queue.length; i++) {
      for (const n of neighbors(queue[i], MAP.cols, MAP.rows)) {
        if (board[n].terrain !== 'mountain' || visited.has(n)) continue;
        visited.add(n); queue.push(n);
      }
    }
    sizes.push(queue.length);
  }
  return sizes;
}

function statistics(seed: number) {
  const board = generateMap(seed, MAP);
  const count = (terrain: string) => board.filter(h => h.terrain === terrain).length;
  const elevations = board.map(h => h.elevation);
  return { seed, clusters: mountainSizes(board), placeable: board.filter(h => h.placeable).length,
    plain: count('plain'), hill: count('hill'), mountain: count('mountain'),
    riverbed: count('riverbed'), basin: count('basin'), woods: count('woods'), marsh: count('marsh'),
    longestRiver: Math.max(0, ...board.filter(h => h.terrain === 'riverbed').map(h => downhillWalk(elevations, h.id, MAP).length)) };
}

describe('D4 terrain variety and balance', () => {
  it('reports seeds 1–10 terrain, connected mountain sizes and longest downhill river', () => {
    console.info('D4 seed statistics:', JSON.stringify(Array.from({ length: 10 }, (_, i) => statistics(i + 1))));
  });
  it('varies connected clusters from 1–4 and their sizes from 3–10 across 200 seeds', () => {
    const counts = new Set<number>(), sizes = new Set<number>();
    for (let seed = 1; seed <= 200; seed++) {
      const clusters = mountainSizes(generateMap(seed, MAP));
      expect(clusters.length).toBeGreaterThanOrEqual(1);
      expect(clusters.length).toBeLessThanOrEqual(4);
      counts.add(clusters.length);
      for (const size of clusters) {
        expect(size, `seed ${seed}`).toBeGreaterThanOrEqual(3);
        expect(size, `seed ${seed}`).toBeLessThanOrEqual(10);
        sizes.add(size);
      }
    }
    expect([...counts].sort()).toEqual([1, 2, 3, 4]);
    expect([...sizes].sort((a, b) => a - b)).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it('keeps hills near 15–25%, typical land 65–80% placeable and permits rivers longer than five tiles', () => {
    const rows = Array.from({ length: 200 }, (_, i) => statistics(i + 1));
    for (const row of rows) {
      expect(row.hill / 280, `seed ${row.seed}`).toBeGreaterThanOrEqual(0.15);
      expect(row.hill / 280, `seed ${row.seed}`).toBeLessThanOrEqual(0.25);
    }
    console.info('D4 200-seed summary:', JSON.stringify({
      placeableMin: Math.min(...rows.map(r => r.placeable)),
      placeableMax: Math.max(...rows.map(r => r.placeable)),
      placeableMean: rows.reduce((sum, r) => sum + r.placeable, 0) / rows.length,
      hillsMin: Math.min(...rows.map(r => r.hill)),
      hillsMax: Math.max(...rows.map(r => r.hill)),
      hillsMean: rows.reduce((sum, r) => sum + r.hill, 0) / rows.length,
      inPlaceableRange: rows.filter(r => r.placeable >= 182 && r.placeable <= 224).length,
      longRivers: rows.filter(r => r.longestRiver > 5).length,
      maxRiver: Math.max(...rows.map(r => r.longestRiver)),
    }));
    const average = rows.reduce((n, row) => n + row.placeable, 0) / (rows.length * 280);
    expect(average).toBeGreaterThanOrEqual(0.65);
    expect(average).toBeLessThanOrEqual(0.8);
    expect(rows.filter(row => row.placeable >= 0.65 * 280 && row.placeable <= 0.8 * 280).length).toBeGreaterThanOrEqual(180);
    // Long rivers should recur across seeds, without forcing one onto every map.
    expect(rows.filter(row => row.longestRiver > 5).length).toBeGreaterThanOrEqual(50);
  });
});
