import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

// NextAuth v4 config. GitHub OAuth, JWT sessions (no DB adapter needed).
// Only the single allowed GitHub account (ADMIN_GITHUB_LOGIN) may sign in.
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async signIn({ profile }) {
      const allowed = process.env.ADMIN_GITHUB_LOGIN;
      const login = (profile as { login?: string } | undefined)?.login;
      return Boolean(allowed) && login === allowed;
    },
  },
};

/** Convenience wrapper for reading the session in Server Components / Actions. */
export function getSession() {
  return getServerSession(authOptions);
}
