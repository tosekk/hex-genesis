# Tasks — `astra` (GPT-6 Astra · Codex) — Economy Engine and Acceptance Tests

You own the **payout rules**: buildings, base yield, terrain and zone modifiers, combos, discovery, completion, adjacency, demolition, preview, and progression thresholds. This is where most of the game's invariants live. Build it test-first.

**You own:** `src/sim/economy/**`, `src/config/economy.ts`, `tests/acceptance/**`, `tasks/status/astra.md`.
**Read-only for you:** everything else.
**Wait for** the `[opus] M0` commit before creating any files. Until then, read GAME_DESIGN §19–§39, §45, §53 and AGENT_TASKS §48, §49, §52, §57, and plan your tests.

Task order: **C0 → C1 → C2 → C3**.

Pure TypeScript only. No DOM, no `three`, no randomness. Functions follow CONTRACTS conventions: **validate fully, then mutate**; a failed `Result` means nothing changed.

---

## C0 — Placeholder economy data (P0, ~30 min) — `src/config/economy.ts`

GAME_DESIGN §53 says rosters, costs, yields, combos, bonuses, modifiers, thresholds, and starting stock are **undecided**. You provide **obviously placeholder** data so the systems run. Don't invent real design.

- Resources: `['wood', 'stone']` only. Don't add a third: §53 leaves that open.
- Buildings: 5 per main biome (`forest_a` … `forest_e`, name `"Forest A (placeholder)"`, and so on) and 3 unique per mixed biome (`steppe_x/y/z`, …). Rosters: main = its 5; mixed = first 3 of parent A + first 3 of parent B + its 3 unique (§22).
- Combos: 2–3 two-building combos and 1 three-building combo per main biome, plus 1 of each per mixed biome. Include at least one combo with a duplicate building (e.g. `[forest_a, forest_a]`) so §28-style double pays are testable.
- Terrain bonuses (placeholder rule: per adjacent qualifying hex): one each for mountain, water (`riverbed`/`basin`), woods, marsh.
- Zone modifiers: one small `+`/`−` per biome, for a couple of buildings.
- Starting stock ≥ the cheapest building cost of **each** main biome (§42, §45). Unit-test this.
- Economy shape so a run can be filled and won: most buildings' base yield total ≥ cost total, 8–12 thresholds, ascending, spaced so one placement can't cross two (§39). Put a comment above the data: `// PLACEHOLDER — not design decisions (GAME_DESIGN §53). Tune freely; do not treat as spec.`

**DoD:** the config type-checks as `ECONOMY`. A test asserts §45 and roster sizes (main ≤ 5; mixed = 3+3+3 with the right parents).

## C1 — Placement transaction (P0 base yield; P1 combos, discovery, adjacency) — `src/sim/economy/**`

**Spec:** §20, §23–§25, §27–§37; AGENT_TASKS §49 steps 1–13.

- `rosterFor(state, hexId)`: `config.rosters[hex.biome]`. `[]` if dead or unplaceable.
- `canPlaceBuilding`: status `'playing'`; hex exists; placeable; `biome !== null`; **not** `isHexLocked(state, hexId)` (import from `src/sim/spread/spread.ts`, §11); slot empty; building in the current roster (§19: legality always uses the *current* biome); `canAfford`.
- `placeBuilding`, in AGENT_TASKS §49 order:
  1. Validate → pay cost → set `slots[s].building`.
  2. **Base yield** if `!slot.yieldPaid`: `raw` = baseYield; `terrain` = for each neighbor (ascending id) whose terrain is in a bonus's `adjacentTerrain` **and** that is *visible*, add the bonus. Visible means `terrain === 'mountain'` (always counts) **or** `neighbor.biome !== null` (§24). `zone` = the matching `zoneModifiers[hex.biome]` deltas. Final = `max(0, raw+terrain+zone)` per resource. Set `yieldPaid = true`. Modifiers apply to base yield **only** (§24, §25).
  3. **Combos:** `currentComboMatches`: for each PairIndex with both slots filled, a size-2 combo whose multiset equals the pair; for the triple with all 3 filled, a size-3 combo matching the multiset. Every current match not in `discoveredCombos` gets **discovered**, even if it can't pay (§32). Each unpaid PairIndex with a match pays and records `pairPaid[p] = {comboId, amount}`. Same for `triplePaid` (§31: history is per slot pair/triple, not per recipe).
  4. **First completion:** if all 3 slots are filled and `!everCompleted` → set `everCompleted = true` (§36). For each neighbor N (ascending id) with `adjacencyPaid[pairKey]` unset and `adjacencyQualifies(state, hexId, N)` → pay `adjacencyAmount` and record it. **PLACEHOLDER condition** (§53), isolated in one function: N currently has ≥ 1 `currentComboMatches` entry, regardless of N's payout history or fill level (§35).
  5. Add every payout to `resources` **and** `lifetime`. Return `PlacementOutcome` with payouts in contract order.
