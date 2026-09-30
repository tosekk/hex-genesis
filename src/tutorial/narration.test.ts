// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createGameSession } from '../game/session';
import { legalCoreSites } from '../sim/spread/spread';
import { audioSettings } from '../audio/settings';
import { createTopRight } from '../ui/v2/topRight';
import { createTutorial } from './tutorial';

vi.mock('./voice', async importOriginal => {
  const mod = await importOriginal<typeof import('./voice')>();
  const assets = Object.fromEntries(['biomes', 'spread', 'buildings', 'combos', 'progression'].map(id => [`/src/assets/audio/vo/${id}.mp3`, `/assets/${id}.mp3`]));
  return { ...mod, createVoicePlayback: () => mod.createVoicePlayback(assets) };
});
const players: FakeAudio[] = [], disposals: (() => void)[] = [];
class FakeAudio {
  volume = 1; onended = null; onerror = null;
  constructor(readonly url: string) { players.push(this); }
  play = vi.fn(() => Promise.resolve()); pause = vi.fn(); load = vi.fn(); removeAttribute = vi.fn();
}
beforeEach(() => { players.length = 0; audioSettings.setMuted(false); audioSettings.setVolume(.55); vi.stubGlobal('Audio', FakeAudio); vi.useFakeTimers(); });
afterEach(() => { disposals.splice(0).forEach(off => off()); document.body.replaceChildren(); vi.unstubAllGlobals(); vi.useRealTimers(); });
function setup() {
  const root = document.createElement('div'); root.className = 'jhud'; document.body.append(root);
  const session = createGameSession({ now: () => 0 });
  const tutorial = createTutorial(root, session), menu = createTopRight(root, session, { toggleJournal() {}, openHelp() {}, audio: audioSettings });
  disposals.push(tutorial.dispose, menu.dispose); session.newRun(1);
  return { root, session, tutorial, panel: root.querySelector<HTMLElement>('.assistant-panel')!,
    click: (selector: string) => root.querySelector<HTMLButtonElement>(selector)!.click() };
}
describe('tutorial voice through real session events and Sound menu', () => {
  it('waits for the first click, then narrates collapsed spread/building steps once each', () => {
    const s = setup(); expect(players).toHaveLength(0); expect(s.panel.dataset.line).toBe('biomes');
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })); expect(players.map(p => p.url)).toEqual(['/assets/biomes.mp3']);
    s.session.chooseOffer(0); s.session.placeCore(legalCoreSites(s.session.state)[0]);
    expect(s.panel.dataset.collapsed).toBe('true'); expect(players.at(-1)!.url).toBe('/assets/spread.mp3');
    expect(s.panel.classList.contains('assistant-speaking')).toBe(false);
    const count = players.length; s.click('.assistant-collapse'); s.click('.assistant-collapse'); expect(players).toHaveLength(count);
    s.session.advance(s.session.state.config.animation.spreadMaxMs);
    expect(s.panel.dataset.line).toBe('buildings'); expect(players.at(-1)!.url).toBe('/assets/buildings.mp3');
    expect(s.panel.dataset.collapsed).toBe('true');
  });
  it('scales active narration with the menu slider and silences current/new lines with Sound off', () => {
    const s = setup(); document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })); s.session.chooseOffer(0);
    s.click('.menu-btn'); const slider = s.root.querySelector<HTMLInputElement>('.menu-volume')!;
    slider.value = '25'; slider.dispatchEvent(new Event('input', { bubbles: true })); expect(players[0].volume).toBe(.25);
    s.click('.menu-mute'); expect(players[0].pause).toHaveBeenCalledOnce();
    s.session.placeCore(legalCoreSites(s.session.state)[0]); s.session.advance(s.session.state.config.animation.spreadMaxMs);
    s.click('.assistant-collapse'); expect(players).toHaveLength(1);
    expect(s.root.querySelector('.menu-mute')?.textContent).toBe('Sound: off');
    s.click('.menu-mute'); expect(players).toHaveLength(1); // Unmute never replays a stale line.
    s.click('.assistant-mute'); s.click('.assistant-mute'); expect(players.at(-1)!.url).toBe('/assets/buildings.mp3');
    s.tutorial.dispose(); document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })); expect(players).toHaveLength(2);
  });
  it('does not play a queued first line after skip or run end', () => {
    const s = setup(); s.click('.assistant-skip'); document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })); expect(players).toHaveLength(0);
    s.session.newRun(7); expect(players).toHaveLength(1); s.session.endRun(); expect(players[0].pause).toHaveBeenCalledOnce();
  });
});
