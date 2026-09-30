import type { GameConfig } from '../core/types';
/** Diagnostic overrides only; the production MAP/config are never changed. */
export function sandboxConfig(config: GameConfig, query: URLSearchParams): GameConfig {
  const dimension = (id: string, fallback: number, maximum: number) => {
    const raw = query.get(id);
    return raw !== null && /^\d+$/.test(raw) ? Math.max(2, Math.min(maximum, Number(raw))) : fallback;
  };
  return { ...config, map: { ...config.map, cols: dimension('cols', config.map.cols, 60), rows: dimension('rows', config.map.rows, 40) } };
}
