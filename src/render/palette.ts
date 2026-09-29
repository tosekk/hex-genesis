import type { Biome } from '../core/types';
import type { HighlightStyle } from '../core/contracts';

export const BIOME_COLORS: Record<Biome, number> = {
  forest: 0x54935f, desert: 0xd2ac66, arctic: 0xb8d8dc,
  steppe: 0x9ba863, taiga: 0x77b2a0, polarDesert: 0xc9c5a2,
};
export const DEAD_COLOR = 0x82796b;
export const LAYER_COLOR = 0x655c51;
export const HIGHLIGHT_COLORS: Record<HighlightStyle, number> = {
  legalCore: 0x8be3b3, selected: 0xffe3a0, hover: 0xffffff,
  locked: 0x6ca6e8, invalid: 0xf07b6c,
};
export function tileColor(biome: Biome | null): number {
  return biome === null ? DEAD_COLOR : BIOME_COLORS[biome];
}
