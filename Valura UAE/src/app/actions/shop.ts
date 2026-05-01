"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import type { CosmeticKind } from "@/lib/game/shop-catalog";
import { coinsToAed } from "@/lib/game/shop-catalog";

// ── Shared auth helper ─────────────────────────────────────────────────────────

async function requireUser() {
  const session = await auth();
  const userId  = session?.user?.id;
  if (!userId) throw new Error("Unauthenticated");
  return userId;
}

// ── spendCoins ────────────────────────────────────────────────────────────────

/**
 * Atomically deducts coins from the user's balance and records a CoinTxn.
 * Returns the new balance, or throws if insufficient funds.
 */
export async function spendCoins(
  coins: number,
  reason: string,
  refId?: string,
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  const userId = await requireUser();
  try {
    const result = await db.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({ where: { id: userId }, select: { valCoins: true } });
      if (user.valCoins < coins) throw new Error("Insufficient coins");
      const updated = await tx.user.update({
        where: { id: userId },
        data:  { valCoins: { decrement: coins } },
        select: { valCoins: true },
      });
      await tx.coinTxn.create({
        data: { userId, delta: -coins, reason, ...(refId ? { refId } : {}) },
      });
      return updated.valCoins;
    });
    return { success: true, newBalance: result };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: msg };
  }
}

// ── purchaseCosmetic ───────────────────────────────────────────────────────────

/**
 * Buy a cosmetic item. Deducts coins, writes CosmeticOwnership, auto-equips.
 */
export async function purchaseCosmetic(
  itemSlug: string,
  itemKind: CosmeticKind,
  price: number,
): Promise<{ success: boolean; error?: string }> {
  const userId = await requireUser();
  try {
    // Check not already owned
    const existing = await db.cosmeticOwnership.findUnique({
      where: { userId_itemSlug: { userId, itemSlug } },
    });
    if (existing) return { success: false, error: "Already owned" };

    const coinResult = await spendCoins(price, `cosmetic_purchase:${itemKind}`, itemSlug);
    if (!coinResult.success) return { success: false, error: coinResult.error };

    await db.cosmeticOwnership.create({
      data: { userId, itemSlug, itemKind, equippedAt: new Date(), purchasedAt: new Date() },
    });
    return { success: true };
  } catch (err) {
    console.error("[purchaseCosmetic]", err);
    return { success: false, error: "Purchase failed" };
  }
}

// ── equipCosmetic ─────────────────────────────────────────────────────────────

/**
 * Equip a cosmetic the user already owns.
 * Unequips all other items of the same kind first (one active per kind).
 */
export async function equipCosmetic(
  itemSlug: string,
  itemKind: CosmeticKind,
): Promise<{ success: boolean; error?: string }> {
  const userId = await requireUser();
  try {
    await db.$transaction([
      // Unequip all other items of same kind
      db.cosmeticOwnership.updateMany({
        where: { userId, itemKind, NOT: { itemSlug } },
        data:  { equippedAt: null },
      }),
      // Equip this item
      db.cosmeticOwnership.update({
        where: { userId_itemSlug: { userId, itemSlug } },
        data:  { equippedAt: new Date() },
      }),
    ]);
    return { success: true };
  } catch (err) {
    console.error("[equipCosmetic]", err);
    return { success: false, error: "Equip failed" };
  }
}

// ── donateCoins ───────────────────────────────────────────────────────────────

/**
 * Donate VAL Coins to a pre-approved charity.
 * 10,000 coins = AED 10.
 */
export async function donateCoins(
  charitySlug: string,
  coins: number,
): Promise<{ success: boolean; aedDonated?: number; error?: string }> {
  const userId = await requireUser();
  try {
    const coinResult = await spendCoins(coins, `charity_donation:${charitySlug}`, charitySlug);
    if (!coinResult.success) return { success: false, error: coinResult.error };

    const aedEquivalent = coinsToAed(coins);
    await db.charityDonation.create({
      data: { userId, charitySlug, coinsSpent: coins, aedEquivalent },
    });
    return { success: true, aedDonated: aedEquivalent };
  } catch (err) {
    console.error("[donateCoins]", err);
    return { success: false, error: "Donation failed" };
  }
}

// ── getOwnedItems ─────────────────────────────────────────────────────────────

/**
 * Returns all cosmetics owned by the current user.
 * Used by the shop page to mark items as owned/equipped.
 */
export async function getOwnedItems(): Promise<
  { itemSlug: string; itemKind: CosmeticKind; equippedAt: Date | null }[]
> {
  try {
    const userId = await requireUser();
    const rows   = await db.cosmeticOwnership.findMany({
      where:  { userId },
      select: { itemSlug: true, itemKind: true, equippedAt: true },
    });
    return rows as { itemSlug: string; itemKind: CosmeticKind; equippedAt: Date | null }[];
  } catch {
    return [];
  }
}
