# Tasks — `sonnet` (Sonnet 5.5 · Claude Code) — Game Flow and UI

You own the **game-flow state machine** (the only place where actions are sequenced) and the **player-facing DOM UI**, including how board clicks turn into commands.

**You own:** `src/game/**`, `src/ui/**`, `tasks/status/sonnet.md`.
**Read-only for you:** everything else. Call other modules' exported functions; never edit them.
**Wait for** the `[opus] M0` commit before creating any files. Until then, read GAME_DESIGN §9, §11, §15, §29, §36, §39–§44 and plan.

Task order: **S1 → S2 → S4 → S5 → S3**. S4 and S5 were added by the designer and come before the remaining S3 polish.

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

## S4 — Quick build: "repeat last building" (P1, designer-approved) — `src/ui/**`

**Why:** the win condition (§41) fills every slot on every terraformed placeable hex, about 600 placements per run. To fit the 30–45 minute target, a repeated placement must take about 1 second. This is a **UI convenience only**. It goes through `session.placeBuilding` like any other placement, so every rule, cost, and payout is unchanged.

**Behavior**
- Track `lastBuilt: BuildingId | null`. Set it on **every successful** placement, from the hex panel or from quick build. Reset it on `runStarted`.
- **Triggers** (idle mode only, never in core-placement mode):
  - **Shift + left-click** on a hex. `BoardView` doesn't report modifier keys, so track Shift yourself with `keydown`/`keyup` on `document`, and clear it on `blur`;
  - **R** while hovering a hex. Ignore keys while focus is in an input, textarea, or select (e.g. the seed field).
- **Target slot:** `pick.slot` if it's non-null and empty, otherwise the lowest-index empty slot of that hex.
- **No smart substitution:** always try exactly `lastBuilt`. On failure (hex full, not in the current biome's roster, locked by a spread, can't afford, offer pending), flash the `'invalid'` highlight on that hex and show a short reason near the cursor or as a small toast. Place nothing else.
- **Repeat chip** in the HUD: "Repeat: <name> · <cost> · [R / Shift+click]". Grey it out when unaffordable; clicking it clears `lastBuilt`. Hide it when `lastBuilt` is null.
- **Shift-hover preview (nice-to-have):** while Shift is held over a hex, show `session.preview(hex, targetSlot, lastBuilt)` in the existing preview style. Render only what the preview returns (§32, §38).
- **Toast backlog:** rapid quick-building can queue many payout toasts. Keep them **sequential** (§29, §30), but when more than 3 are queued, shorten each (e.g. to ~250 ms) so the queue never lags far behind play.
- If the targeted hex is currently selected, the hex panel re-renders after a quick build.

**Required tests** (`src/ui/quickBuild.test.ts`, happy-dom, fake session and board)
1. No `lastBuilt` → Shift+click and R do nothing.
2. After a panel placement, Shift+click on a hex with `pick.slot` empty → `placeBuilding(hex, pick.slot, last)`.
3. `pick.slot` occupied → the lowest empty slot is used. Hex full → no call, invalid highlight.
4. R uses the currently hovered hex. R with focus in an `<input>` does nothing.
5. In core-placement mode, Shift+click places the core (normal behavior), not a building.
6. A failed placement (fake session returns `{ok:false}`) → invalid highlight, `lastBuilt` unchanged.
7. `runStarted` resets `lastBuilt` and hides the chip.
8. With 6 toasts queued, they still show one at a time and the per-toast duration shrinks.

**DoD:** tests green. In the browser, holding a hover and tapping R fills a hex's 3 slots in about 1 second each, with correct payouts and no console errors. Record the new controls in your status file (Notes for others) so opus can put them in `README.md` and sol can mention them in the tutorial.

## S5 — First-time-player UX pass + controls help (P1, designer-added) — `src/ui/**`

