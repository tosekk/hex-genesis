import { parentsOf } from '../core/biomes';
import { MAIN_BIOMES, MIXED_BIOMES } from '../core/types';
import type { Biome, BuildingDef, ComboDef, GameConfig, ZoneModifierDef } from '../core/types';

// PLACEHOLDER — not design decisions (GAME_DESIGN §53). Tune freely; do not treat as spec.
const buildings: Record<string, BuildingDef> = {};
const rosters = {} as Record<Biome, string[]>;
const combos: ComboDef[] = [];
const zoneModifiers: Partial<Record<Biome, ZoneModifierDef[]>> = {};
const labels: Record<Biome, string> = {
  forest: 'Forest', desert: 'Desert', arctic: 'Arctic',
  steppe: 'Steppe', taiga: 'Taiga', polarDesert: 'Polar Desert',
};

// PLACEHOLDER: each new slot is resource-positive in both resources, in every biome.
for (const biome of [...MAIN_BIOMES, ...MIXED_BIOMES]) {
  const main = MAIN_BIOMES.some(b => b === biome);
  const suffixes = main ? ['a', 'b', 'c', 'd', 'e'] : ['x', 'y', 'z'];
  const own = suffixes.map((suffix, index) => {
    const id = `${biome}_${suffix}`;
    buildings[id] = {
      id, name: `${labels[biome]} ${suffix.toUpperCase()} (placeholder)`,
      cost: { wood: 2 + index, stone: 2 },
      baseYield: { wood: 4 + index, stone: 4 },
    };
    return id;
  });
  if (main) rosters[biome] = own;
  else {
    const [a, b] = parentsOf(biome as typeof MIXED_BIOMES[number]);
    rosters[biome] = [...rosters[a].slice(0, 3), ...rosters[b].slice(0, 3), ...own];
  }
  const [a, b] = own;
  combos.push(
    { id: `${biome}_pair`, name: `${labels[biome]} Pair (placeholder)`, buildings: [a, b], amount: { wood: 2, stone: 2 } },
    { id: `${biome}_triple`, name: `${labels[biome]} Triple (placeholder)`, buildings: [a, b, a], amount: { wood: 3, stone: 3 } },
  );
  if (main) combos.push({
    id: `${biome}_double`, name: `${labels[biome]} Double (placeholder)`, buildings: [a, a], amount: { wood: 2, stone: 2 },
  });
  zoneModifiers[biome] = [
    { buildings: [a, b], delta: { wood: 1, stone: -1 } },
  ];
}

export const ECONOMY: Pick<GameConfig,
  'resources' | 'startingResources' | 'buildings' | 'rosters' | 'combos' | 'terrainBonuses' |
  'zoneModifiers' | 'adjacencyAmount' | 'thresholds' | 'demolishRefundRatio' | 'reshufflesPerRun'> = {
  resources: ['wood', 'stone'],
  startingResources: { wood: 12, stone: 12 }, // PLACEHOLDER
  buildings, rosters, combos, zoneModifiers,
  terrainBonuses: [ // PLACEHOLDER: add once per visible adjacent qualifying tile.
    { adjacentTerrain: ['mountain'], buildings: 'any', bonus: { stone: 1 } },
    { adjacentTerrain: ['riverbed', 'basin'], buildings: 'any', bonus: { wood: 1 } },
    { adjacentTerrain: ['woods'], buildings: 'any', bonus: { wood: 1 } },
    { adjacentTerrain: ['marsh'], buildings: 'any', bonus: { stone: 1 } },
  ],
  adjacencyAmount: { wood: 1, stone: 1 }, // PLACEHOLDER
  // PLACEHOLDER: 10 thresholds, gaps greater than a maximum placement transaction.
  thresholds: Array.from({ length: 10 }, (_, i) => ({ wood: (i + 1) * 80, stone: (i + 1) * 80 })),
  demolishRefundRatio: 0.5, // §26
  reshufflesPerRun: 1, // §9
};
