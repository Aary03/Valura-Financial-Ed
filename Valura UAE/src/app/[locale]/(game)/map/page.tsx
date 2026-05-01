import { redirect } from "next/navigation";

/**
 * Legacy /map route — redirects to the main Journey page.
 */
export default function MapPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/journey`);
}
