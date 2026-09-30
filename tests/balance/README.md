## V5 night calibration

Three policies: combo, spam, and seeded random (uniform eligible empty physical slot, then uniform affordable roster building). V5 uses slotCounts for terraformed placeable non-core capacity. `assessV5` evaluates a–f; legacy `assess` / `renderV4Report` remain for historical evidence. Careless stalls count as failures only in v5, not as engine proofs.

Run `BALANCE=1 BALANCE_SEEDS=50 BALANCE_LABEL="V5 round 1" BALANCE_FILE=v5-round-1 BALANCE_APPEND=1 npx vitest run tests/balance`. Each archive captures the exact config and 150 real-session runs. RNG replay and payout scores are checked against actual commands.

# Balance harness

Run the opt-in real-session measurement (50 seeds × spam/combo, no dependencies added):

```sh
BALANCE=1 BALANCE_SEEDS=50 BALANCE_LABEL='v4 round 1' BALANCE_FILE=v4-round-1 npx vitest run tests/balance
```

`REPORT.md` contains the current human-readable results; the named JSON keeps the full configuration and every run. Retain `baseline.json` and each round file so comparisons are reproducible. `BALANCE_APPEND=1` appends an informational section; `BALANCE_COLS=26 BALANCE_ROWS=18` changes only the measurement map size. `BALANCE_SEEDS=50` expands the seed sample. Default `npm test` skips the suite.

Both bots use real `GameSession` commands, finish spread animations with `advance`, never demolish or reshuffle, and stop at 1500 actions. An additional `stuck` stop means no affordable empty-slot placement and no usable held core; it is **not** a soft-lock declaration. The report never silently drops those seeds. A session loss is counted as a soft-lock declaration because its only automatic-loss path calls `isProvablySoftLocked`; stuck states are queried directly as well.

Both bots scan all eligible hexes, using the first empty slot (equivalent when no slots have been demolished). Spam scores total visible base yield. Combo adds newly eligible pairs/triples and first-completion adjacency, with partial-hex preference on equal scores. There is no undisclosed resource weighting, cost penalty, or future-recipe bonus. All remaining ties use ascending HexId and roster order. Every chosen candidate's predicted payout is checked against the real placement transaction.

Core sites maximize dead placeable claims, tied by HexId. Offers prefer a new mixed biome at that option's best core site, then fewer visible main-biome tiles, then option 0. A new mixed biome means a `convert` claim to a mixed biome not currently on the board.

V4 wins at T8 and awards only T1–T7 cores. Board-full bot losses are distinguished from engine-proven losses and unproven empty-slot stalls. The latter never count as spam losses. Board use divides placements by three times ALL map placeable hexes, including dead land. Opening stalls mean no affordable placement before T2 with empty living slots.

Threshold medians include all seeds, censoring missing completions as infinity. Stock pressure samples the T3–T7 payout transactions, recording held stock and maximum per-resource cost in the placement biome roster. Target 5 checks each checkpoint/resource median normalized ratio ≤3; positive stock with zero cost is infinite. Missing checkpoints need ≥90% coverage. Target 6 requires ≥90% T7 coverage and every reached T7 below 60% board use. The report includes all six targets, per-run results, and checkpoint stock/cost vectors. Historical v2/v3 sections retain their original assessments.

False-loss audits construct direct productive placement/replacement or demolition-refund-funded unpaid base yield escapes. This is independent of the conservative loss detector but is not exhaustive over future replacement sequences. Acceptance tests cover exhausted boards, productive replacement, and multi-demolition escapes.

Measurements use four bounded local Node subprocesses (native type stripping plus a local extension resolver, no mocks or extra npm dependencies). The test compares worker seed 1 against a Vitest-run real session. Temporary worker configurations are cleaned up. Runtime excludes the replay. The standard 20-seed budget remains 120 seconds, scaling linearly with seeds and quadratically with board area for optional larger-map previews.
