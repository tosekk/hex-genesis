# Tasks — `opus` (Opus 5.5 · Claude Code) — Lead: Foundation, Spread, Integration, Release

You are the **lead and contract steward**. The other four agents are blocked until O1 lands, so do O1 first and do it quickly. Your O2 spread engine is the hardest algorithm in the game. Correctness beats speed there.

**You own:** `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `index.html`, `.gitignore`, `README.md`, `src/core/**`, `src/config/index.ts`, `src/config/spread.ts`, `src/sim/spread/**`, `src/main.ts`, `src/app/**`, `tests/e2e/**`, `scripts/**`, `tasks/status/opus.md`.
**Temporary (O1 only):** you create stubs in other agents' paths. After the M0 commit you never touch them again.
**Never edit:** anything else.

Task order: **O1 → O2 → O3 → O4**, plus O5 continuously.

---

## O1 — Foundation and contracts (P0, BLOCKING, target ≤ 45 min)

**Goal:** everyone can import real types and stubs, run Vitest, and start the dev server.

**Steps**

1. Scaffold: `npm init`. Dev deps: `typescript`, `vite`, `vitest`, `happy-dom`, `@types/three`. Dep: `three`. Pin exact versions.
   Scripts: `dev`, `build` (`tsc --noEmit && vite build`), `preview`, `test` (`vitest run`), `typecheck` (`tsc --noEmit`), `package` (O4 fills it in; stub for now).
   `tsconfig`: `strict`, `noUncheckedIndexedAccess: false`, `moduleResolution: bundler`, `target ES2022`, `lib: [ES2022, DOM]`.
   `vite.config.ts`: `base: './'` (required for itch.io), multi-page input incl. `render-sandbox.html` **if it exists** (sol creates it).
   `.gitignore`: `node_modules`, `dist`, `release`.
2. `index.html`: `<div id="board">`, `<div id="ui">`, `<div id="tutorial">`, full-viewport CSS reset, loads `src/main.ts`.
3. Copy `tasks/CONTRACTS.md` §1 and §2 verbatim into `src/core/types.ts` and `src/core/contracts.ts`.
4. Implement for real: `result.ts`, `biomes.ts`, `rng.ts`, `hex.ts`, `resources.ts`, `state.ts`, `testing.ts` (CONTRACTS §3).
   - `rng.ts`: mulberry32 (`Math.imul`, `>>> 0`). `deriveSeed` = integer hash of seed + stream string (e.g. FNV-1a over the string mixed with the seed). `nextInt` must use integer math, never `Math.floor(nextFloat()*n)` bias games that differ by engine. Unsigned modulo on `nextU32()` is acceptable.
   - `hex.ts`: odd-r offset ↔ cube conversion. `neighbors` returns in-bounds ids sorted ascending. `hexToWorld` for pointy-top: `x = size*√3*(col + 0.5*(row&1))`, `z = size*1.5*row`. Render-only, so float math is fine there.
   - `testing.ts`: `makeTestState` builds a board without mapgen. Default config = `DEFAULT_CONFIG` with the map size overridden.
5. Config: `src/config/spread.ts` with `SPREAD` = `{ poolRadius: 4, costUnit: 4, uphillPerLevel: 4 /*PLACEHOLDER*/, downhillPerLevel: 2 /*PLACEHOLDER*/, minStepCost: 1 /*PLACEHOLDER*/, naturalMultiplier: 2, conversionMultiplier: 0.5, maxConversionDepth: 2, minCoreDistance: 6 }` and `ANIMATION = { spreadMaxMs: 5000, tileFlipMs: 350 }`. `src/config/index.ts` assembles `DEFAULT_CONFIG`.
6. Stubs in other agents' paths (exact CONTRACTS §4/§5 signatures, header comment `// OWNER: <tag> — stub from O1, replace freely`):
   - `src/config/map.ts` → `MAP = { cols: 20, rows: 14, levels: 5, params: {} }`
   - `src/config/economy.ts` → a **minimal but runnable** placeholder: resources `['wood','stone']`, 1 building per biome (all 6 biomes), cost ≤ starting stock, one 2-combo, `thresholds: [{wood: 10}]`, refund 0.5, reshuffles 1. All values `// PLACEHOLDER`.
   - `src/sim/world/mapgen.ts` → returns a deterministic trivial map (all plain, elevation 0, placeable, `decoration = rng.nextU32()`)
   - `src/sim/offers.ts`, `src/sim/endgame.ts`, `src/sim/economy/index.ts` → `throw new Error('NOT_IMPLEMENTED: <fn> (owner: <tag>)')`
   - `src/game/session.ts`, `src/render/boardView.ts`, `src/ui/hud.ts`, `src/tutorial/tutorial.ts` → no-op objects that satisfy the interfaces (`createBoardView` returns methods that do nothing; `createGameSession` may throw on commands)
   - your own `src/sim/spread/spread.ts` stub
