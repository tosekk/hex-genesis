# Economy v2 balance report

## N3 round 5 — maximum safe bootstrap and late water

Real GameSession, 20×14, seeds 1–20, 97624 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 3 | 3 (3–42), 20/20 | 3 | 3 (3–16), 19/20 | 1 | 7 (5.6–8.4) |
| T2 | 21 | 21 (11–45), 20/20 | 46.5 | 28 (13–199), 15/20 | 2.21 | 22 (17.6–26.4) |
| T3 | 45 | 45 (26–65), 20/20 | 91 | 61 (45–355), 14/20 | 2.02 | 45 (36–54) |
| T4 | 89 | 89 (60–144), 20/20 | 282 | 191 (95–392), 13/20 | 3.17 | 90 (72–108) |
| T5 | 173.5 | 173.5 (105–261), 20/20 | 435 | 301 (174–555), 13/20 | 2.51 | 160 (128–192) |
| T6 | 299 | 299 (222–395), 20/20 | unreached | 535.5 (375–577), 10/20 | unmeasurable | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 3 / 21 / 45 / 89 / 173.5 / 299 |
| 2. T4–T6 ≥1.5× | MISS / unmeasurable | 3.17 / 2.51 / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | min 66.49%, median 88.04% |
| 4. ≥90% combo T6/wins; zero soft-locks | PASS | T6 20/20; wins 18/20; 0 soft-lock declarations across both bots |

