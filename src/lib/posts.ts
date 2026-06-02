import type { Locale } from "@/i18n/config";
import postsData from "@/data/posts.json";

/**
 * 文章数据当前从 JSON mock 读取。
 * 接入数据库后，可改回 prisma（配置见 prisma/、src/lib/prisma.ts）。
 */
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  locale: Locale;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

type PostsJson = {
  posts: Post[];
};

function loadPosts(): Post[] {
  const { posts } = postsData as PostsJson;
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAllPosts(locale?: Locale): Promise<PostMeta[]> {
  const posts = loadPosts();
  const filtered = locale
    ? posts.filter((post) => post.locale === locale)
    : posts;

  return filtered.map(({ content: _content, ...meta }) => meta);
}

export async function getPostBySlug(
  slug: string,
  locale?: Locale,
): Promise<Post | null> {
  const post = loadPosts().find((item) => item.slug === slug);

  if (!post) {
    return null;
  }

  if (locale && post.locale !== locale) {
    return null;
  }

  return post;
}

export async function getAllSlugs(locale?: Locale): Promise<string[]> {
  const posts = await getAllPosts(locale);
  return posts.map((post) => post.slug);
}

export function formatPostDate(date: string, locale: Locale): string {
  const parsed = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: locale === "zh" ? "long" : "short",
    day: "numeric",
  }).format(parsed);
}

export function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const cjk = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const minutes = Math.max(1, Math.ceil(words / 200 + cjk / 400));
  return minutes;
}
