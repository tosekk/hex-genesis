import { DEFAULT_CONFIG } from '../../src/config';
import { neighbors, pairKey } from '../../src/core/hex';
import { addRes, canAfford } from '../../src/core/resources';
import { SLOT_PAIRS } from '../../src/core/types';
import type { BuildingId, GameConfig, GameState, Hex, MainBiome, Resources, SlotIndex } from '../../src/core/types';
import { createGameSession } from '../../src/game/session';
import { demolishRefund } from '../../src/sim/economy';
import { isProvablySoftLocked } from '../../src/sim/endgame';
import { computeSpread, isHexLocked, legalCoreSites } from '../../src/sim/spread/spread';

export type Strategy = 'spam' | 'combo';
export interface Candidate { hexId: number; slot: SlotIndex; building: BuildingId; base: number; bonus: number; occupied: number; }
export interface ThresholdRecord { placements: number; fill: number; boardUse: number; lifetime: Resources; stock: Resources; biome: string; maxCost: Resources; }
export interface RunReport {
  seed: number; strategy: Strategy; stop: 'won' | 'soft-lock' | 'board-full' | 'stuck' | 'action-cap';
  placements: number; actions: number; cores: number; thresholds: (ThresholdRecord | null)[];
  winPlacements: number | null; softLocks: number; lifetime: Resources; resources: Resources;
  livingSlots: number; buildings: Record<string, number>;
  legalSitesRemaining: number; heldCores: number; emptySlots: number;
  outcome: 'win' | 'loss' | 'stuck' | 'cap'; mapSlots: number; boardUse: number; openingStall: boolean; falseSoftLocks: number;
}
const total = (r: Resources) => Object.values(r).reduce((sum, value) => sum + value, 0);
const recipeKey = (ids: string[]) => [...ids].sort().join('|');

/** Independent, read-only payout scoring. All recipes are known; discovery does not filter them. */
export class PayoutScorer {
  private readonly recipes = new Map<string, { id: string; amount: number }>();
  private readonly adjacency: number[][];
  private readonly bases = new Map<string, number>();
  private readonly state: Readonly<GameState>;
  constructor(state: Readonly<GameState>) {
    this.state = state;
    for (const recipe of state.config.combos) this.recipes.set(recipeKey(recipe.buildings), { id: recipe.id, amount: total(recipe.amount) });
    this.adjacency = state.hexes.map(h => neighbors(h.id, state.cols, state.rows));
  }
  private base(hex: Hex, building: BuildingId): number {
    const key = `${hex.id}:${building}`;
    const cached = this.bases.get(key);
    if (cached !== undefined) return cached;
    const values = { ...this.state.config.buildings[building].baseYield };
    const add = (amount: Resources) => { for (const [r, value] of Object.entries(amount)) values[r] = (values[r] ?? 0) + value; };
    for (const id of this.adjacency[hex.id]) {
      const n = this.state.hexes[id];
      if (n.biome === null && n.terrain !== 'mountain') continue;
      for (const rule of this.state.config.terrainBonuses) {
        if (rule.adjacentTerrain.includes(n.terrain) && (rule.buildings === 'any' || rule.buildings.includes(building))) add(rule.bonus);
      }
    }
    for (const rule of this.state.config.zoneModifiers[hex.biome!] ?? []) {
      if (rule.buildings === 'any' || rule.buildings.includes(building)) add(rule.delta);
    }
    const result = Object.values(values).reduce((sum, value) => sum + Math.max(0, value), 0);
    this.bases.set(key, result);
    return result;
  }
  private hasCombo(hex: Hex): boolean {
    const ids = hex.slots.map(s => s.building);
    return SLOT_PAIRS.some(([a, b]) => ids[a] !== null && ids[b] !== null && this.recipes.has(recipeKey([ids[a]!, ids[b]!])) )
      || (ids.every(id => id !== null) && this.recipes.has(recipeKey(ids as string[])));
  }
  score(hex: Hex, slot: SlotIndex, building: BuildingId): Candidate {
    const ids = hex.slots.map(s => s.building);
    const occupied = ids.filter(id => id !== null).length;
    ids[slot] = building;
    let bonus = 0;
    SLOT_PAIRS.forEach(([a, b], pair) => {
      if (hex.pairPaid[pair] === null && ids[a] !== null && ids[b] !== null) bonus += this.recipes.get(recipeKey([ids[a]!, ids[b]!]))?.amount ?? 0;
    });
    if (ids.every(id => id !== null)) {
      if (hex.triplePaid === null) bonus += this.recipes.get(recipeKey(ids as string[]))?.amount ?? 0;
      if (!hex.everCompleted) for (const n of this.adjacency[hex.id]) {
        if (this.state.adjacencyPaid[pairKey(hex.id, n)] === undefined && this.hasCombo(this.state.hexes[n])) bonus += total(this.state.config.adjacencyAmount);
      }
    }
    return { hexId: hex.id, slot, building, occupied, base: hex.slots[slot].yieldPaid ? 0 : this.base(hex, building), bonus };
  }
  choose(strategy: Strategy): Candidate | null {
    let best: Candidate | null = null, bestScore = -1;
    for (const hex of this.state.hexes) {
      if (!hex.placeable || hex.biome === null || isHexLocked(this.state, hex.id)) continue;
      const slot = hex.slots.findIndex(s => s.building === null);
      if (slot === -1) continue;
      for (const building of this.state.config.rosters[hex.biome]) {
        if (!canAfford(this.state.resources, this.state.config.buildings[building].cost)) continue;
        const candidate = this.score(hex, slot as SlotIndex, building);
        const score = candidate.base + (strategy === 'combo' ? candidate.bonus : 0);
        if (score > bestScore || (score === bestScore && strategy === 'combo' && candidate.occupied > (best?.occupied ?? -1))) {
          best = candidate; bestScore = score;
        }
      }
    }
    return best;
  }
}

