// OWNER: sol. HUD adapter for the committed presentation-only offer effect (UI_SPEC §8.4).
import type { GameSession } from '../../core/contracts';
import type { BiomeOffer, MainBiome } from '../../core/types';
import { createOfferFx, type OfferFx } from '../../fx/offerSpheres';
import { createOfferModal } from '../offerModal';

export type OfferFxFactory = (root: HTMLElement) => OfferFx;

export function createHudOffer(root: HTMLElement, session: GameSession,
  geometry: { from(): DOMRect | null; to(biome: MainBiome): DOMRect | null },
  factory: OfferFxFactory | null = createOfferFx) {
  const fallback = createOfferModal(root, session);
  let fx: OfferFx | undefined;
  try { fx = factory?.(root); } catch { /* The simple modal still makes the run playable. */ }
  let current: BiomeOffer | null = null, chosen: 0 | 1 | null = null;
  let active = false, resolving = false, epoch = 0;
  const canReshuffle = () => session.state.reshufflesUsed < session.state.config.reshufflesPerRun;
  function disableFx(): void {
    const failed = fx; fx = undefined;
    try { failed?.dispose(); } catch { /* A broken effect must not block the fallback. */ }
  }
  function hide(): void {
    ++epoch; active = false; resolving = false; current = null; chosen = null;
    fx?.hide(); fallback.hide();
  }
  function show(offer: BiomeOffer): void {
    if (resolving) hide();
    const update = active && fx;
    current = { options: [...offer.options], reshuffled: offer.reshuffled };
    chosen = null; active = true;
    if (fx) {
      try {
        if (update) fx.update(offer, canReshuffle());
        else fx.present({ offer, from: geometry.from(), canReshuffle: canReshuffle(),
          onChoose(i) {
            if (resolving || !session.state.pendingOffer) return;
            // chooseOffer emits offerResolved synchronously: save the index before the command.
            chosen = i;
            const result = session.chooseOffer(i);
            if (!result.ok && session.state.pendingOffer) show(session.state.pendingOffer);
          },
          onReshuffle() { session.reshuffleOffer(); },
        });
        fallback.hide(); return;
      } catch { disableFx(); }
    }
    fallback.show(offer);
  }
  function resolve(biome: MainBiome): void {
    if (!active || !fx || !current) { hide(); return; }
    const index = chosen ?? (current.options[0] === biome ? 0 : 1);
    const token = ++epoch;
    resolving = true; // pendingOffer is already null, but input stays blocked until the FX settles.
    const finish = () => { if (epoch === token) hide(); };
    try {
      Promise.resolve(fx.resolve(index, geometry.to(biome))).then(finish, () => {
        if (epoch !== token) return;
        disableFx(); finish();
      });
    } catch { disableFx(); finish(); }
  }
  return { show, resolve, hide, isOpen: () => active,
    dispose() { hide(); disableFx(); fallback.dispose(); } };
}
