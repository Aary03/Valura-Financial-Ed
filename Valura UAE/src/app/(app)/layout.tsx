import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Authenticated app shell layout.
 * Redirects unauthenticated users to the sign-in page.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/en/sign-in");
  }
  return <>{children}</>;
}
