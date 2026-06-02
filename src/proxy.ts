import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 renamed `middleware` to `proxy`. With a `src/` directory the file
// must live at `src/proxy.ts` (same level as `app`). next-intl's middleware
// factory returns a request handler, exported here as the proxy default export.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next internals and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
