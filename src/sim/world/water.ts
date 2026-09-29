import { neighbors } from '../../core/hex';
import type { Rng } from '../../core/rng';
import type { MapConfig } from '../../core/types';
import type { Relief } from './relief';

/** §6: the lowest neighboring tile wins; ascending HexId resolves ties. */
export function downhillWalk(elevations: readonly number[], start: number, map: MapConfig): number[] {
  const route = [start];
  let current = start;
  while (true) {
    const col = current % map.cols, row = Math.floor(current / map.cols);
    if (col === 0 || col === map.cols - 1 || row === 0 || row === map.rows - 1) break;
    let next = -1;
    for (const id of neighbors(current, map.cols, map.rows)) {
      if (next === -1 || elevations[id] < elevations[next]) next = id;
    }
    // A flat plateau is a local minimum (no strictly lower neighbor); do not loop along it.
    if (next === -1 || elevations[next] >= elevations[current]) break;
    route.push(next);
    current = next;
  }
  return route;
}

/** Place rivers first, then a configured fraction of local minima as basins. */
export function carveWater(relief: Relief, rng: Rng, map: MapConfig): void {
  const { terrain, elevations } = relief;
  for (let id = 0; id < terrain.length; id++) {
    if (terrain[id] !== 'plain' || elevations[id] < map.params.riverSourceMinElevation) continue;
    if (rng.nextInt(1000) >= map.params.riverSourceChance) continue;
    for (const tile of downhillWalk(elevations, id, map)) terrain[tile] = 'riverbed';
  }
  for (let id = 0; id < terrain.length; id++) {
    if (terrain[id] !== 'plain' && terrain[id] !== 'riverbed') continue;
    if (neighbors(id, map.cols, map.rows).some(n => elevations[n] < elevations[id])) continue;
    if (rng.nextInt(1000) < map.params.basinChance) terrain[id] = 'basin';
  }
}
