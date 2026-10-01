# itch.io page copy: Hex Genesis

Paste-ready. Everything in `[CHECK]` or `[CHECK BEFORE PUBLISHING]` needs a decision from you. Written against the code at `main` `a752b06` (journal HUD, v5 economy, audio in the build); AI usage, art, screenshots and known issues updated at `b424acc` (terraformer core models in the default renderer).

---

## 1. Form fields

**Title:** Hex Genesis

**Short description** (shown under the title, about 100 characters max):

> Restore a dead hex planet. Spread biomes, let them collide, and spend every tile wisely.

**Classification:** Game

**Kind of project:** HTML (upload the zip from `npm run package`; `index.html` is at its root)

**Release status:** Released (or "In development" if you plan post-jam updates) `[CHECK]`

**Genres** (pick up to 5 from itch's list):

- Strategy
- Puzzle
- Simulation

Board-game feel is covered by the tags below.

**Tags** (itch allows 10):

1. hex-grid
2. terraforming
3. board-game
4. 3d
5. three-js
6. resource-management
7. relaxing
8. low-poly
9. singleplayer
10. gen-ai-jam `[CHECK: use the exact jam tag the jam page asks for]`

**Embed options:**

- Tick "This file will be played in the browser"
- Viewport size: 1280 × 720
- Fullscreen button: on
- Mobile friendly: off (desktop only)
- Automatically start on page load: off (a click gives the game keyboard focus)
- Scrollbars: off

**Other fields:**

- Average session length: about 10 to 20 minutes `[CHECK: your playtests; the bot wins in roughly 2 minutes, a human will be slower]`
- Multiplayer: none. Accessibility: mouse needed; there's no colour-only text, but the biomes rely on colour `[CHECK]`
- Cover image: 630 × 500, no title text. Captured from the real game (seed 7, camera F2): `pres/assets/cover-F2-630x500.png`. `[CHECK: it predates the core models; recapture with ?photo=1 then Shift+P if you want them visible]`
- Screenshots: captured at 1920 × 1080 on seed 7 in `pres/assets/` (`shot-01` … `shot-06`, `board-F1/F3/F4`). The late-game shots come from a bot run through the real game commands, and they predate the core models. `[CHECK]`

---

## 2. Page description

**Hex Genesis** is a small hex board game about bringing a dead planet back to life, one tile at a time.

The board starts as bare ground: mountains, dry riverbeds, empty plains. You get a terraformer core and a choice of two biomes to put in it. Drop the core on a tile and the biome rolls outward across the land. It doesn't spread evenly. It climbs slopes slowly, flows along rivers and stops at mountain walls, so where you place a core matters.

Once land comes back to life, you build on it. Every restored tile has three building slots, and each biome offers its own set of buildings. Buildings make wood, stone, water and food. Reach the next resource target and you earn another core, and with it another biome to choose.

The part I like best is what happens when two biomes meet. Forest and desert blend into steppe, forest and arctic into taiga, desert and arctic into polar desert. Each mixed biome has its own buildings that you can't get any other way.

There's also a layer under the surface. Certain buildings placed together on one tile pay a bonus, and so do finished tiles side by side. There are 21 of these combinations in the game. The game doesn't list them. You find them by trying things, and once you've found one, the in-game journal remembers it.

One rule shapes everything: every slot pays out once, and every combination pays out once. Demolish a building and rebuild it, and you won't get the payout twice. That makes the board a finite budget. You win by reaching the final resource threshold. You lose if you run out of room first. Filling every tile with the same cheap building is the fastest way to lose.

Every world comes from a seed. Add `?seed=123` to the URL to replay a map, or type a seed on the end screen. Each run without one gets a random world.

It's a desktop browser game, and it's built for mouse and keyboard.

---

## 3. How to play

1. **Choose a biome.** Each new core comes with two offered biomes: Forest, Desert or Arctic. You can reshuffle the offer once per run.
2. **Place the core:** click the core card in the deck, then a highlighted dead tile. The biome spreads out over the terrain. Wait for the wave to finish before you build.
3. **Build** on restored tiles. Each has three slots. Pick a biome in the triangle (or click a tile), pick a building card from the deck, then click empty slots. Every building pays out once when it's placed.
4. **Look for combinations.** Some buildings work better together on the same tile, and some finished tiles pay a bonus next to each other. Discovered combos go into the journal.
5. **Watch the thresholds.** Each resource target you pass earns another core and another biome offer.
6. **Reach the last threshold (8 of 8) to win,** even if slots are still empty. If the board runs out of room first, the run is lost.

---

## 4. Controls

Click the game once first so it receives keystrokes.

- **Biome triangle** (bottom): click a biome to show its building deck. Forest, Desert and Arctic light up when that land exists or you hold a core of it; the mixed biomes light up once they appear on the board.
- **Building deck:** click a building card, then click empty slots to keep placing it. Or click an empty slot first, then a card.
- **Core card** (first card of a Forest, Desert or Arctic deck): click it, then a highlighted tile, to place a held core.
- **Click a tile** to see its slots and buildings. Demolish from there for half the cost back.
- **R** over a tile, or **Shift + click:** repeat your last building
- **Hold Tab**, or click "Slots left": highlight every tile that still has an empty slot
- **1 / 2**, or click a sphere: pick the left / right biome in a core offer
- **J**, or the 📖 button: open or close the journal (discovered combos, adjacency log, terrain and zone effects)
- **Esc**, or right-click: clear the selection; closes the journal, help or menu
- **? or H:** show or hide the controls help
- **⚙ menu:** help, sound on/off and volume (remembered in your browser), end the run, or start a new run with an optional seed
- **Right-drag**, or **Q / E:** rotate the camera
- **Mouse wheel:** zoom
- **Middle-drag**, or **W A S D:** pan the camera

---

## 5. Tips

- Cheap buildings are tempting, but building the same thing everywhere runs the board out fast and pays little.
- Terrain matters twice: it shapes how far a core spreads, and buildings next to mountains, rivers, woods or marsh can pay extra.
- Combos only pay once per tile, so a tile with a good arrangement is worth more than two filled with whatever's cheapest.
- Where two biomes meet, look at what the new mixed biome lets you build before you commit to the next core.

---

## 6. AI usage

This game was made for the GenAI Game Jam. AI was used in these parts of production.

**Code: AI coding agents, directed by me.** A team of agents wrote the game, each with its own area of the codebase and a written task file, working in one shared repository:

- **Claude Opus 5.5** (Claude Code): lead agent. Core types and contracts, the terraforming spread engine, integration and wiring, packaging for itch.io.
- **Claude Sonnet 5.5** (Claude Code): game session and flow, the first HUD (resource bar, offers, hex panel, codex, end screen), win/loss detection, and the journal-style HUD's first build.
- **GPT-6 Astra** (Codex): economy and payouts, buildings and combos, map generation, biome offers, balance tuning and acceptance tests. Astra (in two Codex sessions) also built the 3D models of the three terraformer cores (Forest, Desert, Arctic) from the concept art: each is generated in code as low-poly geometry with vertex colours (about 1,500 triangles, no textures) and written out as a GLB file.
- **GPT-6.1 Sol** (Zed): the Three.js board renderer, camera, picking and animation, the 24 building models, the GLB model loader, the tutorial assistant and its script, building/terrain/core icons, audio settings, and the journal HUD's later work.
- **A separate Claude Opus session** acted as producer: planning tasks and splitting ownership across the agents.
- **DeepSeek V4 Pro** was tried and dropped early because it was too slow. Its tasks went to other agents, and it wrote no code in the game.

**Art: concept images, then code.** The concept art for the three terraformer cores was made with ChatGPT image generation. It's a reference only; no generated image appears in the game. From those concepts, GPT-6 Astra built the core models as 3D geometry in code. The board, terrain and the 24 low-poly buildings are procedural Three.js geometry written by GPT-6.1 Sol, and the icons are hand-written SVG, also produced by the coding agents.

**Design review:** `[CHECK: the repo doesn't record an AI design review. If you had an AI (which model?) review or stress-test GAME_DESIGN.md, say so here in one or two sentences, or delete this paragraph.]`

**Narrative: written by an agent, voiced by ElevenLabs.** GPT-6.1 Sol wrote the tutorial assistant's script from my brief.

**Voice, sound effects and music: ElevenLabs.** The assistant's five voice lines, the 13 sound effects and the looped music track were generated with ElevenLabs before release and ship as MP3 files in the build.

**Nothing is generated while you play.** There's no AI at runtime and no text-to-speech.

**What I did:** I designed the game (the rules, the biomes, the combo and economy ideas, and the win/lose rule), wrote the specs the agents worked from, playtested the builds, directed the art and UI style (the field-journal look, the concept art for the cores), and made the balance calls. I also decided when a change was needed. The win condition, for example, changed after my own playtest, where the board was covered long before the run ended.

---

## 7. Credits

- **Design, playtesting, art direction:** [DESIGNER NAME] `[CHECK]`
- **Code:** Claude Opus 5.5 and Claude Sonnet 5.5 (Anthropic, in Claude Code); GPT-6 Astra (OpenAI, in Codex); GPT-6.1 Sol (OpenAI, in Zed)
- **3D models:** terraformer cores by GPT-6 Astra; buildings and board by GPT-6.1 Sol (both generated in code)
- **Concept art:** ChatGPT image generation (OpenAI), directed by the designer
- **Producer session:** Claude Opus (Anthropic)
- **Libraries:** [Three.js](https://threejs.org/) (3D rendering); [Vite](https://vite.dev/) (build) and [Vitest](https://vitest.dev/) (tests) during development. `[CHECK: Three.js is MIT; add its licence text or a link if the jam asks]`
- **Fonts** (journal HUD), both under the SIL Open Font License 1.1:
  - [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand) by Patrick Wagesreiter
  - [Nunito](https://fonts.google.com/specimen/Nunito) by The Nunito Project Authors
- **Voice, sound effects and music:** generated with [ElevenLabs](https://elevenlabs.io/)
- **Jam:** GenAI Game Jam `[CHECK: exact jam name]`

---

## 8. Known issues and notes

- **Desktop browsers only.** Keyboard and mouse are needed. There's no mobile or touch support.
- **Browsers:** `[CHECK: name what you actually tested. The QA notes mention Brave and Safari, and the itch-style iframe test is in the release notes, but nothing in the repo lists a supported set. A current Chrome, Edge or Firefox is the usual claim.]`
- **Click the game once** before using keys. The browser only sends keys to the game after it has focus. If the page embeds in itch.io, use the fullscreen button for the best view.
- **Some openings are slow.** The first threshold needs stone only, and on some seeds the starting biome yields little of it. Reshuffling the offer or choosing a stone-friendly biome helps. With the current economy, the combo-seeking test bot gets stuck in the opening on none of seeds 1–50. Before the final cost fix it got stuck on 5 of seeds 1–200 (61, 93, 105, 147, 194); those weren't re-measured after the fix. `[CHECK]`
- **Tutorial notes:** the assistant's first line opens in full; later lines arrive collapsed as short notes (they still speak unless sound is off). Voice starts after your first click or key press, because browsers block audio until then.
- **Terraformer core models** load in the default view from `b424acc` on. An older upload shows the procedural crystal instead. `[CHECK: which commit the uploaded zip was built from]`
