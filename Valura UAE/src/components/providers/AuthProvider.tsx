"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface AuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

/**
 * NextAuth session provider — wraps the app so client components
 * can access the session via `useSession()`.
 */
export default function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
