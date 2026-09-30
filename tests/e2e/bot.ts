// Greedy autoplay bot. It MUTATES state only through the GameSession API; it may read state and
// call pure sim queries (legalCoreSites, computeSpread, rosterFor) to make decisions.
import { expect } from 'vitest';
import type { GameSession } from '../../src/core/contracts';
import { canAfford } from '../../src/core/resources';
import type { BuildingId, GameState, HexId, Resources, SlotIndex } from '../../src/core/types';
import { isCoreHex, rosterFor, slotCounts } from '../../src/sim/economy';
import { computeSpread, isHexLocked, legalCoreSites } from '../../src/sim/spread/spread';
import { assertInvariants } from './invariants';

export type Action =
  | { t: 'offer'; index: 0 | 1 }
  | { t: 'reshuffle' }
  | { t: 'core'; hexId: HexId; stackIndex: number }
  | { t: 'build'; hexId: HexId; slot: SlotIndex; building: BuildingId }
  | { t: 'advance'; dtMs: number }
  | { t: 'end' };

export interface BotReport {
  seed: number;
  status: GameState['status'];
  strategy: Strategy;
  /** terminal: the game ended the run (won/lost) · stuck: bot found no action but the game had not
   *  declared a loss, so the bot pressed End Run · cap: action cap · time: wall-clock budget */
  stop: 'terminal' | 'stuck' | 'cap' | 'time';
  actions: Action[];
  placements: number;
  coresPlaced: number;
  thresholdsReached: number;
  /** placementsPerThreshold[i] = building placements between reaching threshold i-1 and i. */
  placementsPerThreshold: number[];
  /** Placements made after the last threshold reached (progress toward the next one). */
  placementsSinceLastThreshold: number;
  lifetime: Resources;
  resources: Resources;
  filledHexes: number;
  livingPlaceableHexes: number;
  /** §41 end-screen stat: occupied slots / all slots on terraformed placeable non-core hexes (§10). */
  occupiedSlots: number;
  terraformedSlots: number;
  /** astra's v4 metric: occupied slots / (3 × placeable hexes on the whole map). */
  placeableSlots: number;
}

/** greedy: the sensible player (combos, threshold needs). spam: cheapest affordable building, first empty
 *  slot, lowest HexId; ignores combos and needs (the "out of room" stress case, §42). */
export type Strategy = 'greedy' | 'spam';
export interface BotOptions { maxActions?: number; timeBudgetMs?: number; strategy?: Strategy }

/** GameState is plain JSON; JSON cloning is far faster than structuredClone inside vitest workers. */
export const snapshot = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

const total = (r: Resources) => Object.values(r).reduce((a, b) => a + b, 0);

/** Apply one action through the session API. Returns whether the session accepted it. */
export function applyAction(session: GameSession, a: Action): boolean {
  switch (a.t) {
    case 'offer': return session.chooseOffer(a.index).ok;
    case 'reshuffle': return session.reshuffleOffer().ok;
    case 'core': return session.placeCore(a.hexId, a.stackIndex).ok;
    case 'build': return session.placeBuilding(a.hexId, a.slot, a.building).ok;
    case 'advance': session.advance(a.dtMs); return true;
    case 'end': session.endRun(); return true;
  }
}

function chooseOffer(s: Readonly<GameState>): Action {
  const offer = s.pendingOffer!;
  const [x, y] = offer.options;
  if (x === y && s.reshufflesUsed < s.config.reshufflesPerRun) return { t: 'reshuffle' };
  // Prefer the biome covering fewer tiles (held cores count as 69), to provoke mixing. Ties → index 0.
  const count = (b: string) => s.hexes.filter((h) => h.biome === b).length + 69 * s.coreStack.filter((c) => c === b).length;
  return { t: 'offer', index: count(y) < count(x) ? 1 : 0 };
}

function chooseCoreSite(s: Readonly<GameState>): Action | null {
  const sites = legalCoreSites(s);
  if (sites.length === 0) return null;
  const biome = s.coreStack[0];
  let best: HexId = sites[0];
  let bestScore = -1;
  for (const id of sites) {
    const score = computeSpread(s, id, biome).claims.filter((c) => c.kind !== 'mountain').length;
    if (score > bestScore) { bestScore = score; best = id; }
  }
  return { t: 'core', hexId: best, stackIndex: 0 };
}

