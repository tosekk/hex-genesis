import * as THREE from 'three';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {beam,profile,ring,transform} from './geometry.mjs';
import {BuildingBuilder,PALETTE,prism,roofArc,screwFlight,stripedTank,sawPlate} from './geometry-buildings.mjs';
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
  box([.222,.224,.222],[cx,.147,0],'wood','cabin',undefined,.96);
  add(prism([[-.111,.259],[.111,.259],[0,.390]],.222),'wood','cabin',{matrix:transform([cx,0,0])});
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
  box([.047,.108,.047],[cx+.072,.35,-.06],'stone','roof');
  add(ring(.038,.012,.401,.431,4,Math.PI/4),'stone','roof',{matrix:transform([cx+.072,0,-.06])});
  plane([.036,.036],[cx+.072,.4045,-.06],'iron','roof',[-Math.PI/2,0,0]);
  add(new THREE.CircleGeometry(.034,8),'cream','cabin',{matrix:transform([cx,.288,.112])});
  add(new THREE.CircleGeometry(.024,8),'seam','cabin',{matrix:transform([cx,.288,.1125])});
  plane([.006,.043],[cx,.288,.113],'cream','cabin');plane([.043,.006],[cx,.288,.1132],'cream','cabin');
  box([.061,.118,.009],[cx,.094,.116],'seam','cabin');
  box([.104,.015,.071],[cx,.182,.138],'sage','cabin',[.22,0,0]);
  // Recessed plank door, visible frame, latch, and two broad stone entrance steps.
  plane([.049,.108],[cx,.094,.121],'wood','entrance');
  for(const x of [-.008,.009]) plane([.002,.105],[cx+x,.094,.1213],'seam','entrance');
  add(new THREE.CircleGeometry(.0055,6),'iron','entrance',{matrix:transform([cx+.018,.089,.122])});
  box([.084,.027,.055],[cx,.0135,.166],'stone','entrance');
  box([.106,.012,.044],[cx,.006,.207],'stone','entrance');
  for(let i=0;i<3;i++) {
    const matrix=transform([cx,.182,.138],[.22,0,0]).multiply(transform([-.034+i*.034,.0078,0],[-Math.PI/2,0,0]));
    add(new THREE.PlaneGeometry(.031,.065),i%2?'sage':'roofLight','entrance',{matrix});
  }
  // Lean-to shelters a 3-2-1 stack: bark side faces and actual cream cut end caps.
  box([.132,.018,.253],[.117,.181,0],'sage','logs',[0,0,-.20]);
  for(let i=0;i<3;i++) {
    const matrix=transform([.117,.181,0],[0,0,-.20]).multiply(transform([-.043+i*.043,.0093,0],[-Math.PI/2,0,0]));
    add(new THREE.PlaneGeometry(.039,.244),i%2?'sage':'roofLight','logs',{matrix});
  }
  for(const z of [-.102,.102]) box([.017,.17,.017],[.172,.085,z],'wood','logs');
  for(const[x,y]of[[.066,.021],[.109,.021],[.152,.021],[.0875,.059],[.1305,.059]]) {
    add(profile([[-.09,.021],[.09,.021]],6,Math.PI/6),'wood','logs',
      {matrix:transform([x,y,.004],[Math.PI/2,0,0]),facet:n=>Math.abs(n.z)>.95?'cut':'wood',ao:.96});
  }
  add(profile([[0,.043],[.048,.032],[.057,.033]],6),'wood','stump-axe',
    {matrix:transform([.060,0,.182]),facet:n=>n.y>.5?'cut':n.x<-.2?'seam':'wood',ao:.94});
  rod([[.037,.089,.18],[.118,.127,.18]],.007,'handle','stump-axe');
  add(prism([[-.023,0],[.021,-.004],[.014,.033],[-.013,.041]],.014),'axe','stump-axe',
    {matrix:transform([.045,.058,.18])});
  // Reference yard: three-tier pine, an L-shaped fence, two stones and three tufts.
  const pine=[-.235,0,.137];
  box([.020,.072,.020],[pine[0],.036,pine[2]],'wood','pine');
  for(const[y,r,h]of[[.098,.054,.099],[.156,.044,.093],[.211,.033,.086]]) {
    add(new THREE.ConeGeometry(r,h,5),'sage','pine',{matrix:transform([pine[0],y,pine[2]],[0,.32,0]),facet:n=>n.x<0?'sage':'roofLight'});
  }
  for(const[x,z]of[[-.282,.213],[-.175,.213],[-.282,-.025]]) box([.021,.076,.021],[x,.038,z],'wood','fence');
  box([.107,.020,.014],[-.2285,.048,.213],'wood','fence');
  box([.014,.020,.238],[-.282,.048,.094],'wood','fence');
  for(const[x,z,r]of[[.217,.123,.027],[.022,.237,.024]]) {
    add(new THREE.OctahedronGeometry(r,0),'stone','rocks',{matrix:transform([x,r*.9,z],[0,.3,0],[1,.9,.82]),ao:.94});
  }
  for(const[x,z]of[[-.265,.101],[.132,.179],[-.114,.225]]) for(const sign of [-1,1]) {
    add(new THREE.TetrahedronGeometry(.025,0),'sage','plants',
      {matrix:transform([x+sign*.007,.020,z],[0,sign*.7,sign*.3],[.43,1,.40]),facet:n=>n.y>.2?'roofLight':'sage'});
  }
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
  const {b,add,box,plane,rod}=toolkit(),cx=-.064,cz=.057;
  add(ring(.077,.020,0,.018,6),'ice','hole',{matrix:transform([cx,0,cz]),facet:n=>n.y>.5?'ice':'iceEdge'});
  add(new THREE.CircleGeometry(.057,6),'water','hole',{matrix:transform([cx,.004,cz],[-Math.PI/2,0,0])});
  // Reference proportions: hut roof is two thirds of the derrick height, not one third.
  const top=[cx,.342,cz];
  for(const[dx,dz]of[[-.093,.061],[.093,.061],[0,-.101]]) {
    const foot=[cx+dx,.024,cz+dz];
    rod([foot,top],.014,'mint','tripod');
    box([.042,.023,.039],[foot[0],.0115,foot[2]],'cream','tripod',undefined,.94);
    box([.034,.024,.034],[cx+dx*.48,.189,cz+dz*.48],'iron','tripod');
  }
  box([.056,.029,.053],[cx,.350,cz],'cream','tripod');
  add(profile([[.013,.009],[.337,.009]],4),'auger','auger',{matrix:transform([cx,0,cz])});
  add(screwFlight(16),'auger','auger',{matrix:transform([cx,0,cz],[0,0,0],[.64,.79,.64]),ao:.96});
  add(profile([[.177,.023],[.225,.023]],6),'cream','auger',{matrix:transform([cx,0,cz])});
  // A substantial hut behind the rig, with a readable doorway and roof snow banks.
  const hut=[.063,0,-.101],outline=[[-.098,0],[.098,0]];
  for(let i=0;i<=6;i++){const a=i*Math.PI/6;outline.push([Math.cos(a)*.098,.124+Math.sin(a)*.098]);}
  add(prism(outline,.164),'hut','hut',{matrix:transform(hut),ao:.96});
  add(roofArc(.103,.124,.177,6),'sage','hut',{matrix:transform(hut)});
  for(const[z,depth,start,end]of[[-.044,.057,Math.PI/6,Math.PI*5/6],[.045,.058,Math.PI/3,Math.PI]]) {
    add(roofArc(.105,.124,depth,Math.round((end-start)/(Math.PI/6)),start,end),'snow','roof-snow',
      {matrix:transform([hut[0],0,hut[2]+z])});
  }
  plane([.058,.095],[hut[0],.0475,hut[2]+.0825],'iron','hut');
  plane([.043,.085],[hut[0],.043,hut[2]+.083],'sage','hut');
  plane([.023,.023],[hut[0],.064,hut[2]+.0835],'water','hut');
  add(new THREE.CircleGeometry(.020,8),'iron','hut',{matrix:transform([hut[0],.158,hut[2]+.0825])});
  add(new THREE.CircleGeometry(.014,6),'water','hut',{matrix:transform([hut[0],.158,hut[2]+.083])});
  box([.065,.016,.038],[hut[0],.008,hut[2]+.103],'wood','hut');
  box([.022,.055,.025],[hut[0]+.028,.240,hut[2]-.031],'iron','hut');
  // Keep the tank subordinate to the hut, and put snow on its wooden support.
  const tank=[.187,.026,.123];
  box([.083,.026,.074],[tank[0],.013,tank[2]],'wood','tank');
  add(stripedTank(),'cream','tank',{matrix:transform(tank),facet:(_,i)=>i<12||i>=48&&i<60?'sage':i>=24&&i<36?'terra':'cream'});
  rod([[.023,.119,.090],[.187,.119,.090],[.187,.148,.123]],.009,'iron','tank');
  plane([.041,.017],[tank[0]+.007,.0264,tank[2]+.028],'snow','tank',[-Math.PI/2,0,0]);
  // Two snow-topped supply crates are large enough to read at slot scale.
  for(const[x,z,size]of[[-.160,-.035,.052],[.196,-.072,.049]]) {
    box([size,size,size],[x,size/2,z],'wood','crates',undefined,.94);
    plane([size*.82,.005],[x,size*.72,z+size/2+.0003],'seam','crates');
    plane([.006,size*.83],[x-size*.26,size/2,z+size/2+.0005],'cut','crates');
    add(profile([[0,size*.72],[.008,size*.65]],4,Math.PI/4),'snow','crates',
      {matrix:transform([x,size,z]),ao:1});
  }
  // A tall rear shard and a low front chunk, with broad light/dark ice faces.
  for(const[x,z,r,h]of[[-.223,-.067,.036,.113],[-.119,.182,.034,.043]]) {
    add(profile([[0,r],[h,r*.37]],4,Math.PI/4),'ice','ice-chunks',
      {matrix:transform([x,0,z],[0,.18,0]),facet:n=>n.y>.3?'ice':'iceEdge'});
  }
  return b.finish();
}

