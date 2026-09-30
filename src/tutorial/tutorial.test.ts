// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { GameSession, SessionEvent } from '../core/contracts';
import { makeTestState } from '../core/testing';
import { createTutorial } from './tutorial';

function setup(pending = false) {
  const state = makeTestState();
  if (pending) state.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
  const listeners = new Set<(e: SessionEvent) => void>();
  const command = vi.fn(() => { throw new Error('Tutorial must not command the game'); });
  const session: GameSession = {
    state, newRun: command, chooseOffer: command, reshuffleOffer: command,
    placeCore: command, placeBuilding: command, demolish: command, preview: command, endRun: command, advance: command,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
  };
  const root = document.createElement('div'); document.body.append(root);
  const tutorial = createTutorial(root, session);
  const panel = root.querySelector<HTMLElement>('.assistant-panel')!;
  return { state, session, tutorial, root, panel, command, listeners,
    emit: (event: SessionEvent) => listeners.forEach(listener => listener(event)),
    click: (selector: string) => root.querySelector<HTMLButtonElement>(selector)!.click() };
}
const disposals: (() => void)[] = [];
afterEach(() => { disposals.splice(0).forEach(dispose => dispose()); document.body.innerHTML = ''; vi.useRealTimers(); vi.unstubAllGlobals(); });
const use = (pending = false) => { const s = setup(pending); disposals.push(() => s.tutorial.dispose()); return s; };
const spread: SessionEvent = { type: 'spreadStarted', result: { origin: 0, biome: 'forest', claims: [], poolUsed: 0 } };
const offer: SessionEvent = { type: 'offerShown', offer: { options: ['forest', 'desert'], reshuffled: false } };

describe('tutorial assistant', () => {
  it('keeps the first journal note expanded, then collapses subsequent guidance without gating events', () => {
    const journal = document.createElement('div'); journal.className = 'jhud'; document.body.append(journal);
    const s = use(); s.emit(offer); expect(s.panel.dataset.collapsed).toBe('false');
    s.emit(spread); expect(s.panel.dataset.line).toBe('spread'); expect(s.panel.dataset.collapsed).toBe('true');
    expect(s.panel.classList.contains('assistant-speaking')).toBe(false);
    s.click('.assistant-collapse'); s.emit({ type: 'spreadFinished' });
    expect(s.panel.dataset.line).toBe('buildings'); expect(s.panel.dataset.collapsed).toBe('false');
  });
  it('advances each first event immediately, ignores repeats, and excludes the first core award', () => {
    const s = use(); s.emit({ type: 'runStarted', seed: 1 }); s.emit({ type: 'coreAwarded' });
    expect(s.panel.hidden).toBe(true);
    s.emit(offer); expect(s.panel.dataset.line).toBe('biomes');
    s.emit(offer); expect(s.panel.dataset.line).toBe('biomes');
    s.emit(spread); expect(s.panel.dataset.line).toBe('spread');
    s.emit(spread); expect(s.panel.dataset.line).toBe('spread');
    s.emit({ type: 'spreadFinished' }); expect(s.panel.dataset.line).toBe('buildings');
    s.emit({ type: 'payouts', events: [{ kind: 'base', hexId: 0, amount: { wood: 1 } }] });
    expect(s.panel.dataset.line).toBe('buildings');
    s.emit({ type: 'payouts', events: [{ kind: 'pair', hexId: 0, amount: { wood: 1 } }] }); expect(s.panel.dataset.line).toBe('combos');
    s.emit({ type: 'coreAwarded' }); expect(s.panel.dataset.line).toBe('progression');
    s.emit(offer); expect(s.panel.dataset.line).toBe('progression');
    s.click('.assistant-next');
    expect(s.panel.hidden).toBe(true); expect(s.command).not.toHaveBeenCalled();
    s.emit(offer); expect(s.panel.hidden).toBe(true);
    s.emit({ type: 'runStarted', seed: 2 }); s.emit(offer); expect(s.panel.hidden).toBe(false);
  });
  it('keeps tracking events while collapsed, stops speaking, and expands the latest step', () => {
    vi.useFakeTimers(); const s = use(); s.emit(offer); s.click('.assistant-collapse');
    const collapse = s.root.querySelector<HTMLButtonElement>('.assistant-collapse')!;
    expect(s.panel.dataset.collapsed).toBe('true'); expect(collapse.getAttribute('aria-expanded')).toBe('false');
    expect(s.panel.classList.contains('assistant-speaking')).toBe(false); expect(vi.getTimerCount()).toBe(0);
    s.emit(spread); s.emit({ type: 'spreadFinished' });
    expect(s.panel.dataset.line).toBe('buildings'); expect(s.panel.dataset.collapsed).toBe('true');
    expect(s.panel.classList.contains('assistant-speaking')).toBe(false);
    s.click('.assistant-collapse');
    expect(s.panel.dataset.collapsed).toBe('false'); expect(collapse.getAttribute('aria-expanded')).toBe('true');
    expect(s.root.querySelector('h2')!.textContent).toBe('Three slots, one growing world');
    expect(s.panel.classList.contains('assistant-speaking')).toBe(true); expect(s.command).not.toHaveBeenCalled();
  });
  it('skips the rest of a run and enables steps again on a new run', () => {
    const s = use(); s.emit(offer); s.click('.assistant-skip'); s.emit(spread);
    expect(s.panel.hidden).toBe(true);
    s.emit({ type: 'runStarted', seed: 2 }); s.emit(offer); expect(s.panel.hidden).toBe(false);
  });
  it('works with missing audio, animates the face briefly and toggles mute', () => {
    vi.useFakeTimers(); const audio = vi.fn(); vi.stubGlobal('Audio', audio);
    const s = use(true);
    expect(s.panel.textContent).toContain('Choose Forest');
    expect(s.panel.classList.contains('assistant-speaking')).toBe(true);
    expect(audio).not.toHaveBeenCalled(); // No missing-file requests.
    s.click('.assistant-mute'); expect(s.root.querySelector('.assistant-mute')!.getAttribute('aria-pressed')).toBe('true');
    s.click('.assistant-mute'); expect(s.root.querySelector('.assistant-mute')!.textContent).toBe('Mute voice');
    vi.advanceTimersByTime(12001); expect(s.panel.classList.contains('assistant-speaking')).toBe(false);
  });
  it('does not add a modal, backdrop, or focus trap while an offer is pending', () => {
    const s = use(true);
    expect(s.panel.dataset.offer).toBe('true');
    expect(s.root.querySelector('[role="dialog"],.overlay')).toBeNull();
    s.state.pendingOffer = null; s.emit({ type: 'offerResolved', biome: 'forest' });
    expect(s.panel.dataset.offer).toBe('false'); expect(s.command).not.toHaveBeenCalled();
  });
  it('stops on run end and unsubscribes and removes its own panel on disposal', () => {
    vi.useFakeTimers(); const s = use(); s.emit(offer);
    s.emit({ type: 'runEnded', status: 'ended', stats: { status: 'ended', lifetime: {}, elapsedMs: 1, seed: 1 } });
    expect(s.panel.hidden).toBe(true); expect(s.panel.classList.contains('assistant-speaking')).toBe(false);
    s.tutorial.dispose(); s.tutorial.dispose();
    expect(s.listeners.size).toBe(0); expect(s.root.children.length).toBe(0); expect(vi.getTimerCount()).toBe(0);
  });
});
