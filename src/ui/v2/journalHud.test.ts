// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { BoardPick, BoardView, PointerKind } from '../../core/contracts';
import { createGameSession } from '../../game/session';
import { legalCoreSites } from '../../sim/spread/spread';
import { createJournalHud } from './journalHud';

const disposals: (() => void)[] = [];
afterEach(() => { disposals.splice(0).forEach(off => off()); document.body.replaceChildren(); vi.useRealTimers(); });
export function fixture(startBefore = false) {
  const session = createGameSession({ now: () => 0 });
  let pointer: ((pick: BoardPick | null, kind: PointerKind) => void) | null = null;
  const board: BoardView = { setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(),
    setHighlights: vi.fn(), setSlotHighlight: vi.fn(), update: vi.fn(), resize: vi.fn(), dispose: vi.fn(),
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


describe('journal biome selection', () => {
  it('starts with a prompt, highlights the awarded biome, and clears both on a dead tile', () => {
    const s = fixture();
    expect(s.root.querySelector('.j-deck-prompt')?.textContent).toBe('Pick a biome or a tile');
    expect(s.root.querySelector('.j-biome.selected')).toBeNull();
    const biome = s.session.state.pendingOffer!.options[0]; s.click('.offer-overlay [data-index="0"]');
    expect(s.root.querySelector<HTMLElement>('.j-biome.selected')!.dataset.biome).toBe(biome);
    expect(s.root.querySelector('[data-card="core"]')?.textContent).toContain(biome[0].toUpperCase() + biome.slice(1));
    s.pointer({ hexId: 0, slot: null });
    expect(s.root.querySelector('.j-biome.selected')).toBeNull();
    expect(s.root.querySelector('.j-deck-prompt')).not.toBeNull();
    s.click('[data-biome="forest"]');
    expect(s.root.querySelector<HTMLElement>('.j-biome.selected')!.dataset.biome).toBe('forest');
    expect(s.root.querySelector('.j-deck-prompt')).toBeNull();
    s.click('[data-biome="forest"]');
    expect(s.root.querySelector('.j-deck-prompt')).not.toBeNull();
  });
});

it('labels all four fixed-width resource pills and retains full-value tooltips', () => {
  const s = fixture();
  const pills = [...s.root.querySelectorAll<HTMLElement>('.j-pill')];
  expect(pills).toHaveLength(4);
  expect(pills.map(p => p.querySelector('.j-resource-name')?.textContent)).toEqual(['Wood', 'Stone', 'Water', 'Food']);
  for (const p of pills) expect(p.title).toContain(`lifetime ${s.session.state.lifetime[p.dataset.resource!] ?? 0}`);
  expect(s.root.querySelector<HTMLElement>('.j-top')!.style.width).toBe('448px');
});

it('uses labeled drawn SVGs in the fixed top-right controls', () => {
  const s = fixture();
  for (const name of ['journal', 'menu']) {
    const b = s.root.querySelector<HTMLButtonElement>(`.${name}-btn`)!;
    expect(b.getAttribute('aria-label')).toBeTruthy();
    expect(b.querySelector('img')!.src).toContain(`/assets/icons/${name}.svg`);
  }
  expect(s.root.querySelector<HTMLElement>('.j-topright')!.style.width).toBe('88px');
});

it('keeps the empty detail card at its full reservation before and after selection', () => {
  const s = fixture(), detail = s.root.querySelector<HTMLElement>('.j-detail')!;
  expect(detail.style.width).toBe('248px'); expect(detail.style.height).toBe('176px');
  expect(detail.querySelector('.j-portrait')).not.toBeNull(); expect(detail.classList.contains('empty-state')).toBe(true);
  s.click('.offer-overlay [data-index="0"]'); s.click('.j-card.building');
  expect(detail.style.height).toBe('176px'); expect(detail.classList.contains('empty-state')).toBe(false);
  s.click('.j-card.building');
  expect(detail.style.height).toBe('176px'); expect(detail.classList.contains('empty-state')).toBe(true);
});


function restoredFixture() {
  const s = fixture(); s.click('.offer-overlay [data-index="0"]');
  s.click('[data-card="core"]'); s.pointer({ hexId: legalCoreSites(s.session.state)[0], slot: null });
  s.session.advance(s.session.state.config.animation.spreadMaxMs);
  const tile = s.session.state.hexes.find(h => h.placeable && h.biome !== null && h.slots.length === 3)!;
  const id = s.session.state.config.rosters[tile.biome!][0];
  return { ...s, tile, id };
}

describe('journal placement flows through real session commands', () => {
  it('keeps a building card sticky, selects filled slots for demolition, and clears everything on Escape', () => {
    const s = restoredFixture(); s.click(`[data-building="${s.id}"]`);
    s.pointer({ hexId: s.tile.id, slot: 0 });
    expect(s.tile.slots[0].building).toBe(s.id); expect(s.root.querySelector('.j-card.building.selected')).not.toBeNull();
    s.pointer({ hexId: s.tile.id, slot: 1 }); expect(s.tile.slots[1].building).toBe(s.id);
    s.pointer({ hexId: s.tile.id, slot: 0 });
    expect(s.root.querySelector('.j-card.building.selected')).toBeNull(); expect(s.root.querySelector('.demolish')).not.toBeNull();
    s.click('.demolish'); expect(s.tile.slots[0].building).toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(s.root.querySelector('.j-chip.selected')).toBeNull(); expect(s.root.querySelector('.j-deck-prompt')).not.toBeNull();
    expect(s.board.setSlotHighlight).toHaveBeenLastCalledWith(null);
  });
  it('builds immediately from a selected empty slot and advances through all three slots', () => {
    const s = restoredFixture(); s.pointer({ hexId: s.tile.id, slot: 0 });
    for (const slot of [0, 1, 2]) {
      expect(s.board.setSlotHighlight).toHaveBeenLastCalledWith({ hexId: s.tile.id, slot });
      s.click(`[data-building="${s.id}"]`); expect(s.tile.slots[slot].building).toBe(s.id);
      expect(s.root.querySelector('.j-card.building.selected')).toBeNull();
    }
    expect(s.board.setSlotHighlight).toHaveBeenLastCalledWith(null);
  });
  it('retains the slot and card on failed placements and cancels invalid timers on restart', () => {
    vi.useFakeTimers(); const s = restoredFixture();
    s.pointer({ hexId: s.tile.id, slot: 0 });
    const id = s.session.state.config.rosters[s.tile.biome!].find(id => Object.entries(s.session.state.config.buildings[id].cost).some(([r, v]) => (s.session.state.resources[r] ?? 0) < v))!;
    expect(id).toBeTruthy(); s.click(`[data-building="${id}"]`);
    expect(s.tile.slots[0].building).toBeNull(); expect(s.board.setSlotHighlight).toHaveBeenLastCalledWith({ hexId: s.tile.id, slot: 0 });
    const notice = s.root.querySelector<HTMLElement>('.j-notice')!; expect(notice.hidden).toBe(false);
    s.session.newRun(1); expect(s.board.setSlotHighlight).toHaveBeenLastCalledWith(null);
    vi.advanceTimersByTime(401); expect(s.board.setHighlights).toHaveBeenLastCalledWith('selected', []);
  });
  it('keeps Tab finder, R and Shift-click, and blocks repeats while help is open', () => {
    const s = restoredFixture(); s.pointer({ hexId: s.tile.id, slot: 0 }); s.click(`[data-building="${s.id}"]`);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(s.root.querySelector('.j-slots.active')).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true })); expect(s.root.querySelector('.j-slots.active')).toBeNull();
    s.pointer({ hexId: s.tile.id, slot: 1 }, 'move'); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }));
    expect(s.tile.slots[1].building).toBe(s.id);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', bubbles: true }));
    s.pointer({ hexId: s.tile.id, slot: 2 }); expect(s.tile.slots[2].building).toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', bubbles: true })); s.pointer({ hexId: s.tile.id, slot: 2 });
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift', bubbles: true })); expect(s.tile.slots[2].building).toBe(s.id);
  });
});
