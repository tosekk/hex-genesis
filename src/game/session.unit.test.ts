// Session logic against tiny fakes of offers/economy/endgame, so it is testable
// independent of other agents' progress. Real-module coverage: session.test.ts.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { SessionEvent } from '../core/contracts';
import { err, ok } from '../core/result';
import type { GameState } from '../core/types';

const flags = { win: false, lock: false };

vi.mock('../sim/offers', () => ({
  awardCore: (s: GameState) => {
    s.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    return s.pendingOffer;
  },
  reshuffleOffer: (s: GameState) => {
    if (s.reshufflesUsed >= 1) return err('none left');
    s.reshufflesUsed++;
    s.pendingOffer = { options: ['arctic', 'forest'], reshuffled: true };
    return ok(s.pendingOffer);
  },
  resolveOffer: (s: GameState, i: 0 | 1) => {
    const b = s.pendingOffer!.options[i];
    s.coreStack.push(b);
    s.pendingOffer = null;
    return ok(b);
  },
}));
vi.mock('../sim/economy', () => ({
  canPlaceBuilding: (s: GameState, id: number) => {
    if (id === 999) return err('Building is not in the current biome roster');
    return (s.resources.wood ?? 0) >= 1e6 ? ok(undefined) : err('anything at all');
  },
  previewPlacement: () => ({ cost: {}, affordable: true, slotAlreadyPaid: false, base: {}, baseBreakdown: { raw: {}, terrain: {}, zone: {} }, combos: [] }),
  placeBuilding: (s: GameState, id: number, slot: 0 | 1 | 2, b: string) => {
    if (s.hexes[id].biome === null) return err('dead');
    s.hexes[id].slots[slot].building = b;
    s.lifetime.wood = (s.lifetime.wood ?? 0) + 5;
    return ok({ payouts: [{ kind: 'base' as const, hexId: id, amount: { wood: 5 } }], discovered: [], firstCompletion: false });
  },
  demolishBuilding: (s: GameState, id: number, slot: 0 | 1 | 2) => {
    s.hexes[id].slots[slot].building = null;
    return ok({ building: 'x', refund: {} });
  },
  advanceThreshold: (s: GameState) => {
    if (s.thresholdIndex === 0 && (s.lifetime.wood ?? 0) >= 10) { s.thresholdIndex = 1; return true; }
    return false;
  },
}));
vi.mock('../sim/endgame', () => ({
  checkWin: () => flags.win,
  isProvablySoftLocked: () => flags.lock,
}));

import { createGameSession } from './session';

const ORIGIN = 3 * 20 + 3;
function boot() {
  let t = 1000;
  const session = createGameSession({ now: () => t });
  const events: SessionEvent[] = [];
  session.subscribe((e) => events.push(e));
  return { session, events, setNow: (v: number) => { t = v; } };
}
const types = (ev: SessionEvent[]) => ev.map((e) => e.type);
function startSpreadAt(session: ReturnType<typeof boot>['session'], id = ORIGIN) {
  session.chooseOffer(0);
  const r = session.placeCore(id);
  expect(r.ok).toBe(true);
}

beforeEach(() => { flags.win = false; flags.lock = false; });

