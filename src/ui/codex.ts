import type { GameSession } from '../core/contracts';
import { buildingName, el, fmtResources } from './format';

/** P2: discovered combos only (names, recipes, amounts). */
export function createCodex(root: HTMLElement, session: GameSession) {
  const box = el('details', 'panel codex');
  root.appendChild(box);
  function render(): void {
    const s = session.state;
    box.replaceChildren(el('summary', undefined, `Combos discovered (${s.discoveredCombos.length})`));
    if (s.discoveredCombos.length === 0) box.appendChild(el('div', 'hint', 'Combine buildings on a tile to discover recipes.'));
    for (const id of s.discoveredCombos) {
      const def = s.config.combos.find((c) => c.id === id);
      if (!def) continue;
      const row = el('div', 'codex-row');
      row.appendChild(el('div', 'codex-name', def.name));
      const recipe = el('div', 'codex-recipe');
      def.buildings.forEach((b, i) => {
        if (i > 0) recipe.appendChild(el('span', 'codex-plus', '+'));
        recipe.appendChild(el('span', 'codex-chip', buildingName(s.config, b)));
      });
      recipe.appendChild(el('span', 'codex-plus', '→'));
      recipe.appendChild(el('span', 'codex-reward', fmtResources(def.amount, true)));
      row.appendChild(recipe);
      box.appendChild(row);
    }
  }
  render();
  return { render, dispose: () => box.remove() };
}
