"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

type PostTocProps = {
  items: TocItem[];
};

export function PostToc({ items }: PostTocProps) {
  const t = useTranslations("post");
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 1 },
    );

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={t("tableOfContents")} className="text-sm">
      <p className="mb-3 font-heading font-semibold text-foreground">
        {t("tableOfContents")}
      </p>
      <ul className="space-y-2 border-l border-border">
        {items.map((item) => (
          <li
            key={item.id}
            className="relative"
            style={{ paddingLeft: (item.depth - 2) * 12 }}
          >
            {activeId === item.id && (
              <motion.span
                layoutId="toc-active"
                className="absolute top-0 -left-px h-full w-0.5 rounded bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", `#${item.id}`);
              }}
              className={cn(
                "block pl-3 text-muted-foreground transition-colors hover:text-foreground",
                activeId === item.id && "font-medium text-primary",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
