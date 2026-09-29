import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { Biome, BuildingId } from '../core/types';

export interface BuildingModel { id: string; homeBiome: Biome | null; geometry(): THREE.BufferGeometry; }
const WOOD = 0x9c6c40, DARK = 0x584333, STONE = 0x96978e, WATER = 0x4ca9c7, GREEN = 0x54874c;
const HOME: Record<Biome, { wall: number; roof: number }> = {
  forest: { wall: 0xc4955d, roof: 0x456343 }, desert: { wall: 0xe5bc7e, roof: 0xb67748 },
  arctic: { wall: 0xc4d9df, roof: 0x52839a }, steppe: { wall: 0xd0b46b, roof: 0x9a683c },
  taiga: { wall: 0x9fae8c, roof: 0x40695e }, polarDesert: { wall: 0xe0ddd0, roof: 0x789fbd },
};

class Parts {
  private readonly parts: THREE.BufferGeometry[] = [];
  add(raw: THREE.BufferGeometry, color: number, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0): void {
    const part = raw.index ? raw.toNonIndexed() : raw;
    if (part !== raw) raw.dispose();
    part.rotateX(rx); part.rotateY(ry); part.rotateZ(rz); part.translate(x, y, z);
    const c = new THREE.Color(color), values = new Float32Array(part.getAttribute('position').count * 3);
    for (let i = 0; i < values.length; i += 3) { values[i] = c.r; values[i + 1] = c.g; values[i + 2] = c.b; }
    part.setAttribute('color', new THREE.BufferAttribute(values, 3)); this.parts.push(part);
  }
  box(w: number, h: number, d: number, x: number, y: number, z: number, c: number, rx = 0, ry = 0, rz = 0): void {
    this.add(new THREE.BoxGeometry(w, h, d), c, x, y, z, rx, ry, rz);
  }
  cylinder(rt: number, rb: number, h: number, x: number, y: number, z: number, c: number, rx = 0, ry = 0, rz = 0): void {
    this.add(new THREE.CylinderGeometry(rt, rb, h, 8), c, x, y, z, rx, ry, rz);
  }
  cone(r: number, h: number, x: number, y: number, z: number, c: number, sides = 6, ry = 0): void {
    this.add(new THREE.ConeGeometry(r, h, sides), c, x, y, z, 0, ry);
  }
  rock(r: number, x: number, y: number, z: number, c: number): void {
    this.add(new THREE.OctahedronGeometry(r), c, x, y, z, 0, x * 5);
  }
  ring(r: number, tube: number, x: number, y: number, z: number, c: number, rx = Math.PI / 2): void {
    this.add(new THREE.TorusGeometry(r, tube, 4, 12), c, x, y, z, rx);
  }
  dome(r: number, x: number, y: number, z: number, c: number): void {
    this.add(new THREE.SphereGeometry(r, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2), c, x, y, z);
  }
  hut(x: number, z: number, home: Biome, scale = 1): void {
    const p = HOME[home];
    this.box(0.24 * scale, 0.18 * scale, 0.22 * scale, x, 0.09 * scale, z, p.wall);
    this.cone(0.21 * scale, 0.14 * scale, x, 0.25 * scale, z, p.roof, 4, Math.PI / 4);
    this.box(0.06 * scale, 0.105 * scale, 0.009, x, 0.053 * scale, z + 0.113 * scale, DARK);
  }
  logs(z = 0.12, scale = 1): void {
    for (let j = -1; j <= 1; j++) this.cylinder(0.028 * scale, 0.028 * scale, 0.22 * scale,
      j * 0.065 * scale, 0.028 * scale, z, WOOD, 0, 0, Math.PI / 2);
    this.cylinder(0.028 * scale, 0.028 * scale, 0.22 * scale, 0, 0.075 * scale, z, 0xc5a471, 0, 0, Math.PI / 2);
  }
  rows(color: number, y = 0.025, width = 0.34): void {
    for (let j = -1; j <= 1; j++) this.box(width, 0.035, 0.035, 0, y, j * 0.095, color);
  }
  finish(): THREE.BufferGeometry {
    const merged = mergeGeometries(this.parts, false);
    this.parts.forEach(part => part.dispose());
    if (!merged) throw new Error('Incompatible building model parts');
    merged.computeBoundingBox();
    const position = merged.getAttribute('position');
    let radius = 0;
    for (let i = 0; i < position.count; i++) radius = Math.max(radius, Math.hypot(position.getX(i), position.getZ(i)));
    // All model footprints fit in a 0.23-radius disc, clear of neighboring slot anchors.
    if (radius > 0.23) merged.scale(0.23 / radius, 1, 0.23 / radius);
    if (merged.boundingBox!.min.y < 0) merged.translate(0, -merged.boundingBox!.min.y, 0);
    merged.computeBoundingBox(); merged.computeBoundingSphere(); return merged;
  }
}

