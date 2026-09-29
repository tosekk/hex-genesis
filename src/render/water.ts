import { hexToWorld, neighbors } from '../core/hex';
import { WATER_TERRAIN, type GameState, type HexId } from '../core/types';
import { HEX_SIZE } from './layout';

/** Fixed terrain connections, not a forecast of future spread/biome state. */
export function waterDirections(state: Readonly<GameState>, id: HexId): { x: number; z: number }[] {
  const hex = state.hexes[id];
  if (!hex || !WATER_TERRAIN.includes(hex.terrain)) return [];
  const p = hexToWorld(hex.col, hex.row, HEX_SIZE);
  return neighbors(id, state.cols, state.rows).filter(next => WATER_TERRAIN.includes(state.hexes[next].terrain)).map(next => {
    const h = state.hexes[next], n = hexToWorld(h.col, h.row, HEX_SIZE);
    const distance = Math.hypot(n.x - p.x, n.z - p.z);
    return { x: (n.x - p.x) / distance, z: (n.z - p.z) / distance };
  });
}
