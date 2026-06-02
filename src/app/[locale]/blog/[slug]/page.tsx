import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/markdown-content";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSiteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedPath } from "@/i18n/navigation";
import { getValidLocale } from "@/lib/locale";
import {
  estimateReadingMinutes,
  formatPostDate,
  getAllSlugs,
  getPostBySlug,
} from "@/lib/posts";
import { cn } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const zhSlugs = await getAllSlugs("zh");
  const enSlugs = await getAllSlugs("en");

  return [
    ...zhSlugs.map((slug) => ({ locale: "zh", slug })),
    ...enSlugs.map((slug) => ({ locale: "en", slug })),
  ];
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = getValidLocale(localeParam);
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Not found" };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = getValidLocale(localeParam);
  const post = await getPostBySlug(slug, locale);
  const t = getDictionary(locale);
  const site = getSiteConfig(locale);

  if (!post) {
    notFound();
  }

  const readingMinutes = estimateReadingMinutes(post.content);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href={localizedPath(locale, "/")}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 -ml-2",
        )}
      >
        <ArrowLeft className="size-4" />
        {t.cta.backHome}
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {formatPostDate(post.date, locale)}
          </time>
          <span>·</span>
          <span>
            {readingMinutes} {t.post.minRead}
          </span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.description}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Separator className="my-8" />

      <MarkdownContent content={post.content} />

      <Separator className="my-10" />

      <section className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
        <h2 className="font-heading text-lg font-semibold">
          {t.post.authorCardTitle}
        </h2>
        <p className="mt-2 text-muted-foreground">{t.post.authorCardDesc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={localizedPath(locale, "/about")}
            className={buttonVariants({ size: "sm" })}
          >
            {t.cta.viewAbout}
          </Link>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            GitHub
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {t.cta.downloadResume}
          </a>
        </div>
      </section>
    </main>
  );
}
