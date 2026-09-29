import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { makeTestState } from '../core/testing';
import { hexToWorld } from '../core/hex';
import { disposeGroup, Instances } from './instances';
import { createPickSurface } from './picking';
import { HEX_SIZE, topHeight } from './layout';

describe('board pick surface', () => {
  it('picks a corner gap missed by the inset visual tops, without drawing the pick mesh', () => {
    const state = makeTestState({ cols: 3, rows: 3 });
    const group = new THREE.Group();
    const visual = new Instances(group, new THREE.CylinderGeometry(0.95, 0.95, 0.05, 6), 0xffffff, state.hexes.length);
    for (const hex of state.hexes) {
      const p = hexToWorld(hex.col, hex.row, HEX_SIZE);
      visual.set(hex.id, p.x, topHeight(hex.elevation) - 0.025, p.z);
    }
    const surface = createPickSurface(group, state.hexes);
    group.updateMatrixWorld(true);
    const centre = hexToWorld(1, 1, HEX_SIZE);
    const ray = new THREE.Raycaster(new THREE.Vector3(centre.x, 10, centre.z + 0.98), new THREE.Vector3(0, -1, 0));
    expect(ray.intersectObject(visual.mesh)).toHaveLength(0);
    expect(ray.intersectObject(surface)[0]?.instanceId).toBe(4);
    expect(surface.visible).toBe(false);
    disposeGroup(group);
  });
  it('keeps off-board points unpicked and uses each tile elevation', () => {
    const state = makeTestState({ cols: 1, rows: 1, hex: () => ({ elevation: 4 }) });
    const group = new THREE.Group();
    const surface = createPickSurface(group, state.hexes); group.updateMatrixWorld(true);
    const ray = new THREE.Raycaster(new THREE.Vector3(0, 10, 0), new THREE.Vector3(0, -1, 0));
    const hit = ray.intersectObject(surface)[0];
    expect(hit.instanceId).toBe(0); expect(hit.point.y).toBeCloseTo(topHeight(4));
    ray.ray.origin.z = 1.01;
    expect(ray.intersectObject(surface)).toHaveLength(0);
    disposeGroup(group);
  });
});
