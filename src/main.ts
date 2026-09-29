import { bindBoard } from './app/bindBoard';
import { installErrorOverlay } from './app/errorOverlay';
import { DEFAULT_CONFIG } from './config';
import { createGameSession } from './game/session';
import { createBoardView } from './render/boardView';
import { createTutorial } from './tutorial/tutorial';
import { createHud } from './ui/hud';

if (import.meta.env.DEV) installErrorOverlay();

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
bindBoard(session, board);
createHud(el('ui'), session, board);
createTutorial(el('tutorial'), session);

// Start the frame loop before the first run so a throw during newRun can't stop rendering.
// The next frame is scheduled first, so one bad frame doesn't kill the loop either.
let last = performance.now();
function frame(t: number) {
  requestAnimationFrame(frame);
  const dt = Math.min(100, Math.max(0, t - last));
  last = t;
  session.advance(dt);
  board.update(dt);
}
requestAnimationFrame(frame);

window.addEventListener('resize', () => board.resize());

session.newRun(pickSeed());
