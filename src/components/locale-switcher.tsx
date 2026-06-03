"use client";

import { useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

// Label shown on the button = the language you'll switch TO.
const NEXT_LOCALE: Record<string, { target: string; label: string }> = {
  zh: { target: "en", label: "EN" },
  en: { target: "zh", label: "中" },
};

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next = NEXT_LOCALE[locale] ?? NEXT_LOCALE.zh;

  function toggle() {
    startTransition(() => {
      // Keeps the current path, swapping only the locale segment.
      router.replace(pathname, { locale: next.target });
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("toggleLanguage")}
      disabled={isPending}
      onClick={toggle}
      className="overflow-hidden font-medium"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={next.label}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {next.label}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
