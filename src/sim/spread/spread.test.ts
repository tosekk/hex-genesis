import { describe, expect, it } from 'vitest';
import { hexIdOf } from '../../core/hex';
import { makeTestState } from '../../core/testing';
import type { Biome, GameState, Hex, MainBiome, SpreadResult } from '../../core/types';
import {
  computeSpread, finishSpread, isHexLocked, isLegalCoreSite, legalCoreSites, revealSpread,
  spreadPool, startSpread, stepCost,
} from './spread';

type HexOpts = Partial<Pick<Hex, 'elevation' | 'terrain' | 'biome' | 'decoration'>>;

function board(cols: number, rows: number, hex?: (c: number, r: number) => HexOpts): GameState {
  return makeTestState({ cols, rows, hex });
}

const colOf = (s: GameState, id: number) => s.hexes[id].col;
const ids = (r: SpreadResult) => r.claims.map((c) => c.hexId);

describe('spread pool and step cost', () => {
  const cfg = makeTestState().config.spread;

  it('pool is 69 tiles of flat cost', () => {
    expect(spreadPool(cfg)).toBe(69 * cfg.costUnit);
    expect(spreadPool(cfg)).toBe(276);
  });

  it('uphill > flat > downhill > 0 (§13)', () => {
    const flat = stepCost(cfg, 1, 1);
    expect(flat).toBe(cfg.costUnit);
    expect(stepCost(cfg, 1, 2)).toBeGreaterThan(flat);
    expect(stepCost(cfg, 1, 0)).toBeLessThan(flat);
    for (let d = 1; d < 5; d++) expect(stepCost(cfg, d, 0)).toBeGreaterThan(0);
  });

  it('slope cost shows up in the claim path costs', () => {
    // origin (0,0) elev 1; (1,0) elev 2 uphill; row 1 elev 0 downhill.
    const s = board(2, 2, (c, r) => ({ elevation: r === 1 ? 0 : c === 1 ? 2 : 1 }));
    const res = computeSpread(s, 0, 'forest');
    const cost = (id: number) => res.claims.find((c) => c.hexId === id)!.pathCost;
    const U = s.config.spread.costUnit;
    expect(cost(0)).toBe(U);
    expect(cost(1) - U).toBe(stepCost(s.config.spread, 1, 2));
    expect(cost(2) - U).toBe(stepCost(s.config.spread, 1, 0));
  });
});

