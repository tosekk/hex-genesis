import type { BoardPick } from '../core/contracts';
import type { GameState, HexId, SlotIndex } from '../core/types';
import { isCoreHex } from '../sim/economy';
import { pickSlot } from './layout';

/** Core centres are readable tiles, never building-slot pick targets (§10/§20). */
export function pickHexSlot(state: Readonly<GameState>, hexId: HexId, x: number, z: number): SlotIndex | null {
  return state.hexes[hexId]?.placeable && !isCoreHex(state, hexId) ? pickSlot(x, z) : null;
}
export function renderSlotPick(state: Readonly<GameState> | null, pick: BoardPick | null): { hexId: HexId; slot: SlotIndex } | null {
  return state && pick && pick.slot !== null && [0, 1, 2].includes(pick.slot) && state.hexes[pick.hexId]?.placeable && !isCoreHex(state, pick.hexId)
    ? { hexId: pick.hexId, slot: pick.slot } : null;
}
