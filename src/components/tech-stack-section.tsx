import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/config/site";

type TechStackSectionProps = {
  title: string;
  categories: SkillCategory[];
};

export function TechStackSection({
  title,
  categories,
}: TechStackSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.category} className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Badge
                  key={item.name}
                  variant="secondary"
                  title={item.note}
                  className="px-3 py-1"
                >
                  {item.name}
                  <span className="ml-1.5 text-muted-foreground">
                    · {item.level}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
