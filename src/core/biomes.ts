import type { Biome, MainBiome, MixedBiome } from './types';

export function isMainBiome(b: Biome | null): b is MainBiome {
  return b === 'forest' || b === 'desert' || b === 'arctic';
}

/** §8: Forest+Desert → Steppe, Forest+Arctic → Taiga, Desert+Arctic → Polar Desert. null if a === b. */
export function mixOf(a: MainBiome, b: MainBiome): MixedBiome | null {
  if (a === b) return null;
  const has = (x: MainBiome) => a === x || b === x;
  if (has('forest') && has('desert')) return 'steppe';
  if (has('forest') && has('arctic')) return 'taiga';
  return 'polarDesert';
}

export function parentsOf(m: MixedBiome): [MainBiome, MainBiome] {
  switch (m) {
    case 'steppe': return ['forest', 'desert'];
    case 'taiga': return ['forest', 'arctic'];
    case 'polarDesert': return ['desert', 'arctic'];
  }
}
