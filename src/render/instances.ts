import * as THREE from 'three';
import { illustratedStyle, prepareIllustratedGeometry } from './materials';

/** Fixed indices keep a hex's visual identity stable across refreshes. */
export class Instances {
  readonly mesh: THREE.InstancedMesh;
  readonly outline: THREE.InstancedMesh | null;
  private readonly transform = new THREE.Object3D();
  constructor(parent: THREE.Group, geometry: THREE.BufferGeometry, color: number, capacity: number,
    options: { opacity?: number; roughness?: number; emissive?: number; vertexColors?: boolean; castShadow?: boolean; receiveShadow?: boolean } = {}) {
    const style = options.opacity === undefined ? illustratedStyle(parent) : undefined;
    if (style) {
      const original = geometry; geometry = original.index ? original.toNonIndexed() : original;
      if (geometry !== original) original.dispose();
      geometry.computeVertexNormals();
      prepareIllustratedGeometry(geometry, color, Boolean(options.emissive));
    }
    const material = style?.fill ?? new THREE.MeshStandardMaterial({ color, roughness: options.roughness ?? 0.85,
      metalness: 0, emissive: options.emissive ?? 0,
      transparent: options.opacity !== undefined, opacity: options.opacity ?? 1, vertexColors: options.vertexColors ?? false });
    this.mesh = new THREE.InstancedMesh(geometry, material, capacity);
    this.mesh.castShadow = options.castShadow ?? false; this.mesh.receiveShadow = options.receiveShadow ?? false;
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    // Instance locations can change after initial bounds computation.
    this.mesh.frustumCulled = false;
    for (let i = 0; i < capacity; i++) this.hide(i);
    parent.add(this.mesh);
    this.outline = style ? new THREE.InstancedMesh(geometry, style.ink, capacity) : null;
    if (this.outline) {
      this.outline.name = 'ink-hull'; this.outline.instanceMatrix = this.mesh.instanceMatrix;
      this.outline.frustumCulled = false; this.outline.userData.inkHull = true;
      // The hull uses the same transforms/buffer; no second CPU animation loop.
      parent.add(this.outline);
    }
  }
  setCount(count: number): void { this.mesh.count = count; if (this.outline) this.outline.count = count; }
  set(index: number, x: number, y: number, z: number, sx = 1, sy = sx, sz = sx,
    rx = 0, ry = 0, rz = 0): void {
    this.transform.position.set(x, y, z);
    this.transform.scale.set(sx, sy, sz);
    this.transform.rotation.set(rx, ry, rz);
    this.transform.updateMatrix();
    this.mesh.setMatrixAt(index, this.transform.matrix);
    this.mesh.instanceMatrix.needsUpdate = true;
  }
  hide(index: number): void { this.set(index, 0, -100, 0, 0); }
  color(index: number, color: number): void {
    this.mesh.setColorAt(index, new THREE.Color(color));
    this.mesh.instanceColor!.needsUpdate = true;
  }
}

export function disposeGroup(group: THREE.Group): void {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  group.traverse(object => {
    if (object instanceof THREE.Mesh) {
      geometries.add(object.geometry);
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
      if (object instanceof THREE.InstancedMesh) object.dispose();
    }
  });
  geometries.forEach(geometry => geometry.dispose());
  materials.forEach(material => material.dispose());
  group.clear();
}
