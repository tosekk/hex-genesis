# Team Plan — Terraforming Board Game (jam build)

**Hard deadline:** a playable itch.io build by **October 1, 2026, 10:00**.
**Design authority:** `GAME_DESIGN.md`. **Implementation rules:** `AGENT_TASKS.md`. **Interfaces:** `tasks/CONTRACTS.md`.

**Current-state audit (AGENT_TASKS §56 A):** the repo contains only design docs. Every system is **not implemented**. There is no existing architecture to preserve.

---

## 1. Team

| Tag | Model | Tool | Role | Task file |
|---|---|---|---|---|
| `opus` | Opus 5.5 | Claude Code | **Lead**: foundation and contracts, spread engine, integration, release | `tasks/opus-5.5.md` |
| `sonnet` | Sonnet 5.5 | Claude Code | **Game flow and UI**: session state machine, HUD, interaction | `tasks/sonnet-5.5.md` |
| `astra` | GPT-6 Astra | Codex | **Economy**: buildings, payouts, combos, adjacency, progression, acceptance tests | `tasks/gpt-6-astra.md` |
| ~~`deepseek`~~ | DeepSeek V4 Pro 0813 | OpenCode | **Dropped** (too slow). Map generation → astra, offers → astra, endgame → sonnet | ~~`tasks/deepseek-v4-pro.md`~~ (kept as the D1/D4 spec) |
| `sol` | GPT-6.1 Sol | Zed | **Presentation**: Three.js board, camera, picking, animation, tutorial | `tasks/gpt-6.1-sol.md` |

**Kickoff prompt** (paste into each tool and replace the tag):

> You are agent `<tag>` on a 5-agent team. Read `AGENTS.md`, then `tasks/README.md`, then `tasks/CONTRACTS.md`, then your task file `tasks/<file>.md`. Follow its task order. Start with your first task that is not done.

---

## 2. Architecture

```
            ┌──────────────── src/main.ts + src/app/* (opus) ────────────────┐
            │  composes everything, runs the frame loop                      │
            ▼                         ▼                          ▼
   src/render/* (sol)        src/ui/* (sonnet)         src/tutorial/* (sol)
   Three.js BoardView        DOM HUD + interaction     assistant overlay
   (reads state only)        (calls session only)      (listens to events)
            ▲                         │                          ▲
            │ events                  ▼ commands                 │ events
            └──────────── src/game/session.ts (sonnet) ──────────┘
                          GameSession: game-flow state machine,
                          spread pacing, gating, event emission
                                      │ calls (pure sim, mutates GameState)
        ┌─────────────────┬───────────┴──────────┬──────────────────────┐
        ▼                 ▼                      ▼                      ▼
 src/sim/world (deepseek) src/sim/spread (opus)  src/sim/economy (astra) src/sim/offers.ts,
 map generation           core sites + spread    payouts/combos/…        endgame.ts (deepseek)
        └─────────────────┴──────── src/core/* (opus) ───────────────────┘
                      types, contracts, rng, hex math, state, test builders
```

Principles:

- The simulation is a set of pure TypeScript functions over `GameState`. It is headless and unit-tested. It uses no Three.js and no DOM.
- `hex.biome` is the **visible** state. The spread is fully precomputed. The session reveals claims into `hex.biome` over time, and the renderer only animates what has been revealed.
- `GameSession` is the only place that sequences actions: spread gating, offer gating, threshold checks, and the win/loss check.
- Any module may **import and call** any other module's exported functions. Only the owner **edits** a module.

---

## 3. Ownership map

A path's owner is the **only** agent that may create, edit, or delete files under it.

