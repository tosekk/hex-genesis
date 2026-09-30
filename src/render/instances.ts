import * as THREE from 'three';

/** Fixed indices keep a hex's visual identity stable across refreshes. */
export class Instances {
  readonly mesh: THREE.InstancedMesh;
  private readonly transform = new THREE.Object3D();
  constructor(parent: THREE.Group, geometry: THREE.BufferGeometry, color: number, capacity: number,
    options: { opacity?: number; roughness?: number; emissive?: number; vertexColors?: boolean; castShadow?: boolean; receiveShadow?: boolean } = {}) {
    const material = new THREE.MeshStandardMaterial({ color, roughness: options.roughness ?? 0.85,
      metalness: 0, emissive: options.emissive ?? 0,
      transparent: options.opacity !== undefined, opacity: options.opacity ?? 1, vertexColors: options.vertexColors ?? false });
    this.mesh = new THREE.InstancedMesh(geometry, material, capacity);
    this.mesh.castShadow = options.castShadow ?? false; this.mesh.receiveShadow = options.receiveShadow ?? false;
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    // Instance locations can change after initial bounds computation.
    this.mesh.frustumCulled = false;
    for (let i = 0; i < capacity; i++) this.hide(i);
    parent.add(this.mesh);
  }
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
