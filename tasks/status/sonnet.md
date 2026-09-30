# Status — `sonnet`

Only `sonnet` edits this file. Everyone else reads it.

## Current
S7 done. Nothing else assigned: `IDLE — available`. Still open from earlier: two complete runs played to a win (never done by hand).

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

## S5 — first-time-player UX pass (done, with a caveat)
Played in the browser (dev server on **5175**: 5174 was already held by another agent's `vite --host 127.0.0.1`, pid 42884). Seeds 1/3/5: offer → core → spread → build → R quick-build → threshold 1 → 2nd offer → End Run → end screen → New Run, no console errors. **Caveat: I did not play two complete 600-placement runs to a win**; I played each to threshold 1–2 and to the end screen.
- 46a831f — **real bug:** `#ui > *` (index.html) gave the full-screen `.hud` container `pointer-events:auto`, swallowing every board click. Fixed in `styles.css`.
- 2bd7aea — hex panel: only the next empty slot is expanded, per-resource costs with red shortfall (+ tooltip "Need 2 more water"), unaffordable stays hoverable for preview; controls help overlay (`?`/`H`/button, Esc/“Got it”/Enter close, auto-shows once per browser session via sessionStorage, swallows other shortcuts while open). Camera bindings read from `src/render/boardView.ts` (right-drag rotate, Q/E rotate, wheel zoom, middle-drag/WASD pan).
- ced1207 — buttons show "yields +4 stone" (a player couldn't tell which building makes wood); offer cards list the biome's buildings; core/repeat chips narrowed so the tutorial panel doesn't cover them.
- 8b21552 — quick build is a silent no-op while an offer modal is open (was flashing "hex full" notices).
- c475f9b — clearer end screen; End Run button hidden after the run ends.
- Not done: icons (sol's `public/assets/icons/` not present yet; text fallback in use).

## S7 — win progress + empty-slot finder (done) — cd42b4b
- `src/ui/winProgress.ts`: panel under the resource bar: "Empty slots: N (T tiles)", "Legal core sites: M" (`legalCoreSites`), "Spread active"; tooltip "Win: no legal core site left and every slot filled." Counts read state only; the win rule itself stays in `src/sim/endgame.ts` (not reimplemented).
- Finder: hold Tab (or click the counter to toggle) → `setHighlights('selected', tiles with an empty slot + the selected tile)`; release restores the selection. Inactive in core-placement mode (never touches `legalCore`). Both are in the help overlay. 9 tests in `winProgress.test.ts`.
- Checked in the browser (portrait viewport): counters update after a spread (135 slots / 45 tiles, 148 sites); the highlight rings themselves were too small to judge visually at that zoom.

## S6 — morning fixes (done)
- 528fc8b — resource bar ignores zero targets (no "x / 0", no meter); HUD test derives targets from config (+ zero-target test).
- 973846c — icons from `public/assets/icons/` in the resource bar, building costs, offer cards and core chips; text/emoji fallback on load error (tests).
- 306ae6b — held core chips show a disabled "No legal site left" state when `legalCoreSites` is empty; clicking never enters placement mode (`canPlaceCore` also requires a legal site) (tests).
- last commit — resource bar column widened for the icons (checked in browser).
- Port note: 5174 was still held by another agent's vite serving this same repo, so I viewed the game there rather than starting my own.

## Routed bugs + S3 wrap-up
- Hex panel closed on `runEnded`; `?seed=` synced on New Run (typed and random) — cf17134
- Codex restyled (recipe chips, reward, empty hint) + test — see next commit

## Fixes from astra's acceptance bugs
- C3-REFUNDS: `isProvablySoftLocked` now counts the refund of EVERY demolishable building for unpaid empty slots (optimistic, over-counts on purpose; §43). Test added. Commit 4909942.
- C3-FLIP: session calls `finishSpread` only once all tiles are revealed AND elapsed ≥ `spreadMaxMs` (last flip done). Test 4c added. Commit 4909942.
- Real-module session tests (`session.test.ts`, 3 tests) now run and pass (17 tests across src/game).

## Blockers
None.

## Decisions
- D3 §44: `isProvablySoftLocked` treats an EMPTY slot whose base yield is unpaid as productive if any building in its roster is affordable from `resources` or from `resources + refund` of any single existing building (one-demolition lookahead; base amount assumed non-zero). Paid empty slots and filled slots (replace) are checked by simulating `placeBuilding` on a `structuredClone` (non-zero payout or firstCompletion). More than 64 simulations → returns false (unsure).
- §9/S1: `placeCore` origin claim is revealed on the first `advance()` call (target count = 1 at t=0), not inside `placeCore`.
- S1 `preview`: probes `canPlaceBuilding` on a shallow state copy with 1e9 of every resource; null if it still fails (no dependence on reason text). Unaffordable still previews.
- S1: after a win/loss, `advance` does nothing (spread animation stops); the end screen shows the state as-is.
- S2: hex panel lists `rosterFor` for each empty slot; build button disabled when resources < cost (local check, not a rule).

## Contract requests

## Bugs found in others' modules
- sol · audio panel ("Mute / Volume") sits bottom-left at the same spot as the core-stack chips and covers the core chip / "Pick a highlighted tile" hint (viewport 698×1962, also tight at 1024×768) · expected no overlap · actual chip partly covered. I can move my core stack if you tell me where the audio panel will live.
- sol · tutorial · seed 1, follow steps: the "Bring the landscape back" panel is still on step 1 after the core has been placed, the spread finished and buildings built (only the Next button advances it) · expected it to advance with the events it describes · actual stuck on step 1; it also covers bottom-centre of the board · §tutorial R4.
- opus (dev only) · every source edit by any agent full-reloads the page and drops the run state mid-playtest; harmless in production, just be aware when testing.

## Notes for others
- **New controls (S4, for README/tutorial):** hold **Shift + left-click** a tile, or hover a tile and press **R**, to repeat the last building you built (fills that tile's next empty slot; clicked slot if empty). A **"Repeat: <building> · <cost> · [R / Shift+click]"** chip (bottom-left) shows what will be built; click it to clear. Holding Shift over a tile previews the placement. Failures flash the tile red with a short reason. Idle mode only; R is ignored while typing in an input.
- HUD needs BoardView to honour highlight styles `legalCore`, `selected`, `hover`, `invalid` (setHighlights replaces the whole set per style; `invalid` is set for 400 ms after a rejected core click).
- Session emits `offerShown` again on reshuffle.
