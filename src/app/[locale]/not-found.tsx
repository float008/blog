import { getTranslations } from "next-intl/server";

import { FadeIn } from "@/components/motion/primitives";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("post");

  return (
    <FadeIn className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
      <p className="font-heading text-7xl font-extrabold text-gradient">404</p>
      <p className="mt-4 text-lg text-muted-foreground">{t("notFound")}</p>
      <Link href="/" className={`${buttonVariants({ variant: "default" })} mt-8`}>
        {t("backToHome")}
      </Link>
    </FadeIn>
  );
}
