import { AuthorHero } from "@/components/author-hero";
import { PostCard } from "@/components/post-card";
import { getSiteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { getValidLocale } from "@/lib/locale";
import { getAllPosts } from "@/lib/posts";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const site = getSiteConfig(locale);

  return {
    title: site.name,
    description: site.description,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const t = getDictionary(locale);
  const posts = await getAllPosts(locale);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <AuthorHero locale={locale} />

      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          {t.home.latestPosts}
        </h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">{t.home.emptyPosts}</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
