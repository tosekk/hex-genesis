# Economy Spec v2 — designer-approved starting values + tuning guardrails

**History:** v1 (2026-09-30 early) → **v2** (2026-09-30 04:40). v1 playtest and pacing: players could win progression by spamming the highest-yield building, combos barely mattered, and all cores arrived at about 32% board fill.
**v2 goals:** (1) combining different buildings must clearly beat spamming one building; (2) progression (cores) continues until about half the board is filled; (3) the fill-every-slot win (§41) stays reachable.
**Implementer:** `astra`, in `src/config/economy.ts`. Label data `// PLACEHOLDER v2 (ECONOMY_SPEC.md) — designer-approved, tunable within guardrails`.
**Map size stays 20×14 for now.** The designer will revisit world size after playtesting v2.

## Tuning guardrails (astra may tune within these without asking)

| Item | Allowed |
|---|---|
| Building ids, names, **costs**, rosters, combo **recipes** | **frozen** |
| Building base yields | ±1 per resource from the v2 table below |
| Pair combo amounts | 4–7 resources total per pair |
| Triple combo amounts | 11–15 total per triple |
| `adjacencyAmount` | 1–3 of each resource |
| Terrain bonuses, zone modifiers, starting stock | **frozen** |
| Thresholds | free, but **exactly 6 entries**, non-decreasing per resource, water first required at T3, food first required at T4 |

Every change is logged (old → new, why, and the measurement behind it) in `tasks/status/astra.md` → "Balance log".

## Balance targets (measured with astra's balance harness; medians over seeds 1–20 on real generated maps)

1. **Pacing:** the combo-seeking bot reaches T1–T6 at about **7 / 22 / 45 / 90 / 160 / 270** cumulative placements (±20% each).
2. **Combos matter:** for T4–T6, the spam bot (always the highest-base-yield affordable building) needs **≥ 1.5×** as many placements as the combo bot.
3. **Spam can't coast:** the spam bot never reaches T6 before **70%** of the placeable terraformed slots are filled.
4. **Reachable and winnable:** the combo bot reaches T6 in ≥ 18/20 seeds and wins (§41) in ≥ 18/20 seeds. Zero soft-lock declarations (`isProvablySoftLocked`) in any bot run.

If the targets conflict, priority is 4 > 2 > 1 > 3.

## Resources and starting stock (unchanged)

`resources: ['wood', 'stone', 'water', 'food']`, `startingResources: { wood: 6, stone: 6 }`

## Buildings (cost → base yield; changes vs v1 in **bold**)

### Forest (wood + food)
| id | name | cost | baseYield |
|---|---|---|---|
| `lumber_camp` | Lumber Camp | wood 2 | wood 4 |
| `hillside_mine` | Hillside Mine | wood 2 | stone 3 |
| `sawmill` | Sawmill | wood 2, stone 2 | **wood 5** |
| `gatherers_hut` | Gatherer's Hut | wood 2 | food 2, wood 1 |
| `farm` | Farm | wood 3, stone 1 | food 4 |

### Desert (stone + water)
| id | name | cost | baseYield |
|---|---|---|---|
| `quarry` | Quarry | stone 2 | stone 4 |
| `palm_grove` | Palm Grove | stone 2 | wood 3 |
| `stonemason` | Stonemason | wood 2, stone 2 | **stone 5** |
| `oasis_well` | Oasis Well | stone 3 | water 3, stone 1 |
| `glass_kiln` | Glass Kiln | stone 4, water 2 | **stone 3, water 3** |

### Arctic (water + a little food)
| id | name | cost | baseYield |
|---|---|---|---|
| `driftwood_camp` | Driftwood Camp | stone 2 | wood 3 |
| `scree_quarry` | Scree Quarry | wood 2 | stone 3 |
| `ice_drill` | Ice Drill | wood 1, stone 1 | **water 3** |
| `glacier_pump` | Glacier Pump | wood 2, stone 2 | **water 5** |
| `ice_fishery` | Ice Fishery | wood 2, stone 1 | food 2, water 1 |

### Mixed-biome unique buildings
| id | biome | name | cost | baseYield |
|---|---|---|---|---|
| `grain_fields` | steppe | Grain Fields | wood 2, stone 1 | **food 4** |
| `windmill` | steppe | Windmill | wood 3, stone 1 | food 3, stone 2 |
| `caravanserai` | steppe | Caravanserai | wood 2, stone 2, food 1 | wood 3, stone 3 |
| `trapper_lodge` | taiga | Trapper Lodge | wood 2 | food 3, wood 1 |
| `resin_works` | taiga | Resin Works | stone 2, water 1 | **wood 5** |
| `hot_spring` | taiga | Hot Spring | stone 3 | water 3, food 2 |
| `lichen_farm` | polarDesert | Lichen Farm | stone 2, water 1 | **food 4** |
| `salt_mine` | polarDesert | Salt Mine | wood 3 | stone 4, food 1 |
| `frost_kiln` | polarDesert | Frost Kiln | wood 2, stone 2 | **stone 2, water 3** |

