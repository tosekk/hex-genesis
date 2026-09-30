## v3 result

**N7 complete — selected round 3 (`f6b6d45`), 48/50 combo wins, 48/50 T6, zero soft-lock declarations.** All nine previous core-coverage stalls now win. Four rounds committed: `cf27db5` → `1a2c142` → `f6b6d45` → `d04593b`; round 3 restored by priority **4 > 2 > 1 > 3**.

- **T1–T8 placement medians:** **2 / 23.5 / 47.5 / 105 / 180.5 / 312 / 362.5 / 433.5**. T1 exempt; T7/T8 precede median win **613.5**.
- **Targets 4, 2 and 1 PASS.** T4–T6 spam/combo ratios **3.46× / 2.74× / 1.96×**. **Target 3 MISS:** minimum spam T6 fill **59.44%**; early seeds **3,8,18,19,37,45,47**. Round 4 improves fill but loses the measurable T6 ratio, so it is not retained.
- **Only combo seeds 35/37 fail to win**, both at three placements: 35 exhausts wood on three Hillside Mines (wood 0 / stone 30); 37 exhausts stone on two Oasis Wells and a Palm Grove (wood 16 / stone 0, lifetime stone 2 < T1 16). These accepted bot-opening limitations are unchanged; no global-unwinnability claim.
- **Decision B respected:** starting stock, costs and all non-threshold economy data exactly match the v2 round-4 baseline. Shipping map remains 20×14. Final T7 **1050/920/690/220**, T8 **1300/1150/850/270** (wood/stone/water/food).
- **Validation:** 124 owned/scoped tests pass, 8 opt-in skips; 16 config/report checks and typecheck pass. Each 50-seed round passes all 8 harness checks. Final source exactly matches the selected archive; no new outside-owner failure observed. Full integration/browser checks remain Opus-owned.
- **Opus handoff:** final config is ready for O6.4. Playtest **1** for full progression and **12** for its formerly missing eighth core. Full results, T7/T8 fill and legal sites per run: `tests/balance/REPORT.md`, `tests/balance/v3-round-3.json`.

## Historical morning summary — v2, superseded by v3 above

- Commits: N1 `457a221`; N2 `fd23f08`; N3 selection `72ced76` (six rounds below); N4 `0642114`; N5 `2108880`; N6 preview `4eacde4` (~25× faster), 50-seed report `6557f14`.

| Target (20 seeds, 20×14) | Final result |
|---|---|
| Pacing 7/22/45/90/160/270 ±20% | **MISS T1 only:** 2/21/44/93/173.5/299 |
| T4–T6 spam/combo ≥1.5× | **PASS:** 2.94× / 2.51× / 1.90× |
| Every spam T6 fill ≥70% | **MISS:** minimum 64.70%; early seeds 3,8,18,19 |
| Combo ≥18/20 T6 and wins, zero soft-locks | **PASS:** 20/20 T6, 18/20 wins, zero declarations |

- **50-seed warning:** 48/50 T6, only 39/50 wins; T4 median 110.5, spam T6 median unreached, minimum spam T6 fill 59.44%. The 20-seed success rates do not generalize. No seventh calibration round.
- Designer decisions: later T1 needs opening-resource funding for retained yields; nine observed bot routes exhaust seven cores with 1–2 legal sites left. Costs/stock/six thresholds stayed frozen. Larger-map generation passes, but 26×18 preview has 0/20 wins; keep 20×14.
- Validation: 164 scoped tests + 36 C3 cases pass; 2,592 preview comparisons match; typecheck/build pass. Full suite: 273 pass, one Sonnet HUD fixture failure (`hud.test.ts:203`, zero T1 wood target); reported below. Sol's tutorial failure is resolved; rendering edits untouched.
- Playtest **3** for progression/early spam T6, **13** for Arctic combo recovery; stress-test **35/37** for opening starvation and **12** for core coverage. Full evidence: `tests/balance/REPORT.md` and JSON archives. N1–N6 complete.

# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IN PROGRESS: N8 v4 calibration. Preparation complete; Sonnet S8 landed (`c63b56d`, `51cef86`). Win/end acceptance passes with no expected-failure markers. At most five 50-seed rounds follow; prior v3 result is historical.

## Done
- N8 preparation — final-threshold win/end acceptance (9 cases), v4 outcome/board-use/opening/stock metrics, all six report targets, frozen-v3 guardrail reference; 26 preliminary checks pass. S8 is committed; no calibration preceded it.
- N7 — v3 eight-threshold calibration, four 50-seed rounds, 48/50 wins; selected `f6b6d45`, with rounds `cf27db5`, `1a2c142`, `f6b6d45`, `d04593b`. Final v3 result and report include all late fills/legal-site counts.
- N6 confirmation — 50 seeds, exact replay of original 20, explicit larger-sample limits and final checks — `6557f14`.
- N6 preview — bounded private copy, 2,592 exact old/new comparisons and about 25× lower cost — `4eacde4`.
- N5 — morning summary and designer handoff — `2108880`.
- N4 — size-aware cluster density, 400 larger-map invariant checks, unchanged default terrain, 26×18 balance preview — `0642114`.
- N3 — six committed calibration rounds; round 4 selected by priority, targets 4 and 2 pass, remaining misses documented — selection `72ced76` (rounds `922c134`, `f284644`, `9b84564`, `7b2aa4c`, `b9fdfe4`, `fefe6aa`).
- N2 — real-session balance harness, 90.54 s baseline for 20 seeds × two bots, report and exact config/run archive — `fd23f08`.
- N1 — exact v2 economy, immutable v2 guardrail fixture, six-threshold/recipe/yield checks — `457a221`.
- D4 — 1–4 connected mountain clusters of 3–10 tiles, 15–25% hill coverage, draining plateau rivers, tuned natural-terrain probabilities and before/after statistics — `0b7f609`.
- D1 step 3 — woods/marsh, all world/C3 acceptance passing, 200-seed checks and terrain statistics — `d978f14`.
- D1 step 1 — integer relief, mountain clusters, outward hill bands, seeds 1–200 tests and T1–T3 — `cc0e8e9`.
- D1 step 2 — deterministic downhill riverbeds/local-minimum basins, route/tie-break tests — `3950a22`.
- C0 — labelled placeholder economy, 3 config tests green, typecheck green — `da92228`.
- C1 — atomic placement, combo discovery/history, completion and adjacency; 23 scoped tests and typecheck green — `e6f34de`.
- C2 — demolition, clone preview, lifetime thresholds; 39 scoped tests and typecheck green — `a5bf5d7`.
- C3 — independent public-contract acceptance suite: 20 spread cases, 5 world cases across seeds 1–50, 8 win/soft-lock cases, 3 real-session progression cases. 21 pass, 15 reported expected failures; under 0.5 s (DoD <10 s). Tests — `f20f916`; tuning-independent endgame fixture follow-up — `7144980`.
- C0b — exact designer-approved economy v1, literal tables and 7 data-integrity tests; 43 economy + 21 acceptance tests pass, 15 reported expected failures; typecheck green — `7144980`.

- D2 — biome offers, first-offer distinctness, repeated-pair protection, reshuffle budget, final-pair history and stacked cores; 19 tests and typecheck green — `0daa072`. Designer reassigned offers ownership to astra.

## Blockers
- No N7 blocker. Accepted opening limitations (35/37) and the lower-priority spam-fill miss are documented in the v3 result. Opus O6.3 independently passed D4/N4/N6. Sonnet S6 fixed the historical HUD fixture, confirmed by source inspection and owner test report; no N7 full-suite claim is made.

