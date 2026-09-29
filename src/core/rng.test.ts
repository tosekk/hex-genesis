import { describe, expect, it } from 'vitest';
import { createRng, deriveSeed, rngFromState } from './rng';

describe('rng', () => {
  it('matches the reference mulberry32 vector', () => {
    const r = createRng(12345);
    const got = [r.nextU32(), r.nextU32(), r.nextU32(), r.nextU32(), r.nextU32()];
    expect(got).toEqual([4207900869, 1317490944, 2079646450, 3513001552, 2187978186]);
  });

  it('same seed → same sequence', () => {
    const a = createRng(7);
    const b = createRng(7);
    for (let i = 0; i < 20; i++) expect(a.nextU32()).toBe(b.nextU32());
  });

  it('derived streams differ from each other and are stable', () => {
    expect(deriveSeed(1, 'terrain')).not.toBe(deriveSeed(1, 'offers'));
    expect(deriveSeed(1, 'terrain')).not.toBe(deriveSeed(2, 'terrain'));
    expect(deriveSeed(1, 'terrain')).toBe(deriveSeed(1, 'terrain'));
    const a = createRng(deriveSeed(1, 'terrain'));
    const b = createRng(deriveSeed(1, 'offers'));
    expect([a.nextU32(), a.nextU32()]).not.toEqual([b.nextU32(), b.nextU32()]);
  });

  it('getState / rngFromState round-trips', () => {
    const a = createRng(99);
    a.nextU32(); a.nextU32();
    const b = rngFromState(a.getState());
    for (let i = 0; i < 10; i++) expect(b.nextU32()).toBe(a.nextU32());
  });

  it('nextInt stays in range, nextFloat in [0,1)', () => {
    const r = createRng(3);
    for (let i = 0; i < 1000; i++) {
      const n = r.nextInt(7);
      expect(Number.isInteger(n) && n >= 0 && n < 7).toBe(true);
      const f = r.nextFloat();
      expect(f >= 0 && f < 1).toBe(true);
    }
    expect(r.nextInt(1)).toBe(0);
  });
});
