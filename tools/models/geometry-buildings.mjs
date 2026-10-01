import * as THREE from 'three';
import { ModelBuilder } from './geometry.mjs';

export const PALETTE = {
  wood:'#8B5A3C', seam:'#6E4630', stone:'#9A9590', sage:'#5F7D6B', roofLight:'#6F8F7A',
  cream:'#E8DCC4', cut:'#E2C9A0', axe:'#6B6B6B', handle:'#9B4A32', sandstone:'#D2C4A8',
  iron:'#4E5352', rope:'#C9A46A', block:'#B8B2A7', terra:'#D9826B', mint:'#8DB89F',
  rockDark:'#8F8A82', grassCap:'#6E8F4E', tunnel:'#2E2A25', amber:'#F5C26B',
  blade:'#C8C8C8', wheel:'#7A4E33', flow:'#7FD3D0', plank:'#EAD9B5',
  straw:'#E3CF9A', strawBand:'#CBB57E', tie:'#D9C7A0', herb:'#5F8A5A', basket:'#A06A3E', berry:'#C0443A',
  hay:'#D9B65A', wheat:'#D9B04A', soil:'#6B4A33', shirt:'#C8664E',
  auger:'#3E4446', water:'#2F5E6A', ice:'#CFE2EE', iceEdge:'#A9C8DD', hut:'#EDE4D0', snow:'#F2F5F7',
};

export class BuildingBuilder extends ModelBuilder {
  add(geometry, region, {matrix=new THREE.Matrix4(),ao=1,category='structure',facet,emission=0}={}) {
    const g=geometry.index?geometry.toNonIndexed():geometry.clone();
    g.applyMatrix4(matrix);g.computeVertexNormals();
    const p=g.getAttribute('position'),n=g.getAttribute('normal');
    for(let i=0;i<p.count;i+=3) {
      const name=facet?.(new THREE.Vector3(n.getX(i),n.getY(i),n.getZ(i)),i/3)??region;
      if(!PALETTE[name]) throw new Error(`Unknown building palette color: ${name}`);
      const c=new THREE.Color(PALETTE[name]);
      this.regions[name]=(this.regions[name]??0)+1;this.groups[category]=(this.groups[category]??0)+1;
      for(let j=i;j<i+3;j++) {
        this.positions.push(p.getX(j),p.getY(j),p.getZ(j));this.normals.push(n.getX(j),n.getY(j),n.getZ(j));
        this.colors.push(c.r,c.g,c.b,ao);this.emit.push(emission);
      }
    }
    g.dispose();geometry.dispose();
  }
  finish() {
    const geometry=this.geometry(),box=geometry.boundingBox,center=box.getCenter(new THREE.Vector3());
    geometry.translate(-center.x,-box.min.y,-center.z);
    const p=geometry.getAttribute('position');let radius=0;
    for(let i=0;i<p.count;i++) radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));
    const scale=Math.min(1,.27/radius,.48/(box.max.y-box.min.y));
    geometry.scale(scale,scale,scale);geometry.computeBoundingBox();geometry.computeBoundingSphere();
    return {geometry,regions:this.regions,groups:this.groups,authoredScale:scale};
  }
}

const geometry=(positions,indices)=>new THREE.BufferGeometry()
  .setAttribute('position',new THREE.Float32BufferAttribute(positions,3)).setIndex(indices);

/** Closed convex XY polygon extruded along Z, with outward winding. */
export function prism(outline,depth) {
  let area=0;
  for(let i=0;i<outline.length;i++){const a=outline[i],b=outline[(i+1)%outline.length];area+=a[0]*b[1]-b[0]*a[1];}
  const points=area>0?outline:[...outline].reverse(),n=points.length,pts=[],ids=[];
  for(const z of [-depth/2,depth/2]) for(const[x,y]of points) pts.push(x,y,z);
  for(let i=1;i<n-1;i++) ids.push(0,i+1,i,n,n+i,n+i+1);
  for(let i=0;i<n;i++){const j=(i+1)%n;ids.push(i,j,i+n,j,j+n,i+n);}
  return geometry(pts,ids);
}

/** Curved, faceted quonset outer roof; open underside rests on the hut body. */
export function roofArc(radius,wallHeight,depth,segments=4,start=0,end=Math.PI) {
  const pts=[],ids=[];
  for(let i=0;i<=segments;i++) {
    const a=start+(end-start)*i/segments;
    for(const z of [-depth/2,depth/2]) pts.push(Math.cos(a)*radius,wallHeight+Math.sin(a)*radius,z);
  }
  for(let i=0;i<segments;i++){const a=2*i;ids.push(a,a+2,a+1,a+1,a+2,a+3);}
  return geometry(pts,ids);
}

/** Closed thick triangular flight wrapped twice around the drill shaft. */
export function screwFlight(segments=24) {
  const pts=[],ids=[];
  for(let i=0;i<=segments;i++) {
    const a=i/segments*Math.PI*4,y=.032+i/segments*.17;
    for(const[r,dy]of[[.011,-.007],[.039,0],[.011,.007]]) pts.push(Math.cos(a)*r,y+dy,Math.sin(a)*r);
  }
  for(let i=0;i<segments;i++) for(let j=0;j<3;j++) {
    const a=i*3+j,b=i*3+(j+1)%3,c=b+3,d=a+3;ids.push(a,b,d,b,c,d);
  }
  ids.push(0,2,1,segments*3,segments*3+1,segments*3+2);
  return geometry(pts,ids);
}

/** Six-sided tank: diagonal stripe boundaries are mesh edges, not texture/overlay. */
export function stripedTank() {
  const pts=[],ids=[],sides=6;
  for(let row=0;row<6;row++) for(let i=0;i<sides;i++) {
    const a=i/sides*Math.PI*2,slant=.020*Math.sin(a);
    const y=[0,.018,.043+slant,.067+slant,.104,.12][row];
    pts.push(Math.sin(a)*.038,y,Math.cos(a)*.038);
  }
  for(let row=0;row<5;row++) for(let i=0;i<sides;i++) {
    const a=row*sides+i,b=row*sides+(i+1)%sides;ids.push(a,b,a+sides,b,b+sides,a+sides);
  }
  for(let i=1;i<sides-1;i++) ids.push(0,i+1,i,30,30+i,30+i+1);
  return geometry(pts,ids);
}

/** Star-shaped saw plate. A center fan keeps each tooth triangulated inside the outline. */
export function sawPlate(radius,depth,teeth=10) {
  const pts=[],ids=[],n=teeth*2;
  for(const z of [-depth/2,depth/2]) {
    pts.push(0,0,z);
    for(let i=0;i<n;i++) {
      const a=i/n*Math.PI*2,r=radius*(i%2?.86:1);
      pts.push(Math.cos(a)*r,Math.sin(a)*r,z);
    }
  }
  for(let i=0;i<n;i++) {
    const a=1+i,b=1+(i+1)%n,c=a+n+1,d=b+n+1;
    ids.push(0,b,a,n+1,c,d,a,b,c,b,d,c);
  }
  return geometry(pts,ids);
}
