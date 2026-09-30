# Hex Genesis — Game Design

This document is the design authority for the game-jam build: what the game is and how its rules work.

Implementation instructions, task breakdown, invariants, and tests live in `AGENT_TASKS.md`.

Section numbers match the original combined specification for traceability.

---

# 2. Game Overview

A desktop-browser 3D board game built with **Three.js** and hosted on **itch.io**.

Visual style:

- low-poly;
- physical board-game presentation;
- hexagonal tiles;
- stacked hexes representing elevation;
- rotatable camera.

The player gradually restores a dead landscape using biome-generating terraformer cores.

The basic progression loop is:

**Biome offer → choose biome → place terraformer core → biome spreads → construct buildings → earn resources/yield → reach threshold → receive next core + biome offer → repeat.**

The run is **won by reaching the final progression threshold** (see §41). It is **lost when the board runs out of room** first: no remaining action can earn more yield (§42). The player can also end a run manually.

> **Design change (2026-09-30, designer-approved):** the win condition changed from "fill every slot" to "reach the final threshold". Payout rules are unchanged. Because every slot and slot pair pays only once, the finite board becomes the challenge.

---

# 3. Platform

Target:

- desktop web;
- Three.js;
- 3D;
- itch.io deployment.

No mobile support is required.

---

# 4. Map

## Grid

The map is a:

**14 × 20 hex grid**

generated at the beginning of each run.

Each hex has an integer elevation.

Expected elevation range:

**4–5 height levels**

The highest terrain level represents mountains.

Elevation is visually represented by stacked hexagonal tiles.

---

# 5. Deterministic Generation

The map is generated from a numeric seed.

Requirements:

- integer seeded PRNG;
- same seed must generate the same map;
- deterministic across browsers;
- deterministic tie-breaking must be used where generation/pathfinding has equal choices.

Biome offers use a **separate random stream** from terrain/map generation.

Therefore:

> Same seed + same player decisions (biome choices, reshuffle use, core placements, building placements, demolitions) = same run.

Never use uncontrolled `Math.random()` for deterministic game-state decisions.

Visual-only effects may use nondeterministic randomness if they do not affect gameplay state.

---

# 6. Terrain Generation

The initial world is dead terrain.

Terrain types are decided at generation and never change. Terraforming only changes how a tile looks and which biome it belongs to (see §7).

Terrain generation includes:

- elevation;
- hills;
- mountains;
- dried riverbeds;
- basins;
- other natural tiles (woods, marsh, and similar).

## Hills and mountains

Mountains already exist on the dead planet. They are not produced by terraforming.

Hills are the elevated approach tiles that lead to mountains. "Hill" is an internal name only: visually a hill is an ordinary tile that sits higher on the board.

- A hill rises by one level from its adjacent lower tile, or stays on the same level as adjacent hill tiles.
- At most 3 consecutive hill tiles lead to a mountain. If there are 3 consecutive hill tiles, the 4th tile is always a mountain.
- A mountain appears as early as 1 tile after a hill tile and as far as 3 tiles away from it.
- Hills are placeable and can be terraformed. Uphill spread cost applies when a spread climbs them.
- Mountains are the highest terrain level.

## Riverbeds and basins

Dried riverbeds are generated through downhill walks.

Basins are local elevation minima.

River elevation drops may visually render as waterfalls on hex sides after terraforming shows water.

---

# 7. Natural / Unplaceable Terrain

Natural tiles are placed during generation and are unplaceable from the start:

- mountain;
- water (riverbeds, basins);
- woods;
- marsh;
- similar natural tile types.

Every other tile is placeable.

Terraforming never adds or removes natural tiles and never changes whether a tile is placeable.

Terraforming changes visuals only, using predetermined tile types and decoration points. For example, depending on its predetermined type and its biome, a placeable tile may show a small thicket, a rock, a lone tree, cacti, or grassland. A dried riverbed shows water after terraforming.

Natural terrain can provide adjacency bonuses to buildings.

