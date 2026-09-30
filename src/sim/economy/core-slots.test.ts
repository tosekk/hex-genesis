import { describe, expect, it } from 'vitest';
import { canPlaceBuilding, isCoreHex, placeBuilding, previewPlacement, rosterFor, slotCounts } from './index';
import { economyState } from './__fixtures__/economy';

describe('N11 core hex exclusion (§10/§20)', () => {
  it('rejects all core slots without mutation, retains the roster, and previews no payout', () => {
    const state = economyState();
    state.cores = [0, 4];
    state.discoveredCombos = state.config.combos.map(c => c.id);
    const before = structuredClone(state);
    for (const id of state.cores) for (const slot of [0, 1, 2] as const) {
      expect(isCoreHex(state, id)).toBe(true);
      expect(canPlaceBuilding(state, id, slot, 'sawmill')).toEqual({ ok: false, reason: 'A terraformer core occupies this tile' });
      expect(placeBuilding(state, id, slot, 'sawmill').ok).toBe(false);
      expect(previewPlacement(state, id, slot, 'sawmill')).toMatchObject({ base: {}, baseBreakdown: { raw: {}, terrain: {}, zone: {} }, combos: [] });
      expect(rosterFor(state, id)).toEqual(state.config.rosters.forest);
    }
    expect(isCoreHex(state, 1)).toBe(false);
    expect(isCoreHex(state, 99)).toBe(false);
    expect(canPlaceBuilding(state, 1, 0, 'sawmill').ok).toBe(true);
    expect(state).toEqual(before);
  });

  it('counts only visible placeable non-core slots, independent of paid history and temporary locks', () => {
    const state = economyState({}, 5, 1);
    state.cores = [0];
    state.hexes[1].biome = null;
    state.hexes[2] = { ...state.hexes[2], terrain: 'woods', placeable: false };
    state.hexes[3].slots[0].building = 'sawmill';
    state.hexes[3].slots[1].yieldPaid = true;
    state.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: { 3: true } };
    const before = structuredClone(state);
    expect(slotCounts(state)).toEqual({ empty: 5, total: 6 });
    expect(state).toEqual(before);
    state.cores.push(3, 4);
    expect(slotCounts(state)).toEqual({ empty: 0, total: 0 });
  });
});
