import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import IntroCinematic from "./_components/IntroCinematic";
import type { AvatarType } from "@prisma/client";

/**
 * Opening cinematic page — plays once per user, gated on hasSeenIntro.
 * Server component: reads session + DB, passes minimal props to client.
 */
export default async function IntroPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await requireAuth(locale);
  const userId = session.user?.id;
  if (!userId) redirect(`/${locale}/sign-in`);

  // Graceful fallback when no database is connected (demo / local dev).
  let user: {
    displayName?: string | null;
    avatarType?: AvatarType | null;
    hasSeenIntro?: boolean | null;
  } | null = null;

  try {
    user = await db.user.findUnique({
      where: { id: userId },
      select: { displayName: true, avatarType: true, hasSeenIntro: true },
    });
  } catch {
    // No database — treat as new user who hasn't seen the intro.
  }

  // Already seen the intro → skip straight to the journey map.
  // In demo mode (user === null) always show the intro.
  if (user?.hasSeenIntro) {
    redirect(`/${locale}/journey`);
  }

  return (
    <IntroCinematic
      displayName={user?.displayName ?? session.user?.name ?? undefined}
      avatarType={(user?.avatarType ?? "FIGURE") as AvatarType}
      locale={locale}
    />
  );
}
