import * as THREE from 'three';
import { hexToWorld } from '../core/hex';
import type { GameState, Hex, HexId } from '../core/types';
import { HEX_SIZE, topHeight } from './layout';

class EffectBatch {
  readonly mesh: THREE.InstancedMesh;
  private readonly transform = new THREE.Object3D();
  private readonly opacity: THREE.InstancedBufferAttribute;
  private readonly active = new Set<number>();
  constructor(parent: THREE.Group, geometry: THREE.BufferGeometry, color: number, count: number, name: string) {
    this.opacity = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    geometry.setAttribute('instanceOpacity', this.opacity);
    const material = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { color: { value: new THREE.Color(color) } },
      vertexShader: `attribute float instanceOpacity; varying float alpha; void main(){ alpha=instanceOpacity; gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 color; varying float alpha;
        void main(){ gl_FragColor=vec4(color,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`,
    });
    this.mesh = new THREE.InstancedMesh(geometry, material, count); this.mesh.name = name;
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.mesh.count = 0; this.mesh.frustumCulled = false; parent.add(this.mesh);
  }
  set(id: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, alpha: number, rx = 0): void {
    this.transform.position.set(x, y, z); this.transform.scale.set(sx, sy, sz); this.transform.rotation.set(rx, 0, 0);
    this.transform.updateMatrix(); this.mesh.setMatrixAt(id, this.transform.matrix); this.mesh.instanceMatrix.needsUpdate = true;
    this.opacity.setX(id, alpha); this.opacity.needsUpdate = true;
    this.active.add(id); this.mesh.count = Math.max(this.mesh.count, id + 1);
  }
  hide(id: number): void {
    this.set(id, 0, -100, 0, 0, 0, 0, 0); this.active.delete(id);
    if (id + 1 === this.mesh.count) this.mesh.count = this.active.size ? Math.max(...this.active) + 1 : 0;
  }
}
interface Pulse { x: number; y: number; z: number; elapsed: number; }

/** Reads only already-visible cores and everCompleted flags. At most three extra draw calls. */
export class BoardEffects {
  private readonly beams: EffectBatch;
  private readonly coreRings: EffectBatch;
  private readonly completedRings: EffectBatch;
  private readonly corePulses = new Map<HexId, Pulse>();
  private readonly completions = new Map<HexId, Pulse>();
  private readonly seenCompleted: Set<HexId>;
  private coreIds: Set<HexId>;
  constructor(parent: THREE.Group, state: Readonly<GameState>, private readonly reducedMotion = false) {
    const count = state.hexes.length;
    this.beams = new EffectBatch(parent, new THREE.CylinderGeometry(0.07, 0.16, 1, 8), 0xb5fff0, count, 'effect:core-beam');
    this.coreRings = new EffectBatch(parent, new THREE.RingGeometry(0.78, 0.85, 24), 0xcaffec, count, 'effect:core-ring');
    this.completedRings = new EffectBatch(parent, new THREE.RingGeometry(0.82, 0.88, 6, 1, Math.PI / 6), 0xffedac, count, 'effect:completion');
    this.seenCompleted = new Set(state.hexes.filter(hex => hex.everCompleted).map(hex => hex.id));
    this.coreIds = new Set(state.cores);
  }
  private pulse(hex: Hex): Pulse {
    const p = hexToWorld(hex.col, hex.row, HEX_SIZE); return { ...p, y: topHeight(hex.elevation), elapsed: 0 };
  }
  refresh(hex: Hex): void {
    if (!hex.everCompleted || this.seenCompleted.has(hex.id)) return;
    this.seenCompleted.add(hex.id); if (hex.placeable) this.completions.set(hex.id, this.pulse(hex));
  }
  setCores(ids: HexId[], state: Readonly<GameState>): void {
    for (const id of new Set(ids)) if (!this.coreIds.has(id) && state.hexes[id]) this.corePulses.set(id, this.pulse(state.hexes[id]));
    this.coreIds = new Set(ids);
  }
  update(dtMs: number): void {
    for (const [id, pulse] of this.corePulses) {
      pulse.elapsed += Math.max(0, dtMs); const t = Math.min(1, pulse.elapsed / 700);
      if (t >= 1) { this.beams.hide(id); this.coreRings.hide(id); this.corePulses.delete(id); continue; }
      const height = this.reducedMotion ? 0.9 : 2.8 * (1 - t) + 0.2, radius = this.reducedMotion ? 1 : 0.35 + t;
      this.beams.set(id, pulse.x, pulse.y + height / 2, pulse.z, 1, height, 1, 0.45 * (1 - t) ** 2);
      this.coreRings.set(id, pulse.x, pulse.y + 0.07, pulse.z, radius, radius, radius, 0.8 * (1 - t), -Math.PI / 2);
    }
    for (const [id, pulse] of this.completions) {
      pulse.elapsed += Math.max(0, dtMs); const t = Math.min(1, pulse.elapsed / 850);
      if (t >= 1) { this.completedRings.hide(id); this.completions.delete(id); continue; }
      const radius = this.reducedMotion ? 1 : 0.7 + t * 0.45;
      this.completedRings.set(id, pulse.x, pulse.y + 0.085, pulse.z, radius, radius, radius, 0.9 * (1 - t), -Math.PI / 2);
    }
  }
}
