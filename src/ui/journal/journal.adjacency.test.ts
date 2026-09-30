// @vitest-environment happy-dom
// O13.3 integration: the REAL session + the REAL journal (no fakes). Placements are chosen from the live
// config until the session emits a `payouts` event with an adjacency payout; the journal's adjacency log
// must then show both hexes' combo names and the amount (UI_SPEC §8.2, GAME_DESIGN §34).
import { beforeEach, describe, expect, it } from 'vitest';
import type { SessionEvent } from '../../core/contracts';
import { neighbors } from '../../core/hex';
import type { BuildingId, ComboDef, GameState, HexId, PayoutEvent, SlotIndex } from '../../core/types';
import { createGameSession } from '../../game/session';
import { legalCoreSites } from '../../sim/spread/spread';
import { fmtResources } from '../format';
import { createJournal } from './journal';

beforeEach(() => { document.body.innerHTML = '<div id="r"></div>'; });

/** Three buildings that contain `combo` (the third one from the roster, so the hex completes). */
function fill(combo: ComboDef, roster: BuildingId[]): BuildingId[] {
  const out = [...combo.buildings];
  while (out.length < 3) out.push(roster[0]);
  return out;
}

describe('journal adjacency log (real session + real journal)', () => {
  it('logs an adjacency payout with both combo names and the amount', () => {
    const session = createGameSession({ now: () => 0 });
    const root = document.getElementById('r')!;
    const journal = createJournal(root, session);
    const events: SessionEvent[] = [];
    session.subscribe((e) => events.push(e));

    session.newRun(1);
    expect(session.chooseOffer(0).ok).toBe(true);
    expect(session.placeCore(legalCoreSites(session.state)[0]).ok).toBe(true);
    for (let i = 0; i < 1000 && session.state.activeSpread; i++) session.advance(250);
    expect(session.state.activeSpread).toBeNull();

    const s = session.state;
    const cfg = s.config;
    // Test-only wallet: this test is about the log, not the economy's pacing.
    const st = s as GameState;
    st.resources = Object.fromEntries(cfg.resources.map((r) => [r, 1_000_000]));

    // Two adjacent, empty, living, non-core hexes of the same biome; combos whose buildings that biome can build.
    const usable = (id: HexId) => {
      const h = s.hexes[id];
      return h.placeable && h.biome !== null && !s.cores.includes(id) && h.slots.every((x) => x.building === null);
    };
    let plan: { a: HexId; b: HexId; comboA: ComboDef; comboB: ComboDef; roster: BuildingId[] } | null = null;
    for (const h of s.hexes) {
      if (plan || !usable(h.id)) continue;
      const roster = cfg.rosters[h.biome!];
      const combos = cfg.combos.filter((c) => c.buildings.length <= 3 && c.buildings.every((b) => roster.includes(b)));
      if (combos.length === 0) continue;
      const b = neighbors(h.id, s.cols, s.rows).find((n) => usable(n) && s.hexes[n].biome === h.biome);
      if (b === undefined) continue;
      // Prefer two different combos so the log shows two different names.
      plan = { a: h.id, b, comboA: combos[0], comboB: combos[1] ?? combos[0], roster };
    }
    expect(plan, 'no adjacent same-biome hex pair with a buildable combo after the first spread').not.toBeNull();
    const { a, b, comboA, comboB, roster } = plan!;

    // Neighbour B first (it carries a combo), then complete A: A's first completion pays adjacency with B (§34).
    const place = (hexId: HexId, buildings: BuildingId[]) => buildings.forEach((building, slot) => {
      // A reached threshold awards a core behind a modal offer (§9); take it and keep the core on the stack.
      if (session.state.pendingOffer) expect(session.chooseOffer(0).ok).toBe(true);
      const r = session.placeBuilding(hexId, slot as SlotIndex, building);
      expect(r.ok, r.ok ? '' : r.reason).toBe(true);
    });
    place(b, fill(comboB, roster));
    events.length = 0;
    place(a, fill(comboA, roster));

    const payouts = events.flatMap((e) => (e.type === 'payouts' ? e.events : []));
    const adj = payouts.find((p): p is PayoutEvent => p.kind === 'adjacency' && p.neighborId === b);
    expect(adj, 'completing A next to B emitted no adjacency payout').toBeDefined();
    expect(adj!.hexId).toBe(a);
    expect(adj!.amount).toEqual(cfg.adjacencyAmount);

    journal.open('adjacency');
    const rows = [...root.querySelectorAll<HTMLElement>('.jr-log .jr-log-row')];
    const adjacencyCount = payouts.filter((p) => p.kind === 'adjacency').length;
    expect(rows).toHaveLength(adjacencyCount);
    const row = rows.find((r) => r.textContent!.includes(comboB.name));
    expect(row, 'no log row names the neighbour combo').toBeDefined();
    const text = row!.textContent!;
    expect(text).toContain(comboA.name);
    expect(text).toContain(comboB.name);
    expect(text).toContain(fmtResources(cfg.adjacencyAmount, true));
    // Hex side first, neighbour side second.
    expect(text.indexOf(comboA.name)).toBeLessThan(text.indexOf('↔'));
    expect(text.lastIndexOf(comboB.name)).toBeGreaterThan(text.indexOf('↔'));

    // A new run clears the log.
    session.newRun(2);
    journal.open('adjacency');
    expect(root.querySelectorAll('.jr-log-row')).toHaveLength(0);
    journal.dispose();
  });
});
