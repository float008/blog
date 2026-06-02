"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/navigation";

type LocaleToggleProps = {
  locale: Locale;
  label: string;
};

export function LocaleToggle({ locale, label }: LocaleToggleProps) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "zh" ? "en" : "zh";

  return (
    <Link
      href={switchLocalePath(pathname, nextLocale)}
      aria-label={label}
      className={cn(
        "inline-flex h-8 items-center rounded-full border border-border px-2.5 text-xs font-medium transition-colors hover:bg-muted",
      )}
    >
      {locale === "zh" ? "EN" : "中"}
    </Link>
  );
}
