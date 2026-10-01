export interface PanelRect { x: number; y: number; width: number; height: number; }
export const detailWidth = (width: number): number => Math.max(280, Math.min(340, 280 + (width - 1024) * 60 / 256));
export const deckMetrics = (width: number) => width <= 1150 ? { card: 80, gap: 6 } : { card: 92, gap: 8 };
/** Includes both panel borders/padding (24px) and strip padding (4px). */
export function deckContentWidth(width: number, cards: number): number {
  const { card, gap } = deckMetrics(width), count = Math.min(9, Math.max(1, cards));
  return count * card + (count - 1) * gap + 28;
}
interface ContentBounds { detailHeight?: number; deckContentWidth?: number; deckHeight?: number; }
/** Reservations use the same content measurements and margins as the live layout. */
export function journalLayout(width: number, height: number, stackHeight: number, expandedLaterNote = false, noteHeight = 56, content: ContentBounds = {}) {
  const margin = 16, gap = 12, leftWidth = 248, triangleWidth = 232;
  const dh = content.detailHeight ?? 176, deckHeight = content.deckHeight ?? 136;
  const detail: PanelRect = { x: margin, y: height - margin - dh, width: detailWidth(width), height: dh };
  const triangle: PanelRect = { x: width - margin - triangleWidth, y: height - margin - 224, width: triangleWidth, height: 224 };
  const freeLeft = detail.x + detail.width + gap, freeWidth = triangle.x - gap - freeLeft;
  const deckWidth = Math.min(content.deckContentWidth ?? deckContentWidth(width, 5), freeWidth);
  const deck: PanelRect = { x: freeLeft + (freeWidth - deckWidth) / 2, y: height - margin - deckHeight, width: deckWidth, height: deckHeight };
  return { detail, deck, triangle,
    stack: { x: margin, y: margin, width: leftWidth, height: stackHeight },
    pills: { x: (width + leftWidth - 96) / 2 - 224, y: margin, width: 448, height: 60 },
    menu: { x: width - margin - 88, y: margin, width: 88, height: 40 },
    tutorial: expandedLaterNote
      ? { x: freeLeft, y: 108, width: Math.min(340, freeWidth), height: noteHeight === 56 ? 320 : noteHeight }
      : { x: margin, y: margin + stackHeight + gap, width: leftWidth, height: noteHeight },
  };
}

