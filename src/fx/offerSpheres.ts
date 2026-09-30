// OWNER: opus (O11). Biome-offer "spheres" effect for the journal HUD — tasks/UI_SPEC.md §5 "Biome offer", §8.3.
// Presentation only: it never touches the session. The HUD passes onChoose/onReshuffle and calls
// session.chooseOffer / session.reshuffleOffer itself, then calls resolve() when the offer is resolved.
import type { BiomeOffer, MainBiome } from '../core/types';
import { BIOME_COLORS } from '../render/palette';

export interface OfferFx {
  present(o: {
    offer: BiomeOffer; from: DOMRect | null; canReshuffle: boolean;
    onChoose(i: 0 | 1): void; onReshuffle(): void;
  }): void;
  update(offer: BiomeOffer, canReshuffle: boolean): void;
  resolve(chosen: 0 | 1, to: DOMRect | null): Promise<void>;
  hide(): void;
  dispose(): void;
}

export interface OfferFxOptions {
  /** Override prefers-reduced-motion (tests, demo). */
  reducedMotion?: boolean;
}

/** Timings (ms). The whole resolve stays ≤ 1.6 s (§8.3). */
export const FX_TIMING = { flyIn: 520, rays: 450, flyOut: 650, shards: 900, fade: 260 } as const;
export const RESOLVE_MAX_MS = 1600;

const LABEL: Record<MainBiome, string> = { forest: 'Forest', desert: 'Desert', arctic: 'Arctic' };
const ICON_BASE = `${import.meta.env?.BASE_URL ?? './'}assets/icons/`;
const hex = (n: number) => `#${n.toString(16).padStart(6, '0')}`;

