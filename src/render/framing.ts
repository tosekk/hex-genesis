import * as THREE from 'three';
import type { Hex } from '../core/types';
import { hexToWorld } from '../core/hex';
import { HEX_SIZE, topHeight } from './layout';

export interface BoardBounds { minX: number; maxX: number; minZ: number; maxZ: number; maxY: number; }
export const START_DIRECTION = new THREE.Vector3(0.35, 0.9, 0.95).normalize();
export function boardBounds(hexes: readonly Hex[]): BoardBounds {
  const bounds: BoardBounds = { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity, maxY: 0 };
  for (const hex of hexes) {
    const p = hexToWorld(hex.col, hex.row, HEX_SIZE);
    bounds.minX = Math.min(bounds.minX, p.x - Math.sqrt(3) / 2 * HEX_SIZE);
    bounds.maxX = Math.max(bounds.maxX, p.x + Math.sqrt(3) / 2 * HEX_SIZE);
    bounds.minZ = Math.min(bounds.minZ, p.z - HEX_SIZE); bounds.maxZ = Math.max(bounds.maxZ, p.z + HEX_SIZE);
    bounds.maxY = Math.max(bounds.maxY, topHeight(hex.elevation) + (hex.terrain === 'mountain' ? 1.15 : 0.6));
  }
  return hexes.length ? bounds : { minX: -1, maxX: 1, minZ: -1, maxZ: 1, maxY: 1 };
}

/** Fits all eight board/frame corners into the start view, including elevation. */
export function framingFor(bounds: BoardBounds, aspect: number, fovDegrees = 42): { distance: number; minDistance: number; maxDistance: number } {
  const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), START_DIRECTION).normalize();
  const up = new THREE.Vector3().crossVectors(START_DIRECTION, right).normalize();
  const centre = new THREE.Vector3((bounds.minX + bounds.maxX) / 2, bounds.maxY / 2, (bounds.minZ + bounds.maxZ) / 2);
  const tanV = Math.tan(THREE.MathUtils.degToRad(fovDegrees) / 2), tanH = tanV * Math.max(0.1, aspect);
  let distance = 0;
  for (const x of [bounds.minX - 1.2, bounds.maxX + 1.2]) for (const y of [0, bounds.maxY]) for (const z of [bounds.minZ - 1.2, bounds.maxZ + 1.2]) {
    const relative = new THREE.Vector3(x, y, z).sub(centre);
    distance = Math.max(distance, relative.dot(START_DIRECTION) + Math.max(Math.abs(relative.dot(right)) / tanH, Math.abs(relative.dot(up)) / tanV));
  }
  distance *= 1.08;
  const minDistance = Math.max(8, Math.hypot(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ) * 0.17);
  return { distance, minDistance, maxDistance: Math.max(minDistance * 2, distance * 1.8) };
}

export function boundedPan(target: { x: number; z: number }, bounds: BoardBounds): { x: number; z: number } {
  const marginX = (bounds.maxX - bounds.minX) * 0.15, marginZ = (bounds.maxZ - bounds.minZ) * 0.15;
  return { x: THREE.MathUtils.clamp(target.x, bounds.minX - marginX, bounds.maxX + marginX),
    z: THREE.MathUtils.clamp(target.z, bounds.minZ - marginZ, bounds.maxZ + marginZ) };
}
