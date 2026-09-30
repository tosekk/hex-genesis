// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { BoardPick, BoardView, GameSession, PointerKind, SessionEvent } from '../core/contracts';
import { ok } from '../core/result';
import { makeTestState } from '../core/testing';
import type { GameState, PlacementPreview } from '../core/types';
import { createHud } from './hud';
import { renderPreview } from './preview';
import { TOAST_MS } from './toasts';

function fakes(opts: Parameters<typeof makeTestState>[0] = {}) {
  const state: GameState = makeTestState(opts);
  const listeners: ((e: SessionEvent) => void)[] = [];
  const session = {
    get state() { return state; },
    newRun: vi.fn(),
    subscribe: (l: (e: SessionEvent) => void) => { listeners.push(l); return () => undefined; },
    chooseOffer: vi.fn(() => ok('forest' as const)),
    reshuffleOffer: vi.fn(),
    placeCore: vi.fn((): ReturnType<GameSession['placeCore']> => ok({ origin: 0, biome: 'forest', claims: [], poolUsed: 0 })),
    placeBuilding: vi.fn(), demolish: vi.fn(), preview: vi.fn(() => null), endRun: vi.fn(), advance: vi.fn(),
  };
  let pointer: ((p: BoardPick | null, k: PointerKind) => void) | null = null;
  const board = {
    setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(),
    setHighlights: vi.fn(), update: vi.fn(), resize: vi.fn(), dispose: vi.fn(),
    onPointer: (cb: typeof pointer) => { pointer = cb; return () => undefined; },
  };
  const emit = (e: SessionEvent) => listeners.forEach((l) => l(e));
  const click = (hexId: number) => pointer!({ hexId, slot: null }, 'click');
  const move = (hexId: number) => pointer!({ hexId, slot: null }, 'move');
  return { move, state, session: session as unknown as GameSession & typeof session, board: board as unknown as BoardView & typeof board, emit, click };
}

let root: HTMLElement;
beforeEach(() => { document.body.innerHTML = '<div id="r"></div>'; root = document.getElementById('r')!; });
afterEach(() => { vi.useRealTimers(); });

