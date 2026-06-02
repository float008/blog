import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getSiteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/i18n/navigation";
import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const t = getDictionary(locale);
  const site = getSiteConfig(locale);

  const navItems = [
    { href: localizedPath(locale, "/"), label: t.nav.home },
    { href: localizedPath(locale, "/about"), label: t.nav.about },
    { href: localizedPath(locale, "/"), label: t.nav.posts },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4">
        <Link
          href={localizedPath(locale, "/")}
          className="shrink-0 text-lg font-semibold tracking-tight"
        >
          {site.name.split(" ")[0]}
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LocaleToggle locale={locale} label={t.locale.switch} />
          <ThemeToggle labels={t.theme} />
          <Button
            nativeButton={false}
            render={<Link href={site.resumeUrl} target="_blank" rel="noreferrer" />}
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {t.cta.downloadResume}
          </Button>
        </div>
      </div>
    </header>
  );
}
