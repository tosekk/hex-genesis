import type { GameSession } from '../../core/contracts';
import { cap, el, icon } from '../format';

/** UI_SPEC §3.1: one pill per resource (icon, current amount, lifetime), pulsing when the amount changes. */
export function createPills(root: HTMLElement, session: GameSession) {
  const bar = el('div', 'j-pills');
  root.appendChild(bar);
  let prev: Record<string, number> = {};

  function render(): void {
    const s = session.state;
    bar.replaceChildren();
    for (const r of s.config.resources) {
      const v = s.resources[r] ?? 0;
      const pill = el('div', 'j-pill');
      pill.dataset.resource = r;
      if (prev[r] !== undefined && prev[r] !== v) pill.classList.add('pulse');
      const figures = el('div', 'j-pill-figures');
      figures.append(el('small', 'j-resource-name', cap(r)), el('span', 'j-amt', String(v)), el('small', 'j-life', `total ${s.lifetime[r] ?? 0}`));
      pill.append(icon(r, cap(r)), figures);
      pill.title = `${cap(r)}: ${v} · lifetime ${s.lifetime[r] ?? 0}`;
      bar.appendChild(pill);
      prev[r] = v;
    }
  }
  render();
  return { render, dispose: () => bar.remove(), reset: () => { prev = {}; } };
}
