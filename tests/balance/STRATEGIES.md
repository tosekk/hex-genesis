# Night 2 — strategy concentration

Frozen v5 round6 (`b76c051`), unchanged combo policy. All wins and non-wins are included. Pair/triple payout observations use actual paid events; adjacency is separate and is not attributed to a named recipe. Both event frequency and paid resource units are ranked to make “most-paid” explicit. Building names/zero-use entries come from the full frozen config.

## Seeds 1–100

100 combo runs; 43,882 placements. Aggregate shares weight each placement equally. Per-run shares expose concentration hidden by different run lengths.

| Building | Placements | Aggregate share | Median / max run share | Runs above 25% |
|---|---:|---:|---|---:|
| Lumber Camp (lumber_camp) | 7408 | 16.88% | 16.83% / 27.72% | 3/100 |
| Sawmill (sawmill) | 5067 | 11.55% | 11.84% / 19.55% | 0/100 |
| Farm (farm) | 4011 | 9.14% | 9.43% / 15.51% | 0/100 |
| Scree Quarry (scree_quarry) | 3215 | 7.33% | 6.80% / 19.52% | 0/100 |
| Quarry (quarry) | 3069 | 6.99% | 6.36% / 24.32% | 0/100 |
| Driftwood Camp (driftwood_camp) | 2515 | 5.73% | 4.86% / 26.60% | 1/100 |
| Salt Mine (salt_mine) | 2210 | 5.04% | 4.60% / 13.39% | 0/100 |
| Glass Kiln (glass_kiln) | 1978 | 4.51% | 3.97% / 12.64% | 0/100 |
| Ice Drill (ice_drill) | 1957 | 4.46% | 4.47% / 55.56% | 1/100 |
| Stonemason (stonemason) | 1822 | 4.15% | 3.47% / 17.79% | 0/100 |
| Gatherer's Hut (gatherers_hut) | 1795 | 4.09% | 2.61% / 15.94% | 0/100 |
| Oasis Well (oasis_well) | 1453 | 3.31% | 2.77% / 10.00% | 0/100 |
| Lichen Farm (lichen_farm) | 1305 | 2.97% | 2.98% / 8.33% | 0/100 |
| Caravanserai (caravanserai) | 1292 | 2.94% | 2.48% / 12.38% | 0/100 |
| Hillside Mine (hillside_mine) | 1036 | 2.36% | 2.11% / 76.00% | 1/100 |
| Palm Grove (palm_grove) | 923 | 2.10% | 2.08% / 4.70% | 0/100 |
| Grain Fields (grain_fields) | 849 | 1.93% | 1.62% / 6.06% | 0/100 |
| Hot Spring (hot_spring) | 600 | 1.37% | 0.84% / 8.86% | 0/100 |
| Ice Fishery (ice_fishery) | 431 | 0.98% | 0.81% / 27.78% | 1/100 |
| Glacier Pump (glacier_pump) | 370 | 0.84% | 0.65% / 2.99% | 0/100 |
| Trapper Lodge (trapper_lodge) | 310 | 0.71% | 0.34% / 2.60% | 0/100 |
| Windmill (windmill) | 234 | 0.53% | 0.34% / 3.13% | 0/100 |
| Resin Works (resin_works) | 31 | 0.07% | 0.00% / 0.87% | 0/100 |
| Frost Kiln (frost_kiln) | 1 | 0.00% | 0.00% / 0.26% | 0/100 |

### Five most-paid combos by payout-event count

| Combo | Paid events | Resource units | Wood / stone / water / food |
|---|---:|---:|---|
| Timber Line (timber_line) | 5676 | 28380 | 28380 / 0 / 0 / 0 |
| Homestead (homestead) | 3589 | 21534 | 10767 / 0 / 0 / 10767 |
| Woodland Village (woodland_village) | 3460 | 44980 | 24220 / 0 / 0 / 20760 |
| Frontier Outpost (frontier_outpost) | 3047 | 18282 | 9141 / 9141 / 0 / 0 |
| Salt Cure (salt_cure) | 2233 | 13398 | 0 / 4466 / 0 / 8932 |

