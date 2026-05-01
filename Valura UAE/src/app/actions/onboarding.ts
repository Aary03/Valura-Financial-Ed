"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const PseudonymSchema = z.string().min(2, "Too short").max(32, "Too long");
/**
 * Saves the player's public pseudonym (never legal name). Idempotent thereafter.
 *
 * Args:
 *   pseudonym: Chosen label shown to friends — no phone or full name enforced by pattern.
 *
 * Returns:
 *   `{ success: true }` or `{ error: string }`.
 */
export async function savePseudonym(pseudonym: string): Promise<{ success: boolean; error?: string }> {
  const session = await auth();
  const userId  = session?.user?.id;
  if (!userId) return { success: false, error: "Unauthenticated" };

  const parsed = PseudonymSchema.safeParse(pseudonym.trim());
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid" };

  const email = session?.user?.email ?? null;

  try {
    await db.user.upsert({
      where:  { id: userId },
      create: {
        id:                userId,
        email:             email ?? undefined,
        displayName:       parsed.data,
        pseudonymChosenAt: new Date(),
      },
      update: {
        displayName:       parsed.data,
        pseudonymChosenAt: new Date(),
      },
    });
  } catch {
    // DB unavailable (demo / no DATABASE_URL) — skip persistence, continue anyway.
  }

  revalidatePath("/", "layout");
  return { success: true };
}
