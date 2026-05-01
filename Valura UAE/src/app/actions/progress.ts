"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { XP_PER_LEVEL } from "@/lib/game/constants";
import { getCurrentWeekKey } from "@/lib/game/streak";

/**
 * Persist a completed node: attempt row, XP & coins, weekly XP slice, level recompute.
 *
 * Args:
 *   nodeId: Completed node id.
 *   score: 0–100 or correct count as passed from client.
 *   xpAwarded: XP to add.
 *   coinsAwarded: VAL coins to add.
 */
export async function markNodeComplete(
  nodeId: string,
  score: number,
  xpAwarded: number,
  coinsAwarded: number,
): Promise<{ success: boolean; error?: string }> {
  const session = await auth();
  const userId  = session?.user?.id;
  if (!userId) return { success: false, error: "Unauthenticated" };

  if (xpAwarded < 0 || coinsAwarded < 0) return { success: false, error: "Invalid reward" };

  const weekIso = getCurrentWeekKey();

  try {
    await db.$transaction(async (tx) => {
      await tx.attempt.create({
        data: {
          userId,
          nodeId,
          score: Math.min(100, Math.max(0, score)),
          durationMs: 0,
        },
      });

      const after = await tx.user.update({
        where: { id: userId },
        data: {
          totalXP:  { increment: xpAwarded },
          valCoins: { increment: coinsAwarded },
        },
        select: { totalXP: true },
      });

      const lev = Math.floor(after.totalXP / XP_PER_LEVEL) + 1;
      await tx.user.update({
        where: { id: userId },
        data: { currentLevel: lev },
      });

      await tx.userWeeklyXp.upsert({
        where:  { userId_weekIso: { userId, weekIso } },
        create: { userId, weekIso, xpEarned: xpAwarded },
        update: { xpEarned: { increment: xpAwarded } },
      });

      await tx.coinTxn.create({
        data: {
          userId,
          delta:     coinsAwarded,
          reason:    "node_complete",
          refId:     nodeId,
        },
      });
    });

    return { success: true };
  } catch (err) {
    console.error("[markNodeComplete]", err);
    return { success: false, error: "Internal error" };
  }
}
