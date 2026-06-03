"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
      style={{ scaleX, background: "var(--brand-gradient)" }}
    />
  );
}
