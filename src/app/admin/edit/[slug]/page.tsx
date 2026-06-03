import { notFound, redirect } from "next/navigation";

import { PostEditor } from "@/components/admin/post-editor";
import { getSession } from "@/lib/auth";
import { getPostBySlug } from "@/lib/posts";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">编辑文章</h1>
      <PostEditor initial={post} />
    </div>
  );
}
