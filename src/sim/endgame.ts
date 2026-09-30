// OWNER: sonnet (reassigned from deepseek) — D3; opus for the 2026-10-01 night shift (O13.1)
import { SLOT_PAIRS } from '../core/types';
import type { BuildingId, GameState, HexId, Resources, SlotIndex } from '../core/types';
import { demolishRefund, isCoreHex, placeBuilding, rosterFor } from './economy';
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
  // §10 (2026-10-01): a core's own hex never holds buildings and is never a slot. One definition for
  // every slot count: the economy's isCoreHex (the same one slotCounts and the HUDs use).
  const living = state.hexes.filter((h) => h.placeable && h.biome !== null && !isCoreHex(state, h.id));

  // Most optimistic wallet: resources plus the refund of EVERY demolishable building (§26). Over-counts
  // on purpose: any set of demolitions can fund one build, and a multi-step demolition may free a payout (§43).
  // Every check below uses it, so a payout that refunds could fund is never ruled out (§44).
  let optimistic: Resources = state.resources;
  for (const h of living) {
    for (const s of h.slots) {
      if (s.building !== null) optimistic = plus(optimistic, demolishRefund(state, s.building));
    }
  }

  // 1. An empty slot that has never paid its base yield (§23): assume it pays if the wallet could fund it.
  for (const h of living) {
    const roster = rosterFor(state, h.id);
    for (const s of h.slots) {
      if (s.building !== null || s.yieldPaid) continue;
      for (const b of roster) {
        const def = cfg.buildings[b];
        if (!def || covers(optimistic, def.cost)) return false; // unknown data: unsure
      }
    }
  }

  // 2. An unpaid combo position whose recipe this hex can build (§31). Rebuilding may take several
  // replacements, which the one-step simulation below can't see (astra's night-2 stuck audit). Cost lower
  // bound: only the recipe buildings not already standing on the hex.
  for (const h of living) {
    const roster = rosterFor(state, h.id);
    const pairOpen = h.pairPaid.some((r) => r === null);
    for (const combo of cfg.combos) {
      const open = combo.buildings.length === 2 ? pairOpen : combo.buildings.length === 3 && h.triplePaid === null;
      if (!open || !combo.buildings.every((b) => roster.includes(b))) continue;
      const standing = h.slots.map((s) => s.building);
      let cost: Resources = {};
      for (const b of combo.buildings) {
        const at = standing.indexOf(b);
        if (at >= 0) { standing[at] = null; continue; }
        const def = cfg.buildings[b];
        if (!def) return false; // unknown data: unsure
        cost = plus(cost, def.cost);
      }
      if (covers(optimistic, cost)) return false;
    }
  }

  // 3. One (demolish +) build per slot, simulated: first-completion adjacency (§34) and anything 1–2 missed.
  let sims = 0;
  for (const h of living) {
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
        if (!covers(optimistic, def.cost)) continue;
        if (++sims > MAX_SIMULATIONS) return false;
        if (paysAfter(state, h.id, slot, b, optimistic)) return false;
      }
    }
  }
  return true;
}

/**
 * Simulates (demolish +) placement on a private copy, holding `wallet` (so a refund-funded build is tried);
 * true if any payout is non-zero or the hex completes for the first time. A rejected placement → false (provably illegal).
 */
function paysAfter(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, b: BuildingId, wallet: Resources): boolean {
  const sim = structuredClone(state) as GameState;
  sim.hexes[hexId].slots[slot].building = null;
  sim.resources = { ...wallet };
  const r = placeBuilding(sim, hexId, slot, b);
  if (!r.ok) return false; // provably illegal
  return r.value.payouts.some((p) => nonZero(p.amount)) || r.value.firstCompletion;
}
