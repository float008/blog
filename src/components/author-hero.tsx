import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getSiteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AuthorHeroProps = {
  locale: Locale;
};

export function AuthorHero({ locale }: AuthorHeroProps) {
  const site = getSiteConfig(locale);
  const t = getDictionary(locale);

  return (
    <section className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Image
          src={site.avatar}
          alt={site.name}
          width={80}
          height={80}
          className="size-20 rounded-full border border-border bg-muted object-cover"
        />
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {site.name}
            </h1>
            {site.jobStatus === "open" && (
              <Badge variant="secondary">{site.jobStatusLabel}</Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {site.title} · {site.location}
          </p>
          <p className="font-medium text-foreground/90">{site.slogan}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
        <Button
          nativeButton={false}
          render={<Link href={localizedPath(locale, "/about")} />}
        >
          {t.cta.learnMore}
        </Button>
        <Button
          nativeButton={false}
          render={
            <Link href={site.resumeUrl} target="_blank" rel="noreferrer" />
          }
          variant="outline"
        >
          {t.cta.downloadResume}
        </Button>
      </div>
    </section>
  );
}
