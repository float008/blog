"use server";

import GithubSlugger from "github-slugger";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { deletePostRaw, upsertPostRaw } from "@/lib/posts";

export type SaveState = { error?: string } | null;

const schema = z.object({
  originalSlug: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().trim().min(1, "标题必填"),
  description: z.string().trim().min(1, "描述必填"),
  date: z.string().min(1, "日期必填"),
  tags: z.string().optional(),
  content: z.string().trim().min(1, "正文必填"),
});

export async function savePost(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  const session = await getSession();
  if (!session) return { error: "未授权" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "校验失败" };
  }
  const d = parsed.data;

  const slug = (d.slug?.trim() || new GithubSlugger().slug(d.title)).trim();
  if (!slug) return { error: "无法生成 slug，请手动填写" };

  const tags = (d.tags ?? "")
    .split(/[,，\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    await upsertPostRaw(
      {
        slug,
        title: d.title,
        description: d.description,
        date: d.date.slice(0, 10),
        tags,
        content: d.content,
      },
      d.originalSlug || undefined,
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : "保存失败" };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function deletePost(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) throw new Error("未授权");

  const slug = String(formData.get("slug") ?? "");
  if (slug) await deletePostRaw(slug);

  revalidatePath("/", "layout");
  redirect("/admin");
}
