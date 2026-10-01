# Astra-2 — remaining Forest buildings

**COMPLETE — four models built, validated and promoted to their designer-authorized shipping paths.** The commit for this batch includes only the five owned building-tooling files, these four models' generated outputs/reports, and the four approved `src/assets/models/<id>.glb` files.

## Batch 2 results

All four pass **Sol's real `inspectGLB → GLTFLoader → normalizeModel → ModelAssets` pipeline**, with **no fallback reasons**, one mesh/one white opaque material, and no textures. Each promoted GLB is byte-identical to the validated generated output.

| Building | Triangles | Authored minimum XYZ | Authored maximum XYZ | Radius | Loader result |
|---|---:|---|---|---:|---|
| `hillside_mine` | 466 | (-0.214345, 0.000000, -0.231662) | (0.214345, 0.395632, 0.231662) | 0.270000 | ACCEPTED; no fallback |
| `sawmill` | 594 | (-0.218250, 0.000000, -0.156250) | (0.218250, 0.409500, 0.156250) | 0.268416 | ACCEPTED; no fallback |
| `gatherers_hut` | 594 | (-0.182908, 0.000000, -0.188045) | (0.182908, 0.422424, 0.188045) | 0.227100 | ACCEPTED; no fallback |
| `farm` | 588 | (-0.183475, 0.000000, -0.195182) | (0.183475, 0.424000, 0.195182) | 0.267879 | ACCEPTED; no fallback |

Y-up; bottom-center pivot at y=0; authored height ≤0.5 and radius ≤0.28; flat split-vertex normals/colors; linear `COLOR_0` RGB with AO alpha; float `_EMIT`. The **mine lantern alone has `_EMIT=1` (36 vertices)**. All other vertices, including the sawmill's cyan water, use `_EMIT=0`.

## Batch 2 regeneration

```sh
node tools/models/build-buildings.mjs hillside_mine sawmill gatherers_hut farm
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts -t 'reproducible|accepted'
# After validation, copy only these four explicitly authorized assets:
cp tools/models/out/hillside_mine.glb src/assets/models/hillside_mine.glb
cp tools/models/out/sawmill.glb src/assets/models/sawmill.glb
cp tools/models/out/gatherers_hut.glb src/assets/models/gatherers_hut.glb
cp tools/models/out/farm.glb src/assets/models/farm.glb
npx vitest run --config tools/models/vitest.config.mjs tools/models/buildings.test.ts
npx tsc --ignoreConfig --noEmit --target ES2022 --module ESNext --moduleResolution bundler --strict --skipLibCheck --types vite/client,node tools/models/buildings.test.ts
```

- `hillside_mine`: `node tools/models/build-buildings.mjs hillside_mine`. Normalized bounds (-0.222284, 0.000000, -0.240243) → (0.222284, 0.410285, 0.240243); radius 0.280000; minimum AO 0.94. SHA-256 `10c659795235a1ff5092cf9dab29d39c9bf1ee50c0506d09482976d31502a31a`.
- `sawmill`: `node tools/models/build-buildings.mjs sawmill`. Normalized bounds (-0.227669, 0.000000, -0.162993) → (0.227669, 0.427173, 0.162993); radius 0.280000; minimum AO 0.94. SHA-256 `e3cbd319c6091041ca56b3f87d2bbfa6cdf8823364bce830127ddcd6a0c6a7f0`.
- `gatherers_hut`: `node tools/models/build-buildings.mjs gatherers_hut`. Normalized bounds (-0.216499, 0.000000, -0.222579) → (0.216499, 0.500000, 0.222579); radius 0.268806; minimum AO 0.92. SHA-256 `5beee673b1686bc580242ef8d5288f1248f4a6379510c25b4a244e92fbf090d2`.
- `farm`: `node tools/models/build-buildings.mjs farm`. Normalized bounds (-0.191777, 0.000000, -0.204014) → (0.191777, 0.443186, 0.204014); radius 0.280000; minimum AO 0.94. SHA-256 `178a923baf9a718192e6dae70ddc62414a134f39cf3f277c3b9627dee78bbdba`.

