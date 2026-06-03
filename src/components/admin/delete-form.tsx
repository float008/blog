"use client";

import { Trash2 } from "lucide-react";

import { deletePost } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function DeleteForm({ slug, title }: { slug: string; title: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm(`确认删除「${title}」？此操作不可撤销。`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <Button
        variant="ghost"
        size="sm"
        type="submit"
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="size-4" />
        删除
      </Button>
    </form>
  );
}
