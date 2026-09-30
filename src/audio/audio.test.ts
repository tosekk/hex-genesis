// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GameSession, SessionEvent } from '../core/contracts';
import { makeTestState } from '../core/testing';
import { createAudio } from './audio';
import { audioSettings } from './settings';
import { createGameSession } from '../game/session';
import { createJournalHud } from '../ui/v2/journalHud';
import { createOfferFx, FX_TIMING } from '../fx/offerSpheres';
import type { BoardView } from '../core/contracts';

const optional = vi.hoisted(() => ({ assets: {} as Record<string, string> }));
vi.mock('./assets', () => ({ AUDIO_ASSETS: optional.assets }));
const files = ['music/main_loop.mp3', 'sfx/offer_open.mp3', 'sfx/offer_pick.mp3', 'sfx/core_place.mp3', 'sfx/tile_flip.mp3',
  'sfx/spread_done.mp3', 'sfx/build.mp3', 'sfx/demolish.mp3', 'sfx/payout_base.mp3', 'sfx/payout_combo.mp3',
  'sfx/discover.mp3', 'sfx/core_awarded.mp3', 'sfx/win.mp3', 'sfx/end.mp3'];
let clock = 0, rejection: Error | null = null;
const players: FakeAudio[] = [], disposals: (() => void)[] = [];
class FakeAudio {
  loop = false; volume = 1; playbackRate = 1; preservesPitch = true; paused = true;
  onended: (() => void) | null = null; onerror: (() => void) | null = null;
  constructor(readonly source: string) { players.push(this); }
  play = vi.fn(() => { this.paused = false; const error = rejection; rejection = null; return error ? Promise.reject(error) : Promise.resolve(); });
  pause = vi.fn(() => { this.paused = true; });
  load = vi.fn(); removeAttribute = vi.fn();
}
beforeEach(() => {
  localStorage.clear(); players.length = 0; clock = 0; rejection = null;
  audioSettings.setMuted(false); audioSettings.setVolume(0.55);
  Object.keys(optional.assets).forEach(key => delete optional.assets[key]);
  for (const file of files) optional.assets[`/src/assets/audio/${file}`] = `/audio/${file}`;
  vi.stubGlobal('Audio', FakeAudio); vi.spyOn(performance, 'now').mockImplementation(() => clock); vi.spyOn(console, 'debug').mockImplementation(() => {});
});
afterEach(() => { disposals.splice(0).forEach(dispose => dispose()); document.body.replaceChildren(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function setup(unlock = true, controls = true) {
  const state = makeTestState({ cols: 2, rows: 1 }), listeners = new Set<(event: SessionEvent) => void>();
  const command = vi.fn(() => { throw new Error('Audio must not command the game'); });
  const session: GameSession = { state, newRun: command, chooseOffer: command, reshuffleOffer: command,
    placeCore: command, placeBuilding: command, demolish: command, preview: command, endRun: command, advance: command,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; } };
  const root = document.createElement('div'); document.body.append(root);
  const audio = createAudio(root, session, { controls }); disposals.push(() => audio.dispose());
  if (unlock) window.dispatchEvent(new Event('pointerdown'));
  return { state, root, audio, command, listeners, emit: (event: SessionEvent) => listeners.forEach(listener => listener(event)),
    mute: () => root.querySelector<HTMLButtonElement>('.audio-mute')!.click() };
}
const sources = () => players.map(player => player.source);
const end = (status: 'won' | 'ended' | 'lost'): SessionEvent => ({ type: 'runEnded', status, stats: { status, seed: 1, elapsedMs: 100, lifetime: {} } });

describe('optional game audio', () => {
  it('accepts menu settings with no controls and applies changes to music and in-flight effects', () => {
    const s = setup(true, false), music = players[0];
    expect(s.root.children).toHaveLength(0);
    s.emit({ type: 'spreadFinished' }); const effect = players.at(-1)!;
    audioSettings.setVolume(0.2);
    expect(music.volume).toBeCloseTo(0.2 * 0.32); expect(effect.volume).toBe(0.2);
    audioSettings.setMuted(true);
    expect(music.paused).toBe(true); expect(effect.paused).toBe(true);
    const count = players.length; s.emit({ type: 'coreAwarded' }); expect(players).toHaveLength(count);
    audioSettings.setMuted(false); expect(music.paused).toBe(false);
    s.audio.dispose(); audioSettings.setVolume(0.8); audioSettings.setMuted(true); audioSettings.setMuted(false);
    expect(players).toHaveLength(count); expect(music.paused).toBe(true);
  });
  it('keeps legacy controls in sync with menu settings and shares changes between instances', () => {
    const legacy = setup(false), menu = setup(false, false);
    audioSettings.setVolume(0.37); audioSettings.setMuted(true);
    expect(legacy.root.querySelector<HTMLInputElement>('.audio-volume')!.value).toBe('37');
    expect(legacy.root.querySelector('.audio-mute')!.getAttribute('aria-pressed')).toBe('true');
    window.dispatchEvent(new Event('pointerdown')); expect(players).toHaveLength(0);
    legacy.mute(); expect(audioSettings.muted).toBe(false);
    expect(players.filter(player => player.loop)).toHaveLength(2);
    expect(menu.root.children).toHaveLength(0);
  });
  it('waits for a user gesture and starts only current music/offer rather than replaying old events', () => {
    const s = setup(false); s.emit({ type: 'runStarted', seed: 1 }); s.emit({ type: 'coreAwarded' });
    s.emit({ type: 'offerShown', offer: { options: ['forest', 'desert'], reshuffled: false } });
    expect(players).toHaveLength(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', metaKey: true })); expect(players).toHaveLength(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
    expect(sources()).toEqual(['/audio/music/main_loop.mp3', '/audio/sfx/offer_open.mp3']);
    expect(players[0].loop).toBe(true); expect(s.command).not.toHaveBeenCalled();
  });
  it('maps every specified session cue, ducks offers and detects placement/demolition from slot snapshots', () => {
    const s = setup(), music = players[0], normal = music.volume;
    s.emit({ type: 'offerShown', offer: { options: ['forest', 'desert'], reshuffled: false } }); expect(music.volume).toBeLessThan(normal);
    s.emit({ type: 'offerResolved', biome: 'forest' }); expect(music.volume).toBe(normal);
    s.emit({ type: 'spreadStarted', result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 } });
    s.emit({ type: 'tilesRevealed', hexIds: [0] });
    s.emit({ type: 'spreadFinished' });
    s.state.hexes[0].slots[0].building = 'lumber_camp'; s.emit({ type: 'hexChanged', hexId: 0 });
    s.emit({ type: 'hexChanged', hexId: 0 }); // A refresh without a building change is silent.
    s.state.hexes[0].slots[0].building = null; s.emit({ type: 'hexChanged', hexId: 0 });
    s.emit({ type: 'payouts', events: [{ kind: 'base', hexId: 0, amount: { wood: 4 } }] });
    s.emit({ type: 'payouts', events: [{ kind: 'base', hexId: 0, amount: { wood: 4 } }, { kind: 'pair', hexId: 0, amount: { wood: 3 } }] });
    s.emit({ type: 'payouts', events: [{ kind: 'triple', hexId: 0, amount: { food: 4 } }] });
    s.emit({ type: 'payouts', events: [{ kind: 'adjacency', hexId: 0, amount: { food: 2 } }] });
    s.emit({ type: 'combosDiscovered', comboIds: ['timber_line'] }); s.emit({ type: 'coreAwarded' }); s.emit(end('won'));
    expect(sources()).toEqual(['/audio/music/main_loop.mp3', ...[
      'offer_open', 'offer_pick', 'core_place', 'tile_flip', 'spread_done', 'build', 'demolish',
      'payout_base', 'payout_combo', 'payout_combo', 'discover', 'core_awarded', 'win',
    ].map(id => `/audio/sfx/${id}.mp3`)]);
    expect(music.pause).toHaveBeenCalled(); expect(s.command).not.toHaveBeenCalled();
    s.emit({ type: 'runStarted', seed: 2 }); s.emit(end('ended')); expect(sources().at(-1)).toBe('/audio/sfx/end.mp3');
    s.emit({ type: 'runStarted', seed: 3 }); s.emit(end('lost')); expect(sources().at(-1)).toBe('/audio/sfx/end.mp3');
  });
  it('throttles tile batches to at most 12 per second and varies only the presentation pitch', () => {
    const s = setup();
    for (clock = 0; clock < 1000; clock++) s.emit({ type: 'tilesRevealed', hexIds: [0, 1] });
    const flips = players.filter(player => player.source.endsWith('tile_flip.mp3'));
    expect(flips).toHaveLength(12);
    expect(flips.every(player => player.playbackRate >= 0.96 && player.playbackRate <= 1.04 && !player.preservesPitch)).toBe(true);
    expect(s.state.hexes.every(hex => hex.biome === null)).toBe(true);
  });
  it('persists mute and volume, pauses playback, and resumes music only after an unlocked unmute', () => {
    const s = setup(), music = players[0], slider = s.root.querySelector<HTMLInputElement>('.audio-volume')!;
    slider.value = '25'; slider.dispatchEvent(new Event('input')); s.mute();
    expect(music.paused).toBe(true); expect(s.root.querySelector('.audio-mute')!.getAttribute('aria-pressed')).toBe('true');
    s.audio.dispose(); const next = setup(false);
    expect(next.root.querySelector<HTMLInputElement>('.audio-volume')!.value).toBe('25');
    expect(next.root.querySelector('.audio-mute')!.getAttribute('aria-pressed')).toBe('true');
    const count = players.length; window.dispatchEvent(new Event('pointerdown')); expect(players).toHaveLength(count);
    next.mute(); expect(players.at(-1)!.source).toBe('/audio/music/main_loop.mp3');
    expect(players.at(-1)!.volume).toBeCloseTo(0.25 * 0.32);
  });
  it('silently skips absent assets, logs once, disables corrupt media and catches rejected playback', async () => {
    delete optional.assets['/src/assets/audio/music/main_loop.mp3']; delete optional.assets['/src/assets/audio/sfx/build.mp3'];
    const s = setup(); s.state.hexes[0].slots[0].building = 'a'; s.emit({ type: 'hexChanged', hexId: 0 });
    s.state.hexes[0].slots[1].building = 'b'; s.emit({ type: 'hexChanged', hexId: 0 });
    expect(players).toHaveLength(0); expect(console.debug).toHaveBeenCalledTimes(2);
    s.emit({ type: 'spreadFinished' }); const broken = players.at(-1)!; broken.onerror!();
    s.emit({ type: 'spreadFinished' }); expect(players.at(-1)).toBe(broken);
    rejection = new DOMException('unsupported', 'NotSupportedError'); s.emit({ type: 'coreAwarded' }); await Promise.resolve();
    const count = players.length; s.emit({ type: 'coreAwarded' }); expect(players).toHaveLength(count);
    expect(console.debug).toHaveBeenCalledTimes(4);
  });
  it('works with blocked storage, recovers policy rejection and cleans up active players/listeners', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
    rejection = new DOMException('autoplay', 'NotAllowedError'); const s = setup(); await Promise.resolve();
    s.emit({ type: 'offerResolved', biome: 'forest' }); expect(players.filter(player => player.loop)).toHaveLength(2);
    s.mute(); s.mute(); s.emit({ type: 'spreadFinished' });
    const count = players.length; s.audio.dispose(); s.audio.dispose();
    window.dispatchEvent(new Event('pointerdown')); s.emit({ type: 'coreAwarded' });
    expect(players).toHaveLength(count); expect(players.every(player => player.paused)).toBe(true);
    expect(players.every(player => player.onended === null && player.onerror === null)).toBe(true);
    expect(s.listeners.size).toBe(0); expect(s.root.children).toHaveLength(0);
  });
});

it('loops and ducks music, respects the Sound menu, and fires one pick cue with real offer spheres', async () => {
  vi.useFakeTimers();
  const root = document.createElement('div'); root.id = 'ui'; document.body.append(root);
  const session = createGameSession({ now: () => 0 });
  const board: BoardView = { setBoard: vi.fn(), refreshHex: vi.fn(), playReveal: vi.fn(), setCores: vi.fn(),
    setHighlights: vi.fn(), update: vi.fn(), resize: vi.fn(), dispose: vi.fn(), onPointer: () => () => {} };
  const hud = createJournalHud(root, session, board, { createJournal: null, createOfferFx: node => createOfferFx(node, { reducedMotion: true }) });
  const audio = createAudio(root, session, { controls: false }); disposals.push(hud.dispose, audio.dispose, () => vi.useRealTimers());
  const choose = vi.spyOn(session, 'chooseOffer'); session.newRun(1); expect(players).toHaveLength(0);
  document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
  const music = players.find(p => p.loop)!; expect(music.loop).toBe(true); expect(music.volume).toBeCloseTo(.55 * .32 * .25);
  document.body.dispatchEvent(new KeyboardEvent('keydown', { key: '2', bubbles: true }));
  document.body.dispatchEvent(new KeyboardEvent('keydown', { key: '1', bubbles: true }));
  expect(choose).toHaveBeenCalledTimes(1); expect(players.filter(p => p.source.endsWith('offer_pick.mp3'))).toHaveLength(1);
  expect(players.filter(p => p.source.endsWith('offer_open.mp3'))).toHaveLength(1); expect(music.volume).toBeCloseTo(.55 * .32);
  await vi.advanceTimersByTimeAsync(FX_TIMING.fade + 1);
  root.querySelector<HTMLButtonElement>('.menu-btn')!.click(); root.querySelector<HTMLButtonElement>('.menu-mute')!.click();
  expect(music.paused).toBe(true); const count = players.length; session.newRun(7); expect(players).toHaveLength(count);
  root.querySelector<HTMLButtonElement>('.menu-btn')!.click(); root.querySelector<HTMLButtonElement>('.menu-mute')!.click();
  expect(players.at(-1)!.loop).toBe(true); expect(players.at(-1)!.volume).toBeCloseTo(.55 * .32 * .25);
});
