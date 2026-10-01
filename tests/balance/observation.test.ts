import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { addRes } from '../../src/core/resources';
import { MAIN_BIOMES } from '../../src/core/types';
import type { Resources } from '../../src/core/types';
import { runBalance } from './bot';

describe('Night 2 observation preserves frozen v5 policy', () => {
  it.each([[1, 'spam'], [35, 'combo'], [22, 'random']] as const)('replays seed %i %s without changing historical outcomes', (seed, strategy) => {
    const archive = JSON.parse(readFileSync('tests/balance/v5-round-6.json', 'utf8'));
    let observed = false;
    const run = runBalance(seed, strategy, archive.config, 1500, (state, report) => {
      observed = true;
      const history: Record<string, { count: number; amount: Resources }> = {};
      for (const h of state.hexes) for (const paid of [...h.pairPaid, h.triplePaid]) if (paid) {
        const entry = history[paid.comboId] ??= { count: 0, amount: {} };
        entry.count++; entry.amount = addRes(entry.amount, paid.amount);
      }
      expect(report.comboPayouts).toEqual(history);
      expect(MAIN_BIOMES).toContain(report.startingBiome);
    });
    expect(observed).toBe(true);
    const { startingBiome: _, comboPayouts: __, ...priorFields } = run;
    expect(priorFields).toEqual(archive.runs.find((r: { seed: number; strategy: string }) => r.seed === seed && r.strategy === strategy));
  });
});
