// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
const journalStyles = readFileSync('src/ui/v2/styles.css', 'utf8');
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { BoardPick, BoardView, PointerKind } from '../../core/contracts';
import { createOfferFx, FX_TIMING, type OfferFx } from '../../fx/offerSpheres';
import { createGameSession } from '../../game/session';
import { legalCoreSites } from '../../sim/spread/spread';
import { createJournalHud, type JournalDeps } from './journalHud';
import { createHud, createLegacyHud } from '../hud';

const disposals: (() => void)[] = [];
afterEach(() => { disposals.splice(0).forEach(off => off()); document.body.replaceChildren(); vi.useRealTimers(); vi.restoreAllMocks(); });
export function fixture(startBefore = false, deps: JournalDeps = {}) {
  const session = createGameSession({ now: () => 0 });
  let pointer: ((pick: BoardPick | null, kind: PointerKind) => void) | null = null;
  const board: BoardView = { setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(),
    setHighlights: vi.fn(), setSlotHighlight: vi.fn(), update: vi.fn(), resize: vi.fn(), dispose: vi.fn(),
    onPointer(cb) { pointer = cb; return () => { pointer = null; }; } };
  const root = document.createElement('div'); root.id = 'ui'; document.body.append(root);
  if (startBefore) session.newRun(1);
  const hud = createJournalHud(root, session, board, { createJournal: null, createOfferFx: null, ...deps }); disposals.push(() => hud.dispose());
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


it('keeps sound controls stable during slider input and confirms End Run before showing the journal result', () => {
  let muted = false, volume = 1; const callbacks = new Set<() => void>();
  const audio = { get muted() { return muted; }, get volume() { return volume; },
    setMuted(v: boolean) { muted = v; callbacks.forEach(cb => cb()); },
    setVolume(v: number) { volume = v; callbacks.forEach(cb => cb()); },
    subscribe(cb: () => void) { callbacks.add(cb); return () => { callbacks.delete(cb); }; } };
  const s = fixture(false, { audio }); s.click('.offer-overlay [data-index="0"]'); s.click('.menu-btn');
  const slider = s.root.querySelector<HTMLInputElement>('.menu-volume')!; slider.focus(); slider.value = '35'; slider.dispatchEvent(new Event('input', { bubbles: true }));
  expect(volume).toBe(.35); expect(s.root.querySelector('.menu-volume')).toBe(slider); expect(document.activeElement).toBe(slider);
  s.click('.menu-mute'); expect(muted).toBe(true); expect(s.root.querySelector('.menu-mute')?.textContent).toBe('Sound: off');
  s.click('.menu-end'); expect(s.session.state.status).toBe('playing'); expect(s.root.querySelector<HTMLElement>('.confirm-overlay')!.hidden).toBe(false);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h', bubbles: true })); expect(s.root.querySelector<HTMLElement>('.help-overlay')!.hidden).toBe(true);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); expect(s.root.querySelector<HTMLElement>('.confirm-overlay')!.hidden).toBe(true);
  s.click('.menu-btn'); s.click('.menu-end'); s.click('.confirm-overlay .btn.danger');
  expect(s.session.state.status).toBe('ended'); expect(s.root.querySelector<HTMLElement>('.end-overlay')!.hidden).toBe(false);
  expect(s.root.querySelector('.end-screen .j-wordmark')?.textContent).toBe('Hex Genesis');
  expect(s.root.querySelector('.j-menu .j-wordmark')?.textContent).toBe('Hex Genesis');
  expect(s.root.querySelector('.end-thresholds')?.textContent).toContain('/8'); expect(s.root.querySelector('.end-board')?.textContent).toContain('%');
  expect(s.root.querySelectorAll('.end-row')).toHaveLength(4); expect(s.root.querySelector<HTMLButtonElement>('.menu-end')!.disabled).toBe(true);
  s.root.querySelector<HTMLInputElement>('.end-overlay .seed-input')!.value = '7'; s.click('.new-run');
  expect(s.session.state.seed).toBe(7); expect(s.session.state.status).toBe('playing'); expect(s.root.querySelector<HTMLElement>('.end-overlay')!.hidden).toBe(true);
  expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(false); expect(s.root.querySelector<HTMLButtonElement>('.menu-end')!.disabled).toBe(false);
  s.hud.dispose(); expect(callbacks.size).toBe(0);
});

it('removes the journal root stacking context so offer/help/end layers sit above tutorial', () => {
  const style = document.createElement('style'); style.textContent = '#ui { position:fixed; } #tutorial { position:fixed; }' + journalStyles; document.head.append(style); disposals.push(() => style.remove());
  const tutorial = document.createElement('div'); tutorial.id = 'tutorial'; tutorial.innerHTML = '<section class="assistant-panel"></section>'; document.body.append(tutorial);
  const s = fixture();
  expect(getComputedStyle(s.root).position).toBe('static');
  expect(getComputedStyle(tutorial).zIndex).toBe('20');
  expect(getComputedStyle(s.root.querySelector('.offer-overlay')!).zIndex).toBe('100');
  expect(getComputedStyle(s.root.querySelector('.help-overlay')!).zIndex).toBe('110');
  expect(getComputedStyle(s.root.querySelector('.end-overlay')!).zIndex).toBe('120');
  s.hud.dispose(); expect(getComputedStyle(s.root).position).toBe('fixed');
});

it('keeps the journal coming-soon fallback available by button and J until integration', () => {
  const s = fixture(); s.click('.offer-overlay [data-index="0"]'); s.click('.journal-btn');
  expect(s.root.querySelector('.j-notice')?.textContent).toBe('Journal coming soon.');
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'J', bubbles: true }));
  expect(s.root.querySelector<HTMLElement>('.j-notice')!.hidden).toBe(false);
  expect(s.root.querySelector('.j-notice')?.textContent).toBe('Journal coming soon.');
});

