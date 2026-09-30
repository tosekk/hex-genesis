import { el } from './format';

const SEEN_KEY = 'terraform.helpSeen';

// Camera bindings mirror src/render/boardView.ts: OrbitControls with LEFT disabled,
// RIGHT = rotate, MIDDLE = pan, wheel = zoom; keys W/A/S/D pan and Q/E rotate.
const LEGACY_ROWS: [string, string][] = [
  ['Left-click', 'Select a tile / place a core / build'],
  ['Shift + click, or R over a tile', 'Repeat your last building'],
  ['1 / 2', 'Pick the left / right biome offer'],
  ['Hold Tab, or click "Slots left"', 'Highlight every tile that still has an empty slot'],
  ['Esc, or right-click', 'Cancel core placement / deselect'],
  ['Right-drag, or Q / E', 'Rotate the camera'],
  ['Mouse wheel', 'Zoom'],
  ['Middle-drag, or W A S D', 'Pan the camera'],
  ['? or H', 'Show / hide this help'],
  ['Goal', 'Reach the final threshold before you run out of room. Every slot and combo pays only once.'],
];

const JOURNAL_ROWS: [string, string][] = [
  ['Building card, then a slot', 'Place it. The card stays selected, so keep clicking slots'],
  ['A slot, then a building card', 'Place into that slot; selection moves to the next empty slot'],
  ['Core card, then a highlighted tile', 'Place a core (grey card = no core of that biome held)'],
  ['Shift + click, or R over a tile', 'Repeat your last building'],
  ['1 / 2', 'Pick the left / right biome offer'],
  ['Hold Tab, or click "Slots left"', 'Highlight every tile that still has an empty slot'],
  ['J', 'Open / close the journal'],
  ['Esc, or right-click', 'Clear the current selection'],
  ['Right-drag, or Q / E', 'Rotate the camera'],
  ['Mouse wheel', 'Zoom'],
  ['Middle-drag, or W A S D', 'Pan the camera'],
  ['? or H', 'Show / hide this help'],
  ['Goal', 'Reach the final threshold before you run out of room. Every slot and combo pays only once.'],
];

const typing = (t: EventTarget | null) =>
  t instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable);

/** Controls help: `?` / `H` / the "?" button toggle it; Esc closes; shown once automatically per browser session. */
export function createHelpOverlay(root: HTMLElement, opts: { variant?: 'legacy' | 'journal' } = {}) {
  const journal = opts.variant === 'journal';
  const ROWS = journal ? JOURNAL_ROWS : LEGACY_ROWS;
  const btn = el('button', 'btn help-btn', '?');
  btn.hidden = journal; // the journal HUD opens help from its menu
  btn.title = 'Controls (? or H)';
  btn.setAttribute('aria-label', 'Show controls help');
  const overlay = el('div', 'overlay help-overlay');
  overlay.hidden = true;
  const box = el('div', 'panel modal help');
  box.appendChild(el('h2', undefined, 'Controls'));
  const table = el('div', 'help-rows');
  for (const [k, v] of ROWS) {
    const row = el('div', 'help-row');
    row.append(el('kbd', undefined, k), el('span', undefined, v));
    table.appendChild(row);
  }
  const close = el('button', 'btn primary', 'Got it');
  box.append(table, close);
  overlay.appendChild(box);
  root.append(btn, overlay);

  const isOpen = () => !overlay.hidden;
  const open = () => { overlay.hidden = false; close.focus(); };
  const hide = () => { overlay.hidden = true; btn.blur(); };
  btn.addEventListener('click', () => (isOpen() ? hide() : open()));
  close.addEventListener('click', hide);
  overlay.addEventListener('click', (ev) => { if (ev.target === overlay) hide(); });

  // Capture phase: while open, swallow other shortcuts (1/2, R, Esc-cancel…) so nothing acts behind the dialog.
  const onKey = (ev: KeyboardEvent) => {
    if (typing(ev.target) || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const k = ev.key;
    if (k === '?' || k === 'h' || k === 'H') { ev.stopPropagation(); isOpen() ? hide() : open(); return; }
    if (!isOpen()) return;
    if (k === 'Escape' || k === 'Enter') hide();
    ev.stopPropagation();
  };
  document.addEventListener('keydown', onKey, true);

  let shown = false;
  return {
    isOpen,
    open,
    hide,
    /** Call on runStarted: opens the help the first time only. */
    maybeAutoShow(): void {
      if (shown) return;
      shown = true;
      try {
        if (sessionStorage.getItem(SEEN_KEY)) return;
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch { /* storage blocked: still show once per page load */ }
      open();
    },
    dispose() { document.removeEventListener('keydown', onKey, true); btn.remove(); overlay.remove(); },
  };
}
