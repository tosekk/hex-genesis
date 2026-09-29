import type { GameConfig, PlacementPreview } from '../core/types';
import { el, fmtResources } from './format';

/** Renders ONLY what the PlacementPreview contains. Never computes or hints at undiscovered combos (§32, §38). */
export function renderPreview(box: HTMLElement, p: PlacementPreview | null, cfg: GameConfig): void {
  box.replaceChildren();
  if (!p) return;
  box.appendChild(el('div', 'pv-line', `Cost: ${fmtResources(p.cost)}${p.affordable ? '' : ' (can’t afford)'}`));
  if (p.slotAlreadyPaid) {
    box.appendChild(el('div', 'pv-line', 'This slot already paid its base yield.'));
  } else {
    box.appendChild(el('div', 'pv-line pv-base', `Base yield: ${fmtResources(p.base, true)}`));
    const { raw, terrain, zone } = p.baseBreakdown;
    const parts = [
      `raw ${fmtResources(raw)}`,
      ...(Object.keys(terrain).length ? [`terrain ${fmtResources(terrain, true)}`] : []),
      ...(Object.keys(zone).length ? [`zone ${fmtResources(zone, true)}`] : []),
    ];
    box.appendChild(el('div', 'pv-sub', parts.join(' · ')));
  }
  for (const c of p.combos) {
    const name = cfg.combos.find((d) => d.id === c.match.comboId)?.name ?? c.match.comboId;
    const row = el('div', 'pv-combo', `${name}: ${fmtResources(c.amount, true)}`);
    row.dataset.comboId = c.match.comboId;
    box.appendChild(row);
  }
}
