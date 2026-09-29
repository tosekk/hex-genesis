import { neighbors } from '../../core/hex';
import type { Rng } from '../../core/rng';
import type { MapConfig } from '../../core/types';
import type { Relief } from './relief';

/** §6/§7 natural terrain only replaces plains, preserving hills, mountains and water. */
export function plantNaturalTerrain(relief: Relief, rng: Rng, map: MapConfig): void {
  const { terrain, elevations } = relief;
  for (let id = 0; id < terrain.length; id++) {
    if (terrain[id] !== 'plain') continue;
    const low = elevations[id] <= 1;
    const nearWater = neighbors(id, map.cols, map.rows).some(n => terrain[n] === 'riverbed' || terrain[n] === 'basin');
    const marshChance = map.params.marshChance + (low ? map.params.marshLowBonus : 0)
      + (nearWater ? map.params.marshWaterBonus : 0);
    if (rng.nextInt(1000) < marshChance) {
      terrain[id] = 'marsh';
      continue;
    }
    const mid = elevations[id] > 0 && elevations[id] < map.levels - 2;
    const woodsChance = map.params.woodsChance + (mid ? map.params.woodsMidBonus : 0);
    if (rng.nextInt(1000) < woodsChance) terrain[id] = 'woods';
  }
}
