import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getUserMasteryData, getUserBadges } from "@/app/actions/kindness";
import ProfileScreen from "./_components/ProfileScreen";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { locale } = await params;
  const session    = await auth();
  if (!session?.user?.id) redirect(`/${locale}/sign-in`);

  const userId = session.user.id;

  let user = {
    displayName:       session.user.name ?? null,
    currentLevel:      1,
    totalXP:           0,
    valCoins:          0,
    weeklyStreakCount:  0,
    streakFreezeCount: 0,
  };

  try {
    const row = await db.user.findUnique({
      where:  { id: userId },
      select: {
        displayName:       true,
        currentLevel:      true,
        totalXP:           true,
        valCoins:          true,
        weeklyStreakCount:  true,
        streakFreezeCount: true,
      },
    });
    if (row) user = {
      displayName:       row.displayName,
      currentLevel:      row.currentLevel,
      totalXP:           row.totalXP,
      valCoins:          row.valCoins,
      weeklyStreakCount:  row.weeklyStreakCount,
      streakFreezeCount: row.streakFreezeCount,
    };
  } catch { /* demo mode */ }

  const [masteryData, badges] = await Promise.all([
    getUserMasteryData().catch(() => []),
    getUserBadges().catch(() => []),
  ]);

  return (
    <ProfileScreen
      locale={locale}
      user={user}
      masteryData={masteryData}
      badges={badges}
    />
  );
}
