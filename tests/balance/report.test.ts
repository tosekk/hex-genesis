import { describe, expect, it } from 'vitest';
import type { RunReport } from './bot';
import { assess, TARGETS } from './report';

function sample(strategy: RunReport['strategy'], seed: number): RunReport {
  return { seed, strategy, stop: 'won', placements: 600, actions: 621, cores: 7, winPlacements: 600, softLocks: 0,
    lifetime: {}, resources: {}, livingSlots: 600, buildings: {}, legalSitesRemaining: 0, heldCores: 0, emptySlots: 0,
    thresholds: TARGETS.map(placements => ({ placements: strategy === 'spam' ? placements * 2 : placements, fill: 0.9, lifetime: {} })) };
}
const samples = () => Array.from({ length: 20 }, (_, i) => [sample('spam', i + 1), sample('combo', i + 1)]).flat();
describe.skipIf(process.env.BALANCE !== '1')('balance report acceptance', () => {
  it('does not hide failed seeds behind successful-completer medians', () => {
    const runs = samples();
    for (const run of runs.filter(r => r.strategy === 'combo' && r.seed > 10)) run.thresholds = TARGETS.map(() => null);
    const result = assess(runs);
    expect(result.combo).toEqual(TARGETS.map(() => Infinity));
    expect(result.pacing).toBe(false);
    expect(result.reachable).toBe(false);
    expect(result.combosMatter).toBe(false);
  });
  it('fails the never-before-70% rule for one early seed even if the median fill passes', () => {
    const runs = samples();
    runs[0].thresholds[5]!.fill = 0.69;
    expect(assess(runs).noCoasting).toBe(false);
  });
  it('requires both T6 completion and a win, and never awards a fill pass to zero completers', () => {
    const runs = samples();
    for (const run of runs) run.thresholds[5] = null;
    const result = assess(runs);
    expect(result.wins).toBe(20);
    expect(result.reachable).toBe(false);
    expect(result.noCoasting).toBe(false);
  });
});