7. `src/main.ts`: minimal composition (see O3) that doesn't crash with the stubs.
8. Create `tasks/status/opus.md` sections if missing: Contract changelog, Integration log, Bugs routed.
9. Commit **the planning docs plus the foundation** as the first commit: `[opus] M0 foundation, contracts, stubs`.

**Required tests** (`src/core/*.test.ts`)
- rng: the same seed gives the same first 5 values (hard-code the expected vector); different streams from `deriveSeed` differ; `getState`/`rngFromState` round-trips.
- hex: neighbors of corners/edges/odd and even rows; `hexDistance` is symmetric and matches known pairs; `pairKey(a,b) === pairKey(b,a)`; `hexIdOf`/`colRowOf` round-trip.
- resources: `canAfford` treats missing keys as 0.
- state: `createInitialState` has 280 hexes, `hexes[i].id === i`, same seed gives a deep-equal state.

**Definition of done**
- `npm test` and `npm run typecheck` are green on a clean checkout. `npm run dev` serves a page with no console errors.
- Every export in CONTRACTS §3–§5 exists with the exact signature.
- The M0 commit is in `git log`. The status file says `M0 DONE <hash>`.

---

## O2 — Spread engine (P0; mixing is P1 but built in now) — `src/sim/spread/**`

**Spec:** GAME_DESIGN §10–§18, §24 (visibility); AGENT_TASKS §50, §51, §52 (spread invariants), §57 Spread.

**Algorithm (implement exactly; log any deviation under Decisions):**

- **Units:** `U = spread.costUnit`. Pool `P = (3r(r+1) + 1 + 2r) · U` (r=4 → 69·U = 276). **Not** a radius clamp (§12).
- **Step cost** entering B from A: `Δ = B.elev − A.elev`; `step = max(minStepCost, U + uphillPerLevel·max(0,Δ) − downhillPerLevel·max(0,−Δ))`. The origin costs `U`.
- **Target tile rules:**

  | B is | Cost | Result | Expands from B? |
  |---|---|---|---|
  | dead placeable (plain/hill) | `step` | `claim` → spread biome | yes |
  | dead water/woods/marsh | `step · naturalMultiplier` | `claim` → spread biome, stays unplaceable | yes |
  | mountain | `step` | `mountain` (pool spent, biome stays null) | **no** (1 deep, §13) |
  | same main biome | 0 | not claimed | **no**, terminal (§16) |
  | mixed biome | — | not entered | **no** (§18) |
  | foreign main biome | `ceil(base · conversionMultiplier)`, where base includes the natural ×2 if B is natural | `convert` → `mixOf(spread, foreign)` | only into an adjacent tile of the **same foreign biome**, depth +1, while depth < `maxConversionDepth`. Never into dead land or anything else (§17). |
  | already claimed by this spread | — | skip | — |