/** Living, placeable, unlocked, and not a core's own hex (§10: a core hex never holds buildings). */
const buildable = (s: Readonly<GameState>, id: HexId) => {
  const h = s.hexes[id];
  return h.placeable && h.biome !== null && !isHexLocked(s, id) && !isCoreHex(s, id);
};

/**
 * Fill hexes one at a time: the fullest unlocked living hex that has an affordable roster building
 * (ties → lowest HexId), then the best-scoring previewed building for its first empty slot.
 * Previews only that one hex's roster, because previewPlacement clones the whole state (~1 ms).
 */
function chooseBuild(session: GameSession): Action | null {
  const s = session.state;
  const occupied = (id: HexId) => s.hexes[id].slots.filter((x) => x.building !== null).length;
  const candidates = s.hexes
    .filter((h) => buildable(s, h.id) && occupied(h.id) < 3)
    .filter((h) => rosterFor(s, h.id).some((b) => canAfford(s.resources, s.config.buildings[b].cost)))
    .sort((a, b) => occupied(b.id) - occupied(a.id) || a.id - b.id);
  const h = candidates[0];
  if (!h) return null;
  const slot = h.slots.findIndex((x) => x.building === null);
  // A sensible greedy player: value resources the next threshold still needs, and resources that
  // are running low in stock (so it can keep affording buildings). Net of weighted cost.
  const next = s.config.thresholds[s.thresholdIndex] ?? {};
  const weight = (r: string) =>
    ((next[r] ?? 0) > (s.lifetime[r] ?? 0) ? 2 : 0.5) + ((s.resources[r] ?? 0) < 6 ? 1 : 0);
  const score = (x: Resources) => Object.entries(x).reduce((acc, [r, v]) => acc + weight(r) * v, 0);
  let best: { a: Action; value: number; cost: number } | null = null;
  for (const building of rosterFor(s, h.id)) {
    const p = session.preview(h.id, slot as SlotIndex, building);
    if (!p || !p.affordable) continue;
    const gain = score(p.base) + p.combos.reduce((acc, c) => acc + score(c.amount), 0);
    const value = gain - 0.5 * score(p.cost);
    const cost = total(p.cost);
    // Greedy: best net value, then cheapest, then roster order.
    if (!best || value > best.value || (value === best.value && cost < best.cost)) {
      best = { a: { t: 'build', hexId: h.id, slot: slot as SlotIndex, building }, value, cost };
    }
  }
  return best?.a ?? null;
}

function chooseSpam(session: GameSession): Action | null {
  const s = session.state;
  for (const h of s.hexes) {
    if (!buildable(s, h.id)) continue;
    const slot = h.slots.findIndex((x) => x.building === null);
    if (slot < 0) continue;
    const affordable = rosterFor(s, h.id)
      .filter((b) => canAfford(s.resources, s.config.buildings[b].cost))
      .sort((a, b) => total(s.config.buildings[a].cost) - total(s.config.buildings[b].cost));
    if (affordable.length) return { t: 'build', hexId: h.id, slot: slot as SlotIndex, building: affordable[0] };
  }
  return null;
}

/** Plays one run. Asserts invariants after every action. */
/** A spread that needs more advance() calls than this never finishes: a session bug, not a slow run. */
const MAX_ADVANCES_PER_SPREAD = 1000;

