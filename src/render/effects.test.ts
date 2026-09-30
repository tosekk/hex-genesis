import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { makeTestState } from '../core/testing';
import { BoardEffects } from './effects';
import { disposeGroup } from './instances';

const mesh = (group: THREE.Group, name: string) => group.getObjectByName(`effect:${name}`) as THREE.InstancedMesh;
const alpha = (group: THREE.Group, name: string, id: number) => mesh(group, name).geometry.getAttribute('instanceOpacity').getX(id);
describe('presentation event flourishes', () => {
  it('pulses only newly added cores, does not restart on repeats, expires and leaves state untouched', () => {
    const state = makeTestState({ cols: 2, rows: 1 }), before = structuredClone(state), group = new THREE.Group();
    const effects = new BoardEffects(group, state); effects.setCores([0], state); effects.update(0);
    expect(mesh(group, 'core-beam').count).toBe(1); expect(alpha(group, 'core-ring', 0)).toBeCloseTo(0.8);
    effects.update(350); const half = alpha(group, 'core-ring', 0);
    effects.setCores([0], state); effects.update(0); expect(alpha(group, 'core-ring', 0)).toBe(half);
    effects.setCores([0, 1], state); effects.update(350);
    expect(alpha(group, 'core-ring', 0)).toBe(0); expect(alpha(group, 'core-ring', 1)).toBeGreaterThan(0);
    effects.update(350); expect(mesh(group, 'core-beam').count).toBe(0); expect(mesh(group, 'core-ring').count).toBe(0);
    expect(state).toEqual(before); disposeGroup(group);
  });
  it('flourishes only on first ever-completion and never repeats for replacement/demolition refreshes', () => {
    const state = makeTestState({ cols: 1, rows: 1 }), group = new THREE.Group(), effects = new BoardEffects(group, state);
    effects.refresh(state.hexes[0]); effects.update(0); expect(mesh(group, 'completion').count).toBe(0);
    const completed = { ...state.hexes[0], everCompleted: true };
    effects.refresh(completed); effects.update(425); expect(alpha(group, 'completion', 0)).toBeCloseTo(0.45);
    effects.refresh(completed); effects.update(425); expect(mesh(group, 'completion').count).toBe(0);
    effects.refresh(completed); effects.update(0); expect(mesh(group, 'completion').count).toBe(0);
    expect(state.hexes[0].everCompleted).toBe(false); disposeGroup(group);
  });
  it('treats rebuilt boards as a baseline and keeps reduced-motion effect transforms still', () => {
    const state = makeTestState({ cols: 2, rows: 1 }); state.cores = [0]; state.hexes[0].everCompleted = true;
    const group = new THREE.Group(), effects = new BoardEffects(group, state, true);
    effects.setCores([0], state); effects.refresh(state.hexes[0]); effects.update(0);
    expect(mesh(group, 'core-ring').count).toBe(0); expect(mesh(group, 'completion').count).toBe(0);
    effects.setCores([0, 1], state); effects.update(0);
    const first = new THREE.Matrix4(), later = new THREE.Matrix4(); mesh(group, 'core-ring').getMatrixAt(1, first);
    effects.update(300); mesh(group, 'core-ring').getMatrixAt(1, later); expect(later).toEqual(first);
    disposeGroup(group);
  });
});
