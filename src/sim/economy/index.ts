// OWNER: astra — stub from O1, replace freely
import type {
  BuildingId, ComboMatch, DemolishOutcome, GameState, HexId, PlacementOutcome, PlacementPreview,
  Resources, Result, SlotIndex,
} from '../../core/types';

const ni = (fn: string): never => { throw new Error(`NOT_IMPLEMENTED: ${fn} (owner: astra)`); };

/** [] if dead/unplaceable. */
export function rosterFor(state: Readonly<GameState>, hexId: HexId): BuildingId[] {
  void state; void hexId;
  return ni('rosterFor');
}

export function canPlaceBuilding(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, building: BuildingId): Result<void> {
  void state; void hexId; void slot; void building;
  return ni('canPlaceBuilding');
}

/** AGENT_TASKS §49 steps 1–13. Does NOT evaluate thresholds. */
export function placeBuilding(state: GameState, hexId: HexId, slot: SlotIndex, building: BuildingId): Result<PlacementOutcome> {
  void state; void hexId; void slot; void building;
  return ni('placeBuilding');
}

export function demolishBuilding(state: GameState, hexId: HexId, slot: SlotIndex): Result<DemolishOutcome> {
  void state; void hexId; void slot;
  return ni('demolishBuilding');
}

export function previewPlacement(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, building: BuildingId): PlacementPreview {
  void state; void hexId; void slot; void building;
  return ni('previewPlacement');
}

export function currentComboMatches(state: Readonly<GameState>, hexId: HexId): ComboMatch[] {
  void state; void hexId;
  return ni('currentComboMatches');
}

export function demolishRefund(state: Readonly<GameState>, building: BuildingId): Resources {
  void state; void building;
  return ni('demolishRefund');
}

/** If thresholds[thresholdIndex] is fully met: thresholdIndex++ and return true. At most one per call (§39). */
export function advanceThreshold(state: GameState): boolean {
  void state;
  return ni('advanceThreshold');
}
