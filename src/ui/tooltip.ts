import type { GameSession } from '../core/contracts';
import { el } from './format';
import type { Interaction } from './interaction';

/** S3: hovering a tile that is part of the active spread explains why it can't be used yet. */
export function createLockedTooltip(root: HTMLElement, session: GameSession, ui: Interaction) {
  const tip = el('div', 'tooltip', 'Locked: still terraforming (§11)');
  tip.hidden = true;
  root.appendChild(tip);
  let x = 0, y = 0;
  const onMouse = (ev: MouseEvent) => {
    x = ev.clientX; y = ev.clientY;
    tip.style.left = `${x + 14}px`; tip.style.top = `${y + 14}px`;
  };
  document.addEventListener('mousemove', onMouse);
  ui.onHover((id) => {
    tip.hidden = !(id !== null && session.state.activeSpread?.locked[id] === true);
  });
  return { hide() { tip.hidden = true; }, dispose() { document.removeEventListener('mousemove', onMouse); tip.remove(); } };
}
