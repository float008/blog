import type { Metadata } from "next";
import { FileText, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

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
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
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
      </div>

      <p className="mt-8 text-base leading-relaxed text-muted-foreground">
        {siteConfig.bio}
      </p>

      {/* Basic info */}
      <h2 className="mt-12 font-heading text-xl font-bold">{t("basicInfo")}</h2>
      <Card className="mt-4">
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InfoRow label={t("location")} value={siteConfig.location} />
          <InfoRow
            label={t("yearsOfExperience")}
            value={siteConfig.yearsOfExperience}
          />
          <InfoRow label={t("currentRole")} value={siteConfig.title} />
          {siteConfig.openToWork && (
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                {t("currentRole")}
              </span>
              <span className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                {t("openToWork")}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tech stack */}
      <h2 className="mt-12 font-heading text-xl font-bold">{t("techStack")}</h2>
      <div className="mt-4 space-y-6">
        {siteConfig.skills.map((group, i) => (
          <div key={group.category}>
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
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <Card className="mt-12 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold">
              {t("contactTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("contactSubtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button render={<a href={`mailto:${siteConfig.email}`} />}>
              <Mail className="size-4" />
              {t("sendEmail")}
            </Button>
            {siteConfig.resumeUrl && (
              <Button
                variant="outline"
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
        </CardContent>
      </Card>
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
