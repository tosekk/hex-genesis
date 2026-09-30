import type { GameSession } from '../core/contracts';
import { BIOME_ICON, BIOME_LABEL, el, icon } from './format';
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
    s.coreStack.forEach((biome, i) => {
      const chip = el('button', `chip biome-${biome}`);
      chip.append(icon(biome, BIOME_ICON[biome]), ` ${BIOME_LABEL[biome]}`);
      const placing = ui.mode.kind === 'placeCore' && ui.mode.stackIndex === i;
      if (placing) chip.classList.add('active');
      chip.disabled = !!s.activeSpread || !!s.pendingOffer || s.status !== 'playing';
      chip.addEventListener('click', () => (placing ? ui.cancel() : ui.enterCorePlacement(i)));
      wrap.appendChild(chip);
    });
    if (ui.mode.kind === 'placeCore') wrap.appendChild(el('div', 'hint', 'Pick a highlighted tile (Esc to cancel)'));
  }

  render();
  return { render, dispose: () => wrap.remove() };
}
