# Status — `sol`

Only `sol` edits this file. Everyone else reads it.

## Current
R1 implementation and verification complete; preparing commit, then R2.

## Done
<!-- - <task id> — <one line> — <commit hash> -->

## Blockers
<!-- what, waiting on whom -->

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- §2/§7: presentation dimensions, colors, and placeholder shapes live only in renderer helpers; no simulation or config values are changed.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- Opus's M0 blocker note is stale: `4e877b6` is present. Sol owns the handed-off render/tutorial stubs now.
- R1: `/render-sandbox.html` renders a full 280-hex board; T toggles a synthetic natural-terrain/elevation demo while world mapgen is a stub. Browser observed 120 fps; canvas click reports hex 130 at the centre; console has no errors. Camera framing accounts for narrow containers. Four helper tests and typecheck pass.
