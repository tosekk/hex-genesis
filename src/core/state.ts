import { createRng, deriveSeed } from './rng';
import { PLACEABLE_TERRAIN } from './types';
import type { GameConfig, GameState, Hex, HexId, Terrain } from './types';
import { generateMap } from '../sim/world/mapgen';

/** A fresh, dead, empty hex. `placeable` is derived from terrain (§7). Helper for mapgen and tests. */
export function createHex(
  id: HexId, col: number, row: number, elevation: number, terrain: Terrain, decoration: number,
): Hex {
  return {
    id, col, row, elevation, terrain,
    placeable: PLACEABLE_TERRAIN.includes(terrain),
    decoration: decoration >>> 0,
    biome: null,
    slots: [
      { building: null, yieldPaid: false },
      { building: null, yieldPaid: false },
      { building: null, yieldPaid: false },
    ],
    everCompleted: false,
    pairPaid: [null, null, null],
    triplePaid: null,
  };
}

/** Empty run state around an existing board. Shared by createInitialState and makeTestState. */
export function stateFromHexes(
  seed: number, config: GameConfig, cols: number, rows: number, hexes: Hex[], nowMs: number,
): GameState {
  return {
    config,
    seed: seed >>> 0,
    cols,
    rows,
    hexes,
    offerRng: createRng(deriveSeed(seed, 'offers')).getState(),
    resources: { ...config.startingResources },
    lifetime: {},
    thresholdIndex: 0,
    coreStack: [],
    pendingOffer: null,
    reshufflesUsed: 0,
    offerHistory: [],
    cores: [],
    activeSpread: null,
    adjacencyPaid: {},
    discoveredCombos: [],
    runStartMs: nowMs,
    runEndMs: null,
    status: 'playing',
  };
}

/** Does NOT award the first core; the session does that. */
export function createInitialState(seed: number, config: GameConfig, nowMs: number): GameState {
  const hexes = generateMap(deriveSeed(seed, 'terrain'), config.map);
  return stateFromHexes(seed, config, config.map.cols, config.map.rows, hexes, nowMs);
}
