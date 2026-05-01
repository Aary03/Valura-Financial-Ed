import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import PledgeForm from "./_components/PledgeForm";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PledgeNewPage({ params }: Props) {
  const { locale } = await params;
  const session    = await auth();
  if (!session?.user?.id) redirect(`/${locale}/sign-in`);

  let valCoins = 500; // safe default for demo

  try {
    const user = await db.user.findUnique({
      where:  { id: session.user.id },
      select: { valCoins: true },
    });
    valCoins = user?.valCoins ?? 500;
  } catch { /* demo mode */ }

  return <PledgeForm locale={locale} valCoins={valCoins} />;
}