## Decisions
- N8 target 6: require at least 45/50 T7 completers and every completer strictly below 60% all-map board use. Report median/max and coverage, so missing runs never produce a vacuous pass. Target 5 also requires ≥45 checkpoint samples. Keep historical v2/v3 report sections unchanged.
- N8 / v4: win means all final lifetime targets met, final threshold awards no core. Report map board use against **all** placeable slots, including dead tiles (distinct from the end-screen living-slot denominator). Keep bots’ scoring, core/offer rules, no-demolition policy and 1500-action cap unchanged. A bot exhausting living slots with no usable held core is a separately labelled board-full loss; an unaffordable empty-slot stall without a detector proof remains `stuck`, never silently counted as a spam loss.
- N8 stock-pressure measurement: snapshot held stock at each T3–T7 transaction, against the per-resource maximum cost in the placed building’s current-biome roster. Compare median stock/max-cost ratio at every checkpoint/resource; positive stock with zero roster cost is infinite pressure. Report raw held and max-cost medians too, and mark absent checkpoints unmeasurable. This is checkpoint sampling, not a claim about every frame between thresholds.
- N7 final selection: retain round 3 exactly. Rounds 1/2/3/4 all win 48/50; round 3 alone passes targets 4, 2 and 1 together. Round 4 improves minimum spam fill but loses the finite T6 ratio, so target priority rejects it. Four rounds are a bounded search, not a proof that target 3 is impossible within all allowed configurations. Decision B remains declined; do not change or request changes to starting stock/costs for this task.
- N7 round 4: use the last allowed calibration for small T6 resource increases (wood +50, stone +20, water +25) rather than changing openings or rewards. Select among the four measured rounds by target priority; no fifth tuning round. Within equal pass/fail outcomes and equal wins, prefer improved minimum spam T6 fill.
- N7 round 3: interpret “keep round-4 pacing” as retaining its progression shape and target bands, not freezing all six literal gates (v3 explicitly permits retuning). A 7.7% T4 wood correction addresses the sole 50-seed pacing miss; T1–T3 and the known starving openings stay fixed.
- N7 round 2: a small T6 resource-gate adjustment is permitted by v3; preserve the round-4 progression shape and every other gate while restoring a finite 50-seed spam comparison. T1–T5, T7/T8, stock, costs, yields and recipes stay unchanged.
- N7 / ECONOMY_SPEC v3: start from exact retained round-4 values; append steeper all-resource T7/T8. Keep starting stock, costs and the known seed-35/37 openings untouched. Count the initial eight-threshold measurement as round 1 of the maximum four. T1 is pacing-exempt. Evaluate target 4 at 96% T6 completion and 90% wins (48/50 and 45/50); finite T4–T6 spam/combo medians are still required for target 2. Zero spam T6 completers passes target 3 under the explicit v3 override. Late threshold medians must precede the finite all-seed median win placement count.
- N6 §38: preserve transaction-based preview math, including unaffordable projections and hidden discoveries. Copy the state shell, hex array, target hex/slots/pair-history array, resource maps, discovery list and adjacency map; share only data that placement reads. Verify equivalence against the previous full-clone algorithm on frozen seeded states, including demolition/conversion and invalid requests. The larger 50-seed sample is confirmation, not a seventh calibration round.
- N4 §6/§53: scale mountain cluster min/max by board area relative to the new PLACEHOLDER `mountainReferenceArea: 280`, rounding up. This fixes hill coverage dropping to 8–10% on large maps without changing default dimensions or any of the first 200 default-map outputs (SHA-256 `377692786bd55dc8b02f911dbfcfeec00ddedb6b01ba4884f5884ded1a62ecb1`). No retries or seed filtering. Interpret “roughly 65–80%” as the mean and at least 90% of tested seeds within range, consistent with D4; record all outliers.
- N4 measurement: the strict two-minute budget remains for 20 seeds on the default board. Larger informational previews get area-squared runtime scaling because candidate search grows with both tiles and placements. The 50-seed stretch scales runtime linearly with seed count; no economy or bot changes.
- N3 selection: restore round 4 exactly for both config and REPORT. It is the sole round passing targets 4 and 2; T2–T6 also meet pacing. Round 5 loses the finite T6 comparison; round 6 loses reachability despite the permitted new yield channel. Keep the corrected sparse-resource guardrail test, but revert the experimental mine wood yield. Do not claim that six trials exhaust every possible combination inside the guardrails.
- N3 round 6 revises the initial conservative yield-channel assumption: CONTRACTS explicitly defines missing resource keys as zero, and v2 allows ±1 per resource without freezing yield keys. Therefore Hillside Mine wood 0→1 is inside the literal guardrail. Test it with T1 stone 42 (T2 stone 50 to stay monotone), preserving every frozen cost, starting stock, roster and recipe. The guardrail test now compares all four declared resources against sparse v2 zeros rather than imposing an extra key-freeze rule. This is the sixth and final calibration round; afterward select by the designer's priority order.
- N3 round 5: 24 stone is the largest safe T1 gate for the four Forest mine-only openings (three 8-stone mines spend all six starting wood). Raise late water 550→625, just below the smallest completed spam final water (seed 20: 627), to delay two of the four early T6 seeds without destroying the finite spam median. Keep other thresholds and rewards fixed.
- N3 round 4: hold the successful opening yields/Polar Base rescue fixed. Raise T2/T5 toward pacing targets. At T6, reduce food 255→170 (eleven round-3 spam runs earned at least this much) while raising wood/stone/water to slow completion; this makes the spam comparison measurable without counting failed seeds as successes. Leave T1 stone-only because a positive wood requirement reintroduces the four frozen-terrain opening failures.
- N3 round 3: prioritize reachability over early pacing. Four remaining Forest openings earn 24 stone and zero wood before exhausting stock; T1 becomes wood 0 / stone 16 so they unlock a core before the third mine. The Arctic seed-13 triple exhausts wood and leaves stone 1; Polar Base adds stone 2 (total 12→14, within the triple 11–15 guardrail) to fund Driftwood Camp. Combo recipes are frozen, but payout resource allocation is not; this adds an existing resource to a combo amount, not a base-yield channel or mechanic.
- N3 harness runtime: round 2's serial measurement exceeded 120 s after more bots survived. Run the unchanged simulation/scorer in four bounded local Node test workers, with a tiny extension resolver for Vite-style TypeScript imports. All 40 serial/worker results match exactly; the ordinary Vitest replay remains as a cross-runtime check. This is measurement parallelism, not delegation or a gameplay change.
- N3 round 2: round 1 proves threshold scaling cannot repair openings earning zero required wood/stone. Increase wood producers and Arctic pair participants within ±1, lower Hillside Mine by one and Glacier Pump from 5 to 4 (Ice Drill rises 3 to 4) so the cheaper drill can tie the pump and enable Ice Mine/Harbor. Keep recipes, costs, terrain bonuses and bot strategies fixed.
- N3: prioritize target 4, then 2, 1, 3. Round 1 changes thresholds only, approximately scaling the untuned completers' pacing toward targets; this is not evidence that the censored seeds succeed. Stop after six measured rounds and keep the best reachable/winnable result rather than disguise stuck runs as favorable spam ratios.
- N2 measurement: both bots score every affordable building on each eligible hex, using its first empty slot (equivalent empty slots because these bots never demolish). Highest immediate total payout wins; combo bot ties favor more occupied hexes, then HexId/roster order. No resource weighting, cost penalty, lookahead, reshuffle, or rescue actions are added. Offer choice previews each option at its maximum-dead-placeable site and favors a newly represented mixed biome there, then fewer main-biome tiles, then option 0. Unreached thresholds are censored as infinity for all-seed medians, never silently dropped; reached-only ranges/counts are also reported. Stuck-without-affordable-action is distinct from a game soft-lock declaration.
- Overnight: follow N1–N5 sequentially, commit each item/round using explicit owned paths, and report outside-owner failures without edits. N0 already complete. Initial conservative yield-key interpretation was superseded by the literal CONTRACTS zero-default reading in N3 round 6 above.
- D4 §6/§53 (designer feedback): the old fixed-radius/count algorithm cannot express the requested variety through knobs alone. Add min/max cluster count/size and hill-budget knobs, grow connected irregular mountain/hill patches, and shape hill elevations from their outer boundary while retaining mountain distance ≤3. Rivers may cross an equal-height plateau only along a shortest route to a strictly lower outlet; enclosed plateaus remain local minima. All decisions use integer RNG and ascending HexId ties, with one construction pass and no map rejection/regeneration.
- D1 §6/§53 vegetation: only remaining plains can become marsh/woods. Configured per-thousand marsh chance increases on low ground and beside riverbeds/basins; woods chance increases at mid elevations. Water, hill and mountain terrain/elevations stay untouched.
- D1 §6 water: river sources are elevated plain tiles (threshold is a PLACEHOLDER knob). Each route selects the lowest neighbor, ties by HexId, and stops at the board edge or any local minimum, including a plateau. Because plain approaches are lower than adjacent hills, descending river walks cannot remove hills or mountains. Basin candidates have no strictly lower neighbor. All water chances are integer parts per thousand in MAP.params.
- D1 §6 (explicit task interpretation): every hill has a hill-only path of at most three tiles to a mountain. Build distance bands outward from mountain clusters, with elevation `top - distance`; four-level maps use two positive-height hill bands. This is compatible with the existing ascending-approach acceptance check.
- D1 §5/§53: integer bilinear lattice noise supplies broad elevation and peak scores; highest-score eligible mountain centres use ascending HexId ties. Mountain counts/radius/inset/separation and noise spacing are labelled PLACEHOLDER map knobs, applied in one construction pass; never reject/regenerate a map. Plains touching the outer hill band are capped one level below it.
- §9 / D2: designer reassigned the two offers files to astra in this session. Offers draw two independent main biomes; when the first-offer or repeated-pair rule rejects a duplicate, keep option 0 and choose option 1 uniformly from the other two main biomes with one bounded extra offer-RNG draw.
- §9 / D2: `awardCore` throws before mutation if an offer is pending (its frozen signature has no Result). Reshuffle/resolve validate before mutation; resolved history copies the final pair. Session remains responsible for run-status/modal command gating.
- §27–§31: recipe multiset collisions use the first matching config recipe per pair/triple. Placeholder recipes are unique; config order breaks any accidental duplicate deterministically.
- §35/§53: adjacency qualification is isolated in `adjacencyQualifies`; any current neighboring combo qualifies, even on two occupied slots or previously paid slots.
- §9: pending-offer modal gating belongs to GameSession; economy validates its explicit placement contract.
- §38: unaffordable legal placements still project payouts; invalid placements project no payouts. `affordable` reports cost affordability only.
- §6 acceptance interpretation: three-hill approach routes follow strictly ascending one-level edges; arbitrary sideways terrace walks have no specified direction and are not counted as approach chains. Fifty-seed presence checks prevent flat-map stubs from passing hill/natural checks vacuously.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
- **RESOLVED N6 → sonnet (S6, source inspected; owner reports tests green; historical test assumption, `src/ui/hud.test.ts:203`):** the “resource bar shows per-resource lifetime progress” fixture selects the first T1 key (`wood`, now target 0), sets lifetime wood 4 and expects `4 / 0`. `resourceBar.ts:22` correctly caps displayed progress at the target, yielding `0 / 0` (row text `Wood6lifetime 40 / 0`). Expected fixture repair: select a positive target such as stone 16 or assert `min(have, need)`; §39 allows already-satisfied/zero requirements. Full suite: 273 pass, this one fails, 6 skip. Source and test untouched; all 164 scoped tests pass.
- **RESOLVED N1 → sol (`925ad36`, confirmed by final full suite):** `npx vitest run src/tutorial/tutorial.session.test.ts` fails at line 39 on seed 1. The real-session fixture uses Desert `quarry + quarry` / Arctic `ice_drill + ice_drill` and expects a pair payout; v2 deliberately removes both duplicate recipes. Use `quarry + palm_grove` / `ice_drill + scree_quarry`, or derive an affordable pair from config. Tutorial source/tests untouched.
- RESOLVED C3-WORLD: all-plain stub replaced by astra D1; T1–T4 now pass normally (`cc0e8e9`, `3950a22`, `d978f14`).
- RESOLVED C3-END / C3-SESSION stubs: astra D2 `0daa072` and sonnet D3 `c23be27` enabled real-module acceptance.
- RESOLVED C3-REFUNDS: sonnet `4909942` now handles the conservative two-demolition escape fixture; test passes with no expected-failure marker.
- RESOLVED C3-FLIP: sonnet `4909942` holds spread locks through the final tile flip; real-session P5 passes with no expected-failure marker.

