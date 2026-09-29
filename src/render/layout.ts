import type { SlotIndex } from '../core/types';

export const HEX_SIZE = 1;
export const LAYER_HEIGHT = 0.26;
export const SLOT_PICK_RADIUS = 0.25;
/** Fixed triangle, in local X/Z; independent of biome, camera, and elevation. */
export const SLOT_ANCHORS = [
  { x: 0, z: -0.39 }, { x: -0.338, z: 0.195 }, { x: 0.338, z: 0.195 },
] as const;

export function topHeight(elevation: number): number { return (elevation + 1) * LAYER_HEIGHT; }
export function pickSlot(x: number, z: number, radius = SLOT_PICK_RADIUS): SlotIndex | null {
  let nearest: SlotIndex | null = null;
  let distance = radius * radius;
  SLOT_ANCHORS.forEach((anchor, index) => {
    const d = (x - anchor.x) ** 2 + (z - anchor.z) ** 2;
    if (d <= distance && (nearest === null || d < distance)) {
      nearest = index as SlotIndex;
      distance = d;
    }
  });
  return nearest;
}
