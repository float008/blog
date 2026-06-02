import type { Locale } from "@/i18n/config";

export type SkillLevel = string;

export type SkillItem = {
  name: string;
  level: SkillLevel;
  note?: string;
};

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};

export type Project = {
  name: string;
  role: string;
  stack: string[];
  href?: string;
  summary: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  jobStatus: "open" | "employed" | "hidden";
  jobStatusLabel: string;
  location: string;
  description: string;
  slogan: string;
  url: string;
  resumeUrl: string;
  avatar: string;
  links: {
    github: string;
    email: string;
    linkedin?: string;
  };
  about: {
    intro: string[];
    lookingFor: string;
  };
  techStack: SkillCategory[];
  projects: Project[];
};

const siteZh: SiteConfig = {
  name: "Deniro Tong",
  title: "前端工程师",
  jobStatus: "open",
  jobStatusLabel: "找工作中",
  location: "上海 · 可远程",
  description: "专注 C 端体验与前端工程化，用博客记录技术实践。",
  slogan: "用代码构建体验，用文章记录思考",
  url: "https://example.com",
  resumeUrl: "/resume-zh.pdf",
  avatar: "/avatar.svg",
  links: {
    github: "https://github.com",
    email: "hello@example.com",
  },
  about: {
    intro: [
      "我是一名前端工程师，关注 C 端产品体验、组件化与性能优化。",
      "熟悉 React / Next.js 生态，有从 0 到 1 搭建业务系统与设计系统的经验。",
      "这个博客用于记录技术实践与项目复盘，也是我的在线简历补充。",
    ],
    lookingFor: "前端 / 全栈工程师",
  },
  techStack: [
    {
      category: "前端",
      items: [
        { name: "React", level: "熟练" },
        { name: "Next.js", level: "熟练", note: "App Router、SSG" },
        { name: "TypeScript", level: "熟练" },
        { name: "Tailwind CSS", level: "熟练" },
      ],
    },
    {
      category: "工程化",
      items: [
        { name: "Git", level: "熟练" },
        { name: "ESLint", level: "熟练" },
        { name: "Prisma", level: "熟悉" },
        { name: "Docker", level: "了解" },
      ],
    },
    {
      category: "后端 & 数据",
      items: [
        { name: "Node.js", level: "熟悉" },
        { name: "PostgreSQL", level: "熟悉" },
        { name: "REST API", level: "熟练" },
      ],
    },
  ],
  projects: [
    {
      name: "个人博客",
      role: "独立开发",
      stack: ["Next.js", "Tailwind", "Prisma"],
      summary: "Markdown 写作 + PostgreSQL 存储，支持中英文与亮暗主题。",
    },
  ],
};

const siteEn: SiteConfig = {
  name: "Deniro Tong",
  title: "Frontend Engineer",
  jobStatus: "open",
  jobStatusLabel: "Open to work",
  location: "Shanghai · Remote OK",
  description:
    "Focused on consumer-facing UI and frontend engineering. Writing to document my practice.",
  slogan: "Building experiences with code, capturing thoughts in writing",
  url: "https://example.com",
  resumeUrl: "/resume-en.pdf",
  avatar: "/avatar.svg",
  links: {
    github: "https://github.com",
    email: "hello@example.com",
  },
  about: {
    intro: [
      "I'm a frontend engineer focused on consumer product UX, component architecture, and performance.",
      "Experienced with the React / Next.js ecosystem, from greenfield apps to design systems.",
      "This blog documents my technical work and serves as a living supplement to my resume.",
    ],
    lookingFor: "Frontend / Full-stack Engineer",
  },
  techStack: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: "Proficient" },
        { name: "Next.js", level: "Proficient", note: "App Router, SSG" },
        { name: "TypeScript", level: "Proficient" },
        { name: "Tailwind CSS", level: "Proficient" },
      ],
    },
    {
      category: "Tooling",
      items: [
        { name: "Git", level: "Proficient" },
        { name: "ESLint", level: "Proficient" },
        { name: "Prisma", level: "Familiar" },
        { name: "Docker", level: "Basic" },
      ],
    },
    {
      category: "Backend & Data",
      items: [
        { name: "Node.js", level: "Familiar" },
        { name: "PostgreSQL", level: "Familiar" },
        { name: "REST API", level: "Proficient" },
      ],
    },
  ],
  projects: [
    {
      name: "Personal blog",
      role: "Solo developer",
      stack: ["Next.js", "Tailwind", "Prisma"],
      summary:
        "Markdown authoring with PostgreSQL, bilingual UI, and light/dark themes.",
    },
  ],
};

export function getSiteConfig(locale: Locale): SiteConfig {
  return locale === "en" ? siteEn : siteZh;
}
