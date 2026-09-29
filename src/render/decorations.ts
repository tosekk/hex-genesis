import * as THREE from 'three';
import { WATER_TERRAIN, type GameState, type Hex, type HexId } from '../core/types';
import { hexToWorld, neighbors } from '../core/hex';
import { Instances } from './instances';
import { HEX_SIZE, topHeight } from './layout';

/** All placement variants come from immutable map decoration bits. Outside the slot triangle. */
export function decorationPoint(decoration: number): { x: number; z: number; scale: number } {
  const points = [{ x: 0, z: 0.69 }, { x: -0.598, z: -0.345 }, { x: 0.598, z: -0.345 }];
  return { ...points[(decoration >>> 0) % 3], scale: 0.8 + ((decoration >>> 8) % 4) * 0.1 };
}

export function waterfallNeighbors(state: Readonly<GameState>, id: HexId): HexId[] {
  const hex = state.hexes[id];
  if (!hex || hex.terrain !== 'riverbed' || hex.biome === null) return [];
  return neighbors(id, state.cols, state.rows).filter(next => WATER_TERRAIN.includes(state.hexes[next].terrain) && state.hexes[next].elevation < hex.elevation);
}

export class Decorations {
  private readonly rocks: Instances;
  private readonly stems: Instances;
  private readonly crowns: Instances;
  private readonly tufts: Instances;
  private readonly arms: Instances;
  private readonly falls: Instances;
  constructor(parent: THREE.Group, count: number) {
    this.rocks = new Instances(parent, new THREE.OctahedronGeometry(0.14), 0xffffff, count);
    this.stems = new Instances(parent, new THREE.CylinderGeometry(0.04, 0.055, 0.3, 5), 0xffffff, count);
    this.crowns = new Instances(parent, new THREE.ConeGeometry(0.16, 0.39, 5), 0xffffff, count);
    this.tufts = new Instances(parent, new THREE.ConeGeometry(0.13, 0.16, 5), 0xffffff, count);
    this.arms = new Instances(parent, new THREE.CylinderGeometry(0.034, 0.034, 0.17, 5), 0x76935b, count);
    this.falls = new Instances(parent, new THREE.BoxGeometry(0.28, 1, 0.035), 0x90cdd1, count * 6,
      { opacity: 0.78, roughness: 0.3, emissive: 0x18373b });
  }
  refresh(hex: Hex, x: number, z: number): void {
    const id = hex.id;
    this.rocks.hide(id); this.stems.hide(id); this.crowns.hide(id); this.tufts.hide(id); this.arms.hide(id);
    if (!hex.placeable) return;
    const p = decorationPoint(hex.decoration), y = topHeight(hex.elevation), s = p.scale;
    x += p.x; z += p.z;
    if (!hex.biome || hex.biome === 'arctic' || hex.biome === 'polarDesert') {
      this.rocks.set(id, x, y + 0.06 * s, z, s, s * 0.55, s, 0, hex.decoration % 6);
      this.rocks.color(id, !hex.biome ? 0x655c51 : hex.biome === 'arctic' ? 0xe0e5dc : 0xa7b6ad);
    } else if (hex.biome === 'forest' || hex.biome === 'taiga') {
      this.stems.set(id, x, y + 0.1 * s, z, s, s * 0.67, s); this.stems.color(id, 0x715740);
      this.crowns.set(id, x, y + 0.32 * s, z, s, s, s);
      this.crowns.color(id, hex.biome === 'forest' ? 0x376b44 : 0x63958c);
    } else if (hex.biome === 'desert') {
      this.stems.set(id, x, y + 0.15 * s, z, s * 1.4, s, s * 1.4); this.stems.color(id, 0x76935b);
      this.arms.set(id, x + 0.065 * s, y + 0.16 * s, z, s, s, s, 0, 0, Math.PI / 2);
    } else {
      this.tufts.set(id, x, y + 0.08 * s, z, s, s, s); this.tufts.color(id, 0x71854b);
    }
  }
  refreshFalls(state: Readonly<GameState>, id: HexId): void {
    for (let j = 0; j < 6; j++) this.falls.hide(id * 6 + j);
    const hex = state.hexes[id];
    const from = hexToWorld(hex.col, hex.row, HEX_SIZE);
    waterfallNeighbors(state, id).forEach((neighbor, index) => {
      const next = state.hexes[neighbor], to = hexToWorld(next.col, next.row, HEX_SIZE);
      const dx = to.x - from.x, dz = to.z - from.z, distance = Math.hypot(dx, dz);
      const upper = topHeight(hex.elevation) + 0.035, lower = topHeight(next.elevation) + 0.035;
      this.falls.set(id * 6 + index, from.x + dx / distance * 0.84, (upper + lower) / 2,
        from.z + dz / distance * 0.84, 1, upper - lower, 1, 0, Math.atan2(dx, dz));
    });
  }
}

export function addTable(parent: THREE.Group, width: number, depth: number, centreX: number, centreZ: number): void {
  const wood = new THREE.MeshStandardMaterial({ color: 0x4c3d32, roughness: 0.94 });
  const frame = new THREE.MeshStandardMaterial({ color: 0x8c7150, roughness: 0.72 });
  const tray = new THREE.Mesh(new THREE.BoxGeometry(width + 2.2, 0.3, depth + 2.2), wood);
  tray.position.set(centreX, -0.18, centreZ); parent.add(tray);
  const inset = new THREE.Mesh(new THREE.BoxGeometry(width + 1.4, 0.04, depth + 1.4),
    new THREE.MeshStandardMaterial({ color: 0x3b4a43, roughness: 1 }));
  inset.position.set(centreX, -0.015, centreZ); parent.add(inset);
  for (const sign of [-1, 1]) {
    const horizontal = new THREE.Mesh(new THREE.BoxGeometry(width + 2.2, 0.18, 0.28), frame);
    horizontal.position.set(centreX, -0.025, centreZ + sign * (depth + 1.9) / 2); parent.add(horizontal);
    const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, depth + 1.9), frame);
    vertical.position.set(centreX + sign * (width + 1.9) / 2, -0.025, centreZ); parent.add(vertical);
  }
  const table = new THREE.Mesh(new THREE.BoxGeometry(width + 22, 0.5, depth + 22),
    new THREE.MeshStandardMaterial({ color: 0x34342f, roughness: 0.95 }));
  table.position.set(centreX, -0.6, centreZ); parent.add(table);
}
