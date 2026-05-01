import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { getDueMasteryWorldSlugs } from "@/app/actions/kindness";
import JourneyScreen from "./_components/JourneyScreen";

/**
 * Journey home — the persistent game hub.
 * Server component: reads user progress from DB, passes to client screen.
 */
export default async function JourneyPage({
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
    avatarType?: string | null;
    currentLevel?: number | null;
    totalXP?: number | null;
    valCoins?: number | null;
    weeklyStreakCount?: number | null;
    streakFreezeCount?: number | null;
  } | null = null;

  try {
    user = await db.user.findUnique({
      where: { id: userId },
      select: {
        displayName:       true,
        avatarType:        true,
        currentLevel:      true,
        totalXP:           true,
        valCoins:          true,
        weeklyStreakCount:  true,
        streakFreezeCount: true,
      },
    });
  } catch {
    // No database available — demo mode uses session defaults below.
  }

  const masteryWorldSlugs = await getDueMasteryWorldSlugs().catch(() => [] as string[]);

  return (
    <JourneyScreen
      user={{
        displayName:       user?.displayName      ?? session.user?.name ?? undefined,
        avatarType:        (user?.avatarType      ?? "FIGURE") as "FIGURE" | "HOME" | "GARDEN",
        currentLevel:      user?.currentLevel ?? 1,
        totalXP:           user?.totalXP          ?? 0,
        valCoins:          user?.valCoins         ?? 0,
        weeklyStreakCount:  user?.weeklyStreakCount ?? 0,
        streakFreezeCount:  user?.streakFreezeCount ?? 0,
      }}
      masteryWorldSlugs={masteryWorldSlugs}
      locale={locale}
    />
  );
}
