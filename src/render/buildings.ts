import * as THREE from 'three';
import type { BuildingId, Hex, HexId } from '../core/types';
import { Instances } from './instances';
import { SLOT_ANCHORS, topHeight } from './layout';
import { buildingHash } from './reveal';
import { buildingModelFor, FALLBACK_MODEL } from './buildingModels';

interface ModelBatch { instances: Instances; keys: number[]; }
interface PlacedBuilding { id: BuildingId; batch: ModelBatch; index: number; }

export class Buildings {
  private readonly models = new Map<string, ModelBatch>();
  private readonly slots: Instances;
  private readonly placed = new Map<number, PlacedBuilding>();
  constructor(private readonly parent: THREE.Group, private readonly count: number) {
    this.slots = new Instances(parent, new THREE.CylinderGeometry(0.19, 0.19, 0.015, 16), 0xc7c5a0, count * 3,
      { opacity: 0.32 });
    this.slots.mesh.name = 'slot-anchors';
  }
  private batchFor(id: BuildingId): ModelBatch {
    const model = buildingModelFor(id);
    let batch = this.models.get(model.id);
    if (!batch) {
      const instances = new Instances(this.parent, model.geometry(), 0xffffff, this.count * 3,
        { vertexColors: true, castShadow: true, emissive: id === 'glass_kiln' ? 0x261000 : id === 'frost_kiln' ? 0x09232b : 0 });
      instances.mesh.name = `building:${model.id}`;
      instances.mesh.count = 0;
      batch = { instances, keys: [] }; this.models.set(model.id, batch);
    }
    return batch;
  }
  private remove(key: number, record: PlacedBuilding): void {
    const { batch, index } = record, mesh = batch.instances.mesh;
    const last = batch.keys.length - 1;
    if (index !== last) {
      const movedKey = batch.keys[last], matrix = new THREE.Matrix4(), color = new THREE.Color();
      mesh.getMatrixAt(last, matrix); mesh.setMatrixAt(index, matrix);
      mesh.getColorAt(last, color); mesh.setColorAt(index, color);
      batch.keys[index] = movedKey; this.placed.get(movedKey)!.index = index;
      mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor!.needsUpdate = true;
    }
    batch.keys.pop(); mesh.count = batch.keys.length; this.placed.delete(key);
  }
  refresh(hex: Hex, x: number, z: number, coreHex = false): void {
    hex.slots.forEach((slot, index) => {
      const key = hex.id * 3 + index, anchor = SLOT_ANCHORS[index];
      if (!coreHex && hex.placeable && hex.biome) this.slots.set(key, x + anchor.x, topHeight(hex.elevation) + 0.009, z + anchor.z);
      else this.slots.hide(key);
      const building = coreHex ? null : slot.building;
      const previous = this.placed.get(key);
      if (previous?.id === building) return;
      if (previous) this.remove(key, previous);
      if (!building) return;
      const model = buildingModelFor(building), batch = this.batchFor(building), instance = batch.keys.length;
      batch.keys.push(key); batch.instances.mesh.count = batch.keys.length;
      batch.instances.set(instance, x + anchor.x, topHeight(hex.elevation) + 0.018, z + anchor.z);
      const color = model === FALLBACK_MODEL
        ? new THREE.Color().setHSL((buildingHash(building) % 360) / 360, 0.28, 0.54).getHex() : 0xffffff;
      batch.instances.color(instance, color);
      this.placed.set(key, { id: building, batch, index: instance });
    });
  }
}

export class Cores {
  private readonly bases: Instances;
  private readonly crystals: Instances;
  constructor(parent: THREE.Group, private readonly count: number) {
    this.bases = new Instances(parent, new THREE.CylinderGeometry(0.17, 0.23, 0.12, 6), 0xeee2c3, count, { castShadow: true });
    this.crystals = new Instances(parent, new THREE.OctahedronGeometry(0.2), 0x9cf4de, count,
      { emissive: 0x54aa92, castShadow: true });
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
