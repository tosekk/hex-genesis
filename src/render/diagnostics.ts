import type * as THREE from 'three';
const renderers = new WeakMap<HTMLCanvasElement, THREE.WebGLRenderer>();
/** Sandbox instrumentation without adding to the frozen BoardView interface. */
export function trackRenderer(canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer): () => void {
  renderers.set(canvas, renderer); return () => { renderers.delete(canvas); };
}
export function rendererStats(container: HTMLElement): { calls: number; triangles: number; geometries: number } | null {
  const canvas = container.querySelector('canvas'), renderer = canvas && renderers.get(canvas);
  return renderer ? { calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, geometries: renderer.info.memory.geometries } : null;
}
