// Test-only helpers. Never import from game code.
import { DEFAULT_CONFIG } from '../config';
import { hexIdOf } from './hex';
import { createHex, stateFromHexes } from './state';
import type { GameConfig, GameState, Hex, Resources } from './types';

export function makeTestState(opts: {
  cols?: number; rows?: number;
  hex?: (col: number, row: number) => Partial<Pick<Hex, 'elevation' | 'terrain' | 'biome' | 'decoration'>>;
  config?: Partial<GameConfig>;
  resources?: Resources;
} = {}): GameState {
  const cols = opts.cols ?? DEFAULT_CONFIG.map.cols;
  const rows = opts.rows ?? DEFAULT_CONFIG.map.rows;
  const config: GameConfig = {
    ...DEFAULT_CONFIG,
    ...opts.config,
    map: { ...DEFAULT_CONFIG.map, ...opts.config?.map, cols, rows },
  };
  const hexes: Hex[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const o = opts.hex?.(col, row) ?? {};
      const terrain = o.terrain ?? 'plain';
      const elevation = o.elevation ?? (terrain === 'mountain' ? config.map.levels - 1 : 0);
      const h = createHex(hexIdOf(col, row, cols), col, row, elevation, terrain, o.decoration ?? 0);
      h.biome = o.biome ?? null;
      hexes.push(h);
    }
  }
  const state = stateFromHexes(0, config, cols, rows, hexes, 0);
  if (opts.resources) state.resources = { ...opts.resources };
  return state;
}
