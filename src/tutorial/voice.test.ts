// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { audioSettings } from '../audio/settings';
import { createVoicePlayback } from './voice';

const assets = { '/src/assets/audio/vo/biomes.mp3': '/assets/biomes.mp3', '/src/assets/audio/vo/spread.mp3': '/assets/spread.mp3' };
const players: FakeAudio[] = [], disposals: (() => void)[] = [];
let rejection: Error | null = null;
class FakeAudio {
  volume = 1; onended: (() => void) | null = null; onerror: (() => void) | null = null;
  constructor(readonly url: string) { players.push(this); }
  pause = vi.fn(); load = vi.fn(); removeAttribute = vi.fn();
  play = vi.fn(() => { const error = rejection; rejection = null; return error ? Promise.reject(error) : Promise.resolve(); });
}
const gesture = () => window.dispatchEvent(new Event('pointerdown'));
const use = () => { const voice = createVoicePlayback(assets); disposals.push(voice.dispose); return voice; };
beforeEach(() => { players.length = 0; rejection = null; audioSettings.setMuted(false); audioSettings.setVolume(.55); vi.stubGlobal('Audio', FakeAudio); });
afterEach(() => { disposals.splice(0).forEach(off => off()); vi.unstubAllGlobals(); });
describe('optional prerecorded voice', () => {
  it('does not construct audio when the recording is absent', () => {
    const voice = createVoicePlayback({}); disposals.push(voice.dispose);
    expect(voice.play('biomes', vi.fn())).toBe(false); gesture(); expect(players).toHaveLength(0);
  });
  it('queues without requesting a recording before the first gesture, then plays exactly once', () => {
    const voice = use(); expect(voice.play('biomes', vi.fn())).toBe(true); expect(players).toHaveLength(0);
    gesture(); expect(players[0].url).toBe('/assets/biomes.mp3'); expect(players[0].play).toHaveBeenCalledOnce();
    gesture(); expect(players).toHaveLength(1);
  });
  it('keeps only the current line queued and accepts an unmodified keyboard gesture', () => {
    const voice = use(); voice.play('biomes', vi.fn()); voice.play('spread', vi.fn());
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's', ctrlKey: true })); expect(players).toHaveLength(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' })); expect(players.map(p => p.url)).toEqual(['/assets/spread.mp3']);
  });
  it('uses Sound volume live, stops on mute/zero volume and does not restart an old line on unmute', () => {
    const voice = use(), finish = vi.fn(); audioSettings.setVolume(.4); voice.play('biomes', finish); gesture();
    expect(players[0].volume).toBe(.4); audioSettings.setVolume(.2); expect(players[0].volume).toBe(.2);
    audioSettings.setMuted(true); expect(players[0].pause).toHaveBeenCalledOnce(); expect(finish).toHaveBeenCalledOnce();
    expect(voice.play('spread', vi.fn())).toBe(false); audioSettings.setMuted(false); gesture(); expect(players).toHaveLength(1);
    voice.play('spread', vi.fn()); audioSettings.setVolume(0); expect(players[1].pause).toHaveBeenCalledOnce();
    expect(voice.play('biomes', vi.fn())).toBe(false);
  });
  it('drops a queued line when muted, skipped or disposed and removes gesture/settings listeners', () => {
    const voice = use(); voice.play('biomes', vi.fn()); audioSettings.setMuted(true); audioSettings.setMuted(false); gesture();
    expect(players).toHaveLength(0); voice.play('spread', vi.fn()); expect(players).toHaveLength(1);
    voice.dispose(); gesture(); audioSettings.setVolume(.1); expect(players[0].volume).toBe(.55);
    expect(players[0].onended).toBeNull(); expect(players[0].onerror).toBeNull(); expect(voice.play('biomes', vi.fn())).toBe(false);
  });
  it('retries a policy-rejected current line on the next gesture', async () => {
    const voice = use(), finish = vi.fn(); rejection = new DOMException('Autoplay denied', 'NotAllowedError');
    voice.play('biomes', finish); gesture(); await Promise.resolve();
    expect(finish).not.toHaveBeenCalled(); expect(players[0].pause).toHaveBeenCalledOnce();
    gesture(); expect(players).toHaveLength(2); expect(players[1].play).toHaveBeenCalledOnce();
    players[1].onended!(); expect(finish).toHaveBeenCalledOnce(); gesture(); expect(players).toHaveLength(2);
  });
  it('finishes unsupported playback without replaying it on a later click', async () => {
    const voice = use(), finish = vi.fn(); rejection = new Error('Unsupported media'); voice.play('biomes', finish); gesture();
    await Promise.resolve(); expect(finish).toHaveBeenCalledOnce(); expect(players[0].pause).toHaveBeenCalledOnce();
    voice.stop(); gesture(); expect(players).toHaveLength(1);
  });
});
