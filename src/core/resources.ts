import type { Resources } from './types';

// Resources are sparse: a missing key means 0.

export function addRes(a: Resources, b: Resources): Resources {
  const out: Resources = { ...a };
  for (const k of Object.keys(b)) out[k] = (out[k] ?? 0) + b[k];
  return out;
}

export function subRes(a: Resources, b: Resources): Resources {
  const out: Resources = { ...a };
  for (const k of Object.keys(b)) out[k] = (out[k] ?? 0) - b[k];
  return out;
}

export function canAfford(have: Resources, cost: Resources): boolean {
  for (const k of Object.keys(cost)) {
    if ((have[k] ?? 0) < cost[k]) return false;
  }
  return true;
}

export function isZero(r: Resources): boolean {
  for (const k of Object.keys(r)) if (r[k] !== 0) return false;
  return true;
}
