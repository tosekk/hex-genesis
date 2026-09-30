import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/config';
import { makeTestState } from '../../src/core/testing';
import { placeBuilding } from '../../src/sim/economy';
import { PayoutScorer, runBalance } from './bot';
import { renderReport } from './report';
import { measure } from './measure';

const enabled = process.env.BALANCE === '1';
describe.skipIf(!enabled)('N2 opt-in balance harness', () => {
  it('scores undiscovered pair/triple/adjacency gains against real transactions without mutating inputs', () => {
    const state = makeTestState({ config: DEFAULT_CONFIG, resources: { wood: 999, stone: 999, water: 999, food: 999 }, hex: () => ({ biome: 'forest', terrain: 'plain' }) });
    for (const [id, slot, building] of [[21, 0, 'lumber_camp'], [21, 1, 'sawmill'], [22, 0, 'lumber_camp'], [22, 1, 'sawmill']] as const) expect(placeBuilding(state, id, slot, building).ok).toBe(true);
    state.discoveredCombos = [];
    const before = structuredClone(state);
    const scored = new PayoutScorer(state).score(state.hexes[22], 2, 'farm');
    expect(state).toEqual(before);
    const outcome = placeBuilding(state, 22, 2, 'farm');
    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.value.payouts.some(p => p.kind === 'triple')).toBe(true);
      expect(outcome.value.payouts.some(p => p.kind === 'adjacency')).toBe(true);
      expect(scored.base + scored.bonus).toBe(outcome.value.payouts.reduce((s, p) => s + Object.values(p.amount).reduce((a, b) => a + b, 0), 0));
    }
  });
  it('measures both deterministic bots and writes the reviewable report', async () => {
    const count = Number(process.env.BALANCE_SEEDS ?? 20);
    const width = Number(process.env.BALANCE_COLS ?? DEFAULT_CONFIG.map.cols);
    const height = Number(process.env.BALANCE_ROWS ?? DEFAULT_CONFIG.map.rows);
    const config = { ...DEFAULT_CONFIG, map: { ...DEFAULT_CONFIG.map, cols: width, rows: height } };
    const label = process.env.BALANCE_LABEL ?? 'Current v2 calibration';
    const file = process.env.BALANCE_FILE ?? 'current';
    if (!/^[a-z0-9-]+$/.test(file)) throw new Error('Invalid balance report file suffix');
    const started = performance.now();
    const runs = await measure(config, count);
    const elapsed = performance.now() - started;
    const section = renderReport(runs, label, width, height, elapsed);
    writeFileSync(`tests/balance/${file}.json`, JSON.stringify({ label, config, elapsedMs: elapsed, runs }, null, 2) + '\n');
    const reportPath = 'tests/balance/REPORT.md';
    const prior = process.env.BALANCE_APPEND === '1' && existsSync(reportPath) ? readFileSync(reportPath, 'utf8') : '# Economy v2 balance report\n\n';
    writeFileSync(reportPath, prior + section + '\n');
    console.info(section.split('| Seed |')[0]);
    expect(runBalance(1, 'combo', config)).toEqual(runs.find(r => r.seed === 1 && r.strategy === 'combo'));
    // Standard-board budget stays two minutes; larger informational previews scale with search area.
    const areaScale = Math.max(1, width * height / (DEFAULT_CONFIG.map.cols * DEFAULT_CONFIG.map.rows));
    expect(elapsed, 'standard 20-seed measurement budget is two minutes').toBeLessThan(count / 20 * 120_000 * areaScale * areaScale);
  }, 600_000);
});
