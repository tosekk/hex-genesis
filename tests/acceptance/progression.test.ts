import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/config';
import type { GameSession, SessionEvent } from '../../src/core/contracts';
import type { GameConfig, SlotIndex } from '../../src/core/types';
import { createGameSession } from '../../src/game/session';
import { legalCoreSites } from '../../src/sim/spread/spread';

// Small deterministic fixture payouts expose session sequencing, not placeholder balance.
const config: GameConfig = {
  ...DEFAULT_CONFIG,
  startingResources: { wood: 100, stone: 100 },
  buildings: { probe: { id: 'probe', name: 'Acceptance fixture', cost: { wood: 1 }, baseYield: { wood: 2, stone: 2 } } },
  rosters: { forest: ['probe'], desert: ['probe'], arctic: ['probe'], steppe: ['probe'], taiga: ['probe'], polarDesert: ['probe'] },
  combos: [], terrainBonuses: [], zoneModifiers: {}, adjacencyAmount: {},
  thresholds: [{ wood: 2, stone: 2 }, { wood: 4, stone: 4 }, { wood: 6, stone: 6 }, { wood: 8, stone: 8 }],
};

function ready(): GameSession {
  const session = createGameSession({ config, now: () => 0 });
  session.newRun(1);
  expect(session.chooseOffer(0).ok).toBe(true);
  const site = legalCoreSites(session.state)[0];
  expect(site).toBeDefined();
  expect(session.placeCore(site).ok).toBe(true);
  session.advance(config.animation.spreadMaxMs);
  expect(session.state.activeSpread).toBe(null);
  return session;
}

function buildNext(session: GameSession) {
  for (const hex of session.state.hexes) {
    if (!hex.placeable || hex.biome === null || session.state.activeSpread?.locked[hex.id]) continue;
    const slot = hex.slots.findIndex(s => s.building === null);
    if (slot >= 0) {
      const result = session.placeBuilding(hex.id, slot as SlotIndex, 'probe');
      expect(result.ok).toBe(true);
      return hex.id;
    }
  }
  throw new Error('Acceptance setup requires an unlocked empty terraformed slot');
}

function twoHeldCores() {
  const session = ready();
  buildNext(session);
  expect(session.chooseOffer(0).ok).toBe(true);
  buildNext(session);
  expect(session.chooseOffer(0).ok).toBe(true);
  expect(session.state.coreStack).toHaveLength(2);
  return session;
}

describe('C3 real-session progression acceptance (sonnet session, astra offers)', () => {
  // Expected failure: sonnet session unlocks at 4650 ms, before the last 350 ms flip (C3-FLIP).
  it.fails('P5: held cores stay unusable until the active spread, including the last flip, finishes', () => {
    const session = twoHeldCores();
    const nextSite = legalCoreSites(session.state).at(-1)!;
    expect(session.placeCore(nextSite).ok).toBe(true);
    const followingSite = legalCoreSites(session.state).find(id => !session.state.activeSpread!.locked[id]);
    expect(followingSite).toBeDefined();
    expect(session.placeCore(followingSite!).ok).toBe(false);
    session.advance(config.animation.spreadMaxMs - config.animation.tileFlipMs);
    // The final tile has just STARTED flipping; it must still lock the spread.
    expect(session.state.activeSpread).not.toBe(null);
    expect(session.placeCore(followingSite!).ok).toBe(false);
    session.advance(config.animation.tileFlipMs);
    expect(session.state.activeSpread).toBe(null);
    expect(session.placeCore(followingSite!).ok).toBe(true);
  });
  it('P6: reaching a threshold with a held core adds the chosen second core to the stack', () => {
    const session = ready();
    buildNext(session);
    expect(session.state.pendingOffer).not.toBe(null);
    expect(session.chooseOffer(0).ok).toBe(true);
    const held = [...session.state.coreStack];
    expect(held).toHaveLength(1);
    buildNext(session);
    expect(session.state.coreStack).toEqual(held);
    expect(session.state.pendingOffer).not.toBe(null);
    const chosen = session.state.pendingOffer!.options[0];
    expect(session.chooseOffer(0).ok).toBe(true);
    expect(session.state.coreStack).toEqual([...held, chosen]);
  });
  it('P7: award immediately shows a modal offer after full payouts and gates further commands', () => {
    const session = ready();
    const events: SessionEvent[] = [];
    const lifetimeAtAward: number[] = [];
    session.subscribe(e => {
      events.push(e);
      if (e.type === 'coreAwarded') lifetimeAtAward.push(session.state.lifetime.wood ?? 0);
    });
    const built = buildNext(session);
    expect(session.state.pendingOffer).not.toBe(null);
    expect(lifetimeAtAward).toEqual([2]);
    const types = events.map(e => e.type);
    expect(types.indexOf('payouts')).toBeLessThan(types.indexOf('coreAwarded'));
    expect(types).toContain('offerShown');
    const before = structuredClone(session.state);
    expect(session.placeBuilding(built, 1, 'probe').ok).toBe(false);
    expect(session.demolish(built, 0).ok).toBe(false);
    expect(session.placeCore(legalCoreSites(session.state)[0]).ok).toBe(false);
    expect(session.preview(built, 1, 'probe')).toBe(null);
    expect(session.state).toEqual(before);
    expect(session.chooseOffer(0).ok).toBe(true);
    expect(session.state.pendingOffer).toBe(null);
    expect(session.placeBuilding(built, 1, 'probe').ok).toBe(true);
  });
});