### Five most-paid combos by total resource units

| Combo | Paid events | Resource units | Wood / stone / water / food |
|---|---:|---:|---|
| Woodland Village (woodland_village) | 3460 | 44980 | 24220 / 0 / 0 / 20760 |
| Timber Line (timber_line) | 5676 | 28380 | 28380 / 0 / 0 / 0 |
| Homestead (homestead) | 3589 | 21534 | 10767 / 0 / 0 / 10767 |
| Frontier Outpost (frontier_outpost) | 3047 | 18282 | 9141 / 9141 / 0 / 0 |
| Sun Citadel (sun_citadel) | 1388 | 18044 | 0 / 11104 / 6940 / 0 |

### Starting biome

First main-biome offer chosen by the unchanged bot, before its first core. Mixed biomes cannot be the starting biome. Rates are descriptive, not causal: seed terrain and offer/core policy also vary. No seed is excluded for losing.

| Starting biome | Wins / runs | Win rate | Median winning use | Non-winning seeds |
|---|---:|---:|---:|---|
| forest | 34/36 | 94.44% | 75.09% | 61, 93 |
| desert | 35/35 | 100.00% | 74.02% | none |
| arctic | 29/29 | 100.00% | 75.25% | none |

**Designer question (no tuning):** No building exceeds 25% of aggregate placements; inspect the per-run concentration and payout rankings for subtler preferences.

## Seeds 101–200

100 combo runs; 43,059 placements. Aggregate shares weight each placement equally. Per-run shares expose concentration hidden by different run lengths.

| Building | Placements | Aggregate share | Median / max run share | Runs above 25% |
|---|---:|---:|---|---:|
| Lumber Camp (lumber_camp) | 7197 | 16.71% | 17.04% / 26.11% | 5/100 |
| Sawmill (sawmill) | 4861 | 11.29% | 11.82% / 25.00% | 0/100 |
| Farm (farm) | 3880 | 9.01% | 9.10% / 25.00% | 0/100 |
| Quarry (quarry) | 3126 | 7.26% | 6.57% / 21.10% | 0/100 |
| Scree Quarry (scree_quarry) | 2916 | 6.77% | 6.06% / 18.96% | 0/100 |
| Driftwood Camp (driftwood_camp) | 2407 | 5.59% | 4.39% / 24.35% | 0/100 |
| Salt Mine (salt_mine) | 2382 | 5.53% | 4.42% / 19.30% | 0/100 |
| Gatherer's Hut (gatherers_hut) | 1950 | 4.53% | 3.83% / 74.47% | 1/100 |
| Glass Kiln (glass_kiln) | 1916 | 4.45% | 3.66% / 14.37% | 0/100 |
| Stonemason (stonemason) | 1758 | 4.08% | 3.10% / 17.76% | 0/100 |
| Ice Drill (ice_drill) | 1661 | 3.86% | 3.77% / 30.77% | 1/100 |
| Oasis Well (oasis_well) | 1471 | 3.42% | 2.71% / 11.19% | 0/100 |
| Lichen Farm (lichen_farm) | 1451 | 3.37% | 2.95% / 10.34% | 0/100 |
| Caravanserai (caravanserai) | 1302 | 3.02% | 2.56% / 9.17% | 0/100 |
| Hillside Mine (hillside_mine) | 1010 | 2.35% | 2.20% / 54.55% | 2/100 |
| Grain Fields (grain_fields) | 959 | 2.23% | 1.80% / 8.07% | 0/100 |
| Palm Grove (palm_grove) | 923 | 2.14% | 1.84% / 6.47% | 0/100 |
| Hot Spring (hot_spring) | 529 | 1.23% | 0.75% / 7.14% | 0/100 |
| Ice Fishery (ice_fishery) | 397 | 0.92% | 0.69% / 23.08% | 0/100 |
| Glacier Pump (glacier_pump) | 342 | 0.79% | 0.55% / 19.23% | 0/100 |
| Trapper Lodge (trapper_lodge) | 302 | 0.70% | 0.37% / 3.05% | 0/100 |
| Windmill (windmill) | 279 | 0.65% | 0.23% / 4.50% | 0/100 |
| Resin Works (resin_works) | 40 | 0.09% | 0.00% / 2.87% | 0/100 |
| Frost Kiln (frost_kiln) | 0 | 0.00% | 0.00% / 0.00% | 0/100 |

