# Tasks — `sol` (GPT-6.1 Sol · Zed) — Presentation: Three.js Board, Animation, Tutorial

You own **everything the player sees in 3D** plus the **tutorial assistant**. You render state. You never decide it.

**You own:** `src/render/**`, `render-sandbox.html`, `src/tutorial/**`, `public/audio/**`, `public/assets/**`, `tasks/status/sol.md`.
**Read-only for you:** everything else. `src/render` must never mutate `GameState` or call session commands.
**Wait for** the `[opus] M0` commit before creating any files. Until then, read GAME_DESIGN §2–§8, §15, §19, §24, §46 and AGENT_TASKS §55, and plan the scene.

Task order: **R1 → R2 → R3 → R4**, then the designer-added **R6 → R5 → R7 → R8**.

**Visual target:** low-poly physical board game on a table: stacked hex tiles (one prism per elevation level), soft warm lighting, a rotatable camera. Desktop only (§3).

---

## R1 — Board, camera, picking (P0) — `src/render/**`

**Implements:** `createBoardView(container, config)` → `BoardView` (CONTRACTS §2, §5).

- **Sandbox first:** `render-sandbox.html` + `src/render/sandbox.ts` render a board from `createInitialState(seed, DEFAULT_CONFIG, 0)` (works with the O1 flat-map stub and later with real maps), plus keys to fake reveals and buildings. You can iterate without waiting for the session or UI.
- **Layout:** positions **must** come from `hexToWorld` in `src/core/hex.ts` (pointy-top, odd-r). Don't write your own layout.
- **Tiles:** stack `elevation + 1` hex prisms per hex (slightly inset, with a visible layer seam), using `InstancedMesh` per material group. 280 hexes × up to 5 levels must hold 60 fps. Keep draw calls low.
- **Colors:** dead land = desaturated browns/greys. Each of the 6 biomes gets a distinct top color (mixed biomes visibly between their parents). Keep the palette in `src/render/palette.ts`.
- **Hills render exactly like plain tiles**, just higher (§6). Don't give them a distinct look.
- **Natural tiles:** mountain = a low-poly peak on top of the stack, always the same regardless of biome. Riverbed/basin = a recessed channel, **dry** while `biome === null` and **water** once it has a biome (§7). Woods = dead stumps → trees once terraformed. Marsh = a dry cracked patch → wet green.
- **Camera:** OrbitControls-style: rotate (right-drag or Q/E), zoom (wheel, clamped), pan (middle-drag or WASD), polar angle clamped so the table is never seen from below. Start with a 3/4 view of the whole board.
- **Picking:** raycast tile tops → `hexId`. `slot` = nearest of the 3 slot anchors (fixed triangle layout on the hex top) within a radius, else `null`. Emit via `onPointer` for `move`, `click` (left), and `secondary` (right-click without drag). A drag must not fire `click`.
- **Highlights:** outline/glow per `HighlightStyle` (legalCore, selected, hover, locked, invalid). Each `setHighlights` call replaces that style's set.
- `setBoard` disposes the old geometry and materials (no leaks across New Run). `resize` follows the container size.

**Required tests** (pure helpers only, e.g. `src/render/layout.test.ts`): slot anchor math, pick-to-slot resolution, and palette completeness (every `Biome` has a color). No WebGL in tests.

**DoD:** the sandbox shows a full generated board. Rotate, zoom, and pan work. Hovering/clicking logs the correct `hexId`/`slot`. 60 fps on a laptop. No console errors.

## R2 — Reveal animation, buildings, cores (P0)

- `playReveal(state, hexIds)`: each tile does a **flip/convert** (e.g. rotate the top 180° and swap to the biome color at the midpoint, with a slight lift) lasting `config.animation.tileFlipMs`. The session paces reveals so the whole spread finishes within 5 s (§15). You only animate what you're given.
- **Only render visible state:** colors come from `hex.biome` at reveal/refresh time. Never read `activeSpread.result` to pre-color or hint at future tiles (§15, §24).
- Converted tiles (foreign → mixed) with buildings: the wave passes through and the tile recolors, but **buildings stay the same meshes** (§19).
- **Buildings:** `refreshHex` draws each occupied slot at its anchor as a small low-poly placeholder mesh. Shape family by biome; color/variant from a stable hash of `BuildingId`. Real models can replace them later behind the same function.
- **Cores:** `setCores` places a terraformer-core marker (glowing crystal/pylon) on each core hex.
- Reveal animations must never block input or state. `update(dt)` advances tweens only.