export function bestCoreSite(state: Readonly<GameState>, biome: MainBiome) {
  let best: { id: number; score: number; newMix: boolean } | null = null;
  const present = new Set(state.hexes.map(h => h.biome));
  for (const id of legalCoreSites(state)) {
    const claims = computeSpread(state, id, biome).claims;
    const score = claims.filter(c => c.kind === 'claim' && state.hexes[c.hexId].placeable && state.hexes[c.hexId].biome === null).length;
    if (best === null || score > best.score) best = { id, score, newMix: claims.some(c => c.kind === 'convert' && !present.has(c.toBiome)) };
  }
  return best;
}

/** Concrete productive placement/replacement or refund-funded unpaid base-yield escape. */
export function hasYieldEscape(state: Readonly<GameState>): boolean {
  if (state.activeSpread || state.pendingOffer || (state.coreStack.length && legalCoreSites(state).length)) return true;
  const scorer = new PayoutScorer(state);
  let refunded = { ...state.resources };
  for (const h of state.hexes) if (h.placeable && h.biome) for (const slot of h.slots) if (slot.building) refunded = addRes(refunded, demolishRefund(state, slot.building));
  for (const h of state.hexes) {
    if (!h.placeable || !h.biome || isHexLocked(state, h.id)) continue;
    for (const slot of [0, 1, 2] as const) {
      const old = h.slots[slot].building;
      const wallet = old ? addRes(state.resources, demolishRefund(state, old)) : state.resources;
      const copy = { ...h, slots: h.slots.map(s => ({ ...s })) as Hex['slots'] };
      copy.slots[slot].building = null;
      for (const b of state.config.rosters[h.biome]) {
        const score = scorer.score(copy, slot, b), cost = state.config.buildings[b].cost;
        if (canAfford(wallet, cost) && score.base + score.bonus > 0) return true;
        if (!old && !h.slots[slot].yieldPaid && score.base > 0 && canAfford(refunded, cost)) return true;
      }
    }
  }
  return false;
}

