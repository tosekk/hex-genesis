// O4/O8 end-to-end autoplay against the REAL modules, under the §41 rule changed on 2026-09-30:
// win = the final threshold is reached; loss = the board runs out of room (§42).
// Self-skips while a sim module is a NOT_IMPLEMENTED stub, or if checkWin ever reverts to the old rule
// (assertInvariants encodes the new one; sonnet's S8 `c63b56d` implements it).
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/config';
import type { SessionEvent } from '../../src/core/contracts';
import { createInitialState } from '../../src/core/state';
import type { GameState, SlotIndex } from '../../src/core/types';
import { createGameSession } from '../../src/game/session';
import { placeBuilding, previewPlacement, rosterFor } from '../../src/sim/economy';
import { checkWin, isProvablySoftLocked } from '../../src/sim/endgame';
import { awardCore, resolveOffer } from '../../src/sim/offers';
import { isHexLocked, legalCoreSites } from '../../src/sim/spread/spread';
import { applyAction, expectSameRun, formatReport, report, runBot, snapshot } from './bot';
import { assertInvariants } from './invariants';

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
// New §41: every threshold consumed ⇒ win, even on a dead board with legal core sites left.
const winProbe = createInitialState(1, DEFAULT_CONFIG, 0);
winProbe.thresholdIndex = DEFAULT_CONFIG.thresholds.length;
const newWinRule = ready && checkWin(winProbe);

const FINAL = DEFAULT_CONFIG.thresholds.length;
// Default `npm test` stays under 60 s: a bounded sample. E2E_FULL=1 (npm run test:e2e-full) runs every seed.
const FULL = process.env.E2E_FULL === '1';
const GREEDY_SEEDS = FULL ? [1, 2, 3, 4, 5] : [1, 2, 3];
const SPAM_SEEDS = FULL ? [1, 2, 3] : [1];
const REPLAY_SEEDS = FULL ? [1, 4] : [1];
const session = () => createGameSession({ now: () => 0 });
const finish = (s: ReturnType<typeof session>) => { for (let i = 0; i < 1000 && s.state.activeSpread; i++) s.advance(250); };

describe.skipIf(!newWinRule)('autoplay under the §41 win rule (real modules)', () => {
  it.each(GREEDY_SEEDS)('seed %i greedy: ends in a win or a loss; invariants hold every step', (seed) => {
    const r = runBot(session(), seed);
    report(formatReport(r));
    expect(r.placements).toBeGreaterThan(0);
    expect(['terminal', 'stuck']).toContain(r.stop);
    if (r.status === 'won') expect(r.thresholdsReached).toBe(FINAL);
  }, 60_000);

  it.each(SPAM_SEEDS)('seed %i spam: ends (loss expected once N8 is tuned); invariants hold every step', (seed) => {
    const r = runBot(session(), seed, { strategy: 'spam' });
    report(formatReport(r));
    expect(['terminal', 'stuck']).toContain(r.stop);
  }, 60_000);

  it('the final threshold wins at once: mid-spread, with a held core and empty slots, no offer (§41)', () => {
    const s = session();
    s.newRun(1);
    expect(s.chooseOffer(0).ok).toBe(true);
    expect(s.placeCore(legalCoreSites(s.state)[0]).ok).toBe(true);
    finish(s);
    // Test-only setup (a scenario, not play): grant a second core, start its spread, and hold a third.
    const st = s.state as GameState;
    st.coreStack.push('arctic', 'desert');
    const far = legalCoreSites(s.state).at(-1)!;
    expect(s.placeCore(far, 0).ok).toBe(true);
    expect(s.state.activeSpread).not.toBeNull();
    st.resources = { wood: 99, stone: 99, water: 99, food: 99 };
    // A buildable tile from the first spread, outside the active claim set.
    const hex = s.state.hexes.find((h) => h.placeable && h.biome !== null && !isHexLocked(s.state, h.id) && h.slots[0].building === null)!;
    const building = rosterFor(s.state, hex.id).find((b) => Object.values(previewPlacement(s.state, hex.id, 0, b).base).some((v) => v > 0))!;
    const base = previewPlacement(s.state, hex.id, 0, building).base;
    const res = Object.keys(base).find((k) => base[k] > 0)!;
    // One step short of the final threshold: every target met except `res`, which this placement supplies.
    st.thresholdIndex = FINAL - 1;
    st.lifetime = { ...DEFAULT_CONFIG.thresholds[FINAL - 1] };
    st.lifetime[res] = (st.lifetime[res] ?? 0) - 1;
    const events: SessionEvent[] = [];
    s.subscribe((e) => events.push(e));

    expect(s.placeBuilding(hex.id, 0 as SlotIndex, building).ok).toBe(true);

    expect(s.state.thresholdIndex).toBe(FINAL);
    expect(s.state.status).toBe('won');
    const types = events.map((e) => e.type);
    expect(types).toContain('runEnded');
    expect(events.find((e) => e.type === 'runEnded')).toMatchObject({ status: 'won' });
    expect(types).not.toContain('coreAwarded');
    expect(types).not.toContain('offerShown');
    expect(s.state.pendingOffer).toBeNull();
    expect(s.state.coreStack).toEqual(['desert']); // the held core did not block the win
    expect(s.state.activeSpread).not.toBeNull(); // neither did the unfinished spread
    expect(s.placeBuilding(hex.id, 1 as SlotIndex, building).ok).toBe(false); // the run is over
  });

  it('invariant: a building on a core hex is a violation (§10)', () => {
    const s = session();
    s.newRun(1);
    expect(s.chooseOffer(0).ok).toBe(true);
    expect(s.placeCore(legalCoreSites(s.state)[0]).ok).toBe(true);
    finish(s);
    const st = snapshot(s.state) as GameState;
    expect(() => assertInvariants(st)).not.toThrow();
    st.hexes[st.cores[0]].slots[0] = { building: rosterFor(st, st.cores[0])[0], yieldPaid: true };
    expect(() => assertInvariants(st)).toThrow(/core hex/);
  });

  it('same seed + same actions → same final state', () => {
    for (const seed of REPLAY_SEEDS) {
      const a = session();
      const r = runBot(a, seed);
      const b = session();
      b.newRun(seed);
      for (const act of r.actions) expect(applyAction(b, act)).toBe(true);
      expectSameRun(a.state, b.state);
    }
  }, 120_000);
});

