import type { Locale } from "@/i18n/config";
import { getSiteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = getDictionary(locale);
  const site = getSiteConfig(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/80">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. {t.footer.rights}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={`mailto:${site.links.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