it('exports the reviewed journal HUD as the default and retains the legacy factory', () => {
  expect(createHud).toBe(createJournalHud);
  expect(createLegacyHud).toBeTypeOf('function');
  expect(createLegacyHud).not.toBe(createHud);
});

describe('committed journal book integration', () => {
  const key = (name: string, type = 'keydown') => document.body.dispatchEvent(new KeyboardEvent(type, { key: name, bubbles: true }));
  it('opens once by book button, toggles with J, and keeps selection on Escape', () => {
    const s = fixture(false, { createJournal: undefined });
    const book = s.root.querySelector<HTMLElement>('.jr-overlay')!;
    s.click('.journal-btn'); expect(book.hidden).toBe(true); // opening offer blocks the book
    s.click('.offer-overlay [data-index="0"]'); s.click('.j-card.building');
    s.click('.journal-btn'); expect(book.hidden).toBe(false);
    expect(s.root.querySelectorAll('.jr-overlay')).toHaveLength(1);
    key('J'); expect(book.hidden).toBe(true);
    key('j'); expect(book.hidden).toBe(false);
    key('Escape'); expect(book.hidden).toBe(true);
    expect(s.root.querySelector('.j-card.building.selected')).not.toBeNull();
    key('Escape'); expect(s.root.querySelector('.j-card.building.selected')).toBeNull();
  });
  it('blocks core placement and help while open, then restores input when closed', () => {
    const s = fixture(false, { createJournal: undefined }); s.click('.offer-overlay [data-index="0"]');
    s.click('[data-card="core"]'); const site = legalCoreSites(s.session.state)[0];
    key('j'); s.pointer({ hexId: site, slot: null }); expect(s.session.state.cores).toHaveLength(0);
    key('h'); expect(s.root.querySelector<HTMLElement>('.help-overlay')!.hidden).toBe(true);
    key('j'); s.pointer({ hexId: site, slot: null }); expect(s.session.state.cores).toHaveLength(1);
  });
  it('releases the held Tab finder even when the book blocks input', () => {
    const s = fixture(false, { createJournal: undefined }); s.click('.offer-overlay [data-index="0"]');
    key('Tab'); expect(s.root.querySelector('.j-slots.active')).not.toBeNull();
    key('j'); key('Tab', 'keyup'); expect(s.root.querySelector('.j-slots.active')).toBeNull();
  });
  it('keeps unknown combo pages secret and relies on the book subscription for run reset', () => {
    const s = fixture(false, { createJournal: undefined }); s.click('.offer-overlay [data-index="0"]'); key('j');
    s.click('.jr-tab[data-tab="combos"]');
    const book = s.root.querySelector<HTMLElement>('.jr-overlay')!;
    expect(book.querySelector('.jr-q')?.textContent).toBe('?');
    for (const combo of s.session.state.config.combos) expect(book.textContent).not.toContain(combo.name);
    s.session.newRun(7); expect(book.hidden).toBe(true);
    s.click('.offer-overlay [data-index="0"]'); key('j'); expect(book.querySelector('.jr-title')?.textContent).toBe('Field Journal');
    s.hud.dispose(); expect(s.root.querySelector('.jr-overlay')).toBeNull();
    key('j'); expect(s.root.querySelector('.jr-overlay')).toBeNull();
  });
  it('allows the menu book button to close the menu before opening the book', () => {
    const s = fixture(false, { createJournal: undefined }); s.click('.offer-overlay [data-index="0"]'); s.click('.menu-btn');
    s.click('.journal-btn'); expect(s.root.querySelector<HTMLElement>('.j-menu')!.hidden).toBe(true);
    expect(s.root.querySelector<HTMLElement>('.jr-overlay')!.hidden).toBe(false);
  });
});

