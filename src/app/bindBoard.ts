import type { BoardView, GameSession } from '../core/contracts';

/** Drives the BoardView from SessionEvents. Returns an unsubscribe function. */
export function bindBoard(session: GameSession, board: BoardView): () => void {
  return session.subscribe((e) => {
    const state = session.state;
    switch (e.type) {
      case 'runStarted':
        board.setBoard(state);
        board.setCores(state.cores);
        break;
      case 'spreadStarted':
        board.setCores(state.cores);
        break;
      case 'tilesRevealed':
        board.playReveal(state, e.hexIds);
        break;
      case 'hexChanged':
        board.refreshHex(state, e.hexId);
        break;
    }
  });
}
