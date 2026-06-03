import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { pickLocale, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// metadata 改为按 locale 动态生成，保证 <title>/OG/description 也会随语言切换
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const name = pickLocale(siteConfig.name, locale);
  const title = pickLocale(siteConfig.title, locale);
  const bio = pickLocale(siteConfig.bio, locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${name} · ${title}`,
      template: `%s | ${siteConfig.brand}`,
    },
    description: bio,
    openGraph: {
      type: "website",
      title: `${name} · ${title}`,
      description: bio,
      url: siteConfig.url,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("h-full antialiased", fontVariables)}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MotionProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
