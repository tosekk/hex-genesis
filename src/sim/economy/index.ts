import { neighbors, pairKey } from '../../core/hex';
import { addRes, canAfford, subRes } from '../../core/resources';
import { err, ok } from '../../core/result';
import { SLOT_PAIRS } from '../../core/types';
import type {
  BuildingId, ComboMatch, DemolishOutcome, GameState, HexId, PairIndex, PayoutEvent,
  PlacementOutcome, PlacementPreview, Resources, Result, SlotIndex,
} from '../../core/types';
import { isHexLocked } from '../spread/spread';

export function rosterFor(state: Readonly<GameState>, hexId: HexId): BuildingId[] {
  const hex = state.hexes[hexId];
  return hex?.placeable && hex.biome !== null ? [...state.config.rosters[hex.biome]] : [];
}

export function canPlaceBuilding(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, building: BuildingId): Result<void> {
  if (state.status !== 'playing') return err('Run is not playing');
  const hex = state.hexes[hexId];
  if (!hex) return err('Hex does not exist');
  if (!hex.placeable || hex.biome === null) return err('Hex is not terraformed placeable land');
  if (isHexLocked(state, hexId)) return err('Hex is locked by an active spread');
  if (slot !== 0 && slot !== 1 && slot !== 2) return err('Invalid slot');
  if (hex.slots[slot].building !== null) return err('Slot is occupied');
  const def = state.config.buildings[building];
  if (!def || !rosterFor(state, hexId).includes(building)) return err('Building is not in the current biome roster');
  if (!canAfford(state.resources, def.cost)) return err('Insufficient resources');
  return ok(undefined);
}

/** Visible terrain only; modifiers never enter the combo/adjacency calculation. */
function baseYield(state: Readonly<GameState>, hexId: HexId, building: BuildingId) {
  const hex = state.hexes[hexId];
  const raw = { ...state.config.buildings[building].baseYield };
  let terrain: Resources = {}, zone: Resources = {};
  for (const id of neighbors(hexId, state.cols, state.rows)) {
    const neighbor = state.hexes[id];
    if (neighbor.terrain !== 'mountain' && neighbor.biome === null) continue;
    for (const bonus of state.config.terrainBonuses) {
      if (bonus.adjacentTerrain.includes(neighbor.terrain)
        && (bonus.buildings === 'any' || bonus.buildings.includes(building))) {
        terrain = addRes(terrain, bonus.bonus);
      }
    }
  }
  for (const modifier of hex.biome === null ? [] : state.config.zoneModifiers[hex.biome] ?? []) {
    if (modifier.buildings === 'any' || modifier.buildings.includes(building)) zone = addRes(zone, modifier.delta);
  }
  const amount = addRes(addRes(raw, terrain), zone);
  for (const key of Object.keys(amount)) amount[key] = Math.max(0, amount[key]);
  return { amount, breakdown: { raw, terrain, zone } };
}

function sameMultiset(a: (BuildingId | null)[], b: BuildingId[]): boolean {
  if (a.length !== b.length || a.some(id => id === null)) return false;
  const sorted = [...a].sort();
  return [...b].sort().every((id, i) => id === sorted[i]);
}

export function currentComboMatches(state: Readonly<GameState>, hexId: HexId): ComboMatch[] {
  const hex = state.hexes[hexId];
  if (!hex) return [];
  const matches: ComboMatch[] = [];
  SLOT_PAIRS.forEach(([a, b], pair) => {
    const combo = state.config.combos.find(c => sameMultiset([hex.slots[a].building, hex.slots[b].building], c.buildings));
    if (combo) matches.push({ comboId: combo.id, pair: pair as PairIndex });
  });
  const triple = state.config.combos.find(c => sameMultiset(hex.slots.map(s => s.building), c.buildings));
  if (triple) matches.push({ comboId: triple.id, triple: true });
  return matches;
}

/** PLACEHOLDER condition (§35, §53): a currently present neighbor combo qualifies. */
function adjacencyQualifies(state: Readonly<GameState>, hexId: HexId, neighborId: HexId): boolean {
  return neighbors(hexId, state.cols, state.rows).includes(neighborId)
    && currentComboMatches(state, neighborId).length > 0;
}

