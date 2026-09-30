# Hex Genesis — Agent Tasks and Implementation Rules

This document tells the coding agent how to build the game-jam build.

All gameplay rules live in `GAME_DESIGN.md`, which is the design authority. Read it fully before starting.

The playable build is due **October 1, 2026 at 10:00**.

Section numbers match the original combined specification for traceability.

---

# 1. Purpose

Use `GAME_DESIGN.md` and this document to:

1. inspect the existing repository;
2. compare existing implementation against the specification;
3. identify missing systems and contradictions;
4. break the remaining work into implementation tasks;
5. prioritize the minimum playable end-to-end game loop;
6. implement systems without inventing new mechanics.

### Hard constraints

Do not:

- add new gameplay mechanics;
- redesign the concept;
- expand the content scope;
- invent resources, buildings, combos, numeric balance values, terrain bonuses, or map validation rules that are explicitly undecided (see `GAME_DESIGN.md` §53);
- replace locked rules with supposedly better systems.

When an implementation detail is not specified, prefer the simplest deterministic implementation compatible with the rules in `GAME_DESIGN.md`.

---

# 48. Recommended Core Runtime State

Implementation should keep current board state separate from permanent payout history.

## Per slot

Suggested conceptual state:

- current building or empty;
- `yieldPaid`.

## Per hex

Suggested conceptual state:

- coordinate;
- elevation;
- biome;
- terrain/natural feature;
- placeable/unplaceable;
- 3 slots;
- current building configuration;
- `everCompleted`;
- payout record for each of the 3 slot pairs (paid or not, and which recipe paid);
- payout record for the full slot triple (paid or not, and which recipe paid);
- globally discovered recipes handled separately.

## Per unordered adjacent pair

- `adjacencyPaid`.

## Global state

- seed;
- terrain PRNG stream;
- biome-offer PRNG stream;
- resources (per type);
- lifetime yield (per resource type);
- progression threshold index;
- stack of unplaced cores, each with its chosen biome;
- current biome offer (modal, resolved on award);
- reshuffle used;
- biome-offer repetition state;
- current active spread;
- globally discovered combos;
- run start time;
- run status.

These are implementation suggestions for representing already-defined rules, not additional mechanics.

---

# 49. Placement Transaction Order

Building placement should behave as one deterministic transaction.

Recommended event order:

1. validate placement;
2. pay building cost;
3. place building;
4. calculate base slot yield if this slot has never paid;
5. calculate visible terrain bonus (base yield only);
6. calculate zone buff/debuff (base yield only);
7. determine current combo matches;
8. discover newly observed combos;
9. determine all newly payable intra-hex combos;
10. determine adjacency payout if this placement creates first completion;
11. commit payout flags;
12. add all resource/yield changes;
13. update lifetime yield;
14. evaluate progression threshold;
15. enqueue UI notifications;
16. display payout notifications sequentially.

Do not let UI animation timing modify the transaction result.

---

# 50. Terraform Transaction Order

Core activation should behave as:

1. validate chosen biome;
2. validate core placement;
3. lock core placement;
4. snapshot board;
5. calculate full spread using 69-unit pool;
6. calculate foreign-main conversion regions;
7. calculate natural terrain results;
8. create ordered spread animation queue;
9. begin spread animation;
10. reveal each tile in claim order;
11. lock building on every tile in this spread's claim set until the spread finishes;
12. prevent another core placement;
13. finish spread;
14. unlock next core placement.

---

# 51. Dijkstra / Spread Determinism

Any equal-cost path choice must resolve deterministically.

Use a fixed ordering based on coordinates / stable tile index.

Do not depend on:

- JavaScript object iteration accidents;
- nondeterministic collection order;
- frame timing.

The same seed and same player decisions must produce the same biome result.

---

# 52. Important Gameplay Invariants

Treat these as assertions.

### Payout invariants

- A slot's base yield can pay at most once.
- Each slot pair on a hex can pay a two-building combo at most once, whatever recipe forms there.
- The full slot triple on a hex can pay a three-building combo at most once, whatever recipe forms there.
- An unordered adjacent pair can pay at most once.
- Demolition never resets payout history.
- Rebuilding does not restore previous payout opportunities.
- All payouts caused by a placement are calculated before progression is checked.
- Terrain and zone modifiers affect base slot yield only.

### Spread invariants

