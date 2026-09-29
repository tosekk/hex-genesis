# Tasks — `sol` (GPT-6.1 Sol · Zed) — Presentation: Three.js Board, Animation, Tutorial

You own **everything the player sees in 3D** plus the **tutorial assistant**. You render state. You never decide it.

**You own:** `src/render/**`, `render-sandbox.html`, `src/tutorial/**`, `public/audio/**`, `public/assets/**`, `tasks/status/sol.md`.
**Read-only for you:** everything else. `src/render` must never mutate `GameState` or call session commands.
**Wait for** the `[opus] M0` commit before creating any files. Until then, read GAME_DESIGN §2–§8, §15, §19, §24, §46 and AGENT_TASKS §55, and plan the scene.

Task order: **R1 → R2 → R3 → R4**.

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
