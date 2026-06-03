import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { DeleteForm } from "@/components/admin/delete-form";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { getAllPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

export default async function AdminHome() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">文章（{posts.length}）</h1>
        <Link href="/admin/new" className={cn(buttonVariants())}>
          <Plus className="size-4" />
          新建文章
        </Link>
      </div>

      <div className="divide-y rounded-xl border">
        {posts.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">还没有文章，点右上角新建。</p>
        )}
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{post.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {post.date} · {post.tags.join("、") || "无标签"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/edit/${encodeURIComponent(post.slug)}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                <Pencil className="size-4" />
                编辑
              </Link>
              <DeleteForm slug={post.slug} title={post.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
