import { redirect } from "next/navigation";

/**
 * Root page — redirects to default locale (en).
 * next-intl middleware handles locale detection on subsequent visits.
 */
export default function RootPage() {
  redirect("/en");
}
