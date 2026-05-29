import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">博客</h1>
        <p className="text-muted-foreground">
          记录技术思考与生活点滴，基于 Next.js + Tailwind + shadcn/ui 构建。
        </p>
      </section>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
