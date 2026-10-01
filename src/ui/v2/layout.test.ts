import { describe, expect, it } from 'vitest';
import { deckContentWidth, deckMetrics, detailWidth, journalLayout, overlaps } from './layout';

describe('journal desktop panel reservations', () => {
  for (const [w, h] of [[1280, 720], [1024, 640]]) it(`keeps fixed main-panel bounds separate at ${w}×${h}`, () => {
    const plan = journalLayout(w, h, 234);
    const rects = Object.entries(plan);
    for (const [name, rect] of rects) {
      expect(rect.x, name).toBeGreaterThanOrEqual(16); expect(rect.y, name).toBeGreaterThanOrEqual(16);
      expect(rect.x + rect.width, name).toBeLessThanOrEqual(w - 16);
      expect(rect.y + rect.height, name).toBeLessThanOrEqual(h - 16);
      for (const [other, b] of rects) if (name !== other) expect(overlaps(rect, b), `${name}/${other}`).toBe(false);
    }
    const first = journalLayout(w, h, 176, false, 200);
    for (const key of ['stack', 'detail', 'deck', 'triangle', 'pills', 'menu'] as const) expect(overlaps(first.tutorial, first[key]), `first/${key}`).toBe(false);
    const expanded = journalLayout(w, h, 234, true);
    for (const key of ['stack', 'detail', 'deck', 'triangle', 'pills', 'menu'] as const)
      expect(overlaps(expanded.tutorial, expanded[key]), key).toBe(false);
  });
});


describe('deck intrinsic width', () => {
  for (const width of [1024, 1280, 1920]) for (const count of [5, 9]) it(`${count} cards at ${width}px use exactly cards + gaps + padding`, () => {
    const { card, gap } = deckMetrics(width);
    const content = count * card + (count - 1) * gap + 28;
    expect(deckContentWidth(width, count)).toBe(content);
    const plan = journalLayout(width, 720, 234, false, 56, { deckContentWidth: content, detailHeight: 260 });
    const left = 28 + detailWidth(width), right = plan.triangle.x - 12;
    expect(plan.deck.width).toBe(Math.min(content, right - left));
    expect(plan.deck.x + plan.deck.width / 2).toBe((left + right) / 2);
    expect(overlaps(plan.deck, plan.detail)).toBe(false);
    if (width === 1920) expect(plan.deck.width).toBe(content); // Both 5 and 9 fit without a cap.
  });
  it('caps intrinsic width at nine cards', () => {
    expect(deckContentWidth(1920, 12)).toBe(deckContentWidth(1920, 9));
  });
});