## Rosters (unchanged)

| biome | roster |
|---|---|
| forest | lumber_camp, hillside_mine, sawmill, gatherers_hut, farm |
| desert | quarry, palm_grove, stonemason, oasis_well, glass_kiln |
| arctic | driftwood_camp, scree_quarry, ice_drill, glacier_pump, ice_fishery |
| steppe | lumber_camp, sawmill, farm, quarry, stonemason, oasis_well, grain_fields, windmill, caravanserai |
| taiga | lumber_camp, sawmill, gatherers_hut, ice_drill, glacier_pump, scree_quarry, trapper_lodge, resin_works, hot_spring |
| polarDesert | quarry, stonemason, oasis_well, ice_drill, glacier_pump, driftwood_camp, lichen_farm, salt_mine, frost_kiln |

## Combos (global recipes)

v2: pairs pay 5–6, triples 12–14. **No same-building pairs** (they rewarded spam). The three v1 duplicate pairs are replaced by the ones marked NEW.

| id | name | buildings | amount |
|---|---|---|---|
| `timber_line` | Timber Line | lumber_camp, sawmill | wood 5 |
| `homestead` | Homestead | sawmill, farm | wood 3, food 3 |
| `forest_camp` **NEW** | Forest Camp | lumber_camp, gatherers_hut | wood 3, food 3 |
| `woodland_village` | Woodland Village | lumber_camp, sawmill, farm | wood 7, food 6 |
| `cut_stone` | Cut Stone | quarry, stonemason | stone 5 |
| `oasis_town` | Oasis Town | oasis_well, palm_grove | water 3, wood 3 |
| `desert_outpost` **NEW** | Desert Outpost | quarry, palm_grove | stone 3, wood 2 |
| `sun_citadel` | Sun Citadel | quarry, stonemason, glass_kiln | stone 8, water 5 |
| `ice_mine` **NEW** | Ice Mine | ice_drill, scree_quarry | water 3, stone 3 |
| `harbor` | Harbor | ice_fishery, ice_drill | food 3, water 3 |
| `frontier_outpost` | Frontier Outpost | driftwood_camp, scree_quarry | wood 3, stone 3 |
| `polar_base` | Polar Base | ice_drill, glacier_pump, ice_fishery | water 8, food 4 |
| `bread_road` | Bread Road | grain_fields, windmill | food 6 |
| `frontier_farm` | Frontier Farm | farm, grain_fields | food 4, wood 2 |
| `market_town` | Market Town | caravanserai, sawmill, quarry | wood 5, stone 5, food 4 |
| `fur_trade` | Fur Trade | trapper_lodge, gatherers_hut | food 6 |
| `resin_mill` | Resin Mill | resin_works, sawmill | wood 6 |
| `spa_village` | Spa Village | hot_spring, ice_drill, gatherers_hut | water 6, food 7 |
| `salt_cure` | Salt Cure | salt_mine, lichen_farm | food 4, stone 2 |
| `frost_glass` | Frost Glass | frost_kiln, oasis_well | water 4, stone 2 |
| `lichen_terraces` | Lichen Terraces | lichen_farm, oasis_well, frost_kiln | food 7, water 6 |

Removed from v1: `foragers_circle`, `twin_quarries`, `meltwater`.
§28 still holds: `sawmill, farm, sawmill` pays `homestead` twice.
Reference math: a Forest hex with lumber + sawmill + farm = base 13 + pairs 11 + triple 13 = **37**; three sawmills = **15**.

## Terrain bonuses (unchanged)

| adjacentTerrain | buildings | bonus |
|---|---|---|
| mountain | hillside_mine, quarry, scree_quarry, salt_mine | stone 2 |
| riverbed, basin | oasis_well, ice_drill, glacier_pump, hot_spring | water 2 |
| riverbed, basin | farm, grain_fields, lichen_farm, ice_fishery | food 1 |
| woods | lumber_camp, sawmill, driftwood_camp, resin_works | wood 1 |
| marsh | any | food 1 |

## Zone modifiers (unchanged)

steppe: grain_fields food +1, sawmill wood −1 · taiga: lumber_camp wood +1, ice_drill water −1 · polarDesert: salt_mine stone +1, oasis_well water −1

## Other

- `adjacencyAmount: { wood: 2, stone: 2, water: 2, food: 2 }` (**was 1**)
- `demolishRefundRatio: 0.5`, `reshufflesPerRun: 1`

## Thresholds v2 — starting guess; astra calibrates against the targets above

| # | wood | stone | water | food |
|---|---|---|---|---|
| 1 | 15 | 15 | – | – |
| 2 | 60 | 50 | – | – |
| 3 | 130 | 110 | 45 | – |
| 4 | 300 | 250 | 140 | 110 |
| 5 | 560 | 470 | 260 | 210 |
| 6 | 950 | 800 | 450 | 370 |
