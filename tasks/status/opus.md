# Status — `opus`

Only `opus` edits this file. Everyone else reads it.

## Current
BLOCKED on committing M0 (see Blockers). O1 and O2 code are complete and green. Next up: O3 (waits on session/board/hud) and O4 prep.

## Done
<!-- - <task id> — <one line> — <commit hash> -->
- O1: foundation code complete. `npm test` (19 tests) and `npm run typecheck` green, `npm run build` OK, dev server shows no console errors. Commit pending.
- O2: spread engine (`src/sim/spread/spread.ts`) with 26 tests in `spread.test.ts`, all green. Covers every O2 required test plus min-depth conversion, discard-and-continue, and a perf check (< 5 ms on 20×14). Commit pending.
- O3 groundwork: `src/app/bindBoard.ts`, `src/app/errorOverlay.ts`, and `src/main.ts` (seed from `?seed=`, rAF loop with dt clamp, resize) are written and run against the stubs.

## Blockers
- The M0 commit (`[opus] M0 foundation, contracts, stubs`) was blocked by the tool's permission guard. Waiting on the human to commit it or allow it. **Other agents: M0 is not in `git log` yet, so don't start.**

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- §13 pool as budget: Dijkstra pops by (cumulative cost, HexId). The pool is charged each tile's own step cost, not its cumulative cost. A popped node whose step cost exceeds the remaining pool is discarded, and the search continues with later nodes until the queue empties or the pool reaches 0. This follows "claims … until the pool has been consumed".
- §13 origin costs `costUnit` (one flat tile). Flat dead board → 69 claims, `poolUsed` 276.
- §13 mountain step cost = plain slope cost (no natural ×2). Mountains are claimed as `kind: 'mountain'` and never expanded from. A mountain claimed by an earlier spread is still dead, so a later spread may enter it again (pool spent, nothing changes).
- §17 conversion cost = `ceil(base × 0.5)`, where base is the slope cost, ×2 if the foreign tile is natural terrain.
- §17 depth is the SHALLOWEST depth the spread reaches a foreign tile at. If a converted tile is first reached deep (a cheaper path through the foreign region) and later reached shallower, it expands again at the shallower depth without spending pool again. Without this, a cheap depth-2 claim could block a legitimate depth-1 route and cut conversion short.
- §17 inside a foreign region, the spread continues only into tiles of the SAME foreign biome (snapshot biome). It never enters dead land, a different main biome, the spread's own biome, or mixed tiles from a converted tile.
- §16 same-biome and §18 mixed neighbours are never queued (no claim, no cost, no expansion).
- `revealSpread` never clears `activeSpread`, even when every claim is revealed. The session must call `finishSpread` to end it.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- Once M0 is committed, the stubs in your paths are yours (header `// OWNER: <tag> — stub from O1`). Replace freely.
- Extra `src/core/state.ts` helpers (additive, not in CONTRACTS): `createHex(id, col, row, elevation, terrain, decoration)` builds a fresh dead empty hex with `placeable` derived from terrain (deepseek: use it in mapgen). `stateFromHexes(seed, config, cols, rows, hexes, nowMs)` wraps a board in an empty run state.
- `makeTestState(opts = {})`: every option is optional. Defaults: 20×14, flat, `'plain'`, dead. A `'mountain'` with no explicit elevation gets `levels-1`. `seed = 0`, `runStartMs = 0`.
- `src/sim/spread/spread.ts`: `isLegalCoreSite`, `legalCoreSites`, and `isHexLocked` are already real. The whole spread API is now real (O2 done). `spreadPool(cfg)` and `stepCost(cfg, fromElev, toElev)` are also exported.
- Session stub (`src/game/session.ts`): `newRun`/`subscribe`/`state`/`advance` work (emits `runStarted`); commands throw.
- Vitest env is `node` by default. For DOM tests, add `// @vitest-environment happy-dom` at the top of the test file.
- `RngState.s` is a uint32. `nextInt(n)` is unbiased (rejection sampling), so it may consume more than one `nextU32()`.

## Contract changelog
<!-- - <commit> · <change> · requested by <tag> -->

## Integration log

## Bugs routed
<!-- - to <tag>: <report> -->
