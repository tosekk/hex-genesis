// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { BoardPick, BoardView, GameSession, PointerKind, SessionEvent } from '../core/contracts';
import { err, ok } from '../core/result';
import { makeTestState } from '../core/testing';
import type { GameState } from '../core/types';
import { createLegacyHud as createHud } from './legacyHud';
import { BACKLOG, TOAST_FAST_MS, TOAST_MS } from './toasts';

function setup() {
  const state: GameState = makeTestState();
  const B = Object.keys(state.config.buildings)[0];
  const listeners: ((e: SessionEvent) => void)[] = [];
  const outcome = { payouts: [], discovered: [], firstCompletion: false };
  const session = {
    get state() { return state; },
    newRun: vi.fn(),
    subscribe: (l: (e: SessionEvent) => void) => { listeners.push(l); return () => undefined; },
    chooseOffer: vi.fn(), reshuffleOffer: vi.fn(),
    placeCore: vi.fn(() => ok({ origin: 0, biome: 'forest' as const, claims: [], poolUsed: 0 })),
    placeBuilding: vi.fn((..._a: unknown[]): ReturnType<GameSession['placeBuilding']> => ok(outcome)),
    demolish: vi.fn(), preview: vi.fn(() => null), endRun: vi.fn(), advance: vi.fn(),
  };
  let pointer: ((p: BoardPick | null, k: PointerKind) => void) | null = null;
  const board = {
    setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(),
    setHighlights: vi.fn(), update: vi.fn(), resize: vi.fn(), dispose: vi.fn(),
    onPointer: (cb: typeof pointer) => { pointer = cb; return () => undefined; },
  };
  const root = document.getElementById('r')!;
  createHud(root, session as unknown as GameSession, board as unknown as BoardView);
  const emit = (e: SessionEvent) => listeners.forEach((l) => l(e));
  const key = (k: string, type: 'keydown' | 'keyup' = 'keydown', target: EventTarget = document) =>
    target.dispatchEvent(new KeyboardEvent(type, { key: k, bubbles: true }));
  const hover = (hexId: number, slot: 0 | 1 | 2 | null = null) => pointer!({ hexId, slot }, 'move');
  const click = (hexId: number, slot: 0 | 1 | 2 | null = null) => pointer!({ hexId, slot }, 'click');
  return { state, session, board, root, emit, key, hover, click, B };
}

/** Sets lastBuilt exactly like the hex panel: select a hex, click a build button. */
function panelBuild(t: ReturnType<typeof setup>, hexId: number, slot = 0) {
  t.state.hexes[hexId].biome = 'forest';
  t.click(hexId);
  const rosterBuilding = t.state.config.rosters.forest[0];
  const btns = t.root.querySelectorAll<HTMLButtonElement>('.slot')[slot].querySelectorAll<HTMLButtonElement>('.build');
  const btn = [...btns].find((b) => b.dataset.building === rosterBuilding)!;
  btn.disabled = false;
  btn.click();
  t.click(hexId); // deselect
  t.session.placeBuilding.mockClear();
  t.board.setHighlights.mockClear();
  return rosterBuilding;
}

beforeEach(() => { document.body.innerHTML = '<div id="r"></div>'; });
afterEach(() => { vi.useRealTimers(); });

