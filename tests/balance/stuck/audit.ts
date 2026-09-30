import { neighbors, pairKey } from '../../../src/core/hex';
import { addRes, canAfford, subRes } from '../../../src/core/resources';
import { SLOT_PAIRS } from '../../../src/core/types';
import type { BuildingId, GameState, HexId, PayoutEvent, Resources, SlotIndex } from '../../../src/core/types';
import { currentComboMatches, demolishBuilding, demolishRefund, isCoreHex, placeBuilding } from '../../../src/sim/economy';
import { isProvablySoftLocked } from '../../../src/sim/endgame';
import { legalCoreSites } from '../../../src/sim/spread/spread';

export type AuditAction = { kind: 'demolish'; hexId: HexId; slot: SlotIndex }
  | { kind: 'build'; hexId: HexId; slot: SlotIndex; building: BuildingId };
export interface Witness { kind: 'base' | 'combo' | 'adjacency'; actions: AuditAction[]; payouts: PayoutEvent[]; }
export interface StuckAudit {
  classification: 'recoverable' | 'proven-dead' | 'unknown' | 'progression' | 'won';
  detector: boolean; engineLost: boolean; falsePositive: boolean; falseNegative: boolean;
  reason: string; goals: number; witness?: Witness;
}
interface Want { hexId: HexId; slot: SlotIndex; building: BuildingId; rebuild?: boolean; }
const slots = [0, 1, 2] as const;
const positive = (r: Resources) => Object.values(r).some(v => v > 0);
const key = (hex: HexId, slot: SlotIndex) => `${hex}:${slot}`;
const permutations = <T>(items: T[]): T[][] => items.length === 0 ? [[]]
  : items.flatMap((item, i) => permutations(items.filter((_, j) => i !== j)).map(tail => [item, ...tail]));

/** Replay actual economy transactions; lost is counterfactually reopened solely to audit the declaration. */
export function replayWitness(state: Readonly<GameState>, witness: Witness): GameState {
  const sim = structuredClone(state) as GameState;
  sim.status = 'playing';
  let paid = false;
  for (const action of witness.actions) {
    if (paid) throw new Error('Witness contains actions after its first payout');
    if (action.kind === 'demolish') {
      const result = demolishBuilding(sim, action.hexId, action.slot);
      if (!result.ok) throw new Error(`Illegal witness demolition: ${result.reason}`);
    } else {
      const result = placeBuilding(sim, action.hexId, action.slot, action.building);
      if (!result.ok) throw new Error(`Illegal witness building: ${result.reason}`);
      paid = result.value.payouts.some(p => positive(p.amount));
      if (paid && JSON.stringify(result.value.payouts) !== JSON.stringify(witness.payouts)) throw new Error('Witness payout mismatch');
    }
  }
  if (!paid) throw new Error('Witness never yields');
  return sim;
}

