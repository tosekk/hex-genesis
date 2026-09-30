# Status — `opus`

Only `opus` edits this file. Everyone else reads it.

## Current
IN PROGRESS: O6.4, waiting for astra's N7 commit (economy v3, 8 thresholds). Then: autoplay + pacing re-run and a full browser run to a win.
O6.1 packaging ✅ `fc24fda` · O6.2 audio wiring ✅ `fc24fda` · O6.3 reviews ✅ (D4, N4, N6 all PASS; see Integration log).

## Done
<!-- - <task id> — <one line> — <commit hash> -->
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
- `c357845` · `BoardView.showPayouts?(state: Readonly<GameState>, events: PayoutEvent[]): void` added to `src/core/contracts.ts`. It is additive and optional, presentation only: it must never mutate state, and HUD toasts stay authoritative. `src/app/bindBoard.ts` calls `board.showPayouts?.(state, e.events)` on every `payouts` SessionEvent, in resolution order. · requested by sol (R7)

## Integration log
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
- **to sol (P1 usability):** clicks in the thin gaps between tile tops are silently ignored. `pick()` raycasts only `tops` (radius 0.95 vs spacing 1.0), so a ray through a gap hits nothing. Repro: HEAD build, `?seed=7`, default camera, 1024×768; a synthetic pointerdown/up at client (454,454) returns null, while (450,450) → tile 8,11 and (458,458) → tile 9,11. A 20 px grid scan finds ~5% of on-board points are dead, mostly tile corners, which is where players naturally click. Suggestion: raycast an invisible full-size (radius 1.0) pick mesh, or fall back to the nearest hex centre at the hit plane.
- to sonnet (cosmetic): after a win, the hex panel stays open behind the end screen with live "Demolish" buttons (the session rejects them, since the run is over). Close/hide the panel on `runEnded`.
- to sonnet (minor): "New Run" with a typed seed on the end screen doesn't update `?seed=` in the URL, so a reload replays the previous seed.
- to sol (UX nit): the first tutorial card ("Choose Forest, Desert, or Arctic…") stays up for the whole run unless the player clicks Next. Consider auto-advancing when the next queued event arrives.
- **to sonnet (test fixture, not a session bug):** 6 tests in `src/game/session.unit.test.ts` (2, 3, 4, 4b, 4c, 5) fail on HEAD since D1 landed. `ORIGIN = 3*20+3` on seed 1 is now a `basin` (unplaceable), so `startSpreadAt` → `placeCore` is correctly rejected. Pick the origin from `legalCoreSites(session.state)` (or a fixed seed/tile verified to be plain) instead of a hard-coded id. Reproduced on a clean `git archive HEAD` export, so it's unrelated to `c357845`.
- to astra (perf FYI, not a rule bug): `previewPlacement` `structuredClone`s the whole GameState per call (~1 ms each). Fine for HUD hover. Avoid calling it in loops over the whole board.
- ~~to deepseek (blocker): `awardCore` NOT_IMPLEMENTED stops `session.newRun`.~~ Resolved: deepseek dropped, D2 by astra (`0daa072`), D3 by sonnet (`c23be27`).
