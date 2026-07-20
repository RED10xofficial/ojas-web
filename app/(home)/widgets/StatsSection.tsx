"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck } from "lucide-react";
import ScrollHighlightedText from "./ScrollHighlightedText";
import type { StatsSection as StatsSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

function CountUp({ value, label, suffix = "%" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (t: number) => {
      const p = Math.min((t - start) / 1500, 1);
      const ease = 1 - (1 - p) * (1 - p);
      setCount(Math.floor(ease * value));
      if (p < 1) requestAnimationFrame(animate); else setCount(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);
  return (
    <div ref={ref} className="text-center p-6 sm:p-8 bg-bg-surface rounded-2xl border border-brand-subtle shadow-sm hover:shadow-md transition-all group">
      <div className="text-4xl lg:text-5xl font-bold text-text-primary group-hover:text-brand-hover mb-3 flex justify-center items-baseline transition-colors">
        <span>{count}</span><span className="text-2xl ml-0.5">{suffix}</span>
      </div>
      <p className="text-text-secondary font-medium text-sm lg:text-base">{label}</p>
    </div>
  );
}

/* ─── Defaults ─── */
const defaultStats = [
  { value: 97, label: "Diagnostic Accuracy", suffix: "%" },
  { value: 98, label: "Patient Retention", suffix: "%" },
  { value: 90, label: "Clinician Time Saved", suffix: "%" },
];

/* ─── Main Section ─── */
export default function StatsSection({ data, wrapperClass }: { data?: StatsSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "State-of-the-Art Precision Bio-Intelligence";
  const description = data?.description ?? "OJAS operates on a multi-modal biological transformer architecture optimized for root-cause analysis, hitting frontier performance metrics across clinical frameworks.";
  const stats = data?.stats ?? defaultStats;
  const trustBadgeText = data?.trustBadgeText ?? "Trusted by 5000+ Verified Clinicians Worldwide";

  return (
    <section id="roi-calculator-section" className={cn("py-16 sm:py-24 overflow-hidden bg-slate-50/30", wrapperClass)}>
      <div className="global-container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 lg:p-14 rounded-4xl bg-brand-dark/2 border border-brand-blue/10 relative overflow-hidden text-center"
        >
          <div className="relative z-10">
            <h2 className="text-28 lg:text-48 font-display font-medium mb-4 text-text-primary leading-[1.15]">{title}</h2>
            <div className="text-14 sm:text-base text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              <ScrollHighlightedText text={description} />
            </div>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <CountUp key={idx} value={stat.value} label={stat.label} suffix={stat.suffix ?? "%"} />
              ))}
            </div>
            <div className="mt-10 sm:mt-14 items-center gap-2 text-12 sm:text-sm font-bold text-text-secondary uppercase tracking-widest">
              <span><ShieldCheck className="text-emerald-500 inline-flex align-middle mr-2 -mt-1" size={18} /></span>
              <span>{trustBadgeText}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
