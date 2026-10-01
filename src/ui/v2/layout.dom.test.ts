// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { compactDetail, deckContentWidth, deckMetrics as deckMetricsForTest, detailWidth, installJournalLayout, overlaps, type PanelRect } from './layout';
const cleanup: (() => void)[] = [];
afterEach(() => { cleanup.splice(0).forEach(fn => fn()); document.body.replaceChildren(); vi.restoreAllMocks(); });
const bounds = (r: PanelRect) => ({ left: r.x, top: r.y, right: r.x + r.width, bottom: r.y + r.height, x: r.x, y: r.y, width: r.width, height: r.height, toJSON() {} });
const inlineBounds = (n: HTMLElement, w: number, h: number): PanelRect => {
  const num = (v: string) => parseFloat(v), right = num(n.style.right), bottom = num(n.style.bottom);
  const left = n.style.left.startsWith('calc') ? w / 2 - 148 : num(n.style.left);
  const width = n.style.width === 'fit-content' ? num(n.style.maxWidth) : num(n.style.width);
  const height = n.style.height === 'auto' ? n.getBoundingClientRect().height : num(n.style.height);
  return { x: n.style.left === 'auto' ? w - right - width : left,
    y: n.style.top === 'auto' ? h - bottom - height : num(n.style.top), width, height };
};

describe('live journal fixed layout', () => {
  for (const [width, height] of [[1280, 720], [1024, 640]]) it(`applies separate desktop rectangles and follows measured notes at ${width}×${height}`, () => {
    const host = document.createElement('div'), stack = document.createElement('div'), tutorial = document.createElement('div'), note = document.createElement('section');
    tutorial.id = 'tutorial'; note.className = 'assistant-panel'; note.dataset.collapsed = 'false'; note.dataset.line = 'biomes'; tutorial.append(note);
    host.append(stack); for (const cls of ['j-top', 'j-topright', 'j-detail', 'j-deck', 'j-triangle']) { const n = document.createElement('div'); n.className = cls; host.append(n); }
    document.body.append(host, tutorial);
    vi.spyOn(host.querySelector<HTMLElement>('.j-detail')!, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 0, y: 0, width: detailWidth(viewportWidth), height: 176 }));
    vi.spyOn(host.querySelector<HTMLElement>('.j-deck')!, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 0, y: 0, width: 248, height: 122 }));
    let stackHeight = 176, noteHeight = 200, viewportWidth = width, viewportHeight = height;
    vi.spyOn(window, 'innerWidth', 'get').mockImplementation(() => viewportWidth);
    vi.spyOn(window, 'innerHeight', 'get').mockImplementation(() => viewportHeight);
    vi.spyOn(host, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 0, y: 0, width, height }));
    vi.spyOn(stack, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 16, y: 16, width: 248, height: stackHeight }));
    vi.spyOn(note, 'getBoundingClientRect').mockImplementation(() => bounds({ x: 0, y: 0, width: 248, height: noteHeight }));
    cleanup.push(installJournalLayout(host, stack));
    const panels = () => [...host.children].filter(n => n !== stack).map(n => inlineBounds(n as HTMLElement, viewportWidth, viewportHeight));
    const tutorialRect = () => ({ x: parseFloat(tutorial.style.getPropertyValue('--tutorial-left')), y: parseFloat(tutorial.style.getPropertyValue('--tutorial-top')), width: parseFloat(tutorial.style.getPropertyValue('--tutorial-width')), height: noteHeight });
    const check = () => {
      const all = [bounds({ x: 16, y: 16, width: 248, height: stackHeight }), ...panels(), tutorialRect()];
      for (let i = 0; i < all.length; i++) {
        expect(all[i].x).toBeGreaterThanOrEqual(16); expect(all[i].y).toBeGreaterThanOrEqual(16);
        expect(all[i].x + all[i].width).toBeLessThanOrEqual(viewportWidth - 16); expect(all[i].y + all[i].height).toBeLessThanOrEqual(viewportHeight - 16);
        for (let j = i + 1; j < all.length; j++) expect(overlaps(all[i], all[j]), `${i}/${j}`).toBe(false);
      }
    };
    check(); expect(tutorialRect().y).toBe(204);
    stackHeight = 234; noteHeight = 56; note.dataset.collapsed = 'true'; note.dataset.line = 'buildings'; window.dispatchEvent(new Event('resize'));
    check(); expect(tutorialRect().y).toBe(262);
    noteHeight = 320; note.dataset.collapsed = 'false'; window.dispatchEvent(new Event('resize'));
    check(); expect(tutorialRect().x).toBe(28 + detailWidth(viewportWidth)); expect(tutorialRect().y).toBe(108);
    viewportWidth = 1100; viewportHeight = 660; window.dispatchEvent(new Event('resize')); check();
    const triangle = host.querySelector<HTMLElement>('.j-triangle')!;
    expect(inlineBounds(triangle, viewportWidth, viewportHeight).x).toBe(852);
    expect(triangle.style.right).toBe('16px'); expect(triangle.style.bottom).toBe('16px');
    viewportWidth = 1024; viewportHeight = 640; window.dispatchEvent(new Event('resize')); check();
    note.dataset.line = 'biomes'; noteHeight = 260; window.dispatchEvent(new Event('resize')); check(); expect(tutorialRect().x).toBe(28 + detailWidth(viewportWidth));
  });
});

