# Astra — Arctic core result

**COMPLETE.** Generated `out/core_arctic.glb` and copied it byte-for-byte to the explicitly authorized `src/assets/models/core_arctic.glb`. Arctic helpers, tests and preview are isolated under `tools/models/`; shared `geometry.mjs` and `glb-writer.mjs` remain unchanged. The parallel model session's files were not edited or staged.

- **1,488 triangles**, 4,464 split vertices, **206,696 bytes**. One static mesh, one white opaque material, no textures, animations, tile layers or modeled outlines.
- Authored bounds: **min (-0.690, 0, -0.690), max (+0.690, 1.189, +0.690)**. Radius **0.690**, bottom-center pivot at y=0, Y-up, +Z front. All authored limits pass before normalization.
- **Sol's real loader ACCEPTED, no fallback reasons**: `inspectGLB → GLTFLoader → normalizeModel → ModelAssets`. Normalized bounds: min (-0.696384, 0, -0.696384), max (+0.696384, 1.200000, +0.696384); radius 0.696384. The loader uniformly scales height to 1.2; floating-point height is 1.200000048.
- Colors exist only in linear RGB `COLOR_0`, with AO in alpha (minimum 0.86). Float `_EMIT` is 0 or 1: **402 glowing vertices**, including the central crystal, spire, pillar/pedestal/clamp/collar slits.
- **Six scoped tests pass**: three Arctic checks (exact promoted copy, deterministic authored GLB/format/geometry limits, actual-loader acceptance), plus all three existing Forest regression checks. Forest output remains byte-identical.
- Visual check in the browser through Sol's actual illustrated fill/ink shaders: front and back checked; tapered four-strut silhouette, bright central crystal/spire, stairs, front emblem, snow caps, ice and exposed coolant pipes visible. The preview floor is display-only.
- SHA-256 for both generated and promoted GLBs: `586e0b03b19417c28270613b0d4001226f769aa890a19f50270ecd7c51b9de62`.

## Arctic regeneration and preview

```sh
node tools/models/build-core-arctic.mjs
cp tools/models/out/core_arctic.glb src/assets/models/core_arctic.glb
npx vitest run --config tools/models/vitest.config.mjs tools/models/core-arctic.test.ts tools/models/core-forest.test.ts
npx vite --config tools/models/vite.config.mjs
# Open http://127.0.0.1:4198/tools/models/preview-arctic.html
```

The generator prints its triangle count/bounds and writes `out/core_arctic.report.json`. The loader test writes `out/core_arctic.validation.json`. The preview has front, three-quarter, back, turntable and ink controls and links to the existing Forest entry.

## Arctic details and decisions

- Thin octagonal snow rim y=0–0.012 only; stepped octagonal cream platform with terracotta ring; paired three-step grey staircases and sloped cream walls.
- Four slate ring posts with mint slits and faceted snow caps; a separate front plaque post with slit and terracotta hexagonal emblem; four edge ice chunks.
- Cream octagonal central drum, terracotta seat, opaque glowing hexagonal crystal, four tapered cream struts with two slate clamps each, snow ledges and four downward icicles.
- Four swept square-section teal coolant pipes with dark elbow sections are offset between the struts so their bends remain visible. Cream and slate collars narrow toward the small mint crystal spire.
- Budget reduction preserves all requested features: square pipe sections, simpler snow-cap bevels, hexagonal cream top collars, four icicles, and omitted concealed snow-ledger bottom faces. Explicit concept colors take precedence over the generic 4–6-color recommendation.
- Arctic-only `ArcticModelBuilder` supplies its palette without mutating the shared helpers or Forest palette. No packages, production code, loader rules or render materials changed.

| Arctic color region | Source sRGB hex |
|---|---|
| Cream / light facets / stone trim | #D8CFC0 / #EAE0CF / #AAA69D |
| Terracotta / stair grey | #C8664E / #7E8282 |
| Dark slate / lighter housing | #4E5352 / #68706D |
| Snow / ice / pale ice facets | #F2F5F7 / #A9C8DD / #CFE2EE |
| Mint slits / crystal / lighter crystal | #8FE3C4 / #A8E6CF / #D6F5E8 |
| Teal coolant pipes | #5E7F78 |

| Arctic group | Triangles |
|---|---:|
| Snow, ice and icicles | 280 |
| Platform | 168 |
| Stairs | 120 |
| Pillars | 104 |
| Front plaque | 32 |
| Pedestal | 128 |
| Central crystal | 44 |
| Tower and clamps | 208 |
| Coolant pipes | 192 |
| Top collars | 180 |
| Spire | 32 |

The unrelated `.gitignore` change is outside this task and remains untouched. The Forest section below records its earlier, separate promotion authorization; Arctic promotion is authorized by the current designer request.

---

# Astra — post-submission Forest core

**COMPLETE — designer confirmed the jam build has been submitted and authorized committing the model.** Tooling remains under `tools/models/`. The sole authorized promotion outside that folder is the byte-identical `src/assets/models/core_forest.glb`.

## Commit gate

**Gate satisfied:** the designer explicitly confirmed submission in the next message and authorized two separate commits: forest tooling/output first, then just `src/assets/models/core_forest.glb` with message `[astra] models: core_forest.glb`. Push both. No other shipping file is authorized.

## Decisions

