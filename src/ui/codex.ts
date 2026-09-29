import type { GameSession } from '../core/contracts';
import { buildingName, el, fmtResources } from './format';

/** P2: discovered combos only (names, recipes, amounts). */
export function createCodex(root: HTMLElement, session: GameSession) {
  const box = el('details', 'panel codex');
  root.appendChild(box);
  function render(): void {
    const s = session.state;
    box.replaceChildren(el('summary', undefined, `Combos discovered (${s.discoveredCombos.length})`));
    for (const id of s.discoveredCombos) {
      const def = s.config.combos.find((c) => c.id === id);
      if (!def) continue;
      const row = el('div', 'codex-row');
      row.append(el('b', undefined, def.name),
        el('span', undefined, ` ${def.buildings.map((b) => buildingName(s.config, b)).join(' + ')} → ${fmtResources(def.amount, true)}`));
      box.appendChild(row);
    }
  }
  render();
  return { render, dispose: () => box.remove() };
}
