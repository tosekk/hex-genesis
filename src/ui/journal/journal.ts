import type { GameSession, SessionEvent } from '../../core/contracts';
import type { Biome, Resources } from '../../core/types';
import { BIOME_COLORS } from '../../render/palette';
import { BIOME_LABEL, cap, el, fmtResources, icon } from '../format';
import { type AdjacencyLogEntry, type ComboPage, type JournalData, resolveJournalData } from './data';
import './journal.css';

export type JournalTab = 'contents' | 'combos' | 'adjacency' | 'terrain';
export interface Journal {
  open(tab?: JournalTab): void;
  close(): void;
  isOpen(): boolean;
  dispose(): void;
}

const TABS: { id: JournalTab; label: string }[] = [
  { id: 'contents', label: 'Contents' },
  { id: 'combos', label: 'Combos' },
  { id: 'adjacency', label: 'Adjacency' },
  { id: 'terrain', label: 'Terrain' },
];
const hexColor = (n: number) => `#${n.toString(16).padStart(6, '0')}`;
const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
const amountText = (r: Resources) => fmtResources(r, true);

/**
 * The journal book (UI_SPEC §4, §8.2): Contents / Combos / Adjacency / Terrain.
 * Subscribes to the session itself; the adjacency log restarts on `runStarted`.
 * Reads state only; undiscovered combos render nothing but a "?" (the data layer never hands over their details).
 */
