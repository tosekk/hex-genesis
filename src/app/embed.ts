// Behaviour needed when the game runs inside itch.io's <iframe>.

/** Keys the browser uses to scroll. Inside a non-scrollable iframe they scroll the PARENT page instead. */
const SCROLL_KEYS = new Set([' ', 'Spacebar', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End']);

/** Elements that need these keys themselves (typing a seed, activating a focused button with Space, sliders). */
const ownsKey = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'SUMMARY'].includes(t.tagName));

/** Stops scroll keys from scrolling the embedding page. Returns an uninstall function. */
export function preventScrollKeys(): () => void {
  const onKey = (e: KeyboardEvent) => {
    if (SCROLL_KEYS.has(e.key) && !ownsKey(e.target)) e.preventDefault();
  };
  // Bubble phase: game handlers still see the key; only the browser's default scroll is cancelled.
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
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
