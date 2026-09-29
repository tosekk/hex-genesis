import type { BoardView, GameSession } from '../core/contracts';

/** Drives the BoardView from SessionEvents. Returns an unsubscribe function. */
export function bindBoard(session: GameSession, board: BoardView): () => void {
  return session.subscribe((e) => {
    const state = session.state;
    switch (e.type) {
      case 'runStarted':
        board.setBoard(state);
        board.setCores(state.cores);
        board.setHighlights('locked', []);
        break;
      case 'spreadStarted':
        board.setCores(state.cores);
        // §11: the whole claim set is unbuildable until the spread finishes.
        board.setHighlights('locked', e.result.claims.map((c) => c.hexId));
        break;
      case 'tilesRevealed':
        board.playReveal(state, e.hexIds);
        break;
      case 'spreadFinished':
        board.setHighlights('locked', []);
        break;
      case 'hexChanged':
        board.refreshHex(state, e.hexId);
        break;
    }
  });
}
