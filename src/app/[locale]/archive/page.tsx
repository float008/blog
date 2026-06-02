import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getAllPosts, getPostsGroupedByYear } from "@/lib/posts";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "archive" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ArchivePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("archive");
  const [groups, all] = await Promise.all([
    getPostsGroupedByYear(),
    getAllPosts(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-12">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t("subtitle")} · {t("totalPosts", { count: all.length })}
        </p>
      </header>

      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.year}>
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className="font-heading text-2xl font-bold text-gradient">
                {group.year}
              </h2>
              <span className="text-sm text-muted-foreground">
                {t("postsInYear", { count: group.posts.length })}
              </span>
            </div>
            <ul className="space-y-1 border-l border-border">
              {group.posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group -ml-px flex flex-col gap-1 border-l-2 border-transparent py-2 pl-4 transition-colors hover:border-primary sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <time
                      dateTime={post.date}
                      className="shrink-0 font-mono text-xs text-muted-foreground"
                    >
                      {post.date}
                    </time>
                    <span className="font-medium transition-colors group-hover:text-primary">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
