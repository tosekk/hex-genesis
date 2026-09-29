import { describe, expect, it } from 'vitest';
import { addRes, canAfford, isZero, subRes } from './resources';

describe('resources', () => {
  it('canAfford treats missing keys as 0', () => {
    expect(canAfford({}, {})).toBe(true);
    expect(canAfford({}, { wood: 0 })).toBe(true);
    expect(canAfford({}, { wood: 1 })).toBe(false);
    expect(canAfford({ wood: 2 }, { wood: 2, stone: 0 })).toBe(true);
    expect(canAfford({ wood: 2 }, { wood: 2, stone: 1 })).toBe(false);
  });

  it('addRes / subRes are sparse and non-mutating', () => {
    const a = { wood: 2 };
    expect(addRes(a, { stone: 3 })).toEqual({ wood: 2, stone: 3 });
    expect(subRes(a, { wood: 1, stone: 1 })).toEqual({ wood: 1, stone: -1 });
    expect(a).toEqual({ wood: 2 });
  });

  it('isZero', () => {
    expect(isZero({})).toBe(true);
    expect(isZero({ wood: 0 })).toBe(true);
    expect(isZero({ wood: 1 })).toBe(false);
  });
});
