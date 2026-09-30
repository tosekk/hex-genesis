import { createGameSession } from '../../../src/game/session';
import type { GameState } from '../../../src/core/types';
import type { Witness } from './audit';

/** Test-only hydration into a real session: validate command gates and every intermediate end check. */
export function replaySessionWitness(input: Readonly<GameState>, witness: Witness) {
  const session = createGameSession({ config: input.config, now: () => 0 });
  Object.assign(session.state, structuredClone(input), { status: 'playing' });
  let actions = 0;
  for (const action of witness.actions) {
    const result = action.kind === 'demolish'
      ? session.demolish(action.hexId, action.slot)
      : session.placeBuilding(action.hexId, action.slot, action.building);
    if (!result.ok) return { ok: false as const, actions, reason: result.reason, blockedState: structuredClone(session.state) };
    actions++;
    if ('payouts' in result.value && result.value.payouts.some(p => Object.values(p.amount).some(n => n > 0))) {
      if (actions !== witness.actions.length || JSON.stringify(result.value.payouts) !== JSON.stringify(witness.payouts)) throw new Error('Session payout differs from transaction witness');
      return { ok: true as const, actions, finalStatus: session.state.status };
    }
  }
  throw new Error('Session witness has no payout');
}
