import * as THREE from 'three';
import type { BuildingId, Hex, HexId } from '../core/types';
import { Instances } from './instances';
import { SLOT_ANCHORS, topHeight } from './layout';
import { buildingHash } from './reveal';
import { buildingModelFor, FALLBACK_MODEL } from './buildingModels';
import { illustratedStyle } from './materials';
import type { ModelAssets } from './modelAssets';
import type { MainBiome } from '../core/types';

interface ModelBatch { instances: Instances[]; keys: number[]; }
interface PlacedBuilding { id: BuildingId; batch: ModelBatch; index: number; }

export class Buildings {
  private readonly models = new Map<string, ModelBatch>();
  private readonly slots: Instances;
  private readonly placed = new Map<number, PlacedBuilding>();
  constructor(private readonly parent: THREE.Group, private readonly count: number, private readonly assets?: ModelAssets) {
    this.slots = new Instances(parent, new THREE.CylinderGeometry(0.19, 0.19, 0.015, 16), 0xc7c5a0, count * 3,
      { opacity: 0.32 });
    this.slots.mesh.name = 'slot-anchors';
  }
  private modelKey(id: BuildingId): string { return this.assets?.get(id) ? `glb:${id}` : buildingModelFor(id).id; }
  private batchFor(id: BuildingId): ModelBatch {
    const model = buildingModelFor(id), key = this.modelKey(id);
    let batch = this.models.get(key);
    if (!batch) {
      const imported = this.assets?.get(id);
      const geometries = imported ? imported.parts.map(part => part.clone()) : [model.geometry()];
      const instances = geometries.map((geometry, part) => {
        if (!imported && illustratedStyle(this.parent) && (id === 'glass_kiln' || id === 'frost_kiln')) {
          const colors = geometry.getAttribute('color'), emit = new Float32Array(colors.count);
          for (let i = 0; i < colors.count; i++) {
            emit[i] = id === 'glass_kiln' ? Number(colors.getX(i) > .9 && colors.getY(i) < .5) : Number(colors.getZ(i) > .45 && colors.getX(i) < .15);
          }
          geometry.setAttribute('_EMIT', new THREE.BufferAttribute(emit, 1));
        }
        const instance = new Instances(this.parent, geometry, 0xffffff, this.count * 3,
          { vertexColors: true, castShadow: true, emissive: id === 'glass_kiln' ? 0x261000 : id === 'frost_kiln' ? 0x09232b : 0 });
        instance.mesh.name = imported ? `building:glb:${id}:${part}` : `building:${model.id}`;
        instance.setCount(0); return instance;
      });
      batch = { instances, keys: [] }; this.models.set(key, batch);
    }
    return batch;
  }
  private remove(key: number, record: PlacedBuilding): void {
    const { batch, index } = record;
    const last = batch.keys.length - 1;
    if (index !== last) {
      const movedKey = batch.keys[last];
      for (const instance of batch.instances) {
        const mesh = instance.mesh, matrix = new THREE.Matrix4(), color = new THREE.Color();
        mesh.getMatrixAt(last, matrix); mesh.setMatrixAt(index, matrix);
        mesh.getColorAt(last, color); mesh.setColorAt(index, color);
        mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor!.needsUpdate = true;
      }
      batch.keys[index] = movedKey; this.placed.get(movedKey)!.index = index;
    }
    batch.keys.pop(); for (const instance of batch.instances) instance.setCount(batch.keys.length);
    this.placed.delete(key);
  }
  refresh(hex: Hex, x: number, z: number, coreHex = false): void {
    hex.slots.forEach((slot, index) => {
      const key = hex.id * 3 + index, anchor = SLOT_ANCHORS[index];
      if (!coreHex && hex.placeable && hex.biome) this.slots.set(key, x + anchor.x, topHeight(hex.elevation) + 0.009, z + anchor.z);
      else this.slots.hide(key);
      const building = coreHex ? null : slot.building;
      const previous = this.placed.get(key);
      if (previous?.id === building && (!building || previous.batch === this.models.get(this.modelKey(building)))) return;
      if (previous) this.remove(key, previous);
      if (!building) return;
      const model = buildingModelFor(building), batch = this.batchFor(building), instance = batch.keys.length;
      batch.keys.push(key);
      const color = !this.assets?.get(building) && model === FALLBACK_MODEL
        ? new THREE.Color().setHSL((buildingHash(building) % 360) / 360, 0.28, 0.54).getHex() : 0xffffff;
      for (const part of batch.instances) {
        part.setCount(batch.keys.length); part.set(instance, x + anchor.x, topHeight(hex.elevation) + 0.018, z + anchor.z); part.color(instance, color);
      }
      this.placed.set(key, { id: building, batch, index: instance });
    });
  }
}

/** Only the first VISIBLE main biome binds a core model; conversion never changes that identity. */
export function visibleCoreBiome(hex: Hex, remembered?: MainBiome): MainBiome | null {
  if (remembered) return remembered;
  return hex.biome === 'forest' || hex.biome === 'desert' || hex.biome === 'arctic' ? hex.biome : null;
}

export class Cores {
  private readonly models = new Map<string, Instances[]>();
  private readonly biomes = new Map<HexId, MainBiome>();
  private readonly parent: THREE.Group;
  private readonly assets?: ModelAssets;
  private readonly bases: Instances;
  private readonly crystals: Instances;
  constructor(parent: THREE.Group, private readonly count: number, assets?: ModelAssets) {
    this.parent = parent; this.assets = assets;
    this.bases = new Instances(parent, new THREE.CylinderGeometry(0.17, 0.23, 0.12, 6), 0xeee2c3, count, { castShadow: true });
    this.crystals = new Instances(parent, new THREE.OctahedronGeometry(0.2), 0x9cf4de, count,
      { emissive: 0x54aa92, castShadow: true });
  }
  set(ids: HexId[], hexes: readonly Hex[], positions: ReadonlyMap<HexId, { x: number; z: number }>): void {
    for (let id = 0; id < this.count; id++) { this.bases.hide(id); this.crystals.hide(id); }
    for (const parts of this.models.values()) for (const part of parts) part.setCount(0);
    for (const id of new Set(ids)) {
      const hex = hexes[id], p = positions.get(id);
      if (!hex || !p) continue;
      const biome = visibleCoreBiome(hex, this.biomes.get(id));
      if (biome) this.biomes.set(id, biome);
      const key = biome ? `core_${biome}` : null, imported = key ? this.assets?.get(key) : undefined;
      const y = topHeight(hex.elevation);
      if (imported && key) {
        let parts = this.models.get(key);
        if (!parts) {
          parts = imported.parts.map((geometry, i) => {
            const part = new Instances(this.parent, geometry.clone(), 0xffffff, this.count, { vertexColors: true, castShadow: true });
            part.mesh.name = `core:glb:${biome}:${i}`; part.setCount(0); return part;
          });
          this.models.set(key, parts);
        }
        // Dense indices: a board-sized instance buffer never becomes board-sized draw work.
        for (const part of parts) {
          const index = part.mesh.count; part.setCount(index + 1); part.set(index, p.x, y + .018, p.z); part.color(index, 0xffffff);
        }
        continue;
      }
      this.bases.set(id, p.x, y + 0.06, p.z);
      this.crystals.set(id, p.x, y + 0.39, p.z, 1, 1.65, 1);
    }
  }
}