describe('HUD', () => {
  it('1: offer modal on offerShown; card click chooses the right index', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    expect(root.querySelector('.offer-overlay')!.hasAttribute('hidden')).toBe(true);
    f.state.pendingOffer = { options: ['desert', 'arctic'], reshuffled: false };
    f.emit({ type: 'offerShown', offer: f.state.pendingOffer });
    const cards = root.querySelectorAll<HTMLButtonElement>('.card');
    expect(cards.length).toBe(2);
    expect(cards[1].textContent).toContain('Arctic');
    cards[1].click();
    expect(f.session.chooseOffer).toHaveBeenCalledWith(1);
    cards[0].click();
    expect(f.session.chooseOffer).toHaveBeenLastCalledWith(0);
  });

  it('keys 1/2 pick an offer only while the modal is open', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    expect(f.session.chooseOffer).not.toHaveBeenCalled();
    f.state.pendingOffer = { options: ['desert', 'arctic'], reshuffled: false };
    f.emit({ type: 'offerShown', offer: f.state.pendingOffer });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));
    expect(f.session.chooseOffer).toHaveBeenCalledWith(1);
  });

  it('tooltip shows only when hovering a locked tile', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    const tip = root.querySelector<HTMLElement>('.tooltip')!;
    f.state.activeSpread = { result: { origin: 5, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: { 5: true } };
    f.move(5);
    expect(tip.hidden).toBe(false);
    f.move(6);
    expect(tip.hidden).toBe(true);
  });

  it('reshuffle is disabled once used up', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    f.state.reshufflesUsed = f.state.config.reshufflesPerRun;
    f.state.pendingOffer = { options: ['desert', 'arctic'], reshuffled: true };
    f.emit({ type: 'offerShown', offer: f.state.pendingOffer });
    expect(root.querySelector<HTMLButtonElement>('.reshuffle')!.disabled).toBe(true);
  });

  it('2: three payouts render one toast at a time, in order', () => {
    vi.useFakeTimers();
    const f = fakes();
    createHud(root, f.session, f.board);
    f.emit({ type: 'payouts', events: [
      { kind: 'pair', hexId: 0, amount: { wood: 1 }, comboId: 'hutPair' },
      { kind: 'adjacency', hexId: 0, amount: { wood: 2 } },
      { kind: 'triple', hexId: 0, amount: { stone: 3 }, comboId: 'hutPair' },
    ] });
    const texts: string[] = [];
    for (let i = 0; i < 3; i++) {
      const toasts = root.querySelectorAll('.toast');
      expect(toasts.length).toBe(1);
      texts.push(toasts[0].textContent!);
      vi.advanceTimersByTime(TOAST_MS);
    }
    expect(texts[0]).toMatch(/^Pair combo/);
    expect(texts[1]).toMatch(/^Adjacency/);
    expect(texts[2]).toMatch(/^Triple combo/);
    expect(root.querySelectorAll('.toast').length).toBe(0);
  });

  it('3: preview renders only the combos in the object', () => {
    const f = fakes();
    const box = document.createElement('div');
    const p: PlacementPreview = {
      cost: { wood: 2 }, affordable: true, slotAlreadyPaid: false, base: { wood: 3 },
      baseBreakdown: { raw: { wood: 3 }, terrain: {}, zone: {} },
      combos: [{ match: { comboId: 'hutPair', pair: 0 }, amount: { wood: 2 } }],
    };
    const combo = f.state.config.combos[0];
    p.combos[0].match.comboId = combo.id;
    renderPreview(box, p, f.state.config);
    expect(box.querySelectorAll('.pv-combo').length).toBe(1);
    expect(box.textContent).toContain(combo.name);
    renderPreview(box, { ...p, combos: [] }, f.state.config);
    expect(box.querySelectorAll('.pv-combo').length).toBe(0);
    expect(box.textContent).not.toContain(combo.name);
  });

  it('4: core placement highlights legal sites, places on click, Esc cancels', () => {
    const f = fakes();
    f.state.coreStack.push('forest');
    createHud(root, f.session, f.board);
    root.querySelector<HTMLButtonElement>('.chip')!.click();
    const legal = f.board.setHighlights.mock.calls.filter((c) => c[0] === 'legalCore').at(-1)![1] as number[];
    expect(legal.length).toBe(20 * 14);
    f.click(45);
    expect(f.session.placeCore).toHaveBeenCalledWith(45, 0);
    expect(f.board.setHighlights).toHaveBeenLastCalledWith('selected', []);

    root.querySelector<HTMLButtonElement>('.chip')!.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(f.board.setHighlights).toHaveBeenLastCalledWith('legalCore', []);
    f.session.placeCore.mockClear();
    f.click(46);
    expect(f.session.placeCore).not.toHaveBeenCalled();
  });

  it('5: end screen shows lifetime, time, seed', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    f.emit({ type: 'runEnded', status: 'won', stats: { status: 'won', lifetime: { wood: 12, stone: 4 }, elapsedMs: 125000, seed: 777 } });
    const t = root.querySelector('.end-screen')!.textContent!;
    expect(t).toContain('Wood: 12');
    expect(t).toContain('Stone: 4');
    expect(t).toContain('2:05');
    expect(t).toContain('777');
    root.querySelector<HTMLInputElement>('.seed-input')!.value = '42';
    root.querySelector<HTMLButtonElement>('.new-run')!.click();
    expect(f.session.newRun).toHaveBeenCalledWith(42);
  });

  it('runEnded closes the hex panel so no live Demolish buttons remain behind the end screen', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    f.click(5);
    expect(root.querySelector<HTMLElement>('.hex-panel')!.hidden).toBe(false);
    f.emit({ type: 'runEnded', status: 'won', stats: { status: 'won', lifetime: {}, elapsedMs: 0, seed: 1 } });
    expect(root.querySelector<HTMLElement>('.hex-panel')!.hidden).toBe(true);
    expect(root.querySelectorAll('.demolish').length).toBe(0);
    expect(f.board.setHighlights).toHaveBeenCalledWith('selected', []);
  });

  it('New Run updates ?seed= in the URL (typed and random seeds)', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    f.emit({ type: 'runEnded', status: 'ended', stats: { status: 'ended', lifetime: {}, elapsedMs: 0, seed: 1 } });
    const input = root.querySelector<HTMLInputElement>('.seed-input')!;
    input.value = '4242';
    root.querySelector<HTMLButtonElement>('.new-run')!.click();
    expect(new URLSearchParams(location.search).get('seed')).toBe('4242');
    input.value = '';
    root.querySelector<HTMLButtonElement>('.new-run')!.click();
    const seed = f.session.newRun.mock.calls.at(-1)![0] as number;
    expect(new URLSearchParams(location.search).get('seed')).toBe(String(seed));
  });

  it('codex lists only discovered combos with recipe chips and reward', () => {
    const f = fakes();
    const [a, b] = f.state.config.combos;
    createHud(root, f.session, f.board);
    expect(root.querySelectorAll('.codex-row').length).toBe(0);
    f.state.discoveredCombos.push(a.id);
    f.emit({ type: 'combosDiscovered', comboIds: [a.id] });
    expect(root.querySelectorAll('.codex-row').length).toBe(1);
    expect(root.querySelector('.codex-name')!.textContent).toBe(a.name);
    expect(root.querySelectorAll('.codex-chip').length).toBe(a.buildings.length);
    expect(root.querySelector('.codex')!.textContent).not.toContain(b.name);
  });

  it('resource bar shows per-resource lifetime progress toward the threshold', () => {
    const f = fakes({ config: { thresholds: [{ wood: 10, stone: 6 }] } });
    f.state.lifetime = { wood: 4, stone: 9 };
    createHud(root, f.session, f.board);
    expect(root.querySelector('[data-resource="wood"]')!.textContent).toContain('4 / 10');
    expect(root.querySelector('[data-resource="stone"]')!.textContent).toContain('6 / 6'); // capped at the target
  });

  it('a zero target shows no requirement (no "x / 0", no meter)', () => {
    const f = fakes({ config: { thresholds: [{ wood: 0, stone: 5 }] } });
    createHud(root, f.session, f.board);
    const wood = root.querySelector('[data-resource="wood"]')!;
    expect(wood.textContent).not.toContain('/ 0');
    expect(wood.querySelector('.meter')).toBeNull();
    expect(root.querySelector('[data-resource="stone"] .meter')).not.toBeNull();
  });

  it('End Run asks for confirmation first', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    root.querySelector<HTMLButtonElement>('.end-run')!.click();
    expect(f.session.endRun).not.toHaveBeenCalled();
    root.querySelector<HTMLButtonElement>('.confirm-overlay .danger')!.click();
    expect(f.session.endRun).toHaveBeenCalled();
  });
});

