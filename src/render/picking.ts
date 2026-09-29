import * as THREE from 'three';
import type { Hex } from '../core/types';
import { hexToWorld } from '../core/hex';
import { Instances } from './instances';
import { HEX_SIZE, topHeight } from './layout';

/** Full pointy-top footprint, independent of visual insets and reveal flips. */
export function createPickSurface(parent: THREE.Group, hexes: readonly Hex[]): THREE.InstancedMesh {
  const geometry = new THREE.CircleGeometry(HEX_SIZE, 6).rotateZ(Math.PI / 6);
  const batch = new Instances(parent, geometry, 0xffffff, hexes.length);
  batch.mesh.visible = false; // Three's raycaster still intersects invisible meshes; no extra draw call.
  for (const hex of hexes) {
    const p = hexToWorld(hex.col, hex.row, HEX_SIZE);
    batch.set(hex.id, p.x, topHeight(hex.elevation), p.z, 1, 1, 1, -Math.PI / 2);
  }
  return batch.mesh;
}
