import * as THREE from 'three';
import type { Hex } from '../core/types';
import { Instances } from './instances';
import { topHeight } from './layout';
import { DEAD_TERRAIN_COLORS } from './palette';

export class NaturalTerrain {
  private readonly peak: Instances;
  private readonly channel: Instances;
  private readonly banks: Instances;
  private readonly branches: Instances;
  private readonly trunks: Instances;
  private readonly crowns: Instances;
  private readonly marsh: Instances;
  constructor(parent: THREE.Group, count: number) {
    this.peak = new Instances(parent, new THREE.ConeGeometry(0.72, 1.15, 5), DEAD_TERRAIN_COLORS.mountain, count, { castShadow: true });
    this.channel = new Instances(parent, new THREE.CylinderGeometry(0.68, 0.68, 0.025, 6), 0xffffff, count);
    this.banks = new Instances(parent, new THREE.BoxGeometry(0.035, 0.03, 0.85), 0xffffff, count * 12);
    this.branches = new Instances(parent, new THREE.BoxGeometry(0.42, 0.025, 0.88), 0xffffff, count * 6);
    this.trunks = new Instances(parent, new THREE.CylinderGeometry(0.06, 0.09, 0.3, 5), 0xffffff, count * 3);
    this.crowns = new Instances(parent, new THREE.ConeGeometry(0.25, 0.55, 5), 0xffffff, count * 3, { castShadow: true });
    this.marsh = new Instances(parent, new THREE.CylinderGeometry(0.73, 0.73, 0.025, 6), 0xffffff, count);
  }
  refresh(hex: Hex, x: number, z: number, directions: { x: number; z: number }[] = []): void {
    const id = hex.id;
    const y = topHeight(hex.elevation);
    this.peak.hide(id); this.channel.hide(id); this.marsh.hide(id);
    for (let j = 0; j < 6; j++) {
      this.branches.hide(id * 6 + j); this.banks.hide(id * 12 + j * 2); this.banks.hide(id * 12 + j * 2 + 1);
    }
    for (let j = 0; j < 3; j++) { this.trunks.hide(id * 3 + j); this.crowns.hide(id * 3 + j); }
    switch (hex.terrain) {
      case 'mountain': this.peak.set(id, x, y + 0.575, z); break;
      case 'riverbed':
      case 'basin': {
        const wet = hex.biome !== null;
        this.channel.set(id, x, y + 0.028, z, hex.terrain === 'riverbed' ? 0.45 : 1, 1, hex.terrain === 'riverbed' ? 0.45 : 1);
        this.channel.color(id, wet ? 0x69aeb6 : DEAD_TERRAIN_COLORS.channel);
        directions.forEach((direction, index) => {
          const angle = Math.atan2(direction.x, direction.z);
          this.branches.set(id * 6 + index, x + direction.x * 0.43, y + 0.022, z + direction.z * 0.43, 1, 1, 1, 0, angle);
          this.branches.color(id * 6 + index, wet ? 0x69aeb6 : DEAD_TERRAIN_COLORS.channel);
          if (hex.terrain === 'riverbed' && directions.length <= 2) for (const [bank, sign] of [-1, 1].entries()) {
            this.banks.set(id * 12 + index * 2 + bank, x + direction.x * 0.46 + direction.z * sign * 0.25,
              y + 0.05, z + direction.z * 0.46 - direction.x * sign * 0.25, 1, 1, 1, 0, angle);
            this.banks.color(id * 12 + index * 2 + bank, wet ? 0x756c5c : DEAD_TERRAIN_COLORS.banks);
          }
        });
        break;
      }
      case 'woods':
        for (let j = 0; j < 3; j++) {
          const dx = j === 0 ? -0.36 : j === 1 ? 0.32 : 0;
          const dz = j === 2 ? -0.34 : 0.23;
          this.trunks.set(id * 3 + j, x + dx, y + (hex.biome ? 0.15 : 0.075), z + dz,
            1, hex.biome ? 1 : 0.5, 1);
          this.trunks.color(id * 3 + j, hex.biome ? 0x625045 : DEAD_TERRAIN_COLORS.wood);
          if (hex.biome) {
            this.crowns.set(id * 3 + j, x + dx, y + 0.48, z + dz);
            this.crowns.color(id * 3 + j, hex.biome === 'arctic' || hex.biome === 'taiga' ? 0x92bcb1 : 0x467652);
          }
        }
        break;
      case 'marsh':
        this.marsh.set(id, x, y + 0.018, z);
        this.marsh.color(id, hex.biome ? 0x688b60 : DEAD_TERRAIN_COLORS.marsh);
        // Visible creases/reeds use the trunk batch: dry cracks lie flat, wet reeds stand up.
        for (let j = 0; j < 3; j++) {
          this.trunks.set(id * 3 + j, x + (j - 1) * 0.26,
          y + (hex.biome ? 0.12 : 0.035), z + (j % 2 ? 0.24 : -0.15),
          hex.biome ? 0.4 : 0.24, hex.biome ? 0.8 : 1.7, 0.4, hex.biome ? 0 : Math.PI / 2, j);
          this.trunks.color(id * 3 + j, hex.biome ? 0x625045 : DEAD_TERRAIN_COLORS.cracks);
        }
        break;
    }
  }
}
