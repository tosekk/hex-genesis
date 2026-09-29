# Restoration assistant — prerecorded voice script

Use a warm, calm assistant voice. Read at a conversational pace; short pauses between sentences. Export MP3 with no leading silence. No runtime TTS is used.

Place optional recordings in `public/audio/vo/<lineId>.mp3`, then restart Vite/rebuild so asset discovery picks them up. If no file exists, the text and face work without any audio request. Next, Skip, Mute, run end, and dispose stop playback. Autoplay restrictions fall back to text.

| Line ID / filename | Text | Tone |
|---|---|---|
| `biomes.mp3` | This world is dormant. Choose Forest, Desert, or Arctic from the two biomes offered. Your terraformer core carries that choice. Place it on a highlighted tile to begin restoring the landscape. | A gentle welcome; hopeful, never urgent. |
| `spread.mp3` | The core sends a wave across the terrain. Higher ground and natural terrain change its reach. Wait until the whole wave finishes before building on its tiles. Where different main biomes meet, they can form a mixed biome. | Curious observation, then clear practical guidance. |
| `buildings.mp3` | Select a restored, placeable tile and choose a building for one of its three slots. Each physical slot pays its base yield only once, even after demolition. Visible natural neighbors can improve that yield. After building, hold Shift and click or press R over a tile to repeat your last building. | Patient explanation; emphasize “only once” and “visible.” |
| `combos.mp3` | Some pairs and trios of buildings form combinations. You discover their recipes by building them; discovered recipes appear in the codex and placement previews. Replacing buildings never erases the payouts already recorded for that tile. | Small moment of discovery; precise about payout history. |
| `progression.mp3` | Your lifetime yield reached a new resource threshold and earned another core. Spending resources does not reduce lifetime yield. Choose its biome and keep restoring the world. Finish every placeable tile and restore all reachable natural terrain to complete the run. | Encouraging progress; emphasize lifetime yield. |

`src/tutorial/lines.ts` is the text source of truth. The tutorial is event-driven, shown once per step per run, and never invokes game commands.
