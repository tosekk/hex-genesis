import type { LineId } from './lines';

// Discover optional prerecorded files at build time. Missing files cause no 404 requests.
const VO_ASSETS = import.meta.glob<string>('/public/audio/vo/*.mp3', { eager: true, query: '?url', import: 'default' });

export function createVoicePlayback(assets: Record<string, string> = VO_ASSETS): {
  play(id: LineId, onFinish: () => void): boolean; stop(): void;
} {
  let audio: HTMLAudioElement | null = null;
  const stop = () => {
    if (!audio) return;
    audio.onended = null; audio.onerror = null; audio.pause(); audio.removeAttribute('src'); audio.load(); audio = null;
  };
  return {
    play(id, onFinish) {
      stop();
      const url = assets[`/public/audio/vo/${id}.mp3`];
      if (!url || typeof Audio === 'undefined') return false;
      try {
        const current = new Audio(url); audio = current;
        const finish = () => { if (audio === current) { stop(); onFinish(); } };
        current.onended = finish; current.onerror = finish;
        const attempt = current.play();
        attempt?.catch(finish); // Includes autoplay rejection and missing/corrupt optional assets.
        return true;
      } catch { stop(); return false; }
    },
    stop,
  };
}