export function buildHillsideMine() {
  const {b,add,box,plane,rod}=toolkit();
  // A broad rear outcrop, with smaller shoulders framing a dark tunnel face.
  for(const[x,z,r,s]of[[0,-.090,.235,[.89,1,.65]],[-.133,-.007,.121,[.62,1,.73]],[.138,-.017,.140,[.65,1,.8]]]) {
    add(new THREE.IcosahedronGeometry(r,0),'block','outcrop',
      {matrix:transform([x,r*.85065081,z],[0,.24,0],s),facet:n=>x!==0&&n.y>.55?'grassCap':n.y>.25?'block':'rockDark',ao:.95});
  }
  box([.143,.224,.017],[0,.119,.095],'tunnel','portal');
  for(const x of [-.084,.084]) {
    box([.034,.245,.045],[x,.1225,.117],'wood','portal');
    box([.046,.036,.054],[x,.225,.117],'iron','portal');
    box([.050,.031,.053],[x,.0155,.117],'stone','portal');
  }
  box([.220,.041,.052],[0,.246,.117],'wood','portal');
  for(const sign of [-1,1])rod([[sign*.068,.204,.12],[sign*.03,.23,.12]],.009,'wood','portal');
  // The lantern is the sole emissive object in this Forest building batch.
  box([.023,.222,.023],[-.188,.111,.148],'wood','lantern');
  box([.095,.018,.020],[-.151,.222,.148],'wood','lantern');
  rod([[-.132,.219,.148],[-.132,.186,.148]],.004,'iron','lantern',3);
  for(const y of [.143,.184])box([.039,.009,.034],[-.132,y,.148],'iron','lantern');
  add(new THREE.BoxGeometry(.025,.033,.024),'amber','lantern',{matrix:transform([-.132,.164,.148]),emission:1});
  // Stub rails, three wooden sleepers, loaded timber wagon with iron corner straps.
  for(const z of [.106,.165,.226])box([.124,.009,.022],[0,.0045,z],'wood','cart');
  for(const x of [-.042,.042])box([.009,.013,.172],[x,.013,.166],'iron','cart');
  box([.101,.049,.078],[0,.063,.164],'wood','cart');
  plane([.086,.064],[0,.0877,.164],'tunnel','cart',[-Math.PI/2,0,0]);
  for(const x of [-.049,.049])box([.008,.055,.084],[x,.065,.164],'iron','cart');
  for(const x of [-.055,.055])for(const z of [.14,.19])
    add(profile([[-.006,.019],[.006,.019]],6),'iron','cart',{matrix:transform([x,.029,z],[0,0,Math.PI/2])});
  for(const[x,z,r]of[[-.023,.157,.029],[.021,.173,.031],[.004,.14,.023]])
    add(new THREE.OctahedronGeometry(r),'block','cart',{matrix:transform([x,.096,z]),facet:n=>n.y>.2?'block':'rockDark'});
  for(const[x,z,r]of[[-.169,.181,.033],[.149,.176,.04]])
    add(new THREE.OctahedronGeometry(r),'block','loose-rocks',{matrix:transform([x,r*.68,z],[0,.3,0],[1,.68,.8]),facet:n=>n.y>.2?'block':'rockDark'});
  return b.finish();
}