## Notes for others
- **Opus O6.4 final N7 handoff:** selected config is round 3 `f6b6d45`, restored after the four-round search. Eight thresholds; 48/50 combo wins, 48/50 T6, zero declarations. Recommend **seed 1** for the full browser run (combo bot: T7/T8 307/357, win 633, seven cores), and **seed 12** for the extra-core regression (T7/T8 330/389, win 600, eight cores). Your D4/N4/N6 independent review PASS is acknowledged. Config will remain fixed for your final autoplay/pacing/browser verification.
- **Opus O5/O4: please review D4 `0b7f609`**, particularly irregular hill boundary support and plateau drainage, then rerun real-map autoplay/pacing. D1 review PASS acknowledged. D4 retains the §6 invariants with smaller hill patches; lower-outlet plateau traversal is the explicit structural decision above. No contracts or economy values changed. All 115 astra-scoped tests pass (12 files, 3.35 s), including all C3 cases and unchanged D1 tests; typecheck and owned diff checks pass. Generation mean 0.881 ms, max 1.233 ms over 200 seeds. This D4 pass is headless; the browser evidence below describes D1 only.
- **D1 handoff (historical; opus O5 review now PASS):** especially hill-path depth/elevation construction, source/minimum river routing, ascending-HexId ties, integer determinism, and below-listed seed statistics. Implementation is in `src/sim/world/{mapgen,relief,water,vegetation}.ts`, knobs in `src/config/map.ts`; commits `cc0e8e9` → `3950a22` → `d978f14`. Astra now owns the world acceptance tests, so your independent check is important. Re-run O4 autoplay/pacing with the real map before proposing D4 knob tuning; no economy values changed.
- Final validation: `npx vitest run src/sim/world src/sim/economy src/sim/offers.test.ts tests/acceptance` → **110 passed**, 11 files, 2.40 s. Includes seeds 1–200 world invariants, same-seed replay, different-seed variety, four-level relief, downhill routing, water/vegetation preservation and all 36 C3 cases. `npm run typecheck` and owned-path `git diff --check` → green.
- Performance probe (`npx vitest run src/sim/world/mapgen.test.ts --silent=false -t 'reports seed|under 20'`): 200 maps after warmup; mean **0.357 ms**, maximum **2.188 ms**, well below 20 ms. Timings are measured only in tests and do not affect generation.
- Browser verification: ran `npm run dev -- --host 127.0.0.1 --port 5187 --strictPort`, loaded `/?seed=1` at desktop viewport, chose Arctic, placed a core, and watched the spread finish. Two mountain clusters and stepped hill approaches render. Inspected restored **Basin (14,8), Marsh (11,11), Woods (14,13), Riverbed (13,11)**; all four display “Nothing can be built here.” Riverbed/basin water surfaces and natural-terrain decorations are visible. Console warnings/errors: none. Temporary viewport/tab/server cleaned up.
- Shared-index note for opus: step-1 commit `cc0e8e9` also collected two pre-staged opus-owned deletions (`tests/e2e/autoplay.fallback.test.ts`, `tests/e2e/fallbacks.ts`). Astra did not edit those files. Shared history was left intact. Every subsequent step commit used `git commit --only` with exact owned paths and left other staged work untouched.
- Offers D2 no longer block real session/autoplay tests. All economy contracts are implemented. Preview uses a private clone, original discovery filters and no adjacency; threshold evaluation remains session-sequenced after payout commit.
- C0b approved economy tables remain exact; D1 changes only PLACEHOLDER generation knobs. No contracts, npm dependencies, map-rejection loops, or economy tuning added.

