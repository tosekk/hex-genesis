# Economy v2 balance report

## N3 round 2 — opening producer yields

Real GameSession, 20×14, seeds 1–20, 76783 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | 11 | 7 (2–18), 15/20 | unreached | 8 (4–10), 7/20 | unmeasurable | 7 (5.6–8.4) |
| T2 | 14.5 | 12 (9–32), 15/20 | unreached | 14 (8–178), 6/20 | unmeasurable | 22 (17.6–26.4) |
| T3 | 36 | 30 (19–46), 15/20 | unreached | 42.5 (34–77), 4/20 | unmeasurable | 45 (36–54) |
| T4 | 98.5 | 78 (58–140), 15/20 | unreached | 157 (126–268), 4/20 | unmeasurable | 90 (72–108) |
| T5 | 134.5 | 110 (81–206), 15/20 | unreached | 231.5 (163–319), 4/20 | unmeasurable | 160 (128–192) |
| T6 | 249 | 226 (147–330), 15/20 | unreached | 504 (391–600), 3/20 | unmeasurable | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | 11 / 14.5 / 36 / 98.5 / 134.5 / 249 |
| 2. T4–T6 ≥1.5× | MISS / unmeasurable | unmeasurable / unmeasurable / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | min 65.49%, median 82.76% |
| 4. ≥90% combo T6/wins; zero soft-locks | MISS | T6 15/20; wins 13/20; 0 soft-lock declarations across both bots |