export function buildSawmill() {
  const {b,add,box,plane,rod}=toolkit();
  for(const x of [-.105,.105])for(const z of [-.091,.091]) {
    box([.042,.036,.042],[x,.018,z],'stone','shed');
    box([.023,.252,.023],[x,.162,z],'wood','shed');
    // Flat iron straps remain visible without spending geometry on hidden bracket backs.
    plane([.028,.033],[x,.276,z+(z>0?.012:-.012)],'iron','shed',[0,z>0?0:Math.PI,0]);
  }
  for(const z of [-.091,.091])box([.252,.025,.028],[0,.282,z],'wood','shed');
  for(const sign of [-1,1]) {
    add(prism([[0,.386],[sign*.150,.266],[sign*.150,.278],[0,.398]],.258),'sage','roof',
      {facet:n=>n.y>.3&&sign===1?'roofLight':'sage'});
    for(let i=0;i<3;i++) {
      const z0=-.126+i*.085,z1=z0+.079;
      const pts=[0,.3984,z0,sign*.149,.2792,z0,sign*.149,.2792,z1,0,.3984,z1];
      add(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(pts,3))
        .setIndex(sign>0?[0,2,1,0,3,2]:[0,1,2,0,2,3]),i%2?'sage':'roofLight','roof');
    }
  }
  for(const z of [-.104,.104])box([.028,.025,.031],[0,.397,z],'wood','roof');
  // One thick rim, three diametric spokes and six paddles make a clear water wheel.
  const wheel=[-.174,.129,-.015];
  add(ring(.098,.017,-.014,.014,6),'wheel','waterwheel',{matrix:transform(wheel,[0,0,Math.PI/2])});
  for(let i=0;i<3;i++) {
    const a=i*Math.PI/3,dy=Math.sin(a)*.086,dz=Math.cos(a)*.086;
    rod([[wheel[0],wheel[1]-dy,wheel[2]-dz],[wheel[0],wheel[1]+dy,wheel[2]+dz]],.008,'wheel','waterwheel');
  }
  for(let i=0;i<6;i++) {
    const a=i*Math.PI/3;
    box([.047,.023,.021],[wheel[0],wheel[1]+Math.cos(a)*.091,wheel[2]+Math.sin(a)*.091],'wood','waterwheel',[a,0,0]);
  }
  // Cyan flow is ordinary vertex color, never a glow flag or transparent material.
  box([.041,.125,.045],[-.193,.177,-.107],'stone','chute');
  box([.029,.009,.069],[-.193,.244,-.081],'flow','chute');
  box([.030,.083,.006],[-.193,.207,-.047],'flow','chute');
  add(sawPlate(.071,.008,10),'blade','saw',{matrix:transform([.025,.125,.030])});
  add(new THREE.CircleGeometry(.015,6),'iron','saw',{matrix:transform([.025,.125,.0343])});
  for(const x of [-.056,.039])box([.010,.011,.242],[x,.012,.062],'iron','carriage');
  box([.105,.022,.109],[-.012,.034,.086],'wood','carriage');
  add(profile([[-.084,.031],[.084,.031]],6),'wood','log',
    {matrix:transform([-.038,.078,.091],[Math.PI/2,0,0]),facet:n=>Math.abs(n.z)>.95?'cut':'wood'});
  add(new THREE.RingGeometry(.020,.022,6),'wood','log',{matrix:transform([-.038,.078,.176])});
  for(const z of [-.06,.084])box([.080,.015,.021],[.183,.0075,z],'wood','planks');
  for(let i=0;i<3;i++)box([.064,.014,.175],[.182+(i%2)*.009,.023+i*.017,.012],'plank','planks');
  return b.finish();
}