function model(id: string, homeBiome: Biome, build: (p: Parts) => void): BuildingModel {
  return { id, homeBiome, geometry() { const p = new Parts(); build(p); return p.finish(); } };
}

export const BUILDING_MODELS: Record<string, BuildingModel> = {
  lumber_camp: model('lumber_camp', 'forest', p => { p.hut(0, -0.075, 'forest', 0.65); p.logs(0.115); }),
  hillside_mine: model('hillside_mine', 'forest', p => {
    p.box(0.34, 0.08, 0.3, 0, 0.04, 0, 0x697359);
    p.box(0.26, 0.07, 0.22, 0, 0.115, -0.02, 0x929480);
    p.box(0.16, 0.07, 0.1, 0, 0.185, -0.09, 0xb0b49b);
    p.box(0.09, 0.08, 0.009, 0, 0.115, 0.095, DARK);
    p.box(0.21, 0.025, 0.025, 0, 0.02, 0.18, WOOD);
  }),
  sawmill: model('sawmill', 'forest', p => {
    p.hut(-0.055, -0.025, 'forest', 0.8);
    p.ring(0.095, 0.015, 0.11, 0.12, 0.045, 0xd4d9d1, 0);
    p.cylinder(0.017, 0.017, 0.06, 0.11, 0.12, 0.045, DARK, Math.PI / 2);
    p.box(0.31, 0.035, 0.05, 0, 0.03, 0.14, WOOD);
  }),
  gatherers_hut: model('gatherers_hut', 'forest', p => {
    p.cylinder(0.115, 0.13, 0.17, -0.045, 0.085, -0.04, HOME.forest.wall);
    p.cone(0.155, 0.18, -0.045, 0.26, -0.04, 0xa6ad57);
    p.cylinder(0.07, 0.05, 0.08, 0.12, 0.04, 0.13, WOOD);
    p.rock(0.04, 0.12, 0.105, 0.13, 0xb9754f);
  }),
  farm: model('farm', 'forest', p => {
    p.hut(0, -0.1, 'forest', 0.8);
    for (let j = -1; j <= 1; j++) p.box(0.26, 0.035, 0.026, 0, 0.026, 0.07 + j * 0.055, GREEN);
    p.box(0.06, 0.07, 0.01, 0, 0.055, -0.008, 0xd9c78d);
  }),
  quarry: model('quarry', 'desert', p => {
    p.box(0.35, 0.04, 0.33, 0, 0.02, 0, 0xcab188);
    for (const x of [-0.12, 0.12]) p.box(0.065, 0.11, 0.3, x, 0.095, 0, 0xb69265);
    p.box(0.3, 0.12, 0.05, 0, 0.1, -0.12, 0xe0c190);
    p.rock(0.065, 0.03, 0.07, 0.07, 0xe8d6ad);
  }),
  palm_grove: model('palm_grove', 'desert', p => {
    for (const [x, z, h] of [[-0.095, -0.055, 0.32], [0.09, 0.055, 0.43]]) {
      p.cylinder(0.022, 0.032, h, x, h / 2, z, WOOD);
      for (let j = 0; j < 3; j++) p.box(0.26, 0.024, 0.06, x, h, z, 0x6d9950, 0, j * Math.PI / 3);
    }
  }),
  stonemason: model('stonemason', 'desert', p => {
    for (let j = 0; j < 3; j++) p.box(0.105, 0.09, 0.14, (j - 1) * 0.115, 0.045, 0.06, 0xe3c99d);
    for (let j = 0; j < 2; j++) p.box(0.12, 0.09, 0.14, (j - 0.5) * 0.13, 0.14, 0.025, 0xc99c62);
    p.box(0.1, 0.09, 0.12, 0, 0.235, -0.02, 0xf0d7b0);
  }),
  oasis_well: model('oasis_well', 'desert', p => {
    p.cylinder(0.11, 0.11, 0.015, 0, 0.025, 0, WATER); p.ring(0.13, 0.035, 0, 0.05, 0, HOME.desert.wall);
    for (const x of [-0.13, 0.13]) p.box(0.028, 0.26, 0.028, x, 0.13, 0, WOOD);
    p.box(0.3, 0.03, 0.03, 0, 0.27, 0, WOOD); p.cylinder(0.008, 0.008, 0.18, 0, 0.18, 0, DARK);
  }),
  glass_kiln: model('glass_kiln', 'desert', p => {
    p.cylinder(0.16, 0.19, 0.12, 0, 0.06, 0, HOME.desert.roof); p.dome(0.17, 0, 0.12, 0, HOME.desert.wall);
    p.box(0.09, 0.07, 0.015, 0, 0.07, 0.183, 0xffad3b);
    p.cylinder(0.045, 0.06, 0.19, 0.03, 0.34, -0.06, 0x9d6e4b);
  }),
  driftwood_camp: model('driftwood_camp', 'arctic', p => {
    p.cone(0.15, 0.27, 0, 0.135, -0.06, 0x86adc0, 4, Math.PI / 4); p.logs(0.13, 0.8);
    p.box(0.055, 0.11, 0.01, 0, 0.06, 0.05, DARK);
  }),
  scree_quarry: model('scree_quarry', 'arctic', p => {
    p.box(0.25, 0.08, 0.2, 0, 0.11, 0, HOME.arctic.roof);
    for (const x of [-0.14, 0.14]) for (const z of [-0.06, 0.06]) p.cylinder(0.047, 0.047, 0.025, x, 0.05, z, DARK, 0, 0, Math.PI / 2);
    for (const x of [-0.075, 0.06]) p.rock(0.075, x, 0.19, 0, 0xc9d5db);
  }),
  ice_drill: model('ice_drill', 'arctic', p => {
    p.box(0.3, 0.035, 0.26, 0, 0.0175, 0, HOME.arctic.wall);
    for (const x of [-0.1, 0.1]) p.box(0.026, 0.43, 0.026, x * 0.6, 0.23, 0, HOME.arctic.roof, 0, 0, -x * 1.4);
    for (const y of [0.15, 0.3, 0.43]) p.box(0.16, 0.025, 0.026, 0, y, 0, 0x779cad);
    p.cylinder(0.021, 0.025, 0.36, 0, 0.21, 0, 0xe9f5ef); p.cone(0.045, 0.08, 0, 0.055, 0, STONE);
  }),
  glacier_pump: model('glacier_pump', 'arctic', p => {
    p.hut(-0.055, -0.035, 'arctic', 0.85);
    p.cylinder(0.035, 0.035, 0.26, 0.1, 0.07, 0.02, 0x72aabc, Math.PI / 2);
    p.cylinder(0.035, 0.035, 0.2, 0.1, 0.16, -0.08, 0x72aabc);
    p.box(0.045, 0.04, 0.17, 0.1, 0.27, -0.01, STONE);
  }),
  ice_fishery: model('ice_fishery', 'arctic', p => {
    p.hut(-0.065, -0.035, 'arctic', 0.7);
    p.cylinder(0.08, 0.08, 0.012, 0.11, 0.02, 0.11, 0x285763); p.ring(0.085, 0.015, 0.11, 0.025, 0.11, 0xe1ece5);
    p.box(0.012, 0.22, 0.012, 0.07, 0.13, 0.11, WOOD, 0, 0, -0.4);
  }),
  grain_fields: model('grain_fields', 'steppe', p => {
    p.box(0.36, 0.025, 0.3, 0, 0.0125, 0, 0x80623c); p.rows(0xd8be53, 0.06);
    for (let j = -1; j <= 1; j++) p.cone(0.042, 0.1, j * 0.09, 0.13, -0.1, 0xf1d276, 4);
  }),
  windmill: model('windmill', 'steppe', p => {
    p.cylinder(0.07, 0.125, 0.36, 0, 0.18, 0, HOME.steppe.wall); p.cone(0.11, 0.13, 0, 0.425, 0, HOME.steppe.roof);
    for (const angle of [Math.PI / 4, -Math.PI / 4]) p.box(0.035, 0.43, 0.025, 0, 0.33, 0.13, 0xefdfb1, 0, 0, angle);
    p.cylinder(0.03, 0.03, 0.055, 0, 0.33, 0.135, DARK, Math.PI / 2);
  }),
  caravanserai: model('caravanserai', 'steppe', p => {
    p.box(0.34, 0.018, 0.34, 0, 0.009, 0, 0xb19262);
    for (const x of [-0.14, 0.14]) p.box(0.065, 0.15, 0.34, x, 0.075, 0, HOME.steppe.wall);
    p.box(0.3, 0.15, 0.065, 0, 0.075, -0.14, HOME.steppe.wall);
    for (const x of [-0.11, 0.11]) p.box(0.12, 0.15, 0.06, x, 0.075, 0.14, HOME.steppe.wall);
    p.box(0.1, 0.035, 0.06, 0, 0.155, 0.14, HOME.steppe.roof);
  }),
  trapper_lodge: model('trapper_lodge', 'taiga', p => {
    p.cone(0.21, 0.34, 0, 0.17, 0, HOME.taiga.roof, 4, Math.PI / 4);
    p.box(0.105, 0.11, 0.015, 0, 0.055, 0.13, HOME.taiga.wall);
    p.box(0.04, 0.2, 0.05, -0.07, 0.29, -0.06, STONE);
  }),
  resin_works: model('resin_works', 'taiga', p => {
    p.box(0.34, 0.025, 0.29, 0, 0.0125, 0, HOME.taiga.roof);
    for (const [x, z] of [[-0.1, -0.05], [0.1, -0.05], [0, 0.12]]) {
      p.cylinder(0.072, 0.075, 0.17, x, 0.11, z, WOOD); p.ring(0.073, 0.008, x, 0.15, z, DARK);
      p.cylinder(0.06, 0.06, 0.012, x, 0.202, z, 0xdbb945);
    }
  }),
  hot_spring: model('hot_spring', 'taiga', p => {
    p.cylinder(0.15, 0.15, 0.015, 0, 0.03, 0, 0x70bdc2); p.ring(0.17, 0.028, 0, 0.035, 0, 0x829180);
    for (const [x, y] of [[-0.075, 0.18], [0.055, 0.29]]) {
      p.rock(0.035, x, y, 0, 0xdce8da); p.rock(0.026, x + 0.025, y + 0.09, 0, 0xecf0df);
    }
  }),
  lichen_farm: model('lichen_farm', 'polarDesert', p => {
    for (let j = 0; j < 3; j++) {
      p.box(0.34 - j * 0.055, 0.07, 0.27 - j * 0.045, 0, 0.035 + j * 0.07, -j * 0.015, HOME.polarDesert.wall);
      p.box(0.31 - j * 0.055, 0.012, 0.23 - j * 0.045, 0, 0.074 + j * 0.07, -j * 0.015, 0x789c4a);
    }
  }),
  salt_mine: model('salt_mine', 'polarDesert', p => {
    for (const [x, z, r, h] of [[-0.1, 0.05, 0.105, 0.22], [0.085, 0.04, 0.1, 0.29], [0, -0.1, 0.09, 0.17]])
      p.cone(r, h, x, h / 2, z, 0xf0ede0);
    p.box(0.3, 0.018, 0.025, 0, 0.009, 0.15, HOME.polarDesert.roof);
  }),
  frost_kiln: model('frost_kiln', 'polarDesert', p => {
    p.cylinder(0.16, 0.18, 0.09, 0, 0.045, 0, HOME.polarDesert.roof); p.dome(0.17, 0, 0.09, 0, 0xc5e6e6);
    p.box(0.085, 0.055, 0.018, 0, 0.055, 0.173, WATER);
    p.cone(0.07, 0.18, -0.055, 0.28, -0.03, 0x8fbfdb, 5);
  }),
};

export const FALLBACK_MODEL: BuildingModel = { id: 'fallback', homeBiome: null,
  geometry() { const p = new Parts(); p.box(0.28, 0.25, 0.27, 0, 0.125, 0, 0xffffff);
    p.cone(0.24, 0.18, 0, 0.34, 0, 0xb0b0b0, 4, Math.PI / 4); return p.finish(); } };
export function buildingModelFor(id: BuildingId): BuildingModel {
  return Object.hasOwn(BUILDING_MODELS, id) ? BUILDING_MODELS[id] : FALLBACK_MODEL;
}