- **Order:** Dijkstra keyed by `(cumulativeCost, hexId)`, both ascending. Queue entries carry `depth` (0 = normal, 1–2 = inside a foreign biome). Pop a node. If it's already claimed, skip. If `stepCost > remainingPool`, **discard it** (don't claim or expand) and **continue** with later nodes until the queue is empty or the pool reaches 0. This is the pool-as-budget reading ("continues claiming … until the pool has been consumed"). Log it as a Decision.
- **Buildings** on converted tiles are untouched (§19).
- `computeSpread` is **pure**: it reads a snapshot and never mutates. `startSpread` calls it and stores `activeSpread` with `revealed: 0` and `locked` = every claim id (§14).
- `revealSpread` sets `hex.biome = claim.toBiome` for kinds `claim`/`convert` only. Mountains stay null.
- `isLegalCoreSite`: dead (`biome === null`), placeable, and `hexDistance ≥ minCoreDistance` from every `cores[]` entry (§10). Elevation is ignored.
- `startSpread` rejects when `activeSpread` exists (§11), `stackIndex` is out of range, or the site is illegal.

**Required tests** (`src/sim/spread/spread.test.ts`, built on `makeTestState` boards)
1. Flat dead board: exactly 69 claims (if the board is big enough); pool used = 276.
2. Uphill step > flat step > downhill step > 0.
3. Same-biome neighbor: not claimed, costs 0, no claims behind it that were reachable only through it.
4. Mixed tile: never claimed, blocks.
5. Forest spread into a desert region: converts to `steppe`, at most 2 deep, nothing past it, never re-enters dead land from converted tiles.
6. Water/woods/marsh claimed at double cost, still unplaceable afterwards.
7. A mountain range 3 wide: only the first mountain row is touched; nothing behind it is reached through it.
8. `computeSpread` doesn't mutate its input (deep-equal before/after). Revealing tiles doesn't change the remaining claims.
9. Determinism: two identical states give deep-equal results; equal-cost ties resolve by ascending HexId.
10. Legal core site: distance 5 rejected, 6 accepted, elevation irrelevant. Non-dead or unplaceable tiles rejected.
11. `startSpread` rejected while a spread is active.

**Definition of done:** all of the above green. `computeSpread` on a 20×14 board runs < 5 ms. Decisions are logged in the status file.

---

## O3 — Integration (P0) — `src/main.ts`, `src/app/**`

Start once `session`, `boardView`, and `hud` are no longer stubs. Iterate as they land.

- `src/app/bindBoard.ts`: subscribe the BoardView to SessionEvents. `runStarted` → `setBoard` + `setCores`. `tilesRevealed` → `playReveal`. `hexChanged` → `refreshHex`. `spreadStarted` → `setCores(state.cores)`.
- `src/main.ts`: the seed comes from `?seed=` or `crypto.getRandomValues` (random seeds are allowed here, outside the sim). Create session, board, hud, tutorial. Call `session.newRun(seed)`. Run a `requestAnimationFrame` loop that calls `session.advance(dt)` then `board.update(dt)`, with `dt` clamped to 100 ms. Resize handler. Dev-only error overlay showing uncaught errors.
- Play the game yourself in the browser. Every integration bug found → a report in your status "Bugs routed" section with the owner's tag.

**Definition of done (M2):** in the browser you can start → pick an offer → place a core → watch the spread → build → earn → cross a threshold → get the next offer → keep playing → end the run manually and see the end screen. There are no console errors.

## O4 — E2E autoplay, determinism, release (P0) — `tests/e2e/**`, `scripts/**`, `README.md`

- `tests/e2e/autoplay.test.ts`: a greedy bot that drives **only the `GameSession` API** (with `advance` calls to finish spreads) for seeds 1–5, up to N actions. Assert: no exceptions, status reaches a terminal state or the action cap, and the AGENT_TASKS §52 invariants hold after every step (write an `assertInvariants(state)` helper). Also play the same seed + same actions twice and require deep-equal final state (excluding wall-clock fields).
- `scripts/package.mjs` + `npm run package`: `vite build` → zip `dist/` contents (with `index.html` at the zip root) → `release/terraform-jam-<date>.zip`. Check it has no absolute asset paths.
- `README.md`: how to run, controls, the seed URL param, credits (AI usage per §47).
- **Release checklist** (in your status file, for the human): itch project "HTML", "This file will be played in the browser", viewport 1280×720, fullscreen button on. **You don't upload or publish anything.** The human does.