## D1 seed statistics

Direct `generateMap(seed, MAP)` seeds **1–10**, 280 tiles each (run seeds are separately derived by `createInitialState`). Initial map knobs target roughly 65–80% placeable land. Mean **69.96%**, range **64.29–77.86%**; seed 8 is slightly below the rough target. This is a report, not a reject/regenerate condition. Seeds 3 and 4 have no riverbeds with these knobs, but do have local-minimum basins; please include this natural variation in O5/D4 review.

| Seed | Placeable | Plain | Hill | Mountain | Riverbed | Basin | Woods | Marsh |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 183 (65.36%) | 86 | 97 | 14 | 9 | 17 | 31 | 26 |
| 2 | 194 (69.29%) | 96 | 98 | 14 | 15 | 9 | 27 | 21 |
| 3 | 218 (77.86%) | 118 | 100 | 14 | 0 | 14 | 15 | 19 |
| 4 | 216 (77.14%) | 117 | 99 | 14 | 0 | 11 | 15 | 24 |
| 5 | 186 (66.43%) | 89 | 97 | 14 | 18 | 13 | 25 | 24 |
| 6 | 206 (73.57%) | 108 | 98 | 14 | 7 | 11 | 14 | 28 |
| 7 | 206 (73.57%) | 98 | 108 | 14 | 10 | 13 | 16 | 21 |
| 8 | 180 (64.29%) | 85 | 95 | 14 | 15 | 20 | 22 | 29 |
| 9 | 182 (65.00%) | 84 | 98 | 14 | 16 | 18 | 26 | 24 |
| 10 | 188 (67.14%) | 90 | 98 | 14 | 11 | 13 | 25 | 29 |

## D4 before/after statistics

Direct `generateMap(seed, MAP)` seeds **1–10**, the same inputs as the D1 table above. Run seeds are derived separately by `createInitialState`. Baseline measured before editing; after measured with `npx vitest run src/sim/world/tuning.test.ts --silent=false`. “Longest river” counts tiles in the longest generated riverbed's downhill route (including a terminal basin), not all branches in a connected water region.

Seeds 1–10: mean hills **35.29% → 19.14%**, mean placeable **69.96% → 73.18%**. Maximum river route **3 → 10 tiles**; mean longest route **1.60 → 5.30 tiles**.

| Seed | Cluster sizes before → after | Hills before → after | Placeable before → after | Longest river before → after |
|---|---|---|---|---|
| 1 | 7 + 7 → 9 | 97 (34.64%) → 50 (17.86%) | 183 (65.36%) → 196 (70.00%) | 2 → 8 |
| 2 | 7 + 7 → 4 | 98 (35.00%) → 51 (18.21%) | 194 (69.29%) → 206 (73.57%) | 2 → 7 |
| 3 | 7 + 7 → 4 | 100 (35.71%) → 51 (18.21%) | 218 (77.86%) → 211 (75.36%) | 0 → 2 |
| 4 | 7 + 7 → 8 + 7 + 5 | 99 (35.36%) → 60 (21.43%) | 216 (77.14%) → 206 (73.57%) | 0 → 3 |
| 5 | 7 + 7 → 5 + 9 + 5 + 6 | 97 (34.64%) → 47 (16.79%) | 186 (66.43%) → 188 (67.14%) | 2 → 6 |
| 6 | 7 + 7 → 8 + 10 | 98 (35.00%) → 53 (18.93%) | 206 (73.57%) → 212 (75.71%) | 1 → 3 |
| 7 | 7 + 7 → 7 + 7 + 10 | 108 (38.57%) → 53 (18.93%) | 206 (73.57%) → 210 (75.00%) | 2 → 2 |
| 8 | 7 + 7 → 3 + 7 + 3 | 95 (33.93%) → 45 (16.07%) | 180 (64.29%) → 215 (76.79%) | 2 → 4 |
| 9 | 7 + 7 → 6 + 6 + 3 | 98 (35.00%) → 60 (21.43%) | 182 (65.00%) → 201 (71.79%) | 3 → 8 |
| 10 | 7 + 7 → 9 + 8 | 98 (35.00%) → 66 (23.57%) | 188 (67.14%) → 204 (72.86%) | 2 → 10 |

Full after mix (full before mix is retained in the D1 table):

| Seed | Plain | Hill | Mountain | Riverbed | Basin | Woods | Marsh |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 146 | 50 | 9 | 41 | 5 | 19 | 10 |
| 2 | 155 | 51 | 4 | 33 | 7 | 16 | 14 |
| 3 | 160 | 51 | 4 | 5 | 11 | 24 | 25 |
| 4 | 146 | 60 | 20 | 13 | 11 | 13 | 17 |
| 5 | 141 | 47 | 25 | 16 | 12 | 13 | 26 |
| 6 | 159 | 53 | 18 | 16 | 6 | 14 | 14 |
| 7 | 157 | 53 | 24 | 10 | 6 | 19 | 11 |
| 8 | 170 | 45 | 13 | 13 | 3 | 23 | 13 |
| 9 | 141 | 60 | 15 | 25 | 2 | 16 | 21 |
| 10 | 138 | 66 | 17 | 26 | 5 | 14 | 14 |

Across **200 seeds**: all cluster counts 1–4 and all component sizes 3–10 occur; hills **42–69 tiles (15.00–24.64%, mean 19.09%)**. Placeable mean **73.53%**, range **63.93–83.57%**; **194/200 maps** fall inside 65–80%. These six mild outliers are reported, never rejected/regenerated. **65/200 maps** have a river route longer than five tiles; maximum **12**. All seeds 1–10 now have riverbeds. Mountain count and hill budget are seeded draws, followed by connected construction; no map validation loop, retry, dependency, contract change, or economy rebalance was added.

D4 regressions cover connected mountain count/size variety, hill/placeable distributions, recurring longer rivers, flat routing only toward a lower outlet, bounded lookahead, deterministic flat-route ties and suffix consistency. Existing 200-seed hill rules, four-level maps, monotone water, terrain preservation, replay and performance tests pass unchanged. The new long-river test asks that they recur (at least 50/200 seeds), not that every map contain one; this matches the designer's “allow longer rivers.”

## Balance log

### N8 v4 round 4 — food/water spending
- Round3 committed `6168e56` and passes all higher-priority targets. Keep thresholds, yields and rewards unchanged. Starting water/food **0/0→8/8**; wood/stone remain6/6. For food/water producers, set the corresponding cost to at least its raw yield. This spends produced stock while retaining existing wood/stone access costs; the reserve covers initial costs and negative polar-oasis modifiers. This is literal data tuning, not a new upkeep rule.
- Exact cost edits: gatherers_hut food 0→2; farm food 0→4; oasis_well water 0→3; glass_kiln water 2→3; ice_drill water 0→4; glacier_pump water 0→4; ice_fishery water 0→1; ice_fishery food 0→2; grain_fields food 0→4; windmill food 0→3; trapper_lodge food 0→3; hot_spring water 0→3; hot_spring food 0→2; lichen_farm food 0→4; salt_mine food 0→1; frost_kiln water 0→3.