Do not create a separate "advantage tile" mechanic.

Woods, water, marsh, etc. already fulfill that role through the existing terrain-bonus system.

---

# 8. Biomes

## Main biomes

There are three directly selectable main biomes:

- Forest
- Desert
- Arctic

## Mixed biomes

There are three mixed biomes:

- Forest + Desert → Steppe
- Forest + Arctic → Taiga
- Desert + Arctic → Polar Desert

Mixed biomes are never directly offered or directly selected.

They only appear where two main biome spreads meet.

---

# 9. Biome Offers

Whenever progression awards another terraformer core, the player receives a biome offer.

The UI presents:

**2 main-biome choices**

The player chooses one.

### First offer

The first offer must always contain two different main biomes.

Example:

- Forest / Desert

Not:

- Forest / Forest

### Later offers

Later offers are allowed to show the same biome twice.

Example:

- Forest / Forest

This is intentional friction.

### Repeated-pair protection

Only same-biome pairs (Forest/Forest, Desert/Desert, Arctic/Arctic) count toward this rule. Pairs of two different biomes may repeat freely.

If the same same-biome pair occurs twice consecutively, the third offer must include a different biome.

Example: after Forest/Forest twice in a row, the third offer is either Forest plus another biome, or two biomes other than Forest.

The repeat system tracks the actual pair from which the player selected (after any reshuffle).

### Reshuffle

The player receives:

**1 biome-offer reshuffle per run.**

### Offer timing and stacked cores

The biome offer is always shown the moment a core is awarded. The player picks a biome before continuing, so offers never stack.

The chosen biome is bound to that core.

Cores can stack. If a threshold is passed while the player still holds an unplaced core, the new core (with its chosen biome) is added to the player's stack.

---

# 10. Terraformer Cores

A terraformer core creates a biome spread.

## Placement

A core may be placed on dead land.

Core placement is constrained by existing cores.

The flat hex-grid distance between core centers must be at least:

**6 hexes**

Height/elevation does not affect this core-distance check.

A **legal core site** is any dead placeable tile at least 6 hexes from every existing core center.

This distance is intended to allow the outer areas of biome spreads to meet and create mixed biomes.

It is not a guarantee that actual generated biome shapes overlap by exactly two tiles.

Do not implement an additional biome-overlap validation system unless it already exists.

---

# 11. Sequential Core Deployment

Only one terraformer spread may occur at a time.

While a core is spreading:

**another core cannot be placed.**

The next core becomes placeable only after the previous core's spread animation has completely finished.

While a spread is active, no building can be placed on any tile in that spread's claim set (including tiles being converted to a mix). The player must wait for the spread to finish. Tiles outside the spread remain buildable.

State order:

1. player receives biome offer;
2. player chooses biome;
3. player places core;
4. spread result is calculated;
5. spread animates;
6. spread completes;
7. another core may then be placed.

This rule exists specifically to avoid concurrent spread race conditions.

---

# 12. Spread Pool

The biome spread uses a finite spread pool.

The formula is:

`3r(r + 1) + 1 + 2r`

with:

`r = 4`

Therefore:

**spread pool = 69 units**

Important:

`r = 4` is only used to derive the pool size.

It is **not a hard spatial radius**.

The resulting biome may be irregular because terrain slope affects spread cost.

Do not clamp spread to a four-hex radius.

---

# 13. Spread Algorithm

Spread is based on lowest path cost, using a Dijkstra-style calculation.

The spread continues claiming eligible tiles until the 69-unit spread pool has been consumed.

Base behavior:

- flat dead hex: cost 1;
- uphill: costs more;
- downhill: costs less;
- all costs remain greater than zero for dead terrain.

Natural tiles:

- water, woods, marsh and similar natural tiles are claimed by the spread at **double** the normal slope cost. They stay unplaceable;
- mountains can be entered **only 1 tile deep**. A spread may claim a mountain tile at the normal slope cost, and that route terminates there. Across a mountain range the spread never goes more than 1 tile in. Mountains do not become part of the biome.

