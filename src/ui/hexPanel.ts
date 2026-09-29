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
    const firstEmpty = hex.slots.findIndex((sl) => sl.building === null);
    for (let i = 0; i < 3; i++) {
      const slot = i as SlotIndex;
      // Only the next empty slot is expanded, so 9-building rosters don't overflow the panel.
      const cell = hex.slots[slot].building === null ? el('details', 'slot') : el('div', 'slot');
      if (cell instanceof HTMLDetailsElement) cell.open = i === firstEmpty;
      const title = hex.slots[slot].building === null ? el('summary', 'slot-title', `Slot ${i + 1} · empty`) : el('div', 'slot-title', `Slot ${i + 1}`);
      cell.appendChild(title);
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
          const btn = el('button', 'btn build');
          btn.dataset.building = b;
          const nameBox = el('span', 'b-name');
          nameBox.append(def.name, el('small', 'b-yield', `yields ${fmtResources(def.baseYield, true)}`));
          btn.appendChild(nameBox);
          const costs = el('span', 'b-cost');
          const missing: string[] = [];
          for (const [r, v] of Object.entries(def.cost)) {
            const short = (s.resources[r] ?? 0) < v;
            if (short) missing.push(`${v - (s.resources[r] ?? 0)} more ${r}`);
            costs.appendChild(el('span', short ? 'c short' : 'c', `${v} ${r}`));
          }
          btn.appendChild(costs);
          if (missing.length) btn.title = `Need ${missing.join(', ')}`;
          // aria-disabled (not `disabled`) so hovering still shows the preview for things you can't afford yet.
          if (!affordable) { btn.classList.add('unaffordable'); btn.setAttribute('aria-disabled', 'true'); }
          btn.addEventListener('click', () => { if (affordable) ui.build(id, slot, b); });
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
