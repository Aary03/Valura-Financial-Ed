/**
 * UTC range corresponding to an ISO week key ("YYYY-Www"), aligned with streak keys.
 */

const WEEK_KEY = /^(\d{4})-W(\d{2})$/;

/**
 * Parses "2026-W18" → Monday 00:00 UTC (inclusive), endExclusive next Monday UTC.
 */
export function utcRangeFromWeekKey(weekKey: string): { startUtc: Date; endExclusiveUtc: Date } {
  const m = WEEK_KEY.exec(weekKey.trim());
  if (!m) {
    throw new Error(`Invalid week key: ${weekKey}`);
  }
  const year = Number(m[1]);
  const weekNum = Number(m[2]);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const week1Monday = new Date(jan4.getTime() - (jan4Day - 1) * 86_400_000);
  const mondayUtc = new Date(week1Monday.getTime() + (weekNum - 1) * 7 * 86_400_000);
  const nextMonday = new Date(mondayUtc.getTime() + 7 * 86_400_000);
  return { startUtc: mondayUtc, endExclusiveUtc: nextMonday };
}
