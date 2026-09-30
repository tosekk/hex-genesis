# UI Spec v1 — "Field Journal" HUD

**Status:** designer-approved on 2026-09-30, 18:00. Single reference for the UI rework. Owners: **sonnet** (HUD, journal, offer), **sol** (icons, render support, tutorial panel, audio settings), **opus** (one contract addition, wiring).
**Rules still apply:** undiscovered combos are never shown or previewed (§32, §38). No future spread information (§15, §24). The UI changes state only through `GameSession` commands. No new game mechanics.
**Safety net:** keep the current HUD reachable via **`?ui=legacy`** until the jam submission. The new HUD is the default only once U1 passes its DoD.

## 1. Visual language: field journal

| Token | Value | Use |
|---|---|---|
| paper | `#F4EAD5` (panel), `#E8DBBE` (inset / darker paper) | all panels and cards |
| ink | `#2E2A25` (lines, text), `#6B6257` (secondary text) | outlines 1.5–2 px, slightly irregular ("drawn"); text |
| terracotta | `#D9826B` | accents: cores, important numbers, the final goal, warnings |
| highlighter | `#F5D547` | **selection**: a marker-stroke outline or underline on the selected card, biome or slot chip |
| biome colors | import `BIOME_COLORS` from `src/render/palette.ts` | biome circles, card edges, tags |
| negative | `#C0503A` | unaffordable cost numbers, errors |

- **Fonts** (OFL, bundled as woff2 in `public/assets/fonts/`, with the license files): a hand-lettered heading font (e.g. *Patrick Hand* or *Caveat*) and a readable body font (e.g. *Nunito*). Numbers use tabular figures. Minimum text size 12 px.
- Panels: paper texture via CSS (subtle noise gradient, no image required), soft drop shadow, 6–10 px rounded corners, ink border. Journal "tape" or "paperclip" ornaments are optional CSS flourishes.
- **Icons:** the flat SVGs in `public/assets/icons/` (resources, biomes) plus sol's new building, terrain and core icons (§6). Always a text fallback if an icon is missing.

## 2. Layout (1280×720 reference; scales down to 1024×640)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ [Threshold stack]          [ wood ][ stone ][ water ][ food ]        [📖][⚙] │
│  T4 ▸ bars (current)             resource pills (top middle)     journal, menu│
│  T5 · T6 · T7 (collapsed)                                                     │
│  T8 ★ GOAL (pinned)          [toasts appear here, one at a time]              │
│  Slots left 212 / 540                                                         │
│                                                                               │
│ [Tutorial panel, sol]                  3D BOARD                               │
│                                                                               │
│┌──────────────┐  ┌──────────────── building deck ─────────────────┐   ◯ forest│
││ ◯ portrait   │  │ [CORE] [bldg] [bldg] [bldg] [bldg] [bldg] …    │  ◯     ◯  │
││ name · biome │  │  icon + name cards; hover → cost/yield pop-up  │ ◯   ◯   ◯ │
││ cost / yield │  └────────────────────────────────────────────────┘ desert arctic│
││ details      │                                                  biome triangle│
│└──────────────┘                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

## 3. Components

### 3.1 Resource pills (top middle)
One pill per resource (icon, current amount in large type, lifetime in small type). A brief pulse when the value changes.

### 3.2 Threshold stack (top left), shaped like a mission list
- **Current threshold** (expanded card): "Threshold N of 8", then one progress bar per required resource (`lifetime / target`). Zero targets are hidden. It says what it awards: "→ new core".
- The **next 2 thresholds** are collapsed cards (number and targets in small type). Earlier thresholds collapse into a row of small check marks.
- **T8 is always pinned at the bottom** in terracotta with a star: "GOAL — reach to win".
- Below it: **"Slots left X of Y"** (the S8 readout). Clicking it, or holding **Tab**, highlights hexes with empty slots (existing finder).

### 3.3 Biome triangle (bottom right)
- Corners: **forest (top), desert (bottom left), arctic (bottom right)**. Edge midpoints: **steppe** (forest–desert), **taiga** (forest–arctic), **polar desert** (desert–arctic).
- **Main circles:** colored when at least one core of that biome is held, with a small **count badge** (top right) when more than 1. **Grey** when none is held. They're always clickable (browsing).
- **Mixed circles:** grey until that mixed biome exists somewhere on the board, then colored. Never a badge (mixed biomes have no cores, §8). Clickable once colored.
- **Click = select that biome** (highlighter ring). The deck shows that biome's cards.
- **Follows the board:** selecting a tile or slot automatically selects that tile's biome here. Selecting a dead tile clears the selection.

