# Tasks — `sonnet` (Sonnet 5.5 · Claude Code) — Game Flow and UI

You own the **game-flow state machine** (the only place where actions are sequenced) and the **player-facing DOM UI**, including how board clicks turn into commands.

**You own:** `src/game/**`, `src/ui/**`, `tasks/status/sonnet.md`.
**Read-only for you:** everything else. Call other modules' exported functions; never edit them.
**Wait for** the `[opus] M0` commit before creating any files. Until then, read GAME_DESIGN §9, §11, §15, §29, §36, §39–§44 and plan.

Task order: **S1 → S2 → S3**.

---

## S1 — GameSession (P0 + P1 gating) — `src/game/session.ts` (+ internal files under `src/game/`)

**Spec:** GAME_DESIGN §9 (offer timing, stacked cores), §11 (sequential deployment), §15 (≤ 5 s animation), §29 (transaction then threshold), §39, §41–§44; AGENT_TASKS §49, §50.
**Implements:** `createGameSession(opts)` → `GameSession` (CONTRACTS §2, §5). `now` defaults to `() => Date.now()` (stats only).

**Behavior**

- `newRun(seed)`: `createInitialState(seed, config, now())` → emit `runStarted` → **award the first core**: `awardCore(state)` → emit `coreAwarded`, then `offerShown`.
- **Gating.** Return `{ok:false, reason}` with no mutation when:
  - `status !== 'playing'` (any command except `newRun`);
  - `pendingOffer !== null` blocks `placeCore`, `placeBuilding`, `demolish` (§9: resolve before continuing);
  - `placeCore` while `activeSpread` (§11), or with an empty `coreStack`.
- `chooseOffer(i)` → `resolveOffer` → emit `offerResolved`. Then run the end check (below).
- `reshuffleOffer()` → `offers.reshuffleOffer` → emit `offerShown` with the new offer.
- `placeCore(hexId, stackIndex = 0)` → `startSpread` → emit `spreadStarted`. Reveal pacing starts.
- `advance(dtMs)`: only when `activeSpread` exists. Reveal window `W = max(0, spreadMaxMs − tileFlipMs)`. With `n` claims, the target revealed count at elapsed `t` is `min(n, 1 + floor(t · (n−1) / W))` (claims[0] = origin reveals immediately). Call `revealSpread(state, delta)` → emit `tilesRevealed` with those ids. When all are revealed: `finishSpread` → emit `spreadFinished` → end check. **The spread keeps animating while an offer modal is open.** It's non-interactive.
- `placeBuilding` → `economy.placeBuilding`. On ok, emit in this order: `hexChanged`, `payouts` (only if non-empty), `combosDiscovered` (only if non-empty), `resourcesChanged`. Then `advanceThreshold(state)`: if true → `awardCore` → `coreAwarded`, `offerShown`. Then the end check.
- `demolish` → `economy.demolishBuilding` → `hexChanged`, `resourcesChanged` → end check.
- `preview` → `economy.previewPlacement`, or `null` if `canPlaceBuilding` fails for a reason other than affordability.
- `endRun()` → status `'ended'`, `runEndMs = now()` → `runEnded`.
- **End check** (after every mutating command and after `spreadFinished`): if `checkWin(state)` → `'won'` (this takes precedence, even if an offer was just awarded: a core with no legal site is irrelevant, §41). Clear `pendingOffer`, then emit `runEnded`. Else if `isProvablySoftLocked(state)` → `'lost'`, then `runEnded`.
- **Determinism:** the session never uses randomness. `newRun` requires a seed. Given the same seed, commands, and `advance` calls, the resulting `GameState` is identical.

