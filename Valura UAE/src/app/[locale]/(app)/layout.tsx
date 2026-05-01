import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import CoinDeltaToast from "@/components/game/CoinDeltaToast";
import BoostListener from "@/components/social/BoostListener";

/**
 * Authenticated app shell.
 * Full-width on all viewports — each child page manages its own max-width.
 */
export default async function AppLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await requireAuth(locale);
  // Gracefully handle DB unavailability (demo mode / migration not yet applied).
  // In demo mode the DB is unreachable, so we skip the onboarding guard entirely
  // and let authenticated users straight through to their destination.
  let dbAvailable = true;
  let pseudonymChosenAt: Date | null = null;
  try {
    const userRow = await db.user.findUnique({
      where:  { id: session.user!.id },
      select: { pseudonymChosenAt: true },
    });
    pseudonymChosenAt = userRow?.pseudonymChosenAt ?? null;
  } catch {
    dbAvailable = false;
  }

  if (dbAvailable && !pseudonymChosenAt) {
    redirect(`/${locale}/onboarding`);
  }

  return (
    <>
      {children}
      <CoinDeltaToast />
      <BoostListener locale={locale} />
    </>
  );
}
