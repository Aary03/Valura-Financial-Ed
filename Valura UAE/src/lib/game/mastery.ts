/**
 * Mastery (spaced-repetition) system utilities.
 *
 * Intervals follow a fixed ladder: 7 → 30 → 90 → 180 days.
 * A passing re-quiz advances the interval; a failing one resets to 7.
 */

export type MasteryTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

/** Ordered ladder of review intervals in days. */
export const MASTERY_INTERVALS = [7, 30, 90, 180] as const;
export type MasteryInterval = (typeof MASTERY_INTERVALS)[number];

/** Map intervalDays to the tier it represents. */
export function getMasteryTier(intervalDays: number): MasteryTier {
  if (intervalDays >= 180) return "PLATINUM";
  if (intervalDays >= 90)  return "GOLD";
  if (intervalDays >= 30)  return "SILVER";
  return "BRONZE";
}

/** Next interval in the ladder after a pass. Caps at 180. */
export function getNextInterval(current: number): number {
  const idx = MASTERY_INTERVALS.indexOf(current as MasteryInterval);
  if (idx === -1) return 7;
  return MASTERY_INTERVALS[Math.min(idx + 1, MASTERY_INTERVALS.length - 1)];
}

/** Date of next review after a pass from the given current interval. */
export function getNextReviewAt(intervalDays: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + intervalDays);
  return d;
}

/** Badge slug for a mastery tier applied to a world slug. */
export function masteryBadgeSlug(worldSlug: string, tier: MasteryTier): string {
  return `mastery-${tier.toLowerCase()}-${worldSlug}`;
}

// ── Tier display metadata ──────────────────────────────────────────────────────

export const TIER_META: Record<MasteryTier, {
  color: string; bg: string; border: string; label: { en: string; ar: string }; emoji: string;
}> = {
  BRONZE:   { color: "#C8773A", bg: "#FFF7ED", border: "#FDBA74", label: { en: "Bronze",   ar: "برونزي"  }, emoji: "🥉" },
  SILVER:   { color: "#64748B", bg: "#F8FAFC", border: "#CBD5E1", label: { en: "Silver",   ar: "فضي"    }, emoji: "🥈" },
  GOLD:     { color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", label: { en: "Gold",     ar: "ذهبي"   }, emoji: "🥇" },
  PLATINUM: { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", label: { en: "Platinum", ar: "بلاتيني" }, emoji: "💎" },
};
