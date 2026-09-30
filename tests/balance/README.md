# Balance harness

Run the opt-in real-session measurement (50 seeds × spam/combo, no dependencies added):

```sh
BALANCE=1 BALANCE_SEEDS=50 BALANCE_LABEL='v3 round 1' BALANCE_FILE=v3-round-1 npx vitest run tests/balance
```

`REPORT.md` contains the current human-readable results; the named JSON keeps the full configuration and every run. Retain `baseline.json` and each round file so comparisons are reproducible. `BALANCE_APPEND=1` appends an informational section; `BALANCE_COLS=26 BALANCE_ROWS=18` changes only the measurement map size. `BALANCE_SEEDS=50` expands the seed sample. Default `npm test` skips the suite.

Both bots use real `GameSession` commands, finish spread animations with `advance`, never demolish or reshuffle, and stop at 1500 actions. An additional `stuck` stop means no affordable empty-slot placement and no usable held core; it is **not** a soft-lock declaration. The report never silently drops those seeds. A session loss is counted as a soft-lock declaration because its only automatic-loss path calls `isProvablySoftLocked`; stuck states are queried directly as well.

Both bots scan all eligible hexes, using the first empty slot (equivalent when no slots have been demolished). Spam scores total visible base yield. Combo adds newly eligible pairs/triples and first-completion adjacency, with partial-hex preference on equal scores. There is no undisclosed resource weighting, cost penalty, or future-recipe bonus. All remaining ties use ascending HexId and roster order. Every chosen candidate's predicted payout is checked against the real placement transaction.

Core sites maximize dead placeable claims, tied by HexId. Offers prefer a new mixed biome at that option's best core site, then fewer visible main-biome tiles, then option 0. A new mixed biome means a `convert` claim to a mixed biome not currently on the board.

Threshold medians cover **all** seeds, with unreached thresholds censored as infinity. Reached-only medians/ranges and sample counts are also printed. Ratios without finite medians and T6 medians without enough completers are unmeasurable. Under v3, zero spam T6 completers passes target 3. T6 fill is measured at award time, before deploying the new core. Runtime excludes the additional seed-1 deterministic replay test.

Measurements use four bounded local Node subprocesses (native type stripping plus a local extension resolver, no mocks or extra npm dependencies). The test compares worker seed 1 against a Vitest-run real session. Temporary worker configuration files are cleaned up on success or failure.

Larger-map informational previews scale the runtime allowance by squared board-area ratio; the standard 20×14, 20-seed budget remains 120 seconds. Extra seeds scale the allowance linearly. The suite timeout accommodates these opt-in larger runs.

V3 reports eight thresholds, T6/T7/T8 fill at the award transaction, and final legal core sites per run. Target 4 needs 96% T6 completion and 90% wins (48/50 and 45/50), with zero soft-lock declarations. T1 is exempt from pacing; T7/T8 target 360/450 ±20% and must precede the finite all-seed median win. Target 2 still compares T4–T6 only. Historical v2 sections retain their original six-threshold assessments.