const CSS = `
.ofx { position: fixed; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 28px; pointer-events: auto; background: rgba(28, 25, 21, 0); transition: background ${FX_TIMING.fade}ms ease;
  font-family: var(--font-body, Nunito, system-ui, sans-serif); color: #2E2A25; }
.ofx.on { background: rgba(28, 25, 21, .55); }
.ofx-title { font-family: var(--font-heading, 'Patrick Hand', cursive); font-size: 28px; color: #F4EAD5;
  text-shadow: 0 2px 0 rgba(0,0,0,.35); opacity: 0; transition: opacity ${FX_TIMING.fade}ms ease; }
.ofx.on .ofx-title { opacity: 1; }
.ofx-row { display: flex; gap: 96px; }
.ofx-sphere { position: relative; width: 168px; height: 168px; border-radius: 50%; border: 2px solid #2E2A25; padding: 0;
  cursor: pointer; background: radial-gradient(circle at 35% 30%, #fff8 0 8%, var(--c) 42%, color-mix(in srgb, var(--c) 55%, #000) 100%);
  box-shadow: 0 10px 24px rgba(0,0,0,.35), inset 0 -10px 22px rgba(0,0,0,.25);
  transform: translate(var(--dx, 0px), var(--dy, 0px)) scale(var(--s, .2)); opacity: 0;
  transition: transform ${FX_TIMING.flyIn}ms cubic-bezier(.2,.9,.25,1.15), opacity ${FX_TIMING.fade}ms ease, box-shadow .15s; }
.ofx.on .ofx-sphere { --dx: 0px; --dy: 0px; --s: 1; opacity: 1; }
.ofx-sphere:hover, .ofx-sphere:focus-visible { outline: none; box-shadow: 0 0 0 5px #F5D547, 0 10px 24px rgba(0,0,0,.35); }
.ofx-sphere img { width: 64px; height: 64px; margin-top: 30px; filter: drop-shadow(0 1px 0 #fff6); }
.ofx-name { position: absolute; left: 50%; bottom: -46px; transform: translateX(-50%); white-space: nowrap;
  font-family: var(--font-heading, 'Patrick Hand', cursive); font-size: 24px; color: #F4EAD5; }
.ofx-key { position: absolute; top: -10px; right: -6px; min-width: 28px; height: 28px; border-radius: 6px; border: 1.5px solid #2E2A25;
  background: #F4EAD5; font: 700 15px/25px var(--font-body, Nunito, sans-serif); font-variant-numeric: tabular-nums; }
.ofx-reshuffle { margin-top: 40px; padding: 8px 18px; border-radius: 8px; border: 1.5px solid #2E2A25; background: #F4EAD5;
  font: 600 15px var(--font-body, Nunito, sans-serif); color: #2E2A25; cursor: pointer; opacity: 0; transition: opacity ${FX_TIMING.fade}ms; }
.ofx.on .ofx-reshuffle { opacity: 1; }
.ofx-reshuffle:disabled { cursor: default; color: #6B6257; background: #E8DBBE; }
.ofx-reshuffle:not(:disabled):hover { box-shadow: 0 0 0 3px #F5D547; }
.ofx.busy .ofx-sphere, .ofx.busy .ofx-reshuffle { cursor: default; pointer-events: none; }
.ofx.busy .ofx-reshuffle, .ofx.busy .ofx-title { opacity: 0; }
.ofx-rays { position: absolute; left: 50%; top: 50%; width: 420px; height: 420px; margin: -210px 0 0 -210px; border-radius: 50%;
  pointer-events: none; opacity: 0; transform: scale(.4) rotate(0deg);
  background: repeating-conic-gradient(from 0deg, #F5D54799 0deg 6deg, transparent 6deg 18deg);
  -webkit-mask: radial-gradient(circle, #000 20%, transparent 70%); mask: radial-gradient(circle, #000 20%, transparent 70%);
  transition: opacity ${FX_TIMING.rays}ms ease, transform ${FX_TIMING.rays + FX_TIMING.flyOut}ms linear; z-index: -1; }
.ofx-sphere.chosen { box-shadow: 0 0 0 5px #F5D547, 0 0 48px 12px #F5D547aa; }
.ofx-sphere.chosen .ofx-rays { opacity: 1; transform: scale(1) rotate(40deg); }
.ofx-sphere.flying { transition: transform ${FX_TIMING.flyOut}ms cubic-bezier(.55,0,.3,1), opacity ${FX_TIMING.flyOut}ms ease-in; }
.ofx-sphere.gone { visibility: hidden; }
.ofx-shards { position: fixed; inset: 0; pointer-events: none; }
.ofx.fade { transition: opacity ${FX_TIMING.fade}ms ease; opacity: 0; }
@media (prefers-reduced-motion: reduce) { .ofx *, .ofx { transition-duration: 1ms !important; } }
`;

let styleRefs = 0;
let styleEl: HTMLStyleElement | null = null;
function retainStyle(doc: Document): void {
  if (styleRefs++ === 0) {
    styleEl = doc.createElement('style');
    styleEl.dataset.owner = 'offer-spheres';
    styleEl.textContent = CSS;
    doc.head.appendChild(styleEl);
  }
}
function releaseStyle(): void {
  if (--styleRefs === 0) { styleEl?.remove(); styleEl = null; }
}

const center = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
const later = (fn: () => void) => (typeof requestAnimationFrame === 'function'
  ? requestAnimationFrame(() => requestAnimationFrame(fn)) : setTimeout(fn, 16));

