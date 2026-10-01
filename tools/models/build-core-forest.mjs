import * as THREE from 'three';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ModelBuilder, PALETTE, beam, leaf, profile, radial, ring, transform } from './geometry.mjs';
import { writeGLB } from './glb-writer.mjs';

export function buildCoreForest() {
  const b = new ModelBuilder(), turn = Math.PI * 2;
  const add = (g, color, category, opts = {}) => b.add(g, color, { category, ...opts });
  const box = (size, pos, color, category, angle = 0, ao = 1, emission = 0) =>
    add(new THREE.BoxGeometry(...size), color, category, { matrix: transform(pos, [0, angle, 0]), ao, emission });

  const inlay = (size, pos, color, category, angle = 0, ao = 1, emission = 0) =>
    add(new THREE.PlaneGeometry(...size), color, category, {matrix: transform(pos, [0,angle,0]), ao, emission});

  // No board/soil/stone tile layers: this is only a 12 mm ground-cover rim.
  add(profile([[0, .69], [.012, .71]], 8, 0), 'grass', 'platform', { ao: .88 });
  add(profile([[.012, .48], [.04, .54], [.105, .54], [.125, .50]]), 'trim', 'platform', { ao: .9, facet: (_,i) => i >= 16 && i < 32 ? 'cream' : 'trim' });
  add(ring(.51, .083, .135, .175, 8, Math.PI / 8), 'terra', 'platform');
  add(profile([[.125, .413], [.16, .437], [.19, .407]]), 'cream', 'platform');
  // Paired short stair flights at front-left and front-right; front is +Z.
  for (const angle of [-Math.PI / 4, Math.PI / 4]) for (let step = 0; step < 3; step++) {
    const height = .048 + .043 * step, r = .645 - step * .071;
    box([.16, height, .09], radial(r, .012 + height / 2, angle), 'stair', 'platform', angle, .88);
  }
  box([.125, .10, .032], [0, .092, .52], 'cream', 'platform');
  add(new THREE.CircleGeometry(.037, 6), 'terra', 'platform', { matrix: transform([0, .105, .544]) });

  // Four low octagonal stone gate posts. Outward-facing slits are inset into a dark frame.
  for (const angle of [-Math.PI / 8, Math.PI / 8, Math.PI * 7 / 8, Math.PI * 9 / 8]) {
    const matrix = transform(radial(.525, 0, angle), [0, angle, 0]);
    add(profile([[.03, .081], [.055, .073], [.275, .064], [.30, .047]], 4, Math.PI / 4), 'trim', 'pillars',
      { matrix, ao: .9, facet: n => n.y > .2 ? 'cream' : 'trim' });
    const center = new THREE.Vector3(0, .17, .050).applyMatrix4(matrix).toArray();
    inlay([.036, .156], center, 'sageDark', 'pillars', angle, .8);
    const glow = new THREE.Vector3(0, .17, .057).applyMatrix4(matrix).toArray();
    inlay([.015, .126], glow, 'glow', 'pillars', angle, 1, 1);
  }

  // Central drum with stone terraces and a six-slit sage collar.
  add(profile([[.19, .285], [.215, .285], [.235, .24], [.27, .24]], 8), 'trim', 'pedestal', { ao: .86 });
  add(profile([[.225, .243], [.25, .266], [.275, .238]], 8), 'cream', 'pedestal');
  add(profile([[.27, .213], [.36, .213]], 6, Math.PI / 6), 'sage', 'pedestal', { ao: .88 });
  for (let i = 0; i < 6; i++) {
    const angle = i * turn / 6;
    inlay([.022, .060], radial(.187, .318, angle), 'glow', 'pedestal', angle, 1, 1);
  }
  add(profile([[.357, .214], [.377, .257], [.411, .257], [.43, .227]], 6, Math.PI / 6), 'cream', 'pedestal');

  // Open hexagonal crystal cage: six mint rails; no transparent/opaque glass skin.
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 6 + i * turn / 6;
    add(beam([radial(.175, .435, angle), radial(.175, .83, angle), radial(.103, .971, angle)], .009, 3), 'mint', 'capsule', { emission: 1 });
  }
  add(ring(.185, .014, .432, .447, 6), 'mint', 'capsule', { emission: 1 });
  add(ring(.113, .013, .958, .974, 6), 'mint', 'capsule', { emission: 1 });

  // A crooked living sapling with four raised, faceted leaf diamonds.
  add(beam([[0, .44, 0], [.012, .54, 0], [-.017, .655, 0], [.018, .76, 0]], [.019, .016, .013, .008], 4), 'wood', 'sapling');
  for (const [baseY, tipX, tipY, z] of [[.53, -.10, .62, .012], [.60, .092, .715, .01], [.66, -.078, .76, -.01], [.72, .064, .842, -.006]]) {
    const root = new THREE.Vector3(0, baseY, 0), end = new THREE.Vector3(tipX, tipY, z);
    add(beam([root.toArray(), end.clone().lerp(root, .3).toArray()], [.009, .004], 3), 'wood', 'sapling');
    const direction = end.clone().sub(root).normalize(), cross = new THREE.Vector3(-direction.y, direction.x, 0).multiplyScalar(.035);
    const foot = root.clone().lerp(end, .35), mid = foot.clone().lerp(end, .52), raised = mid.clone().add(new THREE.Vector3(0, 0, .023));
    const pts = [foot, mid.clone().add(cross), end, mid.clone().sub(cross), raised, mid.clone().add(new THREE.Vector3(0, 0, -.008))];
    const g = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(pts.flatMap(p => p.toArray()), 3));
    g.setIndex([0,4,1, 1,4,2, 2,4,3, 3,4,0, 1,5,0, 2,5,1, 3,5,2, 0,5,3]);
    add(g, 'leaf', 'sapling', { facet: (_, i) => i < 2 ? 'leafLight' : 'leaf' });
  }
  for (let i = 0; i < 4; i++) {
    const a = i * turn / 4 + .3;
    add(beam([[0, .482, 0], radial(.044, .448, a), radial(.114, .437, a + .25)], [.008, .006, .003], 3), 'glow', 'sapling', { emission: 1 });
  }

  // Four bowed wooden ribs and pointed sage petals: tips at .995, ~85% of 1.18.
  const petalRows = [[.283,.245,.026,.009], [.456,.625,.124,.050], [.598,.87,.066,.028], [.655,.992,.006,.003]];
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * turn / 4;
    add(beam([[.36,.195],[.31,.37],[.419,.595],[.548,.80],[.631,.961]].map(([r,y]) => radial(r,y,angle)), .029, 4), 'wood', 'petals-ribs',
      { facet: n => n.y > .2 ? 'woodLight' : 'wood' });
    add(leaf(petalRows, angle), 'sage', 'petals-ribs', { facet: (_, t) => t % 8 < 4 ? 'sageLight' : 'sageDark', ao: .96 });
    // Disc axis tangent to the ring, like a mechanical pivot through each rib.
    const center = radial(.348, .405, angle);
    const tangent = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), tangent);
    const matrix = new THREE.Matrix4().compose(new THREE.Vector3(...center), q, new THREE.Vector3(1,1,1));
    add(new THREE.CylinderGeometry(.062,.062,.067,6), 'cream', 'hinges', { matrix, ao: .92 });
    for (const sign of [-1, 1]) {
      const face = new THREE.Vector3(...center).addScaledVector(tangent, sign * .0345);
      const disc = new THREE.CircleGeometry(.027, 4);
      const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1), tangent.clone().multiplyScalar(sign));
      add(disc, 'glow', 'hinges', { matrix: new THREE.Matrix4().compose(face, rotation, new THREE.Vector3(1,1,1)), emission: 1 });
    }
  }

  // Cream cap sits above the petals; hexagonal faceted green gem is the highest point.
  add(profile([[.969,.111],[.982,.153],[1.04,.153],[1.063,.122]],6,Math.PI/6), 'cream', 'cap', { facet: n => n.y > .25 ? 'creamLight' : 'cream' });
  add(profile([[1.063,.077],[1.135,.077],[1.18,.035]],6,Math.PI/6), 'leaf', 'cap', { facet: n => n.y > .25 ? 'leafLight' : 'sage' });
  inlay([.016,.054],[0,1.099,.069],'glow','cap',0,1,1);

  // Five small stones and three low tufts (no modelled ink edges).
  for (const [a,r,s] of [[-.10,.625,.046],[1.36,.646,.053],[2.26,.63,.038],[3.9,.648,.05],[4.82,.645,.042]]) {
    add(new THREE.OctahedronGeometry(s,0), 'stair', 'details', { matrix: transform(radial(r, .012+s*.55, a), [.1,a,.15], [1,.64,.86]), ao:.85 });
  }
  for (const a of [.33, 2.8, 4.5]) for (const delta of [-.38,.38]) {
    const g = leaf([[0,0,.024,.009],[.052,.10,.002,.001]], a+delta);
    add(g,'leaf','details',{ matrix:transform(radial(.63,.012,a)), facet:(_,t)=>t%8<4?'leaf':'sage',ao:.94 });
  }
  const geometry = b.geometry();
  return { geometry, regions: b.regions, groups: b.groups };
}

export function writeCoreForest() {
  const { geometry, regions, groups } = buildCoreForest();
  const output = new URL('./out/', import.meta.url); mkdirSync(output, { recursive: true });
  const binary = writeGLB(geometry, 'core_forest');
  writeFileSync(new URL('core_forest.glb', output), binary);
  const p = geometry.getAttribute('position'); let radius = 0;
  for (let i=0;i<p.count;i++) radius = Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));
  const report = { triangles:geometry.index.count/3, vertices:p.count, bounds:{min:geometry.boundingBox.min.toArray(),max:geometry.boundingBox.max.toArray()}, radius,
    groups, regions:Object.fromEntries(Object.entries(regions).map(([name,triangles])=>[name,{hex:PALETTE[name],triangles}])),
    format:'GLB 2.0; Y-up; bottom center; 1 unit = 1 hex radius', front:'+Z', materials:1, textures:0, attributes:['POSITION','NORMAL','COLOR_0 (linear RGBA; alpha AO)','_EMIT (float)'], bytes:binary.length };
  writeFileSync(new URL('core_forest.report.json',output),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2)); geometry.dispose(); return report;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) writeCoreForest();