Spread cost depends only on slope/elevation plus the explicitly defined natural-tile and biome-state modifiers.

Biome itself does not otherwise change slope cost.

---

# 14. Spread Must Be Precomputed

When a core activates:

1. snapshot relevant board state;
2. calculate the complete spread;
3. determine all claimed tiles;
4. determine all biome conversions;
5. determine resulting natural terrain;
6. lock that result;
7. animate the already-decided result.

The animation must not influence pathfinding.

Tiles changing visually during the spread cannot alter which later tiles the same spread will reach.

---

# 15. Spread Animation

Biome spread appears as a wave of tiles flipping/converting in claim order.

Maximum total duration:

**5 seconds**

Tiles in the spread's claim set cannot be built on until the whole spread has finished (§11).

Future unresolved tiles must not grant visible terrain information or terrain bonuses before they visibly convert.

---

# 16. Same-Biome Interaction

If a biome spread reaches an existing tile of the same main biome:

- it consumes **0 spread pool**;
- it is not converted;
- spread does **not travel through it**;
- it is terminal for that spread route.

Important implementation note:

Do not implement same-biome tiles as ordinary zero-cost Dijkstra traversal nodes.

They are terminal.

Conceptually:

> touch same biome → consume zero → stop that route.

This prevents same-biome regions from becoming free long-distance spread highways.

---

# 17. Main-Biome Collision and Mixed Biomes

When one main biome reaches another main biome, the affected area may convert into the mixed biome corresponding to that pair.

Examples:

- Forest + Desert → Steppe
- Forest + Arctic → Taiga
- Desert + Arctic → Polar Desert

Conversion cost:

**50% of normal spread cost**

Conversion may penetrate:

**up to 2 hexes deep**

into the opposing main biome, counted from the first foreign tile the spread enters.

After that, the route terminates. The spread does not travel through converted tiles, and never continues from them into dead land or any other tiles beyond.

The spread pool is spent travelling across dead land. Conversion only happens at the boundary with an existing main biome.

The same termination applies when a spread meets a mixed biome (§18) or the same main biome (§16).

Because spread results are precomputed, newly created mixed tiles during the animation do not prematurely block the rest of that same calculated two-layer conversion.

---

# 18. Mixed Biome Interaction

Mixed-biome tiles:

- are impassable to spread;
- cannot be converted;
- are not overwritten by main biomes;
- consume no spread cost because they are not entered.

Main biomes can never overwrite mixed biomes.

Mixing only occurs between two main biomes.

Mix + main does not produce further biome conversion.

---

# 19. Buildings During Biome Conversion

If a tile containing buildings changes biome:

- the tile changes biome;
- buildings remain;
- buildings retain their original building identity;
- the spread wave passes through the tile visually;
- the tile recolors;
- the buildings do not get replaced.

A pre-existing building remains valid even if the resulting biome would normally not allow placing that building.

However:

> if that building is later demolished, it may only be rebuilt if it is legal under the tile's current biome roster.

---

# 20. Building Slots

Every placeable hex contains:

**3 building slots**

All three slots must be occupied for the tile to be considered currently full.

A hex becomes **ever-completed** the first time all three slots are occupied.

That historical state is permanent.

---

# 21. Buildings

Buildings cost typed resources.

Confirmed resource types:

- Wood
- Stone

Additional resources are intentionally undecided.

Each main biome supports up to:

**5 building types**

Exact building rosters are intentionally undecided.

---

# 22. Mixed-Biome Building Rosters

A mixed-biome hex allows:

- 3 buildings from parent biome A;
- 3 buildings from parent biome B;
- 3 unique mixed-biome buildings.

Mixed-biome-specific buildings may have buffs or debuffs.

Exact rosters and effects are intentionally undecided.

---

# 23. Building Yield

A building produces its base yield:

**once, when first placed into that slot.**

Each physical slot has a permanent payout record.

If a building is demolished and another building is placed in the same slot:

**the base slot yield does not pay again.**

