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
