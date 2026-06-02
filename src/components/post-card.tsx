import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/posts";

type PostCardProps = {
  post: PostMeta;
};

export async function PostCard({ post }: PostCardProps) {
  const t = await getTranslations("post");

  return (
    <Card className="group relative gap-3 transition-all hover:ring-primary/30 hover:shadow-md hover:shadow-primary/5">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span aria-hidden>·</span>
          <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
        </div>
        <CardTitle className="text-xl transition-colors group-hover:text-primary">
          {/* Stretched link makes the whole card clickable without nesting
              anchors; tags below opt out with relative z-10. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{post.description}</p>
      </CardHeader>
      {post.tags.length > 0 && (
        <CardContent className="relative z-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge
                variant="secondary"
                className="transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
