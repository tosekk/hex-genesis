import type { GameSession } from '../../core/contracts';
import { startNewRun } from '../endScreen';
import { el, icon } from '../format';

/** Shape of sol's `audioSettings` (src/audio/settings.ts). Optional until it lands. */
export interface AudioSettingsLike {
  readonly muted: boolean;
  readonly volume: number;
  setMuted(v: boolean): void;
  setVolume(v: number): void;
  subscribe(cb: () => void): () => void;
}

/** UI_SPEC §3.6: journal button and ⚙ menu (Help, Sound, End Run with confirm, New Run with a seed). */
export function createTopRight(
  root: HTMLElement, session: GameSession,
  opts: { openHelp(): void; toggleJournal(): void; audio?: AudioSettingsLike },
) {
  const bar = el('div', 'j-topright');
  const journalBtn = el('button', 'j-btn j-icon-btn journal-btn');
  journalBtn.title = 'Journal (J)'; journalBtn.setAttribute('aria-label', journalBtn.title);
  journalBtn.appendChild(icon('journal', 'Book'));
  journalBtn.addEventListener('click', () => opts.toggleJournal());
  const menuBtn = el('button', 'j-btn j-icon-btn menu-btn');
  menuBtn.title = 'Menu'; menuBtn.setAttribute('aria-label', menuBtn.title);
  menuBtn.appendChild(icon('menu', 'Menu'));
  const menu = el('div', 'j-panel j-menu');
  menu.hidden = true;
  bar.append(journalBtn, menuBtn, menu);
  root.appendChild(bar);

  const confirm = el('div', 'overlay confirm-overlay');
  confirm.hidden = true;
  const cbox = el('div', 'panel modal');
  const yes = el('button', 'btn danger', 'End run');
  const no = el('button', 'btn', 'Keep playing');
  cbox.append(el('h2', undefined, 'End this run?'), yes, no);
  confirm.appendChild(cbox);
  root.appendChild(confirm);
  no.addEventListener('click', () => { confirm.hidden = true; });
  yes.addEventListener('click', () => { confirm.hidden = true; session.endRun(); });

  let unsub: (() => void) | null = null;
  function build(): void {
    menu.replaceChildren();
    const help = el('button', 'j-btn menu-help', 'Help');
    help.addEventListener('click', () => { menu.hidden = true; opts.openHelp(); });
    menu.appendChild(help);
    const a = opts.audio;
    if (a) {
      const sound = el('div', 'j-sound');
      const mute = el('button', 'j-btn menu-mute', a.muted ? 'Sound: off' : 'Sound: on');
      mute.addEventListener('click', () => a.setMuted(!a.muted));
      const vol = el('input', 'menu-volume');
      vol.type = 'range'; vol.min = '0'; vol.max = '100'; vol.value = String(Math.round(a.volume * 100));
      vol.addEventListener('input', () => a.setVolume(Number(vol.value) / 100));
      sound.append(mute, vol);
      menu.appendChild(sound);
    }
    const end = el('button', 'j-btn danger menu-end', 'End Run');
    end.addEventListener('click', () => { menu.hidden = true; confirm.hidden = false; });
    menu.appendChild(end);
    const seed = el('input', 'menu-seed');
    seed.type = 'text'; seed.placeholder = 'seed (blank = random)';
    const go = el('button', 'j-btn menu-new', 'New Run');
    go.addEventListener('click', () => { menu.hidden = true; startNewRun(session, seed.value); });
    const nr = el('div', 'j-newrun');
    nr.append(seed, go);
    menu.appendChild(nr);
  }
  build();
  if (opts.audio) unsub = opts.audio.subscribe(() => { const wasHidden = menu.hidden; build(); menu.hidden = wasHidden; });

  menuBtn.addEventListener('click', () => { menu.hidden = !menu.hidden; });
  const onDoc = (ev: MouseEvent) => { if (!bar.contains(ev.target as Node)) menu.hidden = true; };
  document.addEventListener('mousedown', onDoc);

  return {
    isOpen: () => !menu.hidden || !confirm.hidden,
    hideConfirm() { confirm.hidden = true; },
    setEnabled(v: boolean) { menu.querySelector<HTMLButtonElement>('.menu-end')!.disabled = !v; },
    dispose() { unsub?.(); document.removeEventListener('mousedown', onDoc); bar.remove(); confirm.remove(); },
  };
}
