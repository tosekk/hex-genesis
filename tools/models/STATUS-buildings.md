# Astra-2 — Lumber camp, quarry and ice drill

VALIDATED AND PROMOTED — scoped commit/push pending. Designer-authorized building assets only. New building tooling/output and the three validated shipping GLBs are the complete write scope.

## Decisions

- Follow the explicit building concepts and palette; simplify to readable silhouettes and the listed props. No fences, vegetation, ladders, pebbles, tiny trims, modeled ink, or ground plates.
- GAME_DESIGN §10 / RENDER_STYLE_SPEC: these are static building models sharing tile space, with radius ≤0.28, height ≤0.5, and ≤600 triangles each. No game or renderer changes.
- Lumber camp omits the optional pine. Quarry terraces are the extracted sandstone body, not a terrain tile. Ice drill has only a local thin slab immediately around its water hole, not a platform under the hut/tank.
- New helper owns its palette without changing shared geometry or writer files. Front is +Z. Uniform authored fit preserves proportions and places the bounding-box bottom center at the origin.

## Commands

```sh
node tools/models/build-buildings.mjs
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts
```

## Results

All three models pass **Sol’s actual `inspectGLB → GLTFLoader → normalizeModel → ModelAssets` path**, with **`fallbackReasons: []`** and one merged part each. Each shipping GLB is byte-identical to the tested output.

| Model | Triangles | Authored min XYZ | Authored max XYZ | Radius | Bytes | Validation |
|---|---:|---|---|---:|---:|---|
| `lumber_camp` | 422 | (-0.196736, 0.000000, -0.180363) | (0.196736, 0.422000, 0.180363) | 0.266901 | 59,584 | ACCEPTED, no fallback |
| `quarry` | 434 | (-0.181685, 0.000000, -0.194500) | (0.181685, 0.429000, 0.194500) | 0.247793 | 61,232 | ACCEPTED, no fallback |
| `ice_drill` | 548 | (-0.188830, 0.000000, -0.161250) | (0.188830, 0.467000, 0.161250) | 0.248311 | 76,972 | ACCEPTED, no fallback |

All use Y-up, bottom-center pivot at y=0, a single white opaque material, flat split-vertex facets, linear COLOR_0 RGB with alpha AO, and `_EMIT=0`. No textures, images, UVs, skinning, animation, ground plate, tile layers, or modeled outlines. Minimum AO is 0.90 / 0.92 / 0.94 respectively. Authored scale is 1.0 for all three; they satisfy the limits before normalization.

## Per-building results

### `lumber_camp.glb`

Steep sage roof with broad lighter plank regions, wooden ridge caps, grey chimney courses, cream round gable window, dark door and small sage awning. Brown plank cabin on a grey foundation. Lean-to on two posts shelters six logs in a 3-2-1 stack, with cream cut end faces. Front stump and red-brown-handled grey axe. Optional pine omitted.

- Normalized min/max: (-0.206392, 0.000000, -0.189215) → (0.206392, 0.442711, 0.189215); radius 0.280000.
- Regenerate: `node tools/models/build-buildings.mjs` (deterministically rebuilds all three).
- Triangle allocation: cabin 108, roof 102, logs 156, stump-axe 56.
- SHA-256: `100edcc3cdcebf90848d592907568e28a9d4faa563616cf84d0f13f59ace94e8`.

### `quarry.glb`

Three U-shaped sandstone terraces leave an open pit. Wooden A-frame hoist, dark iron caps, horizontal boom and brace, terracotta pennant. Tan rope suspends a grey block and dark clamp clear of the terrace walls. Compact wooden cart with four dark wheels and two stone loads, two short rails, three loose blocks. Back crosspieces stop at the side pieces to prevent coplanar overlapping top faces.

- Normalized min/max: (-0.205299, 0.000000, -0.219780) → (0.205299, 0.484759, 0.219780); radius 0.280000.
- Regenerate: `node tools/models/build-buildings.mjs` (deterministically rebuilds all three).
- Triangle allocation: terraces 108, hoist 104, load 44, cart 142, loose-blocks 36.
- SHA-256: `a2838d51e498c59be47478227bfd42162adff073a68c79944e85cab086970b89`.

### `ice_drill.glb`

Tall mint tripod with cream feet/head and dark joints, central dark shaft and closed 24-segment two-turn auger flight, cream collar, dark-teal water disk in a local thin ice ring. Lower six-facet quonset with cream walls, sage roof, aligned white snow cap and porthole. Short dark pipe connects a cream/sage tank on a tiny wooden stand; its diagonal terracotta stripe follows actual mesh edges. One faceted ice chunk. Tripod is the highest element.

- Normalized min/max: (-0.202174, 0.000000, -0.172645) → (0.202174, 0.500000, 0.172645); radius 0.265858.
- Regenerate: `node tools/models/build-buildings.mjs` (deterministically rebuilds all three).
- Triangle allocation: hole 54, tripod 120, auger 178, hut 64, tank 124, ice-chunk 8.
- SHA-256: `275af49abd95ea3f0494b93fac3fbc13bec820d73068e39945862be363d074b0`.

## Verification

- **11 scoped tests pass**: custom primitive closed/outward winding and upward roof normals; current slot-anchor clearance; reproducible GLB/format/palette/flat normals/nondegenerate triangles/budget/pivot checks for each building; real-loader acceptance for each; byte parity of all three promoted assets.
- At the production `SLOT_ANCHORS`, even maximum-radius 0.28 circles retain **more than 0.11 units clearance** from each other and stay inside the tile incircle. This bound also covers any rotation.
- Repository `npm run typecheck` passes. The offline test also typechecks with: `npx tsc --ignoreConfig --noEmit --target ES2022 --module ESNext --moduleResolution bundler --strict --skipLibCheck --types vite/client,node tools/models/buildings.test.ts`.
- Browser review: each asset inspected in illustrated and default lit material, including front/three-quarter and rear views across the review. Wide and narrow preview layouts checked. No browser warnings/errors. The preview uses the real loader and illustrated shaders; its default MeshStandardMaterial and lights provide a separate vertex-color check, not a claim of identical full-board lighting.
- Full-board GPU performance and designer aesthetic sign-off are not measured by this isolated asset task.

## Preview and future revisions

```sh
npx vite --config tools/models/vite.config.mjs
# http://127.0.0.1:4198/tools/models/preview-buildings.html
```

Validate changed outputs before promotion, then run all tests including shipping parity:

```sh
node tools/models/build-buildings.mjs
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts -t 'winds|keeps|reproducible|accepted'
cp tools/models/out/lumber_camp.glb src/assets/models/lumber_camp.glb
cp tools/models/out/quarry.glb src/assets/models/quarry.glb
cp tools/models/out/ice_drill.glb src/assets/models/ice_drill.glb
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts
```

## Shared checkout

No shared helper, writer, config, existing status, core asset/tooling, renderer, or gameplay file was edited. Other agents’ unrelated changes were left untouched. Explicit paths only are used for staging and committing.
