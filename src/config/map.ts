import type { MapConfig } from '../core/types';

export const MAP: MapConfig = {
  cols: 20,
  rows: 14,
  levels: 5,
  params: {
    // PLACEHOLDER generation knobs (GAME_DESIGN §53); no map rejection/retry rules.
    noiseSpacing: 5,
    mountainClusters: 2,
    mountainRadius: 1,
    mountainInset: 3,
    mountainSeparation: 8,
    // PLACEHOLDER chances are integer parts per thousand.
    riverSourceMinElevation: 1,
    riverSourceChance: 100,
    basinChance: 100,
  },
};
