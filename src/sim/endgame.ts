// OWNER: sonnet (reassigned from deepseek) — D3
import { SLOT_PAIRS } from '../core/types';
import type { BuildingId, GameState, HexId, Resources, SlotIndex } from '../core/types';
import { demolishRefund, placeBuilding, rosterFor } from './economy';
import { legalCoreSites } from './spread/spread';

const SLOTS: readonly SlotIndex[] = [0, 1, 2];
/** Above this many simulated candidates we stop and answer "not provably dead". */
const MAX_SIMULATIONS = 64;

function covers(have: Resources, need: Resources): boolean {
  for (const r of Object.keys(need)) if ((have[r] ?? 0) < need[r]) return false;
  return true;
}

function plus(a: Resources, b: Resources): Resources {
  const out: Resources = { ...a };
  for (const r of Object.keys(b)) out[r] = (out[r] ?? 0) + b[r];
  return out;
}

function nonZero(r: Resources): boolean {
  for (const k of Object.keys(r)) if (r[k] > 0) return true;
  return false;
}

/** §41 (changed 2026-09-30): the run is won the moment the FINAL threshold is consumed. Spreads, held cores, offers, empty slots and legal sites never block it. */
export function checkWin(state: Readonly<GameState>): boolean {
  return state.thresholdIndex >= state.config.thresholds.length;
}

/**
 * §42–§44: true ONLY if the run is provably dead (typically: out of room, final threshold unmet). No multi-step demolition solver;
 * whenever a single known action might still produce resources, or we are unsure, → false.
 */
export function isProvablySoftLocked(state: Readonly<GameState>): boolean {
  if (state.status !== 'playing') return false;
  if (state.activeSpread || state.pendingOffer) return false;
  if (state.coreStack.length > 0 && legalCoreSites(state).length > 0) return false;
  const target = state.config.thresholds[state.thresholdIndex];
  if (target && covers(state.lifetime, target)) return false; // the session will award a core
  if (checkWin(state)) return false;

  const cfg = state.config;
  // Most optimistic wallet for an unpaid slot: resources plus the refund of EVERY demolishable
  // building (§26). Over-counts on purpose: a multi-step demolition may free an unpaid slot (§43).
  let optimistic: Resources = state.resources;
  for (const h of state.hexes) {
    if (!h.placeable || h.biome === null) continue;
    for (const s of h.slots) {
      if (s.building !== null) optimistic = plus(optimistic, demolishRefund(state, s.building));
    }
  }

  let sims = 0;
  for (const h of state.hexes) {
    if (!h.placeable || h.biome === null || state.activeSpread) continue;
    const roster = rosterFor(state, h.id);
    for (const slot of SLOTS) {
      const cur = h.slots[slot];
      // Provably no payout from (re)building here, whatever the building (economy §23, §31, §34): base pays once per slot,
      // pairs/triple once per position, adjacency only on a hex's first completion. Skips the expensive simulation.
      if (cur.yieldPaid && h.everCompleted && h.triplePaid !== null
        && SLOT_PAIRS.every(([a, b2], k) => (a !== slot && b2 !== slot) || h.pairPaid[k] !== null)) continue;
      for (const b of roster) {
        const def = cfg.buildings[b];
        if (!def) return false; // unknown data: unsure
        if (cur.building === null) {
          if (!cur.yieldPaid) {
            // A base yield is still owed here. Assume it pays if demolishing anything could fund it.
            if (covers(optimistic, def.cost)) return false;
          } else if (covers(state.resources, def.cost)) {
            if (++sims > MAX_SIMULATIONS) return false;
            if (paysAfter(state, h.id, slot, b, false)) return false;
          }
        } else if (covers(plus(state.resources, demolishRefund(state, cur.building)), def.cost)) {
          if (++sims > MAX_SIMULATIONS) return false;
          if (paysAfter(state, h.id, slot, b, true)) return false;
        }
      }
    }
  }
  return true;
}

/** Simulates (demolish +) placement on a private copy; true if any payout is non-zero. Unexpected failure → true (unsure). */
function paysAfter(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, b: BuildingId, demolish: boolean): boolean {
  const sim = structuredClone(state) as GameState;
  if (demolish) {
    const old = sim.hexes[hexId].slots[slot].building!;
    sim.hexes[hexId].slots[slot].building = null;
    sim.resources = plus(sim.resources, demolishRefund(sim, old));
  }
  const r = placeBuilding(sim, hexId, slot, b);
  if (!r.ok) return false; // provably illegal
  return r.value.payouts.some((p) => nonZero(p.amount)) || r.value.firstCompletion;
}
