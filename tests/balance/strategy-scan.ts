import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { DEFAULT_CONFIG } from '../../src/config';
import { renderStrategies, strategyStats } from './strategies';
import type { RunReport } from './bot';

const cohorts = ['1-100', '101-200'].map(range => {
  const archive = JSON.parse(readFileSync(`tests/balance/night2-${range}.json`, 'utf8'));
  assert.deepEqual(archive.config, DEFAULT_CONFIG);
  return { range, runs: archive.runs as RunReport[] };
});
cohorts.push({ range: '1-200', runs: cohorts.flatMap(c => c.runs) });
let text = '# Night 2 — strategy concentration\n\nFrozen v5 round6 (`b76c051`), unchanged combo policy. All wins and non-wins are included. Pair/triple payout observations use actual paid events; adjacency is separate and is not attributed to a named recipe. Both event frequency and paid resource units are ranked to make “most-paid” explicit. Building names/zero-use entries come from the full frozen config.\n\n';
for (const cohort of cohorts) text += renderStrategies(cohort.runs, DEFAULT_CONFIG, `Seeds ${cohort.range.replace('-', '–')}`) + '\n';
writeFileSync('tests/balance/STRATEGIES.md', text);
writeFileSync('tests/balance/night2-strategies.json', JSON.stringify(cohorts.map(c => ({ range: c.range, ...strategyStats(c.runs, DEFAULT_CONFIG) })), null, 2) + '\n');
console.log(strategyStats(cohorts[2].runs, DEFAULT_CONFIG));