- Generator output remains only `tools/models/out/core_forest.glb`. The designer subsequently authorized copying this exact artifact to `src/assets/models/core_forest.glb` in a separate single-file commit.
- User's folder-only boundary takes precedence over the earlier instruction to update `tasks/status/astra.md`; this is the task-local status file.
- Explicit concept colors take precedence over the generic 4–6-color suggestion. Closely related light/dark facets stay in stone, sage, mint, wood, terracotta and leaf families.
- No modelled outlines, soil, rock tile layer or transparent crystal shell. The capsule is an actual open cage, and the preview uses Sol's real illustrated fill/ink shaders.
- Minimal GLB writer avoids DOM/exporter polyfills and extra packages. Three.js creates geometry; all surfaces use independent triangle vertices with linear COLOR_0 RGB, alpha AO and float _EMIT.

## Commands

```sh
node tools/models/build-core-forest.mjs
npx vitest run --config tools/models/vitest.config.mjs
npx vite --config tools/models/vite.config.mjs
# Open http://127.0.0.1:4198/tools/models/preview.html
```

## Result

- Output: `out/core_forest.glb`, **207,800 bytes**, **1,496 triangles**, 4,488 split vertices, one mesh/one white material, no textures or animations.
- Authored bounds: **min (-0.710, 0, -0.710), max (+0.710, 1.180, +0.710)**. Radius **0.710**, height **1.180**, bottom-center pivot at y=0; +Z is the front. All limits pass before normalization.
- Sol's actual `inspectGLB → GLTFLoader → normalizeModel → ModelAssets` path: **ACCEPTED**, one merged part, **no fallback reasons**. Normalized bounds: min (-0.722034, 0, -0.722034), max (+0.722034, 1.200000, +0.722034); radius 0.722034. The loader uniformly enlarges the asset to its 1.2 height limit, preserving proportions.
- Preserved glow/AO: **870 glowing vertices**, minimum AO **0.80**. All authored `_EMIT` values are float 0 or 1; COLOR_0 is linear RGB plus AO alpha. Material stays opaque and white; no material colors or textures carry the palette.
- **Three tests pass** using the isolated config: deterministic GLB/format/budget/colors/normals/pivot checks; outward, closed primitive winding regression; real-loader acceptance/normalization with empty fallback map. No production test/config changes.
- Browser visual check: actual GLB loaded through the real loader and Sol's illustrated fill/ink shaders; front and back checked. Sapling visible through the open cage, glowing rails/slits/roots preserved, two stair flights and front emblem visible. Four petals lean **26.5°** outward; tips at y=1.004 are **85.1%** of the 1.18 total height. The cap and gem are highest. The light display floor is preview-only and is not in the GLB.
- SHA-256: `b5d70de649dc6caf8a8b323d0c0b599062d24948d9e55c6b75c38d4f073985d9`.

## Feature inventory

Thin grass rim only (y=0–0.012); stepped cream/grey stone platform with terracotta band and front hexagon emblem; two three-step grey staircases; four stone posts with green slits; stepped drum with six sage-band slits; six glowing mint cage edges plus hollow top/bottom rings; crooked brown sapling with four faceted leaf diamonds and four glowing roots; cream hexagonal cap and green slit gem; four pointed sage petals on curved wooden ribs; four round stone hinges with glowing centers; five grey rocks and three two-leaf tufts. No soil/rock tile stack and no modelled ink.

## Triangle allocation

| Region | Triangles |
|---|---:|
| platform | 286 |
| pillars | 128 |
| pedestal | 180 |
| capsule | 180 |
| sapling | 148 |
| petals-ribs | 256 |
| hinges | 128 |
| cap | 78 |
| details | 112 |

## Color regions

Explicit concept hues plus light/dark facets; the generic 4–6-color recommendation is superseded by the user's specified regions. All colors live in COLOR_0.

| Region | sRGB source hex | Usage |
|---|---|---|
| Cream / light cream | #D8CFC0 / #EAE0CF | Platform, pillar caps, hinge discs and crown |
| Stone trim | #A8A196 | Stone bevels and pedestal trim |
| Grey | #8E8E8C | Stairs and rocks |
| Terracotta | #D9826B | Platform ring and front emblem |
| Sage / light sage / deep sage | #5F7D6B / #819B7E / #496457 | Petal facets, drum band and inset frames |
| Mint | #B5D6C9 | Six cage edges and two rings (_EMIT=1) |
| Green glow | #7BE0A8 | Post/drum/gem slits, hinge centers, roots (_EMIT=1) |
| Wood / light wood | #8B5A3C / #A67853 | Curved ribs, sapling trunk and branches |
| Leaf / light leaf | #6FAF6A / #96C481 | Sapling, tufts and gem facets |
| Grass green | #819B61 | Thin rim disk |

## Review / promotion

Use the standalone `preview.html` via the command above (front, three-quarter, back, turntable, ink toggle, orbit/zoom). Visual approval is the designer's decision. The submission gate is now satisfied. Promote only `core_forest.glb`; preserve the tooling/output commit and the requested single-file asset commit separately. The target GLB already present at handoff has the identical SHA-256 above; the explicit copy preserves that exact artifact. Three model tests pass again before promotion. No geometry, palette, budget or loader changes were made for promotion.


External checkout note: an unrelated `.gitignore` addition (`pres/`) appeared during this work. It was not edited, staged or reverted by Astra. No existing tracked `src` file was edited; only the explicitly authorized forest GLB is added.
