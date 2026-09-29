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
    text: 'Select a restored, placeable tile and choose a building for one of its three slots. Each physical slot pays its base yield only once, even after demolition. Forest supplies wood and food, Desert stone and water, Arctic water and a little food; mixed biomes are rich in food. Stone mines beside mountains yield extra. After building, hold Shift and click or press R over a tile to repeat your last building.',
  },
  combos: {
    title: 'You found a combination',
    text: 'Some pairs and trios of buildings form combinations. You discover their recipes by building them; discovered recipes appear in the codex and placement previews. Replacing buildings never erases the payouts already recorded for that tile.',
  },
  progression: {
    title: 'Keep restoring',
    text: 'Your lifetime yield reached a new resource threshold and earned another core. Spending resources does not reduce lifetime yield. You win when no legal core site remains, no spread is active, and every slot on every restored, placeable tile is filled. Natural tiles need no buildings, and unreachable dead land does not block a win.',
  },
} as const;
export type LineId = keyof typeof LINES;
