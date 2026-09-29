import type { HexId } from './types';

// Pointy-top hexes, odd-r offset layout: odd rows are shifted right by half a hex.

export function hexIdOf(col: number, row: number, cols: number): HexId {
  return row * cols + col;
}

export function colRowOf(id: HexId, cols: number): { col: number; row: number } {
  const row = Math.floor(id / cols);
  return { col: id - row * cols, row };
}

export function inBounds(col: number, row: number, cols: number, rows: number): boolean {
  return col >= 0 && col < cols && row >= 0 && row < rows;
}

/** [dcol, drow] per parity (index 0 = even row, 1 = odd row). */
const NEIGHBOR_OFFSETS: readonly (readonly (readonly [number, number])[])[] = [
  [[1, 0], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1]],
  [[1, 0], [1, -1], [0, -1], [-1, 0], [0, 1], [1, 1]],
];

/** In-bounds neighbours, ascending HexId. */
export function neighbors(id: HexId, cols: number, rows: number): HexId[] {
  const { col, row } = colRowOf(id, cols);
  const out: HexId[] = [];
  for (const [dc, dr] of NEIGHBOR_OFFSETS[row & 1]) {
    const c = col + dc;
    const r = row + dr;
    if (inBounds(c, r, cols, rows)) out.push(hexIdOf(c, r, cols));
  }
  return out.sort((a, b) => a - b);
}

function toCube(id: HexId, cols: number): { x: number; y: number; z: number } {
  const { col, row } = colRowOf(id, cols);
  const x = col - (row - (row & 1)) / 2;
  const z = row;
  return { x, y: -x - z, z };
}

/** Flat grid distance in hex steps. Ignores elevation (§10). */
export function hexDistance(a: HexId, b: HexId, cols: number): number {
  const p = toCube(a, cols);
  const q = toCube(b, cols);
  return Math.max(Math.abs(p.x - q.x), Math.abs(p.y - q.y), Math.abs(p.z - q.z));
}

/** Unordered pair key (§34): pairKey(a, b) === pairKey(b, a). */
export function pairKey(a: HexId, b: HexId): string {
  return a < b ? `${a}:${b}` : `${b}:${a}`;
}

/** Render-only: centre of a pointy-top hex of circumradius `size` in world X/Z. */
export function hexToWorld(col: number, row: number, size: number): { x: number; z: number } {
  return { x: size * Math.sqrt(3) * (col + 0.5 * (row & 1)), z: size * 1.5 * row };
}
