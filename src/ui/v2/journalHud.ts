import type { BoardView, GameSession, Hud } from '../../core/contracts';
import { BIOME_COLORS } from '../../render/palette';
import { createEndScreen } from '../endScreen';
import { el } from '../format';
import { createToasts } from '../toasts';
import { createJournal, type Journal } from '../journal';
import { Ctrl } from './ctrl';
import { createDeck } from './deck';
import { createDetail } from './detail';
import { createPills } from './pills';
import { createThresholdStack } from './thresholds';
import { createTopRight, type AudioSettingsLike } from './topRight';
import { createTriangle } from './triangle';
import { createJournalHelp } from './help';
import { installJournalLayout } from './layout';
import { createHudOffer, type OfferFxFactory } from './offer';
import './fonts.css';
import './styles.css';

export interface JournalDeps {
  audio?: AudioSettingsLike;
  /** Override the committed sphere factory; null exercises the simple modal fallback. */
  createOfferFx?: OfferFxFactory | null;
  /** Override the committed book factory; null keeps the coming-soon fallback. */
  createJournal?: ((root: HTMLElement, session: GameSession) => Journal) | null;
}

/** sol's optional `audioSettings` (src/audio/settings.ts). Resolved lazily so the build works before it lands. */
const AUDIO_MODULES = import.meta.glob<{ audioSettings?: AudioSettingsLike }>('../../audio/settings.ts', { eager: true });
export function defaultAudioSettings(): AudioSettingsLike | undefined {
  return Object.values(AUDIO_MODULES)[0]?.audioSettings;
}

const hexColor = (n: number) => `#${n.toString(16).padStart(6, '0')}`;

/** The field-journal HUD (UI_SPEC v1). State changes only through GameSession commands. */
export function createJournalHud(root: HTMLElement, session: GameSession, board: BoardView, deps: JournalDeps = {}): Hud {
  const hadRootClass = root.classList.contains('journal-root'); root.classList.add('journal-root');
  const host = el('div', 'jhud');
  for (const [b, c] of Object.entries(BIOME_COLORS)) host.style.setProperty(`--b-${b}`, hexColor(c));
  root.appendChild(host);

  const ctrl = new Ctrl(session, board);
  const top = el('div', 'j-top');
  host.appendChild(top);
  const stackHost = el('div', 'j-left');
  host.appendChild(stackHost);

  const pills = createPills(top, session);
  const stack = createThresholdStack(stackHost, session, ctrl);
  const bottom = el('div', 'j-bottom');
  host.appendChild(bottom);
  const detail = createDetail(bottom, session, ctrl);
  const deck = createDeck(bottom, session, ctrl);
  const triangle = createTriangle(bottom, session, ctrl);
  const toasts = createToasts(host, session);
  const offer = createHudOffer(host, session, {
    from: () => host.querySelector('.j-triangle')?.getBoundingClientRect() ?? null,
    to: biome => host.querySelector(`.j-triangle [data-biome="${biome}"]`)?.getBoundingClientRect() ?? null,
  }, deps.createOfferFx);
  const end = createEndScreen(host, session);
  const journal = (deps.createJournal === undefined ? createJournal : deps.createJournal)?.(host, session);
  const help = createJournalHelp(host, () => offer.isOpen() || (journal?.isOpen() ?? false) || session.state.pendingOffer !== null || session.state.status !== 'playing' || [...host.querySelectorAll<HTMLElement>('.overlay')].some(node => !node.hidden && !node.classList.contains('help-overlay')));
  top.append(el('small', 'j-controls-hint', 'Press ? for controls'));
  const topRight = createTopRight(host, session, {
    openHelp: () => help.open(),
    toggleJournal,
    isBlocked: () => offer.isOpen() || help.isOpen() || (journal?.isOpen() ?? false),
    audio: deps.audio ?? defaultAudioSettings(),
  });

  // Failure reasons appear near the cursor.
  const notice = (() => {
    const box = el('div', 'j-notice');
    box.hidden = true;
    host.appendChild(box);
    let x = 0, y = 0, timer: ReturnType<typeof setTimeout> | null = null;
    const move = (ev: MouseEvent) => { x = ev.clientX; y = ev.clientY; };
    document.addEventListener('mousemove', move);
    return {
      show(msg: string) {
        box.textContent = msg;
        box.style.left = `${x + 14}px`; box.style.top = `${y + 14}px`;
        box.hidden = false;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => { box.hidden = true; }, 1400);
      },
      hide() { box.hidden = true; if (timer) clearTimeout(timer); timer = null; },
      dispose() { document.removeEventListener('mousemove', move); if (timer) clearTimeout(timer); box.remove(); },
    };
  })();
  ctrl.onNotice((m) => notice.show(m));
  ctrl.isBlocked = () => offer.isOpen() || session.state.status !== 'playing' || session.state.pendingOffer !== null || help.isOpen() || topRight.isOpen() || (journal?.isOpen() ?? false);

  function toggleJournal(): void {
    if (session.state.status !== 'playing' || offer.isOpen() || session.state.pendingOffer || help.isOpen() || topRight.isOpen()) return;
    if (journal) {
      if (journal.isOpen()) journal.close(); else { notice.hide(); journal.open(); }
    } else notice.show('Journal coming soon.');
  }

  // The book subscribes to session events itself. J can close it even while board input is blocked.
  const onKey = (ev: KeyboardEvent) => {
    const t = ev.target;
    if (t instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable)) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if ((ev.key === 'j' || ev.key === 'J') && !ev.repeat) { ev.preventDefault(); toggleJournal(); }
  };
  document.addEventListener('keydown', onKey);

  const renderAll = () => { pills.render(); stack.render(); triangle.render(); deck.render(); detail.render(); };
  ctrl.onChange(() => { stack.render(); triangle.render(); deck.render(); detail.render(); });

  const off = session.subscribe((e) => {
    ctrl.handleEvent(e); // re-renders the selection-dependent components via onChange
    switch (e.type) {
      case 'runStarted':
        pills.reset(); toasts.clear(); offer.hide(); end.hide(); topRight.close(); notice.hide(); topRight.setEnabled(true); renderAll();
        help.hide();
        break;
      case 'offerShown': help.hide(); journal?.close(); topRight.close(); offer.show(e.offer); renderAll(); break;
      case 'offerResolved': renderAll(); offer.resolve(e.biome); break;
      case 'payouts': toasts.push(e.events); pills.render(); break;
      case 'runEnded': offer.hide(); help.hide(); journal?.close(); topRight.close(); topRight.setEnabled(false); notice.hide(); toasts.clear(); renderAll(); end.show(e.stats);
        host.querySelector('.end-screen')?.prepend(el('div', 'j-wordmark', 'Hex Genesis')); break;
      default: pills.render();
    }
  });

  // Mounting after newRun must recover the current modal, not wait for another event.
  topRight.setEnabled(session.state.status === 'playing');
  const disposeLayout = installJournalLayout(host, stackHost);
  if (session.state.pendingOffer) offer.show(session.state.pendingOffer);

  return {
    dispose() {
      off(); ctrl.dispose(); notice.dispose(); disposeLayout();
      document.removeEventListener('keydown', onKey);
      for (const c of [pills, stack, triangle, deck, detail, toasts, offer, end, help, topRight]) c.dispose();
      journal?.dispose();
      host.remove(); if (!hadRootClass) root.classList.remove('journal-root');
    },
  };
}
