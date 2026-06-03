"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/tags", key: "tags" },
  { href: "/archive", key: "archive" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {siteConfig.brand}
          <span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-muted"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-menu"
            className="overflow-hidden border-t md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                    isActive(item.href)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
