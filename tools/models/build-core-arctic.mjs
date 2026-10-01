import * as THREE from 'three';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { beam, profile, radial, ring, transform } from './geometry.mjs';
import { ArcticModelBuilder } from './geometry-arctic.mjs';
import { writeGLB } from './glb-writer.mjs';

export const ARCTIC_PALETTE = {
  cream: '#D8CFC0', creamLight: '#EAE0CF', stone: '#AAA69D',
  copper: '#C8664E', grey: '#7E8282', slate: '#4E5352', slateLight: '#68706D',
  snow: '#F2F5F7', ice: '#A9C8DD', iceLight: '#CFE2EE',
  mint: '#8FE3C4', crystal: '#A8E6CF', crystalLight: '#D6F5E8', pipe: '#5E7F78',
};

/** Static Arctic machinery. +Z is front; the board owns every layer below y=0. */
export function buildCoreArctic() {
  const b = new ArcticModelBuilder(ARCTIC_PALETTE), turn = Math.PI * 2;
  const add = (g, color, category, opts = {}) => b.add(g, color, { category, ...opts });
  const box = (size, pos, color, category, angle = 0, ao = 1) =>
    add(new THREE.BoxGeometry(...size), color, category, { matrix: transform(pos,[0,angle,0]),ao });
  const slit = (size, pos, category, angle = 0) =>
    add(new THREE.PlaneGeometry(...size),'mint',category,{matrix:transform(pos,[0,angle,0]),emission:1});
  const polarBox = (size,r,y,angle,color,category,ao=1) => box(size,radial(r,y,angle),color,category,angle,ao);

  // Thin snow only; no hexagonal soil or stone tile underneath the architectural base.
  add(profile([[0,.675],[.012,.69]],8,0),'snow','snow-ice');
  add(profile([[.012,.45],[.032,.50],[.105,.50],[.137,.46]],8),'cream','platform',
    {ao:.94,facet:(n,t)=>t<16?'stone':n.y>.3?'creamLight':'cream'});
  add(ring(.495,.087,.136,.17,8,Math.PI/8),'copper','platform');
  add(profile([[.14,.407],[.173,.437],[.188,.407]],8),'cream','platform');
  // Three grey steps in each flight, flanked by sloping cream parapets.
  for(const angle of [-Math.PI/4,Math.PI/4]) {
    for(let step=0;step<3;step++) {
      const h=.045+step*.04;
      polarBox([.14,h,.084],.61-step*.067,.012+h/2,angle,'grey','stairs',.86);
    }
    for(const side of [-1,1]) {
      const low=new THREE.Vector3(side*.095,.046,.657).applyAxisAngle(new THREE.Vector3(0,1,0),angle);
      const high=new THREE.Vector3(side*.095,.172,.441).applyAxisAngle(new THREE.Vector3(0,1,0),angle);
      add(beam([low.toArray(),high.toArray()],.032,4),'cream','stairs');
    }
  }

  // Four short dark sentry boxes, and the separate plaque pillar on the front axis.
  const snowCap = (r,y,angle,width,category) => {
    add(profile([[0,width],[.035,width*.83]],4,Math.PI/4),'snow',category,
      {matrix:transform(radial(r,y,angle),[0,angle,0]),facet:n=>n.y>.15?'snow':'iceLight'});
  };
  for(const angle of [-Math.PI/8,Math.PI/8,7*Math.PI/8,9*Math.PI/8]) {
    polarBox([.099,.175,.091],.51,.1275,angle,'slate','pillars',.9);
    polarBox([.111,.025,.104],.51,.228,angle,'cream','pillars');
    slit([.016,.112],radial(.557,.137,angle),'pillars',angle);
    snowCap(.51,.238,angle,.077,'snow-ice');
  }
  box([.126,.121,.079],[0,.0725,.503],'cream','plaque');
  add(new THREE.CircleGeometry(.033,6),'copper','plaque',{matrix:transform([0,.079,.544])});
  box([.092,.148,.083],[0,.205,.493],'slate','plaque',0,.9);
  slit([.017,.101],[0,.206,.536],'plaque');
  snowCap(.493,.279,0,.074,'snow-ice');

  // Central drum combines a cream base, dark coolant housing and a copper crystal seat.
  add(profile([[.188,.196],[.206,.219],[.25,.219],[.269,.177],[.362,.177],[.383,.205]],8),
    'cream','pedestal',{ao:.95,facet:(_,t)=>t>=48&&t<64?'slateLight':'cream'});
  add(profile([[.379,.205],[.415,.205]],8),'copper','pedestal');
  for(let i=0;i<4;i++) slit([.017,.056],radial(.168,.32,i*turn/4),'pedestal',i*turn/4);

  // The opaque, emissive central hexagonal crystal uses colored facets, not glass or texture.
  add(profile([[.413,.072],[.452,.112],[.777,.112],[.823,.072]],6,Math.PI/6),'crystal','crystal',
    {emission:1,facet:(_,t)=>Math.floor(t/2)%3===0?'crystalLight':'crystal'});

  // Four cream obelisk struts. Their square beams taper in toward the upper machine collar.
  const footR=.324,footY=.177,headR=.153,headY=.835;
  const pointAt = (y,angle) => radial(footR+(headR-footR)*(y-footY)/(headY-footY),y,angle);
  for(let i=0;i<4;i++) {
    const angle=Math.PI/4+i*turn/4;
    add(beam([pointAt(footY,angle),pointAt(headY,angle)],[.046,.035],4),'cream','tower',
      {facet:n=>n.y>.1?'creamLight':'cream'});
    polarBox([.101,.05,.092],footR,.204,angle,'slate','tower',.87);
    for(const y of [.527,.808]) {
      const r=pointAt(y,angle);const radius=Math.hypot(r[0],r[2]);
      polarBox([.100,.067,.092],radius,y,angle,'slate','tower',.94);
      slit([.054,.014],radial(radius+.047,y-.009,angle),'tower',angle);
      // The small overhanging white snow blocks are model geometry, never alpha patches.
      const snow = new THREE.BoxGeometry(.107,.021,.100);
      // Drop only each snow block’s concealed bottom face.
      const idx=Array.from(snow.index.array);snow.setIndex(idx.filter((_,i)=>i<18||i>=24));
      add(snow,'snow','snow-ice',{matrix:transform(radial(radius,y+.043,angle),[0,angle,0])});
      if (y < .6) {
        const icicle = new THREE.ConeGeometry(.012,.060,4);
        add(icicle,'iceLight','snow-ice',{matrix:transform(radial(radius+.048,y+.013,angle+.12),[Math.PI,0,0])});
      }
    }
  }

  // Four polygonal swept pipes. Short bend sections are dark elbow joints in the same material.
  for(let i=0;i<4;i++) {
    const angle=i*turn/4;
    const points=[[.154,.314],[.223,.314],[.268,.274],[.271,.224],[.352,.182]].map(([r,y])=>radial(r,y,angle));
    add(beam(points,.026,4),'pipe','pipes',{ao:.93,facet:(_,t)=>{
      const segment=Math.floor(t/8);return segment===1||segment===3?'slate':'pipe';
    }});
    polarBox([.066,.035,.066],.352,.167,angle,'cream','pipes');
  }

  // Alternating narrow collars lead to the highest point, a small faceted mint spire.
  add(profile([[.812,.131],[.835,.162],[.869,.144]],6),'cream','collars');
  for(const [y0,y1,r] of [[.869,.914,.119],[.939,.986,.095],[1.013,1.046,.069]]) {
    add(profile([[y0,r],[y1,r]],8),'slate','collars',{ao:.95});
    for(let i=0;i<4;i++) slit([.013,(y1-y0)*.65],radial(r*.924+.001,(y0+y1)/2,i*turn/4),'collars',i*turn/4);
  }
  add(profile([[.914,.132],[.939,.132]],6),'cream','collars');
  add(profile([[.986,.110],[1.013,.098]],6),'cream','collars');
  add(profile([[1.045,.050],[1.128,.050]],6,Math.PI/6),'crystal','spire',
    {emission:1,facet:(_,t)=>Math.floor(t/2)%3===0?'crystalLight':'crystal'});
  add(new THREE.ConeGeometry(.050,.061,6),'crystalLight','spire',
    {matrix:transform([0,1.1585,0],[0,Math.PI/6,0]),emission:1,facet:(_,t)=>t%2?'crystal':'crystalLight'});

  // Four offset, flattened ice boulders with pale upper facets. All fit inside the snow rim.
  for(const[a,r,size]of[[-1.18,.578,.092],[1.18,.588,.082],[2.65,.576,.075],[3.68,.580,.064]]) {
    add(new THREE.IcosahedronGeometry(size,0),'ice','snow-ice',
      {matrix:transform(radial(r,.012+size*.66,a),[.05,a,.12],[.86,.77,.93]),ao:.98,facet:n=>n.y>.25?'iceLight':'ice'});
  }
  return {geometry:b.geometry(),regions:b.regions,groups:b.groups};
}

