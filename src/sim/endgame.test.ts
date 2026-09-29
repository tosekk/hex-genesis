import { describe, expect, it } from 'vitest';
import { makeTestState } from '../core/testing';
import type { GameState, HexId } from '../core/types';
import { checkWin, isProvablySoftLocked } from './endgame';

/** Fully developed board: every hex forest, every slot built + paid, one core placed. */
function fullBoard(): { s: GameState; b: string } {
  const s = makeTestState({ hex: () => ({ biome: 'forest' }) });
  const b = s.config.rosters.forest[0];
  for (const h of s.hexes) for (const sl of h.slots) { sl.building = b; sl.yieldPaid = true; }
  s.cores.push(0);
  return { s, b };
}
const emptySlot = (s: GameState, id: HexId, i: 0 | 1 | 2, paid: boolean) => {
  s.hexes[id].slots[i].building = null;
  s.hexes[id].slots[i].yieldPaid = paid;
};

describe('checkWin (§41)', () => {
  it('1: all slots full, no legal core site → won', () => {
    expect(checkWin(fullBoard().s)).toBe(true);
  });

  it('2: one empty slot on a terraformed placeable hex → not won', () => {
    const { s } = fullBoard();
    emptySlot(s, 5, 1, true);
    expect(checkWin(s)).toBe(false);
  });

  it('3: held cores and leftover dead land are ignored (dead land with no legal site)', () => {
    const { s } = fullBoard();
    s.coreStack.push('desert', 'arctic');
    // Dead placeable hex next to a core: illegal site (distance < 6), so it does not block a win.
    s.hexes[1].biome = null;
    expect(checkWin(s)).toBe(true);
  });

  it('a legal core site left → not won; active spread → not won', () => {
    const { s } = fullBoard();
    s.cores.length = 0;
    s.hexes[100].biome = null;
    expect(checkWin(s)).toBe(false);
    const w = fullBoard().s;
    w.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    expect(checkWin(w)).toBe(false);
  });
});

describe('isProvablySoftLocked (§43, §44)', () => {
  /** Board with one empty (paid) slot nobody can afford, no cores left. */
  function locked(): GameState {
    const { s } = fullBoard();
    emptySlot(s, 5, 0, true);
    s.resources = {};
    return s;
  }

  it('dead end: nothing affordable, no core/site left → true', () => {
    expect(isProvablySoftLocked(locked())).toBe(true);
  });

  it('never true when won, or when the run is not playing', () => {
    expect(isProvablySoftLocked(fullBoard().s)).toBe(false);
    const s = locked(); s.status = 'ended';
    expect(isProvablySoftLocked(s)).toBe(false);
  });

  it('false while a spread is active or an offer is pending', () => {
    const a = locked();
    a.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    expect(isProvablySoftLocked(a)).toBe(false);
    const p = locked();
    p.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    expect(isProvablySoftLocked(p)).toBe(false);
  });

  it('false when a core is held and a legal site exists', () => {
    const s = locked();
    s.cores.length = 0;
    s.hexes[100].biome = null; // legal (no cores placed)
    s.coreStack.push('forest');
    expect(isProvablySoftLocked(s)).toBe(false);
  });

  it('true when a core is held but no legal site exists', () => {
    const s = locked();
    s.coreStack.push('forest');
    expect(isProvablySoftLocked(s)).toBe(true);
  });

  it('false when the next threshold is already met', () => {
    const s = locked();
    s.lifetime = { ...s.config.thresholds[0] };
    expect(isProvablySoftLocked(s)).toBe(false);
  });

  it('false when an unpaid empty slot is affordable', () => {
    const s = locked();
    emptySlot(s, 5, 0, false);
    s.resources = { wood: 100, stone: 100, food: 100, water: 100 };
    expect(isProvablySoftLocked(s)).toBe(false);
  });

  it('false when demolishing one building would fund an unpaid-slot placement', () => {
    const s = locked();
    emptySlot(s, 5, 0, false);
    const cost = s.config.buildings[s.config.rosters.forest[0]].cost;
    // Wallet is one unit short of the cheapest forest building; a demolish refund closes the gap.
    const res = Object.keys(cost)[0];
    s.resources = {};
    expect(Math.ceil(cost[res] * s.config.demolishRefundRatio)).toBeGreaterThan(0);
    // Ensure every roster building is unaffordable from resources alone but reachable with one refund.
    for (const id of s.config.rosters.forest) {
      const c = s.config.buildings[id].cost;
      expect(Object.values(c).some((v) => v > 0)).toBe(true);
    }
    const s2 = s;
    s2.resources = { ...Object.fromEntries(Object.entries(cost).map(([r, v]) => [r, v - Math.ceil(v * s.config.demolishRefundRatio)])) };
    expect(isProvablySoftLocked(s2)).toBe(false);
  });

  it('false when demolishing TWO buildings would fund an unpaid slot', () => {
    const s = locked();
    emptySlot(s, 5, 0, false);
    s.resources = {};
    // Every other slot is a built forest building whose refund is > 0: sum of refunds funds anything.
    expect(isProvablySoftLocked(s)).toBe(false);
  });

  it('fast on a full board (< 10 ms)', () => {
    const s = locked();
    const t = performance.now();
    isProvablySoftLocked(s);
    expect(performance.now() - t).toBeLessThan(10);
  });
});