export function createOfferFx(root: HTMLElement, opts: OfferFxOptions = {}): OfferFx {
  const doc = root.ownerDocument;
  const win = doc.defaultView ?? window;
  const reduced = () => opts.reducedMotion ?? win.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  retainStyle(doc);

  let host: HTMLDivElement | null = null;
  let spheres: HTMLButtonElement[] = [];
  let reshuffleBtn: HTMLButtonElement | null = null;
  let handlers: { onChoose(i: 0 | 1): void; onReshuffle(): void } | null = null;
  let choosing = false; // true while waiting for resolve() after a choice
  let timers: ReturnType<typeof setTimeout>[] = [];
  let pending: (() => void) | null = null;
  let disposed = false;

  const wait = (ms: number) => new Promise<void>((res) => { timers.push(setTimeout(res, ms)); });

  function paint(offer: BiomeOffer, canReshuffle: boolean): void {
    offer.options.forEach((b, i) => {
      const s = spheres[i];
      s.style.setProperty('--c', hex(BIOME_COLORS[b]));
      s.dataset.biome = b;
      s.setAttribute('aria-label', `${LABEL[b]} (press ${i + 1})`);
      const img = s.querySelector('img')!;
      img.src = `${ICON_BASE}${b}.svg`;
      s.querySelector('.ofx-name')!.textContent = LABEL[b];
    });
    reshuffleBtn!.disabled = !canReshuffle;
    reshuffleBtn!.textContent = canReshuffle ? 'Reshuffle' : 'No reshuffle left';
  }

  const choose = (i: 0 | 1) => {
    if (!host || choosing || !handlers) return;
    choosing = true;
    host.classList.add('busy');
    handlers.onChoose(i);
  };

  const onKey = (e: KeyboardEvent) => {
    if (!host) return;
    if (e.key === '1' || e.key === '2') {
      e.preventDefault();
      e.stopPropagation(); // the FX owns 1/2 while it is shown, so a HUD handler can't double-choose
      choose(e.key === '1' ? 0 : 1);
    }
  };

  function teardown(): void {
    timers.forEach(clearTimeout);
    timers = [];
    win.removeEventListener('keydown', onKey, true);
    host?.remove();
    host = null;
    spheres = [];
    reshuffleBtn = null;
    handlers = null;
    choosing = false;
    const p = pending;
    pending = null;
    p?.();
  }

  function shatter(from: DOMRect, color: string): void {
    const canvas = doc.createElement('canvas');
    canvas.className = 'ofx-shards';
    const w = win.innerWidth || 1280, h = win.innerHeight || 720;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext?.('2d') ?? null;
    if (!ctx || !host) return; // no 2D canvas (e.g. tests): the sphere just disappears
    host.appendChild(canvas);
    const c = center(from), r = from.width / 2;
    // Deterministic-looking but visual-only randomness is fine here (no game state).
    const shards = Array.from({ length: 26 }, (_, k) => {
      const a = (k / 26) * Math.PI * 2 + Math.random() * 0.4;
      const sp = 140 + Math.random() * 260;
      return { x: c.x + Math.cos(a) * r * 0.5, y: c.y + Math.sin(a) * r * 0.5, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60,
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 12, size: 8 + Math.random() * 16 };
    });
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / FX_TIMING.shards);
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1 - t;
      ctx.fillStyle = color;
      ctx.strokeStyle = '#2E2A25';
      ctx.lineWidth = 1.5;
      const dt = (now - start) / 1000;
      for (const s of shards) {
        const x = s.x + s.vx * dt, y = s.y + s.vy * dt + 320 * dt * dt;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.rot + s.vr * dt);
        ctx.beginPath();
        ctx.moveTo(-s.size / 2, -s.size / 3);
        ctx.lineTo(s.size / 2, -s.size / 2);
        ctx.lineTo(s.size / 3, s.size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      if (t < 1 && host) requestAnimationFrame(step); else canvas.remove();
    };
    requestAnimationFrame(step);
  }

  return {
    present({ offer, from, canReshuffle, onChoose, onReshuffle }) {
      if (disposed) return;
      teardown();
      handlers = { onChoose, onReshuffle };
      host = doc.createElement('div');
      host.className = 'ofx';
      host.setAttribute('role', 'dialog');
      host.setAttribute('aria-modal', 'true');
      host.setAttribute('aria-label', 'Choose a biome for your core');
      // The backdrop swallows pointer input so nothing reaches the board or HUD behind it (§9).
      for (const t of ['pointerdown', 'pointerup', 'click', 'wheel', 'contextmenu'] as const) {
        host.addEventListener(t, (e) => { e.stopPropagation(); if (e.target === host) e.preventDefault(); });
      }
      const title = doc.createElement('div');
      title.className = 'ofx-title';
      title.textContent = 'Choose a biome for your core';
      const row = doc.createElement('div');
      row.className = 'ofx-row';
      spheres = [0, 1].map((i) => {
        const s = doc.createElement('button');
        s.type = 'button';
        s.className = 'ofx-sphere';
        s.innerHTML = `<span class="ofx-rays"></span><img alt="" draggable="false"><span class="ofx-name"></span><span class="ofx-key">${i + 1}</span>`;
        s.querySelector('img')!.addEventListener('error', (e) => { (e.target as HTMLElement).style.visibility = 'hidden'; });
        s.addEventListener('click', () => choose(i as 0 | 1));
        row.appendChild(s);
        return s;
      });
      reshuffleBtn = doc.createElement('button');
      reshuffleBtn.type = 'button';
      reshuffleBtn.className = 'ofx-reshuffle';
      reshuffleBtn.addEventListener('click', () => { if (!choosing && !reshuffleBtn!.disabled) handlers?.onReshuffle(); });
      host.append(title, row, reshuffleBtn);
      paint(offer, canReshuffle);
      root.appendChild(host);

      // Fly out of `from` (the biome triangle): start each sphere at that point, then let CSS take them to the centre.
      if (from && !reduced()) {
        const c = center(from);
        for (const s of spheres) {
          const r = s.getBoundingClientRect();
          const me = center(r);
          s.style.setProperty('--dx', `${c.x - me.x}px`);
          s.style.setProperty('--dy', `${c.y - me.y}px`);
        }
      }
      win.addEventListener('keydown', onKey, true);
      const h = host;
      later(() => {
        if (host !== h) return;
        for (const s of spheres) { s.style.removeProperty('--dx'); s.style.removeProperty('--dy'); }
        h.classList.add('on');
      });
      spheres[0].focus({ preventScroll: true });
    },

    update(offer, canReshuffle) {
      if (!host) return;
      choosing = false;
      host.classList.remove('busy');
      paint(offer, canReshuffle);
      if (!reduced()) {
        for (const s of spheres) {
          s.style.setProperty('--s', '.6');
          later(() => s.style.removeProperty('--s'));
        }
      }
    },

    resolve(chosen, to) {
      if (!host) return Promise.resolve();
      const h = host;
      h.classList.add('busy');
      choosing = true;
      win.removeEventListener('keydown', onKey, true);
      const done = new Promise<void>((res) => { pending = res; });
      const finish = () => { if (host === h) teardown(); };

      if (reduced()) {
        h.classList.add('fade');
        timers.push(setTimeout(finish, FX_TIMING.fade));
        return done;
      }
      const winner = spheres[chosen];
      const loser = spheres[chosen === 0 ? 1 : 0];
      winner.classList.add('chosen');
      // The other sphere shatters and dissolves.
      shatter(loser.getBoundingClientRect(), getComputedStyle(loser).getPropertyValue('--c') || '#888');
      loser.classList.add('gone');
      (async () => {
        await wait(FX_TIMING.rays);
        if (host !== h) return;
        // The chosen sphere flies into its triangle corner.
        if (to) {
          const a = center(winner.getBoundingClientRect()), b = center(to);
          winner.classList.add('flying');
          winner.style.setProperty('--dx', `${b.x - a.x}px`);
          winner.style.setProperty('--dy', `${b.y - a.y}px`);
          winner.style.setProperty('--s', '.18');
        }
        h.classList.add('fade');
        await wait(FX_TIMING.flyOut);
        finish();
      })();
      return done;
    },

    hide() { teardown(); },

    dispose() {
      if (disposed) return;
      teardown();
      disposed = true;
      releaseStyle();
    },
  };
}
