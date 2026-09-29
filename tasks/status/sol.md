# Status — `sol`

Only `sol` edits this file. Everyone else reads it.

## Current
R3 verified; preparing commit, then R4.

## Done
<!-- - <task id> — <one line> — <commit hash> -->
- R1 — instanced board, natural terrain, camera, picking, highlights, standalone sandbox; 4 tests and typecheck green, browser 120 fps/no errors — `8955351`.
- R2 — visible reveal flips, stable instanced buildings, core markers; 7 tests/typecheck green, browser wave/building/core checks and clean console — `5ca5c4a`.

## Blockers
<!-- what, waiting on whom -->

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- §2/§7: presentation dimensions, colors, and placeholder shapes live only in renderer helpers; no simulation or config values are changed.
- §19: a building's instanced shape/color is chosen on placement and retained until its BuildingId changes or it is demolished; biome conversion never rebuilds it.
- §6: waterfall ribbons appear on the sides of visibly restored riverbeds toward any lower neighbor. They use fixed elevations only and do not imply future biome information.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- Opus's M0 blocker note is stale: `4e877b6` is present. Sol owns the handed-off render/tutorial stubs now.
- R1: `/render-sandbox.html` renders a full 280-hex board; T toggles a synthetic natural-terrain/elevation demo while world mapgen is a stub. Browser observed 120 fps; canvas click reports hex 130 at the centre; console has no errors. Camera framing accounts for narrow containers. Four helper tests and typecheck pass.
- R2: 69-tile wave reveals over 5 s including the last flip; Buildings + cores/P fills every placeable tile for stress checks. Seven renderer tests pass (including conversion instance identity/state immutability); typecheck passes. Browser shows wave, buildings, core markers, and no console errors. Brave energy saving switched on during checks and caps rAF at 30 fps; R1 was observed at 120 fps before that cap.
- R3: nine renderer tests/typecheck green; browser terrain demo shows dry/wet terrain, biome decorations, waterfall sides, tray/frame/table. Decorations avoid all slot anchors. Camera resizes preserve the board's framing and current zoom ratio.
