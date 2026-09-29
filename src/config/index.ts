import type { GameConfig } from '../core/types';
import { ECONOMY } from './economy';
import { MAP } from './map';
import { ANIMATION, SPREAD } from './spread';

export const DEFAULT_CONFIG: GameConfig = { ...ECONOMY, spread: SPREAD, map: MAP, animation: ANIMATION };
