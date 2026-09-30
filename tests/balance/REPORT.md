# Economy v2 balance report

## Untuned v2 baseline

Real GameSession, 20×14, seeds 1–20, 90540 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | unreached | 14.5 (8–45), 10/20 | unreached | 34.5 (13–56), 2/20 | unmeasurable | 7 (5.6–8.4) |
| T2 | unreached | 47.5 (24–88), 10/20 | unreached | 60 (60–60), 1/20 | unmeasurable | 22 (17.6–26.4) |
| T3 | unreached | 77 (39–133), 9/20 | unreached | 88 (88–88), 1/20 | unmeasurable | 45 (36–54) |
| T4 | unreached | 113 (95–232), 9/20 | unreached | 210 (210–210), 1/20 | unmeasurable | 90 (72–108) |
| T5 | unreached | 280 (183–411), 9/20 | unreached | —, 0/20 | unmeasurable | 160 (128–192) |
| T6 | unreached | 394 (306–477), 9/20 | unreached | —, 0/20 | unmeasurable | 270 (216–324) |

| Target | Result | Evidence |
|---|---|---|
| 1. Combo pacing | MISS | unreached / unreached / unreached / unreached / unreached / unreached |
| 2. T4–T6 ≥1.5× | MISS / unmeasurable | unmeasurable / unmeasurable / unmeasurable |
| 3. Spam T6 fill ≥70% | MISS / unmeasurable | no T6 completers |
| 4. ≥90% combo T6/wins; zero soft-locks | MISS | T6 9/20; wins 7/20; 0 soft-lock declarations across both bots |

combo: win placements median (range) **585 (552–633)**; 7 wins, 13 stuck, 0 soft-lock, 0 action-cap.

spam: win placements median (range) **—**; 0 wins, 20 stuck, 0 soft-lock, 0 action-cap.

| Seed | Bot | T1–T6 placements | T6 fill | Win placements | Stop | Final placements | Final lifetime | Final stock |
|---|---|---|---:|---:|---|---:|---|---|
| 1 | spam | — / — / — / — / — / — | — | — | stuck | 76 | stone=235, water=281, food=15 | wood=6, stone=1, water=227, food=15 |
| 1 | combo | 8 / 41 / 119 / 189 / 307 / 394 | 62.54% | 633 | won | 633 | stone=1595, water=1871, wood=2481, food=1140 | wood=1517, stone=485, water=1703, food=1101 |
| 2 | spam | 13 / — / — / — / — / — | — | — | stuck | 79 | stone=239, wood=16, water=270, food=21 | wood=0, stone=1, water=192, food=21 |
| 2 | combo | 11 / 24 / 41 / 102 / 250 / 360 | 56.87% | 633 | won | 633 | stone=1522, wood=2435, water=2055, food=1352 | wood=1408, stone=456, water=1881, food=1340 |
| 3 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=21 | wood=0, stone=27 |
| 3 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=21 | wood=0, stone=27 |
| 4 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 4 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 5 | spam | — / — / — / — / — / — | — | — | stuck | 58 | stone=193, water=197, food=15 | wood=6, stone=1, water=131, food=15 |
| 5 | combo | 14 / 61 / — / — / — / — | — | — | stuck | 69 | stone=155, water=420, wood=65, food=43 | wood=0, stone=1, water=402, food=43 |
| 6 | spam | — / — / — / — / — / — | — | — | stuck | 100 | stone=340, water=284, food=27 | wood=6, stone=1, water=158, food=27 |
| 6 | combo | 14 / 33 / 61 / 113 / 294 / 434 | 69.89% | 630 | won | 630 | stone=1979, water=2044, food=1099, wood=1656 | wood=892, stone=601, water=1693, food=1084 |
| 7 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 7 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 8 | spam | — / — / — / — / — / — | — | — | stuck | 192 | stone=717, water=495, food=12 | wood=6, stone=90, water=279, food=12 |
| 8 | combo | 15 / 30 / 39 / 102 / 183 / 339 | 60.11% | 564 | won | 564 | stone=1556, water=1865, wood=2123, food=1769 | wood=1191, stone=617, water=1738, food=1766 |
| 9 | spam | — / — / — / — / — / — | — | — | stuck | 165 | stone=582, water=456 | wood=6, stone=18, water=240 |
| 9 | combo | 14 / 69 / 77 / 103 / 280 / 357 | 62.96% | 567 | won | 567 | stone=1225, water=1790, wood=2468, food=1484 | wood=1508, stone=261, water=1653, food=1457 |
| 10 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 10 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 11 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 11 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 12 | spam | 56 / 60 / 88 / 210 / — / — | — | — | stuck | 576 | wood=848, stone=1197, food=203, water=1311 | wood=205, stone=2, food=176, water=1029 |
| 12 | combo | 33 / 36 / 67 / 95 / 195 / 306 | 51.78% | — | stuck | 597 | wood=2105, food=1246, stone=1705, water=1937 | wood=1388, stone=405, food=1210, water=1638 |
| 13 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 13 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 14 | spam | — / — / — / — / — / — | — | — | stuck | 171 | stone=879 | wood=0, stone=543 |
| 14 | combo | 30 / 88 / 119 / 204 / 346 / 464 | 84.98% | 552 | won | 552 | stone=1865, wood=1477, water=1974, food=935 | wood=812, stone=722, water=1735, food=920 |
| 15 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 15 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 16 | spam | — / — / — / — / — / — | — | — | stuck | 186 | stone=696, water=480 | wood=6, stone=84, water=264 |
| 16 | combo | 26 / 77 / 116 / 175 / 411 / 476 | 81.37% | 585 | won | 585 | stone=1769, wood=1489, water=2228, food=1064 | wood=748, stone=485, water=1931, food=1046 |
| 17 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 17 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 18 | spam | — / — / — / — / — / — | — | — | stuck | 63 | stone=227, food=15, water=166 | wood=0, stone=1, food=15, water=62 |
| 18 | combo | 45 / 54 / 133 / 232 / 276 / 477 | 80.3% | — | stuck | 609 | stone=1499, food=1225, water=1966, wood=1513 | wood=662, stone=214, food=1216, water=1618 |
| 19 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 19 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 20 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 20 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |

