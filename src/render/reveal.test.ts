import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { makeTestState } from '../core/testing';
import { Buildings } from './buildings';
import { buildingHash, sampleReveal } from './reveal';
import { disposeGroup } from './instances';

describe('visible reveal animation', () => {
  it('changes color at the midpoint and settles within the configured duration', () => {
    expect(sampleReveal(0, 350)).toEqual({ angle: 0, lift: 0, showTarget: false, finished: false });
    expect(sampleReveal(174, 350).showTarget).toBe(false);
    expect(sampleReveal(175, 350).showTarget).toBe(true);
    expect(Math.abs(sampleReveal(175, 350).angle)).toBeCloseTo(Math.PI / 2);
    expect(sampleReveal(350, 350).finished).toBe(true);
    expect(sampleReveal(500, 350).angle).toBe(0);
    expect(sampleReveal(10, 0).finished).toBe(true);
  });
  it('hashes identities consistently to unsigned integers', () => {
    expect(buildingHash('forest-hut')).toBe(buildingHash('forest-hut'));
    expect(buildingHash('forest-hut')).not.toBe(buildingHash('desert-hut'));
    expect(buildingHash('forest-hut')).toBeGreaterThanOrEqual(0);
  });
  it('retains building meshes and their transforms through biome conversion without touching state', () => {
    const state = makeTestState({ cols: 1, rows: 1, hex: () => ({ biome: 'forest' }) });
    state.hexes[0].slots[0].building = 'forest-hut';
    const parent = new THREE.Group(), visuals = new Buildings(parent, 1);
    const before = JSON.stringify(state);
    visuals.refresh(state.hexes[0], 0, 0);
    expect(JSON.stringify(state)).toBe(before);
    const meshes = parent.children.slice(0, 6) as THREE.InstancedMesh[];
    const transforms = meshes.map(mesh => Array.from(mesh.instanceMatrix.array));
    state.hexes[0].biome = 'polarDesert';
    visuals.refresh(state.hexes[0], 0, 0);
    expect(parent.children.slice(0, 6)).toEqual(meshes);
    expect(meshes.map(mesh => Array.from(mesh.instanceMatrix.array))).toEqual(transforms);
    state.hexes[0].slots[0].building = null;
    visuals.refresh(state.hexes[0], 0, 0);
    expect(Array.from(meshes[0].instanceMatrix.array)).not.toEqual(transforms[0]);
    disposeGroup(parent);
  });
});