## O5 — Contract steward and triage (continuous)

- At each task boundary, read all `tasks/status/*.md`. Answer contract requests in "Contract changelog". Prefer **additive** changes (new optional fields or functions). When you change `types.ts`/`contracts.ts`, commit with `[opus] CONTRACT: …` and log it.
- After the freeze, approve fixes one at a time in your status file.

---

## O6 — Morning integration pass (P0, designer-assigned)

1. **Finish O4 packaging:** `scripts/package.mjs` doesn't exist yet. Implement it and `npm run package` (build → zip with `index.html` at the root → `release/`). Verify the zip in `npm run preview`. Update `README.md` with controls: camera, **R / Shift+click** quick build, **1/2** offers, **Esc**, **? / H** help, and audio mute.
2. **Wire audio:** sol's V3 module. In `src/main.ts`, `import { createAudio } from './audio/audio'` and call `createAudio(document.getElementById('ui')!, session)` before `newRun`, disposing it on teardown (see sol's status Morning summary). It must stay silent with no errors while the MP3s are missing.
3. **Independent review (O5)** of astra's D4 `0b7f609` and N4 `0642114` (map variety, plateau drainage, area-scaled clusters), and of the N6 preview optimization `4eacde4` (a pure-function speedup; check equivalence). Log PASS/FAIL in your Integration log.
4. **After astra commits N7 (8 thresholds):** re-run autoplay and pacing, then **play one full run in the browser to a win** on a seed astra recommends. Route any bugs to their owners.
5. Log everything in your status file and refresh "Current".

## O7 — Release readiness while waiting for astra's N7 (P1, designer-assigned)

1. **itch.io iframe test:** add a local page (e.g. `scripts/itch-frame.html` served next to the built `dist/`) that loads the game in a 1280×720 `<iframe>` like itch does. Verify:
   - relative asset paths;
   - keyboard focus (clicking the canvas must give keyboard focus: R, Tab, Esc, WASD/QE, 1/2, ?/H);
   - no page scroll from arrow/space keys;
   - fullscreen button behavior;
   - audio starting after the first click;
   - no console errors.

   Fix anything in your own files (`index.html`, `src/main.ts`, `src/app/**`). Route the rest to its owner.
2. **Loading feel:** a minimal loading indicator in `index.html` that disappears once the first frame renders (the bundle is > 500 kB).
3. **itch page draft** in `README.md` under "itch.io page": a 2–3 sentence pitch; how to play (the core loop in 5 bullets); controls; a credits and AI-usage section per GAME_DESIGN §47 (AI-assisted coding by the 4 agents; generated graphics/models if any; ElevenLabs/Suno audio if the designer adds it). Use the placeholder name **"<GAME NAME>"**; the designer hasn't picked one yet.
4. Then continue with O6.4 once astra's `N7` final commit lands.

## O8 — Follow the new win rule (P0, designer decision)

