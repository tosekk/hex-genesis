import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/config';
import { createGameSession } from '../../src/game/session';
import { legalCoreSites } from '../../src/sim/spread/spread';
import type { SessionEvent } from '../../src/core/contracts';
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

describe('C3 v4 win/end acceptance (§57 W1–W4, owner sonnet S8)', () => {
  it('W1: final full payout transaction wins immediately without a final core/offer', () => {
    const cfg: GameConfig = { ...DEFAULT_CONFIG, ...config,
      combos: [{ id: 'pair', name: 'Fixture pair', buildings: ['fixture', 'fixture'], amount: { stone: 5 } }],
      thresholds: [{ wood: 3, stone: 3 }, { wood: 6, stone: 11 }] };
    const session = createGameSession({ config: cfg, now: () => 0 });
    session.newRun(1); expect(session.chooseOffer(0).ok).toBe(true);
    const origin = legalCoreSites(session.state)[0];
    expect(session.placeCore(origin).ok).toBe(true); session.advance(cfg.animation.spreadMaxMs);
    expect(session.placeBuilding(origin, 0, 'fixture').ok).toBe(true);
    expect(session.state.status).toBe('playing');
    expect(session.chooseOffer(0).ok).toBe(true);
    const held = [...session.state.coreStack];
    const events: SessionEvent[] = []; session.subscribe(e => events.push(e));
    const final = session.placeBuilding(origin, 1, 'fixture');
    expect(final.ok).toBe(true);
    if (final.ok) expect(final.value.payouts.map(p => p.kind)).toEqual(['base', 'pair']);
    expect(session.state.lifetime).toEqual({ wood: 6, stone: 11 });
    expect(session.state.thresholdIndex).toBe(2);
    expect(session.state.status).toBe('won');
    expect(session.state.coreStack).toEqual(held);
    expect(session.state.pendingOffer).toBeNull();
    expect(session.state.hexes[origin].slots[2].building).toBeNull();
    expect(legalCoreSites(session.state).length).toBeGreaterThan(0);
    expect(events.filter(e => e.type === 'coreAwarded' || e.type === 'offerShown')).toEqual([]);
    expect(events.filter(e => e.type === 'runEnded')).toHaveLength(1);
    expect(events.findIndex(e => e.type === 'payouts')).toBeLessThan(events.findIndex(e => e.type === 'runEnded'));
  });
  it('W2: consumed final threshold wins despite empty slots, legal sites, held cores, offer and active spread', () => {
    const s = makeTestState({ config, cols: 3, rows: 1, hex: c => ({ biome: c === 0 ? 'forest' : null }) });
    s.lifetime = { wood: 10, stone: 10 }; s.thresholdIndex = 1;
    s.coreStack = ['arctic']; s.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    s.activeSpread = { result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 }, revealed: 0, locked: {} };
    const before = structuredClone(s);
    expect(checkWin(s)).toBe(true); expect(s).toEqual(before);
    s.thresholdIndex = 0; expect(checkWin(s)).toBe(false); // Session consumes thresholds after the transaction.
  });
  it('W3: exhausted board before the final threshold automatically loses in the final placement command', () => {
    const cfg: GameConfig = { ...DEFAULT_CONFIG, ...config,
      map: { ...DEFAULT_CONFIG.map, cols: 1, rows: 1, levels: 1,
        params: { ...DEFAULT_CONFIG.map.params, mountainClustersMin: 0, mountainClustersMax: 0,
          hillShareMin: 0, hillShareMax: 0, riverSourceChance: 0, basinChance: 0, woodsChance: 0, woodsMidBonus: 0, marshChance: 0, marshLowBonus: 0, marshWaterBonus: 0 } },
      buildings: { fixture: { id: 'fixture', name: 'Fixture', cost: {}, baseYield: { wood: 1 } } },
      thresholds: [{ wood: 1000 }] };
    const session = createGameSession({ config: cfg, now: () => 0 }); session.newRun(1);
    expect(session.chooseOffer(0).ok).toBe(true); expect(session.placeCore(0).ok).toBe(true);
    session.advance(cfg.animation.spreadMaxMs);
    const events: SessionEvent[] = []; session.subscribe(e => events.push(e));
    for (const slot of [0, 1, 2] as const) expect(session.placeBuilding(0, slot, 'fixture').ok).toBe(true);
    expect(session.state.thresholdIndex).toBe(0); expect(session.state.status).toBe('lost');
    expect(events.filter(e => e.type === 'runEnded')).toMatchObject([{ status: 'lost' }]);
    expect(checkWin(session.state)).toBe(false);
  });
  it('W4: a full board can still avoid loss when an unpaid replacement combo yields resources', () => {
    const s = makeTestState({ config: { ...config,
      buildings: { ...config.buildings, other: { id: 'other', name: 'Other', cost: {}, baseYield: { wood: 1 } } },
      rosters: { ...config.rosters!, forest: ['fixture', 'other'] },
      combos: [{ id: 'escape', name: 'Escape', buildings: ['fixture', 'other'], amount: { wood: 3 } }] },
      cols: 1, rows: 1, hex: () => ({ biome: 'forest' }) });
    for (const slot of s.hexes[0].slots) { slot.building = 'fixture'; slot.yieldPaid = true; }
    s.hexes[0].everCompleted = true;
    expect(isProvablySoftLocked(s)).toBe(false);
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
