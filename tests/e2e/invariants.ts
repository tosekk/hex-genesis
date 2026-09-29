// AGENT_TASKS §52 invariants as assertions over GameState.
// `prev` (a deep copy of the state before the last action) enables the history checks.
import { parentsOf } from '../../src/core/biomes';
import { hexDistance } from '../../src/core/hex';
import type { Biome, GameState, MixedBiome } from '../../src/core/types';
import { MAIN_BIOMES, MIXED_BIOMES, PLACEABLE_TERRAIN } from '../../src/core/types';

const isMixed = (b: Biome | null): b is MixedBiome => b !== null && (MIXED_BIOMES as readonly string[]).includes(b);

export function assertInvariants(s: Readonly<GameState>, prev?: Readonly<GameState>): void {
  const fail = (msg: string): never => { throw new Error(`Invariant violated: ${msg}`); };
  const cfg = s.config;

  // ---- board ----
  if (s.hexes.length !== s.cols * s.rows) fail('hex count');
  for (const h of s.hexes) {
    const at = `hex ${h.id}`;
    if (s.hexes[h.id] !== h) fail(`${at}: hexes[i].id !== i`);
    if (h.placeable !== PLACEABLE_TERRAIN.includes(h.terrain)) fail(`${at}: placeable does not match terrain (§7)`);
    if (h.terrain === 'mountain' && h.biome !== null) fail(`${at}: mountain has a biome (§13)`);
    const occupied = h.slots.filter((x) => x.building !== null).length;
    if (occupied > 0 && (!h.placeable || h.biome === null)) fail(`${at}: building on unplaceable/dead tile`);
    if (occupied === 3 && !h.everCompleted) fail(`${at}: full but not everCompleted (§20)`);
    h.slots.forEach((slot, i) => {
      if (slot.building !== null && !slot.yieldPaid) fail(`${at} slot ${i}: occupied but yieldPaid false (§23)`);
      if (slot.building !== null && !cfg.buildings[slot.building]) fail(`${at} slot ${i}: unknown building`);
    });
    for (const rec of [...h.pairPaid, h.triplePaid]) {
      if (rec && !s.discoveredCombos.includes(rec.comboId)) fail(`${at}: paid combo ${rec.comboId} not discovered (§32)`);
    }
  }

  // ---- economy ----
  for (const [k, v] of Object.entries(s.resources)) if (v < 0) fail(`resource ${k} negative`);
  for (const [k, v] of Object.entries(s.lifetime)) if (v < 0) fail(`lifetime ${k} negative`);
  if (s.thresholdIndex < 0 || s.thresholdIndex > cfg.thresholds.length) fail('thresholdIndex out of range');
  if (new Set(s.discoveredCombos).size !== s.discoveredCombos.length) fail('duplicate discovered combo');

  // ---- cores / offers / spread ----
  for (const b of s.coreStack) if (!MAIN_BIOMES.includes(b)) fail(`core stack holds non-main biome ${b}`);
  for (let i = 0; i < s.cores.length; i++) {
    for (let j = i + 1; j < s.cores.length; j++) {
      if (hexDistance(s.cores[i], s.cores[j], s.cols) < cfg.spread.minCoreDistance) fail(`cores ${s.cores[i]},${s.cores[j]} too close (§10)`);
    }
  }
  if (s.pendingOffer && s.status !== 'playing') fail('pending offer after the run ended');
  if (s.reshufflesUsed > cfg.reshufflesPerRun) fail('too many reshuffles (§9)');
  const a = s.activeSpread;
  if (a) {
    if (a.revealed < 0 || a.revealed > a.result.claims.length) fail('activeSpread.revealed out of range');
    const claimIds = a.result.claims.map((c) => c.hexId);
    if (new Set(claimIds).size !== claimIds.length) fail('spread claims a hex twice');
    if (Object.keys(a.locked).length !== claimIds.length || !claimIds.every((id) => a.locked[id])) fail('locked set ≠ claim set (§11)');
    for (const c of a.result.claims) {
      if (c.kind === 'mountain' && c.toBiome !== null) fail('mountain claim with a biome');
      if (c.kind === 'convert' && !isMixed(c.toBiome)) fail('conversion to a non-mixed biome (§17)');
    }
    if (s.cores[s.cores.length - 1] !== a.result.origin) fail('active spread origin is not the last core');
  }

  if (!prev) return;

  // ---- history (monotonic) ----
  if (prev.status !== 'playing' && s.status !== prev.status) fail('terminal status changed');
  if (s.thresholdIndex < prev.thresholdIndex) fail('thresholdIndex decreased');
  if (s.thresholdIndex > prev.thresholdIndex + 1) fail('crossed more than one threshold in one action (§39)');
  for (const [k, v] of Object.entries(prev.lifetime)) if ((s.lifetime[k] ?? 0) < v) fail(`lifetime ${k} decreased (§39)`);
  if (s.cores.length < prev.cores.length || prev.cores.some((c, i) => s.cores[i] !== c)) fail('cores history changed');
  if (prev.discoveredCombos.some((c, i) => s.discoveredCombos[i] !== c)) fail('discovery order changed / undiscovered (§33)');
  if (s.reshufflesUsed < prev.reshufflesUsed) fail('reshufflesUsed decreased');
  if (prev.offerHistory.some((p, i) => JSON.stringify(s.offerHistory[i]) !== JSON.stringify(p))) fail('offer history rewritten');
  for (const [k, v] of Object.entries(prev.adjacencyPaid)) {
    if (JSON.stringify(s.adjacencyPaid[k]) !== JSON.stringify(v)) fail(`adjacency record ${k} changed (§34)`);
  }
  if (prev.activeSpread && s.activeSpread && prev.activeSpread.result.origin === s.activeSpread.result.origin) {
    if (JSON.stringify(prev.activeSpread.result) !== JSON.stringify(s.activeSpread.result)) fail('spread result changed while animating (§14)');
    if (s.activeSpread.revealed < prev.activeSpread.revealed) fail('reveal went backwards');
  }
  if (prev.activeSpread && s.cores.length > prev.cores.length) {
    // A new core can only be placed after the previous spread finished (§11). Allowed only if the
    // same action finished the old spread first, which the session never does.
    fail('core placed while a spread was active (§11)');
  }

  for (const h of s.hexes) {
    const p = prev.hexes[h.id];
    const at = `hex ${h.id}`;
    if (h.elevation !== p.elevation || h.terrain !== p.terrain || h.placeable !== p.placeable || h.decoration !== p.decoration) {
      fail(`${at}: generated field changed (§6, §7)`);
    }
    // Biome transitions: dead → any, main → mixed containing it, mixed → never changes.
    if (h.biome !== p.biome) {
      if (h.biome === null) fail(`${at}: biome reverted to dead`);
      if (isMixed(p.biome)) fail(`${at}: mixed biome overwritten (§18)`);
      if (p.biome !== null && (!isMixed(h.biome) || !parentsOf(h.biome).includes(p.biome as never))) {
        fail(`${at}: ${p.biome} → ${h.biome} is not a valid conversion (§17)`);
      }
    }
    if (p.everCompleted && !h.everCompleted) fail(`${at}: everCompleted reset (§36)`);
    h.slots.forEach((slot, i) => {
      if (p.slots[i].yieldPaid && !slot.yieldPaid) fail(`${at} slot ${i}: yieldPaid reset (§23)`);
    });
    for (let i = 0; i < 3; i++) {
      if (p.pairPaid[i] && JSON.stringify(h.pairPaid[i]) !== JSON.stringify(p.pairPaid[i])) fail(`${at}: pair ${i} record changed (§31)`);
    }
    if (p.triplePaid && JSON.stringify(h.triplePaid) !== JSON.stringify(p.triplePaid)) fail(`${at}: triple record changed (§31)`);
    // No building change on a tile locked by a spread that is still active now (§11).
    if (prev.activeSpread?.locked[h.id] && s.activeSpread?.locked[h.id]
      && JSON.stringify(h.slots.map((x) => x.building)) !== JSON.stringify(p.slots.map((x) => x.building))) {
      fail(`${at}: buildings changed on a locked tile (§11)`);
    }
  }
}
