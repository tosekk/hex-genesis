import type { GameSession } from '../core/contracts';
import { cap, el, icon } from './format';

/** §39: one line per required resource; never a single combined number. */
export function createResourceBar(root: HTMLElement, session: GameSession) {
  const bar = el('div', 'panel resource-bar');
  root.appendChild(bar);

  function render(): void {
    const s = session.state;
    bar.replaceChildren();
    const target = s.config.thresholds[s.thresholdIndex];
    for (const r of s.config.resources) {
      const row = el('div', 'res-row');
      row.dataset.resource = r;
      const name = el('span', 'res-name');
      name.append(icon(r, ''), cap(r));
      row.appendChild(name);
      row.appendChild(el('span', 'res-amount', String(s.resources[r] ?? 0)));
      row.appendChild(el('span', 'res-life', `lifetime ${s.lifetime[r] ?? 0}`));
      const need = target?.[r];
      if (need !== undefined && need > 0) { // a 0 target is no requirement: show nothing
        const have = s.lifetime[r] ?? 0;
        const prog = el('span', 'res-progress', `${Math.min(have, need)} / ${need}`);
        const meter = el('span', 'meter');
        const fill = el('span', 'meter-fill');
        fill.style.width = `${Math.min(100, need > 0 ? (have / need) * 100 : 100)}%`;
        meter.appendChild(fill);
        row.append(meter, prog);
      }
      bar.appendChild(row);
    }
    const head = el('div', 'res-head', target
      ? `Threshold ${s.thresholdIndex + 1} of ${s.config.thresholds.length}`
      : 'All thresholds reached');
    bar.prepend(head);
  }

  render();
  return { render, dispose: () => bar.remove() };
}
