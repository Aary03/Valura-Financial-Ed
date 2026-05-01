import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import OnboardingScreen from "@/components/social/OnboardingScreen";

/**
 * Pseudonym onboarding — skipped once `pseudonymChosenAt` is set.
 */
export default async function OnboardingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await requireAuth(locale);

  const uid = session.user?.id;
  if (!uid) redirect(`/${locale}/sign-in`);

  // Graceful fallback when DB is not available (demo / no DATABASE_URL set).
  let pseudonymChosenAt: Date | null = null;
  try {
    const user = await db.user.findUnique({
      where:  { id: uid },
      select: { pseudonymChosenAt: true },
    });
    pseudonymChosenAt = user?.pseudonymChosenAt ?? null;
  } catch {
    // DB unavailable — treat as new user, show onboarding screen.
  }

  if (pseudonymChosenAt) {
    redirect(`/${locale}/journey`);
  }

  return <OnboardingScreen locale={locale} userIdNonce={uid.slice(-8)} />;
}
