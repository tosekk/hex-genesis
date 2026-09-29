// OWNER: astra — D1 reassigned by the designer.
import { MAP } from '../../config/map';
import { createRng } from '../../core/rng';
import { createHex } from '../../core/state';
import type { Hex, MapConfig } from '../../core/types';
import { generateRelief } from './relief';

export function generateMap(seed: number, map: MapConfig): Hex[] {
  const cfg: MapConfig = { ...map, params: { ...MAP.params, ...map.params } };
  const rng = createRng(seed);
  const { elevations, terrain } = generateRelief(rng, cfg);
  const hexes: Hex[] = [];
  for (let id = 0; id < map.cols * map.rows; id++) {
    hexes.push(createHex(id, id % map.cols, Math.floor(id / map.cols), elevations[id], terrain[id], rng.nextU32()));
  }
  return hexes;
}
