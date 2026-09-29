import type { MapConfig } from '../core/types';

export const MAP: MapConfig = {
  cols: 20,
  rows: 14,
  levels: 5,
  params: {
    // PLACEHOLDER generation knobs (GAME_DESIGN §53); no map rejection/retry rules.
    noiseSpacing: 5,
    mountainClustersMin: 1,
    mountainClustersMax: 4,
    mountainSizeMin: 3,
    mountainSizeMax: 10,
    mountainRadius: 2,
    mountainInset: 3,
    mountainSeparation: 7,
    // PLACEHOLDER hill share in parts per thousand; construction budget, never a rejection rule.
    hillShareMin: 150,
    hillShareMax: 250,
    // PLACEHOLDER maximum flat steps to a lower outlet; enclosed plateaus still stop rivers.
    riverPlateauSteps: 8,
    // PLACEHOLDER chances are integer parts per thousand.
    riverSourceMinElevation: 1,
    riverSourceChance: 70,
    basinChance: 50,
    woodsChance: 70,
    woodsMidBonus: 60,
    marshChance: 20,
    marshLowBonus: 30,
    marshWaterBonus: 100,
  },
};
