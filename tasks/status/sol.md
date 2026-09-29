# Status — `sol`

Only `sol` edits this file. Everyone else reads it.

## Current
IDLE — available. R1 → R2 → R3 → R4 complete; all Sol changes committed.

## Done
<!-- - <task id> — <one line> — <commit hash> -->
- R1 — instanced board, natural terrain, camera, picking, highlights, standalone sandbox; 4 tests and typecheck green, browser 120 fps/no errors — `8955351`.
- R2 — visible reveal flips, stable instanced buildings, core markers; 7 tests/typecheck green, browser wave/building/core checks and clean console — `5ca5c4a`.
- R3 — biome decorations, waterfall sides, tray/frame/table and resize framing; 9 tests/typecheck green and browser terrain demo verified — `c02fcd6`.
- R4 — event-driven tutorial, animated face, optional prerecorded voice, VO script and sandbox harness; 16 render/tutorial tests/typecheck green, scoped production build/browser checks pass — `43ca21b`.

## Blockers
<!-- what, waiting on whom -->

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- §2/§7: presentation dimensions, colors, and placeholder shapes live only in renderer helpers; no simulation or config values are changed.
- §19: a building's instanced shape/color is chosen on placement and retained until its BuildingId changes or it is demolished; biome conversion never rebuilds it.
- §6: waterfall ribbons appear on the sides of visibly restored riverbeds toward any lower neighbor. They use fixed elevations only and do not imply future biome information.
- §46/§47: optional MP3s are discovered with Vite at build time; absent recordings use text without issuing missing-file requests. Restart Vite/rebuild after adding recordings. Browser autoplay rejection also falls back to text.
- §46: tutorial steps queue once per run, require Next to dismiss, and are cleared on Skip/run end. Initial core award is excluded from progression guidance; mute persists for the lifetime of the tutorial instance. No commands or focus traps are added.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- Opus's M0 blocker note is stale: `4e877b6` is present. Sol owns the handed-off render/tutorial stubs now.
- R1: `/render-sandbox.html` renders a full 280-hex board; T toggles a synthetic natural-terrain/elevation demo while world mapgen is a stub. Browser observed 120 fps; canvas click reports hex 130 at the centre; console has no errors. Camera framing accounts for narrow containers. Four helper tests and typecheck pass.
- R2: 69-tile wave reveals over 5 s including the last flip; Buildings + cores/P fills every placeable tile for stress checks. Seven renderer tests pass (including conversion instance identity/state immutability); typecheck passes. Browser shows wave, buildings, core markers, and no console errors. Brave energy saving switched on during checks and caps rAF at 30 fps; R1 was observed at 120 fps before that cap.
- R3: nine renderer tests/typecheck green; browser terrain demo shows dry/wet terrain, biome decorations, waterfall sides, tray/frame/table. Decorations avoid all slot anchors. Camera resizes preserve the board's framing and current zoom ratio.
- R4: 16 render/tutorial tests and typecheck pass. Browser event harness walks all five tutorial steps, verifies Next/Mute/Skip, and shows zero console messages with missing VO. Scoped production build of `render-sandbox.html` succeeds to `/private/tmp/sol-render-build` (including an optional-asset discovery probe, removed afterward); Three.js bundle size warning only.
- Handoff: factories retain the frozen signatures. App binding already calls setBoard/playReveal/refreshHex/setCores; tutorial self-subscribes. `/render-sandbox.html` has a Tutorial event demo button for exercising steps without WIP session dependencies. VO copy and export paths are in `src/tutorial/VO_SCRIPT.md`. Full session walkthrough awaits deepseek's world/offers/endgame implementation; Sol's standalone checks do not claim that integrated loop is complete.