export function createJournal(root: HTMLElement, session: GameSession, data: JournalData = resolveJournalData()): Journal {
  const overlay = el('div', 'jr-overlay');
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Journal');
  const book = el('div', 'jr-book');
  const left = el('div', 'jr-page jr-left');
  const right = el('div', 'jr-page jr-right');
  const tabs = el('div', 'jr-tabs');
  book.append(left, right, tabs);
  overlay.appendChild(book);
  root.appendChild(overlay);

  let tab: JournalTab = 'contents';
  let comboIndex = 0;
  let adjacency: AdjacencyLogEntry[] = [];

  const setTab = (t: JournalTab) => { tab = t; render(); };

  function renderTabs(): void {
    tabs.replaceChildren();
    for (const t of TABS) {
      const b = el('button', 'jr-tab', t.label);
      b.dataset.tab = t.id;
      b.classList.toggle('active', t.id === tab);
      // The active tab again closes the book.
      b.addEventListener('click', () => (t.id === tab ? close() : setTab(t.id)));
      tabs.appendChild(b);
    }
  }

  // ----- contents -----
  function renderContents(): void {
    const s = session.state;
    const pages = data.comboPages(s);
    const found = pages.filter((p): p is Extract<ComboPage, { locked: false }> => !p.locked);
    left.append(el('h2', 'jr-title', 'Field Journal'),
      el('p', 'jr-lead', 'Terraform the dormant world, one tile at a time. Combos you discover are written down here.'),
      el('p', 'jr-sub', `${found.length} of ${pages.length} combos discovered`));
    right.appendChild(el('h3', 'jr-h', 'Contents'));
    const list = el('ol', 'jr-contents');
    for (const [label, t] of [['Combos', 'combos'], ['Adjacency log', 'adjacency'], ['Terrain and zone effects', 'terrain']] as const) {
      const li = el('li');
      const a = el('button', 'jr-link', label);
      a.addEventListener('click', () => setTab(t));
      li.appendChild(a);
      list.appendChild(li);
    }
    right.appendChild(list);
    right.appendChild(el('h3', 'jr-h', 'Discovered combos'));
    if (found.length === 0) right.appendChild(el('p', 'jr-sub', 'Nothing yet. Build next to your other buildings.'));
    const names = el('ul', 'jr-names');
    for (const p of found) {
      const li = el('li');
      const a = el('button', 'jr-link', p.name);
      a.addEventListener('click', () => { comboIndex = p.index; setTab('combos'); });
      li.appendChild(a);
      names.appendChild(li);
    }
    right.appendChild(names);
  }

  // ----- combos -----
  function hexIllustration(p: Extract<ComboPage, { locked: false }>): SVGElement {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 180');
    svg.setAttribute('class', 'jr-hex');
    const biome: Biome | undefined = p.biomes[0];
    const poly = document.createElementNS(NS, 'polygon');
    poly.setAttribute('points', '100,10 175,52 175,128 100,170 25,128 25,52');
    poly.setAttribute('fill', biome ? hexColor(BIOME_COLORS[biome]) : '#cfc6b0');
    poly.setAttribute('stroke', '#2E2A25');
    poly.setAttribute('stroke-width', '3');
    svg.appendChild(poly);
    return svg;
  }

  function renderCombos(): void {
    const pages = data.comboPages(session.state);
    if (pages.length === 0) {
      right.appendChild(el('p', 'jr-sub', 'This world has no combos.'));
      return;
    }
    comboIndex = Math.max(0, Math.min(comboIndex, pages.length - 1));
    const p = pages[comboIndex];
    if (p.locked) {
      // Undiscovered: nothing but the question mark (§32, §38).
      const q = el('div', 'jr-locked');
      q.appendChild(el('span', 'jr-q', '?'));
      left.appendChild(q);
    } else {
      const ill = el('div', 'jr-illus');
      ill.appendChild(hexIllustration(p));
      const slots = el('div', 'jr-slots');
      for (const b of p.buildings) slots.appendChild(icon(`buildings/${b.id}`, initials(b.name)));
      ill.appendChild(slots);
      left.appendChild(ill);
      right.appendChild(el('h3', 'jr-h', p.name));
      const rec = el('ul', 'jr-recipe');
      for (const b of p.buildings) {
        const li = el('li');
        li.append(icon(`buildings/${b.id}`, initials(b.name)), ` ${b.name}`);
        rec.appendChild(li);
      }
      right.appendChild(rec);
      right.appendChild(el('div', 'jr-row', `Total build cost: ${fmtResources(p.totalCost)}`));
      right.appendChild(el('div', 'jr-row jr-pay', `Pays: ${amountText(p.amount)}`));
      if (p.biomes.length) right.appendChild(el('div', 'jr-row jr-sub', `Buildable in: ${p.biomes.map((b) => BIOME_LABEL[b]).join(', ')}`));
    }
    const nav = el('div', 'jr-nav');
    const prev = el('button', 'jr-arrow jr-prev', '◀');
    const next = el('button', 'jr-arrow jr-next', '▶');
    prev.disabled = comboIndex === 0;
    next.disabled = comboIndex >= pages.length - 1;
    prev.addEventListener('click', () => { comboIndex--; render(); });
    next.addEventListener('click', () => { comboIndex++; render(); });
    nav.append(prev, el('span', 'jr-count', `${comboIndex + 1} / ${pages.length}`), next);
    right.appendChild(nav);
  }

  // ----- adjacency -----
  function renderAdjacency(): void {
    left.append(el('h2', 'jr-title', 'Adjacency'),
      el('p', 'jr-lead', 'When a tile is completed for the first time, each neighbour with a combo pays once.'));
    right.appendChild(el('h3', 'jr-h', 'Found this run'));
    if (adjacency.length === 0) { right.appendChild(el('p', 'jr-sub', 'None yet.')); return; }
    const list = el('ul', 'jr-log');
    for (const a of adjacency) {
      const li = el('li', 'jr-log-row');
      const side = (n: string[]) => (n.length ? n.join(' + ') : 'no combo');
      li.append(el('span', undefined, `${side(a.hexCombos)} ↔ ${side(a.neighborCombos)}`), el('b', 'jr-pay', ` ${amountText(a.amount)}`));
      list.appendChild(li);
    }
    right.appendChild(list);
  }

  // ----- terrain -----
  function buildingIcons(b: { id: string; name: string }[] | 'any'): HTMLElement {
    const box = el('span', 'jr-icons');
    if (b === 'any') { box.textContent = 'any building'; return box; }
    for (const x of b) { const i = icon(`buildings/${x.id}`, initials(x.name)); i.title = x.name; box.appendChild(i); }
    return box;
  }

  function renderTerrain(): void {
    const cfg = session.state.config;
    left.appendChild(el('h2', 'jr-title', 'Terrain'));
    const rules = data.terrainRules(cfg);
    if (rules.length === 0) left.appendChild(el('p', 'jr-sub', 'No terrain bonuses in this world.'));
    for (const r of rules) {
      const row = el('div', 'jr-rule');
      const t = el('span', 'jr-terrain');
      for (const k of r.terrain) t.appendChild(icon(`terrain/${k === 'hill' ? 'mountain' : k}`, cap(k)));
      row.append(t, el('span', undefined, ` next to ${r.terrain.join(' / ')}: `), buildingIcons(r.buildings), el('b', 'jr-pay', ` ${amountText(r.bonus)}`));
      left.appendChild(row);
    }
    right.appendChild(el('h3', 'jr-h', 'Zone effects'));
    const zones = data.zoneEffects(cfg);
    if (zones.length === 0) right.appendChild(el('p', 'jr-sub', 'No zone effects.'));
    let last: Biome | null = null;
    for (const z of zones) {
      if (z.biome !== last) { right.appendChild(el('div', 'jr-zone', BIOME_LABEL[z.biome])); last = z.biome; }
      const row = el('div', 'jr-rule');
      row.append(buildingIcons(z.building === 'any' ? 'any' : [z.building]), el('b', z.delta && Object.values(z.delta).some((v) => v < 0) ? 'jr-neg' : 'jr-pay', ` ${amountText(z.delta)}`));
      right.appendChild(row);
    }
  }

  function render(): void {
    left.replaceChildren();
    right.replaceChildren();
    renderTabs();
    if (tab === 'contents') renderContents();
    else if (tab === 'combos') renderCombos();
    else if (tab === 'adjacency') renderAdjacency();
    else renderTerrain();
  }

  function open(t?: JournalTab): void {
    if (t) tab = t;
    render();
    overlay.hidden = false;
  }
  function close(): void { overlay.hidden = true; }

  overlay.addEventListener('click', (ev) => { if (ev.target === overlay) close(); });
  // Esc closes; capture phase + stopPropagation so the HUD doesn't also treat it as "clear selection".
  const onKey = (ev: KeyboardEvent) => {
    if (overlay.hidden || ev.key !== 'Escape') return;
    ev.stopPropagation();
    close();
  };
  document.addEventListener('keydown', onKey, true);

  const off = session.subscribe((e: SessionEvent) => {
    if (e.type === 'runStarted') { adjacency = []; comboIndex = 0; tab = 'contents'; close(); }
    else if (e.type === 'payouts') {
      for (const p of e.events) {
        const entry = data.adjacencyLogEntry(session.state, p);
        if (entry) adjacency.unshift(entry); // newest first
      }
    }
    if (!overlay.hidden) render();
  });

  return {
    open, close, isOpen: () => !overlay.hidden,
    dispose() { off(); document.removeEventListener('keydown', onKey, true); overlay.remove(); },
  };
}
