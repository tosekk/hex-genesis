import { afterEach, describe, expect, it, vi } from 'vitest';
import { createVoicePlayback } from './voice';

afterEach(() => vi.unstubAllGlobals());
describe('optional prerecorded voice', () => {
  it('does not construct audio when the recording is absent', () => {
    const audio = vi.fn(); vi.stubGlobal('Audio', audio);
    expect(createVoicePlayback({}).play('biomes', vi.fn())).toBe(false);
    expect(audio).not.toHaveBeenCalled();
  });
  it('handles autoplay rejection and stops without leaking callbacks', async () => {
    const pause = vi.fn(), load = vi.fn(), finished = vi.fn();
    vi.stubGlobal('Audio', class {
      onended = null; onerror = null;
      pause = pause; load = load; removeAttribute = vi.fn();
      play() { return Promise.reject(new Error('Autoplay denied')); }
    });
    const voice = createVoicePlayback({ '/public/audio/vo/biomes.mp3': '/audio/vo/biomes.mp3' });
    expect(voice.play('biomes', finished)).toBe(true);
    await Promise.resolve();
    expect(finished).toHaveBeenCalledOnce(); expect(pause).toHaveBeenCalledOnce(); expect(load).toHaveBeenCalledOnce();
    voice.stop(); expect(pause).toHaveBeenCalledOnce();
  });
});
