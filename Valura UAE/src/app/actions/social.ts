"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentWeekKey } from "@/lib/game/streak";

const MAX_BOOSTS_PER_WEEK = 5;
const MIN_BOOST           = 50;
const MAX_BOOST           = 500;

async function requireUserId(): Promise<string> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) throw new Error("Unauthenticated");
  return id;
}

export type FriendRow = {
  friendshipId: string;
  id: string;
  displayName: string;
  avatarType: string;
  currentLevel: number;
  weeklyXp: number;
};

export type PendingInRow = {
  id: string;
  requester: {
    id: string;
    displayName: string | null;
    avatarType: string;
    currentLevel: number;
  };
};

/**
 * Search other players by display name (pseudonym). Minimum two characters.
 */
export async function searchPlayersByPseudonym(query: string): Promise<
  { id: string; displayName: string | null; avatarType: string; currentLevel: number }[]
> {
  try {
    const userId = await requireUserId();
    const q      = query.trim();
    if (q.length < 2) return [];

    return db.user.findMany({
      where: {
        id: { not: userId },
        displayName: { contains: q, mode: "insensitive" },
        pseudonymChosenAt: { not: null },
      },
      select: {
        id: true,
        displayName: true,
        avatarType: true,
        currentLevel: true,
      },
      take: 20,
      orderBy: { displayName: "asc" },
    });
  } catch {
    return [];
  }
}

/**
 * Friend graph + weekly XP — sorted friends, percentile band, incoming requests.
 * Returns empty data gracefully when the DB is unavailable (demo mode).
 */
export async function getFriendsSocialData(): Promise<{
  pendingIncoming: PendingInRow[];
  friends: FriendRow[];
  topPercentBand: number | null;
  myWeeklyXp: number;
}> {
  const emptyResult = { pendingIncoming: [], friends: [], topPercentBand: null, myWeeklyXp: 0 };
  try {
    const userId = await requireUserId();
    const weekIso = getCurrentWeekKey();

    const pendingIncoming = await db.friendship.findMany({
      where:  { addresseeId: userId, status: "PENDING" },
      include: {
        requester: {
          select: { id: true, displayName: true, avatarType: true, currentLevel: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const accepted = await db.friendship.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ requesterId: userId }, { addresseeId: userId }],
      },
      include: {
        requester: { select: { id: true, displayName: true, avatarType: true, currentLevel: true } },
        addressee: { select: { id: true, displayName: true, avatarType: true, currentLevel: true } },
      },
    });

    const friendIds = accepted.map((f) =>
      f.requesterId === userId ? f.addresseeId : f.requesterId,
    );

    const wxRows = await db.userWeeklyXp.findMany({
      where: {
        weekIso,
        userId: { in: [...friendIds, userId] },
      },
    });
    const xpMap = new Map(wxRows.map((w) => [w.userId, w.xpEarned]));

    const friends: FriendRow[] = accepted
      .map((row) => {
        const other    = row.requesterId === userId ? row.addressee : row.requester;
        const friendId = other.id;
        return {
          friendshipId: row.id,
          id:           friendId,
          displayName:  other.displayName ?? "—",
          avatarType:   other.avatarType,
          currentLevel: other.currentLevel,
          weeklyXp:     xpMap.get(friendId) ?? 0,
        };
      })
      .sort((a, b) => b.weeklyXp - a.weeklyXp);

    const cohort = [
      { id: userId, xp: xpMap.get(userId) ?? 0 },
      ...friendIds.map((id) => ({ id, xp: xpMap.get(id) ?? 0 })),
    ].sort((a, b) => b.xp - a.xp);

    const rank = cohort.findIndex((c) => c.id === userId) + 1;
    const n    = cohort.length;
    const topPercentBand =
      n <= 1 ? null : Math.min(100, Math.max(1, Math.ceil((rank / n) * 100)));

    return {
      pendingIncoming: pendingIncoming.map((p) => ({
        id: p.id,
        requester: p.requester,
      })),
      friends,
      topPercentBand,
      myWeeklyXp: xpMap.get(userId) ?? 0,
    };
  } catch {
    return emptyResult;
  }
}

/**
 * Sends a friend request — if the other person already requested you, auto-accepts.
 */
