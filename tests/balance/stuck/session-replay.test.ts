import { describe, expect, it } from 'vitest';
import { makeTestState } from '../../../src/core/testing';
import { auditState } from './audit';
import { replaySessionWitness } from './session-replay';

describe('Recovery witnesses through the real session', () => {
  it('survives intermediate end checks and keeps input immutable', () => {
    const state = makeTestState({ cols: 1, rows: 1, resources: {}, hex: () => ({ biome: 'forest' }), config: {
      buildings: { a: { id: 'a', name: 'A', cost: { wood: 2 }, baseYield: { wood: 1 } } },
      rosters: { forest: ['a'], desert: [], arctic: [], steppe: [], taiga: [], polarDesert: [] },
      combos: [], terrainBonuses: [], zoneModifiers: {}, thresholds: [{ wood: 1000 }],
    } });
    state.hexes[0].slots[0] = { building: 'a', yieldPaid: true };
    state.hexes[0].slots[1] = { building: 'a', yieldPaid: true };
    const before = structuredClone(state), witness = auditState(state).witness!;
    // The first payout succeeds; with every slot now paid, the later loss is legitimate.
    expect(replaySessionWitness(state, witness)).toEqual({ ok: true, actions: 3, finalStatus: 'lost' });
    expect(state).toEqual(before);
    state.pendingOffer = { options: ['forest', 'desert'], reshuffled: false };
    expect(replaySessionWitness(state, witness)).toMatchObject({ ok: false, actions: 0, reason: 'Choose a biome offer first (§9).' });
  });
});
