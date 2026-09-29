import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { ECONOMY } from '../config/economy';
import { makeTestState } from '../core/testing';
import { BUILDING_MODELS, buildingModelFor, FALLBACK_MODEL } from './buildingModels';
import { Buildings } from './buildings';
import { disposeGroup } from './instances';

describe('economy v1 building models', () => {
  it('maps all 24 economy ids and gives every model a distinct geometry with a slot-sized footprint', () => {
    expect(Object.keys(BUILDING_MODELS).sort()).toEqual(Object.keys(ECONOMY.buildings).sort());
    expect(Object.keys(BUILDING_MODELS)).toHaveLength(24);
    const signatures = new Set<string>();
    for (const id of Object.keys(ECONOMY.buildings)) {
      const model = buildingModelFor(id); expect(model).not.toBe(FALLBACK_MODEL);
      const geometry = model.geometry(), points = geometry.getAttribute('position');
      expect(geometry.getAttribute('color').count).toBe(points.count);
      for (let i = 0; i < points.count; i++) {
        expect(Math.hypot(points.getX(i), points.getZ(i))).toBeLessThanOrEqual(0.231);
        expect(points.getY(i)).toBeGreaterThanOrEqual(-0.00001);
        expect(Number.isFinite(points.getY(i))).toBe(true);
      }
      signatures.add(JSON.stringify(Array.from(points.array))); geometry.dispose();
    }
    expect(signatures.size).toBe(24);
  });
  it('uses the home biome and safely falls back for unknown and prototype-like ids', () => {
    expect(buildingModelFor('sawmill').homeBiome).toBe('forest');
    expect(buildingModelFor('windmill').homeBiome).toBe('steppe');
    expect(buildingModelFor('hot_spring').homeBiome).toBe('taiga');
    expect(buildingModelFor('frost_kiln').homeBiome).toBe('polarDesert');
    for (const id of ['new-building', 'constructor', '__proto__']) expect(buildingModelFor(id)).toBe(FALLBACK_MODEL);
  });
  it('packs 840 occupied slots into 24 model batches and compacts demolition without losing moved instances', () => {
    const state = makeTestState({ hex: () => ({ biome: 'forest' }) }), ids = Object.keys(ECONOMY.buildings);
    const group = new THREE.Group(), visuals = new Buildings(group, state.hexes.length);
    for (const hex of state.hexes) {
      hex.slots.forEach((slot, index) => { slot.building = ids[(hex.id * 3 + index) % ids.length]; });
      visuals.refresh(hex, hex.col, hex.row);
    }
    const meshes = group.children.filter(child => child.name.startsWith('building:')) as THREE.InstancedMesh[];
    expect(meshes).toHaveLength(24); expect(meshes.reduce((n, mesh) => n + mesh.count, 0)).toBe(840);
    const lumber = meshes.find(mesh => mesh.name === 'building:lumber_camp')!;
    const movedBefore = new THREE.Matrix4(); lumber.getMatrixAt(lumber.count - 1, movedBefore);
    state.hexes[0].slots[0].building = null; visuals.refresh(state.hexes[0], 0, 0);
    const movedAfter = new THREE.Matrix4(); lumber.getMatrixAt(0, movedAfter);
    expect(movedAfter.elements).toEqual(movedBefore.elements);
    expect(meshes.reduce((n, mesh) => n + mesh.count, 0)).toBe(839);
    state.hexes[0].slots[0].building = 'quarry'; visuals.refresh(state.hexes[0], 0, 0);
    expect(meshes.reduce((n, mesh) => n + mesh.count, 0)).toBe(840);
    disposeGroup(group);
  });
});