export async function sendFriendRequest(targetUserId: string): Promise<{
  success?: boolean;
  autoAccepted?: boolean;
  error?: string;
}> {
  try {
    const userId = await requireUserId();
    if (targetUserId === userId) return { error: "self" };

    const target = await db.user.findUnique({
      where:  { id: targetUserId },
      select: { pseudonymChosenAt: true },
    });
    if (!target?.pseudonymChosenAt) return { error: "user_not_found" };

    const existing = await db.friendship.findFirst({
      where: {
        OR: [
          { requesterId: userId, addresseeId: targetUserId },
          { requesterId: targetUserId, addresseeId: userId },
        ],
      },
    });

    if (existing?.status === "ACCEPTED") return { error: "already_friends" };

    if (existing?.status === "PENDING") {
      if (existing.addresseeId === userId) {
        await db.friendship.update({
          where: { id: existing.id },
          data:  { status: "ACCEPTED" },
        });
        revalidatePath("/", "layout");
        return { success: true, autoAccepted: true };
      }
      return { error: "pending" };
    }

    await db.friendship.create({
      data: {
        requesterId: userId,
        addresseeId: targetUserId,
        status:      "PENDING",
      },
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "db_unavailable" };
  }
}

/**
 * Accept or decline a pending friend request addressed to the current user.
 */
export async function respondFriendRequest(
  friendshipId: string,
  accept: boolean,
): Promise<{ success?: boolean; error?: string }> {
  try {
    const userId = await requireUserId();
    const row    = await db.friendship.findUnique({ where: { id: friendshipId } });
    if (!row || row.addresseeId !== userId || row.status !== "PENDING") {
      return { error: "invalid" };
    }
    if (accept) {
      await db.friendship.update({
        where: { id: friendshipId },
        data:  { status: "ACCEPTED" },
      });
    } else {
      await db.friendship.delete({ where: { id: friendshipId } });
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "db_unavailable" };
  }
}

/**
 * Sends VAL coins + sticker to a friend — max 5 boosts per week per sender.
 */
export async function sendFriendBoost(
  friendUserId: string,
  stickerKey: string,
  coins: number,
): Promise<{ success?: boolean; error?: string }> {
  try {
  const userId = await requireUserId();
  if (friendUserId === userId) return { error: "self" };

  const okFriend = await db.friendship.findFirst({
    where: {
      status: "ACCEPTED",
      OR: [
        { requesterId: userId, addresseeId: friendUserId },
        { requesterId: friendUserId, addresseeId: userId },
      ],
    },
  });
  if (!okFriend) return { error: "not_friends" };

  if (coins < MIN_BOOST || coins > MAX_BOOST || !Number.isInteger(coins)) {
    return { error: "invalid_amount" };
  }

  const weekIso = getCurrentWeekKey();
  const sent    = await db.friendBoost.count({
    where: { senderId: userId, weekIso },
  });
  if (sent >= MAX_BOOSTS_PER_WEEK) return { error: "weekly_cap" };

  const me = await db.user.findUnique({
    where:  { id: userId },
    select: { valCoins: true, displayName: true },
  });
  if (!me || me.valCoins < coins) return { error: "insufficient_coins" };

  await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data:  { valCoins: { decrement: coins } },
    });
    await tx.user.update({
      where: { id: friendUserId },
      data:  { valCoins: { increment: coins } },
    });
    await tx.friendBoost.create({
      data: {
        senderId:    userId,
        recipientId: friendUserId,
        stickerKey,
        coins,
        weekIso,
      },
    });
    await tx.boostNotification.create({
      data: {
        recipientId: friendUserId,
        senderId:    userId,
        stickerKey,
        coins,
        senderName:  me.displayName ?? "Friend",
      },
    });
    await tx.coinTxn.create({
      data: {
        userId,
        delta:  -coins,
        reason: "friend_boost_sent",
        refId:  friendUserId,
      },
    });
    await tx.coinTxn.create({
      data: {
        userId: friendUserId,
        delta:  coins,
        reason: "friend_boost_recv",
        refId:  userId,
      },
    });
  });

  revalidatePath("/", "layout");
  return { success: true };
  } catch {
    return { error: "db_unavailable" };
  }
}

export type BoostToastPayload = {
  stickerKey: string;
  coins: number;
  senderName: string;
};

/**
 * Returns pending boost notifications and marks them consumed (one login batch).
 */
export async function consumePendingBoostToasts(): Promise<BoostToastPayload[]> {
  const userId = await requireUserId();
  try {
    const rows = await db.boostNotification.findMany({
      where:   { recipientId: userId, consumedAt: null },
      orderBy: { createdAt: "asc" },
    });
    if (rows.length === 0) return [];

    const now = new Date();
    await db.boostNotification.updateMany({
      where: { id: { in: rows.map((r) => r.id) } },
      data:  { consumedAt: now },
    });

    return rows.map((r) => ({
      stickerKey: r.stickerKey,
      coins:      r.coins,
      senderName: r.senderName ?? "Friend",
    }));
  } catch {
    // DB unavailable in demo mode — return empty, no toasts to show
    return [];
  }
}
