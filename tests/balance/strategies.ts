import { MAIN_BIOMES } from '../../src/core/types';
import type { GameConfig, Resources } from '../../src/core/types';
import type { RunReport } from './bot';
import { median, RESOURCES } from './report';

/** Observations of the unchanged greedy policy, never inputs into its decisions. */
export function strategyStats(runs: RunReport[], config: GameConfig) {
  const combo = runs.filter(r => r.strategy === 'combo');
  const placements = combo.reduce((sum, r) => sum + r.placements, 0);
  for (const r of combo) {
    if (!r.startingBiome || !r.comboPayouts) throw new Error('Missing Night 2 observation fields');
    if (Object.values(r.buildings).reduce((a, b) => a + b, 0) !== r.placements) throw new Error('Placement accounting mismatch');
    if (Object.keys(r.buildings).some(id => !config.buildings[id])) throw new Error('Unknown observed building');
    if (Object.keys(r.comboPayouts).some(id => !config.combos.some(c => c.id === id))) throw new Error('Unknown observed combo');
  }
  const buildings = Object.values(config.buildings).map(b => {
    const count = combo.reduce((sum, r) => sum + (r.buildings[b.id] ?? 0), 0);
    const shares = combo.map(r => r.placements ? (r.buildings[b.id] ?? 0) / r.placements : 0);
    return { id: b.id, name: b.name, count, share: placements ? count / placements : 0,
      medianShare: shares.length ? median(shares) : 0, maxShare: Math.max(0, ...shares), dominantRuns: shares.filter(s => s > .25).length };
  }).sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));
  const combos = config.combos.map(c => {
    const amount: Resources = {};
    let count = 0;
    for (const r of combo) {
      const paid = r.comboPayouts![c.id];
      if (!paid) continue;
      count += paid.count;
      for (const key of RESOURCES) amount[key] = (amount[key] ?? 0) + (paid.amount[key] ?? 0);
    }
    return { id: c.id, name: c.name, count, amount, total: Object.values(amount).reduce((a, b) => a + b, 0) };
  });
  const biomes = MAIN_BIOMES.map(biome => {
    const group = combo.filter(r => r.startingBiome === biome);
    const wins = group.filter(r => r.outcome === 'win');
    return { biome, runs: group.length, wins: wins.length, winRate: group.length ? wins.length / group.length : null,
      medianWinningUse: wins.length ? median(wins.map(r => r.boardUse)) : null, losingSeeds: group.filter(r => r.outcome !== 'win').map(r => r.seed) };
  });
  return { runs: combo.length, placements, buildings, combos, biomes };
}

export function renderStrategies(runs: RunReport[], config: GameConfig, label: string): string {
  const s = strategyStats(runs, config);
  const percent = (n: number) => `${(n * 100).toFixed(2)}%`;
  let text = `## ${label}\n\n${s.runs} combo runs; ${s.placements.toLocaleString('en-US')} placements. Aggregate shares weight each placement equally. Per-run shares expose concentration hidden by different run lengths.\n\n`;
  text += '| Building | Placements | Aggregate share | Median / max run share | Runs above 25% |\n|---|---:|---:|---|---:|\n';
  for (const b of s.buildings) text += `| ${b.name} (${b.id}) | ${b.count} | ${percent(b.share)} | ${percent(b.medianShare)} / ${percent(b.maxShare)} | ${b.dominantRuns}/${s.runs} |\n`;
  for (const [label, field] of [['payout-event count', 'count'], ['total resource units', 'total']] as const) {
    text += `\n### Five most-paid combos by ${label}\n\n| Combo | Paid events | Resource units | Wood / stone / water / food |\n|---|---:|---:|---|\n`;
    for (const c of [...s.combos].sort((a, b) => b[field] - a[field] || a.id.localeCompare(b.id)).slice(0, 5)) {
      text += `| ${c.name} (${c.id}) | ${c.count} | ${c.total} | ${RESOURCES.map(k => c.amount[k] ?? 0).join(' / ')} |\n`;
    }
  }
  text += '\n### Starting biome\n\nFirst main-biome offer chosen by the unchanged bot, before its first core. Mixed biomes cannot be the starting biome. Rates are descriptive, not causal: seed terrain and offer/core policy also vary. No seed is excluded for losing.\n\n| Starting biome | Wins / runs | Win rate | Median winning use | Non-winning seeds |\n|---|---:|---:|---:|---|\n';
  for (const b of s.biomes) text += `| ${b.biome} | ${b.wins}/${b.runs} | ${b.winRate === null ? 'not sampled' : percent(b.winRate)} | ${b.medianWinningUse === null ? '—' : percent(b.medianWinningUse)} | ${b.losingSeeds.join(', ') || 'none'} |\n`;
  const dominant = s.buildings.filter(b => b.share > .25);
  text += `\n**Designer question (no tuning):** ${dominant.length ? dominant.map(b => `${b.name} accounts for ${percent(b.share)} of all placements`).join('; ') + '. Is this concentration intended?' : 'No building exceeds 25% of aggregate placements; inspect the per-run concentration and payout rankings for subtler preferences.'}\n`;
  return text;
}
