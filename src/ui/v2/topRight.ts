import type { GameSession } from '../../core/contracts';
import { startNewRun } from '../endScreen';
import { el, icon } from '../format';

export interface AudioSettingsLike {
  readonly muted: boolean;
  readonly volume: number;
  setMuted(v: boolean): void;
  setVolume(v: number): void;
  subscribe(cb: () => void): () => void;
}

/** Persistent controls preserve focus and range dragging when sound settings change. */
export function createTopRight(root: HTMLElement, session: GameSession,
  opts: { openHelp(): void; toggleJournal(): void; audio?: AudioSettingsLike }) {
  const bar = el('div', 'j-topright');
  const journalBtn = el('button', 'j-btn j-icon-btn journal-btn');
  journalBtn.title = 'Journal (J)'; journalBtn.setAttribute('aria-label', journalBtn.title);
  journalBtn.appendChild(icon('journal', 'Book'));
  const menuBtn = el('button', 'j-btn j-icon-btn menu-btn');
  menuBtn.title = 'Menu'; menuBtn.setAttribute('aria-label', menuBtn.title);
  menuBtn.appendChild(icon('menu', 'Menu'));
  bar.append(journalBtn, menuBtn); root.append(bar);
  const menu = el('div', 'j-panel j-menu'); menu.hidden = true;
  menu.setAttribute('aria-label', 'Run menu'); menu.append(el('div', 'j-wordmark', 'Hex Genesis')); root.append(menu);
  const help = el('button', 'j-btn menu-help', 'Help');
  help.addEventListener('click', () => { hideMenu(); opts.openHelp(); }); menu.append(help);
  let unsub: (() => void) | undefined;
  if (opts.audio) {
    const a = opts.audio, sound = el('div', 'j-sound');
    const mute = el('button', 'j-btn menu-mute'), vol = el('input', 'menu-volume');
    vol.type = 'range'; vol.min = '0'; vol.max = '100'; vol.setAttribute('aria-label', 'Sound volume');
    const update = () => { mute.textContent = a.muted ? 'Sound: off' : 'Sound: on'; mute.setAttribute('aria-pressed', String(a.muted)); vol.value = String(Math.round(a.volume * 100)); };
    mute.addEventListener('click', () => a.setMuted(!a.muted));
    vol.addEventListener('input', () => a.setVolume(Number(vol.value) / 100));
    sound.append(mute, vol); menu.append(sound); update(); unsub = a.subscribe(update);
  }
  const end = el('button', 'j-btn danger menu-end', 'End Run'); menu.append(end);
  const seed = el('input', 'menu-seed'); seed.type = 'text'; seed.placeholder = 'seed (blank = random)'; seed.setAttribute('aria-label', 'New run seed');
  const go = el('button', 'j-btn menu-new', 'New Run'), nr = el('div', 'j-newrun');
  go.addEventListener('click', () => { hideMenu(); startNewRun(session, seed.value); }); nr.append(seed, go); menu.append(nr);
  const confirm = el('div', 'overlay confirm-overlay'); confirm.hidden = true;
  confirm.setAttribute('role', 'dialog'); confirm.setAttribute('aria-modal', 'true'); confirm.setAttribute('aria-label', 'End this run?');
  const cbox = el('div', 'panel modal'), yes = el('button', 'btn danger', 'End run'), no = el('button', 'btn', 'Keep playing');
  cbox.append(el('h2', undefined, 'End this run?'), yes, no); confirm.append(cbox); root.append(confirm);
  function hideMenu(): void { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  function hideConfirm(): void { confirm.hidden = true; menuBtn.focus(); }
  no.addEventListener('click', hideConfirm);
  yes.addEventListener('click', () => { hideConfirm(); session.endRun(); });
  confirm.addEventListener('click', event => { if (event.target === confirm) hideConfirm(); });
  end.addEventListener('click', () => { hideMenu(); confirm.hidden = false; no.focus(); });
  journalBtn.addEventListener('click', () => { hideMenu(); opts.toggleJournal(); });
  menuBtn.addEventListener('click', () => { menu.hidden = !menu.hidden; menuBtn.setAttribute('aria-expanded', String(!menu.hidden)); if (!menu.hidden) help.focus(); });
  const onDoc = (event: MouseEvent) => { if (!bar.contains(event.target as Node) && !menu.contains(event.target as Node)) hideMenu(); };
  const onKey = (event: KeyboardEvent) => {
    if (confirm.hidden && menu.hidden) return;
    if (event.key === 'Escape') { hideMenu(); hideConfirm(); event.preventDefault(); event.stopImmediatePropagation(); return; }
    if (!confirm.hidden && event.key === 'Tab') {
      event.preventDefault(); (document.activeElement === no ? yes : no).focus(); event.stopImmediatePropagation();
    } else if (!confirm.hidden && !['Enter', ' '].includes(event.key)) { event.preventDefault(); event.stopImmediatePropagation(); }
  };
  document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey, true);
  return { isOpen: () => !menu.hidden || !confirm.hidden, hideConfirm, close() { hideMenu(); confirm.hidden = true; },
    setEnabled(v: boolean) { end.disabled = !v; },
    dispose() { unsub?.(); document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey, true); bar.remove(); menu.remove(); confirm.remove(); } };
}
