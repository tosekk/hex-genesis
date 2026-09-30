import { existsSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AUDIO_ASSETS } from './assets';
import { VO_ASSETS } from '../tutorial/voice';

const effects = ['offer_open', 'offer_pick', 'core_place', 'tile_flip', 'spread_done', 'build', 'demolish',
  'payout_base', 'payout_combo', 'discover', 'core_awarded', 'win', 'end'];
const expected = ['music/main_loop', ...effects.map(id => `sfx/${id}`),
  ...['biomes', 'spread', 'buildings', 'combos', 'progression'].map(id => `vo/${id}`)];

describe('shipped audio discovery', () => {
  it('resolves every expected recording from source assets exactly once', () => {
    const assets = { ...AUDIO_ASSETS, ...VO_ASSETS };
    const keys = expected.map(id => `/src/assets/audio/${id}.mp3`);
    expect(Object.keys(assets).sort()).toEqual(keys.sort());
    for (const path of keys) {
      expect(existsSync(path.slice(1)), path).toBe(true);
      expect(assets[path], path).toBeTypeOf('string');
      expect(assets[path], path).toMatch(/\.mp3(?:\?|$)/);
    }
    expect(new Set(Object.values(assets)).size).toBe(expected.length);
    expect(existsSync('public/audio') ? readdirSync('public/audio', { recursive: true }).filter(path => String(path).endsWith('.mp3')) : []).toEqual([]); // No second verbatim copy for Vite to ship.
  });
});
