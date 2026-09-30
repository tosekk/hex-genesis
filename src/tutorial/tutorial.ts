import type { GameSession, SessionEvent, Tutorial } from '../core/contracts';
import { LINES, type LineId } from './lines';
import { createVoicePlayback } from './voice';
import './styles.css';

let panelSequence = 0;

export function createTutorial(root: HTMLElement, session: GameSession): Tutorial {
  const panel = document.createElement('aside');
  panel.className = 'assistant-panel'; panel.hidden = true;
  panel.setAttribute('aria-label', 'Restoration assistant');
  panel.innerHTML = `<div class="assistant-face" aria-hidden="true"><i class="assistant-eye"></i><i class="assistant-eye"></i><i class="assistant-mouth"></i></div>
    <div class="assistant-message" role="status" aria-live="polite"><div class="assistant-heading"><h2></h2><button type="button" class="assistant-collapse" aria-expanded="true">Collapse</button></div><p id="assistant-copy-${++panelSequence}"></p></div>
    <div class="assistant-controls"><button type="button" class="assistant-next">Next</button><button type="button" class="assistant-skip">Skip tutorial</button><button type="button" class="assistant-mute" aria-pressed="false">Mute voice</button></div>`;
  root.append(panel);
  const title = panel.querySelector('h2')!, text = panel.querySelector('p')!;
  const next = panel.querySelector<HTMLButtonElement>('.assistant-next')!;
  const skip = panel.querySelector<HTMLButtonElement>('.assistant-skip')!;
  const mute = panel.querySelector<HTMLButtonElement>('.assistant-mute')!;
  const collapse = panel.querySelector<HTMLButtonElement>('.assistant-collapse')!;
  collapse.setAttribute('aria-controls', text.id);
  collapse.setAttribute('aria-label', 'Collapse tutorial');
  panel.dataset.collapsed = 'false';
  const voice = createVoicePlayback();
  const journal = root.ownerDocument.querySelector('.jhud') !== null;
  let autoCollapsed = false;
  const seen = new Set<LineId>();
  let current: LineId | null = null, skipped = false, muted = false, collapsed = false, disposed = false;
  let awards = session.state.cores.length || session.state.coreStack.length || session.state.pendingOffer ? 1 : 0;
  let speakingTimer: ReturnType<typeof setTimeout> | null = null;

  function stopSpeaking(): void {
    voice.stop();
    if (speakingTimer !== null) clearTimeout(speakingTimer);
    speakingTimer = null; panel.classList.remove('assistant-speaking');
  }
  function speak(): void {
    stopSpeaking();
    if (!current || disposed || collapsed) return;
    panel.classList.add('assistant-speaking');
    // Text still "speaks" visually when optional VO is absent or muted.
    speakingTimer = setTimeout(() => panel.classList.remove('assistant-speaking'),
      Math.min(12000, Math.max(3000, LINES[current].text.split(/\s+/).length * 230)));
    if (!muted) voice.play(current, () => panel.classList.remove('assistant-speaking'));
  }
  function showStep(id: LineId): void {
    if (skipped || disposed || seen.has(id)) return;
    seen.add(id); current = id; panel.hidden = false;
    if (journal && id !== 'biomes' && !autoCollapsed) {
      autoCollapsed = true; collapsed = true; panel.dataset.collapsed = 'true';
      collapse.setAttribute('aria-expanded', 'false'); collapse.setAttribute('aria-label', 'Expand tutorial'); collapse.textContent = 'Expand';
    }
    panel.dataset.line = id;
    title.textContent = LINES[id].title; text.textContent = LINES[id].text;
    speak();
  }
  function onEvent(event: SessionEvent): void {
    if (disposed) return;
    panel.dataset.offer = String(session.state.pendingOffer !== null);
    switch (event.type) {
      case 'runStarted':
        stopSpeaking(); seen.clear(); current = null; skipped = false; awards = 0;
        panel.hidden = true; break;
      case 'offerShown': showStep('biomes'); break;
      case 'spreadStarted': showStep('spread'); break;
      case 'spreadFinished': showStep('buildings'); break;
      case 'payouts': if (event.events.some(p => p.kind === 'pair' || p.kind === 'triple')) showStep('combos'); break;
      case 'coreAwarded': if (++awards > 1) showStep('progression'); break;
      case 'runEnded': stopSpeaking(); current = null; skipped = true; panel.hidden = true; break;
    }
  }
  const onNext = () => { current = null; stopSpeaking(); panel.hidden = true; };
  const onSkip = () => { skipped = true; current = null; stopSpeaking(); panel.hidden = true; };
  const onCollapse = () => {
    collapsed = !collapsed;
    panel.dataset.collapsed = String(collapsed);
    collapse.setAttribute('aria-expanded', String(!collapsed));
    collapse.setAttribute('aria-label', collapsed ? 'Expand tutorial' : 'Collapse tutorial');
    collapse.textContent = collapsed ? 'Expand' : 'Collapse';
    if (collapsed) stopSpeaking(); else speak();
  };
  const onMute = () => {
    muted = !muted; mute.setAttribute('aria-pressed', String(muted)); mute.textContent = muted ? 'Unmute voice' : 'Mute voice';
    if (muted) voice.stop(); else speak();
  };
  next.addEventListener('click', onNext); skip.addEventListener('click', onSkip); mute.addEventListener('click', onMute);
  collapse.addEventListener('click', onCollapse);
  const unsubscribe = session.subscribe(onEvent);
  panel.dataset.offer = String(session.state.pendingOffer !== null);
  if (session.state.pendingOffer) showStep('biomes');
  return {
    dispose() {
      if (disposed) return; disposed = true;
      unsubscribe(); stopSpeaking(); seen.clear();
      next.removeEventListener('click', onNext); skip.removeEventListener('click', onSkip); mute.removeEventListener('click', onMute);
      collapse.removeEventListener('click', onCollapse);
      panel.remove();
    },
  };
}
