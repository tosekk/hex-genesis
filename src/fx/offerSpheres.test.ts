// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { BiomeOffer } from '../core/types';
import { createOfferFx, FX_TIMING, RESOLVE_MAX_MS, type OfferFx } from './offerSpheres';

const offer = (a: BiomeOffer['options'][0], b: BiomeOffer['options'][1]): BiomeOffer => ({ options: [a, b], reshuffled: false });
const rect = (x: number, y: number) => new DOMRect(x, y, 40, 40);
const key = (k: string) => {
  const e = new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true });
  document.body.dispatchEvent(e);
  return e;
};

let root: HTMLElement;
let fx: OfferFx;
let onChoose: ReturnType<typeof vi.fn<(i: 0 | 1) => void>>;
let onReshuffle: ReturnType<typeof vi.fn<() => void>>;

function present(canReshuffle = true, o = offer('forest', 'desert'), reducedMotion = false) {
  fx = createOfferFx(root, { reducedMotion });
  fx.present({ offer: o, from: rect(1100, 600), canReshuffle, onChoose, onReshuffle });
}
const host = () => root.querySelector<HTMLElement>('.ofx');
const spheres = () => [...root.querySelectorAll<HTMLButtonElement>('.ofx-sphere')];
const reshuffle = () => root.querySelector<HTMLButtonElement>('.ofx-reshuffle')!;

beforeEach(() => {
  vi.useFakeTimers();
  root = document.createElement('div');
  document.body.appendChild(root);
  onChoose = vi.fn<(i: 0 | 1) => void>();
  onReshuffle = vi.fn<() => void>();
});
afterEach(() => {
  fx?.dispose();
  root.remove();
  vi.useRealTimers();
});

describe('offer spheres (UI_SPEC §5, §8.3)', () => {
  it('present: two biome spheres over a dialog backdrop that swallows board input', () => {
    present();
    expect(host()).not.toBeNull();
    expect(host()!.getAttribute('role')).toBe('dialog');
    expect(spheres().map((s) => s.dataset.biome)).toEqual(['forest', 'desert']);
    expect(spheres().map((s) => s.querySelector('.ofx-name')!.textContent)).toEqual(['Forest', 'Desert']);
    expect(spheres()[0].style.getPropertyValue('--c')).toMatch(/^#[0-9a-f]{6}$/);
    const behind = vi.fn();
    root.addEventListener('pointerdown', behind);
    host()!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(behind).not.toHaveBeenCalled();
    expect(document.head.querySelectorAll('style[data-owner="offer-spheres"]').length).toBe(1);
  });

  it('choose with keys 1/2: calls onChoose once, owns the key, ignores repeats until resolved', () => {
    present();
    const other = vi.fn();
    document.addEventListener('keydown', other);
    const e = key('2');
    expect(onChoose).toHaveBeenCalledWith(1);
    expect(e.defaultPrevented).toBe(true);
    expect(other).not.toHaveBeenCalled(); // no double-choose by a HUD handler
    key('1');
    spheres()[0].click();
    expect(onChoose).toHaveBeenCalledTimes(1);
    document.removeEventListener('keydown', other);
  });

  it('choose with a click on a sphere', () => {
    present();
    spheres()[0].click();
    expect(onChoose).toHaveBeenCalledWith(0);
    expect(host()!.classList.contains('busy')).toBe(true);
  });

  it('reshuffle: button calls onReshuffle; update repaints and re-enables choosing; disabled when none left', () => {
    present(true);
    reshuffle().click();
    expect(onReshuffle).toHaveBeenCalledTimes(1);
    fx.update(offer('arctic', 'arctic'), false);
    expect(spheres().map((s) => s.dataset.biome)).toEqual(['arctic', 'arctic']);
    expect(reshuffle().disabled).toBe(true);
    reshuffle().click();
    expect(onReshuffle).toHaveBeenCalledTimes(1);
    key('1');
    expect(onChoose).toHaveBeenCalledWith(0);
  });

  it('resolve: god-rays on the chosen sphere, the other one goes, then the promise settles within 1.6 s and the FX removes itself', async () => {
    present();
    key('1');
    let settled = false;
    const p = fx.resolve(0, rect(1180, 640)).then(() => { settled = true; });
    expect(spheres()[0].classList.contains('chosen')).toBe(true);
    expect(spheres()[1].classList.contains('gone')).toBe(true);
    await vi.advanceTimersByTimeAsync(FX_TIMING.rays + 10);
    expect(spheres()[0].classList.contains('flying')).toBe(true);
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(RESOLVE_MAX_MS);
    await p;
    expect(settled).toBe(true);
    expect(host()).toBeNull();
    key('2');
    expect(onChoose).toHaveBeenCalledTimes(1); // key listener removed
  });

  it('reduced motion: resolve is a simple fade that settles quickly', async () => {
    present(true, offer('desert', 'arctic'), true);
    key('2');
    const p = fx.resolve(1, null);
    expect(host()!.classList.contains('fade')).toBe(true);
    expect(spheres()[0].classList.contains('chosen')).toBe(false);
    await vi.advanceTimersByTimeAsync(FX_TIMING.fade + 5);
    await p;
    expect(host()).toBeNull();
  });

  it('hide settles a pending resolve; dispose removes the shared style', async () => {
    present();
    const p = fx.resolve(0, null);
    fx.hide();
    await p;
    expect(host()).toBeNull();
    fx.dispose();
    expect(document.head.querySelector('style[data-owner="offer-spheres"]')).toBeNull();
    await expect(fx.resolve(0, null)).resolves.toBeUndefined();
  });
});
