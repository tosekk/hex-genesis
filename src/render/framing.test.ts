import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../config';
import { makeTestState } from '../core/testing';
import { hexToWorld } from '../core/hex';
import { boardBounds, boundedPan, framingFor, START_DIRECTION } from './framing';
import { sandboxConfig } from './sandboxConfig';
import { createPickSurface } from './picking';
import { disposeGroup } from './instances';

describe('variable-size boards', () => {
  it.each([[20, 14], [26, 18], [30, 20], [25, 17]])('fits %i × %i corners and elevated peaks in landscape and narrow views', (cols, rows) => {
    const state = makeTestState({ cols, rows, hex: () => ({ terrain: 'mountain', elevation: 4 }) });
    const bounds = boardBounds(state.hexes);
    for (const aspect of [16 / 9, 0.6]) {
      const frame = framingFor(bounds, aspect), camera = new THREE.PerspectiveCamera(42, aspect, 0.1, frame.maxDistance * 3);
      const target = new THREE.Vector3((bounds.minX + bounds.maxX) / 2, bounds.maxY / 2, (bounds.minZ + bounds.maxZ) / 2);
      camera.position.copy(target).add(START_DIRECTION.clone().multiplyScalar(frame.distance)); camera.lookAt(target); camera.updateMatrixWorld(true);
      for (const x of [bounds.minX, bounds.maxX]) for (const y of [0, bounds.maxY]) for (const z of [bounds.minZ, bounds.maxZ]) {
        const point = new THREE.Vector3(x, y, z).project(camera);
        expect(Math.abs(point.x)).toBeLessThan(1); expect(Math.abs(point.y)).toBeLessThan(1);
      }
      expect(frame.minDistance).toBeLessThan(frame.distance); expect(frame.maxDistance).toBeGreaterThan(frame.distance);
    }
    const group = new THREE.Group(), surface = createPickSurface(group, state.hexes); group.updateMatrixWorld(true);
    for (const id of [0, cols - 1, (rows - 1) * cols, cols * rows - 1]) {
      const hex = state.hexes[id], p = hexToWorld(hex.col, hex.row, 1);
      const ray = new THREE.Raycaster(new THREE.Vector3(p.x, 10, p.z + 0.98), new THREE.Vector3(0, -1, 0));
      expect(ray.intersectObject(surface)[0]?.instanceId).toBe(id);
    }
    disposeGroup(group);
  });
  it('bounds panning by board size and leaves an in-bounds target intact', () => {
    const small = boardBounds(makeTestState({ cols: 20, rows: 14 }).hexes), large = boardBounds(makeTestState({ cols: 30, rows: 20 }).hexes);
    expect(boundedPan({ x: 5, z: 6 }, small)).toEqual({ x: 5, z: 6 });
    expect(boundedPan({ x: 1e6, z: 1e6 }, large).x).toBeGreaterThan(boundedPan({ x: 1e6, z: 1e6 }, small).x);
    expect(boundedPan({ x: -1e6, z: -1e6 }, large).z).toBeLessThan(boundedPan({ x: -1e6, z: -1e6 }, small).z);
  });
  it('applies bounded sandbox overrides without mutating the production config', () => {
    const before = structuredClone(DEFAULT_CONFIG);
    expect(sandboxConfig(DEFAULT_CONFIG, new URLSearchParams('cols=30&rows=20')).map).toMatchObject({ cols: 30, rows: 20 });
    expect(sandboxConfig(DEFAULT_CONFIG, new URLSearchParams('cols=bad&rows=-2')).map).toMatchObject({ cols: 20, rows: 14 });
    expect(sandboxConfig(DEFAULT_CONFIG, new URLSearchParams('cols=999&rows=1')).map).toMatchObject({ cols: 60, rows: 2 });
    expect(DEFAULT_CONFIG).toEqual(before);
  });
});