**DoD:** in the sandbox, a fake spread of ~69 tiles flips as a wave in claim order within 5 s. Buildings appear in their slots. Cores show. The frame rate holds.

## R3 — Natural-terrain variety and decorations (P2)

- Decorations on placeable tiles from `hex.decoration` (a deterministic uint32; visual-only randomness is allowed per §5): depending on biome, a small thicket, rock, lone tree, cacti, or grassland tufts (§7). Dead tiles get rubble.
- Waterfalls on riverbed hex sides where the elevation drops, after terraforming shows water (§6). This is **first to cut** (AGENT_TASKS §55 #2).
- A board frame/table surface and ambient polish.

## R4 — Tutorial assistant (P2) — `src/tutorial/**`

**Spec:** GAME_DESIGN §46, §47. **Implements:** `createTutorial(root, session)` → `Tutorial`.
- An assistant panel: a static screen-style face (SVG/CSS) with **eyes** that blink and a **mouth** that animates while a line is "speaking". Tutorial text box with Next / Skip, and a mute toggle.
- Steps are triggered by `SessionEvent`s (first `offerShown` → biomes; first `spreadStarted` → the spread and why to wait; first `spreadFinished` → building and slots; first `payouts` containing a pair/triple → combos; first `coreAwarded` after the start → progression). Each step shows once per run. It never blocks the offer modal.
- Voice: `src/tutorial/lines.ts` maps `lineId → text`. Playback tries `public/audio/vo/<lineId>.mp3` and silently falls back to text only if the file is missing. **No runtime AI or TTS.**
- Write `src/tutorial/VO_SCRIPT.md` (line id, text, tone notes) so the human can generate the ElevenLabs lines.
- Cut order (AGENT_TASKS §55 #1): voice and animated face go first. Plain tutorial text must still work.

**DoD:** a new run walks through all steps with text. Skip works. Missing audio files don't cause errors.

---

# Follow-up tasks (added by the designer after R1–R4)

The economy is now final for v1: see `tasks/ECONOMY_SPEC.md` (4 resources: wood, stone, water, food; 24 named buildings). Read it first.

## R6 — Tutorial copy fixes (P1, ~20 min) — `src/tutorial/**`

- **Bug:** the `progression` line says the run ends when you "restore all reachable natural terrain". That's wrong. The win condition (§41) is: **no legal core site remains, no spread is active, and every slot on every terraformed placeable tile is filled.** Natural tiles never need buildings, and leftover unreachable dead land doesn't matter. Rewrite the line to say that plainly.
- Mention the resource identities once, briefly, e.g. in `buildings`: Forest gives wood and food, Desert gives stone and water, Arctic gives water and a little food, and mixed biomes are rich in food. Mention that stone mines next to mountains yield extra. Describe only what ECONOMY_SPEC.md says. No numbers.
- Keep the quick-build hint (Shift+click / R). It's correct.
- Update `src/tutorial/VO_SCRIPT.md` to match the new text exactly.
- **DoD:** tutorial tests green. The text matches GAME_DESIGN §41 and ECONOMY_SPEC.md. Commit `[sol] R6: tutorial copy matches win rule and economy v1`.

## R5 — Distinct building models (P1 visual) — `src/render/**`

Replace the hash-based placeholder shapes with a **recognizable low-poly model per building id** from ECONOMY_SPEC.md (24 ids), built procedurally from Three.js primitives. No external model files.

- A model's style comes from the building's **home biome**: its main biome, or its mixed biome for the 9 uniques. Not the tile's current biome. A Sawmill looks like a Sawmill on Forest or Steppe, and stays the same when its tile converts (§19).
- Suggested silhouettes (adjust freely): Lumber Camp = log pile + small hut; Hillside Mine / Quarry / Scree Quarry = stepped pit or cart with rocks (a different color each); Sawmill = hut + saw wheel; Gatherer's Hut = round hut + basket; Farm = small barn + crop rows; Palm Grove = 2–3 palms; Stonemason = block stack; Oasis Well = ring well + water disc; Glass Kiln = dome with a glow; Driftwood Camp = tent + logs; Ice Drill = derrick; Glacier Pump = pump house + pipe; Ice Fishery = hut + hole in the ice; Grain Fields = golden rows; Windmill = tower + sails; Caravanserai = walled courtyard; Trapper Lodge = A-frame; Resin Works = vats; Hot Spring = steaming pool; Lichen Farm = green terraces; Salt Mine = white mounds; Frost Kiln = icy dome.
- **Unknown ids** (e.g. a future config change) fall back to the current generic shape. Never crash.
- **Performance:** up to 840 buildings on screen. Use one `InstancedMesh` per model part (as now) or merge each model's parts into one geometry, then instance it. Hold 60 fps on a full board. Dispose everything on `setBoard`.
- Models must fit inside a slot anchor (they must not overlap neighbors at the current slot spacing) and read clearly from the default camera distance.
- **Sandbox:** add a key that fills a few tiles with every building id so they can be reviewed side by side.
- **Tests:** every ECONOMY building id maps to a model, and an unknown id maps to the fallback.
- **DoD:** all 24 are visually distinct in the sandbox, frame rate holds, no console errors. Commit `[sol] R5: per-building low-poly models`.

## R7 — Floating payout numbers over the board (P2)

Show small "+4 wood" style numbers rising from the hex when payouts resolve, in resolution order, a little staggered. This is presentation only; the HUD toasts remain the authoritative sequential display.
- `BoardView` has no method for this. **First** add a Contract request in `tasks/status/sol.md` for an additive optional method, e.g. `showPayouts?(state: Readonly<GameState>, events: PayoutEvent[]): void`. Opus decides and wires it in `src/app/bindBoard.ts` on the `payouts` event.
- **If opus declines or hasn't answered, skip R7.** Don't work around the contract.

## R8 — Resource and biome icons (P2) — `public/assets/icons/**`

Simple flat SVG icons, one per resource (wood, stone, water, food) and one per biome (6), in one consistent style that reads at 16–24 px. Record the file list in your status "Notes for others" so sonnet can use them in the HUD. Don't edit `src/ui`.

---

# Overnight queue (designer-assigned; ~3 hours, unattended)

The designer is asleep. **Opus and Sonnet are not running.** **Astra is running** in parallel on economy and balance (`src/sim/**`, `src/config/economy.ts`, `src/config/map.ts`, `tests/**`). Nobody will answer questions. Rules for this block:
- **Decide and keep going.** Log judgment calls under "Decisions" in `tasks/status/sol.md`.
- **Never edit outside your paths.** Your paths now also include **`src/audio/**`** and **`release-kit/**`** (new). Things only other agents can do (e.g. wiring in `src/main.ts`, HUD changes) → write a precise request under "Notes for others" and continue.
- **Commit after every item,** staging only your own paths. Never leave work uncommitted when you move on. Never use `git add -A` or `git add .`.
- **Time-box:** if stuck more than 25 minutes, commit what works, log it, and move on.
- Astra's commits may change maps and economy numbers under you. That's expected. Run your scoped tests (`npx vitest run src/render src/tutorial src/audio`).

Order: **V1 → V2 → V3 → V4 → V5 → V6.**

## V1 — Visual QA on the new maps (P1, ~30 min)
Astra's D4 (`0b7f609`) changed map generation: 1–4 mountain clusters of varying size, fewer hills, longer rivers. In the sandbox, review seeds 1–20 and fix render problems in `src/render/**`: waterfalls on long or branching rivers, peaks on differently sized clusters, decorations overlapping mountains or water, z-fighting, anything that looks broken. Also check that mixed biomes (steppe, taiga, polar desert) are clearly distinguishable from their parents at the default camera distance. Commit `[sol] V1: …`.

## V2 — Bigger-world render readiness (P1, ~40 min)
The designer plans a larger world after playtesting. **Don't change `MAP` in config.** In the sandbox, allow a size override (e.g. `?cols=30&rows=20`) and make the renderer handle 26×18 and 30×20:
- instance buffers sized from the board, not fixed;
- camera start framing, zoom limits and pan bounds scale with board size;
- picking stays correct at the edges;
- the table/frame scales.

Target **60 fps at 30×20 with every slot filled** (use the sandbox fill key). Log the measured fps and draw calls for 20×14, 26×18 and 30×20 in your status. Commit `[sol] V2: …`.

## V3 — Audio module (P1, ~45 min) — `src/audio/**`
The designer will generate sound effects and a soundtrack themselves (ElevenLabs/Suno) and drop the files into `public/audio/`. Build the playback so it works as soon as the files appear, **and silently does nothing when they're missing**.
- Export `createAudio(root: HTMLElement, session: GameSession): { dispose(): void }`. It subscribes to `SessionEvent`s and renders its own small **mute + volume control** inside `root` (bottom-right corner, doesn't cover the HUD). Settings persist in `localStorage` inside try/catch.
- Use `HTMLAudioElement` or WebAudio. Start only after the first user gesture (browser autoplay rules). Missing file or decode error → log once at debug level, then ignore.
- Event → file mapping (these exact names; add the list to `public/audio/AUDIO_LIST.md` with a suggested length and a one-line generation prompt for each):

  | file | trigger | length |
  |---|---|---|
  | `music/main_loop.mp3` | loops during a run, ducked while an offer is open | 1–3 min loop |
  | `sfx/offer_open.mp3` | `offerShown` | ~1 s |
  | `sfx/offer_pick.mp3` | `offerResolved` | ~0.5 s |
  | `sfx/core_place.mp3` | `spreadStarted` | ~1.5 s |
  | `sfx/tile_flip.mp3` | each `tilesRevealed` batch (throttle to ≤ 12/s, slight random pitch) | ~0.2 s |
  | `sfx/spread_done.mp3` | `spreadFinished` | ~1 s |
  | `sfx/build.mp3` | `hexChanged` after a placement | ~0.4 s |
  | `sfx/demolish.mp3` | `hexChanged` after a demolition (detect via the slot becoming empty) | ~0.5 s |
  | `sfx/payout_base.mp3` | `payouts` containing only base yields | ~0.3 s |
  | `sfx/payout_combo.mp3` | `payouts` containing a pair or triple | ~0.8 s |
  | `sfx/discover.mp3` | `combosDiscovered` | ~1.2 s |
  | `sfx/core_awarded.mp3` | `coreAwarded` | ~1 s |
  | `sfx/win.mp3` / `sfx/end.mp3` | `runEnded` (won / other) | ~3 s |

- Tests (happy-dom, fake session): the right file for each event, the tile_flip throttle, mute persists, missing files don't throw.
- **Wiring is opus's job** (`src/main.ts`). Write the exact one-line call under "Notes for others", for example `createAudio(document.getElementById('ui')!, session)`. Also add a line to the sandbox so you can hear it without main.ts.

Commit `[sol] V3: audio module`.

## V4 — Presentation polish (P2, ~40 min) — `src/render/**`
Presentation only. Never read future spread claims (§15, §24).
- A core placement effect: a short beam or pulse at the core hex.
- A completion flourish when a hex first becomes `everCompleted` (detect the flip in `refreshHex`).
- Softer ambient lighting and shadows if affordable within the V2 fps budget.
- Board payout numbers (R7) readable against every biome color.

Commit `[sol] V4: …`.

## V5 — itch.io release kit (P2, ~20 min) — `release-kit/**`
Only if you can capture from a browser. Otherwise skip and log it.
- 5 screenshots at 1280×720 from interesting seeds (mixed biomes, rivers, filled hexes, a spread mid-wave);
- a cover image at 630×500 with **no title text** (the game has no name yet);
- `release-kit/README.md` listing which seed and camera each came from.

## V6 — Morning summary
At the top of `tasks/status/sol.md`, at most 12 lines: commits with hashes, fps table, the main.ts wiring request for opus, anything the designer should look at first.

---

## V7 — Photo mode for the release kit + open verifications (P2, designer-assigned) — `src/render/**`

1. **Photo mode** so the designer can take itch.io screenshots themselves (V5 couldn't capture). It's active only with `?photo=1`:
   - **F1–F4** jump to 4 good camera presets (overview 3/4, low dramatic angle, close-up on a filled hex, top-down);
   - **P** saves a PNG of the 3D canvas at the current size (render a frame, then `toDataURL`, then download);
   - **Shift+P** saves a 630×500 cover crop.

   Don't hide or edit the HUD (sonnet's); the designer can hide it via devtools if needed. Photo mode must not interfere with normal controls, and number keys 1/2 stay the offer hotkeys.
2. **Verify what V6 left open,** in the sandbox or dev server: FPS during an active spread wave on 20×14 and 30×20, and a clean console after a full run. Record the numbers in your status.
3. Update `release-kit/README.md` with how to use photo mode (URL flag, keys, output sizes).

Commit `[sol] V7: …` and refresh your status "Current".

## V9 — Tutorial text for the new win rule (P0, small) — `src/tutorial/**`

GAME_DESIGN **§41 changed**: win = reach the final threshold (T8). Loss = the board runs out of room, because every slot and combo pays only once.
- Rewrite the `progression` line: each threshold gives a new core, and the last one wins the run. Space is limited, so plan combos and use terrain bonuses. Filling tiles with one building type will run out of room.
- In `buildings` or `combos`, one short hint: "Each slot and each combo pays only once. Choose placements that earn the most."
- Update `VO_SCRIPT.md` to match. The designer is generating voice lines now, so **commit this quickly** and note the changed line ids in your status file.
Commit `[sol] V9: tutorial text for the new win rule`.

---

# UI rework support (designer-approved) — see `tasks/UI_SPEC.md` §6

Do these in order; sonnet builds the new HUD in parallel and falls back gracefully until each lands.
## V11 — Icons (P0 for UI, ~1–1.5 h) — `public/assets/icons/**`
- **24 building icons** `public/assets/icons/buildings/<buildingId>.svg`: ids from `src/config/economy.ts`. Same flat style, palette and stroke weight as your existing biome and resource icons. Each must be recognizable at 32 px and match its 3D model's idea (e.g. sawmill = saw blade + log).
- **Terrain icons** `public/assets/icons/terrain/{mountain,water,woods,marsh}.svg` and a **core icon** `public/assets/icons/core.svg`.
- An icon preview page (extend `src/render/iconPreview.html` or add one) showing all icons at 24/32/64 px on paper `#F4EAD5`.

Commit `[sol] V11: building, terrain and core icons`, then **list the file paths in your status** for sonnet.

## V12 — Audio settings API (~20 min) — `src/audio/**`
`src/audio/settings.ts` exports `audioSettings` (`muted`, `volume`, `setMuted`, `setVolume`, `subscribe`), persisted as today. `createAudio(root, session, { controls?: boolean })`: with `controls: false`, render no controls of your own (sonnet's ⚙ menu uses `audioSettings`). The default stays `true` so nothing breaks before opus rewires it. Add tests. Commit `[sol] V12: …`.

## V13 — Slot highlight (after opus commits the contract) — `src/render/**`
Implement `setSlotHighlight?(pick | null)`: a highlighter-yellow (`#F5D547`) ring on that slot's anchor, visible on every biome color, updated when the tile flips or the camera moves. Add a test for the ring placement math. Commit `[sol] V13: …`.

## V14 — Tutorial panel in journal style (~40 min) — `src/tutorial/**`
Per UI_SPEC §6: move it to the left side under sonnet's threshold stack (leave room: top ≈ 300 px from the top at 720 px height; coordinate via "Notes for others" if you need more), restyle it as a journal note (paper `#F4EAD5`, ink `#2E2A25`, handwritten title; fonts from `public/assets/fonts/` once sonnet adds them, with a system fallback), the face as an ink-sketch device screen, and make it collapsible. Commit `[sol] V14: …`.

---

# V15 — Finish the new journal HUD (P0, reassigned from sonnet, 2026-10-01 00:00)

**You now own `src/ui/v2/**`, `src/ui/hud.ts` and `public/assets/fonts/**`.** Sonnet's legacy HUD (`src/ui/*.ts` outside `v2/`) stays sonnet's and is **frozen**: it's the fallback we ship if V15 isn't ready. Spec: `tasks/UI_SPEC.md`. Sonnet's WIP is commit `07dfbc5` (components exist, no tests, not the default). Sonnet **reviews your work in the browser** and files bugs in `tasks/status/sonnet.md`. Read that file often, because you have no browser.

**Cut-off:** if the new HUD doesn't meet the DoD below by **06:00**, we ship the legacy HUD. U2 (the journal book) and U3 (offer spheres) only happen **after** the DoD, and only if time remains (simple versions).

## Designer's bug list from the first browser look (fix in this order)
1. **No biome offer at run start, so the game can't be played.** The offer must appear on `offerShown`, above everything, with a dimmed background. A simple journal-styled modal is fine (the spheres are U3). Keys 1/2 and Reshuffle work.
2. **The help overlay renders as a full-width band behind other panels,** clipped on the left, with a stray "? or H" row poking out below the threshold stack. Make it a centered journal-page modal with a backdrop and a close button, topmost, closing on Esc/?/H. Don't auto-open it over the first offer: show it once *after* the first offer resolves, or just show a small "Press ? for controls" hint.
3. **Stacking order:** board < HUD panels < tutorial < toasts < modals (offer, help, journal, confirm, end screen). Nothing may overlap anything else at 1280×720 or 1024×640.
4. **The tutorial panel overlaps the threshold stack.** Make the stack compact (collapsed thresholds as one-line chips; the T8 goal card smaller), then position the tutorial below the stack's *measured* height, or collapse the tutorial by default after its first line. Its body must not need scrolling for a normal line.
5. **The biome triangle is clipped at the bottom edge,** and its labels overlap the circles. Keep a ≥ 16 px margin, put labels outside the circles, make the mixed circles smaller than the main ones, and show the highlighter ring on the selected biome.
6. **Deck and triangle selection:** the deck showed Forest with no biome highlighted. With nothing selected, show a prompt card ("Pick a biome or a tile"), or default to the biome of the first held core, **with** the ring shown.
7. **Resource pills:** add the resource name (small label or tooltip), tighten the width, and use the **body font with tabular digits** for numbers (not the handwritten font).
8. **The top-right journal/menu buttons** are a tiny emoji and glyph. Draw 40 px icons in the icon style.
9. **The detail panel's empty state** is a thin strip. Keep the full card size, so the panel doesn't jump.

## Then the rest of U1 (UI_SPEC §3 and §5)
Everything else in U1 that isn't done yet: both placement flows (sticky card; slot-first with auto-advance), the core card states, the hover pop-up (discovered combos only), detail-panel variants with Demolish, the ⚙ menu with Sound via `audioSettings`, End Run and New Run, restyled toasts and end screen, and Tab/R/Shift+click kept.

**Slot highlight (V13):** opus is adding the optional `setSlotHighlight` contract now. Implement it once `[opus] CONTRACT` lands. Until then, fall back to the `'selected'` hex highlight.

## DoD (by 06:00)
- **Tests** (happy-dom): the offer shows and resolves; help opens and closes; both placement flows; core card states; the pop-up never shows undiscovered combos; no overlap between the main panels (compare bounding boxes at 1280×720 and 1024×640 with a fixed layout).
- **Make it the default:** switch `src/ui/hud.ts` so `createHud` = the journal HUD, keeping `createLegacyHud` exported (opus wires `?ui=legacy`).
- **Sonnet's browser review:** **no open P0/P1 bugs** from sonnet.

Commit small and often (`[sol] V15: …`), and record each hash and what changed in your status so sonnet knows what to re-check.
