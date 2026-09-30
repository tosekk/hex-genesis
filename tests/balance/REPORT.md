# Economy v2 balance report

## N3 round 6 — mine construction yield and later first core

Real GameSession, 20×14, seeds 1–20, 64239 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 8.5 | 6 (4–57), 15/20 | 10 | 7 (5–15), 14/20 | 1.18 | 7 (5.6–8.4) |
| T2 | 28.5 | 17 (12–58), 15/20 | 194 | 25.5 (13–199), 12/20 | 6.81 | 22 (17.6–26.4) |
| T3 | 48 | 42 (25–65), 15/20 | 279 | 63 (44–355), 11/20 | 5.81 | 45 (36–54) |
| T4 | 111 | 96 (63–144), 15/20 | unreached | 167 (95–392), 10/20 | unmeasurable | 90 (72–108) |
| T5 | 179 | 168 (116–261), 15/20 | unreached | 296 (172–557), 10/20 | unmeasurable | 160 (128–192) |
| T6 | 315 | 285 (228–393), 15/20 | unreached | 506 (374–553), 8/20 | unmeasurable | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 8.5 / 28.5 / 48 / 111 / 179 / 315 |
| 2. T4–T6 ≥1.5× | MISS / unmeasurable | unmeasurable / unmeasurable / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | min 66.31%, median 86.44% |
| 4. ≥90% combo T6/wins; zero soft-locks | MISS | T6 15/20; wins 13/20; 0 soft-lock declarations across both bots |