// Happy DOM has no layout engine: these measured heights model complete rows,
// including the recipe line that CSS removes only in compact mode.
function measuredDetail(rules: number, combos: number) {
  const panel = document.createElement('div'); panel.className = 'j-detail';
  panel.innerHTML = '<div class="j-detail-head">Building</div><div class="j-row">Cost: Free</div><div class="j-row">Base yield: +2 wood</div>'
    + Array.from({ length: rules }, (_, i) => `<div class="j-row j-rule">Terrain bonus ${i}</div>`).join('')
    + Array.from({ length: combos }, (_, i) => `<div class="j-row j-combo">Combo ${i}<span class="j-combo-recipe">Sawmill + Farm</span></div>`).join('')
    + '<div class="j-row">On the board: 1</div>';
  vi.spyOn(panel, 'getBoundingClientRect').mockImplementation(() => {
    const optional = [...panel.querySelectorAll<HTMLElement>('.j-rule, .j-combo, .j-detail-more')].filter(n => !n.hidden);
    const extraRecipes = panel.classList.contains('j-detail-compact') ? 0 : optional.filter(n => n.classList.contains('j-combo')).length * 17;
    return bounds({ x: 16, y: 0, width: 340, height: 130 + optional.length * 20 + extraRecipes });
  });
  return panel;
}

describe('content sizing and whole-row detail compaction', () => {
  for (const [width, height] of [[1280, 720], [1024, 640]]) {
    for (const count of [5, 9]) it(`centers ${count} cards with no empty trailing panel at ${width}×${height}`, () => {
      vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(width);
      vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
      const host = document.createElement('div'), stack = document.createElement('div');
      const detail = measuredDetail(6, 8), deck = document.createElement('div'); deck.className = 'j-deck';
      const strip = document.createElement('div'); strip.className = 'j-deck-strip';
      for (let i = 0; i < count; i++) { const card = document.createElement('button'); card.className = 'j-card'; strip.append(card); }
      deck.append(strip); host.append(stack, detail, deck);
      for (const cls of ['j-top', 'j-topright', 'j-triangle']) { const panel = document.createElement('div'); panel.className = cls; host.append(panel); }
      const tutorial = document.createElement('div'); tutorial.id = 'tutorial';
      const note = document.createElement('section'); note.className = 'assistant-panel'; note.dataset.collapsed = 'true'; note.dataset.line = 'buildings'; tutorial.append(note);
      vi.spyOn(note, 'getBoundingClientRect').mockReturnValue(bounds({ x: 16, y: 262, width: 248, height: 56 }));
      document.body.append(host, tutorial);
      vi.spyOn(stack, 'getBoundingClientRect').mockReturnValue(bounds({ x: 16, y: 16, width: 248, height: 234 }));
      vi.spyOn(deck, 'getBoundingClientRect').mockReturnValue(bounds({ x: 0, y: 0, width: 0, height: 136 }));
      cleanup.push(installJournalLayout(host, stack));
      const actual = inlineBounds(deck, width, height), d = inlineBounds(detail, width, height);
      const freeLeft = 28 + detailWidth(width), freeRight = width - 260, available = freeRight - freeLeft;
      expect(deck.style.width).toBe('fit-content'); expect(deck.style.right).toBe('auto');
      expect(actual.width).toBe(Math.min(deckContentWidth(width, count), available));
      expect(actual.x + actual.width / 2).toBe((freeLeft + freeRight) / 2);
      expect(d.width).toBe(width === 1280 ? 340 : 280); expect(detail.style.height).toBe('auto');
      expect(d.y).toBeGreaterThanOrEqual(16 + 234 + 12); expect(overlaps(actual, d)).toBe(false);
      expect([...detail.querySelectorAll<HTMLElement>('.j-rule')].filter(n => !n.hidden)).toHaveLength(2);
      expect([...detail.querySelectorAll<HTMLElement>('.j-combo')].filter(n => !n.hidden)).toHaveLength(2);
      expect(detail.querySelector('.j-detail-more')?.textContent).toBe('+10 more, see Journal');
      const rectangles = [d, actual, { x: 16, y: 16, width: 248, height: 234 }, { x: 16, y: 262, width: 248, height: 56 },
        ...['.j-top', '.j-topright', '.j-triangle'].map(selector => inlineBounds(host.querySelector<HTMLElement>(selector)!, width, height))];
      for (const [i, rect] of rectangles.entries()) {
        expect(rect.x).toBeGreaterThanOrEqual(16); expect(rect.y).toBeGreaterThanOrEqual(16);
        expect(rect.x + rect.width).toBeLessThanOrEqual(width - 16); expect(rect.y + rect.height).toBeLessThanOrEqual(height - 16);
        for (const other of rectangles.slice(i + 1)) expect(overlaps(rect, other)).toBe(false);
      }
    });
  }
  it('keeps all complete rows when they fit, and restores them after the available space grows', () => {
    const panel = measuredDetail(5, 5);
    const natural = panel.getBoundingClientRect().height;
    expect(compactDetail(panel, natural)).toBe(natural); expect(panel.querySelectorAll('[hidden]')).toHaveLength(0);
    expect(compactDetail(panel, 240)).toBeLessThanOrEqual(240);
    expect(panel.querySelector('.j-detail-more')?.textContent).toBe('+6 more, see Journal');
    expect(compactDetail(panel, natural)).toBe(natural);
    expect([...panel.querySelectorAll<HTMLElement>('.j-rule, .j-combo')].every(n => !n.hidden)).toBe(true);
    expect(panel.querySelector<HTMLElement>('.j-detail-more')?.hidden).toBe(true);
  });
  it('can remove additional complete rows for a tall stack without a detail scrollbar', () => {
    const panel = measuredDetail(3, 3);
    expect(compactDetail(panel, 190)).toBeLessThanOrEqual(190);
    expect(panel.querySelector('.j-detail-more')?.textContent).toBe('+4 more, see Journal');
  });
});


