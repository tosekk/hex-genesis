import * as THREE from 'three';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {beam,profile,ring,transform} from './geometry.mjs';
import {BuildingBuilder,PALETTE,prism,roofArc,screwFlight,stripedTank} from './geometry-buildings.mjs';
import {writeGLB} from './glb-writer.mjs';

function toolkit() {
  const b=new BuildingBuilder();
  const add=(g,color,category,opts={})=>b.add(g,color,{category,...opts});
  const box=(size,pos,color,category,rotation=[0,0,0],ao=1)=>add(new THREE.BoxGeometry(...size),color,category,{matrix:transform(pos,rotation),ao});
  const plane=(size,pos,color,category,rotation=[0,0,0])=>add(new THREE.PlaneGeometry(...size),color,category,{matrix:transform(pos,rotation)});
  const rod=(points,r,color,category,sides=4)=>add(beam(points,r,sides),color,category,{ao:.94});
  return {b,add,box,plane,rod};
}

export function buildLumberCamp() {
  const {b,add,box,plane,rod}=toolkit(),cx=-.063;
  box([.244,.035,.248],[cx,.0175,0],'stone','cabin',undefined,.9);
  box([.222,.181,.222],[cx,.1255,0],'wood','cabin',undefined,.96);
  add(prism([[-.111,.216],[.111,.216],[0,.372]],.222),'wood','cabin',{matrix:transform([cx,0,0])});
  // Wide plank divisions, color-only planar insets, not modeled outlines.
  for(const y of [.075,.118,.161,.204]) {
    for(const z of [-.1112,.1112]) plane([.222,.003],[cx,y,z],'seam','cabin',[0,z<0?Math.PI:0,0]);
    for(const x of [-.1112,.1112]) plane([.222,.003],[cx+x,y,0],'seam','cabin',[0,x<0?-Math.PI/2:Math.PI/2,0]);
  }
  for(const sign of [-1,1]) {
    add(prism([[0,.389],[sign*.147,.215],[sign*.147,.229],[0,.404]],.278),'sage','roof',
      {matrix:transform([cx,0,0]),facet:n=>n.y>.3&&sign===1?'roofLight':'sage'});
    // Four broad roof planks per slope: flat color regions, without tiny modeled trim.
    for(let i=0;i<4;i++) {
      const z0=-.134+i*.068,z1=z0+.063;
      const vertices=[cx,.4044,z0,cx+sign*.146,.2306,z0,cx+sign*.146,.2306,z1,cx,.4044,z1];
      const ids=sign===1?[0,2,1,0,3,2]:[0,1,2,0,2,3];
      add(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(vertices,3)).setIndex(ids),
        i%2===0?'roofLight':'sage','roof');
    }
  }
  for(const z of [-.117,.117]) box([.037,.031,.035],[cx,.405,z],'wood','roof');
  // Three large chimney courses and a dark mouth.
  for(let i=0;i<3;i++) box([.047,.043,.047],[cx+.072,.31+i*.045,-.06],'stone','roof');
  plane([.032,.032],[cx+.072,.422,-.06],'iron','roof',[-Math.PI/2,0,0]);
  add(new THREE.CircleGeometry(.030,8),'cream','cabin',{matrix:transform([cx,.288,.112])});
  add(new THREE.CircleGeometry(.021,8),'seam','cabin',{matrix:transform([cx,.288,.1125])});
  plane([.006,.043],[cx,.288,.113],'cream','cabin');plane([.043,.006],[cx,.288,.1132],'cream','cabin');
  box([.061,.118,.009],[cx,.094,.116],'seam','cabin');
  box([.104,.015,.071],[cx,.182,.138],'sage','cabin',[.22,0,0]);
  // Lean-to shelters a 3-2-1 stack: bark side faces and actual cream cut end caps.
  box([.132,.018,.253],[.117,.181,0],'sage','logs',[0,0,-.20]);
  for(const z of [-.102,.102]) box([.017,.17,.017],[.172,.085,z],'wood','logs');
  for(const[x,y]of[[.066,.021],[.109,.021],[.152,.021],[.0875,.059],[.1305,.059],[.109,.097]]) {
    add(profile([[-.09,.021],[.09,.021]],6,Math.PI/6),'wood','logs',
      {matrix:transform([x,y,.004],[Math.PI/2,0,0]),facet:n=>Math.abs(n.z)>.95?'cut':'wood',ao:.96});
  }
  add(profile([[0,.043],[.048,.032],[.057,.033]],6),'wood','stump-axe',
    {matrix:transform([.060,0,.182]),facet:n=>n.y>.5?'cut':'wood',ao:.94});
  rod([[.037,.089,.18],[.118,.127,.18]],.007,'handle','stump-axe');
  add(prism([[-.023,0],[.021,-.004],[.014,.033],[-.013,.041]],.014),'axe','stump-axe',
    {matrix:transform([.045,.058,.18])});
  return b.finish();
}

