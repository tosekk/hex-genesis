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

/** Connected clusters and bounded outward hill patches establish §6 before natural terrain. */
export function generateRelief(rng: Rng, map: MapConfig): Relief {
  const noise = valueNoise(rng, map);
  const top = map.levels - 1;
  const elevations = noise.map(value => Math.floor(value * Math.max(0, top) / 256));
  const terrain: Terrain[] = noise.map(() => 'plain');
  const peaks: number[] = [];
  const between = (min: number, max: number) => min + rng.nextInt(max - min + 1);
  // Keep patch density across board sizes without changing the default seed stream.
  const clusterCount = between(
    Math.ceil(map.params.mountainClustersMin * noise.length / map.params.mountainReferenceArea),
    Math.ceil(map.params.mountainClustersMax * noise.length / map.params.mountainReferenceArea),
  );
  // Clamp the optional inset for small fixture boards; construct once, never retry.
  const insetX = Math.min(map.params.mountainInset, Math.floor((map.cols - 1) / 2));
  const insetY = Math.min(map.params.mountainInset, Math.floor((map.rows - 1) / 2));
  const adjacency = noise.map((_, id) => neighbors(id, map.cols, map.rows));
  for (let cluster = 0; cluster < clusterCount && top > 0; cluster++) {
    let best = -1;
    for (let id = 0; id < noise.length; id++) {
      const col = id % map.cols, row = Math.floor(id / map.cols);
      if (col < insetX || col >= map.cols - insetX || row < insetY || row >= map.rows - insetY) continue;
      if (peaks.some(peak => hexDistance(peak, id, map.cols) < map.params.mountainSeparation)) continue;
      if (best === -1 || noise[id] > noise[best]) best = id;
    }
    if (best === -1) break;
    const peak = best;
    const size = between(map.params.mountainSizeMin, map.params.mountainSizeMax);
    const members = noise.map(() => false);
    // Compact but asymmetric patches: distance before seeded shape score, then HexId.
    const shape = noise.map(() => rng.nextInt(256));
    for (let tile = 0; tile < size; tile++) {
      best = -1;
      for (let id = 0; id < noise.length; id++) {
        if (terrain[id] === 'mountain') continue;
        if (hexDistance(peak, id, map.cols) > map.params.mountainRadius) continue;
        if (tile === 0 ? id !== peak : !adjacency[id].some(n => members[n])) continue;
        if (adjacency[id].some(n => terrain[n] === 'mountain' && !members[n])) continue;
        const score = (candidate: number) => hexDistance(peak, candidate, map.cols) * 256 - shape[candidate];
        if (best === -1 || score(id) < score(best)) best = id;
      }
      if (best === -1) break;
      members[best] = true;
      terrain[best] = 'mountain';
      elevations[best] = top;
    }
    peaks.push(peak);
    peaks.sort((a, b) => a - b);
  }
  const distance: number[] = terrain.map(t => t === 'mountain' ? 0 : -1);
  const hillTarget = Math.floor(noise.length * between(map.params.hillShareMin, map.params.hillShareMax) / 1000);
  const shape = noise.map(() => rng.nextInt(256));
  // Grow from existing mountain/hill tiles: every added hill has a hill-only path ≤3.
  for (let tile = 0; tile < hillTarget && top > 1; tile++) {
    let best = -1, bestDepth = 4;
    for (let id = 0; id < noise.length; id++) {
      if (distance[id] !== -1) continue;
      if (adjacency[id].every(n => terrain[n] === 'mountain')) continue;
      const depth = Math.min(...adjacency[id].filter(n => distance[n] >= 0).map(n => distance[n] + 1), 4);
      if (depth > Math.min(3, top - 1)) continue;
      if (best === -1 || depth < bestDepth || (depth === bestDepth && shape[id] > shape[best])) {
        best = id; bestDepth = depth;
      }
    }
    if (best === -1) break;
    distance[best] = bestDepth;
    terrain[best] = 'hill';
  }
  // The edge of each irregular patch is level 1. Raise only fully supported interiors.
  // Level 3 is reserved for mountain-adjacent tiles, ending any three-hill ascent there.
  for (let id = 0; id < noise.length; id++) {
    if (terrain[id] === 'hill') elevations[id] = 1;
    else if (terrain[id] === 'plain' && adjacency[id].some(n => terrain[n] === 'hill')) elevations[id] = 0;
  }
  for (let level = 2; level < top; level++) {
    const supported = elevations.map((_, id) => terrain[id] === 'hill'
      && (level < 3 || adjacency[id].some(n => terrain[n] === 'mountain'))
      && adjacency[id].every(n => terrain[n] === 'mountain' || elevations[n] >= level - 1));
    // Retain an equal-height neighbor for any terrace pocket that cannot rise itself.
    for (let id = 0; id < noise.length; id++) {
      if (terrain[id] !== 'hill' || supported[id] || elevations[id] !== level - 1) continue;
      if (adjacency[id].every(n => terrain[n] === 'mountain' || supported[n])) {
        const support = adjacency[id].find(n => terrain[n] === 'hill');
        if (support !== undefined) supported[support] = false;
      }
    }
    for (let id = 0; id < noise.length; id++) if (supported[id]) elevations[id] = level;
  }
  return { elevations, terrain };
}
