# Economy v2 balance report

## N3 round 3 — bootstrap construction resources

Real GameSession, 20×14, seeds 1–20, 98745 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 2 | 2 (2–33), 20/20 | 2 | 2 (2–12), 19/20 | 1 | 7 (5.6–8.4) |
| T2 | 11.5 | 11.5 (7–34), 20/20 | 37.5 | 21 (8–181), 15/20 | 3.26 | 22 (17.6–26.4) |
| T3 | 38 | 38 (19–62), 20/20 | 86.5 | 57 (28–337), 13/20 | 2.28 | 45 (36–54) |
| T4 | 84 | 84 (58–143), 20/20 | 273 | 142 (86–376), 13/20 | 3.25 | 90 (72–108) |
| T5 | 115 | 115 (87–207), 20/20 | 393.5 | 243 (116–565), 13/20 | 3.42 | 160 (128–192) |
| T6 | 230.5 | 230.5 (147–329), 20/20 | unreached | 356.5 (309–504), 6/20 | unmeasurable | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 2 / 11.5 / 38 / 84 / 115 / 230.5 |
| 2. T4–T6 ≥1.5× | MISS / unmeasurable | 3.25 / 3.42 / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | min 48.13%, median 61.52% |
| 4. ≥90% combo T6/wins; zero soft-locks | PASS | T6 20/20; wins 18/20; 0 soft-lock declarations across both bots |

