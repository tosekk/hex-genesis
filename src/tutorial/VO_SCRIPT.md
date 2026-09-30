# Restoration assistant — prerecorded voice script

Use a warm, calm assistant voice. Read at a conversational pace; short pauses between sentences. Export MP3 with no leading silence. No runtime TTS is used.

Place optional recordings in `src/assets/audio/vo/<lineId>.mp3`, then restart Vite/rebuild so asset discovery picks them up. If no file exists, the text and face work without any audio request. A new step replaces the previous line. Next, Skip, Mute, run end, and dispose stop playback. Collapsing only hides the text/face; each new step still narrates. The current line waits for the first pointer/keyboard gesture; policy rejection retries on the next gesture. Voice follows the menu Sound mute/volume live as well as its own Mute voice button.

| Line ID / filename | Text | Tone |
|---|---|---|
| `biomes.mp3` | This world is dormant. Choose Forest, Desert, or Arctic from the two biomes offered. Your terraformer core carries that choice. Place it on a highlighted tile to begin restoring the landscape. | A gentle welcome; hopeful, never urgent. |
| `spread.mp3` | The core sends a wave across the terrain. Higher ground and natural terrain change its reach. Wait until the whole wave finishes before building on its tiles. Where different main biomes meet, they can form a mixed biome. | Curious observation, then clear practical guidance. |
| `buildings.mp3` | Select a restored, placeable tile and choose a building for one of its three slots. Each physical slot pays its base yield only once, even after demolition. Forest supplies wood and food, Desert stone and water, Arctic water and a little food; mixed biomes are rich in food. Stone mines beside mountains yield extra. After building, hold Shift and click or press R over a tile to repeat your last building. | Patient explanation; emphasize “only once” and the biome identities. |
| `combos.mp3` | Some pairs and trios of buildings form combinations. You discover their recipes by building them; discovered recipes appear in the codex and placement previews. Replacing buildings never erases the payouts already recorded for that tile. Each slot and each combo pays only once. Choose placements that earn the most. | Small moment of discovery; emphasize “only once” and thoughtful placement. |
| `progression.mp3` | Your lifetime yield reached a new resource threshold. Each threshold before the last earns another core; reaching the final threshold, T8, wins the run. Spending resources does not reduce lifetime yield. Space is limited, so plan combos and use terrain bonuses. Filling tiles with one building type will run out of room. | Encouraging progress; clearly distinguish core awards from the final victory. Read “T8” as “threshold eight”; gently emphasize limited space. |

`src/tutorial/lines.ts` is the text source of truth. The tutorial is event-driven, shown once per step per run, and never invokes game commands.
