// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { BoardPick, BoardView, GameSession, PointerKind, SessionEvent } from '../core/contracts';
import { ok } from '../core/result';
import { makeTestState } from '../core/testing';
import type { GameState } from '../core/types';
import { createLegacyHud as createHud } from './legacyHud';
import { emptySlotSummary } from './winProgress';

/** 4×4 board: hexes 0..15 terraformed; everything else dead. */
function setup() {
  const state: GameState = makeTestState({ hex: (c, r) => (c < 4 && r < 4 ? { biome: 'forest' } : {}) });
  const listeners: ((e: SessionEvent) => void)[] = [];
  const session = {
    get state() { return state; },
    newRun: vi.fn(), subscribe: (l: (e: SessionEvent) => void) => { listeners.push(l); return () => undefined; },
    chooseOffer: vi.fn(), reshuffleOffer: vi.fn(), placeCore: vi.fn(() => ok({ origin: 0, biome: 'forest' as const, claims: [], poolUsed: 0 })),
    placeBuilding: vi.fn(), demolish: vi.fn(), preview: vi.fn(() => null), endRun: vi.fn(), advance: vi.fn(),
  };
  let pointer: ((p: BoardPick | null, k: PointerKind) => void) | null = null;
  const board = {
    setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(), setHighlights: vi.fn(),
    update: vi.fn(), resize: vi.fn(), dispose: vi.fn(),
    onPointer: (cb: typeof pointer) => { pointer = cb; return () => undefined; },
  };
  const root = document.getElementById('r')!;
  createHud(root, session as unknown as GameSession, board as unknown as BoardView);
  const emit = (e: SessionEvent) => listeners.forEach((l) => l(e));
  const key = (k: string, type: 'keydown' | 'keyup' = 'keydown') => document.dispatchEvent(new KeyboardEvent(type, { key: k, bubbles: true, cancelable: true }));
  const lastSelected = () => board.setHighlights.mock.calls.filter((c) => c[0] === 'selected').at(-1)?.[1] as number[] | undefined;
  const text = (sel: string) => root.querySelector(sel)!.textContent!;
  return { state, session, board, root, emit, key, lastSelected, text, click: (id: number) => pointer!({ hexId: id, slot: null }, 'click') };
}

beforeEach(() => { document.body.innerHTML = '<div id="r"></div>'; });

describe('win progress counters', () => {
  it('counts empty slots, tiles and legal core sites from state', () => {
    const t = setup();
    // Fill every slot on the terraformed tiles except two slots on one of them.
    const ids = t.state.hexes.filter((h) => h.biome !== null).map((h) => h.id);
    for (const id of ids) for (const s of t.state.hexes[id].slots) s.building = 'x';
    const target = ids[5];
    t.state.hexes[target].slots[0].building = null;
    t.state.hexes[target].slots[2].building = null;
    t.emit({ type: 'hexChanged', hexId: target });
    expect(emptySlotSummary(t.state)).toEqual({ hexes: [target], slots: 2, total: ids.length * 3 });
    expect(t.text('.wp-empty')).toContain(`Slots left: 2 of ${ids.length * 3}`);
    expect(t.text('.wp-row')).toMatch(/Legal core sites: \d+/);
    expect(t.root.querySelector('.win-progress')!.getAttribute('title')).toContain('reach the final threshold');
  });

  it('shows "Spread active" only while a spread is running', () => {
    const t = setup();
    const spread = t.root.querySelector<HTMLElement>('.wp-spread')!;
    expect(spread.hidden).toBe(true);
    t.state.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    t.emit({ type: 'spreadStarted', result: t.state.activeSpread.result });
    expect(spread.hidden).toBe(false);
    t.state.activeSpread = null;
    t.emit({ type: 'spreadFinished' });
    expect(spread.hidden).toBe(true);
  });
});

