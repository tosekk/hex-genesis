import type { GameSession } from '../core/contracts';
import type { SlotIndex } from '../core/types';
import { demolishRefund, rosterFor } from '../sim/economy';
import { BIOME_LABEL, buildingName, cap, el, fmtResources } from './format';
import type { Interaction } from './interaction';
import { renderPreview } from './preview';

export function createHexPanel(root: HTMLElement, session: GameSession, ui: Interaction) {
  const panel = el('div', 'panel hex-panel');
  panel.hidden = true;
  root.appendChild(panel);

  function render(): void {
    const id = ui.selected;
    panel.replaceChildren();
    if (id === null) { panel.hidden = true; return; }
    panel.hidden = false;
    const s = session.state;
    const cfg = s.config;
    const hex = s.hexes[id];
    const locked = s.activeSpread?.locked[id] === true;

    const head = el('div', 'panel-title', `Tile ${hex.col},${hex.row}`);
    const close = el('button', 'x', '×');
    close.addEventListener('click', () => ui.select(null));
    head.appendChild(close);
    panel.appendChild(head);
    panel.appendChild(el('div', 'hex-info',
      `${cap(hex.terrain === 'hill' ? 'plain' : hex.terrain)} · ${hex.biome ? BIOME_LABEL[hex.biome] : 'Dead land'} · elevation ${hex.elevation}`));
    if (locked) { panel.appendChild(el('div', 'hint', 'Locked (spreading)')); return; }
    if (!hex.placeable) { panel.appendChild(el('div', 'hint', 'Nothing can be built here.')); return; }
    if (hex.biome === null) { panel.appendChild(el('div', 'hint', 'Not terraformed yet.')); return; }

    const pv = el('div', 'preview');
    const roster = rosterFor(s, id);
    for (let i = 0; i < 3; i++) {
      const slot = i as SlotIndex;
      const cell = el('div', 'slot');
      cell.appendChild(el('div', 'slot-title', `Slot ${i + 1}`));
      const bId = hex.slots[slot].building;
      if (bId) {
        cell.appendChild(el('div', 'slot-building', buildingName(cfg, bId)));
        const refund = demolishRefund(s, bId);
        const btn = el('button', 'btn danger demolish', `Demolish (refund ${fmtResources(refund)})`);
        btn.addEventListener('click', () => session.demolish(id, slot));
        cell.appendChild(btn);
      } else {
        for (const b of roster) {
          const def = cfg.buildings[b];
          const affordable = Object.entries(def.cost).every(([r, v]) => (s.resources[r] ?? 0) >= v);
          const btn = el('button', 'btn build', `${def.name} — ${fmtResources(def.cost)}`);
          btn.dataset.building = b;
          btn.disabled = !affordable;
          btn.addEventListener('click', () => ui.build(id, slot, b));
          btn.addEventListener('mouseenter', () => renderPreview(pv, session.preview(id, slot, b), cfg));
          btn.addEventListener('mouseleave', () => renderPreview(pv, null, cfg));
          cell.appendChild(btn);
        }
      }
      panel.appendChild(cell);
    }
    panel.appendChild(pv);
  }

  render();
  return { render, dispose: () => panel.remove() };
}
