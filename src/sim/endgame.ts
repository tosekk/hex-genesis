// OWNER: sonnet (reassigned from deepseek) — D3
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

/** §41: no legal core site, no spread running, every slot on every terraformed placeable hex occupied. Held cores and leftover dead land are ignored. */
export function checkWin(state: Readonly<GameState>): boolean {
  if (state.activeSpread !== null) return false;
  if (legalCoreSites(state).length > 0) return false;
  for (const h of state.hexes) {
    if (!h.placeable || h.biome === null) continue;
    for (const s of h.slots) if (s.building === null) return false;
  }
  return true;
}

/**
 * §43, §44: true ONLY if the run is provably dead. No multi-step demolition solver;
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
  // Wallets reachable by one demolition anywhere (refund counted, §26).
  const wallets: Resources[] = [state.resources];
  const seen = new Set<BuildingId>();
  for (const h of state.hexes) {
    if (!h.placeable || h.biome === null) continue;
    for (const s of h.slots) {
      if (s.building !== null && !seen.has(s.building)) {
        seen.add(s.building);
        wallets.push(plus(state.resources, demolishRefund(state, s.building)));
      }
    }
  }

  let sims = 0;
  for (const h of state.hexes) {
    if (!h.placeable || h.biome === null || state.activeSpread) continue;
    const roster = rosterFor(state, h.id);
    for (const slot of SLOTS) {
      const cur = h.slots[slot];
      for (const b of roster) {
        const def = cfg.buildings[b];
        if (!def) return false; // unknown data: unsure
        if (cur.building === null) {
          if (!cur.yieldPaid) {
            // A base yield is still owed here. Assume it pays if any single demolition (or nothing) funds it.
            if (wallets.some((w) => covers(w, def.cost))) return false;
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
