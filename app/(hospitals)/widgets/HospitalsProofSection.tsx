"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  Activity,
  ArrowRight,
  Baby,
  Brain,
  FileText,
  Glasses,
  HardDrive,
  Heart,
  Sparkles,
  Watch,
  type LucideIcon,
} from "lucide-react";
import type { HospitalsProofSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";
import SectionPhotoFrame from "../components/SectionPhotoFrame";
import NotepadRightPhotoFrame from "../components/NotepadRightPhotoFrame";
import { scrollToAssessmentForm } from "../components/scrollToAssessment";

const DEFAULT_FRAME_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80";

interface NotepadPage {
  id: string;
  title: string;
  content: string;
  category: string;
  Icon: LucideIcon;
  iconUrl: string | null;
}

const defaultPages: NotepadPage[] = [
  {
    id: "ojas-derm",
    title: "Ojas Dermatology AI",
    content:
      "100+ skin conditions. Trained on Indian phenotypes. Validated with AIIMS Delhi and Google. India's first clinically validated dermatology AI model.",
    category: "Clinical Diagnostic AI",
    Icon: Activity,
    iconUrl: null,
  },
  {
    id: "ojas-metabolic",
    title: "Ojas Metabolic AI",
    content:
      "Root metabolic dysfunction detection: insulin resistance, PCOS, thyroid. Pre-disease to reversal. Built for Indian women's biology.",
    category: "Metabolic Health",
    Icon: Heart,
    iconUrl: null,
  },
  {
    id: "ojas-obgyn",
    title: "Ojas OB-GYN AI",
    content:
      "Reproductive health, pre-conception through delivery. Calibrated to Indian clinical protocols.",
    category: "Women's Health",
    Icon: Baby,
    iconUrl: null,
  },
  {
    id: "ojas-scribe",
    title: "Ojas Scribe AI",
    content:
      "Ambient clinical intake. Auto-routing. SOAP note generation. 20+ minutes saved per consultation.",
    category: "Workflow Automation",
    Icon: FileText,
    iconUrl: null,
  },
  {
    id: "manas",
    title: "MANAS (Patient Memory Layer)",
    content:
      "Retains every biomarker, every treatment response, every diagnostic result. Gets smarter per patient over time. Makes every Ojas model more accurate with each interaction.",
    category: "Core Intelligence",
    Icon: Brain,
    iconUrl: null,
  },
  {
    id: "mai-band",
    title: "MAI Health Band",
    content:
      "Continuous biometric monitoring: HRV, sleep, stress, circadian patterns. Pre-discharge and post-discharge patient tracking.",
    category: "Wearable Hardware",
    Icon: Watch,
    iconUrl: null,
  },
  {
    id: "smart-glasses",
    title: "Egocentric Smart Glasses",
    content:
      "Multi-camera clinical and research data capture. Custom configurations: RGB, fisheye, depth sensors. 5 generations of hardware refined over a decade.",
    category: "Computer Vision",
    Icon: Glasses,
    iconUrl: null,
  },
  {
    id: "edge-ai",
    title: "Edge AI Devices",
    content:
      "Clinical decision support that works offline. Built for the 70% of healthcare settings where internet is unreliable.",
    category: "Infrastructure",
    Icon: HardDrive,
    iconUrl: null,
  },
];

/** One torn-off notepad page; every page owns a slice of the scroll range. */
function PageCard({
  page,
  index,
  total,
  smoothProgress,
  buttonText,
  onExplore,
}: {
  page: NotepadPage;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
  buttonText: string;
  onExplore: () => void;
}) {
  const { Icon } = page;
  const isLast = index === total - 1;

  // Segment range for this page's flip animation
  const start = index / total;
  const end = (index + 1) / total;

  /* Every page but the last tears away; the last one rests at the bottom. */
  const rotateX = useTransform(smoothProgress, [start, end], [0, isLast ? 0 : -32]);
  const rotateZ = useTransform(
    smoothProgress,
    [start, end],
    [0, isLast ? 0 : index % 2 === 0 ? -3.5 : 3.5],
  );
  const translateY = useTransform(
    smoothProgress,
    [start, end],
    ["0%", isLast ? "0%" : "-115%"],
  );
  const opacity = useTransform(
    smoothProgress,
    [start, start + (end - start) * 0.75, end],
    [1, 1, isLast ? 1 : 0],
  );

  // Underneath scale transition when the page above this one tears away
  const prevStart = (index - 1) / total;
  const prevEnd = index / total;
  const underScale = useTransform(smoothProgress, [prevStart, prevEnd], [0.96, 1.0]);
  const underY = useTransform(smoothProgress, [prevStart, prevEnd], [8, 0]);

  // Lower indices sit on top of the stack
  const zIndex = total - index;

  return (
    <motion.div
      style={{
        rotateX,
        rotateZ,
        translateY: index === 0 ? translateY : isLast ? underY : translateY,
        scale: index === 0 ? 1 : underScale,
        opacity,
        zIndex,
        transformOrigin: "top center",
      }}
      className="absolute inset-0 bg-white rounded-b-2xl p-4 sm:p-6 border border-t-0 border-brand-subtle shadow-lg flex flex-col justify-between overflow-hidden bg-[linear-gradient(to_bottom,transparent_23px,#F4ECE8_24px)] bg-[size:100%_24px]"
    >
      {/* Decorative clinical watermark stamp */}
      <div className="absolute top-3 right-3 pointer-events-none select-none opacity-15 rotate-[-12deg] hidden sm:block">
        <div className="border border-brand-blue text-brand-blue px-2 py-0.5 rounded text-9 font-mono font-bold uppercase tracking-widest text-center">
          Clinical Validated
          <br />
          <span className="text-8 tracking-normal">OJAS R&D Labs</span>
        </div>
      </div>

      <div className="min-w-0">
        <span className="inline-flex items-center gap-1.5 bg-brand-dark text-white text-9 sm:text-11 font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-widest mb-3">
          <Sparkles size={11} className="text-brand-blue" />
          {page.category}
        </span>

        <div className="flex items-start gap-3 mb-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-dark flex items-center justify-center shrink-0 shadow-md">
            {page.iconUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={page.iconUrl}
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
            ) : (
              <Icon size={18} className="text-white" />
            )}
          </div>
          <h3 className="text-18 sm:text-24 leading-[1.2] font-display font-medium text-text-primary">
            {page.title}
          </h3>
        </div>

        <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-medium max-w-xl line-clamp-4 sm:line-clamp-none">
          {page.content}
        </p>
      </div>

      <div className="pt-3 mt-auto border-t border-brand-subtle flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExplore}
          className="bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white text-xs sm:text-sm font-bold px-4 py-2.5 sm:px-5 rounded-xl transition-all shadow-md shadow-brand-blue/20 flex items-center gap-2 group cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        <span className="text-11 font-mono font-bold uppercase tracking-widest text-text-secondary/50 hidden md:inline-block">
          Page {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

export default function HospitalsProofSection({
  data,
  wrapperClass,
}: {
  data?: HospitalsProofSection;
  wrapperClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const title = data?.title ?? "What We Have Already Built and Shipped";
  const frameImage = getStrapiMedia(data?.frameImage?.url) ?? DEFAULT_FRAME_IMAGE;
  const attachmentImage = getStrapiMedia(data?.attachmentImage?.url);
  const buttonText = data?.buttonText ?? "Get Your Free Assessment";

  const pages: NotepadPage[] = data?.pages?.length
    ? data.pages.map((page, idx) => ({
        id: String(page.id),
        title: page.title,
        content: page.description,
        category: page.category,
        Icon: defaultPages[idx % defaultPages.length].Icon,
        iconUrl: getStrapiMedia(page.icon?.url),
      }))
    : defaultPages;

  const total = pages.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 24,
    mass: 0.4,
  });

  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Track the current page index from scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      const idx = Math.min(total - 1, Math.max(0, Math.floor(value * total)));
      setActivePageIndex(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress, total]);

  const scrollToPageIndex = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = rect.height - window.innerHeight;
    window.scrollTo({
      top: containerTop + (index / total) * containerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="proof-patents"
      ref={containerRef}
      className={cn("relative h-[650vh] sm:h-[750vh] bg-bg-page", wrapperClass)}
    >
      {/* Sticky viewport frame, offset to clear the floating header */}
      <div className="sticky top-0 h-svh w-full overflow-hidden max-w-7xl mx-auto pt-24 px-3 pb-3 sm:px-4 sm:pb-4">
        <SectionPhotoFrame imageUrl={frameImage}>
          <div className="text-center max-w-4xl mx-auto shrink-0 relative z-20">
            <h2 className="text-24 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
              {title}
            </h2>
          </div>

          {/* Notepad plus the pinned polaroid */}
          <div className="w-full max-w-6xl mx-auto flex-1 min-h-0 flex items-center justify-center gap-8 z-20">
            <div className="w-full max-w-lg md:max-w-2xl h-full max-h-[420px] flex flex-col relative">
              {/* Top binding bar with metallic rivets */}
              <div className="w-full bg-brand-dark rounded-t-2xl py-2 px-5 flex items-center justify-between shadow-lg relative z-30 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-500 shadow-inner border border-slate-600" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-500 shadow-inner border border-slate-600" />
              </div>

              {/* Perforated tear line */}
              <div className="w-full bg-brand-subtle py-1 px-5 border-b border-brand-subtle relative z-30 flex items-center overflow-hidden shrink-0">
                <div className="w-full border-t-2 border-dashed border-slate-300" />
              </div>

              {/* Stacked pages viewport; clipped so torn sheets leave the pad cleanly */}
              <div className="w-full flex-1 min-h-[250px] relative overflow-hidden perspective-[1200px]">
                {/* Paper depth layers */}
                <div className="absolute inset-0 bg-slate-200 rounded-b-2xl translate-y-2 scale-[0.97] border border-slate-300 shadow-xs pointer-events-none" />
                <div className="absolute inset-0 bg-slate-100 rounded-b-2xl translate-y-1 scale-[0.985] border border-slate-200 shadow-sm pointer-events-none" />

                {pages.map((page, index) => (
                  <PageCard
                    key={page.id}
                    page={page}
                    index={index}
                    total={total}
                    smoothProgress={smoothProgress}
                    buttonText={buttonText}
                    onExplore={scrollToAssessmentForm}
                  />
                ))}
              </div>
            </div>

            {/* Decorative on desktop only: the pinned viewport is tight on mobile. */}
            {attachmentImage && (
              <NotepadRightPhotoFrame
                imageUrl={attachmentImage}
                label={data?.attachmentLabel}
                className="hidden lg:flex shrink-0"
              />
            )}
          </div>

          {/* Bottom navigation and progress bar */}
          <div className="w-full max-w-2xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-2 shrink-0 z-20">
            <div className="flex items-center gap-1.5 text-11 font-mono font-bold uppercase tracking-widest text-text-secondary/60">
              <span>Page</span>
              <span className="text-brand-blue">
                {String(activePageIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>

            <div className="w-24 sm:w-40 md:w-56 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="bg-brand-blue h-full rounded-full"
                style={{ width: progressWidth }}
              />
            </div>

            {/* Quick page jump buttons */}
            <div className="flex items-center gap-1">
              {pages.map((page, idx) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => scrollToPageIndex(idx)}
                  className={cn(
                    "w-6 h-6 rounded-full text-11 font-bold transition-all duration-150 cursor-pointer flex items-center justify-center",
                    activePageIndex === idx
                      ? "bg-brand-blue text-white shadow-sm"
                      : "bg-white border border-brand-subtle text-text-secondary hover:border-brand-blue/30 hover:text-brand-blue",
                  )}
                  title={`Jump to page ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </SectionPhotoFrame>
      </div>
    </section>
  );
}
