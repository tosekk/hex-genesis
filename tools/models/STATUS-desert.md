# Astra-2 — Desert terraformer core

VALIDATED AND PROMOTED: scoped commit/push pending.

## Scope and decisions

- Designer's explicit file list overrides the generic agent ownership/status location. Only desert tooling/output and, after validation, `src/assets/models/core_desert.glb` are authorized.
- RENDER_STYLE_SPEC model conventions and GAME_DESIGN §10: a static core only, no gameplay or renderer changes. The supplied concept and explicit colors define the geometry; no terrain tile stack or modeled outlines.
- Use the forest geometry primitives and GLB writer read-only. A desert-local builder owns the palette without mutating the shared palette. Front is +Z.
- Eight uniformly spaced, outward-tilted mirrors; three architectural terraces; two front diagonal stairs; three shrines. Omit the optional upper light beam to keep the crystal and petal tips the highest points.

## Regenerate and validate

```sh
node tools/models/build-core-desert.mjs
npx vitest run --config tools/models/vitest.config.mjs tools/models/core-desert.test.ts
```

## Result

- **1,494 triangles**, 4,482 split vertices, **207,524 bytes**, one white opaque material, zero textures/images/UVs/animations.
- Authored bounds: **min (-0.720, 0, -0.720), max (+0.720, 1.180, +0.720)**; radius **0.720**, height **1.180**, Y-up with bottom-center pivot. Dimensions are within limits before loader normalization.
- **Sol production validation: ACCEPTED; fallbackReasons = []** via `inspectGLB → GLTFLoader → normalizeModel → ModelAssets`. One merged part. Normalized bounds: min (-0.732203, 0, -0.732203), max (+0.732203, 1.200000, +0.732203); radius 0.732203. Loader uniformly enlarges the model to its height limit.
- **84 emissive vertices**, all and only amber crystal/window/pool colors, with `_EMIT=1` and AO=1. Other vertices have `_EMIT=0`; minimum AO is 0.90. Exact specified sRGB palette is converted to linear COLOR_0 RGB; alpha carries AO only.
- **5 tests pass**: byte-identical promoted asset; outward/closed custom primitive winding; reproducibility, format, triangle budget, nondegenerate flat facets and bounds; palette/AO/glow semantics; real loader acceptance with empty fallback map. Validation JSON is in `out/core_desert.validation.json`.
- `npm run typecheck` passes. Tool test also typechecks independently: `npx tsc --ignoreConfig --noEmit --target ES2022 --module ESNext --moduleResolution bundler --strict --skipLibCheck --types vite/client,node tools/models/core-desert.test.ts` (tools are outside the production tsconfig include).
- Browser review uses the actual GLB, production loader and Sol illustrated fill/ink shaders. Front, three-quarter and back checked; both stairs, three front-facing shrine windows, terracotta bands, amber pool, floating crystal and eight mirrors are visible across these views. No browser warnings/errors. Mirrors tilt outward 31.5 degrees, with tips at y=0.982737; crystal tip at y=1.18. Cream reverse faces keep front petals readable; terracotta side bevels supply thickness. Preview floor and shader ink are not modeled into the asset.
- Generated and promoted GLB SHA-256: `4f1d2313640360edba653d84c7a0c75b707ef0eabab972e9b8537e81e21a1b65`.

## Feature inventory and triangle allocation

| Region | Contents | Triangles |
|---|---|---:|
| Ziggurat/stairs | Three beveled octagonal sandstone tiers, two terracotta bands, two six-step grey stairs with cream sloping parapets; 0.01-thick sand rim | 456 |
| Shrines | Three cream block shrines with sage clasps/panels and amber window slits; front terracotta plaque with amber slit | 278 |
| Mirrors/arms | Eight thick pentagonal mirrors with cream faces, terracotta bevels, short cream arms, sage clasps and dark green joints | 464 |
| Drum/crystal | Two hollow stone rings, flat amber pool, floating elongated rhombic bipyramid | 148 |
| Base details | Five grey rocks and three three-leaf sage tufts | 148 |

The initial draft exceeded budget (1,648); eight-sided drum rings and simpler faceted rocks brought it to 1,494 without removing requested features. No optional light beam, tile stack or modeled outlines.

## Preview and promotion

```sh
npx vite --config tools/models/vite.config.mjs
# http://127.0.0.1:4198/tools/models/preview-desert.html
```

For future geometry revisions, validate the generated artifact before copying:

```sh
node tools/models/build-core-desert.mjs
npx vitest run --config tools/models/vitest.config.mjs tools/models/core-desert.test.ts -t 'keeps|is reproducible|passes'
cp tools/models/out/core_desert.glb src/assets/models/core_desert.glb
npx vitest run --config tools/models/vitest.config.mjs tools/models/core-desert.test.ts
```

Designer authorized promotion and push in the kickoff request; the shipping GLB is byte-identical to the tested artifact. No renderer or game files were changed. Full-board FPS and designer aesthetic approval were not measured by this asset task.

## Shared checkout

Unrelated `.gitignore`, shared `geometry.mjs`, Arctic tooling and Sol changes appeared during work. Astra-2 did not edit, stage, revert or test other agents' files. DesertBuilder overrides palette handling locally and does not depend on the concurrent shared-helper palette constructor addition.
