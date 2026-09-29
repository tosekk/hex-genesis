import { describe, expect, it } from 'vitest';
import { MAP } from '../../config/map';
import { neighbors } from '../../core/hex';
import { generateMap } from './mapgen';
import { downhillWalk } from './water';

const map = { ...MAP, cols: 5, rows: 5 };
const edge = (id: number, cols: number, rows: number) => id % cols === 0 || id % cols === cols - 1 || id < cols || id >= cols * (rows - 1);

describe('D1 step 2 downhill water', () => {
  it('takes the lowest neighbor, breaks ties by ascending HexId, and stops at the edge', () => {
    const elevations = Array<number>(25).fill(4);
    elevations[6] = 3; elevations[7] = 3; elevations[1] = 2;
    expect(downhillWalk(elevations, 12, map)).toEqual([12, 6, 1]);
  });
  it('stops at local minima including flat plateaus, and never walks uphill or cycles', () => {
    expect(downhillWalk(Array<number>(25).fill(2), 12, map)).toEqual([12]);
    const elevations = Array<number>(25).fill(3);
    elevations[12] = 0;
    expect(downhillWalk(elevations, 12, map)).toEqual([12]);
    elevations[1] = 0;
    expect(downhillWalk(elevations, 0, map)).toEqual([0]);
  });
  it('crosses a draining plateau to a lower outlet without exceeding the configured lookahead', () => {
    const wide = { ...MAP, cols: 7, rows: 7 };
    const elevations = Array<number>(49).fill(4);
    for (let id = 22; id <= 25; id++) elevations[id] = 2;
    elevations[26] = 1; elevations[27] = 0;
    const route = downhillWalk(elevations, 22, wide);
    expect(route).toEqual([22, 23, 24, 25, 26, 27]);
    for (let i = 0; i < route.length; i++) {
      expect(downhillWalk(elevations, route[i], wide)).toEqual(route.slice(i));
    }
    expect(downhillWalk(elevations, 22, { ...wide, params: { ...wide.params, riverPlateauSteps: 1 } })).toEqual([22]);
    expect(downhillWalk(elevations, 22, { ...wide, params: { ...wide.params, riverPlateauSteps: 0 } })).toEqual([22]);
  });
  it('breaks equal-distance plateau outlet ties by ascending HexId', () => {
    const wide = { ...MAP, cols: 7, rows: 7 };
    const elevations = Array<number>(49).fill(4);
    for (let id = 22; id <= 26; id++) elevations[id] = 2;
    elevations[21] = 1; elevations[27] = 1;
    expect(downhillWalk(elevations, 24, wide)).toEqual([24, 23, 22, 21]);
  });
  it('seeds 1–200 have downhill river continuations and basins only at local minima', () => {
    let rivers = 0, basins = 0;
    for (let seed = 1; seed <= 200; seed++) {
      const board = generateMap(seed, MAP);
      for (const h of board) {
        const ns = neighbors(h.id, MAP.cols, MAP.rows).map(n => board[n]);
        if (h.terrain === 'basin') {
          basins++;
          expect(ns.every(n => n.elevation >= h.elevation), `seed ${seed}, basin ${h.id}`).toBe(true);
          expect(h.placeable).toBe(false);
        }
        if (h.terrain !== 'riverbed') continue;
        rivers++;
        expect(h.placeable).toBe(false);
        const route = downhillWalk(board.map(h => h.elevation), h.id, MAP);
        for (let i = 0; i < route.length; i++) {
          const tile = board[route[i]];
          expect(['riverbed', 'basin'], `seed ${seed}, river ${h.id}, route tile ${tile.id}`).toContain(tile.terrain);
          if (i > 0) expect(tile.elevation).toBeLessThanOrEqual(board[route[i - 1]].elevation);
        }
        const end = board[route.at(-1)!];
        expect(edge(end.id, MAP.cols, MAP.rows) || neighbors(end.id, MAP.cols, MAP.rows).every(n => board[n].elevation >= end.elevation)).toBe(true);
      }
    }
    expect(rivers).toBeGreaterThan(0);
    expect(basins).toBeGreaterThan(0);
  });
  it('water probability knobs can disable water without changing relief', () => {
    const dry = { ...MAP, params: { ...MAP.params, riverSourceChance: 0, basinChance: 0 } };
    const wet = generateMap(1, MAP), board = generateMap(1, dry);
    expect(board.some(h => h.terrain === 'riverbed' || h.terrain === 'basin')).toBe(false);
    expect(board.map(h => h.elevation)).toEqual(wet.map(h => h.elevation));
    expect(board.filter(h => h.terrain === 'hill' || h.terrain === 'mountain').map(h => [h.id, h.terrain]))
      .toEqual(wet.filter(h => h.terrain === 'hill' || h.terrain === 'mountain').map(h => [h.id, h.terrain]));
  });
});
