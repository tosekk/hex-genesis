import { describe, expect, it } from 'vitest';
import { MAP } from '../../config/map';
import { hexDistance, neighbors } from '../../core/hex';
import { generateMap } from './mapgen';
import { downhillWalk } from './water';

for (const [cols, rows] of [[26, 18], [30, 20]]) describe(`N4 ${cols}×${rows}, seeds 1–200`, () => {
  const config = { ...MAP, cols, rows };
  it('replays indexed maps with §6 hill approaches, downhill rivers, and natural terrain', () => {
    const seen = new Set<string>();
    const placeable: number[] = [];
    for (let seed = 1; seed <= 200; seed++) {
      const board = generateMap(seed, config);
      expect(generateMap(seed, config)).toEqual(board);
      expect(board).toHaveLength(cols * rows);
      const mountains = board.filter(h => h.terrain === 'mountain');
      const hills = board.filter(h => h.terrain === 'hill');
      expect(mountains.length).toBeGreaterThan(0);
      expect(hills.length).toBeGreaterThanOrEqual(Math.floor(board.length * .15));
      expect(hills.length).toBeLessThanOrEqual(Math.floor(board.length * .25));
      placeable.push(board.filter(h => h.placeable).length / board.length);
      const adjacent = (id: number) => neighbors(id, cols, rows).map(n => board[n]);
      const uphill = (id: number) => adjacent(id).filter(n => n.terrain === 'hill' && n.elevation === board[id].elevation + 1);
      for (const h of board) {
        seen.add(h.terrain);
        expect(h.id).toBe(h.row * cols + h.col);
        expect(h.biome).toBeNull();
        expect(h.placeable).toBe(h.terrain === 'hill' || h.terrain === 'plain');
        expect(Number.isInteger(h.elevation)).toBe(true);
        expect(h.elevation).toBeGreaterThanOrEqual(0);
        expect(h.elevation).toBeLessThan(config.levels);
        expect(h.terrain === 'mountain').toBe(h.elevation === config.levels - 1);
        if (h.terrain === 'basin') expect(adjacent(h.id).every(n => n.elevation >= h.elevation)).toBe(true);
        if (h.terrain === 'hill') {
          expect(Math.min(...mountains.map(m => hexDistance(h.id, m.id, cols)))).toBeLessThanOrEqual(3);
          let frontier = [h.id], reachesMountain = false;
          const visited = new Set(frontier);
          for (let depth = 0; depth < 3 && !reachesMountain; depth++) {
            const next: number[] = [];
            for (const id of frontier) for (const n of adjacent(id)) {
              if (n.terrain === 'mountain') reachesMountain = true;
              if (n.terrain === 'hill' && !visited.has(n.id)) { visited.add(n.id); next.push(n.id); }
            }
            frontier = next;
          }
          expect(reachesMountain, `seed ${seed}, hill ${h.id}`).toBe(true);
          expect(adjacent(h.id).some(n => n.elevation === h.elevation - 1 || (n.terrain === 'hill' && n.elevation === h.elevation))).toBe(true);
          for (const n of adjacent(h.id)) {
            if (n.elevation < h.elevation) expect(h.elevation - n.elevation).toBe(1);
            if (n.terrain !== 'hill' && n.terrain !== 'mountain') expect(n.elevation).toBeLessThan(h.elevation);
          }
          for (const second of uphill(h.id)) for (const third of uphill(second.id)) {
            expect(adjacent(third.id).some(n => n.terrain === 'mountain')).toBe(true);
            expect(uphill(third.id)).toHaveLength(0);
          }
        }
      }
      const elevations = board.map(h => h.elevation);
      for (const h of board.filter(h => h.terrain === 'riverbed')) {
        const route = downhillWalk(elevations, h.id, config);
        expect(new Set(route).size).toBe(route.length);
        for (let i = 1; i < route.length; i++) expect(elevations[route[i]]).toBeLessThanOrEqual(elevations[route[i - 1]]);
      }
    }
    // The design target is approximate, not a reason to reject/regenerate outlier seeds.
    expect(placeable.filter(p => p >= .65 && p <= .80).length).toBeGreaterThanOrEqual(180);
    const mean = placeable.reduce((a, b) => a + b, 0) / placeable.length;
    expect(mean).toBeGreaterThanOrEqual(.65);
    expect(mean).toBeLessThanOrEqual(.80);
    expect([...seen].sort()).toEqual(['basin', 'hill', 'marsh', 'mountain', 'plain', 'riverbed', 'woods']);
    console.info(`${cols}×${rows}: placeable mean ${(mean * 100).toFixed(2)}%, range ${(Math.min(...placeable) * 100).toFixed(2)}–${(Math.max(...placeable) * 100).toFixed(2)}%; ${placeable.filter(p => p >= .65 && p <= .8).length}/200 within 65–80%`);
  }, 20_000);
  it('generates every warmed-up map in under 40 ms', () => {
    for (let seed = 0; seed < 10; seed++) generateMap(seed, config);
    const timings = Array.from({ length: 200 }, (_, i) => {
      const start = performance.now();
      generateMap(i + 1, config);
      return performance.now() - start;
    });
    expect(Math.max(...timings)).toBeLessThan(40);
    console.info(`${cols}×${rows} timing: mean ${(timings.reduce((a, b) => a + b, 0) / 200).toFixed(3)} ms; max ${Math.max(...timings).toFixed(3)} ms`);
  });
});