describe('GameSession (fakes)', () => {
  it('1: newRun shows an offer; commands are rejected until chosen', () => {
    const { session, events } = boot();
    session.newRun(7);
    expect(types(events)).toEqual(['runStarted', 'coreAwarded', 'offerShown']);
    expect(session.state.pendingOffer).not.toBeNull();
    expect(session.placeCore(ORIGIN).ok).toBe(false);
    expect(session.placeBuilding(ORIGIN, 0, 'x').ok).toBe(false);
    expect(session.demolish(ORIGIN, 0).ok).toBe(false);
    expect(session.chooseOffer(0).ok).toBe(true);
    expect(session.state.coreStack).toEqual(['forest']);
    expect(session.placeCore(ORIGIN).ok).toBe(true);
  });

  it('2: second placeCore rejected while animating, accepted after finishing', () => {
    const { session } = boot();
    session.newRun(1);
    startSpreadAt(session);
    session.state.coreStack.push('desert');
    expect(session.placeCore(ORIGIN + 10 * 20 - 40).ok).toBe(false);
    session.advance(5000);
    expect(session.state.activeSpread).toBeNull();
    expect(session.placeCore(13 * 20 + 19).ok).toBe(true);
  });

  it('3: building on the active claim set is rejected; outside it is fine', () => {
    const { session } = boot();
    session.newRun(1);
    startSpreadAt(session);
    const claimed = session.state.activeSpread!.result.claims[0].hexId;
    expect(session.placeBuilding(claimed, 0, 'x').ok).toBe(false);
    expect(session.demolish(claimed, 0).ok).toBe(false);
    session.state.hexes[13 * 20 + 19].biome = 'forest';
    expect(session.placeBuilding(13 * 20 + 19, 0, 'x').ok).toBe(true);
  });

  it('4: advance(5000) reveals everything; event count matches claims', () => {
    const { session, events } = boot();
    session.newRun(1);
    startSpreadAt(session);
    const n = session.state.activeSpread!.result.claims.length;
    session.advance(5000);
    const revealed = events.filter((e) => e.type === 'tilesRevealed').flatMap((e) => (e as { hexIds: number[] }).hexIds);
    expect(revealed.length).toBe(n);
    expect(new Set(revealed).size).toBe(n);
    expect(types(events).at(-1)).toBe('spreadFinished');
    expect(session.state.activeSpread).toBeNull();
  });

  it('4b: reveal is paced, origin first', () => {
    const { session, events } = boot();
    session.newRun(1);
    startSpreadAt(session);
    session.advance(0);
    const first = events.find((e) => e.type === 'tilesRevealed') as { hexIds: number[] };
    expect(first.hexIds).toEqual([ORIGIN]);
    session.advance(500);
    expect(session.state.activeSpread!.revealed).toBeLessThan(session.state.activeSpread!.result.claims.length);
  });

  it('5: payouts precede coreAwarded/offerShown; lifetime updated first', () => {
    const { session, events } = boot();
    session.newRun(1);
    startSpreadAt(session);
    session.advance(5000);
    for (const id of [ORIGIN, ORIGIN + 1]) session.state.hexes[id].biome = 'forest';
    events.length = 0;
    session.placeBuilding(ORIGIN, 0, 'x');
    session.placeBuilding(ORIGIN, 1, 'x'); // lifetime 10 → threshold
    const t = types(events);
    const lastPayout = t.lastIndexOf('payouts');
    expect(lastPayout).toBeLessThan(t.lastIndexOf('coreAwarded'));
    expect(t.lastIndexOf('coreAwarded')).toBeLessThan(t.lastIndexOf('offerShown'));
    expect(session.state.lifetime.wood).toBe(10);
    expect(t.slice(0, 4)).toEqual(['hexChanged', 'payouts', 'resourcesChanged', 'hexChanged']);
  });

  it('6: threshold while holding an unplaced core → stack of 2', () => {
    const { session } = boot();
    session.newRun(1);
    session.chooseOffer(0); // holds one core, unplaced
    session.state.hexes[ORIGIN].biome = 'forest';
    session.placeBuilding(ORIGIN, 0, 'x');
    session.placeBuilding(ORIGIN, 1, 'x');
    expect(session.state.pendingOffer).not.toBeNull();
    session.chooseOffer(1);
    expect(session.state.coreStack.length).toBe(2);
  });

  it('7: endRun emits runEnded with stats', () => {
    const { session, events, setNow } = boot();
    session.newRun(42);
    setNow(6000);
    session.state.lifetime.wood = 3;
    session.endRun();
    const e = events.at(-1) as Extract<SessionEvent, { type: 'runEnded' }>;
    expect(e.status).toBe('ended');
    expect(e.stats).toEqual({ status: 'ended', lifetime: { wood: 3 }, elapsedMs: 5000, seed: 42 });
    expect(session.chooseOffer(0).ok).toBe(false);
    expect(session.placeCore(ORIGIN).ok).toBe(false);
  });

  it('win takes precedence over a just-awarded core and clears the offer', () => {
    const { session, events } = boot();
    session.newRun(1);
    session.chooseOffer(0);
    session.state.hexes[ORIGIN].biome = 'forest';
    session.placeBuilding(ORIGIN, 0, 'x');
    flags.win = true;
    session.placeBuilding(ORIGIN, 1, 'x');
    expect(session.state.status).toBe('won');
    expect(session.state.pendingOffer).toBeNull();
    expect(types(events).at(-1)).toBe('runEnded');
  });

  it('soft-lock ends the run as lost', () => {
    const { session } = boot();
    session.newRun(1);
    flags.lock = true;
    session.chooseOffer(0);
    expect(session.state.status).toBe('lost');
  });

  it('preview: unaffordable still previews (whatever the message); other failures return null', () => {
    const { session } = boot();
    session.newRun(1);
    session.chooseOffer(0);
    (session.state as GameState).resources = {};
    expect(session.preview(ORIGIN, 0, 'x')).not.toBeNull();
    expect(session.preview(999, 0, 'x')).toBeNull();
    expect(session.state.resources).toEqual({});
  });

  it('reshuffle emits a new offerShown', () => {
    const { session, events } = boot();
    session.newRun(1);
    events.length = 0;
    expect(session.reshuffleOffer().ok).toBe(true);
    expect(types(events)).toEqual(['offerShown']);
  });

  it('8: replay determinism', () => {
    const run = () => {
      const { session } = boot();
      session.newRun(9);
      session.chooseOffer(0);
      session.placeCore(ORIGIN);
      session.advance(1234);
      session.advance(5000);
      session.placeBuilding(ORIGIN, 0, 'x');
      const s = structuredClone({ ...session.state, runStartMs: 0, runEndMs: 0 });
      return s;
    };
    expect(run()).toEqual(run());
  });
});
