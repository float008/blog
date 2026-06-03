import type { Metadata } from "next";
import {
  GithubIcon,
  GlobalIcon,
  Linkedin01Icon,
  MailIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig, type TimelineItem } from "@/lib/site-config";

const SOCIAL_ICONS = {
  github: GithubIcon,
  mail: MailIcon,
  linkedin: Linkedin01Icon,
  twitter: NewTwitterIcon,
  globe: GlobalIcon,
} as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: siteConfig.bio };
}

const DOT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar className="size-20 ring-2 ring-primary/20">
          <AvatarImage src="/avatar.jpg" alt={siteConfig.name} />
          <AvatarFallback className="bg-primary/10 text-xl text-primary">
            {initials(siteConfig.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {siteConfig.title}
          </p>
        </div>
      </Reveal>

      <Reveal
        delay={0.05}
        className="mt-8 text-base leading-relaxed text-muted-foreground"
      >
        {siteConfig.bio}
      </Reveal>

      {/* Basic info */}
      <Reveal className="mt-12">
        <h2 className="font-heading text-xl font-bold">{t("basicInfo")}</h2>
        <Card className="mt-4">
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InfoRow label={t("location")} value={siteConfig.location} />
          <InfoRow
            label={t("yearsOfExperience")}
            value={t("yearsValue", { years: siteConfig.yearsOfExperience })}
          />
          <InfoRow label={t("currentRole")} value={siteConfig.title} />
          <div className="flex flex-col sm:col-span-2">
            <span className="text-xs text-muted-foreground">{t("contact")}</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {siteConfig.socials.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="sm"
                  render={
                    <a
                      href={social.href}
                      target={
                        social.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noreferrer"
                    />
                  }
                >
                  <HugeiconsIcon icon={SOCIAL_ICONS[social.icon]} size={16} />
                  {social.label}
                </Button>
              ))}
              {siteConfig.resumeUrl && (
                <Button
                  size="sm"
                  render={
                    <a
                      href={siteConfig.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                >
                  <FileText className="size-4" />
                  {t("viewResume")}
                </Button>
              )}
            </div>
          </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Experience */}
      <Reveal className="mt-12">
        <h2 className="font-heading text-xl font-bold">{t("experience")}</h2>
        <Timeline items={siteConfig.experience} className="mt-4" />
      </Reveal>

      {/* Education */}
      <Reveal className="mt-12">
        <h2 className="font-heading text-xl font-bold">{t("education")}</h2>
        <Timeline items={siteConfig.education} className="mt-4" />
      </Reveal>

      {/* Tech stack */}
      <Reveal className="mt-12">
        <h2 className="font-heading text-xl font-bold">{t("techStack")}</h2>
        <Stagger stagger={0.1} className="mt-4 space-y-6">
          {siteConfig.skills.map((group, i) => (
            <StaggerItem key={group.category}>
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span
                  className="size-2 rounded-full"
                  style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                />
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="outline" className="h-7 px-3">
                    {item}
                  </Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="mt-1 text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function Timeline({
  items,
  className,
}: {
  items: readonly TimelineItem[];
  className?: string;
}) {
  return (
    <Stagger
      as="ol"
      stagger={0.1}
      className={`relative border-l border-border ${className ?? ""}`}
    >
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={`${item.period}-${item.title}`}
          className="relative py-3 pl-6"
        >
          <span className="absolute top-[1.15rem] -left-[5px] size-2.5 rounded-full bg-primary ring-4 ring-background" />
          <p className="font-mono text-xs text-muted-foreground">
            {item.period}
          </p>
          <p className="mt-0.5 font-medium text-foreground">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
