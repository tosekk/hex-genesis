# Status — `sol`

Only `sol` edits this file. Everyone else reads it.

## Current
IN PROGRESS: V3 verified — committing optional audio and precise Opus wiring handoff before V4 polish.

## Done
<!-- - <task id> — <one line> — <commit hash> -->
- R1 — instanced board, natural terrain, camera, picking, highlights, standalone sandbox; 4 tests and typecheck green, browser 120 fps/no errors — `8955351`.
- R2 — visible reveal flips, stable instanced buildings, core markers; 7 tests/typecheck green, browser wave/building/core checks and clean console — `5ca5c4a`.
- R3 — biome decorations, waterfall sides, tray/frame/table and resize framing; 9 tests/typecheck green and browser terrain demo verified — `c02fcd6`.
- R4 — event-driven tutorial, animated face, optional prerecorded voice, VO script and sandbox harness; 16 render/tutorial tests/typecheck green, scoped production build/browser checks pass — `43ca21b`.
- R6 — win conditions match §41; biome resource identities/mountain mine bonus from economy v1, quick-build hint retained, all VO text synchronized; 7 tutorial tests/typecheck green — `5f627e0`.
- R5 — 24 home-biome procedural models, packed instancing, labeled gallery and 840-building/five-layer load test; 12 renderer tests/typecheck/build green, browser observed 120 fps/clean console — `e8f1624`.
- R7 — optional payout method requested; no approval found in Opus's contract changelog or core contract, so implementation skipped as instructed — request/status commit `4ac133e`.
- R8 — four resource/six biome SVG icons, accessible 24×24 assets and 16/24/48px light/dark review page; XML/browser checks pass, 19 scoped tests/typecheck green — `5ebeb94`.
- R4-fix — automatic session-event progression, bottom-left collapsible panel, real seed-1 all-step regression; 9 tutorial tests/typecheck and scoped production build pass — `28d632e`.
- R1-fix — invisible full-size tile footprint picking closes corner gaps; elevation/off-board regressions, 14 renderer tests and typecheck pass — `c26b7c3`.
- R4-check — Opus's routed first-card auto-advance report is already covered by `28d632e`; confirmed direct event replacement and reran all 9 tutorial tests, including the real seed-1 five-step sequence. No further tutorial edits required — verification/status commit `e8a1be6`.
- R7 — approved `showPayouts` implemented with ordered, camera-projected rise/fade labels; 26 scoped tests/typecheck/build pass — `0d6afd8`.
- V1 — reviewed D4 seeds 1–20, connected bends/branches and water-only falls; live-recipe tutorial regression, 27 scoped tests/typecheck pass — `925ad36`.
- V2 — sandbox size overrides, fitted camera/zoom/pan/table, edge picks and live diagnostics; all three filled-board sizes measured 120 FPS / 59 calls; 33 scoped tests/typecheck/build pass — `7edfb22`.