export function buildGatherersHut() {
  const {b,add,box,plane,rod}=toolkit(),cx=.027,cz=-.034;
  add(profile([[0,.130],[.029,.13]],10),'stone','hut',{matrix:transform([cx,0,cz]),ao:.92});
  add(profile([[.029,.115],[.204,.115]],10),'wood','hut',{matrix:transform([cx,0,cz]),facet:(_,i)=>i<20&&Math.floor(i/2)%3===0?'seam':'wood'});
  for(const[y,r,top]of[[.184,.155,.319],[.260,.095,.356]])
    add(profile([[y,r],[y+.012,r],[top,.026]],8),'straw','thatch',
      {matrix:transform([cx,0,cz]),facet:(_,i)=>i<16?'strawBand':Math.floor(i/2)%3===0?'strawBand':'straw'});
  for(let i=0;i<5;i++) {
    const a=i*Math.PI*2/5;
    rod([[cx+Math.cos(a)*.011,.326,cz+Math.sin(a)*.011],[cx+Math.cos(a)*.032,.408+(i%2)*.012,cz+Math.sin(a)*.032]],.008,'wood','apex',3);
  }
  add(ring(.029,.007,.357,.371,6),'tie','apex',{matrix:transform([cx,0,cz])});
  plane([.069,.124],[cx,.086,cz+.116],'tunnel','entrance');
  for(const x of [-.044,.044])box([.018,.154,.023],[cx+x,.077,cz+.118],'wood','entrance');
  box([.099,.016,.058],[cx,.172,cz+.135],'sage','entrance',[.18,0,0]);
  box([.09,.024,.046],[cx,.012,cz+.149],'stone','entrance');
  box([.105,.012,.039],[cx,.006,cz+.187],'stone','entrance');
  // Drying rack: two A-frames, one crossbar, two herbs and a short cream berry string.
  for(const z of [-.096,.032])for(const side of [-1,1])
    rod([[-.168+side*.022,0,z],[-.168,.181,z]],.008,'wood','rack');
  rod([[-.168,.184,-.117],[-.168,.184,.052]],.009,'wood','rack');
  for(const z of [-.072,.014]) {
    rod([[-.168,.184,z],[-.168,.155,z]],.003,'tie','herbs',3);
    for(const[y,r]of[[.129,.024],[.099,.018]])add(new THREE.ConeGeometry(r,.060,5),'herb','herbs',
      {matrix:transform([-.168,y,z],[Math.PI,0,0])});
  }
  for(const y of [.147,.128,.109])add(new THREE.OctahedronGeometry(.011),'cream','herbs',{matrix:transform([-.168,y,-.029])});
  // Broad basket bands suggest weaving; berries and mushrooms break its top silhouette.
  add(profile([[0,.042],[.04,.050],[.055,.054]],6),'basket','basket',{matrix:transform([-.117,0,.149]),facet:(_,i)=>i>=16&&i<32?'cut':'basket'});
  for(const[x,z]of[[-.138,.145],[-.109,.167],[-.115,.136]])
    add(new THREE.OctahedronGeometry(.015),'berry','basket',{matrix:transform([x,.060,z])});
  const mushroom=(x,y,z,r,color,category)=>{
    add(profile([[0,r*.23],[r*.8,r*.23]],4),'cream',category,{matrix:transform([x,y,z])});
    add(new THREE.ConeGeometry(r,r*.7,5),'cream',category,{matrix:transform([x,y+r*1.1,z]),facet:n=>n.y>0?color:'cream'});
  };
  mushroom(-.092,.05,.145,.015,'cream','basket');mushroom(-.14,.05,.17,.013,'cream','basket');
  mushroom(.143,0,.117,.027,'terra','mushrooms');mushroom(.118,0,.154,.020,'terra','mushrooms');
  return b.finish();
}

