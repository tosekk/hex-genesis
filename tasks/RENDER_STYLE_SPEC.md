# Render Style Spec v1: "illustrated low-poly" with vertex colors only

**Designer, 2026-10-01 03:05.** Owner: **sol** (`src/render/**`, `src/assets/models/**`).
**Target look:** architectural illustration meets chunky low-poly mobile-game assets. References in `tasks/refs/style/`:
1. `1-architectural-diagram.webp`: muted palette, ink outlines, axonometric clarity, terracotta accents;
2. `2-toy-mobile-3d.webp`: chunky, rounded-bevel toy shapes, soft ambient occlusion, clean flat colors;
3. `3-isometric-illustrated-city.webp`: crisp ink linework, flat pastel fills, gentle shading bands.

## Hard rule: vertex colors only, no textures

- Every model (procedural and GLB) is colored **only by vertex colors** (`COLOR_0` in GLB). **No texture maps** of any kind: no albedo, normal, roughness or AO maps.
- Flat-shaded, faceted low-poly. A color changes only at geometry edges (split vertices), never as a painted gradient.
- An optional **baked AO in the vertex color alpha** (or a second attribute `_AO`) is allowed and encouraged: soft darkening in creases, under roofs, at the base.

## One shared stylized material: `createIllustratedMaterial()` in `src/render/materials.ts`

Built on `MeshLambertMaterial` + `onBeforeCompile` (or a small `ShaderMaterial`); WebGL only, no new dependencies. Used by buildings, cores, decorations and GLB models (and ideally tile tops too).

- **Vertex color** as the base; `instanceColor` multiplies it (the existing instancing keeps working).
- **Stepped lighting:** 3 soft bands (lit / mid / shadow) from one warm key light (top left, matching the UI). A cool hemisphere fill keeps shadows colored, never black.
- **Baked AO** from the vertex alpha (or `_AO`), strength uniform.
- **Rim light:** a subtle light-cream rim to separate silhouettes against the grey dead land.
- **Ink outlines**, either:
  - (a) an **inverted-hull** second pass per instanced mesh (back-face, pushed along the normal, ink `#2E2A25`, width scaled with camera distance), **or**
  - (b) a **screen-space edge pass** (normal and depth edges) via `EffectComposer` from `three/examples`.

  Pick whichever holds **60 fps on a full 20×14 board** (840 buildings + 8 cores). Outline width about 1–1.5 px at the default zoom.
- **Emissive accent** from a vertex-color flag (e.g. alpha = 1 plus a `_EMIT` attribute), for the core crystals and kilns, with no texture.
- **Optional paper grain:** a very subtle full-screen grain/tint post pass, matching the field-journal UI. Off by default; `?grain=1`.

## Palette (for the vertex colors of new models)

- **Ink** `#2E2A25`; **terracotta** `#D9826B` (cores and important accents only); **deep sage** `#5F7D6B`; **mint** `#B5D6C9`; **cream** `#F4E6CC`; **warm wood** `#9C6B4A`; **stone** `#B8B2A7`.
- **Biome accents:** the `BIOME_COLORS` in `src/render/palette.ts`.
- Aim for 4–6 colors per model.

## GLB model conventions (for the designer and AI-generated models)

- **File and orientation:** `src/assets/models/<buildingId>.glb` or `core_<biome>.glb` (`core_forest`, `core_desert`, `core_arctic`). Y-up, 1 unit = 1 hex radius, pivot at the bottom center on y = 0.
- **Building footprint:** inside a circle of radius **0.28**, height ≤ 0.5, **300–600 triangles**.
- **Core footprint:** fits the hex top (circle of radius ≈ 0.8), height ≤ 1.2, ≤ 1,500 triangles. The core hex holds no buildings (§10).
- **Blender export:** glTF 2.0 binary, **Include → Color Attributes** (vertex colors) on, flat shading (no smooth normals), modifiers applied, **one material with no textures**, and no cameras or lights.

## Rollout (keep it safe)
1. Behind **`?style=illustrated`** first. The default look stays unchanged until the designer approves it in the browser.
2. The procedural buildings and cores switch to the shared material; GLBs load via `import.meta.glob` + `GLTFLoader` with a procedural fallback (see "GLB models" in `tasks/gpt-6.1-sol.md`).
3. Measure fps (settled + during a spread wave) at 20×14 and 30×20 and log it in the sol status file.
4. **Done when:** the designer approves the look, ≥ 60 fps on a full board, and zero texture maps in any loaded material (assert it in a test).