## Blockers
<!-- what, waiting on whom -->

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- §2/§7: presentation dimensions, colors, and placeholder shapes live only in renderer helpers; no simulation or config values are changed.
- R1-fix / §4: picking uses an invisible full-radius hex at each fixed tile elevation, independent of inset visual tops and reveal flips. The surface follows the exact board footprint, so points outside the board remain unpicked. It adds no draw call and is disposed with the board.
- §19: a building's instanced shape/color is chosen on placement and retained until its BuildingId changes or it is demolished; biome conversion never rebuilds it.
- §6 / V1: waterfall ribbons appear on visibly restored riverbeds toward lower water-terrain neighbors. River arms follow fixed riverbed/basin neighbors; dense junctions omit bank fencing. No future biome or spread claims are read. This replaces the earlier all-lower-neighbor decorative fallback, which spilled over unrelated dry land.
- §46/§47: optional MP3s are discovered with Vite at build time; absent recordings use text without issuing missing-file requests. Restart Vite/rebuild after adding recordings. Browser autoplay rejection also falls back to text.
- §46 / R4-fix: each first trigger immediately replaces the current step; Next dismisses it and never gates later event steps. Skip/run end hide the tutorial for the rest of the run. Initial core award is excluded from progression guidance. Mute/collapse persist for the tutorial instance; collapsed panels track the latest step without speaking. No commands or focus traps are added.
- R5/§19: named models use their building's home biome, never the current tile biome. Unknown ids retain the generic hash-colored fallback. Parts are merged with vertex colors into one instanced batch per model; densely packed active instances keep the rendered building count at ≤840.
- R7/§29: one decorative text label per payout event, scheduled in received order across calls with 140 ms staggering and a 1.2 s rise/fade. Resource text follows config order. Same-hex lines separate vertically; camera/viewport projection follows the board. No state, commands, payout calculation, or HUD notifications are changed. Clear on `setBoard` and dispose; overlays never intercept input or duplicate accessibility announcements.
- V1 / §46: the real-session tutorial regression chooses a two-building recipe from the live offered biome's roster instead of assuming duplicate recipes exist. Astra removed twin_quarries/meltwater during overnight balance work; all event-driven coverage remains real and unchanged.
- V2 / §3–§4: `cols`/`rows` overrides are sandbox-only copies of the config, bounded to 2–60 / 2–40; production MAP remains unchanged. Camera framing fits all board/frame corners at the start angle, includes peaks, preserves zoom ratio on resize, and scales near/far zoom limits and pan margins. Picking retains exact per-tile footprints. Renderer diagnostics are a canvas WeakMap helper, not a new BoardView contract.
- V3 / §46–§47: music/SFX use optional build-time MP3 discovery (restart dev/rebuild after file drops) to avoid missing-file requests. First pointer/keyboard gesture unlocks playback; only the current opening offer cue is deferred, never a backlog. Corrupt assets are disabled per instance; policy rejection may retry later. Tile pitch randomness is presentation-only. Adjacent-only payout events are silent, per the specified base/pair/triple mapping. Mute/volume control music/SFX; tutorial narration retains its existing separate mute. Controls sit bottom-right at `right:150px;bottom:12px`, beside Help/End Run and below Codex.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->
- R7 — APPROVED and committed by Opus as `c357845` (`[opus] CONTRACT`): additive optional member in `src/core/contracts.ts` → `BoardView`:
  ```ts
  showPayouts?(state: Readonly<GameState>, events: PayoutEvent[]): void;
  ```
  Purpose: presentation-only staggered floating numbers over hexes, preserving event resolution order. Opus's `src/app/bindBoard.ts` now calls `board.showPayouts?.(state, e.events)` for `payouts`. HUD toasts remain authoritative. Sol implements only the renderer; earlier skip was before this approval.

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- **V3 / Opus main.ts wiring required:** add `import { createAudio } from './audio/audio';`, then `const audio = createAudio(document.getElementById('ui')!, session);` after session creation and before `session.newRun(...)`. No frame-loop call. Dispose with other factory handles if a teardown path is added. Sol did not edit main.ts, HUD, contracts, or config.
- V3 asset handoff: `public/audio/AUDIO_LIST.md` lists all 14 exact MP3 paths, triggers, lengths and generation prompts. Drop music/SFX under those paths and restart Vite/rebuild; VO scripts remain separate. Sandbox uses the same factory via a synthetic event adapter: R = core/flip/done, B/X = model add/remove, P = populate, F = combo payout. Browser verified the corner widget, persisted mute across reload, and a reveal with all sounds absent: no visible console errors/warnings (optional debug messages hidden). No recordings exist yet, so actual authored sound quality is not evaluated. 39 scoped tests, typecheck and scoped production build pass; 6 new audio tests cover all mapped cues, ≤12/s flips/pitch, persistence, blocked storage, corrupt/missing media, autoplay recovery and cleanup.
- V2: use `/render-sandbox.html?seed=7&cols=30&rows=20&load=1&viewport=1280x720` for an all-plain five-layer stress board with all 1,800 slots occupied. Remove `load` for the generated map; remove `viewport` to fit the browser window. L uses the current dimensions, not a hard-coded 840. Diagnostics report actual rAF FPS and Three render calls/triangles.
- V2 browser measurements in Brave on this machine, 1280×720 CSS canvas, renderer pixel ratio capped at 2, settled one-second samples at default camera (synthetic all-plain five-layer boards, all 24 model types):

  | Board | Buildings | FPS | Draw calls | Triangles |
  |---|---:|---:|---:|---:|
  | 20×14 | 840 | 120 | 59 | 383,102 |
  | 26×18 | 1,404 | 120 | 59 | 640,682 |
  | 30×20 | 1,800 | 120 | 59 | 821,634 |

  V2 checks: 33 render/tutorial tests and typecheck pass. Includes elevated-corner framing for landscape/narrow views, row parity, all four edge corner-gap picks, pan bounds, and config immutability. This is one workstation measurement, not a cross-hardware guarantee.
