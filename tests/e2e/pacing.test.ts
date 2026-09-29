// Economy pacing report (opt-in: `npm run pacing`). Runs the autoplay bot on a pinned FLAT map
// (all plain, elevation 0, as the O1 mapgen stub did) so economy changes can be compared against a
// fixed baseline, independent of map generation. Flat map = no terrain bonuses, no hills/mountains.
import { describe, expect, it, vi } from 'vitest';
import { createGameSession } from '../../src/game/session';
import { cumulative, formatReport, report, runBot } from './bot';

// The factory must not import src/core/state (it imports mapgen → the factory would await itself).
vi.mock('../../src/sim/world/mapgen', async () => {
  const { createRng } = await import('../../src/core/rng');
  return {
    generateMap(seed: number, map: { cols: number; rows: number }) {
      const rng = createRng(seed);
      const hexes = [];
      for (let row = 0; row < map.rows; row++) {
        for (let col = 0; col < map.cols; col++) {
          hexes.push({
            id: row * map.cols + col, col, row, elevation: 0, terrain: 'plain', placeable: true,
            decoration: rng.nextU32(), biome: null,
            slots: [0, 1, 2].map(() => ({ building: null, yieldPaid: false })),
            everCompleted: false, pairPaid: [null, null, null], triplePaid: null,
          });
        }
      }
      return hexes;
    },
  };
});

const SEEDS = [1, 2, 3, 4, 5];

describe.runIf(process.env.PACING)('economy pacing on a flat map', () => {
  it('reports placements per threshold', () => {
    const runs = SEEDS.map((seed) => runBot(createGameSession({ now: () => 0 }), seed));
    for (const r of runs) report(formatReport(r));
    const cum = runs.map((r) => cumulative(r.placementsPerThreshold));
    const n = Math.max(...cum.map((c) => c.length));
    const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[xs.length >> 1];
    const rows = Array.from({ length: n }, (_, i) => {
      const xs = cum.map((c) => c[i]).filter((x) => x !== undefined);
      return `  T${i + 1}: median ${median(xs)} · min ${Math.min(...xs)} · max ${Math.max(...xs)} · reached ${xs.length}/${runs.length}`;
    });
    report(['cumulative placements at each threshold (flat map):', ...rows].join('\n'));
    expect(runs.every((r) => r.stop !== 'time')).toBe(true);
  }, 240_000);
});