Named arguments rebuild only the requested models; no arguments regenerate the full seven-model building collection. Generation prints bounds/triangle counts and writes `<id>.report.json`; the real-loader tests write `<id>.validation.json`.

## Batch 2 decisions and feature inventory

- The explicit designer instruction to simplify this batch takes precedence over the earlier lumber-camp request for yard details. No grass tufts, pebbles, fences, ground plates or tile layers. The mine's two requested loose rocks are retained. Its green caps are face-color patches on the shoulder outcrops, with no separate floating cap geometry.
- Shared `geometry.mjs`, `glb-writer.mjs`, other sessions' tooling and assets remain untouched. The existing building helper now supports an optional emission flag (default zero) and a star-shaped saw plate with a center-fan triangulation. Existing lumber camp, quarry and ice drill GLBs and reports remain unchanged.
- **Hillside mine:** broad faceted rock mound above the timber portal; grass-green shoulder facets; near-black tunnel; dark iron corner caps; hanging amber lantern on a separate arm; timber cart with iron side frames, four wheels and three stones; two rails/three sleepers and two loose rocks. Rock bottoms meet the contact plane; the lantern sits forward of the mouth so it remains visible.
- **Sawmill:** open four-post shed on stone feet, bracket accents, sage tiled gable and ridge caps; ten-tooth grey saw plate with dark hub; bark log with cream end and one wood growth ring; short carriage rails; left wheel with six paddles, three diametric spokes and a thick polygonal rim; cyan chute from a small stone block; three cream planks on two bearers. The growth ring is a colored annulus, not an ink outline.
- **Gatherer's hut:** round plank-colored walls on a stone base; two overlapping faceted thatch tiers; five poles tied at the apex; dark framed door, sage awning and two steps; two A-frames with crossbar, two hanging herb bundles and one cream berry string; banded basket with three red berries and two white mushrooms; two terracotta-cap mushrooms by the entrance. Broad basket bands and roof facets replace tiny woven/thatch details.
- **Farm:** timber barn with seams on all four sides; closed gables under a four-panel gambrel roof, cream edge trim and wooden ridge caps; cream X-braced door and framed loft window; two-post lean-to with three hay bales; three narrow tilled strips (one row of three wheat spikes and two rows of green sprouts); terracotta-shirt scarecrow with straw hat. The crop strips occupy only the crop plot, never a full asset base plate.
- Palette stays in the lumber camp's wood/sage/cream/stone family. Extra requested accents: rock shadow #8F8A82, grass caps #6E8F4E, tunnel #2E2A25, amber #F5C26B, saw #C8C8C8, wheel #7A4E33, cyan #7FD3D0, planks #EAD9B5, straw #E3CF9A/#CBB57E, rope tie #D9C7A0, herbs #5F8A5A, basket #A06A3E, berries #C0443A, hay #D9B65A, wheat #D9B04A, soil #6B4A33, shirt #C8664E. Exact per-model regions/counts are in the generated reports.

## Batch 2 verification and preview

- **25 scoped tests pass**, including original building regressions and each new asset's deterministic bytes, budget, bounds/pivot, palette/AO/emission, nondegenerate flat faces, real-loader acceptance, and exact shipping-copy parity. The saw plate joins the closed/outward-winding primitive checks.
- **Scoped strict TypeScript check passes** for `buildings.test.ts` and its imported production modules. No production code/config changes were needed.
- Browser review through the actual illustrated shader: all four checked, mine front/lantern, sawmill left wheel/chute, hut roof overlap/rack, farm front and rear/gable fit. The preview's new **Left side** view exposes the wheel and drying rack. Full-board performance and final designer aesthetic approval are not claimed by this isolated model review.
- Preview: `npx vite --config tools/models/vite.config.mjs`, then `http://127.0.0.1:4198/tools/models/preview-buildings.html?model=hillside_mine` (or any of the other three IDs). Seven model selectors, front/three-quarter/left/back, turntable and illustrated/default controls are available.
- Unrelated `itch/PAGE.md` and `APPENDIX.md` checkout work is outside this task and left untouched. No shared or other-session files were changed or staged.

---

## Earlier building work (historical)

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
