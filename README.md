# Hex Genesis (game jam build)

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

The game ships with the **journal HUD** (field-journal look). The older HUD is still reachable with `?ui=legacy`.

**Screen layout:** thresholds and "Slots left" on the left, the **biome triangle** and the **building deck** along the bottom, the **tile detail** panel when a tile is selected, and **📖 journal** and **⚙ menu** buttons at the top right.

| Input | Action |
|---|---|
| Click a **biome circle** in the triangle | Show that biome's deck. Forest / Desert / Arctic light up when that land exists or you hold a core of it; mixed biomes (Steppe / Taiga / Polar Desert) light up once they exist on the board. Click it again to clear. |
| Click a **building card**, then empty slots | Card → slot: keeps placing that building on each slot you click |
| Click an empty **slot**, then a building card | Slot → card: builds there, then moves to the tile's next empty slot |
| Click the **core card** (first card in a Forest / Desert / Arctic deck), then a highlighted tile | Place a held core of that biome on a legal site; a badge shows the count when you hold more than one |
| Click a tile | Select it: its biome's deck and the tile detail panel (slots, buildings, **Demolish** for half the cost back) |
| **R** over a tile, or **Shift + click** | Repeat your last building (quick build) |
| Hold **Tab**, or click **"Slots left"** | Highlight every tile that still has an empty slot |
| **1** / **2**, or click a sphere | Pick the left / right biome in a core offer (one reshuffle per run) |
| **J**, or the **📖** button | Open / close the journal: discovered combos, the adjacency log, terrain and zone effects |
| **Esc**, or right-click | Clear the selection; closes the journal, help or menu if one is open |
| **?** or **H** | Show / hide the controls help |
| **⚙** menu | Help, Sound on/off + volume (remembered per browser), End Run, New Run (optional seed) |
| Right-drag, or **Q** / **E** | Rotate the camera |
| Mouse wheel | Zoom |
| Middle-drag, or **W A S D** | Pan the camera |

Click the game once first: the browser only sends keys to it after it has focus.

## Develop

```bash
npm test               # all tests (Vitest), ~30 s including a bounded autoplay sample
npm run test:e2e-full  # the full autoplay set (greedy seeds 1–5, spam 1–3, two replays)
npm run typecheck      # tsc --noEmit
npm run build          # production build → dist/
npm run pacing         # economy pacing report on a pinned flat map (bot, seeds 1–5)
npm run preview:head   # build the COMMITTED HEAD in a temp dir and serve it on :4199
```

The dev server hot-reloads whenever any file changes. In a shared checkout that restarts the page and loses the run, so playtest with `npm run preview:head`.

## Release (itch.io)

```bash
npm run package        # build → release/hex-genesis-<date>.zip, then npm run verify-zip
npm run verify-zip     # re-check the newest release/*.zip (or pass a path)
```

The zip has `index.html` at its root and only relative asset paths. The script refuses to package if it finds absolute paths. `verify-zip` then checks the zip: `index.html` at the root, relative URLs only, every MP3 in `src/assets/audio` exactly once, no `src/` files. It prints the size, the zip's sha256, and a **content sha256** that doesn't depend on compression, so a build of the same commit on another machine gives the same content hash even if the zip bytes differ. To check it locally, unzip it somewhere and run `npx vite preview --outDir <that folder>`.

To test the game the way itch embeds it (a 1280 × 720 iframe on a different site, inside a scrolling page), run `npm run itch-test` and open `http://127.0.0.1:4197/itch-frame.html`. Add `?seed=7` for a fixed world, or `?same=1` for a same-origin frame you can inspect from the console.

itch.io settings: Kind of project **HTML**, upload the zip, tick **"This file will be played in the browser"**, viewport **1280 × 720**, enable the **fullscreen button**.

## itch.io page

The page copy (description, how to play, controls, AI usage, credits) lives in [`itch/PAGE.md`](itch/PAGE.md).

## Credits and AI usage (GAME_DESIGN §47)

- Code: written by AI coding agents (Claude Opus 5.5 and Sonnet 5.5 in Claude Code, GPT-6 Astra in Codex, GPT-6.1 Sol in Zed), directed by the designer.
- Voice lines, sound effects and music: generated ahead of time with ElevenLabs and shipped as MP3 files. There is no runtime generative AI or text-to-speech.
- Fonts (journal HUD): Patrick Hand and Nunito, SIL Open Font License 1.1.
- Libraries: [Three.js](https://threejs.org/), [Vite](https://vite.dev/), [Vitest](https://vitest.dev/).