export function buildFarm() {
  const {b,add,box,plane,rod}=toolkit(),cx=-.048,cz=-.075;
  const outline=[[-.105,.025],[.105,.025],[.105,.278],[.084,.333],[0,.395],[-.084,.333],[-.105,.278]];
  add(prism(outline,.193),'wood','barn',{matrix:transform([cx,0,cz]),ao:.96});
  for(const x of [-.095,.095])for(const z of [-.087,.087])box([.035,.038,.035],[cx+x,.019,cz+z],'stone','barn');
  for(const y of [.073,.115,.157,.199]) {
    plane([.210,.003],[cx,y,cz+.097],'seam','barn');
    plane([.193,.003],[cx+.1053,y,cz],'seam','barn',[0,Math.PI/2,0]);
    plane([.210,.003],[cx,y,cz-.097],'seam','barn',[0,Math.PI,0]);
    plane([.193,.003],[cx-.1053,y,cz],'seam','barn',[0,-Math.PI/2,0]);
  }
  // Four separate roof slopes give the barn its characteristic gambrel silhouette.
  const roof=[[-.125,.225],[-.084,.333],[0,.395],[.084,.333],[.125,.225]];
  for(let i=0;i<4;i++) {
    const[a,c]=[roof[i],roof[i+1]];
    add(prism([a,c,[c[0],c[1]+.012],[a[0],a[1]+.012]],.235),i%2?'roofLight':'sage','roof',{matrix:transform([cx,0,cz])});
    for(const z of [-.12,.12])rod([[cx+a[0],a[1]+.008,cz+z],[cx+c[0],c[1]+.008,cz+z]],.009,'cream','roof');
  }
  for(const z of [-.092,.092])box([.026,.024,.031],[cx,.412,cz+z],'wood','roof');
  plane([.082,.13],[cx,.092,cz+.098],'seam','door');
  for(const x of [-.044,.044])plane([.009,.14],[cx+x,.096,cz+.099],'cream','door');
  plane([.096,.009],[cx,.166,cz+.099],'cream','door');
  rod([[cx-.037,.032,cz+.100],[cx+.037,.154,cz+.100]],.0045,'cream','door');
  // The crossing braces are cream timber on the recessed plank door.
  rod([[cx+.037,.032,cz+.101],[cx-.037,.154,cz+.101]],.0045,'cream','door');
  plane([.047,.052],[cx,.28,cz+.097],'cream','window');plane([.034,.039],[cx,.28,cz+.098],'tunnel','window');
  box([.117,.015,.194],[.12,.182,cz],'sage','hay-shelter',[0,0,-.18]);
  for(const z of [-.151,.003])box([.015,.173,.015],[.165,.0865,z],'wood','hay-shelter');
  for(const[x,y,z]of[[.096,.025,-.118],[.139,.025,-.063],[.095,.074,-.11]])
    box([.043,.048,.047],[x,y,z],'hay','hay-shelter',undefined,.94);
  // Three small tilled strips, not a ground plate: one wheat row and two sprout rows.
  for(const x of [-.130,-.034,.043])box([.036,.009,.126],[x,.0045,.126],'soil','crops');
  for(const z of [.078,.123,.168]) {
    rod([[-.13,.01,z],[-.13,.06,z]],.003,'wheat','crops',3);
    add(new THREE.OctahedronGeometry(.022),'wheat','crops',{matrix:transform([-.13,.060,z],[0,0,0],[.62,1.5,.46])});
    for(const x of [-.034,.043])for(const sign of [-1,1])
      add(new THREE.TetrahedronGeometry(.026),'herb','crops',{matrix:transform([x+sign*.007,.021,z],[0,0,sign*.5],[.48,1,.40])});
  }
  box([.013,.148,.013],[.142,.074,.137],'wood','scarecrow');
  box([.043,.061,.024],[.142,.112,.137],'shirt','scarecrow');
  box([.092,.018,.021],[.142,.13,.137],'shirt','scarecrow');
  add(new THREE.OctahedronGeometry(.02),'hay','scarecrow',{matrix:transform([.142,.159,.137])});
  add(profile([[.177,.033],[.183,.033],[.2,.018]],6),'hay','scarecrow',{matrix:transform([.142,0,.137])});
  return b.finish();
}

