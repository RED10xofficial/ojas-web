"use client";

import { motion } from "motion/react";
import type { IvfImpactSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultItems = [
  {
    title: "Improve IVF Success Rates Where It Matters Most",
    description:
      "Metabolic optimization changes outcomes where it matters most. PCOS, insulin resistance, obesity, thyroid. Better patient outcomes lead to higher success rates. Higher success rates build a stronger clinic.",
  },
  {
    title: 'Stop Losing Patients to "Come Back When You Lose Weight"',
    description:
      "Don't send metabolic patients away for six months. Keep them engaged with AI-guided metabolic optimization and continuous monitoring from day one. Start IVF when their biology is ready, not just when the calendar says so.",
  },
  {
    title: "Become the AI-Powered IVF Center in Your City",
    description:
      "No IVF center in your market is offering this today. You will be the first. That positioning attracts the patients who research online, compare options, and choose the most advanced center. Once you have it and your competitor does not, they cannot catch up quickly. This is a 12 to 18 month head start.",
  },
  {
    title: "Premium Patient Experience That Drives Referrals",
    description:
      "A patient wearing the MAI band feels monitored. She sees her doctor making decisions based on continuous data, not just one blood draw per visit. That experience converts into word-of-mouth referrals that no marketing budget can buy.",
  },
  {
    title: "Your Data Gets Smarter Over Time",
    description:
      "Every patient who goes through your center makes the AI better for the next one. The system learns your patient population, your protocols, your outcomes. Within 12 months, you are operating with a clinical intelligence layer no new center can replicate. The data is your moat.",
  },
];

/* Dosage ticks along the barrel; the middle pair is dropped on small screens. */
const barrelTicks = [
  { label: "0 mL", major: true, compact: true },
  { label: "5 mL", major: false, compact: false },
  { label: "10 mL", major: true, compact: true },
  { label: "15 mL", major: false, compact: false },
  { label: "20 mL", major: true, compact: true, accent: true },
];

export default function IvfImpactSection({
  data,
  wrapperClass,
}: {
  data?: IvfImpactSection;
  wrapperClass?: string;
}) {
  const title =
    data?.title ??
    "Higher Success Rates. Premium Positioning. Patients Who Never Leave.";
  const items = data?.items?.length ? data.items : defaultItems;

  return (
    <section
      id="impact"
      className={cn(
        "scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-24 bg-bg-page border-b border-brand-subtle overflow-hidden",
        wrapperClass,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-24 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            {title}
          </h2>
        </div>

        {/* Horizontal injection-syringe pods, one per benefit */}
        <div className="space-y-6 sm:space-y-10 max-w-5xl mx-auto">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative flex items-center group"
            >
              {/* Plunger */}
              <div className="hidden sm:flex items-center shrink-0 z-10">
                <div className="w-7 h-11 rounded-l-xl bg-gradient-to-r from-slate-200 to-slate-100 border border-brand-subtle flex flex-col justify-between py-1 items-center shadow-2xs">
                  <div className="w-1 h-2 bg-slate-400/40 rounded-full" />
                  <div className="w-1 h-2 bg-slate-400/40 rounded-full" />
                </div>
                <div className="w-9 h-3 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 border-y border-brand-subtle relative flex items-center justify-center">
                  <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-11 font-mono font-bold flex items-center justify-center shadow-sm z-10">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="w-3 h-9 bg-brand-dark rounded-r-xs shadow-inner" />
              </div>

              {/* Barrel */}
              <div className="flex-1 min-w-0 relative bg-white border border-brand-subtle rounded-2xl sm:rounded-l-lg sm:rounded-r-2xl p-5 pt-7 sm:p-6 sm:pt-8 shadow-sm group-hover:border-brand-blue group-hover:shadow-lg transition-all overflow-hidden">
                {/* Dosage graduation ticks */}
                <div className="absolute top-0 left-0 right-0 h-5 bg-bg-page border-b border-brand-subtle flex items-center justify-between px-4 sm:px-6 select-none">
                  {barrelTicks.map((tick) => (
                    <span
                      key={tick.label}
                      className={cn(
                        "flex items-center gap-1 text-9 sm:text-10 font-mono text-slate-550/70",
                        !tick.compact && "hidden sm:flex",
                      )}
                    >
                      <span
                        className={cn(
                          "w-px",
                          tick.major ? "h-2.5" : "h-2",
                          tick.accent ? "bg-brand-blue/60" : "bg-slate-550/40",
                        )}
                      />
                      <span
                        className={cn(tick.accent && "text-brand-blue font-bold")}
                      >
                        {tick.label}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Liquid level */}
                <div className="absolute bottom-0 left-0 top-5 w-1/3 bg-gradient-to-r from-brand-blue/10 via-brand-blue/5 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-start gap-3">
                  <span className="sm:hidden mt-0.5 w-6 h-6 shrink-0 rounded-full bg-brand-blue text-white text-10 font-mono font-bold flex items-center justify-center">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-18 sm:text-20 leading-[1.25] font-display font-medium text-text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Luer lock nozzle and needle */}
              <div className="hidden lg:flex items-center shrink-0 z-10 -ml-1">
                <div className="w-4 h-8 bg-gradient-to-r from-slate-200 to-brand-blue/40 rounded-r-md border-y border-r border-brand-subtle" />
                <div className="relative w-8 xl:w-12 h-px bg-gradient-to-r from-brand-blue via-slate-400 to-transparent">
                  <div className="absolute -right-1 -top-0.5 w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_8px_#B86851] animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
