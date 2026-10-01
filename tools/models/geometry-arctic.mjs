import * as THREE from 'three';
import { ModelBuilder } from './geometry.mjs';

/** Arctic-only palette adapter. The shared Forest helpers remain frozen. */
export class ArcticModelBuilder extends ModelBuilder {
  constructor(palette) { super(); this.palette = palette; }
  add(geometry, region, { matrix = new THREE.Matrix4(), ao = 1, emission = 0, category = 'details', facet } = {}) {
    const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    g.applyMatrix4(matrix); g.computeVertexNormals();
    const p = g.getAttribute('position'), n = g.getAttribute('normal');
    for (let i = 0; i < p.count; i += 3) {
      const name = facet?.(new THREE.Vector3(n.getX(i), n.getY(i), n.getZ(i)), i / 3) ?? region;
      const color = new THREE.Color(this.palette[name]); // glTF vertex RGB is linear, not sRGB bytes.
      this.regions[name] = (this.regions[name] ?? 0) + 1;
      this.groups[category] = (this.groups[category] ?? 0) + 1;
      for (let v = i; v < i + 3; v++) {
        this.positions.push(p.getX(v), p.getY(v), p.getZ(v));
        this.normals.push(n.getX(v), n.getY(v), n.getZ(v));
        this.colors.push(color.r, color.g, color.b, ao);
        this.emit.push(emission);
      }
    }
    g.dispose(); geometry.dispose();
  }
}
