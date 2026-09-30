import * as THREE from 'three';
import type { Hex, SlotIndex } from '../core/types';
import { hexToWorld } from '../core/hex';
import { HEX_SIZE, SLOT_ANCHORS, topHeight } from './layout';

/** Same top-centre and X-axis reveal transform as the visible tile, never a future claim. */
export function slotHighlightPose(hex: Pick<Hex, 'col' | 'row' | 'elevation'>, slot: SlotIndex, angle = 0, lift = 0) {
  const p = hexToWorld(hex.col, hex.row, HEX_SIZE), anchor = SLOT_ANCHORS[slot], offset = 0.085;
  return { x: p.x + anchor.x, y: topHeight(hex.elevation) - 0.025 + lift + offset * Math.cos(angle) - anchor.z * Math.sin(angle),
    z: p.z + offset * Math.sin(angle) + anchor.z * Math.cos(angle), angle: angle - Math.PI / 2 };
}

export class SlotHighlight {
  readonly group = new THREE.Group();
  constructor(parent: THREE.Group) {
    const backing = new THREE.Mesh(new THREE.RingGeometry(0.235, 0.3, 32),
      new THREE.MeshBasicMaterial({ color: 0x2e2a25, side: THREE.DoubleSide, toneMapped: false }));
    const marker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.283, 32),
      new THREE.MeshBasicMaterial({ color: 0xf5d547, side: THREE.DoubleSide, toneMapped: false }));
    marker.position.z = 0.001; this.group.add(backing, marker); this.group.visible = false; parent.add(this.group);
  }
  set(hex: Hex | null, slot: SlotIndex | null, angle = 0, lift = 0): void {
    this.group.visible = hex !== null && hex.placeable && slot !== null;
    if (!this.group.visible || !hex || slot === null) return;
    const pose = slotHighlightPose(hex, slot, angle, lift);
    this.group.position.set(pose.x, pose.y, pose.z); this.group.rotation.x = pose.angle;
  }
}
