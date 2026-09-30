import type { BoardPick, BoardView, GameSession, SessionEvent } from '../../core/contracts';
import type { Biome, BuildingId, GameState, HexId, MainBiome, SlotIndex } from '../../core/types';
import { legalCoreSites } from '../../sim/spread/spread';

export type Card = { kind: 'core' } | { kind: 'building'; id: BuildingId } | null;

/** Terraformed placeable tiles with an empty slot, the empty-slot count and total slots. Reads state only. */
export function slotSummary(state: Readonly<GameState>): { hexes: HexId[]; empty: number; total: number } {
  const hexes: HexId[] = [];
  let empty = 0;
  let total = 0;
  for (const h of state.hexes) {
    if (!h.placeable || h.biome === null) continue;
    total += h.slots.length;
    const e = h.slots.filter((s) => s.building === null).length;
    if (e > 0) { hexes.push(h.id); empty += e; }
  }
  return { hexes, empty, total };
}

const typing = (t: EventTarget | null) =>
  t instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable);

/**
 * Selection model + pointer/keyboard → session commands for the journal HUD (UI_SPEC §5).
 * Holds no game state: it only remembers what the player has selected.
 */
export class Ctrl {
  card: Card = null;
  hex: HexId | null = null;
  slot: SlotIndex | null = null;
  /** Biome shown in the triangle/deck (follows the selected tile). */
  biome: Biome | null = null;
  lastBuilt: BuildingId | null = null;
  shiftHeld = false;
  hovered: BoardPick | null = null;
  private tabHeld = false;
  private finderToggled = false;
  private readonly changeCbs: (() => void)[] = [];
  private readonly noticeCbs: ((m: string) => void)[] = [];
  private readonly hoverCbs: (() => void)[] = [];
  isBlocked: () => boolean = () => this.state.pendingOffer !== null || this.state.status !== 'playing';
  private invalidTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly off: (() => void)[] = [];