- Only one spread may be active.
- Spread result is precomputed before animation.
- Same-biome tiles do not propagate spread.
- Mixed-biome tiles do not propagate spread.
- Main biomes never overwrite mixed biomes.
- Foreign main-biome conversion is limited to two hexes deep, and the route terminates there.
- Spread never continues from converted foreign tiles into dead land.
- Spread enters mountains at most 1 tile deep.
- No building is placed on a tile in an active spread's claim set.
- Another core cannot be placed during spread animation.

### Core hex invariants (2026-10-01)

- No building is ever placed on a hex in `state.cores`.
- Core hexes are excluded from every slot count (slots left, board used %, board-full loss).

### Discovery invariants

- Undiscovered combos are not shown in placement preview.
- Creating a valid recipe discovers it even if that hex cannot receive another payout for it.

### Completion invariants

- First transition to three occupied slots sets `everCompleted`.
- Completion-triggered payouts do not trigger again after demolition/refilling.

---

# 54. Scope Priorities for the Jam

The highest priority is a complete playable loop.

Priority labels match §56 D.

## P0: required for playable build

- placeholder gameplay configuration (building rosters, costs, yields, combo recipes, thresholds, starting stock, modifiers) so every P0 system runs on data;
- map generation, including hills, mountains, riverbeds, basins, and natural unplaceable tiles;
- deterministic seed;
- hex rendering;
- elevation;
- biome offer;
- core placement;
- biome spread calculation;
- biome spread animation;
- sequential core deployment;
- building placement;
- resources;
- one-time slot payouts;
- progression threshold;
- win state;
- manual end run.

## P1: important gameplay (core game identity)

- mixed-biome generation;
- 2-building combos;
- 3-building combos;
- combo discovery;
- adjacency bonus;
- terrain bonuses and zone buffs/debuffs;
- demolition;
- stacked cores;
- hover payout preview;
- automatic soft-lock detection (conservative).

## P2: polish / safe to simplify

- natural terrain visual variety;
- terrain bonus presentation polish;
- discovered-combo UI;
- biome offer repeat protection;
- reshuffle;
- end-screen presentation;
- camera polish;
- tutorial narration.

If the project is behind schedule, preserve the gameplay loop before presentation systems.

---

# 55. Cuts If Necessary

Without changing the core game loop, cut or simplify in this order:

1. ElevenLabs voice playback / animated assistant presentation; retain simple tutorial text if necessary.
2. waterfall rendering;
3. decorative river presentation;
4. elaborate camera rotation/polish;
5. elaborate combo encyclopedia UI;
6. biome-offer presentation polish;
7. end-screen visual polish;
8. natural-terrain visual variety beyond what gameplay requires.

Avoid cutting core placement, biome spreading, building, payouts, or progression unless absolutely necessary because those define the actual game.

---

# 56. Agent Task

Start by inspecting the repository.

Do not immediately rewrite architecture.

Produce:

## A. Current-state audit

For every major system in `GAME_DESIGN.md`, classify it as:

- implemented and working;
- implemented but incomplete;
- implemented but conflicts with spec;
- not implemented.

## B. Critical path

Identify the shortest path to a complete playable run:

**start → generate map → choose biome → place core → spread → build → earn → progress → repeat → win/end run**

Prioritize anything blocking this path above secondary polish.

## C. Task breakdown

Create implementation tasks grouped approximately into:

0. placeholder gameplay configuration;
1. foundational game state;
2. deterministic map generation;
3. board rendering;
4. input and camera;
5. biome offer;
6. terraformer placement;
7. spread/pathfinding;
8. spread animation;
9. biome mixing;
10. natural terrain;
11. buildings and slots;
12. economy;
13. combo system;
14. adjacency payouts;
15. demolition;
16. progression;
17. win/loss;
18. tutorial/UI;
19. testing and bug fixing;
20. itch.io production build.

Each task should include:

- files likely affected;
- dependencies;
- definition of done;
- known edge cases.

## D. Prioritization

Label tasks:

- **P0 — required for playable build**
- **P1 — important gameplay**
- **P2 — polish / safe to simplify**

## E. Implementation behavior

When writing code:

- keep gameplay values configurable;
- preserve deterministic simulation;
- separate simulation state from animation/UI;
- avoid adding abstractions that are unnecessary for the jam;
- avoid speculative refactors;
- make the minimum change required to satisfy the specification;
- test payout-history edge cases;
- test spread edge cases;
- test demolition/rebuild cases;
- test deterministic replay using identical seeds.