combo: win placements median (range) **597 (552–633)**; 13 wins, 7 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **585 (552–621)**; 7 wins, 13 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | 15 / 193 / 203 / 381 / 557 / — | — | — | stuck | 630 | stone=1162, water=756, food=129, wood=1967 | wood=1217, stone=4, water=588, food=120 |
| 1 | combo | 13 / 18 / 42 / 96 / 120 / 254 | 40.32% | 633 | won | 633 | stone=2143, water=1441, wood=3810, food=1585 | wood=2945, stone=1225, water=1324, food=1552 |
| 2 | spam | 6 / — / — / — / — / — | — | — | stuck | 102 | stone=344, wood=5, water=320, food=19 | wood=0, stone=1, water=180, food=19 |
| 2 | combo | 6 / 14 / 42 / 65 / 171 / 285 | 45.02% | 633 | won | 633 | stone=2132, wood=3557, water=1587, food=1750 | wood=2737, stone=1179, water=1435, food=1738 |
| 3 | spam | — / — / — / — / — / — | — | — | stuck | 5 | stone=30, wood=5 | wood=1, stone=36 |
| 3 | combo | — / — / — / — / — / — | — | — | stuck | 5 | stone=30, wood=5 | wood=1, stone=36 |
| 4 | spam | — / — / — / — / — / — | — | — | stuck | 5 | stone=40, wood=5 | wood=1, stone=46 |
| 4 | combo | — / — / — / — / — / — | — | — | stuck | 5 | stone=40, wood=5 | wood=1, stone=46 |
| 5 | spam | 8 / — / — / — / — / — | — | — | stuck | 58 | stone=118, water=302, food=21, wood=18 | wood=0, stone=1, water=284, food=21 |
| 5 | combo | 7 / 44 / 65 / 144 / 249 / 381 | 61.06% | 627 | won | 627 | stone=1813, water=2156, wood=2507, food=1622 | wood=1906, stone=426, water=1779, food=1607 |
| 6 | spam | 5 / 15 / 50 / 234 / 510 / — | — | — | stuck | 621 | stone=1446, wood=1398, water=855, food=123 | wood=888, stone=84, water=537, food=114 |
| 6 | combo | 4 / 17 / 49 / 63 / 116 / 239 | 38.49% | 630 | won | 630 | stone=2508, wood=2709, food=1469, water=1665 | wood=2078, stone=1270, food=1460, water=1329 |
| 7 | spam | 9 / 16 / 48 / 141 / 279 / 527 | 86.11% | 612 | won | 612 | stone=908, wood=1588, water=1263, food=260 | wood=828, stone=7, water=1163, food=260 |
| 7 | combo | 6 / 13 / 40 / 144 / 238 / 355 | 58.01% | 612 | won | 612 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 5 / 13 / 101 / 118 / 183 / 374 | 66.31% | 564 | won | 564 | stone=993, wood=1584, food=298, water=809 | wood=878, stone=14, food=295, water=727 |
| 8 | combo | 4 / 12 / 39 / 65 / 117 / 291 | 51.6% | 564 | won | 564 | stone=2032, wood=2847, food=2002, water=1571 | wood=2065, stone=1217, food=1999, water=1449 |
| 9 | spam | 8 / 56 / 63 / 95 / 283 / 492 | 86.77% | 567 | won | 567 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 8 / 24 / 29 / 65 / 176 / 327 | 57.67% | 567 | won | 567 | stone=1739, water=1584, wood=3407, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | — / — / — / — / — / — | — | — | stuck | 5 | stone=36, wood=5 | wood=1, stone=42 |
| 10 | combo | — / — / — / — / — / — | — | — | stuck | 5 | stone=36, wood=5 | wood=1, stone=42 |
| 11 | spam | — / — / — / — / — / — | — | — | stuck | 5 | stone=36, wood=5 | wood=1, stone=42 |
| 11 | combo | — / — / — / — / — / — | — | — | stuck | 5 | stone=36, wood=5 | wood=1, stone=42 |
| 12 | spam | — / — / — / — / — / — | — | — | stuck | 180 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 57 / 58 / 61 / 97 / 147 / 273 | 46.19% | — | stuck | 597 | wood=2797, food=1484, stone=2021, water=1810 | wood=2149, stone=817, food=1460, water=1518 |
| 13 | spam | 15 / 195 / — / — / — / — | — | — | stuck | 299 | water=936, food=81, stone=888, wood=53 | wood=0, stone=1, water=660, food=81 |
| 13 | combo | 10 / 41 / 62 / 83 / 144 / 282 | 48.45% | 582 | won | 582 | water=1747, food=1383, stone=2005, wood=2628 | wood=2063, stone=854, water=1485, food=1371 |
| 14 | spam | 5 / 178 / 194 / 274 / 441 / 539 | 98.72% | 552 | won | 552 | stone=1473, water=1119, wood=909, food=186 | wood=471, stone=312, water=867, food=180 |
| 14 | combo | 4 / 33 / 47 / 115 / 182 / 228 | 41.76% | 552 | won | 552 | stone=2276, water=1706, food=1362, wood=2212 | wood=1593, stone=1319, water=1496, food=1350 |
| 15 | spam | 11 / 30 / 48 / — / — / — | — | — | stuck | 188 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 9 / 14 / 30 / 127 / 219 / 342 | 59.38% | 576 | won | 576 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 5 / 199 / 355 / 392 / 434 / 553 | 94.53% | 585 | won | 585 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 4 / 35 / 59 / 87 / 168 / 303 | 51.79% | 585 | won | 585 | stone=2235, wood=2023, food=1377, water=1926 | wood=1415, stone=1118, food=1359, water=1645 |
| 17 | spam | 6 / 21 / 50 / 193 / 309 / 520 | 87.1% | 597 | won | 597 | stone=878, wood=2186, food=385, water=1093 | wood=1405, stone=10, food=379, water=953 |
| 17 | combo | 6 / 13 / 47 / 141 / 261 / 393 | 65.83% | 597 | won | 597 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 5 / 16 / 44 / 117 / 259 / 411 | 69.19% | — | stuck | 609 | stone=1207, wood=1647, food=377, water=934 | wood=1008, stone=9, food=359, water=658 |
| 18 | combo | 4 / 17 / 28 / 71 / 151 / 273 | 45.96% | — | stuck | 609 | stone=2101, wood=2810, water=1471, food=1662 | wood=2114, stone=1016, water=1184, food=1644 |
| 19 | spam | — / — / — / — / — / — | — | — | stuck | 5 | stone=40, wood=5 | wood=1, stone=46 |
| 19 | combo | — / — / — / — / — / — | — | — | stuck | 5 | stone=40, wood=5 | wood=1, stone=46 |
| 20 | spam | 15 / 16 / 82 / 137 / 172 / 432 | 69.57% | 621 | won | 621 | wood=2051, food=241, stone=1156, water=641 | wood=1333, stone=90, food=232, water=545 |
| 20 | combo | 15 / 16 / 25 / 107 / 131 / 264 | 42.51% | 621 | won | 621 | wood=3701, food=1841, stone=2377, water=1419 | wood=2858, stone=1488, food=1832, water=1296 |

