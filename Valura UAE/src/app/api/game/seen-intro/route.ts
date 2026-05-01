import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * PATCH /api/game/seen-intro
 * Marks the authenticated user's hasSeenIntro flag as true.
 * Called by the IntroCinematic component on complete or skip.
 */
export async function PATCH() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { hasSeenIntro: true },
  });

  return Response.json({ success: true });
}
