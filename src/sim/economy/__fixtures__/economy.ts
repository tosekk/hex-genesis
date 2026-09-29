import { makeTestState } from '../../../core/testing';
import type { GameConfig, GameState, SlotIndex } from '../../../core/types';
import { placeBuilding } from '../index';

export const FIXTURE: Partial<GameConfig> = {
  resources: ['wood', 'stone'], startingResources: { wood: 100, stone: 100 },
  buildings: {
    sawmill: { id: 'sawmill', name: 'Sawmill', cost: { wood: 3, stone: 1 }, baseYield: { wood: 5, stone: 2 } },
    farm: { id: 'farm', name: 'Farm', cost: { wood: 2 }, baseYield: { wood: 3, stone: 1 } },
    quarry: { id: 'quarry', name: 'Quarry', cost: { stone: 3 }, baseYield: { stone: 5 } },
  },
  rosters: {
    forest: ['sawmill', 'farm', 'quarry'], desert: ['farm'], arctic: ['quarry'],
    steppe: ['farm', 'quarry'], taiga: ['sawmill', 'quarry'], polarDesert: ['farm', 'quarry'],
  },
  combos: [
    { id: 'sf', name: 'Sawmill + farm', buildings: ['sawmill', 'farm'], amount: { wood: 7, stone: 2 } },
    { id: 'ss', name: 'Two sawmills', buildings: ['sawmill', 'sawmill'], amount: { wood: 4 } },
    { id: 'fq', name: 'Farm + quarry', buildings: ['farm', 'quarry'], amount: { stone: 6 } },
    { id: 'sfs', name: 'Two sawmills + farm', buildings: ['sawmill', 'farm', 'sawmill'], amount: { wood: 11, stone: 3 } },
    { id: 'qfq', name: 'Two quarries + farm', buildings: ['quarry', 'farm', 'quarry'], amount: { stone: 13 } },
  ],
  terrainBonuses: [], zoneModifiers: {}, adjacencyAmount: { wood: 2, stone: 1 },
  thresholds: [{ wood: 20, stone: 5 }, { wood: 60, stone: 20 }],
};

export function economyState(config: Partial<GameConfig> = {}, cols = 3, rows = 3): GameState {
  return makeTestState({ cols, rows, hex: () => ({ biome: 'forest' }), config: { ...FIXTURE, ...config } });
}

export function build(state: GameState, hex: number, slot: SlotIndex, building: string) {
  const result = placeBuilding(state, hex, slot, building);
  if (!result.ok) throw new Error(result.reason);
  return result.value;
}

export function fill(state: GameState, hex: number) {
  build(state, hex, 0, 'sawmill');
  build(state, hex, 1, 'farm');
  return build(state, hex, 2, 'sawmill');
}
