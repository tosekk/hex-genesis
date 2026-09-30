import type { RunReport } from './bot';

export const TARGETS = [7, 22, 45, 90, 160, 270, 360, 450];
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
  const medianWin = median(combo.map(r => r.winPlacements ?? Infinity));
  const lateBeforeWin = Number.isFinite(medianWin) && c.slice(6).every(n => n < medianWin);
  return { combo: c, spam: s, ratios, fills, comboT6, wins, softLocks, medianWin, lateBeforeWin,
    pacing: c.every((n, i) => i === 0 || (n >= TARGETS[i] * 0.8 && n <= TARGETS[i] * 1.2)) && lateBeforeWin,
    combosMatter: ratios.slice(3, 6).every(r => r !== null && r >= 1.5),
    noCoasting: fills.every(f => f >= 0.7),
    reachable: comboT6 >= Math.ceil(combo.length * 0.96) && wins >= Math.ceil(combo.length * 0.9) && softLocks === 0 };
}
export function renderReport(runs: RunReport[], label: string, width: number, height: number, elapsedMs: number): string {
  const a = assess(runs), count = runs.filter(r => r.strategy === 'combo').length;
  let text = `## ${label}\n\nReal GameSession, ${width}×${height}, seeds 1–${count}, ${Math.round(elapsedMs)} ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.\n\n`;
  text += 'All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. V3 exempts T1 from pacing and counts zero spam T6 completers as passing target 3. T7/T8 must precede the finite all-seed median win placement count.\n\n';
  text += '| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |\n|---|---:|---|---:|---|---:|---|\n';
  for (let i = 0; i < TARGETS.length; i++) {
    const samples = (strategy: string) => runs.filter(r => r.strategy === strategy).flatMap(r => r.thresholds[i] ? [r.thresholds[i]!.placements] : []);
    const c = samples('combo'), s = samples('spam');
    text += `| T${i + 1} | ${fmt(a.combo[i])} | ${summary(c)}, ${c.length}/${count} | ${fmt(a.spam[i])} | ${summary(s)}, ${s.length}/${count} | ${a.ratios[i] === null ? 'unmeasurable' : fmt(a.ratios[i]!)} | ${i === 0 ? 'exempt (stone-only)' : `${TARGETS[i]} (${fmt(TARGETS[i] * 0.8)}–${fmt(TARGETS[i] * 1.2)})`} |\n`;
  }
  text += `\n| Target | Result | Evidence |\n|---|---|---|\n| 1. Combo pacing | ${a.pacing ? 'PASS' : 'MISS'} | ${a.combo.map(fmt).join(' / ')} |\n| 2. T4–T6 ≥1.5× | ${a.combosMatter ? 'PASS' : a.ratios.slice(3, 6).some(r => r === null) ? 'UNMEASURABLE' : 'MISS'} | ${a.ratios.slice(3, 6).map(r => r === null ? 'unmeasurable' : fmt(r)).join(' / ')} |\n| 3. Spam T6 fill ≥70% | ${a.noCoasting ? 'PASS' : 'MISS'} | ${a.fills.length ? `min ${fmt(100 * Math.min(...a.fills))}%, median ${fmt(100 * median(a.fills))}%` : 'no T6 completers (v3 passes)'} |\n| 4. ≥96% combo T6, ≥90% wins; zero soft-locks | ${a.reachable ? 'PASS' : 'MISS'} | T6 ${a.comboT6}/${count}; wins ${a.wins}/${count}; ${a.softLocks} soft-lock declarations across both bots |\n`;
  text += `\nT7/T8 before median win: **${a.lateBeforeWin ? 'PASS' : 'MISS'}**; T7 ${fmt(a.combo[6])}, T8 ${fmt(a.combo[7])}, median win ${fmt(a.medianWin)}.\n`;
  for (const strategy of ['combo', 'spam']) {
    const group = runs.filter(r => r.strategy === strategy), wins = group.flatMap(r => r.winPlacements === null ? [] : [r.winPlacements]);
    text += `\n${strategy}: win placements median (range) **${summary(wins)}**; ${group.filter(r => r.stop === 'won').length} wins, ${group.filter(r => r.stop === 'stuck').length} stuck, ${group.filter(r => r.stop === 'soft-lock').length} soft-lock, ${group.filter(r => r.stop === 'action-cap').length} action-cap.\n`;
  }
  text += '\n| Seed | Bot | T1–T8 placements | T6 fill | T7 fill | T8 fill | Win placements | Stop | Final placements | Legal core sites left | Final lifetime | Final stock |\n|---|---|---|---:|---:|---:|---:|---|---:|---:|---|---|\n';
  const resources = (values: Record<string, number>) => Object.entries(values).map(([r, n]) => `${r}=${n}`).join(', ');
  for (const r of runs) text += `| ${r.seed} | ${r.strategy} | ${r.thresholds.map(t => t?.placements ?? '—').join(' / ')} | ${r.thresholds[5] ? fmt(r.thresholds[5].fill * 100) + '%' : '—'} | ${r.thresholds[6] ? fmt(r.thresholds[6].fill * 100) + '%' : '—'} | ${r.thresholds[7] ? fmt(r.thresholds[7].fill * 100) + '%' : '—'} | ${r.winPlacements ?? '—'} | ${r.stop} | ${r.placements} | ${r.legalSitesRemaining} | ${resources(r.lifetime)} | ${resources(r.resources)} |\n`;
  return text;
}
