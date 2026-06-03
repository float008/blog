import {
  GithubIcon,
  GlobalIcon,
  Linkedin01Icon,
  MailIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getLocale, getTranslations } from "next-intl/server";

import type { SocialLink } from "@/lib/site-config";
import { pickLocale, siteConfig } from "@/lib/site-config";

const ICONS = {
  github: GithubIcon,
  mail: MailIcon,
  linkedin: Linkedin01Icon,
  twitter: NewTwitterIcon,
  globe: GlobalIcon,
} as const;

function SocialIcon({ social, label }: { social: SocialLink; label: string }) {
  return (
    <a
      href={social.href}
      target={social.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="text-muted-foreground transition-colors hover:text-primary"
    >
      <HugeiconsIcon icon={ICONS[social.icon]} size={20} />
    </a>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="text-center text-sm text-muted-foreground sm:text-left">
          <p className="font-heading font-semibold text-foreground">
            {siteConfig.brand}
          </p>
          <p className="mt-1">
            © {year} {pickLocale(siteConfig.name, locale)}. {t("rights")}.
          </p>
          <p className="mt-0.5 text-xs">{t("builtWith")}</p>
        </div>
        {siteConfig.socials.length > 0 && (
          <div className="flex items-center gap-4">
            {siteConfig.socials.map((social) => {
              const label = pickLocale(social.label, locale);
              return <SocialIcon key={label} social={social} label={label} />;
            })}
          </div>
        )}
      </div>
    </footer>
  );
}
