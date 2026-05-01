/** Deterministic-but-varied pseudonym stems for onboarding suggestions. */

const ADJECTIVES_EN = ["Marina", "Ghaf", "Dune", "Hatta", "Coral", "Pearl"];
const CREATURES_EN = ["Falcon", "Walker", "Voyager", "Navigator", "Seeker"];

/**
 * Builds three onboarding pseudonym suggestions from a nonce (e.g. user id suffix).
 *
 * Args:
 *   nonce: Any stable string fragment (used only to vary picks deterministically).
 * Returns:
 *   Three pseudonym candidates in Title Case English.
 */
export function suggestThreePseudonyms(nonce: string): string[] {
  const n = nonce.length === 0 ? "valura" : nonce;
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (Math.imul(31, h) + n.charCodeAt(i)) | 0;
  const picks: string[] = [];
  const used = new Set<string>();
  for (let i = 0; i < 15 && picks.length < 3; i++) {
    const a      = ADJECTIVES_EN[(Math.abs(h + i * 17) >>> 0) % ADJECTIVES_EN.length];
    const b      = CREATURES_EN[(Math.abs(h * 31 + i * 3) >>> 0) % CREATURES_EN.length];
    const cand   = `${a} ${b}`;
    if (!used.has(cand)) {
      used.add(cand);
      picks.push(cand);
    }
  }
  while (picks.length < 3) {
    const pad = picks.length.toString();
    picks.push(`${ADJECTIVES_EN[0]} ${CREATURES_EN[picks.length % CREATURES_EN.length]} ${pad}`);
  }
  return picks.slice(0, 3);
}