export function writeCoreArctic() {
  const {geometry,regions,groups}=buildCoreArctic();
  const p=geometry.getAttribute('position');let radius=0;
  for(let i=0;i<p.count;i++)radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));
  const triangles=geometry.index.count/3,box=geometry.boundingBox;
  if(triangles>1500||radius>.8||box.min.y<0||box.max.y>1.2)throw new Error('Arctic geometry exceeds the authored core limits');
  const binary=writeGLB(geometry,'core_arctic'),out=new URL('./out/',import.meta.url);mkdirSync(out,{recursive:true});
  writeFileSync(new URL('core_arctic.glb',out),binary);
  const report={triangles,vertices:p.count,bounds:{min:box.min.toArray(),max:box.max.toArray()},radius,
    groups,regions:Object.fromEntries(Object.entries(regions).map(([name,triangles])=>[name,{hex:ARCTIC_PALETTE[name],triangles}])),
    format:'GLB 2.0; Y-up; bottom center; 1 unit = 1 hex radius',front:'+Z',materials:1,textures:0,
    attributes:['POSITION','NORMAL','COLOR_0 (linear RGBA; alpha AO)','_EMIT (float)'],bytes:binary.length};
  writeFileSync(new URL('core_arctic.report.json',out),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));geometry.dispose();return report;
}
if(process.argv[1]===fileURLToPath(import.meta.url))writeCoreArctic();
