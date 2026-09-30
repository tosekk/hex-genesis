import { describe, expect, it } from 'vitest';
import { TRIANGLE_LABELS, TRIANGLE_POS } from './triangle';
import { overlaps } from './layout';

describe('biome triangle geometry', () => {
  it('keeps main/mixed circles and external labels inside the reservation and separate', () => {
    const circles = Object.entries(TRIANGLE_POS).map(([id, [x, y]]) => {
      const radius = ['forest', 'desert', 'arctic'].includes(id) ? 24 : 18;
      return { x: x - radius, y: y - radius, width: radius * 2, height: radius * 2 };
    });
    const labels = Object.values(TRIANGLE_LABELS).map(p => ({ ...p, height: 16 }));
    for (const box of [...circles, ...labels]) {
      expect(box.x).toBeGreaterThanOrEqual(0); expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(232); expect(box.y + box.height).toBeLessThanOrEqual(224);
    }
    for (const label of labels) for (const circle of circles) expect(overlaps(label, circle)).toBe(false);
    for (let i = 0; i < circles.length; i++) for (let j = i + 1; j < circles.length; j++) expect(overlaps(circles[i], circles[j])).toBe(false);
  });
});
