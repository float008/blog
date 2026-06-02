import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PostCard } from "@/components/post-card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getAllTagSlugs, getPostsByTag } from "@/lib/posts";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; tag: string }> };

export async function generateStaticParams() {
  const tags = await getAllTagSlugs();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: decodeURIComponent(tag) };
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  const t = await getTranslations("tags");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/tags"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 -ml-2",
        )}
      >
        <ArrowLeft className="size-4" />
        {t("backToTags")}
      </Link>

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{decodedTag}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t("postsInTag", { count: posts.length })}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
