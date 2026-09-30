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

## Photo mode (V7)

Open the game with `?photo=1`, for example
`http://127.0.0.1:5175/?seed=7&photo=1` during local play, or append the same flag
to the hosted game URL. Photo mode is off unless the value is exactly `1`.
It also works in `/render-sandbox.html?seed=7&photo=1`.

| Key | Action |
|---|---|
| F1 | Fitted overview from the default three-quarter angle |
| F2 | Lower, diagonal dramatic angle, fitted to the full board |
| F3 | Close-up of a filled visible hex; prefers the most occupied visible hex if none is full, or overview if no living placeable hex exists |
| F4 | Top-down view, fitted to the full board |
| P | Render a fresh frame and download the 3D canvas as PNG |
| Shift+P | Download a centered, aspect-preserving **630×500** cover crop |

Rotate/zoom/pan still work after choosing a preset. Offer keys **1/2** are
unchanged. Photo keys ignore typing fields, editable text, modifier shortcuts
(Ctrl/Command/Alt), and held-key repeats. In the sandbox, P becomes capture while
photo mode is on; use **Buildings + cores** to populate instead.

P exports the current **canvas drawing-buffer size**, including the renderer's
pixel ratio (capped at 2), rather than the browser-window size. Thus a 1280×720
CSS canvas at DPR 2 produces a **2560×1440** PNG. For exactly **1280×720**, size the
canvas to 1280×720 at DPR 1, or 640×360 at DPR 2, then verify the downloaded PNG's
dimensions. Shift+P always produces exactly 630×500; it crops rather than
stretching. Compose around the center before using it, particularly with F3.

Downloads are named `seed-<seed>-camera-<preset>-<width>x<height>.png`; covers add
`cover-` before the dimensions. Browser save dialogs may appear. The small photo
status shows the requested filename; a canceled save dialog does not create a
file. Camera numbers identify the last preset used; record any subsequent manual
rotation/zoom when documenting the capture.

Only the 3D canvas is exported: HUD, tutorial, photo status, browser chrome, and
DOM payout labels do not appear in the PNG. Photo mode does not hide or edit the
HUD. To take a whole-page screenshot with UI, use the browser's own capture tools;
the designer may hide overlays in devtools if desired. No title text is added.

V7 browser QA successfully exported and visually inspected a nonblank
2560×1440 canvas PNG and an exact 630×500 cover, using seed 7 / F3 on the
**synthetic filled sandbox board**. Those temporary QA files are not release
screenshots and are not delivered as the missing V5 gameplay image set.