describe('controls help', () => {
  const key = (k: string) => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
  const help = () => root.querySelector<HTMLElement>('.help-overlay')!;

  it('auto-shows once on the first run only; ? / H / button / Esc toggle it', () => {
    try { sessionStorage.clear(); } catch { /* ignore */ }
    const f = fakes();
    createHud(root, f.session, f.board);
    expect(help().hidden).toBe(true);
    f.emit({ type: 'runStarted', seed: 1 });
    expect(help().hidden).toBe(false);
    expect(help().textContent).toContain('Shift + click');
    key('Escape');
    expect(help().hidden).toBe(true);
    f.emit({ type: 'runStarted', seed: 2 }); // second run: no auto-show
    expect(help().hidden).toBe(true);
    key('?'); expect(help().hidden).toBe(false);
    key('h'); expect(help().hidden).toBe(true);
    root.querySelector<HTMLButtonElement>('.help-btn')!.click();
    expect(help().hidden).toBe(false);
    root.querySelector<HTMLButtonElement>('.help-overlay .primary')!.click();
    expect(help().hidden).toBe(true);
  });

  it('does not auto-show again on a new HUD in the same browser session', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    f.emit({ type: 'runStarted', seed: 1 });
    expect(help().hidden).toBe(true);
  });

  it('while open it swallows 1/2 so nothing happens behind it; ignores typing in inputs', () => {
    const f = fakes();
    createHud(root, f.session, f.board);
    f.state.pendingOffer = { options: ['desert', 'arctic'], reshuffled: false };
    f.emit({ type: 'offerShown', offer: f.state.pendingOffer });
    key('?');
    key('1');
    expect(f.session.chooseOffer).not.toHaveBeenCalled();
    key('Escape');
    key('1');
    expect(f.session.chooseOffer).toHaveBeenCalledWith(0);
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', bubbles: true }));
    expect(help().hidden).toBe(true);
  });
});
