import * as THREE from 'three';

export const PALETTE = {
  cream: '#D8CFC0', creamLight: '#EAE0CF', trim: '#A8A196', stair: '#8E8E8C',
  terra: '#D9826B', sage: '#5F7D6B', sageLight: '#819B7E', sageDark: '#496457',
  mint: '#B5D6C9', glow: '#7BE0A8', wood: '#8B5A3C', woodLight: '#A67853',
  leaf: '#6FAF6A', leafLight: '#96C481', grass: '#819B61',
};

/** Every triangle owns its vertices: no interpolated face colors or smooth shared normals. */
export class ModelBuilder {
  positions = []; normals = []; colors = []; emit = []; regions = {}; groups = {};
  add(geometry, region, { matrix = new THREE.Matrix4(), ao = 1, emission = 0, category = 'details', facet } = {}) {
    const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    g.applyMatrix4(matrix); g.computeVertexNormals();
    const p = g.getAttribute('position'), n = g.getAttribute('normal');
    for (let i = 0; i < p.count; i += 3) {
      const name = facet?.(new THREE.Vector3(n.getX(i), n.getY(i), n.getZ(i)), i / 3) ?? region;
      const color = new THREE.Color(PALETTE[name]); // glTF vertex RGB is linear, not sRGB bytes.
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
  geometry() {
    // Clamp only roundoff at the authored contact plane; never shift the model into the tile.
    for (let i = 1; i < this.positions.length; i += 3) if (Math.abs(this.positions[i]) < 1e-7) this.positions[i] = 0;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.normals, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 4));
    g.setAttribute('_EMIT', new THREE.Float32BufferAttribute(this.emit, 1));
    g.setIndex(Array.from({ length: this.emit.length }, (_, i) => i));
    g.computeBoundingBox(); g.computeBoundingSphere();
    return g;
  }
}

export function transform(position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) {
  return new THREE.Matrix4().compose(new THREE.Vector3(...position),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)), new THREE.Vector3(...scale));
}
export const radial = (r, y, angle) => [Math.sin(angle) * r, y, Math.cos(angle) * r];

/** Closed faceted ring/drum. Profiles listed bottom to top as [y,radius]. */
export function profile(levels, sides = 8, phase = Math.PI / 8) {
  const vertices = [], indices = [];
  for (const [y, r] of levels) for (let i = 0; i < sides; i++) vertices.push(...radial(r, y, phase + i * Math.PI * 2 / sides));
  for (let row = 0; row < levels.length - 1; row++) for (let i = 0; i < sides; i++) {
    const a = row * sides + i, b = row * sides + (i + 1) % sides, c = b + sides, d = a + sides;
    indices.push(a, b, d, b, c, d);
  }
  for (let i = 1; i < sides - 1; i++) {
    indices.push(0, i + 1, i);
    const t = (levels.length - 1) * sides;
    indices.push(t, t + i, t + i + 1);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); g.setIndex(indices); return g;
}

/** A true hollow ring: there is no opaque membrane obscuring the sapling. */
export function ring(radius, thickness, y0, y1, sides = 6, phase = Math.PI / 6) {
  const pts = [], indices = [];
  for (const [r, y] of [[radius, y0], [radius, y1], [radius - thickness, y1], [radius - thickness, y0]]) {
    for (let i = 0; i < sides; i++) pts.push(...radial(r, y, phase + i * 2 * Math.PI / sides));
  }
  for (let row = 0; row < 4; row++) for (let i = 0; i < sides; i++) {
    const a = row * sides + i, b = row * sides + (i + 1) % sides;
    const d = ((row + 1) % 4) * sides + i, c = ((row + 1) % 4) * sides + (i + 1) % sides;
    indices.push(a, b, d, b, c, d);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); g.setIndex(indices); return g;
}

/** Polygonal beam swept along a polyline; joints share a closed cross section. */
export function beam(points, radius, sides = 4) {
  const pts = points.map(p => new THREE.Vector3(...p)), vertices = [], indices = [];
  for (let row = 0; row < pts.length; row++) {
    const tangent = pts[Math.min(row + 1, pts.length - 1)].clone().sub(pts[Math.max(0, row - 1)]).normalize();
    const u = new THREE.Vector3(0, 0, 1);
    if (Math.abs(u.dot(tangent)) > .95) u.set(1, 0, 0);
    u.cross(tangent).normalize(); const v = tangent.clone().cross(u).normalize();
    const r = Array.isArray(radius) ? radius[row] : radius;
    for (let i = 0; i < sides; i++) {
      const angle = i * 2 * Math.PI / sides + Math.PI / 4;
      vertices.push(...pts[row].clone().addScaledVector(u, Math.cos(angle) * r).addScaledVector(v, Math.sin(angle) * r).toArray());
    }
  }
  for (let row = 0; row < pts.length - 1; row++) for (let i = 0; i < sides; i++) {
    const a = row * sides + i, b = row * sides + (i + 1) % sides, c = b + sides, d = a + sides;
    indices.push(a, b, d, b, c, d);
  }
  for (let i = 1; i < sides - 1; i++) {
    indices.push(0, i + 1, i); const end = (pts.length - 1) * sides;
    indices.push(end, end + i, end + i + 1);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); g.setIndex(indices); return g;
}

/** Thick pointed leaf: paired planar facets along a raised midrib, closed underside. */
export function leaf(rows, angle = 0) {
  const vertices = [], indices = [];
  // Cross section clockwise around outward radial axis: left, top ridge, right, underside.
  for (const [r, y, width, ridge] of rows) {
    for (const [x, dr, dy] of [[-width, 0, 0], [0, -ridge, .012], [width, 0, 0], [0, .012, -.012]]) {
      const v = new THREE.Vector3(x, y + dy, r + dr).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      vertices.push(...v.toArray());
    }
  }
  for (let row = 0; row < rows.length - 1; row++) for (let j = 0; j < 4; j++) {
    const a = row * 4 + j, b = row * 4 + (j + 1) % 4, c = b + 4, d = a + 4;
    indices.push(a, d, b, b, d, c);
  }
  indices.push(0, 1, 2, 0, 2, 3);
  const t = (rows.length - 1) * 4; indices.push(t, t + 2, t + 1, t, t + 3, t + 2);
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); g.setIndex(indices); return g;
}
