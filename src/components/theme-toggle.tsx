"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

type ThemeToggleProps = {
  labels: {
    toggle: string;
    light: string;
    dark: string;
    system: string;
  };
};

const cycle = ["light", "dark", "system"] as const;

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const icon =
    theme === "light" ? (
      <Sun className="size-4" />
    ) : theme === "dark" ? (
      <Moon className="size-4" />
    ) : (
      <Monitor className="size-4" />
    );

  const title =
    theme === "light"
      ? labels.light
      : theme === "dark"
        ? labels.dark
        : labels.system;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={labels.toggle}
      title={title}
      onClick={() => {
        const index = cycle.indexOf(theme);
        setTheme(cycle[(index + 1) % cycle.length]);
      }}
    >
      {icon}
    </Button>
  );
}