- Results: **50/50 combo wins, 46/50 spam losses**, zero combo opening stalls/false declarations; median winning board use **68.76%**. Targets **1/2/3/4/6 PASS**, **5 MISS**. T7 median stock W/S/A/F **665.5/266.5/657/596→665.5/262/458.5/479**; worst checkpoint median ratio becomes finite **300.5×**, still far above3×. T7 max remains59.80%. Ten harness checks, ten guardrail checks and typecheck pass (measurement135.05s with replay).

### N8 v4 round 3 — last-core wood gate
- Round 2 committed `d010e37`. T7 wood **650→550**; every other number unchanged. Seed41 is the only late T7 run, with wood556 and all other T7 requirements already met at its T6 (356/597 slots). Matching T6 wood while retaining higher T7 stone/water/food allows its next transaction to award the last core just under60%. Non-decreasing thresholds explicitly permit equality.

- Results: **50/50 combo wins, 46/50 spam losses**, no combo opening stalls or detected false declarations. Median win use **69.28%**. Targets **1/2/3/4/6 PASS**, **5 MISS**. T7 median/max **37.60/59.80%**, all50 before60%; seed41 earns it at357/597 slots. Ten harness checks pass (136.05s including replay). Preserve this configuration as the safe candidate while using remaining rounds on lowest-priority stock pressure.

### N8 v4 round 2 — earlier last cores
- Round 1 committed `b348140`. Keep its costs and final goal. T6 W/S/A/F **850/740/550/120→550/470/270/120**; T7 **1050/920/690/220→650/550/350/150**. Round 1 had 25 late T7 seeds (max89.45%); bring both gates forward, without changing T8, to test core timing while preserving higher-priority 50 wins/46 spam losses and median69.47% winning board use.

- Results: **50/50 wins, 46/50 spam losses**, zero combo opening stalls/false declarations; median win board use **69.28%**. Targets **1/2/3/4 PASS**, **5/6 MISS**. T7 median/max improves **59.43/89.45%→37.86/68.34%**; only seed41 remains late. Its T6 is placement356 (59.63%), held lifetime wood556; T7 waits for wood650 until placement408. All ten harness checks pass.

### N8 v4 round 1 — opening repairs
- Preparation committed `fb652be`; S8 prerequisite `c63b56d` is present. Starting from selected v3, Hillside Mine cost wood **2→0**, Oasis Well cost stone **3→1**. Starting stock, yields, rewards and thresholds unchanged. These exact failures exhausted seed 35 wood and seed 37 stone after three placements; zero-cost mining and cost-neutral well stone allow the fixed greedy policy to finish high-yield sites and continue. Both are within v4 costs 0–8; lowest-priority spending pressure may worsen and will be reported.
- Results: **50/50 combo wins**, **46/50 spam losses**, zero detected false soft-locks, zero combo opening stalls (35/37 now win at 440/429 placements), median winning board use **69.47%**. Targets **1/2/3/4 PASS**, **5/6 MISS**; T7 median/max **59.43/89.45%**, 25 late seeds. Spam seeds 5/18 win, 23/35 are unproven stalls and excluded from losses. Stock-pressure worst checkpoint median ratio is infinite (positive stock, zero resource cost).
- Validation: all 10 opt-in harness checks pass (139.97 s including replay), 125 scoped tests pass, typecheck passed at preparation. Round archive `tests/balance/v4-round-1.json`; no outside-owner failure observed.

### N7 final selection — round 3 retained

Final verification: **124 owned/scoped tests pass, 8 opt-in skips** (11.20 s); **16 config/report checks pass**; `npm run typecheck` passes. Source diff versus `f6b6d45:src/config/economy.ts` is empty. Deep comparison confirms all selected economy values match `v3-round-3.json` and every non-threshold field matches the original v2 round-4 archive. No new outside-owner issue found; no edits/staging of parallel agents’ files.

Four measured commits: round 1 `cf27db5`, round 2 `1a2c142`, round 3 `f6b6d45`, round 4 `d04593b`. Restore round-3 T6 **wood 900→850, stone 760→740, water 575→550**; food remains 120. This restores the exact measured source, not a fifth candidate. Relative to the v2 round-4 baseline, final changes are T4 wood **260→240**, T6 food **170→120**, plus T7 **1050/920/690/220** and T8 **1300/1150/850/270** (wood/stone/water/food). Everything outside the thresholds is identical to the baseline.

| Round | Combo T6 / wins | T4–T6 advantage | Pacing | Min spam T6 fill | Selection |
|---|---|---|---|---|---|
| 1 | 48/50 / 48/50 | T6 unmeasurable | T4 misses | 59.44% | Extra cores solve coverage |
| 2 | 48/50 / 48/50 | PASS | T4 misses | 59.44% | Finite T6 ratio restored |
| 3 | 48/50 / 48/50 | PASS | PASS | 59.44% | **Retained** |
| 4 | 48/50 / 48/50 | T6 unmeasurable | PASS | 61.58% | Higher-priority target 2 lost |

