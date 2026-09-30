# Economy v2 balance report

## N3 round 1 — thresholds only

Real GameSession, 20×14, seeds 1–20, 80468 ms for both bots. No demolition, reshuffle, resource weighting, or lookahead. Offers favor a new mixed biome at the best legal site, then the less represented main biome. Core sites maximize dead placeable claims, tied by HexId. Combo ties favor partial hexes.

All-seed medians treat unreached thresholds as infinity. Parenthesized ranges and reached-only medians include completers only; missing runs are never silently excluded from target checks. Ratios require finite all-seed medians for both bots. T6 fill is measured at the threshold transaction before the new core is deployed. No T6 completers makes the fill target unmeasurable, not a success.

| Threshold | Combo all-seed median | Combo reached median (range), n | Spam all-seed median | Spam reached median (range), n | Spam/combo | Target ±20% |
|---|---:|---|---:|---|---:|---|
| T1 | unreached | 10.5 (3–18), 10/20 | unreached | 29.5 (7–52), 2/20 | unmeasurable | 7 (5.6–8.4) |
| T2 | unreached | 19 (9–32), 10/20 | unreached | 54 (54–54), 1/20 | unmeasurable | 22 (17.6–26.4) |
| T3 | unreached | 56 (21–72), 9/20 | unreached | 64 (64–64), 1/20 | unmeasurable | 45 (36–54) |
| T4 | unreached | 126 (74–210), 9/20 | unreached | 153 (153–153), 1/20 | unmeasurable | 90 (72–108) |
| T5 | unreached | 155 (122–247), 9/20 | unreached | 202 (202–202), 1/20 | unmeasurable | 160 (128–192) |
| T6 | unreached | 322 (238–444), 9/20 | unreached | —, 0/20 | unmeasurable | 270 (216–324) |

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
| 1 | combo | 6 / 14 / 57 / 167 / 205 / 341 | 54.13% | 633 | won | 633 | stone=1609, water=1831, wood=2498, food=1202 | wood=1509, stone=541, water=1692, food=1157 |
| 2 | spam | 7 / — / — / — / — / — | — | — | stuck | 85 | stone=275, wood=8, water=278, food=21 | wood=0, stone=1, water=176, food=21 |
| 2 | combo | 3 / 9 / 21 / 74 / 150 / 276 | 43.6% | 633 | won | 633 | stone=1520, wood=2454, water=2027, food=1384 | wood=1419, stone=472, water=1858, food=1372 |
| 3 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=21 | wood=0, stone=27 |
| 3 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=21 | wood=0, stone=27 |
| 4 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 4 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 5 | spam | — / — / — / — / — / — | — | — | stuck | 58 | stone=193, water=197, food=15 | wood=6, stone=1, water=131, food=15 |
| 5 | combo | 6 / 27 / — / — / — / — | — | — | stuck | 39 | stone=83, water=250, wood=32, food=15 | wood=0, stone=1, water=250, food=15 |
| 6 | spam | — / — / — / — / — / — | — | — | stuck | 100 | stone=340, water=284, food=27 | wood=6, stone=1, water=158, food=27 |
| 6 | combo | 12 / 24 / 47 / 101 / 141 / 330 | 53.14% | 630 | won | 630 | stone=1991, water=2028, food=1132, wood=1658 | wood=882, stone=633, water=1687, food=1117 |
| 7 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 7 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 8 | spam | — / — / — / — / — / — | — | — | stuck | 192 | stone=717, water=495, food=12 | wood=6, stone=90, water=279, food=12 |
| 8 | combo | 9 / 17 / 33 / 95 / 122 / 258 | 45.74% | 564 | won | 564 | stone=1559, water=1889, wood=2042, food=1718 | wood=1125, stone=605, water=1762, food=1712 |
| 9 | spam | — / — / — / — / — / — | — | — | stuck | 165 | stone=582, water=456 | wood=6, stone=18, water=240 |
| 9 | combo | 6 / 12 / 56 / 79 / 155 / 294 | 51.85% | 567 | won | 567 | stone=1240, water=1794, wood=2485, food=1514 | wood=1504, stone=316, water=1678, food=1487 |
| 10 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 10 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 11 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 11 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 12 | spam | 52 / 54 / 64 / 153 / 202 / — | — | — | stuck | 591 | wood=919, stone=1195, food=212, water=1319 | wood=226, stone=0, food=176, water=1055 |
| 12 | combo | 18 / 20 / 30 / 126 / 138 / 238 | 40.27% | — | stuck | 597 | wood=2049, food=1233, stone=1699, water=1982 | wood=1329, stone=384, food=1197, water=1684 |
| 13 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 13 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 14 | spam | — / — / — / — / — / — | — | — | stuck | 171 | stone=879 | wood=0, stone=543 |
| 14 | combo | 12 / 32 / 65 / 153 / 192 / 335 | 61.36% | 552 | won | 552 | stone=1855, wood=1529, water=1939, food=1104 | wood=821, stone=785, water=1732, food=1089 |
| 15 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 15 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27 | wood=0, stone=0, water=27 |
| 16 | spam | — / — / — / — / — / — | — | — | stuck | 186 | stone=696, water=480 | wood=6, stone=84, water=264 |
| 16 | combo | 12 / 31 / 56 / 142 / 207 / 444 | 75.9% | 585 | won | 585 | stone=1739, wood=1473, food=1066, water=2199 | wood=726, stone=466, food=1048, water=1905 |
| 17 | spam | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 17 | combo | — / — / — / — / — / — | — | — | stuck | 3 | water=27, food=3 | wood=0, stone=0, water=27, food=3 |
| 18 | spam | — / — / — / — / — / — | — | — | stuck | 63 | stone=227, food=15, water=166 | wood=0, stone=1, food=15, water=62 |
| 18 | combo | 12 / 18 / 72 / 210 / 247 / 322 | 54.21% | — | stuck | 609 | stone=1482, food=1223, water=1967, wood=1483 | wood=627, stone=195, food=1214, water=1621 |
| 19 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 19 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 20 | spam | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |
| 20 | combo | — / — / — / — / — / — | — | — | stuck | 3 | stone=27 | wood=0, stone=33 |

