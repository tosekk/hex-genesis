import type { GameSession } from '../../core/contracts';
import { BIOME_COLORS } from '../../render/palette';
import type { Biome } from '../../core/types';
import { BIOME_ICON, BIOME_LABEL, el, icon } from '../format';
import type { Ctrl } from './ctrl';

/** Corner / edge-midpoint positions in a 220×200 box (UI_SPEC §3.3). */
const POS: Record<Biome, [number, number]> = {
  forest: [110, 30], desert: [32, 168], arctic: [188, 168],
  steppe: [71, 99], taiga: [149, 99], polarDesert: [110, 168],
};
const MAIN: Biome[] = ['forest', 'desert', 'arctic'];
const MIXED: Biome[] = ['steppe', 'taiga', 'polarDesert'];
const hex = (n: number) => `#${n.toString(16).padStart(6, '0')}`;

/** UI_SPEC §3.3: forest/desert/arctic corners, mixed biomes on the edges; click selects; follows the selected tile. */
export function createTriangle(root: HTMLElement, session: GameSession, ctrl: Ctrl) {
  const box = el('div', 'j-triangle');
  root.appendChild(box);

  function render(): void {
    const s = session.state;
    box.replaceChildren();
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 220 200');
    svg.setAttribute('class', 'j-tri-lines');
    const line = document.createElementNS(svgNS, 'polygon');
    line.setAttribute('points', `${POS.forest} ${POS.desert} ${POS.arctic}`);
    svg.appendChild(line);
    box.appendChild(svg);

    const onBoard = new Set<Biome>();
    for (const h of s.hexes) if (h.biome) onBoard.add(h.biome);
    const held: Record<string, number> = {};
    for (const b of s.coreStack) held[b] = (held[b] ?? 0) + 1;

    for (const b of [...MAIN, ...MIXED]) {
      const main = MAIN.includes(b);
      const active = main ? (held[b] ?? 0) > 0 : onBoard.has(b);
      const btn = el('button', `j-biome ${main ? 'main' : 'mixed'}`);
      btn.dataset.biome = b;
      btn.style.left = `${POS[b][0]}px`;
      btn.style.top = `${POS[b][1]}px`;
      btn.classList.toggle('grey', !active);
      btn.classList.toggle('selected', ctrl.biome === b);
      if (active) btn.style.setProperty('--biome', hex(BIOME_COLORS[b]));
      btn.title = `${BIOME_LABEL[b]}${main ? ` · ${held[b] ?? 0} core${(held[b] ?? 0) === 1 ? '' : 's'} held` : active ? '' : ' (not on the board yet)'}`;
      btn.appendChild(icon(b, BIOME_ICON[b]));
      btn.appendChild(el('span', 'j-biome-name', BIOME_LABEL[b]));
      if (main && (held[b] ?? 0) > 1) btn.appendChild(el('span', 'j-badge', String(held[b])));
      // Main circles are always clickable (browsing); mixed ones only once they exist.
      if (!main && !active) btn.disabled = true;
      btn.addEventListener('click', () => ctrl.selectBiome(ctrl.biome === b ? null : b));
      box.appendChild(btn);
    }
  }

  render();
  return { render, dispose: () => box.remove() };
}
