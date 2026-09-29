import { describe, expect, it } from 'vitest';
import { MAIN_BIOMES, MIXED_BIOMES } from '../core/types';
import { pickSlot, SLOT_ANCHORS, SLOT_PICK_RADIUS, topHeight } from './layout';
import { BIOME_COLORS, DEAD_COLOR, tileColor } from './palette';

describe('render helpers', () => {
  it('keeps three equidistant anchors inside the hex', () => {
    const distances = SLOT_ANCHORS.map(a => Math.hypot(a.x, a.z));
    for (const distance of distances) expect(distance).toBeCloseTo(0.39, 2);
    expect(new Set(SLOT_ANCHORS.map(a => `${a.x}:${a.z}`)).size).toBe(3);
  });
  it('resolves each slot and rejects the centre and space beyond the radius', () => {
    SLOT_ANCHORS.forEach((a, i) => expect(pickSlot(a.x, a.z)).toBe(i));
    expect(pickSlot(0, 0)).toBeNull();
    expect(pickSlot(0, -0.39 - SLOT_PICK_RADIUS - 0.001)).toBeNull();
    expect(pickSlot(0, -0.39 - SLOT_PICK_RADIUS)).toBe(0);
  });
  it('stacks one layer even at zero elevation', () => {
    expect(topHeight(0)).toBe(0.26);
    expect(topHeight(4)).toBe(1.3);
  });
  it('has a distinct color for every biome and dead land', () => {
    const colors = [...MAIN_BIOMES, ...MIXED_BIOMES].map(b => BIOME_COLORS[b]);
    expect(colors.every(Number.isInteger)).toBe(true);
    expect(new Set([...colors, DEAD_COLOR]).size).toBe(7);
    expect(tileColor(null)).toBe(DEAD_COLOR);
  });
});
