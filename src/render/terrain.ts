import * as THREE from 'three';
import type { Hex } from '../core/types';
import { Instances } from './instances';
import { topHeight } from './layout';

export class NaturalTerrain {
  private readonly peak: Instances;
  private readonly channel: Instances;
  private readonly banks: Instances;
  private readonly trunks: Instances;
  private readonly crowns: Instances;
  private readonly marsh: Instances;
  constructor(parent: THREE.Group, count: number) {
    this.peak = new Instances(parent, new THREE.ConeGeometry(0.72, 1.15, 5), 0xaaa59a, count);
    this.channel = new Instances(parent, new THREE.CylinderGeometry(0.68, 0.68, 0.025, 6), 0xffffff, count);
    this.banks = new Instances(parent, new THREE.BoxGeometry(0.12, 0.1, 1.16), 0x756c5c, count * 2);
    this.trunks = new Instances(parent, new THREE.CylinderGeometry(0.06, 0.09, 0.3, 5), 0x625045, count * 3);
    this.crowns = new Instances(parent, new THREE.ConeGeometry(0.25, 0.55, 5), 0xffffff, count * 3);
    this.marsh = new Instances(parent, new THREE.CylinderGeometry(0.73, 0.73, 0.025, 6), 0xffffff, count);
  }
  refresh(hex: Hex, x: number, z: number): void {
    const id = hex.id;
    const y = topHeight(hex.elevation);
    this.peak.hide(id); this.channel.hide(id); this.marsh.hide(id);
    for (let j = 0; j < 2; j++) this.banks.hide(id * 2 + j);
    for (let j = 0; j < 3; j++) { this.trunks.hide(id * 3 + j); this.crowns.hide(id * 3 + j); }
    switch (hex.terrain) {
      case 'mountain': this.peak.set(id, x, y + 0.575, z); break;
      case 'riverbed':
      case 'basin': {
        const wet = hex.biome !== null;
        this.channel.set(id, x, y + 0.018, z, hex.terrain === 'riverbed' ? 0.55 : 1, 1, 1);
        this.channel.color(id, wet ? 0x69aeb6 : 0x4f4840);
        if (hex.terrain === 'riverbed') {
          this.banks.set(id * 2, x - 0.43, y + 0.07, z);
          this.banks.set(id * 2 + 1, x + 0.43, y + 0.07, z);
        }
        break;
      }
      case 'woods':
        for (let j = 0; j < 3; j++) {
          const dx = j === 0 ? -0.36 : j === 1 ? 0.32 : 0;
          const dz = j === 2 ? -0.34 : 0.23;
          this.trunks.set(id * 3 + j, x + dx, y + (hex.biome ? 0.15 : 0.075), z + dz,
            1, hex.biome ? 1 : 0.5, 1);
          if (hex.biome) {
            this.crowns.set(id * 3 + j, x + dx, y + 0.48, z + dz);
            this.crowns.color(id * 3 + j, hex.biome === 'arctic' || hex.biome === 'taiga' ? 0x92bcb1 : 0x467652);
          }
        }
        break;
      case 'marsh':
        this.marsh.set(id, x, y + 0.018, z);
        this.marsh.color(id, hex.biome ? 0x688b60 : 0x5b5145);
        // Visible creases/reeds use the trunk batch: dry cracks lie flat, wet reeds stand up.
        for (let j = 0; j < 3; j++) this.trunks.set(id * 3 + j, x + (j - 1) * 0.26,
          y + (hex.biome ? 0.12 : 0.035), z + (j % 2 ? 0.24 : -0.15),
          hex.biome ? 0.4 : 0.24, hex.biome ? 0.8 : 1.7, 0.4, hex.biome ? 0 : Math.PI / 2, j);
        break;
    }
  }
}
