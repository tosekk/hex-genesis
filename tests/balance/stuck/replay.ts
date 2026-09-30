import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runBalance } from '../bot';
import type { Strategy } from '../bot';
import { auditState, replayWitness } from './audit';

const strategy = process.argv[2] as Strategy, seed = Number(process.argv[3]);
if (!['spam', 'random'].includes(strategy) || !Number.isInteger(seed)) throw new Error('Usage: replay.ts spam|random SEED [AUDIT_JSON]');
const artifact = JSON.parse(readFileSync(process.argv[4] ?? 'tests/balance/stuck/audit-1-100.json', 'utf8'));
const record = artifact.records.find((r: { seed: number; strategy: string }) => r.seed === seed && r.strategy === strategy);
if (!record) throw new Error('Seed/policy absent from audit archive');
runBalance(seed, strategy, artifact.config, 1500, (state, report) => {
  assert.deepEqual(report, record.report, 'Bot replay changed');
  assert.equal(createHash('sha256').update(JSON.stringify(state)).digest('hex'), record.stateHash, 'Terminal snapshot changed');
  const audit = auditState(state);
  // An owner fix may legitimately change the detector verdict; retain independent evidence.
  assert.equal(audit.classification, record.audit.classification);
  if (record.audit.witness) {
    const recovered = replayWitness(state, record.audit.witness);
    console.log({ lifetimeBefore: state.lifetime, lifetimeAfter: recovered.lifetime, witness: record.audit.witness });
  }
  console.log({ seed, strategy, actions: report.actions, placements: report.placements, audit });
});
