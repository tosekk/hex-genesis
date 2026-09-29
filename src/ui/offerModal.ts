import type { GameSession } from '../core/contracts';
import type { BiomeOffer } from '../core/types';
import { BIOME_ICON, BIOME_LABEL, el } from './format';

export function createOfferModal(root: HTMLElement, session: GameSession) {
  const overlay = el('div', 'overlay offer-overlay');
  overlay.hidden = true;
  root.appendChild(overlay);

  function show(offer: BiomeOffer): void {
    overlay.replaceChildren();
    const box = el('div', 'panel modal');
    box.appendChild(el('h2', undefined, 'Choose a biome for your core'));
    const cfg = session.state.config;
    const cards = el('div', 'cards');
    offer.options.forEach((biome, i) => {
      const card = el('button', `card biome-${biome}`);
      card.dataset.index = String(i);
      card.append(el('div', 'card-icon', BIOME_ICON[biome]), el('div', 'card-title', BIOME_LABEL[biome]),
        el('div', 'card-roster', `Buildings: ${cfg.rosters[biome].map((b) => cfg.buildings[b]?.name ?? b).join(', ')}`),
        el('div', 'card-key', `[${i + 1}]`));
      card.addEventListener('click', () => session.chooseOffer(i as 0 | 1));
      cards.appendChild(card);
    });
    box.appendChild(cards);
    const s = session.state;
    const left = s.config.reshufflesPerRun - s.reshufflesUsed;
    const btn = el('button', 'btn reshuffle', `Reshuffle (${Math.max(0, left)} left)`);
    btn.disabled = s.reshufflesUsed >= s.config.reshufflesPerRun;
    btn.addEventListener('click', () => session.reshuffleOffer());
    box.appendChild(btn);
    overlay.appendChild(box);
    overlay.hidden = false;
  }

  // S3: keyboard shortcuts 1/2 pick a card while the modal is open.
  const onKey = (ev: KeyboardEvent) => {
    if (overlay.hidden || (ev.key !== '1' && ev.key !== '2')) return;
    session.chooseOffer(ev.key === '1' ? 0 : 1);
  };
  document.addEventListener('keydown', onKey);

  function hide(): void { overlay.hidden = true; overlay.replaceChildren(); }
  return { show, hide, isOpen: () => !overlay.hidden, dispose: () => { document.removeEventListener('keydown', onKey); overlay.remove(); } };
}
