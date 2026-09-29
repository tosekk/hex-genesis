# Status — `opus`

Only `opus` edits this file. Everyone else reads it.

## Current
IN PROGRESS: O3 integration (waiting on deepseek D2 offers for a playable loop) + O4 autoplay (built; real-module run waits on deepseek D2/D3). O5 ongoing.

## Done
<!-- - <task id> — <one line> — <commit hash> -->
- O1: M0 DONE `4e877b6` (foundation, contracts, stubs). Committed by the human.
- O2: spread engine (`src/sim/spread/spread.ts`) with 26 tests in `spread.test.ts`, all green. Covers every O2 required test plus min-depth conversion, discard-and-continue, and a perf check (< 5 ms on 20×14). Shipped in `4e877b6`.
- O3 (partial, `823728d`): `bindBoard` wires runStarted/spreadStarted/tilesRevealed/spreadFinished/hexChanged to the real BoardView, incl. the `locked` highlight for the active claim set (§11). `main.ts` starts the frame loop BEFORE `newRun`, so a throw can't blank the board. The dev error overlay dedupes repeats. Browser-verified against the real board + HUD: board and HUD render; the run stops at `awardCore` NOT_IMPLEMENTED (deepseek).
- O4 (partial, `823728d`): `tests/e2e/` has `assertInvariants` (§52), a greedy bot driving only the GameSession API, and threshold tuning output.
  - `autoplay.test.ts` uses the real modules and self-skips until offers/endgame stop throwing.
  - `autoplay.fallback.test.ts` swaps in minimal fakes ONLY for functions that still throw NOT_IMPLEMENTED. It passes today: seeds 1–5, invariants checked after every action, and a replay-determinism check.

## Blockers
<!-- none -->

## Decisions
<!-- - §<n>: <ambiguity> → <chosen reading> (why) -->
- §13 pool as budget: Dijkstra pops by (cumulative cost, HexId). The pool is charged each tile's own step cost, not its cumulative cost. A popped node whose step cost exceeds the remaining pool is discarded, and the search continues with later nodes until the queue empties or the pool reaches 0. This follows "claims … until the pool has been consumed".
- §13 origin costs `costUnit` (one flat tile). Flat dead board → 69 claims, `poolUsed` 276.
- §13 mountain step cost = plain slope cost (no natural ×2). Mountains are claimed as `kind: 'mountain'` and never expanded from. A mountain claimed by an earlier spread is still dead, so a later spread may enter it again (pool spent, nothing changes).
- §17 conversion cost = `ceil(base × 0.5)`, where base is the slope cost, ×2 if the foreign tile is natural terrain.
- §17 depth is the SHALLOWEST depth the spread reaches a foreign tile at. If a converted tile is first reached deep (a cheaper path through the foreign region) and later reached shallower, it expands again at the shallower depth without spending pool again. Without this, a cheap depth-2 claim could block a legitimate depth-1 route and cut conversion short.
- §17 inside a foreign region, the spread continues only into tiles of the SAME foreign biome (snapshot biome). It never enters dead land, a different main biome, the spread's own biome, or mixed tiles from a converted tile.
- §16 same-biome and §18 mixed neighbours are never queued (no claim, no cost, no expansion).
- O4 bot = "sensible greedy player". It fills the fullest unlocked hex first and scores buildings by weighted yield, where a resource the next threshold still needs weighs 2, otherwise 0.5, +1 if stock < 6, net of 0.5 × weighted cost. It picks the offer biome covering fewer tiles, places the core with the most non-mountain claims, and never demolishes. A naive "max total yield" bot soft-locked on seeds 2–4, so the weighting matters for the tuning numbers.
- .gitignore: `.claude/` (local Claude Code launch config/settings) is ignored, not committed. All agents share one checkout, so the file already exists for everyone, and `.claude/` isn't in the ownership map.
- `revealSpread` never clears `activeSpread`, even when every claim is revealed. The session must call `finishSpread` to end it.

## Contract requests
<!-- - <file>: <exact proposed TypeScript> — reason -->

## Bugs found in others' modules
<!-- - owner: <tag> · input · expected · actual · §ref -->

## Notes for others
- M0 is in (`4e877b6`). The stubs in your paths are yours (header `// OWNER: <tag> — stub from O1`). Replace freely.
- Extra `src/core/state.ts` helpers (additive, not in CONTRACTS): `createHex(id, col, row, elevation, terrain, decoration)` builds a fresh dead empty hex with `placeable` derived from terrain (deepseek: use it in mapgen). `stateFromHexes(seed, config, cols, rows, hexes, nowMs)` wraps a board in an empty run state.
- `makeTestState(opts = {})`: every option is optional. Defaults: 20×14, flat, `'plain'`, dead. A `'mountain'` with no explicit elevation gets `levels-1`. `seed = 0`, `runStartMs = 0`.
- `src/sim/spread/spread.ts`: `isLegalCoreSite`, `legalCoreSites`, and `isHexLocked` are already real. The whole spread API is now real (O2 done). `spreadPool(cfg)` and `stepCost(cfg, fromElev, toElev)` are also exported.
- Vitest env is `node` by default. For DOM tests, add `// @vitest-environment happy-dom` at the top of the test file.
- `RngState.s` is a uint32. `nextInt(n)` is unbiased (rejection sampling), so it may consume more than one `nextU32()`.

## Contract changelog
<!-- - <commit> · <change> · requested by <tag> -->

## Integration log
- Autoplay tuning, economy v1 (`7144980`), **stub flat map** (all 280 hexes placeable, so 6 cores cover the board). Placements needed per threshold:
  - seed 1: [6, 12, 12, 52, 16, 13, 63, 25] → won at 840 placements
  - seed 2: [6, 7, 10, 20, 33, 31, 36, 45] → won
  - seed 3: [6, 10, 50, 11, 22, 27, 28, 46] → won
  - seed 4: [6, 10, 39, 32, 112, 31, 40, 33] → won
  - seed 5: [6, 12, 12, 52, 68, 28, 35, 54] → won
  - Observations (astra, for tuning, not bugs): all 8 thresholds fall within the first ~200–350 of 840 placements, and then ~550–650 placements earn nothing progression-wise. Spikes (52, 112, 50) come from a single resource bottleneck (usually water or stone) when the placed biomes don't produce it. Leftover stock at the end is lopsided (e.g. wood 1052 / stone 4). Re-run once deepseek's real map lands: fewer placeable hexes will shift everything. Run: `npx vitest run tests/e2e`.

## Bugs routed
<!-- - to <tag>: <report> -->
- to astra (perf FYI, not a rule bug): `previewPlacement` `structuredClone`s the whole GameState per call (~1 ms each in vitest workers, sometimes far worse). Fine for HUD hover (≤ 9 calls). Avoid calling it in loops over the whole board.
- to deepseek (blocker): `awardCore` NOT_IMPLEMENTED stops `session.newRun` in the browser, so there's no playable loop until D2 lands. `checkWin`/`isProvablySoftLocked` (D3) are needed right after that.
