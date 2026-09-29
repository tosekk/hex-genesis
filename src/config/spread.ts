import type { AnimationConfig, SpreadConfig } from '../core/types';

export const SPREAD: SpreadConfig = {
  poolRadius: 4,          // §12: pool = 3r(r+1)+1+2r = 69 tiles' worth
  costUnit: 4,            // 1.0 spread cost = 4 units, so ×2 and ×0.5 stay integral
  uphillPerLevel: 4,      // PLACEHOLDER
  downhillPerLevel: 2,    // PLACEHOLDER
  minStepCost: 1,         // PLACEHOLDER (must be > 0, §13)
  naturalMultiplier: 2,   // §13
  conversionMultiplier: 0.5, // §17
  maxConversionDepth: 2,  // §17
  minCoreDistance: 6,     // §10
};

export const ANIMATION: AnimationConfig = {
  spreadMaxMs: 5000, // §15
  tileFlipMs: 350,
};
