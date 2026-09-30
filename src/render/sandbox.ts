import { createBoardView } from './boardView';
import { createInitialState, createHex, stateFromHexes } from '../core/state';
import { DEFAULT_CONFIG } from '../config';
import { hexDistance } from '../core/hex';
import type { BoardPick } from '../core/contracts';
import type { Biome, Terrain } from '../core/types';
import { mountTutorialSandbox } from '../tutorial/sandbox';
import { sandboxConfig } from './sandboxConfig';
import { rendererStats } from './diagnostics';
import { mountAudioSandbox } from '../audio/sandbox';

const query = new URLSearchParams(location.search), config = sandboxConfig(DEFAULT_CONFIG, query);
const seed = Number(query.get('seed') ?? 42);
const container = document.querySelector<HTMLElement>('#board')!;
if (query.get('viewport') === '1280x720') container.style.cssText = 'width:1280px;height:720px';
let state = createInitialState(seed, config, 0);
const board = createBoardView(container, config);
board.setBoard(state);
const audio = mountAudioSandbox(document.querySelector<HTMLElement>('#audio')!, () => state);
audio.emit({ type: 'runStarted', seed });
const disposeTutorial = mountTutorialSandbox(document.querySelector<HTMLElement>('#tutorial')!,
  document.querySelector<HTMLButtonElement>('#tutorial-step')!);
