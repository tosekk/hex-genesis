import { describe, expect, it } from 'vitest';
import { journalLayout, overlaps } from './layout';

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
    const expanded = journalLayout(w, h, 234, true);
    for (const key of ['stack', 'detail', 'deck', 'triangle', 'pills', 'menu'] as const)
      expect(overlaps(expanded.tutorial, expanded[key]), key).toBe(false);
  });
});
