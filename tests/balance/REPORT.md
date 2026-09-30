# Economy balance report

## Selected v3 result — round 3

Selected calibration **`f6b6d45`**, retained after four measured rounds (`cf27db5`, `1a2c142`, `f6b6d45`, `d04593b`) by priority **4 > 2 > 1 > 3**. This section is current; the v2 sections and all four v3 rounds below are preserved audit history. Source/results: `v3-round-3.json`.

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
