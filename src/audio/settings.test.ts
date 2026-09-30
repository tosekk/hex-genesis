// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => { localStorage.clear(); vi.resetModules(); });
afterEach(() => { vi.restoreAllMocks(); });

describe('shared audio settings', () => {
  it('loads existing preferences and persists updates under the existing storage key', async () => {
    localStorage.setItem('terraform.audio.v1', JSON.stringify({ muted: true, volume: 0.3 }));
    const { audioSettings } = await import('./settings');
    expect(audioSettings.muted).toBe(true); expect(audioSettings.volume).toBe(0.3);
    audioSettings.setMuted(false); audioSettings.setVolume(0.7);
    expect(JSON.parse(localStorage.getItem('terraform.audio.v1')!)).toEqual({ muted: false, volume: 0.7 });
    vi.resetModules(); const fresh = (await import('./settings')).audioSettings;
    expect(fresh.muted).toBe(false); expect(fresh.volume).toBe(0.7);
  });
  it('clamps finite volumes, ignores nonfinite input, and notifies only on changes until unsubscribed', async () => {
    const { audioSettings } = await import('./settings');
    const listener = vi.fn(), off = audioSettings.subscribe(listener);
    expect(listener).not.toHaveBeenCalled();
    audioSettings.setVolume(4); expect(audioSettings.volume).toBe(1);
    audioSettings.setVolume(1); audioSettings.setVolume(NaN); audioSettings.setVolume(Infinity);
    expect(listener).toHaveBeenCalledTimes(1);
    audioSettings.setVolume(-2); expect(audioSettings.volume).toBe(0);
    audioSettings.setMuted(true); expect(listener).toHaveBeenCalledTimes(3);
    off(); off(); audioSettings.setMuted(false); expect(listener).toHaveBeenCalledTimes(3);
  });
  it('falls back safely for corrupt or blocked storage and still controls audio', async () => {
    localStorage.setItem('terraform.audio.v1', 'broken');
    const first = (await import('./settings')).audioSettings;
    expect(first.muted).toBe(false); expect(first.volume).toBe(0.55);
    vi.resetModules();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
    const second = (await import('./settings')).audioSettings;
    expect(second.volume).toBe(0.55);
    expect(() => { second.setMuted(true); second.setVolume(0.1); }).not.toThrow();
    expect(second.muted).toBe(true); expect(second.volume).toBe(0.1);
  });
});
