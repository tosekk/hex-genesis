import type { BoardView, GameSession } from '../core/contracts';
import type { GameState, HexId } from '../core/types';
import { legalCoreSites } from '../sim/spread/spread';
import { el } from './format';
import type { Interaction } from './interaction';

/** Terraformed placeable tiles with an empty slot, the empty-slot count and the total slots on terraformed placeable tiles. Reads state only. */
export function emptySlotSummary(state: Readonly<GameState>): { hexes: HexId[]; slots: number; total: number } {
  const hexes: HexId[] = [];
  let slots = 0;
  let total = 0;
  for (const h of state.hexes) {
    if (!h.placeable || h.biome === null) continue;
    total += h.slots.length;
    const empty = h.slots.filter((s) => s.building === null).length;
    if (empty > 0) { hexes.push(h.id); slots += empty; }
  }
  return { hexes, slots, total };
}

const typing = (t: EventTarget | null) =>
  t instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable);

/** S7: win-progress readout + empty-slot finder (hold Tab, or click the counter, to highlight tiles with an empty slot). */
export function createWinProgress(root: HTMLElement, session: GameSession, board: BoardView, ui: Interaction) {
  const panel = el('div', 'panel win-progress');
  panel.title = 'Win: reach the final threshold before you run out of room.';
  const emptyBtn = el('button', 'wp-empty');
  emptyBtn.title = 'Hold Tab (or click) to highlight every tile with an empty slot';
  const goalRow = el('div', 'wp-goal');
  const sitesRow = el('div', 'wp-row');
  const spreadRow = el('div', 'wp-spread', 'Spread active');
  panel.append(goalRow, emptyBtn, sitesRow, spreadRow);
  root.appendChild(panel);

  let held = false;
  let toggled = false;
  let showing = false;

  emptyBtn.addEventListener('click', () => { toggled = !toggled; refreshHighlight(); });

  function refreshHighlight(): void {
    const s = session.state;
    const want = (held || toggled) && ui.mode.kind === 'idle' && s.status === 'playing';
    emptyBtn.classList.toggle('active', want);
    if (want) {
      const ids = new Set(emptySlotSummary(s).hexes);
      if (ui.selected !== null) ids.add(ui.selected);
      board.setHighlights('selected', [...ids]);
      showing = true;
    } else if (showing) {
      board.setHighlights('selected', ui.selected === null ? [] : [ui.selected]);
      showing = false;
    }
  }

  function render(): void {
    const s = session.state;
    const { slots, total } = emptySlotSummary(s);
    const goal = s.config.thresholds.length;
    goalRow.replaceChildren(`Goal: reach threshold ${goal} · now `, el('b', undefined, `${Math.min(s.thresholdIndex, goal)}/${goal}`));
    emptyBtn.replaceChildren('Slots left: ', el('b', undefined, String(slots)), ` of ${total}`);
    sitesRow.replaceChildren('Legal core sites: ', el('b', undefined, String(legalCoreSites(s).length)));
    spreadRow.hidden = !s.activeSpread;
    refreshHighlight();
  }

  const onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key !== 'Tab' || typing(ev.target) || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    ev.preventDefault(); // Tab is the finder here, not focus navigation
    if (held) return;
    held = true;
    refreshHighlight();
  };
  const release = () => { if (held) { held = false; refreshHighlight(); } };
  const onKeyUp = (ev: KeyboardEvent) => { if (ev.key === 'Tab') release(); };
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', release);

  render();
  return {
    render,
    dispose() {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', release);
      panel.remove();
    },
  };
}
