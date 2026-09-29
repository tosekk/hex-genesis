// Integration tests against the REAL offers/economy/endgame modules.
// Self-skips while any of them is still an O1 stub (NOT_IMPLEMENTED).
import { describe, expect, it } from 'vitest';
import type { SessionEvent } from '../core/contracts';
import { legalCoreSites } from '../sim/spread/spread';
import { createGameSession } from './session';

function realModulesReady(): boolean {
  try {
    const s = createGameSession({ now: () => 0 });
    s.newRun(1);
    s.chooseOffer(0);
    const site = legalCoreSites(s.state)[0];
    if (!s.placeCore(site).ok) return false;
    s.advance(5000);
    const hid = s.state.activeSpread ? -1 : s.state.cores[0];
    s.preview(hid, 0, s.state.config.rosters.forest[0]);
    s.placeBuilding(hid, 0, s.state.config.rosters.forest[0]);
    return true;
  } catch (e) {
    return !String(e).includes('NOT_IMPLEMENTED');
  }
}

const ready = realModulesReady();
const d = describe.skipIf(!ready);

function boot() {
  const session = createGameSession({ now: () => 0 });
  const events: SessionEvent[] = [];
  session.subscribe((e) => events.push(e));
  session.newRun(123);
  return { session, events };
}

d('GameSession (real modules)', () => {
  it('1: offer blocks placement until chosen', () => {
    const { session } = boot();
    expect(session.state.pendingOffer).not.toBeNull();
    expect(session.placeCore(legalCoreSites(session.state)[0]).ok).toBe(false);
    expect(session.chooseOffer(0).ok).toBe(true);
    expect(session.state.coreStack.length).toBe(1);
  });

  it('2+4: one spread at a time; advance(5000) reveals every claim', () => {
    const { session, events } = boot();
    session.chooseOffer(0);
    const site = legalCoreSites(session.state)[0];
    const r = session.placeCore(site);
    expect(r.ok).toBe(true);
    expect(session.placeCore(site).ok).toBe(false);
    session.advance(5000);
    const n = events.filter((e) => e.type === 'tilesRevealed')
      .reduce((a, e) => a + (e as { hexIds: number[] }).hexIds.length, 0);
    expect(session.state.activeSpread).toBeNull();
    if (r.ok) expect(n).toBe(r.value.claims.length);
  });

  it('8: same seed + script → same state', () => {
    const run = () => {
      const { session } = boot();
      session.chooseOffer(1);
      session.placeCore(legalCoreSites(session.state)[0]);
      session.advance(777);
      session.advance(5000);
      return structuredClone({ ...session.state, runStartMs: 0, runEndMs: 0 });
    };
    expect(run()).toEqual(run());
  });
});
