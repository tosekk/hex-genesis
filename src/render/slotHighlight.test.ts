import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { createHex } from '../core/state';
import { hexToWorld } from '../core/hex';
import { SLOT_ANCHORS, topHeight } from './layout';
import { disposeGroup } from './instances';
import { SlotHighlight, slotHighlightPose } from './slotHighlight';

describe('slot highlighter', () => {
  it('places all three anchors at the visible tile height on even/odd rows and elevated tiles', () => {
    for (const row of [2, 3]) for (const elevation of [0, 4]) for (const slot of [0, 1, 2] as const) {
      const hex = createHex(0, 5, row, elevation, 'plain', 0), p = hexToWorld(5, row, 1), anchor = SLOT_ANCHORS[slot];
      const pose = slotHighlightPose(hex, slot);
      expect(pose.x).toBeCloseTo(p.x + anchor.x); expect(pose.z).toBeCloseTo(p.z + anchor.z);
      expect(pose.y).toBeCloseTo(topHeight(elevation) + 0.06); expect(pose.angle).toBe(-Math.PI / 2);
    }
  });
  it('follows the reveal flip/lift, clears on null and rejects natural terrain without changing state', () => {
    const hex = createHex(0, 0, 0, 1, 'plain', 0), before = JSON.stringify(hex), parent = new THREE.Group();
    const ring = new SlotHighlight(parent); ring.set(hex, 0, Math.PI / 2, 0.1);
    const pose = slotHighlightPose(hex, 0, Math.PI / 2, 0.1);
    expect(ring.group.visible).toBe(true); expect(ring.group.position.y).toBeCloseTo(pose.y);
    expect(ring.group.rotation.x).toBeCloseTo(0); expect(JSON.stringify(hex)).toBe(before);
    ring.set(null, null); expect(ring.group.visible).toBe(false);
    ring.set(createHex(1, 1, 0, 4, 'mountain', 0), 1); expect(ring.group.visible).toBe(false);
    const material = (ring.group.children[1] as THREE.Mesh).material as THREE.MeshBasicMaterial;
    expect(material.color.getHex()).toBe(0xf5d547); expect(material.toneMapped).toBe(false);
    disposeGroup(parent);
  });
});