/** AGENT_TASKS §49 steps 1–13; the session evaluates thresholds afterwards. */
export function placeBuilding(state: GameState, hexId: HexId, slot: SlotIndex, building: BuildingId): Result<PlacementOutcome> {
  const valid = canPlaceBuilding(state, hexId, slot, building);
  if (!valid.ok) return valid;
  const hex = state.hexes[hexId];
  const payouts: PayoutEvent[] = [];
  const discovered: string[] = [];
  state.resources = subRes(state.resources, state.config.buildings[building].cost);
  hex.slots[slot].building = building;
  if (!hex.slots[slot].yieldPaid) {
    const { amount, breakdown } = baseYield(state, hexId, building);
    payouts.push({ kind: 'base', hexId, slot, amount, breakdown });
    hex.slots[slot].yieldPaid = true;
  }
  for (const match of currentComboMatches(state, hexId)) {
    if (!state.discoveredCombos.includes(match.comboId)) {
      state.discoveredCombos.push(match.comboId);
      discovered.push(match.comboId);
    }
    const combo = state.config.combos.find(c => c.id === match.comboId)!;
    if (match.pair !== undefined && hex.pairPaid[match.pair] === null) {
      hex.pairPaid[match.pair] = { comboId: combo.id, amount: { ...combo.amount } };
      payouts.push({ kind: 'pair', hexId, pair: match.pair, comboId: combo.id, amount: { ...combo.amount } });
    } else if (match.triple && hex.triplePaid === null) {
      hex.triplePaid = { comboId: combo.id, amount: { ...combo.amount } };
      payouts.push({ kind: 'triple', hexId, comboId: combo.id, amount: { ...combo.amount } });
    }
  }
  const firstCompletion = !hex.everCompleted && hex.slots.every(s => s.building !== null);
  if (firstCompletion) {
    hex.everCompleted = true;
    for (const neighborId of neighbors(hexId, state.cols, state.rows)) {
      const key = pairKey(hexId, neighborId);
      if (state.adjacencyPaid[key] !== undefined || !adjacencyQualifies(state, hexId, neighborId)) continue;
      state.adjacencyPaid[key] = { ...state.config.adjacencyAmount };
      payouts.push({ kind: 'adjacency', hexId, neighborId, amount: { ...state.config.adjacencyAmount } });
    }
  }
  for (const payout of payouts) {
    state.resources = addRes(state.resources, payout.amount);
    state.lifetime = addRes(state.lifetime, payout.amount);
  }
  return ok({ payouts, discovered, firstCompletion });
}

export function demolishBuilding(state: GameState, hexId: HexId, slot: SlotIndex): Result<DemolishOutcome> {
  if (state.status !== 'playing') return err('Run is not playing');
  const hex = state.hexes[hexId];
  if (!hex) return err('Hex does not exist');
  if (isHexLocked(state, hexId)) return err('Hex is locked by an active spread');
  if (slot !== 0 && slot !== 1 && slot !== 2) return err('Invalid slot');
  const building = hex.slots[slot].building;
  if (building === null) return err('Slot is empty');
  if (!state.config.buildings[building]) return err('Unknown building');
  const refund = demolishRefund(state, building);
  hex.slots[slot].building = null;
  state.resources = addRes(state.resources, refund);
  return ok({ building, refund });
}

export function previewPlacement(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, building: BuildingId): PlacementPreview {
  const def = state.config.buildings[building];
  const preview: PlacementPreview = {
    cost: { ...def?.cost }, affordable: !!def && canAfford(state.resources, def.cost),
    slotAlreadyPaid: state.hexes[hexId]?.slots[slot]?.yieldPaid ?? false,
    base: {}, baseBreakdown: { raw: {}, terrain: {}, zone: {} }, combos: [],
  };
  if (!def) return preview;
  // Quote the same transaction even when the real wallet cannot afford it.
  // The clone keeps hypothetical discoveries and payout histories private.
  const projected: GameState = structuredClone(state);
  projected.resources = addRes(projected.resources, def.cost);
  const result = placeBuilding(projected, hexId, slot, building);
  if (!result.ok) return preview;
  for (const payout of result.value.payouts) {
    if (payout.kind === 'base') {
      preview.base = payout.amount;
      preview.baseBreakdown = payout.breakdown!;
    } else if ((payout.kind === 'pair' || payout.kind === 'triple')
      && payout.comboId && state.discoveredCombos.includes(payout.comboId)) {
      preview.combos.push({
        match: payout.kind === 'pair'
          ? { comboId: payout.comboId, pair: payout.pair! }
          : { comboId: payout.comboId, triple: true },
        amount: payout.amount,
      });
    }
  }
  return preview;
}

export function demolishRefund(state: Readonly<GameState>, building: BuildingId): Resources {
  const refund: Resources = {};
  const cost = state.config.buildings[building]?.cost ?? {};
  for (const resource of Object.keys(cost)) refund[resource] = Math.ceil(cost[resource] * state.config.demolishRefundRatio);
  return refund;
}

export function advanceThreshold(state: GameState): boolean {
  const target = state.config.thresholds[state.thresholdIndex];
  if (!target || !canAfford(state.lifetime, target)) return false;
  state.thresholdIndex++;
  return true;
}
