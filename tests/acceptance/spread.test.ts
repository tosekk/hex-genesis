import { describe, expect, it } from 'vitest';
import { makeTestState } from '../../src/core/testing';
import type { Biome, MainBiome, Terrain } from '../../src/core/types';
import { computeSpread, finishSpread, revealSpread, startSpread } from '../../src/sim/spread/spread';

// Independent black-box cases from GAME_DESIGN §10–§18 / AGENT_TASKS §57.
describe('C3 spread acceptance (owner opus)', () => {
  it('S1: flat tiles cost one each; pool 69 is not a radius of four', () => {
    const s = makeTestState({ cols: 80, rows: 1 });
    const before = structuredClone(s);
    const spread = computeSpread(s, 0, 'forest');
    expect(spread.claims.map(c => c.hexId)).toEqual(Array.from({ length: 69 }, (_, i) => i));
    expect(spread.poolUsed).toBe(69 * s.config.spread.costUnit);
    expect(s).toEqual(before);
  });
  it('S2–3: uphill costs more, downhill less, every dead tile costs positive', () => {
    const make = (a: number, b: number) => makeTestState({ cols: 2, rows: 1, hex: c => ({ elevation: c === 0 ? a : b }) });
    const flat = make(0, 0), uphill = make(0, 1), downhill = make(4, 0);
    const f = computeSpread(flat, 0, 'forest');
    const u = computeSpread(uphill, 0, 'forest');
    const d = computeSpread(downhill, 0, 'forest');
    expect(u.poolUsed).toBeGreaterThan(f.poolUsed);
    expect(d.poolUsed).toBeLessThan(f.poolUsed);
    expect(d.poolUsed).toBeGreaterThan(downhill.config.spread.costUnit);
    expect(d.claims).toHaveLength(2);
  });
  it.each<Biome>(['forest', 'steppe', 'taiga', 'polarDesert'])('S4–5: %s stops the only route at zero cost', biome => {
    const s = makeTestState({ cols: 5, rows: 1, hex: c => ({ biome: c === 1 ? biome : null }) });
    const spread = computeSpread(s, 0, 'forest');
    expect(spread.claims.map(c => c.hexId)).toEqual([0]);
    expect(spread.poolUsed).toBe(s.config.spread.costUnit);
    s.coreStack = ['forest'];
    expect(startSpread(s, 0, 0).ok).toBe(true);
    finishSpread(s);
    expect(s.hexes[1].biome).toBe(biome);
    expect(s.hexes[2].biome).toBe(null);
  });
  it.each<[MainBiome, MainBiome, Biome]>([
    ['forest', 'desert', 'steppe'], ['desert', 'forest', 'steppe'],
    ['forest', 'arctic', 'taiga'], ['arctic', 'forest', 'taiga'],
    ['desert', 'arctic', 'polarDesert'], ['arctic', 'desert', 'polarDesert'],
  ])('S6–7: %s entering %s creates %s only two layers deep at half cost', (biome, foreign, mix) => {
    const s = makeTestState({ cols: 5, rows: 1, hex: c => ({ biome: c > 0 ? foreign : null }) });
    const spread = computeSpread(s, 0, biome);
    expect(spread.claims.map(c => [c.hexId, c.kind, c.toBiome])).toEqual([
      [0, 'claim', biome], [1, 'convert', mix], [2, 'convert', mix],
    ]);
    expect(spread.poolUsed).toBe(2 * s.config.spread.costUnit);
  });
  it('S7: a conversion route never emerges into dead land beyond a foreign boundary', () => {
    const s = makeTestState({ cols: 5, rows: 1, hex: c => ({ biome: c === 1 ? 'desert' : null }) });
    expect(computeSpread(s, 0, 'forest').claims.map(c => c.hexId)).toEqual([0, 1]);
  });
  it('S8: reveals consume a precomputed immutable plan, including its second conversion layer', () => {
    const s = makeTestState({ cols: 7, rows: 1, hex: c => ({ biome: c >= 3 ? 'desert' : null }) });
    s.coreStack = ['forest'];
    const begun = startSpread(s, 0, 0);
    expect(begun.ok).toBe(true);
    const planned = structuredClone(s.activeSpread!.result);
    expect(s.hexes[0].biome).toBe(null);
    revealSpread(s, 4);
    expect(s.hexes[3].biome).toBe('steppe');
    expect(s.hexes[4].biome).toBe('desert');
    expect(s.activeSpread!.result).toEqual(planned);
    revealSpread(s, 1);
    expect(s.hexes[4].biome).toBe('steppe');
    expect(s.activeSpread!.result).toEqual(planned);
    finishSpread(s);
    expect(s.activeSpread).toBe(null);
  });
  it('S10: identical numeric seed and identical actions reproduce the complete spread state', () => {
    const make = () => makeTestState({ hex: (c, r) => ({ elevation: (c + r) % 3, terrain: (c + r) % 7 === 0 ? 'woods' : 'plain' }) });
    const a = make(), b = make();
    expect(a.seed).toBe(b.seed);
    a.coreStack = ['forest']; b.coreStack = ['forest'];
    expect(startSpread(a, 1, 0)).toEqual(startSpread(b, 1, 0));
    revealSpread(a, 5); revealSpread(b, 5);
    expect(a).toEqual(b);
    finishSpread(a); finishSpread(b);
    expect(a).toEqual(b);
  });
  it.each<Terrain>(['riverbed', 'basin', 'woods', 'marsh'])('S11: %s costs double slope cost and stays unplaceable', terrain => {
    const s = makeTestState({ cols: 2, rows: 1, hex: c => ({ terrain: c === 1 ? terrain : 'plain' }) });
    expect(computeSpread(s, 0, 'forest').poolUsed).toBe(3 * s.config.spread.costUnit);
    s.coreStack = ['forest'];
    startSpread(s, 0, 0); finishSpread(s);
    expect(s.hexes[1]).toMatchObject({ terrain, biome: 'forest', placeable: false });
  });
  it('S12: a mountain range is terminal after its first tile and stays biome-less', () => {
    const s = makeTestState({ cols: 6, rows: 1, hex: c => ({ terrain: c === 1 || c === 2 ? 'mountain' : 'plain', elevation: 4 }) });
    const spread = computeSpread(s, 0, 'forest');
    expect(spread.claims.map(c => [c.hexId, c.kind])).toEqual([[0, 'claim'], [1, 'mountain']]);
    expect(spread.poolUsed).toBe(2 * s.config.spread.costUnit);
    s.coreStack = ['forest'];
    startSpread(s, 0, 0); finishSpread(s);
    expect(s.hexes[1].biome).toBe(null);
    expect(s.hexes[2].biome).toBe(null);
    expect(s.hexes[3].biome).toBe(null);
  });
});
