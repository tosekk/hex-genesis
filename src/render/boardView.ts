import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { BoardPick, BoardView, HighlightStyle, PointerKind } from '../core/contracts';
import type { GameConfig, GameState, Hex, HexId } from '../core/types';
import { hexToWorld } from '../core/hex';
import { disposeGroup, Instances } from './instances';
import { HEX_SIZE, LAYER_HEIGHT, pickSlot, topHeight } from './layout';
import { HIGHLIGHT_COLORS, LAYER_COLOR, tileColor } from './palette';
import { NaturalTerrain } from './terrain';
import { Buildings, Cores } from './buildings';
import { sampleReveal } from './reveal';
import { addTable, Decorations } from './decorations';

export function createBoardView(container: HTMLElement, config: GameConfig): BoardView {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x292f30);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;outline:none';
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('aria-label', 'Terraforming board. Right drag or Q/E to rotate, wheel to zoom, middle drag or WASD to pan.');
  container.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 250);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.12;
  controls.minPolarAngle = 0.18; controls.maxPolarAngle = Math.PI / 2 - 0.12;
  controls.minDistance = 8; controls.maxDistance = 65;
  controls.mouseButtons = { LEFT: null as unknown as THREE.MOUSE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
  scene.add(new THREE.HemisphereLight(0xfff2dc, 0x65706c, 2.3));
  const sun = new THREE.DirectionalLight(0xffdfb4, 3.1);
  sun.position.set(-12, 25, 10); scene.add(sun);
  const fill = new THREE.DirectionalLight(0xa9d4e8, 1.1);
  fill.position.set(15, 12, -12); scene.add(fill);
  let board = new THREE.Group(); scene.add(board);
  let state: Readonly<GameState> | null = null;
  let tops: Instances | null = null;
  let natural: NaturalTerrain | null = null;
  let buildings: Buildings | null = null;
  let cores: Cores | null = null;
  let decorations: Decorations | null = null;
  let framingDistance = 0;
  const reveals = new Map<HexId, { hex: Hex; elapsed: number; swapped: boolean }>();
  const positions = new Map<HexId, { x: number; z: number }>();
  const highlights = new Map<HighlightStyle, Instances>();
  const highlightIds = new Map<HighlightStyle, HexId[]>();
  const listeners = new Set<(pick: BoardPick | null, kind: PointerKind) => void>();
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const keys = new Set<string>();
  let disposed = false;
  let press: { x: number; y: number; button: number; dragged: boolean } | null = null;

  function refreshHex(current: Readonly<GameState>, id: HexId): void {
    const hex = current.hexes[id], p = positions.get(id);
    if (!hex || !p || !tops) return;
    reveals.delete(id);
    tops.set(id, p.x, topHeight(hex.elevation) - 0.025, p.z);
    tops.color(id, tileColor(hex.biome));
    natural?.refresh(hex, p.x, p.z);
    buildings?.refresh(hex, p.x, p.z);
    decorations?.refresh(hex, p.x, p.z);
    decorations?.refreshFalls(current, id);
  }
  function playReveal(current: Readonly<GameState>, ids: HexId[]): void {
    for (const id of ids) {
      const hex = current.hexes[id];
      if (!hex || !positions.has(id)) continue;
      // Snapshot ONLY the visible biome provided now. Never inspect planned spread claims.
      reveals.set(id, { hex: { ...hex }, elapsed: 0, swapped: false });
    }
  }
  function setHighlights(style: HighlightStyle, ids: HexId[]): void {
    highlightIds.set(style, [...new Set(ids)]);
    const batch = highlights.get(style);
    if (!state || !batch) return;
    for (let id = 0; id < state.hexes.length; id++) batch.hide(id);
    const offset = ['legalCore', 'locked', 'invalid', 'selected', 'hover'].indexOf(style) * 0.007;
    for (const id of highlightIds.get(style)!) {
      const p = positions.get(id), hex = state.hexes[id];
      if (p && hex) batch.set(id, p.x, topHeight(hex.elevation) + 0.055 + offset, p.z, 1, 1, 1, -Math.PI / 2);
    }
  }
  function setBoard(current: Readonly<GameState>): void {
    scene.remove(board); disposeGroup(board);
    board = new THREE.Group(); scene.add(board); state = current;
    positions.clear(); highlights.clear(); highlightIds.clear(); reveals.clear();
    const count = current.hexes.length;
    const layers = new Instances(board, new THREE.CylinderGeometry(0.97, 0.97, LAYER_HEIGHT - 0.025, 6),
      LAYER_COLOR, current.hexes.reduce((n, h) => n + h.elevation + 1, 0));
    tops = new Instances(board, new THREE.CylinderGeometry(0.95, 0.95, 0.05, 6), 0xffffff, count);
    natural = new NaturalTerrain(board, count);
    buildings = new Buildings(board, count);
    cores = new Cores(board, count);
    decorations = new Decorations(board, count);
    let layer = 0;
    for (const hex of current.hexes) {
      const p = hexToWorld(hex.col, hex.row, HEX_SIZE); positions.set(hex.id, p);
      for (let level = 0; level <= hex.elevation; level++) {
        layers.set(layer, p.x, level * LAYER_HEIGHT + (LAYER_HEIGHT - 0.025) / 2, p.z);
        layers.color(layer++, level % 2 ? 0x70675a : LAYER_COLOR);
      }
      refreshHex(current, hex.id);
    }
    for (const style of Object.keys(HIGHLIGHT_COLORS) as HighlightStyle[]) {
      const ring = new Instances(board, new THREE.RingGeometry(0.89, 0.96, 6, 1, Math.PI / 6),
        HIGHLIGHT_COLORS[style], count, { opacity: style === 'locked' ? 0.65 : 0.9, emissive: HIGHLIGHT_COLORS[style] });
      (ring.mesh.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
      highlights.set(style, ring);
    }
    const far = hexToWorld(current.cols - 1, current.rows - 1, HEX_SIZE);
    addTable(board, far.x + 2, far.z + 2, far.x / 2, far.z / 2);
    framingDistance = 0;
    resize();
    controls.target.set(far.x / 2, 0.6, far.z / 2);
    camera.position.copy(controls.target).add(new THREE.Vector3(0.35, 0.9, 0.95).normalize().multiplyScalar(framingDistance));
    controls.update();
  }
  function pick(event: PointerEvent): BoardPick | null {
    if (!tops || !state) return null;
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObject(tops.mesh, false)[0];
    if (!hit || hit.instanceId === undefined) return null;
    const hexId = hit.instanceId;
    const centre = positions.get(hexId)!;
    return { hexId, slot: state.hexes[hexId].placeable ? pickSlot(hit.point.x - centre.x, hit.point.z - centre.z) : null };
  }
  const emit = (event: PointerEvent, kind: PointerKind) => { const value = pick(event); listeners.forEach(cb => cb(value, kind)); };
  const down = (event: PointerEvent) => {
    press = { x: event.clientX, y: event.clientY, button: event.button, dragged: false };
    renderer.domElement.focus({ preventScroll: true });
    renderer.domElement.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (press && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 5) press.dragged = true;
    emit(event, 'move');
  };
  const up = (event: PointerEvent) => {
    if (press && !press.dragged && press.button === event.button) {
      if (event.button === 0) emit(event, 'click');
      if (event.button === 2) emit(event, 'secondary');
    }
    press = null;
    if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
  };
  const cancel = () => { press = null; };
  const leave = () => { listeners.forEach(cb => cb(null, 'move')); };
  const context = (event: Event) => event.preventDefault();
  const keydown = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLElement && (event.target.matches('input,textarea,select') || event.target.isContentEditable)) return;
    const key = event.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'q', 'e'].includes(key)) { keys.add(key); event.preventDefault(); }
  };
  const keyup = (event: KeyboardEvent) => { keys.delete(event.key.toLowerCase()); };
  const blur = () => { keys.clear(); press = null; };
  renderer.domElement.addEventListener('pointerdown', down);
  renderer.domElement.addEventListener('pointermove', move);
  renderer.domElement.addEventListener('pointerup', up);
  renderer.domElement.addEventListener('pointercancel', cancel);
  renderer.domElement.addEventListener('pointerleave', leave);
  renderer.domElement.addEventListener('contextmenu', context);
  window.addEventListener('keydown', keydown); window.addEventListener('keyup', keyup); window.addEventListener('blur', blur);
  const observer = new ResizeObserver(() => resize()); observer.observe(container);
  function resize(): void {
    if (disposed) return;
    const width = Math.max(container.clientWidth, 1), height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
    if (state) {
      const far = hexToWorld(state.cols - 1, state.rows - 1, HEX_SIZE);
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const radius = Math.hypot(far.x + 4, far.z + 4) / 2 + 1;
      const distance = radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2) * 1.05;
      if (framingDistance > 0) {
        const offset = camera.position.clone().sub(controls.target).multiplyScalar(distance / framingDistance);
        camera.position.copy(controls.target).add(offset);
      }
      framingDistance = distance;
      controls.maxDistance = Math.max(65, distance * 1.5);
    }
  }
  function update(dtMs: number): void {
    if (disposed) return;
    for (const [id, reveal] of reveals) {
      reveal.elapsed += Math.max(0, dtMs);
      const tween = sampleReveal(reveal.elapsed, config.animation.tileFlipMs);
      const p = positions.get(id)!;
      tops!.set(id, p.x, topHeight(reveal.hex.elevation) - 0.025 + tween.lift, p.z, 1, 1, 1, tween.angle);
      if (tween.showTarget && !reveal.swapped) {
        reveal.swapped = true;
        tops!.color(id, tileColor(reveal.hex.biome));
        natural?.refresh(reveal.hex, p.x, p.z);
        buildings?.refresh(reveal.hex, p.x, p.z);
        decorations?.refresh(reveal.hex, p.x, p.z);
        if (state) decorations?.refreshFalls(state, id);
      }
      if (tween.finished) reveals.delete(id);
    }
    const dt = Math.min(Math.max(dtMs, 0), 100) / 1000;
    if (keys.has('q') || keys.has('e')) {
      const offset = camera.position.clone().sub(controls.target);
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), ((keys.has('q') ? 1 : 0) - (keys.has('e') ? 1 : 0)) * dt);
      camera.position.copy(controls.target).add(offset);
    }
    const forward = controls.target.clone().sub(camera.position); forward.y = 0; forward.normalize();
    const right = new THREE.Vector3(-forward.z, 0, forward.x);
    const shift = forward.multiplyScalar((Number(keys.has('w')) - Number(keys.has('s'))) * dt * 9)
      .add(right.multiplyScalar((Number(keys.has('d')) - Number(keys.has('a'))) * dt * 9));
    camera.position.add(shift); controls.target.add(shift);
    controls.update(); renderer.render(scene, camera);
  }
  resize();
  return {
    setBoard, refreshHex, setHighlights, playReveal,
    setCores(ids) { if (state) cores?.set(ids, state.hexes, positions); },
    onPointer(cb) { listeners.add(cb); return () => { listeners.delete(cb); }; },
    update, resize,
    dispose() {
      if (disposed) return; disposed = true;
      observer.disconnect(); controls.dispose(); disposeGroup(board); renderer.dispose();
      renderer.domElement.removeEventListener('pointerdown', down); renderer.domElement.removeEventListener('pointermove', move);
      renderer.domElement.removeEventListener('pointerup', up); renderer.domElement.removeEventListener('pointercancel', cancel);
      renderer.domElement.removeEventListener('pointerleave', leave); renderer.domElement.removeEventListener('contextmenu', context);
      window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup); window.removeEventListener('blur', blur);
      listeners.clear(); keys.clear(); reveals.clear(); renderer.domElement.remove();
    },
  };
}
