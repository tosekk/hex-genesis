// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createGameSession } from '../game/session';
import { legalCoreSites } from '../sim/spread/spread';
import { createBoardView } from './boardView';
import { MODEL_URLS } from './modelAssets';
import { materialHasTexture } from './materials';
import { hexToWorld } from '../core/hex';
import { HEX_SIZE, topHeight } from './layout';

// Keep real scene construction, assets, loader, controls and materials. Only the
// GPU boundary is mocked; this verifies draw inputs, not a rendered screenshot.
const { render } = vi.hoisted(() => ({ render: vi.fn() }));
vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>();
  return { ...actual, WebGLRenderer: class {
    domElement = document.createElement('canvas');
    shadowMap = { enabled: false, type: 0, autoUpdate: true, needsUpdate: false };
    setPixelRatio() {} setClearColor() {} setSize() {} dispose() {}
    render = render;
  } };
});
const cleanups: (() => void)[] = [];
afterEach(() => {
  cleanups.splice(0).reverse().forEach(off => off()); document.body.replaceChildren();
  vi.restoreAllMocks(); vi.unstubAllGlobals(); render.mockClear(); window.history.replaceState({}, '', '/');
});
function forestBoard(search = '?seed=7') {
  window.history.replaceState({}, '', `/${search}`);
  const session = createGameSession({ now: () => 0 }); session.newRun(7);
  if (!session.state.pendingOffer!.options.includes('forest')) expect(session.reshuffleOffer().ok).toBe(true);
  const forest = session.state.pendingOffer!.options.indexOf('forest'); expect(forest).toBeGreaterThanOrEqual(0);
  expect(session.chooseOffer(forest as 0 | 1).ok).toBe(true);
  const id = legalCoreSites(session.state)[0]; expect(session.placeCore(id).ok).toBe(true);
  session.advance(session.state.config.animation.spreadMaxMs);
  expect(session.state.hexes[id].biome).toBe('forest');
  const host = document.createElement('div'); document.body.append(host);
  const board = createBoardView(host, session.state.config); cleanups.push(() => board.dispose());
  board.setBoard(session.state); board.update(0);
  const scene = render.mock.calls.at(-1)![0] as THREE.Scene;
  return { board, scene, session, id };
}
function fallbackCrystal(scene: THREE.Scene): THREE.InstancedMesh {
  let found!: THREE.InstancedMesh;
  scene.traverse(object => {
    if (object instanceof THREE.InstancedMesh && object.geometry instanceof THREE.OctahedronGeometry && object.geometry.parameters.radius === .2) found = object;
  });
  expect(found).toBeDefined(); return found;
}
function matrixAt(mesh: THREE.InstancedMesh, index: number) {
  const matrix = new THREE.Matrix4(); mesh.getMatrixAt(index, matrix); return matrix;
}

describe('default-style GLB board integration', () => {
  it.each(['?seed=7', '?seed=7&style=illustrated'])('loads the supplied Forest core at %s with only the selected style material', async search => {
    const path = '/src/assets/models/core_forest.glb', url = MODEL_URLS[path]; expect(url).toBeTruthy();
    const bytes = readFileSync('src/assets/models/core_forest.glb');
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    let release!: () => void;
    const pending = new Promise<void>(resolve => { release = resolve; });
    const fetch = vi.fn(async (requested: string) => {
      if (requested !== url) return { ok: false, status: 404 };
      await pending; return { ok: true, arrayBuffer: async () => buffer };
    }); vi.stubGlobal('fetch', fetch);
    const { board, scene, session, id } = forestBoard(search);
    const stateBeforeLoad = JSON.stringify(session.state), fallback = fallbackCrystal(scene);
    expect(matrixAt(fallback, id).elements[5]).toBeCloseTo(1.65);
    release();
    await vi.waitFor(() => expect(scene.getObjectByName('core:glb:forest:0')).toBeDefined());
    expect(fetch).toHaveBeenCalledWith(url, expect.objectContaining({ signal: expect.any(AbortSignal) }));
    const model = scene.getObjectByName('core:glb:forest:0') as THREE.InstancedMesh;
    expect(model.count).toBe(1); expect(model.geometry.getAttribute('color').itemSize).toBe(3);
    expect(new Set(model.geometry.getAttribute('color').array).size).toBeGreaterThan(3);
    const material = model.material as THREE.Material;
    expect(materialHasTexture(material)).toBe(false);
    if (search.includes('illustrated')) {
      expect(material).toBeInstanceOf(THREE.ShaderMaterial); expect(material.name).toBe('illustrated-vertex-fill');
      expect(scene.getObjectByName('ink-hull')).toBeDefined();
    } else {
      expect(material).toBeInstanceOf(THREE.MeshStandardMaterial);
      expect((material as THREE.MeshStandardMaterial).vertexColors).toBe(true);
      expect((material as THREE.MeshStandardMaterial).color.getHex()).toBe(0xffffff);
      expect(scene.getObjectByName('ink-hull')).toBeUndefined();
    }
    expect(matrixAt(fallback, id).elements[0]).toBe(0);
    const hex = session.state.hexes[id], p = hexToWorld(hex.col, hex.row, HEX_SIZE), matrix = matrixAt(model, 0);
    expect(matrix.elements[12]).toBeCloseTo(p.x); expect(matrix.elements[14]).toBeCloseTo(p.z);
    expect(matrix.elements[13]).toBeCloseTo(topHeight(hex.elevation) + .018);
    expect(JSON.stringify(session.state)).toBe(stateBeforeLoad);
    board.setBoard(session.state); // Loaded geometry survives New Run/rebuild disposal of cloned instances.
    board.update(0); const rebuilt = render.mock.calls.at(-1)![0] as THREE.Scene;
    expect((rebuilt.getObjectByName('core:glb:forest:0') as THREE.InstancedMesh).count).toBe(1);
  });
  it('keeps the unchanged default procedural Forest core when the GLB is unavailable', async () => {
    const debug = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const fetch = vi.fn(async () => ({ ok: false, status: 404 })); vi.stubGlobal('fetch', fetch);
    const { scene, id, session } = forestBoard();
    await vi.waitFor(() => expect(debug).toHaveBeenCalledWith(expect.stringContaining('core_forest: procedural fallback (HTTP 404)')));
    expect(fetch).toHaveBeenCalled(); expect(scene.getObjectByName('core:glb:forest:0')).toBeUndefined();
    expect(scene.getObjectByName('ink-hull')).toBeUndefined();
    const fallback = fallbackCrystal(scene), material = fallback.material as THREE.MeshStandardMaterial;
    expect(material).toBeInstanceOf(THREE.MeshStandardMaterial); expect(material.color.getHex()).toBe(0x9cf4de);
    expect(material.emissive.getHex()).toBe(0x54aa92); expect(material.vertexColors).toBe(false);
    expect(matrixAt(fallback, id).elements[5]).toBeCloseTo(1.65);
    expect(matrixAt(fallback, id).elements[13]).toBeCloseTo(topHeight(session.state.hexes[id].elevation) + .39);
  });
});
