import type { GameSession } from '../core/contracts';
import { BIOME_ICON, BIOME_LABEL, el, icon } from './format';
import { legalCoreSites } from '../sim/spread/spread';
import type { Interaction } from './interaction';

export function createCoreStack(root: HTMLElement, session: GameSession, ui: Interaction) {
  const wrap = el('div', 'panel core-stack');
  root.appendChild(wrap);

  function render(): void {
    const s = session.state;
    wrap.replaceChildren();
    wrap.appendChild(el('div', 'panel-title', 'Cores'));
    if (s.activeSpread) wrap.appendChild(el('div', 'hint', 'Terraforming…'));
    else if (s.coreStack.length === 0) wrap.appendChild(el('div', 'hint', 'No cores held'));
    const noSite = s.coreStack.length > 0 && !s.activeSpread && legalCoreSites(s).length === 0;
    s.coreStack.forEach((biome, i) => {
      const chip = el('button', `chip biome-${biome}`);
      chip.append(icon(biome, BIOME_ICON[biome]), ` ${BIOME_LABEL[biome]}`);
      const placing = ui.mode.kind === 'placeCore' && ui.mode.stackIndex === i;
      if (placing) chip.classList.add('active');
      chip.disabled = !!s.activeSpread || !!s.pendingOffer || s.status !== 'playing' || noSite;
      if (noSite) {
        chip.classList.add('no-site');
        chip.append(el('small', 'chip-note', 'No legal site left'));
        chip.title = 'There is no legal tile left for a core (§10). Holding it is harmless.';
      }
      chip.addEventListener('click', () => (placing ? ui.cancel() : ui.enterCorePlacement(i)));
      wrap.appendChild(chip);
    });
    if (noSite) wrap.appendChild(el('div', 'hint', 'No legal site left. Spare cores are harmless.'));
    if (ui.mode.kind === 'placeCore') wrap.appendChild(el('div', 'hint', 'Pick a highlighted tile (Esc to cancel)'));
  }

  render();
  return { render, dispose: () => wrap.remove() };
}
