import { audioSettings } from '../audio/settings';
import type { LineId } from './lines';

// Discover optional prerecorded files at build time. Missing files cause no requests.
export const VO_ASSETS = import.meta.glob<string>('/src/assets/audio/vo/*.mp3', { eager: true, query: '?url', import: 'default' });

export function createVoicePlayback(assets: Record<string, string> = VO_ASSETS): {
  play(id: LineId, onFinish: () => void): boolean; stop(): void; dispose(): void;
} {
  type Request = { url: string; onFinish(): void };
  let audio: HTMLAudioElement | null = null, pending: Request | null = null;
  let finishActive: (() => void) | null = null, disposed = false;
  let unlocked = typeof navigator !== 'undefined' && navigator.userActivation?.hasBeenActive === true;
  const stop = () => {
    pending = null; finishActive = null;
    const current = audio; audio = null;
    if (!current) return;
    current.onended = null; current.onerror = null;
    try { current.pause(); current.removeAttribute('src'); current.load(); } catch { /* Optional media cleanup. */ }
  };
  function start(request: Request): boolean {
    if (disposed || audioSettings.muted || audioSettings.volume === 0) return false;
    try {
      const current = new Audio(request.url); audio = current;
      current.volume = audioSettings.volume;
      const finish = () => { if (audio === current) { stop(); request.onFinish(); } };
      finishActive = finish; current.onended = finish; current.onerror = finish;
      const rejected = (error: unknown) => {
        if (audio !== current) return;
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          stop(); unlocked = false; pending = request; // Retry only the current line on the next gesture.
        } else finish();
      };
      try { current.play()?.catch(rejected); } catch (error) { rejected(error); }
      return true;
    } catch { stop(); return false; }
  }
  function unlock(event: Event): void {
    if (event instanceof KeyboardEvent && (event.ctrlKey || event.metaKey || event.altKey || event.repeat)) return;
    if (disposed) return;
    unlocked = true;
    const request = pending; pending = null;
    if (request) start(request);
  }
  const offSettings = audioSettings.subscribe(() => {
    if (audioSettings.muted || audioSettings.volume === 0) {
      if (finishActive) finishActive(); else stop();
    } else if (audio) audio.volume = audioSettings.volume;
  });
  if (typeof window !== 'undefined') {
    window.addEventListener('pointerdown', unlock, true);
    window.addEventListener('keydown', unlock, true);
  }
  return {
    play(id, onFinish) {
      stop();
      const url = assets[`/src/assets/audio/vo/${id}.mp3`];
      if (disposed || !url || typeof Audio === 'undefined' || audioSettings.muted || audioSettings.volume === 0) return false;
      const request = { url, onFinish };
      if (!unlocked) { pending = request; return true; }
      return start(request);
    },
    stop,
    dispose() {
      if (disposed) return; disposed = true; stop(); offSettings();
      if (typeof window !== 'undefined') {
        window.removeEventListener('pointerdown', unlock, true);
        window.removeEventListener('keydown', unlock, true);
      }
    },
  };
}