describe('quick build', () => {
  it('1: no lastBuilt → Shift+click and R do nothing', () => {
    const t = setup();
    t.hover(5);
    t.key('Shift');
    t.click(5);
    t.key('r');
    expect(t.session.placeBuilding).not.toHaveBeenCalled();
  });

  it('2: after a panel placement, Shift+click uses pick.slot when empty', () => {
    const t = setup();
    const last = panelBuild(t, 7);
    t.key('Shift');
    t.click(9, 2);
    expect(t.session.placeBuilding).toHaveBeenCalledWith(9, 2, last);
  });

  it('3: occupied pick.slot → lowest empty slot; full hex → no call + invalid highlight', () => {
    const t = setup();
    const last = panelBuild(t, 7);
    t.state.hexes[9].slots[2].building = 'x';
    t.state.hexes[9].slots[0].building = 'x';
    t.key('Shift');
    t.click(9, 2);
    expect(t.session.placeBuilding).toHaveBeenCalledWith(9, 1, last);
    t.session.placeBuilding.mockClear();
    t.state.hexes[9].slots[1].building = 'x';
    t.click(9, 1);
    expect(t.session.placeBuilding).not.toHaveBeenCalled();
    expect(t.board.setHighlights).toHaveBeenCalledWith('invalid', [9]);
  });

  it('4: R uses the hovered hex; ignored while typing in an input', () => {
    const t = setup();
    const last = panelBuild(t, 7);
    t.hover(11);
    t.key('r');
    expect(t.session.placeBuilding).toHaveBeenCalledWith(11, 0, last);
    t.session.placeBuilding.mockClear();
    const input = document.createElement('input');
    document.body.appendChild(input);
    t.key('r', 'keydown', input);
    expect(t.session.placeBuilding).not.toHaveBeenCalled();
  });

  it('5: in core-placement mode, Shift+click places the core, not a building', () => {
    const t = setup();
    panelBuild(t, 7);
    t.state.coreStack.push('forest');
    t.emit({ type: 'offerResolved', biome: 'forest' });
    t.root.querySelector<HTMLButtonElement>('.core-stack .chip')!.click();
    t.key('Shift');
    t.click(40);
    expect(t.session.placeCore).toHaveBeenCalledWith(40, 0);
    expect(t.session.placeBuilding).not.toHaveBeenCalled();
  });

  it('6: failed placement → invalid highlight, lastBuilt unchanged (chip stays)', () => {
    const t = setup();
    panelBuild(t, 7);
    t.session.placeBuilding.mockReturnValueOnce(err('Insufficient resources'));
    t.key('Shift');
    t.click(9);
    expect(t.board.setHighlights).toHaveBeenCalledWith('invalid', [9]);
    expect(t.root.querySelector<HTMLElement>('.repeat-chip')!.hidden).toBe(false);
    expect(t.root.querySelector('.notice')!.textContent).toBe('Insufficient resources');
  });

  it('7: runStarted resets lastBuilt and hides the chip', () => {
    const t = setup();
    const last = panelBuild(t, 7);
    const chip = t.root.querySelector<HTMLElement>('.repeat-chip')!;
    expect(chip.hidden).toBe(false);
    expect(chip.textContent).toContain(t.state.config.buildings[last].name);
    t.emit({ type: 'runStarted', seed: 1 });
    expect(chip.hidden).toBe(true);
    t.key('Shift');
    t.click(9);
    expect(t.session.placeBuilding).not.toHaveBeenCalled();
  });

  it('quick build is a silent no-op while an offer is pending', () => {
    const t = setup();
    panelBuild(t, 7);
    t.state.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    t.key('Shift');
    t.click(9);
    t.hover(9);
    t.key('r');
    expect(t.session.placeBuilding).not.toHaveBeenCalled();
    expect(t.root.querySelector<HTMLElement>('.notice')!.hidden).toBe(true);
  });

  it('chip click clears lastBuilt', () => {
    const t = setup();
    panelBuild(t, 7);
    t.root.querySelector<HTMLButtonElement>('.repeat-chip')!.click();
    expect(t.root.querySelector<HTMLElement>('.repeat-chip')!.hidden).toBe(true);
  });

  it('8: with 6 toasts queued: still one at a time, and each is shorter', () => {
    vi.useFakeTimers();
    const t = setup();
    t.emit({ type: 'payouts', events: Array.from({ length: 6 }, (_, i) => ({ kind: 'adjacency' as const, hexId: 0, amount: { wood: i + 1 } })) });
    expect(BACKLOG).toBeLessThan(6);
    const seen: string[] = [];
    for (let i = 0; i < 3; i++) {
      expect(t.root.querySelectorAll('.toast').length).toBe(1);
      seen.push(t.root.querySelector('.toast')!.textContent!);
      vi.advanceTimersByTime(TOAST_FAST_MS);
    }
    expect(new Set(seen).size).toBe(3);
    expect(TOAST_FAST_MS).toBeLessThan(TOAST_MS);
  });
});
