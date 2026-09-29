# AGENTS.md — rules for every coding agent in this repo

Five AI agents build this game in parallel in the **same checkout**. They stay out of each other's way because every file has exactly one owner.

## Before you do anything

1. Identify yourself: your **agent tag** is in the kickoff prompt (`opus`, `sonnet`, `astra`, `deepseek`, or `sol`).
2. Read, in order:
   1. `tasks/README.md`: team, ownership map, milestones, protocol
   2. `tasks/CONTRACTS.md`: the frozen interfaces you code against
   3. your own task file (listed in `tasks/README.md`)
   4. the `GAME_DESIGN.md` sections your task file cites. `GAME_DESIGN.md` is the design authority.
3. Read every `tasks/status/*.md` (read-only) to pick up contract changes and notes from other agents.

## Non-negotiable rules

- **Write only to paths you own** (see the ownership map in `tasks/README.md`). You may read and import anything.
- **Never edit** `GAME_DESIGN.md`, `AGENT_TASKS.md`, `AGENTS.md`, `CLAUDE.md`, `tasks/*.md`, or another agent's status file.
- **Do not change a contract** (`src/core/types.ts`, `src/core/contracts.ts`, exported signatures in `tasks/CONTRACTS.md`). Request changes in your own status file. Only `opus` edits contracts.
- **Do not invent design.** Anything listed in `GAME_DESIGN.md` §53 exists only as clearly labelled `PLACEHOLDER` data in `src/config/*`. Never add new mechanics.
- **Determinism:** no `Math.random()`, `Date`, or `performance.now()` in `src/core`, `src/sim`, or `src/game` state logic. Use `src/core/rng.ts`. Avoid `Math.sin/cos/exp/pow/log` in anything that decides game state (results can differ between JS engines). Use integer math where you can.
- **Layering:** `src/core` and `src/sim` must not import `three`, the DOM, or anything from `src/game`, `src/render`, `src/ui`, `src/tutorial`, or `src/app`. `src/render` never mutates `GameState`. The UI changes state only through `GameSession` commands.
- **Git in a shared checkout:** stage only your own paths explicitly (`git add src/sim/economy tasks/status/astra.md`). **Never** run `git add -A`, `git add .`, `git commit -a`, `git stash`, `git reset --hard`, `git checkout -- <others' files>`, `git clean`, `git rebase`, or `git push --force`. Commit message prefix: `[<tag>] `. If `index.lock` exists, wait a few seconds and retry.
- **No new npm dependencies.** Ask for them in your status file.
- **Test only what you own:** `npx vitest run <your paths>`. `npm run typecheck` errors in files you don't own are not yours to fix. Report them if they block you.
- **When the spec is ambiguous,** choose the simplest deterministic reading, write it under "Decisions" in your status file with the § reference, and continue. Stop and ask only if the ambiguity would change a contract.
- **Update your status file** (`tasks/status/<tag>.md`) when you start a task, finish a task (include the commit hash), or get blocked.