export const BUILDERS={lumber_camp:buildLumberCamp,quarry:buildQuarry,ice_drill:buildIceDrill,hillside_mine:buildHillsideMine,sawmill:buildSawmill,gatherers_hut:buildGatherersHut,farm:buildFarm};
export function writeBuildings(names=Object.keys(BUILDERS)) {
  const out=new URL('./out/',import.meta.url);mkdirSync(out,{recursive:true});const reports={};
  for(const name of names) {
    const build=BUILDERS[name];if(!build)throw new Error(`Unknown building: ${name}`);
    const{geometry,regions,groups,authoredScale}=build(),binary=writeGLB(geometry,name),p=geometry.getAttribute('position');let radius=0;
    for(let i=0;i<p.count;i++) radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));
    const report={name,triangles:geometry.index.count/3,vertices:p.count,bounds:{min:geometry.boundingBox.min.toArray(),max:geometry.boundingBox.max.toArray()},
      radius,authoredScale,groups,regions:Object.fromEntries(Object.entries(regions).map(([key,triangles])=>[key,{hex:PALETTE[key],triangles}])),
      bytes:binary.length,materials:1,textures:0,front:'+Z',format:'GLB 2.0; Y-up; bottom center; linear COLOR_0 RGB + AO alpha; float _EMIT'};
    if(report.triangles>600||radius>.28||report.bounds.max[1]>.5)throw new Error(`${name}: exceeds building limits (${report.triangles} triangles)`);
    writeFileSync(new URL(`${name}.glb`,out),binary);writeFileSync(new URL(`${name}.report.json`,out),JSON.stringify(report,null,2)+'\n');
    reports[name]=report;geometry.dispose();
  }
  console.log(JSON.stringify(reports,null,2));return reports;
}
if(process.argv[1]===fileURLToPath(import.meta.url)) writeBuildings(process.argv.length>2?process.argv.slice(2):undefined);
