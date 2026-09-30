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

