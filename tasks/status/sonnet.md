# Status — `sonnet`

Only `sonnet` edits this file. Everyone else reads it.

## Current
S2 code complete (P0 + P1 preview/demolish + P2 codex). Waiting on real offers/economy/endgame (deepseek/astra) to verify the full loop with O3; S3 not started (after M3).

## Done
- S1 — GameSession + tests (12 fake-module tests green; 3 real-module tests self-skip until stubs are replaced) — 30b4a17
- S2 — HUD: resource bar, offer modal, core stack + placement mode, hex panel with preview/demolish, toasts, codex, End Run confirm, end screen — a802a99

## S3 items pulled forward (done)
- keys 1/2 pick an offer, Esc cancels; locked-tile hover tooltip; biome-coloured offer cards.

## S4 — Quick build (done)
- `lastBuilt` lives in `src/ui/interaction.ts` (`build()` wraps `session.placeBuilding`; hex panel uses it). Chip/notice/Shift-preview in `src/ui/quickBuild.ts`. Toasts shrink to 250 ms when >3 are queued. Tests: `src/ui/quickBuild.test.ts` (8 required + chip-clear).
- Commit: 49e99ae

## D3 — win + conservative soft-lock (reassigned from deepseek) (done)
- `src/sim/endgame.ts` + `endgame.test.ts` (13 tests). Commit: c23be27
- Real-module `session.test.ts` still skipped: `src/sim/offers.ts` (D2) is still a NOT_IMPLEMENTED stub. Will enable/re-run when it lands.

## Blockers
- Real-module session tests (`session.test.ts`) auto-enable once `awardCore`/`placeBuilding`/`checkWin` stop throwing NOT_IMPLEMENTED (deepseek D2/D3, astra C1).

## Decisions
- D3 §44: `isProvablySoftLocked` treats an EMPTY slot whose base yield is unpaid as productive if any building in its roster is affordable from `resources` or from `resources + refund` of any single existing building (one-demolition lookahead; base amount assumed non-zero). Paid empty slots and filled slots (replace) are checked by simulating `placeBuilding` on a `structuredClone` (non-zero payout or firstCompletion). More than 64 simulations → returns false (unsure).
- §9/S1: `placeCore` origin claim is revealed on the first `advance()` call (target count = 1 at t=0), not inside `placeCore`.
- S1 `preview`: probes `canPlaceBuilding` on a shallow state copy with 1e9 of every resource; null if it still fails (no dependence on reason text). Unaffordable still previews.
- S1: after a win/loss, `advance` does nothing (spread animation stops); the end screen shows the state as-is.
- S2: hex panel lists `rosterFor` for each empty slot; build button disabled when resources < cost (local check, not a rule).

## Contract requests

## Bugs found in others' modules

## Notes for others
- **New controls (S4, for README/tutorial):** hold **Shift + left-click** a tile, or hover a tile and press **R**, to repeat the last building you built (fills that tile's next empty slot; clicked slot if empty). A **"Repeat: <building> · <cost> · [R / Shift+click]"** chip (bottom-left) shows what will be built; click it to clear. Holding Shift over a tile previews the placement. Failures flash the tile red with a short reason. Idle mode only; R is ignored while typing in an input.
- HUD needs BoardView to honour highlight styles `legalCore`, `selected`, `hover`, `invalid` (setHighlights replaces the whole set per style; `invalid` is set for 400 ms after a rejected core click).
- Session emits `offerShown` again on reshuffle.
