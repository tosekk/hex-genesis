// @vitest-environment happy-dom
import * as THREE from 'three';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { makeTestState } from '../core/testing';
import type { PayoutEvent } from '../core/types';
import { PayoutLabels, MAX_PAYOUT_LABELS, PAYOUT_LIFETIME_MS, PAYOUT_STAGGER_MS } from './payouts';

const disposals: (() => void)[] = [];
afterEach(() => { disposals.splice(0).forEach(dispose => dispose()); document.body.replaceChildren(); vi.restoreAllMocks(); });
function setup() {
  const root = document.createElement('div'); document.body.append(root);
  vi.spyOn(root, 'getBoundingClientRect').mockReturnValue(new DOMRect(20, 30, 800, 600));
  const camera = new THREE.PerspectiveCamera(42, 4 / 3, 0.1, 100);
  camera.position.set(0, 8, 8); camera.lookAt(0, 0, 0); camera.updateMatrixWorld(true);
  const labels = new PayoutLabels(root, camera); disposals.push(() => labels.dispose());
  return { root, camera, labels, state: makeTestState({ cols: 2, rows: 1 }) };
}
const events: PayoutEvent[] = [
  { kind: 'base', hexId: 0, amount: { wood: 4 } },
  { kind: 'pair', hexId: 0, amount: { food: 2, wood: 3 } },
  { kind: 'adjacency', hexId: 1, neighborId: 0, amount: { stone: 1, water: 1 } },
];

describe('floating board payouts', () => {
  it('starts one label per event in resolution order, including across calls, without changing state or events', () => {
    const s = setup(); const stateBefore = structuredClone(s.state), eventsBefore = structuredClone(events);
    s.labels.show(s.state, events.slice(0, 2)); s.labels.show(s.state, events.slice(2));
    s.labels.update(0);
    const rows = [...s.root.querySelectorAll<HTMLElement>('.board-payout')];
    expect(rows.map(row => row.textContent)).toEqual(['+4 wood', '+3 wood · +2 food', '+1 stone · +1 water']);
    expect(rows.map(row => row.hidden)).toEqual([false, true, true]);
    s.labels.update(PAYOUT_STAGGER_MS);
    expect(rows.map(row => row.hidden)).toEqual([false, false, true]);
    expect(parseFloat(rows[0].style.top) - parseFloat(rows[1].style.top)).toBeGreaterThanOrEqual(26);
    s.labels.update(PAYOUT_STAGGER_MS);
    expect(rows.every(row => !row.hidden)).toBe(true);
    expect(s.state).toEqual(stateBefore); expect(events).toEqual(eventsBefore);
    expect(s.root.querySelector('.board-payouts')!.getAttribute('aria-hidden')).toBe('true');
  });
  it('rises, follows the camera, expires and starts a new transaction immediately after the queue drains', () => {
    const s = setup(); s.labels.show(s.state, [events[0]]); s.labels.update(0);
    const row = s.root.querySelector<HTMLElement>('.board-payout')!;
    const startY = parseFloat(row.style.top), startX = parseFloat(row.style.left);
    s.labels.update(PAYOUT_LIFETIME_MS / 2);
    expect(parseFloat(row.style.top)).toBeLessThan(startY);
    s.camera.position.x = 2;
    s.camera.lookAt(2, 0, 0); s.camera.updateMatrixWorld(true); s.labels.update(0);
    expect(parseFloat(row.style.left)).not.toBeCloseTo(startX);
    s.labels.update(PAYOUT_LIFETIME_MS / 2);
    expect(s.root.querySelectorAll('.board-payout')).toHaveLength(0);
    s.labels.show(s.state, [events[1]]); s.labels.update(0);
    expect(s.root.querySelector<HTMLElement>('.board-payout')!.hidden).toBe(false);
  });
  it('bounds rapid-build backlog and drains it within four seconds while retaining newest order', () => {
    const s = setup();
    s.labels.show(s.state, Array.from({ length: 207 }, (_, index) => ({ kind: 'base', hexId: 0, amount: { wood: index + 1 } })));
    const rows = [...s.root.querySelectorAll('.board-payout')];
    expect(rows).toHaveLength(MAX_PAYOUT_LABELS); expect(rows[0].textContent).toBe('+188 wood'); expect(rows.at(-1)!.textContent).toBe('+207 wood');
    s.labels.update(MAX_PAYOUT_LABELS * PAYOUT_STAGGER_MS + PAYOUT_LIFETIME_MS);
    expect(s.root.querySelectorAll('.board-payout')).toHaveLength(0);
  });
  it('clears queued/active payouts when the run ends and ignores late ended-run payouts', () => {
    const s = setup(); s.labels.show(s.state, events); s.labels.update(0);
    s.state.status = 'won'; s.labels.update(0); expect(s.root.querySelectorAll('.board-payout')).toHaveLength(0);
    s.labels.show(s.state, events); expect(s.root.querySelectorAll('.board-payout')).toHaveLength(0);
    s.state.status = 'playing'; s.labels.show(s.state, [events[0]]); s.labels.update(0);
    expect(s.root.querySelector<HTMLElement>('.board-payout')!.hidden).toBe(false);
  });
  it('ignores empty or missing-hex events, clips off-screen labels, and clears on rebuild/disposal', () => {
    const s = setup();
    s.labels.show(s.state, [{ kind: 'base', hexId: 99, amount: { wood: 4 } }, { kind: 'base', hexId: 0, amount: { wood: 0 } }]);
    expect(s.root.querySelectorAll('.board-payout')).toHaveLength(0);
    s.labels.show(s.state, [events[0]]);
    s.camera.lookAt(100, 0, 0); s.camera.updateMatrixWorld(true); s.labels.update(0);
    expect(s.root.querySelector<HTMLElement>('.board-payout')!.hidden).toBe(true);
    s.labels.clear(); expect(s.root.querySelectorAll('.board-payout')).toHaveLength(0);
    s.labels.show(s.state, [events[0]]); s.labels.dispose(); s.labels.dispose();
    s.labels.show(s.state, [events[1]]); s.labels.update(100);
    expect(s.root.children).toHaveLength(0);
  });
});
