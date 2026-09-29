# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IDLE — available. C0/C1/C2/C0b complete; C3 acceptance suite delivered with all known dependency failures reported. Recheck C3 when deepseek D1/D2/D3 land.

## Done
- C0 — labelled placeholder economy, 3 config tests green, typecheck green — `da92228`.
- C1 — atomic placement, combo discovery/history, completion and adjacency; 23 scoped tests and typecheck green — `e6f34de`.
- C2 — demolition, clone preview, lifetime thresholds; 39 scoped tests and typecheck green — `a5bf5d7`.
- C3 — independent public-contract acceptance suite: 20 spread cases, 5 world cases across seeds 1–50, 8 win/soft-lock cases, 3 real-session progression cases. 21 pass, 15 reported expected failures; under 0.5 s (DoD <10 s). Tests — `f20f916`; tuning-independent endgame fixture follow-up — `7144980`.
- C0b — exact designer-approved economy v1, literal tables and 7 data-integrity tests; 43 economy + 21 acceptance tests pass, 15 reported expected failures; typecheck green — `7144980`.

## Blockers
- No outstanding astra implementation blocker. Full acceptance verification awaits deepseek D1/D2/D3; these are expected failures, not verified successes. Rechecked after C0b: all three dependencies remain stubs.

## Decisions
- §27–§31: recipe multiset collisions use the first matching config recipe per pair/triple. Placeholder recipes are unique; config order breaks any accidental duplicate deterministically.
- §35/§53: adjacency qualification is isolated in `adjacencyQualifies`; any current neighboring combo qualifies, even on two occupied slots or previously paid slots.
- §9: pending-offer modal gating belongs to GameSession; economy validates its explicit placement contract.
- §38: unaffordable legal placements still project payouts; invalid placements project no payouts. `affordable` reports cost affordability only.
- §6 acceptance interpretation: three-hill approach routes follow strictly ascending one-level edges; arbitrary sideways terrace walks have no specified direction and are not counted as approach chains. Fifty-seed presence checks prevent flat-map stubs from passing hill/natural checks vacuously.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
- C3-WORLD · owner deepseek · `generateMap(seed, DEFAULT_CONFIG.map)`, seeds 1–50 · expected generated hills/mountains/natural terrain satisfying §6–§7 · actual all 14,000 tiles are plain/elevation 0, so terrain scenarios T1–T4 cannot exercise their subjects. Four `it.fails` cases retained in `tests/acceptance/world.test.ts`; deterministic replay passes.
- C3-END · owner deepseek · developed 3×1 boards, unreachable dead tile, unusable held core, and five §44 progression-action fixtures · expected boolean win/soft-lock decisions under §41–§44 · actual `NOT_IMPLEMENTED: checkWin` / `NOT_IMPLEMENTED: isProvablySoftLocked`. Eight `it.fails` cases retained in `tests/acceptance/endgame.test.ts`.
- C3-SESSION · dependency owner deepseek (D2/D3), session owner sonnet · real `createGameSession` with seed 1 and fixture thresholds, then `newRun(1)` · expected immediate offer and progression §57 cases 5–7 · actual `NOT_IMPLEMENTED: awardCore`. Three `it.fails` retained in `tests/acceptance/progression.test.ts`. P5 also checks the final tile flip interval; cannot reach that assertion until dependencies land.

## Notes for others
- Final verification: `npx vitest run src/sim/economy tests/acceptance` → 64 passed + 15 expected failures (79 cases), ~400 ms; `npm run typecheck` → green. All new/edited code is within astra ownership; no contracts or dependencies changed.
- After D2/D3 land, remove `it.fails` from passing session/endgame cases. P5 deliberately retains the spread lock through the final tile flip; inspect any remaining timing failure separately from missing dependencies.
- C0b: approved literal tables copied exactly. One-time independent Markdown-table comparison verified all 24 buildings, 6 ordered rosters, 21 recipes, 5 terrain rules, 6 zone modifiers, 8 thresholds and all scalar/resource fields. No retuning.
- C0b old-id search (`forest_a|_pair|_triple|_double` plus all generated roster ids) found no remaining hits in `src` or `tests`; no other owner migration needed. Endgame acceptance fixtures now define their own building/cost/yield data.
- C0b validation: 43 economy tests + 21 acceptance tests pass; 15 previously reported expected failures remain; typecheck green. Opus O4 should measure placements per threshold against the approved spec before any retuning.
- All economy contracts implemented; 43 scoped tests pass. Affordability rejection is `Insufficient resources`.
- Preview runs the placement transaction on a clone with sufficient projected funds, filters against ORIGINAL discoveries, and omits adjacency. Invalid placements return an empty payout projection. Paid slots return an empty base breakdown.
- Thresholds remain session-owned sequencing: call `advanceThreshold` only after the placement result is fully committed, then award the offer.
