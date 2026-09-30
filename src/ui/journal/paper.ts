/** UI_SPEC §9 decorations: entirely static, data-free inline SVG. */
const NS = 'http://www.w3.org/2000/svg';
export function paperJournalEnabled(search: string): boolean {
  return new URLSearchParams(search).get('journal') === 'paper';
}
function ornament(className: string, viewBox: string, paths: { d: string; stroke?: string; width?: string }[]): SVGElement {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', className); svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
  for (const item of paths) {
    const path = document.createElementNS(NS, 'path'); path.setAttribute('d', item.d);
    path.setAttribute('fill', 'none'); path.setAttribute('stroke', item.stroke ?? '#2E2A25');
    path.setAttribute('stroke-width', item.width ?? '1.6'); path.setAttribute('stroke-linecap', 'round'); svg.appendChild(path);
  }
  return svg;
}
export function paperBinding(): SVGElement {
  const paths: { d: string; stroke: string; width: string }[] = [];
  for (const y of [60, 200, 340]) {
    paths.push({ d: `M 5,${y} C -1,${y-13} 30,${y-14} 28,${y} C 27,${y+10} 7,${y+11} 5,${y}`, stroke: '#293832', width: '6' });
    paths.push({ d: `M 5,${y-1} C -1,${y-14} 30,${y-15} 28,${y-1} C 27,${y+9} 7,${y+10} 5,${y-1}`, stroke: '#a89877', width: '3.5' });
    paths.push({ d: `M 6,${y-5} C 12,${y-10} 22,${y-10} 27,${y-5}`, stroke: '#f4e6cc', width: '1.4' });
  }
  return ornament('jr-binding', '0 0 32 400', paths);
}
export function decoratePaperPage(page: HTMLElement): void {
  for (const corner of ['tl', 'tr', 'bl', 'br']) page.appendChild(ornament(`jr-flourish jr-flourish-${corner}`, '0 0 48 48', [
    { d: 'M 5 37 L 5 9 Q 5 5 9 5 L 37 5 M 11 32 L 11 15 Q 11 11 15 11 L 32 11' },
    { d: 'M 16 23 C 15 15 27 14 26 20 C 25 26 15 26 19 33 M 23 16 C 29 15 32 18 33 22' },
  ]));
}
