# Status — `opus`

Only `opus` edits this file. Everyone else reads it.

## Current
**IN PROGRESS: O13 (cloud, branch `opus/night`), on `main` `a752b06`.**

- O13.1 follow-up DONE (`8249711`): endgame + e2e use astra's `isCoreHex` / `slotCounts`.
- O13.4 review DONE for everything since `9c3434b` (sol `206e815`, `1a502c6`, `4980e85`; astra `6e8c7f9`, `a15915b`, `559f482`, `e075831`): **0 P0, 2 P1, 3 P2**, see "Bugs routed" → "O13.4 night review". Blocking the release gate: **astra P1-A** (W3 `it.fails` → `it`, `npm test` is red by one test until then) and **sol P1-B** (core hexes still counted in 4 UI places; expected in V16 (a)).
- **Package on `a752b06` (O13 step 3): PASS.** `npm run package` → `hex-genesis-<date>.zip`: 67 files, **19 MP3s, each exactly once** (19 sources, matched by content), **5.00 MB zipped** (5,239,550 bytes; 5.59 MB unpacked; was ~11 MB), `index.html` at root, relative URLs only, no `src/`. zip sha256 `b66c147b…850b929`, content sha256 `4479bfb6…3f5d71ce` (Node 22.22.0). Not a release candidate: P1-A/P1-B are open and V16 (a) / the v5 result are pending.
- verify-zip now also prints a **content sha256** (hash of every entry's name + bytes, independent of compression and order). The zip's own sha256 depends on the local Node/zlib deflate output, so the designer's local zip may differ byte-wise from the cloud one; the content hash must match.
- **Docs (O13 step 4) DONE:** README controls rewritten for the journal HUD, each row checked against the code (`ui/v2/ctrl.ts` keys, `help.ts`, `topRight.ts`, `journalHud.ts` J, `fx/offerSpheres.ts` + `ui/offerModal.ts` 1/2, `render/boardView.ts` OrbitControls + Q/E/WASD). README's duplicate itch draft was replaced by a link to `itch/PAGE.md`; the credits now say ElevenLabs made the voice, SFX and music. `itch/PAGE.md`: resolved the journal-HUD `[CHECK]`s (controls, fonts, tutorial note) and the audio ones (ElevenLabs credit, 5 VO + 13 SFX + 1 music). Every `[CHECK]` left is a designer-only fact (jam name/tag, designer name, release status, session length, cover/screenshots, browsers tested, AI design review, generated art, Three.js licence, and the v4-era slow-opening seeds).
- Next: the release gate, after astra's "v5 result" and sol's V16 (a) (+ P1-A, P1-B).

## Done
<!-- - <task id> — <one line> — <commit hash> -->
- O13.1 — `isProvablySoftLocked` skips core hexes (refund estimate + candidate scan). New test: full except three empty unpaid core hexes, rich, T8 unmet → loss; same board without the cores → not a loss (fails on the old endgame). `fullBoard()` fixture no longer builds on core hexes — `105fab2`.
- O13.2 — `assertInvariants`: no building on a core hex (independent `state.cores` oracle) + a negative test; loss check and board-used stats skip core hexes; both bots skip core hexes; the spread-lock probe uses a revealed non-origin claim. Default autoplay = greedy 1–3, spam 1, replay 1; `E2E_FULL=1` / `npm run test:e2e-full` = the old full set. `npm test`: 52 files, 380 passed, **30 s** (was 83 s) — `18ba0b1`.
- O13.3 — `src/ui/journal/journal.adjacency.test.ts`: real `createGameSession` + real `createJournal` (happy-dom), seed 1, config-driven combos on two adjacent same-biome non-core hexes → `payouts` with `kind: 'adjacency'` → the log row shows both combo names (hex side, then neighbour side) and `fmtResources(adjacencyAmount)`; `newRun` clears it — `1d42696`.
- O13.5 — `scripts/verify-zip.mjs` (+ `.d.mts`, 3 tests in `tests/e2e/verify-zip.test.ts`): newest `release/*.zip` (or a path arg); `index.html` at root, no root-absolute URLs in html/js/css, every source MP3 (`public/audio`, `src/assets/audio`) exactly once **matched by content**, no unknown MP3s, no `src/`/TS files; prints files, bytes, MB, sha256; exit 1 on failure. `npm run package` = package, then verify — `8ca5ba1`.
- O1: M0 DONE `4e877b6` (foundation, contracts, stubs). Committed by the human.
- O2: spread engine (`src/sim/spread/spread.ts`) with 26 tests in `spread.test.ts`, all green. Covers every O2 required test plus min-depth conversion, discard-and-continue, and a perf check (< 5 ms on 20×14). Shipped in `4e877b6`.
- O3 / **M2 DONE** (wiring `823728d`; playthrough on the build of `86038a9`, real D1 map, seed 7).
  - Full run through the real UI: offer → Desert core → spread → builds → 8 thresholds → 7 cores (Arctic/Desert/Forest, with mixed borders) → 10 combos discovered → **"Planet terraformed!" win screen** (§41) with lifetime totals, time, and seed.
  - Then New Run (seed 8) → offer → End Run → confirm → "Run ended" screen.
  - Zero console errors across both runs. Bugs found are listed under "Bugs routed".
- O4 packaging / O6.1 (`fc24fda`): `npm run package` → `release/terraform-jam-<date>.zip`.
  - A dependency-free, deterministic ZIP writer (node:zlib, fixed timestamps); `index.html` sits at the zip root. The build runs with RELEASE=1, so `render-sandbox.html` is left out, and `.md` notes are skipped.
  - It fails if any html/js/css references an absolute `/…` asset path.
  - Verified: `unzip -t` OK, 13 files, 0.17 MB. Served the unzipped folder with `vite preview`: game loads, all requests 200/304, no console output.
  - README now has controls (camera, R / Shift+click, 1/2, Esc, ?/H, Mute button + volume), packaging, itch settings, and AI credits.
- O6.2 (`fc24fda`): `createAudio(#ui, session)` is wired in `main.ts` before `newRun`. A single `teardown()` (rAF, resize, audio, tutorial, hud, board binding, board) runs on `pagehide` (skipped when the page enters the bfcache) and on Vite HMR dispose. Dev server check: Mute + volume controls render and toggle, no console errors with the MP3s absent.
- O4 (autoplay part, `823728d` + `dac18d9`): `tests/e2e/autoplay.test.ts` now runs on the REAL modules (the fallback fakes are deleted).
  - Seeds 1–5 all win. `assertInvariants` (§52) is checked after every action, and a replay-determinism check passes.
  - Bounded runtime: per-run action cap (3000), wall-clock budget (30 s → `stop: 'time'`), max 1000 `advance()` calls per spread (→ throws), and per-test timeouts. Full `npm test` finishes in ~34 s.
  - `npm run pacing`: opt-in flat-map baseline (pins a flat map via `vi.mock`, so economy changes compare against a fixed board).
  - `npm run preview:head`: builds committed HEAD in a temp dir and serves it on :4199 for playtesting. The dev server reloads (losing the run) whenever any agent saves a file.

## Blockers
<!-- none -->

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- O13.2 / §10: the e2e invariant checks core hexes via `state.cores`, NOT the economy's `isCoreHex`, on purpose: an independent oracle cross-checks astra's helper instead of trusting it.
- O13.2: "< 60 s" is met by sampling, not by weakening checks: invariants still run after every action; only the seed count drops by default. The dropped seeds stay one command away (`npm run test:e2e-full`).
- O13.5: MP3s are matched by sha256 of their bytes, not by name, so Vite's hashed names (`win-CkpF4S8e.mp3`) and the `public/` copy (`audio/sfx/win.mp3`) are both recognised as the same file.
- §13 pool as budget: Dijkstra pops by (cumulative cost, HexId). The pool is charged each tile's own step cost, not its cumulative cost. A popped node whose step cost exceeds the remaining pool is discarded, and the search continues with later nodes until the queue empties or the pool reaches 0. This follows "claims … until the pool has been consumed".
- §13 origin costs `costUnit` (one flat tile). Flat dead board → 69 claims, `poolUsed` 276.
- §13 mountain step cost = plain slope cost (no natural ×2). Mountains are claimed as `kind: 'mountain'` and never expanded from. A mountain claimed by an earlier spread is still dead, so a later spread may enter it again (pool spent, nothing changes).
- §17 conversion cost = `ceil(base × 0.5)`, where base is the slope cost, ×2 if the foreign tile is natural terrain.
- §17 depth is the SHALLOWEST depth the spread reaches a foreign tile at. If a converted tile is first reached deep (a cheaper path through the foreign region) and later reached shallower, it expands again at the shallower depth without spending pool again. Without this, a cheap depth-2 claim could block a legitimate depth-1 route and cut conversion short.
- §17 inside a foreign region, the spread continues only into tiles of the SAME foreign biome (snapshot biome). It never enters dead land, a different main biome, the spread's own biome, or mixed tiles from a converted tile.
- §16 same-biome and §18 mixed neighbours are never queued (no claim, no cost, no expansion).
- Earlier `npm test` "hangs" were a slow bot (fixed in `823728d`) plus scratch profiling files I ran and deleted. A NEW hang cause I hit: a `vi.mock` factory that imports a module which imports the mocked module deadlocks silently (0% CPU). `pacing.test.ts` builds hexes inline to avoid this.
- O4 bot = "sensible greedy player". It fills the fullest unlocked hex first and scores buildings by weighted yield, where a resource the next threshold still needs weighs 2, otherwise 0.5, +1 if stock < 6, net of 0.5 × weighted cost. It picks the offer biome covering fewer tiles, places the core with the most non-mountain claims, and never demolishes. A naive "max total yield" bot soft-locked on seeds 2–4, so the weighting matters for the tuning numbers.
- .gitignore: `.claude/` (local Claude Code launch config/settings) is ignored, not committed. All agents share one checkout, so the file already exists for everyone, and `.claude/` isn't in the ownership map.
- `revealSpread` never clears `activeSpread`, even when every claim is revealed. The session must call `finishSpread` to end it.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- **sol: R7 is APPROVED** (`c357845`). `showPayouts?` is in `BoardView` exactly as you requested, and `bindBoard` already calls it on `payouts`. Implement it in `src/render/boardView.ts` and go ahead with R7.
- M0 is in (`4e877b6`). The stubs in your paths are yours (header `// OWNER: <tag> — stub from O1`). Replace freely.
- Extra `src/core/state.ts` helpers (additive, not in CONTRACTS): `createHex(id, col, row, elevation, terrain, decoration)` builds a fresh dead empty hex with `placeable` derived from terrain (astra: use it in mapgen). `stateFromHexes(seed, config, cols, rows, hexes, nowMs)` wraps a board in an empty run state.
- `makeTestState(opts = {})`: every option is optional. Defaults: 20×14, flat, `'plain'`, dead. A `'mountain'` with no explicit elevation gets `levels-1`. `seed = 0`, `runStartMs = 0`.
- `src/sim/spread/spread.ts`: `isLegalCoreSite`, `legalCoreSites`, and `isHexLocked` are already real. The whole spread API is now real (O2 done). `spreadPool(cfg)` and `stepCost(cfg, fromElev, toElev)` are also exported.
- Vitest env is `node` by default. For DOM tests, add `// @vitest-environment happy-dom` at the top of the test file.
- `RngState.s` is a uint32. `nextInt(n)` is unbiased (rejection sampling), so it may consume more than one `nextU32()`.

## Process notes (all agents)
- The git index is shared. Anything you stage but don't commit immediately gets swept into the next agent's `git commit`. (My staged `git rm` of the e2e fallback files landed in astra's `cc0e8e9`; harmless here.) Stage and commit in ONE command: `git add <your paths> && git commit -m …`, or use `git commit <paths> -m …`.

## Contract changelog
<!-- - <commit> · <change> · requested by <tag> -->
- `72cc74b` · `BoardView.setSlotHighlight?(pick: { hexId: HexId; slot: SlotIndex } | null): void` added to `src/core/contracts.ts`: optional, presentation only, `null` clears. No `bindBoard` wiring; the HUD calls it directly (`board.setSlotHighlight?.(…)`). · requested in O9/UI_SPEC for sol (V13) and the journal HUD (V15, formerly sonnet U1)
- `c357845` · `BoardView.showPayouts?(state: Readonly<GameState>, events: PayoutEvent[]): void` added to `src/core/contracts.ts`. It is additive and optional, presentation only: it must never mutate state, and HUD toasts stay authoritative. `src/app/bindBoard.ts` calls `board.showPayouts?.(state, e.events)` on every `payouts` SessionEvent, in resolution order. · requested by sol (R7)

## Integration log
- **O11.3 GO: `release/hex-genesis-2026-10-01.zip`** (from clean `f72ac73`, `node scripts/package.mjs`): `unzip -t` OK, 48 files (`assets/fonts` ×4, `assets/icons/{buildings,terrain}` included), relative paths only. The unzipped zip + `scripts/itch-frame.html` were served on 127.0.0.1:4197 (page) and :4196 (game), and checked WITHOUT `?ui` (default HUD = journal):
  - **Default cross-origin mode:** frame loaded and rendered, the click focuses the game, real ↓×5/Space/PgDn/End/`1` → **parent scrollY 0**, `1` resolved the offer (Desert). ✅
  - **Same-origin:** `.jhud` mounted, tab "Hex Genesis", 0 errors. Menu → End Run → confirm → journal end screen "Hex Genesis · Run ended · Thresholds reached 0/8 · Board used · resources · time · seed 41". ✅
  - **Live resize** (checked on the identical code via `?ui=journal` pre-verification): all panels stay inside 1024×640 … 1600×900. ✅
  - **Not re-done by me in the zip:** a build loop through the journal's board clicks (my scripted board clicks didn't place the core in the hidden pane). That flow is covered by sonnet's QA passes 2–3 on this code (offer → core → sticky-card builds → threshold → End Run → end screen, no console errors).
- **O11.3 pre-verification, journal HUD** (`?ui=journal`, clean export `5a5e8bb`, `node scripts/itch-test.mjs`, frame page 1440×1000 with a 1280×720 game, same-origin for inspection): `.jhud` mounted, tab "Hex Genesis", 0 audio-module controls (the journal has its own). Click into the game → focus in frame; real ↓×5/Space/PgDn/`2` → **parent scrollY 0**, `2` resolved the offer (Arctic deck shown); 0 errors. **Live resize** (sonnet's P2-pass P1): frame at 1024×640 / 1600×900 / 1100×660 / 1280×720 → all 8 journal panels inside the frame, triangle 16 px from the right edge every time. ✅
- **O11.1 offer spheres** `8d44d59`: `src/fx/offerSpheres.ts` + 7 happy-dom tests (present/backdrop blocks pointer input, keys 1/2 owned + single choice, click, reshuffle/update/disabled, resolve settles ≤ 1.6 s and removes itself, reduced-motion fade, hide/dispose) + `src/fx/demo.html`. Browser (dev server demo): spheres render with biome colours, icons, key badges and Reshuffle; a real `1` → chosen Forest, and the resolve took **1165 ms** and removed the FX.
- **O11.2 sonnet's P2 (itch-frame)** `0f050ae`: the default mode is now cross-origin via a second port on the same host (4197 page ↔ 4196 game; `itch-test` serves both). The old localhost↔127.0.0.1 swap was cross-SITE (separate renderer process, black in hidden panes, possible name mismatch) and stays available as `?site=1`. The page shows the frame load state. Verified from a clean HEAD export: frame loaded and rendered, focus in game, ↓×5/Space/PgDn → parent scrollY 0, `1` picks the offer. (`npm run itch-test` in the shared tree currently fails on astra's uncommitted `journal.test.ts`, not mine.)
- **O11.4 rename** `4c82ec8`: `<title>Hex Genesis`, README heading + itch draft, zip → `release/hex-genesis-<date>.zip`.
- **O10.1: safety RC verified** (zip above, served unzipped next to `scripts/itch-frame.html`, 1440×1000 page with a 1280×720 frame).
  - **Parent scroll ✅** (both fixes in the build: `1fa5455` capture phase, `f4609b3` key-specific ownership). (A) help overlay open, focus on its "Got it" button: ↓×5, PageDown, End → parent scrollY 0. (B) help closed: ↓×5, Space, PageDown → 0. The earlier RC (`1fa5455`) scrolled 2314 px in case (A), so it's superseded and must not be uploaded.
  - **Focus ✅:** a click into the frame focuses the game; the game takes focus on load once its first frame renders.
  - **Full loop in the frame ✅:** offer → cores → spreads → 375 placements through the real HUD → End Run → "Run ended · 2/8 · Board used 375/375 (100%)". 0 errors, parent never scrolled. The win path on the same code: `tests/e2e/autoplay.test.ts` seeds 4/5 WIN at T8 (real modules).
  - Zip: `unzip -t` OK, 44 files (Sol's V11 icons under `assets/icons/{buildings,terrain}`), relative paths only.
- **N9 balance note (for astra + designer, not a build blocker):** on N9 (`4ba61e3`) my greedy e2e bot wins only seeds 4/5; seeds 1/2/3 fill the WHOLE board (639/633/612 slots) and stall at T7, with no end screen (same full-board limbo as routed in O8.1). On N8 it won 5/5. Astra's combo bot still wins 49/50, so good play wins, but modest play now lands in limbo much more often, and my simple UI player (no combo awareness) filled the board by T2 on seed 4. The designer's §42 decision on the full-board loss matters more now.
- **O10.2 / O9.1: contract** `72cc74b`: optional `BoardView.setSlotHighlight` (see Contract changelog). **sol: V13 is unblocked**; the journal HUD calls `board.setSlotHighlight?.(…)` directly.
- **O10.3 / O9.2: wiring** (this commit, `src/main.ts`): `?ui=legacy` → `createLegacyHud`, `?ui=journal` → `createJournalHud`, otherwise `createHud` (legacy until sol flips the default in `src/ui/hud.ts`; no main.ts change needed then). `createAudio(…, { controls: hud is legacy })`. Smoke test at 1280×720: default and `?ui=legacy` mount `.hud` + 1 audio control box; `?ui=journal` mounts `.jhud` and 0 audio-module controls; no errors.
- **O8.2: browser win/loss screens on S8** (`c63b56d` rule, `51cef86` UI; economy still v3).
  - **WIN ✅** (clean release build of `d339fc9`, seed 1, full UI play): the build that met T8 (placement 430) opened **"Planet terraformed!" immediately**, with no offer or core awarded. The T7 core was HELD ("No legal site left") and did not block the win. End screen per §41: "Thresholds reached: 8/8 · Board used: 430/639 slots (67%)", lifetime per resource, time 1:56, seed 1. HUD: "Goal: reach threshold 8 · now 8/8", "Slots left: 209 of 639". 0 errors.
  - **Mid-spread win:** not reachable in the browser on v3 maps (seed 1 has no legal site left at T7; seed 12 stalled in the opening, see below). It is covered deterministically by the e2e scenario test (T8 crossed during an active spread with a held core → `won` in the same command, spread and held core untouched). Retry in the browser after N8.
  - **LOSS screen ✅** (dev server, via the new dev-only `window.__session` QA hook in `main.ts`): built a genuinely out-of-room board (all 96 terraformed slots filled, every base/pair/triple/completion payout spent, no core held) and made the last placement through `session.placeBuilding`. Result: `status=lost` and one `runEnded:lost` in the same command. The end screen reads **"Out of room · Thresholds reached: 0/8 · Board used: 96/96 slots (100%)"** + lifetime, time, seed. ✅
  - **Spam in the real UI (seed 3):** cheapest building in every slot through the hex panel until the board is full → **"Slots left: 0 of 138 · now 0/8"**, no cores, 483 wood in stock, status still `playing`, **no end screen and no hint**. This confirms the O8.1 finding in the UI (routed below).
  - **Opening stall (seed 12, v3, for astra's N8 target 4):** my need-driven UI player built 3 Hillside Mines on a Forest start and ended with **wood 0 / stone 24**, Forest-only cores, where every Forest building costs wood, at T1 after 3 placements. It's not provably dead (demolishing 2 mines refunds 2 wood → Lumber Camp), so correctly no loss, but a new player is stuck. Same pattern as the known seeds 35/37.
- **O8.1 (new §41 win rule): tests/e2e + README.**
  - `assertInvariants` now checks: won ⇒ final threshold reached; lost ⇒ final unmet; final met ⇒ not still playing. Reaching the final threshold must produce `won` in the SAME action with no core or offer. A loss must never happen with an active spread, a held core that has a legal site, or an affordable empty unpaid slot with a positive base yield (§44).
  - The bot stops on won/lost, reports "board used" (the §41 end-screen stat, plus astra's % of placeable slots), and has a `spam` strategy. New scenario test: crossing T8 mid-spread with a held core and empty slots wins at once (no `coreAwarded`/`offerShown`; the spread and held core stay; later commands are rejected).
  - Results on S8 (economy still v3 `d5910a1`): greedy seeds 1–5 all **WIN at T8** with 71–81% of placeable slots used (442–519 placements). All 10 e2e tests pass; the suite self-skips if `checkWin` ever reverts to the old rule.
  - README: goal line "Reach the final threshold before you run out of room" at the top and in the itch draft; how-to-play and tips updated.
- **O6.4 FINAL: N7 `d5910a1` (astra kept round 3 `f6b6d45`).** All checks ran on a clean `git archive d5910a1` export, so no uncommitted work from others is included.
  - **Autoplay (real map): PASS.** Seeds 1–5 all WIN (591–639 placements, 5–7 cores), `assertInvariants` holds after every action, and replay-determinism passes.
  - **Pacing:** cumulative placements per threshold, median of seeds 1–5, my sensible-greedy bot:

    | | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | board full |
    |---|---|---|---|---|---|---|---|---|---|
    | v3 target (±20%, T1 exempt) | 7 | 22 | 45 | 90 | 160 | 270 | 360 | 450 | — |
    | **real map, final** | 6 | 18 | 45 | **114** | 176 | 321 | 377 | 465 | 591–639 |
    | flat map (`npm run pacing`) | 5 | 16 | 35 | 81 | 199 | 347 | 393 | 507 | 840 |

    Within ±20% except T4 (+27%). T6 +19%, T7 +5%, T8 +3%. T8 comes before board fill on every seed (v3 requirement ✅). This matches astra's combo-bot report (T6 323, T7/T8 362.5/433.5) to within a few %. T1 is still 4–17: seeds 3/4 open slowly because T1 is stone-only.
  - **Browser run to a WIN: PASS.** Clean release build of `d5910a1`, served statically (`vite preview`), **seed 1** (astra's pick), played entirely through the real UI (canvas pointer events + HUD buttons, real-time spreads).
    - Desert/Arctic offers alternated; thresholds reached at placements 2/14/27/96/161/298/357/429; 7 cores placed, the last 2 held with "No legal site left" (S6 chip state).
    - The S7 win-progress readout counted down to "Empty slots: 0 (0 tiles) · Legal core sites: 0", then the **"Planet terraformed!"** end screen: Wood 2035 / Stone 1472 / Water 895 / Food 434, time 2:11, seed 1.
    - 639 placements, identical to the autoplay bot's seed-1 result. 0 console errors, 0 uncaught exceptions.
    - Overlays checked: toasts and floating payout labels are `pointer-events: none`, so they never block board clicks.
- **O7 itch.io embed test** (`npm run itch-test` → `http://127.0.0.1:4197/itch-frame.html`).
  - The page mimics itch: a 1280×720 iframe with itch-style `allow` attributes, inside a tall scrolling page, CROSS-SITE by default (page on 127.0.0.1, game on localhost; `?same=1` for an inspectable same-origin frame; `?game=<url>` for A/B against another build).
  - Results on the RELEASE=1 build of the working tree:
    - **Relative paths ✅:** every asset loads 200 from the frame origin.
    - **Keyboard ✅:** after a click into the game, real key presses work: `1`/`2` pick offers, `h` and `?` toggle help, Esc closes help and cancels core placement, R quick-builds over the hovered tile, W/A/S/D/Q/E reach the board's camera handler, and Tab cycles the game's own controls. (The automation sends `?` with an empty `key`, so `?` was verified with a dispatched `KeyboardEvent`.)
    - **Scrolling: FIXED (mine) ✅:** before, arrow keys, Space, and PageDown inside the game scrolled the ITCH PAGE. A/B test with the pre-fix build: parent scrollY 0 → 200 after ↓×5 + Space. `src/app/embed.ts` `preventScrollKeys()` now cancels the default for ↑↓←→, Space, PageUp/Down, Home/End unless an input, button, summary, or select owns the key: Space still activates a focused button, and arrows still move the volume slider. After the fix, parent scrollY stays 0 with ↓×5, ↑, Space, PageDown, End, same-origin and cross-site.
    - **Focus on load: IMPROVED (mine):** `requestFocus()` (`window.focus()`) on the first rendered frame. Cross-site, with no click, the frame took focus and a real `2` picked the offer. Real browsers may refuse this without user activation; clicking still works. Please re-check on the live itch page.
    - **Fullscreen:** `requestFullscreen` is denied inside the automated pane, so it was checked as what itch actually does, resizing the frame. At 1800×1169, 1024×768, 1600×900, and back to 1280×720, the canvas CSS size and drawing buffer (DPR 2) follow and the HUD stays visible. Please re-check itch's real fullscreen button by hand.
    - **Audio after first click ✅:** on the first click, `createAudio` unlocks and immediately tries the music and the offer cue. With the MP3s missing it only logs `[audio] Optional file absent: …` (console.debug) and plays nothing. Storage is safe for third-party iframes: every `localStorage`/`sessionStorage` use (help seen-flag, audio settings) is in try/catch.
    - **Console ✅:** no errors or warnings from the game. (The browser warnings about `web-share`/`allowfullscreen` came from my test page's `allow` list; that list is trimmed now.)
    - **Automation note:** in the hidden automation pane a cross-site frame doesn't paint or run rAF until something forces a paint. That's a pane throttling artefact, not a game bug: same-site frames and a direct load are fine.
  - Nothing to route: every issue found was in my files.
- **O7 loading indicator:** `index.html` has a `#loading` overlay ("Waking the planet…", CSS spinner, reduced-motion aware). `main.ts` fades it out and removes it after the FIRST rendered frame (`hideLoading()`). Verified in the frame: present before the first frame, removed after.
- **O7 itch page draft:** `README.md` → "itch.io page (draft)": pitch, core loop in 5 bullets, controls, click-for-focus hint, and credits + AI usage per §47. The name is `<GAME NAME>`, and `<JAM NAME>`/`<DESIGNER NAME>` are placeholders too. Asset-dependent credit lines (generated art, ElevenLabs voice, Suno music) are marked *(designer: confirm)*.
- **O6.4 preliminary: N7 round 1 `cf27db5`** (clean `git archive` export, so astra's uncommitted round-2 edits are excluded). Autoplay on the real map: seeds 1–5 all WIN, invariants hold, replay deterministic. Cumulative placements per threshold, median of seeds 1–5 (my sensible-greedy bot, NOT astra's combo bot) vs v3 targets:

  | | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | board full |
  |---|---|---|---|---|---|---|---|---|---|
  | v3 target (±20%, T1 exempt) | 7 | 22 | 45 | 90 | 160 | 270 | 360 | 450 | — |
  | real map, round 1 | 6 | 18 | 45 | **117** | 177 | **351** | 409 | 484 | 591–639 |
  | flat map (`npm run pacing`) | 5 | 16 | 35 | 81 | 199 | 352 | 405 | 527 | 840 |

  - Out of band: T4 and T6 (+30%). T8 arrives before board fill on every seed (the v3 requirement).
  - T1 varies from 4 to 17: seeds 3/4 need 17 placements. The first threshold is stone-only (`{ wood: 0, stone: 16 }`), and those seeds' opening biome yields little stone.
  - The final numbers and the browser win run come after N7 is final.
- **O6.3 independent reviews (morning):**
  - **N6 `4eacde4` (preview without full-state clone): PASS.**
    - Code read: every write in `placeBuilding` (`resources`/`lifetime` reassigned; target `slots[]`, `pairPaid[]`, `triplePaid`, `everCompleted`; `discoveredCombos.push`; `adjacencyPaid[key]=`) lands on an object the preview copies. Neighbours, config, and spread are read-only.
    - Empirical: replayed bot games (seeds 2, 7) and, every 60 placements, compared `previewPlacement` with the pre-N6 clone-based reference for every biome hex × 3 slots × (roster + one off-roster + one unknown building). 106,986 previews (35,112 with non-empty payouts): 0 mismatches, and the live state was byte-identical after each checkpoint.
  - **D4 `0b7f609` (map variety, plateau drainage): PASS.**
    - Code read: hill patches grow from mountains with depth ≤ 3; edge hills sit at level 1 and only fully supported interiors rise (level 3 only next to a mountain), so §6 holds by construction; hill-adjacent plains are forced to 0.
    - Plateau drainage: multi-source BFS distance to a lower outlet, which strictly decreases along flats, so walks are acyclic and non-increasing and never step onto hills. No reject/retry loop.
    - Independent checker, seeds 1–200 (20×14): 0 violations of ids, §7 placeability, dead biomes, mountain ⇔ top level, hill within 1–3 of a mountain, hill elevation rule, ≤ 3 ascending hills, non-hill land below adjacent hills, or downhill walks (from EVERY tile: none climb, none revisit a tile).
    - Variety fixed vs D1: 1–4 mountain clusters (59/47/60/34 maps), 3–34 mountains (median 15), 51 distinct cluster/mountain shapes, hills 38–70 (was ~100), riverbed 3–55 (median 19).
    - Placeable: median 74%, 1/200 below 65% (min 60), 3/200 above 80% (max 83). Acceptable per D1 ("roughly 65–80%").
  - **N4 `0642114` (area-scaled clusters): PASS.** The same checker passes 20 seeds each at 26×18, 30×20, 8×6 and 5×4. The "default stream unchanged" claim was verified: the SHA-256 over 200 seeded 20×14 maps is identical at `0b7f609` and `0642114` (`203915e92549ba75`).
- **Pacing report** (economy v1 `7144980`; bot = sensible greedy player, never demolishes). Cumulative placements when each threshold is reached, vs `tasks/ECONOMY_SPEC.md` estimates:

  | T | spec est. | flat map median (min–max) | real D1 map median (min–max) |
  |---|---|---|---|
  | 1 | 8 | 6 (6–6) | 6 (6–6) |
  | 2 | 20 | 16 (13–18) | 16 (12–18) |
  | 3 | 40 | 30 (23–55) | 35 (22–37) |
  | 4 | 70 | 82 (43–87) | 58 (41–80) |
  | 5 | 110 | 150 (76–199) | 88 (66–107) |
  | 6 | 160 | 178 (107–230) | 119 (98–138) |
  | 7 | 220 | 213 (143–270) | 149 (132–166) |
  | 8 | 300 | 267 (188–303) | 178 (165–218) |

  - **Flat map** (`npm run pacing`): no terrain bonuses (no mountains, water, woods, or marsh), all 280 hexes placeable. It tracks the estimates within ±25% except T4–T5, where single-resource bottlenecks (water/stone) cause spikes (T5 range 76–199). 6 cores cover the whole board, and the run wins at 840 placements.
  - **Real D1 map** (`npx vitest run tests/e2e/autoplay.test.ts`, `86038a9`): terrain bonuses make it FASTER. T5–T8 are reached at ~60–80% of the estimate. 177–199 living hexes, won at 531–597 placements. After T8, **~340–420 placements (60–70% of the run) award nothing new**, while design intent says thresholds should run until about half the board is filled. At T8 the board is ~32% filled.
  - Only 5–6 cores fit (legal sites run out), but 9 are awarded, so 3–4 are held uselessly at the end. For astra (tuning, not bugs): consider steeper T6–T8, or fewer thresholds.
  - The UI playthrough (seed 7, real map, different heuristic) matched: T8 at ~250 builds, 7 cores, 2 held without a legal site.
- **D1 review (O5, independent check of astra `cc0e8e9`…`86038a9`)**: PASS.
  - Code read: deterministic (integer lattice noise, ascending-id ties, no floats in state), hills built outward from mountains in distance bands (so the §6 rules hold by construction), rivers strictly descend and stop at an edge or local minimum, natural terrain replaces only plains, no reject/regenerate loop (§53).
  - Independent test, seeds 1–200: 0 violations of ids, placeability (§7), biome null, elevation range, mountain ⇔ top level, hill within 1–3 of a mountain, hill elevation rule, or non-hill land below adjacent hills. Max 2.8 ms/map.
  - Placeable: median 70%, max 80%, **14/200 seeds below 65% (min 63%)**. Seeds 1–10: largest open region 132–202 tiles, greedy core capacity 10–12.
  - Advisory (P2 tuning, astra): every map has exactly 2 mountain clusters × 7 tiles and ~100 hills (36% of the board) in two concentric cones, so maps look alike run to run. Riverbeds are sometimes very short (5 tiles).

## Bugs routed
<!-- - to <tag>: <report> -->
### O13.4 night review (2026-10-01, commits since `9c3434b`)
Checked: correctness, determinism, layering, hidden info (§32, §38), v5 R1–R4, core-hex handling (§10). **No P0.**

- **P1-A → astra (blocks the release gate):** `tests/acceptance/endgame.test.ts:58` W3 is `it.fails(...)` "waiting for the opus night endgame". That landed (`105fab2`, `8249711`); W3 now passes, so vitest reports the `it.fails` as a failure and `npm test` is red (1 of 415). Fix: `it.fails` → `it`. Nothing else needed; I checked that W3 passes for the right reason (the empty core hex 0 is no longer counted as room).
- **P1-B → sol (V16 (a) scope; list it so nothing is missed):** four UI counts still include core hexes, because they filter only `placeable && biome !== null`:
  1. journal HUD "Slots left N of M": `slotSummary` in `src/ui/v2/ctrl.ts:8` (used by `thresholds.ts:75`);
  2. the **Tab / "Slots left" finder highlight**: the same `slotSummary(...).hexes` (`ctrl.ts:297`) highlights every core hex as "has empty slots", and it always will, since a core hex can never be filled;
  3. legacy HUD "Slots left": `emptySlotSummary` in `src/ui/winProgress.ts:8`;
  4. the **end screen "Board used: used/total"** (`src/ui/endScreen.ts:36`, shared by both HUDs) via `emptySlotSummary`. A player who fills every real slot sees < 100% and "3 × cores" slots left.
  Repro: any run after the first core: `total` = `slotCounts(state).total + 3 × state.cores.length`, and the finder lights the core hex. Fix: both helpers → `slotCounts` for the numbers, plus `!isCoreHex(state, h.id)` in the `hexes` list. Test: one core hex, everything else full → "Slots left 0 of N", no finder highlight, end screen 100%.
- **P2-C → astra (report clarity):** v5 target f says "placeable non-core slots (via `slotCounts`)", but `slotCounts.total` counts **terraformed** non-core slots, not all placeable ones. `runBalance` now reports `boardUse = occupied / slotCounts.total`, while v4's 68% median was `placements / all placeable map slots`. Both are defensible, but v5 and v4 board-use numbers aren't comparable. Name the denominator in `REPORT.md` next to target f. Also `thresholds[i].fill` and `.boardUse` are now the same number (`bot.ts`, both `/ slotCounts(state).total`).
- **P2-D → sol:** `voice.ts` treats any non-modified `keydown` as the unlock gesture. Esc isn't a user activation in Chromium, so if the first key is Esc, `start()` gets `NotAllowedError`, re-queues the line, and waits for the next gesture. That's harmless (it retries), only noting it so the designer's QA doesn't read it as "VO sometimes skips its first line". No change needed.
- **P2-E → sol:** `Ctrl.hasBiomeLand` / `biomeEnabled` scan all hexes on every call (6× per triangle render + deck + `sync`). Fine at 280 tiles; revisit only if a larger map ships.

Verified OK, no finding:
- **Determinism:** the random bot is seeded (`createRng(deriveSeed(seed, 'balance-random'))`), with `nextInt` draws and a test that pins the draw sequence and that no RNG state is used on a null choice. There is no `Math.random`, `Date` or `performance.now` in `src/core`, `src/sim`, `src/game` or `tests/balance`. The only exception is the session's pre-existing `Date.now` for wall-clock stats. `audio.ts`'s pitch jitter is presentation only.
- **Layering:** no `three`, DOM or UI imports in core/sim/game.
- **R1–R4** (`a15915b`): checked every building by hand, and `config.test.ts` enforces all four (R3 includes "no 0 keys"). Hillside Mine now costs wood 2.
- **§32/§38:** the deck preview filters combos to discovered ones, the journal's locked pages carry no data, and the adjacency log's current matches are always discovered (placement discovers every current match; demolition adds none).
- **N11:** `canPlaceBuilding` checks the core before anything else and returns the exact reason text, `session.preview` returns null on a core hex, and the soft-lock/harness paths all skip core hexes.
- **Audio move** (`206e815`): globs point at `src/assets/audio`, and a test guards that no MP3 remains in `public/audio`.

- **to sol (P1 usability):** clicks in the thin gaps between tile tops are silently ignored. `pick()` raycasts only `tops` (radius 0.95 vs spacing 1.0), so a ray through a gap hits nothing. Repro: HEAD build, `?seed=7`, default camera, 1024×768; a synthetic pointerdown/up at client (454,454) returns null, while (450,450) → tile 8,11 and (458,458) → tile 9,11. A 20 px grid scan finds ~5% of on-board points are dead, mostly tile corners, which is where players naturally click. Suggestion: raycast an invisible full-size (radius 1.0) pick mesh, or fall back to the nearest hex centre at the hit plane.
- to sonnet (cosmetic): after a win, the hex panel stays open behind the end screen with live "Demolish" buttons (the session rejects them, since the run is over). Close/hide the panel on `runEnded`.
- to sonnet (minor): "New Run" with a typed seed on the end screen doesn't update `?seed=` in the URL, so a reload replays the previous seed.
- to sol (UX nit): the first tutorial card ("Choose Forest, Desert, or Arctic…") stays up for the whole run unless the player clicks Next. Consider auto-advancing when the next queued event arrives.
- **to astra + designer (P0 design/balance mismatch, NOT a sonnet bug): a spammer never gets the "Out of room" loss.** Spam bot (cheapest affordable building, first empty slot, never demolishes) on seeds 1/2/3 fills **100% of its terraformed slots** (486/465/192) at T2/T2/T0, and the game does **not** declare a loss. The detector is right per §43/§44: on those end states there are **768 / 721 / 384 affordable demolish+rebuild moves that still pay** (e.g. hex 5 slot 0: Lumber Camp → Sawmill pays `timber_line` on two unpaid pairs), and stock is huge (seed 1: wood 1143).
  - §42's rationale ("because slots and slot pairs never pay twice, no action can earn more yield") does not hold for a board built without combos, since every unpaid pair can still pay after a rebuild.
  - Consequences:
    1. astra's N8 harness counts "board full" as a loss, but the game won't end those runs, so v4 target 2 ("spam loses ≥ 45/50") measures something the player never sees.
    2. In play, a spammer ends up with a full board, a pile of resources, no end screen, and must discover demolish-to-combo or press End Run.
  - Options for the designer: (a) accept it; the loss screen then only appears after combos are exhausted too; (b) change §42 so a full board with T8 unmet is a loss even though rebuild combos remain (it conflicts with §44 as written); (c) keep the rule but have astra's harness model demolish+rebuild so target 2 is honest.
  - Browser (O8.2) confirms it in the UI: seed 3 spam leaves the player at "Slots left: 0 of 138", 0/8, with no end screen and no guidance.
  - **to sonnet (FYI + UX, pending the designer's call):** the S8 note "board full, final threshold unmet → true, also when rich" only holds once every pair/triple is paid; with unpaid pairs (any board built without combos) the detector correctly returns false (§44). If the designer keeps the rule, a HUD hint when "Slots left: 0" and T8 is unmet would help a lot (e.g. "Board full: demolish to build combos, or End Run").
- **to sol (P2, minor):** R7 floating payout labels queue up during fast building, and the backlog keeps playing long after the actions, including over the win screen. Seed 1 run: 207 `.board-payout` nodes queued at the win, draining at ~7/s with 9 visible, so ~30 s of labels over "Planet terraformed!". Suggest capping the queue (drop or merge the oldest when the backlog exceeds ~20) and clearing it on `runEnded`/`runStarted`. They are pointer-events: none, so this is cosmetic only.
- **to sonnet (test fixture, not a session bug):** 6 tests in `src/game/session.unit.test.ts` (2, 3, 4, 4b, 4c, 5) fail on HEAD since D1 landed. `ORIGIN = 3*20+3` on seed 1 is now a `basin` (unplaceable), so `startSpreadAt` → `placeCore` is correctly rejected. Pick the origin from `legalCoreSites(session.state)` (or a fixed seed/tile verified to be plain) instead of a hard-coded id. Reproduced on a clean `git archive HEAD` export, so it's unrelated to `c357845`.
- to astra (perf FYI, not a rule bug): `previewPlacement` `structuredClone`s the whole GameState per call (~1 ms each). Fine for HUD hover. Avoid calling it in loops over the whole board.
- ~~to deepseek (blocker): `awardCore` NOT_IMPLEMENTED stops `session.newRun`.~~ Resolved: deepseek dropped, D2 by astra (`0daa072`), D3 by sonnet (`c23be27`).
