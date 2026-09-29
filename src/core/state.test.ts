import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../config';
import { mixOf, parentsOf } from './biomes';
import { createInitialState } from './state';
import { makeTestState } from './testing';

describe('state', () => {
  it('createInitialState: 280 hexes, ids match indices, starting stock, no core awarded', () => {
    const s = createInitialState(42, DEFAULT_CONFIG, 1000);
    expect(s.hexes.length).toBe(280);
    expect(s.cols * s.rows).toBe(280);
    s.hexes.forEach((h, i) => expect(h.id).toBe(i));
    expect(s.resources).toEqual(DEFAULT_CONFIG.startingResources);
    expect(s.resources).not.toBe(DEFAULT_CONFIG.startingResources);
    expect(s.coreStack).toEqual([]);
    expect(s.pendingOffer).toBeNull();
    expect(s.status).toBe('playing');
    expect(s.runStartMs).toBe(1000);
  });

  it('same seed → deep-equal state; different seed → different offer stream', () => {
    expect(createInitialState(42, DEFAULT_CONFIG, 0)).toEqual(createInitialState(42, DEFAULT_CONFIG, 0));
    expect(createInitialState(42, DEFAULT_CONFIG, 0).offerRng).not.toEqual(createInitialState(43, DEFAULT_CONFIG, 0).offerRng);
  });

  it('makeTestState builds a custom board', () => {
    const s = makeTestState({
      cols: 5, rows: 4,
      hex: (c, r) => (c === 2 && r === 1 ? { terrain: 'mountain' } : c === 0 ? { biome: 'forest', elevation: 2 } : {}),
    });
    expect(s.hexes.length).toBe(20);
    expect(s.config.map.cols).toBe(5);
    const m = s.hexes[1 * 5 + 2];
    expect(m.terrain).toBe('mountain');
    expect(m.placeable).toBe(false);
    expect(m.elevation).toBe(s.config.map.levels - 1);
    expect(s.hexes[5].biome).toBe('forest');
    expect(s.hexes[5].elevation).toBe(2);
    expect(s.hexes[1].placeable).toBe(true);
    expect(s.hexes[1].biome).toBeNull();
  });
});

describe('biomes', () => {
  it('mixOf / parentsOf', () => {
    expect(mixOf('forest', 'desert')).toBe('steppe');
    expect(mixOf('desert', 'forest')).toBe('steppe');
    expect(mixOf('arctic', 'forest')).toBe('taiga');
    expect(mixOf('arctic', 'desert')).toBe('polarDesert');
    expect(mixOf('arctic', 'arctic')).toBeNull();
    for (const m of ['steppe', 'taiga', 'polarDesert'] as const) {
      const [a, b] = parentsOf(m);
      expect(mixOf(a, b)).toBe(m);
    }
  });
});