If existing code conflicts with `GAME_DESIGN.md`, treat it as the current design authority unless changing the code would jeopardize the P0 playable build. In that case, flag the conflict clearly before making a large architectural change.

---

# 57. Minimum Test Scenarios

At minimum, verify these cases.

### Spread

1. Flat dead terrain consumes 1 per tile.
2. Uphill costs more than flat.
3. Downhill costs less than flat but remains above zero.
4. Same-biome tile consumes zero and terminates propagation.
5. Mixed-biome tile terminates propagation.
6. Foreign main biome creates correct mixed biome.
7. Conversion never proceeds beyond two tiles deep.
8. Spread result does not change while animation runs.
9. Second core cannot be placed until animation finishes.
10. Same seed + same actions generates same spread.
11. Water, woods, and marsh tiles are claimed at double the normal slope cost and stay unplaceable.
12. Spread claims at most 1 mountain tile deep on any route, including across a mountain range.
13. Building on a tile in the active spread's claim set is rejected until the spread finishes; tiles outside it stay buildable.

### Building payouts

1. New slot pays base yield.
2. Demolish/rebuild same slot does not pay base again.
3. Second building creates one valid pair and pays it.
4. Third building can create two additional pair combos and both pay.
5. Third building can simultaneously trigger a 3-building combo.
6. All simultaneous payouts are committed before threshold evaluation.
7. UI shows simultaneous payouts sequentially.
8. Sawmill, Farm, Sawmill in slots 1, 2, 3 pays the Sawmill + Farm pair twice, same amount each time.
9. After a slot pair has paid, rebuilding a different recipe on it pays nothing.
10. Demolition refund is 50% of cost, rounded up per resource type.
11. Terrain and zone modifiers change base yield only, never combo or adjacency payouts.

### Combo history

1. Combo pays once.
2. Demolition removes current combo state.
3. Rebuilding does not repay combo.
4. Valid previously unknown combo becomes discovered even if it cannot pay.
5. Hover never reveals undiscovered combo bonus.

### Adjacency

1. First completed tile with no qualifying neighbor gets no adjacency payout.
2. Later neighbor completion can produce A-B payout.
3. A-B pair never pays twice.
4. Demolishing required neighboring buildings prevents that current configuration from satisfying future adjacency checks.
5. Rebuilding can restore current eligibility but cannot repay an already-paid A-B pair.
6. Neighbor does not need to currently contain all three buildings if the required current combo buildings are present.
7. A neighbor combo counts for adjacency whenever it is currently present, even if it never paid in its own hex.

### Completion

1. 3 occupied slots triggers first completion.
2. Demolishing a building does not erase `everCompleted`.
3. Refilling does not trigger another completion event.

### Progression

1. All placement payouts resolve.
2. Lifetime yield updates.
3. Threshold is evaluated afterwards.
4. Core + biome offer are awarded correctly.
5. Core remains unusable until any current spread finishes.
6. Passing a threshold while holding an unplaced core adds a second core to the stack.
7. The biome offer appears immediately on award and must be resolved before play continues.
8. A threshold is met only when every per-resource target in it is met.

### Terrain generation

1. Every hill tile has a mountain within 1 to 3 tiles.
2. Three consecutive hill tiles are always followed by a mountain.
3. A hill rises one level from its lower neighbor or stays level with adjacent hills.
4. Natural tiles are unplaceable from generation, and terraforming never changes placeability.

### Win / end

*(Updated 2026-09-30 for the new §41 win rule.)*

1. Win triggers in the same transaction that meets every target of the **final** threshold. No core or offer is awarded for it.
2. Empty slots, remaining legal core sites, held cores and an active spread do not block the win.
3. Board full (no empty slot on any terraformed placeable hex), no usable core site, no spread, no pending offer, final threshold unmet → automatic loss (§42).
4. No automatic loss while any yield-producing placement exists, including via demolition refunds (§43, §44).
5. A core hex is rejected for building placement, and its slots never count as empty or total slots.

---

# 58. Final Implementation Principle

This is a game-jam build.

Prefer:

**deterministic, understandable, working code**

over:

**generalized architecture, future-proof systems, or extra content.**

Do not expand the design while implementing it.

Get the complete loop playable first, then add the already-defined secondary systems in priority order.