export function runBot(session: GameSession, seed: number, opts: BotOptions = {}): BotReport {
  const { maxActions = 3000, timeBudgetMs = 30_000, strategy = 'greedy' } = opts;
  const deadline = performance.now() + timeBudgetMs;
  const actions: Action[] = [];
  let placements = 0;
  let coresPlaced = 0;
  const perThreshold: number[] = [];
  let sinceThreshold = 0;
  let stop: BotReport['stop'] = 'cap';

  session.newRun(seed);
  assertInvariants(session.state);

  const act = (a: Action, mustSucceed = true) => {
    const prev = snapshot(session.state);
    const okd = applyAction(session, a);
    if (mustSucceed && !okd) throw new Error(`bot action rejected: ${JSON.stringify(a)}`);
    if (!mustSucceed && okd) throw new Error(`action should have been rejected: ${JSON.stringify(a)}`);
    assertInvariants(session.state, prev);
    if (okd) actions.push(a);
    if (okd && a.t === 'build') {
      placements++; sinceThreshold++;
      if (session.state.thresholdIndex > prev.thresholdIndex) { perThreshold.push(sinceThreshold); sinceThreshold = 0; }
    }
    if (okd && a.t === 'core') coresPlaced++;
  };

  for (let n = 0; n < maxActions; n++) {
    if (performance.now() > deadline) { stop = 'time'; break; }
    const s = session.state;
    if (s.status !== 'playing') { stop = 'terminal'; break; }
    if (s.pendingOffer) { act(chooseOffer(s)); continue; }
    if (s.activeSpread) {
      // §11 / §57 spread 13: locked tiles and a second core are rejected while spreading.
      // A revealed claim other than the origin: the origin is the core's own hex, which rejects buildings
      // anyway (§10), so it would not prove the lock.
      const lockedId = s.activeSpread.result.claims.slice(1, s.activeSpread.revealed).find((c) => c.kind === 'claim')?.hexId;
      if (lockedId !== undefined) {
        const b = rosterFor(s, lockedId)[0];
        if (b) act({ t: 'build', hexId: lockedId, slot: 0, building: b }, false);
      }
      const site = legalCoreSites(s)[0];
      if (s.coreStack.length > 0 && site !== undefined) act({ t: 'core', hexId: site, stackIndex: 0 }, false);
      for (let i = 0; session.state.activeSpread && session.state.status === 'playing'; i++) {
        if (i >= MAX_ADVANCES_PER_SPREAD) throw new Error(`spread did not finish after ${i} advance(250) calls`);
        act({ t: 'advance', dtMs: 250 });
      }
      continue;
    }
    const core = s.coreStack.length > 0 ? chooseCoreSite(s) : null;
    if (core) { act(core); continue; }
    const build = strategy === 'spam' ? chooseSpam(session) : chooseBuild(session);
    if (build) { act(build); continue; }
    act({ t: 'end' });
    stop = 'stuck';
    break;
  }

  const s = session.state;
  // Core hexes are not building slots anywhere, board-used stats included (§10): the economy's slotCounts.
  const living = s.hexes.filter((h) => h.placeable && h.biome !== null && !isCoreHex(s, h.id));
  const slots = slotCounts(s);
  return {
    seed, strategy, status: s.status, stop, actions, placements, coresPlaced,
    thresholdsReached: s.thresholdIndex,
    placementsPerThreshold: perThreshold,
    placementsSinceLastThreshold: sinceThreshold,
    lifetime: { ...s.lifetime }, resources: { ...s.resources },
    filledHexes: living.filter((h) => h.slots.every((x) => x.building !== null)).length,
    livingPlaceableHexes: living.length,
    occupiedSlots: slots.total - slots.empty,
    terraformedSlots: slots.total,
    placeableSlots: 3 * s.hexes.filter((h) => h.placeable).length,
  };
}

export const cumulative = (xs: number[]): number[] => xs.map((_, i) => xs.slice(0, i + 1).reduce((a, b) => a + b, 0));

/** Human-readable tuning line for one run. */
export function formatReport(r: BotReport): string {
  const fmt = (x: Resources) => Object.entries(x).map(([k, v]) => `${k}=${v}`).join(' ');
  const pct = (a: number, b: number) => `${b ? Math.round((100 * a) / b) : 0}%`;
  return [
    `seed ${r.seed} [${r.strategy}]: ${r.status.toUpperCase()} (${r.stop}) · ${r.placements} placements · ${r.coresPlaced} cores · thresholds ${r.thresholdsReached}`,
    `  board used ${r.occupiedSlots}/${r.terraformedSlots} terraformed slots (${pct(r.occupiedSlots, r.terraformedSlots)}) · ${pct(r.occupiedSlots, r.placeableSlots)} of the map's ${r.placeableSlots} placeable slots`,
    `  placements per threshold: [${r.placementsPerThreshold.join(', ')}] (+${r.placementsSinceLastThreshold} toward next)`,
    `  cumulative at each threshold: [${cumulative(r.placementsPerThreshold).join(', ')}]`,
    `  filled ${r.filledHexes}/${r.livingPlaceableHexes} living hexes · lifetime ${fmt(r.lifetime)} · stock ${fmt(r.resources)}`,
  ].join('\n');
}

/** Strip wall-clock fields for determinism comparisons. */
export function comparable(s: Readonly<GameState>): unknown {
  const c = snapshot(s) as Partial<GameState>;
  delete c.runStartMs;
  delete c.runEndMs;
  return c;
}

export function expectSameRun(a: Readonly<GameState>, b: Readonly<GameState>): void {
  expect(comparable(a)).toEqual(comparable(b));
}

/** Tuning output. stderr, because vitest does not reliably surface console.log from passing tests. */
export function report(text: string): void {
  process.stderr.write(text + '\n');
}
