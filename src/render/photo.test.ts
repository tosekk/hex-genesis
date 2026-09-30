// @vitest-environment happy-dom
import * as THREE from 'three';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { makeTestState } from '../core/testing';
import { hexToWorld } from '../core/hex';
import { boardBounds } from './framing';
import { coverCrop, installPhotoMode, photoPose, savePhoto } from './photo';

afterEach(() => { document.body.replaceChildren(); vi.restoreAllMocks(); });
describe('photo camera presets', () => {
  it.each([[20, 14], [30, 20]])('fits the overview, low and top views on %i×%i without changing state', (cols, rows) => {
    const state = makeTestState({ cols, rows, hex: () => ({ terrain: 'mountain', elevation: 4 }) }), before = structuredClone(state);
    const bounds = boardBounds(state.hexes);
    for (const preset of [1, 2, 4]) for (const aspect of [16 / 9, 0.6]) {
      const pose = photoPose(state, preset, aspect), camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 500);
      camera.position.copy(pose.position); camera.lookAt(pose.target); camera.updateMatrixWorld(true);
      for (const x of [bounds.minX, bounds.maxX]) for (const y of [0, bounds.maxY]) for (const z of [bounds.minZ, bounds.maxZ]) {
        const p = new THREE.Vector3(x, y, z).project(camera);
        expect(Math.abs(p.x)).toBeLessThan(1); expect(Math.abs(p.y)).toBeLessThan(1);
      }
    }
    expect(state).toEqual(before);
  });
  it('focuses a filled hex before a central partly-filled one; safely falls back on a dead board', () => {
    const state = makeTestState({ cols: 6, rows: 4 });
    state.hexes[0].biome = 'forest'; state.hexes[0].slots.forEach(s => { s.building = 'sawmill'; });
    state.hexes[14].biome = 'forest'; state.hexes[14].slots[0].building = 'sawmill';
    const pose = photoPose(state, 3, 16 / 9), p = hexToWorld(0, 0, 1);
    expect(pose.target.x).toBe(p.x); expect(pose.target.z).toBe(p.z);
    const dead = makeTestState({ cols: 6, rows: 4 });
    expect(photoPose(dead, 3, 16 / 9)).toEqual(photoPose(dead, 1, 16 / 9));
  });
});

describe('photo export and input isolation', () => {
  it('centre-crops wide or tall canvases to 630:500 without stretching', () => {
    const wide = coverCrop(1280, 720); expect(wide.x).toBeCloseTo(186.4); expect(wide.y).toBe(0);
    expect(wide.width).toBeCloseTo(907.2); expect(wide.height).toBe(720);
    const tall = coverCrop(500, 900);
    expect(tall.x).toBe(0); expect(tall.y).toBeGreaterThan(0); expect(tall.width / tall.height).toBeCloseTo(630 / 500);
  });
  it('renders before reading the drawing buffer; exports exact canvas or cover dimensions and removes its link', () => {
    const canvas = document.createElement('canvas'); canvas.width = 2560; canvas.height = 1440;
    const calls: string[] = [], drawImage = vi.fn();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockImplementation(function (this: HTMLCanvasElement) { calls.push(`png:${this.width}x${this.height}`); return 'data:image/png;base64,QA'; });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { calls.push('download'); });
    expect(savePhoto(canvas, false, () => calls.push('render'), 7, 2)).toBe('seed-7-camera-2-2560x1440.png');
    expect(calls).toEqual(['render', 'png:2560x1440', 'download']); calls.length = 0;
    expect(savePhoto(canvas, true, () => calls.push('render'), 7, 3)).toBe('seed-7-camera-3-cover-630x500.png');
    expect(calls).toEqual(['render', 'png:630x500', 'download']); expect(drawImage.mock.calls[0].slice(-4)).toEqual([0, 0, 630, 500]);
    expect(click).toHaveBeenCalledTimes(2); expect(document.querySelector('a')).toBeNull();
  });
  it('is opt-in; ignores offer keys, typing, modifiers and repeats; intercepts only photo keys and disposes', () => {
    const canvas = document.createElement('canvas'); document.body.append(canvas);
    const camera = new THREE.PerspectiveCamera(42, 16 / 9), render = vi.fn();
    const controls = { target: new THREE.Vector3(), update: vi.fn(), enableDamping: true, minPolarAngle: 0.18, maxDistance: 65 } as unknown as OrbitControls;
    const state = makeTestState();
    const key = (k: string, options: KeyboardEventInit = {}, target: EventTarget = window) => {
      const e = new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...options }); target.dispatchEvent(e); return e;
    };
    const off = installPhotoMode(canvas, camera, controls, () => state, render, '?photo=0');
    expect(key('F1').defaultPrevented).toBe(false); expect(render).not.toHaveBeenCalled(); off.dispose();
    const photo = installPhotoMode(canvas, camera, controls, () => state, render, '?photo=1');
    for (const k of ['1', '2', 'q', 'r']) expect(key(k).defaultPrevented).toBe(false);
    const input = document.createElement('input'); document.body.append(input);
    expect(key('p', {}, input).defaultPrevented).toBe(false);
    expect(key('p', { ctrlKey: true }).defaultPrevented).toBe(false);
    expect(key('F2', { repeat: true }).defaultPrevented).toBe(false);
    expect(key('F4').defaultPrevented).toBe(true); expect(render).toHaveBeenCalledTimes(1);
    expect(controls.enableDamping).toBe(true); expect(camera.position.y).toBeGreaterThan(camera.position.z);
    photo.reset(); expect(document.querySelector('[role=status]')?.textContent).toContain('F1–F4');
    photo.dispose(); expect(document.querySelector('[role=status]')).toBeNull();
    expect(key('F1').defaultPrevented).toBe(false);
  });
});
