# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IN PROGRESS: N3 round 1 — thresholds first, using reached-run pacing as a diagnostic while retaining all-seed failures in target checks. N2 committed `fd23f08`.

## Done
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
- None. Opus O5 passed D1; D4 follow-up review and O4 real-map pacing requested below.

## Decisions
- N3: prioritize target 4, then 2, 1, 3. Round 1 changes thresholds only, approximately scaling the untuned completers' pacing toward targets; this is not evidence that the censored seeds succeed. Stop after six measured rounds and keep the best reachable/winnable result rather than disguise stuck runs as favorable spam ratios.
- N2 measurement: both bots score every affordable building on each eligible hex, using its first empty slot (equivalent empty slots because these bots never demolish). Highest immediate total payout wins; combo bot ties favor more occupied hexes, then HexId/roster order. No resource weighting, cost penalty, lookahead, reshuffle, or rescue actions are added. Offer choice previews each option at its maximum-dead-placeable site and favors a newly represented mixed biome there, then fewer main-biome tiles, then option 0. Unreached thresholds are censored as infinity for all-seed medians, never silently dropped; reached-only ranges/counts are also reported. Stuck-without-affordable-action is distinct from a game soft-lock declaration.
- Overnight: follow N1–N5 sequentially, commit each item/round using explicit owned paths, and report outside-owner failures without edits. N0 already complete. Treat v2 table sparse yield keys as the permitted yield channels (±1 on listed resources); keep missing resources at zero unless a later designer decision authorizes a new channel.
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
- **N1 → sol:** `npx vitest run src/tutorial/tutorial.session.test.ts` fails at line 39 on seed 1. The real-session fixture uses Desert `quarry + quarry` / Arctic `ice_drill + ice_drill` and expects a pair payout; v2 deliberately removes both duplicate recipes. Use `quarry + palm_grove` / `ice_drill + scree_quarry`, or derive an affordable pair from config. Tutorial source/tests untouched.
- RESOLVED C3-WORLD: all-plain stub replaced by astra D1; T1–T4 now pass normally (`cc0e8e9`, `3950a22`, `d978f14`).
- RESOLVED C3-END / C3-SESSION stubs: astra D2 `0daa072` and sonnet D3 `c23be27` enabled real-module acceptance.
- RESOLVED C3-REFUNDS: sonnet `4909942` now handles the conservative two-demolition escape fixture; test passes with no expected-failure marker.
- RESOLVED C3-FLIP: sonnet `4909942` holds spread locks through the final tile flip; real-session P5 passes with no expected-failure marker.

## Notes for others
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
