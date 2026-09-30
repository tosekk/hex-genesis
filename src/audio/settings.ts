const SETTINGS_KEY = 'terraform.audio.v1';
interface Settings { muted: boolean; volume: number; }
let current: Settings | null = null;
const listeners = new Set<() => void>();

function read(): Settings {
  if (current) return current;
  try {
    const value = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? 'null');
    current = { muted: value?.muted === true,
      volume: typeof value?.volume === 'number' && Number.isFinite(value.volume)
        ? Math.max(0, Math.min(1, value.volume)) : 0.55 };
  } catch { current = { muted: false, volume: 0.55 }; }
  return current;
}

function change(next: Settings): void {
  const before = read();
  if (before.muted === next.muted && before.volume === next.volume) return;
  current = next;
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(next)); } catch { /* Embedded or full storage. */ }
  for (const listener of [...listeners]) listener();
}

/** Shared music/SFX preferences. Volume is 0–1; subscriptions fire on changes, not on registration. */
export const audioSettings = {
  get muted(): boolean { return read().muted; },
  get volume(): number { return read().volume; },
  setMuted(muted: boolean): void { change({ ...read(), muted }); },
  setVolume(volume: number): void {
    if (!Number.isFinite(volume)) return;
    change({ ...read(), volume: Math.max(0, Math.min(1, volume)) });
  },
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
};