combo: win placements median (range) **609 (552–633)**; 13 wins, 7 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **610.5 (597–621)**; 4 wins, 16 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | — / — / — / — / — / — | — | — | stuck | 76 | stone=235, water=281, food=15 | wood=6, stone=1, water=227, food=15 |
| 1 | combo | 5 / 12 / 32 / 75 / 93 / 174 | 27.62% | 633 | won | 633 | stone=2165, water=1495, wood=3834, food=1634 | wood=2968, stone=1244, water=1378, food=1601 |
| 2 | spam | 8 / — / — / — / — / — | — | — | stuck | 123 | stone=405, wood=10, water=383, food=20 | wood=0, stone=1, water=225, food=20 |
| 2 | combo | 2 / 9 / 39 / 58 / 118 / 255 | 40.28% | 633 | won | 633 | stone=2146, wood=3529, water=1616, food=1778 | wood=2708, stone=1196, water=1464, food=1766 |
| 3 | spam | 8 / 10 / 47 / 268 / 319 / 504 | 82.76% | 609 | won | 609 | wood=2089, stone=1086, water=838, food=316 | wood=1359, stone=2, water=604, food=307 |
| 3 | combo | 15 / 18 / 25 / 78 / 103 / 226 | 37.11% | 609 | won | 609 | wood=3324, food=1742, stone=1883, water=1469 | wood=2565, stone=871, food=1736, water=1261 |
| 4 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 4 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 5 | spam | — / — / — / — / — / — | — | — | stuck | 58 | stone=193, water=197, food=15 | wood=6, stone=1, water=131, food=15 |
| 5 | combo | 5 / 12 / 38 / 140 / 155 / 243 | 38.94% | 627 | won | 627 | stone=1804, water=2126, wood=2469, food=1500 | wood=1886, stone=419, water=1753, food=1485 |
| 6 | spam | — / — / — / — / — / — | — | — | stuck | 100 | stone=340, water=284, food=27 | wood=6, stone=1, water=158, food=27 |
| 6 | combo | 11 / 14 / 46 / 61 / 90 / 147 | 23.67% | 630 | won | 630 | stone=2483, water=1712, food=1554, wood=2796 | wood=2152, stone=1254, water=1387, food=1545 |
| 7 | spam | 8 / 11 / 34 / 126 / 222 / 600 | 98.04% | 612 | won | 612 | stone=910, wood=1596, water=1255, food=260 | wood=835, stone=7, water=1153, food=260 |
| 7 | combo | 2 / 10 / 34 / 138 / 206 / 306 | 50% | 612 | won | 612 | stone=1723, wood=3425, food=1598, water=2042 | wood=2712, stone=776, food=1586, water=1930 |
| 8 | spam | — / — / — / — / — / — | — | — | stuck | 192 | stone=717, water=495, food=12 | wood=6, stone=90, water=279, food=12 |
| 8 | combo | 8 / 11 / 27 / 63 / 87 / 228 | 40.43% | 564 | won | 564 | stone=2033, water=1600, wood=2815, food=1995 | wood=2040, stone=1212, water=1478, food=1992 |
| 9 | spam | — / — / — / — / — / — | — | — | stuck | 165 | stone=582, water=456 | wood=6, stone=18, water=240 |
| 9 | combo | 5 / 11 / 30 / 63 / 100 / 290 | 51.15% | 567 | won | 567 | stone=1731, water=1584, wood=3407, food=1925 | wood=2581, stone=943, water=1472, food=1922 |
| 10 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 10 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 11 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 11 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 12 | spam | — / — / — / — / — / — | — | — | stuck | 180 | wood=1017 | wood=663, stone=0 |
| 12 | combo | 18 / 20 / 27 / 76 / 93 / 217 | 36.72% | — | stuck | 597 | wood=2733, food=1553, stone=2005, water=1818 | wood=2091, stone=781, food=1529, water=1528 |
| 13 | spam | 9 / 178 / — / — / — / — | — | — | stuck | 275 | water=872, food=70, stone=843, wood=32 | wood=0, stone=1, water=606, food=70 |
| 13 | combo | — / — / — / — / — / — | — | — | stuck | 4 | water=36, food=14 | wood=0, stone=1, water=36, food=14 |
| 14 | spam | — / — / — / — / — / — | — | — | stuck | 171 | stone=879 | wood=0, stone=543 |
| 14 | combo | 12 / 32 / 44 / 99 / 138 / 199 | 36.45% | 552 | won | 552 | stone=2277, wood=2238, water=1705, food=1386 | wood=1621, stone=1314, water=1499, food=1374 |
| 15 | spam | 10 / 23 / — / — / — / — | — | — | stuck | 73 | stone=176, wood=30, water=248, food=71 | wood=0, stone=1, water=214, food=71 |
| 15 | combo | 2 / 9 / 27 / 104 / 179 / 296 | 51.39% | 576 | won | 576 | stone=1830, wood=2365, water=1928, food=1429 | wood=1775, stone=882, water=1751, food=1418 |
| 16 | spam | — / — / — / — / — / — | — | — | stuck | 186 | stone=696, water=480 | wood=6, stone=84, water=264 |
| 16 | combo | 12 / 22 / 44 / 86 / 131 / 199 | 34.02% | 585 | won | 585 | stone=2224, wood=2001, food=1340, water=1923 | wood=1394, stone=1102, food=1322, water=1642 |
| 17 | spam | 7 / 17 / 38 / 186 / 241 / 391 | 65.49% | 597 | won | 597 | stone=872, wood=2109, food=386, water=1065 | wood=1316, stone=11, food=380, water=926 |
| 17 | combo | 2 / 11 / 27 / 132 / 171 / 330 | 55.28% | 597 | won | 597 | stone=1652, wood=3508, water=1737, food=1983 | wood=2697, stone=749, water=1595, food=1971 |
| 18 | spam | — / — / — / — / — / — | — | — | stuck | 63 | stone=227, food=15, water=166 | wood=0, stone=1, food=15, water=62 |
| 18 | combo | 11 / 15 / 23 / 68 / 81 / 213 | 35.86% | — | stuck | 609 | stone=2118, food=1676, water=1476, wood=2820 | wood=2122, stone=1033, food=1655, water=1195 |
| 19 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 19 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=24 | wood=0, stone=30 |
| 20 | spam | 4 / 8 / 77 / 128 / 163 / — | — | 621 | won | 621 | wood=2053, food=245, stone=1160, water=647 | wood=1337, stone=98, food=236, water=551 |
| 20 | combo | 7 / 10 / 19 / 98 / 110 / 160 | 25.76% | 621 | won | 621 | wood=3713, food=1853, stone=2389, water=1433 | wood=2874, stone=1498, food=1844, water=1310 |

