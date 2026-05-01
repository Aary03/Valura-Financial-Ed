import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getOwnedItems } from "@/app/actions/shop";
import { db } from "@/lib/db";
import ShopScreen from "./_components/ShopScreen";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  const session    = await auth();
  if (!session?.user?.id) redirect(`/${locale}/sign-in`);

  let valCoins = 0;
  let ownedItems: Awaited<ReturnType<typeof getOwnedItems>> = [];

  try {
    const user = await db.user.findUnique({
      where:  { id: session.user.id },
      select: { valCoins: true },
    });
    valCoins   = user?.valCoins ?? 0;
    ownedItems = await getOwnedItems();
  } catch {
    // Demo mode — no DB
  }

  return (
    <ShopScreen
      locale={locale}
      valCoins={valCoins}
      ownedItems={ownedItems}
    />
  );
}
