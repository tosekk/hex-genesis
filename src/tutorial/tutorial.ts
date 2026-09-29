import type { GameSession, SessionEvent, Tutorial } from '../core/contracts';
import { LINES, type LineId } from './lines';
import { createVoicePlayback } from './voice';
import './styles.css';

export function createTutorial(root: HTMLElement, session: GameSession): Tutorial {
  const panel = document.createElement('aside');
  panel.className = 'assistant-panel'; panel.hidden = true;
  panel.setAttribute('aria-label', 'Restoration assistant');
  panel.innerHTML = `<div class="assistant-face" aria-hidden="true"><i class="assistant-eye"></i><i class="assistant-eye"></i><i class="assistant-mouth"></i></div>
    <div class="assistant-message" role="status" aria-live="polite"><h2></h2><p></p></div>
    <div class="assistant-controls"><button type="button" class="assistant-next">Next</button><button type="button" class="assistant-skip">Skip tutorial</button><button type="button" class="assistant-mute" aria-pressed="false">Mute voice</button></div>`;
  root.append(panel);
  const title = panel.querySelector('h2')!, text = panel.querySelector('p')!;
  const next = panel.querySelector<HTMLButtonElement>('.assistant-next')!;
  const skip = panel.querySelector<HTMLButtonElement>('.assistant-skip')!;
  const mute = panel.querySelector<HTMLButtonElement>('.assistant-mute')!;
  const voice = createVoicePlayback();
  const seen = new Set<LineId>(), queue: LineId[] = [];
  let current: LineId | null = null, skipped = false, muted = false, disposed = false;
  let awards = session.state.cores.length || session.state.coreStack.length || session.state.pendingOffer ? 1 : 0;
  let speakingTimer: ReturnType<typeof setTimeout> | null = null;

  function stopSpeaking(): void {
    voice.stop();
    if (speakingTimer !== null) clearTimeout(speakingTimer);
    speakingTimer = null; panel.classList.remove('assistant-speaking');
  }
  function speak(): void {
    stopSpeaking();
    if (!current || disposed) return;
    panel.classList.add('assistant-speaking');
    // Text still "speaks" visually when optional VO is absent or muted.
    speakingTimer = setTimeout(() => panel.classList.remove('assistant-speaking'),
      Math.min(12000, Math.max(3000, LINES[current].text.split(/\s+/).length * 230)));
    if (!muted) voice.play(current, () => panel.classList.remove('assistant-speaking'));
  }
  function showNext(): void {
    stopSpeaking(); current = queue.shift() ?? null;
    panel.hidden = current === null || skipped;
    if (!current) return;
    panel.dataset.line = current;
    title.textContent = LINES[current].title; text.textContent = LINES[current].text;
    speak();
  }
  function enqueue(id: LineId): void {
    if (skipped || disposed || seen.has(id)) return;
    seen.add(id); queue.push(id);
    if (!current) showNext();
  }
  function onEvent(event: SessionEvent): void {
    if (disposed) return;
    panel.dataset.offer = String(session.state.pendingOffer !== null);
    switch (event.type) {
      case 'runStarted':
        stopSpeaking(); seen.clear(); queue.length = 0; current = null; skipped = false; awards = 0;
        panel.hidden = true; break;
      case 'offerShown': enqueue('biomes'); break;
      case 'spreadStarted': enqueue('spread'); break;
      case 'spreadFinished': enqueue('buildings'); break;
      case 'payouts': if (event.events.some(p => p.kind === 'pair' || p.kind === 'triple')) enqueue('combos'); break;
      case 'coreAwarded': if (++awards > 1) enqueue('progression'); break;
      case 'runEnded': stopSpeaking(); queue.length = 0; current = null; panel.hidden = true; break;
    }
  }
  const onNext = () => showNext();
  const onSkip = () => { skipped = true; queue.length = 0; current = null; stopSpeaking(); panel.hidden = true; };
  const onMute = () => {
    muted = !muted; mute.setAttribute('aria-pressed', String(muted)); mute.textContent = muted ? 'Unmute voice' : 'Mute voice';
    if (muted) voice.stop(); else speak();
  };
  next.addEventListener('click', onNext); skip.addEventListener('click', onSkip); mute.addEventListener('click', onMute);
  const unsubscribe = session.subscribe(onEvent);
  panel.dataset.offer = String(session.state.pendingOffer !== null);
  if (session.state.pendingOffer) enqueue('biomes');
  return {
    dispose() {
      if (disposed) return; disposed = true;
      unsubscribe(); stopSpeaking(); queue.length = 0; seen.clear();
      next.removeEventListener('click', onNext); skip.removeEventListener('click', onSkip); mute.removeEventListener('click', onMute);
      panel.remove();
    },
  };
}
