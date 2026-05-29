import type { Post as PrismaPost } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function toMeta(post: PrismaPost): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: toDateString(post.date),
    tags: (post.tags as string[]) ?? [],
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await prisma.post.findMany({
    orderBy: { date: "desc" },
  });

  return posts.map(toMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return null;
  }

  return { ...toMeta(post), content: post.content };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({ select: { slug: true } });
  return posts.map((post) => post.slug);
}
