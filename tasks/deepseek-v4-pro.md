# Tasks — `deepseek` (DeepSeek V4 Pro 0813 · OpenCode) — World: Map Generation, Offers, Endgame

You own the **deterministic world**: the seeded map generator, the biome offer stream, and the win and soft-lock detectors.

**You own:** `src/sim/world/**`, `src/config/map.ts`, `src/sim/offers.ts`, `src/sim/offers.test.ts`, `src/sim/endgame.ts`, `src/sim/endgame.test.ts`, `tasks/status/deepseek.md`.
**Read-only for you:** everything else.
**Wait for** the `[opus] M0` commit before creating any files. Until then, read GAME_DESIGN §4–§9, §41–§45, §53 and AGENT_TASKS §51, §57 (Terrain generation, Win/end), and plan.

Task order: **D1 → D2 → D3 → D4**.

**Determinism is the whole job here.** Use only `src/core/rng.ts`. Integer arithmetic wherever it affects output. **No** `Math.random`, `Date`, `Math.sin/cos/exp/pow/log/sqrt` in anything that decides terrain or offers (engine-dependent rounding). Iterate arrays by ascending `HexId`. Never rely on object key order or `Set` iteration for decisions.

---

## D1 — Map generation (P0) — `src/sim/world/**`, `src/config/map.ts`

**Spec:** GAME_DESIGN §4–§7. **Implements:** `generateMap(seed, map): Hex[]` (CONTRACTS §4).

Output: `cols × rows` hexes, `hexes[i].id === i`, `biome: null`, 3 empty slots (`yieldPaid:false`), `everCompleted:false`, `pairPaid:[null,null,null]`, `triplePaid:null`, `decoration: rng.nextU32()`.

**Required structure** (the rules are fixed by the spec; the probabilities are PLACEHOLDER knobs in `MAP.params`):
1. **Elevation** in `0..levels-1` from integer value noise (e.g. coarse random lattice + integer bilinear blend, or a few passes of neighbor-averaging with integer division). Keep it smooth enough for readable terrain.
2. **Mountains** = the top level (`levels-1`) only, in small clusters/ranges. They exist from the start (§6).
3. **Hills** (`terrain: 'hill'`, placeable). Build them **outward from mountains** so the §6 rules hold by construction:
   - a hill has a mountain within **1–3** tiles (hex distance);
   - a hill's elevation = (an adjacent lower tile's elevation + 1) **or** equals an adjacent hill's elevation;
   - no chain of more than 3 consecutive hills leads away from a mountain. Read "3 consecutive hills → the 4th tile is a mountain" as: every hill has hill-path distance ≤ 3 to a mountain. Log your reading under Decisions.
   - Non-hill, non-mountain land must sit **below** any adjacent hill it approaches from. Adjust elevations after placing hills, then re-verify.
4. **Riverbeds** (natural, unplaceable): deterministic **downhill walks**. Start at high non-mountain tiles, step to the lowest neighbor (tie → lowest HexId), and stop at a local minimum or the board edge.
5. **Basins** (natural, unplaceable): local elevation minima (no strictly lower neighbor). You may mark all of them or a PLACEHOLDER fraction, chosen via rng.
6. **Woods / marsh** (natural, unplaceable): PLACEHOLDER probabilities. Marsh favors low tiles next to water; woods favor mid elevations. Don't place them on hills or mountains.
7. `placeable = terrain ∈ PLACEABLE_TERRAIN` (plain/hill). This never changes (§7).
8. **Don't add map validation / reject-and-regenerate rules.** Those are undecided (§53). Tune the placeholder params so maps are mostly placeable (roughly 65–80% placeable, several spread-sized open areas). Log the resulting stats in your status file for seeds 1–10.

