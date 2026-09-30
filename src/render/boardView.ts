import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { BoardPick, BoardView, HighlightStyle, PointerKind } from '../core/contracts';
import type { GameConfig, GameState, Hex, HexId, SlotIndex } from '../core/types';
import { hexToWorld } from '../core/hex';
import { disposeGroup, Instances } from './instances';
import { HEX_SIZE, LAYER_HEIGHT, topHeight } from './layout';
import { HIGHLIGHT_COLORS, LAYER_COLOR, LAYER_ALT_COLOR, tileColor } from './palette';
import { NaturalTerrain } from './terrain';
import { Buildings, Cores } from './buildings';
import { sampleReveal } from './reveal';
import { addTable, Decorations } from './decorations';
import { createPickSurface } from './picking';
import { PayoutLabels } from './payouts';
import { waterDirections } from './water';
import { boardBounds, boundedPan, framingFor, START_DIRECTION, type BoardBounds } from './framing';
import { trackRenderer } from './diagnostics';
import { BoardEffects } from './effects';
import { installPhotoMode } from './photo';
import { SlotHighlight } from './slotHighlight';
import { isCoreHex } from '../sim/economy';
import { pickHexSlot, renderSlotPick } from './slots';
import { ModelAssets } from './modelAssets';
import { illustratedEnabled, installIllustratedStyle, type IllustratedStyle } from './materials';

