import type { GameSession, SessionEvent } from '../core/contracts';
import type { GameState } from '../core/types';
import { createAudio } from './audio';

/** Synthetic renderer events only; production uses the real session directly. */
export function mountAudioSandbox(root: HTMLElement, state: () => Readonly<GameState>): {
  emit(event: SessionEvent): void; dispose(): void;
} {
  const listeners = new Set<(event: SessionEvent) => void>();
  const unavailable = (): never => { throw new Error('Audio sandbox has no game commands'); };
  const session: GameSession = { get state() { return state(); },
    newRun: unavailable, chooseOffer: unavailable, reshuffleOffer: unavailable, placeCore: unavailable,
    placeBuilding: unavailable, demolish: unavailable, preview: unavailable, endRun: unavailable, advance: unavailable,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
  };
  const audio = createAudio(root, session);
  return { emit(event) { listeners.forEach(listener => listener(event)); }, dispose() { audio.dispose(); listeners.clear(); } };
}
