import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { getAllTags } from "@/lib/posts";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tags" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function TagsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tags");
  const tags = await getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Reveal as="header" className="mb-10">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </Reveal>

      <Stagger stagger={0.04} className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <StaggerItem key={tag} hover>
            <Link href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge
                variant="outline"
                className="h-auto gap-2 px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {tag}
                <span className="rounded-full bg-muted px-1.5 text-xs text-muted-foreground">
                  {count}
                </span>
              </Badge>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
