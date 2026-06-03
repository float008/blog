import type { Metadata } from "next";
import Link from "next/link";

import { LogoutButton } from "@/components/admin/logout-button";
import { ThemeProvider } from "@/components/theme-provider";
import { getSession } from "@/lib/auth";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import "../globals.css";

export const metadata: Metadata = {
  title: "后台",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html
      lang="zh"
      suppressHydrationWarning
      className={cn("h-full antialiased", fontVariables)}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b">
            <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
              <Link href="/admin" className="font-heading font-bold">
                后台
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {siteConfig.brand}
                </span>
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  查看站点
                </Link>
                {session && <LogoutButton />}
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
