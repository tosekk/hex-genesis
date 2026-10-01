import * as THREE from 'three';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { beam, leaf, profile, radial, ring, transform } from './geometry.mjs';
import { DESERT_PALETTE, DesertBuilder, mirrorPanel, stairWall, amberCrystal } from './geometry-desert.mjs';
import { writeGLB } from './glb-writer.mjs';

export function buildCoreDesert() {
  const b = new DesertBuilder(), turn = Math.PI * 2;
  const add = (g, color, category, opts = {}) => b.add(g, color, { category, ...opts });
  const box = (size, pos, color, category, angle = 0, ao = 1) =>
    add(new THREE.BoxGeometry(...size), color, category, { matrix: transform(pos, [0, angle, 0]), ao });
  const inlay = (size, pos, color, category, angle = 0, emission = 0) =>
    add(new THREE.PlaneGeometry(...size), color, category, { matrix: transform(pos, [0, angle, 0]), emission });
  const features = { tiers: 3, staircases: 2, stairStepsEach: 6, shrines: 3, mirrors: 8, rocks: 5, tufts: 3 };

  // A 10 mm sand rim only. The board owns all terrain layers.
  add(profile([[0,.72],[.01,.72]], 8, 0), 'sand', 'ziggurat-stairs', { ao:.92 });
  for (const [y, r] of [[.01,.54],[.145,.445],[.28,.35]]) {
    add(profile([[y,r-.018],[y+.018,r],[y+.112,r],[y+.135,r-.018]], 8), 'cream', 'ziggurat-stairs',
      { ao:.94, facet:(n,i)=> n.y > .1 || i % 4 < 2 ? 'cream':'stone' });
  }
  for (const [y,r] of [[.12,.545],[.255,.45]]) {
    add(profile([[y,r],[y+.038,r]],8), 'terra', 'ziggurat-stairs', { ao:.92 });
  }
  for (const angle of [-Math.PI/4, Math.PI/4]) {
    for (let step=0; step<6; step++) {
      const height=.044+step*.044;
      box([.155,height,.061],radial(.655-step*.049,.01+height/2,angle),'grey','ziggurat-stairs',angle,.91);
    }
    for (const x of [-.107,.107]) {
      const matrix=transform(radial(.525,.01,angle),[0,angle,0]).multiply(transform([x,0,0]));
      add(stairWall(),'cream','ziggurat-stairs',{matrix,ao:.94});
    }
  }

  // Three small shrine pillars: the front shrine carries a long terracotta plaque.
  for (const angle of [0,-Math.PI/2,Math.PI/2]) {
    const matrix=transform(radial(.525,0,angle),[0,0,0]);
    const local=(v)=>new THREE.Vector3(...v).applyMatrix4(matrix).toArray();
    add(profile([[.01,.099],[.055,.108],[.092,.091]],4,Math.PI/4),'cream','shrines',{matrix,ao:.92});
    add(profile([[.075,.079],[.115,.085],[.295,.073],[.32,.08]],4,Math.PI/4),'cream','shrines',
      {matrix,facet:n=>n.y>.1?'cream':'stone'});
    box([.107,.10,.104],local([0,.36,0]),'cream','shrines',0);
    box([.13,.032,.07],local([0,.33,0]),'sage','shrines',0,.90);
    inlay([.029,.073],local([0,.355,.053]),'joint','shrines',0);
    inlay([.017,.059],local([0,.355,.054]),'amber','shrines',0,1);
    box([.052,.185,.018],local([0,.205,.063]),angle===0?'terra':'sage','shrines',0);
    if(angle===0) {
      inlay([.012,.136],local([0,.198,.073]),'amber','shrines',0,1);
      box([.077,.022,.026],local([0,.29,.073]),'sage','shrines',0);
    }
  }

  // Open stone drum encircles the flat amber pool; no solid cap over its center.
  add(ring(.255,.058,.412,.48,8,Math.PI/8),'stone','drum-crystal',{ao:.94});
  add(ring(.266,.047,.475,.512,8,Math.PI/8),'cream','drum-crystal');
  add(new THREE.CircleGeometry(.220,12),'pool','drum-crystal',
    {matrix:transform([0,.487,0],[-Math.PI/2,0,0]),emission:1});

  // Eight radial mirrors. Their cream inset faces point inward/up toward the crystal.
  for(let i=0;i<8;i++) {
    const angle=Math.PI/8+i*turn/8;
    add(beam([radial(.275,.402,angle),radial(.385,.59,angle)],.043,4),'cream','panels-arms',{ao:.96});
    box([.095,.045,.073],radial(.322,.48,angle),'sage','panels-arms',angle,.9);
    add(new THREE.OctahedronGeometry(.059,0),'joint','panels-arms',
      {matrix:transform(radial(.365,.551,angle),[0,angle,0],[1,.85,1]),ao:.9});
    // Reverse the local face, then tilt its length 31.5 degrees outwards.
    const matrix=transform(radial(.355,.565,angle),[0,angle,0])
      .multiply(transform([0,0,0],[.55,0,0])).multiply(transform([0,0,0],[0,Math.PI,0]));
    add(mirrorPanel(),'terra','panels-arms',{matrix,facet:(_,t)=>t<3 || t>=23?'cream':'terra'});
  }
  add(amberCrystal(),'amber','drum-crystal',{emission:1,facet:(_,i)=>i%3===1?'light':'amber'});

  for(const[a,r,s]of[[.28,.654,.046],[1.24,.638,.062],[2.45,.625,.04],[3.6,.64,.052],[5.01,.639,.047]]) {
    add(new THREE.OctahedronGeometry(s,0),'rock','rocks-plants',
      {matrix:transform(radial(r,.01+s*.68,a),[0,a,0],[1,.68,.85]),ao:.91});
  }
  for(const angle of [-.29,1.83,4.50]) for(const offset of [-.5,0,.5]) {
    add(leaf([[0,0,.022,.006],[.046,.083,.001,.001]],angle+offset),'sage','rocks-plants',
      {matrix:transform(radial(.64,.023,angle)),facet:(_,i)=>i%8<4?'sage':'joint',ao:.96});
  }
  return {geometry:b.geometry(),regions:b.regions,groups:b.groups,features};
}

export function writeCoreDesert() {
  const {geometry,regions,groups,features}=buildCoreDesert();
  const output=new URL('./out/',import.meta.url); mkdirSync(output,{recursive:true});
  const binary=writeGLB(geometry,'core_desert');
  writeFileSync(new URL('core_desert.glb',output),binary);
  const p=geometry.getAttribute('position'); let radius=0;
  for(let i=0;i<p.count;i++) radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));
  const report={triangles:geometry.index.count/3,vertices:p.count,
    bounds:{min:geometry.boundingBox.min.toArray(),max:geometry.boundingBox.max.toArray()},radius,
    groups,features,regions:Object.fromEntries(Object.entries(regions).map(([name,triangles])=>[name,{hex:DESERT_PALETTE[name],triangles}])),
    format:'GLB 2.0; Y-up; bottom center; 1 unit = 1 hex radius',front:'+Z',materials:1,textures:0,
    attributes:['POSITION','NORMAL','COLOR_0 (linear RGBA; alpha AO)','_EMIT (float)'],bytes:binary.length};
  writeFileSync(new URL('core_desert.report.json',output),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));geometry.dispose();return report;
}
if(process.argv[1]===fileURLToPath(import.meta.url)) writeCoreDesert();
