import * as THREE from 'three';
import type { GameState, PayoutEvent } from '../core/types';
import { hexToWorld } from '../core/hex';
import { HEX_SIZE, topHeight } from './layout';

export const MAX_PAYOUT_LABELS = 20;
export const PAYOUT_STAGGER_MS = 140;
export const PAYOUT_LIFETIME_MS = 1200;
interface FloatingLabel { element: HTMLSpanElement; point: THREE.Vector3; hexId: number; startsAt: number; riseOffset: number; }

/** Decorative projection only; the HUD owns payout announcements and game commands. */
export class PayoutLabels {
  private readonly layer = document.createElement('div');
  private readonly projected = new THREE.Vector3();
  private labels: FloatingLabel[] = [];
  private elapsed = 0;
  private nextStart = 0;
  private disposed = false;
  private state: Readonly<GameState> | null = null;

  constructor(root: HTMLElement, private readonly camera: THREE.Camera, private readonly viewport: HTMLElement = root) {
    this.layer.className = 'board-payouts';
    this.layer.setAttribute('aria-hidden', 'true');
    this.layer.style.cssText = 'position:fixed;pointer-events:none;overflow:hidden;z-index:1';
    this.layer.hidden = true;
    root.append(this.layer);
  }

  show(state: Readonly<GameState>, events: PayoutEvent[]): void {
    if (this.disposed || state.status !== 'playing') return;
    if (this.state !== null && this.state !== state) this.clear();
    this.state = state;
    for (const event of events) {
      const hex = state.hexes[event.hexId];
      if (!hex) continue;
      const resources = [...state.config.resources, ...Object.keys(event.amount).filter(id => !state.config.resources.includes(id)).sort()];
      const text = resources.filter(id => (event.amount[id] ?? 0) !== 0)
        .map(id => `${event.amount[id] > 0 ? '+' : ''}${event.amount[id]} ${id}`).join(' · ');
      if (!text) continue;
      if (this.labels.length >= MAX_PAYOUT_LABELS) {
        this.labels.shift()!.element.remove();
        // Bound the wait as well as DOM count. Preserve active ages and surviving order.
        this.labels.forEach((label, index) => { label.startsAt = Math.min(label.startsAt, this.elapsed + index * PAYOUT_STAGGER_MS); });
        this.nextStart = this.elapsed + this.labels.length * PAYOUT_STAGGER_MS;
      }
      const element = document.createElement('span');
      element.className = 'board-payout'; element.textContent = text; element.hidden = true;
      element.style.cssText = 'position:absolute;pointer-events:none;transform:translate(-50%,-100%);white-space:nowrap;padding:3px 6px;border-radius:5px;background:#24372bef;border:1px solid #afc791;color:#edf0d9;font:600 12px/1.4 system-ui,sans-serif;box-shadow:0 2px 5px #0004';
      const p = hexToWorld(hex.col, hex.row, HEX_SIZE);
      const startsAt = Math.max(this.elapsed, this.nextStart);
      this.nextStart = startsAt + PAYOUT_STAGGER_MS;
      // Separate overlapping lines from the same hex; retain their offsets while older lines expire.
      let riseOffset = 0;
      for (const label of this.labels) {
        const age = startsAt - label.startsAt;
        if (label.hexId === hex.id && age < PAYOUT_LIFETIME_MS)
          riseOffset = Math.max(riseOffset, label.riseOffset + age / PAYOUT_LIFETIME_MS * 30 + 26);
      }
      riseOffset = Math.min(riseOffset, 8 * 26);
      this.labels.push({ element, point: new THREE.Vector3(p.x, topHeight(hex.elevation) + 0.6, p.z), hexId: hex.id, startsAt, riseOffset });
      this.layer.append(element); this.layer.hidden = false;
    }
  }

  update(dtMs: number): void {
    if (this.disposed) return;
    if (this.state && this.state.status !== 'playing') { this.clear(); return; }
    this.elapsed += Math.max(0, dtMs);
    if (!this.labels.length) return;
    const rect = this.viewport.getBoundingClientRect();
    Object.assign(this.layer.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    this.camera.updateMatrixWorld();
    this.labels = this.labels.filter(label => {
      const age = this.elapsed - label.startsAt;
      if (age >= PAYOUT_LIFETIME_MS) { label.element.remove(); return false; }
      if (age < 0) return true;
      this.projected.copy(label.point).project(this.camera);
      const { x, y, z } = this.projected;
      label.element.hidden = rect.width <= 0 || rect.height <= 0 || z < -1 || z > 1 || Math.abs(x) > 1 || Math.abs(y) > 1;
      label.element.style.left = `${(x + 1) * rect.width / 2}px`;
      label.element.style.top = `${(1 - y) * rect.height / 2 - label.riseOffset - age / PAYOUT_LIFETIME_MS * 30}px`;
      label.element.style.opacity = String(Math.min(1, (1 - age / PAYOUT_LIFETIME_MS) * 3));
      return true;
    });
    if (!this.labels.length) this.layer.hidden = true;
  }

  clear(): void {
    this.labels.length = 0; this.layer.replaceChildren(); this.layer.hidden = true; this.nextStart = this.elapsed; this.state = null;
  }

  dispose(): void {
    if (this.disposed) return;
    this.clear(); this.layer.remove(); this.disposed = true;
  }
}
