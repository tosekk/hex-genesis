# Status — `sol`

Only `sol` edits this file. Everyone else reads it.

## Current
IN PROGRESS: R7 — approved optional `showPayouts` contract is committed as `c357845`; implementing staggered board payout labels in `src/render/**`.

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
- R4-check — Opus's routed first-card auto-advance report is already covered by `28d632e`; confirmed direct event replacement and reran all 9 tutorial tests, including the real seed-1 five-step sequence. No further tutorial edits required.

## Blockers
<!-- what, waiting on whom -->

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- §2/§7: presentation dimensions, colors, and placeholder shapes live only in renderer helpers; no simulation or config values are changed.
- R1-fix / §4: picking uses an invisible full-radius hex at each fixed tile elevation, independent of inset visual tops and reveal flips. The surface follows the exact board footprint, so points outside the board remain unpicked. It adds no draw call and is disposed with the board.
- §19: a building's instanced shape/color is chosen on placement and retained until its BuildingId changes or it is demolished; biome conversion never rebuilds it.
- §6: waterfall ribbons appear on the sides of visibly restored riverbeds toward any lower neighbor. They use fixed elevations only and do not imply future biome information.
- §46/§47: optional MP3s are discovered with Vite at build time; absent recordings use text without issuing missing-file requests. Restart Vite/rebuild after adding recordings. Browser autoplay rejection also falls back to text.
- §46 / R4-fix: each first trigger immediately replaces the current step; Next dismisses it and never gates later event steps. Skip/run end hide the tutorial for the rest of the run. Initial core award is excluded from progression guidance. Mute/collapse persist for the tutorial instance; collapsed panels track the latest step without speaking. No commands or focus traps are added.
- R5/§19: named models use their building's home biome, never the current tile biome. Unknown ids retain the generic hash-colored fallback. Parts are merged with vertex colors into one instanced batch per model; densely packed active instances keep the rendered building count at ≤840.

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
