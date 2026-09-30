// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { BoardView, GameSession } from '../../core/contracts';
import type { GameState } from '../../core/types';
import { createGameSession } from '../../game/session';
import { Ctrl } from './ctrl';
import { createDeck } from './deck';
import { createDetail } from './detail';
import { createThresholdStack } from './thresholds';
import { createTriangle } from './triangle';
import { legalCoreSites } from '../../sim/spread/spread';

const disposals: (() => void)[] = [];
afterEach(() => { disposals.splice(0).forEach(fn => fn()); document.body.replaceChildren(); });
function setup() {
  const real = createGameSession({ now: () => 0 }); real.newRun(1); real.chooseOffer(0);
  const state = structuredClone(real.state) as GameState;
  const session: GameSession = { ...real, get state() { return state; }, preview: vi.fn(() => null) };
  const board: BoardView = { setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(), setHighlights: vi.fn(),
    onPointer: () => () => {}, update: vi.fn(), resize: vi.fn(), dispose: vi.fn(), setSlotHighlight: vi.fn() };
  const root = document.createElement('div'); root.className = 'jhud'; document.body.append(root);
  const ctrl = new Ctrl(session, board); disposals.push(() => ctrl.dispose());
  return { root, ctrl, state, session, board };
}

describe('journal component contract states', () => {
  it('shows held badges, no-core grey, terraforming and no-legal-site core reasons', () => {
    const s = setup(); s.state.coreStack = ['forest', 'forest']; s.ctrl.selectBiome('forest');
    const deck = createDeck(s.root, s.session, s.ctrl); disposals.push(deck.dispose);
    const core = () => s.root.querySelector<HTMLButtonElement>('[data-card="core"]')!;
    expect(core().querySelector('.j-badge')?.textContent).toBe('2'); expect(core().getAttribute('aria-disabled')).toBe('false');
    s.state.coreStack = []; deck.render(); expect(core().classList.contains('grey')).toBe(true); expect(core().textContent).toContain('No core held');
    s.state.coreStack = ['forest'];
    s.state.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} }; deck.render();
    expect(core().textContent).toContain('Terraforming…'); expect(core().getAttribute('aria-disabled')).toBe('true');
    s.state.activeSpread = null; s.state.hexes.forEach(h => { h.biome = 'forest'; }); deck.render();
    expect(core().textContent).toContain('No legal site left'); core().click(); expect(s.ctrl.card).toBeNull();
  });
  it('follows restored and dead tiles; only mixed biomes present on the board can be browsed', () => {
    const s = setup(), tile = s.state.hexes.find(h => h.placeable)!; tile.biome = 'taiga';
    const tri = createTriangle(s.root, s.session, s.ctrl); disposals.push(tri.dispose);
    s.ctrl.selectSlot(tile.id, 1); tri.render();
    expect(s.root.querySelector<HTMLElement>('.j-biome.selected')?.dataset.biome).toBe('taiga');
    expect(s.root.querySelector<HTMLButtonElement>('[data-biome="taiga"]')!.disabled).toBe(false);
    expect(s.root.querySelector<HTMLButtonElement>('[data-biome="steppe"]')!.disabled).toBe(true);
    expect(s.root.querySelector('[data-biome="taiga"] .j-badge')).toBeNull();
    tile.biome = null; s.ctrl.selectHex(tile.id); tri.render(); expect(s.root.querySelector('.j-biome.selected')).toBeNull();
  });
  it('labels zero-cost buildings Free in detail and hover notes', () => {
    const s = setup(); s.ctrl.selectBiome('forest'); s.ctrl.clickCard({ kind: 'building', id: 'hillside_mine' });
    const detail = createDetail(s.root, s.session, s.ctrl), deck = createDeck(s.root, s.session, s.ctrl); disposals.push(detail.dispose, deck.dispose);
    expect(s.root.querySelector('.j-detail')?.textContent).toContain('Cost: Free');
    s.root.querySelector<HTMLButtonElement>('[data-building="hillside_mine"]')!.focus();
    expect(s.root.querySelector('.j-note')?.textContent).toContain('Cost: Free');
  });
  it('filters zero targets while keeping final goal pinned across threshold progress', () => {
    const s = setup(); s.state.config.thresholds[0] = { wood: 0, stone: 16 };
    const stack = createThresholdStack(s.root, s.session, s.ctrl); disposals.push(stack.dispose);
    expect(s.root.querySelector('.current [data-resource="wood"]')).toBeNull(); expect(s.root.querySelector('.current [data-resource="stone"]')).not.toBeNull();
    expect(s.root.querySelector('.goal')?.textContent).toContain('T8'); expect(s.root.querySelectorAll('.collapsed')).toHaveLength(2);
    s.state.thresholdIndex = 7; stack.render(); expect(s.root.querySelector('.current')).toBeNull(); expect(s.root.querySelectorAll('.goal .j-bar')).toHaveLength(4);
    s.state.thresholdIndex = 8; stack.render(); expect(s.root.querySelector('.goal')?.textContent).toContain('Reached!'); expect(s.root.querySelectorAll('.j-check')).toHaveLength(8);
  });
  it('uses only discovered preview combos and building details, including keyboard focus pop-ups', () => {
    const s = setup();
    // A real session calculates both hidden and discovered versions of the same possible pair.
    s.session = createGameSession({ now: () => 0 });
    for (let seed = 1; seed <= 20; seed++) { s.session.newRun(seed); if (s.session.state.pendingOffer!.options.includes('forest')) break; }
    const index = s.session.state.pendingOffer!.options.indexOf('forest'); expect(index).toBeGreaterThanOrEqual(0);
    s.session.chooseOffer(index as 0 | 1); s.session.placeCore(legalCoreSites(s.session.state)[0]); s.session.advance(s.session.state.config.animation.spreadMaxMs);
    const h = s.session.state.hexes.find(h => h.placeable && h.biome === 'forest')!;
    expect(s.session.placeBuilding(h.id, 0, 'lumber_camp').ok).toBe(true);
    // Unaffordable building cards remain selectable for preview.
    const ctrl = new Ctrl(s.session, s.board); disposals.push(() => ctrl.dispose()); ctrl.selectSlot(h.id, 1);
    const deck = createDeck(s.root, s.session, ctrl), detail = createDetail(s.root, s.session, ctrl); disposals.push(deck.dispose, detail.dispose);
    const saw = s.root.querySelector<HTMLButtonElement>('[data-building="sawmill"]')!; saw.focus();
    const note = s.root.querySelector<HTMLElement>('.j-note')!; expect(note.hidden).toBe(false); expect(note.textContent).toContain('Base yield');
    expect(note.textContent).not.toContain('Timber Line'); expect(note.querySelector('[data-combo-id="timber_line"]')).toBeNull();
    const badPreviewSession: GameSession = { ...s.session, get state() { return s.session.state; }, preview: (hex, slot, id) => {
      const p = s.session.preview(hex, slot, id)!;
      return { ...p, combos: [{ match: { comboId: 'timber_line', pair: 0 }, amount: { wood: 5 } }] };
    } };
    const guardedCtrl = new Ctrl(badPreviewSession, s.board); disposals.push(() => guardedCtrl.dispose()); guardedCtrl.selectSlot(h.id, 1);
    const guardedDeck = createDeck(s.root, badPreviewSession, guardedCtrl); disposals.push(guardedDeck.dispose);
    const cards = s.root.querySelectorAll<HTMLButtonElement>('[data-building="sawmill"]'); cards[cards.length - 1].focus();
    expect(s.root.querySelectorAll('[data-combo-id="timber_line"]')).toHaveLength(0);
    // Discovery belongs to simulation; a presentation snapshot may contain its public id.
    const snapshot = structuredClone(s.session.state) as GameState; snapshot.discoveredCombos.push('timber_line');
    const visibleSession: GameSession = { ...s.session, get state() { return snapshot; } };
    const visibleCtrl = new Ctrl(visibleSession, s.board); disposals.push(() => visibleCtrl.dispose()); visibleCtrl.selectBiome('forest'); visibleCtrl.clickCard({ kind: 'building', id: 'sawmill' });
    const visibleDetail = createDetail(s.root, visibleSession, visibleCtrl); disposals.push(visibleDetail.dispose);
    expect(s.root.querySelectorAll('.j-combo')).toHaveLength(1);
  });
});
