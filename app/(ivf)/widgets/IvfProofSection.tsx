"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ChevronRight } from "lucide-react";
import type { IvfProofSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";
import { scrollToApplyForm } from "../components/scrollToApply";

const defaultPages = [
  "AIIMS Delhi and Google: Live clinical AI research collaboration",
  "India's first AIIMS-validated dermatology AI model (same validation rigor applied to fertility and metabolic AI)",
  "47 patents filed, 23 granted across India, US, Singapore",
  "600+ hardware deployments across healthcare, defence, and enterprise",
  "Fortune 500 clients: TATA, Google, Mercedes-Benz, Vedanta",
  "Defence deployments: Indian Army, Indian Navy",
  "108-person team. IIT Bombay origin. 10+ years of R&D.",
];

/** One sheet of the notepad; it tears upward across its slice of the scroll. */
function NotepadPageCard({
  index,
  total,
  text,
  buttonText,
  smoothProgress,
  onApplyClick,
}: {
  index: number;
  total: number;
  text: string;
  buttonText: string;
  smoothProgress: MotionValue<number>;
  onApplyClick: () => void;
}) {
  const isLast = index === total - 1;

  const start = index / total;
  const end = (index + 1) / total;
  const tearStart = start + (end - start) * 0.35;

  const y = useTransform(smoothProgress, [tearStart, end], ["0%", "-135%"]);
  const rotateX = useTransform(smoothProgress, [tearStart, end], [0, -32]);
  const rotateZ = useTransform(
    smoothProgress,
    [tearStart, end],
    [0, index % 2 === 0 ? -5.5 : 5.5],
  );
  const opacity = useTransform(smoothProgress, [tearStart, end - 0.015], [1, 0]);

  /* The last sheet stays put — there is nothing underneath it to reveal. */
  const styleObj = isLast
    ? { zIndex: total - index }
    : {
        y,
        rotateX,
        rotateZ,
        opacity,
        zIndex: total - index,
        transformOrigin: "top center",
      };

  return (
    <motion.div
      style={styleObj}
      className="absolute inset-0 flex flex-col justify-between  rounded-b-xl border border-t-0 border-brand-subtle bg-bg-surface shadow-xl bg-[linear-gradient(to_bottom,transparent_27px,rgba(107,98,95,0.06)_28px)] bg-[size:100%_28px] p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between gap-3 text-10 sm:text-11 font-mono font-bold uppercase tracking-widest text-slate-550 shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
          Verified record
        </span>
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <p className="my-4 text-16 sm:text-20 md:text-24 leading-[1.35] font-display font-medium text-text-primary">
        {text}
      </p>

      <div className="pt-3 border-t border-brand-subtle shrink-0">
        <button
          type="button"
          onClick={onApplyClick}
          className="group inline-flex items-center gap-2 rounded-lg bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white text-12 sm:text-14 font-bold px-4 py-2 sm:px-5 sm:py-2.5 shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
        >
          <span>{buttonText}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

export default function IvfProofSection({
  data,
  wrapperClass,
}: {
  data?: IvfProofSection;
  wrapperClass?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const title =
    data?.title ??
    "47 Patents. AIIMS-Validated. Google's Clinical AI Partner. Now in Fertility.";
  const description =
    data?.description ??
    "Ojas AI is not a startup experimenting with healthcare. It is a decade of clinical AI research, shipped medical hardware, and validated models already deployed across India's leading institutions.";
  const buttonText = data?.buttonText ?? "Apply for Partnership";
  const pages = data?.pages?.length
    ? data.pages.map((page) => page.title)
    : defaultPages;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.0001,
  });

  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const next = Math.min(pages.length - 1, Math.max(0, Math.floor(latest * pages.length)));
    if (next !== activePageIndex) setActivePageIndex(next);
  });

  /* Each page owns an equal slice of the pinned scroll distance. */
  const scrollToPageIndex = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableHeight = rect.height - window.innerHeight;
    /* The +0.15 bias lands inside the page's slice rather than on its edge,
       where the spring can settle a hair short and show the previous page. */
    window.scrollTo({
      top: containerTop + ((index + 0.15) / pages.length) * scrollableHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="credentials"
      className={cn(
        "relative h-[550vh] sm:h-[650vh] lg:h-[750vh] bg-bg-page",
        wrapperClass,
      )}
    >
      {/* Sticky pinned view, offset to clear the floating header */}
      <div className="sticky top-0 h-svh w-full  max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 pt-28 sm:pt-30 pb-5 px-4 sm:px-6 lg:px-8">
        {/* z-20 keeps the heading above the sheets as they tear away */}
        <header className="relative z-20 shrink-0 max-w-4xl mx-auto w-full text-center border-b border-brand-subtle bg-bg-page pb-3">
          <h2 className="text-20 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            {title}
          </h2>
          <p className="mt-2 text-12 sm:text-14 md:text-16 leading-relaxed text-text-secondary font-medium max-w-3xl mx-auto">
            {description}
          </p>
        </header>

        {/* Notepad stage */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <div className="w-full max-w-2xl h-full max-h-[400px] sm:max-h-[460px] lg:max-h-[520px] flex flex-col">
            {/* Binding clip with metallic rivets */}
            <div className="shrink-0 rounded-t-xl bg-brand-dark px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-around shadow-lg relative z-30">
              {[0, 1, 2, 3, 4, 5].map((clip) => (
                <span
                  key={clip}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr from-gray-400 via-gray-100 to-gray-500 border border-gray-600 shadow-inner"
                />
              ))}
            </div>

            {/* Perforated tear line */}
            <div className="shrink-0 bg-[#F2EBE5] px-4 sm:px-6 py-1 border-x border-brand-subtle relative z-30">
              <div className="w-full border-t-2 border-dashed border-slate-550/35" />
            </div>

            {/* Stacked pages viewport; clipped so torn sheets leave the pad cleanly */}
            <div className="relative flex-1 min-h-0  perspective-[1200px]">
              {/* Paper depth layers */}
              <div className="absolute inset-0 rounded-b-xl bg-[#E3DAD3] translate-y-2 scale-[0.97] border border-[#D5C9C0] shadow-xs pointer-events-none" />
              <div className="absolute inset-0 rounded-b-xl bg-[#F0E8E1] translate-y-1 scale-[0.985] border border-[#E0D5CC] shadow-sm pointer-events-none" />

              {pages.map((text, idx) => (
                <NotepadPageCard
                  key={idx}
                  index={idx}
                  total={pages.length}
                  text={text}
                  buttonText={buttonText}
                  smoothProgress={smoothProgress}
                  onApplyClick={scrollToApplyForm}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Page tracker */}
        <footer className="shrink-0 w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-11 sm:text-12 font-semibold text-slate-550">
          <div className="flex items-center gap-1.5">
            <span className="uppercase tracking-widest">Page</span>
            <span className="text-14 font-bold text-brand-blue">
              {String(activePageIndex + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(pages.length).padStart(2, "0")}</span>
          </div>

          <div className="w-full sm:w-40 md:w-56 h-1.5 bg-brand-subtle rounded-full ">
            <motion.div
              className="h-full bg-brand-blue rounded-full"
              style={{ width: progressWidth }}
            />
          </div>

          <div className="flex items-center gap-1">
            {pages.map((text, idx) => (
              <button
                key={`${text}-${idx}`}
                type="button"
                onClick={() => scrollToPageIndex(idx)}
                className={cn(
                  "w-6 h-6 rounded-full text-11 font-bold flex items-center justify-center transition-all cursor-pointer",
                  activePageIndex === idx
                    ? "bg-brand-blue text-white shadow-xs scale-105"
                    : "bg-white border border-brand-subtle text-text-secondary hover:border-brand-blue hover:text-text-primary",
                )}
                aria-label={`Jump to page ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
