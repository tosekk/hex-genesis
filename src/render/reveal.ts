/** Render-only flip. Two half-turns meet edge-on; the color changes at that instant. */
export function sampleReveal(elapsedMs: number, durationMs: number): {
  angle: number; lift: number; showTarget: boolean; finished: boolean;
} {
  const t = durationMs <= 0 ? 1 : Math.min(1, Math.max(0, elapsedMs / durationMs));
  return {
    angle: t < 0.5 ? t * Math.PI : (t - 1) * Math.PI,
    lift: Math.sin(t * Math.PI) * 0.22,
    showTarget: t >= 0.5, finished: t >= 1,
  };
}

export function buildingHash(id: string): number {
  let value = 2166136261;
  for (let i = 0; i < id.length; i++) value = Math.imul(value ^ id.charCodeAt(i), 16777619);
  return value >>> 0;
}
