import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../config';
import { createRng } from '../../core/rng';
import { addRes, canAfford } from '../../core/resources';
import { makeTestState } from '../../core/testing';
import { MAIN_BIOMES, MIXED_BIOMES } from '../../core/types';
import type { BuildingId, GameState, HexId, PlacementPreview, SlotIndex, Terrain } from '../../core/types';
import { demolishBuilding, placeBuilding, previewPlacement } from './index';

// N6 oracle: the full-state-clone implementation retained verbatim before optimization.
function fullClonePreview(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, building: BuildingId): PlacementPreview {
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

function freeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const nested of Object.values(value)) freeze(nested);
    Object.freeze(value);
  }
  return value;
}

const biomes = [...MAIN_BIOMES, ...MIXED_BIOMES];
const terrains: Terrain[] = ['plain', 'plain', 'plain', 'hill', 'mountain', 'woods', 'riverbed', 'marsh', 'basin'];
const buildings = Object.keys(DEFAULT_CONFIG.buildings);

describe('N6 preview equivalence and isolation', () => {
  it('matches the former full-clone algorithm over seeded histories, conversions, wallets and rejected requests', () => {
    const coverage = { base: 0, pair: 0, triple: 0, paid: 0, unaffordable: 0, empty: 0 };
    let comparisons = 0;
    for (let seed = 1; seed <= 72; seed++) {
      const rng = createRng(seed);
      const [cols, rows] = [[6, 5], [20, 14], [30, 20]][seed % 3];
      const state = makeTestState({ cols, rows, resources: { wood: 100_000, stone: 100_000, water: 100_000, food: 100_000 },
        hex: () => {
          const terrain = terrains[rng.nextInt(terrains.length)];
          return { terrain, biome: terrain === 'mountain' || rng.nextInt(8) === 0 ? null : biomes[rng.nextInt(biomes.length)] };
        } });
      // Build real paid histories, then demolish or convert a subset without erasing them.
      for (const h of state.hexes) {
        if (!h.placeable || h.biome === null) continue;
        const roster = state.config.rosters[h.biome];
        const recipes = state.config.combos.filter(c => c.buildings.every(b => roster.includes(b)));
        const recipe = recipes.length && rng.nextInt(2) === 0 ? recipes[rng.nextInt(recipes.length)].buildings : null;
        for (let slot = 0, count = rng.nextInt(4); slot < count; slot++) {
          const building = recipe?.[slot] ?? roster[rng.nextInt(roster.length)];
          expect(placeBuilding(state, h.id, slot as SlotIndex, building).ok).toBe(true);
        }
        for (const slot of [0, 1, 2] as const) if (h.slots[slot].building && rng.nextInt(4) === 0) demolishBuilding(state, h.id, slot);
        if (rng.nextInt(5) === 0) h.biome = biomes[rng.nextInt(biomes.length)];
      }
      // Guarantee payable known/unknown recipes as well as random rejected candidates.
      const recipe = state.config.combos[(seed - 1) % state.config.combos.length];
      const biome = biomes.find(b => recipe.buildings.every(id => state.config.rosters[b].includes(id)))!;
      const target = state.hexes.find(h => h.placeable)!;
      target.biome = biome;
      target.slots = [{ building: null, yieldPaid: false }, { building: null, yieldPaid: false }, { building: null, yieldPaid: false }];
      target.pairPaid = [null, null, null]; target.triplePaid = null; target.everCompleted = false;
      for (let slot = 0; slot < recipe.buildings.length - 1; slot++) placeBuilding(state, target.id, slot as SlotIndex, recipe.buildings[slot]);
      const finalSlot = (recipe.buildings.length - 1) as SlotIndex;
      const finalBuilding = recipe.buildings[finalSlot];
      if (seed % 4 === 0) { placeBuilding(state, target.id, finalSlot, finalBuilding); demolishBuilding(state, target.id, finalSlot); }
      state.discoveredCombos = state.config.combos.filter(() => rng.nextInt(2) === 0).map(c => c.id);
      if (seed % 2) state.discoveredCombos = state.config.combos.map(c => c.id);
      state.resources = Object.fromEntries(state.config.resources.filter(() => rng.nextInt(2) === 0).map(r => [r, rng.nextInt(9)]));
      if (seed % 8 === 0) state.activeSpread = { result: { origin: target.id, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: { [target.id]: true } };
      if (seed % 12 === 0) state.status = 'won';
      if (seed % 12 === 1) state.status = 'lost';
      if (seed % 12 === 2) state.status = 'ended';
      const before = structuredClone(state);
      freeze(state);
      const requests: [number, SlotIndex, string][] = [[target.id, finalSlot, finalBuilding], [-1, 0, finalBuilding], [target.id, 9 as SlotIndex, finalBuilding], [target.id, 0, 'unknown']];
      for (let i = 0; i < 32; i++) {
        const id = rng.nextInt(state.hexes.length);
        const h = state.hexes[id];
        const roster = h.biome ? state.config.rosters[h.biome] : buildings;
        requests.push([id, rng.nextInt(3) as SlotIndex, roster[rng.nextInt(roster.length)]]);
      }
      for (const [id, slot, building] of requests) {
        const preview = previewPlacement(state, id, slot, building);
        expect(preview, `seed ${seed}, hex ${id}, slot ${slot}, ${building}`).toEqual(fullClonePreview(state, id, slot, building));
        comparisons++;
        if (Object.keys(preview.base).length) coverage.base++;
        else coverage.empty++;
        if (preview.slotAlreadyPaid) coverage.paid++;
        if (!preview.affordable) coverage.unaffordable++;
        coverage.pair += preview.combos.filter(c => c.match.pair !== undefined).length;
        coverage.triple += preview.combos.filter(c => c.match.triple).length;
        // Returned maps must also be private, including known recipe payouts.
        for (const map of [preview.cost, preview.base, ...Object.values(preview.baseBreakdown), ...preview.combos.map(c => c.amount)]) map.wood = -999;
      }
      expect(state).toEqual(before);
    }
    for (const [kind, count] of Object.entries(coverage)) expect(count, `${kind} coverage`).toBeGreaterThan(0);
    console.info(`N6 preview: ${comparisons} exact comparisons; coverage ${JSON.stringify(coverage)}`);
  }, 20_000);

  it('removes full-board cloning cost on the default board', () => {
    const state = makeTestState({ resources: { wood: 99, stone: 99 }, hex: () => ({ biome: 'forest' }) });
    placeBuilding(state, 21, 0, 'lumber_camp');
    placeBuilding(state, 21, 1, 'sawmill');
    state.discoveredCombos = state.config.combos.map(c => c.id);
    freeze(state);
    const sample = (preview: typeof previewPlacement) => {
      const start = performance.now();
      for (let i = 0; i < 200; i++) preview(state, 21, 2, 'farm');
      return (performance.now() - start) / 200;
    };
    for (let i = 0; i < 20; i++) { previewPlacement(state, 21, 2, 'farm'); fullClonePreview(state, 21, 2, 'farm'); }
    const oldTimes: number[] = [], newTimes: number[] = [];
    for (let round = 0; round < 5; round++) {
      oldTimes.push(sample(fullClonePreview)); newTimes.push(sample(previewPlacement));
    }
    const oldMedian = oldTimes.sort((a, b) => a - b)[2], newMedian = newTimes.sort((a, b) => a - b)[2];
    expect(newMedian).toBeLessThan(oldMedian / 2);
    console.info(`N6 preview median per call: old ${oldMedian.toFixed(4)} ms; new ${newMedian.toFixed(4)} ms; ${(oldMedian / newMedian).toFixed(1)}× faster`);
  });
});
