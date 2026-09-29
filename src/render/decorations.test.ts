import { describe, expect, it } from 'vitest';
import { makeTestState } from '../core/testing';
import { decorationPoint, waterfallNeighbors } from './decorations';
import { SLOT_ANCHORS } from './layout';

describe('terrain presentation', () => {
  it('uses stable decoration bits and keeps features clear of building anchors', () => {
    for (const bits of [0, 1, 2, 42, 0xffffffff]) {
      const p = decorationPoint(bits);
      expect(p).toEqual(decorationPoint(bits));
      for (const anchor of SLOT_ANCHORS) expect(Math.hypot(p.x - anchor.x, p.z - anchor.z)).toBeGreaterThan(0.4);
    }
  });
  it('shows waterfalls only after a riverbed is visibly restored and only downhill', () => {
    const state = makeTestState({ cols: 3, rows: 3,
      hex: (col, row) => col === 1 && row === 1 ? { terrain: 'riverbed', elevation: 2 } : { elevation: 1 } });
    expect(waterfallNeighbors(state, 4)).toEqual([]);
    state.hexes[4].biome = 'forest';
    expect(waterfallNeighbors(state, 4)).toEqual([1, 2, 3, 5, 7, 8]);
    const before = JSON.stringify(state);
    waterfallNeighbors(state, 4);
    expect(JSON.stringify(state)).toBe(before);
    const flat = makeTestState({ cols: 3, rows: 3, hex: () => ({ terrain: 'riverbed', elevation: 2, biome: 'forest' }) });
    expect(waterfallNeighbors(flat, 4)).toEqual([]);
  });
});
