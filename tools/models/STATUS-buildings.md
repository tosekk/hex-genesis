# Astra-2 — Lumber camp, quarry and ice drill

LUMBER CAMP REVISION COMPLETE — validated and promoted in **76ed78a** (`[astra-2] models: restore lumber camp reference details`); this status update accompanies the requested push to `origin/main`. Restored the designer-requested reference yard and architecture. Earlier commits: initial buildings **1e5cc6c**, corrected ice drill **2014d47**. Only owned tooling/status/output and `src/assets/models/lumber_camp.glb` change in this revision.

## Decisions

- Follow the explicit building concepts and palette. The later designer correction authorizes the lumber reference pine, fence, rocks, and plant tufts previously omitted under the simplification instruction. Retain the hard 600-triangle limit and no ground plates, tile layers, or modeled ink.
- GAME_DESIGN §10 / RENDER_STYLE_SPEC: these are static building models sharing tile space, with radius ≤0.28, height ≤0.5, and ≤600 triangles each. No game or renderer changes.
- Lumber camp now includes the three-tier pine and reference yard. Quarry terraces are the extracted sandstone body, not a terrain tile. Ice drill has only a local thin slab immediately around its water hole, not a platform under the hut/tank.
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
| `lumber_camp` | 600 | (-0.229797, 0.000000, -0.169484) | (0.229797, 0.370049, 0.169484) | 0.270000 | 84,152 | ACCEPTED, no fallback |
| `quarry` | 434 | (-0.181685, 0.000000, -0.194500) | (0.181685, 0.429000, 0.194500) | 0.247793 | 61,232 | ACCEPTED, no fallback |
| `ice_drill` | 590 | (-0.229205, 0.000000, -0.190308) | (0.229205, 0.347307, 0.190308) | 0.270000 | 82,764 | ACCEPTED, no fallback |

All use Y-up, bottom-center pivot at y=0, a single white opaque material, flat split-vertex facets, linear COLOR_0 RGB with alpha AO, and `_EMIT=0`. No textures, images, UVs, skinning, animation, ground plate, tile layers, or modeled outlines. Minimum AO is 0.90 / 0.92 / 0.94 respectively. Quarry authored scale remains 1.0; lumber camp uniformly fits at 0.858581, and ice drill at 0.952832; all satisfy limits before loader normalization.

## Per-building results

### `lumber_camp.glb`

Reference details restored: a three-tier sage pine clearly visible at the front-left, two wooden fence runs on three posts, two chunky grey stones, three two-leaf tufts, two stone entrance steps, an inset plank door with frame and handle, a larger cream window rim, a genuinely hollow chimney mouth, and plank divisions on the awning and lean-to roofs. Raised the wall/gable to close the roof gap discovered during rear-view inspection. The stump keeps its cut top and axe, with darker bark facets. Five logs remain under the two-post lean-to (within the requested 5–6). No ground plate.

- Normalized min/max: (-0.238308, 0.000000, -0.175762) → (0.238308, 0.383754, 0.175762); radius 0.280000.
- Regenerate: `node tools/models/build-buildings.mjs` (deterministically rebuilds all three).
- Triangle allocation: cabin 108, roof 110, entrance 42, logs 142, stump-axe 56, pine 42, fence 60, rocks 16, plants 24.
- SHA-256: `8f4023ee1fff6cb72096fc628ebdd98912d4a573c357a10840e5ed38c91df4e9`.

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

- **13 scoped tests pass**: lumber reference yard/entrance retention; ice drill hut-to-derrick height and restored snow/crate/ice regression; custom primitive closed/outward winding and upward roof normals; current slot-anchor clearance; reproducible GLB/format/palette/flat normals/nondegenerate triangles/budget/pivot checks for each building; real-loader acceptance for each; byte parity of all three promoted assets.
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
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts -t 'reference yard|substantial|winds|keeps|reproducible|accepted'
cp tools/models/out/lumber_camp.glb src/assets/models/lumber_camp.glb
cp tools/models/out/quarry.glb src/assets/models/quarry.glb
cp tools/models/out/ice_drill.glb src/assets/models/ice_drill.glb
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts
```

## Shared checkout

No shared helper, writer, config, other status, core asset/tooling, renderer, or gameplay file was edited. Quarry and ice drill generated/shipping bytes remain unchanged by the lumber revision. Other agents’ unrelated changes were left untouched. Explicit paths only are used for staging and committing.
