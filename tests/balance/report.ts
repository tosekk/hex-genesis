import type { RunReport } from './bot';

export const TARGETS = Array.from({ length: 8 }, (_, i) => i + 1);
export const RESOURCES = ['wood', 'stone', 'water', 'food'];
export function median(values: number[]): number {
  if (!values.length) return Infinity;
  const sorted = [...values].sort((a, b) => a - b), mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
const fmt = (value: number) => Number.isFinite(value) ? `${Math.round(value * 100) / 100}` : '∞';
const summary = (values: number[]) => values.length ? `${fmt(median(values))} (${fmt(Math.min(...values))}–${fmt(Math.max(...values))})` : '—';
export function assess(runs: RunReport[]) {
  const combo = runs.filter(r => r.strategy === 'combo'), spam = runs.filter(r => r.strategy === 'spam');
  const medians = (group: RunReport[]) => TARGETS.map((_, i) => median(group.map(r => r.thresholds[i]?.placements ?? Infinity)));
  const wins = combo.filter(r => r.outcome === 'win'), losses = spam.filter(r => r.outcome === 'loss' && !r.thresholds[7]);
  const falseSoftLocks = runs.reduce((n, r) => n + r.falseSoftLocks, 0);
  const openingStalls = combo.filter(r => r.openingStall).map(r => r.seed);
  const medianBoardUse = median(wins.map(r => r.boardUse));
  const t7 = combo.flatMap(r => r.thresholds[6] ? [r.thresholds[6].boardUse] : []);
  const pressure = [2, 3, 4, 5, 6].flatMap(i => RESOURCES.map(resource => {
    const checkpoints = combo.flatMap(r => r.thresholds[i] ? [r.thresholds[i]!] : []);
    const ratios = checkpoints.map(t => (t.maxCost[resource] ?? 0) > 0 ? (t.stock[resource] ?? 0) / t.maxCost[resource] : (t.stock[resource] ?? 0) > 0 ? Infinity : 0);
    return { threshold: i + 1, resource, count: checkpoints.length, held: median(checkpoints.map(t => t.stock[resource] ?? 0)), maxCost: median(checkpoints.map(t => t.maxCost[resource] ?? 0)), ratio: median(ratios) };
  }));
  return { combo: medians(combo), spam: medians(spam), wins: wins.length, losses: losses.length, falseSoftLocks, openingStalls, medianBoardUse, t7, pressure,
    targets: [combo.length > 0 && wins.length >= Math.ceil(combo.length * .9) && falseSoftLocks === 0,
      spam.length > 0 && losses.length >= Math.ceil(spam.length * .9),
      medianBoardUse >= .65 && medianBoardUse <= .85,
      combo.length > 0 && openingStalls.length === 0,
      pressure.every(p => p.count >= Math.ceil(combo.length * .9) && p.count > 0 && p.ratio <= 3),
      combo.length > 0 && t7.length >= Math.ceil(combo.length * .9) && t7.every(use => use < .6)] };
}
export function renderReport(runs: RunReport[], label: string, width: number, height: number, elapsedMs: number): string {
  const a = assess(runs), count = runs.filter(r => r.strategy === 'combo').length;
  let text = `## ${label}\n\nReal GameSession, ${width}×${height}, seeds 1–${count}, ${Math.round(elapsedMs)} ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offer/core scoring and tie rules are unchanged.\n\n`;
  text += 'V4: T8 wins immediately. Loss means engine proof or no empty living slots after usable cores/offers/spread are exhausted (board-full bot loss; replacement escape may still exist). An unproven empty-slot stall is not a loss. Board use includes ALL map placeable slots, including dead land. All-seed threshold medians censor unreached thresholds as infinity. Stock pressure samples the T3–T7 payout transactions, against the current placement biome roster; positive stock against zero cost has infinite ratio. T7 requires ≥90% completion and EVERY completer below 60%, not only the median. False-loss audits check direct productive replacements and refund-funded unpaid base yields; they are a constructive check, not an exhaustive search of all future replacement sequences.\n\n';
  const evidence = [`${a.wins}/${count} combo wins; ${a.falseSoftLocks} detected false soft-locks`, `${a.losses}/${count} spam losses before T8`, `${fmt(a.medianBoardUse * 100)}% median winning board use`, a.openingStalls.length ? `seeds ${a.openingStalls.join(', ')}` : 'zero combo opening stalls', `worst checkpoint/resource median stock/max-cost = ${fmt(Math.max(...a.pressure.map(p => p.ratio)))}×`, `${a.t7.length}/${count} reach T7; median ${fmt(median(a.t7) * 100)}%, max ${fmt(Math.max(...a.t7) * 100)}%`];
  const names = ['Good play wins ≥90%; zero false loss', 'Spam loses ≥90%', 'Winning board use 65–85%', 'No opening stalls before T2', 'T3–T7 median stock ≤3× max cost', 'T7 before 60% board use'];
  text += '| Target | Result | Evidence |\n|---|---|---|\n';
  a.targets.forEach((pass, i) => { text += `| ${i + 1}. ${names[i]} | ${pass ? 'PASS' : 'MISS'} | ${evidence[i]} |\n`; });
  text += '\n| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n |\n|---|---:|---|---:|---|\n';
  for (let i = 0; i < 8; i++) {
    const samples = (strategy: string) => runs.filter(r => r.strategy === strategy).flatMap(r => r.thresholds[i] ? [r.thresholds[i]!.placements] : []);
    const c = samples('combo'), s = samples('spam');
    text += `| T${i + 1} | ${fmt(a.combo[i])} | ${summary(c)}, ${c.length}/${count} | ${fmt(a.spam[i])} | ${summary(s)}, ${s.length}/${count} |\n`;
  }
  text += '\n| Combo stock checkpoint | Resource | Samples | Median held | Median max cost | Median held/max cost |\n|---|---|---:|---:|---:|---:|\n';
  for (const p of a.pressure) text += `| T${p.threshold} | ${p.resource} | ${p.count}/${count} | ${fmt(p.held)} | ${fmt(p.maxCost)} | ${fmt(p.ratio)}× |\n`;
  for (const strategy of ['combo', 'spam']) {
    const group = runs.filter(r => r.strategy === strategy);
    text += `\n${strategy}: ${group.filter(r => r.outcome === 'win').length} wins; ${group.filter(r => r.outcome === 'loss').length} losses (${group.filter(r => r.stop === 'board-full').length} board-full, ${group.filter(r => r.stop === 'soft-lock').length} proven); ${group.filter(r => r.outcome === 'stuck').length} unproven stalls; ${group.filter(r => r.outcome === 'cap').length} action-cap.\n`;
  }
  text += '\n| Seed | Bot | Outcome / stop | Placements | Board use / map slots | T1–T8 placements | Opening stall | False loss | Legal core sites left | Final lifetime W/S/A/F | Final stock W/S/A/F |\n|---|---|---|---:|---|---|---|---:|---:|---|---|\n';
  const vector = (values: Record<string, number>) => RESOURCES.map(r => values[r] ?? 0).join('/');
  for (const r of runs) text += `| ${r.seed} | ${r.strategy} | ${r.outcome} / ${r.stop} | ${r.placements} | ${fmt(r.boardUse * 100)}% / ${r.mapSlots} | ${r.thresholds.map(t => t?.placements ?? '—').join(' / ')} | ${r.openingStall ? 'yes' : 'no'} | ${r.falseSoftLocks} | ${r.legalSitesRemaining} | ${vector(r.lifetime)} | ${vector(r.resources)} |\n`;
  text += '\nPer-run checkpoint vectors below use **wood/stone/water/food**; each cell is `held : max cost (biome)`. The JSON retains unrounded values, lifetime totals, and living-slot fill at every threshold.\n\n| Seed | Bot | T3 stock : cost | T4 stock : cost | T5 stock : cost | T6 stock : cost | T7 stock : cost |\n|---|---|---|---|---|---|---|\n';
  for (const r of runs) text += `| ${r.seed} | ${r.strategy} | ${r.thresholds.slice(2, 7).map(t => t ? `${vector(t.stock)} : ${vector(t.maxCost)} (${t.biome})` : '—').join(' | ')} |\n`;
  return text;
}