### Five most-paid combos by payout-event count

| Combo | Paid events | Resource units | Wood / stone / water / food |
|---|---:|---:|---|
| Timber Line (timber_line) | 5295 | 26475 | 26475 / 0 / 0 / 0 |
| Homestead (homestead) | 3514 | 21084 | 10542 / 0 / 0 / 10542 |
| Woodland Village (woodland_village) | 3344 | 43472 | 23408 / 0 / 0 / 20064 |
| Frontier Outpost (frontier_outpost) | 2932 | 17592 | 8796 / 8796 / 0 / 0 |
| Salt Cure (salt_cure) | 2441 | 14646 | 0 / 4882 / 0 / 9764 |

### Five most-paid combos by total resource units

| Combo | Paid events | Resource units | Wood / stone / water / food |
|---|---:|---:|---|
| Woodland Village (woodland_village) | 3344 | 43472 | 23408 / 0 / 0 / 20064 |
| Timber Line (timber_line) | 5295 | 26475 | 26475 / 0 / 0 / 0 |
| Homestead (homestead) | 3514 | 21084 | 10542 / 0 / 0 / 10542 |
| Frontier Outpost (frontier_outpost) | 2932 | 17592 | 8796 / 8796 / 0 / 0 |
| Sun Citadel (sun_citadel) | 1262 | 16406 | 0 / 10096 / 6310 / 0 |

### Starting biome

First main-biome offer chosen by the unchanged bot, before its first core. Mixed biomes cannot be the starting biome. Rates are descriptive, not causal: seed terrain and offer/core policy also vary. No seed is excluded for losing.

| Starting biome | Wins / runs | Win rate | Median winning use | Non-winning seeds |
|---|---:|---:|---:|---|
| forest | 29/33 | 87.88% | 75.33% | 105, 147, 179, 194 |
| desert | 35/35 | 100.00% | 70.89% | none |
| arctic | 32/32 | 100.00% | 75.62% | none |

**Designer question (no tuning):** No building exceeds 25% of aggregate placements; inspect the per-run concentration and payout rankings for subtler preferences.

## Seeds 1–200

200 combo runs; 86,941 placements. Aggregate shares weight each placement equally. Per-run shares expose concentration hidden by different run lengths.

