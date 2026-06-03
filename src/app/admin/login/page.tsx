import { redirect } from "next/navigation";

import { SignInButton } from "@/components/admin/signin-button";
import { getSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <div>
        <h1 className="font-heading text-2xl font-bold">登录后台</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          仅站点所有者可登录与发布文章。
        </p>
      </div>
      <SignInButton />
    </div>
  );
}
