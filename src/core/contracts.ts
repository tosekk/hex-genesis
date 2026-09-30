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
  /** Optional, presentation only: floating payout numbers over hexes, in event order. Never mutates state. */
  showPayouts?(state: Readonly<GameState>, events: PayoutEvent[]): void;
  /** Optional, presentation only (UI_SPEC): highlight one building slot on a hex, e.g. the slot the journal HUD
   *  is about to build into. null clears it. Never mutates state; a BoardView without it simply shows no slot cue. */
  setSlotHighlight?(pick: { hexId: HexId; slot: SlotIndex } | null): void;
  update(dtMs: number): void;
  resize(): void;
  dispose(): void;
}

export interface Hud { dispose(): void; }
export interface Tutorial { dispose(): void; }
