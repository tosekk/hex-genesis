import { DEFAULT_CONFIG } from '../../config';
import { createGameSession } from '../../game/session';
import { createBoardView } from '../../render/boardView';
import { bindBoard } from '../../app/bindBoard';
import { createAudio } from '../../audio/audio';
import { createTutorial } from '../../tutorial/tutorial';
import { createJournalHud } from './journalHud';

const el = (id: string) => document.getElementById(id)!;
const session = createGameSession({ config: DEFAULT_CONFIG });
const board = createBoardView(el('board'), DEFAULT_CONFIG);
const unbind = bindBoard(session, board), hud = createJournalHud(el('ui'), session, board);
const tutorial = createTutorial(el('tutorial'), session), audio = createAudio(el('ui'), session, { controls: false });
let last = performance.now(), raf = 0;
const frame = (now: number) => { raf = requestAnimationFrame(frame); const dt = Math.min(100, now - last); last = now; session.advance(dt); board.update(dt); };
raf = requestAnimationFrame(frame);
session.newRun(Number(new URLSearchParams(location.search).get('seed') ?? 1) >>> 0);
if (import.meta.env.DEV) Object.assign(window, { __session: session });
window.addEventListener('pagehide', () => { cancelAnimationFrame(raf); audio.dispose(); tutorial.dispose(); hud.dispose(); unbind(); board.dispose(); }, { once: true });
