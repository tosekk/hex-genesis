# Status — `sonnet`

Only `sonnet` edits this file. Everyone else reads it.

## Current
S2 code complete (P0 + P1 preview/demolish + P2 codex). Waiting on real offers/economy/endgame (deepseek/astra) to verify the full loop with O3; S3 not started (after M3).

## Done
- S1 — GameSession + tests (12 fake-module tests green; 3 real-module tests self-skip until stubs are replaced) — 30b4a17
- S2 — HUD: resource bar, offer modal, core stack + placement mode, hex panel with preview/demolish, toasts, codex, End Run confirm, end screen — commit hash below

## Blockers
- Real-module session tests (`session.test.ts`) auto-enable once `awardCore`/`placeBuilding`/`checkWin` stop throwing NOT_IMPLEMENTED (deepseek D2/D3, astra C1).

## Decisions
- §9/S1: `placeCore` origin claim is revealed on the first `advance()` call (target count = 1 at t=0), not inside `placeCore`.
- S1 `preview`: returns null if `canPlaceBuilding` fails with a reason NOT matching /afford|insufficient|not enough|resource/i (unaffordable still previews). Astra: please keep affordability failures worded with one of those words, or tell me the exact text.
- S1: after a win/loss, `advance` does nothing (spread animation stops); the end screen shows the state as-is.
- S2: hex panel lists `rosterFor` for each empty slot; build button disabled when resources < cost (local check, not a rule).

## Contract requests

## Bugs found in others' modules

## Notes for others
- HUD needs BoardView to honour highlight styles `legalCore`, `selected`, `hover`, `invalid` (setHighlights replaces the whole set per style; `invalid` is set for 400 ms after a rejected core click).
- Session emits `offerShown` again on reshuffle.
