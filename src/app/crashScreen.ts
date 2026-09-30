/**
 * Production-only safety net: an uncaught error shows a journal-styled note ("Something went wrong")
 * with Reload (same seed) and Keep playing, instead of a silently frozen screen. The dev overlay
 * (errorOverlay.ts) stays in dev builds. Inline styles only, so it still renders if the HUD CSS
 * or fonts never loaded. Reads nothing from the game but the seed.
 */

export interface CrashScreenOptions {
  /** Seed of the current run, or null before the first run started. */
  seed(): number | null;
  /** Navigates; defaults to location.assign. Injected in tests. */
  navigate?(url: string): void;
}

/** Noise that never means the game is broken: other origins, layout warnings, blocked/aborted media. */
export function isIgnorable(message: string, error: unknown, filename = ''): boolean {
  if (!error && /^Script error\.?$/.test(message)) return true; // cross-origin script (extension, embedding page)
  if (/ResizeObserver loop/.test(message)) return true;
  if (filename && !filename.startsWith(location.origin)) return true; // e.g. chrome-extension://
  const name = (error as { name?: unknown } | null)?.name;
  // Autoplay refusals and interrupted/unsupported media loads (optional audio).
  if (name === 'NotAllowedError' || name === 'AbortError' || name === 'NotSupportedError') return true;
  return false;
}

/** URL that reloads the page on the same world: every other query parameter is kept. */
export function reloadUrl(href: string, seed: number | null): string {
  const url = new URL(href);
  if (seed !== null) url.searchParams.set('seed', String(seed >>> 0));
  return url.toString();
}

const INK = '#2E2A25', PAPER = '#F4EAD5', PAPER2 = '#E8DBBE';
const HAND = "'Patrick Hand', 'Segoe Print', 'Comic Sans MS', cursive";

export function installCrashScreen(opts: CrashScreenOptions): () => void {
  const navigate = opts.navigate ?? ((url: string) => location.assign(url));
  let overlay: HTMLElement | null = null;
  let count = 0;

  function show(detail: string): void {
    count++;
    if (overlay) {
      overlay.querySelector<HTMLElement>('[data-crash-count]')!.textContent = count > 1 ? `(${count} errors)` : '';
      return;
    }
    const seed = opts.seed();
    overlay = document.createElement('div');
    overlay.className = 'crash-overlay';
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'crash-title');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;'
      + 'background:rgba(27,29,34,.55);pointer-events:auto;';
    const card = document.createElement('div');
    card.style.cssText = `max-width:380px;margin:16px;padding:18px 22px;background:${PAPER};color:${INK};`
      + `border:2px solid ${INK};border-radius:9px 12px 8px 11px;box-shadow:3px 4px 0 rgba(46,42,37,.35);`
      + "transform:rotate(-.6deg);font:15px/1.45 'Nunito', system-ui, sans-serif;";
    const title = document.createElement('h2');
    title.id = 'crash-title';
    title.textContent = 'Something went wrong';
    title.style.cssText = `margin:0 0 6px;font:400 28px/1.1 ${HAND};`;
    const text = document.createElement('p');
    text.style.cssText = 'margin:0 0 12px;';
    text.textContent = seed === null
      ? 'The planet hiccupped. Reload to start again.'
      : `The planet hiccupped. Reload to start this world again (seed ${seed >>> 0}), or keep playing if it still responds.`;
    const small = document.createElement('p');
    small.style.cssText = 'margin:0 0 12px;font-size:12px;opacity:.7;word-break:break-word;';
    small.textContent = detail.slice(0, 160);
    const counter = document.createElement('span');
    counter.dataset.crashCount = '';
    counter.style.marginLeft = '6px';
    small.appendChild(counter);
    const button = (label: string, primary: boolean) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = `font:inherit;font-weight:800;color:${INK};cursor:pointer;margin:0 8px 0 0;padding:6px 12px;`
        + `border:1.5px solid ${INK};border-radius:7px 8px 6px 8px;background:${primary ? '#F5D547' : PAPER2};`;
      return b;
    };
    const reload = button(seed === null ? 'Reload' : `Reload (seed ${seed >>> 0})`, true);
    reload.dataset.crash = 'reload';
    reload.addEventListener('click', () => navigate(reloadUrl(location.href, seed)));
    const keep = button('Keep playing', false);
    keep.dataset.crash = 'keep';
    keep.addEventListener('click', () => { overlay?.remove(); overlay = null; count = 0; });
    card.append(title, text, small, reload, keep);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    try { reload.focus(); } catch { /* ignored */ }
  }

  const onError = (e: ErrorEvent) => {
    if (isIgnorable(e.message ?? '', e.error, e.filename ?? '')) return;
    show(String((e.error as Error | undefined)?.message ?? e.message ?? 'Unknown error'));
  };
  const onRejection = (e: PromiseRejectionEvent) => {
    const reason = e.reason as { message?: unknown } | undefined;
    const message = String(reason?.message ?? reason ?? '');
    if (isIgnorable(message, reason ?? null)) return;
    show(message || 'Unhandled promise rejection');
  };
  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onRejection);
  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onRejection);
    overlay?.remove();
    overlay = null;
  };
}
