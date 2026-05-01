import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPledges } from "@/app/actions/pledge";
import PledgesScreen from "./_components/PledgesScreen";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PledgesPage({ params }: Props) {
  const { locale } = await params;
  const session    = await auth();
  if (!session?.user?.id) redirect(`/${locale}/sign-in`);

  const pledges = await getPledges();
  return <PledgesScreen locale={locale} pledges={pledges} />;
}
