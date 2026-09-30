import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { DEFAULT_CONFIG } from '../../src/config';
import { measure } from './measure';
import { assessV5, renderReport } from './report';
import type { RunReport } from './bot';

const frozen = JSON.parse(readFileSync('tests/balance/v5-round-6.json', 'utf8'));
assert.deepEqual(DEFAULT_CONFIG, frozen.config, 'Frozen v5 round6 config changed');
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const detectorBlob = execFileSync('git', ['hash-object', 'src/sim/endgame.ts'], { encoding: 'utf8' }).trim();
const configHash = createHash('sha256').update(JSON.stringify(DEFAULT_CONFIG)).digest('hex');
const combined: RunReport[] = [];
let totalElapsed = 0;
let report = '# Night 2 — frozen v5 generalization\n\nEconomy unchanged from `b76c051`. Policies unchanged; no tuning. The two disjoint cohorts and combined sample are all reported. Target c retains the historical all-seed median convention; per-seed exceptions are listed explicitly below.\n\n';
for (const firstSeed of [1, 101]) {
  const started = performance.now();
  const runs = await measure(DEFAULT_CONFIG, 100, { firstSeed });
  const elapsedMs = performance.now() - started;
  const label = `Frozen v5: seeds ${firstSeed}–${firstSeed + 99}`;
  assert.equal(runs.length, 300);
  for (let seed = firstSeed; seed < firstSeed + 100; seed++) for (const strategy of ['combo', 'spam', 'random']) {
    assert.equal(runs.filter(r => r.seed === seed && r.strategy === strategy).length, 1);
  }
  if (firstSeed === 1) for (const run of runs.filter(r => r.seed <= 50)) {
    const { startingBiome: _, comboPayouts: __, ...historical } = run;
    assert.deepEqual(historical, frozen.runs.find((r: RunReport) => r.seed === run.seed && r.strategy === run.strategy), 'Historical policy/outcome changed');
  }
  combined.push(...runs); totalElapsed += elapsedMs;
  writeFileSync(`tests/balance/night2-${firstSeed}-${firstSeed + 99}.json`, JSON.stringify({ label, head, detectorBlob, configHash, config: DEFAULT_CONFIG, elapsedMs, runs }, null, 2) + '\n');
  report += renderReport(runs, label, DEFAULT_CONFIG.map.cols, DEFAULT_CONFIG.map.rows, elapsedMs) + '\n';
  writeFileSync('tests/balance/NIGHT2.md', report);
  console.log(label, assessV5(runs));
}
report += renderReport(combined, 'Frozen v5: combined seeds 1–200', DEFAULT_CONFIG.map.cols, DEFAULT_CONFIG.map.rows, totalElapsed);
report += '\n## Same-seed T4 exceptions\n\nTarget c compares population medians, not every matched seed. The following careless runs reach T4 below 1.5× their same-seed combo run. Missing combo T4 is separately unassessable.\n\n';
for (const [first, last] of [[1, 100], [101, 200], [1, 200]]) for (const strategy of ['spam', 'random']) {
  const paired = combined.filter(r => r.strategy === strategy && r.seed >= first && r.seed <= last);
  const exceptions = paired.filter(r => {
    const c = combined.find(c => c.seed === r.seed && c.strategy === 'combo')!;
    return r.thresholds[3] && c.thresholds[3] && r.thresholds[3].placements < 1.5 * c.thresholds[3].placements;
  }).map(r => r.seed);
  const unassessable = paired.filter(r => !combined.find(c => c.seed === r.seed && c.strategy === 'combo')!.thresholds[3]).map(r => r.seed);
  report += `- ${first}–${last} ${strategy}: ${exceptions.length}/${paired.length} exceptions (${exceptions.join(', ') || 'none'}); missing combo T4: ${unassessable.join(', ') || 'none'}.\n`;
}
writeFileSync('tests/balance/NIGHT2.md', report);
console.log('Combined', assessV5(combined));
