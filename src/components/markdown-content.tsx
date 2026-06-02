import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type MarkdownContentProps = {
  content: string;
};

// react-markdown runs its rehype pipeline synchronously, which is incompatible
// with rehype-pretty-code (Shiki is async). Since this is an async Server
// Component we run the unified pipeline directly and convert the resulting hast
// tree to React elements — keeping Shiki's dual-theme highlighting.
export async function MarkdownContent({ content }: MarkdownContentProps) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
    });

  const hast = await processor.run(processor.parse(content));
  const rendered = toJsxRuntime(hast as Parameters<typeof toJsxRuntime>[0], {
    Fragment,
    jsx,
    jsxs,
  });

  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-heading prose-headings:scroll-mt-24 prose-a:text-primary prose-a:underline-offset-4 prose-img:rounded-xl">
      {rendered}
    </article>
  );
}