export function buildQuarry() {
  const {b,add,box,rod}=toolkit();
  // Three nested U-shaped terraces, open at the front: extracted rock, no base plate.
  for(const[w,z,h,thickness]of[[.36,-.015,.064,.065],[.29,-.049,.126,.055],[.22,-.082,.192,.048]]) {
    for(const sign of [-1,1]) box([thickness,h,.202],[sign*(w-thickness)/2,h/2,z],'cream','terraces',undefined,.96);
    box([w-2*thickness,h,thickness],[0,h/2,z-.101+thickness/2],'sandstone','terraces',undefined,.94);
  }
  // Hoist stands on the left terrace; boom crosses the open pit.
  rod([[-.157,.064,.045],[-.103,.338,-.045]],.022,'wood','hoist');
  rod([[-.158,.064,-.133],[-.103,.338,-.045]],.022,'wood','hoist');
  box([.180,.030,.031],[-.058,.333,-.045],'wood','hoist');
  rod([[-.130,.21,-.045],[.020,.325,-.045]],.012,'wood','hoist');
  for(const pos of [[-.157,.079,.045],[-.158,.079,-.133],[-.103,.338,-.045]]) box([.045,.026,.048],pos,'iron','hoist');
  box([.016,.078,.016],[-.103,.39,-.045],'wood','hoist');
  add(prism([[0,0],[.08,.044],[0,.044]],.005),'terra','hoist',{matrix:transform([-.097,.376,-.045])});
  rod([[.027,.333,-.045],[.027,.209,-.045]],.005,'rope','load',3);
  box([.055,.056,.063],[.027,.175,-.045],'block','load');
  box([.013,.071,.071],[.027,.175,-.045],'iron','load');
  rod([[.027,.223,-.045],[.027,.196,-.078]],.006,'iron','load');
  // Compact wagon and two short rails. Two loads protrude from a dark open top.
  for(const x of [-.041,.041]) box([.012,.013,.142],[x,.0065,.135],'iron','cart');
  box([.103,.048,.088],[0,.054,.131],'wood','cart');
  add(new THREE.PlaneGeometry(.087,.071),'seam','cart',{matrix:transform([0,.0781,.131],[-Math.PI/2,0,0])});
  for(const x of [-.054,.054]) for(const z of [.106,.161]) {
    add(profile([[-.008,.023],[.008,.023]],6),'iron','cart',{matrix:transform([x,.025,z],[0,0,Math.PI/2])});
  }
  for(const[x,z]of[[-.022,.118],[.025,.14]]) box([.040,.045,.039],[x,.094,z],'block','cart',[0,.15,0]);
  for(const[pos,size]of[[[-.114,.023,.151],.046],[[.154,.025,.112],.05],[[.135,.017,.181],.034]]) {
    box([size,size,size],pos,'block','loose-blocks',[0,.17,0],.92);
  }
  return b.finish();
}

