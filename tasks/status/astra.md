# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IN PROGRESS: D1 step 1 — elevation, mountains, hills. Designer reassigned `src/sim/world/**` and `src/config/map.ts` to astra after retiring deepseek. C3 closeout verified before starting: 30 pass, 6 reported expected failures, 346 ms; prior test changes committed in `fa3edeb`.

## Done
- C0 — labelled placeholder economy, 3 config tests green, typecheck green — `da92228`.
- C1 — atomic placement, combo discovery/history, completion and adjacency; 23 scoped tests and typecheck green — `e6f34de`.
- C2 — demolition, clone preview, lifetime thresholds; 39 scoped tests and typecheck green — `a5bf5d7`.
- C3 — independent public-contract acceptance suite: 20 spread cases, 5 world cases across seeds 1–50, 8 win/soft-lock cases, 3 real-session progression cases. 21 pass, 15 reported expected failures; under 0.5 s (DoD <10 s). Tests — `f20f916`; tuning-independent endgame fixture follow-up — `7144980`.
- C0b — exact designer-approved economy v1, literal tables and 7 data-integrity tests; 43 economy + 21 acceptance tests pass, 15 reported expected failures; typecheck green — `7144980`.

- D2 — biome offers, first-offer distinctness, repeated-pair protection, reshuffle budget, final-pair history and stacked cores; 19 tests and typecheck green — `0daa072`. Designer reassigned offers ownership to astra.

## Blockers
- No outstanding astra implementation blocker. C3 now awaits deepseek D1 terrain plus the two sonnet fixes described below. D2 offers and D3 endgame are implemented; their old missing-dependency reports are resolved.

## Decisions
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
- C3-WORLD · owner deepseek · `generateMap(seed, DEFAULT_CONFIG.map)`, seeds 1–50 · expected generated hills/mountains/natural terrain satisfying §6–§7 · actual all 14,000 tiles are plain/elevation 0, so terrain scenarios T1–T4 cannot exercise their subjects. Four `it.fails` cases retained in `tests/acceptance/world.test.ts`; deterministic replay passes.
- RESOLVED C3-END / C3-SESSION missing implementations: D2 `0daa072` and sonnet D3 `c23be27` unblock real-module checks. Seven endgame cases and progression P6/P7 now pass normally; removed their old `it.fails` markers.
- C3-REFUNDS · owner sonnet (reassigned D3) · 3×1 restored forest board, empty stock, two occupied/paid slots containing fixture buildings costing `{wood:2,stone:2}`, remaining fresh empty slots, no cores/offers/spread · expected `isProvablySoftLocked === false` (§43–§44) · actual `true`. Concrete escape verified with real economy: demolish both buildings → `{wood:2,stone:2}` → build in unpaid slot 2 → `{wood:3,stone:3}` lifetime payout. One-refund lookahead incorrectly proves loss; a conservative fallback can avoid a full solver. Retained `it.fails` in `tests/acceptance/endgame.test.ts`.
- C3-FLIP · owner sonnet · real session seed 1, fixture thresholds yield two held cores, deploy one, call `advance(4650)` with `spreadMaxMs=5000`, `tileFlipMs=350` · expected `activeSpread !== null` and second core blocked through final tile flip (§11, §15; §57 Progression 5) · actual `activeSpread === null` at 4650 ms when last flip has just started. Retained P5 `it.fails` in `tests/acceptance/progression.test.ts`.


## Notes for others
- D1 step 1 verified: seeds 1–200 deterministic terrain/decorations, complete initial state, positive hill approaches and hill-path depth, four-level maps, generation <20 ms. World acceptance T1–T3 now pass normally; T4 still awaits natural terrain in steps 2–3.
- Opus O5 review requested: astra now implements D1 and owns its world acceptance tests, so please independently review terrain generation, hill-path constraints, river routing, determinism and seed statistics after the D1 step commits land.
- D1 delivery order: (1) elevation/mountains/hills; (2) riverbeds/basins; (3) woods/marsh. Each step will be tested and committed separately, followed by visual verification and seeds 1–10 statistics.
- D2 committed as requested (`0daa072`): 19 offers tests pass, including seeds 1–500 for first offers/reshuffles and all three repeated duplicate pairs; deterministic replay, terrain-stream isolation, stack/history handling, budget and failure atomicity covered. Opus/sonnet: offers no longer block real session or autoplay tests.
- Latest verification after D2: `npx vitest run src/sim/offers.test.ts src/sim/economy tests/acceptance` → 92 passed + 6 expected failures (98 cases), 380 ms. Breakdown: 19 offers + 43 economy + 30 acceptance pass. `npm run typecheck` and owned-path `git diff --check` green. Only astra-owned/reassigned files changed; no contracts or dependencies changed.
- D2/D3 are now real. Nine old expected-failure markers removed; remaining C3 failures: four flat-map terrain coverage cases (deepseek), two proven behavior bugs (sonnet).
- C0b: approved literal tables copied exactly. One-time independent Markdown-table comparison verified all 24 buildings, 6 ordered rosters, 21 recipes, 5 terrain rules, 6 zone modifiers, 8 thresholds and all scalar/resource fields. No retuning.
- C0b old-id search (`forest_a|_pair|_triple|_double` plus all generated roster ids) found no remaining hits in `src` or `tests`; no other owner migration needed. Endgame acceptance fixtures now define their own building/cost/yield data.
- C0b validation: 43 economy tests + 21 acceptance tests pass; 15 previously reported expected failures remain; typecheck green. Opus O4 should measure placements per threshold against the approved spec before any retuning.
- All economy contracts implemented; 43 scoped tests pass. Affordability rejection is `Insufficient resources`.
- Preview runs the placement transaction on a clone with sufficient projected funds, filters against ORIGINAL discoveries, and omits adjacency. Invalid placements return an empty payout projection. Paid slots return an empty base breakdown.
- Thresholds remain session-owned sequencing: call `advanceThreshold` only after the placement result is fully committed, then award the offer.
