import { redirect } from "next/navigation";

import { PostEditor } from "@/components/admin/post-editor";
import { getSession } from "@/lib/auth";

export default async function NewPostPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">新建文章</h1>
      <PostEditor />
    </div>
  );
}