let hovered: BoardPick | null = null;
const readout = document.querySelector<HTMLElement>('#readout')!;
readout.textContent += ' · F: floating payout demo';
board.onPointer((pick, kind) => {
  hovered = pick;
  board.setHighlights('hover', pick ? [pick.hexId] : []);
  const building = pick && pick.slot !== null ? state.hexes[pick.hexId]?.slots[pick.slot]?.building : null;
  readout.textContent = pick ? `${kind} · hex ${pick.hexId} · slot ${pick.slot ?? '—'}${building ? ` · ${state.config.buildings[building]?.name ?? building}` : ''}` : 'Off board';
  if (kind !== 'move') { console.info('board pick', kind, pick); board.setHighlights('selected', pick ? [pick.hexId] : []); }
});
let wave: { ids: number[]; elapsed: number; next: number; biome: Biome } | null = null;
const biomes: Biome[] = ['forest', 'desert', 'arctic', 'steppe', 'taiga', 'polarDesert'];
let biomeIndex = 0;
function payoutDemo(): void {
  const hexId = hovered?.hexId ?? state.hexes.find(hex => hex.placeable)?.id;
  if (hexId === undefined) return;
  const events = [
    { kind: 'base', hexId, amount: { wood: 4 } },
    { kind: 'pair', hexId, amount: { wood: 3, food: 2 } },
    { kind: 'triple', hexId, amount: { wood: 6, food: 4 } },
    { kind: 'adjacency', hexId, amount: { wood: 1, stone: 1, water: 1, food: 1 } },
  ] as const;
  board.showPayouts?.(state, [...events]); audio.emit({ type: 'payouts', events: [...events] });
}
function reveal(): void {
  const origin = hovered?.hexId ?? Math.floor(state.rows / 2) * state.cols + Math.floor(state.cols / 2);
  const ids = state.hexes.filter(h => h.terrain !== 'mountain').map(h => h.id)
    .sort((a, b) => hexDistance(a, origin, state.cols) - hexDistance(b, origin, state.cols) || a - b).slice(0, 69);
  wave = { ids, elapsed: 0, next: 0, biome: biomes[biomeIndex++ % biomes.length] };
  if (!state.cores.includes(origin)) state.cores.push(origin);
  board.setCores(state.cores);
  audio.emit({ type: 'spreadStarted', result: { origin, biome: 'forest', claims: [], poolUsed: 0 } });
  board.setHighlights('locked', ids);
}
function reset(): void {
  wave = null; state = createInitialState(seed, config, 0); board.setBoard(state);
  audio.emit({ type: 'runStarted', seed });
  document.querySelector<HTMLElement>('#gallery-list')!.hidden = true;
}
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
function populate(): void {
  const ids = Object.keys(state.config.buildings);
  for (const hex of state.hexes) {
    if (!hex.placeable) continue;
    hex.biome ??= biomes[hex.col % biomes.length];
    hex.slots.forEach((slot, index) => { slot.building = ids[(hex.id + index) % ids.length] ?? `sandbox-${index}`; });
    hex.everCompleted = true;
    board.refreshHex(state, hex.id);
  }
  state.cores = state.hexes.filter(hex => hex.placeable && hex.id % 43 === 0).map(hex => hex.id);
  board.setCores(state.cores);
  const first = state.hexes.find(hex => hex.placeable); if (first) audio.emit({ type: 'hexChanged', hexId: first.id });
}
function gallery(): void {
  wave = null;
  const ids = Object.keys(DEFAULT_CONFIG.buildings);
  const hexes = Array.from({ length: Math.ceil(ids.length / 3) }, (_, id) => {
    const hex = createHex(id, id % 4, Math.floor(id / 4), 0, 'plain', id);
    hex.biome = biomes[id % biomes.length];
    hex.slots.forEach((slot, index) => { slot.building = ids[id * 3 + index] ?? null; });
    return hex;
  });
  state = stateFromHexes(seed, DEFAULT_CONFIG, 4, Math.ceil(hexes.length / 4), hexes, 0);
  board.setBoard(state);
  const list = document.querySelector<HTMLElement>('#gallery-list')!;
  list.replaceChildren();
  const heading = document.createElement('strong'); heading.textContent = 'Building gallery · hex / slots 0, 1, 2'; list.append(heading);
  for (const hex of hexes) {
    const line = document.createElement('p');
    line.textContent = `${hex.id}: ${hex.slots.map(slot => slot.building ? DEFAULT_CONFIG.buildings[slot.building].name : '—').join(' / ')}`;
    list.append(line);
  }
  list.hidden = false;
}
function loadTest(): void {
  wave = null;
  const { cols, rows, levels } = config.map;
  const hexes = Array.from({ length: cols * rows }, (_, id) => {
    const hex = createHex(id, id % cols, Math.floor(id / cols), levels - 1, 'plain', id);
    hex.biome = biomes[id % biomes.length]; return hex;
  });
  state = stateFromHexes(seed, config, cols, rows, hexes, 0);
  board.setBoard(state); populate();
  document.querySelector<HTMLElement>('#gallery-list')!.hidden = true;
  readout.textContent = `${cols * rows * 3} buildings · ${levels} tile layers · synthetic load test`;
}
document.querySelector('#reveal')!.addEventListener('click', reveal);
document.querySelector('#new')!.addEventListener('click', reset);
document.querySelector('#terrain')!.addEventListener('click', terrainDemo);
document.querySelector('#populate')!.addEventListener('click', populate);
document.querySelector('#gallery')!.addEventListener('click', gallery);
document.querySelector('#load')!.addEventListener('click', loadTest);
document.querySelector('#load')!.textContent = `${config.map.cols * config.map.rows * 3}-building load test`;
document.querySelector('#size')!.textContent = `${config.map.cols} × ${config.map.rows} · ${config.map.cols * config.map.rows * 3} slots · F: payout demo`;
window.addEventListener('keydown', event => {
  if (event.repeat) return;
  switch (event.key.toLowerCase()) {
    case 'r': reveal(); break;
    case 'n': reset(); break;
    case 't': terrainDemo(); break;
    case 'p': populate(); break;
    case 'g': gallery(); break;
    case 'l': loadTest(); break;
    case 'f': payoutDemo(); break;
    case 'b': if (hovered && hovered.slot !== null) {
      const hex = state.hexes[hovered.hexId];
      hex.slots[hovered.slot].building = Object.keys(state.config.buildings)[0] ?? 'sandbox-building';
      board.refreshHex(state, hex.id);
      audio.emit({ type: 'hexChanged', hexId: hex.id });
    } break;
    case 'x': if (hovered && hovered.slot !== null) {
      const hex = state.hexes[hovered.hexId]; hex.slots[hovered.slot].building = null;
      board.refreshHex(state, hex.id); audio.emit({ type: 'hexChanged', hexId: hex.id });
    } break;
    case 'c': if (hovered) { state.cores.push(hovered.hexId); board.setCores(state.cores); } break;
  }
});
if (query.has('load')) loadTest();
let previous = performance.now(), frames = 0, sampleMs = 0;
function frame(now: number): void {
  const elapsed = now - previous, dt = Math.min(elapsed, 100); previous = now;
  if (wave) {
    wave.elapsed += dt;
    const cadence = (DEFAULT_CONFIG.animation.spreadMaxMs - DEFAULT_CONFIG.animation.tileFlipMs) / Math.max(wave.ids.length - 1, 1);
    while (wave.next < wave.ids.length && wave.elapsed >= wave.next * cadence) {
      const id = wave.ids[wave.next++]; state.hexes[id].biome = wave.biome; board.playReveal(state, [id]);
      audio.emit({ type: 'tilesRevealed', hexIds: [id] });
    }
    if (wave.elapsed >= DEFAULT_CONFIG.animation.spreadMaxMs) { wave = null; board.setHighlights('locked', []); audio.emit({ type: 'spreadFinished' }); }
  }
  board.update(dt); frames++; sampleMs += elapsed;
  if (sampleMs > 1000) {
    const stats = rendererStats(container);
    document.querySelector('#fps')!.textContent = `${Math.round(frames * 1000 / sampleMs)} fps · ${stats?.calls ?? '—'} draw calls · ${stats?.triangles.toLocaleString() ?? '—'} triangles`;
    frames = 0; sampleMs = 0;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.addEventListener('pagehide', () => { disposeTutorial(); audio.dispose(); board.dispose(); }, { once: true });
