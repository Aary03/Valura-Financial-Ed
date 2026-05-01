import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Get the current session in a server component.
 * Returns null if unauthenticated.
 */
export async function getSession() {
  return auth();
}

/**
 * Get the current session and redirect to sign-in if not authenticated.
 * Use in protected server components.
 */
export async function requireAuth(locale: string = "en") {
  const session = await auth();
  if (!session?.user) {
    redirect(`/${locale}/sign-in`);
  }
  return session;
}

/**
 * Get the current user ID from the session (server-side).
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}
