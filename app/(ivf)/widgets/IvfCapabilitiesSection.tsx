"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Database,
  Mic,
  Stethoscope,
  Watch,
  type LucideIcon,
} from "lucide-react";
import type { IvfCapabilitiesSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

type LensType = "metabolic" | "hormonal" | "biometric" | "memory" | "scribe";

/* Visual treatment per slot: CMS modules keep their order and reuse the lens,
   icon and status readout that belong to the slot they land in. */
const moduleVisuals: {
  Icon: LucideIcon;
  lensType: LensType;
  statusLabel: string;
}[] = [
  { Icon: Activity, lensType: "metabolic", statusLabel: "Insulin & thyroid nodes" },
  { Icon: Stethoscope, lensType: "hormonal", statusLabel: "Hormonal pulse signal" },
  { Icon: Watch, lensType: "biometric", statusLabel: "72 BPM / 68ms HRV" },
  { Icon: Database, lensType: "memory", statusLabel: "Compounding data graph" },
  { Icon: Mic, lensType: "scribe", statusLabel: "Ambient audio SOAP" },
];

const defaultModules = [
  {
    title: "Ojas Metabolic AI",
    description:
      "An AI copilot that identifies root metabolic dysfunction in your IVF patients before and during treatment. Insulin resistance, PCOS patterns, thyroid imbalance, inflammatory markers. It does not replace your doctor's judgment. It shows your doctor what the blood work alone does not reveal, and guides metabolic optimization protocols that improve cycle outcomes.",
  },
  {
    title: "Ojas OB-GYN AI",
    description:
      "Reproductive health intelligence from pre-conception through delivery. Calibrated to Indian biology and clinical protocols. Tracks every hormonal marker, every response pattern, every risk signal across the full patient journey.",
  },
  {
    title: "MAI Health Band",
    description:
      "A wearable your patients take home. Tracks HRV, sleep architecture, stress levels, and circadian rhythm continuously between clinic visits. Your doctors no longer rely on what the patient reports at the next appointment. They see real-time biometric data showing how the body is actually responding. Patients feel monitored 24/7. That experience alone drives referrals.",
  },
  {
    title: "MANAS (Patient Memory Layer)",
    description:
      "Every biomarker, every hormone panel, every treatment response, every MAI band reading stored and compounding for each patient. By cycle 2, the AI knows that specific patient's biology better than any chart review. By cycle 3, it is predicting response patterns before they show up in lab work.",
  },
  {
    title: "Ojas Scribe AI",
    description:
      "Ambient clinical documentation. Your fertility specialists talk to the patient. Scribe AI listens, generates SOAP notes, routes to the right AI model. 20+ minutes saved per consultation. That time goes back to patient care, not paperwork.",
  },
];

/**
 * Node and the browser disagree on the last float digit of Math.sin/cos, which
 * shows up as a hydration mismatch on the lens geometry — so every derived
 * coordinate is rounded before it reaches the DOM.
 */
const round = (value: number) => Math.round(value * 100) / 100;

/** SVG inside the aperture; `wave` drives the frames that keep moving. */
function LensMicroVisual({ lensType, wave }: { lensType: LensType; wave: number }) {
  switch (lensType) {
    case "metabolic":
      return (
        <g transform="translate(100, 100)">
          <circle cx="0" cy="0" r="35" fill="none" stroke="#B86851" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="0" cy="0" r="16" fill="#B86851" opacity="0.25" />
          <circle cx="0" cy="0" r="8" fill="#B86851" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = ((deg + wave) * Math.PI) / 180;
            const x = round(Math.cos(rad) * 35);
            const y = round(Math.sin(rad) * 35);
            return (
              <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke="#B86851" strokeWidth="1" opacity="0.5" />
                <circle cx={x} cy={y} r="4" fill={i % 2 === 0 ? "#B86851" : "#1A1614"} />
              </g>
            );
          })}
        </g>
      );

    case "hormonal":
      return (
        <g transform="translate(100, 100)">
          <path d="M -60 0 C -40 -40, -20 40, 0 0 C 20 -40, 40 40, 60 0" fill="none" stroke="#B86851" strokeWidth="2.5" />
          <path d="M -60 0 C -40 20, -20 -20, 0 0 C 20 20, 40 -20, 60 0" fill="none" stroke="#1A1614" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
          <circle cx="0" cy="-20" r="4" fill="#B86851" className="animate-pulse" />
        </g>
      );

    case "biometric":
      return (
        <g transform="translate(100, 100)">
          <path
            d="M -70 0 L -25 0 L -18 10 L -10 -30 L -2 25 L 4 -10 L 12 0 L 70 0"
            fill="none"
            stroke="#B86851"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="-10" cy="-30" r="3.5" fill="#B86851" className="animate-ping" />
        </g>
      );

    case "memory":
      return (
        <g transform="translate(100, 100)">
          <path d="M -50 30 Q -10 20 20 -20 T 50 -40" fill="none" stroke="#B86851" strokeWidth="2.5" />
          <circle cx="-40" cy="28" r="4" fill="#1A1614" />
          <text x="-40" y="42" textAnchor="middle" fill="#1A1614" fontSize="6.5" fontWeight="bold">C1</text>
          <circle cx="-10" cy="18" r="5" fill="#1A1614" />
          <text x="-10" y="32" textAnchor="middle" fill="#1A1614" fontSize="6.5" fontWeight="bold">C2</text>
          <circle cx="35" cy="-30" r="6" fill="#B86851" />
          <text x="35" y="-18" textAnchor="middle" fill="#B86851" fontSize="7" fontWeight="bold">C3 (PREDICT)</text>
        </g>
      );

    case "scribe":
      return (
        <g transform="translate(100, 100)">
          {[-45, -35, -25, -15, -5, 5, 15, 25, 35, 45].map((x, i) => {
            const height = round(Math.abs(Math.sin(i * 0.5 + wave * 0.08)) * 40 + 8);
            return (
              <rect
                key={i}
                x={x}
                y={-height / 2}
                width="4"
                height={height}
                rx="2"
                fill={i % 2 === 0 ? "#B86851" : "#1A1614"}
              />
            );
          })}
        </g>
      );

    default:
      return null;
  }
}

