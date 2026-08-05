"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin bar across the top tracking how far the reader is through the page. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed top-0 left-0 right-0 h-1 bg-brand-blue origin-left z-50"
    />
  );
}
