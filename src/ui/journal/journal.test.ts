// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GameSession, SessionEvent } from '../../core/contracts';
import { makeTestState } from '../../core/testing';
import type { GameState, PayoutEvent } from '../../core/types';
import { createJournal } from './journal';

function setup(discovered: string[] = []) {
  const state: GameState = makeTestState();
  state.discoveredCombos.push(...discovered);
  const listeners: ((e: SessionEvent) => void)[] = [];
  const session = {
    get state() { return state; },
    subscribe: (l: (e: SessionEvent) => void) => { listeners.push(l); return () => undefined; },
  } as unknown as GameSession;
  const root = document.getElementById('r')!;
  const journal = createJournal(root, session);
  const emit = (e: SessionEvent) => listeners.forEach((l) => l(e));
  const key = (k: string) => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
  const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  return { state, session, journal, root, emit, key, q };
}

beforeEach(() => { document.body.innerHTML = '<div id="r"></div>'; });

describe('journal open/close', () => {
  it('open / close / isOpen, Esc closes, the active tab closes it, backdrop click closes', () => {
    const t = setup();
    expect(t.journal.isOpen()).toBe(false);
    t.journal.open();
    expect(t.journal.isOpen()).toBe(true);
    t.key('Escape');
    expect(t.journal.isOpen()).toBe(false);
    t.journal.open('combos');
    t.q('.jr-tab.active').click(); // same tab again
    expect(t.journal.isOpen()).toBe(false);
    t.journal.open();
    t.q('.jr-overlay').click();
    expect(t.journal.isOpen()).toBe(false);
  });

  it('opens on the requested tab and switches tabs', () => {
    const t = setup();
    t.journal.open('terrain');
    expect(t.q('.jr-tab.active').dataset.tab).toBe('terrain');
    t.q<HTMLButtonElement>('.jr-tab[data-tab="adjacency"]').click();
    expect(t.q('.jr-tab.active').dataset.tab).toBe('adjacency');
    expect(t.q('.jr-left').textContent).toContain('neighbour with a combo pays once');
  });

  it('Esc is swallowed while open (the HUD does not also see it) and ignored when closed', () => {
    const t = setup();
    const seen = vi.fn();
    document.addEventListener('keydown', seen);
    t.journal.open();
    t.key('Escape');
    expect(seen).not.toHaveBeenCalled();
    t.key('Escape');
    expect(seen).toHaveBeenCalledTimes(1);
    document.removeEventListener('keydown', seen);
  });
});

describe('combos: undiscovered pages reveal nothing', () => {
  it('a locked page is only a "?" (no name, buildings, cost or amounts in the DOM)', () => {
    const t = setup(); // nothing discovered
    const cfg = t.state.config;
    t.journal.open('combos');
    const pageText = (t.q('.jr-left').textContent + t.q('.jr-right').textContent).replace(/\d+ \/ \d+|[◀▶]/g, '').trim(); // minus the page counter and arrows
    expect(pageText).toBe('?');
    expect(t.root.querySelectorAll('.jr-locked .jr-q')).toHaveLength(1);
    const html = t.root.innerHTML;
    for (const c of cfg.combos) {
      expect(html).not.toContain(c.name);
      for (const b of c.buildings) expect(html).not.toContain(cfg.buildings[b].name);
    }
    expect(html).not.toContain('Total build cost');
    expect(html).not.toContain('Pays');
    expect(t.root.querySelectorAll('.jr-overlay img')).toHaveLength(0);
  });

  it('a discovered page shows name, recipe, total cost and payout; its neighbours stay locked', () => {
    const t = setup();
    const [a, b] = t.state.config.combos;
    t.state.discoveredCombos.push(a.id);
    t.journal.open('combos');
    const right = t.q('.jr-right').textContent!;
    expect(right).toContain(a.name);
    for (const id of a.buildings) expect(right).toContain(t.state.config.buildings[id].name);
    expect(right).toContain('Total build cost');
    expect(right).toContain('Pays');
    t.q('.jr-next').click();
    const next = t.q('.jr-left').textContent! + t.q('.jr-right').textContent!;
    expect(next).not.toContain(b.name);
    expect(t.q('.jr-count').textContent).toBe(`2 / ${t.state.config.combos.length}`);
  });

  it('page counter and prev/next clamp at the ends', () => {
    const t = setup();
    const n = t.state.config.combos.length;
    t.journal.open('combos');
    expect(t.q('.jr-count').textContent).toBe(`1 / ${n}`);
    expect(t.q<HTMLButtonElement>('.jr-prev').disabled).toBe(true);
    for (let i = 1; i < n; i++) t.q('.jr-next').click();
    expect(t.q('.jr-count').textContent).toBe(`${n} / ${n}`);
    expect(t.q<HTMLButtonElement>('.jr-next').disabled).toBe(true);
  });

  it('contents lists discovered names only and links to their page', () => {
    const t = setup();
    const [a, b] = t.state.config.combos;
    t.state.discoveredCombos.push(b.id);
    t.journal.open('contents');
    const txt = t.q('.jr-right').textContent!;
    expect(txt).toContain(b.name);
    expect(txt).not.toContain(a.name);
    t.q<HTMLButtonElement>('.jr-names .jr-link').click();
    expect(t.q('.jr-tab.active').dataset.tab).toBe('combos');
    expect(t.q('.jr-count').textContent).toBe(`2 / ${t.state.config.combos.length}`);
    expect(t.q('.jr-right').textContent).toContain(b.name);
  });
});

