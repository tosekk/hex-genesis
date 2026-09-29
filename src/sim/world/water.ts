import { neighbors } from '../../core/hex';
import type { Rng } from '../../core/rng';
import type { MapConfig } from '../../core/types';
import type { Relief } from './relief';

/** Distance across equal-height tiles to a strictly lower outlet (not to an edge).
 * A flat enclosed basin has no outlet. Multi-source BFS is independent of the source,
 * so merging rivers share a route and never cycle on plateaus. */
function plateauDistances(elevations: readonly number[], map: MapConfig): number[] {
  const distance = elevations.map(() => -1);
  let frontier: number[] = [];
  for (let id = 0; id < elevations.length; id++) {
    if (neighbors(id, map.cols, map.rows).some(n => elevations[n] < elevations[id])) {
      distance[id] = 0;
      frontier.push(id);
    }
  }
  for (let depth = 1; depth <= map.params.riverPlateauSteps && frontier.length; depth++) {
    const next: number[] = [];
    for (const id of frontier) for (const n of neighbors(id, map.cols, map.rows)) {
      if (distance[n] !== -1 || elevations[n] !== elevations[id]) continue;
      distance[n] = depth;
      next.push(n);
    }
    frontier = next.sort((a, b) => a - b);
  }
  return distance;
}

/** §6: descend to the lowest neighbor; on flats, approach a lower outlet. Ties use HexId. */
export function downhillWalk(elevations: readonly number[], start: number, map: MapConfig): number[] {
  return walk(elevations, plateauDistances(elevations, map), start, map);
}

function walk(elevations: readonly number[], drainage: readonly number[], start: number, map: MapConfig): number[] {
  const route = [start];
  let current = start;
  while (true) {
    const col = current % map.cols, row = Math.floor(current / map.cols);
    if (col === 0 || col === map.cols - 1 || row === 0 || row === map.rows - 1) break;
    let next = -1;
    for (const id of neighbors(current, map.cols, map.rows)) {
      if (next === -1 || elevations[id] < elevations[next]) next = id;
    }
    if (next === -1 || elevations[next] > elevations[current]) break;
    if (elevations[next] === elevations[current]) {
      // Among equal-height neighbors, follow the shortest lower-outlet route, then HexId.
      next = neighbors(current, map.cols, map.rows).find(id => elevations[id] === elevations[current]
        && drainage[current] > 0 && drainage[id] === drainage[current] - 1) ?? -1;
      if (next === -1) break;
    }
    route.push(next);
    current = next;
  }
  return route;
}

/** Place rivers first, then a configured fraction of local minima as basins. */
export function carveWater(relief: Relief, rng: Rng, map: MapConfig): void {
  const { terrain, elevations } = relief;
  const drainage = plateauDistances(elevations, map);
  for (let id = 0; id < terrain.length; id++) {
    if (terrain[id] !== 'plain' || elevations[id] < map.params.riverSourceMinElevation) continue;
    if (rng.nextInt(1000) >= map.params.riverSourceChance) continue;
    for (const tile of walk(elevations, drainage, id, map)) terrain[tile] = 'riverbed';
  }
  for (let id = 0; id < terrain.length; id++) {
    if (terrain[id] !== 'plain' && terrain[id] !== 'riverbed') continue;
    if (neighbors(id, map.cols, map.rows).some(n => elevations[n] < elevations[id])) continue;
    if (rng.nextInt(1000) < map.params.basinChance) terrain[id] = 'basin';
  }
}
