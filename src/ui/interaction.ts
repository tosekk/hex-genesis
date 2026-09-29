import type { BoardPick, BoardView, GameSession, SessionEvent } from '../core/contracts';
import type { BuildingId, HexId, Result, PlacementOutcome, SlotIndex } from '../core/types';
import { legalCoreSites } from '../sim/spread/spread';

export type Mode = { kind: 'idle' } | { kind: 'placeCore'; stackIndex: number };

/** Pointer/keyboard → commands. Owns the current mode and the selected hex. */
export interface Interaction {
  readonly mode: Mode;
  readonly selected: HexId | null;
  enterCorePlacement(stackIndex: number): boolean;
  cancel(): void;
  select(hexId: HexId | null): void;
  onChange(cb: () => void): void;
  /** Last successfully placed building (panel or quick build). Reset on runStarted. */
  readonly lastBuilt: BuildingId | null;
  clearLastBuilt(): void;
  readonly shiftHeld: boolean;
  readonly hovered: BoardPick | null;
  /** Panel placement: session.placeBuilding + lastBuilt tracking. */
  build(hexId: HexId, slot: SlotIndex, building: BuildingId): Result<PlacementOutcome>;
  /** S4: place exactly `lastBuilt` on the hex (pick.slot if empty, else lowest empty slot). */
  quickBuild(pick: BoardPick): void;
  /** Slot a quick build would target, or null when the hex is full. */
  quickSlot(pick: BoardPick): SlotIndex | null;
  /** Short failure messages (quick build). */
  onNotice(cb: (msg: string) => void): void;
  /** Called on every pointer move with the hovered hex (null off-board). */
  onHover(cb: (hexId: HexId | null) => void): void;
  handleEvent(e: SessionEvent): void;
  dispose(): void;
}

export function createInteraction(session: GameSession, board: BoardView): Interaction {
  let mode: Mode = { kind: 'idle' };
  let selected: HexId | null = null;
  let lastBuilt: BuildingId | null = null;
  let shiftHeld = false;
  let hovered: BoardPick | null = null;
  const noticeListeners: ((m: string) => void)[] = [];
  const notice = (m: string) => { for (const l of noticeListeners) l(m); };
  const flashInvalid = (id: HexId) => {
    board.setHighlights('invalid', [id]);
    setTimeout(() => board.setHighlights('invalid', []), 400);
  };

  const quickSlot = (pick: BoardPick): SlotIndex | null => {
    const slots = session.state.hexes[pick.hexId]?.slots;
    if (!slots) return null;
    if (pick.slot !== null && slots[pick.slot].building === null) return pick.slot;
    const i = slots.findIndex((sl) => sl.building === null);
    return i < 0 ? null : (i as SlotIndex);
  };

  const build: Interaction['build'] = (hexId, slot, building) => {
    const r = session.placeBuilding(hexId, slot, building);
    if (r.ok) { lastBuilt = building; changed(); }
    return r;
  };

  const quickBuild = (pick: BoardPick) => {
    if (lastBuilt === null || mode.kind !== 'idle') return;
    const slot = quickSlot(pick);
    let reason: string | null = null;
    if (slot === null) reason = 'All slots on this tile are full.';
    else {
      const r = build(pick.hexId, slot, lastBuilt);
      if (r.ok) return;
      reason = r.reason;
    }
    flashInvalid(pick.hexId);
    notice(reason);
  };
  const listeners: (() => void)[] = [];
  const hoverListeners: ((id: HexId | null) => void)[] = [];
  const changed = () => { for (const l of listeners) l(); };

  const canPlaceCore = () => {
    const s = session.state;
    return s.status === 'playing' && !s.pendingOffer && !s.activeSpread && s.coreStack.length > 0;
  };

  const setMode = (m: Mode) => {
    mode = m;
    board.setHighlights('legalCore', m.kind === 'placeCore' ? legalCoreSites(session.state) : []);
    changed();
  };

  const select = (id: HexId | null) => {
    selected = id;
    board.setHighlights('selected', id === null ? [] : [id]);
    changed();
  };

  const cancel = () => {
    if (mode.kind === 'placeCore') setMode({ kind: 'idle' });
    else if (selected !== null) select(null);
  };

  const offPointer = board.onPointer((pick, kind) => {
    if (kind === 'move') {
      hovered = pick;
      board.setHighlights('hover', pick ? [pick.hexId] : []);
      for (const l of hoverListeners) l(pick ? pick.hexId : null);
      return;
    }
    if (kind === 'secondary') { cancel(); return; }
    if (!pick) return;
    if (mode.kind === 'placeCore') {
      const r = session.placeCore(pick.hexId, mode.stackIndex);
      if (r.ok) { setMode({ kind: 'idle' }); select(null); }
      else {
        flashInvalid(pick.hexId);
      }
      return;
    }
    if (shiftHeld) { quickBuild(pick); return; }
    select(pick.hexId === selected ? null : pick.hexId);
  });

  const typing = (t: EventTarget | null) =>
    t instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName);
  const setShift = (v: boolean) => {
    if (shiftHeld === v) return;
    shiftHeld = v;
    for (const l of hoverListeners) l(hovered ? hovered.hexId : null);
  };
  const onKey = (ev: KeyboardEvent) => {
    if (ev.key === 'Shift') setShift(true);
    else if (ev.key === 'Escape') cancel();
    else if ((ev.key === 'r' || ev.key === 'R') && !typing(ev.target) && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
      if (hovered) quickBuild(hovered);
    }
  };
  const onKeyUp = (ev: KeyboardEvent) => { if (ev.key === 'Shift') setShift(false); };
  const onBlur = () => setShift(false);
  document.addEventListener('keydown', onKey);
  document.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);

  return {
    get mode() { return mode; },
    get selected() { return selected; },
    get lastBuilt() { return lastBuilt; },
    get shiftHeld() { return shiftHeld; },
    get hovered() { return hovered; },
    clearLastBuilt() { lastBuilt = null; changed(); },
    build, quickBuild, quickSlot,
    onNotice(cb) { noticeListeners.push(cb); },
    enterCorePlacement(stackIndex) {
      if (!canPlaceCore()) return false;
      setMode({ kind: 'placeCore', stackIndex });
      return true;
    },
    cancel,
    select,
    onChange(cb) { listeners.push(cb); },
    onHover(cb) { hoverListeners.push(cb); },
    handleEvent(e) {
      switch (e.type) {
        case 'runStarted':
          mode = { kind: 'idle' }; selected = null; lastBuilt = null;
          board.setHighlights('legalCore', []); board.setHighlights('selected', []);
          changed();
          break;
        case 'offerShown': case 'spreadStarted': case 'runEnded':
          if (mode.kind === 'placeCore') setMode({ kind: 'idle' });
          break;
        case 'offerResolved': case 'spreadFinished': changed(); break;
      }
    },
    dispose() {
      offPointer();
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    },
  };
}
