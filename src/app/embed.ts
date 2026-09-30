// Behaviour needed when the game runs inside itch.io's <iframe>.

/** Keys the browser uses to scroll. Inside a non-scrollable iframe they scroll the PARENT page instead. */
const SCROLL_KEYS = new Set([' ', 'Spacebar', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End']);

/** Does the focused element use this key itself? Buttons need only Space (activation); sliders and
 *  selects need arrows (and Home/End); text fields need every key. Anything else must not scroll. */
function ownsKey(t: EventTarget | null, key: string): boolean {
  if (!(t instanceof HTMLElement)) return false;
  if (t.isContentEditable || t.tagName === 'TEXTAREA') return true;
  const space = key === ' ' || key === 'Spacebar';
  if (t.tagName === 'BUTTON' || t.tagName === 'SUMMARY') return space;
  if (t.tagName === 'SELECT') return true;
  if (t instanceof HTMLInputElement) {
    if (t.type === 'range') return !space;
    if (t.type === 'checkbox' || t.type === 'radio' || t.type === 'button' || t.type === 'submit') return space;
    return true; // text-like inputs (e.g. the seed box)
  }
  return false;
}

/** Stops scroll keys from scrolling the embedding page. Returns an uninstall function. */
export function preventScrollKeys(): () => void {
  const onKey = (e: KeyboardEvent) => {
    if (SCROLL_KEYS.has(e.key) && !ownsKey(e.target, e.key)) e.preventDefault();
  };
  // Window CAPTURE phase runs before every other handler, so a UI handler that stops propagation
  // (e.g. the help overlay swallowing keys) can't bypass it. It only cancels the browser's default
  // scroll; propagation continues, so game handlers still see every key.
  window.addEventListener('keydown', onKey, true);
  return () => window.removeEventListener('keydown', onKey, true);
}

/**
 * Inside itch's iframe, keys go to the itch page until the player clicks the game. Ask for focus once the
 * game is ready so the first offer's 1 / 2 hotkeys work immediately. Browsers may refuse this for a
 * cross-site iframe without user activation; it is harmless then, and a click still focuses the game.
 */
export function requestFocus(): void {
  try { window.focus(); } catch { /* ignored */ }
}

/** Removes the #loading indicator from index.html once the first frame has rendered. */
export function hideLoading(): void {
  const el = document.getElementById('loading');
  if (!el) return;
  el.classList.add('done');
  el.addEventListener('transitionend', () => el.remove(), { once: true });
  setTimeout(() => el.remove(), 600); // in case transitions are disabled
}
