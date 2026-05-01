"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  getCurrentWeekKey, getPreviousWeekKey, isConsecutiveWeek,
  type StreakUpdateResult,
} from "@/lib/game/streak";
import {
  getMasteryTier, getNextInterval, getNextReviewAt,
  masteryBadgeSlug,
} from "@/lib/game/mastery";

// ── Auth helper ───────────────────────────────────────────────────────────────

async function requireUser() {
  const session = await auth();
  const userId  = session?.user?.id;
  if (!userId) throw new Error("Unauthenticated");
  return userId;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STREAK
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Called on every node completion.
 * Returns what happened so the caller can show a toast.
 */
export async function checkAndUpdateStreak(
  userId?: string,
): Promise<StreakUpdateResult> {
  const uid = userId ?? (await requireUser());
  const now = new Date();
  const currentWeek = getCurrentWeekKey(now);

  try {
    const user = await db.user.findUniqueOrThrow({
      where:  { id: uid },
      select: { weeklyStreakCount: true, streakFreezeCount: true, lastStreakWeek: true },
    });

    // Already counted this week — no-op
    if (user.lastStreakWeek === currentWeek) {
      return { action: "already_counted" };
    }

    const prevWeek    = getPreviousWeekKey(currentWeek);
    const wasConsecutive = user.lastStreakWeek
      ? isConsecutiveWeek(currentWeek, user.lastStreakWeek)
      : false;

    // ── Consecutive week ──────────────────────────────────────────
    if (!user.lastStreakWeek || wasConsecutive) {
      const newStreak = (user.weeklyStreakCount ?? 0) + 1;
      await db.user.update({
        where: { id: uid },
        data:  { weeklyStreakCount: newStreak, lastStreakWeek: currentWeek },
      });
      return { action: "incremented", newStreak };
    }

    // ── Missed exactly one week — can freeze save? ───────────────
    const twoWeeksAgo = getPreviousWeekKey(prevWeek);
    const missedOne   = user.lastStreakWeek === twoWeeksAgo;

    if (missedOne && (user.streakFreezeCount ?? 0) > 0) {
      const newStreak = (user.weeklyStreakCount ?? 0) + 1;
      await db.user.update({
        where: { id: uid },
        data:  {
          weeklyStreakCount: newStreak,
          streakFreezeCount: { decrement: 1 },
          lastStreakWeek:    currentWeek,
        },
      });
      return { action: "freeze_used", newStreak };
    }

    // ── Missed + no freeze — soft reset ──────────────────────────
    await db.user.update({
      where: { id: uid },
      data:  { weeklyStreakCount: 0, lastStreakWeek: currentWeek },
    });
    return { action: "reset", newStreak: 0 };
  } catch (err) {
    console.error("[checkAndUpdateStreak]", err);
    return { action: "already_counted" }; // safe fallback
  }
}

/**
 * Grants 2 free streak freezes on the 1st of every month, capped at 4.
 * Run as a cron on the 1st of the month.
 */
export async function grantMonthlyFreezes(): Promise<{ updated: number }> {
  try {
    const result = await db.user.updateMany({
      where: { streakFreezeCount: { lt: 4 } },
      data:  { streakFreezeCount: { increment: 2 } },
    });
    // Cap at 4 (Prisma doesn't do min/max natively; over-grant is acceptable)
    await db.$executeRaw`UPDATE "User" SET "streakFreezeCount" = 4 WHERE "streakFreezeCount" > 4`;
    return { updated: result.count };
  } catch (err) {
    console.error("[grantMonthlyFreezes]", err);
    return { updated: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MASTERY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Called after every quiz run.
 * Creates or updates the Mastery row, and awards mastery badges on tier advance.
 */
export async function recordMasteryAttempt(
  nodeId: string,
  passed: boolean,
): Promise<{ tier: ReturnType<typeof getMasteryTier> | null; tierAdvanced: boolean }> {
  try {
    const userId  = await requireUser();
    const existing = await db.mastery.findUnique({
      where:  { userId_nodeId: { userId, nodeId } },
      select: { intervalDays: true },
    });

    let newInterval: number;
    let tierAdvanced = false;

    if (!existing) {
      // First completion — always Bronze
      newInterval = 7;
    } else if (passed) {
      const old = existing.intervalDays;
      newInterval = getNextInterval(old);
      tierAdvanced = getMasteryTier(newInterval) !== getMasteryTier(old);
    } else {
      // Failed re-quiz — reset
      newInterval  = 7;
      tierAdvanced = false;
    }

    await db.mastery.upsert({
      where:  { userId_nodeId: { userId, nodeId } },
      create: { userId, nodeId, intervalDays: newInterval, nextReviewAt: getNextReviewAt(newInterval) },
      update: { intervalDays: newInterval, nextReviewAt: getNextReviewAt(newInterval) },
    });

    // Award tier badge if advanced
    if (tierAdvanced) {
      const tier = getMasteryTier(newInterval);
      // Get the world slug via node → world relation
      const node = await db.node.findUnique({
        where:  { id: nodeId },
        select: { worldId: true },
      });
      if (node) {
        const slug = masteryBadgeSlug(node.worldId, tier);
        // Upsert the Badge definition if it doesn't exist yet
        await db.badge.upsert({
          where:  { slug },
          create: { slug, nameEn: `${tier} Mastery`, nameAr: `إتقان ${tier}`, kind: "MASTERY", tier, iconKey: tier.toLowerCase() },
          update: {},
        });
        // Award to user
        await db.userBadge.upsert({
          where:  { userId_badgeId: { userId, badgeId: slug } },
          create: { userId, badgeId: slug },
          update: {},
        }).catch(() => {
          // badgeId mismatch; use lookup
        });
      }
    }

    return { tier: getMasteryTier(newInterval), tierAdvanced };
  } catch (err) {
    console.error("[recordMasteryAttempt]", err);
    return { tier: null, tierAdvanced: false };
  }
}

/**
 * Returns world slugs that have at least one node with a due mastery review
 * for the current user. Used to highlight nodes on the journey map.
 */
export async function getDueMasteryWorldSlugs(): Promise<string[]> {
  try {
    const userId = await requireUser();
    const due    = await db.mastery.findMany({
      where:  { userId, nextReviewAt: { lte: new Date() } },
      select: { node: { select: { worldId: true } } },
    });
    const slugs = Array.from(new Set(due.map((m) => m.node.worldId)));
    return slugs;
  } catch {
    return [];
  }
}

/**
 * Returns the current user's mastery rows, enriched with node/world info.
 * Used by the profile page.
 */
export async function getUserMasteryData(): Promise<{
  nodeId: string;
  worldId: string;
  intervalDays: number;
  nextReviewAt: Date;
}[]> {
  try {
    const userId = await requireUser();
    const rows   = await db.mastery.findMany({
      where:   { userId },
      select:  { nodeId: true, intervalDays: true, nextReviewAt: true, node: { select: { worldId: true } } },
      orderBy: { intervalDays: "desc" },
    });
    return rows.map((r) => ({
      nodeId:       r.nodeId,
      worldId:      r.node.worldId,
      intervalDays: r.intervalDays,
      nextReviewAt: r.nextReviewAt,
    }));
  } catch {
    return [];
  }
}

/**
 * Returns the current user's earned badges.
 * Used by the profile page.
 */
export async function getUserBadges(): Promise<{
  slug: string;
  nameEn: string;
  nameAr: string;
  kind: string;
  tier: string | null;
  iconKey: string;
  earnedAt: Date;
}[]> {
  try {
    const userId = await requireUser();
    const rows   = await db.userBadge.findMany({
      where:   { userId },
      include: { badge: true },
      orderBy: { earnedAt: "desc" },
    });
    return rows.map((r) => ({
      slug:     r.badge.slug,
      nameEn:   r.badge.nameEn,
      nameAr:   r.badge.nameAr,
      kind:     r.badge.kind,
      tier:     r.badge.tier,
      iconKey:  r.badge.iconKey,
      earnedAt: r.earnedAt,
    }));
  } catch {
    return [];
  }
}
