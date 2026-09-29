import * as THREE from 'three';
import type { Biome, BuildingId, Hex, HexId } from '../core/types';
import { Instances } from './instances';
import { SLOT_ANCHORS, topHeight } from './layout';
import { buildingHash } from './reveal';

function family(biome: Biome | null): number {
  if (biome === 'desert' || biome === 'polarDesert') return 1;
  if (biome === 'arctic' || biome === 'taiga') return 2;
  return 0;
}
export class Buildings {
  private readonly bodies: Instances[];
  private readonly roofs: Instances[];
  private readonly slots: Instances;
  private readonly placed = new Map<number, { id: BuildingId; family: number }>();
  constructor(parent: THREE.Group, count: number) {
    this.bodies = [
      new Instances(parent, new THREE.BoxGeometry(0.28, 0.25, 0.27), 0xffffff, count * 3),
      new Instances(parent, new THREE.CylinderGeometry(0.15, 0.18, 0.23, 6), 0xffffff, count * 3),
      new Instances(parent, new THREE.CylinderGeometry(0.17, 0.17, 0.24, 4), 0xffffff, count * 3),
    ];
    this.roofs = [
      new Instances(parent, new THREE.ConeGeometry(0.24, 0.18, 4), 0xffffff, count * 3),
      new Instances(parent, new THREE.ConeGeometry(0.19, 0.1, 6), 0xffffff, count * 3),
      new Instances(parent, new THREE.OctahedronGeometry(0.22), 0xffffff, count * 3),
    ];
    this.slots = new Instances(parent, new THREE.CylinderGeometry(0.19, 0.19, 0.015, 16), 0xc7c5a0, count * 3,
      { opacity: 0.32 });
  }
  refresh(hex: Hex, x: number, z: number): void {
    hex.slots.forEach((slot, index) => {
      const instance = hex.id * 3 + index;
      const anchor = SLOT_ANCHORS[index];
      if (hex.placeable && hex.biome) this.slots.set(instance, x + anchor.x, topHeight(hex.elevation) + 0.009, z + anchor.z);
      else this.slots.hide(instance);
      const previous = this.placed.get(instance);
      if (previous?.id === slot.building) return; // Keep the same instances through conversions.
      if (previous) { this.bodies[previous.family].hide(instance); this.roofs[previous.family].hide(instance); this.placed.delete(instance); }
      if (!slot.building) return;
      const shape = family(hex.biome), hash = buildingHash(slot.building);
      const color = new THREE.Color().setHSL((hash % 360) / 360, 0.28, 0.54).getHex();
      const roofColor = new THREE.Color(color).multiplyScalar(0.65).getHex();
      const scale = 0.9 + (hash % 3) * 0.07;
      const y = topHeight(hex.elevation);
      this.bodies[shape].set(instance, x + anchor.x, y + 0.13 * scale, z + anchor.z, scale, scale, scale,
        0, shape === 2 ? Math.PI / 4 : 0);
      this.roofs[shape].set(instance, x + anchor.x, y + 0.32 * scale, z + anchor.z, scale, shape === 2 ? scale * 0.6 : scale, scale,
        0, shape === 0 ? Math.PI / 4 : 0);
      this.bodies[shape].color(instance, color); this.roofs[shape].color(instance, roofColor);
      this.placed.set(instance, { id: slot.building, family: shape });
    });
  }
}

export class Cores {
  private readonly bases: Instances;
  private readonly crystals: Instances;
  constructor(parent: THREE.Group, private readonly count: number) {
    this.bases = new Instances(parent, new THREE.CylinderGeometry(0.17, 0.23, 0.12, 6), 0xeee2c3, count);
    this.crystals = new Instances(parent, new THREE.OctahedronGeometry(0.2), 0x9cf4de, count,
      { emissive: 0x54aa92 });
  }
  set(ids: HexId[], hexes: readonly Hex[], positions: ReadonlyMap<HexId, { x: number; z: number }>): void {
    for (let id = 0; id < this.count; id++) { this.bases.hide(id); this.crystals.hide(id); }
    for (const id of new Set(ids)) {
      const hex = hexes[id], p = positions.get(id);
      if (!hex || !p) continue;
      const y = topHeight(hex.elevation);
      this.bases.set(id, p.x, y + 0.06, p.z);
      this.crystals.set(id, p.x, y + 0.39, p.z, 1, 1.65, 1);
    }
  }
}
