import type { GameSession, SessionEvent } from '../core/contracts';
import type { BuildingId, HexId } from '../core/types';
import { AUDIO_ASSETS } from './assets';
import { audioSettings } from './settings';
import './styles.css';

const MUSIC = 'music/main_loop.mp3';
const FLIP_INTERVAL_MS = 1000 / 12;

/** Self-contained optional audio. No game commands, state mutations, or runtime generation. */
export function createAudio(root: HTMLElement, session: GameSession, options: { controls?: boolean } = {}): { dispose(): void } {
  const settings = audioSettings, active = new Set<HTMLAudioElement>(), failed = new Set<string>(), logged = new Set<string>();
  const slots = new Map<HexId, (BuildingId | null)[]>();
  const controls = options.controls === false ? null : document.createElement('div');
  if (controls) {
    controls.className = 'audio-controls';
    controls.setAttribute('role', 'group'); controls.setAttribute('aria-label', 'Game audio');
    controls.innerHTML = '<button type="button" class="audio-mute"></button><label>Volume <input class="audio-volume" type="range" min="0" max="100" step="1" aria-label="Audio volume"></label>';
    root.append(controls);
  }
  const mute = controls?.querySelector<HTMLButtonElement>('.audio-mute'), volume = controls?.querySelector<HTMLInputElement>('.audio-volume');
  let unlocked = false, disposed = false, running = session.state.status === 'playing';
  let offerOpen = session.state.pendingOffer !== null, music: HTMLAudioElement | null = null;
  let pendingCue: string | null = offerOpen ? 'sfx/offer_open.mp3' : null, lastFlip = -Infinity;
  const snapshot = () => { slots.clear(); for (const hex of session.state.hexes) slots.set(hex.id, hex.slots.map(slot => slot.building)); };
  snapshot();
  function debugOnce(key: string, message: string): void {
    if (logged.has(key)) return; logged.add(key); console.debug(`[audio] ${message}`);
  }
  function urlFor(file: string): string | null {
    if (failed.has(file)) return null;
    const url = AUDIO_ASSETS[`/src/assets/audio/${file}`];
    if (!url) { debugOnce(file, `Optional file absent: ${file}`); return null; }
    return url;
  }
  function release(audio: HTMLAudioElement): void {
    active.delete(audio); audio.onended = null; audio.onerror = null;
    try { audio.pause(); audio.removeAttribute('src'); audio.load(); } catch { /* Optional media cleanup. */ }
  }
  function stopEffects(): void { for (const audio of [...active]) release(audio); }
  function stopMusic(remove = false): void {
    if (!music) return;
    try { music.pause(); } catch { /* Optional media cleanup. */ }
    if (remove) { release(music); music = null; }
  }
  function reject(file: string, audio: HTMLAudioElement, error?: unknown): void {
    if (disposed || (music !== audio && !active.has(audio))) return;
    // A policy rejection may recover on a later gesture/event; corrupt assets are disabled for this instance.
    if (!(error instanceof DOMException && error.name === 'NotAllowedError')) failed.add(file);
    debugOnce(file, `Cannot play optional file: ${file}`);
    if (music === audio) music = null;
    release(audio);
  }
  function updateMusic(): void {
    if (!unlocked || disposed || !running || settings.muted || settings.volume === 0) { stopMusic(); return; }
    if (!music) {
      const url = urlFor(MUSIC); if (!url) return;
      try {
        music = new Audio(url); music.loop = true;
        const current = music; current.onerror = () => reject(MUSIC, current);
      } catch { failed.add(MUSIC); debugOnce(MUSIC, `Cannot create optional audio: ${MUSIC}`); return; }
    }
    music.volume = settings.volume * 0.32 * (offerOpen ? 0.25 : 1);
    if (music.paused) {
      const current = music;
      try { current.play()?.catch(error => reject(MUSIC, current, error)); } catch (error) { reject(MUSIC, current, error); }
    }
  }
  function play(file: string, pitch = 1): void {
    if (!unlocked || disposed || settings.muted || settings.volume === 0) return;
    const url = urlFor(file); if (!url) return;
    try {
      if (active.size >= 12) release(active.values().next().value!);
      const audio = new Audio(url); audio.volume = settings.volume; audio.playbackRate = pitch;
      if (pitch !== 1) audio.preservesPitch = false;
      active.add(audio); audio.onended = () => release(audio); audio.onerror = () => reject(file, audio);
      try { audio.play()?.catch(error => reject(file, audio, error)); } catch (error) { reject(file, audio, error); }
    } catch { failed.add(file); debugOnce(file, `Cannot create optional audio: ${file}`); }
  }
  function syncControls(): void {
    if (!mute || !volume) return;
    mute.textContent = settings.muted ? 'Unmute' : 'Mute'; mute.setAttribute('aria-label', settings.muted ? 'Unmute audio' : 'Mute audio');
    mute.setAttribute('aria-pressed', String(settings.muted)); volume.value = String(Math.round(settings.volume * 100));
  }
  function onMute(): void { settings.setMuted(!settings.muted); }
  function onVolume(): void { if (volume) settings.setVolume(Number(volume.value) / 100); }
  function onSettings(): void {
    syncControls();
    for (const audio of active) audio.volume = settings.volume;
    if (settings.muted || settings.volume === 0) stopEffects(); updateMusic();
  }
  function unlock(event: Event): void {
    if (event instanceof KeyboardEvent && (event.ctrlKey || event.metaKey || event.altKey)) return;
    if (unlocked || disposed) return; unlocked = true;
    window.removeEventListener('pointerdown', unlock, true); window.removeEventListener('keydown', unlock, true);
    updateMusic(); if (pendingCue) play(pendingCue); pendingCue = null;
  }
  function onEvent(event: SessionEvent): void {
    if (disposed) return;
    switch (event.type) {
      case 'runStarted':
        stopEffects(); stopMusic(true); snapshot(); running = true; offerOpen = false; pendingCue = null; lastFlip = -Infinity; updateMusic(); break;
      case 'offerShown': offerOpen = true; updateMusic(); if (!unlocked) pendingCue = 'sfx/offer_open.mp3'; play('sfx/offer_open.mp3'); break;
      case 'offerResolved': offerOpen = false; updateMusic(); play('sfx/offer_pick.mp3'); break;
      case 'spreadStarted': play('sfx/core_place.mp3'); break;
      case 'tilesRevealed': {
        const now = performance.now();
        if (event.hexIds.length && now - lastFlip >= FLIP_INTERVAL_MS) {
          lastFlip = now; play('sfx/tile_flip.mp3', 0.96 + Math.random() * 0.08);
        }
        break;
      }
      case 'spreadFinished': play('sfx/spread_done.mp3'); break;
      case 'hexChanged': {
        const hex = session.state.hexes[event.hexId], before = slots.get(event.hexId);
        if (!hex) break;
        const after = hex.slots.map(slot => slot.building); slots.set(event.hexId, after);
        if (before?.some((id, index) => id !== null && after[index] === null)) play('sfx/demolish.mp3');
        else if (before?.some((id, index) => after[index] !== null && after[index] !== id)) play('sfx/build.mp3');
        break;
      }
      case 'payouts':
        if (event.events.some(payout => payout.kind === 'pair' || payout.kind === 'triple')) play('sfx/payout_combo.mp3');
        else if (event.events.length && event.events.every(payout => payout.kind === 'base')) play('sfx/payout_base.mp3');
        break;
      case 'combosDiscovered': if (event.comboIds.length) play('sfx/discover.mp3'); break;
      case 'coreAwarded': play('sfx/core_awarded.mp3'); break;
      case 'runEnded':
        running = false; offerOpen = false; pendingCue = null; stopEffects(); stopMusic(true);
        play(event.status === 'won' ? 'sfx/win.mp3' : 'sfx/end.mp3'); break;
    }
  }
  syncControls(); mute?.addEventListener('click', onMute); volume?.addEventListener('input', onVolume);
  window.addEventListener('pointerdown', unlock, true); window.addEventListener('keydown', unlock, true);
  const unsubscribe = session.subscribe(onEvent);
  const unsubscribeSettings = settings.subscribe(onSettings);
  return { dispose() {
    if (disposed) return; disposed = true;
    unsubscribe(); unsubscribeSettings(); window.removeEventListener('pointerdown', unlock, true); window.removeEventListener('keydown', unlock, true);
    mute?.removeEventListener('click', onMute); volume?.removeEventListener('input', onVolume);
    stopEffects(); stopMusic(true); slots.clear(); controls?.remove();
  } };
}
