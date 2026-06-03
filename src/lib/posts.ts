import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

export type TagCount = { tag: string; count: number };
export type YearGroup = { year: number; posts: PostMeta[] };
export type AdjacentPosts = { older: PostMeta | null; newer: PostMeta | null };

/** Normalized post shape, independent of the data source (DB or JSON mock). */
export type RawPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  content: string;
};

// Use the database when DATABASE_URL is configured; otherwise read/write the
// local JSON mock so the site (and the /admin editor) works without Postgres.
// The Prisma setup (prisma.ts / schema.prisma) is kept intact for later.
const USE_DB = Boolean(process.env.DATABASE_URL);
const MOCK_PATH = path.join(process.cwd(), "content/posts.json");

function toDateString(date: Date | string): string {
  return typeof date === "string"
    ? date.slice(0, 10)
    : date.toISOString().slice(0, 10);
}

/**
 * Reading time, CJK-aware: whitespace word counting under-counts Chinese,
 * so count CJK characters (~350/min) and latin words (~200/min) separately.
 */
export function getReadingTime(content: string): {
  minutes: number;
  words: number;
} {
  const cjk = (content.match(/[一-鿿]/g) ?? []).length;
  const latin = (
    content.replace(/[一-鿿]/g, " ").match(/\b[\w'-]+\b/g) ?? []
  ).length;
  const minutes = Math.max(1, Math.ceil(cjk / 350 + latin / 200));
  return { minutes, words: cjk + latin };
}

function sortByDateDesc(posts: RawPost[]): RawPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ---- JSON mock backend (read fresh from disk so admin writes are visible) ----

async function readMockPosts(): Promise<RawPost[]> {
  const raw = await fs.readFile(MOCK_PATH, "utf8");
  const data = JSON.parse(raw) as RawPost[];
  return data.map((post) => ({
    ...post,
    tags: post.tags ?? [],
    date: toDateString(post.date),
  }));
}

async function writeMockPosts(posts: RawPost[]): Promise<void> {
  await fs.writeFile(
    MOCK_PATH,
    `${JSON.stringify(sortByDateDesc(posts), null, 2)}\n`,
    "utf8",
  );
}

// ---- Unified read source ----

/** Single source of truth — all reads derive from this (corpus is small). */
const getRawPosts = cache(async (): Promise<RawPost[]> => {
  if (USE_DB) {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.post.findMany({ orderBy: { date: "desc" } });
    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description,
      date: toDateString(row.date),
      tags: (row.tags as string[]) ?? [],
      content: row.content,
    }));
  }
  return sortByDateDesc(await readMockPosts());
});

function toMeta(post: RawPost): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    readingMinutes: getReadingTime(post.content).minutes,
  };
}

export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  return (await getRawPosts()).map(toMeta);
});

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const post = (await getRawPosts()).find((p) => p.slug === slug);
    if (!post) return null;
    return { ...toMeta(post), content: post.content };
  },
);

export async function getAllSlugs(): Promise<string[]> {
  return (await getRawPosts()).map((post) => post.slug);
}

export async function getRecentPosts(limit = 5): Promise<PostMeta[]> {
  return (await getAllPosts()).slice(0, limit);
}

export async function getFeaturedPosts(limit = 3): Promise<PostMeta[]> {
  // No "featured" flag in the schema yet — surface the most recent posts.
  return (await getAllPosts()).slice(0, limit);
}

export async function getAllTags(): Promise<TagCount[]> {
  const posts = await getRawPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getAllTagSlugs(): Promise<string[]> {
  return (await getAllTags()).map((t) => t.tag);
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  return (await getAllPosts()).filter((post) => post.tags.includes(tag));
}

export async function getPostsGroupedByYear(): Promise<YearGroup[]> {
  const posts = await getAllPosts(); // already date desc
  const groups = new Map<number, PostMeta[]>();
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    const bucket = groups.get(year);
    if (bucket) bucket.push(post);
    else groups.set(year, [post]);
  }
  return [...groups.entries()]
    .map(([year, items]) => ({ year, posts: items }))
    .sort((a, b) => b.year - a.year);
}

export async function getAdjacentPosts(slug: string): Promise<AdjacentPosts> {
  const posts = await getAllPosts(); // date desc
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { older: null, newer: null };
  return {
    newer: posts[index - 1] ?? null, // more recent
    older: posts[index + 1] ?? null, // older
  };
}

// ---- Write operations (used by the /admin editor) ----

/** Create or update a post by slug. Switches between Postgres and the JSON mock. */
export async function upsertPostRaw(
  post: RawPost,
  originalSlug?: string,
): Promise<void> {
  if (USE_DB) {
    const { prisma } = await import("@/lib/prisma");
    const data = {
      title: post.title,
      description: post.description,
      date: new Date(post.date),
      tags: post.tags,
      content: post.content,
    };
    // Allow renaming the slug when editing.
    const where = { slug: originalSlug ?? post.slug };
    const existing = await prisma.post.findUnique({ where });
    if (existing) {
      await prisma.post.update({ where, data: { ...data, slug: post.slug } });
    } else {
      await prisma.post.create({ data: { ...data, slug: post.slug } });
    }
    return;
  }

  const posts = await readMockPosts();
  const matchSlug = originalSlug ?? post.slug;
  const idx = posts.findIndex((p) => p.slug === matchSlug);
  if (idx >= 0) posts[idx] = post;
  else posts.push(post);
  await writeMockPosts(posts);
}

export async function deletePostRaw(slug: string): Promise<void> {
  if (USE_DB) {
    const { prisma } = await import("@/lib/prisma");
    await prisma.post.delete({ where: { slug } });
    return;
  }
  const posts = await readMockPosts();
  await writeMockPosts(posts.filter((p) => p.slug !== slug));
}
