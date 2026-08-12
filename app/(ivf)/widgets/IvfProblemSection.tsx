"use client";

import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCw,
  type LucideIcon,
} from "lucide-react";
import type { IvfProblemSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultSteps = [
  {
    number: "1",
    description:
      "Your IVF success rate is your biggest competitive advantage. Every percentage point increase in your success rate wins more patients.",
  },
  {
    number: "2",
    description:
      "Most IVF centers optimize the cycle—not the patient. Yet up to 70% of patients begin treatment with metabolic conditions such as PCOS, insulin resistance, thyroid dysfunction, chronic inflammation, poor sleep, and chronic stress.",
  },
  {
    number: "3",
    description:
      "These conditions silently reduce egg quality, implantation, and pregnancy outcomes. Yet most clinics still optimize the cycle while hoping the biology follows.",
  },
  {
    number: "4",
    description:
      "The IVF centers that lead the next decade will optimize metabolic health before and during treatment, using AI and continuous patient monitoring instead of guesswork and quarterly blood panels.",
  },
];

/**
 * Fixed 2x2 choreography: each card points at the next one so the four steps
 * read as a closed loop. Cards 3 and 4 swap grid slots from md up to keep the
 * numbering clockwise; below that they stack in order and point downwards.
 */
const cardLayout: {
  from: { x: number; y: number };
  delay: number;
  orderClass?: string;
  arrowClass: string;
  ArrowIcon: LucideIcon;
  arrowHover: string;
  mobileArrow: boolean;
}[] = [
  {
    from: { x: -20, y: -20 },
    delay: 0,
    arrowClass: "-right-5 top-1/2 -translate-y-1/2",
    ArrowIcon: ArrowRight,
    arrowHover: "group-hover:translate-x-0.5",
    mobileArrow: true,
  },
  {
    from: { x: 20, y: -20 },
    delay: 0.1,
    arrowClass: "left-1/2 -bottom-5 -translate-x-1/2",
    ArrowIcon: ArrowDown,
    arrowHover: "group-hover:translate-y-0.5",
    mobileArrow: true,
  },
  {
    from: { x: 20, y: 20 },
    delay: 0.2,
    orderClass: "md:order-4",
    arrowClass: "-left-5 top-1/2 -translate-y-1/2",
    ArrowIcon: ArrowLeft,
    arrowHover: "group-hover:-translate-x-0.5",
    mobileArrow: true,
  },
  {
    from: { x: -20, y: 20 },
    delay: 0.3,
    orderClass: "md:order-3",
    arrowClass: "left-1/2 -top-5 -translate-x-1/2",
    ArrowIcon: ArrowUp,
    arrowHover: "group-hover:-translate-y-0.5",
    mobileArrow: false,
  },
];

export default function IvfProblemSection({
  data,
  wrapperClass,
}: {
  data?: IvfProblemSection;
  wrapperClass?: string;
}) {
  const title = data?.title ?? "The #1 Reason IVF Cycles Fail Isn't the Cycle.";
  const badgeText = data?.badgeText ?? "Looping Paradox";
  const steps = data?.steps?.length ? data.steps : defaultSteps;

  return (
    <section
      id="problem"
      className={cn(
        "scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-24 bg-bg-surface border-y border-brand-subtle overflow-hidden",
        wrapperClass,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-24 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary max-w-3xl mx-auto">
            {title}
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Loop badge, pinned at the grid intersection from md up */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 items-center justify-center pointer-events-none">
            <div className="bg-brand-blue text-white border-2 border-brand-dark px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2">
              <RotateCw
                className="w-4 h-4 shrink-0 animate-spin"
                style={{ animationDuration: "6s" }}
              />
              <span className="text-11 font-mono font-bold tracking-widest uppercase">
                {badgeText}
              </span>
            </div>
          </div>

          <div className="md:hidden flex justify-center mb-6">
            <div className="bg-brand-blue text-white border-2 border-brand-dark px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
              <RotateCw
                className="w-3.5 h-3.5 shrink-0 animate-spin"
                style={{ animationDuration: "6s" }}
              />
              <span className="text-10 font-mono font-bold tracking-widest uppercase">
                {badgeText}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const layout = cardLayout[idx % cardLayout.length];
              const { ArrowIcon } = layout;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: layout.from.x, y: layout.from.y }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: layout.delay }}
                  className={cn(
                    "group relative flex flex-col justify-between bg-white border border-brand-subtle rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:border-brand-blue hover:shadow-lg transition-all",
                    layout.orderClass,
                  )}
                >
                  <div>
                    <span className="mb-4 w-7 h-7 rounded-full bg-brand-dark text-white text-11 font-mono font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-medium">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow to the next card in the loop */}
                  <div
                    className={cn(
                      "hidden md:flex absolute z-20 w-10 h-10 rounded-full bg-brand-dark border-2 border-brand-blue text-brand-blue items-center justify-center shadow-md",
                      layout.arrowClass,
                    )}
                  >
                    <ArrowIcon
                      className={cn(
                        "w-5 h-5 transition-transform",
                        layout.arrowHover,
                      )}
                    />
                  </div>

                  {layout.mobileArrow && (
                    <div className="md:hidden flex justify-center mt-4 text-brand-blue">
                      <ArrowDown className="w-5 h-5 animate-bounce" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
