import { describe, expect, it } from 'vitest';
import { colRowOf, hexDistance, hexIdOf, neighbors, pairKey } from './hex';

const C = 20, R = 14;
const id = (c: number, r: number) => hexIdOf(c, r, C);

describe('hex', () => {
  it('hexIdOf / colRowOf round-trip', () => {
    for (let i = 0; i < C * R; i++) {
      const { col, row } = colRowOf(i, C);
      expect(hexIdOf(col, row, C)).toBe(i);
    }
    expect(id(3, 2)).toBe(43);
  });

  it('corner neighbours', () => {
    // (0,0) even row: right (1,0), below (0,1). (-1,1) is out of bounds.
    expect(neighbors(id(0, 0), C, R)).toEqual([id(1, 0), id(0, 1)]);
    // (19,13) odd row (last row): left (18,13), above (19,12). (20,12) out.
    expect(neighbors(id(19, 13), C, R)).toEqual([id(19, 12), id(18, 13)]);
  });

  it('interior neighbours on even and odd rows', () => {
    // even row 2, col 5: (6,2) (5,1) (4,1) (4,2) (4,3) (5,3)
    expect(neighbors(id(5, 2), C, R)).toEqual(
      [id(4, 1), id(5, 1), id(4, 2), id(6, 2), id(4, 3), id(5, 3)]);
    // odd row 3, col 5: (6,3) (6,2) (5,2) (4,3) (5,4) (6,4)
    expect(neighbors(id(5, 3), C, R)).toEqual(
      [id(5, 2), id(6, 2), id(4, 3), id(6, 3), id(5, 4), id(6, 4)]);
  });

  it('edge neighbours', () => {
    // left edge, odd row 1: (1,1) (1,0) (0,0) (0,2) (1,2)
    expect(neighbors(id(0, 1), C, R)).toEqual([id(0, 0), id(1, 0), id(1, 1), id(0, 2), id(1, 2)]);
    // right edge, even row 2: (19,1) (18,1) (18,2) (18,3) (19,3)
    expect(neighbors(id(19, 2), C, R)).toEqual([id(18, 1), id(19, 1), id(18, 2), id(18, 3), id(19, 3)]);
  });

  it('every neighbour is at distance 1, and neighbours are symmetric', () => {
    for (let i = 0; i < C * R; i++) {
      for (const n of neighbors(i, C, R)) {
        expect(hexDistance(i, n, C)).toBe(1);
        expect(neighbors(n, C, R)).toContain(i);
      }
    }
  });

  it('hexDistance: known pairs and symmetry', () => {
    expect(hexDistance(id(0, 0), id(0, 0), C)).toBe(0);
    expect(hexDistance(id(0, 0), id(5, 0), C)).toBe(5);
    expect(hexDistance(id(0, 0), id(0, 2), C)).toBe(2);
    expect(hexDistance(id(0, 0), id(1, 2), C)).toBe(2);
    expect(hexDistance(id(0, 0), id(2, 2), C)).toBe(3);
    expect(hexDistance(id(0, 0), id(0, 6), C)).toBe(6);
    expect(hexDistance(id(0, 1), id(3, 4), C)).toBe(4);
    for (const [a, b] of [[0, 279], [37, 190], [5, 64], [100, 101]]) {
      expect(hexDistance(a, b, C)).toBe(hexDistance(b, a, C));
    }
  });

  it('pairKey is unordered', () => {
    expect(pairKey(3, 17)).toBe(pairKey(17, 3));
    expect(pairKey(3, 17)).toBe('3:17');
  });
});
