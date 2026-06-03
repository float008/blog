"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { savePost, type SaveState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/posts";

const inputClass =
  "rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">
        {label}
        {hint && <span className="ml-2 text-xs text-muted-foreground">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function PostEditor({ initial }: { initial?: Post }) {
  const [state, formAction, pending] = useActionState<SaveState, FormData>(
    savePost,
    null,
  );
  const [content, setContent] = useState(initial?.content ?? "");

  return (
    <form action={formAction} className="space-y-6">
      {initial && (
        <input type="hidden" name="originalSlug" value={initial.slug} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="标题">
          <input
            name="title"
            required
            defaultValue={initial?.title}
            className={inputClass}
            placeholder="文章标题"
          />
        </Field>
        <Field label="Slug" hint="留空则按标题自动生成">
          <input
            name="slug"
            defaultValue={initial?.slug}
            className={inputClass}
            placeholder="my-post"
          />
        </Field>
        <Field label="日期">
          <input
            type="date"
            name="date"
            required
            defaultValue={initial?.date ?? new Date().toISOString().slice(0, 10)}
            className={inputClass}
          />
        </Field>
        <Field label="标签" hint="逗号分隔">
          <input
            name="tags"
            defaultValue={initial?.tags.join(", ")}
            className={inputClass}
            placeholder="React, 前端"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="描述">
            <input
              name="description"
              required
              defaultValue={initial?.description}
              className={inputClass}
              placeholder="一句话摘要"
            />
          </Field>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="正文（Markdown）">
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={22}
            className={`${inputClass} resize-y font-mono leading-relaxed`}
            placeholder="# 开始写作…"
          />
        </Field>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">实时预览</span>
          <article className="prose prose-neutral max-w-none rounded-lg border bg-card p-4 dark:prose-invert prose-headings:font-heading">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "*预览会显示在这里…*"}
            </ReactMarkdown>
          </article>
        </div>
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-destructive">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "保存中…" : "保存并发布"}
        </Button>
        <Button type="button" variant="ghost" render={<Link href="/admin" />}>
          取消
        </Button>
      </div>
    </form>
  );
}