combo: win placements median (range) **603 (552–642)**; 18 wins, 2 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **595.5 (552–642)**; 10 wins, 10 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | 3 / 193 / 201 / 372 / 555 / — | — | — | stuck | 630 | stone=1148, water=760, food=136, wood=1991 | wood=1241, stone=4, water=592, food=127 |
| 1 | combo | 3 / 18 / 42 / 78 / 105 / 258 | 40.95% | 633 | won | 633 | stone=2165, water=1486, wood=3844, food=1634 | wood=2979, stone=1243, water=1369, food=1601 |
| 2 | spam | 3 / — / — / — / — / — | — | — | stuck | 85 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 16 / 42 / 65 / 171 / 300 | 47.39% | 633 | won | 633 | stone=2152, wood=3539, water=1616, food=1770 | wood=2718, stone=1200, water=1464, food=1758 |
| 3 | spam | 16 / 19 / 53 / 292 / 340 / 541 | 88.83% | 609 | won | 609 | wood=1843, stone=1051, water=750, food=186 | wood=1113, stone=5, water=510, food=177 |
| 3 | combo | 26 / 29 / 41 / 92 / 167 / 276 | 45.32% | 609 | won | 609 | wood=3385, food=1757, stone=1888, water=1441 | wood=2613, stone=889, food=1751, water=1233 |
| 4 | spam | 3 / — / — / — / — / — | — | — | stuck | 46 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 3 / 19 / 59 / 138 / 228 / 395 | 68.22% | 582 | won | 582 | stone=1484, water=2208, food=1566, wood=2917 | wood=2196, stone=581, water=2098, food=1554 |
| 5 | spam | 3 / — / — / — / — / — | — | — | stuck | 63 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 3 / 44 / 65 / 144 / 249 / 381 | 61.06% | 627 | won | 627 | stone=1807, water=2159, food=1598, wood=2499 | wood=1904, stone=417, water=1782, food=1583 |
| 6 | spam | 3 / 13 / 47 / 225 / 510 / — | — | — | stuck | 621 | stone=1392, wood=1440, water=855, food=123 | wood=930, stone=12, water=537, food=114 |
| 6 | combo | 3 / 11 / 45 / 69 / 110 / 260 | 41.87% | 630 | won | 630 | stone=2491, wood=2792, food=1536, water=1710 | wood=2157, stone=1241, food=1527, water=1372 |
| 7 | spam | 3 / 13 / 53 / 141 / 284 / 534 | 87.25% | 612 | won | 612 | stone=900, wood=1512, food=240, water=1234 | wood=743, stone=11, food=240, water=1134 |
| 7 | combo | 4 / 13 / 40 / 144 / 238 / 355 | 58.01% | 612 | won | 612 | stone=1721, wood=3444, food=1636, water=2044 | wood=2729, stone=754, food=1624, water=1932 |
| 8 | spam | 3 / 13 / 102 / 120 / 251 / 375 | 66.49% | 564 | won | 564 | stone=1010, wood=1612, food=311, water=754 | wood=885, stone=42, food=308, water=672 |
| 8 | combo | 3 / 12 / 39 / 65 / 117 / 291 | 51.6% | 564 | won | 564 | stone=2044, wood=2847, food=2014, water=1583 | wood=2065, stone=1229, food=2011, water=1461 |
| 9 | spam | 3 / 56 / 63 / 95 / 283 / 492 | 86.77% | 567 | won | 567 | stone=854, water=911, wood=1851, food=276 | wood=1076, stone=8, water=827, food=273 |
| 9 | combo | 3 / 24 / 29 / 65 / 176 / 327 | 57.67% | 567 | won | 567 | stone=1739, wood=3407, water=1584, food=1925 | wood=2581, stone=951, water=1472, food=1922 |
| 10 | spam | 3 / 37 / 62 / 191 / 301 / 577 | 97.14% | 594 | won | 594 | stone=771, wood=1652, food=218, water=1135 | wood=916, stone=5, food=215, water=977 |
| 10 | combo | 3 / 23 / 65 / 118 / 199 / 326 | 54.88% | 594 | won | 594 | stone=1635, wood=2978, food=1410, water=1772 | wood=2262, stone=642, food=1368, water=1608 |
| 11 | spam | 3 / — / — / — / — / — | — | — | stuck | 19 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 3 / 29 / 48 / 121 / 180 / 307 | 49.44% | 627 | won | 627 | stone=1842, water=2062, wood=2286, food=1352 | wood=1636, stone=476, water=1696, food=1289 |
| 12 | spam | — / — / — / — / — / — | — | — | stuck | 180 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 42 / 45 / 51 / 84 / 141 / 273 | 46.19% | — | stuck | 597 | wood=2794, food=1523, stone=2021, water=1810 | wood=2143, stone=814, food=1499, water=1518 |
| 13 | spam | 8 / 197 / — / — / — / — | — | — | stuck | 303 | water=946, food=85, stone=900, wood=53 | wood=0, stone=1, water=670, food=85 |
| 13 | combo | 9 / 41 / 62 / 83 / 143 / 276 | 47.42% | 582 | won | 582 | water=1733, food=1397, stone=2013, wood=2625 | wood=2058, stone=862, water=1470, food=1385 |
| 14 | spam | 3 / 178 / 191 / 272 / 436 / 537 | 98.35% | 552 | won | 552 | stone=1461, water=1119, wood=918, food=186 | wood=486, stone=288, water=867, food=180 |
| 14 | combo | 3 / 33 / 45 / 115 / 182 / 222 | 40.66% | 552 | won | 552 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 3 / 28 / 48 / — / — / — | — | — | stuck | 188 | stone=347, wood=227, water=542, food=256 | wood=0, stone=0, water=512, food=253 |
| 15 | combo | 3 / 14 / 30 / 127 / 219 / 342 | 59.38% | 576 | won | 576 | stone=1843, wood=2423, water=1885, food=1476 | wood=1824, stone=883, water=1711, food=1464 |
| 16 | spam | 3 / 199 / 355 / 392 / 434 / 553 | 94.53% | 585 | won | 585 | stone=1344, food=176, water=1266, wood=983 | wood=570, stone=0, food=176, water=954 |
| 16 | combo | 3 / 29 / 57 / 86 / 167 / 294 | 50.26% | 585 | won | 585 | stone=2218, food=1339, wood=2017, water=1920 | wood=1411, stone=1099, food=1321, water=1639 |
| 17 | spam | 3 / 21 / 52 / 196 / 311 / 558 | 93.47% | 597 | won | 597 | stone=812, water=1018, food=330, wood=1921 | wood=1132, stone=10, water=883, food=327 |
| 17 | combo | 3 / 13 / 47 / 141 / 261 / 393 | 65.83% | 597 | won | 597 | stone=1652, wood=3539, water=1749, food=2010 | wood=2723, stone=751, water=1607, food=1998 |
| 18 | spam | 3 / 14 / 45 / 108 / 263 / 426 | 71.72% | — | stuck | 609 | stone=1198, wood=1641, food=401, water=917 | wood=989, stone=5, food=383, water=641 |
| 18 | combo | 3 / 13 / 26 / 60 / 177 / 298 | 50.17% | — | stuck | 609 | stone=2087, wood=2821, food=1683, water=1495 | wood=2121, stone=1002, food=1665, water=1206 |
| 19 | spam | 3 / 34 / 60 / 140 / 208 / 498 | 77.57% | 642 | won | 642 | stone=1047, wood=2231, food=321, water=768 | wood=1457, stone=10, food=301, water=582 |
| 19 | combo | 3 / 33 / 57 / 84 / 154 / 318 | 49.53% | 642 | won | 642 | stone=2083, wood=3763, food=1944, water=1442 | wood=2889, stone=1052, food=1911, water=1248 |
| 20 | spam | 12 / 15 / 80 / 141 / 174 / — | — | 621 | won | 621 | wood=2058, food=231, stone=1152, water=612 | wood=1335, stone=96, food=222, water=516 |
| 20 | combo | 9 / 12 / 33 / 103 / 125 / 276 | 44.44% | 621 | won | 621 | wood=3715, food=1855, stone=2387, water=1435 | wood=2876, stone=1496, food=1846, water=1312 |

