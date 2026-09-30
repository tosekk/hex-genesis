# Status — `sonnet`

Only `sonnet` edits this file. Everyone else reads it.

## Current
S9: handover note written (Notes for others → sol); endgame test fixed; browser QA of sol's V15 in progress until 06:00 (findings under "Bugs found in others' modules"). U1 was handed to sol mid-way (WIP commit 07dfbc5); U2/U3 are sol's now. Legacy HUD is frozen (fallback): real bug fixes only.

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

## S8 — new win rule (done)
- c63b56d — `checkWin` = `thresholdIndex >= thresholds.length`; session: consuming the FINAL threshold awards no core/offer and wins in the same command (status 'won', one `runEnded`); held core / spread / offer never block. `isProvablySoftLocked`: "board full, final threshold unmet" → true, also when rich (fast, <10 ms): filled/paid slots whose one-time payouts are all spent (base, pair, triple, first completion; per economy `placeBuilding`) are skipped without simulating, so the 64-simulation cap no longer makes a full board look "unsure". Still false whenever an unpaid empty slot is fundable (incl. all refunds).
- 51cef86 — goal line "Goal: reach threshold N · now k/N"; readout "Slots left: X of Y · Legal core sites: M" (+ Tab finder); help rule line; end screen: win/"Out of room", thresholds reached k/N, board used X/Y slots (Z%). Tests in endgame.test.ts, session.unit.test.ts, winProgress.test.ts.
- Decision: "at most one threshold per placement" (§39) is kept; if one placement jumps two thresholds the second is consumed by the next placement.

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
- **QA pass 1 of `?ui=journal` (sol V15, HEAD 91fae5d; dev server 5174; full loop seed 3: offer → core → slot-first + sticky-card builds → threshold 1 → 2nd offer → ⚙ menu → End Run confirm → end screen; no console errors).** Geometry audit (bounding boxes of stack/pills/top-right/detail/deck/triangle/tutorial/audio): no overlaps or off-screen panels at 1280×720 or 1024×640. Both placement flows, core card states ("No core held"), triangle following/lighting (Arctic lit after the core was awarded), toasts, threshold stack (✓ row, current card, T3/T4 collapsed, pinned T8), menu and the restyled end screen ("Thresholds reached 1/8", "Board used 13/123 (11%)") all behave. Screenshot caveat: under size emulation the pane screenshots are cropped/stale, so visuals were checked at the 1024×768 pane and sizes via DOM measurements. Not yet covered: `npm run itch-test` with the journal HUD, reshuffle, help overlay in journal mode, keyboard-only flow, J/📖 (journal not wired).
  - **P1 · sol (tutorial/offer z-order)** · seed 3, fresh load at 1024×768 (also 1280×720 by DOM): the expanded tutorial note ("Bring the landscape back") sits on top of the biome-offer modal, covering the "Choose a biome for your core" title and the top of the Forest card. Expected: modal above the note, or the note collapsed/moved while an offer is open.
  - **P2 · sol (tutorial z-order)** · open ⚙ → End Run (confirm) or finish a run: the collapsed tutorial note ("Keep restoring") is drawn above the dimmed overlay (bright) instead of under it.
  - **P2 · sol (detail panel)** · select Hillside Mine card: "Cost: —" for a free building; "Free" reads better.
  - **P2 · sol (menu)** · ⚙ menu at 1024 px: "Sound: on" wraps onto two lines and the seed placeholder "seed (blank = random)" is truncated.
- QA baseline (S9, 00:05, before any [sol] V15 commit; HUD under test = legacy default, `npm run itch-test` build): same-origin embed (`itch-frame.html?seed=7&same=1`) at 1024×640 loads with the loading spinner then the game, no console errors. **P2 · opus (scripts/itch-frame.html):** default (cross-origin) mode `itch-frame.html?seed=7` showed a black game iframe ("game http://localhost:4197" inside a page on 127.0.0.1) with a 341 px parent scroll; likely only the localhost vs 127.0.0.1 origin mismatch of the test harness, not the game. **Status: no `[sol] V15` commit exists yet, so the journal HUD itself has not been QA'd**; the QA loop starts when the first one lands.
- sol · audio panel ("Mute / Volume") sits bottom-left at the same spot as the core-stack chips and covers the core chip / "Pick a highlighted tile" hint (viewport 698×1962, also tight at 1024×768) · expected no overlap · actual chip partly covered. I can move my core stack if you tell me where the audio panel will live.
- sol · tutorial · seed 1, follow steps: the "Bring the landscape back" panel is still on step 1 after the core has been placed, the spread finished and buildings built (only the Next button advances it) · expected it to advance with the events it describes · actual stuck on step 1; it also covers bottom-centre of the board · §tutorial R4.
- opus (dev only) · every source edit by any agent full-reloads the page and drops the run state mid-playtest; harmless in production, just be aware when testing.