describe('committed offer sphere integration', () => {
  const factory = (root: HTMLElement) => createOfferFx(root, { reducedMotion: true });
  const key = (name: string) => document.body.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }));
  it('presents the real opening offer once, updates after reshuffle and resolves by key 2 exactly once', async () => {
    vi.useFakeTimers();
    const style = document.createElement('style'); style.textContent = journalStyles; document.head.append(style); disposals.push(() => style.remove());
    const s = fixture(false, { createOfferFx: factory, createJournal: undefined });
    expect(getComputedStyle(s.root.querySelector('.ofx')!).zIndex).toBe('100');
    const choose = vi.spyOn(s.session, 'chooseOffer');
    expect(s.root.querySelectorAll('.ofx')).toHaveLength(1);
    expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(true);
    const firstHost = s.root.querySelector('.ofx'); s.click('.ofx-reshuffle');
    expect(s.root.querySelector('.ofx')).toBe(firstHost); expect(s.session.state.reshufflesUsed).toBe(1);
    expect(s.root.querySelector<HTMLButtonElement>('.ofx-reshuffle')!.disabled).toBe(true);
    const chosen = s.session.state.pendingOffer!.options[1];
    expect([...s.root.querySelectorAll<HTMLElement>('.ofx-sphere')].map(n => n.dataset.biome)).toEqual(s.session.state.pendingOffer!.options);
    key('2'); key('1'); expect(choose).toHaveBeenCalledTimes(1); expect(choose).toHaveBeenCalledWith(1);
    expect(s.session.state.pendingOffer).toBeNull(); expect(s.session.state.coreStack).toContain(chosen);
    expect(s.root.querySelector<HTMLElement>('.ofx')!.classList.contains('busy')).toBe(true);
    // The session has resolved; HUD input still waits for the visual fade.
    key('h'); key('j'); s.click('.menu-btn'); s.click('[data-card="core"]');
    expect(s.root.querySelector<HTMLElement>('.help-overlay')!.hidden).toBe(true);
    expect(s.root.querySelector<HTMLElement>('.jr-overlay')!.hidden).toBe(true);
    expect(s.root.querySelector<HTMLElement>('.j-menu')!.hidden).toBe(true);
    expect(s.root.querySelector('.j-card.core.selected')).toBeNull();
    s.pointer({ hexId: legalCoreSites(s.session.state)[0], slot: null }); expect(s.session.state.cores).toHaveLength(0);
    await vi.advanceTimersByTimeAsync(FX_TIMING.fade + 1); expect(s.root.querySelector('.ofx')).toBeNull();
    s.click('[data-card="core"]'); s.pointer({ hexId: legalCoreSites(s.session.state)[0], slot: null });
    expect(s.session.state.cores).toHaveLength(1); key('1'); expect(choose).toHaveBeenCalledTimes(1);
  });
  it('recovers a pending offer after mount using the laid-out triangle and resolves toward the awarded corner', async () => {
    vi.useFakeTimers(); let effect!: OfferFx;
    const bounds = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
    bounds.mockImplementation(function(this: HTMLElement) {
      if (this.matches('.j-triangle')) { expect(this.style.bottom).toBe('16px'); return new DOMRect(776, 400, 232, 224); }
      if (this.matches('.j-biome.main')) return new DOMRect(850, 440, 60, 60);
      return new DOMRect();
    });
    const s = fixture(true, { createOfferFx(root) { effect = factory(root); vi.spyOn(effect, 'present'); vi.spyOn(effect, 'resolve'); return effect; } });
    expect(effect.present).toHaveBeenCalledWith(expect.objectContaining({ from: new DOMRect(776, 400, 232, 224) }));
    s.click('.ofx-sphere'); expect(effect.resolve).toHaveBeenCalledWith(0, new DOMRect(850, 440, 60, 60));
    await vi.advanceTimersByTimeAsync(FX_TIMING.fade + 1); expect(s.root.querySelector('.ofx')).toBeNull();
  });
  it('cancels an old resolve without unlocking a new offer, and clears FX on end/dispose', async () => {
    vi.useFakeTimers(); const s = fixture(false, { createOfferFx: factory, createJournal: undefined });
    key('1'); s.session.newRun(7); await Promise.resolve();
    expect(s.root.querySelectorAll('.ofx')).toHaveLength(1);
    expect(s.session.state.pendingOffer).not.toBeNull();
    await vi.advanceTimersByTimeAsync(FX_TIMING.fade + 1); expect(s.root.querySelector('.ofx')).not.toBeNull();
    s.session.endRun(); expect(s.root.querySelector('.ofx')).toBeNull();
    expect(s.root.querySelector<HTMLElement>('.end-overlay')!.hidden).toBe(false);
    s.session.newRun(1); key('2'); s.hud.dispose(); await vi.advanceTimersByTimeAsync(1601);
    expect(s.root.querySelector('.ofx')).toBeNull(); expect(document.head.querySelector('[data-owner="offer-spheres"]')).toBeNull();
  });
  it('falls back to the simple modal when the FX factory throws', () => {
    const s = fixture(false, { createOfferFx() { throw new Error('FX unavailable'); } });
    expect(s.root.querySelector('.ofx')).toBeNull();
    expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(false);
    s.click('.reshuffle'); const chosen = s.session.state.pendingOffer!.options[0]; key('1');
    expect(s.session.state.pendingOffer).toBeNull(); expect(s.session.state.coreStack).toContain(chosen);
    expect(s.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(true);
  });
  it('recovers from present and resolve failures without stranding a pending offer or input', async () => {
    const failed = { present: vi.fn(() => { throw new Error('present failed'); }), update: vi.fn(),
      resolve: vi.fn(), hide: vi.fn(), dispose: vi.fn() };
    const s = fixture(false, { createOfferFx: () => failed });
    expect(failed.dispose).toHaveBeenCalledOnce(); s.click('.offer-overlay [data-index="0"]');
    expect(s.session.state.pendingOffer).toBeNull();
    const t = fixture(false, { createOfferFx(root) { const fx = factory(root); fx.resolve = () => Promise.reject(new Error('resolve failed')); return fx; } });
    t.click('.ofx-sphere'); await Promise.resolve(); expect(t.root.querySelector('.ofx')).toBeNull();
    t.click('[data-card="core"]'); expect(t.root.querySelector('.j-card.core.selected')).not.toBeNull();
    t.session.newRun(7); expect(t.root.querySelector<HTMLElement>('.offer-overlay')!.hidden).toBe(false);
  });
});
