import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { BUILDING_MODELS } from './buildingModels';
import { Buildings, Cores } from './buildings';
import { Decorations } from './decorations';
import { Instances, disposeGroup } from './instances';
import { createIllustratedMaterial, createInkMaterial, illustratedEnabled, installIllustratedStyle, materialHasTexture, prepareIllustratedGeometry } from './materials';
import { makeTestState } from '../core/testing';

function expand(shader: string): string {
  return shader.replace(/#include <(\w+)>/g, (_, name: keyof typeof THREE.ShaderChunk) => {
    expect(THREE.ShaderChunk[name]).toBeDefined(); return expand(THREE.ShaderChunk[name]);
  });
}
describe('illustrated vertex-only board material', () => {
  it('activates only for the explicit style flag; defaults stay standard', () => {
    for (const search of ['', '?style=other', '?illustrated=1']) expect(illustratedEnabled(search)).toBe(false);
    expect(illustratedEnabled('?seed=7&style=illustrated')).toBe(true);
    const group = new THREE.Group(), batch = new Instances(group, new THREE.BoxGeometry(), 0xffffff, 1);
    expect(batch.mesh.material).toBeInstanceOf(THREE.MeshStandardMaterial); expect(batch.outline).toBeNull(); disposeGroup(group);
  });
  it('has no samplers or texture maps and all shader chunks resolve', () => {
    for (const material of [createIllustratedMaterial(), createInkMaterial()]) {
      expect(materialHasTexture(material)).toBe(false);
      expect(expand(material.vertexShader)).not.toMatch(/sampler|texture2D|#include/);
      expect(expand(material.fragmentShader)).not.toMatch(/sampler|texture2D|#include/);
      material.dispose();
    }
  });
  it('preserves vertex RGB, derives AO from alpha, and keeps emission separate from opacity', () => {
    const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, 1,0,0, 0,1,0], 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute([.2,.3,.4,.25, .6,.7,.8,.9, 1,1,1,1], 4));
    geometry.setAttribute('_EMIT', new THREE.Float32BufferAttribute([0,1,0], 1));
    prepareIllustratedGeometry(geometry);
    expect(geometry.getAttribute('color').itemSize).toBe(3); expect(geometry.getAttribute('color').getX(0)).toBeCloseTo(.2);
    expect(geometry.getAttribute('_AO').getX(0)).toBe(.25); expect(geometry.getAttribute('_EMIT').getX(1)).toBe(1);
    geometry.dispose();
  });
  it('shares the fill across every procedural building/core/decoration and every loaded material is texture-free', () => {
    const group = new THREE.Group(), style = installIllustratedStyle(group), state = makeTestState({ cols: 24, rows: 1, hex: () => ({ biome: 'forest' }) });
    const buildings = new Buildings(group, 24), decorations = new Decorations(group, 24), cores = new Cores(group, 24);
    Object.keys(BUILDING_MODELS).forEach((id, i) => { state.hexes[i].slots[0].building = id; buildings.refresh(state.hexes[i], i * 2, 0); decorations.refresh(state.hexes[i], i * 2, 0); });
    cores.set([0], state.hexes, new Map([[0, { x: 0, z: 0 }]]));
    group.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) expect(materialHasTexture(material)).toBe(false);
      if (!object.userData.inkHull && !(object.material as THREE.Material).transparent) expect(object.material).toBe(style.fill);
    });
    expect(group.children.filter(o => o.name.startsWith('building:'))).toHaveLength(24); disposeGroup(group);
  });
  it('outline shares the matrix buffer and matches packing/removal count without a second animation loop', () => {
    const group = new THREE.Group(); installIllustratedStyle(group);
    const batch = new Instances(group, new THREE.BoxGeometry(), 0xffffff, 3);
    batch.set(0, 2, 3, 4); batch.setCount(1);
    expect(batch.outline!.instanceMatrix).toBe(batch.mesh.instanceMatrix); expect(batch.outline!.count).toBe(1);
    batch.setCount(0); expect(batch.outline!.count).toBe(0); expect(batch.outline!.castShadow).toBe(false);
    const fill = viSpyDispose(batch.mesh.material as THREE.Material); disposeGroup(group); expect(fill()).toBe(1);
  });
});
function viSpyDispose(material: THREE.Material): () => number {
  let calls = 0; material.addEventListener('dispose', () => calls++); return () => calls;
}