**Required tests** (`src/sim/world/mapgen.test.ts`, seeds 1–200)
- Same seed → deep-equal output. Different seeds → different output.
- 280 hexes, `id === index`, elevation in range, mountains only at the top level, `biome === null` everywhere.
- §57 Terrain generation 1–4: every hill has a mountain within 1–3; no over-long hill chain; hill elevation rule; natural tiles unplaceable, plain/hill placeable.
- Riverbed walks are monotonically non-increasing in elevation.
- Performance: < 20 ms per map.

**Visual metadata:** the renderer needs river/waterfall info (P2). Riverbed direction can be derived by the renderer from elevations, so don't add fields. If you think a field is essential, request it via Contract requests.

## D2 — Biome offers (P0 core; P2 repeat protection and reshuffle, but build them now since they're small) — `src/sim/offers.ts`

**Spec:** GAME_DESIGN §9. Use `state.offerRng` only (a separate stream from terrain, §5): `rngFromState` → draw → write `getState()` back.
- `awardCore`: requires `pendingOffer === null`. Roll 2 main biomes.
  - **First offer** (`offerHistory.length === 0` and no core placed yet): two **different** biomes.
  - **Later:** independent picks, so duplicates like Forest/Forest are allowed (intentional friction).
  - **Repeated-pair protection:** only same-biome pairs count. If the last **two** entries of `offerHistory` are the same same-biome pair (e.g. Forest/Forest twice), the new offer must include a different biome: re-roll deterministically, or construct it (keep one option, force the other to differ). Different-biome pairs repeat freely.
- `reshuffleOffer`: allowed once per run (`reshufflesUsed < reshufflesPerRun`) while an offer is pending. Re-roll under the same rules (first-offer rule and protection still apply), set `reshuffled: true`, increment `reshufflesUsed`.
- `resolveOffer(i)`: push `options[i]` onto `coreStack`, push the **final** pair (after any reshuffle) onto `offerHistory`, clear `pendingOffer`.

**Required tests:** same seed + same choices → the same offer sequence. The first offer is never a duplicate (seeds 1–500). After Forest/Forest twice, the third offer is never Forest/Forest (seeds 1–500). A second reshuffle is rejected. History records the post-reshuffle pair. `awardCore` with a pending offer throws or errors. Offers don't consume the terrain stream: generating the map first or not gives the same offers.

## D3 — Win and conservative soft-lock (P0 win; P1 soft-lock) — `src/sim/endgame.ts`

**Spec:** GAME_DESIGN §41–§44; AGENT_TASKS §57 Win/end.
- `checkWin`: `legalCoreSites(state).length === 0` **and** `activeSpread === null` **and** every slot on every hex with `placeable && biome !== null` is occupied. Ignore held cores (§41) and leftover dead land.
- `isProvablySoftLocked` must return **false** if any of these hold (§44):
  - `activeSpread` or `pendingOffer` exists;
  - `coreStack.length > 0` and a legal core site exists;
  - the next threshold is already met (the session will award);
  - a **known legal resource-producing action** exists: for any unlocked terraformed placeable hex, slot, and building in `rosterFor`, where the slot is empty, or filled but demolishable (refund counted), that is affordable with `resources` + `demolishRefund` of that slot's current building (if any), and `previewPlacement` (or equivalent) shows a non-zero payout (base yield unpaid, a pair/triple would newly pay, or first completion with unpaid adjacency).
  - If none of these hold and the run isn't won → return true. **Don't** write an exhaustive multi-step demolition solver (§43). When in doubt, return false.
- Keep it fast (< 10 ms on a full board). Iterate cheaply: hexes, then slots, then roster.

**Required tests:** §57 Win/end 1–3; not soft-locked while a spread is active, an offer is pending, or a core is held with a legal site; soft-locked when everything is full, nothing is affordable, and no core/site is left; **not** soft-locked when demolishing one building would fund an unpaid-slot placement.

## D4 — Generator tuning (P2, after M2 playtest)
Adjust only `MAP.params` from playtest feedback relayed by the human or noted in `tasks/status/opus.md`. Structural rule changes need a Decision entry.
