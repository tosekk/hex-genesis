import { describe, expect, it } from 'vitest';
import { makeTestState } from '../core/testing';
import type { GameState, HexId } from '../core/types';
import { checkWin, isProvablySoftLocked } from './endgame';

/**
 * Fully developed board: every hex forest, every slot built + paid, except the core hexes.
 * A core's own hex never holds buildings (§10, 2026-10-01): its slots stay empty and unpaid.
 */
function fullBoard(cores: HexId[] = [0]): { s: GameState; b: string } {
  const s = makeTestState({ hex: () => ({ biome: 'forest' }) });
  const b = s.config.rosters.forest[0];
  const rec = { comboId: 'c', amount: {} };
  for (const h of s.hexes) {
    if (cores.includes(h.id)) continue;
    for (const sl of h.slots) { sl.building = b; sl.yieldPaid = true; }
    // A genuinely played-out board: every one-time payout has already happened.
    h.everCompleted = true; h.pairPaid = [rec, rec, rec]; h.triplePaid = rec;
  }
  s.cores.push(...cores);
  return { s, b };
}
const emptySlot = (s: GameState, id: HexId, i: 0 | 1 | 2, paid: boolean) => {
  s.hexes[id].slots[i].building = null;
  s.hexes[id].slots[i].yieldPaid = paid;
};

describe('checkWin (§41, changed 2026-09-30)', () => {
  const lastIndex = (s: GameState) => s.config.thresholds.length;

  it('is false until the final threshold is consumed', () => {
    const { s } = fullBoard();
    expect(checkWin(s)).toBe(false); // board full but threshold unmet: that is a loss, not a win
    s.thresholdIndex = lastIndex(s) - 1;
    expect(checkWin(s)).toBe(false);
  });

  it('wins on the final threshold even with empty slots, a held core and an active spread', () => {
    const s = makeTestState({ hex: () => ({ biome: 'forest' }) });
    emptySlot(s, 5, 0, false);
    s.coreStack.push('desert');
    s.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    s.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    s.hexes[100].biome = null; // a legal core site remains too
    s.thresholdIndex = lastIndex(s);
    expect(checkWin(s)).toBe(true);
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

  it('board full, final threshold unmet → soft-locked (out of room), even when rich and fast', () => {
    const { s } = fullBoard();
    s.resources = { wood: 999, stone: 999, food: 999, water: 999 };
    const t = performance.now();
    expect(isProvablySoftLocked(s)).toBe(true);
    expect(performance.now() - t).toBeLessThan(10);
  });

  it('full except the core hexes, final threshold unmet → soft-locked: core hexes are never slots (§10, §42)', () => {
    // Three cores ≥ 6 apart, their hexes empty and unpaid; a wallet that could buy anything.
    const { s } = fullBoard([0, 10, 200]);
    s.thresholdIndex = s.config.thresholds.length - 1; // T8 unmet
    s.resources = { wood: 999, stone: 999, food: 999, water: 999 };
    expect(isProvablySoftLocked(s)).toBe(true);
    // Control: the same empty unpaid slots on hexes that are NOT cores are room to grow → not a loss.
    s.cores.length = 0;
    expect(isProvablySoftLocked(s)).toBe(false);
  });

  it('never true when won, or when the run is not playing', () => {
    const w = fullBoard().s;
    w.thresholdIndex = w.config.thresholds.length;
    expect(isProvablySoftLocked(w)).toBe(false);
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
    // Use a forest building that actually costs something (the economy may have zero-cost ones).
    const cost = s.config.rosters.forest.map((id) => s.config.buildings[id].cost)
      .find((c) => Object.values(c).some((v) => v > 0))!;
    expect(cost).toBeDefined();
    // Stock is short of that building's cost by exactly what one demolition refunds.
    s.resources = Object.fromEntries(Object.entries(cost).map(([r, v]) => [r, Math.max(0, v - Math.ceil(v * s.config.demolishRefundRatio))]));
    expect(isProvablySoftLocked(s)).toBe(false);
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
