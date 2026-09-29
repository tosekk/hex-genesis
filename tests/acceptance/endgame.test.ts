import { describe, expect, it } from 'vitest';
import { makeTestState } from '../../src/core/testing';
import type { GameState } from '../../src/core/types';
import { checkWin, isProvablySoftLocked } from '../../src/sim/endgame';

function developed(): GameState {
  const s = makeTestState({ cols: 3, rows: 1, hex: c => c === 2 ? { terrain: 'woods', biome: 'forest' } : { biome: 'forest' } });
  for (const h of s.hexes.filter(h => h.placeable)) for (const slot of h.slots) slot.building = 'forest_a';
  return s;
}

describe('C3 win/end acceptance (owner deepseek)', () => {
  // Expected failure: deepseek D3 still throws NOT_IMPLEMENTED (astra status C3-END).
  it.fails('W1: requires no legal site, no spread, and full terraformed placeable slots', () => {
    const s = developed();
    expect(checkWin(s)).toBe(true); // Natural terrain needs no buildings.
    s.hexes[0].slots[0].building = null;
    expect(checkWin(s)).toBe(false);
    s.hexes[0].slots[0].building = 'forest_a';
    s.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    expect(checkWin(s)).toBe(false);
    s.activeSpread = null;
    s.hexes[1].biome = null; // No existing cores, so this is a legal site.
    expect(checkWin(s)).toBe(false);
  });
  // Expected failure: deepseek D3 still throws NOT_IMPLEMENTED (astra status C3-END).
  it.fails('W2: unreachable dead land does not block the win', () => {
    const s = developed();
    s.cores = [0];
    s.hexes[1].biome = null;
    for (const slot of s.hexes[1].slots) slot.building = null;
    expect(checkWin(s)).toBe(true);
  });
  // Expected failure: deepseek D3 still throws NOT_IMPLEMENTED (astra status C3-END).
  it.fails('W3: an unusable held core blocks neither victory nor a provably exhausted run', () => {
    const won = developed();
    won.coreStack = ['arctic'];
    expect(checkWin(won)).toBe(true);
    const dead = makeTestState({ cols: 1, rows: 1, resources: {}, hex: () => ({ biome: 'forest' }) });
    dead.coreStack = ['arctic'];
    expect(checkWin(dead)).toBe(false);
    expect(isProvablySoftLocked(dead)).toBe(true); // No money, buildings/refunds, offers, or legal sites.
  });
  // Expected failure: deepseek D3 still throws NOT_IMPLEMENTED (astra status C3-END).
  it.fails.each(['offer', 'spread', 'legal core', 'productive building', 'refund replacement'])('§44: never declares loss while %s offers a progression action', action => {
    const s = makeTestState({ cols: 3, rows: 1, resources: {}, hex: () => ({ biome: 'forest' }) });
    if (action === 'offer') s.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    if (action === 'spread') s.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    if (action === 'legal core') { s.hexes[0].biome = null; s.coreStack = ['forest']; }
    if (action === 'productive building') s.resources = { wood: 100, stone: 100 };
    if (action === 'refund replacement') {
      // Two refunds can finance one new productive slot. Detection must not kill this sequence.
      s.hexes[0].slots[0] = { building: 'forest_a', yieldPaid: true };
      s.hexes[0].slots[1] = { building: 'forest_a', yieldPaid: true };
    }
    const before = structuredClone(s);
    expect(isProvablySoftLocked(s)).toBe(false);
    expect(s).toEqual(before);
  });
});
