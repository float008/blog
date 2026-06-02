import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { MarkdownContent } from "@/components/markdown-content";
import { PostToc } from "@/components/post-toc";
import { ReadingProgress } from "@/components/reading-progress";
import { TagList } from "@/components/tag-list";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import {
  getAdjacentPosts,
  getAllSlugs,
  getPostBySlug,
} from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    const t = await getTranslations({ locale, namespace: "post" });
    return { title: t("notFound") };
  }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("post");
  const toc = extractToc(post.content);
  const { older, newer } = await getAdjacentPosts(slug);

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-8 -ml-2",
          )}
        >
          <ArrowLeft className="size-4" />
          {t("backToHome")}
        </Link>

        <div className="gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_220px]">
          <article className="min-w-0">
            <header className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span aria-hidden>·</span>
                <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
              </div>
              <h1 className="font-heading text-4xl font-extrabold tracking-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {post.description}
              </p>
              <TagList tags={post.tags} />
            </header>

            <Separator className="my-8" />

            <MarkdownContent content={post.content} />

            {/* Prev / next */}
            {(older || newer) && (
              <nav className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2">
                {newer ? (
                  <Link
                    href={`/blog/${newer.slug}`}
                    className="group rounded-xl border p-4 transition-colors hover:border-primary/40"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="size-3" />
                      {t("next")}
                    </span>
                    <span className="mt-1 block font-medium transition-colors group-hover:text-primary">
                      {newer.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {older && (
                  <Link
                    href={`/blog/${older.slug}`}
                    className="group rounded-xl border p-4 text-right transition-colors hover:border-primary/40"
                  >
                    <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      {t("previous")}
                      <ArrowRight className="size-3" />
                    </span>
                    <span className="mt-1 block font-medium transition-colors group-hover:text-primary">
                      {older.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </article>

          {/* Sticky TOC */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <PostToc items={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
