import { createBoardView } from './boardView';
import { createInitialState, createHex } from '../core/state';
import { DEFAULT_CONFIG } from '../config';
import { hexDistance } from '../core/hex';
import type { BoardPick } from '../core/contracts';
import type { Biome, Terrain } from '../core/types';

const seed = Number(new URLSearchParams(location.search).get('seed') ?? 42);
let state = createInitialState(seed, DEFAULT_CONFIG, 0);
const board = createBoardView(document.querySelector<HTMLElement>('#board')!, DEFAULT_CONFIG);
board.setBoard(state);
let hovered: BoardPick | null = null;
const readout = document.querySelector<HTMLElement>('#readout')!;
board.onPointer((pick, kind) => {
  hovered = pick;
  board.setHighlights('hover', pick ? [pick.hexId] : []);
  readout.textContent = pick ? `${kind} · hex ${pick.hexId} · slot ${pick.slot ?? '—'}` : 'Off board';
  if (kind !== 'move') { console.info('board pick', kind, pick); board.setHighlights('selected', pick ? [pick.hexId] : []); }
});
let wave: { ids: number[]; elapsed: number; next: number; biome: Biome } | null = null;
const biomes: Biome[] = ['forest', 'desert', 'arctic', 'steppe', 'taiga', 'polarDesert'];
let biomeIndex = 0;
function reveal(): void {
  const origin = hovered?.hexId ?? Math.floor(state.hexes.length / 2);
  const ids = state.hexes.filter(h => h.terrain !== 'mountain').map(h => h.id)
    .sort((a, b) => hexDistance(a, origin, state.cols) - hexDistance(b, origin, state.cols) || a - b).slice(0, 69);
  wave = { ids, elapsed: 0, next: 0, biome: biomes[biomeIndex++ % biomes.length] };
  board.setHighlights('locked', ids);
}
function reset(): void { wave = null; state = createInitialState(seed, DEFAULT_CONFIG, 0); board.setBoard(state); }
function terrainDemo(): void {
  reset();
  const terrain: Terrain[] = ['plain', 'hill', 'mountain', 'riverbed', 'basin', 'woods', 'marsh'];
  state.hexes = state.hexes.map(h => {
    const type = terrain[h.col % terrain.length];
    const hex = createHex(h.id, h.col, h.row, type === 'mountain' ? 4 : h.col % 4, type, h.decoration);
    hex.biome = type === 'mountain' || h.row < 7 ? null : biomes[(h.row - 7) % biomes.length];
    return hex;
  });
  board.setBoard(state);
}
document.querySelector('#reveal')!.addEventListener('click', reveal);
document.querySelector('#new')!.addEventListener('click', reset);
document.querySelector('#terrain')!.addEventListener('click', terrainDemo);
window.addEventListener('keydown', event => {
  if (event.repeat) return;
  switch (event.key.toLowerCase()) {
    case 'r': reveal(); break;
    case 'n': reset(); break;
    case 't': terrainDemo(); break;
    case 'b': if (hovered && hovered.slot !== null) {
      const hex = state.hexes[hovered.hexId];
      hex.slots[hovered.slot].building = Object.keys(state.config.buildings)[0] ?? 'sandbox-building';
      board.refreshHex(state, hex.id);
    } break;
    case 'c': if (hovered) { state.cores.push(hovered.hexId); board.setCores(state.cores); } break;
  }
});
let previous = performance.now(), frames = 0, sampleMs = 0;
function frame(now: number): void {
  const dt = Math.min(now - previous, 100); previous = now;
  if (wave) {
    wave.elapsed += dt;
    const cadence = (DEFAULT_CONFIG.animation.spreadMaxMs - DEFAULT_CONFIG.animation.tileFlipMs) / Math.max(wave.ids.length - 1, 1);
    while (wave.next < wave.ids.length && wave.elapsed >= wave.next * cadence) {
      const id = wave.ids[wave.next++]; state.hexes[id].biome = wave.biome; board.playReveal(state, [id]);
    }
    if (wave.elapsed >= DEFAULT_CONFIG.animation.spreadMaxMs) { wave = null; board.setHighlights('locked', []); }
  }
  board.update(dt); frames++; sampleMs += dt;
  if (sampleMs > 1000) { document.querySelector('#fps')!.textContent = `${Math.round(frames * 1000 / sampleMs)} fps`; frames = 0; sampleMs = 0; }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.addEventListener('pagehide', () => board.dispose(), { once: true });
