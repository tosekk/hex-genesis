import type { Biome, GameConfig, Resources } from '../core/types';

export const BIOME_LABEL: Record<Biome, string> = {
  forest: 'Forest', desert: 'Desert', arctic: 'Arctic',
  steppe: 'Steppe', taiga: 'Taiga', polarDesert: 'Polar Desert',
};

export const BIOME_ICON: Record<Biome, string> = {
  forest: '🌲', desert: '🏜️', arctic: '❄️', steppe: '🌾', taiga: '🌨️', polarDesert: '🧊',
};

export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "+3 wood, +1 stone" (sign optional). Zero entries are skipped. */
export function fmtResources(r: Resources, signed = false): string {
  const parts = Object.entries(r).filter(([, v]) => v !== 0)
    .map(([k, v]) => `${signed && v > 0 ? '+' : ''}${v} ${k}`);
  return parts.length ? parts.join(', ') : '—';
}

export function fmtTime(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function buildingName(cfg: GameConfig, id: string): string {
  return cfg.buildings[id]?.name ?? id;
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K, cls?: string, text?: string,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
