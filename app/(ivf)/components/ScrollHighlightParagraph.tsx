"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/app/lib/cn";

/** One word per component: each needs its own transform off the shared scroll. */
function ScrollHighlightWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1.8 / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(progress, [start, end], ["#DCA99B", "#B86851"]);

  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {word}
    </motion.span>
  );
}

/** Closing statement that lights up word by word as it scrolls into view. */
export default function ScrollHighlightParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "start 0.35"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={cn("mt-12 sm:mt-16 text-center max-w-3xl mx-auto", className)}
    >
      <p className="text-18 sm:text-20 md:text-24 leading-relaxed font-display font-medium flex flex-wrap justify-center gap-x-[0.28em] gap-y-1">
        {words.map((word, idx) => (
          <ScrollHighlightWord
            key={idx}
            word={word}
            index={idx}
            total={words.length}
            progress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}
