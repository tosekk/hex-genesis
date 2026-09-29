// OWNER: deepseek — stub from O1, replace freely
import { createRng } from '../../core/rng';
import { createHex } from '../../core/state';
import type { Hex, MapConfig } from '../../core/types';

/** O1 stub: deterministic trivial map (all plain, elevation 0, placeable). */
export function generateMap(seed: number, map: MapConfig): Hex[] {
  const rng = createRng(seed);
  const hexes: Hex[] = [];
  for (let row = 0; row < map.rows; row++) {
    for (let col = 0; col < map.cols; col++) {
      hexes.push(createHex(row * map.cols + col, col, row, 0, 'plain', rng.nextU32()));
    }
  }
  return hexes;
}
