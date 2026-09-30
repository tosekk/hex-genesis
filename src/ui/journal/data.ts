// Journal data comes from astra's pure, tested helpers (src/sim/economy/journal.ts, UI_SPEC §8.1).
// "Undiscovered stays hidden" is enforced THERE (comboPages), nowhere else; the book only renders what it is handed.
import * as economy from '../../sim/economy/journal';

export type { AdjacencyLogEntry, ComboPage, TerrainRuleView, ZoneEffectView } from '../../sim/economy/journal';

export interface JournalData {
  comboPages: typeof economy.comboPages;
  adjacencyLogEntry: typeof economy.adjacencyLogEntry;
  terrainRules: typeof economy.terrainRules;
  zoneEffects: typeof economy.zoneEffects;
}

/** The real helpers. `createJournal` accepts an override only for tests. */
export function resolveJournalData(): JournalData {
  return {
    comboPages: economy.comboPages,
    adjacencyLogEntry: economy.adjacencyLogEntry,
    terrainRules: economy.terrainRules,
    zoneEffects: economy.zoneEffects,
  };
}
