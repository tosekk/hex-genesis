# Release image handoff

**V5 capture skipped: no release images have been captured or delivered.**

The native browser was available for V1–V4 visual checks, but disappeared before
release capture. Both the existing Brave window and a fresh app lookup returned
`cgWindowNotFound`; the Safari fallback timed out. The task explicitly permits
skipping V5 without browser access. No renderer-only substitute is presented as a
browser screenshot.

When browser access returns, capture five gameplay screenshots at **1280×720**:

| Suggested scene | Candidate seed | Camera |
|---|---:|---|
| Restored rivers and bends | 15 | Default fitted view; zoom enough to show channel junctions |
| Mixed biome boundary | 7 | Default fitted view, after overlapping cores |
| Occupied three-slot hexes | 14 | Default view, then zoom to the settled buildings |
| Spread during tile flips | 5 | Default view, midway through the visible wave |
| Broad restored board with peaks | 17 | Default fitted view |

These seeds were visually inspected in V1, but the scenes above are **capture
candidates**, not a record of played or captured runs. Use the real game for
release screenshots; synthetic sandbox load boards and six-color QA sheets are
renderer diagnostics. Record actual seeds, camera angle/zoom, run state, capture
build hash, and final filenames here after capturing.

The default renderer uses a 42° perspective camera looking from normalized
`(0.35, 0.9, 0.95)` toward the board bounds' center and half its maximum height.
Right-drag/Q/E rotates, wheel zooms, middle-drag/WASD pans.

Also capture a **630×500** cover from a restored board, with **no title text**.
Keep browser chrome and diagnostic controls out of the exported images. Verify
the PNG pixel dimensions before upload; nothing in this folder is published.
