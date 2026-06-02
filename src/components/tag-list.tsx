import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type TagListProps = {
  tags: string[];
  className?: string;
};

export function TagList({ tags, className }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
          <Badge
            variant="secondary"
            className="transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
