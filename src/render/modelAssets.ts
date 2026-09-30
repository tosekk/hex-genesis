import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { materialHasTexture, prepareIllustratedGeometry } from './materials';

export const MODEL_URLS = import.meta.glob<string>('/src/assets/models/*.glb', { eager: true, query: '?url', import: 'default' });
export interface ImportedModel { id: string; parts: THREE.BufferGeometry[]; triangles: number; }
export interface ModelLimits { radius: number; height: number; triangles: number; }
export const BUILDING_LIMITS: ModelLimits = { radius: .28, height: .5, triangles: 600 };
export const CORE_LIMITS: ModelLimits = { radius: .8, height: 1.2, triangles: 1500 };
const MAX_MATERIALS = 4;

/** Reject textures before GLTFLoader has a chance to request/decode an image. */
export function inspectGLB(buffer: ArrayBuffer): void {
  const view = new DataView(buffer);
  if (view.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== buffer.byteLength)
    throw new Error('Expected a complete glTF 2.0 binary');
  const jsonLength = view.getUint32(12, true);
  if (view.getUint32(16, true) !== 0x4e4f534a || 20 + jsonLength > buffer.byteLength) throw new Error('Missing GLB JSON chunk');
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 20, jsonLength)));
  if (json.textures?.length || json.images?.length) throw new Error('Textures are forbidden; export COLOR_0 only');
  if (json.buffers?.some((b: { uri?: string }) => b.uri && !b.uri.startsWith('data:'))) throw new Error('GLB must embed its buffers');
  if (json.animations?.length || json.skins?.length) throw new Error('Export static meshes without skinning or animation');
  if (json.extensionsRequired?.some((name: string) => name !== 'KHR_materials_unlit')) throw new Error('Compressed/required extensions are unsupported; export plain GLB');
}

function cleanScene(scene: THREE.Object3D): void {
  const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
  scene.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
  });
  geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
}

/** Bake node transforms; flatten triangle faces; merge once per source material. */
export function normalizeModel(scene: THREE.Object3D, id: string, limits: ModelLimits): ImportedModel {
  scene.updateMatrixWorld(true);
  const grouped = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const owned = new Set<THREE.BufferGeometry>();
  try {
    scene.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      if (object instanceof THREE.SkinnedMesh || Object.keys(object.geometry.morphAttributes).length) throw new Error('Static geometry only');
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      if (materials.some(materialHasTexture)) throw new Error('Loaded material contains a texture map');
      const source = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone(); owned.add(source);
      if (!source.getAttribute('color')) throw new Error('Missing COLOR_0; export vertex colors');
      source.applyMatrix4(object.matrixWorld);
      const groups = Array.isArray(object.material) && object.geometry.groups.length ? object.geometry.groups : [{ start: 0, count: source.getAttribute('position').count, materialIndex: 0 }];
      for (const group of groups) {
        const material = materials[group.materialIndex ?? 0];
        if (!material || !Number.isFinite(group.count) || group.count % 3) throw new Error('Invalid triangle/material group');
        const part = new THREE.BufferGeometry(); owned.add(part);
        const end = Math.min(group.start + group.count, source.getAttribute('position').count);
        for (const name of ['position', 'color', '_AO', '_ao', '_EMIT', '_emit']) {
          const attr = source.getAttribute(name); if (!attr) continue;
          const values = new Float32Array((end - group.start) * attr.itemSize);
          for (let vertex = group.start; vertex < end; vertex++) for (let axis = 0; axis < attr.itemSize; axis++) {
            const value = attr.getComponent(vertex, axis);
            if (!Number.isFinite(value)) throw new Error('Non-finite vertex data');
            values[(vertex - group.start) * attr.itemSize + axis] = value;
          }
          part.setAttribute(name, new THREE.BufferAttribute(values, attr.itemSize));
        }
        if (object.matrixWorld.determinant() < 0) {
          // Baking a mirrored node removes Three's original per-object front-face flip.
          for (const attr of Object.values(part.attributes)) for (let i = 0; i < attr.count; i += 3) for (let axis = 0; axis < attr.itemSize; axis++) {
            const b = attr.getComponent(i + 1, axis), c = attr.getComponent(i + 2, axis);
            attr.setComponent(i + 1, axis, c); attr.setComponent(i + 2, axis, b);
          }
        }
        part.computeVertexNormals();
        // glTF's baseColorFactor is baked, never retained as another material.
        prepareIllustratedGeometry(part, 'color' in material ? (material.color as THREE.Color).getHex() : 0xffffff,
          'emissive' in material && (material.emissive as THREE.Color).getHex() !== 0);
        // Normalize attributes before merging material groups from differently authored nodes.
        for (const name of Object.keys(part.attributes)) if (!['position', 'normal', 'color', '_AO', '_EMIT'].includes(name)) part.deleteAttribute(name);
        const list = grouped.get(material) ?? []; list.push(part); grouped.set(material, list);
      }
    });
    if (!grouped.size || grouped.size > MAX_MATERIALS) throw new Error(`Expected 1–${MAX_MATERIALS} mesh materials`);
    const triangles = [...grouped.values()].flat().reduce((n, part) => n + part.getAttribute('position').count / 3, 0);
    if (triangles > limits.triangles) throw new Error(`Triangle budget ${triangles} > ${limits.triangles}`);
    const parts = [...grouped.values()].map(group => {
      const merged = mergeGeometries(group, false); if (!merged) throw new Error('Incompatible model attributes'); owned.add(merged); return merged;
    });
    const box = new THREE.Box3();
    for (const part of parts) { part.computeBoundingBox(); box.union(part.boundingBox!); }
    const centre = box.getCenter(new THREE.Vector3());
    let radius = 0;
    for (const part of parts) {
      part.translate(-centre.x, -box.min.y, -centre.z);
      const p = part.getAttribute('position');
      for (let i = 0; i < p.count; i++) radius = Math.max(radius, Math.hypot(p.getX(i), p.getZ(i)));
    }
    const height = box.max.y - box.min.y;
    if (radius <= 0 || !Number.isFinite(radius) || !Number.isFinite(height)) throw new Error('Empty/invalid model bounds');
    const scale = Math.min(limits.radius / radius, height > 0 ? limits.height / height : Infinity);
    for (const part of parts) { part.scale(scale, scale, scale); part.computeBoundingBox(); part.computeBoundingSphere(); owned.delete(part); }
    return { id, parts, triangles };
  } finally { owned.forEach(g => g.dispose()); }
}

