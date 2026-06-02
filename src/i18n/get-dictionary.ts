import type { Locale } from "@/i18n/config";
import en from "@/messages/en.json";
import zh from "@/messages/zh.json";

const dictionaries = { zh, en } as const;

export type Dictionary = (typeof dictionaries)["zh"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
