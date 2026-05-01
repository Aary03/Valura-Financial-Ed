"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// ── Auth helper ───────────────────────────────────────────────────────────────

async function requireUser() {
  const session = await auth();
  const userId  = session?.user?.id;
  if (!userId) throw new Error("Unauthenticated");
  return userId;
}

// ── createPledge ──────────────────────────────────────────────────────────────

export interface CreatePledgeInput {
  goalSlug:    string;
  deadline:    Date;
  coinsAtStake: number;
  charitySlug: string;
}

export async function createPledge(input: CreatePledgeInput): Promise<{
  success: boolean;
  pledgeId?: string;
  error?: string;
}> {
  const userId = await requireUser();

  if (input.coinsAtStake < 100 || input.coinsAtStake > 2000)
    return { success: false, error: "Coins at stake must be 100–2000." };

  const now  = new Date();
  const min  = new Date(now); min.setDate(min.getDate() + 1);
  const max  = new Date(now); max.setDate(max.getDate() + 30);
  if (input.deadline < min || input.deadline > max)
    return { success: false, error: "Deadline must be 1–30 days from today." };

  try {
    const pledge = await db.$transaction(async (tx) => {
      // Check balance
      const user = await tx.user.findUniqueOrThrow({ where: { id: userId }, select: { valCoins: true } });
      if (user.valCoins < input.coinsAtStake)
        throw new Error("Insufficient coins");

      // Hold coins (deduct now — returned or donated on resolution)
      await tx.user.update({
        where: { id: userId },
        data:  { valCoins: { decrement: input.coinsAtStake } },
      });
      await tx.coinTxn.create({
        data: {
          userId,
          delta:  -input.coinsAtStake,
          reason: "pledge_escrow",
          refId:  input.goalSlug,
        },
      });

      return tx.pledge.create({
        data: {
          userId,
          goalSlug:    input.goalSlug,
          deadline:    input.deadline,
          coinsAtStake: input.coinsAtStake,
          charitySlug: input.charitySlug,
          status:      "ACTIVE",
        },
      });
    });

    return { success: true, pledgeId: pledge.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[createPledge]", err);
    return { success: false, error: msg };
  }
}

// ── cancelPledge ──────────────────────────────────────────────────────────────

export async function cancelPledge(pledgeId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const userId = await requireUser();
  try {
    await db.$transaction(async (tx) => {
      const pledge = await tx.pledge.findUniqueOrThrow({
        where:  { id: pledgeId },
        select: { userId: true, coinsAtStake: true, status: true },
      });

      if (pledge.userId !== userId)   throw new Error("Forbidden");
      if (pledge.status !== "ACTIVE") throw new Error("Pledge is not active");

      // Return coins
      await tx.user.update({
        where: { id: userId },
        data:  { valCoins: { increment: pledge.coinsAtStake } },
      });
      await tx.coinTxn.create({
        data: { userId, delta: pledge.coinsAtStake, reason: "pledge_cancel_refund", refId: pledgeId },
      });
      await tx.pledge.update({
        where: { id: pledgeId },
        data:  { status: "CANCELLED", resolvedAt: new Date() },
      });
    });
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: msg };
  }
}

// ── getPledges ────────────────────────────────────────────────────────────────

export interface PledgeRow {
  id:          string;
  goalSlug:    string;
  deadline:    Date;
  coinsAtStake: number;
  charitySlug: string;
  status:      "ACTIVE" | "WON" | "LOST" | "CANCELLED";
  createdAt:   Date;
  resolvedAt:  Date | null;
}

export async function getPledges(): Promise<PledgeRow[]> {
  try {
    const userId = await requireUser();
    const rows   = await db.pledge.findMany({
      where:   { userId },
      orderBy: { createdAt: "desc" },
    });
    return rows as PledgeRow[];
  } catch {
    return [];
  }
}

// ── processPledges ────────────────────────────────────────────────────────────
// Manually triggerable (cron later).
// For each ACTIVE pledge with deadline < now:
//   - If user has an Attempt for the goalSlug world → WON (coins returned + 25% bonus)
//   - Otherwise → LOST (coins donated to charity)

export async function processPledges(): Promise<{
  processed: number;
  won: number;
  lost: number;
}> {
  const now  = new Date();
  let processed = 0, won = 0, lost = 0;

  try {
    const expired = await db.pledge.findMany({
      where:  { status: "ACTIVE", deadline: { lt: now } },
      select: {
        id: true, userId: true, goalSlug: true,
        coinsAtStake: true, charitySlug: true,
      },
    });

    for (const pledge of expired) {
      processed++;

      // Check if user completed the goal world (any node attempt counts)
      const attempt = await db.attempt.findFirst({
        where: { userId: pledge.userId, node: { worldId: pledge.goalSlug } },
      });

      if (attempt) {
        // WON — return coins + 25% bonus
        const bonus   = Math.floor(pledge.coinsAtStake * 0.25);
        const refund  = pledge.coinsAtStake + bonus;
        await db.$transaction([
          db.user.update({
            where: { id: pledge.userId },
            data:  { valCoins: { increment: refund } },
          }),
          db.coinTxn.create({
            data: { userId: pledge.userId, delta: refund, reason: "pledge_won_refund", refId: pledge.id },
          }),
          db.pledge.update({
            where: { id: pledge.id },
            data:  { status: "WON", resolvedAt: now },
          }),
        ]);
        won++;
      } else {
        // LOST — donate coins to charity
        await db.$transaction([
          db.charityDonation.create({
            data: {
              userId:        pledge.userId,
              charitySlug:   pledge.charitySlug,
              coinsSpent:    pledge.coinsAtStake,
              aedEquivalent: pledge.coinsAtStake / 1000,
            },
          }),
          db.coinTxn.create({
            data: {
              userId: pledge.userId,
              delta:  0, // coins already deducted at pledge creation
              reason: "pledge_lost_donated",
              refId:  pledge.id,
            },
          }),
          db.pledge.update({
            where: { id: pledge.id },
            data:  { status: "LOST", resolvedAt: now },
          }),
        ]);
        lost++;
      }
    }
  } catch (err) {
    console.error("[processPledges]", err);
  }

  return { processed, won, lost };
}