This prevents demolition/rebuilding yield farming.

---

# 24. Terrain Bonuses

A building's base yield may receive bonuses based on adjacent natural terrain. Terrain bonuses apply to base slot yield only, never to combo or adjacency payouts.

Examples include adjacency to:

- mountain foot;
- water;
- woods;
- marsh.

Exact terrain bonuses are intentionally undecided.

Terrain bonus calculation uses:

**the currently visible board state at the exact time the building is placed.**

Mountains always count, even though they never become part of a biome.

Other natural terrain counts only once it has visibly converted. If the player builds outside a running spread, natural terrain that the spread has not visibly converted yet does not count.

This means building before a spread finishes may intentionally produce a lower payout than waiting.

No hidden future terrain information is shown to the player.

---

# 25. Zone Buffs and Debuffs

A building's base yield may also be modified by the zone's biome buff/debuff. Zone modifiers apply to base slot yield only, never to combo or adjacency payouts.

Exact modifiers are intentionally undecided.

---

# 26. Demolition

Buildings may be demolished.

Demolition returns:

**50% of the building's cost.**

Refunds round up, per resource type.

Demolition does not reset any historical payout records.

It does not reset:

- slot payout history;
- combo payout history;
- adjacency payout history;
- ever-completed status.

---

# 27. Combo System

Combos are specific recipes of buildings inside a single hex.

Combo sizes:

- 2-building combos;
- 3-building combos.

Building types inside a combo may differ.

---

# 28. Possible Two-Building Pairs

Because every hex contains exactly three slots, there are exactly three possible slot pairs:

- Slot 1 + Slot 2
- Slot 1 + Slot 3
- Slot 2 + Slot 3

Therefore a hex may potentially produce:

**up to 3 separate 2-building combo payouts.**

Each slot pair pays separately, at the combo's normal amount.

Example: Sawmill, Farm, Sawmill in slots 1, 2, 3 contains the Sawmill + Farm pair twice (slots 1+2 and slots 2+3), so that pair bonus pays twice, the same amount each time.

---

# 29. Combo Payout Resolution

Whenever a new building is placed:

1. update the current building configuration;
2. determine every currently matched combo;
3. determine which of those matched combos have not previously paid on this hex;
4. all newly eligible unpaid combos pay;
5. record all payouts permanently;
6. then process inter-hex adjacency payouts;
7. commit the complete transaction;
8. afterwards check progression thresholds;
9. show payout notifications sequentially in the UI.

The sequential UI is presentation only.

Game-state payouts are resolved atomically before progression is checked.

---

# 30. Multiple Simultaneous Combos

A single building placement may trigger several combo payouts.

Example:

A third building may cause:

- Slot 1 + Slot 3 combo;
- Slot 2 + Slot 3 combo;
- Slot 1 + Slot 2 + Slot 3 combo;

to become valid simultaneously.

All newly valid unpaid combos pay.

The UI displays them one after another.

---

# 31. Combo Payout Limits

Payout history is kept per slot pair and per full slot triple, not per recipe.

Each of the three slot pairs on a hex may pay a two-building combo:

**once ever**

Maximum:

**3 two-building payouts per hex**

The full slot triple may pay a three-building combo:

**once ever**

Maximum:

**1 three-building payout per hex**

Once a slot pair or the triple has paid, no combo formed on those slots pays again, even if demolition and rebuilding produce a different recipe there.

Each payout record stores which recipe paid.

Demolition and rebuilding never cause any of these to pay again.

---

# 32. Combo Discovery

Combos begin hidden.

A combo becomes globally discovered when the player creates a valid instance of it.

Discovery is independent from whether that particular hex is allowed another payout.

Therefore:

- a valid combo can become discovered;
- even if its payout on that hex has already been consumed.

The combo UI lists discovered combos and their effects.

Hover previews display combo bonuses only for already-discovered combos.

Undiscovered combos must not be previewed.

---

# 33. Current Combo State vs Historical Paid Combo State

