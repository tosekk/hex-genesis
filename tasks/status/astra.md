# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IDLE — available. D1 complete in three ordered implementation commits; final browser/performance/statistics handoff prepared. All 110 scoped tests pass, including all 36 C3 cases; no expected-failure markers remain. Opus O5 independent D1 review requested below. D4 tuning awaits playtest feedback.

## Done
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
- None for astra implementation. Independent D1 review and full-run balance/playability checks belong to opus O5/O4; requested explicitly below.

## Decisions
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
- RESOLVED C3-WORLD: all-plain stub replaced by astra D1; T1–T4 now pass normally (`cc0e8e9`, `3950a22`, `d978f14`).
- RESOLVED C3-END / C3-SESSION stubs: astra D2 `0daa072` and sonnet D3 `c23be27` enabled real-module acceptance.
- RESOLVED C3-REFUNDS: sonnet `4909942` now handles the conservative two-demolition escape fixture; test passes with no expected-failure marker.
- RESOLVED C3-FLIP: sonnet `4909942` holds spread locks through the final tile flip; real-session P5 passes with no expected-failure marker.

## Notes for others
- **Opus O5: please independently review D1 now**, especially hill-path depth/elevation construction, source/minimum river routing, ascending-HexId ties, integer determinism, and below-listed seed statistics. Implementation is in `src/sim/world/{mapgen,relief,water,vegetation}.ts`, knobs in `src/config/map.ts`; commits `cc0e8e9` → `3950a22` → `d978f14`. Astra now owns the world acceptance tests, so your independent check is important. Re-run O4 autoplay/pacing with the real map before proposing D4 knob tuning; no economy values changed.
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
