export const LINES = {
  biomes: {
    title: 'Bring the landscape back',
    text: 'This world is dormant. Choose Forest, Desert, or Arctic from the two biomes offered. Your terraformer core carries that choice. Place it on a highlighted tile to begin restoring the landscape.',
  },
  spread: {
    title: 'Watch the restoration wave',
    text: 'The core sends a wave across the terrain. Higher ground and natural terrain change its reach. Wait until the whole wave finishes before building on its tiles. Where different main biomes meet, they can form a mixed biome.',
  },
  buildings: {
    title: 'Three slots, one growing world',
    text: 'Select a restored, placeable tile and choose a building for one of its three slots. Each physical slot pays its base yield only once, even after demolition. Visible natural neighbors can improve that yield. After building, hold Shift and click or press R over a tile to repeat your last building.',
  },
  combos: {
    title: 'You found a combination',
    text: 'Some pairs and trios of buildings form combinations. You discover their recipes by building them; discovered recipes appear in the codex and placement previews. Replacing buildings never erases the payouts already recorded for that tile.',
  },
  progression: {
    title: 'Keep restoring',
    text: 'Your lifetime yield reached a new resource threshold and earned another core. Spending resources does not reduce lifetime yield. Choose its biome and keep restoring the world. Finish every placeable tile and restore all reachable natural terrain to complete the run.',
  },
} as const;
export type LineId = keyof typeof LINES;
