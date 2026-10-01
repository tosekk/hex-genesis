import * as THREE from 'three';
import { ModelBuilder } from './geometry.mjs';

export const DESERT_PALETTE = {
  cream: '#E8DCC4', stone: '#D2C4A8', terra: '#D9826B', grey: '#8E8E8C',
  sage: '#5F7D6B', joint: '#3F5A4E', amber: '#F5B841', light: '#FFE29A',
  pool: '#FFD27A', sand: '#D9B27A', rock: '#9C9790',
};

/** Local palette, shared vertex packing; never mutate the forest helper's palette. */
export class DesertBuilder extends ModelBuilder {
  add(geometry, region, { matrix = new THREE.Matrix4(), ao = 1, emission = 0, category = 'details', facet } = {}) {
    const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    g.applyMatrix4(matrix); g.computeVertexNormals();
    const p = g.getAttribute('position'), n = g.getAttribute('normal');
    for (let i = 0; i < p.count; i += 3) {
      const name = facet?.(new THREE.Vector3(n.getX(i), n.getY(i), n.getZ(i)), i / 3) ?? region;
      if (!DESERT_PALETTE[name]) throw new Error(`Unknown desert color: ${name}`);
      const color = new THREE.Color(DESERT_PALETTE[name]);
      this.regions[name] = (this.regions[name] ?? 0) + 1;
      this.groups[category] = (this.groups[category] ?? 0) + 1;
      for (let v = i; v < i + 3; v++) {
        this.positions.push(p.getX(v), p.getY(v), p.getZ(v));
        this.normals.push(n.getX(v), n.getY(v), n.getZ(v));
        this.colors.push(color.r, color.g, color.b, ao); this.emit.push(emission);
      }
    }
    g.dispose(); geometry.dispose();
  }
}

/** A closed chamfered pentagonal petal. Front cream face is +Z, length axis +Y.
 * First three triangles are the inset face; last three are the cream reverse face; the rest are terracotta bevels.
 */
export function mirrorPanel() {
  const outline = [[0, 0], [.128, .085], [.09, .49], [-.09, .49], [-.128, .085]];
  const pts = [], ids = [], centerY = .245;
  for (const [scale, z] of [[.77, .032], [1, 0], [.96, -.034]]) {
    for (const [x, y] of outline) pts.push(x * scale, centerY + (y - centerY) * scale, z);
  }
  for (let i = 1; i < 4; i++) ids.push(0, i, i + 1);
  for (let row = 0; row < 2; row++) for (let i = 0; i < 5; i++) {
    const a = row * 5 + i, b = row * 5 + (i + 1) % 5, c = b + 5, d = a + 5;
    ids.push(a, d, b, b, d, c);
  }
  for (let i = 1; i < 4; i++) ids.push(10, 10 + i + 1, 10 + i);
  return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)).setIndex(ids);
}

/** Cream stair parapet with a sloping top, rising toward -Z. */
export function stairWall() {
  const pts = [-.026,0,-.17, .026,0,-.17, .026,0,.17, -.026,0,.17,
    -.026,.31,-.17, .026,.31,-.17, .026,.052,.17, -.026,.052,.17];
  return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    .setIndex([0,1,2, 0,2,3, 4,7,6, 4,6,5, 0,4,5, 0,5,1, 1,5,6, 1,6,2, 2,6,7, 2,7,3, 3,7,4, 3,4,0]);
}

/** Elongated rhombic bipyramid, eight planar triangular faces, no coincident pole vertices. */
export function amberCrystal() {
  return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([
    0,.70,0, .12,.91,0, 0,.91,.095, -.12,.91,0, 0,.91,-.095, 0,1.18,0,
  ], 3)).setIndex([0,1,2, 0,2,3, 0,3,4, 0,4,1, 5,2,1, 5,3,2, 5,4,3, 5,1,4]);
}
