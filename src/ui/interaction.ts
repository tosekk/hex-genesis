import type { BoardView, GameSession, SessionEvent } from '../core/contracts';
import type { HexId } from '../core/types';
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
  /** Called on every pointer move with the hovered hex (null off-board). */
  onHover(cb: (hexId: HexId | null) => void): void;
  handleEvent(e: SessionEvent): void;
  dispose(): void;
}

export function createInteraction(session: GameSession, board: BoardView): Interaction {
  let mode: Mode = { kind: 'idle' };
  let selected: HexId | null = null;
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
        board.setHighlights('invalid', [pick.hexId]);
        setTimeout(() => board.setHighlights('invalid', []), 400);
      }
      return;
    }
    select(pick.hexId === selected ? null : pick.hexId);
  });

  const onKey = (ev: KeyboardEvent) => { if (ev.key === 'Escape') cancel(); };
  document.addEventListener('keydown', onKey);

  return {
    get mode() { return mode; },
    get selected() { return selected; },
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
          mode = { kind: 'idle' }; selected = null;
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
    },
  };
}
