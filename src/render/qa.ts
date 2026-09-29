import { createInitialState } from '../core/state';
import { DEFAULT_CONFIG } from '../config';
import type { Biome } from '../core/types';
import { createBoardView } from './boardView';

const params = new URLSearchParams(location.search);
const start = Math.max(1, Math.min(17, Number(params.get('start')) || 1));
const biomes: Biome[] = ['forest', 'desert', 'arctic', 'steppe', 'taiga', 'polarDesert'];
for (let seed = start; seed < start + 4; seed++) {
  const work = document.createElement('div'); work.className = 'work'; document.body.append(work);
  const board = createBoardView(work, DEFAULT_CONFIG);
  try {
    const state = createInitialState(seed, DEFAULT_CONFIG, 0);
    if (!params.has('dead')) for (const hex of state.hexes) if (hex.terrain !== 'mountain')
      hex.biome = biomes[Math.min(5, Math.floor(hex.col / state.cols * 6))];
    board.setBoard(state); board.update(0);
    const image = document.createElement('img'); image.src = work.querySelector('canvas')!.toDataURL('image/png');
    image.alt = `Seed ${seed}, default camera, ${params.has('dead') ? 'dead' : 'six restored biome bands'}`;
    const article = document.createElement('article'), caption = document.createElement('p');
    caption.textContent = `Seed ${seed} · ${state.hexes.filter(h => h.terrain === 'mountain').length} mountains · ${state.hexes.filter(h => h.terrain === 'riverbed').length} riverbeds`;
    article.append(image, caption); document.querySelector('#sheets')!.append(article);
  } catch (error) { document.querySelector('#error')!.textContent += String(error); }
  finally { board.dispose(); work.remove(); }
}
