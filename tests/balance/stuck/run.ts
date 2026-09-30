import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { DEFAULT_CONFIG } from '../../../src/config';
import { measure } from '../measure';
import type { RunReport } from '../bot';
import type { StuckAudit } from './audit';

const firstSeed = Number(process.argv[2] ?? 1), count = Number(process.argv[3] ?? 100);
const frozen = JSON.parse(readFileSync('tests/balance/v5-round-6.json', 'utf8'));
assert.deepEqual(DEFAULT_CONFIG, frozen.config, 'Night 2 must not retune v5');
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const detectorBlob = execFileSync('git', ['hash-object', 'src/sim/endgame.ts'], { encoding: 'utf8' }).trim();
const auditDirectory = mkdtempSync(join(tmpdir(), 'astra-stuck-'));
interface Record { seed: number; strategy: string; actions: number; placements: number; stateHash: string; snapshotFile: string | null; report: RunReport; audit: StuckAudit; }
try {
  const runs = await measure(DEFAULT_CONFIG, count, { firstSeed, strategies: ['spam', 'random'], auditDirectory });
  const records = runs.map(run => {
    const record = JSON.parse(readFileSync(join(auditDirectory, `${run.strategy}-${run.seed}.json`), 'utf8')) as Record;
    assert.deepEqual(run, record.report);
    if (record.snapshotFile) {
      mkdirSync('tests/balance/stuck/states', { recursive: true });
      copyFileSync(join(auditDirectory, record.snapshotFile), join('tests/balance/stuck/states', record.snapshotFile));
      record.snapshotFile = `states/${record.snapshotFile}`;
    }
    return record;
  });
  const counts = Object.fromEntries(['recoverable', 'proven-dead', 'unknown', 'progression', 'won'].map(kind => [kind, records.filter(r => r.audit.classification === kind).length]));
  const falsePositives = records.filter(r => r.audit.falsePositive).map(r => `${r.strategy}-${r.seed}`);
  const falseNegatives = records.filter(r => r.audit.falseNegative).map(r => `${r.strategy}-${r.seed}`);
  const artifact = { firstSeed, lastSeed: firstSeed + count - 1, head, detectorBlob,
    configHash: createHash('sha256').update(JSON.stringify(DEFAULT_CONFIG)).digest('hex'), config: DEFAULT_CONFIG,
    counts, falsePositives, falseNegatives, records };
  const file = `tests/balance/stuck/audit-${firstSeed}-${firstSeed + count - 1}.json`;
  writeFileSync(file, JSON.stringify(artifact, null, 2) + '\n');
  let text = `# Night 2 stuck-state audit\n\nFrozen v5 round 6, seeds ${firstSeed}–${firstSeed + count - 1}, spam and random (${records.length} real-session terminal states). Source HEAD ${head}; endgame blob ${detectorBlob}.\n\n`;
  text += 'Every reported recovery is an actual sequence of legal demolitions/builds ending at its first positive payout, replayed against an untouched copy. Lost states are counterfactually reopened solely to audit the declaration. Audit goals enumerate refund-funded unpaid bases and all unpaid pair/triple assignments, retaining matching buildings and liquidating others only as needed. Before the first yield, rebuild/refund cycles cannot increase resources. Budget exhaustion or unresolved adjacency setup is **unknown**, never proof of death. This audit concerns the existence of any further payout, not whether a win remains possible.\n\n';
  text += `Classifications: ${Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join('; ')}. **False positives: ${falsePositives.length}. Proven missed dead states: ${falseNegatives.length}.**\n\n`;
  text += `Any anomalous or unresolved states are saved under states/ and indexed in [audit JSON](audit-${firstSeed}-${firstSeed + count - 1}.json). Recoverable cases carry seed, strategy, exact bot action/placement counts, terminal-state SHA-256, and full witness actions; replay regenerates the state from the frozen config.\n\n`;
  text += `Engine loss declarations: ${records.filter(r => r.audit.engineLost).length}. Bot stops: ${['stuck', 'board-full', 'won'].map(stop => `${stop} ${records.filter(r => r.report.stop === stop).length}`).join(', ')}. Witnesses are deterministic, not optimized for minimal action count (maximum ${Math.max(0, ...records.map(r => r.audit.witness?.actions.length ?? 0))} actions).\n\nReplay: \`node --no-warnings --experimental-strip-types --experimental-loader ./tests/balance/resolve-ts.mjs tests/balance/stuck/replay.ts random 22\` (or another archived policy/seed).\n\n`;
  text += '| Seed | Bot | Stop | Actions / placements | Detector | Audit | Witness builds / demolitions | Flag |\n|---|---|---|---|---|---|---|---|\n';
  for (const r of records) {
    const actions = r.audit.witness?.actions ?? [];
    text += `| ${r.seed} | ${r.strategy} | ${r.report.stop} | ${r.actions} / ${r.placements} | ${r.audit.detector} | ${r.audit.classification} | ${actions.filter(a => a.kind === 'build').length} / ${actions.filter(a => a.kind === 'demolish').length} | ${r.audit.falsePositive ? 'FALSE POSITIVE' : r.audit.falseNegative ? 'MISSED DEAD STATE' : r.audit.classification === 'unknown' ? 'UNRESOLVED' : '—'} |\n`;
  }
  writeFileSync('tests/balance/stuck/REPORT.md', text);
  console.log(JSON.stringify({ file: resolve(file), counts, falsePositives, falseNegatives }));
} finally {
  rmSync(auditDirectory, { recursive: true, force: true });
}
