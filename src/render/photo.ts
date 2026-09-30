import * as THREE from 'three';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { GameState } from '../core/types';
import { hexToWorld } from '../core/hex';
import { boardBounds, framingFor, START_DIRECTION } from './framing';
import { HEX_SIZE, topHeight } from './layout';

export function photoPose(state: Readonly<GameState>, preset: number, aspect: number, fov = 42) {
  const bounds = boardBounds(state.hexes);
  const target = new THREE.Vector3((bounds.minX + bounds.maxX) / 2, bounds.maxY / 2, (bounds.minZ + bounds.maxZ) / 2);
  const direction = (preset === 2 ? new THREE.Vector3(0.8, 0.42, 1) :
    preset === 4 ? new THREE.Vector3(0, 1, 0.001) : START_DIRECTION.clone()).normalize();
  const frame = framingFor(bounds, aspect, fov, direction);
  let distance = frame.distance;
  if (preset === 3) {
    const candidates = state.hexes.filter(h => h.placeable && h.biome !== null);
    // Prefer a filled hex, then the most occupied; choose the closest to the board centre on ties.
    const rank = (h: typeof state.hexes[number]) => h.slots.filter(s => s.building !== null).length;
    const centreDistance = (h: typeof state.hexes[number]) => {
      const p = hexToWorld(h.col, h.row, HEX_SIZE); return (p.x - target.x) ** 2 + (p.z - target.z) ** 2;
    };
    candidates.sort((a, b) => rank(b) - rank(a) || centreDistance(a) - centreDistance(b) || a.id - b.id);
    const hex = candidates[0];
    if (hex) {
      const p = hexToWorld(hex.col, hex.row, HEX_SIZE); target.set(p.x, topHeight(hex.elevation) + 0.35, p.z);
      distance = frame.minDistance;
    }
  }
  return { target, position: target.clone().add(direction.multiplyScalar(distance)), maxDistance: frame.maxDistance };
}

/** Centred crop: preserve the source aspect, with no stretch or title overlay. */
export function coverCrop(width: number, height: number) {
  const ratio = 630 / 500, sourceWidth = Math.min(width, height * ratio), sourceHeight = sourceWidth / ratio;
  return { x: (width - sourceWidth) / 2, y: (height - sourceHeight) / 2, width: sourceWidth, height: sourceHeight };
}

export function savePhoto(canvas: HTMLCanvasElement, cover: boolean, render: () => void, seed: number, preset: number): string {
  // WebGL's default drawing buffer is transient; read synchronously immediately after rendering.
  render();
  let output = canvas;
  if (cover) {
    output = document.createElement('canvas'); output.width = 630; output.height = 500;
    const context = output.getContext('2d'); if (!context) throw new Error('Cover export needs a 2D canvas');
    const crop = coverCrop(canvas.width, canvas.height);
    context.drawImage(canvas, crop.x, crop.y, crop.width, crop.height, 0, 0, 630, 500);
  }
  const link = document.createElement('a');
  link.download = `seed-${seed}-camera-${preset}-${cover ? 'cover-' : ''}${output.width}x${output.height}.png`;
  link.href = output.toDataURL('image/png'); document.body.append(link); link.click(); link.remove();
  return link.download;
}

export function installPhotoMode(canvas: HTMLCanvasElement, camera: THREE.PerspectiveCamera, controls: OrbitControls,
  getState: () => Readonly<GameState> | null, render: () => void, query = location.search): { reset(): void; dispose(): void } {
  if (new URLSearchParams(query).get('photo') !== '1') return { reset() {}, dispose() {} };
  let preset = 1;
  const status = document.createElement('div'); status.setAttribute('role', 'status');
  status.style.cssText = 'position:fixed;bottom:58px;right:12px;pointer-events:none;z-index:2;background:#24372bef;color:#edf0d9;padding:5px 8px;border-radius:5px;font:12px system-ui';
  status.textContent = 'Photo · F1–F4 cameras · P PNG · Shift+P cover'; canvas.parentElement?.append(status);
  const keydown = (event: KeyboardEvent) => {
    const target = event.target;
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey ||
      (target instanceof HTMLElement && (target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])') || target.isContentEditable))) return;
    const number = /^F[1-4]$/.test(event.key) ? Number(event.key.slice(1)) : null;
    if (number === null && event.key.toLowerCase() !== 'p') return;
    const state = getState(); if (!state) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (number !== null) {
      const pose = photoPose(state, number, camera.aspect, camera.fov);
      // Flush pending drag/damping before applying a precise preset.
      const damping = controls.enableDamping; controls.enableDamping = false; controls.update();
      controls.minPolarAngle = 0.001; controls.maxDistance = Math.max(controls.maxDistance, pose.maxDistance);
      controls.target.copy(pose.target); camera.position.copy(pose.position); controls.update(); controls.enableDamping = damping;
      preset = number; render(); status.textContent = `Photo · camera ${preset} · P PNG · Shift+P cover`;
    } else {
      try { status.textContent = `Saved ${savePhoto(canvas, event.shiftKey, render, state.seed, preset)}`; }
      catch (error) { status.textContent = `Photo export failed: ${String(error)}`; }
    }
  };
  window.addEventListener('keydown', keydown, true);
  return {
    reset() { preset = 1; status.textContent = 'Photo · F1–F4 cameras · P PNG · Shift+P cover'; },
    dispose() { window.removeEventListener('keydown', keydown, true); status.remove(); },
  };
}
