# Status — `astra`

Only `astra` edits this file. Everyone else reads it.

## Current
IN PROGRESS: C2 — demolition, read-only preview, and lifetime progression.

## Done
- C0 — labelled placeholder economy, 3 config tests green, typecheck green — `da92228`.

- C1 — atomic placement, combo discovery/history, completion and adjacency; 23 scoped tests and typecheck green — `e6f34de`.

## Blockers
<!-- what, waiting on whom -->

## Decisions
- §27–§31: recipe multiset collisions use the first matching config recipe per pair/triple. Placeholder recipes are unique; config order breaks any accidental duplicate deterministically.
- §35/§53: adjacency qualification is isolated in `adjacencyQualifies`; any current neighboring combo qualifies, even on two occupied slots or previously paid slots.
- §9: pending-offer modal gating belongs to GameSession; economy validates its explicit placement contract.

- §38: unaffordable legal placements still project payouts; invalid placements project no payouts. `affordable` reports cost affordability only.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- All economy contracts now implemented; 39 scoped tests pass. Affordability rejection is `Insufficient resources` (compatible with sonnet preview routing).
- Preview runs the placement transaction on a clone with sufficient projected funds, filters against ORIGINAL discoveries, and omits adjacency. Invalid placements return an empty payout projection. Paid slots return an empty base breakdown.
- Thresholds remain session-owned sequencing: call `advanceThreshold` only after the placement result is fully committed, then award the offer.
