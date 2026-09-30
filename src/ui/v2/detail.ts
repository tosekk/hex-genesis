import type { GameSession } from '../../core/contracts';
import type { BuildingId, GameConfig } from '../../core/types';
import { demolishRefund } from '../../sim/economy';
import { BIOME_ICON, BIOME_LABEL, buildingName, cap, el, fmtResources, icon } from '../format';
import type { Ctrl } from './ctrl';

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();

/** Describes terrain bonuses / zone modifiers for one building from config (rules are shown from the start, §24). */
export function ruleLines(cfg: GameConfig, id: BuildingId): string[] {
  const out: string[] = [];
  for (const t of cfg.terrainBonuses) {
    if (t.buildings === 'any' || t.buildings.includes(id)) {
      out.push(`Next to ${t.adjacentTerrain.join(' / ')}: ${fmtResources(t.bonus, true)}`);
    }
  }
  for (const [biome, mods] of Object.entries(cfg.zoneModifiers)) {
    for (const m of mods ?? []) {
      if (m.buildings === 'any' || m.buildings.includes(id)) {
        out.push(`${BIOME_LABEL[biome as keyof typeof BIOME_LABEL] ?? biome} zone: ${fmtResources(m.delta, true)}`);
      }
    }
  }
  return out;
}

/** UI_SPEC §3.5: portrait + body for the focused card, tile, or slot. */
export function createDetail(root: HTMLElement, session: GameSession, ctrl: Ctrl) {
  const panel = el('div', 'j-panel j-detail');
  root.appendChild(panel);

  const head = (portrait: HTMLElement, name: string, tag?: string) => {
    const h = el('div', 'j-detail-head');
    const round = el('div', 'j-portrait');
    round.appendChild(portrait);
    const t = el('div', 'j-detail-title');
    t.appendChild(el('b', undefined, name));
    if (tag) t.appendChild(el('span', 'j-tag', tag));
    h.append(round, t);
    return h;
  };
  const row = (text: string, cls = '') => el('div', `j-row ${cls}`.trim(), text);

  function renderBuilding(id: BuildingId): void {
    const s = session.state;
    const cfg = s.config;
    const def = cfg.buildings[id];
    panel.appendChild(head(icon(`buildings/${id}`, initials(def.name)), def.name, ctrl.effectiveBiome ? BIOME_LABEL[ctrl.effectiveBiome] : undefined));
    panel.appendChild(row(`Cost: ${Object.values(def.cost).some(v => v > 0) ? fmtResources(def.cost) : 'Free'}`));
    panel.appendChild(row(`Base yield: ${fmtResources(def.baseYield, true)}`));
    for (const line of ruleLines(cfg, id)) panel.appendChild(row(line, 'j-rule'));
    // Discovered combos only (§32, §38).
    for (const cid of s.discoveredCombos) {
      const c = cfg.combos.find((x) => x.id === cid);
      if (!c?.buildings.includes(id)) continue;
      panel.appendChild(row(`${c.name}: ${c.buildings.map((b) => buildingName(cfg, b)).join(' + ')} → ${fmtResources(c.amount, true)}`, 'j-combo'));
    }
    let count = 0;
    for (const h of s.hexes) for (const sl of h.slots) if (sl.building === id) count++;
    panel.appendChild(row(`On the board: ${count}`));
  }

  function renderCore(): void {
    const s = session.state;
    const b = ctrl.effectiveBiome;
    if (b === null) return;
    const held = s.coreStack.filter((x) => x === b).length;
    panel.appendChild(head(icon('core', '◎'), `${BIOME_LABEL[b]} core`, BIOME_LABEL[b]));
    panel.appendChild(row(`Cores held: ${held}`));
    panel.appendChild(row('A core spreads its biome over dead land. Climbing costs more; where biomes meet they mix.'));
  }

  function renderTile(): void {
    const s = session.state;
    const cfg = s.config;
    const h = s.hexes[ctrl.hex!];
    const locked = s.activeSpread?.locked[h.id] === true;
    panel.appendChild(head(icon(h.biome ?? 'forest', h.biome ? BIOME_ICON[h.biome] : '·'),
      `Tile ${h.col},${h.row}`, h.biome ? BIOME_LABEL[h.biome] : 'Dead land'));
    panel.appendChild(row(`${cap(h.terrain === 'hill' ? 'plain' : h.terrain)} · elevation ${h.elevation}`));
    if (locked) { panel.appendChild(row('Locked (terraforming)', 'j-neg')); return; }
    if (!h.placeable) { panel.appendChild(row('Nothing can be built here.')); return; }
    if (h.biome === null) { panel.appendChild(row('Not terraformed yet.')); return; }
    const chips = el('div', 'j-chips');
    h.slots.forEach((sl, i) => {
      const chip = el('button', 'j-chip');
      chip.dataset.slot = String(i);
      chip.classList.toggle('selected', ctrl.slot === i);
      chip.classList.toggle('empty', sl.building === null);
      if (sl.building) chip.appendChild(icon(`buildings/${sl.building}`, initials(buildingName(cfg, sl.building))));
      else chip.textContent = String(i + 1);
      chip.title = sl.building ? buildingName(cfg, sl.building) : `Slot ${i + 1} (empty)`;
      chip.addEventListener('click', () => ctrl.selectSlot(h.id, i as 0 | 1 | 2));
      chips.appendChild(chip);
    });
    panel.appendChild(chips);
    if (ctrl.slot !== null) {
      const cur = h.slots[ctrl.slot].building;
      if (cur) {
        panel.appendChild(row(buildingName(cfg, cur), 'j-strong'));
        const btn = el('button', 'j-btn danger demolish', `Demolish (+${fmtResources(demolishRefund(s, cur))})`);
        btn.addEventListener('click', () => ctrl.demolish(h.id, ctrl.slot!));
        panel.appendChild(btn);
      } else panel.appendChild(row('Empty. Pick a building card to build here.'));
    }
  }

  function render(): void {
    panel.replaceChildren(); panel.classList.remove('empty-state');
    if (ctrl.card?.kind === 'building') renderBuilding(ctrl.card.id);
    else if (ctrl.card?.kind === 'core') renderCore();
    else if (ctrl.hex !== null) renderTile();
    else {
      panel.appendChild(head(icon('journal', 'Book'), 'Field notes', 'Your next placement'));
      panel.appendChild(row('Select a tile, or pick a building card.', 'j-hint'));
      panel.appendChild(row('Terrain, yields and discovered combos appear here.', 'j-rule'));
      panel.classList.add('empty-state');
    }
  }

  render();
  return { render, dispose: () => panel.remove() };
}
