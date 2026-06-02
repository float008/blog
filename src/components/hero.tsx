import { ArrowRight, FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";

export async function Hero() {
  const t = await getTranslations("home");
  const tAbout = await getTranslations("about");

  return (
    <section className="relative overflow-hidden border-b">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
        {siteConfig.openToWork && (
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            {tAbout("openToWork")}
          </span>
        )}
        <p className="text-lg text-muted-foreground">{t("greeting")}</p>
        <h1 className="mt-2 font-heading text-5xl font-extrabold tracking-tight sm:text-6xl">
          <span className="text-gradient">{siteConfig.name}</span>
        </h1>
        <p className="mt-3 text-xl font-medium text-foreground sm:text-2xl">
          {siteConfig.title}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" render={<Link href="/about" />}>
            {tAbout("title")}
            <ArrowRight className="size-4" />
          </Button>
          {siteConfig.resumeUrl && (
            <Button
              size="lg"
              variant="outline"
              render={
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              <FileText className="size-4" />
              {tAbout("viewResume")}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
