# Astra-2 — Lumber camp, quarry and ice drill

ICE DRILL REVISION COMPLETE — validated and promoted in **2014d47** (`[astra-2] models: rebalance ice drill and restore snowy props`); this status update accompanies the requested push to `origin/main`. Designer requested a smaller derrick relative to the hut and the missing crates, ice blocks and snow. Initial three-building version: **1e5cc6c**; the revised asset supersedes that ice drill. Only owned tooling/status/output and `src/assets/models/ice_drill.glb` changed.

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
| `ice_drill` | 590 | (-0.229205, 0.000000, -0.190308) | (0.229205, 0.347307, 0.190308) | 0.270000 | 82,764 | ACCEPTED, no fallback |

All use Y-up, bottom-center pivot at y=0, a single white opaque material, flat split-vertex facets, linear COLOR_0 RGB with alpha AO, and `_EMIT=0`. No textures, images, UVs, skinning, animation, ground plate, tile layers, or modeled outlines. Minimum AO is 0.90 / 0.92 / 0.94 respectively. Lumber/quarry authored scale remains 1.0. Ice drill uniformly fits its expanded props at scale 0.952832; all satisfy limits before loader normalization.

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

Rebalanced to the reference: shorter, slimmer tripod and substantially larger quonset hut. Hut wall/roof body now reaches about 61% of total derrick height (previously 28%); the snowy roof reaches about 63%. The derrick remains the highest feature. Added two snow-topped wooden supply crates, two ice blocks including a tall shard, broad white roof snow banks, a chimney, doorway frame/window and entrance step. Tank moved aside to expose the doorway; snow also rests on its wooden support. The auger is narrower, with 16 coarse spiral segments; triangle savings go to the missing reference details. No ground plate or terrain layers.

- Normalized min/max: (-0.237694, 0.000000, -0.197356) → (0.237694, 0.360170, 0.197356); radius 0.280000.
- Regenerate: `node tools/models/build-buildings.mjs` (deterministically rebuilds all three).
- Triangle allocation: hole 54, tripod 120, auger 130, hut 88, roof-snow 16, tank 102, crates 56, ice-chunks 24.
- SHA-256: `415264d2a48fb9d2ad79688142060815118f58f47694646c9c77f2cb420a0774`.

## Verification

- **12 scoped tests pass**: ice drill hut-to-derrick height and restored snow/crate/ice regression; custom primitive closed/outward winding and upward roof normals; current slot-anchor clearance; reproducible GLB/format/palette/flat normals/nondegenerate triangles/budget/pivot checks for each building; real-loader acceptance for each; byte parity of all three promoted assets.
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
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts -t 'substantial|winds|keeps|reproducible|accepted'
cp tools/models/out/lumber_camp.glb src/assets/models/lumber_camp.glb
cp tools/models/out/quarry.glb src/assets/models/quarry.glb
cp tools/models/out/ice_drill.glb src/assets/models/ice_drill.glb
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts
```

## Shared checkout

No shared helper, writer, config, other status, core asset/tooling, renderer, or gameplay file was edited. Lumber camp and quarry generated/shipping bytes remain unchanged by the revision. Other agents’ unrelated changes were left untouched. Explicit paths only are used for staging and committing.
