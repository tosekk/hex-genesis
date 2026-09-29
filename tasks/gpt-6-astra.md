# Tasks — `astra` (GPT-6 Astra · Codex) — Economy Engine and Acceptance Tests

You own the **payout rules**: buildings, base yield, terrain and zone modifiers, combos, discovery, completion, adjacency, demolition, preview, and progression thresholds. This is where most of the game's invariants live. Build it test-first.

**You own:** `src/sim/economy/**`, `src/config/economy.ts`, `tests/acceptance/**`, `tasks/status/astra.md`.
**Read-only for you:** everything else.
**Wait for** the `[opus] M0` commit before creating any files. Until then, read GAME_DESIGN §19–§39, §45, §53 and AGENT_TASKS §48, §49, §52, §57, and plan your tests.

Task order: **C0 → C1 → C2 → C3 → C0b**. If C3 is already underway, finish the test file you're on, then do **C0b before continuing C3**. It unblocks balance testing.

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

> **Superseded by C0b.** The designer has approved real v1 values in `tasks/ECONOMY_SPEC.md`, including **4 resources** (wood, stone, water, food). The "wood and stone only" rule above no longer applies.

## C0b — Implement the approved economy (P0, ~30–45 min) — `src/config/economy.ts`

**Source of truth:** `tasks/ECONOMY_SPEC.md`. Copy it exactly: ids, names, costs, yields, rosters (in the listed order), combos, terrain bonuses, zone modifiers, adjacency amount, thresholds, starting stock. Don't retune anything. If a value looks wrong, write it under Decisions/Notes in your status file and ask. Label the data `// PLACEHOLDER v1 (ECONOMY_SPEC.md) — designer-approved, tunable`.

- Replace the generated `forest_a`-style placeholders entirely. Write the data as plain literal tables (easier to tune than a generator loop).
- Your economy **tests** should keep using their own fixture config (`__fixtures__`), not `ECONOMY`, so retuning never breaks rule tests. If any rule test depends on `ECONOMY` ids, move it onto the fixture.
- Update `src/sim/economy/config.test.ts` to assert these about `ECONOMY`:
  - §45: starting stock affords the cheapest building of each main biome;
  - roster sizes: main = 5; each mixed = 3 of parent A + 3 of parent B + 3 unique;
  - every roster id exists in `buildings`, and every building appears in at least one roster;
  - every combo has 2–3 buildings that all exist and **appear together in at least one roster** (otherwise the combo is unreachable);
  - every terrain-bonus / zone-modifier building id exists;
  - every resource key used anywhere is in `resources`;
  - thresholds are strictly non-decreasing per resource.
- Check nothing outside your paths relies on the old ids: `grep -rn "forest_a\|_pair\|_triple\|_double" src tests`. Report any hits in others' files to their owners via your status file. Don't edit their files.

**DoD:** config tests green, `npx vitest run src/sim/economy tests/acceptance` green (apart from known reported failures), commit `[astra] C0b: economy v1 from ECONOMY_SPEC`.

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

---

## D1 — Map generation (P0, reassigned from deepseek) — `src/sim/world/**`, `src/config/map.ts`

You now own `src/sim/world/**` and `src/config/map.ts`. The files there are still opus's O1 stubs (a flat all-plain map). Replace them.

