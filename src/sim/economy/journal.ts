import { addRes } from '../../core/resources';
import type {
  Biome, BuildingId, ComboId, GameConfig, GameState, HexId, PayoutEvent, Resources, Terrain,
} from '../../core/types';
import { currentComboMatches } from './index';

export type ComboPage =
  | { locked: true; index: number }
  | { locked: false; index: number; id: ComboId; name: string;
      buildings: { id: BuildingId; name: string }[];
      totalCost: Resources;
      amount: Resources;
      biomes: Biome[] };

export interface AdjacencyLogEntry {
  hexId: HexId;
  neighborId: HexId;
  hexCombos: string[];
  neighborCombos: string[];
  amount: Resources;
}

export interface TerrainRuleView {
  terrain: Terrain[];
  buildings: { id: BuildingId; name: string }[] | 'any';
  bonus: Resources;
}

export interface ZoneEffectView {
  biome: Biome;
  building: { id: BuildingId; name: string } | 'any';
  delta: Resources;
}

function buildingView(config: GameConfig, id: BuildingId): { id: BuildingId; name: string } {
  return { id, name: config.buildings[id].name };
}

/** Config order, with undiscovered metadata withheld before constructing any recipe view. */
export function comboPages(state: Readonly<GameState>): ComboPage[] {
  const { config } = state;
  const discovered = new Set(state.discoveredCombos);
  return config.combos.map((combo, index): ComboPage => {
    if (!discovered.has(combo.id)) return { locked: true, index };
    return {
      locked: false, index, id: combo.id, name: combo.name,
      buildings: combo.buildings.map(id => buildingView(config, id)),
      totalCost: combo.buildings.reduce<Resources>((sum, id) => addRes(sum, config.buildings[id].cost), {}),
      amount: { ...combo.amount },
      biomes: (Object.keys(config.rosters) as Biome[])
        .filter(biome => combo.buildings.every(id => config.rosters[biome].includes(id))),
    };
  });
}

/** Call when the payout arrives: names reflect current matches, not historical paid records. */
export function adjacencyLogEntry(state: Readonly<GameState>, e: PayoutEvent): AdjacencyLogEntry | null {
  if (e.kind !== 'adjacency' || e.neighborId === undefined) return null;
  const names = (hexId: HexId) => currentComboMatches(state, hexId)
    .map(match => state.config.combos.find(combo => combo.id === match.comboId)!.name);
  return {
    hexId: e.hexId, neighborId: e.neighborId,
    hexCombos: names(e.hexId), neighborCombos: names(e.neighborId), amount: { ...e.amount },
  };
}

export function terrainRules(config: GameConfig): TerrainRuleView[] {
  return config.terrainBonuses.map(rule => ({
    terrain: [...rule.adjacentTerrain],
    buildings: rule.buildings === 'any' ? 'any' : rule.buildings.map(id => buildingView(config, id)),
    bonus: { ...rule.bonus },
  }));
}

export function zoneEffects(config: GameConfig): ZoneEffectView[] {
  const effects: ZoneEffectView[] = [];
  for (const biome of Object.keys(config.zoneModifiers) as Biome[]) {
    for (const rule of config.zoneModifiers[biome] ?? []) {
      if (rule.buildings === 'any') {
        effects.push({ biome, building: 'any', delta: { ...rule.delta } });
      } else {
        for (const id of rule.buildings) effects.push({ biome, building: buildingView(config, id), delta: { ...rule.delta } });
      }
    }
  }
  return effects;
}
