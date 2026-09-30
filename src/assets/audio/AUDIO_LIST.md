# Optional audio handoff

Drop these exact MP3 paths under `src/assets/audio/`. Restart Vite after adding files, or rebuild the release; asset discovery then picks them up without code changes. Missing assets make no requests. Corrupt media logs once at debug level and stays disabled until reload. All playback waits for a pointer/keyboard gesture. No runtime AI/TTS is used.

Keep effects short, with no leading silence or hard clipping. The module handles volume/mute and ducks music during biome offers. Settings persist locally where storage is available. Music should have a seamless loop; keep it gentle enough that repeated build sounds remain clear.

| File | Trigger | Suggested length | Generation prompt |
|---|---|---|---|
| `music/main_loop.mp3` | During a run, looped; ducked while an offer is open | 1–3 min | Warm ambient instrumental for restoring a miniature planet, soft woodwind and felt piano, restrained pulse, no vocals, seamless loop, calm and hopeful. |
| `sfx/offer_open.mp3` | `offerShown` | ~1 s | A gentle two-note invitation, airy wooden chime, welcoming, soft tail, no voice. |
| `sfx/offer_pick.mp3` | `offerResolved` | ~0.5 s | A small tactile wooden click followed by one warm confirmation note, crisp and quiet. |
| `sfx/core_place.mp3` | `spreadStarted` | ~1.5 s | A crystal touching a wooden game board, then a rising soft energy pulse, hopeful, compact, no explosion. |
| `sfx/tile_flip.mp3` | `tilesRevealed` batch, at most 12/s; pitch 0.96–1.04 | ~0.2 s | One tiny ceramic hex tile turning and settling on wood, light clack, no long tail, comfortable when repeated. |
| `sfx/spread_done.mp3` | `spreadFinished` | ~1 s | A brief soft shimmering chord resolving upward, gentle wave finished, clean quiet decay. |
| `sfx/build.mp3` | `hexChanged`, a slot gains/changes a building | ~0.4 s | A miniature wooden building being placed on a board, warm tap and subtle construction tick. |
| `sfx/demolish.mp3` | `hexChanged`, a slot becomes empty | ~0.5 s | A tiny wooden model lifting away with a soft scrape and gentle tap, nonviolent, restrained. |
| `sfx/payout_base.mp3` | Nonempty `payouts` containing only base yields | ~0.3 s | One small resource-token clink on wood, warm and dry, subtle reward, no casino jingle. |
| `sfx/payout_combo.mp3` | `payouts` containing a pair or triple | ~0.8 s | Three soft wooden chimes ascending into a satisfying short chord, a clever combination reward. |
| `sfx/discover.mp3` | Nonempty `combosDiscovered` | ~1.2 s | A curious sparkling reveal, gentle bell with airy rising notes, discovery of a new recipe, no voice. |
| `sfx/core_awarded.mp3` | `coreAwarded` | ~1 s | A warm crystal resonance with one clear uplifting accent, a new terraformer core earned. |
| `sfx/win.mp3` | `runEnded`, status `won` | ~3 s | A modest hopeful victory cadence, soft orchestral woodwinds and shimmering chimes, calm planet restored, no bombast. |
| `sfx/end.mp3` | `runEnded`, any other status | ~3 s | A peaceful closing cadence, warm felt piano and airy decay, reflective rather than sad or punitive. |

`vo/*.mp3` is separate optional tutorial narration; its exact scripts are in `src/tutorial/VO_SCRIPT.md`. Sound mute/volume controls music, SFX and tutorial voice; the tutorial also has its own voice mute.

Opus integration, after creating the session and before `session.newRun`:

```ts
import { createAudio } from './audio/audio';
const audio = createAudio(document.getElementById('ui')!, session);
```

Call `audio.dispose()` alongside other owned factory teardown if a teardown path is added. No frame-loop call is required. The control sits at bottom-right, offset left of Help/End Run and below the codex.

Sandbox: `/render-sandbox.html` mounts the same audio factory through a synthetic event adapter. Reveal wave gives core/flip/done cues; B places a model on the hovered slot; X removes it; P populates; F demos combo payout cues. These effects never decide game state.
