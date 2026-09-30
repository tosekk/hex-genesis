import type { GameSession } from '../../core/contracts';
import type { MainBiome } from '../../core/types';
import { BIOME_LABEL, el, fmtResources, icon } from '../format';
import { renderPreview } from '../preview';
import type { Ctrl } from './ctrl';

const isMain = (b: string | null): b is MainBiome => b === 'forest' || b === 'desert' || b === 'arctic';

/** Short text stand-in when a building icon is missing (UI_SPEC §1). */
const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();

/** UI_SPEC §3.4: core card first (main biomes), then roster cards; hover note with cost/yield or a full slot preview. */
export function createDeck(root: HTMLElement, session: GameSession, ctrl: Ctrl) {
  const deck = el('div', 'j-panel j-deck');
  const strip = el('div', 'j-deck-strip');
  const note = el('div', 'j-note');
  note.hidden = true;
  deck.appendChild(strip);
  root.append(deck); (root.closest('.jhud') ?? root).append(note);

  function showNote(card: HTMLElement, fill: (box: HTMLElement) => void): void {
    note.replaceChildren();
    fill(note);
    note.hidden = false;
    const r = card.getBoundingClientRect();
    const d = deck.getBoundingClientRect(), width = Math.min(240, d.width || 240);
    note.style.width = `${width}px`;
    note.style.maxHeight = `${Math.max(120, d.top - 120)}px`;
    const left = Math.max(d.left, Math.min(d.right - width, r.left + r.width / 2 - width / 2));
    note.style.left = `${left}px`; note.style.top = `${Math.max(108, r.top - note.offsetHeight - 12)}px`;
  }
  const hideNote = () => { note.hidden = true; };

  function render(): void {
    const s = session.state;
    const cfg = s.config;
    const biome = ctrl.effectiveBiome;
    const scroll = strip.scrollLeft;
    strip.replaceChildren();
    hideNote();

    if (biome === null || !ctrl.biomeEnabled(biome)) {
      strip.appendChild(el('div', 'j-deck-prompt', 'Pick a biome or a tile'));
      strip.scrollLeft = scroll; return;
    }
    if (isMain(biome)) {
      const held = s.coreStack.filter((b) => b === biome).length;
      const why = ctrl.coreDisabledReason(biome);
      const card = el('button', 'j-card core');
      card.dataset.card = 'core'; card.setAttribute('aria-disabled', String(why !== null)); card.setAttribute('aria-pressed', String(ctrl.card?.kind === 'core'));
      card.classList.toggle('grey', held === 0);
      card.classList.toggle('disabled', why !== null);
      card.classList.toggle('selected', ctrl.card?.kind === 'core');
      card.style.setProperty('--biome', `var(--b-${biome})`);
      card.append(icon('core', '◎'), el('span', 'j-card-name', `${BIOME_LABEL[biome]} core`));
      if (held > 1) card.appendChild(el('span', 'j-badge', String(held)));
      if (why) card.appendChild(el('span', 'j-card-why', why));
      card.addEventListener('click', () => ctrl.clickCard({ kind: 'core' }));
      card.addEventListener('mouseenter', () => showNote(card, (b) => b.append(
        el('b', undefined, `${BIOME_LABEL[biome]} core`),
        el('div', undefined, why ?? 'Click, then pick a highlighted tile.'))));
      card.addEventListener('mouseleave', hideNote);
      card.addEventListener('focus', () => card.dispatchEvent(new MouseEvent('mouseenter'))); card.addEventListener('blur', hideNote);
      strip.appendChild(card);
    }

    const noLand = !ctrl.hasBiomeLand(biome);
    const landReason = `Place a ${BIOME_LABEL[biome]} core first to create ${BIOME_LABEL[biome]} land`;
    for (const id of cfg.rosters[biome]) {
      const def = cfg.buildings[id];
      if (!def) continue;
      const affordable = Object.entries(def.cost).every(([r, v]) => (s.resources[r] ?? 0) >= v);
      const card = el('button', 'j-card building');
      card.dataset.building = id; card.setAttribute('aria-pressed', String(ctrl.card?.kind === 'building' && ctrl.card.id === id));
      card.classList.toggle('unaffordable', !affordable);
      card.classList.toggle('grey', noLand); card.classList.toggle('disabled', noLand);
      card.setAttribute('aria-disabled', String(noLand));
      if (noLand) card.title = landReason;
      card.classList.toggle('selected', ctrl.card?.kind === 'building' && ctrl.card.id === id);
      card.append(icon(`buildings/${id}`, initials(def.name)), el('span', 'j-card-name', def.name));
      card.addEventListener('click', () => ctrl.clickCard({ kind: 'building', id }));
      card.addEventListener('mouseenter', () => showNote(card, (b) => {
        if (noLand) b.append(el('div', undefined, landReason));
        const slotSel = ctrl.hex !== null && ctrl.slot !== null && s.hexes[ctrl.hex].slots[ctrl.slot].building === null;
        if (slotSel) {
          const box = el('div', 'preview');
          const preview = session.preview(ctrl.hex!, ctrl.slot!, id);
          renderPreview(box, preview ? { ...preview, combos: preview.combos.filter(c => s.discoveredCombos.includes(c.match.comboId)) } : null, cfg);
          b.append(el('b', undefined, def.name), box);
        } else {
          b.append(el('b', undefined, def.name),
            el('div', affordable ? '' : 'j-neg', `Cost: ${Object.values(def.cost).some(v => v > 0) ? fmtResources(def.cost) : 'Free'}`),
            el('div', undefined, `Yields: ${fmtResources(def.baseYield, true)}`));
        }
      }));
      card.addEventListener('mouseleave', hideNote);
      card.addEventListener('focus', () => card.dispatchEvent(new MouseEvent('mouseenter'))); card.addEventListener('blur', hideNote);
      strip.appendChild(card);
    }
    strip.scrollLeft = scroll;
  }

  render();
  return { render, dispose: () => { deck.remove(); note.remove(); } };
}