### 3.4 Building deck (bottom middle)
- Cards: flat icon plus name, nothing else. The deck scrolls horizontally if needed (mixed biomes have 9 buildings).
- **Core card first** (main biomes only). Colored if a core of that biome is held (with a count badge), **greyed** if none is. Disabled with a reason label when a spread is active ("Terraforming…") or no legal site remains ("No legal site left").
- Then the **building cards** for that biome's roster, in roster order. Unaffordable cards are dimmed (still selectable, to read their details).
- **Hover pop-up** (a square note above the card): cost and base yield. If a slot is currently selected, show the **full preview** for that slot from `session.preview` (terrain, zone, and discovered combos only) instead.
- **Click = select the card** (highlighter outline). The detail panel updates. Clicking again deselects it.

### 3.5 Detail panel (bottom left), styled like the character card in the reference
- A round **portrait** (icon) plus name and biome tag. What the body shows depends on the focus:
  - **Building card:** cost, base yield, terrain bonuses that apply to it (from config), zone modifiers, **discovered** combos it belongs to (never undiscovered ones), count on board.
  - **Core card:** biome, cores held, one line on how spreads work ("spreads over dead land; climbing costs more; mixes where biomes meet").
  - **Selected tile or slot:** terrain, elevation, biome, "locked (terraforming)" if applicable, and 3 **slot chips**: empty or a building icon. Clicking a chip selects that slot; a filled chip shows **Demolish (+refund)**.