describe('layout CSS contract', () => {
  it('uses natural heights, complete rewards, and the same deck metrics as the rectangle model', () => {
    const style = document.createElement('style'); style.textContent = readFileSync('src/ui/v2/styles.css', 'utf8');
    const host = document.createElement('div'); host.className = 'jhud';
    host.innerHTML = '<div class="j-panel j-detail"><div class="j-combo"><span class="j-combo-reward">→ +3 food</span><span class="j-combo-recipe">Sawmill + Farm</span></div></div><div class="j-panel j-deck"><div class="j-deck-strip"><button class="j-card"></button></div></div>';
    document.body.append(style, host);
    const detail = host.querySelector<HTMLElement>('.j-detail')!, deck = host.querySelector<HTMLElement>('.j-deck')!;
    const css = (selector: string) => getComputedStyle(host.querySelector(selector)!);
    expect(css('.j-detail').height).toBe('auto'); expect(css('.j-detail').overflow).toBe('visible');
    expect(css('.j-deck').width).toBe('fit-content'); expect(css('.j-deck-strip').overflowX).toBe('auto');
    expect(css('.j-combo-reward').whiteSpace).toBe('nowrap');
    detail.classList.add('j-detail-compact'); expect(css('.j-combo-recipe').display).toBe('none');
    for (const width of [1024, 1280]) {
      const metrics = deckMetricsForTest(width);
      deck.style.setProperty('--j-card-width', `${metrics.card}px`); deck.style.setProperty('--j-card-gap', `${metrics.gap}px`);
      const card = css('.j-card'), strip = css('.j-deck-strip'), panel = css('.j-deck');
      expect(parseFloat(card.width)).toBe(metrics.card); expect(parseFloat(strip.gap)).toBe(metrics.gap);
      const padding = parseFloat(strip.paddingLeft) + parseFloat(strip.paddingRight) + parseFloat(panel.paddingLeft) + parseFloat(panel.paddingRight) + parseFloat(panel.borderLeftWidth) + parseFloat(panel.borderRightWidth);
      for (const count of [5, 9]) expect(count * parseFloat(card.width) + (count - 1) * parseFloat(strip.gap) + padding).toBe(deckContentWidth(width, count));
    }
  });
});

describe('live content changes', () => {
  it('resizes five/nine-card decks after render and settles after deep detail compaction', async () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(640);
    const host = document.createElement('div'), stack = document.createElement('div');
    const detail = measuredDetail(6, 8), deck = document.createElement('div'); deck.className = 'j-deck';
    const strip = document.createElement('div'); strip.className = 'j-deck-strip'; deck.append(strip);
    const cards = Array.from({ length: 9 }, () => { const card = document.createElement('button'); card.className = 'j-card'; return card; });
    strip.append(...cards.slice(0, 5)); host.append(stack, detail, deck); document.body.append(host);
    vi.spyOn(stack, 'getBoundingClientRect').mockReturnValue(bounds({ x: 16, y: 16, width: 248, height: 400 }));
    cleanup.push(installJournalLayout(host, stack));
    expect(deck.style.maxWidth).toBe('452px');
    strip.append(...cards.slice(5));
    await vi.waitFor(() => expect(deck.style.maxWidth).toBe('456px'));
    expect(detail.querySelector('.j-detail-more')?.textContent).toBe('+12 more, see Journal');
    const measurements = vi.mocked(detail.getBoundingClientRect).mock.calls.length;
    await new Promise(resolve => setTimeout(resolve, 30));
    expect(vi.mocked(detail.getBoundingClientRect).mock.calls.length).toBe(measurements);
    cards.slice(5).forEach(card => card.remove());
    await vi.waitFor(() => expect(deck.style.maxWidth).toBe('452px'));
  });
});
