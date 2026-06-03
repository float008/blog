"use client";

import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function SignInButton() {
  return (
    <Button size="lg" onClick={() => signIn("github", { callbackUrl: "/admin" })}>
      <HugeiconsIcon icon={GithubIcon} size={18} />
      使用 GitHub 登录
    </Button>
  );
}