export function runBalance(seed: number, strategy: Strategy, config: GameConfig = DEFAULT_CONFIG, maxActions = 1500): RunReport {
  const session = createGameSession({ config, now: () => 0 });
  session.newRun(seed);
  const report: RunReport = { seed, strategy, stop: 'action-cap', placements: 0, actions: 0, cores: 0,
    thresholds: config.thresholds.map(() => null), winPlacements: null, softLocks: 0, lifetime: {}, resources: {}, livingSlots: 0, buildings: {},
    legalSitesRemaining: 0, heldCores: 0, emptySlots: 0, outcome: 'cap', mapSlots: session.state.hexes.filter(h => h.placeable).length * 3, boardUse: 0, openingStall: false, falseSoftLocks: 0 };
  let scorer = new PayoutScorer(session.state);
  for (; report.actions < maxActions; report.actions++) {
    const state = session.state;
    if (state.status !== 'playing') {
      report.stop = state.status === 'won' ? 'won' : 'soft-lock';
      if (state.status === 'lost') report.softLocks++;
      break;
    }
    if (state.pendingOffer) {
      const [a, b] = state.pendingOffer.options;
      const ca = bestCoreSite(state, a), cb = a === b ? ca : bestCoreSite(state, b);
      const count = (biome: MainBiome) => state.hexes.filter(h => h.biome === biome).length;
      const index = ca?.newMix !== cb?.newMix ? (cb?.newMix ? 1 : 0) : (count(b) < count(a) ? 1 : 0);
      const result = session.chooseOffer(index);
      if (!result.ok) throw new Error(`offer rejected: ${result.reason}`);
      continue;
    }
    if (state.activeSpread) {
      session.advance(config.animation.spreadMaxMs);
      if (state.activeSpread) throw new Error('Spread did not finish within spreadMaxMs');
      scorer = new PayoutScorer(state); // Visible terrain/biome changed: discard base cache.
      continue;
    }
    if (state.coreStack.length) {
      const core = bestCoreSite(state, state.coreStack[0]);
      if (core) {
        const result = session.placeCore(core.id, 0);
        if (!result.ok) throw new Error(`core rejected: ${result.reason}`);
        report.cores++;
        continue;
      }
    }
    const candidate = scorer.choose(strategy);
    if (!candidate) {
      const locked = isProvablySoftLocked(state);
      const empty = state.hexes.some(h => h.placeable && h.biome && h.slots.some(s => s.building === null));
      report.stop = locked ? 'soft-lock' : empty ? 'stuck' : 'board-full';
      report.openingStall = empty && state.thresholdIndex < 2;
      report.softLocks += Number(locked);
      break;
    }
    const previousThreshold = state.thresholdIndex;
    const result = session.placeBuilding(candidate.hexId, candidate.slot, candidate.building);
    if (!result.ok) throw new Error(`build rejected: ${result.reason}`);
    // Independently score the chosen action against actual transaction payouts on every placement.
    if (total(result.value.payouts.reduce<Resources>((sum, payout) => {
      for (const [r, v] of Object.entries(payout.amount)) sum[r] = (sum[r] ?? 0) + v;
      return sum;
    }, {})) !== candidate.base + candidate.bonus) throw new Error('Harness payout scorer disagrees with real transaction');
    report.placements++;
    report.buildings[candidate.building] = (report.buildings[candidate.building] ?? 0) + 1;
    if (state.thresholdIndex > previousThreshold) {
      const slots = state.hexes.filter(h => h.placeable && h.biome !== null).length * 3;
      const biome = state.hexes[candidate.hexId].biome!;
      const maxCost = Object.fromEntries(config.resources.map(r => [r, Math.max(...config.rosters[biome].map(b => config.buildings[b].cost[r] ?? 0))]));
      report.thresholds[previousThreshold] = { placements: report.placements, fill: report.placements / slots, boardUse: report.placements / report.mapSlots, lifetime: { ...state.lifetime }, stock: { ...state.resources }, biome, maxCost };
    }
  }
  const final = session.state;
  if (final.status === 'won') { report.stop = 'won'; report.winPlacements = report.placements; }
  if (final.status === 'lost' && report.softLocks === 0) { report.stop = 'soft-lock'; report.softLocks++; }
  if (report.stop === 'won' && (final.thresholdIndex < config.thresholds.length || !canAfford(final.lifetime, config.thresholds.at(-1)!))) throw new Error('S8 required: win before final threshold');
  if (report.softLocks && hasYieldEscape(final)) report.falseSoftLocks++;
  report.outcome = report.stop === 'won' ? 'win' : report.stop === 'soft-lock' || report.stop === 'board-full' ? 'loss' : report.stop === 'stuck' ? 'stuck' : 'cap';
  report.boardUse = report.placements / report.mapSlots;
  report.lifetime = { ...final.lifetime }; report.resources = { ...final.resources };
  report.livingSlots = final.hexes.filter(h => h.placeable && h.biome !== null).length * 3;
  report.legalSitesRemaining = legalCoreSites(final).length;
  report.heldCores = final.coreStack.length;
  report.emptySlots = final.hexes.filter(h => h.placeable && h.biome !== null)
    .reduce((sum, h) => sum + h.slots.filter(s => s.building === null).length, 0);
  report.openingStall ||= report.stop !== 'won' && final.thresholdIndex < 2 && report.emptySlots > 0 && !new PayoutScorer(final).choose(strategy);
  return report;
}