export async function parseModel(buffer: ArrayBuffer, id: string): Promise<ImportedModel> {
  inspectGLB(buffer);
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const gltf = await new GLTFLoader().parseAsync(buffer, '');
  try { return normalizeModel(gltf.scene, id, id.startsWith('core_') ? CORE_LIMITS : BUILDING_LIMITS); }
  finally { for (const scene of gltf.scenes) cleanScene(scene); }
}

export class ModelAssets {
  private readonly models = new Map<string, ImportedModel>();
  private readonly listeners = new Set<() => void>();
  private readonly abort = new AbortController();
  private disposed = false;
  readonly ready: Promise<void>;
  readonly failures = new Map<string, string>();
  constructor(urls: Record<string, string> = MODEL_URLS, read?: (url: string) => Promise<ArrayBuffer>) {
    const fetchModel = read ?? (async (url: string) => {
      const response = await fetch(url, { signal: this.abort.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.arrayBuffer();
    });
    this.ready = Promise.all(Object.entries(urls).map(async ([path, url]) => {
      const id = /\/([a-z0-9_]+)\.glb$/.exec(path)?.[1]; if (!id) return;
      let model: ImportedModel | null = null;
      try {
        model = await parseModel(await fetchModel(url), id);
        if (this.disposed) { model.parts.forEach(g => g.dispose()); return; }
        this.models.set(id, model); for (const cb of this.listeners) cb();
      } catch (error) {
        if (this.disposed) return;
        const reason = error instanceof Error ? error.message : String(error); this.failures.set(id, reason);
        console.debug(`[models] ${id}: procedural fallback (${reason})`);
      }
    })).then(() => undefined);
  }
  get(id: string): ImportedModel | undefined { return this.models.get(id); }
  subscribe(callback: () => void): () => void { this.listeners.add(callback); return () => { this.listeners.delete(callback); }; }
  dispose(): void {
    if (this.disposed) return; this.disposed = true; this.abort.abort(); this.listeners.clear();
    for (const model of this.models.values()) model.parts.forEach(g => g.dispose()); this.models.clear();
  }
}