describe('computeSpread', () => {
  it('flat dead board: exactly 69 claims, pool used 276', () => {
    const s = board(20, 14);
    const res = computeSpread(s, hexIdOf(10, 7, 20), 'forest');
    expect(res.claims.length).toBe(69);
    expect(res.poolUsed).toBe(276);
    expect(res.claims[0]).toEqual({ hexId: hexIdOf(10, 7, 20), kind: 'claim', toBiome: 'forest', pathCost: 4 });
    expect(res.claims.every((c) => c.kind === 'claim' && c.toBiome === 'forest')).toBe(true);
    expect(new Set(ids(res)).size).toBe(69);
  });

  it('is not a radius clamp: a narrow corridor pushes the spread far away (§12)', () => {
    // Row 1 is a plain corridor between two mountain rows (mountains are entered 1 deep, never expanded).
    const s = board(20, 3, (_c, r) => (r === 1 ? {} : { terrain: 'mountain' }));
    const res = computeSpread(s, hexIdOf(0, 1, 20), 'forest');
    const farthest = Math.max(...res.claims.filter((c) => c.kind === 'claim').map((c) => colOf(s, c.hexId)));
    expect(farthest).toBeGreaterThan(4);
  });

  it('same-biome tiles: not claimed, cost 0, terminal (§16)', () => {
    // 8×5, forest wall at col 3 fully separates cols 0–2 from 4–7.
    const s = board(8, 5, (c) => (c === 3 ? { biome: 'forest' } : {}));
    const res = computeSpread(s, hexIdOf(1, 2, 8), 'forest');
    expect(res.claims.length).toBe(15);
    expect(res.claims.every((c) => colOf(s, c.hexId) <= 2)).toBe(true);
    expect(res.poolUsed).toBe(15 * 4);
  });

  it('mixed tiles: never claimed, block the spread (§18)', () => {
    const s = board(8, 5, (c) => (c === 3 ? { biome: 'steppe' } : {}));
    const res = computeSpread(s, hexIdOf(1, 2, 8), 'desert');
    expect(res.claims.length).toBe(15);
    expect(res.claims.every((c) => colOf(s, c.hexId) <= 2)).toBe(true);
  });

  it('forest into a desert region → steppe, at most 2 deep, nothing past it (§17)', () => {
    // 12×7: cols 0–5 dead (42 tiles), cols 6–11 desert.
    const s = board(12, 7, (c) => (c >= 6 ? { biome: 'desert' } : {}));
    const res = computeSpread(s, hexIdOf(1, 3, 12), 'forest');
    const conv = res.claims.filter((c) => c.kind === 'convert');
    const dead = res.claims.filter((c) => c.kind === 'claim');
    expect(dead.length).toBe(42);
    expect(conv.every((c) => c.toBiome === 'steppe')).toBe(true);
    expect(new Set(conv.map((c) => colOf(s, c.hexId)))).toEqual(new Set([6, 7]));
    expect(conv.length).toBe(14);
    expect(res.claims.every((c) => colOf(s, c.hexId) <= 7)).toBe(true);
    // conversion is half the flat cost
    expect(res.poolUsed).toBe(42 * 4 + 14 * 2);
  });

  it('never re-enters dead land from converted tiles (§17)', () => {
    // A 1-wide arctic strip at col 6; dead land beyond it.
    const s = board(12, 7, (c) => (c === 6 ? { biome: 'arctic' } : {}));
    const res = computeSpread(s, hexIdOf(1, 3, 12), 'desert');
    expect(res.claims.filter((c) => c.kind === 'convert').every((c) => c.toBiome === 'polarDesert')).toBe(true);
    expect(res.claims.some((c) => colOf(s, c.hexId) === 6)).toBe(true);
    expect(res.claims.every((c) => colOf(s, c.hexId) <= 6)).toBe(true);
  });

  it('conversion only continues into the same foreign biome', () => {
    // col 6 desert, col 7 arctic: forest converts col 6 (steppe) but must not enter the arctic at col 7.
    const s = board(12, 7, (c) => (c === 6 ? { biome: 'desert' } : c === 7 ? { biome: 'arctic' } : {}));
    const res = computeSpread(s, hexIdOf(1, 3, 12), 'forest');
    expect(res.claims.every((c) => colOf(s, c.hexId) <= 6)).toBe(true);
  });

  it('water/woods/marsh: claimed at double cost, still unplaceable (§13)', () => {
    for (const terrain of ['riverbed', 'basin', 'woods', 'marsh'] as const) {
      const s = board(20, 14, (c, r) => (c === 10 && r === 7 ? {} : { terrain }));
      const res = computeSpread(s, hexIdOf(10, 7, 20), 'arctic');
      // origin 4, every other tile 8 → 1 + floor(272 / 8) = 35
      expect(res.claims.length).toBe(35);
      expect(res.claims.slice(1).every((c) => c.kind === 'claim' && c.pathCost % 8 === 4)).toBe(true);
      s.coreStack.push('arctic');
      expect(startSpread(s, hexIdOf(10, 7, 20), 0).ok).toBe(true);
      finishSpread(s);
      const naturals = s.hexes.filter((h) => h.terrain === terrain);
      expect(naturals.filter((h) => h.biome === 'arctic').length).toBe(34);
      expect(naturals.every((h) => !h.placeable)).toBe(true);
    }
  });

  it('natural foreign tile conversion: ceil(natural cost × 0.5)', () => {
    const s = board(3, 1, (c) => (c === 1 ? { terrain: 'marsh', biome: 'desert' } : {}));
    const res = computeSpread(s, 0, 'forest');
    const conv = res.claims.find((c) => c.hexId === 1)!;
    expect(conv.kind).toBe('convert');
    expect(conv.toBiome).toBe('steppe');
    expect(conv.pathCost - 4).toBe(4); // 4 · 2 · 0.5
  });

  it('mountain range 3 wide: only the first mountain column is touched (§13)', () => {
    // 16×7: cols 6–8 mountains, dead plains either side.
    const s = board(16, 7, (c) => (c >= 6 && c <= 8 ? { terrain: 'mountain' } : {}));
    const res = computeSpread(s, hexIdOf(1, 3, 16), 'forest');
    const mts = res.claims.filter((c) => c.kind === 'mountain');
    expect(mts.length).toBeGreaterThan(0);
    expect(mts.every((c) => colOf(s, c.hexId) === 6 && c.toBiome === null)).toBe(true);
    expect(res.claims.every((c) => colOf(s, c.hexId) <= 6)).toBe(true);
    s.coreStack.push('forest');
    startSpread(s, hexIdOf(1, 3, 16), 0);
    finishSpread(s);
    expect(s.hexes.filter((h) => h.terrain === 'mountain').every((h) => h.biome === null)).toBe(true);
  });

  it('a lone mountain is entered but never expanded from', () => {
    // 1-row board: plain, mountain, plain. The spread cannot get past the mountain.
    const s = board(3, 1, (c) => (c === 1 ? { terrain: 'mountain' } : {}));
    const res = computeSpread(s, 0, 'forest');
    expect(res.claims.map((c) => [c.hexId, c.kind])).toEqual([[0, 'claim'], [1, 'mountain']]);
  });

  it('discards an unaffordable step but keeps claiming cheaper later ones', () => {
    // 1 row, pool radius 1 → 9 tiles · 4 = 36. Elevations: c0–c8 = 2, c9 = 1, c10–c11 = 0. c1 is woods.
    // Pop order: c5(4) c4 c6(8) c3 c7(12) c2 c8(16) c9(18, step 2) c10(20, step 2) → 4 left.
    // Then c1 (cum 24, step 8) is popped before c11 (cum 24, step 4) by HexId: c1 is discarded, c11 is claimed.
    const s = makeTestState({
      cols: 12, rows: 1,
      hex: (c) => ({ elevation: c <= 8 ? 2 : c === 9 ? 1 : 0, terrain: c === 1 ? 'woods' : 'plain' }),
      config: { spread: { ...makeTestState().config.spread, poolRadius: 1 } },
    });
    const res = computeSpread(s, 5, 'forest');
    expect(ids(res)).toEqual([5, 4, 6, 3, 7, 2, 8, 9, 10, 11]);
    expect(res.poolUsed).toBe(36);
  });

  it('pool radius 0 → only the origin', () => {
    const s = makeTestState({ cols: 3, rows: 3, config: { spread: { ...makeTestState().config.spread, poolRadius: 0 } } });
    expect(ids(computeSpread(s, 4, 'forest'))).toEqual([4]);
  });

  it('does not mutate its input (§14)', () => {
    const s = board(12, 7, (c, r) => (c >= 8 ? { biome: 'desert' } : r === 3 ? { terrain: 'riverbed' } : {}));
    const before = structuredClone(s);
    computeSpread(s, hexIdOf(1, 1, 12), 'forest');
    expect(s).toEqual(before);
  });

  it('determinism: identical states → deep-equal results; ties by ascending HexId (§51)', () => {
    const make = () => board(20, 14, (c, r) => ({ elevation: (c * 7 + r * 3) % 3, terrain: (c + r) % 9 === 0 ? 'woods' : 'plain' }));
    const a = computeSpread(make(), hexIdOf(9, 6, 20), 'desert');
    const b = computeSpread(make(), hexIdOf(9, 6, 20), 'desert');
    expect(a).toEqual(b);
    // flat board: the 6 neighbours all cost 8 → claims[1..6] ascending HexId
    const flat = computeSpread(board(20, 14), hexIdOf(9, 6, 20), 'desert');
    const ring = ids(flat).slice(1, 7);
    expect(ring).toEqual([...ring].sort((x, y) => x - y));
    expect(flat.claims.slice(1, 7).every((c) => c.pathCost === 8)).toBe(true);
    // claims are in non-decreasing pathCost order
    for (let i = 1; i < a.claims.length; i++) expect(a.claims[i].pathCost).toBeGreaterThanOrEqual(a.claims[i - 1].pathCost);
  });

  it('runs fast on a 20×14 board', () => {
    const s = board(20, 14, (c, r) => ({ elevation: (c * 5 + r * 3) % 4 }));
    computeSpread(s, 0, 'forest');
    const t0 = performance.now();
    for (let i = 0; i < 20; i++) computeSpread(s, hexIdOf(10, 7, 20), 'forest');
    expect((performance.now() - t0) / 20).toBeLessThan(5);
  });
});

