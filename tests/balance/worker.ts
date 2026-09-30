// Measurement subprocess: real modules, unchanged commands and scoring, no mocks.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { runBalance } from './bot';
import type { Strategy } from './bot';
import { auditState } from './stuck/audit';
import type { GameConfig } from '../../src/core/types';
const [path, start, end, strategiesArg, auditDirectory] = process.argv.slice(2);
const config = JSON.parse(readFileSync(path, 'utf8')) as GameConfig;
const strategies = JSON.parse(strategiesArg ?? '["spam","combo","random"]') as Strategy[];
for (let seed = Number(start); seed <= Number(end); seed++) {
  for (const strategy of strategies) {
    const run = runBalance(seed, strategy, config, 1500, auditDirectory ? (state, report) => {
      const audit = auditState(state);
      const snapshot = JSON.stringify(state);
      const stateHash = createHash('sha256').update(snapshot).digest('hex');
      const stem = `${strategy}-${seed}`;
      const snapshotFile = audit.falsePositive || audit.falseNegative || audit.classification === 'unknown' ? `${stem}.state.json` : null;
      if (snapshotFile) writeFileSync(join(auditDirectory, snapshotFile), snapshot + '\n');
      writeFileSync(join(auditDirectory, `${stem}.json`), JSON.stringify({ seed, strategy, actions: report.actions, placements: report.placements, stateHash, snapshotFile, report, audit }, null, 2) + '\n');
    } : undefined);
    process.stdout.write(JSON.stringify(run) + '\n');
  }
}
