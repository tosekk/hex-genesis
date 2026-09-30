# Terraform (game jam build)

A deterministic hex-board terraforming game for the desktop browser, built with TypeScript, Three.js, and Vite. Choose a biome, drop a terraformer core, watch it spread across a dead planet, then build on the restored land to earn the next core. Where biomes meet, they mix.

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

itch.io settings: Kind of project **HTML**, upload the zip, tick **"This file will be played in the browser"**, viewport **1280 × 720**, enable the **fullscreen button**.

## Credits and AI usage (GAME_DESIGN §47)

- Code: written by AI coding agents (Claude Opus 5.5 and Sonnet 5.5 in Claude Code, GPT-6 Astra in Codex, GPT-6.1 Sol in Zed), directed by the designer.
- Voice lines (when present): pre-generated with ElevenLabs. There is no runtime generative AI or text-to-speech.
- Libraries: [Three.js](https://threejs.org/), [Vite](https://vite.dev/), [Vitest](https://vitest.dev/).
