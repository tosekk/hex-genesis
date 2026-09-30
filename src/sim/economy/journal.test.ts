import { describe, expect, it } from 'vitest';
import type { PayoutEvent } from '../../core/types';
import { build, economyState, fill } from './__fixtures__/economy';
import { adjacencyLogEntry, comboPages, terrainRules, zoneEffects } from './journal';

function viewState() {
  return economyState({
    terrainBonuses: [
      { adjacentTerrain: ['riverbed', 'basin'], buildings: ['sawmill', 'farm'], bonus: { wood: 2 } },
      { adjacentTerrain: ['marsh'], buildings: 'any', bonus: { stone: 1 } },
    ],
    zoneModifiers: {
      taiga: [{ buildings: ['quarry', 'sawmill'], delta: { wood: -1, stone: 2 } }],
      steppe: [{ buildings: 'any', delta: { stone: -2 } }],
    },
  });
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object') {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

describe('journal data helpers — UI_SPEC §8.1', () => {
  it('returns only locked/index for every undiscovered page, without reading recipe metadata', () => {
    const state = structuredClone(economyState());
    for (const combo of state.config.combos) {
      for (const key of ['name', 'buildings', 'amount']) Object.defineProperty(combo, key, {
        get: () => { throw new Error(`Undiscovered ${key} was read`); },
      });
    }
    const pages = comboPages(state);
    expect(pages).toEqual(state.config.combos.map((_, index) => ({ locked: true, index })));
    for (const page of pages) expect(Reflect.ownKeys(page).sort()).toEqual(['index', 'locked']);
  });

  it('keeps config and recipe order, sums repeated buildings, and includes every capable roster', () => {
    const state = economyState();
    state.discoveredCombos = ['qfq', 'sfs', 'unknown', 'qfq'];
    const pages = comboPages(state);
    expect(pages).toHaveLength(5);
    expect(pages.slice(0, 3)).toEqual([0, 1, 2].map(index => ({ locked: true, index })));
    expect(pages[3]).toEqual({
      locked: false, index: 3, id: 'sfs', name: 'Two sawmills + farm',
      buildings: [{ id: 'sawmill', name: 'Sawmill' }, { id: 'farm', name: 'Farm' }, { id: 'sawmill', name: 'Sawmill' }],
      totalCost: { wood: 8, stone: 2 }, amount: { wood: 11, stone: 3 }, biomes: ['forest'],
    });
    expect(pages[4]).toEqual({
      locked: false, index: 4, id: 'qfq', name: 'Two quarries + farm',
      buildings: [{ id: 'quarry', name: 'Quarry' }, { id: 'farm', name: 'Farm' }, { id: 'quarry', name: 'Quarry' }],
      totalCost: { wood: 2, stone: 6 }, amount: { stone: 13 }, biomes: ['forest', 'steppe', 'polarDesert'],
    });
    state.discoveredCombos = [];
    expect(comboPages(state).every(p => p.locked)).toBe(true);
  });

  it.each(['base', 'pair', 'triple'] as const)('ignores %s payouts even when they carry a neighborId', kind => {
    expect(adjacencyLogEntry(economyState(), { kind, hexId: 1, neighborId: 0, amount: { wood: 99 } })).toBeNull();
  });

  it('snapshots the real adjacency payout and both current matches, including neighbor 0 and repeated pairs', () => {
    const state = economyState({}, 2, 1);
    fill(state, 0);
    build(state, 1, 0, 'farm');
    build(state, 1, 1, 'quarry');
    const event = build(state, 1, 2, 'farm').payouts.find(p => p.kind === 'adjacency')!;
    expect(event.neighborId).toBe(0);
    // Historical records must not replace current building configurations or event amounts.
    state.hexes[0].pairPaid[0] = { comboId: 'qfq', amount: { stone: 999 } };
    state.adjacencyPaid['0:1'] = { stone: 888 };
    const entry = adjacencyLogEntry(state, event);
    expect(entry).toEqual({
      hexId: 1, neighborId: 0, hexCombos: ['Farm + quarry', 'Farm + quarry'],
      neighborCombos: ['Sawmill + farm', 'Two sawmills', 'Sawmill + farm', 'Two sawmills + farm'],
      amount: { wood: 2, stone: 1 },
    });
    state.hexes[0].slots[1].building = null;
    state.hexes[1].slots[1].building = null;
    event.amount.wood = 100;
    expect(adjacencyLogEntry(state, event)).toEqual({
      hexId: 1, neighborId: 0, hexCombos: [], neighborCombos: ['Two sawmills'], amount: { wood: 100, stone: 1 },
    });
    expect(entry!.amount).toEqual({ wood: 2, stone: 1 });
    expect(entry!.neighborCombos).toHaveLength(4);
  });

  it('ignores an adjacency event with no neighbor rather than inventing a tile', () => {
    expect(adjacencyLogEntry(economyState(), { kind: 'adjacency', hexId: 0, amount: {} })).toBeNull();
  });

  it('shows every terrain rule with ordered terrain/building names and any intact', () => {
    expect(terrainRules(viewState().config)).toEqual([
      { terrain: ['riverbed', 'basin'], buildings: [{ id: 'sawmill', name: 'Sawmill' }, { id: 'farm', name: 'Farm' }], bonus: { wood: 2 } },
      { terrain: ['marsh'], buildings: 'any', bonus: { stone: 1 } },
    ]);
  });

  it('flattens zone targets in config order and preserves negative deltas and any', () => {
    expect(zoneEffects(viewState().config)).toEqual([
      { biome: 'taiga', building: { id: 'quarry', name: 'Quarry' }, delta: { wood: -1, stone: 2 } },
      { biome: 'taiga', building: { id: 'sawmill', name: 'Sawmill' }, delta: { wood: -1, stone: 2 } },
      { biome: 'steppe', building: 'any', delta: { stone: -2 } },
    ]);
  });

  it('returns empty views for empty rule tables and no discovered roster for an unbuildable recipe', () => {
    const state = economyState({ combos: [], terrainBonuses: [], zoneModifiers: { forest: [] } });
    expect(comboPages(state)).toEqual([]);
    expect(terrainRules(state.config)).toEqual([]);
    expect(zoneEffects(state.config)).toEqual([]);
    const other = economyState({
      rosters: { forest: [], desert: [], arctic: [], steppe: [], taiga: [], polarDesert: [] },
    });
    other.discoveredCombos = ['sf'];
    expect(comboPages(other)[0]).toMatchObject({ locked: false, biomes: [] });
  });

  it('is deterministic and read-only, with no writable aliases into state, config, events or sibling rows', () => {
    const initial = viewState(); initial.discoveredCombos = ['sfs'];
    const state = deepFreeze(structuredClone(initial));
    const event: PayoutEvent = deepFreeze({ kind: 'adjacency', hexId: 1, neighborId: 0, amount: { wood: 2 } });
    const read = () => ({ pages: comboPages(state), terrain: terrainRules(state.config), zones: zoneEffects(state.config), log: adjacencyLogEntry(state, event) });
    const first = read(), expected = structuredClone(first);
    expect(read()).toEqual(expected);
    const page = first.pages[3];
    if (page.locked) throw new Error('Fixture should be discovered');
    page.buildings[0].name = 'changed'; page.totalCost.wood = -1; page.amount.wood = -1; page.biomes.push('arctic');
    first.terrain[0].terrain.push('woods'); first.terrain[0].bonus.wood = -1;
    if (first.terrain[0].buildings !== 'any') first.terrain[0].buildings[0].name = 'changed';
    first.zones[0].delta.wood = -99;
    if (first.zones[0].building !== 'any') first.zones[0].building.name = 'changed';
    expect(first.zones[1].delta).toEqual({ wood: -1, stone: 2 });
    first.log!.amount.wood = -1; first.log!.hexCombos.push('changed');
    expect(read()).toEqual(expected);
    expect(state).toEqual(initial);
    expect(event.amount).toEqual({ wood: 2 });
  });
});
