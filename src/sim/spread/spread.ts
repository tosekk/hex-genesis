import { isMainBiome, mixOf } from '../../core/biomes';
import { hexDistance, neighbors } from '../../core/hex';
import { err, ok } from '../../core/result';
import type {
  GameState, HexId, MainBiome, Result, SpreadClaim, SpreadConfig, SpreadResult,
} from '../../core/types';

// Spread engine (GAME_DESIGN §10–§18, AGENT_TASKS §50–§52).
// All costs are integers in `costUnit` sub-units: 1.0 spread cost = costUnit.

/** §12: pool = (3r(r+1) + 1 + 2r) · costUnit. A budget, NOT a spatial radius. */
export function spreadPool(cfg: SpreadConfig): number {
  const r = cfg.poolRadius;
  return (3 * r * (r + 1) + 1 + 2 * r) * cfg.costUnit;
}

/** §13: slope cost of stepping from elevation `from` to `to`. Always ≥ minStepCost > 0. */
export function stepCost(cfg: SpreadConfig, from: number, to: number): number {
  const d = to - from;
  const raw = cfg.costUnit + cfg.uphillPerLevel * Math.max(0, d) - cfg.downhillPerLevel * Math.max(0, -d);
  return Math.max(cfg.minStepCost, raw);
}

/** §10: dead, placeable, and ≥ minCoreDistance (flat grid distance) from every placed core. */
export function isLegalCoreSite(state: Readonly<GameState>, hexId: HexId): boolean {
  const hex = state.hexes[hexId];
  if (!hex || hex.biome !== null || !hex.placeable) return false;
  const min = state.config.spread.minCoreDistance;
  for (const c of state.cores) {
    if (hexDistance(c, hexId, state.cols) < min) return false;
  }
  return true;
}

/** Ascending HexId. */
export function legalCoreSites(state: Readonly<GameState>): HexId[] {
  const out: HexId[] = [];
  for (const h of state.hexes) if (isLegalCoreSite(state, h.id)) out.push(h.id);
  return out;
}

interface Node {
  hexId: HexId;
  /** Cumulative path cost including this step. Primary key. */
  cost: number;
  /** Pool this tile consumes if claimed. */
  step: number;
  /** 0 = dead land; 1..maxConversionDepth = inside a foreign main biome. */
  depth: number;
}

/** Total order: cost, then HexId, then depth, then step (all ascending). */
function less(a: Node, b: Node): boolean {
  if (a.cost !== b.cost) return a.cost < b.cost;
  if (a.hexId !== b.hexId) return a.hexId < b.hexId;
  if (a.depth !== b.depth) return a.depth < b.depth;
  return a.step < b.step;
}

class MinHeap {
  private a: Node[] = [];
  get size(): number { return this.a.length; }
  push(n: Node): void {
    const a = this.a;
    a.push(n);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(a[i], a[p])) break;
      [a[i], a[p]] = [a[p], a[i]];
      i = p;
    }
  }
  pop(): Node {
    const a = this.a;
    const top = a[0];
    const last = a.pop()!;
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < a.length && less(a[l], a[m])) m = l;
        if (r < a.length && less(a[r], a[m])) m = r;
        if (m === i) break;
        [a[i], a[m]] = [a[m], a[i]];
        i = m;
      }
    }
    return top;
  }
}

/**
 * Pure: reads the visible board as a snapshot and never mutates it (§14).
 * Dijkstra keyed by (cumulative cost, HexId). The pool is a budget: a popped node whose step
 * cost exceeds the remaining pool is discarded and the search continues (§13 "until consumed").
 */
