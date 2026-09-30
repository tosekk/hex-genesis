import { describe, expect, it } from 'vitest';
import type { RunReport } from './bot';
import { assess, renderReport, TARGETS } from './report';

function sample(strategy: RunReport['strategy'], seed: number): RunReport {
  return { seed, strategy, stop: 'won', placements: 600, actions: 621, cores: 7, winPlacements: 600, softLocks: 0,
    lifetime: {}, resources: {}, livingSlots: 600, buildings: {}, legalSitesRemaining: 0, heldCores: 0, emptySlots: 0,
    thresholds: TARGETS.map(placements => ({ placements: strategy === 'spam' ? placements * 2 : placements, fill: 0.9, lifetime: {} })) };
}
const samples = () => Array.from({ length: 50 }, (_, i) => [sample('spam', i + 1), sample('combo', i + 1)]).flat();
describe.skipIf(process.env.BALANCE !== '1')('balance report acceptance', () => {
  it('does not hide failed seeds behind successful-completer medians', () => {
    const runs = samples();
    for (const run of runs.filter(r => r.strategy === 'combo' && r.seed > 25)) run.thresholds = TARGETS.map(() => null);
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
  it('requires both T6 completion and a win, and uses the v3 fill exception for zero completers', () => {
    const runs = samples();
    for (const run of runs) run.thresholds[5] = null;
    const result = assess(runs);
    expect(result.wins).toBe(50);
    expect(result.reachable).toBe(false);
    expect(result.noCoasting).toBe(true);
  });
  it('requires 48/50 T6 and 45/50 wins, with no soft-lock declarations', () => {
    const runs = samples(), combo = runs.filter(r => r.strategy === 'combo');
    for (const run of combo.slice(45)) { run.stop = 'stuck'; run.winPlacements = null; }
    for (const run of combo.slice(48)) run.thresholds[5] = null;
    expect(assess(runs).reachable).toBe(true);
    combo[47].thresholds[5] = null;
    expect(assess(runs).reachable).toBe(false);
    combo[47].thresholds[5] = { placements: 270, fill: .5, lifetime: {} };
    combo[44].stop = 'stuck';
    expect(assess(runs).reachable).toBe(false);
    combo[44].stop = 'won'; runs[0].softLocks = 1;
    expect(assess(runs).reachable).toBe(false);
  });
  it('exempts T1 while requiring T7/T8 in band and before the median win', () => {
    const runs = samples();
    for (const run of runs) run.thresholds[0]!.placements = 2;
    expect(assess(runs).pacing).toBe(true);
    for (const run of runs.filter(r => r.strategy === 'combo')) run.winPlacements = 450;
    expect(assess(runs).lateBeforeWin).toBe(false);
    expect(assess(runs).pacing).toBe(false);
  });
  it('checks combo advantage at T4–T6 only and renders late fills and final legal sites', () => {
    const runs = samples();
    for (const run of runs.filter(r => r.strategy === 'spam')) { run.thresholds[6] = null; run.thresholds[7] = null; }
    expect(assess(runs).combosMatter).toBe(true);
    const report = renderReport(runs, 'v3 fixture', 20, 14, 10);
    expect(report).toContain('| T7 |'); expect(report).toContain('| T8 |');
    expect(report).toContain('T7 fill | T8 fill');
    expect(report).toContain('Legal core sites left');
  });
});
