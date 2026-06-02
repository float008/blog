import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/navigation";
import {
  formatPostDate,
  type PostMeta,
} from "@/lib/posts";

type PostCardProps = {
  post: PostMeta;
  locale: Locale;
};

export function PostCard({ post, locale }: PostCardProps) {
  return (
    <Link
      href={localizedPath(locale, `/blog/${post.slug}`)}
      className="group block rounded-2xl border border-border px-4 py-4 transition-colors hover:bg-muted/50 sm:px-5 sm:py-5"
    >
      <article className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          {post.locale !== locale && (
            <Badge variant="outline" className="text-xs">
              {post.locale === "zh" ? "中文" : "EN"}
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="text-muted-foreground">{post.description}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