export function computeSpread(state: Readonly<GameState>, origin: HexId, biome: MainBiome): SpreadResult {
  const cfg = state.config.spread;
  const { hexes, cols, rows } = state;
  const U = cfg.costUnit;
  let pool = spreadPool(cfg);
  const claims: SpreadClaim[] = [];
  const claimed = new Set<HexId>();
  const heap = new MinHeap();

  /** Queue a step from `fromId` (at `fromDepth`) into `toId`, if the tile rules allow entering it. */
  const enqueue = (fromId: HexId, fromCost: number, fromDepth: number, toId: HexId) => {
    if (claimed.has(toId)) return;
    const from = hexes[fromId];
    const to = hexes[toId];
    const slope = stepCost(cfg, from.elevation, to.elevation);
    const natural = !to.placeable && to.terrain !== 'mountain';
    const base = natural ? slope * cfg.naturalMultiplier : slope;

    if (fromDepth > 0) {
      // Inside a foreign biome: continue only into the SAME foreign biome, up to the depth limit (§17).
      if (fromDepth >= cfg.maxConversionDepth || to.biome !== from.biome) return;
      const step = Math.ceil(base * cfg.conversionMultiplier);
      heap.push({ hexId: toId, cost: fromCost + step, step, depth: fromDepth + 1 });
      return;
    }
    if (to.biome === null) {
      // Dead land, natural tiles, and mountains (which always stay dead).
      heap.push({ hexId: toId, cost: fromCost + base, step: base, depth: 0 });
    } else if (isMainBiome(to.biome) && to.biome !== biome) {
      const step = Math.ceil(base * cfg.conversionMultiplier);
      heap.push({ hexId: toId, cost: fromCost + step, step, depth: 1 });
    }
    // Same main biome: 0 cost, not claimed, terminal (§16). Mixed: impassable (§18).
  };

  /** Shallowest depth each converted tile has been reached at. */
  const convDepth = new Map<HexId, number>();

  heap.push({ hexId: origin, cost: U, step: U, depth: 0 });
  while (heap.size > 0 && pool > 0) {
    const n = heap.pop();
    if (claimed.has(n.hexId)) {
      // §17 counts depth from the first foreign tile entered. A converted tile first reached deep
      // (via a cheaper path through the foreign region) and later reached shallower may push the
      // conversion further. It is not paid for again.
      const d = convDepth.get(n.hexId);
      if (d !== undefined && n.depth < d) {
        convDepth.set(n.hexId, n.depth);
        for (const nb of neighbors(n.hexId, cols, rows)) enqueue(n.hexId, n.cost, n.depth, nb);
      }
      continue;
    }
    if (n.step > pool) continue;
    const hex = hexes[n.hexId];
    pool -= n.step;
    claimed.add(n.hexId);

    if (n.depth > 0) {
      convDepth.set(n.hexId, n.depth);
      claims.push({ hexId: n.hexId, kind: 'convert', toBiome: mixOf(biome, hex.biome as MainBiome), pathCost: n.cost });
    } else if (hex.terrain === 'mountain') {
      // §13: mountains are entered at most 1 deep; the route ends here and the tile stays dead.
      claims.push({ hexId: n.hexId, kind: 'mountain', toBiome: null, pathCost: n.cost });
      continue;
    } else {
      claims.push({ hexId: n.hexId, kind: 'claim', toBiome: biome, pathCost: n.cost });
    }
    for (const nb of neighbors(n.hexId, cols, rows)) enqueue(n.hexId, n.cost, n.depth, nb);
  }

  return { origin, biome, claims, poolUsed: spreadPool(cfg) - pool };
}

/** Validates (no active spread, core in stack, legal site), pops core, records cores[], sets activeSpread. Reveals nothing. */
export function startSpread(state: GameState, origin: HexId, stackIndex: number): Result<SpreadResult> {
  if (state.activeSpread) return err('A spread is already active (§11).');
  if (!Number.isInteger(stackIndex) || stackIndex < 0 || stackIndex >= state.coreStack.length) {
    return err('No core at that stack index.');
  }
  if (!isLegalCoreSite(state, origin)) return err('Not a legal core site (§10).');

  const biome = state.coreStack[stackIndex];
  const result = computeSpread(state, origin, biome);
  state.coreStack.splice(stackIndex, 1);
  state.cores.push(origin);
  const locked: Record<HexId, true> = {};
  for (const c of result.claims) locked[c.hexId] = true;
  state.activeSpread = { result, revealed: 0, locked };
  return ok(result);
}

/** Applies the next `count` claims to hex.biome and returns them. Mountains stay null. */
export function revealSpread(state: GameState, count: number): SpreadClaim[] {
  const active = state.activeSpread;
  if (!active || count <= 0) return [];
  const end = Math.min(active.result.claims.length, active.revealed + Math.floor(count));
  const out = active.result.claims.slice(active.revealed, end);
  for (const c of out) {
    if (c.kind !== 'mountain') state.hexes[c.hexId].biome = c.toBiome;
  }
  active.revealed = end;
  return out;
}

/** Reveals any remaining claims and clears activeSpread. Returns the claims revealed now. */
export function finishSpread(state: GameState): SpreadClaim[] {
  const active = state.activeSpread;
  if (!active) return [];
  const out = revealSpread(state, active.result.claims.length - active.revealed);
  state.activeSpread = null;
  return out;
}

export function isHexLocked(state: Readonly<GameState>, hexId: HexId): boolean {
  return state.activeSpread?.locked[hexId] === true;
}
