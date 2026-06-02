import type { Locale } from "@/i18n/config";

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(zh|en)(\/.*)?$/);
  if (!match) {
    return pathname;
  }
  return match[2] ?? "/";
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const path = stripLocale(pathname);
  return localizedPath(locale, path);
}
