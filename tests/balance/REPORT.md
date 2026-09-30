# Economy balance report

## Selected v4 result — round 4

Selected **`39e6ea9`**, restored after the five-round cap. All measurements follow Sonnet S8 (`c63b56d`); source and every selected run are archived in [v4-round-4.json](v4-round-4.json). All five round sections and older v2/v3 results below remain audit history.

| V4 target (priority 1 > 2 > 4 > 3 > 6 > 5) | Selected result, seeds 1–50 |
|---|---|
| 1. Combo wins ≥45; zero false declarations | **PASS — 50 wins, zero detected false declarations** |
| 2. Spam loses ≥45 before final goal | **PASS — 46 board-full bot losses**, 2 wins, 2 unproven stalls |
| 4. No unaffordable opening stalls before T2 | **PASS — zero combo stalls**, including 35/37 |
| 3. Median winning all-map board use 65–85% | **PASS — 68.76%** |
| 6. T7 before 60% board use | **PASS — all 50 completers; median 37.60%, max 59.80%** |
| 5. T3–T7 stock ≤3× max biome cost | **MISS — worst checkpoint median ratio 300.5×**, T7 wood |

Combo T1–T8 placement medians: **2 / 21.5 / 45 / 102 / 178 / 208 / 229.5 / 426**. T7 median held stock W/S/A/F: **665.5/262/458.5/479**. Pressure is the median of each run's held/max-cost ratio, not the ratio of two independently computed medians. It samples threshold transactions, not every frame.

| Round | Commit | Combo wins | Spam losses | Median winning board use | Opening stalls (combo) | Max T7 board use | Worst checkpoint median stock/cost | Passing targets |
|---|---|---:|---:|---:|---:|---:|---:|---|
| 1 | b348140 | 50 | 46 | 69.47% | 0 | 89.45% | ∞ | 1,2,3,4 |
| 2 | d010e37 | 50 | 46 | 69.28% | 0 | 68.34% | ∞ | 1,2,3,4 |
| 3 | 6168e56 | 50 | 46 | 69.28% | 0 | 59.80% | ∞ | 1,2,3,4,6 |
| **4 selected** | **39e6ea9** | **50** | **46** | **68.76%** | **0** | **59.80%** | **300.5×** | **1,2,3,4,6** |
| 5 | c30a2c2 | 50 | 38 | 68.87% | 0 | 59.80% | 220× | 1,3,4,6 |

Round4 wins the comparison: it retains round 3's higher-priority outcomes and reduces food/water stock. Round5 introduces eight unproven spam stalls and four spam wins, losing target 2. It cannot be selected to improve the lower-priority stock result. The five-round search does not prove stock pressure impossible within the allowed numbers. No sixth calibration or unmeasured hybrid was used.

**Playtest:** seed **41** for a tight win (571/597 slots, 95.64%); seed **37** for the repaired desert opening and clear spam failure (combo 423/618, 68.45%; spam fills 618 and loses); seed **35** for the repaired forest opening (combo 440/576, 76.39%, formerly stalled at 3). Selected spam seeds 5/18 win; seeds 23/35 stall with empty slots and are never counted as losses.

**Interpretation:** all-map board use includes dead placeable land. Board-full bot losses mean no empty living slots and no usable remaining core, under the prescribed no-demolition policy; they are distinct from engine-proven losses, because replacement combos can remain. Zero detected false-loss declarations uses the constructive escape audit and independent acceptance fixtures, not an exhaustive theorem about every possible replacement sequence. The selected runs have zero engine loss declarations and zero combo losses. See the round 4 section for all per-run checkpoints and held-stock/cost vectors.

## Historical selected v3 result — round 3

Selected calibration **`f6b6d45`**, retained after four measured rounds (`cf27db5`, `1a2c142`, `f6b6d45`, `d04593b`) by priority **4 > 2 > 1 > 3**. This v3 section is historical; its original assessments are preserved below. Source/results: `v3-round-3.json`.

| Target | Result | Evidence, seeds 1–50 |
|---|---|---|
| 4: ≥45 wins, ≥48 T6, zero declarations | **PASS** | 48 wins, 48 T6, zero soft-lock declarations |
| 2: T4–T6 spam/combo ≥1.5× | **PASS** | 3.46× / 2.74× / 1.96×; 26 spam T6 completers |
| 1: T2–T8 pacing ±20%, late cores before fill | **PASS** | Combo medians 2 / 23.5 / 47.5 / 105 / 180.5 / 312 / 362.5 / 433.5 (T1 exempt); median win 613.5 |
| 3: every spam T6 fill ≥70% | **MISS** | Minimum 59.44%; early seeds 3,8,18,19,37,45,47 |

Round 4 raised minimum spam fill to 61.58%, but reduced spam T6 completers to 25/50, making its all-seed median unreached. Round 3 therefore wins the stated priority comparison. No fifth tuning round was run. Starting stock, costs, yields, recipes, terrain, modifiers, adjacency and map size remain unchanged from the v2 round-4 baseline.

| Threshold | Wood | Stone | Water | Food |
|---|---:|---:|---:|---:|
| T1 | 0 | 16 | 0 | 0 |
| T2 | 50 | 45 | 0 | 0 |
| T3 | 100 | 85 | 40 | 0 |
| T4 | 240 | 220 | 120 | 90 |
| T5 | 450 | 380 | 200 | 120 |
| T6 | 850 | 740 | 550 | 120 |
| T7 | 1050 | 920 | 690 | 220 |
| T8 | 1300 | 1150 | 850 | 270 |

T7/T8 reached-only median fill is **60.02% / 69.69%**. Per-seed T7/T8 placements, fill, wins and final legal sites appear in the round-3 table below. Only combo seeds **35/37** remain stuck after three placements: 35 exhausts wood on Hillside Mines; 37 exhausts stone on Oasis Wells/Palm Grove before earning T1. Both were accepted limitations, and no starting-stock/cost repair was attempted. These are bot-route outcomes, not a proof of global unwinnability. All nine earlier core-coverage stalls now win.

Playtest **seed 1** for normal full progression and **seed 12** to confirm the additional core resolves its old coverage stall.

## Selected final balance — N3 round 4

Real GameSession, 20×14, seeds 1–20, 97407 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 20/20 | 2 | 2 (2–12), 19/20 | 1 | 7 (5.6–8.4) |
| T2 | 21 | 21 (11–44), 20/20 | 46.5 | 28 (12–199), 15/20 | 2.21 | 22 (17.6–26.4) |
| T3 | 44 | 44 (26–65), 20/20 | 91 | 61 (45–355), 14/20 | 2.07 | 45 (36–54) |
| T4 | 93 | 93 (60–144), 20/20 | 273.5 | 191 (95–392), 13/20 | 2.94 | 90 (72–108) |
| T5 | 173.5 | 173.5 (105–261), 20/20 | 435 | 301 (174–555), 13/20 | 2.51 | 160 (128–192) |
| T6 | 299 | 299 (222–393), 20/20 | 567.5 | 492 (375–577), 11/20 | 1.9 | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 2 / 21 / 44 / 93 / 173.5 / 299 |
| 2. T4–T6 ≥1.5× | PASS | 2.94 / 2.51 / 1.9 |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | min 64.7%, median 86.76% |
| 4. ≥90% combo T6/wins; zero soft-locks | PASS | T6 20/20; wins 18/20; 0 soft-lock declarations across both bots |

combo: win placements median (range) **603 (552–642)**; 18 wins, 2 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **595.5 (552–642)**; 10 wins, 10 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | 2 / 193 / 201 / 372 / 555 / — | — | — | stuck | 630 | stone=1148, water=760, food=136, wood=1991 | wood=1241, stone=4, water=592, food=127 |
| 1 | combo | 2 / 18 / 42 / 78 / 105 / 249 | 39.52% | 633 | won | 633 | stone=2165, water=1486, wood=3844, food=1634 | wood=2979, stone=1243, water=1369, food=1601 |
| 2 | spam | 2 / — / — / — / — / — | — | — | stuck | 85 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 16 / 42 / 65 / 171 / 300 | 47.39% | 633 | won | 633 | stone=2152, wood=3539, water=1616, food=1770 | wood=2718, stone=1200, water=1464, food=1758 |
| 3 | spam | 12 / 15 / 52 / 275 / 326 / 394 | 64.7% | 609 | won | 609 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 23 / 29 / 40 / 100 / 167 / 276 | 45.32% | 609 | won | 609 | wood=3385, food=1757, stone=1888, water=1441 | wood=2613, stone=889, food=1751, water=1233 |
| 4 | spam | 2 / — / — / — / — / — | — | — | stuck | 46 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 2 / 19 / 57 / 143 / 216 / 384 | 66.32% | 582 | won | 582 | stone=1509, water=2227, food=1627, wood=2954 | wood=2235, stone=597, water=2121, food=1615 |
| 5 | spam | 2 / — / — / — / — / — | — | — | stuck | 63 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 2 / 44 / 65 / 144 / 249 / 381 | 61.06% | 627 | won | 627 | stone=1807, water=2159, food=1598, wood=2499 | wood=1904, stone=417, water=1782, food=1583 |
| 6 | spam | 2 / 13 / 47 / 225 / 510 / — | — | — | stuck | 621 | stone=1392, wood=1440, water=855, food=123 | wood=930, stone=12, water=537, food=114 |
| 6 | combo | 2 / 11 / 45 / 69 / 110 / 227 | 36.55% | 630 | won | 630 | stone=2491, wood=2792, food=1536, water=1710 | wood=2157, stone=1241, food=1527, water=1372 |
| 7 | spam | 2 / 19 / 53 / 141 / 284 / 531 | 86.76% | 612 | won | 612 | stone=894, wood=1515, food=236, water=1224 | wood=747, stone=1, food=236, water=1122 |
| 7 | combo | 3 / 13 / 40 / 144 / 238 / 355 | 58.01% | 612 | won | 612 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 2 / 13 / 102 / 120 / 251 / 375 | 66.49% | 564 | won | 564 | stone=1010, wood=1612, food=311, water=754 | wood=885, stone=42, food=308, water=672 |
| 8 | combo | 2 / 12 / 39 / 65 / 117 / 291 | 51.6% | 564 | won | 564 | stone=2044, wood=2847, food=2014, water=1583 | wood=2065, stone=1229, food=2011, water=1461 |
| 9 | spam | 2 / 56 / 63 / 95 / 283 / 492 | 86.77% | 567 | won | 567 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 2 / 24 / 29 / 65 / 176 / 327 | 57.67% | 567 | won | 567 | stone=1739, wood=3407, water=1584, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | 2 / 37 / 62 / 191 / 301 / 577 | 97.14% | 594 | won | 594 | stone=771, water=1135, food=218, wood=1652 | wood=916, stone=5, water=977, food=215 |
| 10 | combo | 2 / 23 / 65 / 122 / 200 / 322 | 54.21% | 594 | won | 594 | stone=1629, water=1770, food=1381, wood=2979 | wood=2264, stone=634, water=1606, food=1339 |
| 11 | spam | 2 / — / — / — / — / — | — | — | stuck | 19 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 2 / 29 / 48 / 121 / 180 / 307 | 49.44% | 627 | won | 627 | stone=1842, water=2062, wood=2286, food=1352 | wood=1636, stone=476, water=1696, food=1289 |
| 12 | spam | — / — / — / — / — / — | — | — | stuck | 180 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 33 / 36 / 43 / 79 / 140 / 273 | 46.19% | — | stuck | 597 | wood=2793, food=1536, stone=2021, water=1810 | wood=2141, stone=813, food=1512, water=1518 |
| 13 | spam | 7 / 199 / — / — / — / — | — | — | stuck | 303 | water=948, food=85, stone=898, wood=53 | wood=0, stone=1, water=672, food=85 |
| 13 | combo | 7 / 44 / 65 / 86 / 144 / 282 | 48.45% | 582 | won | 582 | water=1747, food=1397, stone=2005, wood=2615 | wood=2048, stone=854, water=1484, food=1385 |
| 14 | spam | 2 / 178 / 191 / 272 / 436 / 537 | 98.35% | 552 | won | 552 | stone=1461, water=1119, wood=918, food=186 | wood=486, stone=288, water=867, food=180 |
| 14 | combo | 2 / 33 / 45 / 115 / 182 / 222 | 40.66% | 552 | won | 552 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 2 / 28 / 48 / — / — / — | — | — | stuck | 188 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 3 / 14 / 30 / 127 / 219 / 342 | 59.38% | 576 | won | 576 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 2 / 199 / 355 / 392 / 434 / 553 | 94.53% | 585 | won | 585 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 2 / 29 / 57 / 86 / 167 / 294 | 50.26% | 585 | won | 585 | stone=2218, food=1339, wood=2017, water=1920 | wood=1411, stone=1099, food=1321, water=1639 |
| 17 | spam | 2 / 21 / 52 / 196 / 311 / 558 | 93.47% | 597 | won | 597 | stone=812, water=1018, food=330, wood=1921 | wood=1132, stone=10, water=883, food=327 |
| 17 | combo | 3 / 13 / 47 / 141 / 261 / 393 | 65.83% | 597 | won | 597 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 2 / 14 / 45 / 108 / 263 / 413 | 69.53% | — | stuck | 609 | stone=1198, wood=1641, food=401, water=917 | wood=989, stone=5, food=383, water=641 |
| 18 | combo | 2 / 13 / 26 / 60 / 177 / 298 | 50.17% | — | stuck | 609 | stone=2087, wood=2821, food=1683, water=1495 | wood=2121, stone=1002, food=1665, water=1206 |
| 19 | spam | 2 / 34 / 60 / 140 / 208 / 432 | 67.29% | 642 | won | 642 | stone=1047, water=768, wood=2231, food=321 | wood=1457, stone=10, water=582, food=301 |
| 19 | combo | 2 / 33 / 57 / 84 / 154 / 318 | 49.53% | 642 | won | 642 | stone=2081, water=1437, wood=3763, food=1943 | wood=2890, stone=1051, water=1243, food=1910 |
| 20 | spam | 9 / 12 / 80 / 141 / 174 / 440 | 70.85% | 621 | won | 621 | wood=2058, food=231, stone=1152, water=612 | wood=1335, stone=96, food=222, water=516 |
| 20 | combo | 8 / 12 / 33 / 103 / 125 / 258 | 41.55% | 621 | won | 621 | wood=3715, food=1855, stone=2387, water=1435 | wood=2876, stone=1496, food=1846, water=1312 |


## Calibration selection

Six rounds completed. Round 4 is retained by priority 4 > 2 > 1 > 3. It passes reachability and combo advantage; T2–T6 pacing passes individually. T1 remains early (2 vs 5.6–8.4), and four spam seeds reach T6 before 70% fill. Round 5 loses the finite spam T6 median; round 6 loses reachability. See `tasks/status/astra.md` for every value change and guardrail decision; `baseline.json` and `round-1.json` … `round-6.json` preserve full reproducible evidence. These measurements do not prove all possible allowed configurations impossible.
## Size preview — informational

Real GameSession, 26×18, seeds 1–20, 169851 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 4 | 3 (2–22), 17/20 | 3.5 | 2 (2–27), 19/20 | 0.88 | 7 (5.6–8.4) |
| T2 | 24.5 | 20 (12–72), 17/20 | 50 | 30 (13–237), 15/20 | 2.04 | 22 (17.6–26.4) |
| T3 | 62 | 50 (28–174), 17/20 | 199 | 80 (41–257), 14/20 | 3.21 | 45 (36–54) |
| T4 | 105 | 103 (66–198), 17/20 | 412.5 | 232.5 (146–636), 14/20 | 3.93 | 90 (72–108) |
| T5 | 151.5 | 142 (110–225), 17/20 | 517 | 334 (199–696), 14/20 | 3.41 | 160 (128–192) |
| T6 | 297 | 291 (203–383), 17/20 | 755.5 | 504 (345–864), 13/20 | 2.54 | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 4 / 24.5 / 62 / 105 / 151.5 / 297 |
| 2. T4–T6 ≥1.5× | PASS | 3.93 / 3.41 / 2.54 |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | min 38.59%, median 58.74% |
| 4. ≥90% combo T6/wins; zero soft-locks | MISS | T6 17/20; wins 0/20; 0 soft-lock declarations across both bots |

combo: win placements median (range) **—**; 0 wins, 20 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **—**; 0 wins, 20 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | 2 / 53 / — / — / — / — | — | — | stuck | 504 | stone=1194, food=75, wood=1500 | wood=810, stone=282, food=66 |
| 1 | combo | 2 / 24 / 70 / 88 / 157 / 318 | 37.32% | — | stuck | 939 | stone=3395, wood=4796, water=2236, food=2486 | wood=3685, stone=1811, water=1892, food=2444 |
| 2 | spam | 2 / 195 / 201 / 273 / 339 / 428 | 51.14% | — | stuck | 894 | stone=1927, food=298, wood=2228, water=1460 | wood=1337, stone=3, food=298, water=1052 |
| 2 | combo | 3 / 72 / 77 / 93 / 138 / 203 | 24.25% | — | stuck | 894 | stone=3192, wood=4356, water=2699, food=2445 | wood=3394, stone=1452, water=2249, food=2445 |
| 3 | spam | 15 / 18 / 80 / 169 / 199 / 490 | 51.52% | — | stuck | 1014 | wood=2704, food=319, stone=2110, water=1442 | wood=1612, stone=6, food=286, water=998 |
| 3 | combo | 16 / 20 / 46 / 131 / 159 / 270 | 28.39% | — | stuck | 1014 | wood=4737, food=2442, stone=3746, water=2582 | wood=3605, stone=1798, food=2370, water=2102 |
| 4 | spam | 2 / — / — / — / — / — | — | — | stuck | 165 | stone=780, food=51 | wood=0, stone=462, food=51 |
| 4 | combo | 2 / 45 / 66 / 125 / 156 / 279 | 33.82% | — | stuck | 885 | stone=3121, wood=5531, food=3174, water=1956 | wood=4118, stone=2057, food=3162, water=1827 |
| 5 | spam | 5 / 237 / 247 / 622 / 687 / — | — | — | stuck | 951 | water=1600, stone=2357, wood=1867, food=134 | wood=1120, stone=40, water=994, food=134 |
| 5 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=28, stone=2, wood=10 | wood=16, stone=0, water=28 |
| 6 | spam | 5 / — / — / — / — / — | — | — | stuck | 100 | water=344, stone=322, food=24 | wood=0, stone=1, water=242, food=24 |
| 6 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=28, stone=2, wood=10 | wood=16, stone=0, water=28 |
| 7 | spam | 2 / 13 / 46 / 180 / 217 / 345 | 38.59% | — | stuck | 981 | stone=1882, wood=2625, food=296, water=1361 | wood=1686, stone=9, food=284, water=1049 |
| 7 | combo | 3 / 15 / 28 / 74 / 135 / 298 | 33.33% | — | stuck | 981 | stone=3773, wood=4891, food=2492, water=2564 | wood=3805, stone=2087, food=2480, water=2205 |
| 8 | spam | 2 / 25 / 54 / 219 / 342 / 774 | 93.82% | — | stuck | 900 | stone=1435, food=241, wood=2826, water=1422 | wood=1740, stone=10, food=232, water=1260 |
| 8 | combo | 2 / 20 / 50 / 81 / 133 / 291 | 35.27% | — | stuck | 900 | stone=2813, food=2885, wood=5404, water=2569 | wood=4164, stone=1456, food=2876, water=2391 |
| 9 | spam | 2 / 227 / 234 / 266 / 329 / 472 | 52.27% | — | stuck | 936 | stone=1737, water=1640, food=435, wood=2344 | wood=1388, stone=3, water=1230, food=435 |
| 9 | combo | 2 / 36 / 47 / 108 / 138 / 322 | 35.66% | — | stuck | 936 | stone=3161, wood=5064, water=2559, food=2924 | wood=3887, stone=1584, water=2251, food=2885 |
| 10 | spam | 18 / 47 / 51 / 633 / 696 / 737 | 84.71% | — | stuck | 912 | wood=2290, stone=1348, water=2084, food=199 | wood=1400, stone=7, water=1862, food=199 |
| 10 | combo | 14 / 54 / 58 / 105 / 180 / 383 | 44.02% | — | stuck | 912 | wood=4500, food=2456, stone=2974, water=3305 | wood=3409, stone=1530, food=2447, water=3074 |
| 11 | spam | 9 / 16 / 48 / 199 / 265 / 705 | 77.81% | — | stuck | 948 | wood=2020, stone=2205, water=1766, food=422 | wood=1232, stone=8, water=1196, food=386 |
| 11 | combo | 8 / 14 / 42 / 87 / 225 / 315 | 34.77% | — | stuck | 948 | wood=3816, food=2255, stone=3486, water=2745 | wood=2874, stone=1432, food=2216, water=2135 |
| 12 | spam | 27 / 30 / 41 / 636 / 670 / 828 | 93.88% | — | stuck | 933 | wood=2922, food=265, stone=1897, water=1306 | wood=1970, stone=8, food=244, water=856 |
| 12 | combo | 22 / 25 / 34 / 67 / 110 / 345 | 39.12% | — | stuck | 933 | wood=5082, food=2835, stone=3227, water=2153 | wood=3788, stone=1646, food=2805, water=1753 |
| 13 | spam | 2 / — / — / — / — / — | — | — | stuck | 45 | stone=155, water=121 | wood=0, stone=1, water=47 |
| 13 | combo | 3 / 15 / 174 / 198 / 218 / 303 | 32.79% | — | stuck | 978 | stone=2977, wood=5031, food=2599, water=2371 | wood=3814, stone=1102, food=2560, water=1838 |
| 14 | spam | 2 / — / — / — / — / — | — | — | stuck | 251 | stone=756, water=738, food=41, wood=47 | wood=1, stone=0, water=438, food=41 |
| 14 | combo | 2 / 69 / 78 / 111 / 172 / 270 | 30.2% | — | stuck | 966 | stone=3667, wood=4759, water=2664, food=2492 | wood=3735, stone=1997, water=2291, food=2492 |
| 15 | spam | 2 / 22 / 178 / 199 / 240 / 425 | 47.86% | — | stuck | 942 | stone=1880, food=347, wood=2541, water=1132 | wood=1819, stone=7, food=335, water=838 |
| 15 | combo | 3 / 18 / 50 / 66 / 111 / 247 | 27.82% | — | stuck | 942 | stone=4096, wood=4604, food=2220, water=2338 | wood=3613, stone=2530, food=2208, water=2016 |
| 16 | spam | 2 / 233 / 257 / 552 / 621 / 864 | 95.05% | — | stuck | 972 | stone=1823, water=1199, wood=3023, food=243 | wood=2189, stone=4, water=867, food=243 |
| 16 | combo | 2 / 38 / 67 / 89 / 147 / 291 | 32.01% | — | stuck | 972 | stone=3604, wood=5559, water=2390, food=2418 | wood=4445, stone=1989, water=2158, food=2358 |
| 17 | spam | 16 / 28 / 51 / 146 / 413 / 504 | 58.74% | — | stuck | 927 | wood=2464, stone=1678, water=1484, food=331 | wood=1444, stone=3, water=1178, food=331 |
| 17 | combo | 5 / 18 / 37 / 105 / 139 / 296 | 34.5% | — | stuck | 927 | wood=4969, stone=3000, food=2153, water=2726 | wood=4042, stone=1295, food=2141, water=2411 |
| 18 | spam | — / — / — / — / — / — | — | — | stuck | 5 | water=28, stone=9, food=1 | wood=4, stone=1, water=28, food=1 |
| 18 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=13, stone=1, wood=14 | wood=20, stone=0, water=13 |
| 19 | spam | 9 / 31 / 197 / 246 / 284 / 522 | 61.92% | — | stuck | 909 | wood=2254, food=325, stone=1823, water=1363 | wood=1345, stone=5, food=325, water=1075 |
| 19 | combo | 9 / 13 / 42 / 103 / 129 / 235 | 27.88% | — | stuck | 909 | wood=4699, food=2545, stone=3390, water=2552 | wood=3645, stone=1837, food=2539, water=2252 |
| 20 | spam | 9 / 29 / 80 / 175 / 202 / 441 | 52.69% | — | stuck | 906 | wood=2160, food=243, stone=1845, water=1563 | wood=1326, stone=0, food=228, water=1245 |
| 20 | combo | 9 / 12 / 70 / 119 / 142 / 249 | 29.75% | — | stuck | 906 | wood=4124, food=2286, stone=3470, water=2727 | wood=3116, stone=1831, food=2271, water=2358 |

## 50-seed confirmation — informational

Real GameSession, 20×14, seeds 1–50, 169010 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 49/50 | 2 | 2 (2–36), 48/50 | 1 | 7 (5.6–8.4) |
| T2 | 23.5 | 22 (11–77), 48/50 | 55 | 37 (12–235), 41/50 | 2.34 | 22 (17.6–26.4) |
| T3 | 47.5 | 46 (24–110), 48/50 | 224 | 105 (31–387), 38/50 | 4.72 | 45 (36–54) |
| T4 | 110.5 | 106.5 (60–192), 48/50 | 365 | 254 (95–561), 34/50 | 3.3 | 90 (72–108) |
| T5 | 181 | 179.5 (104–302), 48/50 | 496.5 | 351 (174–588), 32/50 | 2.74 | 160 (128–192) |
| T6 | 312.5 | 303.5 (218–486), 48/50 | unreached | 521.5 (362–626), 22/50 | unmeasurable | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 2 / 23.5 / 47.5 / 110.5 / 181 / 312.5 |
| 2. T4–T6 ≥1.5× | MISS / unmeasurable | 3.3 / 2.74 / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | min 59.44%, median 86.77% |
| 4. ≥90% combo T6/wins; zero soft-locks | MISS | T6 48/50; wins 39/50; 0 soft-lock declarations across both bots |

combo: win placements median (range) **609 (552–651)**; 39 wins, 11 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **609 (552–645)**; 24 wins, 26 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | 2 / 193 / 201 / 372 / 555 / — | — | — | stuck | 630 | stone=1148, water=760, food=136, wood=1991 | wood=1241, stone=4, water=592, food=127 |
| 1 | combo | 2 / 18 / 42 / 78 / 105 / 249 | 39.52% | 633 | won | 633 | stone=2165, water=1486, wood=3844, food=1634 | wood=2979, stone=1243, water=1369, food=1601 |
| 2 | spam | 2 / — / — / — / — / — | — | — | stuck | 85 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 16 / 42 / 65 / 171 / 300 | 47.39% | 633 | won | 633 | stone=2152, wood=3539, water=1616, food=1770 | wood=2718, stone=1200, water=1464, food=1758 |
| 3 | spam | 12 / 15 / 52 / 275 / 326 / 394 | 64.7% | 609 | won | 609 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 23 / 29 / 40 / 100 / 167 / 276 | 45.32% | 609 | won | 609 | wood=3385, food=1757, stone=1888, water=1441 | wood=2613, stone=889, food=1751, water=1233 |
| 4 | spam | 2 / — / — / — / — / — | — | — | stuck | 46 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 2 / 19 / 57 / 143 / 216 / 384 | 66.32% | 582 | won | 582 | stone=1509, water=2227, food=1627, wood=2954 | wood=2235, stone=597, water=2121, food=1615 |
| 5 | spam | 2 / — / — / — / — / — | — | — | stuck | 63 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 2 / 44 / 65 / 144 / 249 / 381 | 61.06% | 627 | won | 627 | stone=1807, water=2159, food=1598, wood=2499 | wood=1904, stone=417, water=1782, food=1583 |
| 6 | spam | 2 / 13 / 47 / 225 / 510 / — | — | — | stuck | 621 | stone=1392, wood=1440, water=855, food=123 | wood=930, stone=12, water=537, food=114 |
| 6 | combo | 2 / 11 / 45 / 69 / 110 / 227 | 36.55% | 630 | won | 630 | stone=2491, wood=2792, food=1536, water=1710 | wood=2157, stone=1241, food=1527, water=1372 |
| 7 | spam | 2 / 19 / 53 / 141 / 284 / 531 | 86.76% | 612 | won | 612 | stone=894, wood=1515, food=236, water=1224 | wood=747, stone=1, food=236, water=1122 |
| 7 | combo | 3 / 13 / 40 / 144 / 238 / 355 | 58.01% | 612 | won | 612 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 2 / 13 / 102 / 120 / 251 / 375 | 66.49% | 564 | won | 564 | stone=1010, wood=1612, food=311, water=754 | wood=885, stone=42, food=308, water=672 |
| 8 | combo | 2 / 12 / 39 / 65 / 117 / 291 | 51.6% | 564 | won | 564 | stone=2044, wood=2847, food=2014, water=1583 | wood=2065, stone=1229, food=2011, water=1461 |
| 9 | spam | 2 / 56 / 63 / 95 / 283 / 492 | 86.77% | 567 | won | 567 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 2 / 24 / 29 / 65 / 176 / 327 | 57.67% | 567 | won | 567 | stone=1739, wood=3407, water=1584, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | 2 / 37 / 62 / 191 / 301 / 577 | 97.14% | 594 | won | 594 | stone=771, water=1135, food=218, wood=1652 | wood=916, stone=5, water=977, food=215 |
| 10 | combo | 2 / 23 / 65 / 122 / 200 / 322 | 54.21% | 594 | won | 594 | stone=1629, water=1770, food=1381, wood=2979 | wood=2264, stone=634, water=1606, food=1339 |
| 11 | spam | 2 / — / — / — / — / — | — | — | stuck | 19 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 2 / 29 / 48 / 121 / 180 / 307 | 49.44% | 627 | won | 627 | stone=1842, water=2062, wood=2286, food=1352 | wood=1636, stone=476, water=1696, food=1289 |
| 12 | spam | — / — / — / — / — / — | — | — | stuck | 180 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 33 / 36 / 43 / 79 / 140 / 273 | 46.19% | — | stuck | 597 | wood=2793, food=1536, stone=2021, water=1810 | wood=2141, stone=813, food=1512, water=1518 |
| 13 | spam | 7 / 199 / — / — / — / — | — | — | stuck | 303 | water=948, food=85, stone=898, wood=53 | wood=0, stone=1, water=672, food=85 |
| 13 | combo | 7 / 44 / 65 / 86 / 144 / 282 | 48.45% | 582 | won | 582 | water=1747, food=1397, stone=2005, wood=2615 | wood=2048, stone=854, water=1484, food=1385 |
| 14 | spam | 2 / 178 / 191 / 272 / 436 / 537 | 98.35% | 552 | won | 552 | stone=1461, water=1119, wood=918, food=186 | wood=486, stone=288, water=867, food=180 |
| 14 | combo | 2 / 33 / 45 / 115 / 182 / 222 | 40.66% | 552 | won | 552 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 2 / 28 / 48 / — / — / — | — | — | stuck | 188 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 3 / 14 / 30 / 127 / 219 / 342 | 59.38% | 576 | won | 576 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 2 / 199 / 355 / 392 / 434 / 553 | 94.53% | 585 | won | 585 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 2 / 29 / 57 / 86 / 167 / 294 | 50.26% | 585 | won | 585 | stone=2218, food=1339, wood=2017, water=1920 | wood=1411, stone=1099, food=1321, water=1639 |
| 17 | spam | 2 / 21 / 52 / 196 / 311 / 558 | 93.47% | 597 | won | 597 | stone=812, water=1018, food=330, wood=1921 | wood=1132, stone=10, water=883, food=327 |
| 17 | combo | 3 / 13 / 47 / 141 / 261 / 393 | 65.83% | 597 | won | 597 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 2 / 14 / 45 / 108 / 263 / 413 | 69.53% | — | stuck | 609 | stone=1198, wood=1641, food=401, water=917 | wood=989, stone=5, food=383, water=641 |
| 18 | combo | 2 / 13 / 26 / 60 / 177 / 298 | 50.17% | — | stuck | 609 | stone=2087, wood=2821, food=1683, water=1495 | wood=2121, stone=1002, food=1665, water=1206 |
| 19 | spam | 2 / 34 / 60 / 140 / 208 / 432 | 67.29% | 642 | won | 642 | stone=1047, water=768, wood=2231, food=321 | wood=1457, stone=10, water=582, food=301 |
| 19 | combo | 2 / 33 / 57 / 84 / 154 / 318 | 49.53% | 642 | won | 642 | stone=2081, water=1437, wood=3763, food=1943 | wood=2890, stone=1051, water=1243, food=1910 |
| 20 | spam | 9 / 12 / 80 / 141 / 174 / 440 | 70.85% | 621 | won | 621 | wood=2058, food=231, stone=1152, water=612 | wood=1335, stone=96, food=222, water=516 |
| 20 | combo | 8 / 12 / 33 / 103 / 125 / 258 | 41.55% | 621 | won | 621 | wood=3715, food=1855, stone=2387, water=1435 | wood=2876, stone=1496, food=1846, water=1312 |
| 21 | spam | 18 / 32 / 55 / — / — / — | — | — | stuck | 343 | wood=1564, stone=93, water=149, food=147 | wood=923, stone=0, water=149, food=146 |
| 21 | combo | 25 / 34 / 59 / 134 / 228 / 375 | 66.14% | 567 | won | 567 | wood=3035, food=1765, stone=1274, water=1563 | wood=2264, stone=275, food=1728, water=1349 |
| 22 | spam | 2 / 17 / 38 / 167 / 447 / — | — | 606 | won | 606 | stone=704, wood=2665, food=200, water=350 | wood=1753, stone=7, food=200, water=344 |
| 22 | combo | 3 / 12 / 34 / 122 / 241 / 348 | 57.43% | 606 | won | 606 | stone=1765, wood=4586, food=1995, water=1178 | wood=3645, stone=1079, food=1986, water=1170 |
| 23 | spam | — / — / — / — / — / — | — | — | stuck | 6 | water=48, food=3 | wood=0, stone=0, water=48, food=3 |
| 23 | combo | 8 / 15 / 35 / 70 / 123 / 254 | 39.02% | 651 | won | 651 | water=1732, food=1947, stone=2631, wood=2971 | wood=2200, stone=1592, water=1486, food=1932 |
| 24 | spam | 2 / 35 / 61 / 169 / 363 / — | — | — | stuck | 597 | stone=660, wood=2726, water=532, food=302 | wood=1805, stone=13, water=532, food=302 |
| 24 | combo | 2 / 21 / 45 / 128 / 246 / 368 | 61.64% | 606 | won | 606 | stone=1767, wood=4479, water=1391, food=2221 | wood=3489, stone=1119, water=1382, food=2218 |
| 25 | spam | 21 / 27 / 46 / 216 / 510 / — | — | 594 | won | 594 | wood=1044, food=162, stone=1491, water=1215 | wood=678, stone=6, food=156, water=867 |
| 25 | combo | 30 / 37 / 52 / 75 / 146 / 218 | 36.7% | 594 | won | 594 | wood=2488, food=1279, stone=2267, water=1832 | wood=1963, stone=955, food=1267, water=1513 |
| 26 | spam | 2 / 42 / 49 / 141 / 238 / — | — | 612 | won | 612 | stone=939, wood=2311, food=259, water=457 | wood=1484, stone=6, food=235, water=397 |
| 26 | combo | 2 / 27 / 48 / 105 / 179 / 284 | 46.41% | 612 | won | 612 | stone=2092, wood=3860, water=1205, food=2001 | wood=2926, stone=1307, water=1130, food=1968 |
| 27 | spam | 2 / 30 / 48 / 184 / 301 / 465 | 77.89% | 597 | won | 597 | stone=961, wood=1707, food=413, water=1090 | wood=1079, stone=0, food=404, water=946 |
| 27 | combo | 3 / 29 / 51 / 135 / 241 / 363 | 60.8% | 597 | won | 597 | stone=1866, wood=3206, food=1715, water=1772 | wood=2540, stone=901, food=1706, water=1621 |
| 28 | spam | 2 / — / — / — / — / — | — | — | stuck | 37 | stone=124, water=122, food=39 | wood=0, stone=1, water=68, food=39 |
| 28 | combo | 2 / 15 / 42 / 87 / 104 / 252 | 42.42% | 594 | won | 594 | stone=2385, wood=2703, water=1515, food=1594 | wood=2030, stone=1433, water=1332, food=1573 |
| 29 | spam | 12 / 15 / 108 / 279 / 406 / 557 | 89.26% | 627 | won | 627 | wood=1176, food=251, stone=1336, water=1335 | wood=617, stone=6, food=239, water=1005 |
| 29 | combo | 12 / 15 / 24 / 154 / 192 / 375 | 60.1% | 627 | won | 627 | wood=2356, food=1475, stone=2244, water=2039 | wood=1713, stone=1017, food=1463, water=1695 |
| 30 | spam | 2 / 37 / — / — / — / — | — | — | stuck | 151 | stone=453, wood=53, food=75, water=410 | wood=0, stone=1, food=75, water=230 |
| 30 | combo | 3 / 12 / 26 / 78 / 153 / 280 | 49.91% | — | stuck | 570 | stone=2016, wood=2580, food=1214, water=1904 | wood=2053, stone=1021, food=1208, water=1742 |
| 31 | spam | 2 / 57 / 238 / 451 / 515 / 594 | 98.02% | 609 | won | 609 | stone=1437, food=252, wood=915, water=1150 | wood=571, stone=134, food=252, water=814 |
| 31 | combo | 2 / 33 / 57 / 135 / 222 / 378 | 62.38% | 609 | won | 609 | stone=2717, wood=2283, food=1282, water=1841 | wood=1765, stone=1566, food=1273, water=1539 |
| 32 | spam | 2 / 205 / 387 / 561 / 588 / — | — | 624 | won | 624 | stone=1887, water=1295, food=126, wood=724 | wood=365, stone=294, water=821, food=126 |
| 32 | combo | 3 / 21 / 54 / 177 / 195 / 236 | 37.82% | 624 | won | 624 | stone=2627, wood=2171, water=1845, food=1340 | wood=1596, stone=1232, water=1418, food=1310 |
| 33 | spam | 2 / 17 / 286 / 310 / 322 / 512 | 87.52% | 585 | won | 585 | stone=862, water=777, food=396, wood=2065 | wood=1255, stone=13, water=717, food=390 |
| 33 | combo | 3 / 12 / 84 / 108 / 192 / 369 | 63.08% | 585 | won | 585 | stone=1874, wood=3466, food=1860, water=1689 | wood=2666, stone=1059, food=1854, water=1609 |
| 34 | spam | 2 / 112 / 261 / 396 / 470 / 561 | 91.67% | 615 | won | 615 | stone=1407, water=1024, food=226, wood=1088 | wood=735, stone=261, water=820, food=226 |
| 34 | combo | 2 / 32 / 60 / 177 / 243 / 393 | 64.22% | 615 | won | 615 | stone=3048, water=1978, food=1560, wood=2386 | wood=1750, stone=2143, water=1810, food=1560 |
| 35 | spam | 2 / 21 / 31 / 138 / 217 / — | — | — | stuck | 544 | stone=782, wood=2184, food=317, water=512 | wood=1343, stone=1, food=308, water=444 |
| 35 | combo | 2 / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 36 | spam | 2 / — / — / — / — / — | — | — | stuck | 76 | stone=238, water=314, food=21 | wood=0, stone=1, water=248, food=21 |
| 36 | combo | 3 / 18 / 35 / 92 / 168 / 289 | 48.9% | 591 | won | 591 | stone=2164, wood=2704, water=1978, food=1486 | wood=2145, stone=1101, water=1794, food=1483 |
| 37 | spam | 5 / 213 / 224 / 252 / 282 / 362 | 59.44% | 618 | won | 618 | water=798, stone=1060, food=384, wood=2035 | wood=1236, stone=0, water=660, food=381 |
| 37 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=28, stone=2, wood=10 | wood=16, stone=0, water=28 |
| 38 | spam | 36 / 40 / 310 / 513 / — / — | — | — | stuck | 663 | wood=1899, food=117, stone=1419, water=417 | wood=1146, stone=234, food=105, water=219 |
| 38 | combo | 21 / 24 / 33 / 83 / 124 / 273 | 40.44% | — | stuck | 684 | wood=3500, food=1655, stone=2819, water=1400 | wood=2707, stone=1641, food=1631, water=1091 |
| 39 | spam | 12 / 16 / 97 / — / — / — | — | — | stuck | 522 | wood=1696, stone=1010, water=432, food=63 | wood=1101, stone=3, water=324, food=39 |
| 39 | combo | 17 / 21 / 44 / 74 / 151 / 282 | 47.47% | — | stuck | 612 | wood=3877, food=1799, stone=2100, water=1474 | wood=2949, stone=1275, food=1769, water=1381 |
| 40 | spam | 2 / 235 / 277 / 362 / 427 / 509 | 78.19% | — | stuck | 654 | stone=1351, food=215, wood=1554, water=1049 | wood=1274, stone=8, food=215, water=749 |
| 40 | combo | 2 / 72 / 110 / 192 / 280 / 372 | 57.14% | — | stuck | 654 | stone=3150, wood=2796, water=1858, food=1271 | wood=2236, stone=2016, water=1578, food=1271 |
| 41 | spam | 2 / 190 / 364 / 489 / — / — | — | — | stuck | 579 | stone=1586, water=1524, food=169, wood=434 | wood=238, stone=143, water=1170, food=169 |
| 41 | combo | 2 / 24 / 59 / 158 / 302 / 486 | 81.41% | 597 | won | 597 | stone=2740, wood=1492, water=2415, food=1189 | wood=1067, stone=1500, water=2098, food=1189 |
| 42 | spam | 2 / 213 / 224 / 321 / 483 / 567 | 94.5% | 603 | won | 603 | stone=1722, food=210, water=1008, wood=1006 | wood=484, stone=420, food=198, water=720 |
| 42 | combo | 2 / 50 / 62 / 104 / 150 / 252 | 42% | 603 | won | 603 | stone=2632, food=1496, wood=2633, water=1699 | wood=1901, stone=1549, food=1436, water=1493 |
| 43 | spam | 2 / — / — / — / — / — | — | — | stuck | 25 | stone=76, water=80, food=21 | wood=0, stone=1, water=50, food=21 |
| 43 | combo | 2 / 14 / 41 / 104 / 188 / 330 | 52.88% | 624 | won | 624 | stone=1764, water=2023, food=1536, wood=3180 | wood=2511, stone=631, water=1776, food=1530 |
| 44 | spam | 2 / 54 / 234 / — / — / — | — | — | stuck | 585 | stone=1155, food=42, wood=1752, water=495 | wood=1218, stone=21, food=30, water=261 |
| 44 | combo | 3 / 20 / 42 / 105 / 122 / 269 | 41.9% | 648 | won | 648 | stone=2730, wood=2989, food=1633, water=1540 | wood=2208, stone=1639, food=1597, water=1272 |
| 45 | spam | 2 / 214 / 226 / 256 / 333 / 415 | 67.15% | — | stuck | 627 | stone=1187, water=892, food=280, wood=1841 | wood=1174, stone=2, water=622, food=274 |
| 45 | combo | 3 / 24 / 41 / 68 / 135 / 272 | 44.01% | — | stuck | 627 | stone=2032, wood=3334, water=1576, food=1666 | wood=2549, stone=985, water=1386, food=1645 |
| 46 | spam | 2 / 20 / — / — / — / — | — | — | stuck | 492 | stone=1182, wood=1533, food=42 | wood=813, stone=342, food=42 |
| 46 | combo | 2 / 18 / 87 / 164 / 192 / 378 | 60.29% | — | stuck | 642 | stone=2158, wood=4041, food=1984, water=1249 | wood=3121, stone=1194, food=1969, water=1056 |
| 47 | spam | 2 / 212 / 251 / 306 / 339 / 542 | 85.22% | 642 | won | 642 | stone=1296, food=180, water=849, wood=1653 | wood=1096, stone=50, food=180, water=639 |
| 47 | combo | 3 / 44 / 59 / 113 / 144 / 281 | 44.18% | 642 | won | 642 | stone=2509, wood=3232, food=1522, water=1471 | wood=2476, stone=1470, food=1504, water=1296 |
| 48 | spam | 2 / 204 / 267 / 368 / 576 / — | — | — | stuck | 612 | stone=1270, water=1090, food=130, wood=1327 | wood=1055, stone=51, water=868, food=130 |
| 48 | combo | 2 / 77 / 104 / 176 / 197 / 387 | 63.24% | — | stuck | 627 | stone=2987, water=2052, wood=2433, food=1239 | wood=1850, stone=1882, water=1779, food=1239 |
| 49 | spam | 2 / 97 / 141 / 215 / 402 / 626 | 97.05% | 645 | won | 645 | stone=775, wood=2811, food=431, water=1012 | wood=1884, stone=6, food=422, water=910 |
| 49 | combo | 2 / 48 / 74 / 144 / 252 / 405 | 62.79% | 645 | won | 645 | stone=1542, wood=3980, food=2196, water=1628 | wood=3008, stone=635, food=2169, water=1519 |
| 50 | spam | 2 / 37 / 110 / 478 / 561 / — | — | 630 | won | 630 | stone=474, wood=3034, food=438, water=346 | wood=1929, stone=7, food=432, water=334 |
| 50 | combo | 2 / 20 / 48 / 183 / 285 / 444 | 70.48% | 630 | won | 630 | stone=1425, wood=5388, food=2998, water=1143 | wood=4181, stone=745, food=2992, water=1125 |

### Confirmation interpretation

The first 20 seeds exactly reproduce the selected round-4 records. The 50-seed result does **not** confirm all target conclusions: combo T4 drifts from 93 to 110.5 placements, spam T6 loses a finite all-seed median (22/50 reach it), and combo wins fall to 39/50 despite 48/50 reaching T6. No additional calibration was performed beyond the six permitted rounds.

Nine combo routes (12,18,30,38,39,40,45,46,48) use all seven cores and fill every living slot while retaining one or two legal core sites. Seeds 35 and 37 stop after three placements with one spendable construction resource exhausted. These are observed bot-route limits, not a proof about every possible player strategy. Minimum spam T6 fill is 59.44% (seed 37). The 26×18 preview has a much larger core-coverage deficit; the shipping board remains 20×14.

## v3 round 1 — append T7/T8

Real GameSession, 20×14, seeds 1–50, 175737 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. V3 exempts T1 from pacing and counts zero spam T6 completers as passing target 3. T7/T8 must precede the finite all-seed median win placement count.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 49/50 | 2 | 2 (2–36), 48/50 | 1 | exempt (stone-only) |
| T2 | 23.5 | 22 (11–77), 48/50 | 55 | 37 (12–235), 41/50 | 2.34 | 22 (17.6–26.4) |
| T3 | 47.5 | 46 (24–110), 48/50 | 224 | 105 (31–387), 38/50 | 4.72 | 45 (36–54) |
| T4 | 110.5 | 106.5 (60–192), 48/50 | 365 | 254 (95–561), 34/50 | 3.3 | 90 (72–108) |
| T5 | 181 | 179.5 (104–302), 48/50 | 496.5 | 351 (174–588), 32/50 | 2.74 | 160 (128–192) |
| T6 | 312.5 | 303.5 (218–486), 48/50 | unreached | 521.5 (362–626), 22/50 | unmeasurable | 270 (216–324) |
| T7 | 363 | 359.5 (268–534), 48/50 | unreached | 509 (452–606), 9/50 | unmeasurable | 360 (288–432) |
| T8 | 433.5 | 427 (334–579), 48/50 | unreached | 582 (582–582), 1/50 | unmeasurable | 450 (360–540) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 2 / 23.5 / 47.5 / 110.5 / 181 / 312.5 / 363 / 433.5 |
| 2. T4–T6 ≥1.5× | UNMEASURABLE | 3.3 / 2.74 / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS | min 59.44%, median 86.77% |
| 4. ≥96% combo T6, ≥90% wins; zero soft-locks | PASS | T6 48/50; wins 48/50; 0 soft-lock declarations across both bots |

T7/T8 before median win: **PASS**; T7 363, T8 433.5, median win 613.5.

combo: win placements median (range) **612 (552–690)**; 48 wins, 2 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **609 (552–645)**; 25 wins, 25 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T8 placements | T6 fill | T7 fill | T8 fill | Win placements | Stop | Final placements | Legal core sites left | Final lifetime | Final stock |
|---|---|---|---:|---:|---:|---:|---|---:|---:|---|---|
| 1 | spam | 2 / 193 / 201 / 372 / 555 / — / — / — | — | — | — | — | stuck | 630 | 1 | stone=1148, water=760, food=136, wood=1991 | wood=1241, stone=4, water=592, food=127 |
| 1 | combo | 2 / 18 / 42 / 78 / 105 / 249 / 307 / 357 | 39.52% | 48.5% | 56.4% | 633 | won | 633 | 0 | stone=2165, water=1486, wood=3844, food=1634 | wood=2979, stone=1243, water=1369, food=1601 |
| 2 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 85 | 91 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 16 / 42 / 65 / 171 / 300 / 365 / 425 | 47.39% | 57.66% | 67.14% | 633 | won | 633 | 0 | stone=2152, wood=3539, water=1616, food=1770 | wood=2718, stone=1200, water=1464, food=1758 |
| 3 | spam | 12 / 15 / 52 / 275 / 326 / 394 / 487 / — | 64.7% | 79.97% | — | 609 | won | 609 | 0 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 23 / 29 / 40 / 100 / 167 / 276 / 322 / 399 | 45.32% | 52.87% | 65.52% | 609 | won | 609 | 0 | wood=3385, food=1757, stone=1888, water=1441 | wood=2613, stone=889, food=1751, water=1233 |
| 4 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 46 | 74 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 2 / 19 / 57 / 143 / 216 / 384 / 444 / 514 | 66.32% | 76.29% | 88.32% | 582 | won | 582 | 0 | stone=1509, water=2227, food=1627, wood=2954 | wood=2235, stone=597, water=2121, food=1615 |
| 5 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 63 | 76 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 2 / 44 / 65 / 144 / 249 / 381 / 429 / 483 | 61.06% | 68.42% | 77.03% | 627 | won | 627 | 0 | stone=1807, water=2159, food=1598, wood=2499 | wood=1904, stone=417, water=1782, food=1583 |
| 6 | spam | 2 / 13 / 47 / 225 / 510 / — / — / — | — | — | — | — | stuck | 621 | 2 | stone=1392, wood=1440, water=855, food=123 | wood=930, stone=12, water=537, food=114 |
| 6 | combo | 2 / 11 / 45 / 69 / 110 / 227 / 282 / 342 | 36.55% | 44.76% | 54.29% | 630 | won | 630 | 0 | stone=2491, wood=2792, food=1536, water=1710 | wood=2157, stone=1241, food=1527, water=1372 |
| 7 | spam | 2 / 19 / 53 / 141 / 284 / 531 / — / — | 86.76% | — | — | 612 | won | 612 | 0 | stone=894, wood=1515, food=236, water=1224 | wood=747, stone=1, food=236, water=1122 |
| 7 | combo | 3 / 13 / 40 / 144 / 238 / 355 / 425 / 495 | 58.01% | 69.44% | 80.88% | 612 | won | 612 | 0 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 2 / 13 / 102 / 120 / 251 / 375 / 452 / — | 66.49% | 80.14% | — | 564 | won | 564 | 0 | stone=1010, wood=1612, food=311, water=754 | wood=885, stone=42, food=308, water=672 |
| 8 | combo | 2 / 12 / 39 / 65 / 117 / 291 / 330 / 371 | 51.6% | 58.51% | 65.78% | 564 | won | 564 | 0 | stone=2044, wood=2847, food=2014, water=1583 | wood=2065, stone=1229, food=2011, water=1461 |
| 9 | spam | 2 / 56 / 63 / 95 / 283 / 492 / — / — | 86.77% | — | — | 567 | won | 567 | 0 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 2 / 24 / 29 / 65 / 176 / 327 / 358 / 402 | 57.67% | 63.14% | 70.9% | 567 | won | 567 | 0 | stone=1739, wood=3407, water=1584, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | 2 / 37 / 62 / 191 / 301 / 577 / — / — | 97.14% | — | — | 594 | won | 594 | 0 | stone=771, water=1135, food=218, wood=1652 | wood=916, stone=5, water=977, food=215 |
| 10 | combo | 2 / 23 / 65 / 122 / 200 / 322 / 411 / 498 | 54.21% | 69.19% | 83.84% | 594 | won | 594 | 0 | stone=1629, water=1770, food=1381, wood=2979 | wood=2264, stone=634, water=1606, food=1339 |
| 11 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 19 | 77 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 2 / 29 / 48 / 121 / 180 / 307 / 361 / 440 | 49.44% | 57.58% | 70.18% | 627 | won | 627 | 0 | stone=1842, water=2062, wood=2286, food=1352 | wood=1636, stone=476, water=1696, food=1289 |
| 12 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 180 | 138 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 33 / 36 / 43 / 79 / 140 / 273 / 330 / 389 | 46.19% | 55.28% | 64.83% | 600 | won | 600 | 0 | wood=2825, food=1624, stone=2074, water=1783 | wood=2141, stone=912, food=1600, water=1516 |
| 13 | spam | 7 / 199 / — / — / — / — / — / — | — | — | — | — | stuck | 303 | 33 | water=948, food=85, stone=898, wood=53 | wood=0, stone=1, water=672, food=85 |
| 13 | combo | 7 / 44 / 65 / 86 / 144 / 282 / 314 / 354 | 48.45% | 53.95% | 60.82% | 582 | won | 582 | 0 | water=1747, food=1397, stone=2005, wood=2615 | wood=2048, stone=854, water=1484, food=1385 |
| 14 | spam | 2 / 178 / 191 / 272 / 436 / 537 / — / — | 98.35% | — | — | 552 | won | 552 | 0 | stone=1461, water=1119, wood=918, food=186 | wood=486, stone=288, water=867, food=180 |
| 14 | combo | 2 / 33 / 45 / 115 / 182 / 222 / 270 / 403 | 40.66% | 48.91% | 73.01% | 552 | won | 552 | 0 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 2 / 28 / 48 / — / — / — / — / — | — | — | — | — | stuck | 188 | 11 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 3 / 14 / 30 / 127 / 219 / 342 / 385 / 445 | 59.38% | 66.84% | 77.26% | 576 | won | 576 | 0 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 2 / 199 / 355 / 392 / 434 / 553 / — / — | 94.53% | — | — | 585 | won | 585 | 0 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 2 / 29 / 57 / 86 / 167 / 294 / 429 / 488 | 50.26% | 73.33% | 83.42% | 585 | won | 585 | 0 | stone=2218, food=1339, wood=2017, water=1920 | wood=1411, stone=1099, food=1321, water=1639 |
| 17 | spam | 2 / 21 / 52 / 196 / 311 / 558 / — / — | 93.47% | — | — | 597 | won | 597 | 0 | stone=812, water=1018, food=330, wood=1921 | wood=1132, stone=10, water=883, food=327 |
| 17 | combo | 3 / 13 / 47 / 141 / 261 / 393 / 447 / 507 | 65.83% | 74.87% | 84.92% | 597 | won | 597 | 0 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 2 / 14 / 45 / 108 / 263 / 413 / 468 / 582 | 69.53% | 76.85% | 94.63% | 615 | won | 615 | 0 | stone=1214, wood=1604, food=416, water=1003 | wood=938, stone=13, food=398, water=727 |
| 18 | combo | 2 / 13 / 26 / 60 / 177 / 298 / 350 / 420 | 50.17% | 57.47% | 68.29% | 615 | won | 615 | 0 | stone=2108, wood=2733, food=1730, water=1593 | wood=2025, stone=1011, food=1712, water=1301 |
| 19 | spam | 2 / 34 / 60 / 140 / 208 / 432 / 571 / — | 67.29% | 88.94% | — | 642 | won | 642 | 0 | stone=1047, water=768, wood=2231, food=321 | wood=1457, stone=10, water=582, food=301 |
| 19 | combo | 2 / 33 / 57 / 84 / 154 / 318 / 357 / 425 | 49.53% | 55.61% | 66.2% | 642 | won | 642 | 0 | stone=2081, water=1437, wood=3763, food=1943 | wood=2890, stone=1051, water=1243, food=1910 |
| 20 | spam | 9 / 12 / 80 / 141 / 174 / 440 / — / — | 70.85% | — | — | 621 | won | 621 | 0 | wood=2058, food=231, stone=1152, water=612 | wood=1335, stone=96, food=222, water=516 |
| 20 | combo | 8 / 12 / 33 / 103 / 125 / 258 / 321 / 375 | 41.55% | 51.69% | 60.39% | 621 | won | 621 | 0 | wood=3715, food=1855, stone=2387, water=1435 | wood=2876, stone=1496, food=1846, water=1312 |
| 21 | spam | 18 / 32 / 55 / — / — / — / — / — | — | — | — | — | stuck | 343 | 12 | wood=1564, stone=93, water=149, food=147 | wood=923, stone=0, water=149, food=146 |
| 21 | combo | 25 / 34 / 59 / 134 / 228 / 375 / 456 / 535 | 66.14% | 80.42% | 94.36% | 567 | won | 567 | 0 | wood=3035, food=1765, stone=1274, water=1563 | wood=2264, stone=275, food=1728, water=1349 |
| 22 | spam | 2 / 17 / 38 / 167 / 447 / — / — / — | — | — | — | 606 | won | 606 | 0 | stone=704, wood=2665, food=200, water=350 | wood=1753, stone=7, food=200, water=344 |
| 22 | combo | 3 / 12 / 34 / 122 / 241 / 348 / 420 / 495 | 57.43% | 69.31% | 81.68% | 606 | won | 606 | 0 | stone=1765, wood=4586, food=1995, water=1178 | wood=3645, stone=1079, food=1986, water=1170 |
| 23 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 6 | 150 | water=48, food=3 | wood=0, stone=0, water=48, food=3 |
| 23 | combo | 8 / 15 / 35 / 70 / 123 / 254 / 306 / 351 | 39.02% | 47% | 53.92% | 651 | won | 651 | 0 | water=1732, food=1947, stone=2631, wood=2971 | wood=2200, stone=1592, water=1486, food=1932 |
| 24 | spam | 2 / 35 / 61 / 169 / 363 / — / — / — | — | — | — | — | stuck | 597 | 1 | stone=660, wood=2726, water=532, food=302 | wood=1805, stone=13, water=532, food=302 |
| 24 | combo | 2 / 21 / 45 / 128 / 246 / 368 / 429 / 497 | 61.64% | 70.79% | 82.01% | 606 | won | 606 | 0 | stone=1767, wood=4479, water=1391, food=2221 | wood=3489, stone=1119, water=1382, food=2218 |
| 25 | spam | 21 / 27 / 46 / 216 / 510 / — / — / — | — | — | — | 594 | won | 594 | 0 | wood=1044, food=162, stone=1491, water=1215 | wood=678, stone=6, food=156, water=867 |
| 25 | combo | 30 / 37 / 52 / 75 / 146 / 218 / 321 / 402 | 36.7% | 54.04% | 67.68% | 594 | won | 594 | 0 | wood=2488, food=1279, stone=2267, water=1832 | wood=1963, stone=955, food=1267, water=1513 |
| 26 | spam | 2 / 42 / 49 / 141 / 238 / — / — / — | — | — | — | 612 | won | 612 | 0 | stone=939, wood=2311, food=259, water=457 | wood=1484, stone=6, food=235, water=397 |
| 26 | combo | 2 / 27 / 48 / 105 / 179 / 284 / 339 / 417 | 46.41% | 55.39% | 68.14% | 612 | won | 612 | 0 | stone=2092, wood=3860, water=1205, food=2001 | wood=2926, stone=1307, water=1130, food=1968 |
| 27 | spam | 2 / 30 / 48 / 184 / 301 / 465 / 570 / — | 77.89% | 95.48% | — | 597 | won | 597 | 0 | stone=961, wood=1707, food=413, water=1090 | wood=1079, stone=0, food=404, water=946 |
| 27 | combo | 3 / 29 / 51 / 135 / 241 / 363 / 408 / 467 | 60.8% | 68.34% | 78.22% | 597 | won | 597 | 0 | stone=1866, wood=3206, food=1715, water=1772 | wood=2540, stone=901, food=1706, water=1621 |
| 28 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 37 | 84 | stone=124, water=122, food=39 | wood=0, stone=1, water=68, food=39 |
| 28 | combo | 2 / 15 / 42 / 87 / 104 / 252 / 303 / 351 | 42.42% | 51.01% | 59.09% | 594 | won | 594 | 0 | stone=2385, wood=2703, water=1515, food=1594 | wood=2030, stone=1433, water=1332, food=1573 |
| 29 | spam | 12 / 15 / 108 / 279 / 406 / 557 / 597 / — | 89.26% | 95.22% | — | 627 | won | 627 | 0 | wood=1176, food=251, stone=1336, water=1335 | wood=617, stone=6, food=239, water=1005 |
| 29 | combo | 12 / 15 / 24 / 154 / 192 / 375 / 408 / 460 | 60.1% | 65.07% | 73.37% | 627 | won | 627 | 0 | wood=2356, food=1475, stone=2244, water=2039 | wood=1713, stone=1017, food=1463, water=1695 |
| 30 | spam | 2 / 37 / — / — / — / — / — / — | — | — | — | — | stuck | 151 | 40 | stone=453, wood=53, food=75, water=410 | wood=0, stone=1, food=75, water=230 |
| 30 | combo | 3 / 12 / 26 / 78 / 153 / 280 / 351 / 423 | 49.91% | 61.58% | 73.82% | 576 | won | 576 | 0 | stone=1864, wood=2802, food=1259, water=1871 | wood=2231, stone=862, food=1253, water=1709 |
| 31 | spam | 2 / 57 / 238 / 451 / 515 / 594 / — / — | 98.02% | — | — | 609 | won | 609 | 0 | stone=1437, food=252, wood=915, water=1150 | wood=571, stone=134, food=252, water=814 |
| 31 | combo | 2 / 33 / 57 / 135 / 222 / 378 / 419 / 464 | 62.38% | 68.8% | 76.19% | 609 | won | 609 | 0 | stone=2717, wood=2283, food=1282, water=1841 | wood=1765, stone=1566, food=1273, water=1539 |
| 32 | spam | 2 / 205 / 387 / 561 / 588 / — / — / — | — | — | — | 624 | won | 624 | 0 | stone=1887, water=1295, food=126, wood=724 | wood=365, stone=294, water=821, food=126 |
| 32 | combo | 3 / 21 / 54 / 177 / 195 / 236 / 268 / 334 | 37.82% | 42.95% | 53.53% | 624 | won | 624 | 0 | stone=2627, wood=2171, water=1845, food=1340 | wood=1596, stone=1232, water=1418, food=1310 |
| 33 | spam | 2 / 17 / 286 / 310 / 322 / 512 / — / — | 87.52% | — | — | 585 | won | 585 | 0 | stone=862, water=777, food=396, wood=2065 | wood=1255, stone=13, water=717, food=390 |
| 33 | combo | 3 / 12 / 84 / 108 / 192 / 369 / 416 / 455 | 63.08% | 71.11% | 77.78% | 585 | won | 585 | 0 | stone=1874, wood=3466, food=1860, water=1689 | wood=2666, stone=1059, food=1854, water=1609 |
| 34 | spam | 2 / 112 / 261 / 396 / 470 / 561 / 606 / — | 91.67% | 98.54% | — | 615 | won | 615 | 0 | stone=1407, water=1024, food=226, wood=1088 | wood=735, stone=261, water=820, food=226 |
| 34 | combo | 2 / 32 / 60 / 177 / 243 / 393 / 421 / 456 | 64.22% | 68.46% | 74.15% | 615 | won | 615 | 0 | stone=3048, water=1978, food=1560, wood=2386 | wood=1750, stone=2143, water=1810, food=1560 |
| 35 | spam | 2 / 21 / 31 / 138 / 217 / — / — / — | — | — | — | — | stuck | 544 | 2 | stone=782, wood=2184, food=317, water=512 | wood=1343, stone=1, food=308, water=444 |
| 35 | combo | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 77 | stone=24 | wood=0, stone=30 |
| 36 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 76 | 78 | stone=238, water=314, food=21 | wood=0, stone=1, water=248, food=21 |
| 36 | combo | 3 / 18 / 35 / 92 / 168 / 289 / 357 / 400 | 48.9% | 60.41% | 67.68% | 591 | won | 591 | 0 | stone=2164, wood=2704, water=1978, food=1486 | wood=2145, stone=1101, water=1794, food=1483 |
| 37 | spam | 5 / 213 / 224 / 252 / 282 / 362 / 509 / — | 59.44% | 82.36% | — | 618 | won | 618 | 0 | water=798, stone=1060, food=384, wood=2035 | wood=1236, stone=0, water=660, food=381 |
| 37 | combo | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 149 | water=28, stone=2, wood=10 | wood=16, stone=0, water=28 |
| 38 | spam | 36 / 40 / 310 / 513 / — / — / — / — | — | — | — | — | stuck | 663 | 9 | wood=1899, food=117, stone=1419, water=417 | wood=1146, stone=234, food=105, water=219 |
| 38 | combo | 21 / 24 / 33 / 83 / 124 / 273 / 333 / 411 | 40.44% | 48.68% | 59.83% | 690 | won | 690 | 0 | wood=3488, food=1670, stone=2834, water=1459 | wood=2688, stone=1642, food=1646, water=1144 |
| 39 | spam | 12 / 16 / 97 / — / — / — / — / — | — | — | — | — | stuck | 522 | 23 | wood=1696, stone=1010, water=432, food=63 | wood=1101, stone=3, water=324, food=39 |
| 39 | combo | 17 / 21 / 44 / 74 / 151 / 282 / 336 / 429 | 47.47% | 54.9% | 68.42% | 627 | won | 627 | 0 | wood=4147, food=1892, stone=2048, water=1502 | wood=3152, stone=1224, food=1862, water=1409 |
| 40 | spam | 2 / 235 / 277 / 362 / 427 / 509 / — / — | 78.19% | — | — | — | stuck | 654 | 1 | stone=1351, food=215, wood=1554, water=1049 | wood=1274, stone=8, food=215, water=749 |
| 40 | combo | 2 / 72 / 110 / 192 / 280 / 372 / 390 / 443 | 57.14% | 59.63% | 67.43% | 657 | won | 657 | 0 | stone=3159, wood=2796, water=1867, food=1271 | wood=2236, stone=2013, water=1581, food=1271 |
| 41 | spam | 2 / 190 / 364 / 489 / — / — / — / — | — | — | — | — | stuck | 579 | 5 | stone=1586, water=1524, food=169, wood=434 | wood=238, stone=143, water=1170, food=169 |
| 41 | combo | 2 / 24 / 59 / 158 / 302 / 486 / 534 / 573 | 81.41% | 89.45% | 95.98% | 597 | won | 597 | 0 | stone=2740, wood=1492, water=2415, food=1189 | wood=1067, stone=1500, water=2098, food=1189 |
| 42 | spam | 2 / 213 / 224 / 321 / 483 / 567 / — / — | 94.5% | — | — | 603 | won | 603 | 0 | stone=1722, food=210, water=1008, wood=1006 | wood=484, stone=420, food=198, water=720 |
| 42 | combo | 2 / 50 / 62 / 104 / 150 / 252 / 303 / 366 | 42% | 50.25% | 60.7% | 603 | won | 603 | 0 | stone=2632, food=1496, wood=2633, water=1699 | wood=1901, stone=1549, food=1436, water=1493 |
| 43 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 25 | 80 | stone=76, water=80, food=21 | wood=0, stone=1, water=50, food=21 |
| 43 | combo | 2 / 14 / 41 / 104 / 188 / 330 / 411 / 488 | 52.88% | 65.87% | 78.21% | 624 | won | 624 | 0 | stone=1764, water=2023, food=1536, wood=3180 | wood=2511, stone=631, water=1776, food=1530 |
| 44 | spam | 2 / 54 / 234 / — / — / — / — / — | — | — | — | — | stuck | 585 | 17 | stone=1155, food=42, wood=1752, water=495 | wood=1218, stone=21, food=30, water=261 |
| 44 | combo | 3 / 20 / 42 / 105 / 122 / 269 / 348 / 408 | 41.9% | 53.7% | 62.96% | 648 | won | 648 | 0 | stone=2730, wood=2989, food=1633, water=1540 | wood=2208, stone=1639, food=1597, water=1272 |
| 45 | spam | 2 / 214 / 226 / 256 / 333 / 415 / 478 / — | 67.15% | 76.24% | — | — | stuck | 630 | 1 | stone=1184, water=888, food=269, wood=1743 | wood=1071, stone=10, water=618, food=263 |
| 45 | combo | 3 / 24 / 41 / 68 / 135 / 272 / 330 / 384 | 44.01% | 52.63% | 60.95% | 633 | won | 633 | 0 | stone=2050, wood=3370, water=1598, food=1636 | wood=2586, stone=994, water=1408, food=1615 |
| 46 | spam | 2 / 20 / — / — / — / — / — / — | — | — | — | — | stuck | 492 | 43 | stone=1182, wood=1533, food=42 | wood=813, stone=342, food=42 |
| 46 | combo | 2 / 18 / 87 / 164 / 192 / 378 / 411 / 472 | 60.29% | 64.02% | 72.84% | 648 | won | 648 | 0 | stone=2202, wood=4077, food=1996, water=1261 | wood=3151, stone=1232, food=1981, water=1068 |
| 47 | spam | 2 / 212 / 251 / 306 / 339 / 542 / — / — | 85.22% | — | — | 642 | won | 642 | 0 | stone=1296, food=180, water=849, wood=1653 | wood=1096, stone=50, food=180, water=639 |
| 47 | combo | 3 / 44 / 59 / 113 / 144 / 281 / 336 / 400 | 44.18% | 52.34% | 62.31% | 642 | won | 642 | 0 | stone=2509, wood=3232, food=1522, water=1471 | wood=2476, stone=1470, food=1504, water=1296 |
| 48 | spam | 2 / 204 / 267 / 368 / 576 / — / — / — | — | — | — | — | stuck | 612 | 2 | stone=1270, water=1090, food=130, wood=1327 | wood=1055, stone=51, water=868, food=130 |
| 48 | combo | 2 / 77 / 104 / 176 / 197 / 387 / 413 / 438 | 63.24% | 65.87% | 69.52% | 630 | won | 630 | 0 | stone=2997, water=2062, wood=2469, food=1263 | wood=1879, stone=1889, water=1789, food=1263 |
| 49 | spam | 2 / 97 / 141 / 215 / 402 / 626 / — / — | 97.05% | — | — | 645 | won | 645 | 0 | stone=775, wood=2811, food=431, water=1012 | wood=1884, stone=6, food=422, water=910 |
| 49 | combo | 2 / 48 / 74 / 144 / 252 / 405 / 480 / 561 | 62.79% | 74.42% | 86.98% | 645 | won | 645 | 0 | stone=1542, wood=3980, food=2196, water=1628 | wood=3008, stone=635, food=2169, water=1519 |
| 50 | spam | 2 / 37 / 110 / 478 / 561 / — / — / — | — | — | — | 630 | won | 630 | 0 | stone=474, wood=3034, food=438, water=346 | wood=1929, stone=7, food=432, water=334 |
| 50 | combo | 2 / 20 / 48 / 183 / 285 / 444 / 510 / 579 | 70.48% | 80.95% | 91.9% | 630 | won | 630 | 0 | stone=1425, wood=5388, food=2998, water=1143 | wood=4181, stone=745, food=2992, water=1125 |

## v3 round 2 — measurable T6 comparison

Real GameSession, 20×14, seeds 1–50, 172680 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. V3 exempts T1 from pacing and counts zero spam T6 completers as passing target 3. T7/T8 must precede the finite all-seed median win placement count.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 49/50 | 2 | 2 (2–36), 48/50 | 1 | exempt (stone-only) |
| T2 | 23.5 | 22 (11–77), 48/50 | 55 | 37 (12–235), 41/50 | 2.34 | 22 (17.6–26.4) |
| T3 | 47.5 | 46 (24–110), 48/50 | 224 | 105 (31–387), 38/50 | 4.72 | 45 (36–54) |
| T4 | 110.5 | 106.5 (60–192), 48/50 | 365 | 254 (95–561), 34/50 | 3.3 | 90 (72–108) |
| T5 | 181 | 179.5 (104–302), 48/50 | 496.5 | 351 (174–588), 32/50 | 2.74 | 160 (128–192) |
| T6 | 312.5 | 303.5 (218–486), 48/50 | 610 | 521.5 (362–626), 26/50 | 1.95 | 270 (216–324) |
| T7 | 363 | 359.5 (268–534), 48/50 | unreached | 509 (452–606), 9/50 | unmeasurable | 360 (288–432) |
| T8 | 433.5 | 427 (334–579), 48/50 | unreached | 582 (582–582), 1/50 | unmeasurable | 450 (360–540) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 2 / 23.5 / 47.5 / 110.5 / 181 / 312.5 / 363 / 433.5 |
| 2. T4–T6 ≥1.5× | PASS | 3.3 / 2.74 / 1.95 |
| 3. Spam T6 fill ≥70% | MISS | min 59.44%, median 87.15% |
| 4. ≥96% combo T6, ≥90% wins; zero soft-locks | PASS | T6 48/50; wins 48/50; 0 soft-lock declarations across both bots |

T7/T8 before median win: **PASS**; T7 363, T8 433.5, median win 613.5.

combo: win placements median (range) **612 (552–690)**; 48 wins, 2 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **612 (552–645)**; 27 wins, 23 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T8 placements | T6 fill | T7 fill | T8 fill | Win placements | Stop | Final placements | Legal core sites left | Final lifetime | Final stock |
|---|---|---|---:|---:|---:|---:|---|---:|---:|---|---|
| 1 | spam | 2 / 193 / 201 / 372 / 555 / 556 / — / — | 88.25% | — | — | 633 | won | 633 | 0 | stone=1158, water=760, food=136, wood=2005 | wood=1253, stone=10, water=592, food=127 |
| 1 | combo | 2 / 18 / 42 / 78 / 105 / 249 / 307 / 357 | 39.52% | 48.5% | 56.4% | 633 | won | 633 | 0 | stone=2165, water=1486, wood=3844, food=1634 | wood=2979, stone=1243, water=1369, food=1601 |
| 2 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 85 | 91 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 16 / 42 / 65 / 171 / 300 / 365 / 425 | 47.39% | 57.66% | 67.14% | 633 | won | 633 | 0 | stone=2152, wood=3539, water=1616, food=1770 | wood=2718, stone=1200, water=1464, food=1758 |
| 3 | spam | 12 / 15 / 52 / 275 / 326 / 394 / 487 / — | 64.7% | 79.97% | — | 609 | won | 609 | 0 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 23 / 29 / 40 / 100 / 167 / 276 / 322 / 399 | 45.32% | 52.87% | 65.52% | 609 | won | 609 | 0 | wood=3385, food=1757, stone=1888, water=1441 | wood=2613, stone=889, food=1751, water=1233 |
| 4 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 46 | 74 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 2 / 19 / 57 / 143 / 216 / 384 / 444 / 514 | 66.32% | 76.29% | 88.32% | 582 | won | 582 | 0 | stone=1509, water=2227, food=1627, wood=2954 | wood=2235, stone=597, water=2121, food=1615 |
| 5 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 63 | 76 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 2 / 44 / 65 / 144 / 249 / 381 / 429 / 483 | 61.06% | 68.42% | 77.03% | 627 | won | 627 | 0 | stone=1807, water=2159, food=1598, wood=2499 | wood=1904, stone=417, water=1782, food=1583 |
| 6 | spam | 2 / 13 / 47 / 225 / 510 / 511 / — / — | 82.29% | — | — | 630 | won | 630 | 0 | stone=1392, wood=1416, water=963, food=129 | wood=891, stone=9, water=645, food=120 |
| 6 | combo | 2 / 11 / 45 / 69 / 110 / 227 / 282 / 342 | 36.55% | 44.76% | 54.29% | 630 | won | 630 | 0 | stone=2491, wood=2792, food=1536, water=1710 | wood=2157, stone=1241, food=1527, water=1372 |
| 7 | spam | 2 / 19 / 53 / 141 / 284 / 531 / — / — | 86.76% | — | — | 612 | won | 612 | 0 | stone=894, wood=1515, food=236, water=1224 | wood=747, stone=1, food=236, water=1122 |
| 7 | combo | 3 / 13 / 40 / 144 / 238 / 355 / 425 / 495 | 58.01% | 69.44% | 80.88% | 612 | won | 612 | 0 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 2 / 13 / 102 / 120 / 251 / 375 / 452 / — | 66.49% | 80.14% | — | 564 | won | 564 | 0 | stone=1010, wood=1612, food=311, water=754 | wood=885, stone=42, food=308, water=672 |
| 8 | combo | 2 / 12 / 39 / 65 / 117 / 291 / 330 / 371 | 51.6% | 58.51% | 65.78% | 564 | won | 564 | 0 | stone=2044, wood=2847, food=2014, water=1583 | wood=2065, stone=1229, food=2011, water=1461 |
| 9 | spam | 2 / 56 / 63 / 95 / 283 / 492 / — / — | 86.77% | — | — | 567 | won | 567 | 0 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 2 / 24 / 29 / 65 / 176 / 327 / 358 / 402 | 57.67% | 63.14% | 70.9% | 567 | won | 567 | 0 | stone=1739, wood=3407, water=1584, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | 2 / 37 / 62 / 191 / 301 / 577 / — / — | 97.14% | — | — | 594 | won | 594 | 0 | stone=771, water=1135, food=218, wood=1652 | wood=916, stone=5, water=977, food=215 |
| 10 | combo | 2 / 23 / 65 / 122 / 200 / 322 / 411 / 498 | 54.21% | 69.19% | 83.84% | 594 | won | 594 | 0 | stone=1629, water=1770, food=1381, wood=2979 | wood=2264, stone=634, water=1606, food=1339 |
| 11 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 19 | 77 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 2 / 29 / 48 / 121 / 180 / 307 / 361 / 440 | 49.44% | 57.58% | 70.18% | 627 | won | 627 | 0 | stone=1842, water=2062, wood=2286, food=1352 | wood=1636, stone=476, water=1696, food=1289 |
| 12 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 180 | 138 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 33 / 36 / 43 / 79 / 140 / 273 / 330 / 389 | 46.19% | 55.28% | 64.83% | 600 | won | 600 | 0 | wood=2825, food=1624, stone=2074, water=1783 | wood=2141, stone=912, food=1600, water=1516 |
| 13 | spam | 7 / 199 / — / — / — / — / — / — | — | — | — | — | stuck | 303 | 33 | water=948, food=85, stone=898, wood=53 | wood=0, stone=1, water=672, food=85 |
| 13 | combo | 7 / 44 / 65 / 86 / 144 / 282 / 314 / 354 | 48.45% | 53.95% | 60.82% | 582 | won | 582 | 0 | water=1747, food=1397, stone=2005, wood=2615 | wood=2048, stone=854, water=1484, food=1385 |
| 14 | spam | 2 / 178 / 191 / 272 / 436 / 537 / — / — | 98.35% | — | — | 552 | won | 552 | 0 | stone=1461, water=1119, wood=918, food=186 | wood=486, stone=288, water=867, food=180 |
| 14 | combo | 2 / 33 / 45 / 115 / 182 / 222 / 270 / 403 | 40.66% | 48.91% | 73.01% | 552 | won | 552 | 0 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 2 / 28 / 48 / — / — / — / — / — | — | — | — | — | stuck | 188 | 11 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 3 / 14 / 30 / 127 / 219 / 342 / 385 / 445 | 59.38% | 66.84% | 77.26% | 576 | won | 576 | 0 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 2 / 199 / 355 / 392 / 434 / 553 / — / — | 94.53% | — | — | 585 | won | 585 | 0 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 2 / 29 / 57 / 86 / 167 / 294 / 429 / 488 | 50.26% | 73.33% | 83.42% | 585 | won | 585 | 0 | stone=2218, food=1339, wood=2017, water=1920 | wood=1411, stone=1099, food=1321, water=1639 |
| 17 | spam | 2 / 21 / 52 / 196 / 311 / 558 / — / — | 93.47% | — | — | 597 | won | 597 | 0 | stone=812, water=1018, food=330, wood=1921 | wood=1132, stone=10, water=883, food=327 |
| 17 | combo | 3 / 13 / 47 / 141 / 261 / 393 / 447 / 507 | 65.83% | 74.87% | 84.92% | 597 | won | 597 | 0 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 2 / 14 / 45 / 108 / 263 / 413 / 468 / 582 | 69.53% | 76.85% | 94.63% | 615 | won | 615 | 0 | stone=1214, wood=1604, food=416, water=1003 | wood=938, stone=13, food=398, water=727 |
| 18 | combo | 2 / 13 / 26 / 60 / 177 / 298 / 350 / 420 | 50.17% | 57.47% | 68.29% | 615 | won | 615 | 0 | stone=2108, wood=2733, food=1730, water=1593 | wood=2025, stone=1011, food=1712, water=1301 |
| 19 | spam | 2 / 34 / 60 / 140 / 208 / 432 / 571 / — | 67.29% | 88.94% | — | 642 | won | 642 | 0 | stone=1047, water=768, wood=2231, food=321 | wood=1457, stone=10, water=582, food=301 |
| 19 | combo | 2 / 33 / 57 / 84 / 154 / 318 / 357 / 425 | 49.53% | 55.61% | 66.2% | 642 | won | 642 | 0 | stone=2081, water=1437, wood=3763, food=1943 | wood=2890, stone=1051, water=1243, food=1910 |
| 20 | spam | 9 / 12 / 80 / 141 / 174 / 440 / — / — | 70.85% | — | — | 621 | won | 621 | 0 | wood=2058, food=231, stone=1152, water=612 | wood=1335, stone=96, food=222, water=516 |
| 20 | combo | 8 / 12 / 33 / 103 / 125 / 258 / 321 / 375 | 41.55% | 51.69% | 60.39% | 621 | won | 621 | 0 | wood=3715, food=1855, stone=2387, water=1435 | wood=2876, stone=1496, food=1846, water=1312 |
| 21 | spam | 18 / 32 / 55 / — / — / — / — / — | — | — | — | — | stuck | 343 | 12 | wood=1564, stone=93, water=149, food=147 | wood=923, stone=0, water=149, food=146 |
| 21 | combo | 25 / 34 / 59 / 134 / 228 / 375 / 456 / 535 | 66.14% | 80.42% | 94.36% | 567 | won | 567 | 0 | wood=3035, food=1765, stone=1274, water=1563 | wood=2264, stone=275, food=1728, water=1349 |
| 22 | spam | 2 / 17 / 38 / 167 / 447 / — / — / — | — | — | — | 606 | won | 606 | 0 | stone=704, wood=2665, food=200, water=350 | wood=1753, stone=7, food=200, water=344 |
| 22 | combo | 3 / 12 / 34 / 122 / 241 / 348 / 420 / 495 | 57.43% | 69.31% | 81.68% | 606 | won | 606 | 0 | stone=1765, wood=4586, food=1995, water=1178 | wood=3645, stone=1079, food=1986, water=1170 |
| 23 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 6 | 150 | water=48, food=3 | wood=0, stone=0, water=48, food=3 |
| 23 | combo | 8 / 15 / 35 / 70 / 123 / 254 / 306 / 351 | 39.02% | 47% | 53.92% | 651 | won | 651 | 0 | water=1732, food=1947, stone=2631, wood=2971 | wood=2200, stone=1592, water=1486, food=1932 |
| 24 | spam | 2 / 35 / 61 / 169 / 363 / — / — / — | — | — | — | — | stuck | 597 | 1 | stone=660, wood=2726, water=532, food=302 | wood=1805, stone=13, water=532, food=302 |
| 24 | combo | 2 / 21 / 45 / 128 / 246 / 368 / 429 / 497 | 61.64% | 70.79% | 82.01% | 606 | won | 606 | 0 | stone=1767, wood=4479, water=1391, food=2221 | wood=3489, stone=1119, water=1382, food=2218 |
| 25 | spam | 21 / 27 / 46 / 216 / 510 / 551 / — / — | 92.76% | — | — | 594 | won | 594 | 0 | wood=1044, food=162, stone=1491, water=1215 | wood=678, stone=6, food=156, water=867 |
| 25 | combo | 30 / 37 / 52 / 75 / 146 / 218 / 321 / 402 | 36.7% | 54.04% | 67.68% | 594 | won | 594 | 0 | wood=2488, food=1279, stone=2267, water=1832 | wood=1963, stone=955, food=1267, water=1513 |
| 26 | spam | 2 / 42 / 49 / 141 / 238 / — / — / — | — | — | — | 612 | won | 612 | 0 | stone=939, wood=2311, food=259, water=457 | wood=1484, stone=6, food=235, water=397 |
| 26 | combo | 2 / 27 / 48 / 105 / 179 / 284 / 339 / 417 | 46.41% | 55.39% | 68.14% | 612 | won | 612 | 0 | stone=2092, wood=3860, water=1205, food=2001 | wood=2926, stone=1307, water=1130, food=1968 |
| 27 | spam | 2 / 30 / 48 / 184 / 301 / 465 / 570 / — | 77.89% | 95.48% | — | 597 | won | 597 | 0 | stone=961, wood=1707, food=413, water=1090 | wood=1079, stone=0, food=404, water=946 |
| 27 | combo | 3 / 29 / 51 / 135 / 241 / 363 / 408 / 467 | 60.8% | 68.34% | 78.22% | 597 | won | 597 | 0 | stone=1866, wood=3206, food=1715, water=1772 | wood=2540, stone=901, food=1706, water=1621 |
| 28 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 37 | 84 | stone=124, water=122, food=39 | wood=0, stone=1, water=68, food=39 |
| 28 | combo | 2 / 15 / 42 / 87 / 104 / 252 / 303 / 351 | 42.42% | 51.01% | 59.09% | 594 | won | 594 | 0 | stone=2385, wood=2703, water=1515, food=1594 | wood=2030, stone=1433, water=1332, food=1573 |
| 29 | spam | 12 / 15 / 108 / 279 / 406 / 557 / 597 / — | 89.26% | 95.22% | — | 627 | won | 627 | 0 | wood=1176, food=251, stone=1336, water=1335 | wood=617, stone=6, food=239, water=1005 |
| 29 | combo | 12 / 15 / 24 / 154 / 192 / 375 / 408 / 460 | 60.1% | 65.07% | 73.37% | 627 | won | 627 | 0 | wood=2356, food=1475, stone=2244, water=2039 | wood=1713, stone=1017, food=1463, water=1695 |
| 30 | spam | 2 / 37 / — / — / — / — / — / — | — | — | — | — | stuck | 151 | 40 | stone=453, wood=53, food=75, water=410 | wood=0, stone=1, food=75, water=230 |
| 30 | combo | 3 / 12 / 26 / 78 / 153 / 280 / 351 / 423 | 49.91% | 61.58% | 73.82% | 576 | won | 576 | 0 | stone=1864, wood=2802, food=1259, water=1871 | wood=2231, stone=862, food=1253, water=1709 |
| 31 | spam | 2 / 57 / 238 / 451 / 515 / 594 / — / — | 98.02% | — | — | 609 | won | 609 | 0 | stone=1437, food=252, wood=915, water=1150 | wood=571, stone=134, food=252, water=814 |
| 31 | combo | 2 / 33 / 57 / 135 / 222 / 378 / 419 / 464 | 62.38% | 68.8% | 76.19% | 609 | won | 609 | 0 | stone=2717, wood=2283, food=1282, water=1841 | wood=1765, stone=1566, food=1273, water=1539 |
| 32 | spam | 2 / 205 / 387 / 561 / 588 / — / — / — | — | — | — | 624 | won | 624 | 0 | stone=1887, water=1295, food=126, wood=724 | wood=365, stone=294, water=821, food=126 |
| 32 | combo | 3 / 21 / 54 / 177 / 195 / 236 / 268 / 334 | 37.82% | 42.95% | 53.53% | 624 | won | 624 | 0 | stone=2627, wood=2171, water=1845, food=1340 | wood=1596, stone=1232, water=1418, food=1310 |
| 33 | spam | 2 / 17 / 286 / 310 / 322 / 512 / — / — | 87.52% | — | — | 585 | won | 585 | 0 | stone=862, water=777, food=396, wood=2065 | wood=1255, stone=13, water=717, food=390 |
| 33 | combo | 3 / 12 / 84 / 108 / 192 / 369 / 416 / 455 | 63.08% | 71.11% | 77.78% | 585 | won | 585 | 0 | stone=1874, wood=3466, food=1860, water=1689 | wood=2666, stone=1059, food=1854, water=1609 |
| 34 | spam | 2 / 112 / 261 / 396 / 470 / 561 / 606 / — | 91.67% | 98.54% | — | 615 | won | 615 | 0 | stone=1407, water=1024, food=226, wood=1088 | wood=735, stone=261, water=820, food=226 |
| 34 | combo | 2 / 32 / 60 / 177 / 243 / 393 / 421 / 456 | 64.22% | 68.46% | 74.15% | 615 | won | 615 | 0 | stone=3048, water=1978, food=1560, wood=2386 | wood=1750, stone=2143, water=1810, food=1560 |
| 35 | spam | 2 / 21 / 31 / 138 / 217 / — / — / — | — | — | — | — | stuck | 544 | 2 | stone=782, wood=2184, food=317, water=512 | wood=1343, stone=1, food=308, water=444 |
| 35 | combo | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 77 | stone=24 | wood=0, stone=30 |
| 36 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 76 | 78 | stone=238, water=314, food=21 | wood=0, stone=1, water=248, food=21 |
| 36 | combo | 3 / 18 / 35 / 92 / 168 / 289 / 357 / 400 | 48.9% | 60.41% | 67.68% | 591 | won | 591 | 0 | stone=2164, wood=2704, water=1978, food=1486 | wood=2145, stone=1101, water=1794, food=1483 |
| 37 | spam | 5 / 213 / 224 / 252 / 282 / 362 / 509 / — | 59.44% | 82.36% | — | 618 | won | 618 | 0 | water=798, stone=1060, food=384, wood=2035 | wood=1236, stone=0, water=660, food=381 |
| 37 | combo | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 149 | water=28, stone=2, wood=10 | wood=16, stone=0, water=28 |
| 38 | spam | 36 / 40 / 310 / 513 / — / — / — / — | — | — | — | — | stuck | 663 | 9 | wood=1899, food=117, stone=1419, water=417 | wood=1146, stone=234, food=105, water=219 |
| 38 | combo | 21 / 24 / 33 / 83 / 124 / 273 / 333 / 411 | 40.44% | 48.68% | 59.83% | 690 | won | 690 | 0 | wood=3488, food=1670, stone=2834, water=1459 | wood=2688, stone=1642, food=1646, water=1144 |
| 39 | spam | 12 / 16 / 97 / — / — / — / — / — | — | — | — | — | stuck | 522 | 23 | wood=1696, stone=1010, water=432, food=63 | wood=1101, stone=3, water=324, food=39 |
| 39 | combo | 17 / 21 / 44 / 74 / 151 / 282 / 336 / 429 | 47.47% | 54.9% | 68.42% | 627 | won | 627 | 0 | wood=4147, food=1892, stone=2048, water=1502 | wood=3152, stone=1224, food=1862, water=1409 |
| 40 | spam | 2 / 235 / 277 / 362 / 427 / 509 / — / — | 78.19% | — | — | — | stuck | 654 | 1 | stone=1351, food=215, wood=1554, water=1049 | wood=1274, stone=8, food=215, water=749 |
| 40 | combo | 2 / 72 / 110 / 192 / 280 / 372 / 390 / 443 | 57.14% | 59.63% | 67.43% | 657 | won | 657 | 0 | stone=3159, wood=2796, water=1867, food=1271 | wood=2236, stone=2013, water=1581, food=1271 |
| 41 | spam | 2 / 190 / 364 / 489 / — / — / — / — | — | — | — | — | stuck | 579 | 5 | stone=1586, water=1524, food=169, wood=434 | wood=238, stone=143, water=1170, food=169 |
| 41 | combo | 2 / 24 / 59 / 158 / 302 / 486 / 534 / 573 | 81.41% | 89.45% | 95.98% | 597 | won | 597 | 0 | stone=2740, wood=1492, water=2415, food=1189 | wood=1067, stone=1500, water=2098, food=1189 |
| 42 | spam | 2 / 213 / 224 / 321 / 483 / 567 / — / — | 94.5% | — | — | 603 | won | 603 | 0 | stone=1722, food=210, water=1008, wood=1006 | wood=484, stone=420, food=198, water=720 |
| 42 | combo | 2 / 50 / 62 / 104 / 150 / 252 / 303 / 366 | 42% | 50.25% | 60.7% | 603 | won | 603 | 0 | stone=2632, food=1496, wood=2633, water=1699 | wood=1901, stone=1549, food=1436, water=1493 |
| 43 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 25 | 80 | stone=76, water=80, food=21 | wood=0, stone=1, water=50, food=21 |
| 43 | combo | 2 / 14 / 41 / 104 / 188 / 330 / 411 / 488 | 52.88% | 65.87% | 78.21% | 624 | won | 624 | 0 | stone=1764, water=2023, food=1536, wood=3180 | wood=2511, stone=631, water=1776, food=1530 |
| 44 | spam | 2 / 54 / 234 / — / — / — / — / — | — | — | — | — | stuck | 585 | 17 | stone=1155, food=42, wood=1752, water=495 | wood=1218, stone=21, food=30, water=261 |
| 44 | combo | 3 / 20 / 42 / 105 / 122 / 269 / 348 / 408 | 41.9% | 53.7% | 62.96% | 648 | won | 648 | 0 | stone=2730, wood=2989, food=1633, water=1540 | wood=2208, stone=1639, food=1597, water=1272 |
| 45 | spam | 2 / 214 / 226 / 256 / 333 / 415 / 478 / — | 67.15% | 76.24% | — | — | stuck | 630 | 1 | stone=1184, water=888, food=269, wood=1743 | wood=1071, stone=10, water=618, food=263 |
| 45 | combo | 3 / 24 / 41 / 68 / 135 / 272 / 330 / 384 | 44.01% | 52.63% | 60.95% | 633 | won | 633 | 0 | stone=2050, wood=3370, water=1598, food=1636 | wood=2586, stone=994, water=1408, food=1615 |
| 46 | spam | 2 / 20 / — / — / — / — / — / — | — | — | — | — | stuck | 492 | 43 | stone=1182, wood=1533, food=42 | wood=813, stone=342, food=42 |
| 46 | combo | 2 / 18 / 87 / 164 / 192 / 378 / 411 / 472 | 60.29% | 64.02% | 72.84% | 648 | won | 648 | 0 | stone=2202, wood=4077, food=1996, water=1261 | wood=3151, stone=1232, food=1981, water=1068 |
| 47 | spam | 2 / 212 / 251 / 306 / 339 / 410 / — / — | 64.47% | — | — | 642 | won | 642 | 0 | stone=1299, food=183, water=849, wood=1653 | wood=1093, stone=53, food=183, water=639 |
| 47 | combo | 3 / 44 / 59 / 113 / 144 / 281 / 336 / 400 | 44.18% | 52.34% | 62.31% | 642 | won | 642 | 0 | stone=2509, wood=3232, food=1522, water=1471 | wood=2476, stone=1470, food=1504, water=1296 |
| 48 | spam | 2 / 204 / 267 / 368 / 576 / 577 / — / — | 94.28% | — | — | — | stuck | 627 | 1 | stone=1294, water=1090, food=133, wood=1411 | wood=1109, stone=51, water=868, food=133 |
| 48 | combo | 2 / 77 / 104 / 176 / 197 / 387 / 413 / 438 | 63.24% | 65.87% | 69.52% | 630 | won | 630 | 0 | stone=2997, water=2062, wood=2469, food=1263 | wood=1879, stone=1889, water=1789, food=1263 |
| 49 | spam | 2 / 97 / 141 / 215 / 402 / 626 / — / — | 97.05% | — | — | 645 | won | 645 | 0 | stone=775, wood=2811, food=431, water=1012 | wood=1884, stone=6, food=422, water=910 |
| 49 | combo | 2 / 48 / 74 / 144 / 252 / 405 / 480 / 561 | 62.79% | 74.42% | 86.98% | 645 | won | 645 | 0 | stone=1542, wood=3980, food=2196, water=1628 | wood=3008, stone=635, food=2169, water=1519 |
| 50 | spam | 2 / 37 / 110 / 478 / 561 / — / — / — | — | — | — | 630 | won | 630 | 0 | stone=474, wood=3034, food=438, water=346 | wood=1929, stone=7, food=432, water=334 |
| 50 | combo | 2 / 20 / 48 / 183 / 285 / 444 / 510 / 579 | 70.48% | 80.95% | 91.9% | 630 | won | 630 | 0 | stone=1425, wood=5388, food=2998, water=1143 | wood=4181, stone=745, food=2992, water=1125 |

## v3 round 3 — tighten T4 pacing

Real GameSession, 20×14, seeds 1–50, 176805 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. V3 exempts T1 from pacing and counts zero spam T6 completers as passing target 3. T7/T8 must precede the finite all-seed median win placement count.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 49/50 | 2 | 2 (2–36), 48/50 | 1 | exempt (stone-only) |
| T2 | 23.5 | 22 (11–77), 48/50 | 55 | 37 (12–235), 41/50 | 2.34 | 22 (17.6–26.4) |
| T3 | 47.5 | 46 (24–110), 48/50 | 224 | 105 (31–387), 38/50 | 4.72 | 45 (36–54) |
| T4 | 105 | 105 (60–183), 48/50 | 363 | 249 (92–556), 34/50 | 3.46 | 90 (72–108) |
| T5 | 180.5 | 179 (104–302), 48/50 | 495 | 351 (174–583), 32/50 | 2.74 | 160 (128–192) |
| T6 | 312 | 303 (218–483), 48/50 | 610 | 521.5 (362–626), 26/50 | 1.96 | 270 (216–324) |
| T7 | 362.5 | 359 (270–534), 48/50 | unreached | 509 (452–606), 9/50 | unmeasurable | 360 (288–432) |
| T8 | 433.5 | 427 (334–579), 48/50 | unreached | 582 (582–582), 1/50 | unmeasurable | 450 (360–540) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | PASS | 2 / 23.5 / 47.5 / 105 / 180.5 / 312 / 362.5 / 433.5 |
| 2. T4–T6 ≥1.5× | PASS | 3.46 / 2.74 / 1.96 |
| 3. Spam T6 fill ≥70% | MISS | min 59.44%, median 87.15% |
| 4. ≥96% combo T6, ≥90% wins; zero soft-locks | PASS | T6 48/50; wins 48/50; 0 soft-lock declarations across both bots |

T7/T8 before median win: **PASS**; T7 362.5, T8 433.5, median win 613.5.

combo: win placements median (range) **612 (552–690)**; 48 wins, 2 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **612 (552–645)**; 27 wins, 23 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T8 placements | T6 fill | T7 fill | T8 fill | Win placements | Stop | Final placements | Legal core sites left | Final lifetime | Final stock |
|---|---|---|---:|---:|---:|---:|---|---:|---:|---|---|
| 1 | spam | 2 / 193 / 201 / 372 / 555 / 556 / — / — | 88.25% | — | — | 633 | won | 633 | 0 | stone=1158, water=760, food=136, wood=2005 | wood=1253, stone=10, water=592, food=127 |
| 1 | combo | 2 / 18 / 42 / 78 / 105 / 249 / 307 / 357 | 39.52% | 48.5% | 56.4% | 633 | won | 633 | 0 | stone=2165, water=1486, wood=3844, food=1634 | wood=2979, stone=1243, water=1369, food=1601 |
| 2 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 85 | 91 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 16 / 42 / 65 / 171 / 300 / 365 / 425 | 47.39% | 57.66% | 67.14% | 633 | won | 633 | 0 | stone=2152, wood=3539, water=1616, food=1770 | wood=2718, stone=1200, water=1464, food=1758 |
| 3 | spam | 12 / 15 / 52 / 275 / 326 / 394 / 487 / — | 64.7% | 79.97% | — | 609 | won | 609 | 0 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 23 / 29 / 40 / 100 / 167 / 276 / 322 / 399 | 45.32% | 52.87% | 65.52% | 609 | won | 609 | 0 | wood=3385, food=1757, stone=1888, water=1441 | wood=2613, stone=889, food=1751, water=1233 |
| 4 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 46 | 74 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 2 / 19 / 57 / 131 / 216 / 384 / 444 / 514 | 66.32% | 76.29% | 88.32% | 582 | won | 582 | 0 | stone=1509, water=2222, food=1634, wood=2967 | wood=2245, stone=597, water=2116, food=1622 |
| 5 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 63 | 76 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 2 / 44 / 65 / 141 / 249 / 381 / 429 / 483 | 61.06% | 68.42% | 77.03% | 627 | won | 627 | 0 | stone=1807, water=2159, food=1598, wood=2499 | wood=1904, stone=417, water=1782, food=1583 |
| 6 | spam | 2 / 13 / 47 / 225 / 510 / 511 / — / — | 82.29% | — | — | 630 | won | 630 | 0 | stone=1392, wood=1416, water=963, food=129 | wood=891, stone=9, water=645, food=120 |
| 6 | combo | 2 / 11 / 45 / 60 / 110 / 227 / 282 / 342 | 36.55% | 44.76% | 54.29% | 630 | won | 630 | 0 | stone=2491, wood=2792, food=1536, water=1710 | wood=2157, stone=1241, food=1527, water=1372 |
| 7 | spam | 2 / 19 / 53 / 141 / 284 / 531 / — / — | 86.76% | — | — | 612 | won | 612 | 0 | stone=894, wood=1515, food=236, water=1224 | wood=747, stone=1, food=236, water=1122 |
| 7 | combo | 3 / 13 / 40 / 144 / 238 / 355 / 425 / 495 | 58.01% | 69.44% | 80.88% | 612 | won | 612 | 0 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 2 / 13 / 102 / 120 / 251 / 375 / 452 / — | 66.49% | 80.14% | — | 564 | won | 564 | 0 | stone=1010, wood=1612, food=311, water=754 | wood=885, stone=42, food=308, water=672 |
| 8 | combo | 2 / 12 / 39 / 63 / 117 / 291 / 330 / 371 | 51.6% | 58.51% | 65.78% | 564 | won | 564 | 0 | stone=2044, wood=2847, food=2014, water=1583 | wood=2065, stone=1229, food=2011, water=1461 |
| 9 | spam | 2 / 56 / 63 / 92 / 283 / 492 / — / — | 86.77% | — | — | 567 | won | 567 | 0 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 2 / 24 / 29 / 65 / 176 / 327 / 358 / 402 | 57.67% | 63.14% | 70.9% | 567 | won | 567 | 0 | stone=1739, wood=3407, water=1584, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | 2 / 37 / 62 / 191 / 301 / 577 / — / — | 97.14% | — | — | 594 | won | 594 | 0 | stone=771, water=1135, food=218, wood=1652 | wood=916, stone=5, water=977, food=215 |
| 10 | combo | 2 / 23 / 65 / 122 / 200 / 322 / 411 / 498 | 54.21% | 69.19% | 83.84% | 594 | won | 594 | 0 | stone=1629, water=1770, food=1381, wood=2979 | wood=2264, stone=634, water=1606, food=1339 |
| 11 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 19 | 77 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 2 / 29 / 48 / 113 / 179 / 306 / 360 / 438 | 49.28% | 57.42% | 69.86% | 627 | won | 627 | 0 | stone=1851, water=2057, wood=2290, food=1370 | wood=1634, stone=495, water=1696, food=1307 |
| 12 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 180 | 138 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 33 / 36 / 43 / 79 / 140 / 273 / 330 / 389 | 46.19% | 55.28% | 64.83% | 600 | won | 600 | 0 | wood=2825, food=1624, stone=2074, water=1783 | wood=2141, stone=912, food=1600, water=1516 |
| 13 | spam | 7 / 199 / — / — / — / — / — / — | — | — | — | — | stuck | 303 | 33 | water=948, food=85, stone=898, wood=53 | wood=0, stone=1, water=672, food=85 |
| 13 | combo | 7 / 44 / 65 / 84 / 144 / 282 / 314 / 354 | 48.45% | 53.95% | 60.82% | 582 | won | 582 | 0 | water=1747, food=1397, stone=2005, wood=2615 | wood=2048, stone=854, water=1484, food=1385 |
| 14 | spam | 2 / 178 / 191 / 269 / 436 / 537 / — / — | 98.35% | — | — | 552 | won | 552 | 0 | stone=1461, water=1119, wood=918, food=186 | wood=486, stone=288, water=867, food=180 |
| 14 | combo | 2 / 33 / 45 / 99 / 182 / 222 / 270 / 403 | 40.66% | 48.91% | 73.01% | 552 | won | 552 | 0 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 2 / 28 / 48 / — / — / — / — / — | — | — | — | — | stuck | 188 | 11 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 3 / 14 / 30 / 127 / 219 / 342 / 385 / 445 | 59.38% | 66.84% | 77.26% | 576 | won | 576 | 0 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 2 / 199 / 355 / 392 / 434 / 553 / — / — | 94.53% | — | — | 585 | won | 585 | 0 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 2 / 29 / 57 / 84 / 167 / 294 / 429 / 488 | 50.26% | 73.33% | 83.42% | 585 | won | 585 | 0 | stone=2218, food=1339, wood=2017, water=1920 | wood=1411, stone=1099, food=1321, water=1639 |
| 17 | spam | 2 / 21 / 52 / 196 / 311 / 558 / — / — | 93.47% | — | — | 597 | won | 597 | 0 | stone=812, water=1018, food=330, wood=1921 | wood=1132, stone=10, water=883, food=327 |
| 17 | combo | 3 / 13 / 47 / 141 / 261 / 393 / 447 / 507 | 65.83% | 74.87% | 84.92% | 597 | won | 597 | 0 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 2 / 14 / 45 / 108 / 263 / 413 / 468 / 582 | 69.53% | 76.85% | 94.63% | 615 | won | 615 | 0 | stone=1214, wood=1604, food=416, water=1003 | wood=938, stone=13, food=398, water=727 |
| 18 | combo | 2 / 13 / 26 / 60 / 177 / 298 / 350 / 420 | 50.17% | 57.47% | 68.29% | 615 | won | 615 | 0 | stone=2108, wood=2733, food=1730, water=1593 | wood=2025, stone=1011, food=1712, water=1301 |
| 19 | spam | 2 / 34 / 60 / 140 / 208 / 432 / 571 / — | 67.29% | 88.94% | — | 642 | won | 642 | 0 | stone=1047, water=768, wood=2231, food=321 | wood=1457, stone=10, water=582, food=301 |
| 19 | combo | 2 / 33 / 57 / 82 / 154 / 318 / 357 / 425 | 49.53% | 55.61% | 66.2% | 642 | won | 642 | 0 | stone=2081, water=1437, wood=3763, food=1943 | wood=2890, stone=1051, water=1243, food=1910 |
| 20 | spam | 9 / 12 / 80 / 141 / 174 / 440 / — / — | 70.85% | — | — | 621 | won | 621 | 0 | wood=2058, food=231, stone=1152, water=612 | wood=1335, stone=96, food=222, water=516 |
| 20 | combo | 8 / 12 / 33 / 98 / 122 / 259 / 321 / 378 | 41.71% | 51.69% | 60.87% | 621 | won | 621 | 0 | wood=3713, food=1853, stone=2385, water=1433 | wood=2874, stone=1494, food=1844, water=1310 |
| 21 | spam | 18 / 32 / 55 / — / — / — / — / — | — | — | — | — | stuck | 343 | 12 | wood=1564, stone=93, water=149, food=147 | wood=923, stone=0, water=149, food=146 |
| 21 | combo | 25 / 34 / 59 / 134 / 228 / 375 / 456 / 535 | 66.14% | 80.42% | 94.36% | 567 | won | 567 | 0 | wood=3035, food=1765, stone=1274, water=1563 | wood=2264, stone=275, food=1728, water=1349 |
| 22 | spam | 2 / 17 / 38 / 167 / 447 / — / — / — | — | — | — | 606 | won | 606 | 0 | stone=704, wood=2665, food=200, water=350 | wood=1753, stone=7, food=200, water=344 |
| 22 | combo | 3 / 12 / 34 / 122 / 241 / 348 / 420 / 495 | 57.43% | 69.31% | 81.68% | 606 | won | 606 | 0 | stone=1765, wood=4586, food=1995, water=1178 | wood=3645, stone=1079, food=1986, water=1170 |
| 23 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 6 | 150 | water=48, food=3 | wood=0, stone=0, water=48, food=3 |
| 23 | combo | 8 / 15 / 35 / 63 / 123 / 254 / 306 / 351 | 39.02% | 47% | 53.92% | 651 | won | 651 | 0 | water=1732, food=1947, stone=2631, wood=2971 | wood=2200, stone=1592, water=1486, food=1932 |
| 24 | spam | 2 / 35 / 61 / 169 / 363 / — / — / — | — | — | — | — | stuck | 597 | 1 | stone=660, wood=2726, water=532, food=302 | wood=1805, stone=13, water=532, food=302 |
| 24 | combo | 2 / 21 / 45 / 128 / 246 / 368 / 429 / 497 | 61.64% | 70.79% | 82.01% | 606 | won | 606 | 0 | stone=1767, wood=4479, water=1391, food=2221 | wood=3489, stone=1119, water=1382, food=2218 |
| 25 | spam | 21 / 27 / 46 / 153 / 507 / 551 / — / — | 92.76% | — | — | 594 | won | 594 | 0 | wood=1034, food=159, stone=1471, water=1206 | wood=657, stone=6, food=153, water=864 |
| 25 | combo | 30 / 37 / 52 / 75 / 146 / 218 / 321 / 402 | 36.7% | 54.04% | 67.68% | 594 | won | 594 | 0 | wood=2488, food=1279, stone=2267, water=1832 | wood=1963, stone=955, food=1267, water=1513 |
| 26 | spam | 2 / 42 / 49 / 141 / 238 / — / — / — | — | — | — | 612 | won | 612 | 0 | stone=939, wood=2311, food=259, water=457 | wood=1484, stone=6, food=235, water=397 |
| 26 | combo | 2 / 27 / 48 / 105 / 179 / 284 / 339 / 417 | 46.41% | 55.39% | 68.14% | 612 | won | 612 | 0 | stone=2092, wood=3860, water=1205, food=2001 | wood=2926, stone=1307, water=1130, food=1968 |
| 27 | spam | 2 / 30 / 48 / 184 / 301 / 465 / 570 / — | 77.89% | 95.48% | — | 597 | won | 597 | 0 | stone=961, wood=1707, food=413, water=1090 | wood=1079, stone=0, food=404, water=946 |
| 27 | combo | 3 / 29 / 51 / 135 / 241 / 363 / 408 / 467 | 60.8% | 68.34% | 78.22% | 597 | won | 597 | 0 | stone=1866, wood=3206, food=1715, water=1772 | wood=2540, stone=901, food=1706, water=1621 |
| 28 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 37 | 84 | stone=124, water=122, food=39 | wood=0, stone=1, water=68, food=39 |
| 28 | combo | 2 / 15 / 42 / 87 / 104 / 252 / 303 / 351 | 42.42% | 51.01% | 59.09% | 594 | won | 594 | 0 | stone=2385, wood=2703, water=1515, food=1594 | wood=2030, stone=1433, water=1332, food=1573 |
| 29 | spam | 12 / 15 / 108 / 250 / 392 / 555 / 595 / — | 88.94% | 94.9% | — | 627 | won | 627 | 0 | wood=1198, food=259, stone=1342, water=1343 | wood=643, stone=8, food=247, water=1013 |
| 29 | combo | 12 / 15 / 24 / 147 / 194 / 378 / 410 / 461 | 60.58% | 65.39% | 73.52% | 627 | won | 627 | 0 | wood=2348, food=1491, stone=2249, water=2034 | wood=1696, stone=1037, food=1479, water=1695 |
| 30 | spam | 2 / 37 / — / — / — / — / — / — | — | — | — | — | stuck | 151 | 40 | stone=453, wood=53, food=75, water=410 | wood=0, stone=1, food=75, water=230 |
| 30 | combo | 3 / 12 / 26 / 78 / 153 / 280 / 351 / 423 | 49.91% | 61.58% | 73.82% | 576 | won | 576 | 0 | stone=1864, wood=2802, food=1259, water=1871 | wood=2231, stone=862, food=1253, water=1709 |
| 31 | spam | 2 / 57 / 238 / 436 / 515 / 594 / — / — | 98.02% | — | — | 609 | won | 609 | 0 | stone=1437, food=252, wood=915, water=1150 | wood=571, stone=134, food=252, water=814 |
| 31 | combo | 2 / 33 / 57 / 114 / 222 / 378 / 419 / 464 | 62.38% | 68.8% | 76.19% | 609 | won | 609 | 0 | stone=2709, wood=2283, food=1299, water=1851 | wood=1764, stone=1556, food=1290, water=1549 |
| 32 | spam | 2 / 205 / 387 / 556 / 583 / — / — / — | — | — | — | 624 | won | 624 | 0 | stone=1887, water=1295, food=126, wood=724 | wood=365, stone=294, water=821, food=126 |
| 32 | combo | 3 / 21 / 54 / 170 / 191 / 231 / 285 / 334 | 37.02% | 45.67% | 53.53% | 624 | won | 624 | 0 | stone=2627, wood=2171, water=1845, food=1340 | wood=1596, stone=1232, water=1418, food=1310 |
| 33 | spam | 2 / 17 / 286 / 310 / 322 / 512 / — / — | 87.52% | — | — | 585 | won | 585 | 0 | stone=862, water=777, food=396, wood=2065 | wood=1255, stone=13, water=717, food=390 |
| 33 | combo | 3 / 12 / 84 / 108 / 192 / 369 / 416 / 455 | 63.08% | 71.11% | 77.78% | 585 | won | 585 | 0 | stone=1874, wood=3466, food=1860, water=1689 | wood=2666, stone=1059, food=1854, water=1609 |
| 34 | spam | 2 / 112 / 261 / 380 / 470 / 561 / 606 / — | 91.67% | 98.54% | — | 615 | won | 615 | 0 | stone=1407, water=1024, food=226, wood=1088 | wood=735, stone=261, water=820, food=226 |
| 34 | combo | 2 / 32 / 60 / 167 / 243 / 393 / 421 / 456 | 64.22% | 68.46% | 74.15% | 615 | won | 615 | 0 | stone=3048, water=1978, food=1560, wood=2386 | wood=1750, stone=2143, water=1810, food=1560 |
| 35 | spam | 2 / 21 / 31 / 138 / 217 / — / — / — | — | — | — | — | stuck | 544 | 2 | stone=782, wood=2184, food=317, water=512 | wood=1343, stone=1, food=308, water=444 |
| 35 | combo | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 77 | stone=24 | wood=0, stone=30 |
| 36 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 76 | 78 | stone=238, water=314, food=21 | wood=0, stone=1, water=248, food=21 |
| 36 | combo | 3 / 18 / 35 / 92 / 168 / 289 / 357 / 400 | 48.9% | 60.41% | 67.68% | 591 | won | 591 | 0 | stone=2164, wood=2704, water=1978, food=1486 | wood=2145, stone=1101, water=1794, food=1483 |
| 37 | spam | 5 / 213 / 224 / 248 / 282 / 362 / 509 / — | 59.44% | 82.36% | — | 618 | won | 618 | 0 | water=798, stone=1060, food=384, wood=2035 | wood=1236, stone=0, water=660, food=381 |
| 37 | combo | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 149 | water=28, stone=2, wood=10 | wood=16, stone=0, water=28 |
| 38 | spam | 36 / 40 / 310 / 513 / — / — / — / — | — | — | — | — | stuck | 663 | 9 | wood=1899, food=117, stone=1419, water=417 | wood=1146, stone=234, food=105, water=219 |
| 38 | combo | 21 / 24 / 33 / 83 / 124 / 273 / 333 / 411 | 40.44% | 48.68% | 59.83% | 690 | won | 690 | 0 | wood=3488, food=1670, stone=2834, water=1459 | wood=2688, stone=1642, food=1646, water=1144 |
| 39 | spam | 12 / 16 / 97 / — / — / — / — / — | — | — | — | — | stuck | 522 | 23 | wood=1696, stone=1010, water=432, food=63 | wood=1101, stone=3, water=324, food=39 |
| 39 | combo | 17 / 21 / 44 / 74 / 151 / 282 / 336 / 429 | 47.47% | 54.9% | 68.42% | 627 | won | 627 | 0 | wood=4147, food=1892, stone=2048, water=1502 | wood=3152, stone=1224, food=1862, water=1409 |
| 40 | spam | 2 / 235 / 277 / 358 / 427 / 509 / — / — | 78.19% | — | — | — | stuck | 654 | 1 | stone=1351, food=215, wood=1554, water=1049 | wood=1274, stone=8, food=215, water=749 |
| 40 | combo | 2 / 72 / 110 / 180 / 280 / 372 / 390 / 443 | 57.14% | 59.63% | 67.43% | 657 | won | 657 | 0 | stone=3159, wood=2796, water=1867, food=1271 | wood=2236, stone=2013, water=1581, food=1271 |
| 41 | spam | 2 / 190 / 364 / 484 / — / — / — / — | — | — | — | — | stuck | 579 | 5 | stone=1586, water=1524, food=171, wood=434 | wood=238, stone=143, water=1170, food=171 |
| 41 | combo | 2 / 24 / 59 / 141 / 302 / 483 / 534 / 571 | 80.9% | 89.45% | 95.64% | 597 | won | 597 | 0 | stone=2771, wood=1500, water=2414, food=1249 | wood=1054, stone=1566, water=2112, food=1249 |
| 42 | spam | 2 / 213 / 224 / 294 / 483 / 568 / — / — | 94.67% | — | — | 603 | won | 603 | 0 | stone=1722, food=210, water=1008, wood=1003 | wood=481, stone=426, food=198, water=720 |
| 42 | combo | 2 / 50 / 62 / 102 / 150 / 252 / 303 / 366 | 42% | 50.25% | 60.7% | 603 | won | 603 | 0 | stone=2632, food=1496, wood=2633, water=1699 | wood=1901, stone=1549, food=1436, water=1493 |
| 43 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 25 | 80 | stone=76, water=80, food=21 | wood=0, stone=1, water=50, food=21 |
| 43 | combo | 2 / 14 / 41 / 102 / 188 / 330 / 411 / 488 | 52.88% | 65.87% | 78.21% | 624 | won | 624 | 0 | stone=1764, water=2023, food=1536, wood=3180 | wood=2511, stone=631, water=1776, food=1530 |
| 44 | spam | 2 / 54 / 234 / — / — / — / — / — | — | — | — | — | stuck | 585 | 17 | stone=1155, food=42, wood=1752, water=495 | wood=1218, stone=21, food=30, water=261 |
| 44 | combo | 3 / 20 / 42 / 105 / 122 / 269 / 348 / 408 | 41.9% | 53.7% | 62.96% | 648 | won | 648 | 0 | stone=2730, wood=2989, food=1633, water=1540 | wood=2208, stone=1639, food=1597, water=1272 |
| 45 | spam | 2 / 214 / 226 / 252 / 333 / 415 / 478 / — | 67.15% | 76.24% | — | — | stuck | 630 | 1 | stone=1184, water=888, food=269, wood=1743 | wood=1071, stone=10, water=618, food=263 |
| 45 | combo | 3 / 24 / 41 / 63 / 135 / 272 / 330 / 384 | 44.01% | 52.63% | 60.95% | 633 | won | 633 | 0 | stone=2050, wood=3370, water=1598, food=1636 | wood=2586, stone=994, water=1408, food=1615 |
| 46 | spam | 2 / 20 / — / — / — / — / — / — | — | — | — | — | stuck | 492 | 43 | stone=1182, wood=1533, food=42 | wood=813, stone=342, food=42 |
| 46 | combo | 2 / 18 / 87 / 164 / 192 / 378 / 411 / 472 | 60.29% | 64.02% | 72.84% | 648 | won | 648 | 0 | stone=2202, wood=4077, food=1996, water=1261 | wood=3151, stone=1232, food=1981, water=1068 |
| 47 | spam | 2 / 212 / 251 / 303 / 339 / 410 / — / — | 64.47% | — | — | 642 | won | 642 | 0 | stone=1299, food=183, water=849, wood=1653 | wood=1093, stone=53, food=183, water=639 |
| 47 | combo | 3 / 44 / 59 / 105 / 139 / 281 / 336 / 400 | 44.18% | 52.34% | 62.31% | 642 | won | 642 | 0 | stone=2509, wood=3232, food=1522, water=1471 | wood=2476, stone=1470, food=1504, water=1296 |
| 48 | spam | 2 / 204 / 267 / 368 / 576 / 577 / — / — | 94.28% | — | — | — | stuck | 627 | 1 | stone=1294, water=1090, food=133, wood=1411 | wood=1109, stone=51, water=868, food=133 |
| 48 | combo | 2 / 77 / 104 / 171 / 192 / 387 / 413 / 438 | 63.24% | 65.87% | 69.52% | 630 | won | 630 | 0 | stone=2997, water=2062, wood=2469, food=1263 | wood=1879, stone=1889, water=1789, food=1263 |
| 49 | spam | 2 / 97 / 141 / 215 / 402 / 626 / — / — | 97.05% | — | — | 645 | won | 645 | 0 | stone=775, wood=2811, food=431, water=1012 | wood=1884, stone=6, food=422, water=910 |
| 49 | combo | 2 / 48 / 74 / 144 / 252 / 405 / 480 / 561 | 62.79% | 74.42% | 86.98% | 645 | won | 645 | 0 | stone=1542, wood=3980, food=2196, water=1628 | wood=3008, stone=635, food=2169, water=1519 |
| 50 | spam | 2 / 37 / 110 / 478 / 561 / — / — / — | — | — | — | 630 | won | 630 | 0 | stone=474, wood=3034, food=438, water=346 | wood=1929, stone=7, food=432, water=334 |
| 50 | combo | 2 / 20 / 48 / 183 / 285 / 444 / 510 / 579 | 70.48% | 80.95% | 91.9% | 630 | won | 630 | 0 | stone=1425, wood=5388, food=2998, water=1143 | wood=4181, stone=745, food=2992, water=1125 |

## v3 round 4 — conservative late-spam delay

Real GameSession, 20×14, seeds 1–50, 181335 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. V3 exempts T1 from pacing and counts zero spam T6 completers as passing target 3. T7/T8 must precede the finite all-seed median win placement count.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 49/50 | 2 | 2 (2–36), 48/50 | 1 | exempt (stone-only) |
| T2 | 23.5 | 22 (11–77), 48/50 | 55 | 37 (12–235), 41/50 | 2.34 | 22 (17.6–26.4) |
| T3 | 47.5 | 46 (24–110), 48/50 | 224 | 105 (31–387), 38/50 | 4.72 | 45 (36–54) |
| T4 | 105 | 105 (60–183), 48/50 | 363 | 249 (92–556), 34/50 | 3.46 | 90 (72–108) |
| T5 | 180.5 | 179 (104–302), 48/50 | 495 | 351 (174–583), 32/50 | 2.74 | 160 (128–192) |
| T6 | 323 | 315 (230–512), 48/50 | unreached | 528 (375–639), 25/50 | unmeasurable | 270 (216–324) |
| T7 | 362.5 | 359 (270–534), 48/50 | unreached | 509 (452–608), 9/50 | unmeasurable | 360 (288–432) |
| T8 | 433.5 | 427 (334–579), 48/50 | unreached | 582 (582–582), 1/50 | unmeasurable | 450 (360–540) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | PASS | 2 / 23.5 / 47.5 / 105 / 180.5 / 323 / 362.5 / 433.5 |
| 2. T4–T6 ≥1.5× | UNMEASURABLE | 3.46 / 2.74 / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS | min 61.58%, median 88.25% |
| 4. ≥96% combo T6, ≥90% wins; zero soft-locks | PASS | T6 48/50; wins 48/50; 0 soft-lock declarations across both bots |

T7/T8 before median win: **PASS**; T7 362.5, T8 433.5, median win 613.5.

combo: win placements median (range) **612 (552–690)**; 48 wins, 2 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **612 (564–645)**; 26 wins, 24 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T8 placements | T6 fill | T7 fill | T8 fill | Win placements | Stop | Final placements | Legal core sites left | Final lifetime | Final stock |
|---|---|---|---:|---:|---:|---:|---|---:|---:|---|---|
| 1 | spam | 2 / 193 / 201 / 372 / 555 / 556 / — / — | 88.25% | — | — | 633 | won | 633 | 0 | stone=1158, water=760, food=136, wood=2005 | wood=1253, stone=10, water=592, food=127 |
| 1 | combo | 2 / 18 / 42 / 78 / 105 / 256 / 307 / 357 | 40.63% | 48.5% | 56.4% | 633 | won | 633 | 0 | stone=2165, water=1486, wood=3844, food=1634 | wood=2979, stone=1243, water=1369, food=1601 |
| 2 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 85 | 91 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 16 / 42 / 65 / 171 / 306 / 365 / 425 | 48.34% | 57.66% | 67.14% | 633 | won | 633 | 0 | stone=2152, wood=3539, water=1616, food=1770 | wood=2718, stone=1200, water=1464, food=1758 |
| 3 | spam | 12 / 15 / 52 / 275 / 326 / 406 / 487 / — | 66.67% | 79.97% | — | 609 | won | 609 | 0 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 23 / 29 / 40 / 100 / 167 / 279 / 322 / 399 | 45.81% | 52.87% | 65.52% | 609 | won | 609 | 0 | wood=3385, food=1757, stone=1888, water=1441 | wood=2613, stone=889, food=1751, water=1233 |
| 4 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 46 | 74 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 2 / 19 / 57 / 131 / 216 / 390 / 444 / 514 | 67.36% | 76.29% | 88.32% | 582 | won | 582 | 0 | stone=1509, water=2222, food=1634, wood=2967 | wood=2245, stone=597, water=2116, food=1622 |
| 5 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 63 | 76 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 2 / 44 / 65 / 141 / 249 / 401 / 429 / 483 | 64.26% | 68.42% | 77.03% | 627 | won | 627 | 0 | stone=1807, water=2159, food=1598, wood=2499 | wood=1904, stone=417, water=1782, food=1583 |
| 6 | spam | 2 / 13 / 47 / 225 / 510 / 511 / — / — | 82.29% | — | — | 630 | won | 630 | 0 | stone=1392, wood=1416, water=963, food=129 | wood=891, stone=9, water=645, food=120 |
| 6 | combo | 2 / 11 / 45 / 60 / 110 / 237 / 282 / 342 | 38.16% | 44.76% | 54.29% | 630 | won | 630 | 0 | stone=2491, wood=2792, food=1536, water=1710 | wood=2157, stone=1241, food=1527, water=1372 |
| 7 | spam | 2 / 19 / 53 / 141 / 284 / 538 / — / — | 87.91% | — | — | 612 | won | 612 | 0 | stone=894, wood=1515, food=236, water=1224 | wood=747, stone=1, food=236, water=1122 |
| 7 | combo | 3 / 13 / 40 / 144 / 238 / 358 / 425 / 495 | 58.5% | 69.44% | 80.88% | 612 | won | 612 | 0 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 2 / 13 / 102 / 120 / 251 / 390 / 452 / — | 69.15% | 80.14% | — | 564 | won | 564 | 0 | stone=1010, wood=1612, food=311, water=754 | wood=885, stone=42, food=308, water=672 |
| 8 | combo | 2 / 12 / 39 / 63 / 117 / 294 / 330 / 371 | 52.13% | 58.51% | 65.78% | 564 | won | 564 | 0 | stone=2044, wood=2847, food=2014, water=1583 | wood=2065, stone=1229, food=2011, water=1461 |
| 9 | spam | 2 / 56 / 63 / 92 / 283 / 514 / — / — | 90.65% | — | — | 567 | won | 567 | 0 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 2 / 24 / 29 / 65 / 176 / 330 / 358 / 402 | 58.2% | 63.14% | 70.9% | 567 | won | 567 | 0 | stone=1739, wood=3407, water=1584, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | 2 / 37 / 62 / 191 / 301 / 588 / — / — | 98.99% | — | — | 594 | won | 594 | 0 | stone=771, water=1135, food=218, wood=1652 | wood=916, stone=5, water=977, food=215 |
| 10 | combo | 2 / 23 / 65 / 122 / 200 / 339 / 411 / 498 | 57.07% | 69.19% | 83.84% | 594 | won | 594 | 0 | stone=1629, water=1770, food=1381, wood=2979 | wood=2264, stone=634, water=1606, food=1339 |
| 11 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 19 | 77 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 2 / 29 / 48 / 113 / 179 / 309 / 360 / 438 | 49.76% | 57.42% | 69.86% | 627 | won | 627 | 0 | stone=1851, water=2057, wood=2290, food=1370 | wood=1634, stone=495, water=1696, food=1307 |
| 12 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 180 | 138 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 33 / 36 / 43 / 79 / 140 / 283 / 330 / 389 | 47.88% | 55.28% | 64.83% | 600 | won | 600 | 0 | wood=2825, food=1624, stone=2074, water=1783 | wood=2141, stone=912, food=1600, water=1516 |
| 13 | spam | 7 / 199 / — / — / — / — / — / — | — | — | — | — | stuck | 303 | 33 | water=948, food=85, stone=898, wood=53 | wood=0, stone=1, water=672, food=85 |
| 13 | combo | 7 / 44 / 65 / 84 / 144 / 287 / 314 / 354 | 49.31% | 53.95% | 60.82% | 582 | won | 582 | 0 | water=1747, food=1397, stone=2005, wood=2615 | wood=2048, stone=854, water=1484, food=1385 |
| 14 | spam | 2 / 178 / 191 / 269 / 436 / — / — / — | — | — | — | — | stuck | 546 | 4 | stone=1461, water=1119, wood=888, food=186 | wood=456, stone=300, water=867, food=180 |
| 14 | combo | 2 / 33 / 45 / 99 / 182 / 242 / 270 / 403 | 44.32% | 48.91% | 73.01% | 552 | won | 552 | 0 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 2 / 28 / 48 / — / — / — / — / — | — | — | — | — | stuck | 188 | 11 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 3 / 14 / 30 / 127 / 219 / 345 / 385 / 445 | 59.9% | 66.84% | 77.26% | 576 | won | 576 | 0 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 2 / 199 / 355 / 392 / 434 / 565 / — / — | 96.58% | — | — | 585 | won | 585 | 0 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 2 / 29 / 57 / 84 / 167 / 321 / 429 / 488 | 54.87% | 73.33% | 83.42% | 585 | won | 585 | 0 | stone=2218, food=1339, wood=2017, water=1920 | wood=1411, stone=1099, food=1321, water=1639 |
| 17 | spam | 2 / 21 / 52 / 196 / 311 / 572 / — / — | 95.81% | — | — | 597 | won | 597 | 0 | stone=812, water=1018, food=330, wood=1921 | wood=1132, stone=10, water=883, food=327 |
| 17 | combo | 3 / 13 / 47 / 141 / 261 / 402 / 447 / 507 | 67.34% | 74.87% | 84.92% | 597 | won | 597 | 0 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 2 / 14 / 45 / 108 / 263 / 420 / 468 / 582 | 70.71% | 76.85% | 94.63% | 615 | won | 615 | 0 | stone=1214, wood=1604, food=416, water=1003 | wood=938, stone=13, food=398, water=727 |
| 18 | combo | 2 / 13 / 26 / 60 / 177 / 305 / 350 / 420 | 51.35% | 57.47% | 68.29% | 615 | won | 615 | 0 | stone=2108, wood=2733, food=1730, water=1593 | wood=2025, stone=1011, food=1712, water=1301 |
| 19 | spam | 2 / 34 / 60 / 140 / 208 / 497 / 571 / — | 77.41% | 88.94% | — | 642 | won | 642 | 0 | stone=1047, water=768, wood=2231, food=321 | wood=1457, stone=10, water=582, food=301 |
| 19 | combo | 2 / 33 / 57 / 82 / 154 / 325 / 357 / 425 | 50.62% | 55.61% | 66.2% | 642 | won | 642 | 0 | stone=2081, water=1437, wood=3763, food=1943 | wood=2890, stone=1051, water=1243, food=1910 |
| 20 | spam | 9 / 12 / 80 / 141 / 174 / 465 / — / — | 74.88% | — | — | 621 | won | 621 | 0 | wood=2058, food=231, stone=1152, water=612 | wood=1335, stone=96, food=222, water=516 |
| 20 | combo | 8 / 12 / 33 / 98 / 122 / 264 / 321 / 378 | 42.51% | 51.69% | 60.87% | 621 | won | 621 | 0 | wood=3713, food=1853, stone=2385, water=1433 | wood=2874, stone=1494, food=1844, water=1310 |
| 21 | spam | 18 / 32 / 55 / — / — / — / — / — | — | — | — | — | stuck | 343 | 12 | wood=1564, stone=93, water=149, food=147 | wood=923, stone=0, water=149, food=146 |
| 21 | combo | 25 / 34 / 59 / 134 / 228 / 387 / 456 / 535 | 68.25% | 80.42% | 94.36% | 567 | won | 567 | 0 | wood=3035, food=1765, stone=1274, water=1563 | wood=2264, stone=275, food=1728, water=1349 |
| 22 | spam | 2 / 17 / 38 / 167 / 447 / — / — / — | — | — | — | 606 | won | 606 | 0 | stone=704, wood=2665, food=200, water=350 | wood=1753, stone=7, food=200, water=344 |
| 22 | combo | 3 / 12 / 34 / 122 / 241 / 354 / 420 / 495 | 58.42% | 69.31% | 81.68% | 606 | won | 606 | 0 | stone=1765, wood=4586, food=1995, water=1178 | wood=3645, stone=1079, food=1986, water=1170 |
| 23 | spam | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 6 | 150 | water=48, food=3 | wood=0, stone=0, water=48, food=3 |
| 23 | combo | 8 / 15 / 35 / 63 / 123 / 258 / 306 / 351 | 39.63% | 47% | 53.92% | 651 | won | 651 | 0 | water=1732, food=1947, stone=2631, wood=2971 | wood=2200, stone=1592, water=1486, food=1932 |
| 24 | spam | 2 / 35 / 61 / 169 / 363 / — / — / — | — | — | — | — | stuck | 597 | 1 | stone=660, wood=2726, water=532, food=302 | wood=1805, stone=13, water=532, food=302 |
| 24 | combo | 2 / 21 / 45 / 128 / 246 / 378 / 426 / 497 | 63.32% | 70.3% | 82.01% | 606 | won | 606 | 0 | stone=1771, wood=4483, water=1395, food=2225 | wood=3493, stone=1123, water=1386, food=2222 |
| 25 | spam | 21 / 27 / 46 / 153 / 507 / 562 / — / — | 94.61% | — | — | 594 | won | 594 | 0 | wood=1034, food=159, stone=1471, water=1206 | wood=657, stone=6, food=153, water=864 |
| 25 | combo | 30 / 37 / 52 / 75 / 146 / 230 / 321 / 402 | 38.72% | 54.04% | 67.68% | 594 | won | 594 | 0 | wood=2488, food=1279, stone=2267, water=1832 | wood=1963, stone=955, food=1267, water=1513 |
| 26 | spam | 2 / 42 / 49 / 141 / 238 / — / — / — | — | — | — | 612 | won | 612 | 0 | stone=939, wood=2311, food=259, water=457 | wood=1484, stone=6, food=235, water=397 |
| 26 | combo | 2 / 27 / 48 / 105 / 179 / 288 / 339 / 417 | 47.06% | 55.39% | 68.14% | 612 | won | 612 | 0 | stone=2092, wood=3860, water=1205, food=2001 | wood=2926, stone=1307, water=1130, food=1968 |
| 27 | spam | 2 / 30 / 48 / 184 / 301 / 481 / 570 / — | 80.57% | 95.48% | — | 597 | won | 597 | 0 | stone=961, wood=1707, food=413, water=1090 | wood=1079, stone=0, food=404, water=946 |
| 27 | combo | 3 / 29 / 51 / 135 / 241 / 368 / 408 / 467 | 61.64% | 68.34% | 78.22% | 597 | won | 597 | 0 | stone=1866, wood=3206, food=1715, water=1772 | wood=2540, stone=901, food=1706, water=1621 |
| 28 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 37 | 84 | stone=124, water=122, food=39 | wood=0, stone=1, water=68, food=39 |
| 28 | combo | 2 / 15 / 42 / 87 / 104 / 261 / 303 / 351 | 43.94% | 51.01% | 59.09% | 594 | won | 594 | 0 | stone=2385, wood=2703, water=1515, food=1594 | wood=2030, stone=1433, water=1332, food=1573 |
| 29 | spam | 12 / 15 / 108 / 250 / 392 / 563 / 595 / — | 90.22% | 94.9% | — | 627 | won | 627 | 0 | wood=1198, food=259, stone=1342, water=1343 | wood=643, stone=8, food=247, water=1013 |
| 29 | combo | 12 / 15 / 24 / 147 / 194 / 386 / 410 / 461 | 61.86% | 65.39% | 73.52% | 627 | won | 627 | 0 | wood=2348, food=1491, stone=2249, water=2034 | wood=1696, stone=1037, food=1479, water=1695 |
| 30 | spam | 2 / 37 / — / — / — / — / — / — | — | — | — | — | stuck | 151 | 40 | stone=453, wood=53, food=75, water=410 | wood=0, stone=1, food=75, water=230 |
| 30 | combo | 3 / 12 / 26 / 78 / 153 / 285 / 351 / 423 | 50.8% | 61.58% | 73.82% | 576 | won | 576 | 0 | stone=1864, wood=2802, food=1259, water=1871 | wood=2231, stone=862, food=1253, water=1709 |
| 31 | spam | 2 / 57 / 238 / 436 / 515 / 606 / — / — | 100% | — | — | 609 | won | 609 | 0 | stone=1437, food=252, wood=915, water=1150 | wood=571, stone=134, food=252, water=814 |
| 31 | combo | 2 / 33 / 57 / 114 / 222 / 404 / 419 / 464 | 66.67% | 68.8% | 76.19% | 609 | won | 609 | 0 | stone=2709, wood=2283, food=1299, water=1851 | wood=1764, stone=1556, food=1290, water=1549 |
| 32 | spam | 2 / 205 / 387 / 556 / 583 / — / — / — | — | — | — | 624 | won | 624 | 0 | stone=1887, water=1295, food=126, wood=724 | wood=365, stone=294, water=821, food=126 |
| 32 | combo | 3 / 21 / 54 / 170 / 191 / 236 / 285 / 334 | 37.82% | 45.67% | 53.53% | 624 | won | 624 | 0 | stone=2627, wood=2171, water=1845, food=1340 | wood=1596, stone=1232, water=1418, food=1310 |
| 33 | spam | 2 / 17 / 286 / 310 / 322 / 528 / — / — | 90.26% | — | — | 585 | won | 585 | 0 | stone=862, water=777, food=396, wood=2065 | wood=1255, stone=13, water=717, food=390 |
| 33 | combo | 3 / 12 / 84 / 108 / 192 / 375 / 416 / 455 | 64.1% | 71.11% | 77.78% | 585 | won | 585 | 0 | stone=1874, wood=3466, food=1860, water=1689 | wood=2666, stone=1059, food=1854, water=1609 |
| 34 | spam | 2 / 112 / 261 / 380 / 470 / 574 / 608 / — | 93.79% | 98.86% | — | 615 | won | 615 | 0 | stone=1407, water=1024, food=226, wood=1079 | wood=732, stone=255, water=820, food=226 |
| 34 | combo | 2 / 32 / 60 / 167 / 243 / 405 / 427 / 456 | 66.18% | 69.43% | 74.15% | 615 | won | 615 | 0 | stone=3048, water=1978, food=1560, wood=2386 | wood=1750, stone=2143, water=1810, food=1560 |
| 35 | spam | 2 / 21 / 31 / 138 / 217 / — / — / — | — | — | — | — | stuck | 544 | 2 | stone=782, wood=2184, food=317, water=512 | wood=1343, stone=1, food=308, water=444 |
| 35 | combo | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 77 | stone=24 | wood=0, stone=30 |
| 36 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 76 | 78 | stone=238, water=314, food=21 | wood=0, stone=1, water=248, food=21 |
| 36 | combo | 3 / 18 / 35 / 92 / 168 / 299 / 357 / 400 | 50.59% | 60.41% | 67.68% | 591 | won | 591 | 0 | stone=2164, wood=2704, water=1978, food=1486 | wood=2145, stone=1101, water=1794, food=1483 |
| 37 | spam | 5 / 213 / 224 / 248 / 282 / 375 / 509 / — | 61.58% | 82.36% | — | 618 | won | 618 | 0 | water=798, stone=1060, food=384, wood=2035 | wood=1236, stone=0, water=660, food=381 |
| 37 | combo | — / — / — / — / — / — / — / — | — | — | — | — | stuck | 3 | 149 | water=28, stone=2, wood=10 | wood=16, stone=0, water=28 |
| 38 | spam | 36 / 40 / 310 / 513 / — / — / — / — | — | — | — | — | stuck | 663 | 9 | wood=1899, food=117, stone=1419, water=417 | wood=1146, stone=234, food=105, water=219 |
| 38 | combo | 21 / 24 / 33 / 83 / 124 / 285 / 333 / 411 | 42.22% | 48.68% | 59.83% | 690 | won | 690 | 0 | wood=3488, food=1670, stone=2834, water=1459 | wood=2688, stone=1642, food=1646, water=1144 |
| 39 | spam | 12 / 16 / 97 / — / — / — / — / — | — | — | — | — | stuck | 522 | 23 | wood=1696, stone=1010, water=432, food=63 | wood=1101, stone=3, water=324, food=39 |
| 39 | combo | 17 / 21 / 44 / 74 / 151 / 285 / 336 / 429 | 47.98% | 54.9% | 68.42% | 627 | won | 627 | 0 | wood=4147, food=1892, stone=2048, water=1502 | wood=3152, stone=1224, food=1862, water=1409 |
| 40 | spam | 2 / 235 / 277 / 358 / 427 / 522 / — / — | 80.18% | — | — | — | stuck | 654 | 1 | stone=1351, food=215, wood=1554, water=1049 | wood=1274, stone=8, food=215, water=749 |
| 40 | combo | 2 / 72 / 110 / 180 / 280 / 402 / 416 / 443 | 61.75% | 63.61% | 67.43% | 657 | won | 657 | 0 | stone=3159, wood=2796, water=1867, food=1271 | wood=2236, stone=2013, water=1581, food=1271 |
| 41 | spam | 2 / 190 / 364 / 484 / — / — / — / — | — | — | — | — | stuck | 579 | 5 | stone=1586, water=1524, food=171, wood=434 | wood=238, stone=143, water=1170, food=171 |
| 41 | combo | 2 / 24 / 59 / 141 / 302 / 512 / 534 / 571 | 85.76% | 89.45% | 95.64% | 597 | won | 597 | 0 | stone=2771, wood=1500, water=2414, food=1249 | wood=1054, stone=1566, water=2112, food=1249 |
| 42 | spam | 2 / 213 / 224 / 294 / 483 / 578 / — / — | 96.33% | — | — | 603 | won | 603 | 0 | stone=1722, food=210, water=1008, wood=1003 | wood=481, stone=426, food=198, water=720 |
| 42 | combo | 2 / 50 / 62 / 102 / 150 / 269 / 303 / 366 | 44.83% | 50.25% | 60.7% | 603 | won | 603 | 0 | stone=2632, food=1496, wood=2633, water=1699 | wood=1901, stone=1549, food=1436, water=1493 |
| 43 | spam | 2 / — / — / — / — / — / — / — | — | — | — | — | stuck | 25 | 80 | stone=76, water=80, food=21 | wood=0, stone=1, water=50, food=21 |
| 43 | combo | 2 / 14 / 41 / 102 / 188 / 344 / 411 / 488 | 55.13% | 65.87% | 78.21% | 624 | won | 624 | 0 | stone=1764, water=2023, food=1536, wood=3180 | wood=2511, stone=631, water=1776, food=1530 |
| 44 | spam | 2 / 54 / 234 / — / — / — / — / — | — | — | — | — | stuck | 585 | 17 | stone=1155, food=42, wood=1752, water=495 | wood=1218, stone=21, food=30, water=261 |
| 44 | combo | 3 / 20 / 42 / 105 / 122 / 273 / 348 / 408 | 42.52% | 53.7% | 62.96% | 648 | won | 648 | 0 | stone=2730, wood=2989, food=1633, water=1540 | wood=2208, stone=1639, food=1597, water=1272 |
| 45 | spam | 2 / 214 / 226 / 252 / 333 / 430 / 478 / — | 69.58% | 76.24% | — | — | stuck | 630 | 1 | stone=1184, water=888, food=269, wood=1743 | wood=1071, stone=10, water=618, food=263 |
| 45 | combo | 3 / 24 / 41 / 63 / 135 / 285 / 330 / 384 | 46.12% | 52.63% | 60.95% | 633 | won | 633 | 0 | stone=2050, wood=3370, water=1598, food=1636 | wood=2586, stone=994, water=1408, food=1615 |
| 46 | spam | 2 / 20 / — / — / — / — / — / — | — | — | — | — | stuck | 492 | 43 | stone=1182, wood=1533, food=42 | wood=813, stone=342, food=42 |
| 46 | combo | 2 / 18 / 87 / 164 / 192 / 386 / 411 / 472 | 61.56% | 64.02% | 72.84% | 648 | won | 648 | 0 | stone=2202, wood=4077, food=1996, water=1261 | wood=3151, stone=1232, food=1981, water=1068 |
| 47 | spam | 2 / 212 / 251 / 303 / 339 / 421 / — / — | 66.19% | — | — | 642 | won | 642 | 0 | stone=1299, food=183, water=849, wood=1653 | wood=1093, stone=53, food=183, water=639 |
| 47 | combo | 3 / 44 / 59 / 105 / 139 / 288 / 336 / 400 | 45.28% | 52.34% | 62.31% | 642 | won | 642 | 0 | stone=2509, wood=3232, food=1522, water=1471 | wood=2476, stone=1470, food=1504, water=1296 |
| 48 | spam | 2 / 204 / 267 / 368 / 576 / 577 / — / — | 94.28% | — | — | — | stuck | 627 | 1 | stone=1294, water=1090, food=133, wood=1411 | wood=1109, stone=51, water=868, food=133 |
| 48 | combo | 2 / 77 / 104 / 171 / 192 / 421 / 444 / 469 | 68.79% | 70.81% | 74.44% | 630 | won | 630 | 0 | stone=2997, water=2062, wood=2469, food=1263 | wood=1879, stone=1889, water=1789, food=1263 |
| 49 | spam | 2 / 97 / 141 / 215 / 402 / 639 / — / — | 99.07% | — | — | 645 | won | 645 | 0 | stone=775, wood=2811, food=431, water=1012 | wood=1884, stone=6, food=422, water=910 |
| 49 | combo | 2 / 48 / 74 / 144 / 252 / 411 / 480 / 561 | 63.72% | 74.42% | 86.98% | 645 | won | 645 | 0 | stone=1542, wood=3980, food=2196, water=1628 | wood=3008, stone=635, food=2169, water=1519 |
| 50 | spam | 2 / 37 / 110 / 478 / 561 / — / — / — | — | — | — | 630 | won | 630 | 0 | stone=474, wood=3034, food=438, water=346 | wood=1929, stone=7, food=432, water=334 |
| 50 | combo | 2 / 20 / 48 / 183 / 285 / 453 / 510 / 579 | 71.9% | 80.95% | 91.9% | 630 | won | 630 | 0 | stone=1425, wood=5388, food=2998, water=1143 | wood=4181, stone=745, food=2992, water=1125 |

## v4 round 1 — opening repairs

Real GameSession, 20×14, seeds 1–50, 139309 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offer/core scoring and tie rules are unchanged.

V4: T8 wins immediately. Loss means engine proof or no empty living slots after usable cores/offers/spread are exhausted (board-full bot loss; replacement escape may still exist). An unproven empty-slot stall is not a loss. Board use includes ALL map placeable slots, including dead land. All-seed threshold medians censor unreached thresholds as infinity. Stock pressure samples the T3–T7 payout transactions, against the current placement biome roster; positive stock against zero cost has infinite ratio. T7 requires ≥90% completion and EVERY completer below 60%, not only the median. False-loss audits check direct productive replacements and refund-funded unpaid base yields; they are a constructive check, not an exhaustive search of all future replacement sequences.

| Target | Result | Evidence |
|---|---|---|
| 1. Good play wins ≥90%; zero false loss | PASS | 50/50 combo wins; 0 detected false soft-locks |
| 2. Spam loses ≥90% | PASS | 46/50 spam losses before T8 |
| 3. Winning board use 65–85% | PASS | 69.47% median winning board use |
| 4. No opening stalls before T2 | PASS | zero combo opening stalls |
| 5. T3–T7 median stock ≤3× max cost | MISS | worst checkpoint/resource median stock/max-cost = ∞× |
| 6. T7 before 60% board use | MISS | 50/50 reach T7; median 59.43%, max 89.45% |

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n |
|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 50/50 | 2 | 2 (2–36), 48/50 |
| T2 | 21.5 | 21.5 (11–77), 50/50 | 42 | 41 (12–235), 48/50 |
| T3 | 45 | 45 (24–110), 50/50 | 127 | 110 (31–387), 47/50 |
| T4 | 103.5 | 103.5 (60–183), 50/50 | 284 | 265 (92–556), 45/50 |
| T5 | 178 | 178 (104–302), 50/50 | 428.5 | 396 (174–591), 42/50 |
| T6 | 303 | 303 (222–483), 50/50 | 557 | 511 (362–594), 33/50 |
| T7 | 359 | 359 (270–534), 50/50 | ∞ | 572 (454–621), 9/50 |
| T8 | 429 | 429 (334–579), 50/50 | ∞ | 606 (591–621), 2/50 |

| Combo stock checkpoint | Resource | Samples | Median held | Median max cost | Median held/max cost |
|---|---|---:|---:|---:|---:|
| T3 | wood | 50/50 | 79.5 | 2 | 38.75× |
| T3 | stone | 50/50 | 105.5 | 2 | 42.25× |
| T3 | water | 50/50 | 108.5 | 0 | ∞× |
| T3 | food | 50/50 | 84 | 0 | ∞× |
| T4 | wood | 50/50 | 218 | 2 | 96.5× |
| T4 | stone | 50/50 | 144 | 2 | 66.38× |
| T4 | water | 50/50 | 234 | 0 | ∞× |
| T4 | food | 50/50 | 230 | 0 | ∞× |
| T5 | wood | 50/50 | 402 | 2 | 174.5× |
| T5 | stone | 50/50 | 177.5 | 2 | 80.17× |
| T5 | water | 50/50 | 443 | 0 | ∞× |
| T5 | food | 50/50 | 432.5 | 0 | ∞× |
| T6 | wood | 50/50 | 986.5 | 2 | 374× |
| T6 | stone | 50/50 | 348 | 2 | 132.92× |
| T6 | water | 50/50 | 759.5 | 0 | ∞× |
| T6 | food | 50/50 | 798.5 | 0 | ∞× |
| T7 | wood | 50/50 | 1152.5 | 3 | 431.25× |
| T7 | stone | 50/50 | 452 | 2 | 190.5× |
| T7 | water | 50/50 | 917 | 0 | ∞× |
| T7 | food | 50/50 | 1008.5 | 0 | ∞× |

combo: 50 wins; 0 losses (0 board-full, 0 proven); 0 unproven stalls; 0 action-cap.

spam: 2 wins; 46 losses (46 board-full, 0 proven); 2 unproven stalls; 0 action-cap.

| Seed | Bot | Outcome / stop | Placements | Board use / map slots | T1–T8 placements | Opening stall | False loss | Legal core sites left | Final lifetime W/S/A/F | Final stock W/S/A/F |
|---|---|---|---:|---|---|---|---:|---:|---|---|
| 1 | spam | loss / board-full | 612 | 95.33% / 642 | 2 / 193 / 201 / 372 / — / — / — / — | no | 0 | 9 | 1964/1078/756/114 | 1305/9/588/105 |
| 1 | combo | win / won | 357 | 55.61% / 642 | 2 / 18 / 42 / 78 / 105 / 249 / 307 / 357 | no | 0 | 0 | 1660/1151/940/702 | 1258/590/827/675 |
| 2 | spam | loss / board-full | 633 | 99.53% / 636 | 2 / 204 / 209 / 522 / 579 / 580 / — / — | no | 0 | 0 | 2127/1195/803/158 | 1488/7/575/158 |
| 2 | combo | win / won | 425 | 66.82% / 636 | 3 / 16 / 42 / 65 / 171 / 300 / 365 / 425 | no | 0 | 0 | 2189/1154/1230/1226 | 1645/463/1078/1220 |
| 3 | spam | loss / board-full | 609 | 99.02% / 615 | 12 / 15 / 52 / 417 / 486 / 487 / — / — | no | 0 | 0 | 2088/1059/770/164 | 1395/0/530/155 |
| 3 | combo | win / won | 399 | 64.88% / 615 | 23 / 29 / 40 / 100 / 167 / 276 / 322 / 399 | no | 0 | 0 | 1647/1157/1024/911 | 1201/476/822/905 |
| 4 | spam | loss / board-full | 579 | 97.47% / 594 | 2 / 42 / 100 / 198 / 381 / — / — / — | no | 0 | 3 | 1581/672/1526/257 | 916/11/1418/254 |
| 4 | combo | win / won | 522 | 87.88% / 594 | 2 / 19 / 59 / 150 / 228 / 395 / 452 / 522 | no | 0 | 0 | 2507/1154/2124/1527 | 1858/407/2014/1515 |
| 5 | spam | win / won | 621 | 98.57% / 630 | 2 / 96 / 113 / 322 / 470 / 536 / 572 / 621 | no | 0 | 0 | 1327/1151/1589/275 | 771/7/1241/263 |
| 5 | combo | win / won | 484 | 76.83% / 630 | 2 / 44 / 65 / 130 / 249 / 381 / 429 / 484 | no | 0 | 0 | 1303/1293/1862/839 | 963/202/1498/836 |
| 6 | spam | loss / board-full | 630 | 98.59% / 639 | 2 / 13 / 47 / 225 / 510 / 511 / — / — | no | 0 | 0 | 1416/1392/963/129 | 915/105/645/120 |
| 6 | combo | win / won | 342 | 53.52% / 639 | 2 / 11 / 45 / 60 / 110 / 227 / 282 / 342 | no | 0 | 0 | 1478/1155/900/982 | 1082/490/696/973 |
| 7 | spam | loss / board-full | 612 | 98.55% / 621 | 2 / 19 / 53 / 174 / 309 / 559 / — / — | no | 0 | 0 | 1638/834/1370/167 | 974/6/1268/155 |
| 7 | combo | win / won | 504 | 81.16% / 621 | 3 / 13 / 40 / 153 / 249 / 358 / 429 / 504 | no | 0 | 0 | 2845/1150/1755/1400 | 2208/494/1656/1388 |
| 8 | spam | loss / board-full | 564 | 99.47% / 567 | 2 / 13 / 98 / 118 / 250 / 387 / 454 / — | no | 0 | 0 | 1608/999/771/282 | 914/108/689/279 |
| 8 | combo | win / won | 371 | 65.43% / 567 | 2 / 12 / 39 / 63 / 117 / 291 / 330 / 371 | no | 0 | 0 | 1795/1151/1166/1390 | 1253/682/1092/1387 |
| 9 | spam | loss / board-full | 567 | 97.42% / 582 | 2 / 56 / 63 / 92 / 289 / 516 / — / — | no | 0 | 0 | 1877/837/915/279 | 1113/11/831/276 |
| 9 | combo | win / won | 402 | 69.07% / 582 | 2 / 24 / 29 / 65 / 176 / 327 / 358 / 402 | no | 0 | 0 | 2195/1161/1133/1302 | 1574/678/1087/1302 |
| 10 | spam | loss / board-full | 594 | 99.5% / 597 | 2 / 37 / 63 / 304 / 359 / 566 / — / — | no | 0 | 0 | 1653/791/1176/148 | 1039/8/1002/133 |
| 10 | combo | win / won | 501 | 83.92% / 597 | 2 / 22 / 40 / 129 / 204 / 327 / 412 / 501 | no | 0 | 0 | 2336/1150/1601/1124 | 1752/345/1437/1088 |
| 11 | spam | loss / board-full | 627 | 100% / 627 | 2 / 33 / 95 / 171 / 270 / 478 / — / — | no | 0 | 0 | 1208/1119/1541/164 | 607/11/1237/134 |
| 11 | combo | win / won | 438 | 69.86% / 627 | 2 / 29 / 48 / 113 / 179 / 306 / 360 / 438 | no | 0 | 0 | 1856/1153/1351/1148 | 1337/332/1143/1097 |
| 12 | spam | loss / board-full | 180 | 29.13% / 618 | — / — / — / — / — / — / — / — | no | 0 | 138 | 1017/0/0/0 | 663/0/0/0 |
| 12 | combo | win / won | 389 | 62.94% / 618 | 33 / 36 / 43 / 79 / 140 / 273 / 330 / 389 | no | 0 | 0 | 2072/1150/1152/1184 | 1543/614/1064/1172 |
| 13 | spam | loss / board-full | 582 | 98.98% / 588 | 7 / 199 / 373 / 390 / 430 / 504 / — / — | no | 0 | 0 | 1232/1215/1239/198 | 866/6/909/198 |
| 13 | combo | win / won | 354 | 60.2% / 588 | 7 / 44 / 65 / 84 / 144 / 282 / 314 / 354 | no | 0 | 0 | 1594/1153/1048/947 | 1172/639/948/938 |
| 14 | spam | loss / board-full | 552 | 98.92% / 558 | 2 / 178 / 191 / 269 / 436 / 537 / — / — | no | 0 | 0 | 918/1461/1119/186 | 498/390/867/180 |
| 14 | combo | win / won | 403 | 72.22% / 558 | 2 / 33 / 45 / 99 / 182 / 222 / 270 / 403 | no | 0 | 0 | 1303/1695/1339/886 | 871/1008/1156/880 |
| 15 | spam | loss / board-full | 576 | 99.48% / 579 | 2 / 28 / 48 / 184 / 276 / 481 / — / — | no | 0 | 0 | 1232/892/1284/244 | 652/37/1128/232 |
| 15 | combo | win / won | 454 | 78.41% / 579 | 3 / 14 / 30 / 119 / 235 / 351 / 393 / 454 | no | 0 | 0 | 1627/1150/1692/1185 | 1129/464/1538/1173 |
| 16 | spam | loss / board-full | 585 | 99.49% / 588 | 2 / 199 / 355 / 392 / 434 / 553 / — / — | no | 0 | 0 | 981/1334/1266/176 | 570/114/954/176 |
| 16 | combo | win / won | 488 | 82.99% / 588 | 2 / 29 / 57 / 84 / 167 / 294 / 429 / 488 | no | 0 | 0 | 1303/1818/1668/1057 | 818/866/1387/1039 |
| 17 | spam | loss / board-full | 597 | 100% / 597 | 2 / 21 / 52 / 204 / 314 / 554 / — / — | no | 0 | 0 | 1947/819/1031/312 | 1166/11/892/309 |
| 17 | combo | win / won | 504 | 84.42% / 597 | 3 / 13 / 47 / 147 / 268 / 391 / 444 / 504 | no | 0 | 0 | 2961/1152/1525/1823 | 2215/388/1384/1811 |
| 18 | spam | win / won | 591 | 94.71% / 624 | 2 / 14 / 45 / 108 / 268 / 413 / 469 / 591 | no | 0 | 0 | 1490/1157/1014/380 | 866/12/738/362 |
| 18 | combo | win / won | 420 | 67.31% / 624 | 2 / 13 / 26 / 60 / 177 / 298 / 350 / 420 | no | 0 | 0 | 1971/1150/1063/1355 | 1403/481/899/1337 |
| 19 | spam | loss / board-full | 642 | 100% / 642 | 2 / 33 / 56 / 133 / 199 / 422 / 561 / — | no | 0 | 0 | 2278/1061/778/331 | 1556/10/592/313 |
| 19 | combo | win / won | 426 | 66.36% / 642 | 2 / 31 / 50 / 75 / 159 / 321 / 357 / 426 | no | 0 | 0 | 2452/1151/904/1367 | 1870/498/772/1352 |
| 20 | spam | loss / board-full | 621 | 98.1% / 633 | 9 / 12 / 80 / 141 / 174 / 440 / — / — | no | 0 | 0 | 2058/1152/612/231 | 1359/168/516/222 |
| 20 | combo | win / won | 378 | 59.72% / 633 | 8 / 12 / 33 / 98 / 122 / 259 / 321 / 378 | no | 0 | 0 | 2012/1263/853/1059 | 1518/691/735/1050 |
| 21 | spam | loss / board-full | 567 | 97.93% / 579 | 18 / 39 / 69 / 400 / 484 / — / — / — | no | 0 | 0 | 1646/659/1029/220 | 951/10/819/211 |
| 21 | combo | win / won | 554 | 95.68% / 579 | 25 / 42 / 69 / 155 / 238 / 402 / 476 / 554 | no | 0 | 0 | 2901/1152/1644/1655 | 2193/224/1420/1616 |
| 22 | spam | loss / board-full | 606 | 98.06% / 618 | 2 / 26 / 43 / 167 / 447 / — / — / — | no | 0 | 0 | 2689/683/354/197 | 1831/5/348/197 |
| 22 | combo | win / won | 495 | 80.1% / 618 | 3 / 12 / 34 / 122 / 241 / 348 / 420 / 495 | no | 0 | 0 | 3808/1153/936/1750 | 2983/653/928/1741 |
| 23 | spam | stuck / stuck | 6 | 0.91% / 657 | — / — / — / — / — / — / — / — | yes | 0 | 150 | 0/0/48/3 | 0/0/48/3 |
| 23 | combo | win / won | 351 | 53.42% / 657 | 8 / 15 / 35 / 63 / 123 / 254 / 306 / 351 | no | 0 | 0 | 1724/1153/945/1175 | 1185/729/874/1163 |
| 24 | spam | loss / board-full | 597 | 98.51% / 606 | 2 / 39 / 64 / 164 / 417 / — / — / — | no | 0 | 1 | 2512/614/509/283 | 1614/5/509/283 |
| 24 | combo | win / won | 497 | 82.01% / 606 | 2 / 21 / 45 / 128 / 246 / 368 / 429 / 497 | no | 0 | 0 | 3711/1152/1139/1945 | 2811/664/1130/1942 |
| 25 | spam | loss / board-full | 594 | 98.51% / 603 | 21 / 27 / 46 / 153 / 507 / 551 / — / — | no | 0 | 0 | 1032/1461/1206/159 | 675/216/864/153 |
| 25 | combo | win / won | 405 | 67.16% / 603 | 30 / 42 / 56 / 80 / 147 / 228 / 342 / 405 | no | 0 | 0 | 1306/1537/1326/682 | 1019/679/1059/676 |
| 26 | spam | loss / board-full | 612 | 99.03% / 618 | 2 / 42 / 49 / 141 / 238 / — / — / — | no | 0 | 0 | 2327/915/459/261 | 1546/8/399/237 |
| 26 | combo | win / won | 417 | 67.48% / 618 | 2 / 27 / 48 / 105 / 179 / 284 / 339 / 417 | no | 0 | 0 | 2348/1287/851/1318 | 1691/753/776/1288 |
| 27 | spam | loss / board-full | 597 | 100% / 597 | 2 / 30 / 51 / 194 / 313 / 501 / — / — | no | 0 | 0 | 1787/899/1106/385 | 1178/0/962/382 |
| 27 | combo | win / won | 465 | 77.89% / 597 | 3 / 29 / 51 / 135 / 237 / 360 / 407 / 465 | no | 0 | 0 | 2335/1156/1502/1473 | 1755/449/1351/1464 |
| 28 | spam | loss / board-full | 594 | 99% / 600 | 2 / 199 / 240 / 265 / 407 / 562 / — / — | no | 0 | 0 | 980/1497/969/249 | 430/460/699/249 |
| 28 | combo | win / won | 351 | 58.5% / 600 | 2 / 15 / 42 / 87 / 104 / 252 / 303 / 351 | no | 0 | 0 | 1324/1153/921/761 | 963/545/765/740 |
| 29 | spam | loss / board-full | 627 | 100% / 627 | 12 / 15 / 108 / 238 / 392 / 555 / 595 / — | no | 0 | 0 | 1182/1274/1359/247 | 667/36/1029/235 |
| 29 | combo | win / won | 461 | 73.52% / 627 | 12 / 15 / 24 / 147 / 194 / 378 / 410 / 461 | no | 0 | 0 | 1303/1609/1668/939 | 870/728/1394/927 |
| 30 | spam | loss / board-full | 570 | 98.96% / 576 | 2 / 49 / 201 / 283 / 338 / 483 / — / — | no | 0 | 2 | 1212/1069/1136/194 | 820/10/908/194 |
| 30 | combo | win / won | 423 | 73.44% / 576 | 3 / 12 / 26 / 78 / 153 / 280 / 351 / 423 | no | 0 | 1 | 1633/1158/1579/838 | 1257/457/1417/832 |
| 31 | spam | loss / board-full | 609 | 99.02% / 615 | 2 / 57 / 238 / 436 / 515 / 594 / — / — | no | 0 | 0 | 915/1437/1150/252 | 571/230/814/252 |
| 31 | combo | win / won | 464 | 75.45% / 615 | 2 / 33 / 57 / 114 / 222 / 378 / 419 / 464 | no | 0 | 0 | 1304/1932/1523/956 | 879/1048/1221/947 |
| 32 | spam | loss / board-full | 624 | 100% / 624 | 2 / 205 / 387 / 556 / 583 / — / — / — | no | 0 | 0 | 724/1887/1295/126 | 365/444/821/126 |
| 32 | combo | win / won | 334 | 53.53% / 624 | 3 / 21 / 54 / 170 / 191 / 231 / 285 / 334 | no | 0 | 0 | 1431/1154/899/814 | 1052/590/756/796 |
| 33 | spam | loss / board-full | 585 | 100% / 585 | 2 / 17 / 286 / 310 / 322 / 529 / — / — | no | 0 | 0 | 2081/835/787/382 | 1289/5/727/376 |
| 33 | combo | win / won | 455 | 77.78% / 585 | 3 / 12 / 84 / 108 / 192 / 369 / 416 / 455 | no | 0 | 0 | 2756/1156/1337/1538 | 2049/578/1295/1532 |
| 34 | spam | loss / board-full | 615 | 97.62% / 630 | 2 / 112 / 261 / 380 / 470 / 561 / 606 / — | no | 0 | 0 | 1088/1407/1024/226 | 735/303/820/226 |
| 34 | combo | win / won | 456 | 72.38% / 630 | 2 / 32 / 60 / 167 / 243 / 393 / 421 / 456 | no | 0 | 0 | 1300/2178/1638/1184 | 770/1509/1470/1184 |
| 35 | spam | stuck / stuck | 546 | 94.79% / 576 | 2 / 21 / 31 / 138 / 236 / — / — / — | no | 0 | 2 | 2052/769/504/194 | 1331/0/420/185 |
| 35 | combo | win / won | 440 | 76.39% / 576 | 2 / 20 / 30 / 76 / 165 / 306 / 357 / 440 | no | 0 | 0 | 2850/1154/969/1709 | 2207/562/869/1700 |
| 36 | spam | loss / board-full | 591 | 98.5% / 600 | 2 / 193 / 205 / 285 / 400 / 485 / — / — | no | 0 | 0 | 1318/1071/1289/194 | 887/11/1097/194 |
| 36 | combo | win / won | 400 | 66.67% / 600 | 3 / 18 / 35 / 92 / 168 / 294 / 357 / 400 | no | 0 | 0 | 1305/1269/1633/933 | 961/557/1450/930 |
| 37 | spam | loss / board-full | 618 | 100% / 618 | 5 / 213 / 224 / 248 / 282 / 362 / 555 / — | no | 0 | 0 | 2117/1018/792/306 | 1378/2/654/303 |
| 37 | combo | win / won | 429 | 69.42% / 618 | 5 / 24 / 47 / 63 / 150 / 291 / 360 / 429 | no | 0 | 0 | 3005/1154/917/1581 | 2303/637/858/1578 |
| 38 | spam | loss / board-full | 663 | 94.85% / 699 | 36 / 40 / 310 / 513 / — / — / — / — | no | 0 | 9 | 1899/1419/417/117 | 1164/246/219/105 |
| 38 | combo | win / won | 411 | 58.8% / 699 | 21 / 24 / 33 / 83 / 124 / 273 / 333 / 411 | no | 0 | 1 | 2032/1408/852/938 | 1526/577/569/920 |
| 39 | spam | loss / board-full | 522 | 81.69% / 639 | 12 / 16 / 97 / — / — / — / — / — | no | 0 | 23 | 1686/976/428/59 | 1121/11/320/35 |
| 39 | combo | win / won | 429 | 67.14% / 639 | 17 / 21 / 44 / 74 / 151 / 282 / 336 / 429 | no | 0 | 0 | 3074/1153/942/1361 | 2304/738/923/1352 |
| 40 | spam | loss / board-full | 654 | 99.54% / 657 | 2 / 235 / 277 / 358 / 427 / 509 / — / — | no | 0 | 1 | 1548/1329/1047/213 | 1272/0/747/213 |
| 40 | combo | win / won | 443 | 67.43% / 657 | 2 / 72 / 110 / 180 / 280 / 372 / 390 / 443 | no | 0 | 0 | 1301/1976/1397/746 | 883/1128/1111/746 |
| 41 | spam | loss / board-full | 579 | 96.98% / 597 | 2 / 190 / 364 / 484 / — / — / — / — | no | 0 | 5 | 434/1586/1524/171 | 238/365/1170/171 |
| 41 | combo | win / won | 571 | 95.64% / 597 | 2 / 24 / 59 / 141 / 302 / 483 / 534 / 571 | no | 0 | 0 | 1300/2603/2336/1171 | 872/1556/2034/1171 |
| 42 | spam | loss / board-full | 603 | 99.01% / 609 | 2 / 213 / 224 / 294 / 483 / 568 / — / — | no | 0 | 0 | 1003/1722/1008/210 | 487/564/720/198 |
| 42 | combo | win / won | 366 | 60.1% / 609 | 2 / 50 / 62 / 102 / 150 / 252 / 303 / 366 | no | 0 | 0 | 1311/1705/1141/764 | 922/1112/1013/743 |
| 43 | spam | loss / board-full | 624 | 100% / 624 | 2 / 14 / 60 / 174 / 271 / 506 / 573 / — | no | 0 | 0 | 1768/1003/1499/347 | 1179/8/1235/344 |
| 43 | combo | win / won | 488 | 78.21% / 624 | 2 / 12 / 39 / 102 / 193 / 330 / 411 / 488 | no | 0 | 0 | 2338/1151/1739/1331 | 1779/307/1532/1325 |
| 44 | spam | loss / board-full | 585 | 89.45% / 654 | 2 / 54 / 234 / — / — / — / — / — | no | 0 | 17 | 1752/1155/495/42 | 1242/21/261/30 |
| 44 | combo | win / won | 408 | 62.39% / 654 | 3 / 20 / 42 / 105 / 122 / 269 / 348 / 408 | no | 0 | 0 | 2070/1593/852/1241 | 1473/1034/745/1214 |
| 45 | spam | loss / board-full | 630 | 96.77% / 651 | 2 / 214 / 226 / 252 / 322 / 409 / 621 / — | no | 0 | 1 | 1815/1188/925/223 | 1198/10/655/217 |
| 45 | combo | win / won | 384 | 58.99% / 651 | 3 / 24 / 41 / 63 / 135 / 272 / 330 / 384 | no | 0 | 1 | 1755/1150/1036/983 | 1289/512/898/965 |
| 46 | spam | loss / board-full | 492 | 75.58% / 651 | 2 / 20 / — / — / — / — / — / — | no | 0 | 43 | 1533/1182/0/42 | 861/342/0/42 |
| 46 | combo | win / won | 472 | 72.5% / 651 | 2 / 18 / 87 / 164 / 192 / 378 / 411 / 472 | no | 0 | 0 | 3091/1374/855/1714 | 2340/705/723/1699 |
| 47 | spam | loss / board-full | 642 | 98.62% / 651 | 2 / 212 / 251 / 303 / 339 / 410 / — / — | no | 0 | 0 | 1653/1299/849/183 | 1111/77/639/183 |
| 47 | combo | win / won | 400 | 61.44% / 651 | 3 / 44 / 59 / 105 / 139 / 281 / 336 / 400 | no | 0 | 0 | 1775/1381/850/945 | 1305/624/687/927 |
| 48 | spam | loss / board-full | 627 | 99.52% / 630 | 2 / 204 / 267 / 368 / 591 / 592 / — / — | no | 0 | 1 | 1423/1279/1090/130 | 1142/60/868/130 |
| 48 | combo | win / won | 438 | 69.52% / 630 | 2 / 77 / 104 / 171 / 192 / 387 / 413 / 438 | no | 0 | 0 | 1305/1995/1656/893 | 855/1213/1425/893 |
| 49 | spam | loss / board-full | 645 | 99.54% / 648 | 2 / 97 / 141 / 219 / 509 / — / — / — | no | 0 | 0 | 2233/621/909/252 | 1344/10/811/252 |
| 49 | combo | win / won | 567 | 87.5% / 648 | 2 / 48 / 74 / 144 / 252 / 405 / 483 / 567 | no | 0 | 0 | 3442/1150/1476/1963 | 2576/387/1367/1936 |
| 50 | spam | loss / board-full | 630 | 100% / 630 | 2 / 37 / 110 / 478 / 563 / — / — / — | no | 0 | 0 | 3060/456/402/387 | 2014/6/390/381 |
| 50 | combo | win / won | 579 | 91.9% / 630 | 2 / 20 / 48 / 183 / 285 / 444 / 510 / 579 | no | 0 | 0 | 5046/1157/1045/2891 | 3903/583/1027/2885 |

Per-run checkpoint vectors below use **wood/stone/water/food**; each cell is `held : max cost (biome)`. The JSON retains unrounded values, lifetime totals, and living-slot fill at every threshold.

| Seed | Bot | T3 stock : cost | T4 stock : cost | T5 stock : cost | T6 stock : cost | T7 stock : cost |
|---|---|---|---|---|---|---|
| 1 | spam | 45/189/387/42 : 3/2/0/0 (forest) | 585/186/420/87 : 2/2/0/0 (arctic) | — | — | — |
| 1 | combo | 81/190/120/2 : 2/2/0/0 (arctic) | 242/237/157/93 : 2/3/1/0 (taiga) | 342/287/190/152 : 2/2/0/0 (arctic) | 1012/398/552/544 : 3/2/0/1 (steppe) | 1136/485/734/621 : 3/2/0/1 (steppe) |
| 2 | spam | 44/135/347/23 : 3/2/0/0 (forest) | 1090/9/391/91 : 2/2/0/0 (arctic) | 1234/5/537/120 : 2/2/0/0 (arctic) | 1238/3/537/120 : 2/2/0/0 (arctic) | — |
| 2 | combo | 219/55/108/82 : 2/3/1/0 (taiga) | 255/192/140/90 : 3/2/0/0 (forest) | 597/138/573/438 : 2/4/2/0 (desert) | 1013/259/769/882 : 3/2/0/0 (forest) | 1335/303/905/1120 : 3/2/0/0 (forest) |
| 3 | spam | 47/136/90/12 : 3/2/0/0 (forest) | 795/4/380/83 : 3/2/0/0 (forest) | 1024/4/468/111 : 3/2/0/0 (forest) | 1021/9/468/113 : 3/2/1/0 (polarDesert) | — |
| 3 | combo | 228/90/40/71 : 2/2/0/0 (arctic) | 500/119/174/252 : 3/2/0/0 (forest) | 603/153/374/384 : 2/2/0/0 (arctic) | 679/232/583/506 : 3/2/1/0 (polarDesert) | 779/310/685/584 : 2/2/0/0 (arctic) |
| 4 | spam | 91/4/472/40 : 2/2/0/0 (arctic) | 118/6/817/142 : 2/2/0/0 (arctic) | 679/4/1072/231 : 2/2/0/0 (arctic) | — | — |
| 4 | combo | 66/36/460/135 : 2/4/2/0 (desert) | 162/12/886/411 : 2/2/0/0 (arctic) | 620/64/1064/742 : 3/2/0/0 (forest) | 1597/260/1536/1349 : 2/2/0/0 (arctic) | 1729/334/1761/1444 : 2/2/0/0 (arctic) |
| 5 | spam | 32/0/441/48 : 2/3/1/0 (taiga) | 28/27/867/135 : 3/2/0/1 (steppe) | 126/0/1114/196 : 3/2/0/0 (forest) | 419/1/1171/238 : 3/2/0/0 (forest) | 550/2/1225/250 : 3/2/0/0 (forest) |
| 5 | combo | 56/21/404/147 : 3/2/0/0 (forest) | 157/2/674/261 : 3/2/0/0 (forest) | 315/10/913/367 : 2/2/0/0 (arctic) | 596/132/1159/619 : 3/2/0/1 (steppe) | 758/186/1348/690 : 3/2/0/0 (forest) |
| 6 | spam | 79/145/40/0 : 2/2/0/0 (arctic) | 309/156/294/81 : 3/2/1/0 (polarDesert) | 510/330/537/111 : 2/2/0/0 (arctic) | 514/328/537/111 : 3/2/0/0 (forest) | — |
| 6 | combo | 174/171/44/101 : 2/2/0/0 (arctic) | 180/222/130/126 : 2/2/0/0 (arctic) | 321/328/261/248 : 3/2/0/0 (forest) | 741/313/445/572 : 2/4/2/0 (desert) | 856/377/580/760 : 3/2/1/0 (polarDesert) |
| 7 | spam | 46/74/183/44 : 3/2/0/0 (forest) | 196/6/562/102 : 2/4/2/0 (desert) | 505/6/664/123 : 2/4/2/0 (desert) | 738/4/1250/137 : 2/2/0/0 (arctic) | — |
| 7 | combo | 154/55/153/54 : 2/2/0/0 (arctic) | 693/28/542/393 : 2/4/2/0 (desert) | 1271/49/723/645 : 2/3/1/0 (taiga) | 1653/279/1082/964 : 2/2/0/0 (arctic) | 1935/370/1374/1155 : 3/2/0/1 (steppe) |
| 8 | spam | 318/7/38/80 : 2/4/2/0 (desert) | 288/23/152/98 : 3/2/1/0 (polarDesert) | 506/23/326/175 : 3/2/1/0 (polarDesert) | 521/162/620/231 : 3/2/0/0 (forest) | 569/225/653/246 : 3/2/0/0 (forest) |
| 8 | combo | 194/92/44/140 : 2/4/2/0 (desert) | 158/146/177/247 : 3/2/1/0 (polarDesert) | 313/246/329/466 : 3/2/0/0 (forest) | 1083/446/886/1188 : 2/2/0/0 (arctic) | 1169/550/994/1288 : 3/2/0/1 (steppe) |
| 9 | spam | 63/180/126/18 : 3/2/0/0 (forest) | 150/135/162/94 : 3/2/0/0 (forest) | 584/5/570/249 : 3/2/1/0 (polarDesert) | 970/5/819/263 : 2/2/0/0 (arctic) | — |
| 9 | combo | 78/132/52/18 : 3/2/0/0 (forest) | 272/132/131/122 : 2/4/2/0 (desert) | 707/152/510/538 : 2/2/0/0 (arctic) | 1417/374/860/1125 : 3/2/1/0 (polarDesert) | 1453/522/965/1215 : 2/2/0/0 (arctic) |
| 10 | spam | 69/6/229/18 : 2/4/2/0 (desert) | 398/5/524/75 : 2/2/0/0 (arctic) | 428/7/800/105 : 2/2/0/0 (arctic) | 931/4/996/127 : 2/2/0/0 (arctic) | — |
| 10 | combo | 78/50/210/76 : 3/2/0/1 (steppe) | 351/9/438/275 : 2/4/2/0 (desert) | 341/14/840/420 : 2/4/2/0 (desert) | 709/130/1130/576 : 2/3/1/0 (taiga) | 1245/225/1289/836 : 3/2/0/1 (steppe) |
| 11 | spam | 62/44/204/54 : 3/2/0/0 (forest) | 134/4/614/95 : 3/2/0/0 (forest) | 223/3/793/121 : 3/2/0/0 (forest) | 519/4/1027/127 : 2/2/0/0 (arctic) | — |
| 11 | combo | 83/100/140/40 : 2/4/2/0 (desert) | 138/93/590/218 : 3/2/0/1 (steppe) | 277/139/734/421 : 3/2/0/0 (forest) | 787/151/884/770 : 3/2/0/0 (forest) | 1020/260/993/909 : 3/2/0/0 (forest) |
| 12 | spam | — | — | — | — | — |
| 12 | combo | 251/52/45/103 : 2/2/0/0 (arctic) | 263/140/222/181 : 2/2/0/0 (arctic) | 477/213/410/325 : 2/2/0/0 (arctic) | 1149/391/750/834 : 2/3/1/0 (taiga) | 1360/507/929/1020 : 3/2/0/0 (forest) |
| 13 | spam | 6/160/804/92 : 2/2/0/0 (arctic) | 111/138/804/92 : 3/2/0/0 (forest) | 252/112/819/152 : 2/3/1/0 (taiga) | 530/6/873/162 : 3/2/0/0 (forest) | — |
| 13 | combo | 64/191/294/89 : 2/4/2/0 (desert) | 171/180/351/124 : 3/2/0/0 (forest) | 468/206/435/368 : 3/2/1/0 (polarDesert) | 1024/391/771/773 : 2/3/1/0 (taiga) | 1104/526/857/872 : 2/4/2/0 (desert) |
| 14 | spam | 41/284/270/40 : 2/3/1/0 (taiga) | 103/335/555/102 : 3/2/0/0 (forest) | 118/535/825/168 : 3/2/0/0 (forest) | 432/420/867/180 : 2/2/0/0 (arctic) | — |
| 14 | combo | 67/149/153/86 : 3/2/0/0 (forest) | 152/314/388/154 : 3/2/0/0 (forest) | 260/574/686/374 : 3/2/0/0 (forest) | 577/574/743/557 : 3/2/0/0 (forest) | 709/654/808/696 : 2/4/2/0 (desert) |
| 15 | spam | 45/60/81/54 : 3/2/0/0 (forest) | 122/9/606/137 : 3/2/0/0 (forest) | 254/6/864/171 : 3/2/1/0 (polarDesert) | 272/227/1128/232 : 2/2/0/0 (arctic) | — |
| 15 | combo | 75/79/70/60 : 3/2/0/0 (forest) | 392/69/505/257 : 2/4/2/0 (desert) | 562/10/1069/487 : 2/4/2/0 (desert) | 877/220/1430/897 : 2/4/2/0 (desert) | 983/324/1474/999 : 3/2/1/0 (polarDesert) |
| 16 | spam | 4/345/609/65 : 2/2/0/0 (arctic) | 188/271/609/90 : 3/2/0/0 (forest) | 236/192/807/138 : 2/3/1/0 (taiga) | 442/178/954/176 : 2/2/0/0 (arctic) | — |
| 16 | combo | 57/312/96/48 : 2/4/2/0 (desert) | 159/312/188/140 : 3/2/0/0 (forest) | 268/299/574/368 : 3/2/0/0 (forest) | 544/369/881/676 : 2/4/2/0 (desert) | 673/650/1213/830 : 3/2/0/1 (steppe) |
| 17 | spam | 76/23/204/27 : 2/2/0/0 (arctic) | 486/6/312/153 : 2/2/0/0 (arctic) | 456/3/763/247 : 2/4/2/0 (desert) | 965/8/866/283 : 2/2/0/0 (arctic) | — |
| 17 | combo | 186/40/196/114 : 2/2/0/0 (arctic) | 662/10/363/523 : 3/2/0/1 (steppe) | 1159/7/882/1020 : 3/2/1/0 (polarDesert) | 1583/99/1146/1405 : 2/4/2/0 (desert) | 1893/217/1305/1648 : 2/2/0/0 (arctic) |
| 18 | spam | 120/9/45/42 : 2/4/2/0 (desert) | 213/54/99/90 : 2/2/0/0 (arctic) | 510/6/417/227 : 2/2/0/0 (arctic) | 632/4/476/277 : 2/4/2/0 (desert) | 644/6/521/284 : 2/4/2/0 (desert) |
| 18 | combo | 77/78/40/97 : 2/2/0/0 (arctic) | 164/183/115/228 : 3/2/0/0 (forest) | 693/145/401/619 : 2/2/0/0 (arctic) | 1146/330/599/1094 : 3/2/0/1 (steppe) | 1329/406/671/1194 : 3/2/0/0 (forest) |
| 19 | spam | 65/92/128/47 : 3/2/0/1 (steppe) | 327/4/219/166 : 2/4/2/0 (desert) | 379/31/336/225 : 2/4/2/0 (desert) | 947/16/458/270 : 2/4/2/0 (desert) | 1218/4/562/283 : 2/4/2/0 (desert) |
| 19 | combo | 69/118/131/117 : 3/2/0/1 (steppe) | 180/112/198/231 : 3/2/0/0 (forest) | 614/155/275/505 : 2/4/2/0 (desert) | 1343/226/588/1000 : 2/2/0/0 (arctic) | 1495/348/633/1090 : 3/2/0/1 (steppe) |
| 20 | spam | 46/242/144/48 : 3/2/0/0 (forest) | 144/363/192/90 : 2/2/0/0 (arctic) | 270/342/228/120 : 2/3/1/0 (taiga) | 700/412/456/186 : 2/2/0/0 (arctic) | — |
| 20 | combo | 78/143/75/52 : 2/4/2/0 (desert) | 163/368/230/150 : 2/2/0/0 (arctic) | 326/372/265/250 : 2/3/1/0 (taiga) | 1080/497/500/710 : 2/4/2/0 (desert) | 1251/554/595/831 : 3/2/0/0 (forest) |
| 21 | spam | 77/4/271/45 : 3/2/0/1 (steppe) | 957/3/490/175 : 2/4/2/0 (desert) | 927/3/758/198 : 2/4/2/0 (desert) | — | — |
| 21 | combo | 287/10/267/158 : 2/4/2/0 (desert) | 636/11/455/455 : 3/2/0/0 (forest) | 737/17/817/650 : 2/4/2/0 (desert) | 1625/147/1138/1251 : 3/2/0/0 (forest) | 2007/211/1278/1515 : 3/2/0/1 (steppe) |
| 22 | spam | 55/97/72/25 : 3/2/0/0 (forest) | 486/0/174/90 : 3/2/0/0 (forest) | 1371/0/204/157 : 2/2/0/0 (arctic) | — | — |
| 22 | combo | 114/61/90/129 : 3/2/0/0 (forest) | 634/103/224/480 : 2/2/0/0 (arctic) | 1490/139/354/920 : 2/2/0/0 (arctic) | 1926/386/658/1195 : 2/3/1/0 (taiga) | 2450/504/816/1492 : 3/2/0/0 (forest) |
| 23 | spam | — | — | — | — | — |
| 23 | combo | 60/129/107/73 : 2/2/0/0 (arctic) | 146/263/121/174 : 2/2/0/0 (arctic) | 445/295/191/427 : 3/2/0/1 (steppe) | 716/399/626/763 : 2/2/0/0 (arctic) | 1064/536/751/1006 : 3/2/0/0 (forest) |
| 24 | spam | 38/130/183/12 : 3/2/0/0 (forest) | 411/4/225/90 : 3/2/0/0 (forest) | 1034/4/375/235 : 2/2/0/0 (arctic) | — | — |
| 24 | combo | 52/111/193/108 : 3/2/0/0 (forest) | 681/95/253/575 : 2/2/0/0 (arctic) | 1351/129/537/999 : 2/2/0/0 (arctic) | 2168/378/750/1588 : 2/2/0/0 (arctic) | 2525/506/934/1781 : 3/2/0/0 (forest) |
| 25 | spam | 81/42/169/19 : 2/4/2/0 (desert) | 174/183/354/90 : 3/2/0/0 (forest) | 411/288/858/117 : 3/2/1/0 (polarDesert) | 496/302/864/131 : 2/2/0/0 (arctic) | — |
| 25 | combo | 266/34/182/103 : 2/4/2/0 (desert) | 300/128/276/112 : 2/4/2/0 (desert) | 356/350/435/188 : 2/3/1/0 (taiga) | 688/343/602/426 : 2/4/2/0 (desert) | 821/507/901/533 : 3/2/0/1 (steppe) |
| 26 | spam | 83/81/30/30 : 2/3/1/0 (taiga) | 403/5/113/147 : 3/2/1/0 (polarDesert) | 542/44/205/194 : 3/2/1/0 (polarDesert) | — | — |
| 26 | combo | 115/162/28/51 : 2/3/1/0 (taiga) | 509/112/111/273 : 3/2/0/0 (forest) | 967/164/197/601 : 2/2/0/0 (arctic) | 1095/550/506/964 : 2/4/2/0 (desert) | 1267/657/622/1038 : 2/4/2/0 (desert) |
| 27 | spam | 79/32/162/55 : 2/2/0/0 (arctic) | 317/6/468/154 : 2/2/0/0 (arctic) | 491/6/566/264 : 2/2/0/0 (arctic) | 746/12/914/334 : 2/2/0/0 (arctic) | — |
| 27 | combo | 240/47/168/151 : 2/2/0/0 (arctic) | 601/57/489/558 : 3/2/0/0 (forest) | 1065/55/688/941 : 3/2/0/0 (forest) | 1505/275/1123/1333 : 3/2/1/0 (polarDesert) | 1565/324/1231/1379 : 2/2/0/0 (arctic) |
| 28 | spam | 4/201/351/98 : 2/2/0/0 (arctic) | 96/154/351/149 : 3/2/0/0 (forest) | 48/489/588/215 : 3/2/0/0 (forest) | 302/524/699/249 : 2/2/0/0 (arctic) | — |
| 28 | combo | 66/193/57/32 : 2/2/0/0 (arctic) | 306/251/104/222 : 2/4/2/0 (desert) | 320/308/182/262 : 3/2/1/0 (polarDesert) | 751/318/549/648 : 2/4/2/0 (desert) | 839/382/682/678 : 2/2/0/0 (arctic) |
| 29 | spam | 81/84/279/96 : 3/2/0/0 (forest) | 123/1/674/169 : 2/2/0/0 (arctic) | 186/114/930/190 : 2/3/1/0 (taiga) | 364/180/1029/214 : 3/2/0/0 (forest) | 537/100/1029/229 : 2/2/0/0 (arctic) |
| 29 | combo | 81/62/35/65 : 2/4/2/0 (desert) | 150/170/698/271 : 2/2/0/0 (arctic) | 277/270/806/445 : 3/2/0/0 (forest) | 534/547/1239/732 : 3/2/0/1 (steppe) | 682/597/1285/769 : 2/3/1/0 (taiga) |
| 30 | spam | 30/124/287/75 : 3/2/0/0 (forest) | 111/156/580/138 : 3/2/0/0 (forest) | 247/55/715/169 : 3/2/0/0 (forest) | 468/144/904/187 : 2/2/0/0 (arctic) | — |
| 30 | combo | 74/96/47/55 : 2/2/0/0 (arctic) | 226/135/386/124 : 2/4/2/0 (desert) | 331/235/665/295 : 2/3/1/0 (taiga) | 690/218/941/494 : 2/4/2/0 (desert) | 858/308/1216/677 : 3/2/1/0 (polarDesert) |
| 31 | spam | 4/261/243/50 : 2/2/0/0 (arctic) | 4/426/684/198 : 2/2/0/0 (arctic) | 180/364/814/249 : 2/2/0/0 (arctic) | 508/260/814/249 : 2/2/0/0 (arctic) | — |
| 31 | combo | 26/374/49/101 : 2/2/0/0 (arctic) | 134/484/306/240 : 3/2/1/0 (polarDesert) | 242/721/753/575 : 2/2/0/0 (arctic) | 538/964/1072/797 : 2/3/1/0 (taiga) | 685/1036/1142/834 : 3/2/0/1 (steppe) |
| 32 | spam | 5/383/537/55 : 2/2/0/0 (arctic) | 9/580/821/96 : 2/2/0/0 (arctic) | 174/526/821/120 : 3/2/0/0 (forest) | — | — |
| 32 | combo | 54/281/109/73 : 3/2/1/0 (polarDesert) | 150/456/439/216 : 2/4/2/0 (desert) | 320/441/451/305 : 3/2/0/0 (forest) | 636/427/494/471 : 2/3/1/0 (taiga) | 930/458/562/655 : 2/4/2/0 (desert) |
| 33 | spam | 852/2/41/204 : 3/2/0/0 (forest) | 852/56/110/222 : 2/4/2/0 (desert) | 849/26/191/243 : 2/3/1/0 (taiga) | 1047/5/711/351 : 2/2/0/0 (arctic) | — |
| 33 | combo | 502/63/43/404 : 2/3/1/0 (taiga) | 522/141/113/471 : 3/2/1/0 (polarDesert) | 862/119/348/714 : 2/3/1/0 (taiga) | 1687/248/965/1329 : 2/2/0/0 (arctic) | 1979/385/1067/1446 : 2/4/2/0 (desert) |
| 34 | spam | 4/361/467/101 : 2/2/0/0 (arctic) | 5/578/727/172 : 2/2/0/0 (arctic) | 164/563/790/214 : 2/2/0/0 (arctic) | 528/393/790/214 : 2/2/0/0 (arctic) | 699/321/820/226 : 2/2/0/0 (arctic) |
| 34 | combo | 25/275/198/126 : 2/2/0/0 (arctic) | 23/631/732/454 : 2/2/0/0 (arctic) | 134/1027/989/664 : 2/2/0/0 (arctic) | 395/1425/1333/1049 : 2/2/0/0 (arctic) | 556/1399/1392/1100 : 2/3/1/0 (taiga) |
| 35 | spam | 90/48/42/18 : 2/4/2/0 (desert) | 414/6/120/90 : 2/4/2/0 (desert) | 611/7/297/153 : 3/2/0/0 (forest) | — | — |
| 35 | combo | 143/68/48/95 : 3/2/0/0 (forest) | 331/158/117/230 : 2/4/2/0 (desert) | 850/182/278/653 : 3/2/0/0 (forest) | 1415/344/607/1100 : 2/4/2/0 (desert) | 1670/446/717/1283 : 3/2/0/0 (forest) |
| 36 | spam | 40/235/462/43 : 3/2/0/0 (forest) | 163/158/666/90 : 3/2/1/0 (polarDesert) | 151/226/1029/178 : 3/2/0/0 (forest) | 436/125/1083/180 : 2/2/0/0 (arctic) | — |
| 36 | combo | 95/90/165/18 : 2/4/2/0 (desert) | 258/138/400/90 : 2/4/2/0 (desert) | 351/74/803/323 : 3/2/0/0 (forest) | 703/169/1141/554 : 2/4/2/0 (desert) | 791/413/1331/770 : 2/3/1/0 (taiga) |
| 37 | spam | 41/215/587/70 : 3/2/0/0 (forest) | 137/215/587/100 : 3/2/0/0 (forest) | 280/150/587/155 : 3/2/0/0 (forest) | 527/122/605/236 : 3/2/0/0 (forest) | 1130/6/634/265 : 2/2/0/0 (arctic) |
| 37 | combo | 81/142/161/41 : 2/4/2/0 (desert) | 206/138/179/94 : 2/3/1/0 (taiga) | 684/173/297/446 : 2/3/1/0 (taiga) | 1507/393/547/1016 : 3/2/0/0 (forest) | 1933/489/689/1337 : 3/2/0/0 (forest) |
| 38 | spam | 524/296/18/66 : 2/4/2/0 (desert) | 780/375/162/78 : 2/2/0/0 (arctic) | — | — | — |
| 38 | combo | 175/92/34/58 : 2/4/2/0 (desert) | 222/314/83/98 : 2/4/2/0 (desert) | 327/347/131/244 : 2/4/2/0 (desert) | 699/352/305/477 : 3/2/0/0 (forest) | 1088/387/428/635 : 2/4/2/0 (desert) |
| 39 | spam | 161/185/42/3 : 2/2/0/0 (arctic) | — | — | — | — |
| 39 | combo | 126/207/32/34 : 2/4/2/0 (desert) | 214/276/120/102 : 3/2/0/0 (forest) | 753/291/187/421 : 3/2/0/1 (steppe) | 1454/451/589/883 : 2/2/0/0 (arctic) | 1738/590/742/1011 : 3/2/0/0 (forest) |
| 40 | spam | 18/242/412/82 : 2/2/0/0 (arctic) | 86/280/648/117 : 2/2/0/0 (arctic) | 295/204/719/152 : 2/2/0/0 (arctic) | 646/76/719/185 : 2/2/0/0 (arctic) | — |
| 40 | combo | 23/279/338/152 : 2/2/0/0 (arctic) | 73/536/529/330 : 3/2/1/0 (polarDesert) | 209/865/849/506 : 2/2/0/0 (arctic) | 525/1045/1022/624 : 2/2/0/0 (arctic) | 690/1052/1042/666 : 2/3/1/0 (taiga) |
| 41 | spam | 5/419/597/95 : 2/2/0/0 (arctic) | 92/507/810/157 : 2/2/0/0 (arctic) | — | — | — |
| 41 | combo | 73/289/178/19 : 2/2/0/0 (arctic) | 179/495/424/181 : 2/4/2/0 (desert) | 278/652/1200/473 : 2/4/2/0 (desert) | 499/1258/1796/1005 : 2/2/0/0 (arctic) | 656/1426/1974/1099 : 2/2/0/0 (arctic) |
| 42 | spam | 39/306/219/50 : 3/2/0/0 (forest) | 130/372/354/138 : 2/2/0/0 (arctic) | 106/675/687/192 : 2/3/1/0 (taiga) | 347/634/720/192 : 3/2/0/0 (forest) | — |
| 42 | combo | 44/358/121/45 : 2/2/0/0 (arctic) | 158/474/238/136 : 3/2/0/0 (forest) | 297/631/331/295 : 2/4/2/0 (desert) | 597/778/665/527 : 2/3/1/0 (taiga) | 736/902/792/604 : 2/4/2/0 (desert) |
| 43 | spam | 45/66/234/39 : 2/3/1/0 (taiga) | 83/1/609/138 : 2/2/0/0 (arctic) | 208/0/909/192 : 2/3/1/0 (taiga) | 847/6/1181/324 : 2/2/0/0 (arctic) | 976/12/1221/330 : 2/2/0/0 (arctic) |
| 43 | combo | 71/61/161/88 : 2/3/1/0 (taiga) | 141/78/475/230 : 2/3/1/0 (taiga) | 384/42/866/393 : 2/4/2/0 (desert) | 1004/217/1186/800 : 3/2/0/0 (forest) | 1437/248/1342/1096 : 3/2/0/0 (forest) |
| 44 | spam | 579/192/27/12 : 2/2/0/0 (arctic) | — | — | — | — |
| 44 | combo | 81/261/38/43 : 2/4/2/0 (desert) | 396/396/108/259 : 3/2/1/0 (polarDesert) | 420/437/187/284 : 3/2/1/0 (polarDesert) | 956/628/483/792 : 3/2/1/0 (polarDesert) | 1207/903/609/1053 : 3/2/0/1 (steppe) |
| 45 | spam | 44/115/363/75 : 3/2/0/0 (forest) | 146/91/373/91 : 2/3/1/0 (taiga) | 269/34/492/153 : 3/2/0/0 (forest) | 500/22/546/165 : 3/2/0/0 (forest) | 1174/10/640/214 : 2/2/0/0 (arctic) |
| 45 | combo | 74/124/112/45 : 3/2/0/0 (forest) | 174/142/137/127 : 3/2/0/1 (steppe) | 369/157/275/340 : 2/4/2/0 (desert) | 745/271/593/654 : 2/2/0/0 (arctic) | 1052/380/744/817 : 3/2/0/0 (forest) |
| 46 | spam | — | — | — | — | — |
| 46 | combo | 489/148/39/271 : 3/2/0/0 (forest) | 1000/156/121/676 : 2/3/1/0 (taiga) | 1092/172/214/766 : 2/3/1/0 (taiga) | 2135/486/514/1534 : 3/2/0/0 (forest) | 2218/512/616/1612 : 3/2/0/0 (forest) |
| 47 | spam | 5/394/297/31 : 2/2/0/0 (arctic) | 103/266/465/109 : 3/2/0/0 (forest) | 251/204/501/127 : 3/2/0/0 (forest) | 522/88/531/153 : 3/2/0/0 (forest) | — |
| 47 | combo | 57/373/42/39 : 2/2/0/0 (arctic) | 158/334/227/167 : 3/2/0/0 (forest) | 313/339/277/253 : 2/3/1/0 (taiga) | 969/317/469/636 : 2/4/2/0 (desert) | 1107/420/563/767 : 2/4/2/0 (desert) |
| 48 | spam | 6/285/522/78 : 2/2/0/0 (arctic) | 94/314/838/90 : 2/2/0/0 (arctic) | 1066/8/858/123 : 2/2/0/0 (arctic) | 1066/14/858/123 : 2/4/2/0 (desert) | — |
| 48 | combo | 52/259/323/134 : 2/2/0/0 (arctic) | 101/484/667/266 : 2/2/0/0 (arctic) | 259/480/683/377 : 3/2/0/0 (forest) | 488/1177/1304/721 : 2/2/0/0 (arctic) | 647/1191/1362/797 : 2/3/1/0 (taiga) |
| 49 | spam | 322/4/236/100 : 2/2/0/0 (arctic) | 282/3/518/182 : 2/4/2/0 (desert) | 1019/5/712/220 : 2/2/0/0 (arctic) | — | — |
| 49 | combo | 320/7/223/319 : 2/2/0/0 (arctic) | 466/67/508/565 : 3/2/1/0 (polarDesert) | 936/51/770/830 : 2/2/0/0 (arctic) | 1708/204/1122/1355 : 3/2/0/0 (forest) | 2112/257/1240/1630 : 3/2/0/0 (forest) |
| 50 | spam | 312/6/72/120 : 3/2/0/0 (forest) | 1681/4/154/320 : 3/2/0/0 (forest) | 1732/48/364/360 : 2/4/2/0 (desert) | — | — |
| 50 | combo | 249/51/68/180 : 3/2/0/0 (forest) | 1226/55/218/946 : 3/2/0/0 (forest) | 1938/115/434/1421 : 3/2/0/0 (forest) | 3137/323/690/2252 : 3/2/0/0 (forest) | 3624/436/865/2587 : 3/2/0/1 (steppe) |

## v4 round 2 — earlier last cores

Real GameSession, 20×14, seeds 1–50, 135974 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offer/core scoring and tie rules are unchanged.

V4: T8 wins immediately. Loss means engine proof or no empty living slots after usable cores/offers/spread are exhausted (board-full bot loss; replacement escape may still exist). An unproven empty-slot stall is not a loss. Board use includes ALL map placeable slots, including dead land. All-seed threshold medians censor unreached thresholds as infinity. Stock pressure samples the T3–T7 payout transactions, against the current placement biome roster; positive stock against zero cost has infinite ratio. T7 requires ≥90% completion and EVERY completer below 60%, not only the median. False-loss audits check direct productive replacements and refund-funded unpaid base yields; they are a constructive check, not an exhaustive search of all future replacement sequences.

| Target | Result | Evidence |
|---|---|---|
| 1. Good play wins ≥90%; zero false loss | PASS | 50/50 combo wins; 0 detected false soft-locks |
| 2. Spam loses ≥90% | PASS | 46/50 spam losses before T8 |
| 3. Winning board use 65–85% | PASS | 69.28% median winning board use |
| 4. No opening stalls before T2 | PASS | zero combo opening stalls |
| 5. T3–T7 median stock ≤3× max cost | MISS | worst checkpoint/resource median stock/max-cost = ∞× |
| 6. T7 before 60% board use | MISS | 50/50 reach T7; median 37.86%, max 68.34% |

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n |
|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 50/50 | 2 | 2 (2–36), 48/50 |
| T2 | 21.5 | 21.5 (11–77), 50/50 | 42 | 41 (12–235), 48/50 |
| T3 | 45 | 45 (24–110), 50/50 | 127 | 110 (31–387), 47/50 |
| T4 | 103.5 | 103.5 (60–183), 50/50 | 284 | 265 (92–556), 45/50 |
| T5 | 178 | 178 (104–302), 50/50 | 428.5 | 396 (174–591), 42/50 |
| T6 | 208 | 208 (122–356), 50/50 | 469 | 439 (199–595), 41/50 |
| T7 | 238.5 | 238.5 (156–408), 50/50 | 509.5 | 458 (262–624), 37/50 |
| T8 | 426 | 426 (334–579), 50/50 | ∞ | 605.5 (590–621), 2/50 |

| Combo stock checkpoint | Resource | Samples | Median held | Median max cost | Median held/max cost |
|---|---|---:|---:|---:|---:|
| T3 | wood | 50/50 | 79.5 | 2 | 38.75× |
| T3 | stone | 50/50 | 105.5 | 2 | 42.25× |
| T3 | water | 50/50 | 108.5 | 0 | ∞× |
| T3 | food | 50/50 | 84 | 0 | ∞× |
| T4 | wood | 50/50 | 218 | 2 | 96.5× |
| T4 | stone | 50/50 | 144 | 2 | 66.38× |
| T4 | water | 50/50 | 234 | 0 | ∞× |
| T4 | food | 50/50 | 230 | 0 | ∞× |
| T5 | wood | 50/50 | 402 | 2 | 174.5× |
| T5 | stone | 50/50 | 177.5 | 2 | 80.17× |
| T5 | water | 50/50 | 443 | 0 | ∞× |
| T5 | food | 50/50 | 432.5 | 0 | ∞× |
| T6 | wood | 50/50 | 533 | 3 | 216.25× |
| T6 | stone | 50/50 | 238.5 | 2 | 101.25× |
| T6 | water | 50/50 | 593.5 | 0.5 | ∞× |
| T6 | food | 50/50 | 530 | 0 | ∞× |
| T7 | wood | 50/50 | 665.5 | 2 | 307.25× |
| T7 | stone | 50/50 | 272.5 | 2 | 101.67× |
| T7 | water | 50/50 | 663 | 0 | ∞× |
| T7 | food | 50/50 | 610 | 0 | ∞× |

combo: 50 wins; 0 losses (0 board-full, 0 proven); 0 unproven stalls; 0 action-cap.

spam: 2 wins; 46 losses (46 board-full, 0 proven); 2 unproven stalls; 0 action-cap.

| Seed | Bot | Outcome / stop | Placements | Board use / map slots | T1–T8 placements | Opening stall | False loss | Legal core sites left | Final lifetime W/S/A/F | Final stock W/S/A/F |
|---|---|---|---:|---|---|---|---:|---:|---|---|
| 1 | spam | loss / board-full | 612 | 95.33% / 642 | 2 / 193 / 201 / 372 / — / — / — / — | no | 0 | 9 | 1964/1078/756/114 | 1305/9/588/105 |
| 1 | combo | win / won | 357 | 55.61% / 642 | 2 / 18 / 42 / 78 / 105 / 125 / 177 / 357 | no | 0 | 0 | 1666/1151/940/676 | 1266/592/827/649 |
| 2 | spam | loss / board-full | 633 | 99.53% / 636 | 2 / 204 / 209 / 522 / 579 / 580 / 624 / — | no | 0 | 0 | 2127/1195/803/158 | 1488/7/575/158 |
| 2 | combo | win / won | 425 | 66.82% / 636 | 3 / 16 / 42 / 65 / 171 / 226 / 254 / 425 | no | 0 | 0 | 2189/1154/1230/1226 | 1645/463/1078/1220 |
| 3 | spam | loss / board-full | 609 | 99.02% / 615 | 12 / 15 / 52 / 417 / 486 / 487 / 568 / — | no | 0 | 0 | 2088/1059/770/164 | 1395/0/530/155 |
| 3 | combo | win / won | 399 | 64.88% / 615 | 23 / 29 / 40 / 100 / 167 / 202 / 228 / 399 | no | 0 | 0 | 1647/1157/1024/911 | 1201/476/822/905 |
| 4 | spam | loss / board-full | 582 | 97.98% / 594 | 2 / 42 / 100 / 198 / 381 / 491 / 530 / — | no | 0 | 0 | 1612/676/1530/261 | 941/11/1422/258 |
| 4 | combo | win / won | 525 | 88.38% / 594 | 2 / 19 / 59 / 150 / 228 / 297 / 325 / 525 | no | 0 | 0 | 2519/1152/2120/1534 | 1872/394/2010/1522 |
| 5 | spam | win / won | 621 | 98.57% / 630 | 2 / 96 / 113 / 322 / 470 / 487 / 504 / 621 | no | 0 | 0 | 1327/1151/1589/275 | 771/7/1241/263 |
| 5 | combo | win / won | 484 | 76.83% / 630 | 2 / 44 / 65 / 130 / 249 / 260 / 277 / 484 | no | 0 | 0 | 1304/1295/1864/855 | 963/203/1500/852 |
| 6 | spam | loss / board-full | 630 | 98.59% / 639 | 2 / 13 / 47 / 225 / 510 / 511 / — / — | no | 0 | 0 | 1416/1392/963/129 | 915/105/645/120 |
| 6 | combo | win / won | 342 | 53.52% / 639 | 2 / 11 / 45 / 60 / 110 / 122 / 156 / 342 | no | 0 | 0 | 1478/1151/906/996 | 1073/505/713/987 |
| 7 | spam | loss / board-full | 612 | 98.55% / 621 | 2 / 19 / 53 / 174 / 309 / 349 / 570 / — | no | 0 | 0 | 1638/834/1370/167 | 974/6/1268/155 |
| 7 | combo | win / won | 504 | 81.16% / 621 | 3 / 13 / 40 / 153 / 249 / 291 / 312 / 504 | no | 0 | 0 | 2845/1150/1755/1400 | 2208/494/1656/1388 |
| 8 | spam | loss / board-full | 564 | 99.47% / 567 | 2 / 13 / 98 / 118 / 250 / 299 / 321 / — | no | 0 | 0 | 1608/999/771/282 | 914/108/689/279 |
| 8 | combo | win / won | 371 | 65.43% / 567 | 2 / 12 / 39 / 63 / 117 / 183 / 225 / 371 | no | 0 | 0 | 1795/1151/1166/1390 | 1253/682/1092/1387 |
| 9 | spam | loss / board-full | 567 | 97.42% / 582 | 2 / 56 / 63 / 92 / 289 / 355 / 375 / — | no | 0 | 0 | 1877/837/915/279 | 1113/11/831/276 |
| 9 | combo | win / won | 402 | 69.07% / 582 | 2 / 24 / 29 / 65 / 176 / 237 / 287 / 402 | no | 0 | 0 | 2195/1161/1133/1302 | 1574/678/1087/1302 |
| 10 | spam | loss / board-full | 594 | 99.5% / 597 | 2 / 37 / 63 / 304 / 359 / 360 / — / — | no | 0 | 0 | 1653/791/1176/148 | 1039/8/1002/133 |
| 10 | combo | win / won | 501 | 83.92% / 597 | 2 / 22 / 40 / 129 / 204 / 246 / 258 / 501 | no | 0 | 0 | 2336/1150/1601/1124 | 1752/345/1437/1088 |
| 11 | spam | loss / board-full | 627 | 100% / 627 | 2 / 33 / 95 / 171 / 270 / 323 / 336 / — | no | 0 | 0 | 1290/1249/1589/218 | 698/10/1241/164 |
| 11 | combo | win / won | 438 | 69.86% / 627 | 2 / 29 / 48 / 113 / 179 / 212 / 231 / 438 | no | 0 | 0 | 1859/1153/1351/1150 | 1340/332/1143/1099 |
| 12 | spam | loss / board-full | 180 | 29.13% / 618 | — / — / — / — / — / — / — / — | no | 0 | 138 | 1017/0/0/0 | 663/0/0/0 |
| 12 | combo | win / won | 390 | 63.11% / 618 | 33 / 36 / 43 / 79 / 140 / 177 / 219 / 390 | no | 0 | 0 | 2012/1150/1168/1176 | 1491/608/1083/1164 |
| 13 | spam | loss / board-full | 582 | 98.98% / 588 | 7 / 199 / 373 / 390 / 430 / 450 / 466 / — | no | 0 | 0 | 1232/1215/1239/198 | 866/6/909/198 |
| 13 | combo | win / won | 354 | 60.2% / 588 | 7 / 44 / 65 / 84 / 144 / 162 / 192 / 354 | no | 0 | 0 | 1594/1153/1048/947 | 1172/639/948/938 |
| 14 | spam | loss / board-full | 552 | 98.92% / 558 | 2 / 178 / 191 / 269 / 436 / 451 / 486 / — | no | 0 | 0 | 918/1467/1110/189 | 489/408/864/183 |
| 14 | combo | win / won | 403 | 72.22% / 558 | 2 / 33 / 45 / 99 / 182 / 191 / 204 / 403 | no | 0 | 0 | 1303/1695/1339/886 | 871/1008/1156/880 |
| 15 | spam | loss / board-full | 576 | 99.48% / 579 | 2 / 28 / 48 / 184 / 276 / 339 / 367 / — | no | 0 | 0 | 1232/892/1284/244 | 652/37/1128/232 |
| 15 | combo | win / won | 454 | 78.41% / 579 | 3 / 14 / 30 / 119 / 235 / 276 / 309 / 454 | no | 0 | 0 | 1627/1150/1692/1185 | 1129/464/1538/1173 |
| 16 | spam | loss / board-full | 585 | 99.49% / 588 | 2 / 199 / 355 / 392 / 434 / 476 / 507 / — | no | 0 | 0 | 981/1334/1266/176 | 570/114/954/176 |
| 16 | combo | win / won | 488 | 82.99% / 588 | 2 / 29 / 57 / 84 / 167 / 188 / 198 / 488 | no | 0 | 0 | 1303/1818/1668/1057 | 818/866/1387/1039 |
| 17 | spam | loss / board-full | 597 | 100% / 597 | 2 / 21 / 52 / 204 / 314 / 363 / 410 / — | no | 0 | 0 | 1947/819/1031/312 | 1166/11/892/309 |
| 17 | combo | win / won | 504 | 84.42% / 597 | 3 / 13 / 47 / 147 / 268 / 298 / 329 / 504 | no | 0 | 0 | 2961/1152/1525/1823 | 2215/388/1384/1811 |
| 18 | spam | win / won | 590 | 94.55% / 624 | 2 / 14 / 45 / 108 / 268 / 291 / 311 / 590 | no | 0 | 0 | 1458/1153/986/373 | 840/7/710/355 |
| 18 | combo | win / won | 417 | 66.83% / 624 | 2 / 13 / 26 / 60 / 177 / 201 / 219 / 417 | no | 0 | 0 | 1971/1152/1054/1355 | 1401/491/896/1337 |
| 19 | spam | loss / board-full | 642 | 100% / 642 | 2 / 33 / 56 / 133 / 199 / 271 / 308 / — | no | 0 | 0 | 2278/1061/778/331 | 1556/10/592/313 |
| 19 | combo | win / won | 426 | 66.36% / 642 | 2 / 31 / 50 / 75 / 159 / 199 / 242 / 426 | no | 0 | 0 | 2452/1151/904/1367 | 1870/498/772/1352 |
| 20 | spam | loss / board-full | 621 | 98.1% / 633 | 9 / 12 / 80 / 141 / 174 / 199 / 262 / — | no | 0 | 0 | 2058/1152/612/231 | 1359/168/516/222 |
| 20 | combo | win / won | 378 | 59.72% / 633 | 8 / 12 / 33 / 98 / 122 / 137 / 160 / 378 | no | 0 | 0 | 2012/1263/853/1059 | 1518/691/735/1050 |
| 21 | spam | loss / board-full | 567 | 97.93% / 579 | 18 / 39 / 69 / 400 / 484 / 512 / 536 / — | no | 0 | 0 | 1646/659/1029/220 | 951/10/819/211 |
| 21 | combo | win / won | 554 | 95.68% / 579 | 25 / 42 / 69 / 155 / 238 / 279 / 309 / 554 | no | 0 | 0 | 2901/1152/1644/1655 | 2193/224/1420/1616 |
| 22 | spam | loss / board-full | 606 | 98.06% / 618 | 2 / 26 / 43 / 167 / 447 / 463 / 588 / — | no | 0 | 0 | 2689/683/354/197 | 1831/5/348/197 |
| 22 | combo | win / won | 495 | 80.1% / 618 | 3 / 12 / 34 / 122 / 241 / 276 / 295 / 495 | no | 0 | 0 | 3808/1153/936/1750 | 2983/653/928/1741 |
| 23 | spam | stuck / stuck | 6 | 0.91% / 657 | — / — / — / — / — / — / — / — | yes | 0 | 150 | 0/0/48/3 | 0/0/48/3 |
| 23 | combo | win / won | 351 | 53.42% / 657 | 8 / 15 / 35 / 63 / 123 / 165 / 188 / 351 | no | 0 | 0 | 1724/1153/945/1175 | 1185/729/874/1163 |
| 24 | spam | loss / board-full | 606 | 100% / 606 | 2 / 39 / 64 / 164 / 417 / 513 / 565 / — | no | 0 | 0 | 2460/626/546/284 | 1543/9/540/284 |
| 24 | combo | win / won | 497 | 82.01% / 606 | 2 / 21 / 45 / 128 / 246 / 277 / 301 / 497 | no | 0 | 0 | 3711/1152/1139/1945 | 2811/664/1130/1942 |
| 25 | spam | loss / board-full | 594 | 98.51% / 603 | 21 / 27 / 46 / 153 / 507 / 508 / 564 / — | no | 0 | 0 | 1032/1461/1206/159 | 675/216/864/153 |
| 25 | combo | win / won | 405 | 67.16% / 603 | 30 / 42 / 56 / 80 / 147 / 157 / 167 / 405 | no | 0 | 0 | 1306/1537/1326/682 | 1019/679/1059/676 |
| 26 | spam | loss / board-full | 612 | 99.03% / 618 | 2 / 42 / 49 / 141 / 238 / 262 / 306 / — | no | 0 | 0 | 2327/915/459/261 | 1546/8/399/237 |
| 26 | combo | win / won | 417 | 67.48% / 618 | 2 / 27 / 48 / 105 / 179 / 205 / 235 / 417 | no | 0 | 0 | 2348/1287/851/1318 | 1691/753/776/1288 |
| 27 | spam | loss / board-full | 597 | 100% / 597 | 2 / 30 / 51 / 194 / 313 / 376 / 405 / — | no | 0 | 0 | 1787/899/1106/385 | 1178/0/962/382 |
| 27 | combo | win / won | 465 | 77.89% / 597 | 3 / 29 / 51 / 135 / 237 / 279 / 312 / 465 | no | 0 | 0 | 2335/1156/1502/1473 | 1755/449/1351/1464 |
| 28 | spam | loss / board-full | 594 | 99% / 600 | 2 / 199 / 240 / 265 / 407 / 475 / 512 / — | no | 0 | 0 | 980/1497/969/249 | 430/460/699/249 |
| 28 | combo | win / won | 351 | 58.5% / 600 | 2 / 15 / 42 / 87 / 104 / 155 / 174 / 351 | no | 0 | 0 | 1324/1153/921/761 | 963/545/765/740 |
| 29 | spam | loss / board-full | 627 | 100% / 627 | 12 / 15 / 108 / 238 / 392 / 439 / 488 / — | no | 0 | 0 | 1182/1274/1359/247 | 667/36/1029/235 |
| 29 | combo | win / won | 461 | 73.52% / 627 | 12 / 15 / 24 / 147 / 194 / 209 / 282 / 461 | no | 0 | 0 | 1303/1609/1668/939 | 870/728/1394/927 |
| 30 | spam | loss / board-full | 573 | 99.48% / 576 | 2 / 49 / 201 / 283 / 338 / 398 / 423 / — | no | 0 | 1 | 1289/1035/1132/211 | 843/12/904/211 |
| 30 | combo | win / won | 426 | 73.96% / 576 | 3 / 12 / 26 / 78 / 153 / 186 / 216 / 426 | no | 0 | 1 | 1669/1153/1562/888 | 1273/472/1407/882 |
| 31 | spam | loss / board-full | 609 | 99.02% / 615 | 2 / 57 / 238 / 436 / 515 / 530 / 547 / — | no | 0 | 0 | 915/1437/1150/252 | 571/230/814/252 |
| 31 | combo | win / won | 464 | 75.45% / 615 | 2 / 33 / 57 / 114 / 222 / 231 / 293 / 464 | no | 0 | 0 | 1304/1932/1523/956 | 879/1048/1221/947 |
| 32 | spam | loss / board-full | 624 | 100% / 624 | 2 / 205 / 387 / 556 / 583 / 595 / — / — | no | 0 | 0 | 724/1887/1295/126 | 365/444/821/126 |
| 32 | combo | win / won | 334 | 53.53% / 624 | 3 / 21 / 54 / 170 / 191 / 200 / 210 / 334 | no | 0 | 0 | 1431/1154/899/814 | 1052/590/756/796 |
| 33 | spam | loss / board-full | 585 | 100% / 585 | 2 / 17 / 286 / 310 / 322 / 360 / 427 / — | no | 0 | 0 | 2081/835/787/382 | 1289/5/727/376 |
| 33 | combo | win / won | 455 | 77.78% / 585 | 3 / 12 / 84 / 108 / 192 / 257 / 291 / 455 | no | 0 | 0 | 2756/1156/1337/1538 | 2049/578/1295/1532 |
| 34 | spam | loss / board-full | 615 | 97.62% / 630 | 2 / 112 / 261 / 380 / 470 / 487 / 507 / — | no | 0 | 0 | 1106/1407/1024/226 | 735/321/820/226 |
| 34 | combo | win / won | 456 | 72.38% / 630 | 2 / 32 / 60 / 167 / 243 / 254 / 266 / 456 | no | 0 | 0 | 1300/2178/1638/1184 | 770/1509/1470/1184 |
| 35 | spam | stuck / stuck | 546 | 94.79% / 576 | 2 / 21 / 31 / 138 / 236 / 293 / 321 / — | no | 0 | 0 | 2052/769/504/194 | 1331/0/420/185 |
| 35 | combo | win / won | 440 | 76.39% / 576 | 2 / 20 / 30 / 76 / 165 / 207 / 248 / 440 | no | 0 | 0 | 2850/1154/969/1709 | 2207/562/869/1700 |
| 36 | spam | loss / board-full | 591 | 98.5% / 600 | 2 / 193 / 205 / 285 / 400 / 423 / 440 / — | no | 0 | 0 | 1318/1071/1289/194 | 887/11/1097/194 |
| 36 | combo | win / won | 400 | 66.67% / 600 | 3 / 18 / 35 / 92 / 168 / 217 / 246 / 400 | no | 0 | 0 | 1305/1269/1633/933 | 961/557/1450/930 |
| 37 | spam | loss / board-full | 618 | 100% / 618 | 5 / 213 / 224 / 248 / 282 / 303 / 324 / — | no | 0 | 0 | 2119/1030/796/298 | 1389/5/658/289 |
| 37 | combo | win / won | 423 | 68.45% / 618 | 5 / 24 / 47 / 63 / 150 / 171 / 198 / 423 | no | 0 | 0 | 2944/1156/874/1537 | 2242/643/821/1528 |
| 38 | spam | loss / board-full | 663 | 94.85% / 699 | 36 / 40 / 310 / 513 / — / — / — / — | no | 0 | 9 | 1899/1419/417/117 | 1164/246/219/105 |
| 38 | combo | win / won | 411 | 58.8% / 699 | 21 / 24 / 33 / 83 / 124 / 189 / 201 / 411 | no | 0 | 1 | 2032/1408/852/938 | 1526/577/569/920 |
| 39 | spam | loss / board-full | 522 | 81.69% / 639 | 12 / 16 / 97 / — / — / — / — / — | no | 0 | 23 | 1686/976/428/59 | 1121/11/320/35 |
| 39 | combo | win / won | 444 | 69.48% / 639 | 17 / 21 / 44 / 74 / 151 / 165 / 207 / 444 | no | 0 | 0 | 2972/1162/1076/1277 | 2229/688/1055/1262 |
| 40 | spam | loss / board-full | 657 | 100% / 657 | 2 / 235 / 277 / 358 / 427 / 444 / 458 / — | no | 0 | 0 | 1566/1332/1050/207 | 1272/9/744/207 |
| 40 | combo | win / won | 444 | 67.58% / 657 | 2 / 72 / 110 / 180 / 280 / 292 / 301 / 444 | no | 0 | 0 | 1304/1965/1390/749 | 890/1108/1104/749 |
| 41 | spam | loss / board-full | 579 | 96.98% / 597 | 2 / 190 / 364 / 484 / — / — / — / — | no | 0 | 5 | 434/1586/1524/171 | 238/365/1170/171 |
| 41 | combo | win / won | 571 | 95.64% / 597 | 2 / 24 / 59 / 141 / 302 / 356 / 408 / 571 | no | 0 | 0 | 1300/2603/2336/1171 | 872/1556/2034/1171 |
| 42 | spam | loss / board-full | 603 | 99.01% / 609 | 2 / 213 / 224 / 294 / 483 / 500 / 517 / — | no | 0 | 0 | 1003/1722/1008/210 | 487/582/720/198 |
| 42 | combo | win / won | 366 | 60.1% / 609 | 2 / 50 / 62 / 102 / 150 / 200 / 218 / 366 | no | 0 | 0 | 1311/1705/1141/764 | 922/1112/1013/743 |
| 43 | spam | loss / board-full | 624 | 100% / 624 | 2 / 14 / 60 / 174 / 271 / 362 / 422 / — | no | 0 | 0 | 1768/1003/1499/347 | 1179/8/1235/344 |
| 43 | combo | win / won | 488 | 78.21% / 624 | 2 / 12 / 39 / 102 / 193 / 249 / 267 / 488 | no | 0 | 0 | 2338/1151/1739/1331 | 1779/307/1532/1325 |
| 44 | spam | loss / board-full | 585 | 89.45% / 654 | 2 / 54 / 234 / — / — / — / — / — | no | 0 | 17 | 1752/1155/495/42 | 1242/21/261/30 |
| 44 | combo | win / won | 408 | 62.39% / 654 | 3 / 20 / 42 / 105 / 122 / 142 / 165 / 408 | no | 0 | 0 | 2070/1593/852/1241 | 1473/1034/745/1214 |
| 45 | spam | loss / board-full | 630 | 96.77% / 651 | 2 / 214 / 226 / 252 / 322 / 344 / 379 / — | no | 0 | 1 | 1815/1188/925/223 | 1198/10/655/217 |
| 45 | combo | win / won | 384 | 58.99% / 651 | 3 / 24 / 41 / 63 / 135 / 183 / 227 / 384 | no | 0 | 1 | 1757/1152/1038/994 | 1291/514/900/976 |
| 46 | spam | loss / board-full | 492 | 75.58% / 651 | 2 / 20 / — / — / — / — / — / — | no | 0 | 43 | 1533/1182/0/42 | 861/342/0/42 |
| 46 | combo | win / won | 467 | 71.74% / 651 | 2 / 18 / 87 / 164 / 192 / 228 / 243 / 467 | no | 0 | 0 | 3035/1346/851/1606 | 2305/688/727/1591 |
| 47 | spam | loss / board-full | 642 | 98.62% / 651 | 2 / 212 / 251 / 303 / 339 / 357 / 381 / — | no | 0 | 0 | 1653/1299/849/183 | 1111/77/639/183 |
| 47 | combo | win / won | 400 | 61.44% / 651 | 3 / 44 / 59 / 105 / 139 / 151 / 184 / 400 | no | 0 | 0 | 1775/1381/850/945 | 1305/624/687/927 |
| 48 | spam | loss / board-full | 627 | 99.52% / 630 | 2 / 204 / 267 / 368 / 591 / 592 / — / — | no | 0 | 1 | 1423/1279/1090/130 | 1142/60/868/130 |
| 48 | combo | win / won | 346 | 54.92% / 630 | 2 / 77 / 104 / 171 / 192 / 210 / 225 / 346 | no | 0 | 0 | 1301/1376/1259/734 | 937/774/1125/734 |
| 49 | spam | loss / board-full | 645 | 99.54% / 648 | 2 / 97 / 141 / 219 / 509 / 545 / 606 / — | no | 0 | 0 | 2233/621/909/252 | 1344/10/811/252 |
| 49 | combo | win / won | 567 | 87.5% / 648 | 2 / 48 / 74 / 144 / 252 / 297 / 335 / 567 | no | 0 | 0 | 3442/1150/1476/1963 | 2576/387/1367/1936 |
| 50 | spam | loss / board-full | 630 | 100% / 630 | 2 / 37 / 110 / 478 / 563 / — / — / — | no | 0 | 0 | 3060/456/402/387 | 2014/6/390/381 |
| 50 | combo | win / won | 579 | 91.9% / 630 | 2 / 20 / 48 / 183 / 285 / 315 / 351 / 579 | no | 0 | 0 | 5046/1157/1045/2891 | 3903/583/1027/2885 |

Per-run checkpoint vectors below use **wood/stone/water/food**; each cell is `held : max cost (biome)`. The JSON retains unrounded values, lifetime totals, and living-slot fill at every threshold.

| Seed | Bot | T3 stock : cost | T4 stock : cost | T5 stock : cost | T6 stock : cost | T7 stock : cost |
|---|---|---|---|---|---|---|
| 1 | spam | 45/189/387/42 : 3/2/0/0 (forest) | 585/186/420/87 : 2/2/0/0 (arctic) | — | — | — |
| 1 | combo | 81/190/120/2 : 2/2/0/0 (arctic) | 242/237/157/93 : 2/3/1/0 (taiga) | 342/287/190/152 : 2/2/0/0 (arctic) | 417/303/260/194 : 3/2/0/0 (forest) | 727/316/337/413 : 2/3/1/0 (taiga) |
| 2 | spam | 44/135/347/23 : 3/2/0/0 (forest) | 1090/9/391/91 : 2/2/0/0 (arctic) | 1234/5/537/120 : 2/2/0/0 (arctic) | 1238/3/537/120 : 2/2/0/0 (arctic) | 1446/7/569/152 : 2/2/0/0 (arctic) |
| 2 | combo | 219/55/108/82 : 2/3/1/0 (taiga) | 255/192/140/90 : 3/2/0/0 (forest) | 597/138/573/438 : 2/4/2/0 (desert) | 824/121/680/599 : 2/4/2/0 (desert) | 883/137/705/681 : 2/4/2/0 (desert) |
| 3 | spam | 47/136/90/12 : 3/2/0/0 (forest) | 795/4/380/83 : 3/2/0/0 (forest) | 1024/4/468/111 : 3/2/0/0 (forest) | 1021/9/468/113 : 3/2/1/0 (polarDesert) | 1226/2/516/141 : 2/2/0/0 (arctic) |
| 3 | combo | 228/90/40/71 : 2/2/0/0 (arctic) | 500/119/174/252 : 3/2/0/0 (forest) | 603/153/374/384 : 2/2/0/0 (arctic) | 656/168/461/440 : 2/4/2/0 (desert) | 673/170/522/448 : 2/4/2/0 (desert) |
| 4 | spam | 91/4/472/40 : 2/2/0/0 (arctic) | 118/6/817/142 : 2/2/0/0 (arctic) | 679/4/1072/231 : 2/2/0/0 (arctic) | 804/4/1332/250 : 2/2/0/0 (arctic) | 830/3/1399/252 : 2/4/2/0 (desert) |
| 4 | combo | 66/36/460/135 : 2/4/2/0 (desert) | 162/12/886/411 : 2/2/0/0 (arctic) | 620/64/1064/742 : 3/2/0/0 (forest) | 997/69/1325/984 : 3/2/0/0 (forest) | 1156/121/1404/1101 : 3/2/0/0 (forest) |
| 5 | spam | 32/0/441/48 : 2/3/1/0 (taiga) | 28/27/867/135 : 3/2/0/1 (steppe) | 126/0/1114/196 : 3/2/0/0 (forest) | 192/0/1114/204 : 3/2/0/0 (forest) | 256/2/1116/216 : 3/2/0/0 (forest) |
| 5 | combo | 56/21/404/147 : 3/2/0/0 (forest) | 157/2/674/261 : 3/2/0/0 (forest) | 315/10/913/367 : 2/2/0/0 (arctic) | 394/1/915/417 : 3/2/0/0 (forest) | 478/5/985/464 : 3/2/0/0 (forest) |
| 6 | spam | 79/145/40/0 : 2/2/0/0 (arctic) | 309/156/294/81 : 3/2/1/0 (polarDesert) | 510/330/537/111 : 2/2/0/0 (arctic) | 514/328/537/111 : 3/2/0/0 (forest) | — |
| 6 | combo | 174/171/44/101 : 2/2/0/0 (arctic) | 180/222/130/126 : 2/2/0/0 (arctic) | 321/328/261/248 : 3/2/0/0 (forest) | 397/330/278/308 : 3/2/0/0 (forest) | 557/353/416/469 : 2/4/2/0 (desert) |
| 7 | spam | 46/74/183/44 : 3/2/0/0 (forest) | 196/6/562/102 : 2/4/2/0 (desert) | 505/6/664/123 : 2/4/2/0 (desert) | 479/56/782/132 : 3/2/1/0 (polarDesert) | 792/4/1254/141 : 2/2/0/0 (arctic) |
| 7 | combo | 154/55/153/54 : 2/2/0/0 (arctic) | 693/28/542/393 : 2/4/2/0 (desert) | 1271/49/723/645 : 2/3/1/0 (taiga) | 1462/81/870/773 : 2/4/2/0 (desert) | 1549/129/937/829 : 3/2/0/0 (forest) |
| 8 | spam | 318/7/38/80 : 2/4/2/0 (desert) | 288/23/152/98 : 3/2/1/0 (polarDesert) | 506/23/326/175 : 3/2/1/0 (polarDesert) | 470/75/558/225 : 2/4/2/0 (desert) | 455/111/587/228 : 3/2/1/0 (polarDesert) |
| 8 | combo | 194/92/44/140 : 2/4/2/0 (desert) | 158/146/177/247 : 3/2/1/0 (polarDesert) | 313/246/329/466 : 3/2/0/0 (forest) | 521/268/665/654 : 3/2/1/0 (polarDesert) | 729/312/733/888 : 3/2/0/0 (forest) |
| 9 | spam | 63/180/126/18 : 3/2/0/0 (forest) | 150/135/162/94 : 3/2/0/0 (forest) | 584/5/570/249 : 3/2/1/0 (polarDesert) | 673/29/702/261 : 2/2/0/0 (arctic) | 642/98/738/264 : 2/2/0/0 (arctic) |
| 9 | combo | 78/132/52/18 : 3/2/0/0 (forest) | 272/132/131/122 : 2/4/2/0 (desert) | 707/152/510/538 : 2/2/0/0 (arctic) | 1060/181/614/789 : 3/2/0/1 (steppe) | 1388/215/696/1024 : 2/2/0/0 (arctic) |
| 10 | spam | 69/6/229/18 : 2/4/2/0 (desert) | 398/5/524/75 : 2/2/0/0 (arctic) | 428/7/800/105 : 2/2/0/0 (arctic) | 428/7/811/105 : 2/4/2/0 (desert) | — |
| 10 | combo | 78/50/210/76 : 3/2/0/1 (steppe) | 351/9/438/275 : 2/4/2/0 (desert) | 341/14/840/420 : 2/4/2/0 (desert) | 438/15/1020/456 : 2/4/2/0 (desert) | 453/55/1045/467 : 3/2/0/1 (steppe) |
| 11 | spam | 62/44/204/54 : 3/2/0/0 (forest) | 134/4/614/95 : 3/2/0/0 (forest) | 223/3/793/121 : 3/2/0/0 (forest) | 255/3/853/123 : 3/2/0/0 (forest) | 332/1/855/128 : 3/2/0/0 (forest) |
| 11 | combo | 83/100/140/40 : 2/4/2/0 (desert) | 138/93/590/218 : 3/2/0/1 (steppe) | 277/139/734/421 : 3/2/0/0 (forest) | 340/125/760/470 : 3/2/0/0 (forest) | 520/136/786/546 : 3/2/0/0 (forest) |
| 12 | spam | — | — | — | — | — |
| 12 | combo | 251/52/45/103 : 2/2/0/0 (arctic) | 263/140/222/181 : 2/2/0/0 (arctic) | 477/213/410/325 : 2/2/0/0 (arctic) | 658/271/470/522 : 3/2/1/0 (polarDesert) | 857/262/599/672 : 2/4/2/0 (desert) |
| 13 | spam | 6/160/804/92 : 2/2/0/0 (arctic) | 111/138/804/92 : 3/2/0/0 (forest) | 252/112/819/152 : 2/3/1/0 (taiga) | 316/86/855/158 : 3/2/0/0 (forest) | 399/60/855/160 : 2/2/0/0 (arctic) |
| 13 | combo | 64/191/294/89 : 2/4/2/0 (desert) | 171/180/351/124 : 3/2/0/0 (forest) | 468/206/435/368 : 3/2/1/0 (polarDesert) | 474/284/484/444 : 3/2/1/0 (polarDesert) | 557/310/581/527 : 2/3/1/0 (taiga) |
| 14 | spam | 41/284/270/40 : 2/3/1/0 (taiga) | 103/335/555/102 : 3/2/0/0 (forest) | 118/535/825/168 : 3/2/0/0 (forest) | 190/517/825/168 : 3/2/0/0 (forest) | 249/525/858/171 : 3/2/0/0 (forest) |
| 14 | combo | 67/149/153/86 : 3/2/0/0 (forest) | 152/314/388/154 : 3/2/0/0 (forest) | 260/574/686/374 : 3/2/0/0 (forest) | 341/572/692/408 : 2/3/1/0 (taiga) | 406/619/710/469 : 2/3/1/0 (taiga) |
| 15 | spam | 45/60/81/54 : 3/2/0/0 (forest) | 122/9/606/137 : 3/2/0/0 (forest) | 254/6/864/171 : 3/2/1/0 (polarDesert) | 271/5/1035/204 : 3/2/1/0 (polarDesert) | 266/37/1050/214 : 2/2/0/0 (arctic) |
| 15 | combo | 75/79/70/60 : 3/2/0/0 (forest) | 392/69/505/257 : 2/4/2/0 (desert) | 562/10/1069/487 : 2/4/2/0 (desert) | 665/41/1264/553 : 3/2/1/0 (polarDesert) | 825/80/1325/717 : 3/2/0/0 (forest) |
| 16 | spam | 4/345/609/65 : 2/2/0/0 (arctic) | 188/271/609/90 : 3/2/0/0 (forest) | 236/192/807/138 : 2/3/1/0 (taiga) | 260/242/846/164 : 3/2/0/0 (forest) | 297/243/900/170 : 2/3/1/0 (taiga) |
| 16 | combo | 57/312/96/48 : 2/4/2/0 (desert) | 159/312/188/140 : 3/2/0/0 (forest) | 268/299/574/368 : 3/2/0/0 (forest) | 346/279/660/439 : 3/2/0/0 (forest) | 426/283/674/513 : 3/2/0/0 (forest) |
| 17 | spam | 76/23/204/27 : 2/2/0/0 (arctic) | 486/6/312/153 : 2/2/0/0 (arctic) | 456/3/763/247 : 2/4/2/0 (desert) | 522/6/808/266 : 2/2/0/0 (arctic) | 598/5/839/269 : 2/4/2/0 (desert) |
| 17 | combo | 186/40/196/114 : 2/2/0/0 (arctic) | 662/10/363/523 : 3/2/0/1 (steppe) | 1159/7/882/1020 : 3/2/1/0 (polarDesert) | 1220/10/909/1070 : 2/4/2/0 (desert) | 1302/21/955/1152 : 2/4/2/0 (desert) |
| 18 | spam | 120/9/45/42 : 2/4/2/0 (desert) | 213/54/99/90 : 2/2/0/0 (arctic) | 510/6/417/227 : 2/2/0/0 (arctic) | 486/43/428/259 : 2/4/2/0 (desert) | 465/89/433/272 : 2/4/2/0 (desert) |
| 18 | combo | 77/78/40/97 : 2/2/0/0 (arctic) | 164/183/115/228 : 3/2/0/0 (forest) | 693/145/401/619 : 2/2/0/0 (arctic) | 718/191/425/703 : 3/2/1/0 (polarDesert) | 736/250/475/750 : 2/2/0/0 (arctic) |
| 19 | spam | 65/92/128/47 : 3/2/0/1 (steppe) | 327/4/219/166 : 2/4/2/0 (desert) | 379/31/336/225 : 2/4/2/0 (desert) | 564/5/367/243 : 2/4/2/0 (desert) | 624/6/394/253 : 3/2/0/0 (forest) |
| 19 | combo | 69/118/131/117 : 3/2/0/1 (steppe) | 180/112/198/231 : 3/2/0/0 (forest) | 614/155/275/505 : 2/4/2/0 (desert) | 714/153/409/604 : 3/2/0/1 (steppe) | 929/156/447/771 : 2/4/2/0 (desert) |
| 20 | spam | 46/242/144/48 : 3/2/0/0 (forest) | 144/363/192/90 : 2/2/0/0 (arctic) | 270/342/228/120 : 2/3/1/0 (taiga) | 299/349/276/147 : 3/2/0/0 (forest) | 507/288/308/174 : 2/4/2/0 (desert) |
| 20 | combo | 78/143/75/52 : 2/4/2/0 (desert) | 163/368/230/150 : 2/2/0/0 (arctic) | 326/372/265/250 : 2/3/1/0 (taiga) | 404/387/288/298 : 3/2/0/0 (forest) | 472/438/348/403 : 3/2/0/0 (forest) |
| 21 | spam | 77/4/271/45 : 3/2/0/1 (steppe) | 957/3/490/175 : 2/4/2/0 (desert) | 927/3/758/198 : 2/4/2/0 (desert) | 938/3/779/205 : 2/4/2/0 (desert) | 953/4/798/211 : 2/4/2/0 (desert) |
| 21 | combo | 287/10/267/158 : 2/4/2/0 (desert) | 636/11/455/455 : 3/2/0/0 (forest) | 737/17/817/650 : 2/4/2/0 (desert) | 919/72/899/813 : 3/2/1/0 (polarDesert) | 1102/88/952/922 : 3/2/0/0 (forest) |
| 22 | spam | 55/97/72/25 : 3/2/0/0 (forest) | 486/0/174/90 : 3/2/0/0 (forest) | 1371/0/204/157 : 2/2/0/0 (arctic) | 1363/5/264/168 : 2/4/2/0 (desert) | 1755/13/344/193 : 2/2/0/0 (arctic) |
| 22 | combo | 114/61/90/129 : 3/2/0/0 (forest) | 634/103/224/480 : 2/2/0/0 (arctic) | 1490/139/354/920 : 2/2/0/0 (arctic) | 1556/192/533/993 : 3/2/1/0 (polarDesert) | 1665/249/581/1050 : 3/2/0/1 (steppe) |
| 23 | spam | — | — | — | — | — |
| 23 | combo | 60/129/107/73 : 2/2/0/0 (arctic) | 146/263/121/174 : 2/2/0/0 (arctic) | 445/295/191/427 : 3/2/0/1 (steppe) | 545/296/424/573 : 3/2/0/1 (steppe) | 543/322/449/622 : 2/4/2/0 (desert) |
| 24 | spam | 38/130/183/12 : 3/2/0/0 (forest) | 411/4/225/90 : 3/2/0/0 (forest) | 1034/4/375/235 : 2/2/0/0 (arctic) | 1246/9/477/251 : 2/2/0/0 (arctic) | 1353/5/520/264 : 2/2/0/0 (arctic) |
| 24 | combo | 52/111/193/108 : 3/2/0/0 (forest) | 681/95/253/575 : 2/2/0/0 (arctic) | 1351/129/537/999 : 2/2/0/0 (arctic) | 1549/193/573/1119 : 2/2/0/0 (arctic) | 1686/249/652/1209 : 2/2/0/0 (arctic) |
| 25 | spam | 81/42/169/19 : 2/4/2/0 (desert) | 174/183/354/90 : 3/2/0/0 (forest) | 411/288/858/117 : 3/2/1/0 (polarDesert) | 417/286/858/118 : 3/2/0/0 (forest) | 552/276/864/144 : 2/2/0/0 (arctic) |
| 25 | combo | 266/34/182/103 : 2/4/2/0 (desert) | 300/128/276/112 : 2/4/2/0 (desert) | 356/350/435/188 : 2/3/1/0 (taiga) | 428/339/435/232 : 3/2/0/0 (forest) | 501/334/439/284 : 3/2/0/1 (steppe) |
| 26 | spam | 83/81/30/30 : 2/3/1/0 (taiga) | 403/5/113/147 : 3/2/1/0 (polarDesert) | 542/44/205/194 : 3/2/1/0 (polarDesert) | 503/110/244/203 : 3/2/1/0 (polarDesert) | 500/177/304/214 : 2/4/2/0 (desert) |
| 26 | combo | 115/162/28/51 : 2/3/1/0 (taiga) | 509/112/111/273 : 3/2/0/0 (forest) | 967/164/197/601 : 2/2/0/0 (arctic) | 983/225/251/666 : 2/2/0/0 (arctic) | 1044/332/322/815 : 2/2/0/0 (arctic) |
| 27 | spam | 79/32/162/55 : 2/2/0/0 (arctic) | 317/6/468/154 : 2/2/0/0 (arctic) | 491/6/566/264 : 2/2/0/0 (arctic) | 508/24/786/298 : 2/4/2/0 (desert) | 506/6/830/298 : 2/4/2/0 (desert) |
| 27 | combo | 240/47/168/151 : 2/2/0/0 (arctic) | 601/57/489/558 : 3/2/0/0 (forest) | 1065/55/688/941 : 3/2/0/0 (forest) | 1196/93/854/1073 : 3/2/1/0 (polarDesert) | 1361/140/969/1206 : 3/2/0/1 (steppe) |
| 28 | spam | 4/201/351/98 : 2/2/0/0 (arctic) | 96/154/351/149 : 3/2/0/0 (forest) | 48/489/588/215 : 3/2/0/0 (forest) | 29/645/660/233 : 2/3/1/0 (taiga) | 102/624/699/249 : 2/2/0/0 (arctic) |
| 28 | combo | 66/193/57/32 : 2/2/0/0 (arctic) | 306/251/104/222 : 2/4/2/0 (desert) | 320/308/182/262 : 3/2/1/0 (polarDesert) | 391/298/342/325 : 3/2/0/1 (steppe) | 458/323/389/395 : 2/2/0/0 (arctic) |
| 29 | spam | 81/84/279/96 : 3/2/0/0 (forest) | 123/1/674/169 : 2/2/0/0 (arctic) | 186/114/930/190 : 2/3/1/0 (taiga) | 218/165/975/196 : 2/3/1/0 (taiga) | 264/191/1008/202 : 3/2/0/0 (forest) |
| 29 | combo | 81/62/35/65 : 2/4/2/0 (desert) | 150/170/698/271 : 2/2/0/0 (arctic) | 277/270/806/445 : 3/2/0/0 (forest) | 358/267/835/496 : 2/3/1/0 (taiga) | 417/355/953/598 : 2/4/2/0 (desert) |
| 30 | spam | 30/124/287/75 : 3/2/0/0 (forest) | 111/156/580/138 : 3/2/0/0 (forest) | 247/55/715/169 : 3/2/0/0 (forest) | 278/140/832/181 : 3/2/0/0 (forest) | 330/126/868/181 : 3/2/0/0 (forest) |
| 30 | combo | 74/96/47/55 : 2/2/0/0 (arctic) | 226/135/386/124 : 2/4/2/0 (desert) | 331/235/665/295 : 2/3/1/0 (taiga) | 445/212/785/369 : 3/2/0/0 (forest) | 583/262/809/492 : 2/4/2/0 (desert) |
| 31 | spam | 4/261/243/50 : 2/2/0/0 (arctic) | 4/426/684/198 : 2/2/0/0 (arctic) | 180/364/814/249 : 2/2/0/0 (arctic) | 252/352/814/249 : 2/3/1/0 (taiga) | 323/346/814/252 : 2/3/1/0 (taiga) |
| 31 | combo | 26/374/49/101 : 2/2/0/0 (arctic) | 134/484/306/240 : 3/2/1/0 (polarDesert) | 242/721/753/575 : 2/2/0/0 (arctic) | 313/715/755/603 : 3/2/0/0 (forest) | 374/884/896/738 : 2/2/0/0 (arctic) |
| 32 | spam | 5/383/537/55 : 2/2/0/0 (arctic) | 9/580/821/96 : 2/2/0/0 (arctic) | 174/526/821/120 : 3/2/0/0 (forest) | 243/502/821/123 : 3/2/0/0 (forest) | — |
| 32 | combo | 54/281/109/73 : 3/2/1/0 (polarDesert) | 150/456/439/216 : 2/4/2/0 (desert) | 320/441/451/305 : 3/2/0/0 (forest) | 394/434/453/349 : 2/3/1/0 (taiga) | 476/433/461/406 : 3/2/0/0 (forest) |
| 33 | spam | 852/2/41/204 : 3/2/0/0 (forest) | 852/56/110/222 : 2/4/2/0 (desert) | 849/26/191/243 : 2/3/1/0 (taiga) | 828/9/421/287 : 2/4/2/0 (desert) | 922/5/546/342 : 3/2/1/0 (polarDesert) |
| 33 | combo | 502/63/43/404 : 2/3/1/0 (taiga) | 522/141/113/471 : 3/2/1/0 (polarDesert) | 862/119/348/714 : 2/3/1/0 (taiga) | 964/95/719/853 : 2/2/0/0 (arctic) | 1130/122/804/973 : 3/2/0/0 (forest) |
| 34 | spam | 4/361/467/101 : 2/2/0/0 (arctic) | 5/578/727/172 : 2/2/0/0 (arctic) | 164/563/790/214 : 2/2/0/0 (arctic) | 232/539/790/214 : 2/3/1/0 (taiga) | 303/515/820/226 : 2/3/1/0 (taiga) |
| 34 | combo | 25/275/198/126 : 2/2/0/0 (arctic) | 23/631/732/454 : 2/2/0/0 (arctic) | 134/1027/989/664 : 2/2/0/0 (arctic) | 213/1026/999/714 : 3/2/0/0 (forest) | 291/1014/1018/740 : 3/2/0/0 (forest) |
| 35 | spam | 90/48/42/18 : 2/4/2/0 (desert) | 414/6/120/90 : 2/4/2/0 (desert) | 611/7/297/153 : 3/2/0/0 (forest) | 694/7/361/185 : 3/2/0/0 (forest) | 722/16/387/185 : 2/4/2/0 (desert) |
| 35 | combo | 143/68/48/95 : 3/2/0/0 (forest) | 331/158/117/230 : 2/4/2/0 (desert) | 850/182/278/653 : 3/2/0/0 (forest) | 1058/227/341/807 : 3/2/0/0 (forest) | 1259/249/409/973 : 2/4/2/0 (desert) |
| 36 | spam | 40/235/462/43 : 3/2/0/0 (forest) | 163/158/666/90 : 3/2/1/0 (polarDesert) | 151/226/1029/178 : 3/2/0/0 (forest) | 213/190/1065/178 : 2/3/1/0 (taiga) | 287/164/1065/178 : 3/2/0/0 (forest) |
| 36 | combo | 95/90/165/18 : 2/4/2/0 (desert) | 258/138/400/90 : 2/4/2/0 (desert) | 351/74/803/323 : 3/2/0/0 (forest) | 598/84/868/446 : 2/4/2/0 (desert) | 658/79/969/466 : 2/4/2/0 (desert) |
| 37 | spam | 41/215/587/70 : 3/2/0/0 (forest) | 137/215/587/100 : 3/2/0/0 (forest) | 280/150/587/155 : 3/2/0/0 (forest) | 334/180/587/164 : 2/3/1/0 (taiga) | 397/183/587/182 : 3/2/0/0 (forest) |
| 37 | combo | 81/142/161/41 : 2/4/2/0 (desert) | 206/138/179/94 : 2/3/1/0 (taiga) | 684/173/297/446 : 2/3/1/0 (taiga) | 759/250/344/490 : 2/3/1/0 (taiga) | 878/306/378/588 : 2/2/0/0 (arctic) |
| 38 | spam | 524/296/18/66 : 2/4/2/0 (desert) | 780/375/162/78 : 2/2/0/0 (arctic) | — | — | — |
| 38 | combo | 175/92/34/58 : 2/4/2/0 (desert) | 222/314/83/98 : 2/4/2/0 (desert) | 327/347/131/244 : 2/4/2/0 (desert) | 373/296/186/266 : 3/2/0/1 (steppe) | 459/289/209/280 : 2/3/1/0 (taiga) |
| 39 | spam | 161/185/42/3 : 2/2/0/0 (arctic) | — | — | — | — |
| 39 | combo | 126/207/32/34 : 2/4/2/0 (desert) | 214/276/120/102 : 3/2/0/0 (forest) | 753/291/187/421 : 3/2/0/1 (steppe) | 801/279/259/464 : 2/3/1/0 (taiga) | 870/300/491/583 : 2/3/1/0 (taiga) |
| 40 | spam | 18/242/412/82 : 2/2/0/0 (arctic) | 86/280/648/117 : 2/2/0/0 (arctic) | 295/204/719/152 : 2/2/0/0 (arctic) | 363/192/719/152 : 2/3/1/0 (taiga) | 433/186/719/161 : 2/3/1/0 (taiga) |
| 40 | combo | 23/279/338/152 : 2/2/0/0 (arctic) | 73/536/529/330 : 3/2/1/0 (polarDesert) | 209/865/849/506 : 2/2/0/0 (arctic) | 289/871/855/538 : 2/3/1/0 (taiga) | 371/871/863/552 : 3/2/0/0 (forest) |
| 41 | spam | 5/419/597/95 : 2/2/0/0 (arctic) | 92/507/810/157 : 2/2/0/0 (arctic) | — | — | — |
| 41 | combo | 73/289/178/19 : 2/2/0/0 (arctic) | 179/495/424/181 : 2/4/2/0 (desert) | 278/652/1200/473 : 2/4/2/0 (desert) | 334/787/1412/622 : 2/4/2/0 (desert) | 390/936/1607/750 : 2/4/2/0 (desert) |
| 42 | spam | 39/306/219/50 : 3/2/0/0 (forest) | 130/372/354/138 : 2/2/0/0 (arctic) | 106/675/687/192 : 2/3/1/0 (taiga) | 174/663/687/192 : 2/3/1/0 (taiga) | 242/651/687/192 : 3/2/0/1 (steppe) |
| 42 | combo | 44/358/121/45 : 2/2/0/0 (arctic) | 158/474/238/136 : 3/2/0/0 (forest) | 297/631/331/295 : 2/4/2/0 (desert) | 374/720/531/397 : 2/4/2/0 (desert) | 436/733/540/435 : 3/2/0/1 (steppe) |
| 43 | spam | 45/66/234/39 : 2/3/1/0 (taiga) | 83/1/609/138 : 2/2/0/0 (arctic) | 208/0/909/192 : 2/3/1/0 (taiga) | 353/4/1051/245 : 2/2/0/0 (arctic) | 513/3/1086/262 : 2/4/2/0 (desert) |
| 43 | combo | 71/61/161/88 : 2/3/1/0 (taiga) | 141/78/475/230 : 2/3/1/0 (taiga) | 384/42/866/393 : 2/4/2/0 (desert) | 668/72/972/644 : 3/2/1/0 (polarDesert) | 704/139/1027/660 : 2/2/0/0 (arctic) |
| 44 | spam | 579/192/27/12 : 2/2/0/0 (arctic) | — | — | — | — |
| 44 | combo | 81/261/38/43 : 2/4/2/0 (desert) | 396/396/108/259 : 3/2/1/0 (polarDesert) | 420/437/187/284 : 3/2/1/0 (polarDesert) | 427/472/247/335 : 2/4/2/0 (desert) | 453/539/323/394 : 3/2/1/0 (polarDesert) |
| 45 | spam | 44/115/363/75 : 3/2/0/0 (forest) | 146/91/373/91 : 2/3/1/0 (taiga) | 269/34/492/153 : 3/2/0/0 (forest) | 327/35/510/162 : 3/2/0/0 (forest) | 374/34/582/174 : 2/3/1/0 (taiga) |
| 45 | combo | 74/124/112/45 : 3/2/0/0 (forest) | 174/142/137/127 : 3/2/0/1 (steppe) | 369/157/275/340 : 2/4/2/0 (desert) | 502/165/415/452 : 3/2/0/0 (forest) | 619/191/556/546 : 2/2/0/0 (arctic) |
| 46 | spam | — | — | — | — | — |
| 46 | combo | 489/148/39/271 : 3/2/0/0 (forest) | 1000/156/121/676 : 2/3/1/0 (taiga) | 1092/172/214/766 : 2/3/1/0 (taiga) | 1276/292/267/902 : 3/2/0/0 (forest) | 1302/293/359/957 : 3/2/0/0 (forest) |
| 47 | spam | 5/394/297/31 : 2/2/0/0 (arctic) | 103/266/465/109 : 3/2/0/0 (forest) | 251/204/501/127 : 3/2/0/0 (forest) | 320/177/516/145 : 2/3/1/0 (taiga) | 386/189/531/154 : 3/2/0/0 (forest) |
| 47 | combo | 57/373/42/39 : 2/2/0/0 (arctic) | 158/334/227/167 : 3/2/0/0 (forest) | 313/339/277/253 : 2/3/1/0 (taiga) | 392/329/300/287 : 3/2/0/0 (forest) | 610/377/330/390 : 2/3/1/0 (taiga) |
| 48 | spam | 6/285/522/78 : 2/2/0/0 (arctic) | 94/314/838/90 : 2/2/0/0 (arctic) | 1066/8/858/123 : 2/2/0/0 (arctic) | 1066/14/858/123 : 2/4/2/0 (desert) | — |
| 48 | combo | 52/259/323/134 : 2/2/0/0 (arctic) | 101/484/667/266 : 2/2/0/0 (arctic) | 259/480/683/377 : 3/2/0/0 (forest) | 345/558/719/401 : 2/3/1/0 (taiga) | 431/576/750/440 : 2/3/1/0 (taiga) |
| 49 | spam | 322/4/236/100 : 2/2/0/0 (arctic) | 282/3/518/182 : 2/4/2/0 (desert) | 1019/5/712/220 : 2/2/0/0 (arctic) | 1019/5/778/229 : 2/2/0/0 (arctic) | 1170/10/793/234 : 2/2/0/0 (arctic) |
| 49 | combo | 320/7/223/319 : 2/2/0/0 (arctic) | 466/67/508/565 : 3/2/1/0 (polarDesert) | 936/51/770/830 : 2/2/0/0 (arctic) | 1123/96/929/1004 : 3/2/0/0 (forest) | 1365/130/1016/1176 : 2/4/2/0 (desert) |
| 50 | spam | 312/6/72/120 : 3/2/0/0 (forest) | 1681/4/154/320 : 3/2/0/0 (forest) | 1732/48/364/360 : 2/4/2/0 (desert) | — | — |
| 50 | combo | 249/51/68/180 : 3/2/0/0 (forest) | 1226/55/218/946 : 3/2/0/0 (forest) | 1938/115/434/1421 : 3/2/0/0 (forest) | 2124/180/468/1528 : 2/2/0/0 (arctic) | 2404/224/530/1729 : 3/2/0/0 (forest) |

## v4 round 3 — last-core wood gate

Real GameSession, 20×14, seeds 1–50, 135404 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offer/core scoring and tie rules are unchanged.

V4: T8 wins immediately. Loss means engine proof or no empty living slots after usable cores/offers/spread are exhausted (board-full bot loss; replacement escape may still exist). An unproven empty-slot stall is not a loss. Board use includes ALL map placeable slots, including dead land. All-seed threshold medians censor unreached thresholds as infinity. Stock pressure samples the T3–T7 payout transactions, against the current placement biome roster; positive stock against zero cost has infinite ratio. T7 requires ≥90% completion and EVERY completer below 60%, not only the median. False-loss audits check direct productive replacements and refund-funded unpaid base yields; they are a constructive check, not an exhaustive search of all future replacement sequences.

| Target | Result | Evidence |
|---|---|---|
| 1. Good play wins ≥90%; zero false loss | PASS | 50/50 combo wins; 0 detected false soft-locks |
| 2. Spam loses ≥90% | PASS | 46/50 spam losses before T8 |
| 3. Winning board use 65–85% | PASS | 69.28% median winning board use |
| 4. No opening stalls before T2 | PASS | zero combo opening stalls |
| 5. T3–T7 median stock ≤3× max cost | MISS | worst checkpoint/resource median stock/max-cost = ∞× |
| 6. T7 before 60% board use | PASS | 50/50 reach T7; median 37.6%, max 59.8% |

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n |
|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 50/50 | 2 | 2 (2–36), 48/50 |
| T2 | 21.5 | 21.5 (11–77), 50/50 | 42 | 41 (12–235), 48/50 |
| T3 | 45 | 45 (24–110), 50/50 | 127 | 110 (31–387), 47/50 |
| T4 | 103.5 | 103.5 (60–183), 50/50 | 284 | 265 (92–556), 45/50 |
| T5 | 178 | 178 (104–302), 50/50 | 428.5 | 396 (174–591), 42/50 |
| T6 | 208 | 208 (122–356), 50/50 | 469 | 439 (199–595), 41/50 |
| T7 | 231.5 | 231.5 (146–357), 50/50 | 488 | 440 (262–624), 37/50 |
| T8 | 426 | 426 (334–579), 50/50 | ∞ | 605.5 (590–621), 2/50 |

| Combo stock checkpoint | Resource | Samples | Median held | Median max cost | Median held/max cost |
|---|---|---:|---:|---:|---:|
| T3 | wood | 50/50 | 79.5 | 2 | 38.75× |
| T3 | stone | 50/50 | 105.5 | 2 | 42.25× |
| T3 | water | 50/50 | 108.5 | 0 | ∞× |
| T3 | food | 50/50 | 84 | 0 | ∞× |
| T4 | wood | 50/50 | 218 | 2 | 96.5× |
| T4 | stone | 50/50 | 144 | 2 | 66.38× |
| T4 | water | 50/50 | 234 | 0 | ∞× |
| T4 | food | 50/50 | 230 | 0 | ∞× |
| T5 | wood | 50/50 | 402 | 2 | 174.5× |
| T5 | stone | 50/50 | 177.5 | 2 | 80.17× |
| T5 | water | 50/50 | 443 | 0 | ∞× |
| T5 | food | 50/50 | 432.5 | 0 | ∞× |
| T6 | wood | 50/50 | 533 | 3 | 216.25× |
| T6 | stone | 50/50 | 238.5 | 2 | 101.25× |
| T6 | water | 50/50 | 593.5 | 0.5 | ∞× |
| T6 | food | 50/50 | 530 | 0 | ∞× |
| T7 | wood | 50/50 | 665.5 | 2 | 307.25× |
| T7 | stone | 50/50 | 266.5 | 2 | 101.67× |
| T7 | water | 50/50 | 657 | 0.5 | ∞× |
| T7 | food | 50/50 | 596 | 0 | ∞× |

combo: 50 wins; 0 losses (0 board-full, 0 proven); 0 unproven stalls; 0 action-cap.

spam: 2 wins; 46 losses (46 board-full, 0 proven); 2 unproven stalls; 0 action-cap.

| Seed | Bot | Outcome / stop | Placements | Board use / map slots | T1–T8 placements | Opening stall | False loss | Legal core sites left | Final lifetime W/S/A/F | Final stock W/S/A/F |
|---|---|---|---:|---|---|---|---:|---:|---|---|
| 1 | spam | loss / board-full | 612 | 95.33% / 642 | 2 / 193 / 201 / 372 / — / — / — / — | no | 0 | 9 | 1964/1078/756/114 | 1305/9/588/105 |
| 1 | combo | win / won | 357 | 55.61% / 642 | 2 / 18 / 42 / 78 / 105 / 125 / 177 / 357 | no | 0 | 0 | 1666/1151/940/676 | 1266/592/827/649 |
| 2 | spam | loss / board-full | 633 | 99.53% / 636 | 2 / 204 / 209 / 522 / 579 / 580 / 624 / — | no | 0 | 0 | 2127/1195/803/158 | 1488/7/575/158 |
| 2 | combo | win / won | 425 | 66.82% / 636 | 3 / 16 / 42 / 65 / 171 / 226 / 254 / 425 | no | 0 | 0 | 2189/1154/1230/1226 | 1645/463/1078/1220 |
| 3 | spam | loss / board-full | 609 | 99.02% / 615 | 12 / 15 / 52 / 417 / 486 / 487 / 568 / — | no | 0 | 0 | 2088/1059/770/164 | 1395/0/530/155 |
| 3 | combo | win / won | 399 | 64.88% / 615 | 23 / 29 / 40 / 100 / 167 / 202 / 228 / 399 | no | 0 | 0 | 1647/1157/1024/911 | 1201/476/822/905 |
| 4 | spam | loss / board-full | 582 | 97.98% / 594 | 2 / 42 / 100 / 198 / 381 / 491 / 530 / — | no | 0 | 0 | 1612/676/1530/261 | 941/11/1422/258 |
| 4 | combo | win / won | 525 | 88.38% / 594 | 2 / 19 / 59 / 150 / 228 / 297 / 325 / 525 | no | 0 | 0 | 2519/1152/2120/1534 | 1872/394/2010/1522 |
| 5 | spam | win / won | 621 | 98.57% / 630 | 2 / 96 / 113 / 322 / 470 / 487 / 488 / 621 | no | 0 | 0 | 1327/1151/1589/275 | 771/7/1241/263 |
| 5 | combo | win / won | 484 | 76.83% / 630 | 2 / 44 / 65 / 130 / 249 / 260 / 261 / 484 | no | 0 | 0 | 1304/1295/1864/855 | 963/203/1500/852 |
| 6 | spam | loss / board-full | 630 | 98.59% / 639 | 2 / 13 / 47 / 225 / 510 / 511 / — / — | no | 0 | 0 | 1416/1392/963/129 | 915/105/645/120 |
| 6 | combo | win / won | 342 | 53.52% / 639 | 2 / 11 / 45 / 60 / 110 / 122 / 156 / 342 | no | 0 | 0 | 1478/1151/906/996 | 1073/505/713/987 |
| 7 | spam | loss / board-full | 612 | 98.55% / 621 | 2 / 19 / 53 / 174 / 309 / 349 / 570 / — | no | 0 | 0 | 1638/834/1370/167 | 974/6/1268/155 |
| 7 | combo | win / won | 504 | 81.16% / 621 | 3 / 13 / 40 / 153 / 249 / 291 / 312 / 504 | no | 0 | 0 | 2845/1150/1755/1400 | 2208/494/1656/1388 |
| 8 | spam | loss / board-full | 564 | 99.47% / 567 | 2 / 13 / 98 / 118 / 250 / 299 / 321 / — | no | 0 | 0 | 1608/999/771/282 | 914/108/689/279 |
| 8 | combo | win / won | 371 | 65.43% / 567 | 2 / 12 / 39 / 63 / 117 / 183 / 225 / 371 | no | 0 | 0 | 1795/1151/1166/1390 | 1253/682/1092/1387 |
| 9 | spam | loss / board-full | 567 | 97.42% / 582 | 2 / 56 / 63 / 92 / 289 / 355 / 375 / — | no | 0 | 0 | 1877/837/915/279 | 1113/11/831/276 |
| 9 | combo | win / won | 402 | 69.07% / 582 | 2 / 24 / 29 / 65 / 176 / 237 / 287 / 402 | no | 0 | 0 | 2195/1161/1133/1302 | 1574/678/1087/1302 |
| 10 | spam | loss / board-full | 594 | 99.5% / 597 | 2 / 37 / 63 / 304 / 359 / 360 / — / — | no | 0 | 0 | 1653/791/1176/148 | 1039/8/1002/133 |
| 10 | combo | win / won | 501 | 83.92% / 597 | 2 / 22 / 40 / 129 / 204 / 246 / 258 / 501 | no | 0 | 0 | 2336/1150/1601/1124 | 1752/345/1437/1088 |
| 11 | spam | loss / board-full | 627 | 100% / 627 | 2 / 33 / 95 / 171 / 270 / 323 / 326 / — | no | 0 | 0 | 1290/1249/1589/218 | 698/10/1241/164 |
| 11 | combo | win / won | 438 | 69.86% / 627 | 2 / 29 / 48 / 113 / 179 / 212 / 231 / 438 | no | 0 | 0 | 1859/1153/1351/1150 | 1340/332/1143/1099 |
| 12 | spam | loss / board-full | 180 | 29.13% / 618 | — / — / — / — / — / — / — / — | no | 0 | 138 | 1017/0/0/0 | 663/0/0/0 |
| 12 | combo | win / won | 390 | 63.11% / 618 | 33 / 36 / 43 / 79 / 140 / 177 / 219 / 390 | no | 0 | 0 | 2012/1150/1168/1176 | 1491/608/1083/1164 |
| 13 | spam | loss / board-full | 582 | 98.98% / 588 | 7 / 199 / 373 / 390 / 430 / 450 / 451 / — | no | 0 | 0 | 1232/1215/1239/198 | 866/6/909/198 |
| 13 | combo | win / won | 354 | 60.2% / 588 | 7 / 44 / 65 / 84 / 144 / 162 / 192 / 354 | no | 0 | 0 | 1594/1153/1048/947 | 1172/639/948/938 |
| 14 | spam | loss / board-full | 552 | 98.92% / 558 | 2 / 178 / 191 / 269 / 436 / 451 / 452 / — | no | 0 | 0 | 918/1467/1110/189 | 489/408/864/183 |
| 14 | combo | win / won | 403 | 72.22% / 558 | 2 / 33 / 45 / 99 / 182 / 191 / 192 / 403 | no | 0 | 0 | 1303/1695/1339/886 | 871/1008/1156/880 |
| 15 | spam | loss / board-full | 576 | 99.48% / 579 | 2 / 28 / 48 / 184 / 276 / 339 / 367 / — | no | 0 | 0 | 1232/892/1284/244 | 652/37/1128/232 |
| 15 | combo | win / won | 454 | 78.41% / 579 | 3 / 14 / 30 / 119 / 235 / 276 / 309 / 454 | no | 0 | 0 | 1627/1150/1692/1185 | 1129/464/1538/1173 |
| 16 | spam | loss / board-full | 585 | 99.49% / 588 | 2 / 199 / 355 / 392 / 434 / 476 / 477 / — | no | 0 | 0 | 981/1334/1266/176 | 570/114/954/176 |
| 16 | combo | win / won | 488 | 82.99% / 588 | 2 / 29 / 57 / 84 / 167 / 188 / 189 / 488 | no | 0 | 0 | 1303/1818/1668/1057 | 818/866/1387/1039 |
| 17 | spam | loss / board-full | 597 | 100% / 597 | 2 / 21 / 52 / 204 / 314 / 363 / 410 / — | no | 0 | 0 | 1947/819/1031/312 | 1166/11/892/309 |
| 17 | combo | win / won | 504 | 84.42% / 597 | 3 / 13 / 47 / 147 / 268 / 298 / 329 / 504 | no | 0 | 0 | 2961/1152/1525/1823 | 2215/388/1384/1811 |
| 18 | spam | win / won | 590 | 94.55% / 624 | 2 / 14 / 45 / 108 / 268 / 291 / 311 / 590 | no | 0 | 0 | 1458/1153/986/373 | 840/7/710/355 |
| 18 | combo | win / won | 417 | 66.83% / 624 | 2 / 13 / 26 / 60 / 177 / 201 / 219 / 417 | no | 0 | 0 | 1971/1152/1054/1355 | 1401/491/896/1337 |
| 19 | spam | loss / board-full | 642 | 100% / 642 | 2 / 33 / 56 / 133 / 199 / 271 / 308 / — | no | 0 | 0 | 2278/1061/778/331 | 1556/10/592/313 |
| 19 | combo | win / won | 426 | 66.36% / 642 | 2 / 31 / 50 / 75 / 159 / 199 / 242 / 426 | no | 0 | 0 | 2452/1151/904/1367 | 1870/498/772/1352 |
| 20 | spam | loss / board-full | 621 | 98.1% / 633 | 9 / 12 / 80 / 141 / 174 / 199 / 262 / — | no | 0 | 0 | 2058/1152/612/231 | 1359/168/516/222 |
| 20 | combo | win / won | 378 | 59.72% / 633 | 8 / 12 / 33 / 98 / 122 / 137 / 146 / 378 | no | 0 | 0 | 2012/1263/853/1059 | 1518/691/735/1050 |
| 21 | spam | loss / board-full | 567 | 97.93% / 579 | 18 / 39 / 69 / 400 / 484 / 512 / 536 / — | no | 0 | 0 | 1646/659/1029/220 | 951/10/819/211 |
| 21 | combo | win / won | 554 | 95.68% / 579 | 25 / 42 / 69 / 155 / 238 / 279 / 309 / 554 | no | 0 | 0 | 2901/1152/1644/1655 | 2193/224/1420/1616 |
| 22 | spam | loss / board-full | 606 | 98.06% / 618 | 2 / 26 / 43 / 167 / 447 / 463 / 588 / — | no | 0 | 0 | 2689/683/354/197 | 1831/5/348/197 |
| 22 | combo | win / won | 495 | 80.1% / 618 | 3 / 12 / 34 / 122 / 241 / 276 / 295 / 495 | no | 0 | 0 | 3808/1153/936/1750 | 2983/653/928/1741 |
| 23 | spam | stuck / stuck | 6 | 0.91% / 657 | — / — / — / — / — / — / — / — | yes | 0 | 150 | 0/0/48/3 | 0/0/48/3 |
| 23 | combo | win / won | 351 | 53.42% / 657 | 8 / 15 / 35 / 63 / 123 / 165 / 188 / 351 | no | 0 | 0 | 1724/1153/945/1175 | 1185/729/874/1163 |
| 24 | spam | loss / board-full | 606 | 100% / 606 | 2 / 39 / 64 / 164 / 417 / 513 / 565 / — | no | 0 | 0 | 2460/626/546/284 | 1543/9/540/284 |
| 24 | combo | win / won | 497 | 82.01% / 606 | 2 / 21 / 45 / 128 / 246 / 277 / 301 / 497 | no | 0 | 0 | 3711/1152/1139/1945 | 2811/664/1130/1942 |
| 25 | spam | loss / board-full | 594 | 98.51% / 603 | 21 / 27 / 46 / 153 / 507 / 508 / 564 / — | no | 0 | 0 | 1032/1461/1206/159 | 675/216/864/153 |
| 25 | combo | win / won | 405 | 67.16% / 603 | 30 / 42 / 56 / 80 / 147 / 157 / 158 / 405 | no | 0 | 0 | 1306/1537/1326/682 | 1019/679/1059/676 |
| 26 | spam | loss / board-full | 612 | 99.03% / 618 | 2 / 42 / 49 / 141 / 238 / 262 / 306 / — | no | 0 | 0 | 2327/915/459/261 | 1546/8/399/237 |
| 26 | combo | win / won | 417 | 67.48% / 618 | 2 / 27 / 48 / 105 / 179 / 205 / 235 / 417 | no | 0 | 0 | 2348/1287/851/1318 | 1691/753/776/1288 |
| 27 | spam | loss / board-full | 597 | 100% / 597 | 2 / 30 / 51 / 194 / 313 / 376 / 405 / — | no | 0 | 0 | 1787/899/1106/385 | 1178/0/962/382 |
| 27 | combo | win / won | 465 | 77.89% / 597 | 3 / 29 / 51 / 135 / 237 / 279 / 312 / 465 | no | 0 | 0 | 2335/1156/1502/1473 | 1755/449/1351/1464 |
| 28 | spam | loss / board-full | 594 | 99% / 600 | 2 / 199 / 240 / 265 / 407 / 475 / 476 / — | no | 0 | 0 | 980/1497/969/249 | 430/460/699/249 |
| 28 | combo | win / won | 351 | 58.5% / 600 | 2 / 15 / 42 / 87 / 104 / 155 / 158 / 351 | no | 0 | 0 | 1324/1153/921/761 | 963/545/765/740 |
| 29 | spam | loss / board-full | 627 | 100% / 627 | 12 / 15 / 108 / 238 / 392 / 439 / 440 / — | no | 0 | 0 | 1182/1274/1359/247 | 667/36/1029/235 |
| 29 | combo | win / won | 461 | 73.52% / 627 | 12 / 15 / 24 / 147 / 194 / 209 / 210 / 461 | no | 0 | 0 | 1303/1609/1668/939 | 870/728/1394/927 |
| 30 | spam | loss / board-full | 573 | 99.48% / 576 | 2 / 49 / 201 / 283 / 338 / 398 / 399 / — | no | 0 | 1 | 1310/1035/1111/217 | 864/9/883/217 |
| 30 | combo | win / won | 426 | 73.96% / 576 | 3 / 12 / 26 / 78 / 153 / 186 / 216 / 426 | no | 0 | 1 | 1669/1153/1562/888 | 1273/472/1407/882 |
| 31 | spam | loss / board-full | 609 | 99.02% / 615 | 2 / 57 / 238 / 436 / 515 / 530 / 531 / — | no | 0 | 0 | 915/1437/1150/252 | 571/230/814/252 |
| 31 | combo | win / won | 464 | 75.45% / 615 | 2 / 33 / 57 / 114 / 222 / 231 / 232 / 464 | no | 0 | 0 | 1304/1932/1523/956 | 879/1048/1221/947 |
| 32 | spam | loss / board-full | 624 | 100% / 624 | 2 / 205 / 387 / 556 / 583 / 595 / — / — | no | 0 | 0 | 724/1887/1295/126 | 365/444/821/126 |
| 32 | combo | win / won | 334 | 53.53% / 624 | 3 / 21 / 54 / 170 / 191 / 200 / 201 / 334 | no | 0 | 0 | 1431/1154/899/814 | 1052/590/756/796 |
| 33 | spam | loss / board-full | 585 | 100% / 585 | 2 / 17 / 286 / 310 / 322 / 360 / 427 / — | no | 0 | 0 | 2081/835/787/382 | 1289/5/727/376 |
| 33 | combo | win / won | 455 | 77.78% / 585 | 3 / 12 / 84 / 108 / 192 / 257 / 291 / 455 | no | 0 | 0 | 2756/1156/1337/1538 | 2049/578/1295/1532 |
| 34 | spam | loss / board-full | 615 | 97.62% / 630 | 2 / 112 / 261 / 380 / 470 / 487 / 488 / — | no | 0 | 0 | 1106/1407/1024/226 | 735/321/820/226 |
| 34 | combo | win / won | 456 | 72.38% / 630 | 2 / 32 / 60 / 167 / 243 / 254 / 255 / 456 | no | 0 | 0 | 1300/2178/1638/1184 | 770/1509/1470/1184 |
| 35 | spam | stuck / stuck | 546 | 94.79% / 576 | 2 / 21 / 31 / 138 / 236 / 293 / 321 / — | no | 0 | 0 | 2052/769/504/194 | 1331/0/420/185 |
| 35 | combo | win / won | 440 | 76.39% / 576 | 2 / 20 / 30 / 76 / 165 / 207 / 248 / 440 | no | 0 | 0 | 2850/1154/969/1709 | 2207/562/869/1700 |
| 36 | spam | loss / board-full | 591 | 98.5% / 600 | 2 / 193 / 205 / 285 / 400 / 423 / 424 / — | no | 0 | 0 | 1318/1071/1289/194 | 887/11/1097/194 |
| 36 | combo | win / won | 400 | 66.67% / 600 | 3 / 18 / 35 / 92 / 168 / 217 / 246 / 400 | no | 0 | 0 | 1305/1269/1633/933 | 961/557/1450/930 |
| 37 | spam | loss / board-full | 618 | 100% / 618 | 5 / 213 / 224 / 248 / 282 / 303 / 304 / — | no | 0 | 0 | 2119/1030/796/298 | 1389/5/658/289 |
| 37 | combo | win / won | 423 | 68.45% / 618 | 5 / 24 / 47 / 63 / 150 / 171 / 198 / 423 | no | 0 | 0 | 2944/1156/874/1537 | 2242/643/821/1528 |
| 38 | spam | loss / board-full | 663 | 94.85% / 699 | 36 / 40 / 310 / 513 / — / — / — / — | no | 0 | 9 | 1899/1419/417/117 | 1164/246/219/105 |
| 38 | combo | win / won | 411 | 58.8% / 699 | 21 / 24 / 33 / 83 / 124 / 189 / 190 / 411 | no | 0 | 1 | 2032/1408/852/938 | 1526/577/569/920 |
| 39 | spam | loss / board-full | 522 | 81.69% / 639 | 12 / 16 / 97 / — / — / — / — / — | no | 0 | 23 | 1686/976/428/59 | 1121/11/320/35 |
| 39 | combo | win / won | 444 | 69.48% / 639 | 17 / 21 / 44 / 74 / 151 / 165 / 207 / 444 | no | 0 | 0 | 2972/1162/1076/1277 | 2229/688/1055/1262 |
| 40 | spam | loss / board-full | 657 | 100% / 657 | 2 / 235 / 277 / 358 / 427 / 444 / 445 / — | no | 0 | 0 | 1566/1332/1050/207 | 1272/9/744/207 |
| 40 | combo | win / won | 444 | 67.58% / 657 | 2 / 72 / 110 / 180 / 280 / 292 / 293 / 444 | no | 0 | 0 | 1304/1965/1390/749 | 890/1108/1104/749 |
| 41 | spam | loss / board-full | 579 | 96.98% / 597 | 2 / 190 / 364 / 484 / — / — / — / — | no | 0 | 5 | 434/1586/1524/171 | 238/365/1170/171 |
| 41 | combo | win / won | 571 | 95.64% / 597 | 2 / 24 / 59 / 141 / 302 / 356 / 357 / 571 | no | 0 | 0 | 1300/2603/2336/1171 | 872/1556/2034/1171 |
| 42 | spam | loss / board-full | 603 | 99.01% / 609 | 2 / 213 / 224 / 294 / 483 / 500 / 501 / — | no | 0 | 0 | 1003/1722/1008/210 | 487/582/720/198 |
| 42 | combo | win / won | 366 | 60.1% / 609 | 2 / 50 / 62 / 102 / 150 / 200 / 201 / 366 | no | 0 | 0 | 1311/1705/1141/764 | 922/1112/1013/743 |
| 43 | spam | loss / board-full | 624 | 100% / 624 | 2 / 14 / 60 / 174 / 271 / 362 / 422 / — | no | 0 | 0 | 1768/1003/1499/347 | 1179/8/1235/344 |
| 43 | combo | win / won | 488 | 78.21% / 624 | 2 / 12 / 39 / 102 / 193 / 249 / 267 / 488 | no | 0 | 0 | 2338/1151/1739/1331 | 1779/307/1532/1325 |
| 44 | spam | loss / board-full | 585 | 89.45% / 654 | 2 / 54 / 234 / — / — / — / — / — | no | 0 | 17 | 1752/1155/495/42 | 1242/21/261/30 |
| 44 | combo | win / won | 408 | 62.39% / 654 | 3 / 20 / 42 / 105 / 122 / 142 / 165 / 408 | no | 0 | 0 | 2070/1593/852/1241 | 1473/1034/745/1214 |
| 45 | spam | loss / board-full | 630 | 96.77% / 651 | 2 / 214 / 226 / 252 / 322 / 344 / 345 / — | no | 0 | 1 | 1815/1188/925/223 | 1198/10/655/217 |
| 45 | combo | win / won | 384 | 58.99% / 651 | 3 / 24 / 41 / 63 / 135 / 183 / 227 / 384 | no | 0 | 1 | 1757/1152/1038/994 | 1291/514/900/976 |
| 46 | spam | loss / board-full | 492 | 75.58% / 651 | 2 / 20 / — / — / — / — / — / — | no | 0 | 43 | 1533/1182/0/42 | 861/342/0/42 |
| 46 | combo | win / won | 467 | 71.74% / 651 | 2 / 18 / 87 / 164 / 192 / 228 / 243 / 467 | no | 0 | 0 | 3035/1346/851/1606 | 2305/688/727/1591 |
| 47 | spam | loss / board-full | 642 | 98.62% / 651 | 2 / 212 / 251 / 303 / 339 / 357 / 367 / — | no | 0 | 0 | 1653/1299/849/183 | 1111/77/639/183 |
| 47 | combo | win / won | 400 | 61.44% / 651 | 3 / 44 / 59 / 105 / 139 / 151 / 184 / 400 | no | 0 | 0 | 1775/1381/850/945 | 1305/624/687/927 |
| 48 | spam | loss / board-full | 627 | 99.52% / 630 | 2 / 204 / 267 / 368 / 591 / 592 / — / — | no | 0 | 1 | 1423/1279/1090/130 | 1142/60/868/130 |
| 48 | combo | win / won | 346 | 54.92% / 630 | 2 / 77 / 104 / 171 / 192 / 210 / 211 / 346 | no | 0 | 0 | 1301/1376/1259/734 | 937/774/1125/734 |
| 49 | spam | loss / board-full | 645 | 99.54% / 648 | 2 / 97 / 141 / 219 / 509 / 545 / 606 / — | no | 0 | 0 | 2233/621/909/252 | 1344/10/811/252 |
| 49 | combo | win / won | 567 | 87.5% / 648 | 2 / 48 / 74 / 144 / 252 / 297 / 335 / 567 | no | 0 | 0 | 3442/1150/1476/1963 | 2576/387/1367/1936 |
| 50 | spam | loss / board-full | 630 | 100% / 630 | 2 / 37 / 110 / 478 / 563 / — / — / — | no | 0 | 0 | 3060/456/402/387 | 2014/6/390/381 |
| 50 | combo | win / won | 579 | 91.9% / 630 | 2 / 20 / 48 / 183 / 285 / 315 / 351 / 579 | no | 0 | 0 | 5046/1157/1045/2891 | 3903/583/1027/2885 |

Per-run checkpoint vectors below use **wood/stone/water/food**; each cell is `held : max cost (biome)`. The JSON retains unrounded values, lifetime totals, and living-slot fill at every threshold.

| Seed | Bot | T3 stock : cost | T4 stock : cost | T5 stock : cost | T6 stock : cost | T7 stock : cost |
|---|---|---|---|---|---|---|
| 1 | spam | 45/189/387/42 : 3/2/0/0 (forest) | 585/186/420/87 : 2/2/0/0 (arctic) | — | — | — |
| 1 | combo | 81/190/120/2 : 2/2/0/0 (arctic) | 242/237/157/93 : 2/3/1/0 (taiga) | 342/287/190/152 : 2/2/0/0 (arctic) | 417/303/260/194 : 3/2/0/0 (forest) | 727/316/337/413 : 2/3/1/0 (taiga) |
| 2 | spam | 44/135/347/23 : 3/2/0/0 (forest) | 1090/9/391/91 : 2/2/0/0 (arctic) | 1234/5/537/120 : 2/2/0/0 (arctic) | 1238/3/537/120 : 2/2/0/0 (arctic) | 1446/7/569/152 : 2/2/0/0 (arctic) |
| 2 | combo | 219/55/108/82 : 2/3/1/0 (taiga) | 255/192/140/90 : 3/2/0/0 (forest) | 597/138/573/438 : 2/4/2/0 (desert) | 824/121/680/599 : 2/4/2/0 (desert) | 883/137/705/681 : 2/4/2/0 (desert) |
| 3 | spam | 47/136/90/12 : 3/2/0/0 (forest) | 795/4/380/83 : 3/2/0/0 (forest) | 1024/4/468/111 : 3/2/0/0 (forest) | 1021/9/468/113 : 3/2/1/0 (polarDesert) | 1226/2/516/141 : 2/2/0/0 (arctic) |
| 3 | combo | 228/90/40/71 : 2/2/0/0 (arctic) | 500/119/174/252 : 3/2/0/0 (forest) | 603/153/374/384 : 2/2/0/0 (arctic) | 656/168/461/440 : 2/4/2/0 (desert) | 673/170/522/448 : 2/4/2/0 (desert) |
| 4 | spam | 91/4/472/40 : 2/2/0/0 (arctic) | 118/6/817/142 : 2/2/0/0 (arctic) | 679/4/1072/231 : 2/2/0/0 (arctic) | 804/4/1332/250 : 2/2/0/0 (arctic) | 830/3/1399/252 : 2/4/2/0 (desert) |
| 4 | combo | 66/36/460/135 : 2/4/2/0 (desert) | 162/12/886/411 : 2/2/0/0 (arctic) | 620/64/1064/742 : 3/2/0/0 (forest) | 997/69/1325/984 : 3/2/0/0 (forest) | 1156/121/1404/1101 : 3/2/0/0 (forest) |
| 5 | spam | 32/0/441/48 : 2/3/1/0 (taiga) | 28/27/867/135 : 3/2/0/1 (steppe) | 126/0/1114/196 : 3/2/0/0 (forest) | 192/0/1114/204 : 3/2/0/0 (forest) | 195/0/1114/205 : 3/2/0/0 (forest) |
| 5 | combo | 56/21/404/147 : 3/2/0/0 (forest) | 157/2/674/261 : 3/2/0/0 (forest) | 315/10/913/367 : 2/2/0/0 (arctic) | 394/1/915/417 : 3/2/0/0 (forest) | 403/2/917/432 : 3/2/0/0 (forest) |
| 6 | spam | 79/145/40/0 : 2/2/0/0 (arctic) | 309/156/294/81 : 3/2/1/0 (polarDesert) | 510/330/537/111 : 2/2/0/0 (arctic) | 514/328/537/111 : 3/2/0/0 (forest) | — |
| 6 | combo | 174/171/44/101 : 2/2/0/0 (arctic) | 180/222/130/126 : 2/2/0/0 (arctic) | 321/328/261/248 : 3/2/0/0 (forest) | 397/330/278/308 : 3/2/0/0 (forest) | 557/353/416/469 : 2/4/2/0 (desert) |
| 7 | spam | 46/74/183/44 : 3/2/0/0 (forest) | 196/6/562/102 : 2/4/2/0 (desert) | 505/6/664/123 : 2/4/2/0 (desert) | 479/56/782/132 : 3/2/1/0 (polarDesert) | 792/4/1254/141 : 2/2/0/0 (arctic) |
| 7 | combo | 154/55/153/54 : 2/2/0/0 (arctic) | 693/28/542/393 : 2/4/2/0 (desert) | 1271/49/723/645 : 2/3/1/0 (taiga) | 1462/81/870/773 : 2/4/2/0 (desert) | 1549/129/937/829 : 3/2/0/0 (forest) |
| 8 | spam | 318/7/38/80 : 2/4/2/0 (desert) | 288/23/152/98 : 3/2/1/0 (polarDesert) | 506/23/326/175 : 3/2/1/0 (polarDesert) | 470/75/558/225 : 2/4/2/0 (desert) | 455/111/587/228 : 3/2/1/0 (polarDesert) |
| 8 | combo | 194/92/44/140 : 2/4/2/0 (desert) | 158/146/177/247 : 3/2/1/0 (polarDesert) | 313/246/329/466 : 3/2/0/0 (forest) | 521/268/665/654 : 3/2/1/0 (polarDesert) | 729/312/733/888 : 3/2/0/0 (forest) |
| 9 | spam | 63/180/126/18 : 3/2/0/0 (forest) | 150/135/162/94 : 3/2/0/0 (forest) | 584/5/570/249 : 3/2/1/0 (polarDesert) | 673/29/702/261 : 2/2/0/0 (arctic) | 642/98/738/264 : 2/2/0/0 (arctic) |
| 9 | combo | 78/132/52/18 : 3/2/0/0 (forest) | 272/132/131/122 : 2/4/2/0 (desert) | 707/152/510/538 : 2/2/0/0 (arctic) | 1060/181/614/789 : 3/2/0/1 (steppe) | 1388/215/696/1024 : 2/2/0/0 (arctic) |
| 10 | spam | 69/6/229/18 : 2/4/2/0 (desert) | 398/5/524/75 : 2/2/0/0 (arctic) | 428/7/800/105 : 2/2/0/0 (arctic) | 428/7/811/105 : 2/4/2/0 (desert) | — |
| 10 | combo | 78/50/210/76 : 3/2/0/1 (steppe) | 351/9/438/275 : 2/4/2/0 (desert) | 341/14/840/420 : 2/4/2/0 (desert) | 438/15/1020/456 : 2/4/2/0 (desert) | 453/55/1045/467 : 3/2/0/1 (steppe) |
| 11 | spam | 62/44/204/54 : 3/2/0/0 (forest) | 134/4/614/95 : 3/2/0/0 (forest) | 223/3/793/121 : 3/2/0/0 (forest) | 255/3/853/123 : 3/2/0/0 (forest) | 284/1/853/126 : 3/2/0/0 (forest) |
| 11 | combo | 83/100/140/40 : 2/4/2/0 (desert) | 138/93/590/218 : 3/2/0/1 (steppe) | 277/139/734/421 : 3/2/0/0 (forest) | 340/125/760/470 : 3/2/0/0 (forest) | 520/136/786/546 : 3/2/0/0 (forest) |
| 12 | spam | — | — | — | — | — |
| 12 | combo | 251/52/45/103 : 2/2/0/0 (arctic) | 263/140/222/181 : 2/2/0/0 (arctic) | 477/213/410/325 : 2/2/0/0 (arctic) | 658/271/470/522 : 3/2/1/0 (polarDesert) | 857/262/599/672 : 2/4/2/0 (desert) |
| 13 | spam | 6/160/804/92 : 2/2/0/0 (arctic) | 111/138/804/92 : 3/2/0/0 (forest) | 252/112/819/152 : 2/3/1/0 (taiga) | 316/86/855/158 : 3/2/0/0 (forest) | 321/84/855/158 : 3/2/0/0 (forest) |
| 13 | combo | 64/191/294/89 : 2/4/2/0 (desert) | 171/180/351/124 : 3/2/0/0 (forest) | 468/206/435/368 : 3/2/1/0 (polarDesert) | 474/284/484/444 : 3/2/1/0 (polarDesert) | 557/310/581/527 : 2/3/1/0 (taiga) |
| 14 | spam | 41/284/270/40 : 2/3/1/0 (taiga) | 103/335/555/102 : 3/2/0/0 (forest) | 118/535/825/168 : 3/2/0/0 (forest) | 190/517/825/168 : 3/2/0/0 (forest) | 194/515/825/168 : 3/2/0/0 (forest) |
| 14 | combo | 67/149/153/86 : 3/2/0/0 (forest) | 152/314/388/154 : 3/2/0/0 (forest) | 260/574/686/374 : 3/2/0/0 (forest) | 341/572/692/408 : 2/3/1/0 (taiga) | 357/578/698/414 : 2/3/1/0 (taiga) |
| 15 | spam | 45/60/81/54 : 3/2/0/0 (forest) | 122/9/606/137 : 3/2/0/0 (forest) | 254/6/864/171 : 3/2/1/0 (polarDesert) | 271/5/1035/204 : 3/2/1/0 (polarDesert) | 266/37/1050/214 : 2/2/0/0 (arctic) |
| 15 | combo | 75/79/70/60 : 3/2/0/0 (forest) | 392/69/505/257 : 2/4/2/0 (desert) | 562/10/1069/487 : 2/4/2/0 (desert) | 665/41/1264/553 : 3/2/1/0 (polarDesert) | 825/80/1325/717 : 3/2/0/0 (forest) |
| 16 | spam | 4/345/609/65 : 2/2/0/0 (arctic) | 188/271/609/90 : 3/2/0/0 (forest) | 236/192/807/138 : 2/3/1/0 (taiga) | 260/242/846/164 : 3/2/0/0 (forest) | 264/240/846/164 : 3/2/0/0 (forest) |
| 16 | combo | 57/312/96/48 : 2/4/2/0 (desert) | 159/312/188/140 : 3/2/0/0 (forest) | 268/299/574/368 : 3/2/0/0 (forest) | 346/279/660/439 : 3/2/0/0 (forest) | 355/280/662/455 : 3/2/0/0 (forest) |
| 17 | spam | 76/23/204/27 : 2/2/0/0 (arctic) | 486/6/312/153 : 2/2/0/0 (arctic) | 456/3/763/247 : 2/4/2/0 (desert) | 522/6/808/266 : 2/2/0/0 (arctic) | 598/5/839/269 : 2/4/2/0 (desert) |
| 17 | combo | 186/40/196/114 : 2/2/0/0 (arctic) | 662/10/363/523 : 3/2/0/1 (steppe) | 1159/7/882/1020 : 3/2/1/0 (polarDesert) | 1220/10/909/1070 : 2/4/2/0 (desert) | 1302/21/955/1152 : 2/4/2/0 (desert) |
| 18 | spam | 120/9/45/42 : 2/4/2/0 (desert) | 213/54/99/90 : 2/2/0/0 (arctic) | 510/6/417/227 : 2/2/0/0 (arctic) | 486/43/428/259 : 2/4/2/0 (desert) | 465/89/433/272 : 2/4/2/0 (desert) |
| 18 | combo | 77/78/40/97 : 2/2/0/0 (arctic) | 164/183/115/228 : 3/2/0/0 (forest) | 693/145/401/619 : 2/2/0/0 (arctic) | 718/191/425/703 : 3/2/1/0 (polarDesert) | 736/250/475/750 : 2/2/0/0 (arctic) |
| 19 | spam | 65/92/128/47 : 3/2/0/1 (steppe) | 327/4/219/166 : 2/4/2/0 (desert) | 379/31/336/225 : 2/4/2/0 (desert) | 564/5/367/243 : 2/4/2/0 (desert) | 624/6/394/253 : 3/2/0/0 (forest) |
| 19 | combo | 69/118/131/117 : 3/2/0/1 (steppe) | 180/112/198/231 : 3/2/0/0 (forest) | 614/155/275/505 : 2/4/2/0 (desert) | 714/153/409/604 : 3/2/0/1 (steppe) | 929/156/447/771 : 2/4/2/0 (desert) |
| 20 | spam | 46/242/144/48 : 3/2/0/0 (forest) | 144/363/192/90 : 2/2/0/0 (arctic) | 270/342/228/120 : 2/3/1/0 (taiga) | 299/349/276/147 : 3/2/0/0 (forest) | 507/288/308/174 : 2/4/2/0 (desert) |
| 20 | combo | 78/143/75/52 : 2/4/2/0 (desert) | 163/368/230/150 : 2/2/0/0 (arctic) | 326/372/265/250 : 2/3/1/0 (taiga) | 404/387/288/298 : 3/2/0/0 (forest) | 421/402/323/341 : 3/2/1/0 (polarDesert) |
| 21 | spam | 77/4/271/45 : 3/2/0/1 (steppe) | 957/3/490/175 : 2/4/2/0 (desert) | 927/3/758/198 : 2/4/2/0 (desert) | 938/3/779/205 : 2/4/2/0 (desert) | 953/4/798/211 : 2/4/2/0 (desert) |
| 21 | combo | 287/10/267/158 : 2/4/2/0 (desert) | 636/11/455/455 : 3/2/0/0 (forest) | 737/17/817/650 : 2/4/2/0 (desert) | 919/72/899/813 : 3/2/1/0 (polarDesert) | 1102/88/952/922 : 3/2/0/0 (forest) |
| 22 | spam | 55/97/72/25 : 3/2/0/0 (forest) | 486/0/174/90 : 3/2/0/0 (forest) | 1371/0/204/157 : 2/2/0/0 (arctic) | 1363/5/264/168 : 2/4/2/0 (desert) | 1755/13/344/193 : 2/2/0/0 (arctic) |
| 22 | combo | 114/61/90/129 : 3/2/0/0 (forest) | 634/103/224/480 : 2/2/0/0 (arctic) | 1490/139/354/920 : 2/2/0/0 (arctic) | 1556/192/533/993 : 3/2/1/0 (polarDesert) | 1665/249/581/1050 : 3/2/0/1 (steppe) |
| 23 | spam | — | — | — | — | — |
| 23 | combo | 60/129/107/73 : 2/2/0/0 (arctic) | 146/263/121/174 : 2/2/0/0 (arctic) | 445/295/191/427 : 3/2/0/1 (steppe) | 545/296/424/573 : 3/2/0/1 (steppe) | 543/322/449/622 : 2/4/2/0 (desert) |
| 24 | spam | 38/130/183/12 : 3/2/0/0 (forest) | 411/4/225/90 : 3/2/0/0 (forest) | 1034/4/375/235 : 2/2/0/0 (arctic) | 1246/9/477/251 : 2/2/0/0 (arctic) | 1353/5/520/264 : 2/2/0/0 (arctic) |
| 24 | combo | 52/111/193/108 : 3/2/0/0 (forest) | 681/95/253/575 : 2/2/0/0 (arctic) | 1351/129/537/999 : 2/2/0/0 (arctic) | 1549/193/573/1119 : 2/2/0/0 (arctic) | 1686/249/652/1209 : 2/2/0/0 (arctic) |
| 25 | spam | 81/42/169/19 : 2/4/2/0 (desert) | 174/183/354/90 : 3/2/0/0 (forest) | 411/288/858/117 : 3/2/1/0 (polarDesert) | 417/286/858/118 : 3/2/0/0 (forest) | 552/276/864/144 : 2/2/0/0 (arctic) |
| 25 | combo | 266/34/182/103 : 2/4/2/0 (desert) | 300/128/276/112 : 2/4/2/0 (desert) | 356/350/435/188 : 2/3/1/0 (taiga) | 428/339/435/232 : 3/2/0/0 (forest) | 437/339/435/232 : 3/2/0/0 (forest) |
| 26 | spam | 83/81/30/30 : 2/3/1/0 (taiga) | 403/5/113/147 : 3/2/1/0 (polarDesert) | 542/44/205/194 : 3/2/1/0 (polarDesert) | 503/110/244/203 : 3/2/1/0 (polarDesert) | 500/177/304/214 : 2/4/2/0 (desert) |
| 26 | combo | 115/162/28/51 : 2/3/1/0 (taiga) | 509/112/111/273 : 3/2/0/0 (forest) | 967/164/197/601 : 2/2/0/0 (arctic) | 983/225/251/666 : 2/2/0/0 (arctic) | 1044/332/322/815 : 2/2/0/0 (arctic) |
| 27 | spam | 79/32/162/55 : 2/2/0/0 (arctic) | 317/6/468/154 : 2/2/0/0 (arctic) | 491/6/566/264 : 2/2/0/0 (arctic) | 508/24/786/298 : 2/4/2/0 (desert) | 506/6/830/298 : 2/4/2/0 (desert) |
| 27 | combo | 240/47/168/151 : 2/2/0/0 (arctic) | 601/57/489/558 : 3/2/0/0 (forest) | 1065/55/688/941 : 3/2/0/0 (forest) | 1196/93/854/1073 : 3/2/1/0 (polarDesert) | 1361/140/969/1206 : 3/2/0/1 (steppe) |
| 28 | spam | 4/201/351/98 : 2/2/0/0 (arctic) | 96/154/351/149 : 3/2/0/0 (forest) | 48/489/588/215 : 3/2/0/0 (forest) | 29/645/660/233 : 2/3/1/0 (taiga) | 33/645/660/233 : 2/3/1/0 (taiga) |
| 28 | combo | 66/193/57/32 : 2/2/0/0 (arctic) | 306/251/104/222 : 2/4/2/0 (desert) | 320/308/182/262 : 3/2/1/0 (polarDesert) | 391/298/342/325 : 3/2/0/1 (steppe) | 400/299/342/339 : 3/2/0/1 (steppe) |
| 29 | spam | 81/84/279/96 : 3/2/0/0 (forest) | 123/1/674/169 : 2/2/0/0 (arctic) | 186/114/930/190 : 2/3/1/0 (taiga) | 218/165/975/196 : 2/3/1/0 (taiga) | 222/165/975/196 : 2/3/1/0 (taiga) |
| 29 | combo | 81/62/35/65 : 2/4/2/0 (desert) | 150/170/698/271 : 2/2/0/0 (arctic) | 277/270/806/445 : 3/2/0/0 (forest) | 358/267/835/496 : 2/3/1/0 (taiga) | 371/271/839/501 : 2/3/1/0 (taiga) |
| 30 | spam | 30/124/287/75 : 3/2/0/0 (forest) | 111/156/580/138 : 3/2/0/0 (forest) | 247/55/715/169 : 3/2/0/0 (forest) | 278/140/832/181 : 3/2/0/0 (forest) | 282/138/832/181 : 3/2/0/0 (forest) |
| 30 | combo | 74/96/47/55 : 2/2/0/0 (arctic) | 226/135/386/124 : 2/4/2/0 (desert) | 331/235/665/295 : 2/3/1/0 (taiga) | 445/212/785/369 : 3/2/0/0 (forest) | 583/262/809/492 : 2/4/2/0 (desert) |
| 31 | spam | 4/261/243/50 : 2/2/0/0 (arctic) | 4/426/684/198 : 2/2/0/0 (arctic) | 180/364/814/249 : 2/2/0/0 (arctic) | 252/352/814/249 : 2/3/1/0 (taiga) | 257/350/814/250 : 2/2/0/0 (arctic) |
| 31 | combo | 26/374/49/101 : 2/2/0/0 (arctic) | 134/484/306/240 : 3/2/1/0 (polarDesert) | 242/721/753/575 : 2/2/0/0 (arctic) | 313/715/755/603 : 3/2/0/0 (forest) | 318/713/755/604 : 2/2/0/0 (arctic) |
| 32 | spam | 5/383/537/55 : 2/2/0/0 (arctic) | 9/580/821/96 : 2/2/0/0 (arctic) | 174/526/821/120 : 3/2/0/0 (forest) | 243/502/821/123 : 3/2/0/0 (forest) | — |
| 32 | combo | 54/281/109/73 : 3/2/1/0 (polarDesert) | 150/456/439/216 : 2/4/2/0 (desert) | 320/441/451/305 : 3/2/0/0 (forest) | 394/434/453/349 : 2/3/1/0 (taiga) | 407/436/455/351 : 2/3/1/0 (taiga) |
| 33 | spam | 852/2/41/204 : 3/2/0/0 (forest) | 852/56/110/222 : 2/4/2/0 (desert) | 849/26/191/243 : 2/3/1/0 (taiga) | 828/9/421/287 : 2/4/2/0 (desert) | 922/5/546/342 : 3/2/1/0 (polarDesert) |
| 33 | combo | 502/63/43/404 : 2/3/1/0 (taiga) | 522/141/113/471 : 3/2/1/0 (polarDesert) | 862/119/348/714 : 2/3/1/0 (taiga) | 964/95/719/853 : 2/2/0/0 (arctic) | 1130/122/804/973 : 3/2/0/0 (forest) |
| 34 | spam | 4/361/467/101 : 2/2/0/0 (arctic) | 5/578/727/172 : 2/2/0/0 (arctic) | 164/563/790/214 : 2/2/0/0 (arctic) | 232/539/790/214 : 2/3/1/0 (taiga) | 238/539/790/214 : 2/3/1/0 (taiga) |
| 34 | combo | 25/275/198/126 : 2/2/0/0 (arctic) | 23/631/732/454 : 2/2/0/0 (arctic) | 134/1027/989/664 : 2/2/0/0 (arctic) | 213/1026/999/714 : 3/2/0/0 (forest) | 222/1027/1001/729 : 3/2/0/0 (forest) |
| 35 | spam | 90/48/42/18 : 2/4/2/0 (desert) | 414/6/120/90 : 2/4/2/0 (desert) | 611/7/297/153 : 3/2/0/0 (forest) | 694/7/361/185 : 3/2/0/0 (forest) | 722/16/387/185 : 2/4/2/0 (desert) |
| 35 | combo | 143/68/48/95 : 3/2/0/0 (forest) | 331/158/117/230 : 2/4/2/0 (desert) | 850/182/278/653 : 3/2/0/0 (forest) | 1058/227/341/807 : 3/2/0/0 (forest) | 1259/249/409/973 : 2/4/2/0 (desert) |
| 36 | spam | 40/235/462/43 : 3/2/0/0 (forest) | 163/158/666/90 : 3/2/1/0 (polarDesert) | 151/226/1029/178 : 3/2/0/0 (forest) | 213/190/1065/178 : 2/3/1/0 (taiga) | 217/190/1065/178 : 2/3/1/0 (taiga) |
| 36 | combo | 95/90/165/18 : 2/4/2/0 (desert) | 258/138/400/90 : 2/4/2/0 (desert) | 351/74/803/323 : 3/2/0/0 (forest) | 598/84/868/446 : 2/4/2/0 (desert) | 658/79/969/466 : 2/4/2/0 (desert) |
| 37 | spam | 41/215/587/70 : 3/2/0/0 (forest) | 137/215/587/100 : 3/2/0/0 (forest) | 280/150/587/155 : 3/2/0/0 (forest) | 334/180/587/164 : 2/3/1/0 (taiga) | 334/186/587/165 : 3/2/0/1 (steppe) |
| 37 | combo | 81/142/161/41 : 2/4/2/0 (desert) | 206/138/179/94 : 2/3/1/0 (taiga) | 684/173/297/446 : 2/3/1/0 (taiga) | 759/250/344/490 : 2/3/1/0 (taiga) | 878/306/378/588 : 2/2/0/0 (arctic) |
| 38 | spam | 524/296/18/66 : 2/4/2/0 (desert) | 780/375/162/78 : 2/2/0/0 (arctic) | — | — | — |
| 38 | combo | 175/92/34/58 : 2/4/2/0 (desert) | 222/314/83/98 : 2/4/2/0 (desert) | 327/347/131/244 : 2/4/2/0 (desert) | 373/296/186/266 : 3/2/0/1 (steppe) | 379/296/186/266 : 2/3/1/0 (taiga) |
| 39 | spam | 161/185/42/3 : 2/2/0/0 (arctic) | — | — | — | — |
| 39 | combo | 126/207/32/34 : 2/4/2/0 (desert) | 214/276/120/102 : 3/2/0/0 (forest) | 753/291/187/421 : 3/2/0/1 (steppe) | 801/279/259/464 : 2/3/1/0 (taiga) | 870/300/491/583 : 2/3/1/0 (taiga) |
| 40 | spam | 18/242/412/82 : 2/2/0/0 (arctic) | 86/280/648/117 : 2/2/0/0 (arctic) | 295/204/719/152 : 2/2/0/0 (arctic) | 363/192/719/152 : 2/3/1/0 (taiga) | 368/192/719/153 : 2/3/1/0 (taiga) |
| 40 | combo | 23/279/338/152 : 2/2/0/0 (arctic) | 73/536/529/330 : 3/2/1/0 (polarDesert) | 209/865/849/506 : 2/2/0/0 (arctic) | 289/871/855/538 : 2/3/1/0 (taiga) | 298/869/855/538 : 2/3/1/0 (taiga) |
| 41 | spam | 5/419/597/95 : 2/2/0/0 (arctic) | 92/507/810/157 : 2/2/0/0 (arctic) | — | — | — |
| 41 | combo | 73/289/178/19 : 2/2/0/0 (arctic) | 179/495/424/181 : 2/4/2/0 (desert) | 278/652/1200/473 : 2/4/2/0 (desert) | 334/787/1412/622 : 2/4/2/0 (desert) | 341/791/1424/626 : 2/4/2/0 (desert) |
| 42 | spam | 39/306/219/50 : 3/2/0/0 (forest) | 130/372/354/138 : 2/2/0/0 (arctic) | 106/675/687/192 : 2/3/1/0 (taiga) | 174/663/687/192 : 2/3/1/0 (taiga) | 178/663/687/192 : 2/3/1/0 (taiga) |
| 42 | combo | 44/358/121/45 : 2/2/0/0 (arctic) | 158/474/238/136 : 3/2/0/0 (forest) | 297/631/331/295 : 2/4/2/0 (desert) | 374/720/531/397 : 2/4/2/0 (desert) | 377/720/539/398 : 2/4/2/0 (desert) |
| 43 | spam | 45/66/234/39 : 2/3/1/0 (taiga) | 83/1/609/138 : 2/2/0/0 (arctic) | 208/0/909/192 : 2/3/1/0 (taiga) | 353/4/1051/245 : 2/2/0/0 (arctic) | 513/3/1086/262 : 2/4/2/0 (desert) |
| 43 | combo | 71/61/161/88 : 2/3/1/0 (taiga) | 141/78/475/230 : 2/3/1/0 (taiga) | 384/42/866/393 : 2/4/2/0 (desert) | 668/72/972/644 : 3/2/1/0 (polarDesert) | 704/139/1027/660 : 2/2/0/0 (arctic) |
| 44 | spam | 579/192/27/12 : 2/2/0/0 (arctic) | — | — | — | — |
| 44 | combo | 81/261/38/43 : 2/4/2/0 (desert) | 396/396/108/259 : 3/2/1/0 (polarDesert) | 420/437/187/284 : 3/2/1/0 (polarDesert) | 427/472/247/335 : 2/4/2/0 (desert) | 453/539/323/394 : 3/2/1/0 (polarDesert) |
| 45 | spam | 44/115/363/75 : 3/2/0/0 (forest) | 146/91/373/91 : 2/3/1/0 (taiga) | 269/34/492/153 : 3/2/0/0 (forest) | 327/35/510/162 : 3/2/0/0 (forest) | 326/34/516/163 : 2/2/0/0 (arctic) |
| 45 | combo | 74/124/112/45 : 3/2/0/0 (forest) | 174/142/137/127 : 3/2/0/1 (steppe) | 369/157/275/340 : 2/4/2/0 (desert) | 502/165/415/452 : 3/2/0/0 (forest) | 619/191/556/546 : 2/2/0/0 (arctic) |
| 46 | spam | — | — | — | — | — |
| 46 | combo | 489/148/39/271 : 3/2/0/0 (forest) | 1000/156/121/676 : 2/3/1/0 (taiga) | 1092/172/214/766 : 2/3/1/0 (taiga) | 1276/292/267/902 : 3/2/0/0 (forest) | 1302/293/359/957 : 3/2/0/0 (forest) |
| 47 | spam | 5/394/297/31 : 2/2/0/0 (arctic) | 103/266/465/109 : 3/2/0/0 (forest) | 251/204/501/127 : 3/2/0/0 (forest) | 320/177/516/145 : 2/3/1/0 (taiga) | 326/219/521/150 : 2/3/1/0 (taiga) |
| 47 | combo | 57/373/42/39 : 2/2/0/0 (arctic) | 158/334/227/167 : 3/2/0/0 (forest) | 313/339/277/253 : 2/3/1/0 (taiga) | 392/329/300/287 : 3/2/0/0 (forest) | 610/377/330/390 : 2/3/1/0 (taiga) |
| 48 | spam | 6/285/522/78 : 2/2/0/0 (arctic) | 94/314/838/90 : 2/2/0/0 (arctic) | 1066/8/858/123 : 2/2/0/0 (arctic) | 1066/14/858/123 : 2/4/2/0 (desert) | — |
| 48 | combo | 52/259/323/134 : 2/2/0/0 (arctic) | 101/484/667/266 : 2/2/0/0 (arctic) | 259/480/683/377 : 3/2/0/0 (forest) | 345/558/719/401 : 2/3/1/0 (taiga) | 345/555/726/404 : 2/3/1/0 (taiga) |
| 49 | spam | 322/4/236/100 : 2/2/0/0 (arctic) | 282/3/518/182 : 2/4/2/0 (desert) | 1019/5/712/220 : 2/2/0/0 (arctic) | 1019/5/778/229 : 2/2/0/0 (arctic) | 1170/10/793/234 : 2/2/0/0 (arctic) |
| 49 | combo | 320/7/223/319 : 2/2/0/0 (arctic) | 466/67/508/565 : 3/2/1/0 (polarDesert) | 936/51/770/830 : 2/2/0/0 (arctic) | 1123/96/929/1004 : 3/2/0/0 (forest) | 1365/130/1016/1176 : 2/4/2/0 (desert) |
| 50 | spam | 312/6/72/120 : 3/2/0/0 (forest) | 1681/4/154/320 : 3/2/0/0 (forest) | 1732/48/364/360 : 2/4/2/0 (desert) | — | — |
| 50 | combo | 249/51/68/180 : 3/2/0/0 (forest) | 1226/55/218/946 : 3/2/0/0 (forest) | 1938/115/434/1421 : 3/2/0/0 (forest) | 2124/180/468/1528 : 2/2/0/0 (arctic) | 2404/224/530/1729 : 3/2/0/0 (forest) |

## v4 round 4 — food and water spending

Real GameSession, 20×14, seeds 1–50, 134441 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offer/core scoring and tie rules are unchanged.

V4: T8 wins immediately. Loss means engine proof or no empty living slots after usable cores/offers/spread are exhausted (board-full bot loss; replacement escape may still exist). An unproven empty-slot stall is not a loss. Board use includes ALL map placeable slots, including dead land. All-seed threshold medians censor unreached thresholds as infinity. Stock pressure samples the T3–T7 payout transactions, against the current placement biome roster; positive stock against zero cost has infinite ratio. T7 requires ≥90% completion and EVERY completer below 60%, not only the median. False-loss audits check direct productive replacements and refund-funded unpaid base yields; they are a constructive check, not an exhaustive search of all future replacement sequences.

| Target | Result | Evidence |
|---|---|---|
| 1. Good play wins ≥90%; zero false loss | PASS | 50/50 combo wins; 0 detected false soft-locks |
| 2. Spam loses ≥90% | PASS | 46/50 spam losses before T8 |
| 3. Winning board use 65–85% | PASS | 68.76% median winning board use |
| 4. No opening stalls before T2 | PASS | zero combo opening stalls |
| 5. T3–T7 median stock ≤3× max cost | MISS | worst checkpoint/resource median stock/max-cost = 300.5× |
| 6. T7 before 60% board use | PASS | 50/50 reach T7; median 37.6%, max 59.8% |

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n |
|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 50/50 | 2 | 2 (2–36), 48/50 |
| T2 | 21.5 | 21.5 (11–77), 50/50 | 42 | 41 (12–235), 48/50 |
| T3 | 45 | 45 (24–110), 50/50 | 111.5 | 109 (31–387), 48/50 |
| T4 | 102 | 102 (60–183), 50/50 | 284 | 267 (92–556), 46/50 |
| T5 | 178 | 178 (104–302), 50/50 | 422 | 392 (174–591), 43/50 |
| T6 | 208 | 208 (122–356), 50/50 | 457 | 438.5 (199–595), 42/50 |
| T7 | 229.5 | 229.5 (146–357), 50/50 | 488 | 442.5 (262–624), 38/50 |
| T8 | 426 | 426 (334–579), 50/50 | ∞ | 605.5 (590–621), 2/50 |

| Combo stock checkpoint | Resource | Samples | Median held | Median max cost | Median held/max cost |
|---|---|---:|---:|---:|---:|
| T3 | wood | 50/50 | 78 | 2 | 38.25× |
| T3 | stone | 50/50 | 105.5 | 2 | 42.25× |
| T3 | water | 50/50 | 83.5 | 3 | 32.04× |
| T3 | food | 50/50 | 72 | 2 | 36.25× |
| T4 | wood | 50/50 | 210 | 2 | 91.5× |
| T4 | stone | 50/50 | 144 | 2 | 66.38× |
| T4 | water | 50/50 | 182 | 3 | 92.17× |
| T4 | food | 50/50 | 184.5 | 3 | 93.75× |
| T5 | wood | 50/50 | 400 | 2 | 174.5× |
| T5 | stone | 50/50 | 177.5 | 2 | 77.67× |
| T5 | water | 50/50 | 331.5 | 3 | 130.63× |
| T5 | food | 50/50 | 340 | 3 | 144.75× |
| T6 | wood | 50/50 | 533 | 3 | 215.25× |
| T6 | stone | 50/50 | 234 | 2 | 98.08× |
| T6 | water | 50/50 | 425 | 3 | 145.96× |
| T6 | food | 50/50 | 422.5 | 4 | 134.13× |
| T7 | wood | 50/50 | 665.5 | 2 | 300.5× |
| T7 | stone | 50/50 | 262 | 2 | 100.83× |
| T7 | water | 50/50 | 458.5 | 3 | 134.38× |
| T7 | food | 50/50 | 479 | 3 | 181.63× |

combo: 50 wins; 0 losses (0 board-full, 0 proven); 0 unproven stalls; 0 action-cap.

spam: 2 wins; 46 losses (46 board-full, 0 proven); 2 unproven stalls; 0 action-cap.

| Seed | Bot | Outcome / stop | Placements | Board use / map slots | T1–T8 placements | Opening stall | False loss | Legal core sites left | Final lifetime W/S/A/F | Final stock W/S/A/F |
|---|---|---|---:|---|---|---|---:|---:|---|---|
| 1 | spam | loss / board-full | 612 | 95.33% / 642 | 2 / 193 / 201 / 372 / — / — / — / — | no | 0 | 9 | 1964/1078/756/114 | 1305/9/218/107 |
| 1 | combo | win / won | 357 | 55.61% / 642 | 2 / 18 / 42 / 78 / 105 / 125 / 177 / 357 | no | 0 | 0 | 1666/1151/940/676 | 1266/592/572/533 |
| 2 | spam | loss / board-full | 633 | 99.53% / 636 | 2 / 204 / 209 / 522 / 579 / 580 / 624 / — | no | 0 | 0 | 2127/1195/803/158 | 1488/7/248/166 |
| 2 | combo | win / won | 425 | 66.82% / 636 | 3 / 16 / 42 / 65 / 171 / 226 / 254 / 425 | no | 0 | 0 | 2189/1154/1230/1226 | 1645/463/739/934 |
| 3 | spam | loss / board-full | 609 | 99.02% / 615 | 12 / 15 / 52 / 417 / 486 / 487 / 568 / — | no | 0 | 0 | 2088/1059/770/164 | 1395/0/220/135 |
| 3 | combo | win / won | 399 | 64.88% / 615 | 23 / 29 / 40 / 100 / 167 / 202 / 228 / 399 | no | 0 | 0 | 1647/1157/1024/911 | 1201/476/509/693 |
| 4 | spam | loss / board-full | 582 | 97.98% / 594 | 2 / 42 / 100 / 198 / 381 / 491 / 530 / — | no | 0 | 0 | 1612/676/1530/261 | 941/11/668/182 |
| 4 | combo | win / won | 525 | 88.38% / 594 | 2 / 19 / 59 / 150 / 228 / 297 / 325 / 525 | no | 0 | 0 | 2519/1152/2120/1534 | 1872/394/1379/1190 |
| 5 | spam | win / won | 621 | 98.57% / 630 | 2 / 96 / 113 / 322 / 470 / 487 / 488 / 621 | no | 0 | 0 | 1327/1151/1589/275 | 771/7/532/192 |
| 5 | combo | win / won | 484 | 76.83% / 630 | 2 / 44 / 65 / 130 / 249 / 260 / 261 / 484 | no | 0 | 0 | 1304/1295/1864/855 | 963/203/889/686 |
| 6 | spam | loss / board-full | 630 | 98.59% / 639 | 2 / 13 / 47 / 225 / 510 / 511 / — / — | no | 0 | 0 | 1416/1392/963/129 | 915/105/218/98 |
| 6 | combo | win / won | 342 | 53.52% / 639 | 2 / 11 / 45 / 60 / 110 / 122 / 156 / 342 | no | 0 | 0 | 1478/1151/906/996 | 1073/505/495/787 |
| 7 | spam | loss / board-full | 612 | 98.55% / 621 | 2 / 19 / 53 / 174 / 309 / 349 / 570 / — | no | 0 | 0 | 1638/834/1370/167 | 974/6/562/92 |
| 7 | combo | win / won | 504 | 81.16% / 621 | 3 / 13 / 40 / 153 / 249 / 291 / 312 / 504 | no | 0 | 0 | 2845/1150/1755/1400 | 2208/494/1162/1116 |
| 8 | spam | loss / board-full | 564 | 99.47% / 567 | 2 / 13 / 98 / 118 / 250 / 299 / 321 / — | no | 0 | 0 | 1608/999/771/282 | 914/108/298/206 |
| 8 | combo | win / won | 371 | 65.43% / 567 | 2 / 12 / 39 / 63 / 117 / 183 / 225 / 371 | no | 0 | 0 | 1795/1151/1166/1390 | 1253/682/764/1109 |
| 9 | spam | loss / board-full | 567 | 97.42% / 582 | 2 / 56 / 63 / 92 / 289 / 355 / 375 / — | no | 0 | 0 | 1877/837/915/279 | 1113/11/356/191 |
| 9 | combo | win / won | 402 | 69.07% / 582 | 2 / 24 / 29 / 65 / 177 / 240 / 287 / 402 | no | 0 | 0 | 2195/1159/1141/1302 | 1574/674/752/1014 |
| 10 | spam | loss / board-full | 594 | 99.5% / 597 | 2 / 37 / 63 / 304 / 359 / 360 / — / — | no | 0 | 0 | 1653/791/1176/148 | 1039/8/476/93 |
| 10 | combo | win / won | 501 | 83.92% / 597 | 2 / 22 / 40 / 129 / 204 / 246 / 258 / 501 | no | 0 | 0 | 2336/1150/1601/1124 | 1752/345/978/860 |
| 11 | spam | loss / board-full | 627 | 100% / 627 | 2 / 33 / 95 / 171 / 270 / 323 / 326 / — | no | 0 | 0 | 1290/1249/1589/218 | 698/10/532/106 |
| 11 | combo | win / won | 438 | 69.86% / 627 | 2 / 29 / 48 / 113 / 179 / 212 / 231 / 438 | no | 0 | 0 | 1859/1153/1351/1150 | 1340/332/787/877 |
| 12 | spam | loss / board-full | 180 | 29.13% / 618 | — / — / — / — / — / — / — / — | no | 0 | 138 | 1017/0/0/0 | 663/0/8/8 |
| 12 | combo | win / won | 390 | 63.11% / 618 | 33 / 36 / 43 / 79 / 140 / 177 / 219 / 390 | no | 0 | 0 | 2012/1150/1168/1176 | 1491/608/756/914 |
| 13 | spam | loss / board-full | 582 | 98.98% / 588 | 7 / 199 / 373 / 390 / 430 / 450 / 451 / — | no | 0 | 0 | 1232/1215/1239/198 | 866/6/353/170 |
| 13 | combo | win / won | 354 | 60.2% / 588 | 7 / 44 / 65 / 84 / 144 / 162 / 192 / 354 | no | 0 | 0 | 1594/1153/1048/947 | 1172/639/657/748 |
| 14 | spam | loss / board-full | 552 | 98.92% / 558 | 2 / 178 / 191 / 269 / 436 / 451 / 452 / — | no | 0 | 0 | 918/1467/1110/189 | 489/408/368/128 |
| 14 | combo | win / won | 403 | 72.22% / 558 | 2 / 33 / 45 / 99 / 182 / 191 / 192 / 403 | no | 0 | 0 | 1303/1695/1339/886 | 871/1008/784/706 |
| 15 | spam | loss / board-full | 576 | 99.48% / 579 | 2 / 28 / 48 / 184 / 276 / 339 / 367 / — | no | 0 | 0 | 1232/892/1284/244 | 652/37/538/131 |
| 15 | combo | win / won | 454 | 78.41% / 579 | 3 / 14 / 30 / 119 / 235 / 276 / 309 / 454 | no | 0 | 0 | 1627/1150/1692/1185 | 1129/464/1021/890 |
| 16 | spam | loss / board-full | 585 | 99.49% / 588 | 2 / 199 / 355 / 392 / 434 / 476 / 477 / — | no | 0 | 0 | 981/1334/1266/176 | 570/114/356/125 |
| 16 | combo | win / won | 486 | 82.65% / 588 | 2 / 27 / 57 / 84 / 167 / 188 / 198 / 486 | no | 0 | 0 | 1301/1816/1698/1120 | 827/858/882/856 |
| 17 | spam | loss / board-full | 597 | 100% / 597 | 2 / 21 / 52 / 204 / 314 / 363 / 410 / — | no | 0 | 0 | 1947/819/1031/312 | 1166/11/459/215 |
| 17 | combo | win / won | 504 | 84.42% / 597 | 3 / 13 / 47 / 147 / 268 / 298 / 329 / 504 | no | 0 | 0 | 2961/1152/1525/1823 | 2215/388/1003/1415 |
| 18 | spam | win / won | 590 | 94.55% / 624 | 2 / 14 / 45 / 108 / 268 / 291 / 311 / 590 | no | 0 | 0 | 1458/1153/986/373 | 840/7/258/277 |
| 18 | combo | win / won | 417 | 66.83% / 624 | 2 / 13 / 26 / 60 / 177 / 201 / 219 / 417 | no | 0 | 0 | 1971/1152/1054/1355 | 1401/491/582/1051 |
| 19 | spam | loss / board-full | 642 | 100% / 642 | 2 / 33 / 56 / 133 / 199 / 271 / 308 / — | no | 0 | 0 | 2278/1061/778/331 | 1556/10/252/267 |
| 19 | combo | win / won | 426 | 66.36% / 642 | 2 / 31 / 50 / 75 / 159 / 199 / 242 / 426 | no | 0 | 0 | 2452/1151/904/1367 | 1870/498/555/1078 |
| 20 | spam | loss / board-full | 621 | 98.1% / 633 | 9 / 12 / 80 / 141 / 174 / 199 / 262 / — | no | 0 | 0 | 2058/1152/612/231 | 1359/168/212/179 |
| 20 | combo | win / won | 378 | 59.72% / 633 | 8 / 12 / 33 / 98 / 122 / 137 / 146 / 378 | no | 0 | 0 | 2012/1263/853/1059 | 1518/691/529/834 |
| 21 | spam | loss / board-full | 567 | 97.93% / 579 | 18 / 39 / 69 / 400 / 484 / 512 / 536 / — | no | 0 | 0 | 1646/659/1029/220 | 951/10/362/177 |
| 21 | combo | win / won | 554 | 95.68% / 579 | 25 / 42 / 69 / 155 / 238 / 279 / 309 / 554 | no | 0 | 0 | 2901/1152/1644/1655 | 2193/224/965/1293 |
| 22 | spam | loss / board-full | 606 | 98.06% / 618 | 2 / 26 / 43 / 167 / 447 / 463 / 588 / — | no | 0 | 0 | 2689/683/354/197 | 1831/5/168/170 |
| 22 | combo | win / won | 495 | 80.1% / 618 | 3 / 12 / 34 / 122 / 241 / 276 / 295 / 495 | no | 0 | 0 | 3808/1153/936/1750 | 2983/653/748/1397 |
| 23 | spam | stuck / stuck | 6 | 0.91% / 657 | — / — / — / — / — / — / — / — | yes | 0 | 150 | 0/0/48/3 | 0/0/32/11 |
| 23 | combo | win / won | 351 | 53.42% / 657 | 8 / 15 / 35 / 63 / 123 / 165 / 188 / 351 | no | 0 | 0 | 1724/1153/945/1175 | 1185/729/613/935 |
| 24 | spam | loss / board-full | 606 | 100% / 606 | 2 / 39 / 64 / 164 / 417 / 513 / 565 / — | no | 0 | 0 | 2460/626/546/284 | 1543/9/242/229 |
| 24 | combo | win / won | 497 | 82.01% / 606 | 2 / 21 / 45 / 128 / 246 / 277 / 301 / 497 | no | 0 | 0 | 3711/1152/1139/1945 | 2811/664/879/1554 |
| 25 | spam | loss / board-full | 594 | 98.51% / 603 | 21 / 27 / 46 / 153 / 507 / 508 / 564 / — | no | 0 | 0 | 1032/1461/1206/159 | 675/216/344/146 |
| 25 | combo | win / won | 405 | 67.16% / 603 | 30 / 42 / 56 / 80 / 147 / 157 / 158 / 405 | no | 0 | 0 | 1306/1537/1326/682 | 1019/679/695/590 |
| 26 | spam | loss / board-full | 612 | 99.03% / 618 | 2 / 42 / 49 / 141 / 238 / 262 / 306 / — | no | 0 | 0 | 2327/915/459/261 | 1546/8/164/142 |
| 26 | combo | win / won | 398 | 64.4% / 618 | 2 / 27 / 41 / 63 / 180 / 204 / 226 / 398 | no | 0 | 0 | 2185/1251/850/1245 | 1568/732/559/934 |
| 27 | spam | loss / board-full | 597 | 100% / 597 | 2 / 30 / 51 / 194 / 313 / 376 / 405 / — | no | 0 | 0 | 1787/899/1106/385 | 1178/0/478/296 |
| 27 | combo | win / won | 465 | 77.89% / 597 | 3 / 29 / 51 / 135 / 237 / 279 / 312 / 465 | no | 0 | 0 | 2335/1156/1502/1473 | 1755/449/918/1202 |
| 28 | spam | loss / board-full | 594 | 99% / 600 | 2 / 199 / 240 / 265 / 407 / 475 / 476 / — | no | 0 | 0 | 980/1497/969/249 | 430/460/250/182 |
| 28 | combo | win / won | 351 | 58.5% / 600 | 2 / 15 / 42 / 87 / 104 / 155 / 158 / 351 | no | 0 | 0 | 1324/1153/921/761 | 963/545/476/590 |
| 29 | spam | loss / board-full | 627 | 100% / 627 | 12 / 15 / 108 / 238 / 392 / 439 / 440 / — | no | 0 | 0 | 1182/1274/1359/247 | 667/36/402/182 |
| 29 | combo | win / won | 461 | 73.52% / 627 | 12 / 15 / 24 / 147 / 194 / 209 / 210 / 461 | no | 0 | 0 | 1303/1609/1668/939 | 870/728/887/761 |
| 30 | spam | loss / board-full | 573 | 99.48% / 576 | 2 / 49 / 201 / 283 / 338 / 398 / 399 / — | no | 0 | 1 | 1310/1035/1111/217 | 864/9/391/149 |
| 30 | combo | win / won | 426 | 73.96% / 576 | 3 / 12 / 26 / 78 / 153 / 186 / 216 / 426 | no | 0 | 1 | 1669/1153/1562/888 | 1273/472/913/698 |
| 31 | spam | loss / board-full | 609 | 99.02% / 615 | 2 / 57 / 238 / 436 / 515 / 530 / 531 / — | no | 0 | 0 | 915/1437/1150/252 | 571/230/298/221 |
| 31 | combo | win / won | 462 | 75.12% / 615 | 2 / 33 / 56 / 111 / 220 / 231 / 232 / 462 | no | 0 | 0 | 1301/1930/1527/971 | 879/1045/830/810 |
| 32 | spam | loss / board-full | 624 | 100% / 624 | 2 / 205 / 387 / 556 / 583 / 595 / — / — | no | 0 | 0 | 724/1887/1295/126 | 365/444/271/97 |
| 32 | combo | win / won | 334 | 53.53% / 624 | 3 / 21 / 54 / 170 / 191 / 200 / 201 / 334 | no | 0 | 0 | 1431/1154/899/814 | 1052/590/516/631 |
| 33 | spam | loss / board-full | 585 | 100% / 585 | 2 / 17 / 286 / 310 / 322 / 360 / 427 / — | no | 0 | 0 | 2081/835/787/382 | 1289/5/336/279 |
| 33 | combo | win / won | 455 | 77.78% / 585 | 3 / 12 / 84 / 108 / 192 / 257 / 291 / 455 | no | 0 | 0 | 2756/1156/1337/1538 | 2049/578/925/1188 |
| 34 | spam | loss / board-full | 615 | 97.62% / 630 | 2 / 112 / 261 / 380 / 470 / 487 / 488 / — | no | 0 | 0 | 1106/1407/1024/226 | 735/321/329/206 |
| 34 | combo | win / won | 456 | 72.38% / 630 | 2 / 32 / 60 / 167 / 243 / 254 / 255 / 456 | no | 0 | 0 | 1300/2178/1638/1184 | 770/1509/1039/978 |
| 35 | spam | stuck / stuck | 546 | 94.79% / 576 | 2 / 21 / 31 / 138 / 236 / 293 / 321 / — | no | 0 | 0 | 2052/769/504/194 | 1331/0/178/185 |
| 35 | combo | win / won | 440 | 76.39% / 576 | 2 / 20 / 30 / 76 / 165 / 207 / 248 / 440 | no | 0 | 0 | 2850/1154/969/1709 | 2207/562/677/1368 |
| 36 | spam | loss / board-full | 591 | 98.5% / 600 | 2 / 193 / 205 / 285 / 400 / 423 / 424 / — | no | 0 | 0 | 1318/1071/1289/194 | 887/11/520/130 |
| 36 | combo | win / won | 400 | 66.67% / 600 | 3 / 18 / 35 / 92 / 168 / 217 / 246 / 400 | no | 0 | 0 | 1305/1269/1633/933 | 961/557/984/732 |
| 37 | spam | loss / board-full | 618 | 100% / 618 | 5 / 213 / 224 / 248 / 282 / 303 / 304 / — | no | 0 | 0 | 2119/1030/796/298 | 1389/5/286/261 |
| 37 | combo | win / won | 423 | 68.45% / 618 | 5 / 24 / 47 / 63 / 150 / 171 / 198 / 423 | no | 0 | 0 | 2944/1156/874/1537 | 2242/643/655/1228 |
| 38 | spam | loss / board-full | 663 | 94.85% / 699 | 36 / 40 / 80 / 513 / — / — / — / — | no | 0 | 9 | 1905/1371/489/117 | 1218/216/50/59 |
| 38 | combo | win / won | 411 | 58.8% / 699 | 21 / 24 / 33 / 83 / 124 / 189 / 190 / 411 | no | 0 | 1 | 2032/1408/852/938 | 1526/577/404/732 |
| 39 | spam | loss / board-full | 522 | 81.69% / 639 | 12 / 16 / 97 / — / — / — / — / — | no | 0 | 23 | 1686/976/428/59 | 1121/11/118/25 |
| 39 | combo | win / won | 444 | 69.48% / 639 | 17 / 21 / 44 / 74 / 151 / 165 / 207 / 444 | no | 0 | 0 | 2972/1162/1076/1277 | 2229/688/792/1002 |
| 40 | spam | loss / board-full | 657 | 100% / 657 | 2 / 235 / 277 / 358 / 427 / 444 / 445 / — | no | 0 | 0 | 1570/1333/1063/211 | 1276/4/288/219 |
| 40 | combo | win / won | 444 | 67.58% / 657 | 2 / 72 / 110 / 180 / 280 / 292 / 293 / 444 | no | 0 | 0 | 1304/1965/1390/749 | 890/1108/744/651 |
| 41 | spam | loss / board-full | 579 | 96.98% / 597 | 2 / 190 / 364 / 484 / — / — / — / — | no | 0 | 5 | 434/1586/1524/171 | 238/365/460/151 |
| 41 | combo | win / won | 571 | 95.64% / 597 | 2 / 24 / 59 / 141 / 302 / 356 / 357 / 571 | no | 0 | 0 | 1300/2603/2336/1171 | 872/1556/1386/993 |
| 42 | spam | loss / board-full | 603 | 99.01% / 609 | 2 / 213 / 224 / 294 / 483 / 500 / 501 / — | no | 0 | 0 | 1003/1722/1008/210 | 487/582/241/155 |
| 42 | combo | win / won | 366 | 60.1% / 609 | 2 / 50 / 62 / 102 / 150 / 200 / 201 / 366 | no | 0 | 0 | 1311/1705/1141/764 | 922/1112/732/641 |
| 43 | spam | loss / board-full | 624 | 100% / 624 | 2 / 14 / 60 / 174 / 271 / 362 / 422 / — | no | 0 | 0 | 1768/1003/1499/347 | 1179/8/574/277 |
| 43 | combo | win / won | 488 | 78.21% / 624 | 2 / 12 / 39 / 102 / 193 / 249 / 267 / 488 | no | 0 | 0 | 2338/1151/1739/1331 | 1779/307/1030/1063 |
| 44 | spam | loss / board-full | 585 | 89.45% / 654 | 2 / 66 / 232 / — / — / — / — / — | no | 0 | 17 | 1743/1155/504/42 | 1239/15/56/23 |
| 44 | combo | win / won | 408 | 62.39% / 654 | 3 / 20 / 35 / 105 / 122 / 142 / 165 / 408 | no | 0 | 0 | 2070/1584/852/1255 | 1469/1029/572/956 |
| 45 | spam | loss / board-full | 630 | 96.77% / 651 | 2 / 214 / 226 / 252 / 322 / 344 / 345 / — | no | 0 | 1 | 1815/1188/925/223 | 1198/10/240/176 |
| 45 | combo | win / won | 384 | 58.99% / 651 | 3 / 24 / 41 / 63 / 135 / 183 / 227 / 384 | no | 0 | 1 | 1757/1152/1038/994 | 1291/514/579/772 |
| 46 | spam | loss / board-full | 648 | 99.54% / 651 | 2 / 20 / 116 / 355 / 386 / 438 / 621 / — | no | 0 | 0 | 2327/1145/525/159 | 1576/9/112/94 |
| 46 | combo | win / won | 443 | 68.05% / 651 | 2 / 18 / 48 / 125 / 195 / 213 / 246 / 443 | no | 0 | 0 | 2950/1198/850/1537 | 2245/582/585/1172 |
| 47 | spam | loss / board-full | 642 | 98.62% / 651 | 2 / 212 / 251 / 303 / 339 / 357 / 367 / — | no | 0 | 0 | 1653/1299/849/183 | 1111/77/220/89 |
| 47 | combo | win / won | 395 | 60.68% / 651 | 3 / 39 / 54 / 112 / 145 / 158 / 159 / 395 | no | 0 | 0 | 1748/1348/851/953 | 1280/592/434/671 |
| 48 | spam | loss / board-full | 627 | 99.52% / 630 | 2 / 204 / 267 / 368 / 591 / 592 / — / — | no | 0 | 1 | 1423/1279/1090/130 | 1142/60/344/135 |
| 48 | combo | win / won | 346 | 54.92% / 630 | 2 / 77 / 104 / 171 / 192 / 210 / 211 / 346 | no | 0 | 0 | 1301/1376/1259/734 | 937/774/780/616 |
| 49 | spam | loss / board-full | 645 | 99.54% / 648 | 2 / 97 / 141 / 219 / 509 / 545 / 606 / — | no | 0 | 0 | 2233/621/909/252 | 1344/10/338/210 |
| 49 | combo | win / won | 567 | 87.5% / 648 | 2 / 48 / 74 / 144 / 252 / 297 / 335 / 567 | no | 0 | 0 | 3442/1150/1476/1963 | 2576/387/925/1514 |
| 50 | spam | loss / board-full | 630 | 100% / 630 | 2 / 37 / 110 / 478 / 563 / — / — / — | no | 0 | 0 | 3060/456/402/387 | 2014/6/224/315 |
| 50 | combo | win / won | 579 | 91.9% / 630 | 2 / 20 / 48 / 183 / 285 / 315 / 351 / 579 | no | 0 | 0 | 5046/1157/1045/2891 | 3903/583/912/2297 |

Per-run checkpoint vectors below use **wood/stone/water/food**; each cell is `held : max cost (biome)`. The JSON retains unrounded values, lifetime totals, and living-slot fill at every threshold.

| Seed | Bot | T3 stock : cost | T4 stock : cost | T5 stock : cost | T6 stock : cost | T7 stock : cost |
|---|---|---|---|---|---|---|
| 1 | spam | 45/189/146/50 : 3/2/0/4 (forest) | 585/186/158/89 : 2/2/4/2 (arctic) | — | — | — |
| 1 | combo | 81/190/95/10 : 2/2/4/2 (arctic) | 242/237/118/81 : 2/3/4/3 (taiga) | 342/287/140/132 : 2/2/4/2 (arctic) | 417/303/184/162 : 3/2/0/4 (forest) | 727/316/240/327 : 2/3/4/3 (taiga) |
| 2 | spam | 44/135/116/31 : 3/2/0/4 (forest) | 1090/9/136/99 : 2/2/4/2 (arctic) | 1234/5/210/128 : 2/2/4/2 (arctic) | 1238/3/210/128 : 2/2/4/2 (arctic) | 1446/7/242/160 : 2/2/4/2 (arctic) |
| 2 | combo | 219/55/84/70 : 2/3/4/3 (taiga) | 255/192/109/78 : 3/2/0/4 (forest) | 597/138/375/316 : 2/4/3/0 (desert) | 824/121/437/437 : 2/4/3/0 (desert) | 883/137/449/495 : 2/4/3/0 (desert) |
| 3 | spam | 47/136/56/20 : 3/2/0/4 (forest) | 795/4/142/75 : 3/2/0/4 (forest) | 1024/4/182/103 : 3/2/0/4 (forest) | 1021/9/182/104 : 3/2/4/4 (polarDesert) | 1226/2/206/121 : 2/2/4/2 (arctic) |
| 3 | combo | 228/90/42/63 : 2/2/4/2 (arctic) | 500/119/125/196 : 3/2/0/4 (forest) | 603/153/233/286 : 2/2/4/2 (arctic) | 656/168/277/328 : 2/4/3/0 (desert) | 673/170/301/336 : 2/4/3/0 (desert) |
| 4 | spam | 91/4/268/38 : 2/2/4/2 (arctic) | 118/6/420/75 : 2/2/4/2 (arctic) | 679/4/544/161 : 2/2/4/2 (arctic) | 804/4/642/174 : 2/2/4/2 (arctic) | 830/3/662/176 : 2/4/3/0 (desert) |
| 4 | combo | 66/36/336/125 : 2/4/3/0 (desert) | 162/12/582/301 : 2/2/4/2 (arctic) | 620/64/718/562 : 3/2/0/4 (forest) | 997/69/908/744 : 3/2/0/4 (forest) | 1156/121/970/835 : 3/2/0/4 (forest) |
| 5 | spam | 32/0/206/47 : 2/3/4/3 (taiga) | 28/27/368/95 : 3/2/3/4 (steppe) | 126/0/444/125 : 3/2/0/4 (forest) | 192/0/444/133 : 3/2/0/4 (forest) | 195/0/444/134 : 3/2/0/4 (forest) |
| 5 | combo | 56/21/272/107 : 3/2/0/4 (forest) | 157/2/415/204 : 3/2/0/4 (forest) | 315/10/530/293 : 2/2/4/2 (arctic) | 394/1/532/331 : 3/2/0/4 (forest) | 403/2/534/342 : 3/2/0/4 (forest) |
| 6 | spam | 79/145/28/8 : 2/2/4/2 (arctic) | 309/156/116/83 : 3/2/4/4 (polarDesert) | 510/330/170/89 : 2/2/4/2 (arctic) | 514/328/170/89 : 3/2/0/4 (forest) | — |
| 6 | combo | 174/171/42/83 : 2/2/4/2 (arctic) | 180/222/100/106 : 2/2/4/2 (arctic) | 321/328/190/204 : 3/2/0/4 (forest) | 397/330/204/252 : 3/2/0/4 (forest) | 557/353/305/381 : 2/4/3/0 (desert) |
| 7 | spam | 46/74/116/40 : 3/2/0/4 (forest) | 196/6/294/80 : 2/4/3/0 (desert) | 505/6/326/80 : 2/4/3/0 (desert) | 479/56/376/80 : 3/2/4/4 (polarDesert) | 792/4/548/78 : 2/2/4/2 (arctic) |
| 7 | combo | 154/55/116/50 : 2/2/4/2 (arctic) | 693/28/385/319 : 2/4/3/0 (desert) | 1271/49/518/513 : 2/3/4/3 (taiga) | 1462/81/623/619 : 2/4/3/0 (desert) | 1549/129/669/667 : 3/2/0/4 (forest) |
| 8 | spam | 318/7/26/76 : 2/4/3/0 (desert) | 288/23/80/89 : 3/2/4/4 (polarDesert) | 506/23/154/143 : 3/2/4/4 (polarDesert) | 470/75/266/185 : 2/4/3/0 (desert) | 455/111/274/185 : 3/2/4/4 (polarDesert) |
| 8 | combo | 194/92/44/116 : 2/4/3/0 (desert) | 158/146/133/197 : 3/2/4/4 (polarDesert) | 313/246/234/370 : 3/2/0/4 (forest) | 521/268/441/532 : 3/2/4/4 (polarDesert) | 729/312/493/714 : 3/2/0/4 (forest) |
| 9 | spam | 63/180/68/26 : 3/2/0/4 (forest) | 150/135/86/70 : 3/2/0/4 (forest) | 584/5/276/173 : 3/2/4/4 (polarDesert) | 673/29/320/179 : 2/2/4/2 (arctic) | 642/98/332/179 : 2/2/4/2 (arctic) |
| 9 | combo | 78/128/51/22 : 3/2/0/4 (forest) | 272/128/102/92 : 2/4/3/0 (desert) | 706/150/353/409 : 2/2/4/2 (arctic) | 1085/178/424/620 : 3/2/0/4 (forest) | 1388/211/486/788 : 2/2/4/2 (arctic) |
| 10 | spam | 69/6/122/26 : 2/4/3/0 (desert) | 398/5/218/35 : 2/2/4/2 (arctic) | 428/7/370/65 : 2/2/4/2 (arctic) | 428/7/378/65 : 2/4/3/0 (desert) | — |
| 10 | combo | 78/50/148/72 : 3/2/3/4 (steppe) | 351/9/274/191 : 2/4/3/0 (desert) | 341/14/521/320 : 2/4/3/0 (desert) | 438/15/643/352 : 2/4/3/0 (desert) | 453/55/662/363 : 3/2/3/4 (steppe) |
| 11 | spam | 62/44/92/62 : 3/2/0/4 (forest) | 134/4/322/79 : 3/2/0/4 (forest) | 223/3/388/93 : 3/2/0/4 (forest) | 255/3/404/87 : 3/2/0/4 (forest) | 284/1/404/90 : 3/2/0/4 (forest) |
| 11 | combo | 83/100/94/44 : 2/4/3/0 (desert) | 138/93/402/178 : 3/2/3/4 (steppe) | 277/139/493/339 : 3/2/0/4 (forest) | 340/125/501/372 : 3/2/0/4 (forest) | 520/136/527/436 : 3/2/0/4 (forest) |
| 12 | spam | — | — | — | — | — |
| 12 | combo | 251/52/40/83 : 2/2/4/2 (arctic) | 263/140/153/145 : 2/2/4/2 (arctic) | 477/213/277/251 : 2/2/4/2 (arctic) | 658/271/325/398 : 3/2/4/4 (polarDesert) | 857/262/409/512 : 2/4/3/0 (desert) |
| 13 | spam | 6/160/293/83 : 2/2/4/2 (arctic) | 111/138/293/83 : 3/2/0/4 (forest) | 252/112/299/125 : 2/3/4/3 (taiga) | 316/86/311/131 : 3/2/0/4 (forest) | 321/84/311/131 : 3/2/0/4 (forest) |
| 13 | combo | 64/191/215/75 : 2/4/3/0 (desert) | 171/180/248/102 : 3/2/0/4 (forest) | 468/206/302/288 : 3/2/4/4 (polarDesert) | 474/284/335/346 : 3/2/4/4 (polarDesert) | 557/310/393/411 : 2/3/4/3 (taiga) |
| 14 | spam | 41/284/112/36 : 2/3/4/3 (taiga) | 103/335/266/86 : 3/2/0/4 (forest) | 118/535/356/116 : 3/2/0/4 (forest) | 190/517/356/116 : 3/2/0/4 (forest) | 194/515/356/116 : 3/2/0/4 (forest) |
| 14 | combo | 67/149/111/72 : 3/2/0/4 (forest) | 152/314/276/128 : 3/2/0/4 (forest) | 260/574/463/300 : 3/2/0/4 (forest) | 341/572/469/326 : 2/3/4/3 (taiga) | 357/578/475/332 : 2/3/4/3 (taiga) |
| 15 | spam | 45/60/44/50 : 3/2/0/4 (forest) | 122/9/302/119 : 3/2/0/4 (forest) | 254/6/436/128 : 3/2/4/4 (polarDesert) | 271/5/518/137 : 3/2/4/4 (polarDesert) | 266/37/520/137 : 2/2/4/2 (arctic) |
| 15 | combo | 75/79/51/58 : 3/2/0/4 (forest) | 392/69/346/221 : 2/4/3/0 (desert) | 562/10/698/379 : 2/4/3/0 (desert) | 665/41/823/435 : 3/2/4/4 (polarDesert) | 825/80/869/559 : 3/2/0/4 (forest) |
| 16 | spam | 4/345/200/62 : 2/2/4/2 (arctic) | 188/271/200/87 : 3/2/0/4 (forest) | 236/192/302/111 : 2/3/4/3 (taiga) | 260/242/320/119 : 3/2/0/4 (forest) | 264/240/320/119 : 3/2/0/4 (forest) |
| 16 | combo | 62/286/81/73 : 2/4/3/0 (desert) | 164/286/143/145 : 3/2/0/4 (forest) | 273/273/377/315 : 3/2/0/4 (forest) | 351/253/427/362 : 3/2/0/4 (forest) | 431/257/441/420 : 3/2/0/4 (forest) |
| 17 | spam | 76/23/125/29 : 2/2/4/2 (arctic) | 486/6/173/131 : 2/2/4/2 (arctic) | 456/3/409/163 : 2/4/3/0 (desert) | 522/6/419/181 : 2/2/4/2 (arctic) | 598/5/425/181 : 2/4/3/0 (desert) |
| 17 | combo | 186/40/150/98 : 2/2/4/2 (arctic) | 662/10/254/409 : 3/2/3/4 (steppe) | 1159/7/621/777 : 3/2/4/4 (polarDesert) | 1220/10/631/818 : 2/4/3/0 (desert) | 1302/21/656/878 : 2/4/3/0 (desert) |
| 18 | spam | 120/9/26/50 : 2/4/3/0 (desert) | 213/54/44/89 : 2/2/4/2 (arctic) | 510/6/190/185 : 2/2/4/2 (arctic) | 486/43/190/208 : 2/4/3/0 (desert) | 465/89/190/212 : 2/4/3/0 (desert) |
| 18 | combo | 77/78/34/87 : 2/2/4/2 (arctic) | 164/183/85/184 : 3/2/0/4 (forest) | 693/145/263/475 : 2/2/4/2 (arctic) | 718/191/278/541 : 3/2/4/4 (polarDesert) | 736/250/309/582 : 2/2/4/2 (arctic) |
| 19 | spam | 65/92/70/55 : 3/2/3/4 (steppe) | 327/4/114/132 : 2/4/3/0 (desert) | 379/31/152/179 : 2/4/3/0 (desert) | 564/5/160/197 : 2/4/3/0 (desert) | 624/6/168/207 : 3/2/0/4 (forest) |
| 19 | combo | 69/118/92/109 : 3/2/3/4 (steppe) | 180/112/132/185 : 3/2/0/4 (forest) | 614/155/181/399 : 2/4/3/0 (desert) | 714/153/257/474 : 3/2/3/4 (steppe) | 929/156/287/605 : 2/4/3/0 (desert) |
| 20 | spam | 46/242/86/50 : 3/2/0/4 (forest) | 144/363/104/80 : 2/2/4/2 (arctic) | 270/342/122/104 : 2/3/4/3 (taiga) | 299/349/140/125 : 3/2/0/4 (forest) | 507/288/148/146 : 2/4/3/0 (desert) |
| 20 | combo | 78/143/64/46 : 2/4/3/0 (desert) | 163/368/157/122 : 2/2/4/2 (arctic) | 326/372/183/202 : 2/3/4/3 (taiga) | 404/387/197/236 : 3/2/0/4 (forest) | 421/402/218/269 : 3/2/4/4 (polarDesert) |
| 21 | spam | 77/4/150/49 : 3/2/3/4 (steppe) | 957/3/252/151 : 2/4/3/0 (desert) | 927/3/360/166 : 2/4/3/0 (desert) | 938/3/360/171 : 2/4/3/0 (desert) | 953/4/362/177 : 2/4/3/0 (desert) |
| 21 | combo | 287/10/192/140 : 2/4/3/0 (desert) | 636/11/312/383 : 3/2/0/4 (forest) | 737/17/526/528 : 2/4/3/0 (desert) | 919/72/585/650 : 3/2/4/4 (polarDesert) | 1102/88/629/739 : 3/2/0/4 (forest) |
| 22 | spam | 55/97/44/33 : 3/2/0/4 (forest) | 486/0/86/70 : 3/2/0/4 (forest) | 1371/0/100/137 : 2/2/4/2 (arctic) | 1363/5/122/146 : 2/4/3/0 (desert) | 1755/13/164/166 : 2/2/4/2 (arctic) |
| 22 | combo | 114/61/71/111 : 3/2/0/4 (forest) | 634/103/166/368 : 2/2/4/2 (arctic) | 1490/139/274/708 : 2/2/4/2 (arctic) | 1556/192/384/769 : 3/2/4/4 (polarDesert) | 1665/249/426/818 : 3/2/3/4 (steppe) |
| 23 | spam | — | — | — | — | — |
| 23 | combo | 60/129/83/69 : 2/2/4/2 (arctic) | 146/263/97/146 : 2/2/4/2 (arctic) | 445/295/146/341 : 3/2/3/4 (steppe) | 545/296/293/457 : 3/2/3/4 (steppe) | 543/322/301/494 : 2/4/3/0 (desert) |
| 24 | spam | 38/130/98/14 : 3/2/0/4 (forest) | 411/4/112/80 : 3/2/0/4 (forest) | 1034/4/166/189 : 2/2/4/2 (arctic) | 1246/9/200/205 : 2/2/4/2 (arctic) | 1353/5/222/209 : 2/2/4/2 (arctic) |
| 24 | combo | 52/111/138/90 : 3/2/0/4 (forest) | 681/95/198/449 : 2/2/4/2 (arctic) | 1351/129/390/781 : 2/2/4/2 (arctic) | 1549/193/426/877 : 2/2/4/2 (arctic) | 1686/249/490/951 : 2/2/4/2 (arctic) |
| 25 | spam | 81/42/120/27 : 2/4/3/0 (desert) | 174/183/200/98 : 3/2/0/4 (forest) | 411/288/344/119 : 3/2/4/4 (polarDesert) | 417/286/344/120 : 3/2/0/4 (forest) | 552/276/344/137 : 2/2/4/2 (arctic) |
| 25 | combo | 266/34/141/95 : 2/4/3/0 (desert) | 300/128/209/104 : 2/4/3/0 (desert) | 356/350/310/180 : 2/3/4/3 (taiga) | 428/339/310/212 : 3/2/0/4 (forest) | 437/339/310/212 : 3/2/0/4 (forest) |
| 26 | spam | 83/81/14/38 : 2/3/4/3 (taiga) | 403/5/58/102 : 3/2/4/4 (polarDesert) | 542/44/90/119 : 3/2/4/4 (polarDesert) | 503/110/102/119 : 3/2/4/4 (polarDesert) | 500/177/120/122 : 2/4/3/0 (desert) |
| 26 | combo | 76/146/33/37 : 3/2/0/4 (forest) | 186/110/71/86 : 2/3/4/3 (taiga) | 975/153/163/460 : 2/2/4/2 (arctic) | 984/214/192/502 : 2/2/4/2 (arctic) | 1048/278/238/573 : 3/2/4/4 (polarDesert) |
| 27 | spam | 79/32/104/51 : 2/2/4/2 (arctic) | 317/6/246/132 : 2/2/4/2 (arctic) | 491/6/280/192 : 2/2/4/2 (arctic) | 508/24/386/215 : 2/4/3/0 (desert) | 506/6/394/215 : 2/4/3/0 (desert) |
| 27 | combo | 240/47/131/129 : 2/2/4/2 (arctic) | 601/57/365/454 : 3/2/0/4 (forest) | 1065/55/490/759 : 3/2/0/4 (forest) | 1196/93/602/867 : 3/2/4/4 (polarDesert) | 1361/140/680/976 : 3/2/3/4 (steppe) |
| 28 | spam | 4/201/100/106 : 2/2/4/2 (arctic) | 96/154/100/145 : 3/2/0/4 (forest) | 48/489/214/172 : 3/2/0/4 (forest) | 29/645/238/172 : 2/3/4/3 (taiga) | 33/645/238/172 : 2/3/4/3 (taiga) |
| 28 | combo | 66/193/41/38 : 2/2/4/2 (arctic) | 306/251/73/186 : 2/4/3/0 (desert) | 320/308/130/214 : 3/2/4/4 (polarDesert) | 391/298/216/259 : 3/2/3/4 (steppe) | 400/299/216/269 : 3/2/3/4 (steppe) |
| 29 | spam | 81/84/140/104 : 3/2/0/4 (forest) | 123/1/302/152 : 2/2/4/2 (arctic) | 186/114/384/161 : 2/3/4/3 (taiga) | 218/165/396/161 : 2/3/4/3 (taiga) | 222/165/396/161 : 2/3/4/3 (taiga) |
| 29 | combo | 81/62/33/61 : 2/4/3/0 (desert) | 150/170/449/231 : 2/2/4/2 (arctic) | 277/270/516/367 : 3/2/0/4 (forest) | 358/267/536/410 : 2/3/4/3 (taiga) | 371/271/540/415 : 2/3/4/3 (taiga) |
| 30 | spam | 30/124/79/58 : 3/2/0/4 (forest) | 111/156/239/115 : 3/2/0/4 (forest) | 247/55/311/122 : 3/2/0/4 (forest) | 278/140/367/131 : 3/2/0/4 (forest) | 282/138/367/131 : 3/2/0/4 (forest) |
| 30 | combo | 74/96/37/49 : 2/2/4/2 (arctic) | 226/135/279/112 : 2/4/3/0 (desert) | 331/235/448/235 : 2/3/4/3 (taiga) | 445/212/520/291 : 3/2/0/4 (forest) | 583/262/541/384 : 2/4/3/0 (desert) |
| 31 | spam | 4/261/50/48 : 2/2/4/2 (arctic) | 4/426/232/167 : 2/2/4/2 (arctic) | 180/364/298/218 : 2/2/4/2 (arctic) | 252/352/298/218 : 2/3/4/3 (taiga) | 257/350/298/219 : 2/2/4/2 (arctic) |
| 31 | combo | 30/356/52/84 : 2/2/4/2 (arctic) | 143/463/232/192 : 2/2/4/2 (arctic) | 235/702/527/484 : 2/2/4/2 (arctic) | 320/710/535/514 : 3/2/0/4 (forest) | 325/708/535/515 : 2/2/4/2 (arctic) |
| 32 | spam | 5/383/158/53 : 2/2/4/2 (arctic) | 9/580/271/67 : 2/2/4/2 (arctic) | 174/526/271/91 : 3/2/0/4 (forest) | 243/502/271/94 : 3/2/0/4 (forest) | — |
| 32 | combo | 54/281/88/57 : 3/2/4/4 (polarDesert) | 150/456/287/176 : 2/4/3/0 (desert) | 320/441/296/245 : 3/2/0/4 (forest) | 394/434/298/277 : 2/3/4/3 (taiga) | 407/436/300/279 : 2/3/4/3 (taiga) |
| 33 | spam | 852/2/28/166 : 3/2/0/4 (forest) | 852/56/64/184 : 2/4/3/0 (desert) | 849/26/106/187 : 2/3/4/3 (taiga) | 828/9/220/213 : 2/4/3/0 (desert) | 922/5/268/252 : 3/2/4/4 (polarDesert) |
| 33 | combo | 502/63/42/318 : 2/3/4/3 (taiga) | 522/141/91/367 : 3/2/4/4 (polarDesert) | 862/119/238/538 : 2/3/4/3 (taiga) | 964/95/464/611 : 2/2/4/2 (arctic) | 1130/122/523/711 : 3/2/0/4 (forest) |
| 34 | spam | 4/361/177/109 : 2/2/4/2 (arctic) | 5/578/297/176 : 2/2/4/2 (arctic) | 164/563/317/206 : 2/2/4/2 (arctic) | 232/539/317/206 : 2/3/4/3 (taiga) | 238/539/317/206 : 2/3/4/3 (taiga) |
| 34 | combo | 25/275/142/110 : 2/2/4/2 (arctic) | 23/631/506/376 : 2/2/4/2 (arctic) | 134/1027/694/562 : 2/2/4/2 (arctic) | 213/1026/704/600 : 3/2/0/4 (forest) | 222/1027/706/611 : 3/2/0/4 (forest) |
| 35 | spam | 90/48/32/26 : 2/4/3/0 (desert) | 414/6/68/98 : 2/4/3/0 (desert) | 611/7/146/161 : 3/2/0/4 (forest) | 694/7/166/185 : 3/2/0/4 (forest) | 722/16/172/185 : 2/4/3/0 (desert) |
| 35 | combo | 143/68/44/83 : 3/2/0/4 (forest) | 331/158/95/186 : 2/4/3/0 (desert) | 850/182/222/525 : 3/2/0/4 (forest) | 1058/227/268/651 : 3/2/0/4 (forest) | 1259/249/316/785 : 2/4/3/0 (desert) |
| 36 | spam | 40/235/206/45 : 3/2/0/4 (forest) | 163/158/302/90 : 3/2/4/4 (polarDesert) | 151/226/488/114 : 3/2/0/4 (forest) | 213/190/500/114 : 2/3/4/3 (taiga) | 217/190/500/114 : 2/3/4/3 (taiga) |
| 36 | combo | 95/90/125/20 : 2/4/3/0 (desert) | 258/138/285/84 : 2/4/3/0 (desert) | 351/74/543/253 : 3/2/0/4 (forest) | 598/84/583/352 : 2/4/3/0 (desert) | 658/79/643/372 : 2/4/3/0 (desert) |
| 37 | spam | 41/215/248/72 : 3/2/0/4 (forest) | 137/215/248/102 : 3/2/0/4 (forest) | 280/150/248/145 : 3/2/0/4 (forest) | 334/180/248/154 : 2/3/4/3 (taiga) | 334/186/248/155 : 3/2/3/4 (steppe) |
| 37 | combo | 81/142/116/31 : 2/4/3/0 (desert) | 206/138/131/76 : 2/3/4/3 (taiga) | 684/173/216/344 : 2/3/4/3 (taiga) | 759/250/251/382 : 2/3/4/3 (taiga) | 878/306/281/464 : 2/2/4/2 (arctic) |
| 38 | spam | 99/205/8/43 : 2/4/3/0 (desert) | 834/345/32/53 : 2/2/4/2 (arctic) | — | — | — |
| 38 | combo | 175/92/39/54 : 2/4/3/0 (desert) | 222/314/64/88 : 2/4/3/0 (desert) | 327/347/89/194 : 2/4/3/0 (desert) | 373/296/91/208 : 3/2/3/4 (steppe) | 379/296/91/208 : 2/3/4/3 (taiga) |
| 39 | spam | 161/185/22/11 : 2/2/4/2 (arctic) | — | — | — | — |
| 39 | combo | 126/207/36/34 : 2/4/3/0 (desert) | 214/276/95/86 : 3/2/0/4 (forest) | 753/291/156/331 : 3/2/3/4 (steppe) | 801/279/204/366 : 2/3/4/3 (taiga) | 870/300/354/451 : 2/3/4/3 (taiga) |
| 40 | spam | 18/233/132/90 : 2/2/4/2 (arctic) | 86/271/224/125 : 2/2/4/2 (arctic) | 295/195/262/160 : 2/2/4/2 (arctic) | 363/183/262/160 : 2/3/4/3 (taiga) | 368/183/262/161 : 2/3/4/3 (taiga) |
| 40 | combo | 23/279/212/148 : 2/2/4/2 (arctic) | 73/536/338/286 : 3/2/4/4 (polarDesert) | 209/865/565/438 : 2/2/4/2 (arctic) | 289/871/571/462 : 2/3/4/3 (taiga) | 298/869/571/462 : 2/3/4/3 (taiga) |
| 41 | spam | 5/419/202/89 : 2/2/4/2 (arctic) | 92/507/292/137 : 2/2/4/2 (arctic) | — | — | — |
| 41 | combo | 73/289/141/27 : 2/2/4/2 (arctic) | 179/495/307/171 : 2/4/3/0 (desert) | 278/652/797/417 : 2/4/3/0 (desert) | 334/787/938/534 : 2/4/3/0 (desert) | 341/791/947/538 : 2/4/3/0 (desert) |
| 42 | spam | 39/306/52/58 : 3/2/0/4 (forest) | 130/372/115/134 : 2/2/4/2 (arctic) | 106/675/229/155 : 2/3/4/3 (taiga) | 174/663/229/155 : 2/3/4/3 (taiga) | 178/663/229/155 : 2/3/4/3 (taiga) |
| 42 | combo | 44/358/92/47 : 2/2/4/2 (arctic) | 158/474/178/126 : 3/2/0/4 (forest) | 297/631/251/253 : 2/4/3/0 (desert) | 374/720/379/349 : 2/4/3/0 (desert) | 377/720/384/350 : 2/4/3/0 (desert) |
| 43 | spam | 45/66/134/23 : 2/3/4/3 (taiga) | 83/1/272/86 : 2/2/4/2 (arctic) | 208/0/434/137 : 2/3/4/3 (taiga) | 353/4/484/178 : 2/2/4/2 (arctic) | 513/3/498/195 : 2/4/3/0 (desert) |
| 43 | combo | 71/61/115/64 : 2/3/4/3 (taiga) | 141/78/304/168 : 2/3/4/3 (taiga) | 384/42/554/307 : 2/4/3/0 (desert) | 668/72/627/498 : 3/2/4/4 (polarDesert) | 704/139/663/514 : 2/2/4/2 (arctic) |
| 44 | spam | 578/188/10/23 : 2/2/4/2 (arctic) | — | — | — | — |
| 44 | combo | 78/205/36/43 : 2/2/4/2 (arctic) | 392/391/98/211 : 3/2/4/4 (polarDesert) | 416/432/151/230 : 3/2/4/4 (polarDesert) | 423/467/185/269 : 2/4/3/0 (desert) | 449/534/234/316 : 3/2/4/4 (polarDesert) |
| 45 | spam | 44/115/116/71 : 3/2/0/4 (forest) | 146/91/120/83 : 2/3/4/3 (taiga) | 269/34/170/119 : 3/2/0/4 (forest) | 327/35/176/128 : 3/2/0/4 (forest) | 326/34/178/129 : 2/2/4/2 (arctic) |
| 45 | combo | 74/124/74/25 : 3/2/0/4 (forest) | 174/142/90/87 : 3/2/3/4 (steppe) | 369/157/165/240 : 2/4/3/0 (desert) | 502/165/244/330 : 3/2/0/4 (forest) | 619/191/315/412 : 2/2/4/2 (arctic) |
| 46 | spam | 354/22/8/26 : 2/4/3/0 (desert) | 1029/5/28/70 : 2/4/3/0 (desert) | 1055/0/60/73 : 2/2/4/2 (arctic) | 1123/21/60/73 : 2/4/3/0 (desert) | 1480/15/106/88 : 2/2/4/2 (arctic) |
| 46 | combo | 209/138/37/100 : 3/2/0/4 (forest) | 720/146/104/405 : 2/3/4/3 (taiga) | 1111/154/199/571 : 3/2/0/4 (forest) | 1170/241/218/603 : 3/2/0/4 (forest) | 1278/270/322/682 : 3/2/3/4 (steppe) |
| 47 | spam | 5/394/76/32 : 2/2/4/2 (arctic) | 103/266/154/50 : 3/2/0/4 (forest) | 251/204/172/56 : 3/2/0/4 (forest) | 320/177/178/68 : 2/3/4/3 (taiga) | 326/219/180/68 : 2/3/4/3 (taiga) |
| 47 | combo | 52/381/40/45 : 2/2/4/2 (arctic) | 153/305/154/114 : 3/2/0/4 (forest) | 304/312/188/172 : 3/2/0/4 (forest) | 385/299/198/201 : 2/3/4/3 (taiga) | 401/305/204/207 : 2/3/4/3 (taiga) |
| 48 | spam | 6/285/184/83 : 2/2/4/2 (arctic) | 94/314/320/95 : 2/2/4/2 (arctic) | 1066/8/340/128 : 2/2/4/2 (arctic) | 1066/14/340/128 : 2/4/3/0 (desert) | — |
| 48 | combo | 52/259/216/132 : 2/2/4/2 (arctic) | 101/484/450/252 : 2/2/4/2 (arctic) | 259/480/466/339 : 3/2/0/4 (forest) | 345/558/500/363 : 2/3/4/3 (taiga) | 345/555/504/364 : 2/3/4/3 (taiga) |
| 49 | spam | 322/4/112/100 : 2/2/4/2 (arctic) | 282/3/228/154 : 2/4/3/0 (desert) | 1019/5/298/181 : 2/2/4/2 (arctic) | 1019/5/316/187 : 2/2/4/2 (arctic) | 1170/10/320/192 : 2/2/4/2 (arctic) |
| 49 | combo | 320/7/157/247 : 2/2/4/2 (arctic) | 466/67/318/445 : 3/2/4/4 (polarDesert) | 936/51/465/640 : 2/2/4/2 (arctic) | 1123/96/562/780 : 3/2/0/4 (forest) | 1365/130/635/914 : 2/4/3/0 (desert) |
| 50 | spam | 312/6/32/104 : 3/2/0/4 (forest) | 1681/4/102/276 : 3/2/0/4 (forest) | 1732/48/204/294 : 2/4/3/0 (desert) | — | — |
| 50 | combo | 249/51/52/152 : 3/2/0/4 (forest) | 1226/55/186/758 : 3/2/0/4 (forest) | 1938/115/372/1129 : 3/2/0/4 (forest) | 2124/180/406/1216 : 2/2/4/2 (arctic) | 2404/224/468/1377 : 3/2/0/4 (forest) |

## v4 round 5 — wood and stone spending

Real GameSession, 20×14, seeds 1–50, 140288 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offer/core scoring and tie rules are unchanged.

V4: T8 wins immediately. Loss means engine proof or no empty living slots after usable cores/offers/spread are exhausted (board-full bot loss; replacement escape may still exist). An unproven empty-slot stall is not a loss. Board use includes ALL map placeable slots, including dead land. All-seed threshold medians censor unreached thresholds as infinity. Stock pressure samples the T3–T7 payout transactions, against the current placement biome roster; positive stock against zero cost has infinite ratio. T7 requires ≥90% completion and EVERY completer below 60%, not only the median. False-loss audits check direct productive replacements and refund-funded unpaid base yields; they are a constructive check, not an exhaustive search of all future replacement sequences.

| Target | Result | Evidence |
|---|---|---|
| 1. Good play wins ≥90%; zero false loss | PASS | 50/50 combo wins; 0 detected false soft-locks |
| 2. Spam loses ≥90% | MISS | 38/50 spam losses before T8 |
| 3. Winning board use 65–85% | PASS | 68.87% median winning board use |
| 4. No opening stalls before T2 | PASS | zero combo opening stalls |
| 5. T3–T7 median stock ≤3× max cost | MISS | worst checkpoint/resource median stock/max-cost = 220× |
| 6. T7 before 60% board use | PASS | 50/50 reach T7; median 37.71%, max 59.8% |

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n |
|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 50/50 | 2 | 2 (2–90), 49/50 |
| T2 | 22.5 | 22.5 (11–77), 50/50 | 66 | 57 (12–235), 46/50 |
| T3 | 47 | 47 (23–110), 50/50 | 207 | 181 (28–387), 44/50 |
| T4 | 102 | 102 (60–192), 50/50 | 323.5 | 274 (92–556), 42/50 |
| T5 | 178.5 | 178.5 (104–302), 50/50 | 424.5 | 386 (167–594), 39/50 |
| T6 | 208.5 | 208.5 (122–356), 50/50 | 445.5 | 423 (218–595), 38/50 |
| T7 | 229.5 | 229.5 (144–357), 50/50 | 486 | 448 (295–624), 37/50 |
| T8 | 426 | 426 (334–579), 50/50 | ∞ | 587 (570–614), 4/50 |

| Combo stock checkpoint | Resource | Samples | Median held | Median max cost | Median held/max cost |
|---|---|---:|---:|---:|---:|
| T3 | wood | 50/50 | 65.5 | 2 | 26.38× |
| T3 | stone | 50/50 | 96.5 | 2 | 27.69× |
| T3 | water | 50/50 | 83.5 | 3 | 33.5× |
| T3 | food | 50/50 | 73 | 2 | 30.5× |
| T4 | wood | 50/50 | 168 | 3 | 56.38× |
| T4 | stone | 50/50 | 111.5 | 3 | 34.1× |
| T4 | water | 50/50 | 182 | 3 | 91.5× |
| T4 | food | 50/50 | 178.5 | 3 | 93.88× |
| T5 | wood | 50/50 | 290.5 | 5.5 | 96.6× |
| T5 | stone | 50/50 | 126.5 | 2 | 47.5× |
| T5 | water | 50/50 | 331.5 | 3 | 130.63× |
| T5 | food | 50/50 | 342.5 | 3 | 154.63× |
| T6 | wood | 50/50 | 388 | 8 | 94.06× |
| T6 | stone | 50/50 | 171 | 3 | 40.06× |
| T6 | water | 50/50 | 425 | 3 | 154.25× |
| T6 | food | 50/50 | 409.5 | 4 | 142.25× |
| T7 | wood | 50/50 | 464.5 | 3 | 151× |
| T7 | stone | 50/50 | 195 | 3 | 51.31× |
| T7 | water | 50/50 | 458.5 | 3 | 135.04× |
| T7 | food | 50/50 | 494.5 | 3 | 220× |

combo: 50 wins; 0 losses (0 board-full, 0 proven); 0 unproven stalls; 0 action-cap.

spam: 4 wins; 38 losses (38 board-full, 0 proven); 8 unproven stalls; 0 action-cap.

| Seed | Bot | Outcome / stop | Placements | Board use / map slots | T1–T8 placements | Opening stall | False loss | Legal core sites left | Final lifetime W/S/A/F | Final stock W/S/A/F |
|---|---|---|---:|---|---|---|---:|---:|---|---|
| 1 | spam | loss / board-full | 633 | 98.6% / 642 | 2 / 193 / 223 / 261 / 315 / 333 / 437 / — | no | 0 | 0 | 1972/1120/832/244 | 246/4/268/165 |
| 1 | combo | win / won | 357 | 55.61% / 642 | 2 / 18 / 42 / 78 / 105 / 125 / 177 / 357 | no | 0 | 0 | 1666/1151/940/676 | 848/413/572/533 |
| 2 | spam | loss / board-full | 633 | 99.53% / 636 | 2 / 204 / 209 / 405 / 421 / 422 / 512 / — | no | 0 | 0 | 2233/1209/906/234 | 466/8/324/224 |
| 2 | combo | win / won | 425 | 66.82% / 636 | 3 / 16 / 42 / 65 / 171 / 226 / 254 / 425 | no | 0 | 0 | 2189/1154/1230/1226 | 1115/330/739/934 |
| 3 | spam | stuck / stuck | 423 | 68.78% / 615 | 5 / 51 / 222 / 274 / 299 / 343 / 344 / — | no | 0 | 0 | 791/878/902/247 | 0/0/262/135 |
| 3 | combo | win / won | 399 | 64.88% / 615 | 5 / 15 / 35 / 84 / 164 / 199 / 225 / 399 | no | 0 | 0 | 1607/1154/1024/946 | 800/354/504/712 |
| 4 | spam | stuck / stuck | 70 | 11.78% / 594 | 2 / 55 / — / — / — / — / — / — | no | 0 | 39 | 52/122/371/49 | 0/0/198/47 |
| 4 | combo | win / won | 524 | 88.22% / 594 | 2 / 19 / 59 / 157 / 228 / 297 / 325 / 524 | no | 0 | 0 | 2516/1155/2111/1554 | 1271/333/1379/1210 |
| 5 | spam | stuck / stuck | 90 | 14.29% / 630 | 2 / — / — / — / — / — / — / — | yes | 0 | 76 | 36/168/420/33 | 0/0/176/41 |
| 5 | combo | win / won | 495 | 78.57% / 630 | 2 / 44 / 68 / 138 / 212 / 271 / 299 / 495 | no | 0 | 0 | 1313/1255/1842/782 | 753/85/863/643 |
| 6 | spam | loss / board-full | 630 | 98.59% / 639 | 2 / 30 / 205 / 359 / 411 / 444 / 460 / — | no | 0 | 0 | 1426/1502/1060/183 | 364/9/260/144 |
| 6 | combo | win / won | 343 | 53.68% / 639 | 2 / 20 / 49 / 64 / 110 / 122 / 156 / 343 | no | 0 | 0 | 1478/1155/897/996 | 730/324/490/787 |
| 7 | spam | loss / board-full | 612 | 98.55% / 621 | 2 / 33 / 53 / 341 / 470 / 471 / 576 / — | no | 0 | 0 | 1482/789/1517/167 | 496/1/595/132 |
| 7 | combo | win / won | 504 | 81.16% / 621 | 3 / 13 / 40 / 153 / 249 / 291 / 312 / 504 | no | 0 | 0 | 2845/1150/1755/1400 | 1590/374/1162/1116 |
| 8 | spam | loss / board-full | 411 | 72.49% / 567 | 2 / 21 / — / — / — / — / — / — | no | 0 | 43 | 71/1190/494/113 | 0/364/88/109 |
| 8 | combo | win / won | 371 | 65.43% / 567 | 2 / 14 / 39 / 63 / 117 / 183 / 225 / 371 | no | 0 | 0 | 1795/1151/1166/1390 | 841/455/764/1109 |
| 9 | spam | loss / board-full | 567 | 97.42% / 582 | 2 / 56 / 63 / 92 / 260 / 362 / 391 / — | no | 0 | 0 | 1875/812/948/330 | 217/8/376/224 |
| 9 | combo | win / won | 402 | 69.07% / 582 | 2 / 24 / 29 / 65 / 177 / 240 / 287 / 402 | no | 0 | 0 | 2195/1159/1141/1302 | 1100/524/752/1014 |
| 10 | spam | loss / board-full | 522 | 87.44% / 597 | 2 / 33 / 147 / — / — / — / — / — | no | 0 | 11 | 1730/622/673/48 | 502/11/215/52 |
| 10 | combo | win / won | 516 | 86.43% / 597 | 2 / 32 / 71 / 126 / 199 / 242 / 264 / 516 | no | 0 | 0 | 2444/1157/1645/1165 | 1169/147/1013/895 |
| 11 | spam | loss / board-full | 387 | 61.72% / 627 | 2 / — / — / — / — / — / — / — | no | 0 | 77 | 3/1074/573/54 | 0/225/86/57 |
| 11 | combo | win / won | 446 | 71.13% / 627 | 2 / 28 / 59 / 109 / 182 / 214 / 243 / 446 | no | 0 | 0 | 1837/1154/1352/1131 | 780/108/772/877 |
| 12 | spam | loss / board-full | 600 | 97.09% / 618 | 45 / 54 / 66 / 136 / 183 / 247 / 312 / — | no | 0 | 0 | 1668/1250/1174/250 | 141/1/414/181 |
| 12 | combo | win / won | 390 | 63.11% / 618 | 33 / 39 / 45 / 82 / 140 / 177 / 219 / 390 | no | 0 | 0 | 2013/1150/1168/1163 | 1007/422/756/905 |
| 13 | spam | loss / board-full | 582 | 98.98% / 588 | 7 / 199 / 373 / 390 / 426 / 440 / 462 / — | no | 0 | 0 | 1248/1231/1230/198 | 534/7/353/176 |
| 13 | combo | win / won | 354 | 60.2% / 588 | 7 / 44 / 65 / 84 / 144 / 162 / 192 / 354 | no | 0 | 0 | 1594/1153/1048/947 | 812/402/657/748 |
| 14 | spam | loss / board-full | 552 | 98.92% / 558 | 2 / 178 / 191 / 377 / 470 / 483 / 484 / — | no | 0 | 0 | 945/1518/1171/250 | 103/305/414/166 |
| 14 | combo | win / won | 403 | 72.22% / 558 | 2 / 33 / 45 / 99 / 182 / 191 / 192 / 403 | no | 0 | 0 | 1303/1695/1339/886 | 621/761/784/706 |
| 15 | spam | loss / board-full | 576 | 99.48% / 579 | 2 / 38 / 154 / 234 / 271 / 348 / 357 / — | no | 0 | 0 | 1348/999/1318/316 | 434/1/557/207 |
| 15 | combo | win / won | 456 | 78.76% / 579 | 3 / 18 / 35 / 106 / 236 / 277 / 306 / 456 | no | 0 | 0 | 1562/1160/1719/1181 | 779/284/1036/881 |
| 16 | spam | loss / board-full | 585 | 99.49% / 588 | 2 / 199 / 355 / 400 / 500 / 522 / 523 / — | no | 0 | 0 | 928/1410/1377/271 | 142/10/408/167 |
| 16 | combo | win / won | 486 | 82.65% / 588 | 2 / 27 / 57 / 84 / 167 / 188 / 198 / 486 | no | 0 | 0 | 1301/1816/1698/1120 | 551/534/882/856 |
| 17 | spam | stuck / stuck | 104 | 17.42% / 597 | 2 / 39 / 60 / — / — / — / — / — | no | 0 | 10 | 199/173/365/112 | 0/0/192/75 |
| 17 | combo | win / won | 513 | 85.93% / 597 | 3 / 13 / 47 / 147 / 264 / 317 / 340 / 513 | no | 0 | 0 | 2991/1154/1498/1713 | 1486/302/973/1337 |
| 18 | spam | win / won | 580 | 92.95% / 624 | 2 / 13 / 50 / 93 / 297 / 320 / 339 / 580 | no | 0 | 0 | 1520/1152/1102/406 | 211/7/324/343 |
| 18 | combo | win / won | 417 | 66.83% / 624 | 2 / 13 / 26 / 60 / 177 / 201 / 219 / 417 | no | 0 | 0 | 1962/1152/1054/1350 | 867/286/582/1048 |
| 19 | spam | loss / board-full | 642 | 100% / 642 | 2 / 48 / 72 / 155 / 208 / 266 / 345 / — | no | 0 | 0 | 2266/1044/785/329 | 486/7/250/282 |
| 19 | combo | win / won | 426 | 66.36% / 642 | 2 / 31 / 50 / 75 / 159 / 199 / 242 / 426 | no | 0 | 0 | 2452/1151/904/1367 | 1236/374/555/1078 |
| 20 | spam | loss / board-full | 621 | 98.1% / 633 | 11 / 14 / 66 / 129 / 167 / 294 / 295 / — | no | 0 | 0 | 2041/1188/663/315 | 230/27/250/221 |
| 20 | combo | win / won | 375 | 59.24% / 633 | 11 / 15 / 24 / 102 / 125 / 140 / 144 / 375 | no | 0 | 0 | 1975/1261/851/1039 | 1017/514/527/820 |
| 21 | spam | loss / board-full | 567 | 97.93% / 579 | 39 / 67 / 102 / 254 / 381 / 417 / 459 / — | no | 0 | 0 | 2130/776/1224/396 | 612/4/542/346 |
| 21 | combo | win / won | 558 | 96.37% / 579 | 33 / 54 / 86 / 192 / 270 / 299 / 333 / 558 | no | 0 | 0 | 2818/1154/1623/1492 | 1350/94/945/1189 |
| 22 | spam | loss / board-full | 606 | 98.06% / 618 | 2 / 25 / 47 / 154 / 386 / 412 / 508 / — | no | 0 | 0 | 2718/708/384/240 | 515/7/194/202 |
| 22 | combo | win / won | 495 | 80.1% / 618 | 3 / 12 / 34 / 122 / 241 / 276 / 295 / 495 | no | 0 | 0 | 3808/1153/936/1750 | 2079/580/748/1397 |
| 23 | spam | stuck / stuck | 6 | 0.91% / 657 | — / — / — / — / — / — / — / — | yes | 0 | 150 | 0/0/48/3 | 0/0/32/11 |
| 23 | combo | win / won | 351 | 53.42% / 657 | 8 / 15 / 35 / 63 / 123 / 165 / 188 / 351 | no | 0 | 0 | 1724/1153/945/1175 | 789/593/613/935 |
| 24 | spam | stuck / stuck | 253 | 41.75% / 606 | 2 / 56 / 81 / 155 / — / — / — / — | no | 0 | 2 | 980/308/386/234 | 1/0/178/170 |
| 24 | combo | win / won | 497 | 82.01% / 606 | 2 / 21 / 45 / 128 / 246 / 277 / 301 / 497 | no | 0 | 0 | 3711/1152/1139/1945 | 1907/619/879/1554 |
| 25 | spam | loss / board-full | 594 | 98.51% / 603 | 90 / 105 / 120 / 186 / 217 / 218 / 429 / — | no | 0 | 0 | 1415/1329/1130/215 | 262/78/376/196 |
| 25 | combo | win / won | 405 | 67.16% / 603 | 30 / 42 / 56 / 80 / 147 / 157 / 158 / 405 | no | 0 | 0 | 1306/1537/1326/682 | 749/457/695/590 |
| 26 | spam | loss / board-full | 612 | 99.03% / 618 | 2 / 42 / 49 / 246 / 292 / 317 / 341 / — | no | 0 | 0 | 2076/1035/499/210 | 235/2/168/117 |
| 26 | combo | win / won | 398 | 64.4% / 618 | 2 / 27 / 41 / 63 / 180 / 204 / 226 / 398 | no | 0 | 0 | 2185/1251/850/1245 | 986/416/559/934 |
| 27 | spam | stuck / stuck | 26 | 4.36% / 597 | 2 / — / — / — / — / — / — / — | yes | 0 | 76 | 147/32/10/42 | 1/0/14/38 |
| 27 | combo | win / won | 465 | 77.89% / 597 | 3 / 29 / 51 / 135 / 237 / 279 / 312 / 465 | no | 0 | 0 | 2335/1156/1502/1473 | 1291/357/918/1202 |
| 28 | spam | loss / board-full | 594 | 99% / 600 | 2 / 199 / 240 / 292 / 454 / 493 / 494 / — | no | 0 | 0 | 979/1349/1044/390 | 270/107/285/247 |
| 28 | combo | win / won | 351 | 58.5% / 600 | 2 / 15 / 42 / 87 / 104 / 155 / 158 / 351 | no | 0 | 0 | 1324/1153/921/761 | 667/416/476/590 |
| 29 | spam | win / won | 594 | 94.74% / 627 | 75 / 115 / 171 / 202 / 250 / 282 / 308 / 594 | no | 0 | 0 | 1303/1222/1255/283 | 135/8/414/240 |
| 29 | combo | win / won | 477 | 76.08% / 627 | 23 / 26 / 35 / 90 / 198 / 212 / 213 / 477 | no | 0 | 0 | 1303/1666/1735/928 | 586/509/914/758 |
| 30 | spam | loss / board-full | 573 | 99.48% / 576 | 2 / 49 / 219 / 316 / 387 / 447 / 448 / — | no | 0 | 1 | 1207/1069/1152/259 | 288/21/397/176 |
| 30 | combo | win / won | 426 | 73.96% / 576 | 3 / 12 / 26 / 78 / 153 / 186 / 216 / 426 | no | 0 | 1 | 1669/1153/1562/888 | 973/330/913/698 |
| 31 | spam | loss / board-full | 609 | 99.02% / 615 | 2 / 57 / 238 / 436 / 515 / 530 / 531 / — | no | 0 | 0 | 915/1437/1150/252 | 463/32/298/221 |
| 31 | combo | win / won | 462 | 75.12% / 615 | 2 / 33 / 56 / 111 / 220 / 231 / 232 / 462 | no | 0 | 0 | 1301/1930/1527/971 | 689/799/830/810 |
| 32 | spam | loss / board-full | 624 | 100% / 624 | 2 / 205 / 387 / 556 / 583 / 595 / — / — | no | 0 | 0 | 759/1895/1303/134 | 34/219/279/105 |
| 32 | combo | win / won | 334 | 53.53% / 624 | 3 / 21 / 54 / 170 / 191 / 200 / 201 / 334 | no | 0 | 0 | 1431/1154/899/814 | 710/347/516/631 |
| 33 | spam | loss / board-full | 585 | 100% / 585 | 2 / 25 / 42 / 200 / 243 / 272 / 332 / — | no | 0 | 0 | 1706/853/999/514 | 354/10/409/299 |
| 33 | combo | win / won | 455 | 77.78% / 585 | 3 / 12 / 84 / 108 / 192 / 257 / 291 / 455 | no | 0 | 0 | 2756/1156/1337/1538 | 1341/486/925/1188 |
| 34 | spam | loss / board-full | 615 | 97.62% / 630 | 2 / 112 / 261 / 380 / 470 / 487 / 488 / — | no | 0 | 0 | 1106/1407/1024/226 | 591/185/329/206 |
| 34 | combo | win / won | 456 | 72.38% / 630 | 2 / 32 / 60 / 167 / 243 / 254 / 255 / 456 | no | 0 | 0 | 1300/2178/1638/1184 | 630/1217/1039/978 |
| 35 | spam | loss / board-full | 564 | 97.92% / 576 | 2 / 12 / 28 / 209 / 279 / 510 / 511 / — | no | 0 | 0 | 568/1595/617/243 | 1/600/214/217 |
| 35 | combo | win / won | 440 | 76.39% / 576 | 2 / 11 / 23 / 76 / 165 / 207 / 248 / 440 | no | 0 | 0 | 2850/1154/969/1709 | 1495/405/677/1368 |
| 36 | spam | win / won | 570 | 95% / 600 | 2 / 193 / 204 / 326 / 405 / 438 / 439 / 570 | no | 0 | 0 | 1303/1166/1367/304 | 476/12/580/207 |
| 36 | combo | win / won | 400 | 66.67% / 600 | 3 / 18 / 35 / 92 / 168 / 217 / 246 / 400 | no | 0 | 0 | 1305/1269/1633/933 | 753/364/984/732 |
| 37 | spam | loss / board-full | 618 | 100% / 618 | 5 / 213 / 232 / 256 / 316 / 343 / 344 / — | no | 0 | 0 | 1788/1089/950/570 | 233/4/326/363 |
| 37 | combo | win / won | 423 | 68.45% / 618 | 5 / 24 / 47 / 63 / 150 / 171 / 198 / 423 | no | 0 | 0 | 2944/1156/874/1537 | 1456/488/655/1228 |
| 38 | spam | loss / board-full | 687 | 98.28% / 699 | 21 / 25 / 59 / 338 / 423 / 424 / 459 / — | no | 0 | 1 | 1980/1627/654/234 | 455/6/142/133 |
| 38 | combo | win / won | 411 | 58.8% / 699 | 21 / 24 / 33 / 83 / 124 / 189 / 190 / 411 | no | 0 | 1 | 2032/1408/852/938 | 962/383/404/732 |
| 39 | spam | loss / board-full | 627 | 98.12% / 639 | 3 / 57 / 221 / 273 / 314 / 333 / 334 / — | no | 0 | 0 | 1938/1019/795/250 | 379/1/236/123 |
| 39 | combo | win / won | 444 | 69.48% / 639 | 3 / 20 / 48 / 68 / 144 / 158 / 204 / 444 | no | 0 | 0 | 2946/1158/1087/1285 | 1391/504/794/1004 |
| 40 | spam | loss / board-full | 657 | 100% / 657 | 2 / 235 / 277 / 358 / 427 / 444 / 445 / — | no | 0 | 0 | 1588/1383/1073/221 | 1136/8/298/229 |
| 40 | combo | win / won | 444 | 67.58% / 657 | 2 / 72 / 110 / 180 / 280 / 292 / 293 / 444 | no | 0 | 0 | 1304/1965/1390/749 | 706/898/744/651 |
| 41 | spam | loss / board-full | 579 | 96.98% / 597 | 2 / 190 / 364 / 484 / — / — / — / — | no | 0 | 5 | 434/1586/1524/171 | 238/172/460/151 |
| 41 | combo | win / won | 571 | 95.64% / 597 | 2 / 24 / 59 / 141 / 302 / 356 / 357 / 571 | no | 0 | 0 | 1300/2603/2336/1171 | 872/1155/1386/993 |
| 42 | spam | loss / board-full | 603 | 99.01% / 609 | 2 / 213 / 223 / 274 / 491 / 521 / 522 / — | no | 0 | 0 | 797/1779/1041/271 | 0/342/260/192 |
| 42 | combo | win / won | 366 | 60.1% / 609 | 2 / 50 / 62 / 102 / 150 / 200 / 201 / 366 | no | 0 | 0 | 1311/1705/1141/764 | 634/810/732/641 |
| 43 | spam | stuck / stuck | 252 | 40.38% / 624 | 2 / 25 / 83 / 206 / — / — / — / — | no | 0 | 6 | 260/384/964/166 | 0/0/374/114 |
| 43 | combo | win / won | 489 | 78.37% / 624 | 2 / 20 / 47 / 102 / 193 / 251 / 267 / 489 | no | 0 | 0 | 2334/1153/1750/1320 | 1241/279/1037/1057 |
| 44 | spam | loss / board-full | 648 | 99.08% / 654 | 2 / 66 / 133 / 417 / 476 / 477 / 568 / — | no | 0 | 0 | 1710/1511/837/157 | 368/10/202/101 |
| 44 | combo | win / won | 408 | 62.39% / 654 | 3 / 20 / 35 / 105 / 122 / 142 / 165 / 408 | no | 0 | 0 | 2070/1584/852/1255 | 963/703/572/956 |
| 45 | spam | win / won | 614 | 94.32% / 651 | 2 / 214 / 225 / 254 / 374 / 393 / 394 / 614 | no | 0 | 1 | 1768/1152/963/278 | 365/7/260/206 |
| 45 | combo | win / won | 384 | 58.99% / 651 | 3 / 24 / 41 / 63 / 135 / 183 / 227 / 384 | no | 0 | 1 | 1757/1152/1038/994 | 819/339/579/772 |
| 46 | spam | loss / board-full | 648 | 99.54% / 651 | 2 / 18 / 102 / 402 / 432 / 468 / 624 / — | no | 0 | 0 | 2466/1043/489/153 | 619/10/110/124 |
| 46 | combo | win / won | 447 | 68.66% / 651 | 2 / 17 / 60 / 137 / 201 / 213 / 246 / 447 | no | 0 | 0 | 2956/1218/851/1569 | 1477/423/586/1196 |
| 47 | spam | loss / board-full | 642 | 98.62% / 651 | 2 / 212 / 251 / 321 / 383 / 403 / 404 / — | no | 0 | 0 | 1594/1366/898/262 | 322/25/252/129 |
| 47 | combo | win / won | 395 | 60.68% / 651 | 3 / 39 / 54 / 112 / 145 / 158 / 159 / 395 | no | 0 | 0 | 1748/1348/851/953 | 798/348/434/671 |
| 48 | spam | loss / board-full | 630 | 100% / 630 | 2 / 204 / 267 / 368 / 567 / 568 / 608 / — | no | 0 | 0 | 1425/1360/1106/155 | 885/37/360/151 |
| 48 | combo | win / won | 346 | 54.92% / 630 | 2 / 77 / 104 / 171 / 192 / 210 / 211 / 346 | no | 0 | 0 | 1301/1376/1259/734 | 675/645/780/616 |
| 49 | spam | loss / board-full | 645 | 99.54% / 648 | 2 / 66 / 116 / 258 / 372 / 430 / 471 / — | no | 0 | 0 | 3001/818/1069/436 | 870/9/522/411 |
| 49 | combo | win / won | 576 | 88.89% / 648 | 2 / 48 / 77 / 153 / 258 / 306 / 346 / 576 | no | 0 | 0 | 3509/1154/1483/2023 | 1693/222/934/1570 |
| 50 | spam | loss / board-full | 630 | 100% / 630 | 2 / 118 / 260 / 486 / 594 / — / — / — | no | 0 | 0 | 3206/444/444/402 | 879/8/266/348 |
| 50 | combo | win / won | 579 | 91.9% / 630 | 2 / 20 / 48 / 183 / 285 / 315 / 351 / 579 | no | 0 | 0 | 5046/1157/1045/2891 | 2639/496/912/2297 |

Per-run checkpoint vectors below use **wood/stone/water/food**; each cell is `held : max cost (biome)`. The JSON retains unrounded values, lifetime totals, and living-slot fill at every threshold.

| Seed | Bot | T3 stock : cost | T4 stock : cost | T5 stock : cost | T6 stock : cost | T7 stock : cost |
|---|---|---|---|---|---|---|
| 1 | spam | 6/224/162/67 : 8/2/0/4 (forest) | 4/164/168/83 : 8/2/0/4 (forest) | 9/232/188/103 : 8/3/4/3 (taiga) | 8/203/202/105 : 8/2/0/4 (forest) | 0/188/226/107 : 8/2/0/4 (forest) |
| 1 | combo | 81/161/95/10 : 2/2/4/2 (arctic) | 182/208/118/81 : 8/3/4/3 (taiga) | 256/251/140/132 : 2/2/4/2 (arctic) | 303/267/184/162 : 8/2/0/4 (forest) | 493/268/240/327 : 8/3/4/3 (taiga) |
| 2 | spam | 14/114/116/31 : 8/2/0/4 (forest) | 12/119/156/101 : 8/2/0/4 (forest) | 3/89/224/114 : 8/3/4/3 (taiga) | 3/86/226/115 : 8/3/4/3 (taiga) | 29/4/256/140 : 2/2/4/2 (arctic) |
| 2 | combo | 159/55/84/70 : 8/3/4/3 (taiga) | 187/166/109/78 : 8/2/0/4 (forest) | 409/112/375/316 : 2/8/3/0 (desert) | 548/83/437/437 : 2/8/3/0 (desert) | 583/83/449/495 : 2/8/3/0 (desert) |
| 3 | spam | 7/158/104/31 : 8/2/0/4 (forest) | 1/73/130/62 : 8/2/0/4 (forest) | 15/52/192/71 : 8/3/4/3 (taiga) | 11/14/242/93 : 8/2/0/4 (forest) | 10/12/242/93 : 8/2/0/4 (forest) |
| 3 | combo | 69/140/56/30 : 2/2/4/2 (arctic) | 246/128/108/162 : 8/2/0/4 (forest) | 370/127/228/311 : 2/2/4/2 (arctic) | 407/134/272/353 : 2/8/3/0 (desert) | 424/136/296/361 : 2/8/3/0 (desert) |
| 4 | spam | — | — | — | — | — |
| 4 | combo | 66/30/336/125 : 2/8/3/0 (desert) | 157/5/593/316 : 3/8/4/4 (polarDesert) | 422/65/714/579 : 8/2/0/4 (forest) | 667/70/904/761 : 8/2/0/4 (forest) | 776/118/966/852 : 8/2/0/4 (forest) |
| 5 | spam | — | — | — | — | — |
| 5 | combo | 36/7/282/110 : 8/2/0/4 (forest) | 181/2/428/210 : 2/8/3/0 (desert) | 298/9/512/280 : 2/2/4/2 (arctic) | 487/9/571/415 : 2/8/3/0 (desert) | 533/5/621/426 : 2/8/3/0 (desert) |
| 6 | spam | 5/236/88/34 : 3/8/4/4 (polarDesert) | 16/224/160/94 : 8/2/0/4 (forest) | 11/223/168/102 : 8/2/0/4 (forest) | 16/196/186/104 : 8/2/0/4 (forest) | 10/175/216/111 : 2/2/4/2 (arctic) |
| 6 | combo | 138/166/35/75 : 2/2/4/2 (arctic) | 142/200/91/96 : 2/2/4/2 (arctic) | 226/243/185/204 : 8/2/0/4 (forest) | 278/245/199/252 : 8/2/0/4 (forest) | 390/261/300/381 : 2/8/3/0 (desert) |
| 7 | spam | 22/65/102/32 : 8/8/3/4 (steppe) | 1/8/480/62 : 3/8/4/4 (polarDesert) | 140/2/487/88 : 8/2/0/4 (forest) | 139/1/491/88 : 2/2/4/2 (arctic) | 336/9/579/116 : 2/2/4/2 (arctic) |
| 7 | combo | 130/55/116/50 : 2/2/4/2 (arctic) | 533/28/385/319 : 2/8/3/0 (desert) | 917/41/518/513 : 8/3/4/3 (taiga) | 1044/65/623/619 : 2/8/3/0 (desert) | 1115/113/669/667 : 8/2/0/4 (forest) |
| 8 | spam | — | — | — | — | — |
| 8 | combo | 130/62/44/116 : 2/8/3/0 (desert) | 94/92/133/197 : 3/8/4/4 (polarDesert) | 185/162/234/370 : 8/2/0/4 (forest) | 343/176/441/532 : 3/8/4/4 (polarDesert) | 471/204/493/714 : 8/2/0/4 (forest) |
| 9 | spam | 21/162/68/26 : 8/2/0/4 (forest) | 28/117/86/70 : 8/2/0/4 (forest) | 7/6/250/163 : 2/2/4/2 (arctic) | 49/11/300/188 : 3/8/4/4 (polarDesert) | 23/15/316/192 : 3/8/4/4 (polarDesert) |
| 9 | combo | 62/107/51/22 : 8/2/0/4 (forest) | 192/93/102/92 : 2/8/3/0 (desert) | 470/100/353/409 : 2/2/4/2 (arctic) | 725/120/424/620 : 8/2/0/4 (forest) | 932/153/486/788 : 2/2/4/2 (arctic) |
| 10 | spam | 23/1/164/26 : 8/3/4/3 (taiga) | — | — | — | — |
| 10 | combo | 65/67/163/67 : 2/8/3/0 (desert) | 242/7/270/171 : 2/8/3/0 (desert) | 232/14/521/304 : 2/8/3/0 (desert) | 330/12/651/341 : 2/8/3/0 (desert) | 316/14/675/343 : 2/2/4/2 (arctic) |
| 11 | spam | — | — | — | — | — |
| 11 | combo | 98/9/98/79 : 8/8/3/4 (steppe) | 117/42/318/183 : 2/2/4/2 (arctic) | 179/70/475/351 : 8/2/0/4 (forest) | 198/35/485/383 : 8/2/0/4 (forest) | 375/56/531/496 : 8/2/0/4 (forest) |
| 12 | spam | 229/29/64/43 : 8/3/4/3 (taiga) | 220/174/184/83 : 3/8/4/4 (polarDesert) | 179/117/236/128 : 8/2/0/4 (forest) | 151/85/288/162 : 2/2/4/2 (arctic) | 120/58/330/177 : 8/8/3/4 (steppe) |
| 12 | combo | 185/39/42/84 : 8/3/4/3 (taiga) | 196/110/157/149 : 2/2/4/2 (arctic) | 333/161/277/242 : 2/2/4/2 (arctic) | 450/195/325/389 : 3/8/4/4 (polarDesert) | 601/186/409/503 : 2/8/3/0 (desert) |
| 13 | spam | 6/43/293/83 : 2/2/4/2 (arctic) | 33/21/293/83 : 8/2/0/4 (forest) | 69/0/293/125 : 8/3/4/3 (taiga) | 112/0/293/125 : 8/3/4/3 (taiga) | 137/22/299/129 : 2/2/4/2 (arctic) |
| 13 | combo | 64/125/215/75 : 2/8/3/0 (desert) | 135/114/248/102 : 8/2/0/4 (forest) | 322/121/302/288 : 3/8/4/4 (polarDesert) | 328/175/335/346 : 3/8/4/4 (polarDesert) | 391/185/393/411 : 8/3/4/3 (taiga) |
| 14 | spam | 15/233/112/36 : 8/3/4/3 (taiga) | 5/296/336/109 : 2/2/4/2 (arctic) | 4/440/398/153 : 2/2/4/2 (arctic) | 14/424/400/155 : 8/2/0/4 (forest) | 12/422/400/155 : 8/2/0/4 (forest) |
| 14 | combo | 49/130/111/72 : 8/2/0/4 (forest) | 116/250/276/128 : 8/2/0/4 (forest) | 192/463/463/300 : 8/2/0/4 (forest) | 247/461/469/326 : 8/3/4/3 (taiga) | 261/467/475/332 : 8/3/4/3 (taiga) |
| 15 | spam | 8/3/140/88 : 8/8/3/4 (steppe) | 30/4/344/134 : 8/2/0/4 (forest) | 100/0/369/136 : 8/3/4/3 (taiga) | 67/1/497/144 : 8/2/0/4 (forest) | 55/5/497/148 : 2/8/3/0 (desert) |
| 15 | combo | 53/95/63/53 : 8/2/0/4 (forest) | 271/76/338/182 : 8/8/3/4 (steppe) | 430/5/710/352 : 2/8/3/0 (desert) | 503/23/834/404 : 3/8/4/4 (polarDesert) | 574/47/871/507 : 8/2/0/4 (forest) |
| 16 | spam | 4/240/200/62 : 2/2/4/2 (arctic) | 11/140/216/88 : 8/2/0/4 (forest) | 4/49/366/123 : 2/2/4/2 (arctic) | 6/30/386/140 : 8/2/0/4 (forest) | 12/30/386/141 : 8/2/0/4 (forest) |
| 16 | combo | 62/223/81/73 : 2/8/3/0 (desert) | 132/223/143/145 : 8/2/0/4 (forest) | 169/170/377/315 : 8/2/0/4 (forest) | 223/150/427/362 : 8/2/0/4 (forest) | 279/154/441/420 : 8/2/0/4 (forest) |
| 17 | spam | 14/53/116/31 : 8/2/0/4 (forest) | — | — | — | — |
| 17 | combo | 146/40/150/98 : 2/2/4/2 (arctic) | 446/4/252/400 : 8/2/0/4 (forest) | 750/2/595/719 : 8/2/0/4 (forest) | 911/8/643/817 : 8/2/0/4 (forest) | 920/9/651/852 : 2/8/3/0 (desert) |
| 18 | spam | 11/10/40/63 : 8/2/0/4 (forest) | 6/51/60/94 : 8/2/0/4 (forest) | 167/5/210/217 : 2/8/3/0 (desert) | 139/11/214/240 : 3/8/4/4 (polarDesert) | 106/14/214/254 : 2/8/3/0 (desert) |
| 18 | combo | 41/63/34/84 : 2/2/4/2 (arctic) | 96/144/85/181 : 8/2/0/4 (forest) | 437/106/263/472 : 2/2/4/2 (arctic) | 440/116/278/538 : 3/8/4/4 (polarDesert) | 458/167/309/579 : 2/2/4/2 (arctic) |
| 19 | spam | 11/56/102/75 : 8/2/0/4 (forest) | 53/5/132/152 : 2/8/3/0 (desert) | 22/27/144/179 : 8/8/3/4 (steppe) | 6/3/152/186 : 2/8/3/0 (desert) | 87/6/160/208 : 8/2/0/4 (forest) |
| 19 | combo | 45/98/92/109 : 8/8/3/4 (steppe) | 124/89/132/185 : 8/2/0/4 (forest) | 390/113/181/399 : 2/8/3/0 (desert) | 462/107/257/474 : 8/8/3/4 (steppe) | 573/78/287/605 : 2/8/3/0 (desert) |
| 20 | spam | 22/209/82/40 : 2/2/4/2 (arctic) | 6/310/110/83 : 2/2/4/2 (arctic) | 9/276/128/110 : 8/2/0/4 (forest) | 12/345/196/160 : 8/3/4/3 (taiga) | 15/345/196/160 : 8/3/4/3 (taiga) |
| 20 | combo | 71/64/46/44 : 2/8/3/0 (desert) | 142/337/170/131 : 2/8/3/0 (desert) | 246/332/196/210 : 8/3/4/3 (taiga) | 298/344/210/244 : 8/2/0/4 (forest) | 317/343/222/258 : 2/8/3/0 (desert) |
| 21 | spam | 117/6/204/65 : 8/2/0/4 (forest) | 352/6/290/194 : 8/2/0/4 (forest) | 494/4/446/266 : 8/2/0/4 (forest) | 446/4/458/272 : 2/2/4/2 (arctic) | 472/5/496/301 : 2/8/3/0 (desert) |
| 21 | combo | 256/3/222/158 : 2/8/3/0 (desert) | 558/3/344/396 : 8/8/3/4 (steppe) | 609/27/551/523 : 2/8/3/0 (desert) | 665/51/587/605 : 2/8/3/0 (desert) | 797/69/657/719 : 2/8/3/0 (desert) |
| 22 | spam | 9/80/58/32 : 8/2/0/4 (forest) | 12/6/90/72 : 2/2/4/2 (arctic) | 60/17/108/143 : 2/2/4/2 (arctic) | 39/13/144/152 : 3/8/4/4 (polarDesert) | 138/5/164/172 : 2/2/4/2 (arctic) |
| 22 | combo | 74/60/71/111 : 8/2/0/4 (forest) | 422/94/166/368 : 2/2/4/2 (arctic) | 992/130/274/708 : 2/2/4/2 (arctic) | 1058/167/384/769 : 3/8/4/4 (polarDesert) | 1137/217/426/818 : 8/8/3/4 (steppe) |
| 23 | spam | — | — | — | — | — |
| 23 | combo | 52/129/83/69 : 2/2/4/2 (arctic) | 114/247/97/146 : 2/2/4/2 (arctic) | 285/247/146/341 : 8/8/3/4 (steppe) | 351/248/293/457 : 8/8/3/4 (steppe) | 325/234/301/494 : 2/8/3/0 (desert) |
| 24 | spam | 7/117/126/14 : 8/2/0/4 (forest) | 10/60/150/80 : 8/2/0/4 (forest) | — | — | — |
| 24 | combo | 36/108/138/90 : 8/2/0/4 (forest) | 449/92/198/449 : 2/2/4/2 (arctic) | 873/126/390/781 : 2/2/4/2 (arctic) | 1013/190/426/877 : 2/2/4/2 (arctic) | 1118/246/490/951 : 2/2/4/2 (arctic) |
| 25 | spam | 195/32/138/51 : 2/8/3/0 (desert) | 197/139/218/98 : 2/8/3/0 (desert) | 169/213/234/125 : 2/8/3/0 (desert) | 169/211/234/126 : 8/2/0/4 (forest) | 129/179/312/150 : 8/2/0/4 (forest) |
| 25 | combo | 184/20/141/95 : 2/8/3/0 (desert) | 218/84/209/104 : 2/8/3/0 (desert) | 264/254/310/180 : 8/3/4/3 (taiga) | 306/243/310/212 : 8/2/0/4 (forest) | 313/243/310/212 : 8/2/0/4 (forest) |
| 26 | spam | 45/66/14/38 : 8/3/4/3 (taiga) | 322/3/72/92 : 2/8/3/0 (desert) | 240/37/98/104 : 2/8/3/0 (desert) | 192/48/110/104 : 3/8/4/4 (polarDesert) | 174/67/128/104 : 2/8/3/0 (desert) |
| 26 | combo | 48/103/33/37 : 8/2/0/4 (forest) | 122/67/71/86 : 8/3/4/3 (taiga) | 631/82/163/460 : 2/2/4/2 (arctic) | 620/107/192/502 : 2/2/4/2 (arctic) | 660/151/238/573 : 3/8/4/4 (polarDesert) |
| 27 | spam | — | — | — | — | — |
| 27 | combo | 184/47/131/129 : 2/2/4/2 (arctic) | 415/57/365/454 : 8/2/0/4 (forest) | 735/47/490/759 : 8/2/0/4 (forest) | 808/45/602/867 : 3/8/4/4 (polarDesert) | 925/92/680/976 : 8/8/3/4 (steppe) |
| 28 | spam | 4/201/100/106 : 2/2/4/2 (arctic) | 5/132/130/181 : 2/2/4/2 (arctic) | 15/289/267/216 : 8/2/0/4 (forest) | 4/275/281/237 : 2/2/4/2 (arctic) | 1/276/281/237 : 3/8/4/4 (polarDesert) |
| 28 | combo | 66/193/41/38 : 2/2/4/2 (arctic) | 234/251/73/186 : 2/8/3/0 (desert) | 248/285/130/214 : 3/8/4/4 (polarDesert) | 265/239/216/259 : 8/8/3/4 (steppe) | 266/232/216/269 : 8/8/3/4 (steppe) |
| 29 | spam | 234/2/204/117 : 2/8/3/0 (desert) | 219/78/272/131 : 2/2/4/2 (arctic) | 185/147/338/168 : 2/8/3/0 (desert) | 176/145/344/200 : 2/8/3/0 (desert) | 170/123/344/200 : 3/8/4/4 (polarDesert) |
| 29 | combo | 93/42/34/87 : 2/8/3/0 (desert) | 109/59/282/181 : 2/8/3/0 (desert) | 196/215/526/370 : 8/2/0/4 (forest) | 242/210/542/388 : 8/2/0/4 (forest) | 253/213/546/401 : 8/2/0/4 (forest) |
| 30 | spam | 5/134/81/79 : 2/2/4/2 (arctic) | 5/150/263/131 : 2/2/4/2 (arctic) | 6/143/331/148 : 8/3/4/3 (taiga) | 7/201/389/153 : 8/2/0/4 (forest) | 9/201/389/153 : 8/3/4/3 (taiga) |
| 30 | combo | 58/88/37/49 : 2/2/4/2 (arctic) | 210/112/279/112 : 2/8/3/0 (desert) | 289/188/448/235 : 8/3/4/3 (taiga) | 369/165/520/291 : 8/2/0/4 (forest) | 453/191/541/384 : 2/8/3/0 (desert) |
| 31 | spam | 4/190/50/48 : 2/2/4/2 (arctic) | 4/228/232/167 : 2/2/4/2 (arctic) | 180/166/298/218 : 2/2/4/2 (arctic) | 198/154/298/218 : 8/3/4/3 (taiga) | 203/152/298/219 : 2/2/4/2 (arctic) |
| 31 | combo | 30/285/52/84 : 2/2/4/2 (arctic) | 143/362/232/192 : 2/2/4/2 (arctic) | 235/545/527/484 : 2/2/4/2 (arctic) | 294/553/535/514 : 8/2/0/4 (forest) | 299/551/535/515 : 2/2/4/2 (arctic) |
| 32 | spam | 5/275/158/53 : 2/2/4/2 (arctic) | 9/341/271/67 : 2/2/4/2 (arctic) | 12/287/271/91 : 8/2/0/4 (forest) | 9/263/271/94 : 8/2/0/4 (forest) | — |
| 32 | combo | 54/219/88/57 : 3/8/4/4 (polarDesert) | 150/320/287/176 : 2/8/3/0 (desert) | 262/305/296/245 : 8/2/0/4 (forest) | 312/298/298/277 : 8/3/4/3 (taiga) | 323/300/300/279 : 8/3/4/3 (taiga) |
| 33 | spam | 0/56/24/39 : 8/3/4/3 (taiga) | 15/39/90/136 : 8/2/0/4 (forest) | 83/0/146/182 : 8/2/0/4 (forest) | 119/0/207/197 : 8/3/4/3 (taiga) | 187/6/275/223 : 2/2/4/2 (arctic) |
| 33 | combo | 326/63/42/318 : 8/3/4/3 (taiga) | 346/109/91/367 : 3/8/4/4 (polarDesert) | 550/73/238/538 : 8/3/4/3 (taiga) | 612/49/464/611 : 2/2/4/2 (arctic) | 718/76/523/711 : 8/2/0/4 (forest) |
| 34 | spam | 4/307/177/109 : 2/2/4/2 (arctic) | 5/508/297/176 : 2/2/4/2 (arctic) | 164/427/317/206 : 2/2/4/2 (arctic) | 150/403/317/206 : 8/3/4/3 (taiga) | 154/403/317/206 : 8/3/4/3 (taiga) |
| 34 | combo | 25/243/142/110 : 2/2/4/2 (arctic) | 23/515/506/376 : 2/2/4/2 (arctic) | 134/865/694/562 : 2/2/4/2 (arctic) | 181/864/704/600 : 8/2/0/4 (forest) | 190/865/706/611 : 8/2/0/4 (forest) |
| 35 | spam | 18/48/34/25 : 2/8/3/0 (desert) | 0/129/126/93 : 8/2/0/4 (forest) | 0/288/180/121 : 8/2/0/4 (forest) | 5/572/214/219 : 8/2/0/4 (forest) | 7/572/214/219 : 8/2/0/4 (forest) |
| 35 | combo | 64/55/38/43 : 8/2/0/4 (forest) | 227/112/95/186 : 2/8/3/0 (desert) | 578/126/222/525 : 8/2/0/4 (forest) | 696/144/268/651 : 8/2/0/4 (forest) | 821/151/316/785 : 2/8/3/0 (desert) |
| 36 | spam | 20/214/206/45 : 8/2/0/4 (forest) | 5/155/322/82 : 2/2/4/2 (arctic) | 6/38/498/119 : 2/2/4/2 (arctic) | 5/16/510/124 : 2/2/4/2 (arctic) | 2/15/510/126 : 8/2/0/4 (forest) |
| 36 | combo | 95/82/125/20 : 2/8/3/0 (desert) | 232/112/285/84 : 2/8/3/0 (desert) | 289/40/543/253 : 8/2/0/4 (forest) | 458/50/583/352 : 2/8/3/0 (desert) | 518/45/643/372 : 2/8/3/0 (desert) |
| 37 | spam | 6/170/248/85 : 8/2/0/4 (forest) | 12/167/248/115 : 8/2/0/4 (forest) | 24/117/252/196 : 8/2/0/4 (forest) | 8/139/264/210 : 8/2/0/4 (forest) | 6/137/264/211 : 8/2/0/4 (forest) |
| 37 | combo | 71/107/116/31 : 2/8/3/0 (desert) | 150/103/131/76 : 8/3/4/3 (taiga) | 454/114/216/344 : 8/3/4/3 (taiga) | 499/183/251/382 : 8/3/4/3 (taiga) | 552/207/281/464 : 2/2/4/2 (arctic) |
| 38 | spam | 71/182/24/41 : 2/8/3/0 (desert) | 2/143/48/78 : 3/8/4/4 (polarDesert) | 2/202/88/89 : 3/8/4/4 (polarDesert) | 2/201/88/89 : 2/8/3/0 (desert) | 4/150/114/95 : 8/2/0/4 (forest) |
| 38 | combo | 111/71/39/54 : 2/8/3/0 (desert) | 148/271/64/88 : 2/8/3/0 (desert) | 211/280/89/194 : 2/8/3/0 (desert) | 217/205/91/208 : 8/8/3/4 (steppe) | 221/205/91/208 : 8/3/4/3 (taiga) |
| 39 | spam | 5/308/90/32 : 2/2/4/2 (arctic) | 2/241/98/47 : 3/8/4/4 (polarDesert) | 18/145/102/55 : 8/2/0/4 (forest) | 60/139/126/70 : 8/3/4/3 (taiga) | 59/138/130/72 : 2/2/4/2 (arctic) |
| 39 | combo | 42/232/63/39 : 8/2/0/4 (forest) | 108/222/91/82 : 8/2/0/4 (forest) | 431/207/154/328 : 8/8/3/4 (steppe) | 459/195/202/363 : 8/3/4/3 (taiga) | 492/199/364/454 : 2/2/4/2 (arctic) |
| 40 | spam | 18/185/132/90 : 2/2/4/2 (arctic) | 86/223/224/125 : 2/2/4/2 (arctic) | 295/141/262/160 : 2/2/4/2 (arctic) | 305/129/262/160 : 8/3/4/3 (taiga) | 308/129/262/161 : 8/3/4/3 (taiga) |
| 40 | combo | 23/235/212/148 : 2/2/4/2 (arctic) | 73/430/338/286 : 3/8/4/4 (polarDesert) | 209/692/565/438 : 2/2/4/2 (arctic) | 261/698/571/462 : 8/3/4/3 (taiga) | 264/696/571/462 : 8/3/4/3 (taiga) |
| 41 | spam | 5/297/202/89 : 2/2/4/2 (arctic) | 92/314/292/137 : 2/2/4/2 (arctic) | — | — | — |
| 41 | combo | 73/218/141/27 : 2/2/4/2 (arctic) | 179/357/307/171 : 2/8/3/0 (desert) | 278/446/797/417 : 2/8/3/0 (desert) | 334/534/938/534 : 2/8/3/0 (desert) | 341/538/947/538 : 2/8/3/0 (desert) |
| 42 | spam | 20/265/52/59 : 8/2/0/4 (forest) | 10/304/100/120 : 8/2/0/4 (forest) | 4/410/258/171 : 2/2/4/2 (arctic) | 6/378/260/180 : 8/8/3/4 (steppe) | 8/378/260/181 : 8/3/4/3 (taiga) |
| 42 | combo | 36/310/92/47 : 2/2/4/2 (arctic) | 126/390/178/126 : 8/2/0/4 (forest) | 225/496/251/253 : 2/8/3/0 (desert) | 302/577/379/349 : 2/8/3/0 (desert) | 305/577/384/350 : 2/8/3/0 (desert) |
| 43 | spam | 8/42/140/46 : 8/2/0/4 (forest) | 23/2/258/84 : 8/3/4/3 (taiga) | — | — | — |
| 43 | combo | 46/47/125/73 : 8/3/4/3 (taiga) | 77/72/304/168 : 8/3/4/3 (taiga) | 274/24/554/307 : 2/8/3/0 (desert) | 438/46/632/490 : 2/2/4/2 (arctic) | 477/107/663/506 : 2/2/4/2 (arctic) |
| 44 | spam | 0/251/12/38 : 2/2/4/2 (arctic) | 14/214/82/47 : 8/2/0/4 (forest) | 0/224/172/76 : 3/8/4/4 (polarDesert) | 0/230/172/77 : 3/8/4/4 (polarDesert) | 20/156/200/99 : 8/2/0/4 (forest) |
| 44 | combo | 62/181/36/43 : 2/2/4/2 (arctic) | 268/329/98/211 : 3/8/4/4 (polarDesert) | 292/354/151/230 : 3/8/4/4 (polarDesert) | 287/361/185/269 : 2/8/3/0 (desert) | 301/393/234/316 : 3/8/4/4 (polarDesert) |
| 45 | spam | 21/92/116/71 : 8/2/0/4 (forest) | 8/59/130/82 : 8/2/0/4 (forest) | 7/83/190/127 : 8/2/0/4 (forest) | 7/66/198/145 : 8/2/0/4 (forest) | 6/65/200/146 : 2/2/4/2 (arctic) |
| 45 | combo | 58/108/74/25 : 8/2/0/4 (forest) | 114/111/90/87 : 8/8/3/4 (steppe) | 217/78/165/240 : 2/8/3/0 (desert) | 294/62/244/330 : 8/2/0/4 (forest) | 367/88/315/412 : 2/2/4/2 (arctic) |
| 46 | spam | 31/17/14/32 : 2/8/3/0 (desert) | 245/5/48/104 : 2/8/3/0 (desert) | 258/3/68/107 : 2/8/3/0 (desert) | 237/43/68/107 : 2/8/3/0 (desert) | 539/2/108/122 : 2/2/4/2 (arctic) |
| 46 | combo | 214/99/40/132 : 8/2/0/4 (forest) | 547/96/107/437 : 8/3/4/3 (taiga) | 767/90/202/615 : 8/2/0/4 (forest) | 782/174/215/623 : 8/2/0/4 (forest) | 856/203/319/702 : 8/8/3/4 (steppe) |
| 47 | spam | 5/312/76/32 : 2/2/4/2 (arctic) | 8/229/168/49 : 8/3/4/3 (taiga) | 4/212/200/75 : 2/2/4/2 (arctic) | 16/180/216/91 : 8/2/0/4 (forest) | 16/187/216/91 : 2/8/3/0 (desert) |
| 47 | combo | 52/319/40/45 : 2/2/4/2 (arctic) | 113/243/154/114 : 8/2/0/4 (forest) | 196/222/188/172 : 8/2/0/4 (forest) | 249/209/198/201 : 8/3/4/3 (taiga) | 263/215/204/207 : 8/3/4/3 (taiga) |
| 48 | spam | 6/219/184/83 : 2/2/4/2 (arctic) | 94/248/320/95 : 2/2/4/2 (arctic) | 836/9/338/126 : 2/2/4/2 (arctic) | 836/14/338/126 : 2/8/3/0 (desert) | 818/74/356/147 : 3/8/4/4 (polarDesert) |
| 48 | combo | 52/194/216/132 : 2/2/4/2 (arctic) | 101/419/450/252 : 2/2/4/2 (arctic) | 201/415/466/339 : 8/2/0/4 (forest) | 257/476/500/363 : 8/3/4/3 (taiga) | 257/473/504/364 : 8/3/4/3 (taiga) |
| 49 | spam | 139/4/132/110 : 2/2/4/2 (arctic) | 211/3/280/188 : 2/8/3/0 (desert) | 248/4/334/247 : 2/8/3/0 (desert) | 268/4/378/276 : 8/8/3/4 (steppe) | 314/3/406/298 : 2/8/3/0 (desert) |
| 49 | combo | 238/5/137/265 : 2/2/4/2 (arctic) | 339/29/323/457 : 8/3/4/3 (taiga) | 627/31/460/670 : 8/2/0/4 (forest) | 780/68/569/834 : 8/2/0/4 (forest) | 940/85/634/932 : 8/8/3/4 (steppe) |
| 50 | spam | 354/12/54/138 : 8/2/0/4 (forest) | 696/2/152/319 : 8/2/0/4 (forest) | 731/4/252/331 : 2/2/4/2 (arctic) | — | — |
| 50 | combo | 167/48/52/152 : 8/2/0/4 (forest) | 794/52/186/758 : 8/2/0/4 (forest) | 1268/109/372/1129 : 8/2/0/4 (forest) | 1404/168/406/1216 : 2/2/4/2 (arctic) | 1604/212/468/1377 : 8/2/0/4 (forest) |

## N9 round 1 — production-resource costs

Real GameSession, 20×14, seeds 1–50, 112690 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offer/core scoring and tie rules are unchanged.

V4: T8 wins immediately. Loss means engine proof or no empty living slots after usable cores/offers/spread are exhausted (board-full bot loss; replacement escape may still exist). An unproven empty-slot stall is not a loss. Board use includes ALL map placeable slots, including dead land. All-seed threshold medians censor unreached thresholds as infinity. Stock pressure samples the T3–T7 payout transactions, against the current placement biome roster; positive stock against zero cost has infinite ratio. T7 requires ≥90% completion and EVERY completer below 60%, not only the median. False-loss audits check direct productive replacements and refund-funded unpaid base yields; they are a constructive check, not an exhaustive search of all future replacement sequences.

| Target | Result | Evidence |
|---|---|---|
| 1. Good play wins ≥90%; zero false loss | PASS | 50/50 combo wins; 0 detected false soft-locks |
| 2. Spam loses ≥90% | PASS | 45/50 spam losses before T8 |
| 3. Winning board use 65–85% | PASS | 68.87% median winning board use |
| 4. No opening stalls before T2 | PASS | zero combo opening stalls |
| 5. T3–T7 median stock ≤3× max cost | MISS | worst checkpoint/resource median stock/max-cost = 154.81× |
| 6. T7 before 60% board use | PASS | 50/50 reach T7; median 37.6%, max 59.8% |

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n |
|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 50/50 | 2 | 2 (2–45), 49/50 |
| T2 | 21 | 21 (11–63), 50/50 | 51.5 | 50 (12–162), 48/50 |
| T3 | 45 | 45 (23–100), 50/50 | 103 | 101 (28–352), 48/50 |
| T4 | 100.5 | 100.5 (60–183), 50/50 | 239 | 227 (92–551), 45/50 |
| T5 | 178 | 178 (105–302), 50/50 | 360 | 352 (163–615), 45/50 |
| T6 | 205 | 205 (122–356), 50/50 | 408.5 | 377 (190–591), 41/50 |
| T7 | 228.5 | 228.5 (146–357), 50/50 | 524 | 440 (260–634), 37/50 |
| T8 | 426 | 426 (334–579), 50/50 | ∞ | 561 (537–600), 3/50 |

| Combo stock checkpoint | Resource | Samples | Median held | Median max cost | Median held/max cost |
|---|---|---:|---:|---:|---:|
| T3 | wood | 50/50 | 66 | 2 | 28.63× |
| T3 | stone | 50/50 | 107.5 | 2 | 31× |
| T3 | water | 50/50 | 46.5 | 7 | 9.38× |
| T3 | food | 50/50 | 49 | 5 | 10.43× |
| T4 | wood | 50/50 | 203.5 | 5.5 | 59.44× |
| T4 | stone | 50/50 | 120 | 2 | 44.5× |
| T4 | water | 50/50 | 88 | 6 | 23.33× |
| T4 | food | 50/50 | 120 | 6 | 25× |
| T5 | wood | 50/50 | 342.5 | 5.5 | 108.46× |
| T5 | stone | 50/50 | 135 | 2 | 54.5× |
| T5 | water | 50/50 | 146.5 | 6 | 26.19× |
| T5 | food | 50/50 | 238 | 6 | 49.25× |
| T6 | wood | 50/50 | 487 | 8 | 107.56× |
| T6 | stone | 50/50 | 182 | 3 | 52.94× |
| T6 | water | 50/50 | 178 | 6 | 33.06× |
| T6 | food | 50/50 | 304.5 | 6 | 54.06× |
| T7 | wood | 50/50 | 548 | 5.5 | 154.81× |
| T7 | stone | 50/50 | 202.5 | 3 | 53.5× |
| T7 | water | 50/50 | 191.5 | 6 | 32.52× |
| T7 | food | 50/50 | 323 | 6 | 66.23× |

combo: 50 wins; 0 losses (0 board-full, 0 proven); 0 unproven stalls; 0 action-cap.

spam: 3 wins; 45 losses (45 board-full, 0 proven); 2 unproven stalls; 0 action-cap.

| Seed | Bot | Outcome / stop | Placements | Board use / map slots | T1–T8 placements | Opening stall | False loss | Legal core sites left | Final lifetime W/S/A/F | Final stock W/S/A/F |
|---|---|---|---:|---|---|---|---:|---:|---|---|
| 1 | spam | loss / board-full | 633 | 98.6% / 642 | 2 / 118 / 129 / 185 / 357 / 358 / 558 / — | no | 0 | 0 | 2295/1238/469/175 | 346/7/14/115 |
| 1 | combo | win / won | 357 | 55.61% / 642 | 2 / 18 / 42 / 78 / 105 / 125 / 177 / 357 | no | 0 | 0 | 1666/1151/940/676 | 942/434/232/404 |
| 2 | spam | loss / board-full | 633 | 99.53% / 636 | 2 / 101 / 106 / 335 / 363 / 364 / 391 / — | no | 0 | 0 | 2288/1319/573/242 | 485/4/63/162 |
| 2 | combo | win / won | 425 | 66.82% / 636 | 3 / 16 / 42 / 65 / 171 / 226 / 254 / 425 | no | 0 | 0 | 2189/1154/1230/1226 | 1267/345/221/633 |
| 3 | spam | loss / board-full | 609 | 99.02% / 615 | 4 / 50 / 94 / 148 / 376 / 462 / 536 / — | no | 0 | 0 | 1915/1280/441/364 | 407/7/4/89 |
| 3 | combo | win / won | 393 | 63.9% / 615 | 4 / 14 / 33 / 84 / 164 / 199 / 218 / 393 | no | 0 | 0 | 1647/1152/982/1026 | 910/339/34/530 |
| 4 | spam | loss / board-full | 582 | 97.98% / 594 | 2 / 55 / 79 / 174 / 403 / 509 / 534 / — | no | 0 | 0 | 1679/766/1193/278 | 784/15/5/74 |
| 4 | combo | win / won | 527 | 88.72% / 594 | 2 / 19 / 59 / 153 / 231 / 300 / 326 / 527 | no | 0 | 0 | 2503/1151/2112/1524 | 1441/332/645/783 |
| 5 | spam | win / won | 561 | 89.05% / 630 | 2 / 72 / 78 / 194 / 238 / 275 / 308 / 561 | no | 0 | 0 | 1353/1244/1049/270 | 319/17/7/166 |
| 5 | combo | win / won | 486 | 77.14% / 630 | 2 / 44 / 65 / 137 / 209 / 276 / 304 / 486 | no | 0 | 0 | 1307/1279/1696/876 | 806/120/4/518 |
| 6 | spam | loss / board-full | 630 | 98.59% / 639 | 2 / 30 / 106 / 271 / 353 / 354 / 376 / — | no | 0 | 0 | 1552/1816/514/207 | 242/9/14/139 |
| 6 | combo | win / won | 343 | 53.68% / 639 | 2 / 20 / 49 / 64 / 110 / 122 / 156 / 343 | no | 0 | 0 | 1478/1155/897/996 | 808/350/118/602 |
| 7 | spam | loss / board-full | 612 | 98.55% / 621 | 2 / 28 / 48 / 250 / 341 / 378 / 440 / — | no | 0 | 0 | 1704/909/1270/207 | 507/11/16/108 |
| 7 | combo | win / won | 504 | 81.16% / 621 | 3 / 13 / 40 / 153 / 249 / 291 / 312 / 504 | no | 0 | 0 | 2845/1150/1755/1400 | 1758/374/686/861 |
| 8 | spam | loss / board-full | 564 | 99.47% / 567 | 2 / 21 / 54 / 108 / 198 / 295 / 296 / — | no | 0 | 0 | 1597/1172/700/490 | 213/1/17/193 |
| 8 | combo | win / won | 371 | 65.43% / 567 | 2 / 14 / 39 / 63 / 117 / 183 / 225 / 371 | no | 0 | 0 | 1795/1151/1166/1390 | 947/470/456/882 |
| 9 | spam | loss / board-full | 567 | 97.42% / 582 | 2 / 56 / 63 / 92 / 266 / 363 / 389 / — | no | 0 | 0 | 1893/1046/757/304 | 145/19/5/138 |
| 9 | combo | win / won | 402 | 69.07% / 582 | 2 / 24 / 29 / 65 / 177 / 240 / 287 / 402 | no | 0 | 0 | 2195/1159/1141/1302 | 1232/534/398/736 |
| 10 | spam | loss / board-full | 594 | 99.5% / 597 | 2 / 33 / 106 / 490 / 555 / 556 / — / — | no | 0 | 0 | 1864/975/918/140 | 687/13/39/106 |
| 10 | combo | win / won | 516 | 86.43% / 597 | 2 / 31 / 41 / 126 / 200 / 244 / 262 / 516 | no | 0 | 0 | 2440/1153/1641/1198 | 1310/157/418/632 |
| 11 | spam | loss / board-full | 387 | 61.72% / 627 | 2 / — / — / — / — / — / — / — | no | 0 | 77 | 3/1200/195/54 | 0/823/5/53 |
| 11 | combo | win / won | 438 | 69.86% / 627 | 2 / 29 / 48 / 113 / 179 / 203 / 233 / 438 | no | 0 | 0 | 1859/1153/1351/1136 | 867/79/256/634 |
| 12 | spam | win / won | 537 | 86.89% / 618 | 45 / 48 / 64 / 133 / 197 / 241 / 318 / 537 | no | 0 | 0 | 1635/1167/850/299 | 179/8/6/112 |
| 12 | combo | win / won | 390 | 63.11% / 618 | 33 / 36 / 43 / 79 / 140 / 177 / 219 / 390 | no | 0 | 0 | 2012/1150/1168/1176 | 1143/434/372/666 |
| 13 | spam | loss / board-full | 582 | 98.98% / 588 | 7 / 98 / 146 / 168 / 369 / 379 / 409 / — | no | 0 | 0 | 1489/1582/619/493 | 236/10/6/158 |
| 13 | combo | win / won | 354 | 60.2% / 588 | 7 / 44 / 65 / 84 / 144 / 162 / 192 / 354 | no | 0 | 0 | 1594/1153/1048/947 | 914/419/322/595 |
| 14 | spam | loss / board-full | 552 | 98.92% / 558 | 2 / 95 / 102 / 267 / 352 / 365 / 366 / — | no | 0 | 0 | 1064/1692/718/291 | 12/282/4/78 |
| 14 | combo | win / won | 403 | 72.22% / 558 | 2 / 33 / 45 / 99 / 182 / 191 / 192 / 403 | no | 0 | 0 | 1303/1695/1339/886 | 691/784/281/560 |
| 15 | spam | loss / board-full | 576 | 99.48% / 579 | 2 / 37 / 56 / 227 / 285 / 344 / 385 / — | no | 0 | 0 | 1340/1071/1262/336 | 431/11/26/132 |
| 15 | combo | win / won | 456 | 78.76% / 579 | 3 / 18 / 35 / 106 / 236 / 277 / 306 / 456 | no | 0 | 0 | 1562/1160/1719/1181 | 881/284/419/617 |
| 16 | spam | loss / board-full | 585 | 99.49% / 588 | 2 / 119 / 216 / 244 / 307 / 363 / 364 / — | no | 0 | 0 | 1149/1561/675/278 | 144/310/6/106 |
| 16 | combo | win / won | 486 | 82.65% / 588 | 2 / 27 / 57 / 84 / 167 / 188 / 198 / 486 | no | 0 | 0 | 1303/1820/1689/1122 | 605/556/138/654 |
| 17 | spam | loss / board-full | 597 | 100% / 597 | 2 / 21 / 43 / 201 / 332 / 377 / 435 / — | no | 0 | 0 | 2297/885/1051/361 | 1017/11/33/216 |
| 17 | combo | win / won | 513 | 85.93% / 597 | 3 / 13 / 47 / 147 / 264 / 317 / 340 / 513 | no | 0 | 0 | 2991/1154/1498/1713 | 1708/302/448/952 |
| 18 | spam | loss / board-full | 615 | 98.56% / 624 | 2 / 13 / 33 / 342 / 398 / 490 / 538 / — | no | 0 | 0 | 1951/1610/479/419 | 467/14/5/375 |
| 18 | combo | win / won | 417 | 66.83% / 624 | 2 / 13 / 26 / 60 / 177 / 201 / 219 / 417 | no | 0 | 0 | 1962/1152/1054/1350 | 997/302/129/784 |
| 19 | spam | loss / board-full | 642 | 100% / 642 | 2 / 48 / 67 / 132 / 227 / 531 / 575 / — | no | 0 | 0 | 2294/1305/454/302 | 579/10/7/258 |
| 19 | combo | win / won | 426 | 66.36% / 642 | 2 / 31 / 50 / 75 / 159 / 199 / 242 / 426 | no | 0 | 0 | 2452/1151/904/1367 | 1396/408/182/771 |
| 20 | spam | loss / board-full | 621 | 98.1% / 633 | 10 / 13 / 79 / 130 / 163 / 190 / — / — | no | 0 | 0 | 2187/1301/345/266 | 322/7/13/164 |
| 20 | combo | win / won | 378 | 59.72% / 633 | 8 / 12 / 33 / 98 / 122 / 137 / 146 / 378 | no | 0 | 0 | 2012/1263/853/1059 | 1164/535/216/622 |
| 21 | spam | loss / board-full | 567 | 97.93% / 579 | 16 / 37 / 73 / 232 / 380 / 411 / 467 / — | no | 0 | 0 | 1976/861/1216/454 | 897/21/9/283 |
| 21 | combo | win / won | 552 | 95.34% / 579 | 25 / 42 / 69 / 156 / 240 / 277 / 306 / 552 | no | 0 | 0 | 2890/1152/1625/1663 | 1573/55/372/968 |
| 22 | spam | loss / board-full | 606 | 98.06% / 618 | 2 / 25 / 45 / 284 / 558 / 573 / — / — | no | 0 | 0 | 2733/675/294/251 | 825/4/33/133 |
| 22 | combo | win / won | 495 | 80.1% / 618 | 3 / 12 / 34 / 122 / 241 / 276 / 295 / 495 | no | 0 | 0 | 3808/1153/936/1750 | 2335/601/563/1035 |
| 23 | spam | stuck / stuck | 6 | 0.91% / 657 | — / — / — / — / — / — / — / — | yes | 0 | 150 | 0/0/48/3 | 0/0/14/11 |
| 23 | combo | win / won | 351 | 53.42% / 657 | 8 / 15 / 35 / 63 / 123 / 165 / 188 / 351 | no | 0 | 0 | 1724/1153/945/1175 | 885/593/330/730 |
| 24 | spam | loss / board-full | 606 | 100% / 606 | 2 / 50 / 57 / 155 / 337 / 442 / 497 / — | no | 0 | 0 | 2758/740/656/380 | 744/10/75/250 |
| 24 | combo | win / won | 497 | 82.01% / 606 | 2 / 21 / 45 / 128 / 246 / 277 / 301 / 497 | no | 0 | 0 | 3711/1152/1139/1945 | 2163/628/637/1149 |
| 25 | spam | loss / board-full | 594 | 98.51% / 603 | 21 / 27 / 46 / 142 / 323 / 337 / 338 / — | no | 0 | 0 | 1186/1578/704/363 | 49/222/4/104 |
| 25 | combo | win / won | 405 | 67.16% / 603 | 30 / 42 / 56 / 80 / 147 / 157 / 158 / 405 | no | 0 | 0 | 1306/1537/1326/682 | 827/497/134/498 |
| 26 | spam | loss / board-full | 612 | 99.03% / 618 | 2 / 30 / 265 / 473 / 573 / — / — / — | no | 0 | 0 | 2305/1103/238/217 | 745/2/5/102 |
| 26 | combo | win / won | 399 | 64.56% / 618 | 2 / 27 / 40 / 77 / 180 / 203 / 225 / 399 | no | 0 | 0 | 2194/1254/850/1243 | 1130/441/306/709 |
| 27 | spam | loss / board-full | 597 | 100% / 597 | 2 / 34 / 56 / 151 / 348 / 398 / 435 / — | no | 0 | 0 | 1824/982/1070/432 | 778/3/32/272 |
| 27 | combo | win / won | 465 | 77.89% / 597 | 3 / 29 / 51 / 135 / 237 / 279 / 312 / 465 | no | 0 | 0 | 2335/1156/1502/1473 | 1401/357/426/948 |
| 28 | spam | loss / board-full | 594 | 99% / 600 | 2 / 79 / 115 / 138 / 283 / 317 / 318 / — | no | 0 | 0 | 1310/1484/465/387 | 305/365/4/116 |
| 28 | combo | win / won | 351 | 58.5% / 600 | 2 / 15 / 42 / 90 / 107 / 139 / 158 / 351 | no | 0 | 0 | 1356/1157/910/759 | 743/434/54/442 |
| 29 | spam | loss / board-full | 627 | 100% / 627 | 13 / 16 / 95 / 200 / 257 / 282 / 472 / — | no | 0 | 0 | 1459/1799/546/395 | 197/12/4/208 |
| 29 | combo | win / won | 461 | 73.52% / 627 | 12 / 15 / 24 / 147 / 194 / 209 / 210 / 461 | no | 0 | 0 | 1303/1609/1668/939 | 660/512/179/616 |
| 30 | spam | loss / board-full | 510 | 88.54% / 576 | 2 / 48 / 93 / — / — / — / — / — | no | 0 | 20 | 1230/1354/76/263 | 316/473/34/105 |
| 30 | combo | win / won | 426 | 73.96% / 576 | 3 / 12 / 26 / 78 / 153 / 186 / 216 / 426 | no | 0 | 1 | 1669/1153/1562/888 | 1063/332/336/535 |
| 31 | spam | loss / board-full | 606 | 98.54% / 615 | 2 / 54 / 104 / 498 / 570 / — / — / — | no | 0 | 1 | 1046/2057/209/313 | 360/11/21/222 |
| 31 | combo | win / won | 462 | 75.12% / 615 | 2 / 33 / 56 / 111 / 220 / 231 / 232 / 462 | no | 0 | 0 | 1301/1930/1527/971 | 741/809/215/719 |
| 32 | spam | loss / board-full | 624 | 100% / 624 | 2 / 95 / 202 / 379 / 403 / 417 / — / — | no | 0 | 0 | 1022/2164/319/250 | 0/641/3/101 |
| 32 | combo | win / won | 334 | 53.53% / 624 | 3 / 21 / 54 / 170 / 191 / 200 / 201 / 334 | no | 0 | 0 | 1431/1154/899/814 | 788/360/184/500 |
| 33 | spam | loss / board-full | 585 | 100% / 585 | 2 / 22 / 352 / 376 / 501 / 524 / 539 / — | no | 0 | 0 | 2218/904/445/418 | 583/3/18/195 |
| 33 | combo | win / won | 455 | 77.78% / 585 | 3 / 12 / 84 / 108 / 192 / 257 / 291 / 455 | no | 0 | 0 | 2756/1156/1337/1538 | 1551/492/452/794 |
| 34 | spam | loss / board-full | 585 | 92.86% / 630 | 2 / 75 / 139 / — / — / — / — / — | no | 0 | 14 | 1283/1565/68/261 | 839/68/0/203 |
| 34 | combo | win / won | 456 | 72.38% / 630 | 2 / 32 / 60 / 167 / 243 / 254 / 255 / 456 | no | 0 | 0 | 1300/2178/1638/1184 | 680/1233/525/835 |
| 35 | spam | loss / board-full | 564 | 97.92% / 576 | 2 / 12 / 28 / 152 / 203 / 278 / 337 / — | no | 0 | 0 | 2096/1206/528/343 | 19/181/20/211 |
| 35 | combo | win / won | 440 | 76.39% / 576 | 2 / 11 / 23 / 76 / 165 / 207 / 248 / 440 | no | 0 | 0 | 2850/1154/969/1709 | 1667/450/427/1036 |
| 36 | spam | stuck / stuck | 469 | 78.17% / 600 | 2 / 148 / 156 / 242 / 279 / 336 / 337 / — | no | 0 | 0 | 983/1040/774/289 | 0/1/3/89 |
| 36 | combo | win / won | 400 | 66.67% / 600 | 3 / 18 / 35 / 92 / 168 / 217 / 246 / 400 | no | 0 | 0 | 1305/1269/1633/933 | 811/377/396/558 |
| 37 | spam | loss / board-full | 618 | 100% / 618 | 5 / 162 / 170 / 212 / 228 / 259 / 260 / — | no | 0 | 0 | 2179/1176/512/411 | 133/19/7/209 |
| 37 | combo | win / won | 423 | 68.45% / 618 | 5 / 24 / 44 / 60 / 150 / 171 / 198 / 423 | no | 0 | 0 | 2950/1156/869/1535 | 1682/514/435/920 |
| 38 | spam | loss / board-full | 675 | 96.57% / 699 | 21 / 25 / 64 / 496 / 571 / — / — / — | no | 0 | 5 | 2137/1901/258/212 | 438/2/29/151 |
| 38 | combo | win / won | 426 | 60.94% / 699 | 21 / 24 / 33 / 88 / 142 / 178 / 225 / 426 | no | 0 | 1 | 2173/1574/851/1080 | 1213/543/44/675 |
| 39 | spam | loss / board-full | 627 | 98.12% / 639 | 3 / 53 / 166 / 236 / 405 / 500 / 514 / — | no | 0 | 0 | 2480/1129/407/256 | 308/10/5/76 |
| 39 | combo | win / won | 444 | 69.48% / 639 | 3 / 20 / 48 / 68 / 144 / 158 / 204 / 444 | no | 0 | 0 | 2946/1158/1087/1285 | 1639/523/503/720 |
| 40 | spam | loss / board-full | 657 | 100% / 657 | 2 / 80 / 350 / 364 / 377 / 406 / 562 / — | no | 0 | 0 | 1657/1806/436/355 | 1009/1/30/243 |
| 40 | combo | win / won | 442 | 67.28% / 657 | 2 / 50 / 100 / 174 / 276 / 287 / 288 / 442 | no | 0 | 0 | 1301/1967/1379/749 | 771/908/164/582 |
| 41 | spam | loss / board-full | 597 | 100% / 597 | 2 / 121 / 226 / 360 / 528 / 563 / 564 / — | no | 0 | 0 | 687/1940/582/399 | 220/220/3/186 |
| 41 | combo | win / won | 571 | 95.64% / 597 | 2 / 24 / 59 / 141 / 302 / 356 / 357 / 571 | no | 0 | 0 | 1300/2603/2336/1171 | 872/1182/599/910 |
| 42 | spam | loss / board-full | 603 | 99.01% / 609 | 2 / 106 / 114 / 168 / 325 / 348 / 349 / — | no | 0 | 0 | 1348/1813/435/283 | 45/385/10/115 |
| 42 | combo | win / won | 366 | 60.1% / 609 | 2 / 50 / 62 / 102 / 150 / 200 / 201 / 366 | no | 0 | 0 | 1311/1705/1141/764 | 694/842/388/554 |
| 43 | spam | win / won | 600 | 96.15% / 624 | 2 / 17 / 48 / 121 / 183 / 323 / 443 / 600 | no | 0 | 0 | 1770/1153/977/325 | 700/22/9/204 |
| 43 | combo | win / won | 488 | 78.21% / 624 | 2 / 15 / 42 / 102 / 193 / 249 / 266 / 488 | no | 0 | 0 | 2340/1153/1741/1333 | 1391/277/343/761 |
| 44 | spam | loss / board-full | 648 | 99.08% / 654 | 2 / 55 / 265 / 502 / 517 / 546 / 611 / — | no | 0 | 0 | 1888/1815/391/175 | 351/8/8/102 |
| 44 | combo | win / won | 408 | 62.39% / 654 | 3 / 20 / 35 / 105 / 122 / 142 / 165 / 408 | no | 0 | 0 | 2070/1584/852/1255 | 1067/727/337/740 |
| 45 | spam | loss / board-full | 630 | 96.77% / 651 | 2 / 95 / 100 / 159 / 217 / 544 / 583 / — | no | 0 | 1 | 2001/1385/408/437 | 249/21/8/119 |
| 45 | combo | win / won | 378 | 58.06% / 651 | 3 / 24 / 38 / 62 / 151 / 176 / 210 / 378 | no | 0 | 1 | 1764/1154/955/1053 | 906/364/145/582 |
| 46 | spam | loss / board-full | 648 | 99.54% / 651 | 2 / 18 / 272 / 417 / 449 / 591 / 634 / — | no | 0 | 0 | 2455/1525/354/208 | 838/9/6/179 |
| 46 | combo | win / won | 447 | 68.66% / 651 | 2 / 17 / 60 / 137 / 201 / 213 / 246 / 447 | no | 0 | 0 | 2956/1218/851/1569 | 1681/452/284/832 |
| 47 | spam | loss / board-full | 570 | 87.56% / 651 | 2 / 101 / 135 / — / — / — / — / — | no | 0 | 19 | 1602/1471/71/89 | 596/2/6/76 |
| 47 | combo | win / won | 415 | 63.75% / 651 | 3 / 39 / 54 / 87 / 142 / 171 / 203 / 415 | no | 0 | 0 | 1888/1496/850/1046 | 1003/475/12/479 |
| 48 | spam | loss / board-full | 630 | 100% / 630 | 2 / 111 / 146 / 410 / 445 / 553 / 594 / — | no | 0 | 0 | 1539/1723/365/269 | 863/8/25/149 |
| 48 | combo | win / won | 339 | 53.81% / 630 | 2 / 63 / 99 / 167 / 189 / 207 / 208 / 339 | no | 0 | 0 | 1313/1441/1147/759 | 751/745/338/469 |
| 49 | spam | loss / board-full | 645 | 99.54% / 648 | 2 / 83 / 124 / 219 / 345 / 365 / 507 / — | no | 0 | 0 | 2688/831/874/386 | 1029/2/12/305 |
| 49 | combo | win / won | 567 | 87.5% / 648 | 2 / 48 / 74 / 144 / 252 / 297 / 335 / 567 | no | 0 | 0 | 3398/1151/1465/1974 | 1858/237/413/1096 |
| 50 | spam | loss / board-full | 630 | 100% / 630 | 2 / 27 / 88 / 551 / 615 / — / — / — | no | 0 | 0 | 2899/401/301/346 | 1407/0/30/224 |
| 50 | combo | win / won | 579 | 91.9% / 630 | 2 / 20 / 48 / 183 / 285 / 315 / 351 / 579 | no | 0 | 0 | 5046/1157/1045/2891 | 2967/511/811/1725 |

Per-run checkpoint vectors below use **wood/stone/water/food**; each cell is `held : max cost (biome)`. The JSON retains unrounded values, lifetime totals, and living-slot fill at every threshold.

| Seed | Bot | T3 stock : cost | T4 stock : cost | T5 stock : cost | T6 stock : cost | T7 stock : cost |
|---|---|---|---|---|---|---|
| 1 | spam | 17/286/5/47 : 8/2/0/8 (forest) | 1/222/4/73 : 8/2/0/8 (forest) | 33/214/6/67 : 8/8/5/8 (steppe) | 33/213/3/67 : 2/8/6/0 (desert) | 170/2/6/93 : 2/2/8/5 (arctic) |
| 1 | combo | 81/166/66/10 : 2/2/8/5 (arctic) | 200/213/65/61 : 8/3/8/6 (taiga) | 282/257/63/104 : 2/2/8/5 (arctic) | 339/273/71/116 : 8/2/0/8 (forest) | 559/274/103/224 : 8/3/8/6 (taiga) |
| 2 | spam | 23/285/5/28 : 8/2/0/8 (forest) | 4/202/3/76 : 2/2/8/5 (arctic) | 44/167/14/73 : 8/3/8/6 (taiga) | 44/164/11/71 : 8/3/8/6 (taiga) | 16/166/3/73 : 2/2/8/5 (arctic) |
| 2 | combo | 177/55/62/50 : 8/3/8/6 (taiga) | 207/174/80/58 : 8/2/0/8 (forest) | 465/120/124/153 : 2/8/6/0 (desert) | 626/91/107/228 : 2/8/6/0 (desert) | 667/91/80/270 : 2/8/6/0 (desert) |
| 3 | spam | 6/253/3/9 : 2/2/8/5 (arctic) | 4/164/5/16 : 8/2/0/8 (forest) | 37/3/6/30 : 2/8/6/0 (desert) | 269/1/10/37 : 2/8/6/0 (desert) | 301/11/5/55 : 2/8/6/0 (desert) |
| 3 | combo | 71/149/40/21 : 2/2/8/5 (arctic) | 289/132/47/101 : 8/2/0/8 (forest) | 437/131/32/180 : 2/2/8/5 (arctic) | 478/138/16/212 : 2/8/6/0 (desert) | 483/167/10/241 : 2/2/8/5 (arctic) |
| 4 | spam | 36/0/40/31 : 8/3/8/6 (taiga) | 79/6/30/10 : 8/2/0/8 (forest) | 503/8/3/28 : 2/2/8/5 (arctic) | 722/3/3/50 : 2/8/6/0 (desert) | 777/7/5/52 : 2/8/6/0 (desert) |
| 4 | combo | 66/36/239/98 : 2/8/6/0 (desert) | 159/7/261/133 : 8/3/8/6 (taiga) | 504/64/339/337 : 8/2/0/8 (forest) | 789/67/443/445 : 8/2/0/8 (forest) | 893/122/478/496 : 8/2/0/8 (forest) |
| 5 | spam | 50/1/5/38 : 8/2/0/8 (forest) | 239/3/3/87 : 2/8/6/0 (desert) | 226/65/3/87 : 3/8/8/6 (polarDesert) | 157/21/3/102 : 2/8/6/0 (desert) | 148/33/10/118 : 2/8/6/0 (desert) |
| 5 | combo | 44/3/122/37 : 8/2/0/8 (forest) | 208/2/171/122 : 8/8/5/8 (steppe) | 341/11/141/188 : 2/8/6/0 (desert) | 562/7/146/287 : 2/8/6/0 (desert) | 618/17/144/300 : 2/8/6/0 (desert) |
| 6 | spam | 3/366/5/30 : 8/8/5/8 (steppe) | 19/465/5/53 : 8/2/0/8 (forest) | 1/325/5/83 : 2/8/6/0 (desert) | 1/327/5/84 : 2/8/6/0 (desert) | 3/339/5/87 : 3/8/8/6 (polarDesert) |
| 6 | combo | 150/174/25/51 : 2/2/8/5 (arctic) | 154/211/58/69 : 2/2/8/5 (arctic) | 248/259/117/153 : 8/2/0/8 (forest) | 306/261/122/189 : 8/2/0/8 (forest) | 430/278/193/284 : 2/8/6/0 (desert) |
| 7 | spam | 31/75/52/20 : 8/8/5/8 (steppe) | 26/0/0/38 : 8/8/5/8 (steppe) | 254/6/4/56 : 8/2/0/8 (forest) | 180/6/4/56 : 2/2/8/5 (arctic) | 135/2/6/56 : 8/2/0/8 (forest) |
| 7 | combo | 136/55/86/38 : 2/2/8/5 (arctic) | 573/28/252/236 : 2/8/6/0 (desert) | 1025/41/297/368 : 8/3/8/6 (taiga) | 1174/65/357/454 : 2/8/6/0 (desert) | 1249/113/381/494 : 8/2/0/8 (forest) |
| 8 | spam | 1/96/8/33 : 2/8/6/0 (desert) | 0/110/5/78 : 2/8/6/0 (desert) | 11/231/5/76 : 8/3/8/6 (taiga) | 14/220/6/125 : 8/2/0/8 (forest) | 13/218/6/125 : 8/2/0/8 (forest) |
| 8 | combo | 146/68/34/84 : 2/8/6/0 (desert) | 110/98/89/147 : 3/8/8/6 (polarDesert) | 217/170/147/281 : 8/2/0/8 (forest) | 389/184/265/421 : 3/8/8/6 (polarDesert) | 537/212/305/559 : 8/2/0/8 (forest) |
| 9 | spam | 21/180/20/26 : 8/2/0/8 (forest) | 42/135/8/32 : 8/2/0/8 (forest) | 9/6/32/99 : 2/2/8/5 (arctic) | 142/11/11/113 : 3/8/8/6 (polarDesert) | 121/18/6/116 : 3/8/8/6 (polarDesert) |
| 9 | combo | 66/110/34/18 : 8/2/0/8 (forest) | 218/98/37/45 : 2/8/6/0 (desert) | 538/106/155/253 : 2/2/8/5 (arctic) | 827/126/205/410 : 8/2/0/8 (forest) | 1058/159/255/530 : 2/2/8/5 (arctic) |
| 10 | spam | 8/56/5/19 : 8/8/5/8 (steppe) | 531/21/7/56 : 2/8/6/0 (desert) | 643/2/22/86 : 2/2/8/5 (arctic) | 643/2/28/86 : 2/8/6/0 (desert) | — |
| 10 | combo | 61/93/75/47 : 2/8/6/0 (desert) | 271/14/47/70 : 2/8/6/0 (desert) | 261/18/125/182 : 2/8/6/0 (desert) | 359/15/175/213 : 2/8/6/0 (desert) | 336/4/166/210 : 8/8/5/8 (steppe) |
| 11 | spam | — | — | — | — | — |
| 11 | combo | 53/58/44/40 : 2/8/6/0 (desert) | 76/31/210/108 : 8/8/5/8 (steppe) | 169/29/222/242 : 8/2/0/8 (forest) | 190/0/203/259 : 8/2/0/8 (forest) | 353/6/211/322 : 8/2/0/8 (forest) |
| 12 | spam | 262/38/22/23 : 2/2/8/5 (arctic) | 257/191/57/62 : 2/2/8/5 (arctic) | 206/99/57/89 : 2/8/6/0 (desert) | 196/98/6/116 : 2/2/8/5 (arctic) | 191/55/3/129 : 3/8/8/6 (polarDesert) |
| 12 | combo | 203/40/22/49 : 2/2/8/5 (arctic) | 215/114/80/94 : 2/2/8/5 (arctic) | 387/169/127/153 : 2/2/8/5 (arctic) | 520/203/166/262 : 3/8/8/6 (polarDesert) | 683/194/181/334 : 2/8/6/0 (desert) |
| 13 | spam | 5/225/2/70 : 2/2/8/5 (arctic) | 34/198/2/70 : 8/2/0/8 (forest) | 95/5/20/77 : 2/8/6/0 (desert) | 91/1/28/81 : 2/2/8/5 (arctic) | 90/4/5/86 : 2/8/6/0 (desert) |
| 13 | combo | 64/131/140/63 : 2/8/6/0 (desert) | 147/120/156/82 : 8/2/0/8 (forest) | 366/130/174/215 : 3/8/8/6 (polarDesert) | 372/184/195/267 : 3/8/8/6 (polarDesert) | 443/194/203/319 : 8/3/8/6 (taiga) |
| 14 | spam | 23/433/5/29 : 8/3/8/6 (taiga) | 6/542/4/34 : 8/2/0/8 (forest) | 6/642/1/59 : 2/2/8/5 (arctic) | 33/628/3/67 : 8/3/8/6 (taiga) | 37/628/3/67 : 8/3/8/6 (taiga) |
| 14 | combo | 55/137/55/41 : 8/2/0/8 (forest) | 128/264/163/88 : 8/2/0/8 (forest) | 212/478/259/229 : 8/2/0/8 (forest) | 275/476/265/247 : 8/3/8/6 (taiga) | 291/482/271/253 : 8/3/8/6 (taiga) |
| 15 | spam | 10/64/5/33 : 8/2/0/8 (forest) | 6/7/3/84 : 3/8/8/6 (polarDesert) | 163/6/26/83 : 2/2/8/5 (arctic) | 96/8/41/84 : 3/8/8/6 (polarDesert) | 53/6/28/86 : 2/2/8/5 (arctic) |
| 15 | combo | 55/95/31/42 : 8/2/0/8 (forest) | 281/76/219/149 : 8/8/5/8 (steppe) | 488/5/291/199 : 2/8/6/0 (desert) | 571/23/341/244 : 3/8/8/6 (polarDesert) | 652/47/360/321 : 8/2/0/8 (forest) |
| 16 | spam | 4/602/2/68 : 2/2/8/5 (arctic) | 11/576/2/88 : 8/2/0/8 (forest) | 10/480/3/78 : 8/2/0/8 (forest) | 6/447/0/85 : 8/3/8/6 (taiga) | 3/444/0/84 : 8/8/5/8 (steppe) |
| 16 | combo | 62/232/47/61 : 2/8/6/0 (desert) | 140/232/87/111 : 8/2/0/8 (forest) | 189/179/163/218 : 8/2/0/8 (forest) | 249/159/170/235 : 8/2/0/8 (forest) | 311/163/184/277 : 8/2/0/8 (forest) |
| 17 | spam | 11/85/55/20 : 8/2/0/8 (forest) | 308/6/8/80 : 2/2/8/5 (arctic) | 352/3/20/92 : 2/8/6/0 (desert) | 359/9/3/106 : 3/8/8/6 (polarDesert) | 481/3/6/144 : 2/8/6/0 (desert) |
| 17 | combo | 156/40/112/72 : 2/2/8/5 (arctic) | 502/4/115/274 : 8/2/0/8 (forest) | 866/2/282/457 : 8/2/0/8 (forest) | 1067/8/282/536 : 8/2/0/8 (forest) | 1078/9/248/563 : 2/8/6/0 (desert) |
| 18 | spam | 7/38/4/45 : 2/8/6/0 (desert) | 191/8/10/218 : 2/2/8/5 (arctic) | 322/6/12/237 : 2/2/8/5 (arctic) | 340/14/3/304 : 2/8/6/0 (desert) | 336/23/5/330 : 2/8/6/0 (desert) |
| 18 | combo | 51/69/22/66 : 2/2/8/5 (arctic) | 114/150/54/141 : 8/2/0/8 (forest) | 511/112/76/314 : 2/2/8/5 (arctic) | 518/122/64/374 : 3/8/8/6 (polarDesert) | 536/173/74/413 : 2/2/8/5 (arctic) |
| 19 | spam | 16/74/3/65 : 8/2/0/8 (forest) | 3/8/3/117 : 2/8/6/0 (desert) | 8/6/3/152 : 8/2/0/8 (forest) | 373/3/5/206 : 2/2/8/5 (arctic) | 431/6/5/220 : 2/8/6/0 (desert) |
| 19 | combo | 51/112/37/89 : 8/8/5/8 (steppe) | 138/106/32/118 : 8/2/0/8 (forest) | 452/131/21/266 : 2/8/6/0 (desert) | 530/125/11/311 : 8/8/5/8 (steppe) | 659/96/17/406 : 2/8/6/0 (desert) |
| 20 | spam | 20/226/22/53 : 8/2/0/8 (forest) | 32/334/10/62 : 8/2/0/8 (forest) | 50/313/7/77 : 8/3/8/6 (taiga) | 10/296/6/101 : 8/2/0/8 (forest) | — |
| 20 | combo | 66/117/49/36 : 2/8/6/0 (desert) | 145/316/53/88 : 2/2/8/5 (arctic) | 266/320/73/148 : 8/3/8/6 (taiga) | 326/335/72/165 : 8/2/0/8 (forest) | 343/342/83/192 : 3/8/8/6 (polarDesert) |
| 21 | spam | 54/3/54/55 : 2/8/6/0 (desert) | 434/5/60/150 : 2/8/6/0 (desert) | 698/2/86/218 : 8/2/0/8 (forest) | 660/4/51/226 : 2/2/8/5 (arctic) | 743/4/36/243 : 2/8/6/0 (desert) |
| 21 | combo | 247/9/125/113 : 2/8/6/0 (desert) | 510/8/170/301 : 8/2/0/8 (forest) | 599/14/216/393 : 2/8/6/0 (desert) | 711/45/246/477 : 3/8/8/6 (polarDesert) | 834/65/260/545 : 8/2/0/8 (forest) |
| 22 | spam | 13/95/7/20 : 8/2/0/8 (forest) | 28/3/7/40 : 2/2/8/5 (arctic) | 693/4/27/112 : 2/2/8/5 (arctic) | 693/3/24/119 : 2/8/6/0 (desert) | — |
| 22 | combo | 84/61/50/82 : 8/2/0/8 (forest) | 478/103/91/236 : 2/2/8/5 (arctic) | 1136/139/166/470 : 2/2/8/5 (arctic) | 1202/176/221/527 : 3/8/8/6 (polarDesert) | 1289/229/259/568 : 8/8/5/8 (steppe) |
| 23 | spam | — | — | — | — | — |
| 23 | combo | 54/129/59/53 : 2/2/8/5 (arctic) | 122/247/73/114 : 2/2/8/5 (arctic) | 319/247/101/255 : 8/8/5/8 (steppe) | 395/248/167/332 : 8/8/5/8 (steppe) | 369/234/145/365 : 2/8/6/0 (desert) |
| 24 | spam | 14/198/6/8 : 2/2/8/5 (arctic) | 4/75/6/60 : 2/2/8/5 (arctic) | 294/4/49/171 : 8/2/0/8 (forest) | 369/4/53/199 : 2/2/8/5 (arctic) | 337/7/52/209 : 3/8/8/6 (polarDesert) |
| 24 | combo | 40/111/81/55 : 8/2/0/8 (forest) | 507/95/141/306 : 2/2/8/5 (arctic) | 1009/129/231/534 : 2/2/8/5 (arctic) | 1165/193/267/606 : 2/2/8/5 (arctic) | 1278/249/321/664 : 2/2/8/5 (arctic) |
| 25 | spam | 47/42/82/27 : 2/8/6/0 (desert) | 53/200/46/98 : 8/8/5/8 (steppe) | 10/410/5/81 : 8/3/8/6 (taiga) | 12/386/5/86 : 8/8/5/8 (steppe) | 16/386/5/87 : 8/8/5/8 (steppe) |
| 25 | combo | 218/22/106/77 : 2/8/6/0 (desert) | 252/92/152/86 : 2/8/6/0 (desert) | 302/272/146/162 : 8/3/8/6 (taiga) | 350/261/146/182 : 8/2/0/8 (forest) | 359/261/146/182 : 8/2/0/8 (forest) |
| 26 | spam | 43/6/3/8 : 2/8/6/0 (desert) | 531/7/5/46 : 2/8/6/0 (desert) | 651/7/12/88 : 2/2/8/5 (arctic) | — | — |
| 26 | combo | 52/111/3/32 : 8/2/0/8 (forest) | 246/80/10/82 : 8/3/8/6 (taiga) | 729/96/77/317 : 2/2/8/5 (arctic) | 721/119/83/349 : 2/2/8/5 (arctic) | 769/164/119/404 : 3/8/8/6 (polarDesert) |
| 27 | spam | 1/14/51/50 : 2/8/6/0 (desert) | 0/13/3/107 : 3/8/8/6 (polarDesert) | 207/3/17/157 : 8/8/5/8 (steppe) | 166/5/8/177 : 2/8/6/0 (desert) | 255/4/3/192 : 2/2/8/5 (arctic) |
| 27 | combo | 198/47/100/98 : 2/2/8/5 (arctic) | 463/57/245/330 : 8/2/0/8 (forest) | 819/47/270/561 : 8/2/0/8 (forest) | 902/45/343/653 : 3/8/8/6 (polarDesert) | 1031/92/394/738 : 8/8/5/8 (steppe) |
| 28 | spam | 4/393/5/64 : 2/2/8/5 (arctic) | 34/367/5/85 : 8/2/0/8 (forest) | 6/435/3/127 : 2/2/8/5 (arctic) | 7/469/5/125 : 8/2/0/8 (forest) | 4/466/5/124 : 8/8/5/8 (steppe) |
| 28 | combo | 66/193/3/35 : 2/2/8/5 (arctic) | 264/266/29/150 : 2/2/8/5 (arctic) | 278/301/69/174 : 3/8/8/6 (polarDesert) | 309/281/61/198 : 8/8/5/8 (steppe) | 306/240/38/195 : 8/8/5/8 (steppe) |
| 29 | spam | 10/101/5/91 : 8/2/0/8 (forest) | 7/238/4/112 : 8/2/0/8 (forest) | 7/233/1/137 : 8/2/0/8 (forest) | 9/215/3/139 : 8/3/8/6 (taiga) | 2/3/3/156 : 2/2/8/5 (arctic) |
| 29 | combo | 63/50/17/49 : 2/8/6/0 (desert) | 132/128/153/165 : 2/2/8/5 (arctic) | 217/212/189/270 : 8/2/0/8 (forest) | 280/209/196/305 : 8/3/8/6 (taiga) | 293/213/200/310 : 8/3/8/6 (taiga) |
| 30 | spam | 6/252/0/17 : 8/2/0/8 (forest) | — | — | — | — |
| 30 | combo | 62/88/24/39 : 2/2/8/5 (arctic) | 214/113/198/100 : 2/8/6/0 (desert) | 301/189/241/176 : 8/3/8/6 (taiga) | 391/166/257/211 : 8/2/0/8 (forest) | 493/192/269/286 : 2/8/6/0 (desert) |
| 31 | spam | 5/378/3/44 : 2/2/8/5 (arctic) | 28/12/6/171 : 2/2/8/5 (arctic) | 200/3/13/214 : 2/2/8/5 (arctic) | — | — |
| 31 | combo | 30/290/36/69 : 2/2/8/5 (arctic) | 143/369/146/173 : 2/2/8/5 (arctic) | 235/552/296/433 : 2/2/8/5 (arctic) | 302/560/304/455 : 8/2/0/8 (forest) | 307/558/304/456 : 2/2/8/5 (arctic) |
| 32 | spam | 6/565/0/35 : 2/2/8/5 (arctic) | 5/843/2/73 : 2/2/8/5 (arctic) | 31/799/4/93 : 8/2/0/8 (forest) | 22/771/4/102 : 8/2/0/8 (forest) | — |
| 32 | combo | 54/225/57/49 : 3/8/8/6 (polarDesert) | 150/332/41/160 : 2/8/6/0 (desert) | 278/317/48/209 : 8/2/0/8 (forest) | 334/310/50/229 : 8/3/8/6 (taiga) | 347/312/52/231 : 8/3/8/6 (taiga) |
| 33 | spam | 236/3/9/101 : 2/2/8/5 (arctic) | 236/57/9/119 : 2/8/6/0 (desert) | 454/6/3/148 : 2/8/6/0 (desert) | 505/12/19/171 : 2/2/8/5 (arctic) | 493/24/15/177 : 2/2/8/5 (arctic) |
| 33 | combo | 370/63/27/221 : 8/3/8/6 (taiga) | 390/111/55/264 : 3/8/8/6 (polarDesert) | 640/77/60/341 : 8/3/8/6 (taiga) | 718/53/94/315 : 2/2/8/5 (arctic) | 842/80/120/395 : 8/2/0/8 (forest) |
| 34 | spam | 5/513/0/89 : 2/2/8/5 (arctic) | — | — | — | — |
| 34 | combo | 25/247/95/88 : 2/2/8/5 (arctic) | 23/523/322/310 : 2/2/8/5 (arctic) | 134/875/447/488 : 2/2/8/5 (arctic) | 189/874/457/514 : 8/2/0/8 (forest) | 198/875/459/521 : 8/2/0/8 (forest) |
| 35 | spam | 20/58/22/25 : 2/8/6/0 (desert) | 6/151/3/96 : 8/2/0/8 (forest) | 0/406/3/102 : 8/2/0/8 (forest) | 14/300/15/149 : 2/2/8/5 (arctic) | 7/246/5/157 : 2/8/6/0 (desert) |
| 35 | combo | 70/63/30/35 : 8/2/0/8 (forest) | 253/128/68/134 : 2/8/6/0 (desert) | 646/146/156/389 : 8/2/0/8 (forest) | 782/167/190/487 : 8/2/0/8 (forest) | 923/177/213/589 : 2/8/6/0 (desert) |
| 36 | spam | 19/293/5/45 : 8/2/0/8 (forest) | 8/249/6/78 : 8/2/0/8 (forest) | 90/211/6/103 : 8/2/0/8 (forest) | 6/197/5/111 : 8/2/0/8 (forest) | 3/194/5/110 : 8/8/5/8 (steppe) |
| 36 | combo | 95/84/84/11 : 2/8/6/0 (desert) | 240/120/165/67 : 2/8/6/0 (desert) | 309/48/228/151 : 8/2/0/8 (forest) | 502/58/228/226 : 2/8/6/0 (desert) | 562/53/221/246 : 2/8/6/0 (desert) |
| 37 | spam | 11/337/5/53 : 8/2/0/8 (forest) | 18/301/5/98 : 8/2/0/8 (forest) | 7/278/5/121 : 8/2/0/8 (forest) | 11/358/5/136 : 8/3/8/6 (taiga) | 10/356/5/136 : 8/2/0/8 (forest) |
| 37 | combo | 72/120/43/9 : 8/3/8/6 (taiga) | 162/111/46/42 : 8/3/8/6 (taiga) | 526/128/96/222 : 8/3/8/6 (taiga) | 583/197/122/258 : 8/3/8/6 (taiga) | 648/223/149/324 : 2/2/8/5 (arctic) |
| 38 | spam | 89/192/9/52 : 8/2/0/8 (forest) | 15/36/8/108 : 8/2/0/8 (forest) | 82/9/6/123 : 2/2/8/5 (arctic) | — | — |
| 38 | combo | 133/74/30/42 : 2/8/6/0 (desert) | 208/274/6/84 : 8/2/0/8 (forest) | 344/313/11/199 : 8/2/0/8 (forest) | 466/308/11/262 : 8/3/8/6 (taiga) | 631/332/9/296 : 8/2/0/8 (forest) |
| 39 | spam | 3/460/5/6 : 2/8/6/0 (desert) | 3/370/5/12 : 2/8/6/0 (desert) | 3/118/3/21 : 2/8/6/0 (desert) | 81/2/7/41 : 2/2/8/5 (arctic) | 65/3/10/51 : 2/8/6/0 (desert) |
| 39 | combo | 46/244/36/31 : 8/2/0/8 (forest) | 122/234/52/58 : 8/2/0/8 (forest) | 497/219/109/234 : 8/8/5/8 (steppe) | 533/207/133/257 : 8/3/8/6 (taiga) | 578/211/187/295 : 2/2/8/5 (arctic) |
| 40 | spam | 182/14/8/112 : 2/2/8/5 (arctic) | 165/33/9/123 : 2/2/8/5 (arctic) | 164/29/17/124 : 2/8/6/0 (desert) | 182/44/14/138 : 2/2/8/5 (arctic) | 661/3/5/203 : 2/2/8/5 (arctic) |
| 40 | combo | 12/265/66/128 : 2/2/8/5 (arctic) | 79/433/83/240 : 2/2/8/5 (arctic) | 210/716/178/400 : 3/8/8/6 (polarDesert) | 265/712/184/416 : 8/3/8/6 (taiga) | 280/718/190/422 : 8/3/8/6 (taiga) |
| 41 | spam | 5/450/2/91 : 2/2/8/5 (arctic) | 4/461/3/141 : 2/2/8/5 (arctic) | 4/356/3/174 : 2/2/8/5 (arctic) | 84/288/3/186 : 2/2/8/5 (arctic) | 88/286/3/186 : 2/2/8/5 (arctic) |
| 41 | combo | 73/229/90/27 : 2/2/8/5 (arctic) | 179/375/128/165 : 2/8/6/0 (desert) | 278/468/283/377 : 2/8/6/0 (desert) | 334/557/350/481 : 2/8/6/0 (desert) | 341/561/357/485 : 2/8/6/0 (desert) |
| 42 | spam | 22/443/5/51 : 8/2/0/8 (forest) | 8/494/23/101 : 8/2/0/8 (forest) | 5/725/2/159 : 2/2/8/5 (arctic) | 7/687/2/147 : 8/3/8/6 (taiga) | 4/684/2/147 : 8/8/5/8 (steppe) |
| 42 | combo | 38/322/46/40 : 2/2/8/5 (arctic) | 134/408/95/107 : 8/2/0/8 (forest) | 243/519/136/210 : 2/8/6/0 (desert) | 320/600/179/304 : 2/8/6/0 (desert) | 323/600/182/305 : 2/8/6/0 (desert) |
| 43 | spam | 55/114/10/32 : 2/2/8/5 (arctic) | 34/75/3/18 : 2/2/8/5 (arctic) | 62/1/3/52 : 8/3/8/6 (taiga) | 330/4/10/127 : 2/2/8/5 (arctic) | 487/10/3/148 : 2/8/6/0 (desert) |
| 43 | combo | 52/58/52/24 : 8/3/8/6 (taiga) | 101/80/99/71 : 8/3/8/6 (taiga) | 308/32/177/180 : 2/8/6/0 (desert) | 502/42/217/312 : 3/8/8/6 (polarDesert) | 533/96/228/324 : 2/2/8/5 (arctic) |
| 44 | spam | 14/251/5/22 : 8/2/0/8 (forest) | 202/11/7/46 : 2/2/8/5 (arctic) | 204/37/27/60 : 2/8/6/0 (desert) | 204/47/9/78 : 2/8/6/0 (desert) | 222/11/7/96 : 2/2/8/5 (arctic) |
| 44 | combo | 66/187/24/35 : 2/2/8/5 (arctic) | 302/337/74/153 : 3/8/8/6 (polarDesert) | 326/364/109/170 : 3/8/8/6 (polarDesert) | 321/371/115/205 : 2/8/6/0 (desert) | 335/404/138/248 : 3/8/8/6 (polarDesert) |
| 45 | spam | 24/239/5/38 : 8/2/0/8 (forest) | 17/172/4/41 : 8/2/0/8 (forest) | 7/287/4/35 : 8/3/8/6 (taiga) | 136/2/7/79 : 2/2/8/5 (arctic) | 241/10/7/104 : 2/2/8/5 (arctic) |
| 45 | combo | 49/126/22/4 : 8/2/0/8 (forest) | 114/125/23/35 : 8/8/5/8 (steppe) | 250/59/11/166 : 2/8/6/0 (desert) | 282/86/5/217 : 3/8/8/6 (polarDesert) | 369/114/36/264 : 2/8/6/0 (desert) |
| 46 | spam | 63/3/7/46 : 8/2/0/8 (forest) | 510/7/12/136 : 8/2/0/8 (forest) | 576/1/7/140 : 2/2/8/5 (arctic) | 707/8/7/156 : 2/2/8/5 (arctic) | 819/6/4/177 : 2/8/6/0 (desert) |
| 46 | combo | 242/105/34/96 : 8/2/0/8 (forest) | 621/105/76/300 : 8/3/8/6 (taiga) | 875/99/111/399 : 8/2/0/8 (forest) | 890/186/121/407 : 8/2/0/8 (forest) | 974/215/158/444 : 8/8/5/8 (steppe) |
| 47 | spam | 5/497/5/26 : 2/2/8/5 (arctic) | — | — | — | — |
| 47 | combo | 52/329/19/41 : 2/2/8/5 (arctic) | 126/310/4/58 : 8/2/0/8 (forest) | 384/298/24/132 : 8/3/8/6 (taiga) | 496/285/22/158 : 2/2/8/5 (arctic) | 577/286/6/181 : 8/3/8/6 (taiga) |
| 48 | spam | 5/343/5/67 : 2/2/8/5 (arctic) | 476/5/7/84 : 2/2/8/5 (arctic) | 539/9/6/110 : 2/2/8/5 (arctic) | 661/11/12/122 : 2/2/8/5 (arctic) | 708/4/11/135 : 2/2/8/5 (arctic) |
| 48 | combo | 22/361/106/120 : 2/2/8/5 (arctic) | 87/525/216/222 : 2/2/8/5 (arctic) | 214/526/236/291 : 8/2/0/8 (forest) | 282/592/264/315 : 8/3/8/6 (taiga) | 282/589/263/313 : 8/3/8/6 (taiga) |
| 49 | spam | 243/4/26/97 : 2/2/8/5 (arctic) | 300/6/7/162 : 8/2/0/8 (forest) | 308/4/3/192 : 2/2/8/5 (arctic) | 248/4/3/196 : 8/8/5/8 (steppe) | 589/3/13/237 : 2/8/6/0 (desert) |
| 49 | combo | 230/7/84/157 : 2/2/8/5 (arctic) | 340/35/148/323 : 3/8/8/6 (polarDesert) | 686/31/126/446 : 2/2/8/5 (arctic) | 831/68/177/556 : 8/2/0/8 (forest) | 1019/94/236/656 : 2/8/6/0 (desert) |
| 50 | spam | 122/4/10/67 : 8/2/0/8 (forest) | 1279/4/8/196 : 2/2/8/5 (arctic) | 1354/10/22/213 : 2/2/8/5 (arctic) | — | — |
| 50 | combo | 189/51/34/116 : 8/2/0/8 (forest) | 908/55/156/562 : 8/2/0/8 (forest) | 1446/115/322/829 : 8/2/0/8 (forest) | 1596/180/356/896 : 2/2/8/5 (arctic) | 1816/224/418/1017 : 8/2/0/8 (forest) |