- V1: browser reviewed every D4 run seed 1–20 at `/src/render/qa.html` in five four-map sheets. Fixed north–south-only river channels to follow water neighbors, narrowed banks and removed fencing on dense junctions, restricted falls to water outlets. No broken peaks/decor overlap observed; six visible color bands distinguish mixed biomes at the default view. QA bands are explicitly synthetic presentation state, not a played run. 27 render/tutorial tests and typecheck pass; new branch/dry-land waterfall regression included.
- R7 / Opus handoff: renderer now implements your approved `showPayouts` method; your existing `bindBoard` payout hook needs no edits. F in `/render-sandbox.html` shows a synthetic base/pair/triple/adjacency sequence over the hovered hex (or first placeable hex). Three payout tests verify sequence across calls, readable same-hex spacing, camera tracking, lifetime/reset/disposal, off-screen clipping, and unchanged state/event inputs. All 26 render/tutorial tests, typecheck, and scoped sandbox production build pass (existing Three.js chunk-size warning only). Fresh browser verification is not claimed because the shared native browser remains in another ongoing playthrough.
- R4-check / Opus routed UX nit: `28d632e` removes the queue and invokes `showStep` directly on each first R4 event, so the first card is replaced by `spreadStarted` without Next. The real-session all-step test and collapse/repeat/Skip tests remain green (9 total). This is the same bug Sonnet reported, already fixed.
- R1-fix / Opus routed P1: a downward ray at a tile's corner (`centre.z + 0.98`) misses every visual top but now selects the correct hex through the full-size hidden pick surface. Regression also covers off-board rejection and elevation. Fourteen renderer tests and typecheck pass.
- Opus's M0 blocker note is stale: `4e877b6` is present. Sol owns the handed-off render/tutorial stubs now.
- R1: `/render-sandbox.html` renders a full 280-hex board; T toggles a synthetic natural-terrain/elevation demo while world mapgen is a stub. Browser observed 120 fps; canvas click reports hex 130 at the centre; console has no errors. Camera framing accounts for narrow containers. Four helper tests and typecheck pass.
- R2: 69-tile wave reveals over 5 s including the last flip; Buildings + cores/P fills every placeable tile for stress checks. Seven renderer tests pass (including conversion instance identity/state immutability); typecheck passes. Browser shows wave, buildings, core markers, and no console errors. Brave energy saving switched on during checks and caps rAF at 30 fps; R1 was observed at 120 fps before that cap.
- R3: nine renderer tests/typecheck green; browser terrain demo shows dry/wet terrain, biome decorations, waterfall sides, tray/frame/table. Decorations avoid all slot anchors. Camera resizes preserve the board's framing and current zoom ratio.
- R4: 16 render/tutorial tests and typecheck pass. Browser event harness walks all five tutorial steps, verifies Next/Mute/Skip, and shows zero console messages with missing VO. Scoped production build of `render-sandbox.html` succeeds to `/private/tmp/sol-render-build` (including an optional-asset discovery probe, removed afterward); Three.js bundle size warning only.
- Handoff: factories retain the frozen signatures. App binding already calls setBoard/playReveal/refreshHex/setCores; tutorial self-subscribes. `/render-sandbox.html` has a Tutorial event demo button for exercising steps without WIP session dependencies. VO copy and export paths are in `src/tutorial/VO_SCRIPT.md`. Full session walkthrough awaits deepseek's world/offers/endgame implementation; Sol's standalone checks do not claim that integrated loop is complete.
- R5: G / 24-building gallery shows all named models on eight labeled tiles, deliberately using differing tile biomes. L / 840-building load test renders 280 synthetic placeable tiles at five layers with all 840 slots filled: observed 120 fps in Brave on this machine, clean console. Named model parts use merged vertex-colored geometries and packed instancing; model footprint radius ≤0.23. Twelve renderer tests (19 render/tutorial combined), typecheck, and scoped sandbox production build pass.
- R8 / Sonnet handoff: resource files are `public/assets/icons/wood.svg`, `public/assets/icons/stone.svg`, `public/assets/icons/water.svg`, `public/assets/icons/food.svg`.
- R8 / Sonnet handoff: biome files are `public/assets/icons/forest.svg`, `public/assets/icons/desert.svg`, `public/assets/icons/arctic.svg`, `public/assets/icons/steppe.svg`, `public/assets/icons/taiga.svg`, `public/assets/icons/polarDesert.svg` (case matches the Biome id).
- All ten icons use a transparent 24×24 viewBox, flat fills, matching 1.8px rounded outlines and accessible titles. XML validation passes; browser preview at `/src/render/iconPreview.html` verifies 16/24/48px on light/dark backgrounds. HUD image URLs should respect Vite's base, e.g. `${import.meta.env.BASE_URL}assets/icons/wood.svg`. No UI edits.
- Updated integration context from the team's latest status: D2 offers and D3 endgame are now implemented; D1 world generation is progressing under astra. Earlier R4's flat-map/deepseek dependency note above describes that earlier verification only.
- R4-fix / Sonnet report: seed-1 real `GameSession` regression reproduced `spreadStarted` leaving the panel on `biomes` before the fix. The test now reaches all five steps through actual offer/core/spread/building/combo/threshold commands and checks repeated offers do not reset progression. Panel moves to the bottom-left above HUD controls, with an accessible Collapse/Expand button. Nine tutorial tests, typecheck, and scoped sandbox production build pass (existing Three.js bundle-size warning only). Fresh visual verification could not complete because the shared native browser was concurrently controlled elsewhere; no visual verification is claimed for this fix.
