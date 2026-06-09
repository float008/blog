import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/hero";
import { Reveal, Stagger } from "@/components/motion/primitives";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getRecentPosts } from "@/lib/posts";

// 数据来自数据库，避免 build 时连库；运行时按请求 SSR
export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const posts = await getRecentPosts(6);

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">
              {t("recentTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("recentSubtitle")}
            </p>
          </div>
          <Button variant="ghost" size="sm" render={<Link href="/archive" />}>
            {t("viewArchive")}
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>

        {posts.length > 0 ? (
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Stagger>
        ) : (
          <p className="text-muted-foreground">{t("emptyPosts")}</p>
        )}
      </section>
    </>
  );
}