describe('adjacency log', () => {
  const adj = (hexId: number, neighborId: number): PayoutEvent => ({ kind: 'adjacency', hexId, neighborId, amount: { wood: 1 } });

  it('logs each adjacency payout, newest first, and ignores other payout kinds', () => {
    const t = setup();
    t.emit({ type: 'payouts', events: [{ kind: 'base', hexId: 0, amount: { wood: 3 } }, adj(0, 1)] });
    t.emit({ type: 'payouts', events: [adj(5, 6)] });
    t.journal.open('adjacency');
    const rows = t.root.querySelectorAll('.jr-log-row');
    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain('+1 wood');
  });

  it('starts empty and clears on runStarted', () => {
    const t = setup();
    t.journal.open('adjacency');
    expect(t.q('.jr-right').textContent).toContain('None yet');
    t.emit({ type: 'payouts', events: [adj(0, 1)] });
    expect(t.root.querySelectorAll('.jr-log-row')).toHaveLength(1); // live update while open
    t.emit({ type: 'runStarted', seed: 2 });
    expect(t.journal.isOpen()).toBe(false);
    t.journal.open('adjacency');
    expect(t.root.querySelectorAll('.jr-log-row')).toHaveLength(0);
  });

  it('names the combos present on both tiles at that moment', () => {
    const t = setup();
    const cfg = t.state.config;
    const combo = cfg.combos.find((c) => c.buildings.length === 2)!;
    const forest = (Object.keys(cfg.rosters) as (keyof typeof cfg.rosters)[]).find((b) => combo.buildings.every((x) => cfg.rosters[b].includes(x)))!;
    t.state.hexes[0].biome = forest;
    t.state.hexes[0].slots[0].building = combo.buildings[0];
    t.state.hexes[0].slots[1].building = combo.buildings[1];
    t.emit({ type: 'payouts', events: [adj(0, 1)] });
    t.journal.open('adjacency');
    expect(t.q('.jr-log').textContent).toContain(combo.name);
  });
});

describe('terrain tab', () => {
  it('lists every terrain rule from config from the start, plus zone effects', () => {
    const t = setup();
    const cfg = t.state.config;
    t.journal.open('terrain');
    expect(t.root.querySelectorAll('.jr-left .jr-rule')).toHaveLength(cfg.terrainBonuses.length);
    const zones = Object.values(cfg.zoneModifiers).flat().length;
    expect(t.q('.jr-right').textContent).toContain('Zone effects');
    if (zones > 0) expect(t.root.querySelectorAll('.jr-right .jr-rule').length).toBeGreaterThan(0);
  });
});