- **Don't** evaluate thresholds here. That's `advanceThreshold`, called by the session afterwards (§29, §39).

**Required tests** (`src/sim/economy/*.test.ts`, on `makeTestState` + a test fixture config you define in `src/sim/economy/__fixtures__/`). They cover **every** §57 case below:
- Building payouts 1–6, 8 (fixture buildings `sawmill`, `farm`: `sawmill, farm, sawmill` pays the pair twice, same amount), 9, 11.
- Combo history 1, 3, 4. Completion 1, 3. Adjacency 1–3, 6, 7.
- Visibility: an adjacent woods tile with `biome === null` gives no bonus; with a biome set it does; a mountain always counts.
- Locked tile (set an `activeSpread` with that hex locked) → rejected.
- A pre-existing building on a tile whose biome changed stays in place (§19), but once demolished it can only be rebuilt from the new roster.

## C2 — Demolition, preview, progression (P1 demolition/preview; P0 progression)

- `demolishRefund` = `ceil(cost × demolishRefundRatio)` per resource (§26). `demolishBuilding`: reject if empty, locked, or not playing. Clear the building, add the refund to `resources` only (**not** `lifetime`: refunds aren't yield). Never touch `yieldPaid`, `pairPaid`, `triplePaid`, `everCompleted`, `adjacencyPaid`, or `discoveredCombos` (§26, §33).
- `previewPlacement`: same math as `placeBuilding` on a **clone**, with no mutation. `combos` lists only matches whose `comboId` is **already discovered** and that would newly pay. An undiscovered match is omitted entirely (§32, §38). Exclude adjacency.
- `advanceThreshold`: if `thresholds[thresholdIndex]` exists and every resource target ≤ `lifetime` → `thresholdIndex++`, return true. At most one per call (§39).

**Required tests:** §57 Building payouts 10; Combo history 2, 5; Completion 2; Adjacency 4, 5; Progression 2, 3, 8; demolish/rebuild never repays anything (base, pair, triple, adjacency); preview doesn't mutate state (deep-equal before/after); preview hides an undiscovered combo and shows it once discovered.

**DoD (C1+C2):** all green; every AGENT_TASKS §52 payout, discovery, and completion invariant has at least one test.

## C3 — Independent acceptance tests (P1) — `tests/acceptance/**`

You are the **independent verifier** for modules you don't own. From GAME_DESIGN and AGENT_TASKS §57 alone, write black-box tests against the **public contracts** for:
- Spread 1–8, 10–12 (`computeSpread`/`startSpread` on `makeTestState` boards);
- Terrain generation 1–4 (`generateMap` over seeds 1–50);
- Win/end 1–3 (`checkWin`, `isProvablySoftLocked`);
- Progression 5–7 through a real `GameSession`.

Rules: **never edit the module under test.** When a test fails, keep it, mark it `it.fails(...)` with a comment naming the owner, and file a report under "Bugs found in others' modules" in your status file (input, expected, actual, §). Re-check when the owner reports a fix.

**DoD:** the acceptance suite runs in < 10 s and every failure is reported.