| Building | Placements | Aggregate share | Median / max run share | Runs above 25% |
|---|---:|---:|---|---:|
| Lumber Camp (lumber_camp) | 14605 | 16.80% | 17.03% / 27.72% | 8/200 |
| Sawmill (sawmill) | 9928 | 11.42% | 11.83% / 25.00% | 0/200 |
| Farm (farm) | 7891 | 9.08% | 9.16% / 25.00% | 0/200 |
| Quarry (quarry) | 6195 | 7.13% | 6.41% / 24.32% | 0/200 |
| Scree Quarry (scree_quarry) | 6131 | 7.05% | 6.53% / 19.52% | 0/200 |
| Driftwood Camp (driftwood_camp) | 4922 | 5.66% | 4.57% / 26.60% | 1/200 |
| Salt Mine (salt_mine) | 4592 | 5.28% | 4.48% / 19.30% | 0/200 |
| Glass Kiln (glass_kiln) | 3894 | 4.48% | 3.75% / 14.37% | 0/200 |
| Gatherer's Hut (gatherers_hut) | 3745 | 4.31% | 3.20% / 74.47% | 1/200 |
| Ice Drill (ice_drill) | 3618 | 4.16% | 3.95% / 55.56% | 2/200 |
| Stonemason (stonemason) | 3580 | 4.12% | 3.34% / 17.79% | 0/200 |
| Oasis Well (oasis_well) | 2924 | 3.36% | 2.74% / 11.19% | 0/200 |
| Lichen Farm (lichen_farm) | 2756 | 3.17% | 2.97% / 10.34% | 0/200 |
| Caravanserai (caravanserai) | 2594 | 2.98% | 2.50% / 12.38% | 0/200 |
| Hillside Mine (hillside_mine) | 2046 | 2.35% | 2.12% / 76.00% | 3/200 |
| Palm Grove (palm_grove) | 1846 | 2.12% | 1.90% / 6.47% | 0/200 |
| Grain Fields (grain_fields) | 1808 | 2.08% | 1.68% / 8.07% | 0/200 |
| Hot Spring (hot_spring) | 1129 | 1.30% | 0.79% / 8.86% | 0/200 |
| Ice Fishery (ice_fishery) | 828 | 0.95% | 0.74% / 27.78% | 1/200 |
| Glacier Pump (glacier_pump) | 712 | 0.82% | 0.64% / 19.23% | 0/200 |
| Trapper Lodge (trapper_lodge) | 612 | 0.70% | 0.37% / 3.05% | 0/200 |
| Windmill (windmill) | 513 | 0.59% | 0.23% / 4.50% | 0/200 |
| Resin Works (resin_works) | 71 | 0.08% | 0.00% / 2.87% | 0/200 |
| Frost Kiln (frost_kiln) | 1 | 0.00% | 0.00% / 0.26% | 0/200 |

### Five most-paid combos by payout-event count

| Combo | Paid events | Resource units | Wood / stone / water / food |
|---|---:|---:|---|
| Timber Line (timber_line) | 10971 | 54855 | 54855 / 0 / 0 / 0 |
| Homestead (homestead) | 7103 | 42618 | 21309 / 0 / 0 / 21309 |
| Woodland Village (woodland_village) | 6804 | 88452 | 47628 / 0 / 0 / 40824 |
| Frontier Outpost (frontier_outpost) | 5979 | 35874 | 17937 / 17937 / 0 / 0 |
| Salt Cure (salt_cure) | 4674 | 28044 | 0 / 9348 / 0 / 18696 |

### Five most-paid combos by total resource units

| Combo | Paid events | Resource units | Wood / stone / water / food |
|---|---:|---:|---|
| Woodland Village (woodland_village) | 6804 | 88452 | 47628 / 0 / 0 / 40824 |
| Timber Line (timber_line) | 10971 | 54855 | 54855 / 0 / 0 / 0 |
| Homestead (homestead) | 7103 | 42618 | 21309 / 0 / 0 / 21309 |
| Frontier Outpost (frontier_outpost) | 5979 | 35874 | 17937 / 17937 / 0 / 0 |
| Sun Citadel (sun_citadel) | 2650 | 34450 | 0 / 21200 / 13250 / 0 |

### Starting biome

First main-biome offer chosen by the unchanged bot, before its first core. Mixed biomes cannot be the starting biome. Rates are descriptive, not causal: seed terrain and offer/core policy also vary. No seed is excluded for losing.

| Starting biome | Wins / runs | Win rate | Median winning use | Non-winning seeds |
|---|---:|---:|---:|---|
| forest | 63/69 | 91.30% | 75.17% | 61, 93, 105, 147, 179, 194 |
| desert | 70/70 | 100.00% | 73.30% | none |
| arctic | 61/61 | 100.00% | 75.50% | none |

**Designer question (no tuning):** No building exceeds 25% of aggregate placements; inspect the per-run concentration and payout rankings for subtler preferences.

