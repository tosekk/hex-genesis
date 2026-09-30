import type { GameSession } from '../../core/contracts';
import { BIOME_COLORS } from '../../render/palette';
import type { Biome } from '../../core/types';
import { BIOME_ICON, BIOME_LABEL, el, icon } from '../format';
import type { Ctrl } from './ctrl';

/** All circles/labels fit the 232×224 reservation, including a 16 px viewport margin. */
export const TRIANGLE_POS: Record<Biome, [number, number]> = {
  forest: [116, 44], desert: [38, 170], arctic: [194, 170],
  steppe: [77, 107], taiga: [155, 107], polarDesert: [116, 170],
};
export const TRIANGLE_LABELS: Record<Biome, { x: number; y: number; width: number }> = {
  forest: { x: 81, y: 2, width: 70 }, desert: { x: 8, y: 204, width: 60 }, arctic: { x: 165, y: 204, width: 58 },
  steppe: { x: 0, y: 100, width: 48 }, taiga: { x: 184, y: 100, width: 48 }, polarDesert: { x: 73, y: 204, width: 86 },
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
    svg.setAttribute('viewBox', '0 0 232 224');
    svg.setAttribute('class', 'j-tri-lines');
    const line = document.createElementNS(svgNS, 'polygon');
    line.setAttribute('points', `${TRIANGLE_POS.forest} ${TRIANGLE_POS.desert} ${TRIANGLE_POS.arctic}`);
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
      btn.style.left = `${TRIANGLE_POS[b][0]}px`;
      btn.style.top = `${TRIANGLE_POS[b][1]}px`;
      btn.classList.toggle('grey', !active);
      btn.classList.toggle('selected', ctrl.biome === b);
      if (active) btn.style.setProperty('--biome', hex(BIOME_COLORS[b]));
      btn.title = `${BIOME_LABEL[b]}${main ? ` · ${held[b] ?? 0} core${(held[b] ?? 0) === 1 ? '' : 's'} held` : active ? '' : ' (not on the board yet)'}`;
      btn.setAttribute('aria-label', btn.title); btn.setAttribute('aria-pressed', String(ctrl.biome === b));
      btn.appendChild(icon(b, BIOME_ICON[b]));
      const label = el('span', 'j-biome-name', BIOME_LABEL[b]), lp = TRIANGLE_LABELS[b];
      Object.assign(label.style, { left: `${lp.x}px`, top: `${lp.y}px`, width: `${lp.width}px` });
      if (main && (held[b] ?? 0) > 1) btn.appendChild(el('span', 'j-badge', String(held[b])));
      // Main circles are always clickable (browsing); mixed ones only once they exist.
      if (!main && !active) btn.disabled = true;
      btn.addEventListener('click', () => ctrl.selectBiome(ctrl.biome === b ? null : b));
      box.append(btn, label);
    }
  }

  render();
  return { render, dispose: () => box.remove() };
}