  constructor(readonly session: GameSession, private readonly board: BoardView) {
    this.biome = session.state.pendingOffer ? null : session.state.coreStack[0] ?? null;
    this.off.push(board.onPointer((pick, kind) => this.onPointer(pick, kind)));
    const keydown = (ev: KeyboardEvent) => this.onKey(ev, true);
    const keyup = (ev: KeyboardEvent) => this.onKey(ev, false);
    const blur = () => { this.shiftHeld = false; this.setTab(false); };
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
    window.addEventListener('blur', blur);
    this.off.push(() => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', blur);
    });
  }

  get state(): Readonly<GameState> { return this.session.state; }
  get finderOn(): boolean { return this.tabHeld || this.finderToggled; }
  /** A cleared triangle also clears the deck; no implicit biome is shown. */
  get effectiveBiome(): Biome | null { return this.biome; }

  onChange(cb: () => void): void { this.changeCbs.push(cb); }
  onNotice(cb: (m: string) => void): void { this.noticeCbs.push(cb); }
  onHover(cb: () => void): void { this.hoverCbs.push(cb); }
  dispose(): void { this.clearInvalid(); for (const o of this.off) o(); }

  // ----- core placement availability (for the core card) -----
  /** Why the core card can't be used right now, or null if it can. */
  coreDisabledReason(biome: MainBiome): string | null {
    const s = this.state;
    if (s.status !== 'playing') return 'Run over';
    if (s.pendingOffer) return 'Choose an offer first';
    if (s.activeSpread) return 'Terraforming…';
    if (!s.coreStack.includes(biome)) return 'No core held';
    if (legalCoreSites(s).length === 0) return 'No legal site left';
    return null;
  }

  // ----- selection commands -----
  selectBiome(b: Biome | null): void {
    this.biome = b;
    this.hex = null; this.slot = null;
    if (this.card?.kind === 'building' && (b === null || !this.state.config.rosters[b].includes(this.card.id))) this.card = null;
    if (this.card?.kind === 'core' && (b === null || this.coreDisabledReason(b as MainBiome) !== null)) this.card = null;
    this.sync();
  }

  selectHex(id: HexId | null): void {
    this.card = null;
    this.hex = id;
    this.slot = null;
    this.followBiome();
    this.sync();
  }

  selectSlot(hexId: HexId, slot: SlotIndex): void {
    this.card = null;
    this.hex = hexId;
    this.slot = slot;
    this.followBiome();
    this.sync();
  }

  clickCard(card: NonNullable<Card>): void {
    if (card.kind === 'core') {
      if (this.card?.kind === 'core') { this.card = null; this.sync(); return; }
      const b = this.effectiveBiome;
      if (b !== 'forest' && b !== 'desert' && b !== 'arctic') return;
      const why = this.coreDisabledReason(b);
      if (why) { this.notice(why); return; }
      this.card = card;
      this.sync();
      return;
    }
    // Slot-first flow: a selected empty slot receives the building immediately.
    const h = this.hex !== null ? this.state.hexes[this.hex] : null;
    if (h && this.slot !== null && h.slots[this.slot].building === null) {
      const slot = this.slot;
      const r = this.place(h.id, slot, card.id);
      if (r) this.slot = this.nextEmpty(h.id, slot);
      this.sync();
      return;
    }
    this.card = this.card?.kind === 'building' && this.card.id === card.id ? null : card;
    this.sync();
  }

  esc(): void {
    this.card = null; this.hex = null; this.slot = null; this.biome = null;
    this.sync();
  }

  demolish(hexId: HexId, slot: SlotIndex): void {
    const r = this.session.demolish(hexId, slot);
    if (!r.ok) this.fail(hexId, r.reason);
    this.sync();
  }

  toggleFinder(): void { this.finderToggled = !this.finderToggled; this.sync(); }

  /** Shift+click / R: place exactly the last building (idle only: never with a core card selected). */
  quickBuild(pick: BoardPick): void {
    const s = this.state;
    if (this.isBlocked() || this.lastBuilt === null || this.card?.kind === 'core' || s.pendingOffer || s.status !== 'playing') return;
    const slot = this.targetSlot(pick);
    if (slot === null) { this.fail(pick.hexId, 'All slots on this tile are full.'); return; }
    this.place(pick.hexId, slot, this.lastBuilt);
    this.sync();
  }

  // ----- internals -----
  private followBiome(): void {
    if (this.hex === null) return;
    const b = this.state.hexes[this.hex]?.biome ?? null;
    this.biome = b; // dead tile → cleared
    if (this.card?.kind === 'core' && b !== null) this.card = null;
  }

  private nextEmpty(hexId: HexId, after: SlotIndex): SlotIndex | null {
    const slots = this.state.hexes[hexId].slots;
    for (let k = 1; k <= 3; k++) {
      const i = ((after + k) % 3) as SlotIndex;
      if (i !== after && slots[i].building === null) return i;
    }
    return null;
  }

  private targetSlot(pick: BoardPick): SlotIndex | null {
    const slots = this.state.hexes[pick.hexId]?.slots;
    if (!slots) return null;
    if (pick.slot !== null && slots[pick.slot].building === null) return pick.slot;
    const i = slots.findIndex((sl) => sl.building === null);
    return i < 0 ? null : (i as SlotIndex);
  }

  /** Returns true on success; on failure flashes the tile, posts the reason and keeps every selection. */
  private place(hexId: HexId, slot: SlotIndex, id: BuildingId): boolean {
    const r = this.session.placeBuilding(hexId, slot, id);
    if (r.ok) { this.lastBuilt = id; return true; }
    this.fail(hexId, r.reason);
    return false;
  }

  private fail(hexId: HexId, reason: string): void {
    this.board.setHighlights('invalid', [hexId]);
    if (this.invalidTimer) clearTimeout(this.invalidTimer);
    this.invalidTimer = setTimeout(() => { this.invalidTimer = null; this.board.setHighlights('invalid', []); }, 400);
    this.notice(reason);
  }

  private clearInvalid(): void {
    if (this.invalidTimer) clearTimeout(this.invalidTimer);
    this.invalidTimer = null; this.board.setHighlights('invalid', []);
  }

  private notice(m: string): void { for (const c of this.noticeCbs) c(m); }

  private onPointer(pick: BoardPick | null, kind: string): void {
    if (kind === 'move') {
      this.hovered = pick;
      this.board.setHighlights('hover', pick ? [pick.hexId] : []);
      for (const c of this.hoverCbs) c();
      return;
    }
    if (this.isBlocked()) return;
    if (kind === 'secondary') { this.esc(); return; }
    if (!pick) return;
    const s = this.state;
    if (this.card?.kind === 'core') {
      const b = this.effectiveBiome;
      const idx = s.coreStack.indexOf(b as MainBiome);
      const r = idx >= 0 ? this.session.placeCore(pick.hexId, idx) : null;
      if (r?.ok) { this.card = null; this.hex = null; this.slot = null; this.sync(); }
      else this.fail(pick.hexId, r && !r.ok ? r.reason : 'No core of that biome is held.');
      return;
    }
    if (this.shiftHeld && this.lastBuilt !== null) { this.quickBuild(pick); return; }
    if (pick.slot !== null && s.hexes[pick.hexId]?.slots[pick.slot]?.building !== null) { this.selectSlot(pick.hexId, pick.slot); return; }
    if (this.card?.kind === 'building') {
      const slot = this.targetSlot(pick);
      if (slot === null) { this.fail(pick.hexId, 'All slots on this tile are full.'); return; }
      this.hex = pick.hexId; this.slot = null;
      this.followBiome();
      this.place(pick.hexId, slot, this.card.id);
      this.sync();
      return;
    }
    if (pick.slot !== null) this.selectSlot(pick.hexId, pick.slot);
    else this.selectHex(pick.hexId === this.hex ? null : pick.hexId);
  }

  private setTab(v: boolean): void {
    if (this.tabHeld === v) return;
    this.tabHeld = v;
    this.sync();
  }

  private onKey(ev: KeyboardEvent, down: boolean): void {
    if (ev.key === 'Shift') { this.shiftHeld = down; for (const c of this.hoverCbs) c(); return; }
    if (this.isBlocked() || typing(ev.target) || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (ev.key === 'Tab') { if (down) ev.preventDefault(); this.setTab(down); return; }
    if (!down || ev.repeat) return;
    if (ev.key === 'Escape') this.esc();
    else if ((ev.key === 'r' || ev.key === 'R') && this.hovered) this.quickBuild(this.hovered);
  }

  handleEvent(e: SessionEvent): void {
    switch (e.type) {
      case 'runStarted':
        this.clearInvalid(); this.shiftHeld = false; this.hovered = null;
        this.card = null; this.hex = null; this.slot = null; this.biome = null; this.lastBuilt = null;
        this.finderToggled = false; this.tabHeld = false;
        break;
      case 'offerResolved': this.biome = e.biome; break;
      case 'runEnded':
        this.clearInvalid(); this.card = null; this.hex = null; this.slot = null; this.biome = null; this.finderToggled = false; this.tabHeld = false; break;
      case 'offerShown': case 'spreadStarted':
        if (this.card?.kind === 'core') this.card = null;
        break;
      case 'hexChanged': case 'tilesRevealed': case 'spreadFinished': this.followBiome(); break;
    }
    this.sync();
  }

  /** Recompute board highlights from the selection, then tell components to re-render. */
  sync(): void {
    const s = this.state;
    const playing = s.status === 'playing';
    this.board.setHighlights('legalCore', this.card?.kind === 'core' && playing ? legalCoreSites(s) : []);
    const marks = new Set<HexId>();
    if (this.hex !== null) marks.add(this.hex);
    if (this.finderOn && this.card?.kind !== 'core' && playing) for (const id of slotSummary(s).hexes) marks.add(id);
    this.board.setHighlights('selected', [...marks]);
    this.board.setSlotHighlight?.(this.hex !== null && this.slot !== null ? { hexId: this.hex, slot: this.slot } : null);
    for (const c of this.changeCbs) c();
  }
}
