// OWNER: astra — designer reassignment of D2.
import { rngFromState } from '../core/rng';
import { err, ok } from '../core/result';
import { MAIN_BIOMES } from '../core/types';
import type { BiomeOffer, GameState, MainBiome, Result } from '../core/types';

/** Only the offer stream advances. Both award and reshuffle apply the same §9 rules. */
function rollOffer(state: GameState, reshuffled: boolean): BiomeOffer {
  const rng = rngFromState(state.offerRng);
  const options: [MainBiome, MainBiome] = [
    MAIN_BIOMES[rng.nextInt(MAIN_BIOMES.length)],
    MAIN_BIOMES[rng.nextInt(MAIN_BIOMES.length)],
  ];
  const first = state.offerHistory.length === 0 && state.cores.length === 0;
  const last = state.offerHistory.at(-1);
  const previous = state.offerHistory.at(-2);
  const repeated = last && previous
    && last[0] === last[1] && previous[0] === last[0] && previous[1] === last[0]
    && options[0] === last[0] && options[1] === last[0];
  if ((first && options[0] === options[1]) || repeated) {
    // Construct a valid pair with one bounded extra draw rather than a retry loop.
    const alternatives = MAIN_BIOMES.filter(biome => biome !== options[0]);
    options[1] = alternatives[rng.nextInt(alternatives.length)];
  }
  state.offerRng = rng.getState();
  return { options, reshuffled };
}

/** Award one core: the chosen biome enters coreStack only when the offer resolves. */
export function awardCore(state: GameState): BiomeOffer {
  if (state.pendingOffer !== null) throw new Error('Cannot award a core while a biome offer is pending');
  state.pendingOffer = rollOffer(state, false);
  return state.pendingOffer;
}

export function reshuffleOffer(state: GameState): Result<BiomeOffer> {
  if (state.pendingOffer === null) return err('No biome offer is pending');
  if (state.reshufflesUsed >= state.config.reshufflesPerRun) return err('No reshuffles remaining');
  state.pendingOffer = rollOffer(state, true);
  state.reshufflesUsed++;
  return ok(state.pendingOffer);
}

/** Resolve the final displayed pair; historical pairs never alias the old display object. */
export function resolveOffer(state: GameState, index: 0 | 1): Result<MainBiome> {
  if (state.pendingOffer === null) return err('No biome offer is pending');
  if (index !== 0 && index !== 1) return err('Invalid biome offer option');
  const { options } = state.pendingOffer;
  const biome = options[index];
  state.coreStack.push(biome);
  state.offerHistory.push([...options]);
  state.pendingOffer = null;
  return ok(biome);
}
