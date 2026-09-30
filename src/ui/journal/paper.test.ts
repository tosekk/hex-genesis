// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GameSession, SessionEvent } from '../../core/contracts';
import { makeTestState } from '../../core/testing';
import { createJournal } from './journal';
import { paperJournalEnabled } from './paper';
import { readFileSync } from 'node:fs';
const css = readFileSync(`${process.cwd()}/src/ui/journal/paper.css`, 'utf8');

const disposals: (() => void)[] = [];
beforeEach(() => { document.body.replaceChildren(); window.history.replaceState(null, '', '/'); });
afterEach(() => { disposals.splice(0).forEach(off => off()); window.history.replaceState(null, '', '/'); vi.restoreAllMocks(); });
function setup(search = '') {
  window.history.replaceState(null, '', `/${search}`);
  const state = makeTestState(), listeners: ((e: SessionEvent) => void)[] = [];
  const session = { state, subscribe: (cb: (e: SessionEvent) => void) => { listeners.push(cb); return () => { listeners.splice(listeners.indexOf(cb), 1); }; } } as unknown as GameSession;
  const root = document.createElement('div'); document.body.append(root);
  const journal = createJournal(root, session); disposals.push(journal.dispose);
  return { state, root, journal, emit: (e: SessionEvent) => listeners.forEach(cb => cb(e)) };
}
function luminance(hex: string): number {
  const rgb = hex.match(/[a-f\d]{2}/gi)!.map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
const contrast = (a: string, b: string) => { const x = luminance(a), y = luminance(b); return (Math.max(x,y) + .05) / (Math.min(x,y) + .05); };

describe('flagged physical paper journal', () => {
  it('keeps the default book markup unchanged; only journal=paper adds decorations', () => {
    expect(paperJournalEnabled('?paper=1')).toBe(false); expect(paperJournalEnabled('?journal=other')).toBe(false);
    const plain = setup(); plain.journal.open('contents'); const defaultMarkup = plain.root.innerHTML;
    const ignored = setup('?style=illustrated'); ignored.journal.open('contents'); expect(ignored.root.innerHTML).toBe(defaultMarkup);
    expect(plain.root.querySelector('.jr-binding')).toBeNull(); expect(plain.root.querySelector('.jr-flourish')).toBeNull();
    const paper = setup('?journal=paper&style=illustrated'); paper.journal.open();
    expect(paper.root.querySelector('.jr-overlay')?.classList.contains('jr-paper')).toBe(true);
    expect(paper.root.querySelectorAll('.jr-binding')).toHaveLength(1); expect(paper.root.querySelectorAll('.jr-binding path')).toHaveLength(9);
    expect(paper.root.querySelectorAll('.jr-flourish')).toHaveLength(8);
  });
  it('never leaks undiscovered names, icons, recipes or amounts on any flagged combo page', () => {
    const t = setup('?journal=paper'); t.journal.open('combos'); const before = JSON.stringify(t.state);
    for (let i = 0; i < t.state.config.combos.length; i++) {
      const pages = [...t.root.querySelectorAll('.jr-page')];
      const content = pages.map(p => p.textContent).join('').replace(/\d+ \/ \d+|[◀▶]/g, '').trim();
      expect(content).toBe('?'); expect(t.root.querySelectorAll('img')).toHaveLength(0);
      expect(t.root.querySelector('.jr-illus')).toBeNull();
      for (const recipe of t.state.config.combos) expect(t.root.innerHTML).not.toContain(recipe.name);
      for (const building of Object.values(t.state.config.buildings)) expect(t.root.innerHTML).not.toContain(building.name);
      t.root.querySelector<HTMLButtonElement>('.jr-next')!.click();
    }
    expect(JSON.stringify(t.state)).toBe(before);
    for (const svg of t.root.querySelectorAll('.jr-flourish, .jr-binding')) {
      expect(svg.getAttribute('aria-hidden')).toBe('true'); expect(svg.getAttribute('focusable')).toBe('false');
      expect(svg.querySelector('image, filter, text')).toBeNull();
    }
  });
  it('frames only discovered illustrations and keeps tabs, paging, Esc, live updates and disposal working', () => {
    const t = setup('?journal=paper'); t.state.discoveredCombos.push(t.state.config.combos[0].id); t.journal.open('combos');
    expect(t.root.querySelector('.jr-illus')).not.toBeNull(); expect(t.root.querySelector('.jr-locked')).toBeNull();
    t.root.querySelector<HTMLButtonElement>('.jr-next')!.click(); expect(t.root.querySelector('.jr-locked')).not.toBeNull();
    expect(t.root.querySelectorAll('.jr-flourish')).toHaveLength(8);
    t.root.querySelector<HTMLButtonElement>('[data-tab="terrain"]')!.click(); expect(t.root.querySelectorAll('.jr-rule').length).toBeGreaterThan(0);
    t.emit({ type: 'resourcesChanged' }); expect(t.root.querySelectorAll('.jr-binding')).toHaveLength(1); expect(t.root.querySelectorAll('.jr-flourish')).toHaveLength(8);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); expect(t.journal.isOpen()).toBe(false);
    t.journal.open(); t.root.querySelector<HTMLButtonElement>('.jr-tab.active')!.click(); expect(t.journal.isOpen()).toBe(false);
    t.journal.dispose(); expect(t.root.children).toHaveLength(0);
  });
  it('uses static SVG grain, scoped rules, flexible viewport sizing and no live ornament filters', () => {
    expect(css).toContain('data:image/svg+xml'); expect(css).toContain('feTurbulence');
    expect(css).not.toMatch(/filter:\s*url\(/); expect(css).not.toMatch(/url\(["']?https?:|\.png|\.webp|\.jpg/);
    // Every style-bearing selector begins at the flag; @media wrappers are inert without it.
    const sheet = new CSSStyleSheet(); sheet.replaceSync(css);
    function scoped(rules: CSSRuleList): void {
      for (const rule of rules) {
        if (rule instanceof CSSStyleRule) for (const selector of rule.selectorText.split(','))
          expect(selector.trim()).toMatch(/^\.jr-paper(?:\s|$)|^\.jr-overlay\.jr-paper/);
        else if ('cssRules' in rule) scoped((rule as CSSGroupingRule).cssRules);
      }
    }
    scoped(sheet.cssRules);
    expect(css).toContain('calc(100vw - 80px)'); expect(css).toContain('calc(100dvh - 112px)');
    expect(css).toContain('prefers-reduced-motion:reduce'); expect(css).toContain('position:sticky');
    // Exact CSS envelope at acceptance sizes: cover, 15px page edges and 41px tabs all fit.
    for (const [width, height] of [[1280,720], [1024,640]]) {
      const bookWidth = width <= 1100 ? width - 80 : Math.min(920, width - 80);
      const bookHeight = height <= 660 ? height - 112 : Math.min(526, height - 100);
      const top = (height - 80 - bookHeight) / 2 + 46, left = (width - bookWidth) / 2;
      expect(top - 41).toBeGreaterThanOrEqual(0); expect(top + bookHeight + 15).toBeLessThanOrEqual(height);
      expect(left).toBeGreaterThanOrEqual(32); expect(left + bookWidth + 9).toBeLessThanOrEqual(width - 24);
    }
  });
  it('keeps the specified readable ink colors above 4.5:1 against the darkest outer paper and tabs', () => {
    const sheet = new CSSStyleSheet(); sheet.replaceSync(css);
    const value = (selector: string, property: string) => {
      const rule = [...sheet.cssRules].find(r => r instanceof CSSStyleRule && r.selectorText === selector) as CSSStyleRule;
      return rule.style.getPropertyValue(property).trim();
    };
    const inks = [value('.jr-paper .jr-page', 'color'), value('.jr-paper .jr-sub', 'color'), value('.jr-overlay.jr-paper', '--good'), value('.jr-overlay.jr-paper', '--bad')];
    for (const ink of inks) expect(contrast(ink, '#ddcbaa'), ink).toBeGreaterThanOrEqual(4.5);
    for (const tab of ['combos','adjacency','terrain']) {
      const selector = `.jr-paper .jr-tab[data-tab='${tab}']`;
      expect(contrast(value(selector, 'color'), value(selector, '--tab'))).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(value('.jr-paper .jr-tab', 'color'), value('.jr-paper .jr-tab', '--tab'))).toBeGreaterThanOrEqual(4.5);

  });
});
