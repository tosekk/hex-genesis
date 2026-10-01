import * as THREE from 'three';
import { readFileSync, writeFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CORE_LIMITS, ModelAssets, inspectGLB } from '../../src/render/modelAssets';
// @ts-expect-error Offline JS modelling tool has no production type declaration.
import { buildCoreDesert } from './build-core-desert.mjs';
// @ts-expect-error Offline JS modelling tool has no production type declaration.
import { writeGLB } from './glb-writer.mjs';
// @ts-expect-error Offline JS modelling helpers.
import { amberCrystal, mirrorPanel, stairWall } from './geometry-desert.mjs';
// @ts-expect-error Offline JS modelling palette.
import { DESERT_PALETTE } from './geometry-desert.mjs';

describe('post-submission Desert core', () => {
  it('ships the byte-identical validated desert artifact', () => {
    expect(readFileSync('src/assets/models/core_desert.glb'))
      .toEqual(readFileSync('tools/models/out/core_desert.glb'));
  });
  it('keeps closed primitive winding outward (crystal, beveled mirrors and sloping parapets)', () => {
    const primitives = [amberCrystal(), mirrorPanel(), stairWall()];
    for (const g of primitives) {
      const edges = new Map<string, number[]>(), p = g.getAttribute('position');
      let volume = 0;
      for(let i=0;i<g.index.count;i+=3) {
        const ids = [0,1,2].map(j=>g.index.getX(i+j));
        const [a,b,c]=ids.map(id=>new THREE.Vector3().fromBufferAttribute(p,id)); volume+=a.dot(b.cross(c))/6;
        for(let j=0;j<3;j++) {
          const a=ids[j], b=ids[(j+1)%3], key=[a,b].sort((x,y)=>x-y).join(':');
          const directions=edges.get(key)??[];directions.push(a<b?1:-1);edges.set(key,directions);
        }
      }
      for(const directions of edges.values()){expect(directions).toHaveLength(2);expect(directions[0]+directions[1]).toBe(0);}
      expect(volume).toBeGreaterThan(0);
      g.dispose();
    }
  });
  it('is reproducible, within authored limits, and contains only vertex colors and static geometry', () => {
    const { geometry } = buildCoreDesert();
    const bytes = readFileSync('tools/models/out/core_desert.glb');
    expect(Buffer.from(writeGLB(geometry, 'core_desert'))).toEqual(bytes);
    const doc = JSON.parse(bytes.subarray(20, 20 + bytes.readUInt32LE(12)).toString());
    expect(doc.materials).toHaveLength(1); expect(doc.meshes).toHaveLength(1);
    expect(doc.materials[0].pbrMetallicRoughness.baseColorFactor).toEqual([1,1,1,1]);
    for (const key of ['textures','images','animations','skins','cameras','extensionsRequired']) expect(doc[key]).toBeUndefined();
    expect(doc.buffers[0].uri).toBeUndefined();
    expect(doc.accessors[3]).toMatchObject({componentType:5126,type:'SCALAR'});
    expect(doc.meshes[0].primitives[0].attributes).toEqual({POSITION:0,NORMAL:1,COLOR_0:2,_EMIT:3});
    const p = geometry.getAttribute('position'), n = geometry.getAttribute('normal'), c = geometry.getAttribute('color'), e = geometry.getAttribute('_EMIT');
    expect(geometry.index.count/3).toBeLessThanOrEqual(1500);
    expect(c.itemSize).toBe(4);
    let glowing = 0, shaded = 0;
    const a=new THREE.Vector3(), b=new THREE.Vector3(), d=new THREE.Vector3();
    for (let i=0;i<p.count;i++) {
      expect(Math.hypot(p.getX(i),p.getZ(i))).toBeLessThanOrEqual(.8);
      expect(p.getY(i)).toBeGreaterThanOrEqual(-1e-7); expect(p.getY(i)).toBeLessThanOrEqual(1.2);
      expect(c.getW(i)).toBeGreaterThan(0); expect(c.getW(i)).toBeLessThanOrEqual(1);
      expect([0,1]).toContain(e.getX(i)); e.getX(i) ? glowing++ : shaded++;
      if (i%3===0) {
        a.fromBufferAttribute(p,i); b.fromBufferAttribute(p,i+1);d.fromBufferAttribute(p,i+2);
        expect(b.sub(a).cross(d.sub(a)).length()).toBeGreaterThan(1e-10);
        for (let v=1;v<3;v++) for (let axis=0;axis<3;axis++) {
          expect(n.getComponent(i,axis)).toBeCloseTo(n.getComponent(i+v,axis));
          expect(c.getComponent(i,axis)).toBe(c.getComponent(i+v,axis));
        }
      }
    }
    expect(glowing).toBeGreaterThan(0); expect(shaded).toBeGreaterThan(glowing);
    geometry.computeBoundingBox();
    expect(geometry.boundingBox.min.y).toBeCloseTo(0);
    expect(geometry.boundingBox.min.x + geometry.boundingBox.max.x).toBeCloseTo(0);
    expect(geometry.boundingBox.min.z + geometry.boundingBox.max.z).toBeCloseTo(0);
    geometry.dispose();
  });
  it('keeps the specified palette, AO and glow semantics on every facet', () => {
    const { geometry, groups } = buildCoreDesert();
    const colors = geometry.getAttribute('color'), emit = geometry.getAttribute('_EMIT');
    const palette = Object.entries(DESERT_PALETTE).map(([name, hex]) => ({name, color:new THREE.Color(hex as string)}));
    const seen = new Set<string>();
    for (let i=0;i<colors.count;i++) {
      const entry = palette.find(({color}) => Math.abs(colors.getX(i)-color.r)<1e-6 &&
        Math.abs(colors.getY(i)-color.g)<1e-6 && Math.abs(colors.getZ(i)-color.b)<1e-6);
      expect(entry).toBeDefined(); seen.add(entry!.name);
      const glowing = ['amber','light','pool'].includes(entry!.name);
      expect(emit.getX(i)).toBe(glowing ? 1 : 0);
      if (glowing) expect(colors.getW(i)).toBe(1);
    }
    expect([...seen].sort()).toEqual(Object.keys(DESERT_PALETTE).sort());
    expect(groups['panels-arms']).toBe(8*(26+12+12+8));
    geometry.dispose();
  });
  it('passes Sol’s actual GLB preflight, GLTFLoader, normalization, and ModelAssets without fallback', async () => {
    const bytes=readFileSync('tools/models/out/core_desert.glb');
    const buffer=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength) as ArrayBuffer;
    expect(()=>inspectGLB(buffer)).not.toThrow();
    const assets=new ModelAssets({'/tools/models/out/core_desert.glb':'offline-fixture'},async()=>buffer);
    await assets.ready;
    try {
      expect([...assets.failures]).toEqual([]);
      const model=assets.get('core_desert'); expect(model).toBeDefined();
      expect(model!.parts).toHaveLength(1); expect(model!.triangles).toBeLessThanOrEqual(CORE_LIMITS.triangles);
      const box=new THREE.Box3(); let radius=0, glowing=0, minAO=1;
      for(const part of model!.parts) {
        part.computeBoundingBox();box.union(part.boundingBox!);
        const p=part.getAttribute('position'),e=part.getAttribute('_EMIT'),ao=part.getAttribute('_AO');
        for(let i=0;i<p.count;i++){radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));glowing+=e.getX(i)>0?1:0;minAO=Math.min(minAO,ao.getX(i));}
        expect(part.getAttribute('color').itemSize).toBe(3); expect(part.getAttribute('uv')).toBeUndefined();
      }
      expect(radius).toBeLessThanOrEqual(.8+1e-6); expect(box.max.y).toBeLessThanOrEqual(1.2+1e-6);expect(box.min.y).toBeCloseTo(0);
      expect(glowing).toBeGreaterThan(0);expect(minAO).toBeLessThan(1);
      const report={accepted:true,fallbackReasons:[...assets.failures],triangles:model!.triangles,parts:model!.parts.length,
        normalizedBounds:{min:box.min.toArray(),max:box.max.toArray()},normalizedRadius:radius,glowingVertices:glowing,minAO};
      console.log('Real loader validation:',report);
      writeFileSync('tools/models/out/core_desert.validation.json',JSON.stringify(report,null,2)+'\n');
    } finally { assets.dispose(); }
  });
});
