import type { RngState } from './types';

/**
 * Deterministic PRNG (mulberry32). Pure uint32 integer math via Math.imul and >>> 0,
 * so every JS engine produces the same sequence.
 */
export interface Rng {
  nextU32(): number;
  /** [0, 1). Exact: nextU32() / 2^32. */
  nextFloat(): number;
  /** Uniform integer in [0, maxExclusive). Unbiased (rejection sampling). */
  nextInt(maxExclusive: number): number;
  getState(): RngState;
}

const TWO_POW_32 = 4294967296;

export function rngFromState(state: RngState): Rng {
  let s = state.s >>> 0;
  const nextU32 = (): number => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  };
  return {
    nextU32,
    nextFloat: () => nextU32() / TWO_POW_32,
    nextInt(maxExclusive: number): number {
      const n = Math.floor(maxExclusive);
      if (!(n >= 1) || n > TWO_POW_32) throw new Error(`nextInt: bad bound ${maxExclusive}`);
      // Largest multiple of n that fits in 2^32; reject values above it to avoid modulo bias.
      const limit = TWO_POW_32 - (TWO_POW_32 % n);
      let v = nextU32();
      while (v >= limit) v = nextU32();
      return v % n;
    },
    getState: () => ({ s }),
  };
}

export function createRng(seed: number): Rng {
  return rngFromState({ s: seed >>> 0 });
}

/** Independent uint32 seed for a named stream ('terrain', 'offers', …): FNV-1a over the name, mixed with the seed. */
export function deriveSeed(seed: number, stream: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < stream.length; i++) {
    h ^= stream.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  h = (h ^ (seed >>> 0)) >>> 0;
  // murmur3 fmix32 finaliser
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b) >>> 0;
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35) >>> 0;
  h ^= h >>> 16;
  return h >>> 0;
}
