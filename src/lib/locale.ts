import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

export function getValidLocale(value: string): Locale {
  if (!isLocale(value)) {
    notFound();
  }
  return value;
}
