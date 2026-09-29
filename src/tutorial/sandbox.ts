import type { GameSession, SessionEvent } from '../core/contracts';
import { createInitialState } from '../core/state';
import { DEFAULT_CONFIG } from '../config';
import { createTutorial } from './tutorial';

/** Event-only tutorial harness. No dependency on WIP game-flow modules. */
export function mountTutorialSandbox(root: HTMLElement, button: HTMLButtonElement): () => void {
  const state = createInitialState(42, DEFAULT_CONFIG, 0);
  const listeners = new Set<(event: SessionEvent) => void>();
  const unavailable = (): never => { throw new Error('Tutorial sandbox has no game commands'); };
  const session: GameSession = {
    state, subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    newRun: unavailable, chooseOffer: unavailable, reshuffleOffer: unavailable, placeCore: unavailable,
    placeBuilding: unavailable, demolish: unavailable, preview: unavailable, endRun: unavailable, advance: unavailable,
  };
  const tutorial = createTutorial(root, session);
  const emit = (event: SessionEvent) => listeners.forEach(listener => listener(event));
  const steps: SessionEvent[] = [
    { type: 'offerShown', offer: { options: ['forest', 'desert'], reshuffled: false } },
    { type: 'spreadStarted', result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 } },
    { type: 'spreadFinished' },
    { type: 'payouts', events: [{ kind: 'pair', hexId: 0, amount: { wood: 1 } }] },
    { type: 'coreAwarded' },
  ];
  let index = 0;
  function advance(): void {
    if (index === 0) { state.pendingOffer = null; emit({ type: 'runStarted', seed: 42 }); emit({ type: 'coreAwarded' }); }
    const step = steps[index];
    state.pendingOffer = step.type === 'offerShown' ? step.offer : null;
    emit(step); index = (index + 1) % steps.length;
    button.textContent = `Tutorial event ${index || 5}/5`;
  }
  button.addEventListener('click', advance);
  return () => { button.removeEventListener('click', advance); tutorial.dispose(); };
}
