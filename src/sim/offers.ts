// OWNER: deepseek — stub from O1, replace freely
import type { BiomeOffer, GameState, MainBiome, Result } from '../core/types';

/** Award one core: roll an offer into state.pendingOffer (must be null beforehand). */
export function awardCore(state: GameState): BiomeOffer {
  void state;
  throw new Error('NOT_IMPLEMENTED: awardCore (owner: deepseek)');
}

export function reshuffleOffer(state: GameState): Result<BiomeOffer> {
  void state;
  throw new Error('NOT_IMPLEMENTED: reshuffleOffer (owner: deepseek)');
}

/** Resolve the pending offer: push chosen biome onto coreStack, record history, clear pendingOffer. */
export function resolveOffer(state: GameState, index: 0 | 1): Result<MainBiome> {
  void state; void index;
  throw new Error('NOT_IMPLEMENTED: resolveOffer (owner: deepseek)');
}
