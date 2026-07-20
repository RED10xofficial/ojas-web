"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollHighlightedTextProps {
  text: string;
  className?: string;
  isDarkTheme?: boolean;
}

export default function ScrollHighlightedText({
  text,
  className = "",
  isDarkTheme = false,
}: ScrollHighlightedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 45%"],
  });

  const words = text.split(" ");

  return (
    <span
      ref={containerRef}
      className={`${className} flex-wrap gap-x-[0.3em] gap-y-[0.1em]`}
    >
      {words.map((word, idx) => {
        const start = idx / words.length;
        const end = Math.min(1, (idx + 1.2) / words.length);

        const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
        const color = useTransform(
          scrollYProgress,
          [start, end],
          isDarkTheme
            ? ["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 1)"]
            : ["rgba(26, 111, 196, 0.25)", "rgba(4, 8, 14, 1)"]
        );

        return (
          <motion.span
            key={idx}
            style={{ opacity, color }}
            className="duration-150"
          >
            {word}{' '}
          </motion.span>
        );
      })}{` `}
    </span>
  );
}