export function overlaps(a: PanelRect, b: PanelRect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

/** Hide whole optional rows only when the natural detail height exceeds its free column. */
export function compactDetail(panel: HTMLElement, availableHeight: number): number {
  const rules = [...panel.querySelectorAll<HTMLElement>('.j-rule')];
  const combos = [...panel.querySelectorAll<HTMLElement>('.j-combo')];
  let more = panel.querySelector<HTMLElement>('.j-detail-more');
  for (const row of [...rules, ...combos]) row.hidden = false;
  if (more) more.hidden = true;
  panel.classList.remove('j-detail-compact');
  const measure = () => panel.getBoundingClientRect().height;
  if (measure() <= availableHeight) return measure();
  panel.classList.add('j-detail-compact');
  const hidden = [...rules.slice(2), ...combos.slice(2)];
  hidden.forEach(row => { row.hidden = true; });
  const showSummary = () => {
    if (!more) {
      more = panel.ownerDocument.createElement('div'); more.className = 'j-row j-detail-more';
      more.textContent = '+0 more, see Journal'; panel.append(more);
    }
    more.hidden = false;
  };
  if (hidden.length) showSummary();
  // Unusually tall stacks can leave less room: remove additional whole bonus rows,
  // never crop a sentence or introduce a detail scrollbar.
  for (const row of [...combos.slice(0, 2), ...rules.slice(0, 2)].reverse()) {
    if (measure() <= availableHeight) break;
    row.hidden = true; hidden.push(row); showSummary();
  }
  // One final text mutation prevents observer loops when additional rows are hidden.
  if (more && hidden.length) {
    const text = `+${hidden.length} more, see Journal`;
    if (more.textContent !== text) more.textContent = text;
  }
  return measure();
}

/** Live layout follows content, stack and viewport bounds, including font loading. */
export function installJournalLayout(host: HTMLElement, stack: HTMLElement): () => void {
  const tutorial = host.ownerDocument.getElementById('tutorial');
  const detail = host.querySelector<HTMLElement>('.j-detail'), deck = host.querySelector<HTMLElement>('.j-deck');
  const hadTutorialClass = tutorial?.classList.contains('journal-tutorial'); tutorial?.classList.add('journal-tutorial');
  const rect = (selector: string, value: PanelRect) => {
    const node = host.querySelector<HTMLElement>(selector); if (!node) return;
    Object.assign(node.style, { position: 'fixed', left: `${value.x}px`, top: `${value.y}px`, right: 'auto', bottom: 'auto', width: `${value.width}px`, height: `${value.height}px` });
    if (['.j-detail', '.j-deck', '.j-triangle'].includes(selector)) { node.style.top = 'auto'; node.style.bottom = '16px'; }
    if (selector === '.j-detail' || selector === '.j-deck') node.style.height = 'auto';
    if (selector === '.j-triangle' || selector === '.j-topright') { node.style.left = 'auto'; node.style.right = '16px'; }
    if (selector === '.j-deck') { node.style.width = 'fit-content'; node.style.maxWidth = `${value.width}px`; }
    if (selector === '.j-top') node.style.left = 'calc(50vw - 148px)';
  };
  let observedNote: HTMLElement | null = null, firstNoteInBoard = false;
  function update(): void {
    const w = window.innerWidth, h = window.innerHeight;
    const note = tutorial?.querySelector<HTMLElement>('.assistant-panel');
    if (note !== observedNote) { if (observedNote) resize.unobserve(observedNote); observedNote = note ?? null; if (note) resize.observe(note); }
    const expanded = note?.dataset.collapsed === 'false', first = note?.dataset.line === 'biomes';
    const stackHeight = stack.getBoundingClientRect().height || 220;
    const noteHeight = note?.getBoundingClientRect().height || (expanded ? first ? 200 : 320 : 56);
    if (detail) { detail.style.width = `${detailWidth(w)}px`; detail.style.height = 'auto'; }
    // Read natural detail height before deciding whether the first tutorial needs the board column.
    const naturalDetailHeight = detail ? compactDetail(detail, Infinity) || 176 : 176;
    if (!expanded || !first || note?.hidden) firstNoteInBoard = false;
    else if (16 + stackHeight + 12 + noteHeight > h - 16 - naturalDetailHeight - 12) firstNoteInBoard = true;
    const noteInBoard = Boolean((expanded && !first) || firstNoteInBoard);
    const leftBottom = 16 + stackHeight + (note && !note.hidden && !noteInBoard ? 12 + noteHeight : 0);
    const detailHeight = detail ? compactDetail(detail, h - 16 - leftBottom - 12) || 176 : 176;
    const metrics = deckMetrics(w);
    deck?.style.setProperty('--j-card-width', `${metrics.card}px`);
    deck?.style.setProperty('--j-card-gap', `${metrics.gap}px`);
    const cardCount = deck?.querySelectorAll('.j-card').length ?? 0;
    const contentWidth = cardCount ? deckContentWidth(w, cardCount) : 248;
    const layout = journalLayout(w, h, stackHeight, noteInBoard, noteHeight, {
      detailHeight, deckContentWidth: contentWidth, deckHeight: deck?.getBoundingClientRect().height || 136,
    });
    rect('.j-top', layout.pills); rect('.j-topright', layout.menu);
    rect('.j-detail', layout.detail); rect('.j-deck', layout.deck); rect('.j-triangle', layout.triangle);
    if (tutorial) {
      tutorial.style.setProperty('--tutorial-top', `${layout.tutorial.y}px`);
      tutorial.style.setProperty('--tutorial-left', `${layout.tutorial.x}px`);
      tutorial.style.setProperty('--tutorial-width', `${layout.tutorial.width}px`);
      tutorial.style.setProperty('--tutorial-max-height', 'none'); tutorial.style.setProperty('--tutorial-overflow', 'visible');
    }
  }
  const resize = new ResizeObserver(update); resize.observe(host); resize.observe(stack);
  if (detail) resize.observe(detail); if (deck) resize.observe(deck);
  const mutations = new MutationObserver(update);
  if (tutorial) mutations.observe(tutorial, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-collapsed', 'data-line', 'hidden'] });
  // Renderers replace rows/cards; do not observe the hidden/style attributes changed by layout itself.
  if (detail) mutations.observe(detail, { childList: true, subtree: true });
  if (deck) mutations.observe(deck, { childList: true, subtree: true });
  window.addEventListener('resize', update); update();
  return () => { if (!hadTutorialClass) tutorial?.classList.remove('journal-tutorial'); resize.disconnect(); mutations.disconnect(); window.removeEventListener('resize', update);
    for (const key of ['top', 'left', 'width', 'max-height', 'overflow']) tutorial?.style.removeProperty(`--tutorial-${key}`); };
}
