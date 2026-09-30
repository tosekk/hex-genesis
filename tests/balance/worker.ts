// Measurement subprocess: real modules, unchanged commands and scoring, no mocks.
import { readFileSync } from 'node:fs';
import { runBalance } from './bot';
import type { GameConfig } from '../../src/core/types';
const [path, start, end] = process.argv.slice(2);
const config = JSON.parse(readFileSync(path, 'utf8')) as GameConfig;
for (let seed = Number(start); seed <= Number(end); seed++) {
  for (const strategy of ['spam', 'combo', 'random'] as const) process.stdout.write(JSON.stringify(runBalance(seed, strategy, config)) + '\n');
}
