// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { installJournalLayout, overlaps, type PanelRect } from './layout';
const cleanup: (() => void)[] = [];
afterEach(() => { cleanup.splice(0).forEach(fn => fn()); document.body.replaceChildren(); vi.restoreAllMocks(); });
const bounds = (r: PanelRect) => ({ left: r.x, top: r.y, right: r.x + r.width, bottom: r.y + r.height, x: r.x, y: r.y, width: r.width, height: r.height, toJSON() {} });
const inlineBounds = (n: HTMLElement): PanelRect => ({ x: parseFloat(n.style.left), y: parseFloat(n.style.top), width: parseFloat(n.style.width), height: parseFloat(n.style.height) });

describe('live journal fixed layout', () => {
  for (const [width, height] of [[1280, 720], [1024, 640]]) it(`applies separate desktop rectangles and follows measured notes at ${width}×${height}`, () => {
    const host = document.createElement('div'), stack = document.createElement('div'), tutorial = document.createElement('div'), note = document.createElement('section');
    tutorial.id = 'tutorial'; note.className = 'assistant-panel'; note.dataset.collapsed = 'false'; note.dataset.line = 'biomes'; tutorial.append(note);
    host.append(stack); for (const cls of ['j-top', 'j-topright', 'j-detail', 'j-deck', 'j-triangle']) { const n = document.createElement('div'); n.className = cls; host.append(n); }
    document.body.append(host, tutorial);
    let stackHeight = 176, noteHeight = 200;
    vi.spyOn(host, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 0, y: 0, width, height }));
    vi.spyOn(stack, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 16, y: 16, width: 248, height: stackHeight }));
    vi.spyOn(note, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 0, y: 0, width: 248, height: noteHeight }));
    cleanup.push(installJournalLayout(host, stack));
    const panels = () => [...host.children].filter(n => n !== stack).map(n => inlineBounds(n as HTMLElement));
    const tutorialRect = () => ({ x: parseFloat(tutorial.style.getPropertyValue('--tutorial-left')), y: parseFloat(tutorial.style.getPropertyValue('--tutorial-top')), width: parseFloat(tutorial.style.getPropertyValue('--tutorial-width')), height: noteHeight });
    const check = () => {
      const all = [bounds({ x: 16, y: 16, width: 248, height: stackHeight }), ...panels(), tutorialRect()];
      for (let i = 0; i < all.length; i++) {
        expect(all[i].x).toBeGreaterThanOrEqual(16); expect(all[i].y).toBeGreaterThanOrEqual(16);
        expect(all[i].x + all[i].width).toBeLessThanOrEqual(width - 16); expect(all[i].y + all[i].height).toBeLessThanOrEqual(height - 16);
        for (let j = i + 1; j < all.length; j++) expect(overlaps(all[i], all[j]), `${i}/${j}`).toBe(false);
      }
    };
    check(); expect(tutorialRect().y).toBe(204);
    stackHeight = 234; noteHeight = 56; note.dataset.collapsed = 'true'; note.dataset.line = 'buildings'; window.dispatchEvent(new Event('resize'));
    check(); expect(tutorialRect().y).toBe(262);
    noteHeight = 320; note.dataset.collapsed = 'false'; window.dispatchEvent(new Event('resize'));
    check(); expect(tutorialRect().x).toBe(276); expect(tutorialRect().y).toBe(108);
    note.dataset.line = 'biomes'; noteHeight = 260; window.dispatchEvent(new Event('resize')); check(); expect(tutorialRect().x).toBe(276);
  });
});
