// Journal data helpers, UI_SPEC §8.1. The real implementation is astra's `src/sim/economy/journal.ts`
// (pure + tested). Until it lands, this local fake has the agreed signatures; `journalData` prefers astra's module when present.
import type {
  Biome, BuildingId, ComboId, GameConfig, GameState, HexId, PayoutEvent, Resources, Terrain,
} from '../../core/types';
import { currentComboMatches } from '../../sim/economy';

export type ComboPage =
  | { locked: true; index: number }
  | { locked: false; index: number; id: ComboId; name: string;
      buildings: { id: BuildingId; name: string }[]; totalCost: Resources; amount: Resources; biomes: Biome[] };
export interface AdjacencyLogEntry { hexId: HexId; neighborId: HexId; hexCombos: string[]; neighborCombos: string[]; amount: Resources; }
export interface TerrainRuleView { terrain: Terrain[]; buildings: { id: BuildingId; name: string }[] | 'any'; bonus: Resources; }
export interface ZoneEffectView { biome: Biome; building: { id: BuildingId; name: string } | 'any'; delta: Resources; }

export interface JournalData {
  comboPages(state: Readonly<GameState>): ComboPage[];
  adjacencyLogEntry(state: Readonly<GameState>, e: PayoutEvent): AdjacencyLogEntry | null;
  terrainRules(config: GameConfig): TerrainRuleView[];
  zoneEffects(config: GameConfig): ZoneEffectView[];
}

const named = (cfg: GameConfig, id: BuildingId) => ({ id, name: cfg.buildings[id]?.name ?? id });

const localData: JournalData = {
  comboPages(state) {
    const cfg = state.config;
    return cfg.combos.map((c, index): ComboPage => {
      if (!state.discoveredCombos.includes(c.id)) return { locked: true, index };
      const totalCost: Resources = {};
      for (const b of c.buildings) for (const [r, v] of Object.entries(cfg.buildings[b]?.cost ?? {})) totalCost[r] = (totalCost[r] ?? 0) + v;
      const biomes = (Object.keys(cfg.rosters) as Biome[]).filter((biome) => c.buildings.every((b) => cfg.rosters[biome].includes(b)));
      return { locked: false, index, id: c.id, name: c.name, buildings: c.buildings.map((b) => named(cfg, b)), totalCost, amount: { ...c.amount }, biomes };
    });
  },
  adjacencyLogEntry(state, e) {
    if (e.kind !== 'adjacency' || e.neighborId === undefined) return null;
    const names = (id: HexId) => [...new Set(currentComboMatches(state, id).map((m) => state.config.combos.find((c) => c.id === m.comboId)?.name ?? m.comboId))];
    return { hexId: e.hexId, neighborId: e.neighborId, hexCombos: names(e.hexId), neighborCombos: names(e.neighborId), amount: { ...e.amount } };
  },
  terrainRules: (cfg) => cfg.terrainBonuses.map((t) => ({
    terrain: [...t.adjacentTerrain],
    buildings: t.buildings === 'any' ? 'any' : t.buildings.map((b) => named(cfg, b)),
    bonus: { ...t.bonus },
  })),
  zoneEffects(cfg) {
    const out: ZoneEffectView[] = [];
    for (const [biome, mods] of Object.entries(cfg.zoneModifiers) as [Biome, NonNullable<GameConfig['zoneModifiers'][Biome]>][]) {
      for (const m of mods) {
        if (m.buildings === 'any') out.push({ biome, building: 'any', delta: { ...m.delta } });
        else for (const b of m.buildings) out.push({ biome, building: named(cfg, b), delta: { ...m.delta } });
      }
    }
    return out;
  },
};

const REAL = import.meta.glob<Partial<JournalData>>('../../sim/economy/journal.ts', { eager: true });

/** astra's helpers when that module exists (all four functions), otherwise the local fake. */
export function resolveJournalData(): JournalData {
  const real = Object.values(REAL)[0];
  if (real?.comboPages && real.adjacencyLogEntry && real.terrainRules && real.zoneEffects) return real as JournalData;
  return localData;
}
export { localData };