/** First-positive-payout audit. A failed bounded search is NEVER reported as proof of death. */
export function auditState(input: Readonly<GameState>, maxGoals = 100_000): StuckAudit {
  const state = { ...input, status: 'playing' as const };
  const engineLost = input.status === 'lost';
  const detector = isProvablySoftLocked(state);
  let goals = 0;
  const result = (classification: StuckAudit['classification'], reason: string, witness?: Witness): StuckAudit => ({
    classification, detector, engineLost, goals, reason, ...(witness ? { witness } : {}),
    falsePositive: (detector || engineLost) && (classification === 'recoverable' || classification === 'progression'),
    falseNegative: !detector && !engineLost && classification === 'proven-dead',
  });
  if (state.thresholdIndex >= state.config.thresholds.length) return result('won', 'Final threshold consumed');
  if (state.pendingOffer || state.activeSpread || (state.coreStack.length && legalCoreSites(state).length)
    || canAfford(state.lifetime, state.config.thresholds[state.thresholdIndex])) return result('progression', 'Offer, spread, usable core or satisfied threshold exists');
  const land = state.hexes.filter(h => h.placeable && h.biome !== null && !isCoreHex(state, h.id));
  // The proof uses monotonicity before the first positive payout: construction/demolition
  // cycles cannot increase any resource. Guard that assumption even in artificial test configs.
  if (Object.values(state.config.buildings).some(b => Object.entries(demolishRefund(state, b.id))
    .some(([r, n]) => n > (b.cost[r] ?? 0) || n < 0))) return result('unknown', 'Refund arbitrage invalidates the upper bound');
  let liquidation = { ...state.resources };
  for (const h of land) for (const slot of h.slots) if (slot.building) liquidation = addRes(liquidation, demolishRefund(state, slot.building));
  let truncated = false;

  function plan(wants: Want[], kind: Witness['kind']): Witness | null {
    if (++goals > maxGoals) { truncated = true; return null; }
    const keep = new Set<string>();
    const builds: Want[] = [];
    let wallet = { ...liquidation };
    for (const want of wants) {
      const h = state.hexes[want.hexId], old = h.slots[want.slot].building;
      if (old === want.building && !want.rebuild) {
        keep.add(key(want.hexId, want.slot));
        wallet = subRes(wallet, demolishRefund(state, old));
      } else {
        if (!state.config.rosters[h.biome!].includes(want.building)) return null;
        builds.push(want);
      }
    }
    if (!builds.length) return null;
    const required = builds.reduce<Resources>((sum, b) => addRes(sum, state.config.buildings[b.building].cost), {});
    if (!canAfford(wallet, required)) return null;
    // Demolish only as much as needed, preserving every desired existing member.
    // Any order is fundable once the full non-preserved liquidation covers all costs.
    const sim = structuredClone(state) as GameState;
    const actions: AuditAction[] = [];
    const remove = (hexId: number, slot: SlotIndex) => {
      if (sim.hexes[hexId].slots[slot].building === null) return;
      const outcome = demolishBuilding(sim, hexId, slot);
      if (!outcome.ok) throw new Error(outcome.reason);
      actions.push({ kind: 'demolish', hexId, slot });
    };
    for (const b of builds) remove(b.hexId, b.slot);
    const protectedSlots = new Set(wants.map(w => key(w.hexId, w.slot)));
    const donors = land.flatMap(h => slots.filter(slot => h.slots[slot].building !== null && !protectedSlots.has(key(h.id, slot)))
      .map(slot => ({ hexId: h.id, slot })));
    let donor = 0;
    for (const b of builds) {
      const cost = sim.config.buildings[b.building].cost;
      while (!canAfford(sim.resources, cost) && donor < donors.length) { const d = donors[donor++]; remove(d.hexId, d.slot); }
      if (!canAfford(sim.resources, cost)) throw new Error('Liquidation bound and constructive plan disagree');
      const outcome = placeBuilding(sim, b.hexId, b.slot, b.building);
      if (!outcome.ok) throw new Error(outcome.reason);
      actions.push({ kind: 'build', hexId: b.hexId, slot: b.slot, building: b.building });
      if (outcome.value.payouts.some(p => positive(p.amount))) {
        const witness = { kind, actions, payouts: outcome.value.payouts };
        replayWitness(input, witness);
        return witness;
      }
    }
    return null;
  }

  // A positive unpaid base needs no other buildings. Full liquidation is an attainable upper bound.
  for (const h of land) for (const slot of slots) if (!h.slots[slot].yieldPaid) {
    for (const building of state.config.rosters[h.biome!]) {
      const witness = plan([{ hexId: h.id, slot, building, rebuild: true }], 'base');
      if (witness) return result('recoverable', 'Actual refund-funded unpaid base payout', witness);
      if (truncated) return result('unknown', 'Goal budget reached');
    }
  }

  // Enumerate each unpaid pair/triple recipe, each assignment, and retain matching old buildings.
  // Any other zero-yield construction before this first payout only decreases available resources.
  for (const h of land) for (const recipe of state.config.combos) {
    if (!positive(recipe.amount)) continue;
    const positions: SlotIndex[][] = recipe.buildings.length === 2
      ? SLOT_PAIRS.flatMap((pair, i) => h.pairPaid[i] === null ? [[...pair]] : [])
      : h.triplePaid === null ? [[0, 1, 2]] : [];
    for (const position of positions) for (const ids of permutations(recipe.buildings)) {
      const wants = position.map((slot, i) => ({ hexId: h.id, slot, building: ids[i] }));
      const witness = plan(wants, 'combo');
      if (witness) return result('recoverable', 'Actual refund-funded combo payout', witness);
      // A pre-existing unpaid recipe still needs a transaction to trigger it.
      if (wants.every(w => h.slots[w.slot].building === w.building)) {
        for (const w of wants) {
          const cycle = plan(wants.map(v => ({ ...v, rebuild: v.slot === w.slot })), 'combo');
          if (cycle) return result('recoverable', 'Existing unpaid combo triggered by replacement', cycle);
        }
        for (const slot of slots.filter(s => !position.includes(s))) for (const building of state.config.rosters[h.biome!]) {
          const extra = plan([...wants, { hexId: h.id, slot, building, rebuild: true }], 'combo');
          if (extra) return result('recoverable', 'Existing unpaid combo triggered by another slot', extra);
        }
      }
      if (truncated) return result('unknown', 'Goal budget reached');
    }
  }

  // An unfinished tile can still pay adjacency even after its own payouts are exhausted.
  // Construct obvious witnesses while preserving a current neighboring combo. Creating a new
  // paid-position neighbor combo is deliberately unresolved, not falsely certified as dead.
  let adjacencyUnresolved = false;
  if (positive(state.config.adjacencyAmount)) for (const h of land) if (!h.everCompleted) {
    for (const neighborId of neighbors(h.id, state.cols, state.rows)) {
      if (state.adjacencyPaid[pairKey(h.id, neighborId)] !== undefined) continue;
      const n = state.hexes[neighborId];
      if (!n.placeable || n.biome === null || isCoreHex(state, neighborId)) continue;
      const possible = state.config.combos.some(c => c.buildings.every(b => state.config.rosters[n.biome!].includes(b) || n.slots.some(s => s.building === b)));
      if (!possible) continue;
      adjacencyUnresolved = true;
      for (const match of currentComboMatches(state, neighborId)) {
        const preserve = (match.pair !== undefined ? SLOT_PAIRS[match.pair] : slots)
          .map(slot => ({ hexId: neighborId, slot, building: n.slots[slot].building! }));
        const choices = slots.map(slot => h.slots[slot].building !== null ? [h.slots[slot].building!] : state.config.rosters[h.biome!]);
        for (const a of choices[0]) for (const b of choices[1]) for (const c of choices[2]) {
          const wants = slots.map(slot => ({ hexId: h.id, slot, building: [a, b, c][slot] }));
          const witness = plan([...preserve, ...wants], 'adjacency');
          if (witness) return result('recoverable', 'Actual first-completion adjacency payout', witness);
          if (truncated) return result('unknown', 'Goal budget reached');
        }
      }
    }
  }
  if (adjacencyUnresolved) return result('unknown', 'Potential adjacency setup requires a wider search');
  return result('proven-dead', 'No fundable positive base/recipe goal after maximal permissible refunds; no remaining adjacency or progression opportunity');
}
