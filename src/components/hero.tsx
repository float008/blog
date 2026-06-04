import { ArrowRight, FileText } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { FadeIn } from "@/components/motion/primitives";
import { Typewriter, type TypewriterLine } from "@/components/typewriter";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { pickLocale, siteConfig } from "@/lib/site-config";

export async function Hero() {
  const t = await getTranslations("home");
  const tAbout = await getTranslations("about");
  const locale = await getLocale();

  const lines: TypewriterLine[] = [
    {
      text: t("greeting"),
      className: "text-lg text-muted-foreground",
    },
    {
      text: pickLocale(siteConfig.name, locale),
      wrapperClassName: "mt-2",
      className:
        "font-heading text-5xl font-extrabold tracking-tight text-gradient sm:text-6xl",
    },
    {
      text: pickLocale(siteConfig.title, locale),
      wrapperClassName: "mt-3",
      className: "text-xl font-medium text-foreground sm:text-2xl",
    },
    {
      text: pickLocale(siteConfig.tagline, locale),
      wrapperClassName: "mt-6 max-w-2xl",
      className: "text-base leading-relaxed text-muted-foreground sm:text-lg",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <Typewriter lines={lines} />

        {/* Buttons fade in after the intro starts typing */}
        <FadeIn delay={1.6} className="mt-8 flex flex-wrap items-center gap-3">
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
        </FadeIn>
      </div>
    </section>
  );
}
