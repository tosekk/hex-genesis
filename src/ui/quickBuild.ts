import type { GameSession } from '../core/contracts';
import { buildingName, el, fmtResources } from './format';
import type { Interaction } from './interaction';
import { renderPreview } from './preview';

/** S4: "Repeat: <building>" chip, failure notice, and Shift-hover preview. UI convenience only. */
export function createQuickBuild(root: HTMLElement, session: GameSession, ui: Interaction) {
  const chip = el('button', 'chip repeat-chip');
  chip.hidden = true;
  const notice = el('div', 'notice');
  notice.hidden = true;
  const pv = el('div', 'panel shift-preview');
  pv.hidden = true;
  root.append(chip, notice, pv);
  let noticeTimer: ReturnType<typeof setTimeout> | null = null;
  let x = 0, y = 0;
  const onMouse = (ev: MouseEvent) => { x = ev.clientX; y = ev.clientY; };
  document.addEventListener('mousemove', onMouse);

  chip.addEventListener('click', () => ui.clearLastBuilt());

  function renderChip(): void {
    const b = ui.lastBuilt;
    chip.hidden = b === null;
    if (b === null) return;
    const s = session.state;
    const def = s.config.buildings[b];
    const affordable = Object.entries(def.cost).every(([r, v]) => (s.resources[r] ?? 0) >= v);
    chip.textContent = `Repeat: ${buildingName(s.config, b)} · ${fmtResources(def.cost)} · [R / Shift+click]`;
    chip.setAttribute('aria-label', chip.textContent);
    chip.classList.toggle('unaffordable', !affordable);
    chip.title = 'Click to clear';
  }

  function renderPv(): void {
    pv.replaceChildren();
    const b = ui.lastBuilt;
    const h = ui.hovered;
    const slot = h ? ui.quickSlot(h) : null;
    if (!ui.shiftHeld || !b || !h || slot === null) { pv.hidden = true; return; }
    renderPreview(pv, session.preview(h.hexId, slot, b), session.state.config);
    pv.hidden = pv.childElementCount === 0;
  }

  ui.onNotice((msg) => {
    notice.textContent = msg;
    notice.style.left = `${x + 14}px`; notice.style.top = `${y + 14}px`;
    notice.hidden = false;
    if (noticeTimer !== null) clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { notice.hidden = true; }, 1200);
  });
  ui.onHover(renderPv);

  const render = () => { renderChip(); renderPv(); };
  render();
  return {
    render,
    dispose() {
      document.removeEventListener('mousemove', onMouse);
      if (noticeTimer !== null) clearTimeout(noticeTimer);
      chip.remove(); notice.remove(); pv.remove();
    },
  };
}
