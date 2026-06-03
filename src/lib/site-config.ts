/**
 * Central site / personal configuration.
 *
 * ⚠️ Replace the placeholder values below with your real information — this is
 * the data shown on the home hero, the About page and the footer. Keeping it
 * here means you only edit one file. Strings here are intentionally NOT in the
 * i18n dictionaries (they're personal content, not UI chrome); set them in the
 * language you want recruiters to read, or duplicate per-locale later.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-react icon name handled in <SiteFooter> */
  icon: "github" | "mail" | "linkedin" | "twitter" | "globe";
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
};

export const siteConfig = {
  /** Used for <title> default and metadataBase */
  name: "Your Name",
  /** Latin/handle shown on the logo */
  brand: "Blog",
  /** Job title / headline */
  title: "全栈开发工程师",
  /** One-line tagline for the hero (keep it punchy) */
  tagline: "全栈偏前端，也懂点 AI。",
  /** Short bio paragraph for the About page */
  bio: "全栈开发工程师，技术栈偏前端，熟悉 React / Next.js 生态；也了解一些 AI Agent 开发。",
  /** Deployed site URL — used for metadataBase / OG / canonical */
  url: "https://example.com",
  email: "tongqing821@gmail.com",
  location: "China",
  yearsOfExperience: "3",
  /** Link to your résumé (PDF or page). Leave empty to hide the CTA. */
  resumeUrl: "",

  socials: [
    { label: "GitHub", href: "https://github.com/float008", icon: "github" },
    { label: "Gmail", href: "mailto:tongqing821@gmail.com", icon: "mail" },
    { label: "QQ 邮箱", href: "mailto:347282587@qq.com", icon: "mail" },
  ] satisfies SocialLink[],

  /** Work experience, newest first */
  experience: [
    {
      period: "2024.03 - 至今",
      title: "Zenlayer",
      subtitle: "全栈开发工程师",
    },
    {
      period: "2022.11 - 2023.12",
      title: "群核科技（酷家乐）",
      subtitle: "前端开发工程师 · 施工图部门（实习）/ 平台研发部（正式）",
    },
    {
      period: "2022.06 - 2022.10",
      title: "联想 Tower PD 部门",
      subtitle: "前端开发工程师（实习）",
    },
  ] satisfies TimelineItem[],

  /** Education, newest first */
  education: [
    {
      period: "2021 - 2023",
      title: "江西财经大学",
      subtitle: "计算机",
    },
    {
      period: "2017 - 2021",
      title: "延安大学",
      subtitle: "化学",
    },
  ] satisfies TimelineItem[],

  /** Tech stack shown on the About page, grouped by category */
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "NestJS", "REST API"],
    },
    {
      category: "AI",
      items: ["RAG", "LangChain", "LangGraph", "DeepAgents"],
    },
  ] satisfies SkillGroup[],
} as const;

export type SiteConfig = typeof siteConfig;
