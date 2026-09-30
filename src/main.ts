import { bindBoard } from './app/bindBoard';
import { hideLoading, preventScrollKeys, requestFocus } from './app/embed';
import { installErrorOverlay } from './app/errorOverlay';
import { createAudio } from './audio/audio';
import { DEFAULT_CONFIG } from './config';
import { createGameSession } from './game/session';
import { createBoardView } from './render/boardView';
import { createTutorial } from './tutorial/tutorial';
import { createHud } from './ui/hud';

if (import.meta.env.DEV) installErrorOverlay();
const allowScrollKeys = preventScrollKeys();

function pickSeed(): number {
  const param = new URLSearchParams(location.search).get('seed');
  if (param !== null && /^\d+$/.test(param)) return Number(param) >>> 0;
  // Random seeds are fine here: this is outside the simulation.
  return crypto.getRandomValues(new Uint32Array(1))[0];
}

function el(id: string): HTMLElement {
  const e = document.getElementById(id);
  if (!e) throw new Error(`missing #${id}`);
  return e;
}

const session = createGameSession({ config: DEFAULT_CONFIG, now: () => Date.now() });
const board = createBoardView(el('board'), DEFAULT_CONFIG);
const unbindBoard = bindBoard(session, board);
const hud = createHud(el('ui'), session, board);
const tutorial = createTutorial(el('tutorial'), session);
// Optional audio (sol V3): silent, without errors, while the MP3s in public/audio are missing.
const audio = createAudio(el('ui'), session);

// Start the frame loop before the first run so a throw during newRun can't stop rendering.
// The next frame is scheduled first, so one bad frame doesn't kill the loop either.
let last = performance.now();
let rafId = 0;
let firstFrame = true;
function frame(t: number) {
  rafId = requestAnimationFrame(frame);
  const dt = Math.min(100, Math.max(0, t - last));
  last = t;
  session.advance(dt);
  board.update(dt);
  if (firstFrame) { firstFrame = false; hideLoading(); requestFocus(); }
}
rafId = requestAnimationFrame(frame);

const onResize = () => board.resize();
window.addEventListener('resize', onResize);

let tornDown = false;
function teardown(): void {
  if (tornDown) return;
  tornDown = true;
  cancelAnimationFrame(rafId);
  window.removeEventListener('resize', onResize);
  allowScrollKeys();
  audio.dispose();
  tutorial.dispose();
  hud.dispose();
  unbindBoard();
  board.dispose();
}
// A page kept in the back/forward cache (persisted) must stay alive for when the player returns.
window.addEventListener('pagehide', (e) => { if (!e.persisted) teardown(); });
import.meta.hot?.dispose(teardown);

// Dev-only QA hook (stripped from production builds): lets a tester set up hard-to-reach states,
// e.g. a genuinely out-of-room board to check the loss screen (§42).
if (import.meta.env.DEV) (window as unknown as { __session: typeof session }).__session = session;

session.newRun(pickSeed());