### 3.6 Top-right buttons
- 📖 **Journal** (§4). Shortcut **J**.
- ⚙ **Menu:** Help (the existing overlay, restyled), **Sound** (mute + volume, via sol's `audioSettings` API, §6), **End Run** (confirm dialog), **New Run** (with a seed field).

### 3.7 Toasts
Same logic as now (sequential, faster when backed up), restyled as small paper note slips under the resource pills. Base, combo and adjacency payouts get different ink stamps.

### 3.8 End screen
Restyled as a journal page: result, thresholds N/8, board used %, lifetime per resource, time, seed, New Run.

## 4. Journal (U2): a book with bookmark tabs on the right

- **Contents**, **Combos**, **Adjacency**, **Terrain**. **Buildings** is optional (only if time allows).
- **Combos:** one combo per spread. Left page: a **placeholder illustration** (a biome-colored hexagon with the 2–3 building icons in slot positions; baked renders replace it later). Right page: the recipe's buildings (icon + name), the **total build cost** (sum of the recipe's costs), and the **payout**. **Undiscovered combos: a big "?" on a dark ink circle in the middle of the page**, with no name, buildings or amounts. Page counter "7 / 21" plus prev/next arrows. The contents page lists discovered names only.
- **Adjacency: a "found" log** (designer option a). Each adjacency payout the player triggered this run: the two tiles' combos at that moment (names) plus the amount paid, newest first. Built in the UI from `payouts` events (`kind: 'adjacency'`, `hexId`, `neighborId`) by reading `currentComboMatches` for both hexes when the event arrives. Header text explains the rule once: "When a tile is completed for the first time, each neighbour with a combo pays once."
- **Terrain:** every terrain bonus rule from config, shown from the start (§24 doesn't hide them): terrain icon, affected buildings (icons), bonus amount. Plus a "Zone effects" section listing the zone modifiers per mixed biome.
- Opening the journal pauses nothing (there's no timer), dims the board, and closes on Esc or the tab again.

## 5. Interaction model

| Action | Result |
|---|---|
| Click a **building card**, then click an **empty slot** | Place it. The card **stays selected**, so later clicks keep placing (this replaces the repeat-build chip; **R** and **Shift+click** remain as shortcuts). |
| Click a **slot** (a slot chip or a slot on the board) | The slot is selected (**slot highlight**, §6). The triangle and deck jump to that tile's biome. Clicking a building card then **places immediately** into that slot, and selection **advances to the next empty slot** of the same tile. |
| Click the **core card**, then click a **legal site** (highlighted) | Place the core. The core card deselects afterwards. |
| Click a **filled slot** | Select it. The detail panel shows the building and **Demolish**. |
| **Esc** / right-click | Clear the current selection (card, slot, core mode). |
| Failed placement | The hex flashes `invalid`, a short reason appears near the cursor, the selection is kept. |
| **1 / 2** | Pick an offer (only while an offer is shown). |
| **Tab** (hold) | Empty-slot finder. **J** journal, **? / H** help. |

**Biome offer (U3):**
- Two **spheres fly out of the triangle** to the center over a dimmed board. Keys 1/2 or a click to choose. Reshuffle under them while available.
- On choice: the chosen sphere is lit by **god-rays** and flies back into its triangle corner; the other **shatters into shards and dissolves**. Implemented with CSS and a small 2D canvas particle effect (no 3D needed).
- **Build the simple version first** (fly in, glow, fade), then add rays and shards. Input stays blocked until it's resolved (§9).

## 6. Supporting work by other owners

| Owner | Item |
|---|---|
| **sol** | **24 building icons** `public/assets/icons/buildings/<buildingId>.svg`, in the same flat style as the biome icons; **terrain icons** `public/assets/icons/terrain/{mountain,water,woods,marsh}.svg`; a **core icon** `public/assets/icons/core.svg` |
| **sol** | **Audio settings API**: `src/audio/settings.ts` exporting `audioSettings` (`muted`, `volume`, `setMuted`, `setVolume`, `subscribe`). `createAudio(root, session, { controls?: boolean })`; with `controls: false`, the audio module renders no controls of its own. |
| **opus → sol** | **Slot highlight contract** (additive, optional): `BoardView.setSlotHighlight?(pick: { hexId: HexId; slot: SlotIndex } \| null): void`. opus adds it; sol renders it (a highlighter-yellow ring on that slot anchor). |
| **sol** | **Tutorial panel:** move it to the left side under the threshold stack, restyled as a journal note (paper, ink, handwritten title). The assistant face becomes an ink-sketch "device screen". Collapsible. |
| **opus** | Wiring in `src/main.ts`: `createAudio(…, { controls: false })`, the `?ui=legacy` switch between the old and new HUD, and any new root elements. |

## 7. Phases, in priority order

1. **U1 — new HUD** (sonnet): §1, §2, §3.1–3.7, §5 except the offer animation. **Target ~22:00.**
2. **U2 — journal** (sonnet): §4. **Target ~00:30.**
3. **U3 — offer spheres** (sonnet): §5 offer. Simple version first. **Target ~02:00.**

**Out of scope for the jam:** drag-to-place, 3D portraits and the bake tool, baked hex illustrations, adjacency recipes (post-jam design), a Buildings journal tab (optional).

## 8. Parallel split for U2/U3 (designer, 2026-10-01 00:55)

To finish early, U2 and U3 are built as **standalone modules by other agents**. Sol only wires them into the journal HUD. These signatures are agreed; changing one needs a note in both owners' status files.

### 8.1 Journal data helpers: astra, `src/sim/economy/journal.ts` (pure, tested)
```ts
export type ComboPage =
  | { locked: true; index: number }                       // undiscovered: nothing else, ever
  | { locked: false; index: number; id: ComboId; name: string;
      buildings: { id: BuildingId; name: string }[];      // recipe order
      totalCost: Resources;                               // sum of the recipe's building costs
      amount: Resources;                                  // payout
      biomes: Biome[] };                                  // biomes whose roster can build the whole recipe
export function comboPages(state: Readonly<GameState>): ComboPage[];      // config order; discovered-only enforced HERE
export interface AdjacencyLogEntry { hexId: HexId; neighborId: HexId; hexCombos: string[]; neighborCombos: string[]; amount: Resources; }
export function adjacencyLogEntry(state: Readonly<GameState>, e: PayoutEvent): AdjacencyLogEntry | null; // null unless e.kind === 'adjacency'
export interface TerrainRuleView { terrain: Terrain[]; buildings: { id: BuildingId; name: string }[] | 'any'; bonus: Resources; }
export function terrainRules(config: GameConfig): TerrainRuleView[];
export interface ZoneEffectView { biome: Biome; building: { id: BuildingId; name: string } | 'any'; delta: Resources; }
export function zoneEffects(config: GameConfig): ZoneEffectView[];
```

### 8.2 Journal book: sonnet, `src/ui/journal/**`
```ts
export interface Journal { open(tab?: 'contents' | 'combos' | 'adjacency' | 'terrain'): void; close(): void; isOpen(): boolean; dispose(): void; }
export function createJournal(root: HTMLElement, session: GameSession): Journal;
```
- It subscribes to the session itself (the adjacency log starts on `runStarted`).
- It uses §1 tokens and fonts from `public/assets/fonts/` (sol's). Esc closes it; J is wired by sol.
- Its own tests; undiscovered pages render **only** "?" (assert that the DOM contains no name, buildings or amounts).

### 8.3 Offer spheres: opus, `src/fx/offerSpheres.ts`
```ts
export interface OfferFx {
  present(o: { offer: BiomeOffer; from: DOMRect | null; canReshuffle: boolean;
               onChoose(i: 0 | 1): void; onReshuffle(): void }): void;  // own backdrop, blocks input, keys 1/2
  update(offer: BiomeOffer, canReshuffle: boolean): void;             // after a reshuffle
  resolve(chosen: 0 | 1, to: DOMRect | null): Promise<void>;          // god-rays + shatter/dissolve, then removes itself
  hide(): void; dispose(): void;
}
export function createOfferFx(root: HTMLElement): OfferFx;
```
- Respects `prefers-reduced-motion` (simple fade). The whole resolve takes ≤ 1.6 s.
- **The HUD calls `session.chooseOffer`,** never the FX.

### 8.4 Integration (sol, after the V15 DoD)
The 📖 button and **J** → `journal.open()`. On `offerShown` → `offerFx.present({ from: triangle bounding rect, … })`, and on `offerResolved` → `resolve(i, corner rect)`. Fall back to sol's simple modal if `createOfferFx` throws. Integrate each module **only once it's committed with passing tests**. Until then, the journal button shows "coming soon".

## 9. Journal material pass (designer, 2026-10-01 03:00): "it must look like a real field journal, not a flat white page"

**References** in `tasks/refs/journal/`:
- `target-1-teal-notebook.png` and `target-2-parchment-ribbons.png` are the **target look**: a physical book object in a game;
- `minimum-3-tablet-notebook.png` and `minimum-4-ring-journal.png` are the **minimum bar**: page curvature, a shaded spine, binding, depth.

**Scope:** the journal book overlay (`src/ui/journal/**`) first. **Stretch:** reuse the same paper material on the HUD panels (`src/ui/v2/**`), so everything feels like pages from the same journal.

**The book as an object:**
- **Cover:** a dark cloth or leather cover (deep green-teal `#2F4A44` or brown `#5A3E2B`) visible 12–20 px around the pages, with a stitched or embossed border line and rounded, slightly worn corners.
- **Thickness:** stacked page edges on the outer sides and bottom, via 3–5 layered offset box-shadows in paper tones.
- **Spine/gutter:** a dark gradient at the middle, pages slightly lighter toward their outer edges, a soft highlight on the curve. The two pages must read as curving into the spine (refs 3 and 4).
- **Binding (optional):** 3 ring clips on the spine (ref 4) *or* a sewn spine; pick one that fits the cover.
- **Paper:** a warm parchment base (`#F4EAD5` → `#EADBBE`) with **procedural grain** (an SVG `feTurbulence` noise as a **static data-URI background image**, not a live CSS filter), darker edge vignetting and a few faint stains. The right page gets faint ruled or grid lines (ref 3).
- **Ink ornaments:** corner flourishes and divider rules drawn as inline SVG in ink `#2E2A25`; section headers on a torn-paper label or ribbon banner (ref 2).
- **Tabs as physical bookmarks:** Contents, Combos, Adjacency and Terrain become **cloth ribbons** hanging below the book (ref 2) *or* **colored paper tabs** sticking out of the top edge (ref 1), with their own shadows. The active one is brighter and overlaps the page edge.
- **Illustration frame:** the combo illustration sits in a framed "photo" or medallion with a paper-clip or tape piece (refs 1 and 2). The undiscovered "?" medallion stays centered and dark.
- **Lighting and backdrop:** a soft warm light from the top left; a large drop shadow under the book; the board behind dimmed and blurred (`backdrop-filter: blur(3px)` with a solid-dim fallback).
- **Page turn (optional):** a 200–300 ms turn or slide when paging combos; with `prefers-reduced-motion`, an instant swap.

**Constraints:**
- CSS plus inline or data-URI SVG only. No new npm dependencies and no raster image files (unless the designer supplies them).
- No live SVG or CSS filters on large animated elements.
- The book fits and stays readable at **1280×720 and 1024×640** and scales with resizes. Text contrast ≥ 4.5:1. Fonts: the existing Patrick Hand and Nunito.
- **Hidden-information rules unchanged:** undiscovered pages show only "?".

**Done when:** the look reads as a physical journal at a glance, as in the references; the tests still pass (structure, undiscovered = "?" only); screenshots at both sizes are attached or described in the owner's status; the designer approves.
