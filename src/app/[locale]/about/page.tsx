import Image from "next/image";
import Link from "next/link";
import { getSiteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/i18n/navigation";
import { getValidLocale } from "@/lib/locale";
import { ProjectList } from "@/components/project-list";
import { TechStackSection } from "@/components/tech-stack-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const t = getDictionary(locale);

  return {
    title: t.about.title,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const t = getDictionary(locale);
  const site = getSiteConfig(locale);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Image
          src={site.avatar}
          alt={site.name}
          width={96}
          height={96}
          className="size-24 rounded-full border border-border bg-muted object-cover"
        />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {site.name}
            </h1>
            {site.jobStatus === "open" && (
              <Badge variant="secondary">{site.jobStatusLabel}</Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">
            {site.title} · {site.location}
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <Button
              nativeButton={false}
              render={
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              variant="outline"
              size="sm"
            >
              GitHub
            </Button>
            <Button
              nativeButton={false}
              render={
                <a href={`mailto:${site.links.email}`} />
              }
              variant="outline"
              size="sm"
            >
              Email
            </Button>
            <Button
              nativeButton={false}
              render={
                <a href={site.resumeUrl} target="_blank" rel="noreferrer" />
              }
              size="sm"
            >
              {t.cta.downloadResume}
            </Button>
          </div>
        </div>
      </header>

      <Separator className="my-10" />

      <div className="space-y-10">
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            {t.about.introTitle}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {site.about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <TechStackSection
          title={t.about.techStackTitle}
          categories={site.techStack}
        />

        <ProjectList title={t.about.projectsTitle} projects={site.projects} />

        <section className="space-y-3 rounded-2xl border border-border bg-muted/30 p-5">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            {t.about.blogTitle}
          </h2>
          <p className="text-muted-foreground">{t.about.blogDesc}</p>
          <Button
            nativeButton={false}
            render={<Link href={localizedPath(locale, "/")} />}
            variant="outline"
            size="sm"
          >
            {t.cta.readPosts}
          </Button>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            {t.about.contactTitle}
          </h2>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">
              {t.about.lookingFor}:
            </span>{" "}
            {site.about.lookingFor}
          </p>
          <p className="text-muted-foreground">
            Email:{" "}
            <a
              href={`mailto:${site.links.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {site.links.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
