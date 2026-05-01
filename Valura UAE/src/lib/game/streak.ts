/**
 * Streak system utilities.
 *
 * Week keys use ISO 8601 format ("2026-W18").
 * The streak is weekly — one increment per calendar week.
 */

// ── Week key helpers ──────────────────────────────────────────────────────────

/**
 * Returns the ISO week key for the given date (defaults to now).
 * Format: "YYYY-Www" — e.g. "2026-W18".
 */
export function getCurrentWeekKey(date: Date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Thursday of the same ISO week
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo    = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

/**
 * Returns the week key for the week immediately before the given key.
 */
export function getPreviousWeekKey(weekKey: string): string {
  const [yearStr, wStr] = weekKey.split("-W");
  const year = Number(yearStr);
  const week = Number(wStr);
  if (week === 1) {
    // Last week of the previous year — Dec 28 is always in that week
    return getCurrentWeekKey(new Date(Date.UTC(year - 1, 11, 28)));
  }
  // Back 7 days from any date in the current week
  const janFour = new Date(Date.UTC(year, 0, 4));
  const mondayW1 = new Date(janFour.getTime() - ((janFour.getUTCDay() + 6) % 7) * 86_400_000);
  const weekStart = new Date(mondayW1.getTime() + (week - 1) * 7 * 86_400_000);
  const prevWeek  = new Date(weekStart.getTime() - 7 * 86_400_000);
  return getCurrentWeekKey(prevWeek);
}

/**
 * Returns true if `candidate` is the week immediately before `current`.
 */
export function isConsecutiveWeek(current: string, candidate: string): boolean {
  return getPreviousWeekKey(current) === candidate;
}

// ── Streak result ──────────────────────────────────────────────────────────────

export type StreakUpdateResult =
  | { action: "already_counted" }
  | { action: "incremented";    newStreak: number }
  | { action: "freeze_used";    newStreak: number }
  | { action: "reset";          newStreak: 0 };
