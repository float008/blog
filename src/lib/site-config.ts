/**
 * Central site / personal configuration.
 *
 * Personal copy lives here (not in messages/*.json) so it stays close to the
 * data. Use `Localized<T>` for any field that should differ between locales —
 * pass the value through `pickLocale(value, locale)` at the call-site.
 */

/** A value that is either locale-agnostic, or has a per-locale variant. */
export type Localized<T> = T | { readonly zh: T; readonly en: T };

/** Resolve a Localized value for a given locale; falls through for plain values. */
export function pickLocale<T>(value: Localized<T>, locale: string): T {
  if (
    value !== null &&
    typeof value === "object" &&
    "zh" in (value as object) &&
    "en" in (value as object)
  ) {
    const bag = value as { zh: T; en: T };
    return locale === "en" ? bag.en : bag.zh;
  }
  return value as T;
}

export type SocialLink = {
  label: Localized<string>;
  href: string;
  /** Icon name handled in <SiteFooter> / About page */
  icon: "github" | "mail" | "linkedin" | "twitter" | "globe";
};

export type SkillGroup = {
  category: Localized<string>;
  items: readonly string[];
};

export type TimelineItem = {
  period: Localized<string>;
  title: Localized<string>;
  subtitle: Localized<string>;
};

export const siteConfig = {
  /** Used for <title> default and metadataBase */
  name: { zh: "童钰庆", en: "Yuqing Tong" } satisfies Localized<string>,
  /** Latin/handle shown on the logo */
  brand: "Blog",
  // 头像静态托管在 public/，来源是 GitHub 头像（执行 curl -sSL -o public/avatar.jpg https://github.com/float008.png 刷新）
  avatarUrl: "/avatar.jpg",
  /** Job title / headline */
  title: {
    zh: "全栈开发工程师",
    en: "Full-Stack Engineer",
  } satisfies Localized<string>,
  /** One-line tagline for the hero (keep it punchy) */
  tagline: {
    zh: "全栈偏前端，也懂点 AI。",
    en: "Full-stack with a front-end lean — and a bit of AI.",
  } satisfies Localized<string>,
  /** Short bio paragraph for the About page */
  bio: {
    zh: "全栈开发工程师，技术栈偏前端，熟悉 React / Next.js 生态；也了解一些 AI Agent 开发。",
    en: "Full-stack engineer with a front-end lean, comfortable in the React / Next.js ecosystem; also dabbling in AI agent development.",
  } satisfies Localized<string>,
  /** Deployed site URL — used for metadataBase / OG / canonical */
  url: "https://example.com",
  email: "tongqing821@gmail.com",
  location: { zh: "中国", en: "China" } satisfies Localized<string>,
  yearsOfExperience: "3",
  /** Link to your résumé (PDF or page). Leave empty to hide the CTA. */
  resumeUrl: "",

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/float008",
      icon: "github",
    },
    {
      label: "Gmail",
      href: "mailto:tongqing821@gmail.com",
      icon: "mail",
    },
    {
      label: { zh: "QQ 邮箱", en: "QQ Mail" },
      href: "mailto:347282587@qq.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],

  /** Work experience, newest first */
  experience: [
    {
      period: { zh: "2024.03 - 至今", en: "Mar 2024 - Present" },
      title: "Zenlayer",
      subtitle: {
        zh: "全栈开发工程师",
        en: "Full-Stack Engineer",
      },
    },
    {
      period: { zh: "2022.11 - 2023.12", en: "Nov 2022 - Dec 2023" },
      title: { zh: "群核科技（酷家乐）", en: "Manycore (Kujiale)" },
      subtitle: {
        zh: "前端开发工程师 · 施工图部门（实习）/ 平台研发部（正式）",
        en: "Front-End Engineer · Construction Drawing (Intern) / Platform R&D (Full-time)",
      },
    },
    {
      period: { zh: "2022.06 - 2022.10", en: "Jun 2022 - Oct 2022" },
      title: { zh: "联想 Tower PD 部门", en: "Lenovo · Tower PD" },
      subtitle: {
        zh: "前端开发工程师（实习）",
        en: "Front-End Engineer (Intern)",
      },
    },
  ] satisfies TimelineItem[],

  /** Education, newest first */
  education: [
    {
      period: "2021 - 2023",
      title: {
        zh: "江西财经大学",
        en: "Jiangxi University of Finance and Economics",
      },
      subtitle: { zh: "计算机", en: "Computer Science" },
    },
    {
      period: "2017 - 2021",
      title: { zh: "延安大学", en: "Yan'an University" },
      subtitle: { zh: "化学", en: "Chemistry" },
    },
  ] satisfies TimelineItem[],

  /** Tech stack shown on the About page, grouped by category */
  skills: [
    {
      category: { zh: "前端", en: "Frontend" },
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: { zh: "后端", en: "Backend" },
      items: ["Node.js", "NestJS", "REST API"],
    },
    {
      category: "AI",
      items: ["RAG", "LangChain", "LangGraph", "DeepAgents"],
    },
  ] satisfies SkillGroup[],
} as const;

export type SiteConfig = typeof siteConfig;
