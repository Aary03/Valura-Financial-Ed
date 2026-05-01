"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentWeekKey } from "@/lib/game/streak";
import { utcRangeFromWeekKey } from "@/lib/game/week-range";

const GROUP_CAP = 6;
const QUEST_TARGET = 10;

async function requireUserId(): Promise<string> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) throw new Error("Unauthenticated");
  return id;
}

function generateJoinCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[crypto.randomInt(0, chars.length)];
  }
  return code;
}

const NameSchema = z.string().min(2).max(48).trim();

const CodeSchema = z.string().regex(/^[A-Z0-9]{6}$/, "Six-character code");

/**
 * Creates a Family Majlis — owner is implicit member — with a unique invite code.
 */
export async function createMajlis(name: string): Promise<{ inviteCode?: string; error?: string }> {
  const userId = await requireUserId();
  const parsed = NameSchema.safeParse(name);
  if (!parsed.success) return { error: parsed.error.flatten().formErrors[0] ?? "Invalid name" };

  const membership = await db.familyMembership.findFirst({ where: { userId } });
  if (membership) return { error: "Already_in_group" };

  for (let attempt = 0; attempt < 8; attempt++) {
    const code = generateJoinCode();
    try {
      const grp = await db.$transaction(async (tx) => {
        const g = await tx.familyGroup.create({
          data: {
            name:       parsed.data,
            ownerId:    userId,
            inviteCode: code,
          },
        });
        await tx.familyMembership.create({ data: { groupId: g.id, userId } });
        return g;
      });
      revalidatePath("/", "layout");
      return { inviteCode: grp.inviteCode };
    } catch {
      /* uniqueness collision — retry */
    }
  }
  return { error: "Could_not_create_group" };
}

/**
 * Joins a group by uppercase invite code. Enforces membership cap at 6.
 */
export async function joinMajlisByCode(raw: string): Promise<{ success?: boolean; error?: string }> {
  const userId = await requireUserId();
  const code    = raw.trim().toUpperCase().replace(/\s+/g, "");
  const parsed  = CodeSchema.safeParse(code);
  if (!parsed.success) return { error: parsed.error.flatten().formErrors[0] ?? "Invalid_code" };

  const existingMembership = await db.familyMembership.findFirst({ where: { userId } });
  if (existingMembership) return { error: "Already_in_group" };

  try {
    const group = await db.familyGroup.findUnique({
      where:  { inviteCode: parsed.data },
      select: {
        id: true,
      },
    });
    if (!group) return { error: "Not_found" };

    const cnt = await db.familyMembership.count({ where: { groupId: group.id } });
    if (cnt >= GROUP_CAP) return { error: "Group_full" };

    await db.familyMembership.create({
      data: { groupId: group.id, userId },
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    console.error("[joinMajlisByCode]", e);
    return { error: "Join_failed" };
  }
}

/**
 * Leave current group — if owner leaves, transfers ownership or deletes empty group.
 */
export async function leaveMajlis(): Promise<{ success?: boolean; error?: string }> {
  const userId = await requireUserId();
  const mem    = await db.familyMembership.findFirst({
    where:  { userId },
    include: { group: true },
  });
  if (!mem) return { error: "Not_in_group" };

  const { groupId } = mem;
  const group       = mem.group;

  await db.$transaction(async (tx) => {
    await tx.familyMembership.delete({ where: { id: mem.id } });

    const remaining = await tx.familyMembership.findMany({
      where:  { groupId },
      select: { userId: true },
      orderBy: { joinedAt: "asc" },
    });

    if (remaining.length === 0) {
      await tx.familyGroup.delete({ where: { id: groupId } });
      return;
    }

    if (group.ownerId === userId) {
      const nextOwner = remaining[0]!.userId;
      await tx.familyGroup.update({
        where: { id: groupId },
        data: { ownerId: nextOwner },
      });
    }
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export type MajlisMemberRow = {
  userId: string;
  displayName: string;
  avatarType: string;
  quizzesThisWeek: number;
};

export type MajlisDashboard = {
  group: {
    id: string;
    name: string;
    inviteCode: string;
    ownerId: string;
    isOwner: boolean;
  };
  questTarget: number;
  questProgress: number;
  weekLabel: string;
  members: MajlisMemberRow[];
} | null;

/**
 * Server data for the Majlis page — shared weekly quest progress from quiz attempts.
 */
export async function getMajlisDashboard(locale: string): Promise<MajlisDashboard> {
  const userId = await requireUserId();
  const mem    = await db.familyMembership.findFirst({
    where:  { userId },
    include: { group: true },
  });
  if (!mem) return null;

  const group    = mem.group;
  const weekIso  = getCurrentWeekKey();
  const { startUtc, endExclusiveUtc } = utcRangeFromWeekKey(weekIso);

  const members = await db.familyMembership.findMany({
    where:  { groupId: group.id },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
          avatarType: true,
        },
      },
    },
    orderBy: { joinedAt: "asc" },
  });

  const memberIds = members.map((m) => m.userId);

  const attempts = await db.attempt.groupBy({
    by:      ["userId"],
    where: {
      userId:      { in: memberIds },
      completedAt: { gte: startUtc, lt: endExclusiveUtc },
    },
    _count: { _all: true },
  });
  const countMap = new Map(attempts.map((a) => [a.userId, a._count._all]));
  const totals = attempts.reduce((s, a) => s + a._count._all, 0);

  const isAr = locale === "ar";
  const weekLabel = isAr
    ? `${weekIso.replace("-W", " — ")}`
    : `Week ${weekIso}`;

  return {
    group: {
      id:         group.id,
      name:       group.name,
      inviteCode: group.inviteCode,
      ownerId:    group.ownerId,
      isOwner:    group.ownerId === userId,
    },
    questTarget:     QUEST_TARGET,
    questProgress:   totals,
    weekLabel,
    members: members.map((m) => ({
      userId:          m.userId,
      displayName:     m.user.displayName ?? (isAr ? "مستكشف" : "Explorer"),
      avatarType:      m.user.avatarType,
      quizzesThisWeek: countMap.get(m.userId) ?? 0,
    })),
  };
}
