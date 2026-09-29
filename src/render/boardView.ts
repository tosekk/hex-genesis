// OWNER: sol — stub from O1, replace freely
import type { BoardView } from '../core/contracts';
import type { GameConfig } from '../core/types';

export function createBoardView(container: HTMLElement, config: GameConfig): BoardView {
  void container; void config;
  return {
    setBoard() {},
    refreshHex() {},
    playReveal() {},
    setCores() {},
    setHighlights() {},
    onPointer() { return () => {}; },
    update() {},
    resize() {},
    dispose() {},
  };
}