export function buildIceDrill() {
  const {b,add,box,plane,rod}=toolkit(),cx=-.064,cz=.040;
  add(ring(.087,.028,0,.018,6),'ice','hole',{matrix:transform([cx,0,cz]),facet:n=>n.y>.5?'ice':'iceEdge'});
  add(new THREE.CircleGeometry(.059,6),'water','hole',{matrix:transform([cx,.004,cz],[-Math.PI/2,0,0])});
  const top=[cx,.444,cz];
  for(const[dx,dz]of[[-.098,.056],[.098,.056],[0,-.113]]) {
    const foot=[cx+dx,.024,cz+dz];
    rod([foot,top],.016,'mint','tripod');
    box([.046,.025,.043],[foot[0],.0125,foot[2]],'cream','tripod',undefined,.94);
    box([.038,.026,.038],[cx+dx*.48,.244,cz+dz*.48],'iron','tripod');
  }
  box([.062,.032,.058],[cx,.451,cz],'cream','tripod');
  add(profile([[.013,.010],[.43,.010]],4),'auger','auger',{matrix:transform([cx,0,cz])});
  add(screwFlight(),'auger','auger',{matrix:transform([cx,0,cz]),ao:.96});
  add(profile([[.229,.023],[.288,.023]],6),'cream','auger',{matrix:transform([cx,0,cz])});
  // Low quonset behind the tripod; six broad roof facets with a top snow cap.
  const hut=[.068,0,-.111],outline=[[-.076,0],[.076,0]];
  for(let i=0;i<=6;i++){const a=i*Math.PI/6;outline.push([Math.cos(a)*.076,.057+Math.sin(a)*.076]);}
  add(prism(outline,.137),'hut','hut',{matrix:transform(hut),ao:.96});
  add(roofArc(.080,.057,.148,6),'sage','hut',{matrix:transform(hut)});
  add(roofArc(.081,.057,.057,2,Math.PI/3,Math.PI*2/3),'snow','hut',{matrix:transform([hut[0],0,hut[2]-.026])});
  plane([.038,.061],[hut[0],.031,hut[2]+.069],'sage','hut');
  add(new THREE.CircleGeometry(.016,8),'iron','hut',{matrix:transform([hut[0],.094,hut[2]+.069])});
  add(new THREE.CircleGeometry(.011,6),'water','hut',{matrix:transform([hut[0],.094,hut[2]+.0695])});
  // Tiny wooden stand supports the tank only; tank stripe is tessellated into its sides.
  const tank=[.147,.040,.097];
  box([.09,.012,.081],[tank[0],.034,tank[2]],'wood','tank');
  for(const x of [-.032,.032]) box([.014,.028,.067],[tank[0]+x,.014,tank[2]],'wood','tank');
  add(stripedTank(),'cream','tank',{matrix:transform(tank),facet:(_,i)=>i<12||i>=48&&i<60?'sage':i>=24&&i<36?'terra':'cream'});
  rod([[.023,.13,.077],[.147,.13,.077],[.147,.162,.097]],.010,'iron','tank');
  add(new THREE.OctahedronGeometry(.040,0),'ice','ice-chunk',
    {matrix:transform([-.157,.028,-.098],[0,.3,0],[.75,.7,1]),facet:n=>n.y>.3?'ice':'iceEdge'});
  return b.finish();
}

export const BUILDERS={lumber_camp:buildLumberCamp,quarry:buildQuarry,ice_drill:buildIceDrill};
export function writeBuildings() {
  const out=new URL('./out/',import.meta.url);mkdirSync(out,{recursive:true});const reports={};
  for(const[name,build]of Object.entries(BUILDERS)) {
    const{geometry,regions,groups,authoredScale}=build(),binary=writeGLB(geometry,name),p=geometry.getAttribute('position');let radius=0;
    for(let i=0;i<p.count;i++) radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));
    const report={name,triangles:geometry.index.count/3,vertices:p.count,bounds:{min:geometry.boundingBox.min.toArray(),max:geometry.boundingBox.max.toArray()},
      radius,authoredScale,groups,regions:Object.fromEntries(Object.entries(regions).map(([key,triangles])=>[key,{hex:PALETTE[key],triangles}])),
      bytes:binary.length,materials:1,textures:0,front:'+Z',format:'GLB 2.0; Y-up; bottom center; linear COLOR_0 RGB + AO alpha; _EMIT=0'};
    writeFileSync(new URL(`${name}.glb`,out),binary);writeFileSync(new URL(`${name}.report.json`,out),JSON.stringify(report,null,2)+'\n');
    reports[name]=report;geometry.dispose();
  }
  console.log(JSON.stringify(reports,null,2));return reports;
}
if(process.argv[1]===fileURLToPath(import.meta.url)) writeBuildings();