Only combo seeds **35 and 37** stop without winning, both at three placements: seed 35 spends all wood on three Hillside Mines (stock wood 0 / stone 30), despite its second core; seed 37 spends all stone on two Oasis Wells and a Palm Grove (stock wood 16 / stone 0 / water 28; lifetime stone 2 < T1's 16). They remain exactly the accepted baseline limitations. This is a greedy-bot outcome, not an exhaustive proof about every player strategy. All nine previous core-coverage stalls win with v3. Selected T7/T8 reached-only median fills are **60.02% / 69.69%**; median threshold placements **362.5 / 433.5** precede all-seed median win **613.5**. Early spam T6 seeds: **3,8,18,19,37,45,47**; worst **37 at 59.44%**, so target 3 remains a clear miss.

### N7 v3 round 4 — conservative late-spam delay

Round 3 committed `f6b6d45`. Final allowed round: T6 **wood 850→900, stone 740→760, water 550→575**, food stays 120. Keep every other gate/reward unchanged. This raises the resources binding early spam completions while staying below the previously observed 26-completer final floors (wood 915, stone 771, water 612). Those final totals are a candidate-screening observation, not a prediction that altered bot paths are identical. Preserve target priority 4 > 2 > 1 > 3; revert if higher-priority results worsen. If target pass/fail results tie, prefer the higher minimum spam T6 fill while retaining 48 wins and pacing.

Result: **48/50 T6 and wins**, zero declarations. Pacing still passes (T6 median **323**, T7/T8 **362.5/433.5**). Minimum spam T6 fill improves **59.44%→61.58%**, but spam completions fall **26→25/50**, so the all-seed median becomes unreached and target 2 is **unmeasurable**. Seed 14 now fills 546 living slots before earning T6; its additional-core-funded final lifetime from the previous round was not a pre-threshold guarantee. Targets 4/1 pass, target 3 still misses. All 8 harness checks and 16 config/report checks pass; **181.33 s** measurement. Select **round 3** by 4 > 2 > 1 > 3; no fifth calibration.

### N7 v3 round 3 — preserve pacing on the larger sample

Round 2 committed `1a2c142`. Change **only T4 wood 260→240** (−7.7%), leaving its other resources and all seven other gates fixed. The only pacing miss is median T4 110.5 versus the 108 upper bound; near-median late runs (e.g. seeds 14/47) are wood-bound. This small correction preserves the established progression shape while targeting the approved 50-seed pacing band. No changes to T1–T3/openings, stock, costs, yields, recipes or map.

Result: **targets 4, 2 and 1 pass**. T4 median **110.5→105**; combo medians **2 / 23.5 / 47.5 / 105 / 180.5 / 312 / 362.5 / 433.5**; **48/50 T6 and wins**, zero declarations. T4–T6 spam/combo ratios **3.46 / 2.74 / 1.96**, with 26/50 spam T6 completers. Target 3 still misses: minimum **59.44%**, median **87.15%**. Both late medians precede median win 613.5. Measurement **176.80 s**; 8 harness checks, 16 config/report tests, typecheck pass.

### N7 v3 round 2 — measurable T6 comparison

Round 1 committed `cf27db5`. Change **only T6 food 170→120**, equal to the T5 food gate; preserve all other thresholds/rewards. The prior 50-seed archive has four otherwise-qualified spam runs with final food 136/123/162/130 (seeds 1,6,25,48); this should move T6 completers from 22 to at least 26, enough for a finite all-seed median. Keep T6 wood/stone/water gates and the observed late-core pacing, with no attempt to rescue the two accepted opening stalls. Priority 2 is ahead of the no-coasting target; record any resulting early-fill regression honestly.

Result: every combo run is exactly unchanged from round 1: **48/50 T6 and wins**, medians **2 / 23.5 / 47.5 / 110.5 / 181 / 312.5 / 363 / 433.5**, zero declarations. Spam T6 rises **22→26/50**, giving median **610** and T4–T6 ratios **3.30 / 2.74 / 1.95**. Targets 4 and 2 pass; T4 pacing remains the only target-1 miss, minimum spam fill remains **59.44%**. All 8 harness checks pass; 172.68 s measurement; 16 config/report checks and typecheck pass.

### N7 v3 round 1 — append-only baseline

Keep every round-4 economy value and all T1–T6 gates. Append T7 `{wood:1050,stone:920,water:690,food:220}` and T8 `{wood:1300,stone:1150,water:850,food:270}`: about 1.25× and 1.55× T6 resource gates, steeper in all four resources, intended to land near 360/450 placements while funding the last 1–2 core sites. No opening repair, stock/cost change, yield/combo change or map change. Harness/report now includes all eight thresholds, late fills and final legal-site counts; 16 config/report tests and typecheck pass. Result: **48/50 T6, 48/50 wins, zero declarations** (v2: 48/50 T6, 39/50 wins). All nine core-coverage stalls are recovered; only accepted openings 35/37 remain. Combo medians **2 / 23.5 / 47.5 / 110.5 / 181 / 312.5 / 363 / 433.5**; T7/T8 precede median win **613.5**. Target 4 passes; target 1 misses only T4, target 2 is unmeasurable at T6 (22/50 spam completers), target 3 misses (minimum 59.44%). Measurement **175.74 s**, all 8 harness tests pass. Scoped 124 tests and typecheck pass.

### N1 — exact designer v2 baseline

Reason: designer v1 playtest found spam dominating and T8 at ~32% fill. This item copies v2 exactly; independent measurements begin in N2. Frozen costs, names, rosters, terrain/zone bonuses and starting stock are unchanged. V2 snapshot in `src/sim/economy/__fixtures__/economy-v2.json` anchors automated guardrail checks.

| Value | v1 → v2 |
|---|---|
| `sawmill` yield | wood 6 → wood 5 |
| `stonemason` yield | stone 6 → stone 5 |
| `glass_kiln` yield | stone 5, water 3 → stone 3, water 3 |
| `ice_drill` yield | water 4 → water 3 |
| `glacier_pump` yield | water 6 → water 5 |
| `grain_fields` yield | food 5 → food 4 |
| `resin_works` yield | wood 6 → wood 5 |
| `lichen_farm` yield | food 5 → food 4 |
| `frost_kiln` yield | stone 3, water 3 → stone 2, water 3 |
| `timber_line` payout | wood 3 → wood 5 |
| `homestead` payout | wood 2, food 2 → wood 3, food 3 |
| `forest_camp` new recipe | lumber_camp + gatherers_hut; wood 3, food 3 |
| `woodland_village` payout | wood 6, food 4 → wood 7, food 6 |
| `cut_stone` payout | stone 3 → stone 5 |
| `oasis_town` payout | water 2, wood 2 → water 3, wood 3 |
| `desert_outpost` new recipe | quarry + palm_grove; stone 3, wood 2 |
| `sun_citadel` payout | stone 6, water 3 → stone 8, water 5 |
| `ice_mine` new recipe | ice_drill + scree_quarry; water 3, stone 3 |
| `harbor` payout | food 2, water 2 → food 3, water 3 |
| `frontier_outpost` payout | wood 2, stone 2 → wood 3, stone 3 |
| `polar_base` payout | water 6, food 2 → water 8, food 4 |
| `bread_road` payout | food 4 → food 6 |
| `frontier_farm` payout | food 3, wood 1 → food 4, wood 2 |
| `market_town` payout | wood 4, stone 4, food 2 → wood 5, stone 5, food 4 |
| `fur_trade` payout | food 4 → food 6 |
| `resin_mill` payout | wood 4 → wood 6 |
| `spa_village` payout | water 4, food 4 → water 6, food 7 |
| `salt_cure` payout | food 3, stone 2 → food 4, stone 2 |
| `frost_glass` payout | water 3, stone 2 → water 4, stone 2 |
| `lichen_terraces` payout | food 5, water 3 → food 7, water 6 |
| `lichen_terraces` recipe | lichen_farm + lichen_farm + oasis_well → lichen_farm + oasis_well + frost_kiln |
| `foragers_circle` | removed duplicate-building pair |
| `twin_quarries` | removed duplicate-building pair |
| `meltwater` | removed duplicate-building pair |
| adjacency | wood 1, stone 1, water 1, food 1 → wood 2, stone 2, water 2, food 2 |
| T1 | wood 12, stone 12 → wood 15, stone 15 |
| T2 | wood 35, stone 30 → wood 60, stone 50 |
| T3 | wood 65, stone 55, water 15 → wood 130, stone 110, water 45 |
| T4 | wood 110, stone 95, water 40, food 20 → wood 300, stone 250, water 140, food 110 |
| T5 | wood 170, stone 145, water 70, food 50 → wood 560, stone 470, water 260, food 210 |
| T6 | wood 240, stone 210, water 110, food 90 → wood 950, stone 800, water 450, food 370 |
| T7 | wood 330, stone 285, water 160, food 135 → removed |
| T8 | wood 440, stone 380, water 225, food 190 → removed |

N1 scoped check: `npx vitest run src/sim src/config tests/acceptance tests/balance` — **158 passed**, 14 files, 3.36 s. Typecheck passes. Full `npm test`: 250 passed, 1 failed (sol tutorial fixture), 1 skipped; 114.06 s. Full run began before the final guardrail case was added; the later scoped 158-test run includes it. Tutorial failure reproduced and routed above.

### N2 — untuned v2 measured baseline

No balance values changed. Real-session harness (`tests/balance`) finished seeds 1–20 × both bots in **90.54 s**, plus replay/unit verification: **2 tests pass**, total **106.22 s**; default run skips both tests (132 ms). Typecheck passes. `baseline.json` preserves exact config and all run data; `REPORT.md` records every target and seed.

Baseline combo T6 **9/20**, wins **7/20**, spam T6/wins **0/20**, **zero soft-lock declarations**. Ten combo runs and eighteen spam runs do not reach T1; all-seed medians are consequently unreached. Among combo completers, medians T1–T6 are **14.5 / 47.5 / 77 / 113 / 280 / 394** (completion counts **10 / 10 / 9 / 9 / 9 / 9**). Every target is missed or unmeasurable. Ten combo runs stop after only three high-yield buildings, spending all available wood (or wood+stone) without producing either required T1 resource. This is a bot/economy guardrail issue, not a Sonnet soft-lock bug: the detector conservatively allows demolition escape and never declares loss. Seeds 12 and 18 reach T6 but fill all living slots while legal core sites remain; N3 will quantify the seven-core ceiling before reporting a frozen-limit blocker.

### N3 round 1 — thresholds only

Threshold-only round scales the reached-run baseline toward 7/22/45/90/160/270. It improves reachable-run timing, but leaves the same ten three-placement openings stuck: missing lifetime resources cannot meet any positive threshold. Target 2 therefore remains unmeasurable; round 2 is justified in trying allowed yield adjustments to make productive recipe paths affordable.

| Value | Before → after |
|---|---|
| T1 | wood 15, stone 15 → wood 7, stone 7 |
| T2 | wood 60, stone 50 → wood 28, stone 23 |
| T3 | wood 130, stone 110, water 45 → wood 76, stone 64, water 26 |
| T4 | wood 300, stone 250, water 140, food 110 → wood 240, stone 200, water 112, food 88 |
| T5 | wood 560, stone 470, water 260, food 210 → wood 320, stone 270, water 150, food 120 |
| T6 | wood 950, stone 800, water 450, food 370 → wood 650, stone 550, water 310, food 255 |

Before: combo T6 9/20, wins 7/20; spam T6 0/20; 0 soft-lock declarations; combo all-seed medians unreached / unreached / unreached / unreached / unreached / unreached.

After: combo T6 9/20, wins 7/20; spam T6 0/20; 0 soft-lock declarations; combo all-seed medians unreached / unreached / unreached / unreached / unreached / unreached. Measurement 80.47 s. Exact configuration/run archive: `tests/balance/round-1.json`.

### N3 round 2 — opening producer yields

Within ±1 of v2, improve wood production and cheap Arctic recipe starters. This rescues six wins versus round 1 and reaches T6 in 15/20. Serial measurement exceeded the two-minute budget; four native Node test workers reduce it to the recorded time with identical results for all 40 runs. The suite cross-checks worker seed 1 against a real Vitest-session replay. No engine mocks, model agents, or outside-owner changes.

| Value | Before → after |
|---|---|
| `lumber_camp` yield | wood 4 → wood 5 |
| `hillside_mine` yield | stone 3 → stone 2 |
| `sawmill` yield | wood 5 → wood 6 |
| `palm_grove` yield | wood 3 → wood 4 |
| `driftwood_camp` yield | wood 3 → wood 4 |
| `scree_quarry` yield | stone 3 → stone 4 |
| `ice_drill` yield | water 3 → water 4 |
| `glacier_pump` yield | water 5 → water 4 |

Before: combo T6 9/20, wins 7/20; spam T6 0/20; 0 soft-lock declarations; combo all-seed medians unreached / unreached / unreached / unreached / unreached / unreached.

After: combo T6 15/20, wins 13/20; spam T6 3/20; 0 soft-lock declarations; combo all-seed medians 11.0 / 14.5 / 36.0 / 98.5 / 134.5 / 249.0. Measurement 76.78 s. Exact configuration/run archive: `tests/balance/round-2.json`.

### N3 round 3 — bootstrap construction resources

Bootstrap T1 on stone alone before Forest construction stock is exhausted; add two stone to Polar Base (14 total) to fund the Arctic seed-13 recovery. Target 4 now PASSES: 20/20 reach T6, 18/20 win, zero declarations. The remaining two runs (12,18) spend all seven available cores, fill every living slot, and each retain exactly one legal core site. Those require one additional core, beyond the frozen six-threshold limit. T1 is deliberately too fast to keep the highest-priority reachability target.

| Value | Before → after |
|---|---|
| T1 | wood 7, stone 7 → wood 0, stone 16 |
| `polar_base` payout | water 8, food 4 → water 8, food 4, stone 2 |

Before: combo T6 15/20, wins 13/20; spam T6 3/20; 0 soft-lock declarations; combo all-seed medians 11.0 / 14.5 / 36.0 / 98.5 / 134.5 / 249.0.

After: combo T6 20/20, wins 18/20; spam T6 6/20; 0 soft-lock declarations; combo all-seed medians 2.0 / 11.5 / 38.0 / 84.0 / 115.0 / 230.5. Measurement 98.75 s. Exact configuration/run archive: `tests/balance/round-3.json`.

### N3 round 4 — pacing and measurable late comparison

Retain the 20/20 T6 and 18/20 win rescue while shifting late pacing toward targets. Food 170 makes eleven spam T6 completions observable; larger wood/stone/water targets delay them. Target 2 now passes with finite all-seed medians. Four spam seeds still reach T6 below 70% fill (3,8,18,19); their exact threshold-time lifetimes guide the final rounds.

| Value | Before → after |
|---|---|
| T2 | wood 28, stone 23 → wood 50, stone 45 |
| T3 | wood 76, stone 64, water 26 → wood 100, stone 85, water 40 |
| T4 | wood 240, stone 200, water 112, food 88 → wood 260, stone 220, water 120, food 90 |
| T5 | wood 320, stone 270, water 150, food 120 → wood 450, stone 380, water 200, food 120 |
| T6 | wood 650, stone 550, water 310, food 255 → wood 850, stone 740, water 550, food 170 |

Before: combo T6 20/20, wins 18/20; spam T6 6/20; 0 soft-lock declarations; combo all-seed medians 2.0 / 11.5 / 38.0 / 84.0 / 115.0 / 230.5.

After: combo T6 20/20, wins 18/20; spam T6 11/20; 0 soft-lock declarations; combo all-seed medians 2.0 / 21.0 / 44.0 / 93.0 / 173.5 / 299.0. Measurement 97.41 s. Exact configuration/run archive: `tests/balance/round-4.json`.

### N3 round 5 — maximum safe bootstrap and late water

The delayed bootstrap keeps reachability and improves T1 from 2 to 3 placements, but water 625 removes the eleventh spam T6 completion, making its all-seed median unreached again. Minimum spam fill remains 66.49%. By priority 4 > 2 > 1 > 3, round 4 remains the better fallback. Final round will test a +1 wood yield on Hillside Mine (missing resource is zero under CONTRACTS), allowing a later first gate without changing frozen starting stock/costs.

| Value | Before → after |
|---|---|
| T1 | wood 0, stone 16 → wood 0, stone 24 |
| T6 | wood 850, stone 740, water 550, food 170 → wood 850, stone 740, water 625, food 170 |

Before: combo T6 20/20, wins 18/20; spam T6 11/20; 0 soft-lock declarations; combo all-seed medians 2.0 / 21.0 / 44.0 / 93.0 / 173.5 / 299.0.

After: combo T6 20/20, wins 18/20; spam T6 10/20; 0 soft-lock declarations; combo all-seed medians 3.0 / 21.0 / 45.0 / 89.0 / 173.5 / 299.0. Measurement 97.62 s. Exact configuration/run archive: `tests/balance/round-5.json`.

### N3 round 6 — mine construction yield and later first core

Final permitted round tests the literal sparse-resource +1 guardrail. A later first gate still leaves five greedy openings stuck, reducing T6/wins to 15/20 and 13/20. The experiment is rejected by target priority. Stop calibration at six rounds and restore round 4, the only round passing both targets 4 and 2 with T2–T6 pacing within bands.

| Value | Before → after |
|---|---|
| T1 | wood 0, stone 24 → wood 0, stone 42 |
| T2 | wood 50, stone 45 → wood 50, stone 50 |
| T6 | wood 850, stone 740, water 625, food 170 → wood 850, stone 740, water 550, food 170 |
| `hillside_mine` yield | stone 2 → stone 2, wood 1 |

Before: combo T6 20/20, wins 18/20; spam T6 10/20; 0 soft-lock declarations; combo all-seed medians 3.0 / 21.0 / 45.0 / 89.0 / 173.5 / 299.0.

After: combo T6 15/20, wins 13/20; spam T6 8/20; 0 soft-lock declarations; combo all-seed medians 8.5 / 28.5 / 48.0 / 111.0 / 179.0 / 315.0. Measurement 64.24 s. Exact configuration/run archive: `tests/balance/round-6.json`.

### N3 final selection — round 4 retained

Restore round 4 `7b2aa4c`: T1 **wood 0, stone 16**; T2 **50/45**; T3 **100/85/40**; T4 **260/220/120/90**; T5 **450/380/200/120**; T6 **850/740/550/170** (wood/stone/water/food, omitted resources zero). Restore Hillside Mine to **stone 2 only** (experimental wood 1→0). Other round-2 yields and Polar Base **water 8 / food 4 / stone 2** remain.

Final combo medians **2 / 21 / 44 / 93 / 173.5 / 299**. Spam/combo T4–T6 ratios **2.94 / 2.51 / 1.90**. T6 combo **20/20**, wins **18/20**, zero soft-lock declarations. Targets **2 and 4 pass**; target 1 misses T1 only, target 3 misses seeds **3/8/18/19** (minimum fill **64.70%**, required 70%). Exact before/after records and all six configurations remain in `tests/balance/round-*.json` and git history.

**Designer decisions / guardrail limits:** six rounds are exhausted, not a proof that every allowed value combination is impossible. Keeping current resource channels, the four mine-only Forest openings can afford only three mines from starting wood 6, so delaying their first core past three actions needs a frozen cost/stock change: mine wood cost **2→1**, or starting wood **6→at least 12** to fund the earliest six-placement T1 target. Those are necessary local funding amounts, not a verified global rebalance; the allowed +1 wood mine experiment failed elsewhere and was rolled back. For the measured bot routes on seeds **12 and 18**, the observed seven-core ceiling is exact: after all six thresholds, each has **one legal core site**, **zero held cores**, **zero empty living slots**. An **additional seventh threshold / eighth total core** would fund that final site, but exactly six thresholds is frozen, so it is not implemented. Target 3's four early spam completions conflict with keeping eleven finite spam T6 completions in the tested gates (round 5 reduces that to ten). Further refinement needs designer direction/new calibration, not a hidden guardrail relaxation.

## N4 world-size readiness

Default `MAP.cols/rows` remain 20×14. A fixed 1–4 cluster count produced sub-15% hills on 43/200 seeds at 26×18 and 48/200 at 30×20 (minimum 9.62%/8.00%). Area-scaled cluster budgets restore 15–25% hill coverage on all 400 larger maps. Generation is constructive, with no rejection or regeneration.

| Size | Mean placeable | Range | Seeds inside 65–80% | Generation mean / maximum |
|---|---:|---:|---:|---:|
| 26×18 | 73.41% | 66.03–81.41% | 198/200 | 2.365 / 3.809 ms |
| 30×20 | 73.40% | 67.00–81.83% | 199/200 | 3.702 / 4.889 ms |

New tests cover replay, indexing, all terrain types, mountain height, integer elevation, hill-only paths, ascending approach limits, neighbor supports, basin minima, downhill river paths without cycles, coverage and the 40 ms generation bound. Scoped suite: **162 passed, 5 opt-in skipped**, 10.52 s; typecheck and owned diff checks pass. Default-map seeds 1–200 match the pre-N4 output hash exactly.

26×18 balance preview (unchanged economy): **169.85 s**, 5 harness checks pass. Combo medians **4 / 24.5 / 62 / 105 / 151.5 / 297**; T6 **17/20**, wins **0/20**, zero soft-lock declarations. All 17 T6 completers use seven cores, fill every living slot, and retain **9–32 legal core sites**; the other three stop at three placements. This is a size-design limitation, not a generator invariant failure. Do not enlarge the shipping map without revisiting core coverage/availability and opening economy. Full rows/config are in `tests/balance/REPORT.md` and `size-26x18.json`.

## N6 preview performance and expanded confirmation

Preview now copies only mutation targets while reusing the real placement transaction. **2,592** exact comparisons against the previous full-clone implementation pass across 72 seeded boards (6×5, 20×14, 30×20), histories, demolition, conversion, discovery subsets, sparse wallets, locks, invalid input and ended statuses. All inputs are recursively frozen, and mutating returned payout maps leaves them unchanged. Coverage includes 392 nonempty base previews, 56 pair payouts, 15 triple payouts, 537 paid-slot cases and 2,055 unaffordable quotes.

Default-board benchmark (five batches of 200 calls, medians): **0.7286 ms → 0.0286 ms**, **25.4× faster**. Economy suite **48 passed** in 3.42 s; typecheck passes. Timing is test-only; no gameplay decisions use clocks. Fifty-seed confirmation is running with the retained round-4 config; no further calibration will occur.

Fifty-seed confirmation completed in **169.01 s**, all 5 opt-in checks pass. Every seed-1–20 spam/combo record is **exactly identical** to the retained round-4 archive. Extending to 50 shows the tuning sample is not representative of win reliability:

| Metric | Seeds 1–20 | Seeds 1–50 |
|---|---|---|
| Combo threshold medians | 2 / 21 / 44 / 93 / 173.5 / 299 | 2 / 23.5 / 47.5 / 110.5 / 181 / 312.5 |
| T4–T6 spam/combo | 2.94 / 2.51 / 1.90 | 3.30 / 2.74 / unmeasurable |
| Combo T6 | 20/20 | 48/50 |
| Combo wins | 18/20 | 39/50 |
| Spam T6 | 11/20 | 22/50 (all-seed median unreached) |
| Minimum spam T6 fill | 64.70% | 59.44% |
| Soft-lock declarations, either bot | 0 | 0 |

T2/T3/T5/T6 medians shift by only 4–12%, but T4 shifts by 18.8% and exceeds its 108-placement upper band. The finite spam T6 comparison and 90% win target **do not generalize**. All four full target checks miss or become unmeasurable at 50 seeds; retain the designer's stated 20-seed calibration result while clearly flagging this larger-sample evidence. No new tuning round was run.

Nine combo routes exhaust seven cores and fill all living slots with legal sites remaining: seeds **12,18,40,48** retain one; **30,38,39,45,46** retain two. This describes these greedy bot routes, not a proof that every possible player route needs extra cores. Seed **35** gets T1, then three Hillside Mines consume all wood (stock wood 0 / stone 30); the second selected biome does not provide an affordable escape. Seed **37** stops after two Oasis Wells and a Palm Grove (stock wood 16 / stone 0 / water 28; lifetime stone 2 < T1 stone 16). Both have empty living slots; no engine soft-lock declaration occurs. Early spam T6 seeds are **3,8,18,19,37,45**, with seed 37 at **59.44%**.

Final validation: scoped **164 passed / 5 opt-in skipped**, 10.31 s; C3 alone **36 passed**, 0.564 s; full suite **273 passed / 1 Sonnet-owned test failure / 6 skipped**, 13.47 s. Sol's v2 tutorial fixture is confirmed fixed. `npm run typecheck`, `npm run build`, and owned-path diff checks pass. Build has only the existing >500 kB bundle advisory. Sol's uncommitted rendering work remains untouched and unstaged.
