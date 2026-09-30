import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../src/config';
import type { RunReport } from './bot';
import { strategyStats, renderStrategies } from './strategies';

describe('Night 2 strategy concentration', () => {
  it('uses all placements, includes losers and zero-use buildings, and totals actual payouts', () => {
    const template = JSON.parse(readFileSync('tests/balance/v5-round-6.json', 'utf8')).runs[0] as RunReport;
    const id = Object.keys(DEFAULT_CONFIG.buildings)[0], recipe = DEFAULT_CONFIG.combos[0].id;
    const runs: RunReport[] = [
      { ...template, seed: 1, strategy: 'combo', startingBiome: 'forest', outcome: 'win', placements: 100, buildings: { [id]: 100 }, comboPayouts: { [recipe]: { count: 2, amount: { wood: 9 } } } },
      { ...template, seed: 2, strategy: 'combo', startingBiome: 'forest', outcome: 'stuck', placements: 10, buildings: { [id]: 10 }, comboPayouts: { [recipe]: { count: 1, amount: { wood: 3, food: 4 } } } },
      { ...template, strategy: 'spam' },
    ];
    const stats = strategyStats(runs, DEFAULT_CONFIG);
    expect(stats.placements).toBe(110);
    expect(stats.buildings[0]).toMatchObject({ count: 110, share: 1, dominantRuns: 2 });
    expect(stats.buildings).toHaveLength(Object.keys(DEFAULT_CONFIG.buildings).length);
    expect(stats.combos.find(c => c.id === recipe)).toMatchObject({ count: 3, total: 16, amount: { wood: 12, food: 4 } });
    expect(stats.biomes.find(b => b.biome === 'forest')).toMatchObject({ runs: 2, wins: 1, winRate: .5, losingSeeds: [2] });
    expect(stats.biomes.find(b => b.biome === 'arctic')!.winRate).toBeNull();
    expect(renderStrategies(runs, DEFAULT_CONFIG, 'fixture')).toContain('100.00% of all placements');
    runs[0].placements++;
    expect(() => strategyStats(runs, DEFAULT_CONFIG)).toThrow('Placement accounting');
  });
});
