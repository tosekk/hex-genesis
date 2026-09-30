// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { BoardPick, BoardView, PointerKind } from '../../core/contracts';
import { createGameSession } from '../../game/session';
import { createJournalHud } from './journalHud';

const disposals: (() => void)[] = [];
afterEach(() => { disposals.splice(0).forEach(off => off()); document.body.replaceChildren(); vi.useRealTimers(); });
export function fixture(startBefore = false) {
  const session = createGameSession({ now: () => 0 });
  let pointer: ((pick: BoardPick | null, kind: PointerKind) => void) | null = null;
  const board: BoardView = { setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(),
    setHighlights: vi.fn(), update: vi.fn(), resize: vi.fn(), dispose: vi.fn(),
    onPointer(cb) { pointer = cb; return () => { pointer = null; }; } };
  const root = document.createElement('div'); root.id = 'ui'; document.body.append(root);
  if (startBefore) session.newRun(1);
  const hud = createJournalHud(root, session, board); disposals.push(() => hud.dispose());
  if (!startBefore) session.newRun(1);
  return { root, session, board, hud, pointer: (pick: BoardPick | null, kind: PointerKind = 'click') => pointer?.(pick, kind),
    click: (selector: string) => root.querySelector<HTMLButtonElement>(selector)!.click() };
}

describe('journal HUD opening offer', () => {
  it('does not open help over offers, then opens and closes via H, Escape and the menu', () => {
    const s = fixture();
    const help = s.root.querySelector<HTMLElement>('.help-overlay')!;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', bubbles: true }));
    expect(help.hidden).toBe(true);
    s.click('.offer-overlay [data-index="0"]');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '?', bubbles: true }));
    expect(help.hidden).toBe(false);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); expect(help.hidden).toBe(true);
    s.click('.menu-btn'); s.click('.menu-help'); expect(help.hidden).toBe(false);
    s.click('.help-close'); expect(help.hidden).toBe(true);
    expect(s.root.querySelector('.help-btn')).toBeNull();
  });
  it('shows the real first offer above help, resolves by key 1, and restores a later offer', () => {
    const s = fixture();
    expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(false);
    expect(s.root.querySelector<HTMLElement>('.help-overlay')!.hidden).toBe(true);
    const first = s.session.state.pendingOffer!.options[0];
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '1', bubbles: true }));
    expect(s.session.state.pendingOffer).toBeNull(); expect(s.session.state.coreStack).toContain(first);
    expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(true);
    s.session.newRun(7);
    expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(false);
  });
  it('recovers an already-pending offer, reshuffles once and resolves the second card by click', () => {
    const s = fixture(true);
    expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(false);
    s.click('.reshuffle'); expect(s.session.state.reshufflesUsed).toBe(1);
    expect(s.root.querySelector<HTMLButtonElement>('.reshuffle')!.disabled).toBe(true);
    const chosen = s.session.state.pendingOffer!.options[1]; s.click('.offer-overlay [data-index="1"]');
    expect(s.session.state.pendingOffer).toBeNull(); expect(s.session.state.coreStack).toContain(chosen);
  });
});
