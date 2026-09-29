// OWNER: astra — stub from O1, replace freely
// Minimal runnable placeholder economy. EVERY value here is PLACEHOLDER (GAME_DESIGN §53).
import type { GameConfig } from '../core/types';

export const ECONOMY: Pick<GameConfig,
  'resources' | 'startingResources' | 'buildings' | 'rosters' | 'combos' | 'terrainBonuses' |
  'zoneModifiers' | 'adjacencyAmount' | 'thresholds' | 'demolishRefundRatio' | 'reshufflesPerRun'> = {
  resources: ['wood', 'stone'], // Wood + Stone confirmed (§21); more are undecided
  startingResources: { wood: 10, stone: 10 }, // PLACEHOLDER
  buildings: {
    forestHut:  { id: 'forestHut',  name: 'Forest Hut (placeholder)',  cost: { wood: 2 },  baseYield: { wood: 3 } },  // PLACEHOLDER
    desertHut:  { id: 'desertHut',  name: 'Desert Hut (placeholder)',  cost: { stone: 2 }, baseYield: { stone: 3 } }, // PLACEHOLDER
    arcticHut:  { id: 'arcticHut',  name: 'Arctic Hut (placeholder)',  cost: { wood: 1, stone: 1 }, baseYield: { wood: 1, stone: 2 } }, // PLACEHOLDER
    steppeHut:  { id: 'steppeHut',  name: 'Steppe Hut (placeholder)',  cost: { wood: 2 },  baseYield: { wood: 2, stone: 1 } }, // PLACEHOLDER
    taigaHut:   { id: 'taigaHut',   name: 'Taiga Hut (placeholder)',   cost: { wood: 2 },  baseYield: { wood: 4 } },  // PLACEHOLDER
    polarHut:   { id: 'polarHut',   name: 'Polar Hut (placeholder)',   cost: { stone: 2 }, baseYield: { stone: 4 } }, // PLACEHOLDER
  },
  rosters: { // PLACEHOLDER
    forest: ['forestHut'],
    desert: ['desertHut'],
    arctic: ['arcticHut'],
    steppe: ['forestHut', 'desertHut', 'steppeHut'],
    taiga: ['forestHut', 'arcticHut', 'taigaHut'],
    polarDesert: ['desertHut', 'arcticHut', 'polarHut'],
  },
  combos: [ // PLACEHOLDER
    { id: 'hutPair', name: 'Hut Pair (placeholder)', buildings: ['forestHut', 'forestHut'], amount: { wood: 2 } },
  ],
  terrainBonuses: [],       // PLACEHOLDER
  zoneModifiers: {},        // PLACEHOLDER
  adjacencyAmount: { wood: 1 }, // PLACEHOLDER
  thresholds: [{ wood: 10 }], // PLACEHOLDER
  demolishRefundRatio: 0.5, // §26
  reshufflesPerRun: 1,      // §9
};
