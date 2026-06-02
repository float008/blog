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

export const siteConfig = {
  /** Used for <title> default and metadataBase */
  name: "Your Name",
  /** Latin/handle shown on the logo */
  brand: "Blog",
  /** Job title / headline */
  title: "Frontend Engineer",
  /** One-line tagline for the hero (keep it punchy) */
  tagline: "我做有温度的界面，也写经得起推敲的代码。",
  /** Short bio paragraph for the About page */
  bio: "拥有多年前端开发经验，专注于现代 Web 应用的体验与性能。熟悉 React / Next.js 生态，关注设计系统与工程化实践。目前正在寻找新的机会。",
  /** Deployed site URL — used for metadataBase / OG / canonical */
  url: "https://example.com",
  email: "you@example.com",
  location: "China",
  yearsOfExperience: "10+",
  /** Link to your résumé (PDF or page). Leave empty to hide the CTA. */
  resumeUrl: "",
  openToWork: true,

  socials: [
    { label: "GitHub", href: "https://github.com/your-handle", icon: "github" },
    { label: "Email", href: "mailto:you@example.com", icon: "mail" },
  ] satisfies SocialLink[],

  /** Tech stack shown on the About page, grouped by category */
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      category: "Frameworks",
      items: ["React", "Next.js", "Vue", "Node.js"],
    },
    {
      category: "Styling",
      items: ["Tailwind CSS", "CSS Modules", "shadcn/ui"],
    },
    {
      category: "Tooling",
      items: ["Vite", "Turbopack", "Webpack", "Git", "Vitest"],
    },
    {
      category: "Backend & Data",
      items: ["Prisma", "PostgreSQL", "REST", "GraphQL"],
    },
  ] satisfies SkillGroup[],
} as const;

export type SiteConfig = typeof siteConfig;
