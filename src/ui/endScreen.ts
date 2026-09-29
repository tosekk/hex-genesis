import type { GameSession } from '../core/contracts';
import type { RunStats } from '../core/types';
import { cap, el, fmtTime } from './format';

export function randomSeed(): number {
  return crypto.getRandomValues(new Uint32Array(1))[0];
}

const TITLE = { won: 'Planet terraformed!', lost: 'The run is stuck', ended: 'Run ended', playing: '' } as const;

export function createEndScreen(root: HTMLElement, session: GameSession) {
  const overlay = el('div', 'overlay end-overlay');
  overlay.hidden = true;
  root.appendChild(overlay);

  function show(stats: RunStats): void {
    overlay.replaceChildren();
    const box = el('div', 'panel modal end-screen');
    box.appendChild(el('h2', undefined, TITLE[stats.status]));
    const life = el('div', 'end-lifetime');
    life.appendChild(el('div', 'hint', 'Resources produced this run'));
    for (const r of session.state.config.resources) {
      const row = el('div', 'end-row', `${cap(r)}: ${stats.lifetime[r] ?? 0}`);
      row.dataset.resource = r;
      life.appendChild(row);
    }
    box.appendChild(life);
    box.appendChild(el('div', 'end-time', `Time: ${fmtTime(stats.elapsedMs)}`));
    box.appendChild(el('div', 'end-seed', `Seed: ${stats.seed} (type it below to replay this world)`));
    const input = el('input', 'seed-input');
    input.type = 'text';
    input.placeholder = 'seed (blank = random)';
    const btn = el('button', 'btn primary new-run', 'New Run');
    btn.addEventListener('click', () => {
      const v = input.value.trim();
      session.newRun(/^\d+$/.test(v) ? Number(v) >>> 0 : randomSeed());
    });
    box.append(input, btn);
    overlay.appendChild(box);
    overlay.hidden = false;
  }

  return { show, hide() { overlay.hidden = true; overlay.replaceChildren(); }, dispose: () => overlay.remove() };
}