describe('core sites', () => {
  it('distance 5 rejected, 6 accepted, elevation irrelevant (§10)', () => {
    const s = board(20, 14, (c, r) => (c === 8 && r === 2 ? { elevation: 3 } : {}));
    s.cores.push(hexIdOf(2, 2, 20));
    expect(isLegalCoreSite(s, hexIdOf(7, 2, 20))).toBe(false); // distance 5
    expect(isLegalCoreSite(s, hexIdOf(8, 2, 20))).toBe(true);  // distance 6, elevated
    expect(isLegalCoreSite(s, hexIdOf(2, 2, 20))).toBe(false);
  });

  it('non-dead or unplaceable tiles are rejected', () => {
    const s = board(5, 1, (c) => (
      [{ biome: 'forest' as Biome }, { biome: 'taiga' as Biome }, { terrain: 'riverbed' as const }, { terrain: 'mountain' as const }, {}][c]));
    expect([0, 1, 2, 3, 4].map((i) => isLegalCoreSite(s, i))).toEqual([false, false, false, false, true]);
    expect(legalCoreSites(s)).toEqual([4]);
    expect(isLegalCoreSite(s, 99)).toBe(false);
  });
});

describe('startSpread / reveal / finish', () => {
  function withCore(s: GameState, ...biomes: MainBiome[]): GameState {
    s.coreStack.push(...biomes);
    return s;
  }

  it('pops the chosen core, records it, locks the claim set, reveals nothing', () => {
    const s = withCore(board(20, 14), 'forest', 'desert');
    const o = hexIdOf(10, 7, 20);
    const r = startSpread(s, o, 1);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.biome).toBe('desert');
    expect(s.coreStack).toEqual(['forest']);
    expect(s.cores).toEqual([o]);
    expect(s.activeSpread!.revealed).toBe(0);
    expect(s.hexes.every((h) => h.biome === null)).toBe(true);
    for (const c of r.value.claims) expect(isHexLocked(s, c.hexId)).toBe(true);
    expect(isHexLocked(s, 0)).toBe(false);
  });

  it('rejects while a spread is active, bad stack index, illegal site — and changes nothing (§11)', () => {
    const s = withCore(board(20, 14), 'forest', 'arctic');
    expect(startSpread(s, 0, 5).ok).toBe(false);
    expect(startSpread(s, 0, -1).ok).toBe(false);
    expect(startSpread(s, 0, 0.5).ok).toBe(false);
    expect(startSpread(s, 0, 0).ok).toBe(true);
    const snap = structuredClone(s);
    expect(startSpread(s, hexIdOf(15, 10, 20), 0).ok).toBe(false); // active spread
    expect(s).toEqual(snap);
    finishSpread(s);
    expect(startSpread(s, hexIdOf(3, 0, 20), 0).ok).toBe(false); // too close / now forest
    expect(startSpread(s, hexIdOf(15, 10, 20), 0).ok).toBe(true);
  });

  it('reveals in claim order; revealing does not change the remaining claims (§14)', () => {
    const s = withCore(board(20, 14, (c) => (c >= 14 ? { biome: 'desert' } : {})), 'forest');
    const r = startSpread(s, hexIdOf(10, 7, 20), 0);
    if (!r.ok) throw new Error(r.reason);
    const planned = structuredClone(r.value);
    const first = revealSpread(s, 5);
    expect(first).toEqual(planned.claims.slice(0, 5));
    for (const c of first) expect(s.hexes[c.hexId].biome).toBe(c.toBiome);
    expect(s.activeSpread!.result).toEqual(planned);
    // a fresh computation on the partially revealed board would differ, but the locked result does not
    revealSpread(s, 3);
    expect(s.activeSpread!.revealed).toBe(8);
    const rest = finishSpread(s);
    expect(rest).toEqual(planned.claims.slice(8));
    expect(s.activeSpread).toBeNull();
    for (const c of planned.claims) expect(s.hexes[c.hexId].biome).toBe(c.toBiome);
    expect(revealSpread(s, 3)).toEqual([]);
    expect(finishSpread(s)).toEqual([]);
  });

  it('reveal count is clamped at the end', () => {
    const s = withCore(board(20, 14), 'arctic');
    startSpread(s, 0, 0);
    const n = s.activeSpread!.result.claims.length;
    expect(revealSpread(s, 1000).length).toBe(n);
    expect(revealSpread(s, 1)).toEqual([]);
    expect(s.activeSpread).not.toBeNull();
  });

  it('two spreads meeting create a mixed border, and mixed tiles are never overwritten', () => {
    const s = withCore(board(20, 14), 'forest', 'desert', 'arctic');
    startSpread(s, hexIdOf(3, 7, 20), 0);
    finishSpread(s);
    startSpread(s, hexIdOf(12, 7, 20), 0);
    finishSpread(s);
    const steppe = s.hexes.filter((h) => h.biome === 'steppe');
    expect(steppe.length).toBeGreaterThan(0);
    const steppeIds = new Set(steppe.map((h) => h.id));
    // third spread (arctic) placed far away must not touch the steppe tiles
    const site = legalCoreSites(s)[0];
    if (site !== undefined) {
      const r = startSpread(s, site, 0);
      if (r.ok) expect(r.value.claims.some((c) => steppeIds.has(c.hexId))).toBe(false);
    }
  });
});
