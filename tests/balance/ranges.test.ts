import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { DEFAULT_CONFIG } from '../../src/config';
import { measure } from './measure';
import type { MeasureOptions } from './measure';
import { renderReport, seedRange } from './report';
import type { RunReport } from './bot';

describe('Night 2 disjoint seed ranges', () => {
  it('labels actual bounds and does not imply missing seeds were sampled', () => {
    const original = JSON.parse(readFileSync('tests/balance/v5-round-6.json', 'utf8')).runs as RunReport[];
    const runs = original.map(r => ({ ...r, seed: r.seed + 100 }));
    expect(renderReport(runs, 'fixture', 20, 14, 1)).toContain('seeds 101–150');
    expect(seedRange(runs.filter(r => [101, 103].includes(r.seed)))).toBe('101, 103');
    expect(seedRange([])).toBe('none');
  });
  it('rejects invalid ranges and policy lists before launching workers', async () => {
    const cases: [number, MeasureOptions][] = [[0, {}], [1, { firstSeed: 0 }], [1, { firstSeed: 1.5 }], [1, { strategies: [] }], [1, { strategies: ['spam', 'spam'] }]];
    for (const [count, options] of cases) {
      await expect(measure(DEFAULT_CONFIG, count, options)).rejects.toThrow('Invalid measurement');
    }
  });
});
