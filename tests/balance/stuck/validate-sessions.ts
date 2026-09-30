import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { runBalance } from '../bot';
import type { RunReport } from '../bot';
import type { StuckAudit } from './audit';
import { replaySessionWitness } from './session-replay';

const archive = JSON.parse(readFileSync('tests/balance/stuck/audit-1-100.json', 'utf8'));
const results: { seed: number; strategy: string; botActions: number; witnessActions: number; ok: boolean; replayedActions: number; reason: string | null; snapshotFile: string | null }[] = [];
for (const record of archive.records as { seed: number; report: RunReport; audit: StuckAudit; stateHash: string }[]) {
  if (!record.audit.witness) continue;
  runBalance(record.seed, record.report.strategy, archive.config, 1500, (state, report) => {
    assert.deepEqual(report, record.report);
    assert.equal(createHash('sha256').update(JSON.stringify(state)).digest('hex'), record.stateHash);
    const replay = replaySessionWitness(state, record.audit.witness!);
    let snapshotFile: string | null = null;
    if (!replay.ok) {
      mkdirSync('tests/balance/stuck/states', { recursive: true });
      snapshotFile = `states/${report.strategy}-${report.seed}-session-block.json`;
      writeFileSync(`tests/balance/stuck/${snapshotFile}`, JSON.stringify(replay.blockedState, null, 2) + '\n');
    }
    results.push({ seed: report.seed, strategy: report.strategy, botActions: report.actions, witnessActions: record.audit.witness!.actions.length,
      ok: replay.ok, replayedActions: replay.actions, reason: replay.ok ? null : replay.reason, snapshotFile });
  });
}
const output = { head: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  checked: results.length, passed: results.filter(r => r.ok).length, blocked: results.filter(r => !r.ok).length, results };
writeFileSync('tests/balance/stuck/session-replays.json', JSON.stringify(output, null, 2) + '\n');
console.log({ checked: output.checked, passed: output.passed, blocked: output.blocked });