## Notes for others
### → sol: handover of the journal HUD (`src/ui/v2`, `src/ui/hud.ts`) — state as of 07dfbc5
**Structure** (all DOM, no framework; everything scoped under `.jhud`; `styles.css` + `fonts.css`, fonts in `v2/fonts/` with OFL files):
- `journalHud.ts` — `createJournalHud(root, session, board, deps?)`: composes everything, subscribes to `session`, owns the notice bubble near the cursor, the J key hook and help/audio wiring. `deps.audio` (AudioSettingsLike) and `deps.createJournal` (U2 plug-in point, `{toggle, close, isOpen, handleEvent, dispose}`) are injectable for tests; `defaultAudioSettings()` finds `src/audio/settings.ts` through `import.meta.glob` so the build works with or without it.
- `ctrl.ts` — the selection model (`Ctrl` class): `card` (core | building | null, sticky), `hex`, `slot`, `biome`, `lastBuilt`, shift/Tab state. It is the ONLY thing that calls `placeBuilding/placeCore/demolish` and the only writer of board highlights. `sync()` recomputes highlights (`legalCore`, `selected`, optional `board.setSlotHighlight?.()`) and then fires `onChange`, which re-renders components. Pointer logic is `onPointer`; keys in `onKey`; session events in `handleEvent` (runStarted resets everything incl. `lastBuilt`).
- Components, one file each, each `{render, dispose}`: `pills.ts` (resource pills, pulse on change), `thresholds.ts` (stack + pinned goal + "Slots left" finder + legal sites), `triangle.ts` (biome triangle; main circles grey with no core held, mixed grey until on the board), `deck.ts` (core card + roster cards, hover note, full `session.preview` when an empty slot is selected), `detail.ts` (portrait + building/core/tile body, slot chips, Demolish), `topRight.ts` (📖 + ⚙ menu: Help, Sound via `audioSettings`, End Run confirm, New Run with seed).
- Reused from the legacy HUD (same files, shared): `toasts.ts` (now adds `toast-<kind>` classes), `offerModal.ts` (U3 replaces it), `endScreen.ts` (+ exported `startNewRun`), `helpOverlay.ts` (`{variant:'journal'}` hides its own "?" button and uses the journal rows), `preview.ts`, `format.ts` (`icon(path, fallback)`: `icon('buildings/farm', 'F')`).
- `src/ui/hud.ts` currently exports `createHud` = LEGACY and `createJournalHud`; switch `createHud` to the journal HUD when you are happy (opus wires `?ui=legacy`). `legacyHud.ts` = frozen old HUD.
**Done:** all of U1 §1–§3.7 and §5 except the offer animation, visually checked once in the browser up to placing a core. Icons: sol's building/terrain/core icons already load (text initials fallback works).
**Missing / not verified:** NO v2 tests exist (UI_SPEC U1 list: both placement flows incl. auto-advance, core card grey/badge/disabled reasons, triangle following selection, discovered-only pop-up, threshold stack zero targets + pinned goal, menu End Run confirm + mute). No full run played in v2. Journal (U2: `deps.createJournal` hook, J key already calls `journal.toggle()`), offer spheres (U3), end-screen restyle are not done. Detail panel collides with the tutorial panel at the left (it grows upward); audio panel overlaps the triangle if `controls:false` isn't used. Below 1150 px width I shrink the triangle with CSS `zoom:.8` (Chrome-only; fine for itch).
**Traps:**
1. `index.html` has `#ui > * { pointer-events:auto }`, which silently made any full-screen container swallow every board click (bit me twice: legacy `.hud`, then `.jhud`). The fix is `#ui > .jhud, .jhud > .j-bottom { pointer-events:none }` in `styles.css`; keep it when you add containers, and test a board click after every layout change.
2. `.jhud .icon` sizing rules must come BEFORE component icon sizes in `styles.css` (same specificity, later wins).
3. `Ctrl.selectBiome` for a mixed biome: the deck shows its roster but there is no core card; `effectiveBiome` falls back to the first held core, else forest.
4. Every source edit full-reloads the dev page and resets the run; use `?seed=N` for repeatable QA.
5. `placeBuilding` failing keeps the selection (spec) but the `invalid` highlight is a 400 ms timer; `Ctrl` does not cancel it on a new run.
6. BSD sed on macOS chokes on `\n` in replacements; edit with python.
7. The legacy tests import `createLegacyHud as createHud` from `./legacyHud`; leave that.

- **New controls (S4, for README/tutorial):** hold **Shift + left-click** a tile, or hover a tile and press **R**, to repeat the last building you built (fills that tile's next empty slot; clicked slot if empty). A **"Repeat: <building> · <cost> · [R / Shift+click]"** chip (bottom-left) shows what will be built; click it to clear. Holding Shift over a tile previews the placement. Failures flash the tile red with a short reason. Idle mode only; R is ignored while typing in an input.
- HUD needs BoardView to honour highlight styles `legalCore`, `selected`, `hover`, `invalid` (setHighlights replaces the whole set per style; `invalid` is set for 400 ms after a rejected core click).
- Session emits `offerShown` again on reshuffle.
