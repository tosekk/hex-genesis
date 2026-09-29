// OWNER: deepseek — stub from O1, replace freely
import type { GameState } from '../core/types';

/** §41 */
export function checkWin(state: Readonly<GameState>): boolean {
  void state;
  throw new Error('NOT_IMPLEMENTED: checkWin (owner: deepseek)');
}

/** Conservative (§43, §44): true ONLY if the run is provably dead. When unsure → false. */
export function isProvablySoftLocked(state: Readonly<GameState>): boolean {
  void state;
  throw new Error('NOT_IMPLEMENTED: isProvablySoftLocked (owner: deepseek)');
}
