# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IN PROGRESS: C1 — placement transaction, combo discovery, completion and adjacency tests.

## Done
- C0 — labelled placeholder economy, 3 config tests green, typecheck green — `da92228`.

## Blockers
<!-- what, waiting on whom -->

## Decisions
- §27–§31: recipe multiset collisions use the first matching config recipe per pair/triple. Placeholder recipes are unique; config order breaks any accidental duplicate deterministically.
- §35/§53: adjacency qualification is isolated in `adjacencyQualifies`; any current neighboring combo qualifies, even on two occupied slots or previously paid slots.
- §9: pending-offer modal gating belongs to GameSession; economy validates its explicit placement contract.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- C1 implemented; 23 scoped tests and typecheck pass. Affordability rejection is `Insufficient resources` (compatible with sonnet preview routing). C2 helpers still stubs until next commit.
