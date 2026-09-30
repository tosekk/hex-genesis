// OWNER: sonnet
// U1 WIP: the journal HUD (src/ui/v2) is built but not yet the default. Switch `createHud` to `createJournalHud`
// once U1's tests and browser DoD pass. opus wires ?ui=legacy.
export { createLegacyHud as createHud, createLegacyHud } from './legacyHud';
export { createJournalHud } from './v2/journalHud';
