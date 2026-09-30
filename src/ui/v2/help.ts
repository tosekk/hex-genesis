import { el } from '../format';

const ROWS = [
  ['Card → slot', 'Pick a building, then click empty slots to keep placing it.'],
  ['Slot → card', 'Pick an empty slot, then a building. Selection advances to the next empty slot.'],
  ['Core → site', 'Select a held core, then click a highlighted legal tile.'],
  ['R / Shift + click', 'Repeat your last building over a tile.'],
  ['1 / 2', 'Choose the left / right biome offer.'],
  ['Hold Tab', 'Find tiles with empty slots.'],
  ['Esc / right-click', 'Clear the current selection.'],
  ['Right-drag / Q E', 'Rotate the camera.'],
  ['Wheel', 'Zoom.'],
  ['Middle-drag / W A S D', 'Pan the camera.'],
  ['J', 'Open the journal.'],
  ['? / H', 'Show or hide controls.'],
  ['Goal', 'Reach the final threshold before space runs out. Each slot and combo pays once.'],
];

/** Journal-only help; never auto-opens over the first biome offer. */
export function createJournalHelp(root: HTMLElement, blocked: () => boolean) {
  const overlay = el('div', 'overlay help-overlay'); overlay.hidden = true;
  overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-label', 'Controls');
  const box = el('section', 'panel modal help'), rows = el('div', 'help-rows');
  for (const [key, text] of ROWS) { const row = el('div', 'help-row'); row.append(el('kbd', undefined, key), el('span', undefined, text)); rows.append(row); }
  const close = el('button', 'j-btn help-close', 'Close controls');
  box.append(el('h2', undefined, 'Field controls'), rows, close); overlay.append(box); root.append(overlay);
  let previousFocus: HTMLElement | null = null;
  function hide(): void { overlay.hidden = true; if (previousFocus?.isConnected) previousFocus.focus(); previousFocus = null; }
  function open(): void { if (blocked()) return; previousFocus = document.activeElement as HTMLElement; overlay.hidden = false; close.focus(); }
  close.addEventListener('click', hide);
  overlay.addEventListener('click', event => { if (event.target === overlay) hide(); });
  const onKey = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (overlay.hidden && target instanceof HTMLElement && (target.matches('input,textarea,select') || target.isContentEditable)) return;
    const toggle = ['?', 'h', 'H'].includes(event.key);
    if (overlay.hidden) {
      if (!toggle || blocked()) return;
      open();
    } else if (toggle || event.key === 'Escape') hide();
    else if (event.key === 'Tab') close.focus();
    else if (event.key === 'Enter' || event.key === ' ') return; // native close-button activation
    event.preventDefault(); event.stopImmediatePropagation();
  };
  document.addEventListener('keydown', onKey, true);
  return { open, hide, isOpen: () => !overlay.hidden,
    dispose() { document.removeEventListener('keydown', onKey, true); overlay.remove(); } };
}
