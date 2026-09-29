// OWNER: sonnet — stub from O1, replace freely
import type { BoardView, GameSession, Hud } from '../core/contracts';

export function createHud(root: HTMLElement, session: GameSession, board: BoardView): Hud {
  void session; void board;
  const el = document.createElement('div');
  el.textContent = 'HUD stub';
  el.style.cssText = 'position:absolute;top:8px;left:8px;font:12px monospace;opacity:.6';
  root.appendChild(el);
  return { dispose() { el.remove(); } };
}