GAME_DESIGN §41 changed (win = final threshold; loss = out of room). Sonnet implements the rule (S8), astra re-tunes (N8), sol updates the tutorial (V9).
1. **Now:**
   - update `tests/e2e/**` (the autoplay bot's stop conditions and `assertInvariants`) to the new rule;
   - update `README.md`: how to play, the itch.io page draft, and the goal line "Reach the final threshold before you run out of room".
2. **After `[sonnet] S8`:** run the e2e suite and a browser run on the seed sonnet or astra used. Check that the win screen appears the moment T8 is reached, even mid-spread, and that a spam-only run ends in a loss screen (use a seed and a quick-build spam).
3. **After astra's final N8 round:** re-run autoplay, rebuild `npm run package`, verify it in your itch iframe page, and log the results. Route bugs to their owners.

---

## O9 — UI rework support (designer-approved) — see `tasks/UI_SPEC.md`

1. **Contract (now, small):** add the optional `setSlotHighlight?(pick: { hexId: HexId; slot: SlotIndex } | null): void` to `BoardView` in `src/core/contracts.ts`, log it in the Contract changelog, commit `[opus] CONTRACT: optional BoardView.setSlotHighlight`, and note it in your status for sol (V13) and sonnet (U1).
2. **Wiring in `src/main.ts`** (once sonnet's U1 exports exist):
   - `?ui=legacy` → `createLegacyHud`, otherwise the new `createHud`;
   - `createAudio(…, { controls: false })` for the new HUD (keep `true` for legacy);
   - any new root elements the new HUD needs.
3. **After U1 lands:** browser check at 1280×720 and 1024×640 (overlaps, click-through to the board, keyboard focus in your itch iframe page), both HUDs working, rebuild `npm run package`. Route issues to their owners.

## O10 — Night plan after the limit reset (designer, 2026-10-01 00:00)
The new HUD was reassigned to **sol** (V15), and **sonnet** is the browser QA for it. In order:
1. **Finish O8.3:** rebuild the safety RC from HEAD (legacy HUD is the default), run `npm run itch-test`, and verify there's no parent scroll, focus works, and a full loop plays. Tell the designer in your status that `release/…zip` is **safe to upload**.
2. **O9 contract now:** optional `BoardView.setSlotHighlight`. Commit `[opus] CONTRACT: …` so sol's V13 is unblocked.
3. **O9 wiring:** `?ui=legacy` in `src/main.ts` (legacy vs `createHud`), and `createAudio(…, { controls: false })` when the new HUD is active. The new HUD stays opt-in via `?ui=journal` **until** sol switches the default in `src/ui/hud.ts`.
4. **06:00 go/no-go:** read sonnet's QA bugs. If there are no open P0/P1 on the new HUD, package with the new HUD as default; otherwise package with legacy. Record the decision in your status and tell the designer which zip to upload.

## O11 — Offer spheres module + an earlier go/no-go (designer, 2026-10-01 00:55)
The designer wants to **submit early**, so the go/no-go no longer waits for 06:00.
1. **Build `src/fx/offerSpheres.ts`** (now yours) exactly per `tasks/UI_SPEC.md` §8.3 and §5 "Biome offer": two spheres fly from `from` to the center; the chosen one gets god-rays and flies to `to`; the other shatters into shards and dissolves (CSS + one small 2D canvas for the shards). Reduced motion gives a simple fade. Own backdrop that blocks input, keys 1/2, a Reshuffle button. Palette from UI_SPEC §1. Tests (happy-dom): present, choose via key and click, reshuffle, resolve's promise settles, reduced-motion path. Add a small demo page (`src/fx/demo.html`) so it can be viewed alone. Commit `[opus] O11: offer spheres`, and tell sol it's ready in your status.
2. **Fix sonnet's P2** in `scripts/itch-frame.html` (a localhost vs 127.0.0.1 origin mismatch makes the cross-origin frame black).
3. **Go/no-go when triggered, not at 06:00:** as soon as sol reports the V15 DoD met **and** sonnet has no open P0/P1 on the new HUD, package with the journal HUD as default and verify it in the itch frame. Post the zip name in your status. Repeat after the journal and spheres are integrated.
4. **Name: the game is "Hex Genesis"** (designer, 01:05). Small rename in your files: `<title>` in `index.html` → `Hex Genesis`; replace `<GAME NAME>` in `README.md` (and its heading); the zip name in `scripts/package.mjs` → `release/hex-genesis-<date>.zip` (update the README line too); any loading-indicator text. Leave `package.json`'s `name` alone. Commit `[opus] rename: Hex Genesis`.

## O12 — Core hex rule in e2e + final package (designer, 2026-10-01 02:20)
1. Add to `assertInvariants` (`tests/e2e`): no building on any hex in `state.cores`. The autoplay bot must skip core hexes (use astra's `isCoreHex` once N11 lands). Commit.
2. The final package waits for: astra N11 (plus its balance re-check), sol's pass-4 fixes + V16, sonnet S11, and **sonnet reporting 0 open P0/P1**. Then repackage from HEAD with all audio, verify it in the itch frame (music + an SFX after the first click), and post the final zip, size and hash in your status.
