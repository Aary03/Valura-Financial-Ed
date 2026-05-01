import { getMajlisDashboard } from "@/app/actions/majlis";
import MajlisScreen from "./_components/MajlisScreen";

/**
 * Family Majlis — collaborative weekly quest shell.
 */
export default async function MajlisPage({ params: { locale } }: { params: { locale: string } }) {
  const initial = await getMajlisDashboard(locale);
  return <MajlisScreen locale={locale} initial={initial} />;
}