**Required tests** (`src/game/session.test.ts`; use `it.todo` until a dependency lands, then enable)
1. `newRun` → `pendingOffer` set, and `placeCore`/`placeBuilding` rejected until `chooseOffer`.
2. Second `placeCore` is rejected while a spread is animating; accepted after `advance` finishes it (§57 Spread 9).
3. Building on a tile in the active claim set is rejected; a tile outside it is accepted (§57 Spread 13).
4. `advance(5000)` fully reveals any spread. The event count matches claims.
5. Threshold crossed by a placement: `payouts` is emitted **before** `coreAwarded`/`offerShown`. Lifetime has already been updated when the offer appears (§57 Progression 1–4, 7).
6. Crossing a threshold while holding an unplaced core → `coreStack.length === 2` after choosing (§57 Progression 6).
7. `endRun` → `runEnded` with stats (lifetime, elapsed via injected `now`, seed).
8. Replay: two sessions, same seed + same command script → deep-equal state (ignoring `runStartMs`/`runEndMs`).

**Definition of done:** tests 1–8 green against real modules (not stubs). Nothing in `src/game` imports `three` or touches the DOM.

---

## S2 — HUD and interaction (P0 core; the P1 parts are listed) — `src/ui/**`

**Implements:** `createHud(root, session, board)` → `Hud` (CONTRACTS §5). Plain DOM + one `src/ui/styles.css` imported by `hud.ts`. No UI framework. System fonts. Visual tone: a warm, physical board game (card-like panels, chunky readable numbers).

**Components** (one file each under `src/ui/`)
- **Resource bar (P0):** per resource, current amount and lifetime, plus progress toward `thresholds[thresholdIndex]`, one line per required resource (§39: never a single combined number).
- **Offer modal (P0):** blocks input, shows two biome cards, and chooses on click. **Reshuffle** button (P2) disabled when `reshufflesUsed ≥ reshufflesPerRun`.
- **Core stack (P0/P1):** one chip per held core with its biome. Clicking a chip enters **core-placement mode**: `board.setHighlights('legalCore', legalCoreSites(state))`. Clicking a legal hex calls `placeCore(hexId, stackIndex)`. Esc or right-click cancels. Disabled while a spread is active (show "Terraforming…").
- **Hex panel (P0):** opens on hex click in idle mode. Shows terrain, biome, elevation, and "locked (spreading)" if locked. Shows the 3 slots:
  - empty slot → building list from `rosterFor`, with cost, affordability, and a click to build;
  - hovering a building → **preview** (P1) from `session.preview`: base breakdown and the combos listed in the preview. **Render only what the preview returns.** Never compute or hint at undiscovered combos (§32, §38);
  - filled slot → building name + **Demolish** (P1) showing the refund from `demolishRefund`.
- **Payout toasts (P0):** queue the `payouts` events and show them **one after another** (~700 ms each; §29 step 9, §30). Show the kind, e.g. "Pair combo: <name> +3 wood". This is display only: resources are already updated.
- **Discovered combos list (P2):** from `state.discoveredCombos` → names, recipes, amounts.
- **End Run button (P0)** with a confirm dialog → `session.endRun()`.
- **End screen (P0):** on `runEnded`: status, lifetime per resource, time taken (mm:ss), seed, and a **New Run** button (random seed via `crypto.getRandomValues`, or type one in).
- **Hover:** `board.onPointer` 'move' → `setHighlights('hover', [id])`. 'click' → mode-dependent. 'secondary' → cancel mode.

**Required tests** (`src/ui/*.test.ts`, `// @vitest-environment happy-dom`, with a hand-written fake `GameSession` and fake `BoardView`)
1. Offer modal is shown on `offerShown`; clicking a card calls `chooseOffer` with the right index.
2. Three `payouts` events in one batch render sequentially: only one toast is visible at a time, in order.
3. The preview panel renders only the combos present in the `PlacementPreview` object.
4. Core-placement mode highlights legal sites, calls `placeCore` on click, and Esc cancels.
5. End screen shows lifetime per resource, time, and seed.

**Definition of done:** tests green. With O3 integration you can play a full loop using only the mouse and see all P0 components working. No console errors.

## S3 — UI polish (P2, only after M3)
Combo codex styling, end-screen presentation, offer card presentation (biome color/icon), keyboard shortcuts (1/2 pick offer, Esc cancel), tooltip on locked tiles. Cut order: AGENT_TASKS §55.
