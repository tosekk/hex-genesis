import type { RunReport } from './bot';

export const TARGETS = [7, 22, 45, 90, 160, 270];
export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b), mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
const fmt = (value: number) => Number.isFinite(value) ? `${Math.round(value * 100) / 100}` : 'unreached';
const summary = (values: number[]) => values.length ? `${fmt(median(values))} (${Math.min(...values)}–${Math.max(...values)})` : '—';
export function assess(runs: RunReport[]) {
  const combo = runs.filter(r => r.strategy === 'combo'), spam = runs.filter(r => r.strategy === 'spam');
  const medians = (group: RunReport[]) => TARGETS.map((_, i) => median(group.map(r => r.thresholds[i]?.placements ?? Infinity)));
  const c = medians(combo), s = medians(spam);
  const ratios = c.map((n, i) => Number.isFinite(n) && Number.isFinite(s[i]) ? s[i] / n : null);
  const fills = spam.flatMap(r => r.thresholds[5] ? [r.thresholds[5].fill] : []);
  const comboT6 = combo.filter(r => r.thresholds[5]).length, wins = combo.filter(r => r.stop === 'won').length;
  const softLocks = runs.reduce((n, r) => n + r.softLocks, 0);
  return { combo: c, spam: s, ratios, fills, comboT6, wins, softLocks,
    pacing: c.every((n, i) => n >= TARGETS[i] * 0.8 && n <= TARGETS[i] * 1.2),
    combosMatter: ratios.slice(3).every(r => r !== null && r >= 1.5),
    noCoasting: fills.length > 0 && fills.every(f => f >= 0.7),
    reachable: comboT6 >= Math.ceil(combo.length * 0.9) && wins >= Math.ceil(combo.length * 0.9) && softLocks === 0 };
}
export function renderReport(runs: RunReport[], label: string, width: number, height: number, elapsedMs: number): string {
  const a = assess(runs), count = runs.filter(r => r.strategy === 'combo').length;
  let text = `## ${label}\n\nReal GameSession, ${width}×${height}, seeds 1–${count}, ${Math.round(elapsedMs)} ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.\n\n`;
  text += 'All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.\n\n';
  text += '| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |\n|---|---:|---|---:|---|---:|---|\n';
  for (let i = 0; i < 6; i++) {
    const samples = (strategy: string) => runs.filter(r => r.strategy === strategy).flatMap(r => r.thresholds[i] ? [r.thresholds[i]!.placements] : []);
    const c = samples('combo'), s = samples('spam');
    text += `| T${i + 1} | ${fmt(a.combo[i])} | ${summary(c)}, ${c.length}/${count} | ${fmt(a.spam[i])} | ${summary(s)}, ${s.length}/${count} | ${a.ratios[i] === null ? 'unmeasurable' : fmt(a.ratios[i]!)} | ${TARGETS[i]} (${fmt(TARGETS[i] * 0.8)}–${fmt(TARGETS[i] * 1.2)}) |\n`;
  }
  text += `\n| Target | Result | Evidence |\n|---|---|---|\n| 1. Combo pacing | ${a.pacing ? 'PASS' : 'MISS'} | ${a.combo.map(fmt).join(' / ')} |\n| 2. T4–T6 ≥1.5× | ${a.combosMatter ? 'PASS' : 'MISS / unmeasurable'} | ${a.ratios.slice(3).map(r => r === null ? 'unmeasurable' : fmt(r)).join(' / ')} |\n| 3. Spam T6 fill ≥70% | ${a.noCoasting ? 'PASS' : 'MISS / unmeasurable'} | ${a.fills.length ? `min ${fmt(100 * Math.min(...a.fills))}%, median ${fmt(100 * median(a.fills))}%` : 'no T6 completers'} |\n| 4. ≥90% combo T6/wins; zero soft-locks | ${a.reachable ? 'PASS' : 'MISS'} | T6 ${a.comboT6}/${count}; wins ${a.wins}/${count}; ${a.softLocks} soft-lock declarations across both bots |\n`;
  for (const strategy of ['combo', 'spam']) {
    const group = runs.filter(r => r.strategy === strategy), wins = group.flatMap(r => r.winPlacements === null ? [] : [r.winPlacements]);
    text += `\n${strategy}: win placements median (range) **${summary(wins)}**; ${group.filter(r => r.stop === 'won').length} wins, ${group.filter(r => r.stop === 'stuck').length} stuck, ${group.filter(r => r.stop === 'soft-lock').length} soft-lock, ${group.filter(r => r.stop === 'action-cap').length} action-cap.\n`;
  }
  text += '\n| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |\n|---|---|---|---:|---:|---|---:|---|---|\n';
  const resources = (values: Record<string, number>) => Object.entries(values).map(([r, n]) => `${r}=${n}`).join(', ');
  for (const r of runs) text += `| ${r.seed} | ${r.strategy} | ${r.thresholds.map(t => t?.placements ?? '—').join(' / ')} | ${r.thresholds[5] ? fmt(r.thresholds[5].fill * 100) + '%' : '—'} | ${r.winPlacements ?? '—'} | ${r.stop} | ${r.placements} | ${resources(r.lifetime)} | ${resources(r.resources)} |\n`;
  return text;
}
