"use client";

import { MotionConfig } from "motion/react";

// Globally respect the user's "reduce motion" OS setting — all motion
// components below will skip transform/opacity animations when requested.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