/** Aperture ring plus its status readout, shared by the compact and full stages. */
function DiagnosticLens({
  lensType,
  statusLabel,
  wave,
  className,
  badgeKey,
}: {
  lensType: LensType;
  statusLabel: string;
  wave: number;
  className?: string;
  badgeKey: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-0">
      <motion.div
        animate={{ scale: [1, 1.025, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "relative rounded-full border-2 border-brand-blue bg-bg-page shadow-[inset_0_0_35px_rgba(184,104,81,0.18)] flex items-center justify-center overflow-hidden shrink-0",
          className,
        )}
      >
        <div className="absolute inset-2 lg:inset-3 rounded-full border border-brand-blue/35 pointer-events-none" />
        <div className="absolute inset-5 lg:inset-7 rounded-full border border-brand-dark/10 pointer-events-none" />

        <svg viewBox="0 0 200 200" className="w-full h-full p-2 lg:p-3">
          <AnimatePresence mode="wait">
            <motion.g
              key={badgeKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.25 }}
            >
              <LensMicroVisual lensType={lensType} wave={wave} />
            </motion.g>
          </AnimatePresence>
        </svg>

        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-brand-blue/25 pointer-events-none" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-brand-blue/25 pointer-events-none" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={badgeKey}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-3 lg:mt-4 flex items-center gap-2 px-3 py-1.5 lg:px-4 rounded-full bg-brand-dark text-white text-10 sm:text-11 lg:text-12 font-bold uppercase tracking-wider shadow-md border border-brand-blue/40"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse shrink-0" />
          <span>{statusLabel}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function IvfCapabilitiesSection({
  data,
  wrapperClass,
}: {
  data?: IvfCapabilitiesSection;
  wrapperClass?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);

  const title = data?.title ?? "AI Copilot.";
  const titleAccent = data?.titleAccent ?? "Continuous Monitoring.";
  const titleSuffix = data?.titleSuffix ?? "Smarter Every Patient.";

  const sourceModules: {
    title: string;
    description: string;
    statusLabel?: string;
  }[] = data?.modules?.length ? data.modules : defaultModules;

  const modules = sourceModules.map((module, idx) => {
    const visual = moduleVisuals[idx % moduleVisuals.length];
    return {
      ...visual,
      title: module.title,
      description: module.description,
      statusLabel: module.statusLabel || visual.statusLabel,
    };
  });

  /* Animation frame loop that keeps the active lens visual moving. */
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setWaveOffset((prev) => (prev + 1) % 1000);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * modules.length);
    const clampedIndex = Math.min(Math.max(rawIndex, 0), modules.length - 1);
    if (clampedIndex !== activeIndex) setActiveIndex(clampedIndex);
  });

  /* Each module owns an equal slice of the pinned scroll distance. */
  const scrollToMilestone = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableHeight = rect.height - window.innerHeight;
    window.scrollTo({
      top: containerTop + ((index + 0.15) / modules.length) * scrollableHeight,
      behavior: "smooth",
    });
  };

  const activeModule = modules[activeIndex];
  const ActiveIcon = activeModule.Icon;

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className={cn(
        "relative h-[350vh] sm:h-[420vh] lg:h-[500vh] bg-bg-page",
        wrapperClass,
      )}
    >
      {/* Sticky pinned view, offset to clear the floating header */}
      <div className="sticky top-0 h-svh w-full overflow-hidden max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 pt-28 sm:pt-30 pb-5 px-4 sm:px-6 lg:px-8">
        <header className="shrink-0 max-w-4xl mx-auto w-full text-center border-b border-brand-subtle pb-3">
          <h2 className="text-24 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            {title} <span className="text-brand-blue">{titleAccent}</span>{" "}
            {titleSuffix}
          </h2>
        </header>

        <div className="flex-1 min-h-0 w-full flex flex-col justify-center md:grid md:grid-cols-12 gap-4 lg:gap-8 items-center">
          {/* Compact lens; the full stage below needs more room than small screens have */}
          <div className="md:hidden shrink-0">
            <DiagnosticLens
              lensType={activeModule.lensType}
              statusLabel={activeModule.statusLabel}
              wave={waveOffset}
              badgeKey={activeModule.title}
              className="w-28 h-28 sm:w-36 sm:h-36"
            />
          </div>

          {/* Diagnostic lens stage */}
          <div className="hidden md:flex md:col-span-6 h-full max-h-[520px] min-h-0 flex-col items-center justify-center relative rounded-2xl border border-brand-subtle bg-white shadow-sm overflow-hidden p-4">
            <div className="absolute inset-0 bg-[radial-gradient(#6B625F_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center gap-6 w-full h-full min-h-0">
              {/* Milestone track */}
              <div className="flex flex-col justify-between items-center h-[70%] relative shrink-0">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-brand-dark/10" />
                {modules.map((module, idx) => (
                  <button
                    key={`${module.title}-node-${idx}`}
                    onClick={() => scrollToMilestone(idx)}
                    className={cn(
                      "relative w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer",
                      idx === activeIndex
                        ? "bg-brand-blue ring-4 ring-brand-blue/20 scale-110"
                        : "bg-white border-2 border-brand-dark/25 hover:border-brand-blue",
                    )}
                    aria-label={`Jump to module ${idx + 1}`}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        idx === activeIndex ? "bg-white" : "bg-brand-dark",
                      )}
                    />
                  </button>
                ))}
              </div>

              <DiagnosticLens
                lensType={activeModule.lensType}
                statusLabel={activeModule.statusLabel}
                wave={waveOffset}
                badgeKey={activeModule.title}
                className="w-40 h-40 lg:w-52 lg:h-52 xl:w-64 xl:h-64"
              />
            </div>
          </div>

          {/* Editorial content card */}
          <div className="w-full min-h-0 md:h-full md:col-span-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeModule.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-h-full overflow-hidden flex flex-col bg-white rounded-2xl border border-brand-subtle shadow-lg p-5 sm:p-6 md:p-8"
              >
                <div className="flex items-center gap-3 border-b border-brand-subtle pb-4 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-bg-page border border-brand-subtle flex items-center justify-center text-brand-blue shrink-0">
                    <ActiveIcon className="w-5 h-5" />
                  </span>
                  <span className="text-11 font-mono font-bold text-brand-blue uppercase tracking-widest">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(modules.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-20 sm:text-24 lg:text-28 leading-[1.2] font-display font-medium text-text-primary mb-3">
                  {activeModule.title}
                </h3>

                <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-medium">
                  {activeModule.description}
                </p>

                <div className="pt-4 mt-auto flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollToMilestone(Math.max(0, activeIndex - 1))}
                      disabled={activeIndex === 0}
                      className="p-2 rounded-xl border border-brand-subtle text-text-primary hover:bg-brand-blue hover:text-white hover:border-brand-blue disabled:opacity-30 disabled:cursor-default transition-colors cursor-pointer"
                      aria-label="Previous module"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        scrollToMilestone(
                          Math.min(modules.length - 1, activeIndex + 1),
                        )
                      }
                      disabled={activeIndex === modules.length - 1}
                      className="p-2 rounded-xl border border-brand-subtle text-text-primary hover:bg-brand-blue hover:text-white hover:border-brand-blue disabled:opacity-30 disabled:cursor-default transition-colors cursor-pointer"
                      aria-label="Next module"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {modules.map((module, idx) => (
                      <button
                        key={`${module.title}-dot-${idx}`}
                        onClick={() => scrollToMilestone(idx)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                          idx === activeIndex
                            ? "w-8 bg-brand-blue"
                            : "w-2 bg-slate-200 hover:bg-brand-blue/50",
                        )}
                        aria-label={`Go to module ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <footer className="shrink-0 w-full">
          <div className="w-full h-1 bg-brand-subtle rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-blue"
              style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
            />
          </div>
        </footer>
      </div>
    </section>
  );
}
