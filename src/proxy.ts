import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 renamed `middleware` to `proxy`. With a `src/` directory the file
// must live at `src/proxy.ts` (same level as `app`). next-intl's middleware
// factory returns a request handler, exported here as the proxy default export.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, the /admin area, Next internals and
  // files with an extension (so /admin stays outside i18n locale redirects).
  matcher: "/((?!api|admin|_next|_vercel|.*\\..*).*)",
};

// GITHUB_ID=Ov23lisUMGII3rGpDKyv
// GITHUB_SECRET=51f698dd248302247e15fb67ce24b1d5ffc66472
// NEXTAUTH_SECRET=1uuGnz6Fts5IXCichBurKKpVgIJZim3ooqDiWaU9/cQ=
// NEXTAUTH_URL=http://localhost:3000
// ADMIN_GITHUB_LOGIN=float008
