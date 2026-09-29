// Same autoplay as autoplay.test.ts, but sim functions that are still NOT_IMPLEMENTED stubs are
// replaced by tests/e2e/fallbacks.ts. Real implementations are always preferred when present.
// Delete this file once every module is real (autoplay.test.ts then covers everything).
import { describe, expect, it, vi } from 'vitest';
import { createGameSession } from '../../src/game/session';
import { applyAction, expectSameRun, formatReport, report, runBot } from './bot';
import { fallbackUsed } from './fallbacks';

vi.mock('../../src/sim/offers', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../src/sim/offers')>();
  const { fakeOffers, withFallback } = await import('./fallbacks');
  return {
    ...real,
    awardCore: withFallback('awardCore', real.awardCore, fakeOffers.awardCore),
    reshuffleOffer: withFallback('reshuffleOffer', real.reshuffleOffer, fakeOffers.reshuffleOffer),
    resolveOffer: withFallback('resolveOffer', real.resolveOffer, fakeOffers.resolveOffer),
  };
});
vi.mock('../../src/sim/endgame', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../src/sim/endgame')>();
  const { fakeEndgame, withFallback } = await import('./fallbacks');
  return {
    ...real,
    checkWin: withFallback('checkWin', real.checkWin, fakeEndgame.checkWin),
    isProvablySoftLocked: withFallback('isProvablySoftLocked', real.isProvablySoftLocked, fakeEndgame.isProvablySoftLocked),
  };
});

const session = () => createGameSession({ now: () => 0 });

describe('autoplay with fallbacks for unfinished modules', () => {
  it.each([1, 2, 3, 4, 5])('seed %i: plays without exceptions; invariants hold every step', (seed) => {
    const r = runBot(session(), seed);
    report(formatReport(r) + (fallbackUsed.size ? `\n  (fallbacks: ${[...fallbackUsed].join(', ')})` : ''));
    expect(r.placements).toBeGreaterThan(0);
    expect(r.stop).not.toBe('cap');
  }, 60_000);

  it('same seed + same actions → same final state', () => {
    const a = session();
    const r = runBot(a, 3);
    const b = session();
    b.newRun(3);
    for (const act of r.actions) expect(applyAction(b, act)).toBe(true);
    expectSameRun(a.state, b.state);
  }, 60_000);
});
