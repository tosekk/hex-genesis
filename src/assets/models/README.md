# Optional vertex-color GLB models

Models load in both the default style and `?style=illustrated`. Default uses the existing lit material with authored vertex colors; illustrated adds its shared stepped-light material and ink hulls. Missing, invalid, or over-budget files always use the unchanged procedural model. `core_forest.glb` is the supplied Forest core.

1. Name each building exactly like its ID in `src/config/economy.ts`, e.g. `sawmill.glb`, `farm.glb`, `glass_kiln.glb`. Names are case-sensitive.
2. Name biome cores `core_forest.glb`, `core_desert.glb`, `core_arctic.glb`. `core.glb` is not used. Each core keeps the first main biome visibly revealed on its hex, including after conversion.
3. Put the files in **this folder**, `src/assets/models/`. Restart Vite after adding/removing files, or rebuild the production bundle. Vite discovers the files with `import.meta.glob` and emits relative hashed asset URLs.
4. Open `http://localhost:5173/render-sandbox.html`, press **G** for the building gallery; **L** for the full board; **R** for a wave. In the game use `http://localhost:5173/?seed=7`; **Reshuffle** the opening offer once, choose **Forest**, and place its core to check `core_forest.glb`. Compare with `http://localhost:5173/?seed=7&style=illustrated` for illustrated lighting/ink. Substitute your Vite port if necessary.
5. Wait for loading. Buildings automatically replace their procedural instances without changing camera, selections, reveal timing, or game state. Cores switch when their own biome is visible. `[models] <id>: procedural fallback (<reason>)` at debug level explains rejected files.

## Blender export checklist (RENDER_STYLE_SPEC)

- glTF 2.0 **binary (.glb)**; self-contained, uncompressed. No Draco, Meshopt, or decoder dependency.
- **Y-up**, 1 unit = 1 hex radius. Apply transforms/modifiers. Pivot at **bottom center**, y = 0. Loader corrects pivot and uniformly scales to the footprint, preserving proportions and baking all node transforms.
- Building: inside radius **0.28**, height **≤0.5**, aim **300–600 triangles** (hard loader maximum 600 across all nodes).
- Core: inside radius **0.8**, height **≤1.2**, **≤1,500 triangles**. Its hex holds no buildings.
- Flat faceted shading; split vertices where face colors change. Use 4–6 colors from the illustrated palette and biome accents.
- Export **Include → Color Attributes** / vertex colors (**COLOR_0**) on. Use real mesh vertex colors, not a material texture bake. A file without COLOR_0 is rejected.
- **One material, no textures of any kind**: no albedo, normal, roughness, metalness, emissive, or AO maps; no embedded images. The loader rejects images/texture descriptors before GLTFLoader runs, and validates all loaded materials again. RGB remains vertex color; material base color is baked into it.
- Optional AO: COLOR_0 alpha, **1 = unoccluded, 0 = dark**; alpha never means transparency. Alternatively `_AO` float attribute, same convention. Optional `_EMIT` float attribute, **0 = shaded, 1 = emissive accent**. Both are preserved (GLTFLoader lower-case attribute aliases supported). Untextured material emission is baked as an emission flag if there is no `_EMIT`.
- No animations, skinning, morph targets, cameras, lights, or external buffer files. Static triangle meshes only.
- Export a single material whenever possible. Multiple source meshes sharing it merge into one geometry; up to four distinct materials are accepted and merged separately, but parts use the default lit vertex-color material, or share the illustrated material when that flag is active. More than four rejects to fallback to protect draw calls.

## QA / performance

Compare the default and flagged game at 1280×720 and 1024×640. Check colored facets, AO, ink silhouettes, crystal/furnace glow, bottom pivot, slots clear of neighbors, core biome identity, demolition/rebuild and New Run/disposal. For automatic settled + mid-wave instrumentation:

- `http://localhost:5173/render-sandbox.html?seed=7&load=1&wave=1&style=illustrated`
- Same URL plus `&cols=30&rows=20` for the larger stress board.

Record FPS and peak draw calls after the automatic 69-tile wave; require ≥60 FPS before approving. Tests cover a real tiny GLB constructed in memory, normalization, material merging, colors/AO, all three core files, no maps, packing, missing/invalid/budget fallbacks and late-load disposal. Tests are not a GPU measurement or visual approval.
