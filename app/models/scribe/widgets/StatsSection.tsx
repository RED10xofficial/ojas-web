"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { StatsSection as StatsSectionType } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

function CountUp({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-5xl font-display font-black text-brand-blue">
        {count}%
      </span>
      <p className="text-sm text-text-secondary font-semibold mt-2">{label}</p>
    </div>
  );
}

const defaultStats = [
  { value: 97, label: "Diagnostic Accuracy" },
  { value: 98, label: "Patient Retention" },
  { value: 90, label: "Clinician Time Saved" },
];

export default function StatsSection({ data, wrapperClass }: { data?: StatsSectionType; wrapperClass?: string }) {
  const title = data?.title ?? "State-of-the-Art Precision Bio-Intelligence";
  const description = data?.description ?? "OJAS operates on a multi-modal biological transformer architecture optimized for root-cause analysis, hitting frontier performance metrics across clinical frameworks.";
  const displayStats = data?.stats?.length ? data.stats : defaultStats;

  return (
    <section className={cn("py-16 sm:py-24 overflow-hidden bg-slate-50/30 border-t border-brand-subtle", wrapperClass)}>
      <div className="global-container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-10 lg:p-14 rounded-2xl bg-brand-dark/2 border border-brand-blue/10 relative overflow-hidden text-center mb-12 sm:mb-16"
        >
          <div className="relative z-10">
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary text-center">
              {title}
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed font-medium text-center">
              {description}
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {displayStats.map((stat) => (
                <CountUp key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