- **Spec:** implement **D1 exactly as written in `tasks/deepseek-v4-pro.md`** (section "D1 — Map generation"), including its determinism rules (only `src/core/rng.ts`; integer math for anything that decides terrain; no `Math.sin/cos/exp/pow/log/sqrt`; ascending-HexId iteration) and its required tests. Use `createHex` from `src/core/state.ts` (see opus's status notes).
- **Priority order if time is tight:** (1) elevation + mountains + hills that satisfy §6 by construction; (2) riverbeds + basins; (3) woods + marsh. Commit after each step with its tests green. Each step makes the game better on its own.
- **Your own acceptance tests** (`tests/acceptance/world.test.ts`) hold `it.fails` markers for terrain T1–T4. Remove them as they start passing. Because you now test your own module, add a line in your status asking **opus to review D1** (O5) as the independent check.
- After D1: log the placeable % and terrain mix for seeds 1–10 in your status file, as D1 requires.
- **Map knobs:** probabilities in `MAP.params` are PLACEHOLDER (§53). **Don't** add reject-and-regenerate validation rules.
- **D4 (P2, later):** tune only `MAP.params` from playtest feedback.

**DoD:** D1's required tests green, world acceptance T1–T4 passing (markers removed), `npm run dev` shows mountains, hills, rivers, basins, woods and marsh, generation < 20 ms. Commit `[astra] D1: deterministic map generation`.

---

# Overnight queue (designer-assigned; ~3 hours, unattended)

The designer is asleep. **Opus, Sonnet and possibly Sol are not running.** Nobody will answer questions. Rules for this block:
- **Decide within the guardrails and keep going.** Log every judgment call under "Decisions" and every balance change under a new "Balance log" section in `tasks/status/astra.md`.
- **Never block on another agent.** If something outside your paths breaks or blocks you, write a precise report under "Bugs found in others' modules" and continue with the next item.
- **Commit after every item** (and after every calibration round), staging only your own paths. Never leave work uncommitted when you move on.
- **Time-box.** If an item is stuck for more than 25 minutes, commit what works, log the blocker, and move to the next item.
- Your paths now also include **`tests/balance/**`** (new). Still never edit `tests/e2e/**` (opus), `src/game/**` or `src/ui/**` (sonnet), `src/render/**` or `src/tutorial/**` (sol), or `package.json`.

Order: **N0 → N1 → N2 → N3 → N4 → N5**, then stretch N6.

## N0 — Finish D4 (map variety), in progress
Finish and commit D4 as already instructed. Record before/after terrain stats for seeds 1–10.

## N1 — Economy v2 (P0, ~30 min) — `src/config/economy.ts`
Implement `tasks/ECONOMY_SPEC.md` **v2** exactly: changed yields, new and removed combos, adjacency 2, the v2 threshold guess (6 entries). Update `config.test.ts`:
- no combo is a same-building pair;
- pair totals are 4–7 and triple totals 11–15;
- exactly 6 thresholds, water from T3, food from T4;
- plus all the existing C0b checks.

Run the full suite. Failures in other agents' tests caused by the new numbers (e.g. threshold counts) → report them to their owner. Don't edit their files.
Commit `[astra] N1: economy v2 from ECONOMY_SPEC`.

## N2 — Balance harness (P0, ~45 min) — `tests/balance/**`
Your own measurement tool. Don't modify opus's `tests/e2e/**` (you may read `tests/e2e/bot.ts` for ideas).
- Drive a real `GameSession` (`createGameSession`) on real generated maps (seeds 1–20). Call `advance(…)` to finish every spread.
- **Core placement (both bots):** choose the offer option that yields a new mixed pair when possible, otherwise the biome the bot has fewest tiles of. Place the core at the legal site whose `computeSpread` claims the most dead placeable tiles (ties → lowest HexId).
- **Spam bot:** each step, place the affordable building with the highest total base yield (raw + visible terrain + zone) into any empty slot. Ignores combos.
- **Combo bot** (an experienced player who knows all recipes): score each candidate as base yield + the pair/triple payouts it would newly trigger + adjacency if it completes the hex. Use the config directly, **not** `previewPlacement`, which hides undiscovered combos and costs ~1 ms per clone. Prefer finishing partially filled hexes.
- **Both bots:** never demolish. Stop at a win, at soft-lock, or after 1500 actions. Record the cumulative placement count at each threshold, the fill % at T6, the win placement count, and any `isProvablySoftLocked === true` (that would be a bug for sonnet, so report it).
- **Output:** a markdown table written to `tests/balance/REPORT.md` (medians and min–max per bot per threshold, plus a check against each of the 4 targets in ECONOMY_SPEC). The suite runs only when `BALANCE=1` is set (`BALANCE=1 npx vitest run tests/balance`) so it never slows down `npm test`. Budget: under 2 minutes for 20 seeds × 2 bots.

Commit `[astra] N2: balance harness`, and commit REPORT.md for the untuned v2 baseline.

## N3 — Calibrate v2 (P0, ~60 min, iterative) — `src/config/economy.ts`
Loop: run the harness → compare against the 4 balance targets → adjust **only within the guardrails** in ECONOMY_SPEC.md → repeat. Tune thresholds first. Touch yields and combo amounts only if the ≥ 1.5× spam-vs-combo target can't be met otherwise.
- Every round: one Balance-log entry in your status file (what changed, the before/after numbers) and one commit `[astra] N3 round <n>: …` including the updated REPORT.md.
- Stop when all 4 targets pass, or after 6 rounds. Then pick the best round, make sure it's what's committed, and explain in the status file which targets are still missed and why.
- **If a target can't be met within the guardrails, don't break the guardrails.** Write down exactly which frozen value would have to change, and by how much. That's a question for the designer.

## N4 — World-size readiness (P1, ~25 min) — `src/sim/world/**`
The designer plans a bigger world after playtesting. **Don't change `MAP.cols`/`MAP.rows`.** Make sure the generator behaves at other sizes: add tests at 26×18 and 30×20 (determinism, §6 rules, placeable % in range, generation < 40 ms). Fix any hard-coded 20×14 assumptions in your code. Also run the balance harness once at 26×18 (pass an override config) and put the result in REPORT.md under "Size preview — informational". Don't tune for it.
Commit `[astra] N4: size-robust generation + 26x18 preview`.

## N5 — Morning handoff (~10 min) — `tasks/status/astra.md`
At the top of your status file, write a "**Morning summary**" of at most 15 lines:
- what you committed (with hashes);
- the final balance table vs the targets;
- guardrail blockers that need designer decisions;
- any bugs reported for other agents;
- what the designer should playtest first (a couple of good seeds, and why).

## N6 — Stretch, only if time remains
- `previewPlacement` performance: avoid a full `structuredClone` per call (opus measured ~1 ms). Clone only the touched hex(es) and the resource maps, or compute the preview analytically. Results must stay identical: add a property test comparing old and new over random states.
- More balance seeds (1–50) to confirm the medians are stable.
