export interface PanelRect { x: number; y: number; width: number; height: number; }
/** Fixed panel reservations at the two desktop target sizes; the stack's actual height drives the note. */
export function journalLayout(width: number, height: number, stackHeight: number, expandedLaterNote = false, noteHeight = 56) {
  const margin = 16, gap = 12, leftWidth = 248, triangleWidth = 232;
  const detail: PanelRect = { x: margin, y: height - margin - 176, width: leftWidth, height: 176 };
  const triangle: PanelRect = { x: width - margin - triangleWidth, y: height - margin - 224, width: triangleWidth, height: 224 };
  const deck: PanelRect = { x: margin + leftWidth + gap, y: height - margin - 120,
    width: triangle.x - gap - (margin + leftWidth + gap), height: 120 };
  return { detail, deck, triangle,
    stack: { x: margin, y: margin, width: leftWidth, height: stackHeight },
    pills: { x: (width + leftWidth - 96) / 2 - 224, y: margin, width: 448, height: 60 },
    menu: { x: width - margin - 88, y: margin, width: 88, height: 40 },
    tutorial: expandedLaterNote
      ? { x: deck.x, y: 108, width: Math.min(340, deck.width), height: noteHeight === 56 ? 320 : noteHeight }
      : { x: margin, y: margin + stackHeight + gap, width: leftWidth, height: noteHeight },
  };
}

export function overlaps(a: PanelRect, b: PanelRect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

/** Live layout uses real stack/viewport bounds; no browser-specific zoom or guessed note offset. */
export function installJournalLayout(host: HTMLElement, stack: HTMLElement): () => void {
  const tutorial = host.ownerDocument.getElementById('tutorial');
  const rect = (selector: string, value: PanelRect) => {
    const node = host.querySelector<HTMLElement>(selector); if (!node) return;
    Object.assign(node.style, { position: 'fixed', left: `${value.x}px`, top: `${value.y}px`, right: 'auto', bottom: 'auto', width: `${value.width}px`, height: `${value.height}px` });
  };
  let observedNote: HTMLElement | null = null, firstNoteInBoard = false;
  function update(): void {
    const bounds = host.getBoundingClientRect(), w = bounds.width || window.innerWidth, h = bounds.height || window.innerHeight;
    const note = tutorial?.querySelector<HTMLElement>('.assistant-panel');
    if (note !== observedNote) { if (observedNote) resize.unobserve(observedNote); observedNote = note ?? null; if (note) resize.observe(note); }
    const expanded = note?.dataset.collapsed === 'false', first = note?.dataset.line === 'biomes';
    const stackHeight = stack.getBoundingClientRect().height || 220;
    const noteHeight = note?.getBoundingClientRect().height || (expanded ? first ? 200 : 320 : 56);
    if (!expanded || !first || note?.hidden) firstNoteInBoard = false;
    else if (16 + stackHeight + 12 + noteHeight > h - 16 - 176 - 12) firstNoteInBoard = true;
    const layout = journalLayout(w, h, stackHeight, (expanded && !first) || firstNoteInBoard, noteHeight);
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
  const mutations = new MutationObserver(update);
  if (tutorial) mutations.observe(tutorial, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-collapsed', 'data-line', 'hidden'] });
  window.addEventListener('resize', update); update();
  return () => { resize.disconnect(); mutations.disconnect(); window.removeEventListener('resize', update);
    for (const key of ['top', 'left', 'width', 'max-height', 'overflow']) tutorial?.style.removeProperty(`--tutorial-${key}`); };
}
