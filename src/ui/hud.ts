// OWNER: sonnet
import type { BoardView, GameSession, Hud } from '../core/contracts';
import { createCodex } from './codex';
import { createCoreStack } from './coreStack';
import { createEndScreen } from './endScreen';
import { el } from './format';
import { createHelpOverlay } from './helpOverlay';
import { createHexPanel } from './hexPanel';
import { createInteraction } from './interaction';
import { createOfferModal } from './offerModal';
import { createResourceBar } from './resourceBar';
import './styles.css';
import { createQuickBuild } from './quickBuild';
import { createToasts } from './toasts';
import { createLockedTooltip } from './tooltip';

export function createHud(root: HTMLElement, session: GameSession, board: BoardView): Hud {
  const host = el('div', 'hud');
  root.appendChild(host);

  const ui = createInteraction(session, board);
  const resources = createResourceBar(host, session);
  const cores = createCoreStack(host, session, ui);
  const hexPanel = createHexPanel(host, session, ui);
  const codex = createCodex(host, session);
  const toasts = createToasts(host, session);
  const quick = createQuickBuild(host, session, ui);
  const tooltip = createLockedTooltip(host, session, ui);
  const offer = createOfferModal(host, session);
  const end = createEndScreen(host, session);
  const help = createHelpOverlay(host);

  const endBtn = el('button', 'btn end-run', 'End Run');
  const confirm = el('div', 'overlay confirm-overlay');
  confirm.hidden = true;
  const cbox = el('div', 'panel modal');
  const yes = el('button', 'btn danger', 'End run');
  const no = el('button', 'btn', 'Keep playing');
  cbox.append(el('h2', undefined, 'End this run?'), yes, no);
  confirm.appendChild(cbox);
  endBtn.addEventListener('click', () => { confirm.hidden = false; });
  no.addEventListener('click', () => { confirm.hidden = true; });
  yes.addEventListener('click', () => { confirm.hidden = true; session.endRun(); });
  host.append(endBtn, confirm);

  const renderAll = () => { quick.render(); resources.render(); cores.render(); hexPanel.render(); codex.render(); };
  ui.onChange(() => { cores.render(); hexPanel.render(); quick.render(); });

  const off = session.subscribe((e) => {
    ui.handleEvent(e);
    switch (e.type) {
      case 'runStarted':
        toasts.clear(); offer.hide(); end.hide(); endBtn.hidden = false; confirm.hidden = true; renderAll();
        help.maybeAutoShow();
        break;
      case 'offerShown': offer.show(e.offer); renderAll(); break;
      case 'offerResolved': offer.hide(); renderAll(); break;
      case 'payouts': toasts.push(e.events); break;
      case 'combosDiscovered': codex.render(); break;
      case 'spreadFinished': tooltip.hide(); renderAll(); break;
      case 'runEnded': endBtn.hidden = true; offer.hide(); confirm.hidden = true; renderAll(); end.show(e.stats); break;
      default: renderAll();
    }
  });

  return {
    dispose() {
      off(); ui.dispose();
      for (const c of [resources, cores, hexPanel, codex, toasts, quick, tooltip, offer, end, help]) c.dispose();
      host.remove();
    },
  };
}
