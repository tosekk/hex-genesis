import type { GameSession } from '../../core/contracts';
import type { Resources } from '../../core/types';
import { legalCoreSites } from '../../sim/spread/spread';
import { cap, el, fmtResources } from '../format';
import { type Ctrl, slotSummary } from './ctrl';

/** UI_SPEC §3.2: mission-list threshold stack, T-final pinned, plus the "Slots left" finder counter. */
export function createThresholdStack(root: HTMLElement, session: GameSession, ctrl: Ctrl) {
  const panel = el('div', 'j-panel j-stack');
  root.appendChild(panel);

  const positive = (t: Resources) => Object.entries(t).filter(([, v]) => v > 0);

  function bars(t: Resources): HTMLElement {
    const s = session.state;
    const box = el('div', 'j-bars');
    for (const [r, need] of positive(t)) {
      const have = Math.min(s.lifetime[r] ?? 0, need);
      const row = el('div', 'j-bar');
      row.dataset.resource = r;
      const meter = el('span', 'j-meter');
      const fill = el('span', 'j-meter-fill');
      fill.style.width = `${(have / need) * 100}%`;
      meter.appendChild(fill);
      row.append(el('span', 'j-bar-name', cap(r)), meter, el('span', 'j-bar-num', `${have} / ${need}`));
      box.appendChild(row);
    }
    return box;
  }

  const small = (i: number, t: Resources) => {
    const c = el('div', 'j-tcard collapsed');
    c.dataset.threshold = String(i + 1);
    const targets = positive(t).map(([r, v]) => `${v}${r === 'water' ? 'wa' : r[0]}`).join(' / ');
    c.title = `Threshold ${i + 1}: ${fmtResources(Object.fromEntries(positive(t)))}`;
    c.append(el('b', undefined, `T${i + 1}`), el('span', undefined, ` · ${targets}`));
    return c;
  };

  function render(): void {
    const s = session.state;
    const th = s.config.thresholds;
    const goal = th.length;
    const idx = s.thresholdIndex;
    panel.replaceChildren();

    if (idx > 0) {
      const done = el('div', 'j-done');
      for (let i = 0; i < Math.min(idx, goal); i++) done.appendChild(el('span', 'j-check', '✓'));
      done.title = `${Math.min(idx, goal)} threshold${idx === 1 ? '' : 's'} reached`;
      panel.appendChild(done);
    }
    // Current card (unless the current one IS the pinned goal).
    if (idx < goal - 1) {
      const cur = el('div', 'j-tcard current');
      cur.dataset.threshold = String(idx + 1);
      cur.appendChild(el('div', 'j-tcard-head', `Threshold ${idx + 1} of ${goal}`));
      cur.appendChild(bars(th[idx]));
      cur.appendChild(el('div', 'j-award', '→ new core'));
      panel.appendChild(cur);
      const future = el('div', 'j-future');
      for (let i = idx + 1; i <= Math.min(idx + 2, goal - 2); i++) future.appendChild(small(i, th[i]));
      panel.appendChild(future);
    }
    // Pinned goal.
    const g = el('div', 'j-tcard goal');
    g.dataset.threshold = String(goal);
    g.appendChild(el('div', 'j-tcard-head', `★ T${goal} · GOAL — reach to win`));
    if (idx >= goal) g.appendChild(el('div', 'j-award', 'Reached!'));
    else if (idx === goal - 1) g.appendChild(bars(th[goal - 1]));
    else g.title = `Final targets: ${fmtResources(Object.fromEntries(positive(th[goal - 1])))}`;
    panel.appendChild(g);

    const { empty, total } = slotSummary(s);
    const slots = el('button', 'j-slots');
    slots.title = 'Hold Tab (or click) to highlight every tile with an empty slot';
    slots.classList.toggle('active', ctrl.finderOn);
    slots.append('Slots left ', el('b', undefined, String(empty)), ` of ${total}`);
    slots.addEventListener('click', () => ctrl.toggleFinder());
    panel.appendChild(slots);
    const sites = el('div', 'j-sites');
    sites.append('Legal core sites: ', el('b', undefined, String(legalCoreSites(s).length)));
    if (s.activeSpread) sites.append(el('span', 'j-spread', ' · terraforming'));
    panel.appendChild(sites);
  }

  render();
  return { render, dispose: () => panel.remove() };
}