combo: win placements median (range) **603 (552–642)**; 18 wins, 2 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **597 (564–642)**; 9 wins, 11 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | 2 / 63 / 73 / 370 / 565 / — | — | — | stuck | 630 | stone=1136, water=682, food=127, wood=2049 | wood=1257, stone=8, water=562, food=94 |
| 1 | combo | 2 / 12 / 32 / 75 / 93 / 174 | 27.62% | 633 | won | 633 | stone=2165, water=1495, wood=3834, food=1634 | wood=2968, stone=1244, water=1378, food=1601 |
| 2 | spam | 2 / — / — / — / — / — | — | — | stuck | 85 | stone=289, water=275, food=18 | wood=0, stone=1, water=161, food=18 |
| 2 | combo | 3 / 9 / 39 / 58 / 117 / 254 | 40.13% | 633 | won | 633 | stone=2152, wood=3529, water=1616, food=1778 | wood=2708, stone=1202, water=1464, food=1766 |
| 3 | spam | 12 / 13 / 48 / 275 / 326 / 504 | 82.76% | 609 | won | 609 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 23 / 26 / 34 / 73 / 106 / 230 | 37.77% | 609 | won | 609 | wood=3332, food=1699, stone=1880, water=1475 | wood=2577, stone=872, food=1693, water=1267 |
| 4 | spam | 2 / — / — / — / — / — | — | — | stuck | 46 | stone=111, water=209, food=27 | wood=0, stone=1, water=207, food=27 |
| 4 | combo | 2 / 11 / 51 / 125 / 168 / 312 | 53.89% | 582 | won | 582 | stone=1535, water=2177, food=1692, wood=2908 | wood=2171, stone=660, water=2075, food=1680 |
| 5 | spam | 2 / — / — / — / — / — | — | — | stuck | 63 | stone=140, water=304, food=26, wood=18 | wood=0, stone=1, water=274, food=26 |
| 5 | combo | 2 / 12 / 38 / 143 / 156 / 272 | 43.59% | 627 | won | 627 | stone=1823, water=2121, food=1567, wood=2453 | wood=1861, stone=436, water=1744, food=1552 |
| 6 | spam | 2 / 10 / 46 / 223 / 510 / — | — | — | stuck | 621 | stone=1392, wood=1440, water=855, food=123 | wood=930, stone=12, water=537, food=114 |
| 6 | combo | 2 / 9 / 44 / 59 / 90 / 147 | 23.67% | 630 | won | 630 | stone=2491, wood=2796, food=1554, water=1720 | wood=2152, stone=1260, food=1545, water=1393 |
| 7 | spam | 2 / 9 / 43 / 127 / 229 / — | — | 612 | won | 612 | stone=896, wood=1497, food=238, water=1231 | wood=730, stone=7, food=238, water=1129 |
| 7 | combo | 3 / 10 / 34 / 135 / 207 / 306 | 50% | 612 | won | 612 | stone=1721, wood=3420, food=1643, water=2034 | wood=2702, stone=766, food=1631, water=1924 |
| 8 | spam | 2 / 10 / 94 / 112 / 143 / 319 | 56.56% | 564 | won | 564 | stone=1009, wood=1554, food=327, water=782 | wood=829, stone=50, food=324, water=704 |
| 8 | combo | 2 / 9 / 27 / 62 / 87 / 219 | 38.83% | 564 | won | 564 | stone=2043, wood=2815, food=1995, water=1600 | wood=2040, stone=1222, food=1992, water=1478 |
| 9 | spam | 2 / 47 / 53 / 86 / 130 / 375 | 66.14% | 567 | won | 567 | stone=847, water=913, wood=1872, food=277 | wood=1096, stone=9, water=829, food=274 |
| 9 | combo | 2 / 11 / 30 / 63 / 99 / 287 | 50.62% | 567 | won | 567 | stone=1739, wood=3407, food=1925, water=1584 | wood=2581, stone=951, food=1922, water=1472 |
| 10 | spam | 2 / 21 / 79 / 142 / 262 / — | — | 594 | won | 594 | stone=744, water=1208, food=253, wood=1647 | wood=932, stone=9, water=1054, food=251 |
| 10 | combo | 2 / 21 / 62 / 106 / 153 / 265 | 44.61% | 594 | won | 594 | stone=1628, water=1792, food=1312, wood=2978 | wood=2274, stone=625, water=1628, food=1270 |
| 11 | spam | 2 / — / — / — / — / — | — | — | stuck | 19 | stone=46, water=80, food=13 | wood=0, stone=1, water=74, food=13 |
| 11 | combo | 2 / 18 / 45 / 125 / 169 / 231 | 37.2% | 627 | won | 627 | stone=1839, water=2071, wood=2257, food=1333 | wood=1614, stone=467, water=1705, food=1270 |
| 12 | spam | — / — / — / — / — / — | — | — | stuck | 180 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 33 / 34 / 41 / 74 / 109 / 214 | 36.21% | — | stuck | 597 | wood=2731, food=1512, stone=2013, water=1822 | wood=2093, stone=795, food=1488, water=1532 |
| 13 | spam | 7 / 181 / — / — / — / — | — | — | stuck | 249 | water=804, food=68, stone=760, wood=28 | wood=0, stone=0, water=564, food=68 |
| 13 | combo | 7 / 18 / 42 / 83 / 92 / 186 | 31.96% | 582 | won | 582 | water=1742, food=1415, stone=2014, wood=2619 | wood=2046, stone=873, water=1484, food=1403 |
| 14 | spam | 2 / 160 / 186 / 271 / 386 / — | — | — | stuck | 546 | stone=1461, water=1137, wood=873, food=186 | wood=438, stone=303, water=885, food=180 |
| 14 | combo | 2 / 26 / 38 / 99 / 138 / 199 | 36.45% | 552 | won | 552 | stone=2279, water=1716, food=1385, wood=2238 | wood=1622, stone=1313, water=1506, food=1373 |
| 15 | spam | 2 / 22 / — / — / — / — | — | — | stuck | 82 | stone=214, wood=30, water=266, food=69 | wood=0, stone=1, water=212, food=69 |
| 15 | combo | 3 / 9 / 27 / 103 / 173 / 297 | 51.56% | 576 | won | 576 | stone=1827, wood=2399, water=1901, food=1464 | wood=1795, stone=885, water=1727, food=1454 |
| 16 | spam | 2 / 105 / 337 / 376 / 401 / — | — | 585 | won | 585 | stone=1349, food=179, water=1266, wood=969 | wood=549, stone=9, food=179, water=954 |
| 16 | combo | 2 / 23 / 42 / 85 / 131 / 198 | 33.85% | 585 | won | 585 | stone=2213, food=1333, wood=2001, water=1915 | wood=1395, stone=1093, food=1315, water=1634 |
| 17 | spam | 2 / 18 / 42 / 190 / 243 / 405 | 67.84% | 597 | won | 597 | stone=842, water=1051, food=365, wood=2021 | wood=1225, stone=11, water=910, food=362 |
| 17 | combo | 3 / 11 / 24 / 130 / 167 / 329 | 55.11% | 597 | won | 597 | stone=1649, wood=3517, water=1747, food=1979 | wood=2707, stone=746, water=1605, food=1967 |
| 18 | spam | 2 / 8 / 28 / 107 / 162 / 338 | 56.9% | — | stuck | 609 | stone=1190, wood=1615, food=393, water=924 | wood=959, stone=2, food=375, water=648 |
| 18 | combo | 2 / 7 / 24 / 59 / 105 / 218 | 36.7% | — | stuck | 609 | stone=2088, wood=2796, food=1665, water=1487 | wood=2097, stone=1000, food=1644, water=1198 |
| 19 | spam | 2 / 28 / 57 / 93 / 116 / 309 | 48.13% | 642 | won | 642 | stone=1061, water=770, wood=2244, food=323 | wood=1470, stone=10, water=584, food=299 |
| 19 | combo | 2 / 17 / 53 / 80 / 97 / 239 | 37.23% | 642 | won | 642 | stone=2075, water=1421, wood=3763, food=1928 | wood=2893, stone=1045, water=1227, food=1895 |
| 20 | spam | 9 / 10 / 65 / 128 / 163 / — | — | 621 | won | 621 | wood=2037, food=239, stone=1154, water=627 | wood=1318, stone=89, food=230, water=531 |
| 20 | combo | 8 / 9 / 19 / 102 / 113 / 162 | 26.09% | 621 | won | 621 | wood=3699, food=1851, stone=2389, water=1429 | wood=2856, stone=1500, food=1842, water=1306 |

