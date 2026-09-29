// O4 end-to-end autoplay against the REAL modules only. Self-skips while any sim module the
// session calls is still a NOT_IMPLEMENTED stub (see autoplay.fallback.test.ts meanwhile).
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/config';
import { createInitialState } from '../../src/core/state';
import { createGameSession } from '../../src/game/session';
import { placeBuilding, rosterFor } from '../../src/sim/economy';
import { checkWin, isProvablySoftLocked } from '../../src/sim/endgame';
import { awardCore, resolveOffer } from '../../src/sim/offers';
import { applyAction, expectSameRun, formatReport, report, runBot } from './bot';

function implemented(fn: () => unknown): boolean {
  try { fn(); return true; } catch (e) { return !(e instanceof Error && e.message.includes('NOT_IMPLEMENTED')); }
}
const probe = createInitialState(1, DEFAULT_CONFIG, 0);
const ready = [
  () => awardCore(probe),
  () => resolveOffer(probe, 0),
  () => checkWin(probe),
  () => isProvablySoftLocked(probe),
  () => rosterFor(probe, 0),
  () => placeBuilding(probe, 0, 0, 'none'),
].every(implemented);

const session = () => createGameSession({ now: () => 0 });

describe.skipIf(!ready)('autoplay (real modules)', () => {
  it.each([1, 2, 3, 4, 5])('seed %i: plays without exceptions; invariants hold every step', (seed) => {
    const r = runBot(session(), seed);
    report(formatReport(r));
    expect(r.placements).toBeGreaterThan(0);
    expect(r.stop).not.toBe('cap');
  }, 60_000);

  it('same seed + same actions → same final state', () => {
    for (const seed of [1, 4]) {
      const a = session();
      const r = runBot(a, seed);
      const b = session();
      b.newRun(seed);
      for (const act of r.actions) expect(applyAction(b, act)).toBe(true);
      expectSameRun(a.state, b.state);
    }
  }, 120_000);
});
