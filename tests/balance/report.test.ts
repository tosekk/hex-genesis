import { describe, expect, it } from 'vitest';
import type { RunReport } from './bot';
import { assess, renderReport, TARGETS } from './report';

function sample(strategy: RunReport['strategy'], seed: number): RunReport {
  return { seed, strategy, stop: strategy === 'combo' ? 'won' : 'board-full', outcome: strategy === 'combo' ? 'win' : 'loss', placements: 450, actions: 475, cores: 8, winPlacements: strategy === 'combo' ? 450 : null, softLocks: 0,
    lifetime: {}, resources: {}, livingSlots: 450, mapSlots: 600, boardUse: .75, openingStall: false, falseSoftLocks: 0, buildings: {}, legalSitesRemaining: 0, heldCores: 0, emptySlots: 0,
    thresholds: TARGETS.map((t, i) => strategy === 'spam' && i === 7 ? null : ({ placements: t * 50, fill: .9, boardUse: .5, lifetime: {}, stock: { wood: 6 }, biome: 'forest', maxCost: { wood: 2 } })) };
}
const samples = () => Array.from({ length: 50 }, (_, i) => [sample('spam', i + 1), sample('combo', i + 1)]).flat();
describe.skipIf(process.env.BALANCE !== '1')('v4 balance report acceptance', () => {
  it('requires 45/50 wins and rejects a detected false loss, while allowing legitimate losses', () => {
    const runs = samples(), combo = runs.filter(r => r.strategy === 'combo');
    for (const r of combo.slice(45)) { r.outcome = 'loss'; r.stop = 'soft-lock'; r.softLocks = 1; }
    expect(assess(runs).targets[0]).toBe(true);
    combo[44].outcome = 'stuck'; expect(assess(runs).targets[0]).toBe(false);
    combo[44].outcome = 'win'; runs[0].falseSoftLocks = 1; expect(assess(runs).targets[0]).toBe(false);
  });
  it('does not count unproven stalls or final-threshold completers as spam losses', () => {
    const runs = samples(), spam = runs.filter(r => r.strategy === 'spam');
    for (const r of spam.slice(45)) { r.outcome = 'stuck'; r.stop = 'stuck'; }
    expect(assess(runs).targets[1]).toBe(true);
    spam[44].thresholds[7] = sample('combo', 1).thresholds[7];
    expect(assess(runs).targets[1]).toBe(false);
  });
  it('uses winning all-map board use, not living fill or losing-run use', () => {
    const runs = samples(), combo = runs.filter(r => r.strategy === 'combo');
    expect(assess(runs).medianBoardUse).toBe(.75);
    for (const r of combo) r.boardUse = .65;
    expect(assess(runs).targets[2]).toBe(true);
    for (const r of combo) r.boardUse = .85;
    expect(assess(runs).targets[2]).toBe(true);
    for (const r of combo) r.boardUse = .851;
    expect(assess(runs).targets[2]).toBe(false);
    for (const r of combo) r.outcome = 'loss';
    expect(assess(runs).targets[2]).toBe(false);
  });
  it('rejects even one combo opening stall, including seed 35', () => {
    const runs = samples(); runs.find(r => r.strategy === 'spam')!.openingStall = true;
    expect(assess(runs).targets[3]).toBe(true);
    runs.find(r => r.strategy === 'combo' && r.seed === 35)!.openingStall = true;
    expect(assess(runs).openingStalls).toEqual([35]);
    expect(assess(runs).targets[3]).toBe(false);
  });
  it('checks each checkpoint/resource ratio, handles zero costs and missing checkpoints', () => {
    const runs = samples(); expect(assess(runs).targets[4]).toBe(true);
    for (const r of runs) r.thresholds[2]!.stock.water = 1;
    expect(assess(runs).targets[4]).toBe(false);
    for (const r of runs) { r.thresholds[2]!.stock.water = 0; r.thresholds[6] = null; }
    expect(assess(runs).targets[4]).toBe(false);
  });
  it('requires every reached T7 below 60%, and at least 45/50 completers', () => {
    const runs = samples(), combo = runs.filter(r => r.strategy === 'combo');
    combo[0].thresholds[6]!.boardUse = .6;
    expect(assess(runs).targets[5]).toBe(false);
    combo[0].thresholds[6]!.boardUse = .599;
    for (const r of combo.slice(45)) r.thresholds[6] = null;
    expect(assess(runs).targets[5]).toBe(true);
    combo[44].thresholds[6] = null;
    expect(assess(runs).targets[5]).toBe(false);
  });
  it('retains censored threshold medians and renders all v4 evidence', () => {
    const runs = samples();
    for (const r of runs.filter(r => r.strategy === 'combo' && r.seed > 25)) r.thresholds = TARGETS.map(() => null);
    expect(assess(runs).combo).toEqual(TARGETS.map(() => Infinity));
    const report = renderReport(runs, 'v4 fixture', 20, 14, 10);
    for (const value of ['| T8 |', '6. T7 before', 'Opening stall', 'Board use / map slots', 'T7 stock : cost', 'unproven stalls']) expect(report).toContain(value);
  });
});
