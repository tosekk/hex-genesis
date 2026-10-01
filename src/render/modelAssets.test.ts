import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import { makeTestState } from '../core/testing';
import { Buildings, Cores, visibleCoreBiome } from './buildings';
import { disposeGroup } from './instances';
import { BUILDING_LIMITS, CORE_LIMITS, ModelAssets, inspectGLB, normalizeModel, parseModel } from './modelAssets';
import { installIllustratedStyle, materialHasTexture } from './materials';

/** A tiny self-contained GLB, constructed in memory (no committed art or external assets). */
function tinyGLB(options: { textures?: boolean; colors?: boolean; nodes?: number; materials?: number } = {}): ArrayBuffer {
  const position = new Float32Array([-1,0,0, 1,0,0, 0,2,1, -1,0,0, 0,2,1, 0,0,-1]);
  const color = new Float32Array([.2,.4,.6,.3, .2,.4,.6,.3, .2,.4,.6,.3, .8,.6,.4,1, .8,.6,.4,1, .8,.6,.4,1]);
  const binary = new Uint8Array(position.byteLength + color.byteLength);
  binary.set(new Uint8Array(position.buffer)); binary.set(new Uint8Array(color.buffer), position.byteLength);
  const attributes = options.colors === false ? { POSITION: 0 } : { POSITION: 0, COLOR_0: 1 };
  const materialCount = options.materials ?? 1;
  const json = {
    asset: { version: '2.0' }, buffers: [{ byteLength: binary.byteLength }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: position.byteLength }, { buffer: 0, byteOffset: position.byteLength, byteLength: color.byteLength }],
    accessors: [{ bufferView: 0, componentType: 5126, count: 6, type: 'VEC3', min: [-1,0,-1], max: [1,2,1] }, { bufferView: 1, componentType: 5126, count: 6, type: 'VEC4' }],
    materials: Array.from({ length: materialCount }, () => ({ pbrMetallicRoughness: { baseColorFactor: [1,1,1,1], metallicFactor: 0, roughnessFactor: 1 } })),
    meshes: Array.from({ length: materialCount }, (_, i) => ({ primitives: [{ attributes, material: i }] })),
    nodes: Array.from({ length: options.nodes ?? materialCount }, (_, i) => ({ mesh: i % materialCount, translation: [i * 2 + 3, 4, -2], scale: [1, 1.5, .5] })),
    scenes: [{ nodes: Array.from({ length: options.nodes ?? materialCount }, (_, i) => i) }], scene: 0,
    ...(options.textures ? { images: [{ uri: 'forbidden.png' }], textures: [{ source: 0 }] } : {}),
  };
  const text = new TextEncoder().encode(JSON.stringify(json)), jsonLength = (text.length + 3) & ~3;
  const buffer = new ArrayBuffer(12 + 8 + jsonLength + 8 + binary.byteLength), view = new DataView(buffer);
  view.setUint32(0, 0x46546c67, true); view.setUint32(4, 2, true); view.setUint32(8, buffer.byteLength, true);
  view.setUint32(12, jsonLength, true); view.setUint32(16, 0x4e4f534a, true);
  new Uint8Array(buffer, 20, jsonLength).fill(32); new Uint8Array(buffer, 20, text.length).set(text);
  view.setUint32(20 + jsonLength, binary.byteLength, true); view.setUint32(24 + jsonLength, 0x004e4942, true);
  new Uint8Array(buffer, 28 + jsonLength).set(binary); return buffer;
}
function checkBounds(parts: THREE.BufferGeometry[], radius: number, height: number): void {
  const box = new THREE.Box3();
  for (const part of parts) {
    part.computeBoundingBox(); box.union(part.boundingBox!);
    const p = part.getAttribute('position');
    for (let i = 0; i < p.count; i++) expect(Math.hypot(p.getX(i), p.getZ(i))).toBeLessThanOrEqual(radius + 1e-6);
  }
  expect(box.min.y).toBeCloseTo(0); expect(box.max.y).toBeLessThanOrEqual(height + 1e-6);
  expect(box.min.x + box.max.x).toBeCloseTo(0); expect(box.min.z + box.max.z).toBeCloseTo(0);
}

