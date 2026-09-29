# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IN PROGRESS: finishing current C3 acceptance files for commit, then C0b per human instruction. C3 will resume after C0b.

## Done
- C0 — labelled placeholder economy, 3 config tests green, typecheck green — `da92228`.

- C1 — atomic placement, combo discovery/history, completion and adjacency; 23 scoped tests and typecheck green — `e6f34de`.

- C2 — demolition, clone preview, lifetime thresholds; 39 scoped tests and typecheck green — `a5bf5d7`.

## Blockers
<!-- what, waiting on whom -->

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
- All economy contracts now implemented; 39 scoped tests pass. Affordability rejection is `Insufficient resources` (compatible with sonnet preview routing).
- Preview runs the placement transaction on a clone with sufficient projected funds, filters against ORIGINAL discoveries, and omits adjacency. Invalid placements return an empty payout projection. Paid slots return an empty base breakdown.
- Thresholds remain session-owned sequencing: call `advanceThreshold` only after the placement result is fully committed, then award the offer.