These concepts must remain separate.

### Current combo

The buildings currently present on the hex satisfy a recipe.

### Historically paid combo

That specific combo previously triggered a payout on this hex.

### Discovered combo

The recipe has been globally discovered and may be shown in UI.

Demolition can remove a current combo.

It does not remove:

- discovery;
- historical payout history.

---

# 34. Inter-Hex Bonus

When a hex becomes completed for the first time, it may receive additional payouts based on adjacent hexes.

The board has six possible neighboring hexes.

Therefore there can be:

**up to 6 adjacency payout events associated with a completed hex.**

Each adjacency relationship is an unordered hex pair:

`A ↔ B`

Each unordered pair may pay:

**once ever**

Store this payout at pair level, not directionally.

For example:

`adjacencyPaid(A,B)`

must be identical to:

`adjacencyPaid(B,A)`

---

# 35. Inter-Hex Combo Conditions

An adjacency payout checks the **current building configuration** of the neighboring hex.

A neighboring hex does not need to currently have all three slots filled.

A neighbor's combo counts toward an adjacency payout if the buildings forming it are currently present in the neighboring hex. Payout history does not matter for this check.

A present combo on slots that already paid does not trigger a payout in its own hex (§31), but it still counts for neighbors' adjacency payouts. Players can use this to maximize payouts from neighboring tiles.

Historical combo records alone do not create "ghost" adjacency power if the required buildings have been demolished.

Therefore:

- completed hex → demolish combo building → that combo no longer supports future adjacency bonuses;
- rebuild any valid recipe → it satisfies adjacency conditions again, even if it cannot pay in its own hex;
- rebuilding never causes the old intra-hex or inter-hex payout to repeat.

---

# 36. Completion Trigger

A hex's completion event occurs:

**only the first time it reaches three occupied slots.**

At that moment:

- resolve any newly eligible intra-hex combo payouts;
- resolve eligible inter-hex payouts;
- mark the hex as ever-completed.

If the player later demolishes a building and fills the hex again:

**the hex does not trigger another completion event.**

---

# 37. Maximum Bonus Events

A single hex can theoretically be involved in up to:

- 3 × two-building combo payouts;
- 1 × three-building combo payout;
- 6 × adjacent-pair payouts.

Therefore:

**maximum = 10 bonus payout events**

This is separate from the three base slot yields.

---

# 38. Hover Preview

When hovering a placement:

show projected yield.

The preview may include:

- known base yield;
- current visible terrain modifiers;
- known zone modifiers;
- combo bonuses only if the combo has already been discovered.

Never expose undiscovered combo information.

Never expose terrain that has not visibly completed terraforming.

---

# 39. Progression

Progression is based on:

**lifetime yield earned, tracked separately per resource type**

There is no single combined yield number. All resource totals are shown to the player.

Expected resource count: 3 to 4 types, 5 at most.

Each resource's lifetime total only increases.

Spending resources does not reduce it.

When lifetime yields reach the next threshold:

- grant the next terraformer core (it stacks with any unplaced core, see §9);
- show the biome offer immediately (§9).

**Exception: the final threshold grants no core. Reaching it wins the run (§41).**

Each threshold is a set of mandatory per-resource targets. All targets must be met.

Example: the first threshold might require 100 wheat and 20 wood lifetime (if wheat exists as a resource).

Threshold numeric values are intentionally undecided.

They will be spaced far enough apart that a single payout transaction cannot cross several thresholds at once.

Therefore the implementation does not need special multi-threshold jump behavior for the intended balance.

Still, threshold evaluation occurs only after the complete placement payout transaction has resolved.

---

# 40. Core Loop

The intended gameplay loop is:

1. receive biome offer;
2. choose main biome;
3. place terraformer core;
4. calculate complete spread;
5. animate spread;
6. construct buildings on available tiles;
7. earn base yields;
8. discover combos;
9. receive combo / adjacency payouts;
10. lifetime yield increases;
11. reach progression threshold;
12. receive next core + biome offer;
13. repeat.