The loop is now playable on the flat stub map (real terrain arrives with astra's D1).
- **Dev server port:** opus uses port 5173 (`.claude/launch.json`). Run yours on **5174** (`npx vite --port 5174`) so you don't collide.
- **Play 2 runs as a first-time player** and fix what's unclear **in `src/ui/**` only**:
  - The resource bar reads cleanly with **4 resources** (current, lifetime, and each required target of the next threshold).
  - The hex panel lists up to 9 buildings with 4-resource costs without overflowing. Unaffordable entries are obvious.
  - The preview is readable. Toasts don't cover the board where you click.
  - The repeat chip and core chips are discoverable. The end screen is clear.
- **Controls help overlay:** open with `?` or `H` and a small "?" button. It lists: camera (right-drag or Q/E rotate, wheel zoom, middle-drag or WASD pan), left-click select/build, **Shift+click / R** repeat last building, **1/2** pick an offer, **Esc** cancel. Read the actual camera bindings from `src/render/boardView.ts` rather than trusting this list. Show it once automatically on the first run of a session. Esc closes it.
- **Don't change game rules or timing.** Anything that isn't UI (a render glitch, a session or economy bug) → report it under "Bugs found in others' modules" in your status file.
- **Icons:** when sol's R8 icons land in `public/assets/icons/`, use them in the resource bar, costs, and offer cards (text fallback if missing).

**DoD:** 2 full runs played, fixes committed as `[sonnet] S5: …`, help overlay tested (open, close, auto-show once), findings for other agents filed in your status.

## S3 — UI polish (P2, only after M3)
Combo codex styling, end-screen presentation, offer card presentation (biome color/icon), keyboard shortcuts (1/2 pick offer, Esc cancel), tooltip on locked tiles. Cut order: AGENT_TASKS §55.

## S6 — Morning fixes (P1, designer-assigned) — `src/ui/**`

1. **Fix the failing HUD test** `src/ui/hud.test.ts:203` (astra's report): T1 now has a wood target of 0, so the fixture expects `4 / 0`. Derive a positive target from the config (or assert `min(have, need)`) so tuning can't break it again. Make sure the resource bar hides or greys requirements whose target is 0.
2. **Icons:** sol's icons are in `public/assets/icons/` (wood, stone, water, food and the 6 biomes). Use them in the resource bar, building costs and offer cards, with a text fallback if an icon fails to load.
3. **Held cores with no legal site:** the economy now awards 9 cores (8 thresholds), so players will often hold cores after every legal site is gone (harmless for the win, §41). When `legalCoreSites(state)` is empty, core chips must show a clear disabled state, e.g. "No legal site left". Clicking one must not enter placement mode with nothing highlighted.
4. Tests for 1–3. Commit each as `[sonnet] S6: …`, and refresh your status "Current".

## S7 — Win progress + empty-slot finder (P1, designer-assigned) — `src/ui/**`

The win (§41) needs every slot on every terraformed placeable tile filled, with no legal core site left. Late in a run, players can't see how close they are or where the last empty slots are.
1. **Win progress** in the HUD (small, near the resource bar), updated on every relevant event:
   - "Empty slots: **N**" (placeable tiles with `biome !== null` and an empty slot);
   - "Legal core sites: **M**";
   - "Spread active" while one is.

   Put a one-line explanation in the tooltip or help overlay: "Win: no legal core site left and every slot filled." UI math only: read state and call `legalCoreSites`. **Don't** duplicate `checkWin` logic in a way that could disagree with it. If you need a helper, import from `src/sim/endgame.ts`.
2. **Empty-slot finder:** hold **Tab** (or click the "Empty slots" counter) to highlight every hex with an empty slot, via `board.setHighlights('legalCore' | 'selected', …)` or whichever style reads best. Release to clear. Don't fight the core-placement mode highlights.
3. Add both to the help overlay. Tests for the counters (fake state), the Tab highlight on and off, and no highlight during core-placement mode.

Commit `[sonnet] S7: …` and refresh your status.

## S8 — New win rule in code + HUD (P0, designer decision; do first) — `src/sim/endgame.ts`, `src/game/**`, `src/ui/**`

GAME_DESIGN **§41 changed**. Read §2, §39, §41, §42 and AGENT_TASKS §57 "Win / end". Win = reach the **final** threshold. Loss = the board runs out of room (the conservative detector). Payout rules are unchanged.
1. **`checkWin`** (`src/sim/endgame.ts`): true iff `state.thresholdIndex >= config.thresholds.length` (every threshold consumed). Remove the old fill-every-slot logic.
2. **`isProvablySoftLocked`:** keep it conservative (§43, §44). Make sure the "board full" case returns **true**: no empty slot on any terraformed placeable hex, no usable core (none held while a legal site exists), no spread, no offer, final threshold unmet. It must still return **false** whenever a yield-producing placement exists, including via refunds. Don't declare a loss just because resources are low while unpaid empty slots could be funded.
3. **Session:** after `placeBuilding`, when `advanceThreshold` consumes the **final** threshold → **no `awardCore`, no offer**. Status `'won'` and `runEnded` in the same command. The end check order stays win → soft-lock. A held core or an active spread never blocks the win.
4. **HUD:**
   - **Goal line:** "Goal: reach threshold 8 · now N/8".
   - **Win-progress readout:** replace it with "Slots left: X of Y · Legal core sites: M". Keep the Tab empty-slot finder.
   - **Help overlay:** a one-line rule, "Reach the final threshold before you run out of room. Every slot and combo pays only once."
   - **End screen:** win or loss, thresholds reached N/8, "board used X/Y slots (Z%)", plus the existing lifetime, time and seed. A loss reads "Out of room".
5. **Tests:**
   - endgame: a win on the final threshold with empty slots, a held core and an active spread;
   - board full, T8 unmet → soft-locked;
   - an empty affordable unpaid slot → not soft-locked;
   - session: the final threshold gives no offer and `runEnded('won')` in the same command;
   - UI: goal line and end-screen stats.

   Astra rewrites its own acceptance tests in parallel. **Commit as early as possible:** astra's balance calibration waits for your `[sonnet] S8` commit.

---

# UI rework (designer-approved) — source of truth: `tasks/UI_SPEC.md`

Read `tasks/UI_SPEC.md` fully. `public/assets/fonts/**` is now yours (bundle OFL fonts with their license files). Keep the current HUD reachable via `?ui=legacy` until the jam submission. Opus wires the switch in `main.ts`; export a `createLegacyHud` (the current `createHud`) and a new `createHud` with the same signature.

## U1 — New HUD (P0 for the UI, target ~22:00)
UI_SPEC §1–§3.7 and §5 (everything except the offer animation):
- field-journal skin and tokens, bundled fonts;
- resource pills; threshold stack with pinned T8 goal and "Slots left";
- biome triangle with mixed edge circles, count badges, grey states, and following the selected tile;
- deck with the core card first, then roster cards, with the hover pop-up (full `session.preview` when a slot is selected, discovered combos only);
- detail panel (building / core / tile with slot chips + Demolish);
- both placement flows (sticky card selection; slot-first with auto-advance to the next empty slot); R, Shift+click and Tab kept;
- top-right journal (stub button until U2) and ⚙ menu (Help, Sound via sol's `audioSettings`, End Run, New Run);
- toasts restyled; end screen restyled.

Use the optional `board.setSlotHighlight?.(…)` (opus is adding it). Until it exists, fall back to the `'selected'` hex highlight. Icons fall back to text if sol's building icons haven't landed.

**Tests (happy-dom, fake session/board):**
- both placement flows, including auto-advance;
- the core card's grey, badge and disabled reasons;
- the triangle following the selected tile; mixed circles grey until the biome exists;
- the pop-up shows only discovered combos;
- threshold stack: zero targets hidden, T8 pinned;
- menu: End Run confirm, mute through a fake `audioSettings`.

Play one run in the browser (port 5174). Commit in logical steps (`[sonnet] U1: …`). Update your status with screenshots described in words (what's where).

## U2 — Journal (target ~00:30)
UI_SPEC §4: a book with Contents / Combos / Adjacency / Terrain tabs.
- **Combos:** undiscovered → a big "?" on a dark ink circle, no details.
- **Adjacency:** a "found" log built from `payouts` events.
- **Terrain:** every rule plus zone effects.

Tests: an undiscovered combo reveals nothing (no name, buildings or amounts in the DOM); the adjacency log entry appears after a fake adjacency payout; J/Esc open and close it. Commit as `[sonnet] U2: …`.

## U3 — Biome offer spheres (target ~02:00)
UI_SPEC §5 "Biome offer": the simple version first (spheres fly out of the triangle, the chosen one glows and returns, the other fades), commit it, then god-rays and shatter/dissolve (CSS + a small 2D canvas). Input stays blocked until it's resolved; 1/2 and reshuffle still work. Respect `prefers-reduced-motion` (skip to the simple version). Commit as `[sonnet] U3: …`.
