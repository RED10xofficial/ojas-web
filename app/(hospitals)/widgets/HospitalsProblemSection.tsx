"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import {
  AlertTriangle,
  Database,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { HospitalsProblemSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import MarkdownText from "@/app/(home)/components/MarkdownText";
import { cn } from "@/app/lib/cn";
import SectionPhotoFrame from "../components/SectionPhotoFrame";

const DEFAULT_FRAME_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80";

interface ProblemStep {
  num: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  iconUrl: string | null;
}

const defaultSteps: ProblemStep[] = [
  {
    num: "01",
    title: "Regulatory Walls",
    body: "CDSCO. FDA. CE. A model that works in your lab cannot legally touch a patient. That alone adds 12 to 18 months most teams did not budget for.",
    Icon: ShieldAlert,
    iconUrl: null,
  },
  {
    num: "02",
    title: "Hallucination Risk",
    body: "In healthcare, a wrong AI output is not a bad recommendation. It is a clinical liability. General-purpose AI architectures are not built for this threshold.",
    Icon: AlertTriangle,
    iconUrl: null,
  },
  {
    num: "03",
    title: "Data That Does Not Exist",
    body: "Indian patient phenotypes are underrepresented in every global training dataset. Off-the-shelf models trained on Western populations fail on Indian skin, metabolic profiles, and disease patterns.",
    Icon: Database,
    iconUrl: null,
  },
  {
    num: "04",
    title: "The Talent Gap",
    body: "The number of people who understand deep learning AND clinical biology AND regulatory pathways AND production hardware is in the low hundreds globally. Most of them are already employed. Several of them work here.",
    Icon: Users,
    iconUrl: null,
  },
];

export default function HospitalsProblemSection({
  data,
  wrapperClass,
}: {
  data?: HospitalsProblemSection;
  wrapperClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const title = data?.title ?? "Why **90%** of Healthcare AI Projects Fail";
  const frameImage = getStrapiMedia(data?.frameImage?.url) ?? DEFAULT_FRAME_IMAGE;

  const steps: ProblemStep[] = data?.steps?.length
    ? data.steps.map((step, idx) => ({
        num: step.number,
        title: step.title,
        body: step.description,
        Icon: defaultSteps[idx % defaultSteps.length].Icon,
        iconUrl: getStrapiMedia(step.icon?.url),
      }))
    : defaultSteps;

  const total = steps.length;

  // Scroll physics over the h-[400vh] container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const next = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
    if (next !== activeStep) setActiveStep(next);
  });

  /*
   * One keyframe per step plus a trailing copy of the last one, so the tracker
   * rests on the final landing for the tail of the scroll.
   */
  const stops = [...steps.map((_, idx) => idx / total), 1];
  const desktopX = [
    ...steps.map((_, idx) => (idx % 2 === 0 ? "16%" : "74%")),
    total % 2 === 0 ? "74%" : "16%",
  ];
  const landingTop = (idx: number) => 20 + (idx * 60) / Math.max(total - 1, 1);
  const desktopY = [
    ...steps.map((_, idx) => `${landingTop(idx)}%`),
    `${landingTop(total - 1)}%`,
  ];

  // Zig-zag trajectory across the staircase landings
  const trackerX = useTransform(smoothProgress, stops, desktopX);
  const trackerY = useTransform(smoothProgress, stops, desktopY);

  // Mobile trajectory (vertical straight descent)
  const trackerMobileY = useTransform(smoothProgress, [0, 1], ["15%", "82%"]);

  return (
    <section
      id="why-fail"
      ref={containerRef}
      className={cn("relative h-[400vh] bg-bg-page", wrapperClass)}
    >
      {/* Sticky viewport frame, offset to clear the floating header */}
      <div className="sticky top-0 h-svh w-full overflow-hidden max-w-7xl mx-auto pt-24 px-3 pb-3 sm:px-4 sm:pb-4">
        <SectionPhotoFrame imageUrl={frameImage}>
          {/* Header bar with main title */}
          <div className="flex items-center justify-center text-center w-full z-20 shrink-0 border-b border-brand-subtle pb-3 sm:pb-4">
            <h2 className="text-24 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary w-full [&_strong]:text-brand-blue [&_strong]:font-[inherit]">
              <MarkdownText markdown={title} />
            </h2>
          </div>

          {/* Interactive staircase stage */}
          <div className="relative flex-1 min-h-0 w-full max-w-6xl mx-auto flex items-center justify-center">
            {/* Desktop architectural staircase structure */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              {steps.map((step, idx) => (
                <div
                  key={`landing-${step.num}`}
                  className={cn(
                    "absolute w-[24%] h-2.5 bg-slate-300/50 rounded-full border-b border-slate-400/40",
                    idx % 2 === 0 ? "left-[10%]" : "right-[10%]",
                  )}
                  style={{ top: `${landingTop(idx)}%` }}
                />
              ))}

              {/* Connecting stairs between landings */}
              <svg
                className="absolute inset-0 w-full h-full stroke-slate-400/50 fill-none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M 22 21 L 28 26 L 38 26 L 48 31 L 58 31 L 68 36 L 76 41"
                  strokeWidth="0.4"
                  strokeDasharray="1 1"
                />
                <path
                  d="M 72 41 L 62 46 L 52 46 L 42 51 L 32 51 L 22 56 L 18 61"
                  strokeWidth="0.4"
                  strokeDasharray="1 1"
                />
                <path
                  d="M 22 61 L 32 66 L 42 66 L 52 71 L 62 71 L 72 76 L 76 81"
                  strokeWidth="0.4"
                  strokeDasharray="1 1"
                />
              </svg>
            </div>

            {/* Mobile staircase vertical line */}
            <div className="block md:hidden absolute left-3 top-[10%] bottom-[10%] w-1 bg-slate-300/60 rounded-full pointer-events-none">
              {steps.map((step, idx) => (
                <div
                  key={`dot-${step.num}`}
                  className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-blue"
                  style={{
                    top: `${15 + (idx * 70) / Math.max(total - 1, 1)}%`,
                  }}
                />
              ))}
            </div>

            {/* Desktop step badge tracker */}
            <motion.div
              className="hidden md:flex absolute z-30 pointer-events-none items-center justify-center"
              style={{
                left: trackerX,
                top: trackerY,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                key={activeStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-brand-dark text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-blue/60 shadow-xl flex items-center gap-2 whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span>Step {steps[activeStep].num}</span>
              </motion.div>
            </motion.div>

            {/* Mobile step badge tracker */}
            <motion.div
              className="flex md:hidden absolute left-3 z-30 pointer-events-none -translate-x-1/2"
              style={{
                top: trackerMobileY,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                key={activeStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-brand-dark text-white w-8 h-8 rounded-full text-11 font-bold shadow-lg border border-brand-blue/60 flex items-center justify-center"
              >
                {steps[activeStep].num}
              </motion.div>
            </motion.div>

            {/* Content cards stage */}
            <div className="w-full h-full relative flex items-center justify-center">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const { Icon } = step;
                const isCardOnRight = idx % 2 === 0;

                return (
                  <motion.div
                    key={step.num}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.96,
                      y: isActive ? 0 : 16,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={cn(
                      /* Mobile keeps clear of the stair rail without overflowing. */
                      "absolute w-[calc(100%-2.5rem)] ml-10 max-w-lg md:w-full md:ml-0 md:max-w-xl",
                      "bg-white rounded-2xl border border-brand-subtle shadow-lg p-4 sm:p-6 md:p-8 z-20",
                      isCardOnRight
                        ? "md:right-[5%] md:left-auto"
                        : "md:left-[5%] md:right-auto",
                    )}
                  >
                    {/* Step header */}
                    <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-dark flex items-center justify-center shrink-0 shadow-md">
                          {step.iconUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={step.iconUrl}
                              alt=""
                              className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                            />
                          ) : (
                            <Icon size={18} className="text-brand-blue" />
                          )}
                        </div>
                        <span className="text-11 font-mono font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                          Step {step.num}
                        </span>
                      </div>

                      <span className="text-11 font-mono font-bold text-text-secondary/60 shrink-0">
                        {String(idx + 1).padStart(2, "0")} /{" "}
                        {String(total).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-20 sm:text-24 lg:text-28 leading-[1.2] font-display font-medium text-text-primary mb-2 sm:mb-3">
                      {step.title}
                    </h3>

                    <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-medium">
                      {step.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Progress indicators */}
          <div className="w-full max-w-3xl mx-auto flex items-center justify-between gap-2 shrink-0 z-20">
            {steps.map((step, idx) => (
              <div
                key={`progress-${step.num}`}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-all duration-300",
                  activeStep === idx ? "bg-brand-blue" : "bg-slate-200",
                )}
              />
            ))}
          </div>
        </SectionPhotoFrame>
      </div>
    </section>
  );
}
