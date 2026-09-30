# Terraform (game jam build)

A deterministic hex-board terraforming game for the desktop browser, built with TypeScript, Three.js, and Vite. Choose a biome, drop a terraformer core, watch it spread across a dead planet, then build on the restored land to earn the next core. Where biomes meet, they mix.

**Goal: reach the final threshold before you run out of room.** Every slot and every combo pays only once, so board space is the real budget (GAME_DESIGN §41, §42).

The design lives in `GAME_DESIGN.md`. Team and agent rules live in `AGENTS.md` and `tasks/`.

## Run it

```bash
npm install
npm run dev            # http://localhost:5173
```

Add `?seed=123` to the URL to replay a specific world. Without it, each run gets a random seed. The end screen always shows the seed, and you can type one there to start a new run on it.

## Controls

| Input | Action |
|---|---|
| Left-click | Select a tile / place a core / build |
| **R** over a tile, or **Shift + click** | Repeat your last building (quick build) |
| **1** / **2** | Pick the left / right biome offer |
| **Esc**, or right-click | Cancel core placement / deselect |
| Right-drag, or **Q** / **E** | Rotate the camera |
| Mouse wheel | Zoom |
| Middle-drag, or **W A S D** | Pan the camera |
| **?** or **H** | Show / hide the controls help |
| **Mute** button / volume slider (on screen) | Audio on/off and level (remembered per browser) |

## Develop

```bash
npm test               # all tests (Vitest), ~35 s including the autoplay bot
npm run typecheck      # tsc --noEmit
npm run build          # production build → dist/
npm run pacing         # economy pacing report on a pinned flat map (bot, seeds 1–5)
npm run preview:head   # build the COMMITTED HEAD in a temp dir and serve it on :4199
```

The dev server hot-reloads whenever any file changes. In a shared checkout that restarts the page and loses the run, so playtest with `npm run preview:head`.

## Release (itch.io)

```bash
npm run package        # build → release/terraform-jam-<date>.zip
```

The zip has `index.html` at its root and only relative asset paths. The script refuses to package if it finds absolute paths. To check it locally, unzip it somewhere and run `npx vite preview --outDir <that folder>`.

To test the game the way itch embeds it (a 1280 × 720 iframe on a different site, inside a scrolling page), run `npm run itch-test` and open `http://127.0.0.1:4197/itch-frame.html`. Add `?seed=7` for a fixed world, or `?same=1` for a same-origin frame you can inspect from the console.

itch.io settings: Kind of project **HTML**, upload the zip, tick **"This file will be played in the browser"**, viewport **1280 × 720**, enable the **fullscreen button**.

## itch.io page (draft)

> Copy this section into the itch.io page editor. **`<GAME NAME>` is a placeholder**; the designer hasn't picked a name yet. Lines marked *(designer: confirm)* depend on assets that aren't in the build yet.

### <GAME NAME>

A dead planet, a handful of terraformer cores, and a hex board full of mountains, dry riverbeds, and empty plains. Choose a biome, drop a core, and watch forest, desert, or arctic life roll across the terrain. Where two biomes meet they blend into steppe, taiga, or polar desert. Every building and every combo pays out only once, so the land you restore is your real budget.

**Reach the final threshold before you run out of room.**

**How to play**

- **Choose a biome.** Each new core comes with a choice of two biomes: Forest, Desert, or Arctic.
- **Place the core** on dead land. It spreads out across the terrain; slopes, rivers, woods, and mountains shape how far it reaches.
- **Build** up to three buildings on each restored tile. Every building pays out once when you place it.
- **Discover combos.** The right buildings together on a tile, or finished tiles side by side, pay bonus resources.
- **Hit the resource targets.** Each threshold earns another core. **Reach the final threshold (8 of 8) to win**, even with empty slots left. If the board runs out of room first, the run is lost.

**Controls**

| Input | Action |
|---|---|
| Left-click | Select a tile / place a core / build |
| R over a tile, or Shift + click | Repeat your last building |
| 1 / 2 | Pick the left / right biome |
| Esc, or right-click | Cancel / deselect |
| Right-drag, or Q / E | Rotate the camera |
| Mouse wheel | Zoom |
| Middle-drag, or W A S D | Pan the camera |
| ? or H | Controls help |

Plan your tiles: building the same cheap thing everywhere fills the board fast and pays little. Combos and completed neighbouring tiles are where the big yields are. Click the game once if the keys don't respond; the browser only sends keys to the game after it has focus. Desktop browsers only; there's no mobile support. Every world comes from a seed shown on the end screen, so you can replay a map or share it.

**Credits and AI usage**

- Made for <JAM NAME> by <DESIGNER NAME>, who directed the design, rules, and balance.
- **Code:** AI-assisted. Four AI coding agents wrote the game under the designer's direction: Claude Opus 5.5 and Claude Sonnet 5.5 (Anthropic, in Claude Code), GPT-6 Astra (OpenAI, in Codex), and GPT-6.1 Sol (OpenAI, in Zed).
- **Graphics:** the low-poly board, terrain, and buildings are procedural Three.js geometry, and the icons are hand-coded SVG, all written by the coding agents. No image- or model-generation AI was used. *(designer: confirm, or list any generated art you add)*
- **Voice:** the assistant's lines are pre-generated with ElevenLabs. *(designer: confirm once the voice files are in)*
- **Music / sound:** *(designer: e.g. "music generated with Suno", or remove this line)*
- Nothing is generated while you play: there is no runtime AI and no text-to-speech.
- Built with [Three.js](https://threejs.org/) and [Vite](https://vite.dev/).

## Credits and AI usage (GAME_DESIGN §47)

- Code: written by AI coding agents (Claude Opus 5.5 and Sonnet 5.5 in Claude Code, GPT-6 Astra in Codex, GPT-6.1 Sol in Zed), directed by the designer.
- Voice lines (when present): pre-generated with ElevenLabs. There is no runtime generative AI or text-to-speech.
- Libraries: [Three.js](https://threejs.org/), [Vite](https://vite.dev/), [Vitest](https://vitest.dev/).
