// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { createGameSession } from '../game/session';
import { legalCoreSites } from '../sim/spread/spread';
import type { MainBiome, SlotIndex } from '../core/types';
import { createTutorial } from './tutorial';

const disposals: (() => void)[] = [];
afterEach(() => { disposals.splice(0).forEach(dispose => dispose()); document.body.innerHTML = ''; });

describe('tutorial driven by real session events', () => {
  it('advances seed 1 through all five steps without Next, including actual combo payouts and a threshold award', () => {
    const session = createGameSession({ now: () => 0 });
    const root = document.createElement('div'); document.body.append(root);
    const tutorial = createTutorial(root, session); disposals.push(() => tutorial.dispose());
    const panel = root.querySelector<HTMLElement>('.assistant-panel')!;
    const seen: string[] = [];
    const unsubscribe = session.subscribe(event => {
      if (['offerShown', 'spreadStarted', 'spreadFinished', 'payouts', 'coreAwarded'].includes(event.type) && !panel.hidden)
        seen.push(panel.dataset.line!);
    });
    disposals.push(unsubscribe);
    session.newRun(1);
    expect(panel.dataset.line).toBe('biomes');
    const biome = session.state.pendingOffer!.options[0];
    expect(session.chooseOffer(0).ok).toBe(true);
    const origin = legalCoreSites(session.state)[0];
    expect(origin).toBeDefined(); expect(session.placeCore(origin).ok).toBe(true);
    expect(panel.dataset.line).toBe('spread');
    session.advance(session.state.config.animation.spreadMaxMs);
    expect(panel.dataset.line).toBe('buildings');
    const roster = session.state.config.rosters[biome];
    const pair = session.state.config.combos.find(recipe => recipe.buildings.length === 2 && recipe.buildings.every(id => roster.includes(id)))!;
    expect(pair).toBeDefined();
    expect(session.placeBuilding(origin, 0, pair.buildings[0]).ok).toBe(true);
    expect(panel.dataset.line).toBe('buildings');
    const combo = session.placeBuilding(origin, 1, pair.buildings[1]);
    expect(combo.ok).toBe(true);
    if (combo.ok) expect(combo.value.payouts.some(payout => payout.kind === 'pair')).toBe(true);
    expect(panel.dataset.line).toBe('combos');
    const producers: Record<MainBiome, { wood: string; stone: string }> = {
      forest: { wood: 'lumber_camp', stone: 'hillside_mine' },
      desert: { wood: 'palm_grove', stone: 'quarry' },
      arctic: { wood: 'driftwood_camp', stone: 'scree_quarry' },
    };
    for (let placements = 0; !session.state.pendingOffer && placements < 60; placements++) {
      const tile = session.state.hexes.find(hex => hex.placeable && hex.biome === biome && hex.slots.some(slot => !slot.building))!;
      expect(tile).toBeDefined();
      const slot = tile.slots.findIndex(slot => !slot.building) as SlotIndex;
      const target = session.state.config.thresholds[0];
      const woodNeeded = (target.wood ?? 0) - (session.state.lifetime.wood ?? 0);
      const stoneNeeded = (target.stone ?? 0) - (session.state.lifetime.stone ?? 0);
      const building = producers[biome][woodNeeded >= stoneNeeded ? 'wood' : 'stone'];
      const result = session.placeBuilding(tile.id, slot, building);
      expect(result.ok, result.ok ? building : result.reason).toBe(true);
    }
    expect(session.state.thresholdIndex).toBe(1);
    expect(session.state.pendingOffer).not.toBeNull();
    expect(panel.dataset.line).toBe('progression');
    expect([...new Set(seen)]).toEqual(['biomes', 'spread', 'buildings', 'combos', 'progression']);
    expect(root.querySelector('.assistant-message')!.textContent).toContain('reaching the final threshold, T8, wins the run');
  });
});
