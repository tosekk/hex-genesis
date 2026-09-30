import { spawn } from 'node:child_process';
import type { ChildProcess } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAP } from '../../src/config/map';
import type { GameConfig } from '../../src/core/types';
import type { RunReport } from './bot';

/** Four independent CPU workers keep the 40 real-session runs within the two-minute budget. */
export async function measure(config: GameConfig, count: number): Promise<RunReport[]> {
  const areaScale = Math.max(1, config.map.cols * config.map.rows / (MAP.cols * MAP.rows));
  const directory = mkdtempSync(join(tmpdir(), 'astra-balance-'));
  const configPath = join(directory, 'config.json');
  writeFileSync(configPath, JSON.stringify(config));
  const size = Math.ceil(count / 4);
  const children = new Set<ChildProcess>();
  try {
    const batches = await Promise.all(Array.from({ length: Math.min(4, count) }, (_, i) => {
      const start = i * size + 1, end = Math.min(count, (i + 1) * size);
      if (start > end) return Promise.resolve([] as RunReport[]);
      return new Promise<RunReport[]>((resolve, reject) => {
        const child = spawn(process.execPath, ['--no-warnings', '--experimental-strip-types', '--experimental-loader',
          fileURLToPath(new URL('./resolve-ts.mjs', import.meta.url)), fileURLToPath(new URL('./worker.ts', import.meta.url)),
          configPath, String(start), String(end)], { stdio: ['ignore', 'pipe', 'pipe'] });
        children.add(child);
        const runs: RunReport[] = [];
        let pending = '', errors = '';
        const timer = setTimeout(() => { child.kill(); reject(new Error('Balance worker exceeded its time budget')); }, Math.max(110_000, count / 20 * 110_000 * areaScale * areaScale));
        child.stdout.setEncoding('utf8');
        child.stderr.setEncoding('utf8');
        child.stdout.on('data', (chunk: string) => {
          pending += chunk;
          let newline: number;
          while ((newline = pending.indexOf('\n')) >= 0) {
            const line = pending.slice(0, newline); pending = pending.slice(newline + 1);
            try {
              const run = JSON.parse(line) as RunReport;
              runs.push(run);
              process.stdout.write(`balance ${config.map.cols}x${config.map.rows} ${run.strategy} seed ${run.seed}: ${run.stop}, ${run.placements} placements, T=${run.thresholds.map(t => t?.placements ?? '-').join('/')}\n`);
            } catch (error) { child.kill(); reject(error); }
          }
        });
        child.stderr.on('data', (chunk: string) => { errors += chunk; });
        child.on('error', error => { clearTimeout(timer); reject(error); });
        child.on('close', code => {
          children.delete(child);
          clearTimeout(timer);
          if (code !== 0 || runs.length !== (end - start + 1) * 3) reject(new Error(`Balance worker failed (${code}): ${errors}`));
          else resolve(runs);
        });
      });
    }));
    return batches.flat().sort((a, b) => a.seed - b.seed || a.strategy.localeCompare(b.strategy));
  } finally {
    for (const child of children) child.kill();
    rmSync(directory, { recursive: true, force: true });
  }
}
