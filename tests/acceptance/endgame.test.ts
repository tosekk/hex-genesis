import { describe, expect, it } from 'vitest';
import { makeTestState } from '../../src/core/testing';
import type { GameConfig, GameState } from '../../src/core/types';
import { demolishBuilding, placeBuilding } from '../../src/sim/economy';
import { checkWin, isProvablySoftLocked } from '../../src/sim/endgame';

// Rule fixtures remain independent of designer tuning and production building ids.
const config: Partial<GameConfig> = {
  resources: ['wood', 'stone'], startingResources: { wood: 6, stone: 6 },
  buildings: { fixture: { id: 'fixture', name: 'Acceptance fixture', cost: { wood: 2, stone: 2 }, baseYield: { wood: 3, stone: 3 } } },
  rosters: { forest: ['fixture'], desert: ['fixture'], arctic: ['fixture'], steppe: ['fixture'], taiga: ['fixture'], polarDesert: ['fixture'] },
  combos: [], terrainBonuses: [], zoneModifiers: {}, adjacencyAmount: {}, thresholds: [{ wood: 10, stone: 10 }],
};

function developed(): GameState {
  const s = makeTestState({ config, cols: 3, rows: 1, hex: c => c === 2 ? { terrain: 'woods', biome: 'forest' } : { biome: 'forest' } });
  for (const h of s.hexes.filter(h => h.placeable)) for (const slot of h.slots) slot.building = 'fixture';
  return s;
}

describe('C3 win/end acceptance (owner sonnet, reassigned D3)', () => {
  it('W1: requires no legal site, no spread, and full terraformed placeable slots', () => {
    const s = developed();
    expect(checkWin(s)).toBe(true); // Natural terrain needs no buildings.
    s.hexes[0].slots[0].building = null;
    expect(checkWin(s)).toBe(false);
    s.hexes[0].slots[0].building = 'fixture';
    s.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    expect(checkWin(s)).toBe(false);
    s.activeSpread = null;
    s.hexes[1].biome = null; // No existing cores, so this is a legal site.
    expect(checkWin(s)).toBe(false);
  });
  it('W2: unreachable dead land does not block the win', () => {
    const s = developed();
    s.cores = [0];
    s.hexes[1].biome = null;
    for (const slot of s.hexes[1].slots) slot.building = null;
    expect(checkWin(s)).toBe(true);
  });
  it('W3: an unusable held core blocks neither victory nor a provably exhausted run', () => {
    const won = developed();
    won.coreStack = ['arctic'];
    expect(checkWin(won)).toBe(true);
    const dead = makeTestState({ config, cols: 1, rows: 1, resources: {}, hex: () => ({ biome: 'forest' }) });
    dead.coreStack = ['arctic'];
    expect(checkWin(dead)).toBe(false);
    expect(isProvablySoftLocked(dead)).toBe(true); // No money, buildings/refunds, offers, or legal sites.
  });
  it.each(['offer', 'spread', 'legal core', 'productive building'])('§44: never declares loss while %s offers a progression action', action => {
    const s = makeTestState({ config, cols: 3, rows: 1, resources: {}, hex: () => ({ biome: 'forest' }) });
    if (action === 'offer') s.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    if (action === 'spread') s.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    if (action === 'legal core') { s.hexes[0].biome = null; s.coreStack = ['forest']; }
    if (action === 'productive building') s.resources = { wood: 100, stone: 100 };
    const before = structuredClone(s);
    expect(isProvablySoftLocked(s)).toBe(false);
    expect(s).toEqual(before);
  });
  it('§44: two demolition refunds can fund a productive unpaid slot without automatic loss', () => {
    const s = makeTestState({ config, cols: 3, rows: 1, resources: {}, hex: () => ({ biome: 'forest' }) });
    s.hexes[0].slots[0] = { building: 'fixture', yieldPaid: true };
    s.hexes[0].slots[1] = { building: 'fixture', yieldPaid: true };
    const before = structuredClone(s);
    // Verify the concrete escape sequence independently before querying the detector.
    const escape = structuredClone(s);
    expect(demolishBuilding(escape, 0, 0).ok).toBe(true);
    expect(demolishBuilding(escape, 0, 1).ok).toBe(true);
    expect(escape.resources).toEqual({ wood: 2, stone: 2 });
    expect(placeBuilding(escape, 0, 2, 'fixture').ok).toBe(true);
    expect(escape.lifetime).toEqual({ wood: 3, stone: 3 });
    expect(isProvablySoftLocked(s)).toBe(false);
    expect(s).toEqual(before);
  });

});
