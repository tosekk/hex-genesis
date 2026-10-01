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
    const selected = s.state.hexes.find(h => h.placeable)!; selected.biome = 'forest'; s.ctrl.selectSlot(selected.id, 0); s.ctrl.clickCard({ kind: 'core' });
    expect(s.ctrl.card?.kind).toBe('core'); expect(s.ctrl.hex).toBeNull(); expect(s.ctrl.slot).toBeNull(); expect(s.board.setSlotHighlight).toHaveBeenLastCalledWith(null); s.ctrl.esc(); s.ctrl.selectBiome('forest');
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
    s.ctrl.handleEvent({ type: 'offerResolved', biome: 'arctic' }); tri.render();
    expect(s.ctrl.hex).toBe(tile.id); expect(s.ctrl.slot).toBe(1);
    expect(s.root.querySelector<HTMLElement>('.j-biome.selected')?.dataset.biome).toBe('taiga');
    expect(s.root.querySelector<HTMLButtonElement>('[data-biome="taiga"]')!.disabled).toBe(false);
    expect(s.root.querySelector<HTMLButtonElement>('[data-biome="steppe"]')!.disabled).toBe(true);
    expect(s.root.querySelector('[data-biome="taiga"] .j-badge')).toBeNull();
    tile.biome = null; s.ctrl.selectHex(tile.id); tri.render(); expect(s.root.querySelector('.j-biome.selected')).toBeNull();
  });
  it('labels zero-cost buildings Free in detail and hover notes', () => {
    const s = setup(); s.state.hexes[0].biome = 'forest'; s.state.config.buildings.hillside_mine.cost = {}; s.ctrl.selectBiome('forest'); s.ctrl.clickCard({ kind: 'building', id: 'hillside_mine' });
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
    const h = s.session.state.hexes.find(h => h.placeable && h.biome === 'forest' && !s.session.state.cores.includes(h.id))!;
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
    const combo = s.root.querySelector<HTMLElement>('.j-combo')!;
    expect(combo.querySelector('.j-combo-name')?.textContent).toBe('Timber Line:');
    expect(combo.querySelector('.j-combo-reward')?.textContent).toMatch(/^→ \+5 wood$/);
    expect(combo.querySelector('.j-combo-recipe')?.textContent).toBe('Lumber Camp + Sawmill');
    expect(combo.title).toBe('Timber Line: Lumber Camp + Sawmill → +5 wood');
  });
});

describe('V16 useful biome circles and core-only deck', () => {
  it('disables absent biomes for clicks and keyboard focus, with a clear tooltip', () => {
    const s = setup(); s.state.coreStack = []; s.ctrl.sync();
    const tri = createTriangle(s.root, s.session, s.ctrl), deck = createDeck(s.root, s.session, s.ctrl); disposals.push(tri.dispose, deck.dispose);
    for (const circle of s.root.querySelectorAll<HTMLButtonElement>('.j-biome')) {
      expect(circle.disabled).toBe(true); expect(circle.tabIndex).toBe(-1); expect(circle.classList.contains('grey')).toBe(true);
      expect(circle.title).toMatch(/^No .* land yet$/); circle.click(); expect(s.ctrl.biome).toBeNull();
    }
    s.ctrl.selectBiome('forest'); expect(s.ctrl.biome).toBeNull(); expect(s.root.querySelector('.j-deck-prompt')).not.toBeNull();
  });
  it('unlocks main biomes with land or a held core, and mixed biomes only with land', () => {
    const s = setup(); s.state.coreStack = ['forest'];
    const tri = createTriangle(s.root, s.session, s.ctrl); disposals.push(tri.dispose);
    const circle = (id: string) => s.root.querySelector<HTMLButtonElement>(`[data-biome="${id}"]`)!;
    expect(circle('forest').disabled).toBe(false); expect(circle('forest').classList.contains('grey')).toBe(false);
    expect(circle('desert').disabled).toBe(true); expect(circle('steppe').disabled).toBe(true);
    s.state.hexes[0].biome = 'desert'; s.state.hexes[1].biome = 'steppe'; tri.render();
    expect(circle('desert').disabled).toBe(false); expect(circle('steppe').disabled).toBe(false); expect(circle('steppe').tabIndex).toBe(0);
    circle('steppe').click(); tri.render(); expect(circle('steppe').getAttribute('aria-pressed')).toBe('true');
    s.state.hexes[1].biome = null; s.ctrl.handleEvent({ type: 'hexChanged', hexId: 1 }); tri.render();
    expect(s.ctrl.biome).toBeNull(); expect(circle('steppe').disabled).toBe(true);
  });
  it('keeps the held core colored and building cards dimmed/readable but unselectable until land exists', () => {
    const s = setup(); s.state.coreStack = ['forest']; s.ctrl.selectBiome('forest');
    const deck = createDeck(s.root, s.session, s.ctrl); disposals.push(deck.dispose);
    expect(s.root.querySelector('.j-card.core.grey')).toBeNull();
    for (const card of s.root.querySelectorAll<HTMLButtonElement>('.j-card.building')) {
      expect(card.classList.contains('grey')).toBe(true); expect(card.getAttribute('aria-disabled')).toBe('true');
      expect(card.title).toContain('Place a Forest core first'); card.focus();
      expect(s.root.querySelector('.j-note')?.textContent).toContain('Cost:'); expect(s.root.querySelector('.j-note')?.textContent).toContain('Yields:');
      card.click(); expect(s.ctrl.card).toBeNull();
    }
    s.state.hexes[0].biome = 'forest'; s.ctrl.handleEvent({ type: 'tilesRevealed', hexIds: [0] }); deck.render();
    const building = s.root.querySelector<HTMLButtonElement>('.j-card.building')!;
    expect(building.classList.contains('grey')).toBe(false); expect(building.getAttribute('aria-disabled')).toBe('false');
    building.click(); expect(s.ctrl.card?.kind).toBe('building');
  });
  it('clears the selected biome/card and shows the prompt when the last land/core disappears', () => {
    const s = setup(); s.state.coreStack = ['forest']; s.state.hexes[0].biome = 'forest'; s.ctrl.selectBiome('forest');
    const deck = createDeck(s.root, s.session, s.ctrl); disposals.push(deck.dispose);
    s.root.querySelector<HTMLButtonElement>('.j-card.building')!.click(); expect(s.ctrl.card?.kind).toBe('building');
    s.state.coreStack = []; s.state.hexes[0].biome = null; s.ctrl.handleEvent({ type: 'resourcesChanged' }); deck.render();
    expect(s.ctrl.biome).toBeNull(); expect(s.ctrl.card).toBeNull(); expect(s.root.querySelector('.j-deck-prompt')).not.toBeNull();
    s.ctrl.handleEvent({ type: 'runStarted', seed: 7 }); expect(s.ctrl.biome).toBeNull();
  });
});