describe('goal line and end screen (S8)', () => {
  it('goal line shows the final threshold and progress', () => {
    const t = setup();
    const n = t.state.config.thresholds.length;
    expect(t.text('.wp-goal')).toBe(`Goal: reach threshold ${n} · now 0/${n}`);
    t.state.thresholdIndex = 3;
    t.emit({ type: 'resourcesChanged' });
    expect(t.text('.wp-goal')).toBe(`Goal: reach threshold ${n} · now 3/${n}`);
  });

  it('end screen: win shows thresholds reached and board used', () => {
    const t = setup();
    const n = t.state.config.thresholds.length;
    t.state.thresholdIndex = n;
    for (const s of t.state.hexes[0].slots) s.building = 'x'; // 3 of 48 slots used
    t.emit({ type: 'runEnded', status: 'won', stats: { status: 'won', lifetime: { wood: 9 }, elapsedMs: 61000, seed: 7 } });
    const box = t.text('.end-screen');
    expect(box).toContain('Planet terraformed!');
    expect(box).toContain(`Thresholds reached: ${n}/${n}`);
    expect(box).toContain('Board used: 3/48 slots (6%)');
    expect(box).toContain('Wood: 9');
    expect(box).toContain('1:01');
    expect(box).toContain('Seed: 7');
  });

  it('end screen: a loss reads "Out of room"', () => {
    const t = setup();
    t.state.thresholdIndex = 2;
    t.emit({ type: 'runEnded', status: 'lost', stats: { status: 'lost', lifetime: {}, elapsedMs: 0, seed: 1 } });
    const box = t.text('.end-screen');
    expect(box).toContain('Out of room');
    expect(box).toContain(`Thresholds reached: 2/${t.state.config.thresholds.length}`);
  });
});

describe('empty-slot finder', () => {
  it('holding Tab highlights tiles with an empty slot; release clears', () => {
    const t = setup();
    const expected = emptySlotSummary(t.state).hexes;
    expect(expected.length).toBe(16);
    t.key('Tab');
    expect(t.lastSelected()).toEqual(expected);
    t.board.setHighlights.mockClear();
    t.key('Tab'); // key-repeat while held: no churn
    expect(t.board.setHighlights).not.toHaveBeenCalled();
    t.key('Tab', 'keyup');
    expect(t.lastSelected()).toEqual([]);
  });

  it('clicking the counter toggles the highlight', () => {
    const t = setup();
    const btn = t.root.querySelector<HTMLButtonElement>('.wp-empty')!;
    btn.click();
    expect(t.lastSelected()!.length).toBe(16);
    btn.click();
    expect(t.lastSelected()).toEqual([]);
  });

  it('a filled tile drops out of the highlight', () => {
    const t = setup();
    const id = emptySlotSummary(t.state).hexes[0];
    for (const s of t.state.hexes[id].slots) s.building = 'x';
    t.emit({ type: 'hexChanged', hexId: id });
    t.key('Tab');
    expect(t.lastSelected()).not.toContain(id);
    expect(t.lastSelected()!.length).toBe(15);
  });

  it('does not highlight during core-placement mode, and does not fight the legalCore highlights', () => {
    const t = setup();
    t.state.coreStack.push('forest');
    t.emit({ type: 'offerResolved', biome: 'forest' });
    t.root.querySelector<HTMLButtonElement>('.core-stack .chip')!.click(); // enter placement mode
    t.board.setHighlights.mockClear();
    t.key('Tab');
    expect(t.board.setHighlights.mock.calls.filter((c) => c[0] === 'selected')).toHaveLength(0);
    expect(t.board.setHighlights.mock.calls.filter((c) => c[0] === 'legalCore')).toHaveLength(0);
    t.key('Tab', 'keyup');
  });

  it('entering placement mode while the finder is on clears it', () => {
    const t = setup();
    t.state.coreStack.push('forest');
    t.emit({ type: 'offerResolved', biome: 'forest' });
    t.key('Tab');
    expect(t.lastSelected()!.length).toBe(16);
    t.root.querySelector<HTMLButtonElement>('.core-stack .chip')!.click();
    expect(t.lastSelected()).toEqual([]);
  });

  it('keeps the selected tile highlighted alongside the finder', () => {
    const t = setup();
    const id = 3;
    for (const s of t.state.hexes[id].slots) s.building = 'x';
    t.click(id); // select a full tile
    t.key('Tab');
    expect(t.lastSelected()).toContain(id);
    t.key('Tab', 'keyup');
    expect(t.lastSelected()).toEqual([id]);
  });

  it('help overlay documents the finder and the win rule', () => {
    const t = setup();
    const help = t.root.querySelector('.help-overlay')!.textContent!;
    expect(help).toContain('Hold Tab');
    expect(help).toContain('Reach the final threshold before you run out of room. Every slot and combo pays only once.');
  });
});
