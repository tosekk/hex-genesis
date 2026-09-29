# Contracts — the interfaces every agent codes against

In task O1, `opus` copies these blocks **verbatim** into the listed files and creates compiling stubs for every exported function.
After M0, **the code in `src/core/types.ts` and `src/core/contracts.ts` is the source of truth**. Changes go through `opus` (see `tasks/README.md` §5.6), and each change is logged in `tasks/status/opus.md` → "Contract changelog".

Conventions:

- `HexId = row * cols + col`. **Every deterministic tie-break uses ascending `HexId`.**
- Sim functions **mutate the `GameState` they receive** and return a `Result`. They **validate before mutating**: a function returning `{ ok: false }` has changed nothing.
- `Resources` is sparse: a missing key means 0.
- Board size is 20 columns × 14 rows (the spec's "14 × 20", landscape). Pointy-top hexes in **odd-r** offset layout: odd rows are shifted right by half a hex.

---

## 1. `src/core/types.ts` — data model (owner: opus)

```ts
export type HexId = number;
export type SlotIndex = 0 | 1 | 2;
export type PairIndex = 0 | 1 | 2;
/** PairIndex → slots. 0: slots 0+1, 1: slots 0+2, 2: slots 1+2 (GAME_DESIGN §28). */
export const SLOT_PAIRS: readonly (readonly [SlotIndex, SlotIndex])[] = [[0, 1], [0, 2], [1, 2]];

export type MainBiome = 'forest' | 'desert' | 'arctic';
export type MixedBiome = 'steppe' | 'taiga' | 'polarDesert';
export type Biome = MainBiome | MixedBiome;
export const MAIN_BIOMES: readonly MainBiome[] = ['forest', 'desert', 'arctic'];
export const MIXED_BIOMES: readonly MixedBiome[] = ['steppe', 'taiga', 'polarDesert'];

/** 'hill' is an internal name only: it renders exactly like 'plain', just higher (§6). */
export type Terrain = 'plain' | 'hill' | 'mountain' | 'riverbed' | 'basin' | 'woods' | 'marsh';
export const PLACEABLE_TERRAIN: readonly Terrain[] = ['plain', 'hill'];
export const WATER_TERRAIN: readonly Terrain[] = ['riverbed', 'basin'];

export type ResourceId = string;
export type Resources = Record<ResourceId, number>;
export type BuildingId = string;
export type ComboId = string;

export interface Slot {
  building: BuildingId | null;
  /** Permanent: this physical slot has already paid its base yield (§23). Never reset. */
  yieldPaid: boolean;
}

export interface PaidRecord { comboId: ComboId; amount: Resources; }

export interface Hex {
  readonly id: HexId;
  readonly col: number;
  readonly row: number;
  /** 0 .. map.levels-1. Mountains are always map.levels-1. */
  readonly elevation: number;
  /** Fixed at generation. Never changes (§6, §7). */
  readonly terrain: Terrain;
  /** Fixed at generation: terrain ∈ PLACEABLE_TERRAIN. Never changes (§7). */
  readonly placeable: boolean;
  /** uint32 fixed at generation. Only the renderer gives it meaning (decoration variant/points). */
  readonly decoration: number;
  /** VISIBLE biome. null = dead. Set only when the session reveals a spread claim. Mountains stay null forever. */
  biome: Biome | null;
  slots: [Slot, Slot, Slot];
  /** Permanent once true (§20, §36). */
  everCompleted: boolean;
  /** Permanent 2-building combo payout record per PairIndex (§31). */
  pairPaid: [PaidRecord | null, PaidRecord | null, PaidRecord | null];
  /** Permanent 3-building combo payout record (§31). */
  triplePaid: PaidRecord | null;
}

/** claim: dead → biome · convert: foreign main → mixed · mountain: pool spent, biome unchanged (§13). */
export type ClaimKind = 'claim' | 'convert' | 'mountain';

export interface SpreadClaim {
  hexId: HexId;
  kind: ClaimKind;
  /** null only when kind === 'mountain'. */
  toBiome: Biome | null;
  /** Cumulative Dijkstra path cost in cost units. For ordering/animation only. */
  pathCost: number;
}

export interface SpreadResult {
  origin: HexId;
  biome: MainBiome;
  /** Reveal order. claims[0] is the origin. */
  claims: SpreadClaim[];
  poolUsed: number;
}

export interface ActiveSpread {
  result: SpreadResult;
  /** claims[0 .. revealed-1] have been applied to hex.biome. */
  revealed: number;
  /** Every hexId in result.claims. No building or demolition here until the spread finishes (§11). */
  locked: Record<HexId, true>;
}

export interface BiomeOffer { options: [MainBiome, MainBiome]; reshuffled: boolean; }

export type RunStatus = 'playing' | 'won' | 'lost' | 'ended';

/** Opaque PRNG state. Create/advance only via src/core/rng.ts. */
export interface RngState { s: number; }

// ---------- configuration (values live in src/config/*) ----------

export interface BuildingDef { id: BuildingId; name: string; cost: Resources; baseYield: Resources; }

export interface ComboDef {
  id: ComboId;
  name: string;
  /** 2 or 3 building ids. A multiset: order-independent, duplicates allowed. */
  buildings: BuildingId[];
  amount: Resources;
}

export interface TerrainBonusDef {
  /** Natural terrain that triggers the bonus when adjacent (§24). */
  adjacentTerrain: Terrain[];
  buildings: BuildingId[] | 'any';
  /** Added once per qualifying adjacent hex (PLACEHOLDER rule). */
  bonus: Resources;
}

export interface ZoneModifierDef {
  buildings: BuildingId[] | 'any';
  /** May be negative. Final base yield is clamped to ≥ 0 per resource. */
  delta: Resources;
}

export interface SpreadConfig {
  /** r in 3r(r+1)+1+2r. Pool size only, NOT a spatial radius (§12). */
  poolRadius: number;
  /** Integer cost sub-units per 1.0 of spread cost, so halving/doubling stays integral. */
  costUnit: number;
  uphillPerLevel: number;       // cost units added per level climbed (PLACEHOLDER)
  downhillPerLevel: number;     // cost units removed per level descended (PLACEHOLDER)
  minStepCost: number;          // cost units, > 0 (§13)
  naturalMultiplier: number;    // 2 (§13)
  conversionMultiplier: number; // 0.5 (§17)
  maxConversionDepth: number;   // 2 (§17)
  minCoreDistance: number;      // 6 (§10)
}

export interface MapConfig {
  cols: number;   // 20
  rows: number;   // 14
  levels: number; // 5 (§4)
  /** Generation knobs (PLACEHOLDER probabilities). Owned by deepseek in src/config/map.ts. */
  params: Record<string, number>;
}

export interface AnimationConfig {
  spreadMaxMs: number;  // 5000 (§15): the last tile finishes flipping by this time
  tileFlipMs: number;   // duration of one tile's flip
}

export interface GameConfig {
  resources: ResourceId[];
  startingResources: Resources;
  buildings: Record<BuildingId, BuildingDef>;
  /** Main biome: ≤ 5 ids. Mixed biome: 3 from parent A + 3 from parent B + 3 unique (§21, §22). */
  rosters: Record<Biome, BuildingId[]>;
  combos: ComboDef[];
  terrainBonuses: TerrainBonusDef[];
  zoneModifiers: Partial<Record<Biome, ZoneModifierDef[]>>;
  /** PLACEHOLDER amount per qualifying unordered adjacent pair (§34). */
  adjacencyAmount: Resources;
  /** Ascending. Each entry: mandatory per-resource LIFETIME targets (§39). */
  thresholds: Resources[];
  demolishRefundRatio: number; // 0.5 (§26)
  reshufflesPerRun: number;    // 1 (§9)
  spread: SpreadConfig;
  map: MapConfig;
  animation: AnimationConfig;
}

// ---------- run state ----------

export interface GameState {
  readonly config: GameConfig;
  readonly seed: number;
  readonly cols: number;
  readonly rows: number;
  /** hexes[i].id === i */
  hexes: Hex[];
  offerRng: RngState;
  resources: Resources;
  /** Only increases. Payout yields only; refunds are NOT yield (§39). */
  lifetime: Resources;
  /** Index into config.thresholds of the NEXT threshold to reach. */
  thresholdIndex: number;
  /** Unplaced cores, each bound to its chosen biome (§9). */
  coreStack: MainBiome[];
  /** Modal. While non-null, only chooseOffer/reshuffle/endRun are allowed (§9). */
  pendingOffer: BiomeOffer | null;
  reshufflesUsed: number;
  /** Pairs the player actually chose from (after any reshuffle), oldest first (§9). */
  offerHistory: [MainBiome, MainBiome][];
  /** Placed core centres in placement order. */
  cores: HexId[];
  activeSpread: ActiveSpread | null;
  /** key = pairKey(a, b). Unordered: (a,b) and (b,a) share one record (§34). */
  adjacencyPaid: Record<string, Resources>;
  /** Discovery order (§32). */
  discoveredCombos: ComboId[];
  /** Wall-clock stats only. Never used for decisions. */
  runStartMs: number;
  runEndMs: number | null;
  status: RunStatus;
}

// ---------- results & events ----------

export type Result<T> = { ok: true; value: T } | { ok: false; reason: string };

export type PayoutKind = 'base' | 'pair' | 'triple' | 'adjacency';

export interface PayoutEvent {
  kind: PayoutKind;
  hexId: HexId;
  amount: Resources;
  slot?: SlotIndex;          // base
  pair?: PairIndex;          // pair
  comboId?: ComboId;         // pair | triple
  neighborId?: HexId;        // adjacency
  breakdown?: { raw: Resources; terrain: Resources; zone: Resources }; // base
}

export interface ComboMatch { comboId: ComboId; pair?: PairIndex; triple?: true; }

export interface PlacementOutcome {
  /** Resolution order: base, pairs by PairIndex asc, triple, adjacency by neighbor HexId asc. */
  payouts: PayoutEvent[];
  discovered: ComboId[];
  firstCompletion: boolean;
}

export interface DemolishOutcome { building: BuildingId; refund: Resources; }

export interface PlacementPreview {
  cost: Resources;
  affordable: boolean;
  /** true → base yield will not pay (slot already paid). */
  slotAlreadyPaid: boolean;
  /** Final base yield (raw + visible terrain + zone, clamped). Empty if slotAlreadyPaid. */
  base: Resources;
  baseBreakdown: { raw: Resources; terrain: Resources; zone: Resources };
  /** ONLY discovered combos that would newly pay (§32, §38). Never undiscovered ones. */
  combos: { match: ComboMatch; amount: Resources }[];
}

export interface RunStats { status: RunStatus; lifetime: Resources; elapsedMs: number; seed: number; }
```

## 2. `src/core/contracts.ts` — module interfaces (owner: opus)

```ts
import type {
  BiomeOffer, ComboId, DemolishOutcome, GameState, HexId, MainBiome, PayoutEvent,
  PlacementOutcome, PlacementPreview, Result, RunStats, RunStatus, SlotIndex, SpreadResult, BuildingId,
} from './types';

export type SessionEvent =
  | { type: 'runStarted'; seed: number }
  | { type: 'coreAwarded' }
  | { type: 'offerShown'; offer: BiomeOffer }
  | { type: 'offerResolved'; biome: MainBiome }
  | { type: 'spreadStarted'; result: SpreadResult }
  | { type: 'tilesRevealed'; hexIds: HexId[] }
  | { type: 'spreadFinished' }
  | { type: 'hexChanged'; hexId: HexId }
  | { type: 'payouts'; events: PayoutEvent[] }
  | { type: 'combosDiscovered'; comboIds: ComboId[] }
  | { type: 'resourcesChanged' }
  | { type: 'runEnded'; status: RunStatus; stats: RunStats };

export interface GameSession {
  /** Live state. Read-only for callers; mutate only through commands. */
  readonly state: Readonly<GameState>;
  newRun(seed: number): void;
  subscribe(listener: (e: SessionEvent) => void): () => void;
  chooseOffer(index: 0 | 1): Result<MainBiome>;
  reshuffleOffer(): Result<BiomeOffer>;
  placeCore(hexId: HexId, stackIndex?: number): Result<SpreadResult>;
  placeBuilding(hexId: HexId, slot: SlotIndex, building: BuildingId): Result<PlacementOutcome>;
  demolish(hexId: HexId, slot: SlotIndex): Result<DemolishOutcome>;
  preview(hexId: HexId, slot: SlotIndex, building: BuildingId): PlacementPreview | null;
  endRun(): void;
  /** Call every frame. Paces spread reveals (the only time-driven state change). */
  advance(dtMs: number): void;
}

export interface BoardPick { hexId: HexId; slot: SlotIndex | null; }
export type PointerKind = 'move' | 'click' | 'secondary';
export type HighlightStyle = 'legalCore' | 'selected' | 'hover' | 'locked' | 'invalid';

export interface BoardView {
  /** Full rebuild for a new run. */
  setBoard(state: Readonly<GameState>): void;
  /** Re-render one hex from its current (visible) state: biome, buildings. */
  refreshHex(state: Readonly<GameState>, hexId: HexId): void;
  /** Play the flip/convert animation for tiles the session just revealed. */
  playReveal(state: Readonly<GameState>, hexIds: HexId[]): void;
  setCores(hexIds: HexId[]): void;
  /** Replaces the whole set for that style. */
  setHighlights(style: HighlightStyle, hexIds: HexId[]): void;
  /** pick is null when the pointer is off the board. Returns an unsubscribe function. */
  onPointer(cb: (pick: BoardPick | null, kind: PointerKind) => void): () => void;
  update(dtMs: number): void;
  resize(): void;
  dispose(): void;
}

export interface Hud { dispose(): void; }
export interface Tutorial { dispose(): void; }
```

## 3. `src/core/*` helpers (owner: opus, implemented in O1)

```ts
// src/core/result.ts
export function ok<T>(value: T): Result<T>;
export function err<T = never>(reason: string): Result<T>;

// src/core/biomes.ts
export function isMainBiome(b: Biome | null): b is MainBiome;
export function mixOf(a: MainBiome, b: MainBiome): MixedBiome | null; // null if a === b
export function parentsOf(m: MixedBiome): [MainBiome, MainBiome];

// src/core/rng.ts   (mulberry32-style, uint32 math via Math.imul / >>> 0)
export interface Rng { nextU32(): number; nextFloat(): number; nextInt(maxExclusive: number): number; getState(): RngState; }
export function createRng(seed: number): Rng;
export function rngFromState(state: RngState): Rng;
export function deriveSeed(seed: number, stream: string): number; // 'terrain', 'offers', …

// src/core/hex.ts   (pointy-top, odd-r)
export function hexIdOf(col: number, row: number, cols: number): HexId;
export function colRowOf(id: HexId, cols: number): { col: number; row: number };
export function inBounds(col: number, row: number, cols: number, rows: number): boolean;
export function neighbors(id: HexId, cols: number, rows: number): HexId[];   // in-bounds, ascending HexId
export function hexDistance(a: HexId, b: HexId, cols: number): number;       // flat grid distance, ignores elevation
export function pairKey(a: HexId, b: HexId): string;                         // `${min}:${max}`
export function hexToWorld(col: number, row: number, size: number): { x: number; z: number };

// src/core/resources.ts
export function addRes(a: Resources, b: Resources): Resources;
export function subRes(a: Resources, b: Resources): Resources;
export function canAfford(have: Resources, cost: Resources): boolean;
export function isZero(r: Resources): boolean;

// src/core/state.ts
export function createInitialState(seed: number, config: GameConfig, nowMs: number): GameState;
// hexes from generateMap(deriveSeed(seed,'terrain'), config.map); offerRng from deriveSeed(seed,'offers');
// resources = startingResources; lifetime = {}; everything else empty; status 'playing'.
// Does NOT award the first core. The session does that.

// src/core/testing.ts   (for tests only)
export function makeTestState(opts: {
  cols?: number; rows?: number;
  hex?: (col: number, row: number) => Partial<Pick<Hex, 'elevation' | 'terrain' | 'biome' | 'decoration'>>;
  config?: Partial<GameConfig>;
  resources?: Resources;
}): GameState; // defaults: flat, all 'plain', dead, config = test-friendly copy of default config
```

## 4. Sim module signatures (stubs created by opus in O1)

```ts
// src/sim/world/mapgen.ts                                   owner: deepseek
// O1 stub returns a deterministic trivial map (all 'plain', elevation 0, placeable).
export function generateMap(seed: number, map: MapConfig): Hex[];

// src/sim/offers.ts                                         owner: deepseek
/** Award one core: roll an offer into state.pendingOffer (must be null beforehand). */
export function awardCore(state: GameState): BiomeOffer;
export function reshuffleOffer(state: GameState): Result<BiomeOffer>;
/** Resolve the pending offer: push chosen biome onto coreStack, record history, clear pendingOffer. */
export function resolveOffer(state: GameState, index: 0 | 1): Result<MainBiome>;

// src/sim/spread/spread.ts                                  owner: opus
export function isLegalCoreSite(state: Readonly<GameState>, hexId: HexId): boolean;
export function legalCoreSites(state: Readonly<GameState>): HexId[];                  // ascending
export function computeSpread(state: Readonly<GameState>, origin: HexId, biome: MainBiome): SpreadResult; // pure
/** Validates (no active spread, core in stack, legal site), pops core, records cores[], sets activeSpread. Reveals nothing. */
export function startSpread(state: GameState, origin: HexId, stackIndex: number): Result<SpreadResult>;
/** Applies the next `count` claims to hex.biome, returns them. */
export function revealSpread(state: GameState, count: number): SpreadClaim[];
/** Reveals any remaining claims and clears activeSpread. Returns the claims revealed now. */
export function finishSpread(state: GameState): SpreadClaim[];
export function isHexLocked(state: Readonly<GameState>, hexId: HexId): boolean;

// src/sim/economy/index.ts                                  owner: astra
export function rosterFor(state: Readonly<GameState>, hexId: HexId): BuildingId[];   // [] if dead/unplaceable
export function canPlaceBuilding(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, building: BuildingId): Result<void>;
/** AGENT_TASKS §49 steps 1–13. Does NOT evaluate thresholds. */
export function placeBuilding(state: GameState, hexId: HexId, slot: SlotIndex, building: BuildingId): Result<PlacementOutcome>;
export function demolishBuilding(state: GameState, hexId: HexId, slot: SlotIndex): Result<DemolishOutcome>;
export function previewPlacement(state: Readonly<GameState>, hexId: HexId, slot: SlotIndex, building: BuildingId): PlacementPreview;
export function currentComboMatches(state: Readonly<GameState>, hexId: HexId): ComboMatch[];
export function demolishRefund(state: Readonly<GameState>, building: BuildingId): Resources;
/** If thresholds[thresholdIndex] is fully met: thresholdIndex++ and return true. At most one per call (§39). */
export function advanceThreshold(state: GameState): boolean;

// src/sim/endgame.ts                                        owner: deepseek
export function checkWin(state: Readonly<GameState>): boolean;                 // §41
/** Conservative (§43, §44): true ONLY if the run is provably dead. When unsure → false. */
export function isProvablySoftLocked(state: Readonly<GameState>): boolean;
```

## 5. Factory signatures (stubs created by opus in O1)

```ts
// src/game/session.ts        owner: sonnet
export function createGameSession(opts?: { config?: GameConfig; now?: () => number }): GameSession;
// src/render/boardView.ts    owner: sol
export function createBoardView(container: HTMLElement, config: GameConfig): BoardView;
// src/ui/hud.ts              owner: sonnet
export function createHud(root: HTMLElement, session: GameSession, board: BoardView): Hud;
// src/tutorial/tutorial.ts   owner: sol
export function createTutorial(root: HTMLElement, session: GameSession): Tutorial;
```

## 6. Config files

| File | Owner | Exports |
|---|---|---|
| `src/config/spread.ts` | opus | `SPREAD: SpreadConfig`, `ANIMATION: AnimationConfig` |
| `src/config/map.ts` | deepseek | `MAP: MapConfig` |
| `src/config/economy.ts` | astra | `ECONOMY: Pick<GameConfig, 'resources' \| 'startingResources' \| 'buildings' \| 'rosters' \| 'combos' \| 'terrainBonuses' \| 'zoneModifiers' \| 'adjacencyAmount' \| 'thresholds' \| 'demolishRefundRatio' \| 'reshufflesPerRun'>` |
| `src/config/index.ts` | opus | `DEFAULT_CONFIG: GameConfig` = `{ ...ECONOMY, spread: SPREAD, map: MAP, animation: ANIMATION }` |

Every undecided value (GAME_DESIGN §53) carries a `// PLACEHOLDER` comment.
