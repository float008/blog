import { ArrowRight, FileText } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Stagger, StaggerItem } from "@/components/motion/primitives";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { pickLocale, siteConfig } from "@/lib/site-config";

export async function Hero() {
  const t = await getTranslations("home");
  const tAbout = await getTranslations("about");
  const locale = await getLocale();

  return (
    <section className="relative overflow-hidden border-b">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
      <Stagger
        inView={false}
        stagger={0.12}
        className="mx-auto max-w-5xl px-4 py-20 sm:py-28"
      >
        <StaggerItem>
          <p className="text-lg text-muted-foreground">{t("greeting")}</p>
        </StaggerItem>
        <StaggerItem className="mt-2">
          <h1 className="font-heading text-5xl font-extrabold tracking-tight sm:text-6xl">
            <span className="text-gradient text-gradient-shimmer">
              {pickLocale(siteConfig.name, locale)}
            </span>
          </h1>
        </StaggerItem>
        <StaggerItem className="mt-3">
          <p className="text-xl font-medium text-foreground sm:text-2xl">
            {pickLocale(siteConfig.title, locale)}
          </p>
        </StaggerItem>
        <StaggerItem className="mt-6">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {pickLocale(siteConfig.tagline, locale)}
          </p>
        </StaggerItem>
        <StaggerItem className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" render={<Link href="/about" />}>
            {tAbout("title")}
            <ArrowRight className="size-4" />
          </Button>
          {siteConfig.resumeUrl && (
            <Button
              size="lg"
              variant="outline"
              render={
                <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer" />
              }
            >
              <FileText className="size-4" />
              {tAbout("viewResume")}
            </Button>
          )}
        </StaggerItem>
      </Stagger>
    </section>
  );
}
