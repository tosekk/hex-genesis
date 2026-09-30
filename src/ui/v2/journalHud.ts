import type { BoardView, GameSession, Hud } from '../../core/contracts';
import { BIOME_COLORS } from '../../render/palette';
import { createEndScreen } from '../endScreen';
import { el } from '../format';
import { createOfferModal } from '../offerModal';
import { createToasts } from '../toasts';
import { Ctrl } from './ctrl';
import { createDeck } from './deck';
import { createDetail } from './detail';
import { createPills } from './pills';
import { createThresholdStack } from './thresholds';
import { createTopRight, type AudioSettingsLike } from './topRight';
import { createTriangle } from './triangle';
import { createJournalHelp } from './help';
import { installJournalLayout } from './layout';
import './fonts.css';
import './styles.css';

export interface JournalDeps {
  audio?: AudioSettingsLike;
  /** U2 plugs the journal book in here. */
  createJournal?: (root: HTMLElement, session: GameSession) => { toggle(): void; close(): void; isOpen(): boolean; handleEvent(e: import('../../core/contracts').SessionEvent): void; dispose(): void };
}

/** sol's optional `audioSettings` (src/audio/settings.ts). Resolved lazily so the build works before it lands. */
const AUDIO_MODULES = import.meta.glob<{ audioSettings?: AudioSettingsLike }>('../../audio/settings.ts', { eager: true });
export function defaultAudioSettings(): AudioSettingsLike | undefined {
  return Object.values(AUDIO_MODULES)[0]?.audioSettings;
}

const hexColor = (n: number) => `#${n.toString(16).padStart(6, '0')}`;

/** The field-journal HUD (UI_SPEC v1). State changes only through GameSession commands. */
export function createJournalHud(root: HTMLElement, session: GameSession, board: BoardView, deps: JournalDeps = {}): Hud {
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
  const offer = createOfferModal(host, session);
  const end = createEndScreen(host, session);
  const help = createJournalHelp(host, () => session.state.pendingOffer !== null);
  top.append(el('small', 'j-controls-hint', 'Press ? for controls'));
  const journal = deps.createJournal?.(host, session);
  const topRight = createTopRight(host, session, {
    openHelp: () => help.open(),
    toggleJournal: () => (journal ? journal.toggle() : notice.show('The journal is on its way.')),
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
      dispose() { document.removeEventListener('mousemove', move); if (timer) clearTimeout(timer); box.remove(); },
    };
  })();
  ctrl.onNotice((m) => notice.show(m));
  ctrl.isBlocked = () => session.state.status !== 'playing' || session.state.pendingOffer !== null || help.isOpen() || topRight.isOpen() || (journal?.isOpen() ?? false);

  // J opens/closes the journal (U2); the help overlay's own capture handler swallows keys while it is open.
  const onKey = (ev: KeyboardEvent) => {
    const t = ev.target;
    if (t instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable)) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if ((ev.key === 'j' || ev.key === 'J') && journal) { journal.toggle(); }
  };
  document.addEventListener('keydown', onKey);

  const renderAll = () => { pills.render(); stack.render(); triangle.render(); deck.render(); detail.render(); };
  ctrl.onChange(() => { stack.render(); triangle.render(); deck.render(); detail.render(); });

  const off = session.subscribe((e) => {
    journal?.handleEvent(e);
    ctrl.handleEvent(e); // re-renders the selection-dependent components via onChange
    switch (e.type) {
      case 'runStarted':
        pills.reset(); toasts.clear(); offer.hide(); end.hide(); topRight.hideConfirm(); renderAll();
        help.hide();
        break;
      case 'offerShown': help.hide(); offer.show(e.offer); renderAll(); break;
      case 'offerResolved': offer.hide(); renderAll(); break;
      case 'payouts': toasts.push(e.events); pills.render(); break;
      case 'runEnded': offer.hide(); topRight.hideConfirm(); renderAll(); end.show(e.stats); break;
      default: pills.render();
    }
  });

  // Mounting after newRun must recover the current modal, not wait for another event.
  if (session.state.pendingOffer) offer.show(session.state.pendingOffer);
  const disposeLayout = installJournalLayout(host, stackHost);

  return {
    dispose() {
      off(); ctrl.dispose(); notice.dispose(); disposeLayout();
      document.removeEventListener('keydown', onKey);
      for (const c of [pills, stack, triangle, deck, detail, toasts, offer, end, help, topRight]) c.dispose();
      journal?.dispose();
      host.remove();
    },
  };
}