| Path | Owner |
|---|---|
| `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `index.html`, `.gitignore`, `README.md` | opus |
| `src/core/**` (types, contracts, result, biomes, rng, hex, state, testing) | opus |
| `src/config/index.ts`, `src/config/spread.ts` | opus |
| `src/sim/spread/**` | opus |
| `src/main.ts`, `src/app/**`, `tests/e2e/**`, `scripts/**` | opus |
| `src/game/**` | sonnet |
| `src/ui/**` except below (legacy HUD, **frozen**: fixes only) | sonnet |
| `src/ui/v2/**`, `src/ui/hud.ts`, `public/assets/fonts/**` (new journal HUD) | **sol** (reassigned 2026-10-01 00:00) |
| `src/ui/journal/**` (journal book module) | sonnet |
| `src/fx/**` (offer spheres module) | opus |
| `src/sim/economy/**`, `src/config/economy.ts` | astra |
| `tests/acceptance/**`, `tests/balance/**` | astra |
| `src/sim/world/**`, `src/config/map.ts` | astra (reassigned from deepseek) |
| `src/sim/offers.ts`, `src/sim/offers.test.ts` | astra (reassigned from deepseek) |
| `src/sim/endgame.ts`, `src/sim/endgame.test.ts` | sonnet (reassigned from deepseek) |
| `src/render/**`, `render-sandbox.html` | sol |
| `src/tutorial/**`, `src/audio/**`, `public/audio/**`, `public/assets/**`, `release-kit/**` | sol |
| `tasks/status/<tag>.md` | that agent |
| `GAME_DESIGN.md`, `AGENT_TASKS.md`, `AGENTS.md`, `CLAUDE.md`, `tasks/*.md` | human only |

**Stub handoff:** in task O1, `opus` creates compiling **stub** files in other agents' paths, with the exact signatures from `CONTRACTS.md`. Once the `[opus] M0` commit lands, each stub belongs to the owner listed above. Before M0 lands, other agents only read and plan. They create no files.

---

## 4. Milestones and dependencies

The timeline counts from kickoff (T). If a milestone slips, cut P2 work first (AGENT_TASKS §55).

| Milestone | Target | Contents | Gate |
|---|---|---|---|
| **M0 Foundation** | T+0:45 | scaffold, contracts, rng, hex, state, test builders, config, stubs | `npm test` and `npm run typecheck` green; commit `[opus] M0 …` |
| **M1 Modules P0** | T+5h | mapgen, spread (incl. mixing), economy base payouts, offers, session, board render, basic HUD | each owner's P0 definition of done met |
| **M2 Playable loop** | T+8h | integrated in the browser: start → offer → core → spread → build → earn → threshold → repeat → win/end run | opus plays a full run with no console errors |
| **M3 P1 complete** | T+14h | combos, discovery, adjacency, modifiers, demolition, stacked cores, preview, soft-lock | acceptance tests green |
| **M4 Polish** | T+18h | P2: visuals, tutorial, reshuffle and repeat protection, codex UI, end screen, camera | — |
| **Code freeze** | Oct 1, 07:00 | bug fixes only; opus approves each one in `tasks/status/opus.md` | — |
| **Release** | Oct 1, 08:30 | `release/*.zip` built and verified; the **human** uploads to itch.io | — |

Dependency graph (→ means "needs"):

```
O1 foundation ──► everything
D1 mapgen      ──► real maps (the O1 stub returns a trivial flat map until then)
O2 spread      ──► S1 session tests (9, 13), D3 endgame (legal core sites)
C1 economy     ──► S1 session placement flow, D3 endgame, S2 build panel
D2 offers      ──► S1 session
S1 session     ──► S2 HUD, R4 tutorial, O3 integration
R1/R2 render   ──► O3 integration
```

While a dependency is still a stub, write your tests anyway. Mark them `it.todo(...)` or `it.skip(...)` with a comment naming the dependency, then enable them when it lands.

---

## 5. Working protocol (every agent)

1. **Start a task:** re-read the cited `GAME_DESIGN.md` sections and all `tasks/status/*.md`. Set your status to `IN PROGRESS: <task id>`.
2. **Test first where it's cheap:** turn the task's "Required tests" into failing Vitest cases, then implement.
3. **Small commits:** commit when a test group goes green, using `[<tag>] <task id>: <what>`. Stage only your own paths.
4. **Definition of done:** a task is done only when every DoD bullet is true, `npx vitest run <your paths>` is green, and `npm run typecheck` shows no errors in your files.
5. **Record decisions:** every interpretation of an ambiguous rule goes under "Decisions" in your status file, with its § reference.
6. **Contract changes:** add a request under "Contract requests" in your status file with the exact proposed TypeScript. `opus` answers in `tasks/status/opus.md` → "Contract changelog". Until then, work around the gap inside your own files.
7. **Bugs in someone else's module:** don't fix them. Write a reproducible report (input, expected, actual, § reference) under "Bugs found in others' modules" in your own status file. The human relays it.
8. **Finish a task:** record the commit hash in your status file, then move to the next task in your file. When your list is empty, write `IDLE — available` and stop. Don't wander into other agents' areas.

### Commands (available after M0)

```bash
npm run dev          # Vite dev server
npm test             # all tests (others' WIP may fail; use the scoped form)
npx vitest run src/sim/economy    # scoped tests
npm run typecheck    # tsc --noEmit
npm run build        # production build → dist/
npm run package      # zip dist/ → release/ (opus, O4)
```

---

## 6. Priority labels (AGENT_TASKS §54)

- **P0:** required for the playable build. Never cut.
- **P1:** core game identity. Cut only if M2 is at risk.
- **P2:** polish, safe to simplify. Cut order: AGENT_TASKS §55.
