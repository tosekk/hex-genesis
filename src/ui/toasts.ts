import type { GameSession } from '../core/contracts';
import type { PayoutEvent } from '../core/types';
import { buildingName, cap, el, fmtResources } from './format';

export const TOAST_MS = 700;
/** Per-toast time once more than BACKLOG toasts are waiting, so the queue never lags far behind play. */
export const TOAST_FAST_MS = 250;
export const BACKLOG = 3;

export function toastText(session: GameSession, e: PayoutEvent): string {
  const cfg = session.state.config;
  const combo = e.comboId ? cfg.combos.find((c) => c.id === e.comboId)?.name ?? e.comboId : '';
  const amt = fmtResources(e.amount, true);
  switch (e.kind) {
    case 'base': {
      const b = e.slot !== undefined ? session.state.hexes[e.hexId]?.slots[e.slot]?.building : null;
      return `${b ? buildingName(cfg, b) : 'Base'} ${amt}`;
    }
    case 'pair': return `Pair combo: ${combo} ${amt}`;
    case 'triple': return `Triple combo: ${combo} ${amt}`;
    case 'adjacency': return `${cap('adjacency')} bonus ${amt}`;
  }
}

/** Display only; resources are already updated. One toast visible at a time, in order (§29 step 9, §30). */
export function createToasts(root: HTMLElement, session: GameSession) {
  const host = el('div', 'toasts');
  root.appendChild(host);
  const queue: string[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  function next(): void {
    host.replaceChildren();
    const text = queue.shift();
    if (text === undefined) { timer = null; return; }
    host.appendChild(el('div', 'toast', text));
    timer = setTimeout(next, queue.length > BACKLOG ? TOAST_FAST_MS : TOAST_MS);
  }

  return {
    push(events: PayoutEvent[]): void {
      for (const e of events) queue.push(toastText(session, e));
      if (timer === null) next();
    },
    clear(): void {
      queue.length = 0;
      if (timer !== null) clearTimeout(timer);
      timer = null;
      host.replaceChildren();
    },
    dispose(): void { this.clear(); host.remove(); },
  };
}