The player may continue constructing on tiles outside an active spread. Tiles inside it are locked until it finishes.

Another core cannot be placed until the current spread finishes.

---

# 41. Win Condition

*(Changed 2026-09-30 by the designer. The previous rule was "no legal core site remains, no spread active, every slot on every terraformed placeable hex occupied".)*

The player **wins the moment the final progression threshold is reached**: every per-resource lifetime target of the last threshold is met. It is evaluated after the complete placement payout transaction (§29, §39), like any threshold.

- An active spread, held cores, pending offers, empty slots and remaining legal core sites do **not** block the win.
- Payout rules are unchanged: every slot, slot pair, slot triple and adjacent pair still pays at most once (§23, §31, §34). Board space is therefore finite, and the challenge is to reach the final threshold before running out of room.

The end screen shows:

- win or loss, and the number of thresholds reached;
- lifetime total for each resource;
- board used: occupied slots out of all slots on terraformed placeable hexes;
- time taken;
- seed.

Time taken is only a statistic.

There is no gameplay countdown timer.

---

# 42. Loss / Soft-Lock

A run may end through:

- automatic soft-lock detection (a **loss**);
- manual End Run button.

The typical loss under the §41 rule is **running out of room**: every slot on every terraformed placeable hex is occupied (or no empty slot can be afforded even with refunds), no legal core site can be used (none left, or no core held and none coming), no spread is active, no offer is pending, and the final threshold isn't met. Because slots and slot pairs never pay twice, no action can earn more yield. The existing conservative detector (§43, §44) covers this: it must still never declare a loss while a yield-producing action exists.

Starting stock guarantees that the cheapest building belonging to each main biome is affordable.

---

# 43. Soft-Lock Philosophy

Automatic soft-lock detection must be **conservative**.

Do not incorrectly end a run that might still have a valid progression sequence.

The system may consider:

- current resources;
- demolition refunds;
- empty slots;
- legal replacement opportunities;
- unpaid slot yields;
- unpaid combo opportunities;
- valid building placements;
- unused/unplaced terraformer cores;
- pending biome offers;
- active spread state;
- other already-defined payout opportunities.

However, do not implement an expensive exhaustive solver over every possible demolition/rebuild sequence for the jam build.

If the algorithm cannot safely prove the run is dead:

**do not automatically declare a loss.**

The manual End Run button exists as a fallback for ambiguous soft-locks.

A false-negative soft-lock is preferable to falsely killing a valid run.

---

# 44. Do Not Auto-Lose While Progression Actions Exist

Automatic loss must never trigger while any of these exist:

- an unplaced core while at least one legal core site exists;
- unresolved biome offer;
- currently active biome spread;
- known legal resource-producing action.

The detector must account for demolition/replacement possibilities sufficiently to avoid obvious false positives.

---

# 45. Starting Resources

Starting resources must guarantee that the player can afford the cheapest building for each main biome.

Exact starting quantities are intentionally undecided.

---

# 46. Onboarding

A short narrated story tutorial is delivered by an AI assistant character.

Assistant presentation:

- static screen-style face;
- eyes;
- mouth;
- tutorial text;
- pre-generated ElevenLabs voice lines.

Do not require runtime AI or runtime text-to-speech.

---

# 47. AI Usage

AI may be used for:

- generated graphics;
- generated models;
- AI-assisted coding;
- pre-generated ElevenLabs voice dialogue.

No runtime generative AI system is required.

---

# 53. Intentionally Undecided

Do not invent final answers for these.

They require separate design/balance decisions:

- resource types beyond Wood and Stone;
- full building rosters;
- exact combo recipes;
- exact terrain bonus set;
- numerical building costs;
- numerical yields;
- biome buffs/debuffs;
- threshold values;
- exact starting resource quantities;
- generated-map validation rules;
- exact terrain-generation probabilities;
- adjacency payout conditions and amounts.

Use placeholders/configuration where necessary.

Do not hard-code speculative design values into systems architecture.
