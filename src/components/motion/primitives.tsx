"use client";

import { createElement, type ElementType } from "react";
import { motion, type Variants } from "motion/react";

const spring = { type: "spring", stiffness: 300, damping: 30 } as const;

const TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  section: motion.section,
  header: motion.header,
  nav: motion.nav,
  span: motion.span,
} as const;

type Tag = keyof typeof TAGS;

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: spring },
};

/** Fade + slide up when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  return createElement(
    TAGS[as] as ElementType,
    {
      className,
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: VIEWPORT,
      transition: { ...spring, delay },
    },
    children,
  );
}

/** Container that orchestrates staggered entrance of its <StaggerItem> children. */
export function Stagger({
  children,
  className,
  inView = true,
  stagger = 0.08,
  delayChildren = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** true → animate on scroll-into-view; false → animate on mount (above-fold, e.g. hero) */
  inView?: boolean;
  stagger?: number;
  delayChildren?: number;
  as?: Tag;
}) {
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
  const trigger = inView
    ? { whileInView: "show", viewport: VIEWPORT }
    : { animate: "show" };

  return createElement(
    TAGS[as] as ElementType,
    { className, variants: containerVariants, initial: "hidden", ...trigger },
    children,
  );
}

/** A single item inside <Stagger>. Pass `hover` for a lift+scale micro-interaction. */
export function StaggerItem({
  children,
  className,
  hover = false,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: Tag;
}) {
  return createElement(
    TAGS[as] as ElementType,
    {
      className,
      variants: itemVariants,
      ...(hover
        ? { whileHover: { y: -6, scale: 1.02 }, transition: spring }
        : {}),
    },
    children,
  );
}

/** Simple fade + slight rise on mount (no scroll trigger). */
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
