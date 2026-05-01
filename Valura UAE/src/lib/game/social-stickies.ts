/**
 * Emoji pool for sending boosts — all catalog sticker pack emojis concatenated uniquely.
 */

import { STICKER_PACKS } from "@/lib/game/shop-catalog";

const seen = new Set<string>();

for (const pack of STICKER_PACKS) {
  for (const s of pack.stickers) {
    seen.add(s);
  }
}

/** Ordered emoji list for boost picker (catalog order preserved). */
export const BOOST_STICKERS: string[] = [];
for (const pack of STICKER_PACKS) {
  for (const s of pack.stickers) {
    if (!seen.has(s)) continue;
    BOOST_STICKERS.push(s);
    seen.delete(s);
  }
}