describe('designer GLB drop-in pipeline', () => {
  it('parses a real in-memory GLB, merges transformed nodes per material and preserves RGB and alpha AO', async () => {
    const model = await parseModel(tinyGLB({ nodes: 2 }), 'lumber_camp');
    expect(model.parts).toHaveLength(1); expect(model.triangles).toBe(4); checkBounds(model.parts, .28, .5);
    expect(model.parts[0].getAttribute('color').getX(0)).toBeCloseTo(.2);
    expect(model.parts[0].getAttribute('_AO').getX(0)).toBeCloseTo(.3);
    expect(model.parts[0].getAttribute('_EMIT').getX(0)).toBe(0);
    expect(model.parts[0].getAttribute('uv')).toBeUndefined();
    model.parts.forEach(g => g.dispose());
  });
  it('keeps one merged geometry per material and applies the larger core limits', async () => {
    const model = await parseModel(tinyGLB({ materials: 2, nodes: 3 }), 'core_desert');
    expect(model.parts).toHaveLength(2); expect(model.triangles).toBe(6); checkBounds(model.parts, .8, 1.2); model.parts.forEach(g => g.dispose());
  });
  it('rejects textures before loading and checks every loaded material for any texture map', async () => {
    const fetch = vi.fn(); vi.stubGlobal('fetch', fetch);
    try {
      await expect(parseModel(tinyGLB({ textures: true }), 'farm')).rejects.toThrow('Textures are forbidden'); expect(fetch).not.toHaveBeenCalled();
      const scene = new THREE.Group(), material = new THREE.MeshStandardMaterial({ normalMap: new THREE.Texture() });
      const geometry = new THREE.BoxGeometry(); geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(24 * 3).fill(1), 3));
      scene.add(new THREE.Mesh(geometry, material));
      expect(() => normalizeModel(scene, 'farm', BUILDING_LIMITS)).toThrow('texture map');
      material.normalMap!.dispose(); material.dispose(); geometry.dispose();
    } finally { vi.unstubAllGlobals(); }
  });
  it('missing, corrupt, uncolored and over-budget files keep procedural models without throwing', async () => {
    const read = vi.fn(async () => tinyGLB({ colors: false }));
    const absent = new ModelAssets({}, read); await absent.ready; expect(read).not.toHaveBeenCalled(); expect(absent.get('farm')).toBeUndefined(); absent.dispose();
    const assets = new ModelAssets({ '/src/assets/models/farm.glb': 'farm' }, read); await assets.ready;
    expect(assets.get('farm')).toBeUndefined(); expect(assets.failures.get('farm')).toContain('COLOR_0'); assets.dispose();
    const corrupt = new ModelAssets({ '/src/assets/models/farm.glb': 'farm' }, async () => new ArrayBuffer(0)); await corrupt.ready;
    expect(corrupt.get('farm')).toBeUndefined(); corrupt.dispose();
    expect(() => inspectGLB(new ArrayBuffer(0))).toThrow();
    const source = new THREE.Group(), geometry = new THREE.BoxGeometry(); geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(24 * 3).fill(1), 3));
    source.add(new THREE.Mesh(geometry, new THREE.MeshStandardMaterial()));
    expect(() => normalizeModel(source, 'farm', { ...BUILDING_LIMITS, triangles: 1 })).toThrow('Triangle budget'); disposeGroup(source);
  });
  it.each([false, true])('promotes fallback placements and compacts GLB parts on demolition (illustrated=%s)', async illustrated => {
    let finish!: (b: ArrayBuffer) => void;
    const assets = new ModelAssets({ '/src/assets/models/farm.glb': 'farm' }, () => new Promise(resolve => { finish = resolve; }));
    const group = new THREE.Group(), style = illustrated ? installIllustratedStyle(group) : null, state = makeTestState({ cols: 2, rows: 1, hex: () => ({ biome: 'forest' }) });
    const before = JSON.stringify(state), buildings = new Buildings(group, 2, assets);
    state.hexes[0].slots[0].building = state.hexes[1].slots[0].building = 'farm';
    buildings.refresh(state.hexes[0], 0, 0); buildings.refresh(state.hexes[1], 2, 0);
    expect((group.getObjectByName('building:farm') as THREE.InstancedMesh).count).toBe(2);
    finish(tinyGLB({ materials: 2 })); await assets.ready;
    buildings.refresh(state.hexes[0], 0, 0); buildings.refresh(state.hexes[1], 2, 0);
    expect((group.getObjectByName('building:farm') as THREE.InstancedMesh).count).toBe(0);
    const meshes = group.children.filter(o => o.name.startsWith('building:glb:')) as THREE.InstancedMesh[];
    expect(meshes).toHaveLength(2);
    for (const mesh of meshes) {
      expect(mesh.count).toBe(2); expect(materialHasTexture(mesh.material as THREE.Material)).toBe(false);
      if (style) expect(mesh.material).toBe(style.fill);
      else {
        expect(mesh.material).toBeInstanceOf(THREE.MeshStandardMaterial);
        expect((mesh.material as THREE.MeshStandardMaterial).vertexColors).toBe(true);
        expect(mesh.geometry.getAttribute('color').getX(0)).toBeCloseTo(.2);
        expect(group.getObjectByName('ink-hull')).toBeUndefined();
      }
    }
    const last = new THREE.Matrix4(); meshes[0].getMatrixAt(1, last);
    state.hexes[0].slots[0].building = null; buildings.refresh(state.hexes[0], 0, 0);
    for (const mesh of meshes) { const moved = new THREE.Matrix4(); mesh.getMatrixAt(0, moved); expect(moved.elements).toEqual(last.elements); expect(mesh.count).toBe(1); }
    state.hexes[1].biome = 'taiga'; buildings.refresh(state.hexes[1], 2, 0); expect(meshes[0].count).toBe(1);
    state.hexes[1].slots[0].building = null; state.hexes[1].biome = 'forest'; expect(JSON.stringify(state)).toBe(before);
    disposeGroup(group); assets.dispose();
  });
  it.each([false, true])('selects biome core files and retains identity on conversion (illustrated=%s)', async illustrated => {
    const assets = new ModelAssets(Object.fromEntries(['forest','desert','arctic'].map(b => [`/src/assets/models/core_${b}.glb`, b])), async () => tinyGLB()); await assets.ready;
    const group = new THREE.Group(); if (illustrated) installIllustratedStyle(group); const state = makeTestState({ cols: 3, rows: 1 });
    const cores = new Cores(group, 3, assets), positions = new Map(state.hexes.map(h => [h.id, { x: h.id * 2, z: 0 }]));
    expect(visibleCoreBiome(state.hexes[0])).toBeNull();
    cores.set([0], state.hexes, positions); expect(group.getObjectByName('core:glb:forest:0')).toBeUndefined();
    state.hexes[0].biome = 'forest'; state.hexes[1].biome = 'desert'; state.hexes[2].biome = 'arctic';
    cores.set([0,1,2], state.hexes, positions);
    for (const biome of ['forest','desert','arctic']) expect((group.getObjectByName(`core:glb:${biome}:0`) as THREE.InstancedMesh).count).toBe(1);
    state.hexes[0].biome = 'steppe'; cores.set([0,1,2], state.hexes, positions);
    expect((group.getObjectByName('core:glb:forest:0') as THREE.InstancedMesh).count).toBe(1);
    cores.set([], state.hexes, positions); for (const mesh of group.children.filter(o => o.name.startsWith('core:glb:')) as THREE.InstancedMesh[]) expect(mesh.count).toBe(0);
    disposeGroup(group); assets.dispose();
  });
  it('keeps the default procedural core when there is no matching file in the asset manifest', async () => {
    const read = vi.fn(), assets = new ModelAssets({}, read); await assets.ready;
    const group = new THREE.Group(), state = makeTestState({ cols: 1, rows: 1, hex: () => ({ biome: 'forest' }) });
    const cores = new Cores(group, 1, assets); cores.set([0], state.hexes, new Map([[0, { x: 2, z: 3 }]]));
    expect(read).not.toHaveBeenCalled(); expect(group.children).toHaveLength(2);
    const crystal = group.children[1] as THREE.InstancedMesh, material = crystal.material as THREE.MeshStandardMaterial;
    expect(material).toBeInstanceOf(THREE.MeshStandardMaterial); expect(material.color.getHex()).toBe(0x9cf4de);
    const matrix = new THREE.Matrix4(); crystal.getMatrixAt(0, matrix);
    expect(matrix.elements[12]).toBe(2); expect(matrix.elements[14]).toBe(3); expect(matrix.elements[5]).toBeCloseTo(1.65);
    disposeGroup(group); assets.dispose();
  });
  it('disposal during loading cancels promotion and cleans late geometry without notifying listeners', async () => {
    let finish!: (b: ArrayBuffer) => void;
    const assets = new ModelAssets({ '/src/assets/models/farm.glb': 'farm' }, () => new Promise(resolve => { finish = resolve; }));
    const changed = vi.fn(); assets.subscribe(changed); assets.dispose(); finish(tinyGLB()); await assets.ready;
    expect(assets.get('farm')).toBeUndefined(); expect(changed).not.toHaveBeenCalled(); assets.dispose();
  });
  it('keeps authored flat face colors and shading stable when a node is mirrored', () => {
    const scene = new THREE.Group(), geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, 1,0,0, 0,1,0], 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute([.2,.4,.6, .2,.4,.6, .2,.4,.6], 3));
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial()); mesh.scale.x = -1; scene.add(mesh);
    const model = normalizeModel(scene, 'farm', BUILDING_LIMITS);
    expect(model.parts[0].getAttribute('normal').getZ(0)).toBeCloseTo(1);
    expect(model.parts[0].getAttribute('color').getX(0)).toBeCloseTo(.2); model.parts.forEach(g => g.dispose()); disposeGroup(scene);
  });
  it('uses the footprint limits specified for buildings and cores', () => {
    expect(BUILDING_LIMITS).toEqual({ radius: .28, height: .5, triangles: 600 });
    expect(CORE_LIMITS).toEqual({ radius: .8, height: 1.2, triangles: 1500 });
  });
});