export function createBoardView(container: HTMLElement, config: GameConfig): BoardView {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x292f30);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap; renderer.shadowMap.autoUpdate = false;
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;outline:none';
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('aria-label', 'Terraforming board. Right drag or Q/E to rotate, wheel to zoom, middle drag or WASD to pan.');
  container.append(renderer.domElement);
  const untrackRenderer = trackRenderer(renderer.domElement, renderer);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 250);
  const payouts = new PayoutLabels(container, camera, renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.12;
  controls.minPolarAngle = 0.18; controls.maxPolarAngle = Math.PI / 2 - 0.12;
  controls.minDistance = 8; controls.maxDistance = 65;
  controls.mouseButtons = { LEFT: null as unknown as THREE.MOUSE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
  scene.add(new THREE.HemisphereLight(0xfff4e3, 0x65706c, 2.1));
  const sun = new THREE.DirectionalLight(0xffedcf, 2.2);
  sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); sun.shadow.bias = -0.0002; sun.shadow.normalBias = 0.025;
  sun.position.set(-12, 25, 10); scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0xbad9e5, 0.8);
  fill.position.set(15, 12, -12); scene.add(fill);
  const illustrated = illustratedEnabled(window.location.search);
  const assets = illustrated ? new ModelAssets() : undefined;
  let style: IllustratedStyle | null = null;
  let board = new THREE.Group(); scene.add(board);
  let state: Readonly<GameState> | null = null;
  let tops: Instances | null = null;
  let pickSurface: THREE.InstancedMesh | null = null;
  let natural: NaturalTerrain | null = null;
  let buildings: Buildings | null = null;
  let cores: Cores | null = null;
  let decorations: Decorations | null = null;
  let effects: BoardEffects | null = null;
  let slotHighlight: SlotHighlight | null = null;
  let slotPick: { hexId: HexId; slot: SlotIndex } | null = null;
  let framingDistance = 0;
  let bounds: BoardBounds | null = null;
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
  const photo = installPhotoMode(renderer.domElement, camera, controls, () => state, () => renderer.render(scene, camera));

  function refreshHex(current: Readonly<GameState>, id: HexId): void {
    const hex = current.hexes[id], p = positions.get(id);
    if (!hex || !p || !tops) return;
    reveals.delete(id);
    tops.set(id, p.x, topHeight(hex.elevation) - 0.025, p.z);
    tops.color(id, tileColor(hex.biome));
    natural?.refresh(hex, p.x, p.z, waterDirections(current, id));
    buildings?.refresh(hex, p.x, p.z, isCoreHex(current, id));
    decorations?.refresh(hex, p.x, p.z);
    decorations?.refreshFalls(current, id);
    if (isCoreHex(current, id)) cores?.set(current.cores, current.hexes, positions);
    effects?.refresh(hex); renderer.shadowMap.needsUpdate = true;
    if (slotPick?.hexId === id) slotHighlight?.set(isCoreHex(current, id) ? null : hex, slotPick.slot);
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
    payouts.clear();
    scene.remove(board); disposeGroup(board);
    board = new THREE.Group(); scene.add(board); state = current;
    style = illustrated ? installIllustratedStyle(board) : null;
    positions.clear(); highlights.clear(); highlightIds.clear(); reveals.clear();
    slotPick = null; slotHighlight = new SlotHighlight(board);
    const count = current.hexes.length;
    const layers = new Instances(board, new THREE.CylinderGeometry(0.97, 0.97, LAYER_HEIGHT - 0.025, 6),
      LAYER_COLOR, current.hexes.reduce((n, h) => n + h.elevation + 1, 0), { castShadow: true, receiveShadow: true });
    tops = new Instances(board, new THREE.CylinderGeometry(0.95, 0.95, 0.05, 6), 0xffffff, count, { castShadow: true, receiveShadow: true });
    pickSurface = createPickSurface(board, current.hexes);
    natural = new NaturalTerrain(board, count);
    buildings = new Buildings(board, count, assets);
    cores = new Cores(board, count, assets);
    decorations = new Decorations(board, count);
    effects = new BoardEffects(board, current, window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
    let layer = 0;
    for (const hex of current.hexes) {
      const p = hexToWorld(hex.col, hex.row, HEX_SIZE); positions.set(hex.id, p);
      for (let level = 0; level <= hex.elevation; level++) {
        layers.set(layer, p.x, level * LAYER_HEIGHT + (LAYER_HEIGHT - 0.025) / 2, p.z);
        layers.color(layer++, level % 2 ? LAYER_ALT_COLOR : LAYER_COLOR);
      }
      refreshHex(current, hex.id);
    }
    for (const style of Object.keys(HIGHLIGHT_COLORS) as HighlightStyle[]) {
      const ring = new Instances(board, new THREE.RingGeometry(0.89, 0.96, 6, 1, Math.PI / 6),
        HIGHLIGHT_COLORS[style], count, { opacity: style === 'locked' ? 0.65 : 0.9, emissive: HIGHLIGHT_COLORS[style] });
      (ring.mesh.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
      highlights.set(style, ring);
    }
    bounds = boardBounds(current.hexes);
    const centreX = (bounds.minX + bounds.maxX) / 2, centreZ = (bounds.minZ + bounds.maxZ) / 2;
    addTable(board, bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ, centreX, centreZ);
    const span = Math.hypot(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ);
    sun.target.position.set(centreX, 0, centreZ); sun.position.set(centreX - span * 0.35, span * 0.8, centreZ + span * 0.25);
    Object.assign(sun.shadow.camera, { left: -span / 2 - 2, right: span / 2 + 2, top: span / 2 + 2, bottom: -span / 2 - 2, near: 0.1, far: span * 3 });
    sun.shadow.camera.updateProjectionMatrix(); renderer.shadowMap.needsUpdate = true;
    framingDistance = 0;
    resize();
    controls.target.set(centreX, bounds.maxY / 2, centreZ);
    camera.position.copy(controls.target).add(START_DIRECTION.clone().multiplyScalar(framingDistance));
    controls.update();
    cores.set(current.cores, current.hexes, positions);
    photo.reset();
  }
  const offModels = assets?.subscribe(() => {
    if (disposed || !state) return;
    // Geometry alone changes; don't reset camera, reveal animation, selection, or state.
    for (const hex of state.hexes) {
      const p = positions.get(hex.id); if (p) buildings?.refresh(hex, p.x, p.z, isCoreHex(state, hex.id));
    }
    cores?.set(state.cores, state.hexes, positions); renderer.shadowMap.needsUpdate = true;
  });
  function pick(event: PointerEvent): BoardPick | null {
    if (!pickSurface || !state) return null;
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObject(pickSurface, false)[0];
    if (!hit || hit.instanceId === undefined) return null;
    const hexId = hit.instanceId;
    const centre = positions.get(hexId)!;
    return { hexId, slot: pickHexSlot(state, hexId, hit.point.x - centre.x, hit.point.z - centre.z) };
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
    renderer.setSize(width, height, false); style?.ink.uniforms.viewport.value.set(width, height); camera.aspect = width / height; camera.updateProjectionMatrix();
    if (bounds) {
      const { distance, minDistance, maxDistance } = framingFor(bounds, camera.aspect, camera.fov);
      if (framingDistance > 0) {
        const offset = camera.position.clone().sub(controls.target).multiplyScalar(distance / framingDistance);
        camera.position.copy(controls.target).add(offset);
      }
      framingDistance = distance;
      controls.minDistance = minDistance; controls.maxDistance = maxDistance;
      camera.far = Math.max(250, maxDistance * 2.5); camera.updateProjectionMatrix();
    }
  }
  function update(dtMs: number): void {
    if (disposed) return;
    if (reveals.size) renderer.shadowMap.needsUpdate = true;
    for (const [id, reveal] of reveals) {
      reveal.elapsed += Math.max(0, dtMs);
      const tween = sampleReveal(reveal.elapsed, config.animation.tileFlipMs);
      const p = positions.get(id)!;
      tops!.set(id, p.x, topHeight(reveal.hex.elevation) - 0.025 + tween.lift, p.z, 1, 1, 1, tween.angle);
      if (slotPick?.hexId === id) slotHighlight?.set(state && isCoreHex(state, id) ? null : reveal.hex, slotPick.slot, tween.angle, tween.lift);
      if (tween.showTarget && !reveal.swapped) {
        reveal.swapped = true;
        tops!.color(id, tileColor(reveal.hex.biome));
        natural?.refresh(reveal.hex, p.x, p.z, state ? waterDirections(state, id) : []);
        buildings?.refresh(reveal.hex, p.x, p.z, state ? isCoreHex(state, id) : false);
        decorations?.refresh(reveal.hex, p.x, p.z);
        if (state) {
          decorations?.refreshFalls(state, id);
          if (isCoreHex(state, id)) cores?.set(state.cores, state.hexes, positions);
        }
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
    controls.update();
    if (bounds) {
      const target = boundedPan(controls.target, bounds);
      camera.position.x += target.x - controls.target.x; camera.position.z += target.z - controls.target.z;
      controls.target.x = target.x; controls.target.z = target.z;
    }
    effects?.update(dtMs); payouts.update(dtMs); renderer.render(scene, camera);
  }
  resize();
  return {
    setBoard, refreshHex, setHighlights, playReveal,
    setSlotHighlight(pick) {
      slotPick = renderSlotPick(state, pick);
      const reveal = slotPick ? reveals.get(slotPick.hexId) : null;
      const tween = reveal ? sampleReveal(reveal.elapsed, config.animation.tileFlipMs) : null;
      slotHighlight?.set(slotPick && state ? state.hexes[slotPick.hexId] : null, slotPick?.slot ?? null, tween?.angle ?? 0, tween?.lift ?? 0);
    },
    showPayouts(current, events) { payouts.show(current, events); },
    setCores(ids) {
      if (!state) return;
      cores?.set(ids, state.hexes, positions); effects?.setCores(ids, state);
      for (const id of ids) {
        const hex = state.hexes[id], p = positions.get(id);
        if (hex && p) buildings?.refresh(hex, p.x, p.z, true);
      }
      if (slotPick && ids.includes(slotPick.hexId)) { slotPick = null; slotHighlight?.set(null, null); }
      renderer.shadowMap.needsUpdate = true;
    },
    onPointer(cb) { listeners.add(cb); return () => { listeners.delete(cb); }; },
    update, resize,
    dispose() {
      if (disposed) return; disposed = true;
      observer.disconnect(); offModels?.(); assets?.dispose(); photo.dispose(); controls.dispose(); payouts.dispose(); disposeGroup(board); sun.shadow.dispose(); untrackRenderer(); renderer.dispose();
      renderer.domElement.removeEventListener('pointerdown', down); renderer.domElement.removeEventListener('pointermove', move);
      renderer.domElement.removeEventListener('pointerup', up); renderer.domElement.removeEventListener('pointercancel', cancel);
      renderer.domElement.removeEventListener('pointerleave', leave); renderer.domElement.removeEventListener('contextmenu', context);
      window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup); window.removeEventListener('blur', blur);
      listeners.clear(); keys.clear(); reveals.clear(); renderer.domElement.remove();
    },
  };
}
