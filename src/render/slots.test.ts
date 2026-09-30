import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { makeTestState } from '../core/testing';
import { Buildings } from './buildings';
import { disposeGroup } from './instances';
import { SLOT_ANCHORS } from './layout';
import { SlotHighlight } from './slotHighlight';
import { pickHexSlot, renderSlotPick } from './slots';

describe('core hex slot rendering and picking', () => {
  it('suppresses every core slot pick/highlight while retaining ordinary slot targets', () => {
    const state = makeTestState({ cols: 2, rows: 1, hex: () => ({ biome: 'forest' }) }); state.cores = [0];
    const before = JSON.stringify(state);
    for (const slot of [0, 1, 2] as const) {
      const a = SLOT_ANCHORS[slot];
      expect(pickHexSlot(state, 0, a.x, a.z)).toBeNull();
      expect(renderSlotPick(state, { hexId: 0, slot })).toBeNull();
      expect(pickHexSlot(state, 1, a.x, a.z)).toBe(slot);
      expect(renderSlotPick(state, { hexId: 1, slot })).toEqual({ hexId: 1, slot });
    }
    expect(renderSlotPick(null, { hexId: 0, slot: 0 })).toBeNull();
    expect(renderSlotPick(state, { hexId: 999, slot: 0 })).toBeNull(); expect(JSON.stringify(state)).toBe(before);
  });
  it('draws no anchors/building models on a core and hides an already-visible slot ring', () => {
    const state = makeTestState({ cols: 2, rows: 1, hex: () => ({ biome: 'forest' }) });
    const group = new THREE.Group(), visuals = new Buildings(group, 2), ring = new SlotHighlight(group);
    state.hexes[0].slots[0].building = 'lumber_camp'; visuals.refresh(state.hexes[0], 0, 0); visuals.refresh(state.hexes[1], 2, 0);
    ring.set(state.hexes[0], 0); expect(ring.group.visible).toBe(true);
    state.cores = [0]; visuals.refresh(state.hexes[0], 0, 0, true);
    const pick = renderSlotPick(state, { hexId: 0, slot: 0 }); ring.set(pick ? state.hexes[pick.hexId] : null, pick?.slot ?? null);
    expect(ring.group.visible).toBe(false);
    const anchors = group.getObjectByName('slot-anchors') as THREE.InstancedMesh;
    const matrix = new THREE.Matrix4();
    for (const id of [0, 1, 2]) { anchors.getMatrixAt(id, matrix); expect(matrix.determinant()).toBe(0); }
    for (const id of [3, 4, 5]) { anchors.getMatrixAt(id, matrix); expect(matrix.determinant()).toBeGreaterThan(0); }
    expect((group.getObjectByName('building:lumber_camp') as THREE.InstancedMesh).count).toBe(0);
    disposeGroup(group);
  });
});
