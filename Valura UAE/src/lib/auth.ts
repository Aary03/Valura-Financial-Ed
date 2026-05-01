import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { magicLinkSchema } from "@/lib/validations/auth";
import type { NextAuthConfig } from "next-auth";

/**
 * Auth config — demo-only mode.
 *
 * Resend magic-link and PrismaAdapter are intentionally excluded here.
 * They require a live database. Once DATABASE_URL is configured and
 * migrations are run, restore them:
 *
 *   import { PrismaAdapter } from "@auth/prisma-adapter";
 *   import Resend from "next-auth/providers/resend";
 *   import { db } from "@/lib/db";
 *   adapter: PrismaAdapter(db),
 *   providers: [Resend({ apiKey: process.env.RESEND_API_KEY, ... }), ...]
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/en/sign-in",
    error: "/en/sign-in",
  },
  providers: [
    Credentials({
      id: "demo",
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const parsed = magicLinkSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // Synthetic user — no database required for demo mode.
        return {
          id: `demo-${parsed.data.email}`,
          email: parsed.data.email,
          name: parsed.data.email.split("@")[0],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
