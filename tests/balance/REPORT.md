# Economy v2 balance report

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
