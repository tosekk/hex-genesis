import { hexDistance, neighbors } from '../../core/hex';
import type { Rng } from '../../core/rng';
import type { MapConfig, Terrain } from '../../core/types';

export interface Relief { elevations: number[]; terrain: Terrain[]; }

/** Integer bilinear value noise, sampled in ascending tile order. */
function valueNoise(rng: Rng, map: MapConfig): number[] {
  const spacing = Math.max(1, Math.floor(map.params.noiseSpacing));
  const width = Math.ceil((map.cols - 1) / spacing) + 2;
  const height = Math.ceil((map.rows - 1) / spacing) + 2;
  const lattice = Array.from({ length: width * height }, () => rng.nextInt(256));
  const values: number[] = [];
  for (let id = 0; id < map.cols * map.rows; id++) {
    const col = id % map.cols, row = Math.floor(id / map.cols);
    const x = Math.floor(col / spacing), y = Math.floor(row / spacing);
    const dx = col % spacing, dy = row % spacing;
    const top = lattice[y * width + x] * (spacing - dx) + lattice[y * width + x + 1] * dx;
    const bottom = lattice[(y + 1) * width + x] * (spacing - dx) + lattice[(y + 1) * width + x + 1] * dx;
    values.push(Math.floor((top * (spacing - dy) + bottom * dy) / (spacing * spacing)));
  }
  return values;
}

/** Mountain clusters and their outward hill bands establish §6 before natural terrain. */
export function generateRelief(rng: Rng, map: MapConfig): Relief {
  const noise = valueNoise(rng, map);
  const top = map.levels - 1;
  const elevations = noise.map(value => Math.floor(value * Math.max(0, top - 1) / 256));
  const terrain: Terrain[] = noise.map(() => 'plain');
  const peaks: number[] = [];
  // Clamp the optional inset for small fixture boards; this constructs one map, never retries it.
  const insetX = Math.min(map.params.mountainInset, Math.floor((map.cols - 1) / 2));
  const insetY = Math.min(map.params.mountainInset, Math.floor((map.rows - 1) / 2));
  for (let cluster = 0; cluster < map.params.mountainClusters && top > 0; cluster++) {
    let best = -1;
    for (let id = 0; id < noise.length; id++) {
      const col = id % map.cols, row = Math.floor(id / map.cols);
      if (col < insetX || col >= map.cols - insetX || row < insetY || row >= map.rows - insetY) continue;
      if (peaks.some(peak => hexDistance(peak, id, map.cols) < map.params.mountainSeparation)) continue;
      if (best === -1 || noise[id] > noise[best]) best = id; // Ascending id breaks equal-noise ties.
    }
    if (best === -1) break;
    peaks.push(best);
    peaks.sort((a, b) => a - b);
  }
  const distance = noise.map(() => -1);
  for (let id = 0; id < noise.length; id++) {
    if (peaks.some(peak => hexDistance(peak, id, map.cols) <= map.params.mountainRadius)) {
      terrain[id] = 'mountain';
      elevations[id] = top;
      distance[id] = 0;
    }
  }
  // §6/D1 interpretation: hill-path distance to a mountain is at most three.
  const maxDepth = Math.min(3, Math.max(0, top - 1));
  for (let depth = 1; depth <= maxDepth; depth++) {
    for (let id = 0; id < noise.length; id++) {
      if (distance[id] !== -1) continue;
      if (neighbors(id, map.cols, map.rows).some(n => distance[n] === depth - 1)) {
        distance[id] = depth;
        terrain[id] = 'hill';
        elevations[id] = top - depth;
      }
    }
  }
  // Outside approaches sit one level below the outer hill band. Interior bands
  // already differ by at most one because distance changes by at most one per edge.
  for (let id = 0; id < noise.length; id++) {
    if (terrain[id] !== 'plain') continue;
    for (const n of neighbors(id, map.cols, map.rows)) {
      if (terrain[n] === 'hill') elevations[id] = Math.min(elevations[id], elevations[n] - 1);
    }
  }
  return { elevations, terrain };
}
