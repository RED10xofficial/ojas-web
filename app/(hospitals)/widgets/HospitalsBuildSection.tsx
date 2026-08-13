"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Activity,
  ChevronRight,
  Cpu,
  Database,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { HospitalsBuildSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";
import { scrollToAssessmentForm } from "../components/scrollToAssessment";

interface BuildRoom {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  iconUrl: string | null;
}

const defaultRooms: BuildRoom[] = [
  {
    number: "01",
    title: "Clinical AI Models",
    description:
      "Diagnosis, screening, clinical documentation, patient monitoring. Trained on real patient populations, not general-purpose AI repurposed for healthcare. Regulatory-aligned from day one (CDSCO, FDA pathway).",
    Icon: Activity,
    iconUrl: null,
  },
  {
    number: "02",
    title: "Custom Medical Hardware",
    description:
      "Wearable health bands, smart glasses, sensor modules, edge AI devices. 5 generations shipped. Designed for clinical environments, including offline and low-connectivity settings.",
    Icon: Cpu,
    iconUrl: null,
  },
  {
    number: "03",
    title: "Patient Intelligence Platforms",
    description:
      "Data infrastructure that turns unstructured clinical data into AI-ready datasets. Patient memory layers that compound clinical intelligence over time.",
    Icon: Database,
    iconUrl: null,
  },
  {
    number: "04",
    title: "Products That Don't Exist Yet",
    description:
      "If it sits at the intersection of healthcare, AI, and hardware, and nobody has built it, that is exactly what we do. Scoped, engineered, validated, and delivered.",
    Icon: Sparkles,
    iconUrl: null,
  },
];

export default function HospitalsBuildSection({
  data,
  wrapperClass,
}: {
  data?: HospitalsBuildSection;
  wrapperClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDoor, setActiveDoor] = useState(0);

  const title = data?.title ?? "Full-Stack Healthcare AI.";
  const titleSecondLine = data?.titleSecondLine ?? "Software. Hardware. Shipped.";
  const buttonText = data?.buttonText ?? "Get Your Free Assessment";

  const rooms: BuildRoom[] = data?.rooms?.length
    ? data.rooms.map((room, idx) => ({
        number: room.number,
        title: room.title,
        description: room.description,
        Icon: defaultRooms[idx % defaultRooms.length].Icon,
        iconUrl: getStrapiMedia(room.icon?.url),
      }))
    : defaultRooms;

  const total = rooms.length;

  // Raw scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for realistic weight-bearing motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  /* Park the ambulance at the centre of each door: 12.5%, 37.5%, … for four. */
  const stops = total > 1 ? rooms.map((_, idx) => idx / (total - 1)) : [0, 1];
  const doorCenters =
    total > 1
      ? rooms.map((_, idx) => `${((idx + 0.5) / total) * 100}%`)
      : ["50%", "50%"];
  const ambulanceX = useTransform(smoothProgress, stops, doorCenters);

  /* The +0.12 bias swings each door open slightly before the ambulance lands. */
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      const next = Math.min(
        total - 1,
        Math.max(0, Math.floor(value * total + 0.12)),
      );
      setActiveDoor(next);
    });
    return () => unsubscribe();
  }, [smoothProgress, total]);

  const scrollToDoor = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = rect.height - window.innerHeight;
    const targetScroll = containerTop + ((idx + 0.2) / total) * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeRoom = rooms[activeDoor];
  const ActiveIcon = activeRoom.Icon;

  return (
    <section
      id="full-stack-ai"
      ref={containerRef}
      className={cn("relative h-[500vh] bg-bg-page", wrapperClass)}
    >
      {/* Sticky pinned view, offset to clear the floating header */}
      <div className="sticky top-0 h-svh w-full overflow-hidden max-w-7xl mx-auto flex flex-col gap-3 sm:gap-6 pt-20 sm:pt-24 pb-4 sm:pb-5 px-3 sm:px-6 lg:px-8">
        <header className="shrink-0 z-10 max-w-5xl mx-auto w-full text-center border-b border-brand-subtle pb-3">
          <h2 className="text-20 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            <span className="block">{title}</span>
            {titleSecondLine && (
              <span className="block mt-1 sm:mt-2">{titleSecondLine}</span>
            )}
          </h2>
        </header>

        {/* ── Scenic corridor track ── */}
        <div className="relative w-full max-w-5xl mx-auto flex-1 min-h-[120px] sm:min-h-[150px] flex items-center overflow-hidden rounded-2xl bg-white border border-brand-subtle shadow-lg">
          {/* Architectural ceiling lighting lines */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-dark/10 to-transparent z-20" />
          <div className="absolute top-4 inset-x-0 flex justify-around opacity-40 z-10 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-0.5 bg-bg-page shadow-[0_4px_12px_rgba(255,255,255,0.8)]"
              />
            ))}
          </div>

          {/* Wall paneling horizontal texture lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(26,22,20,0.03)_50%,transparent_51%)] bg-[length:100%_40px] pointer-events-none" />

          {/* Recessed floor trim */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-brand-dark/5 to-transparent border-t border-brand-dark/5" />

          {/* Door corridor */}
          <div
            className="grid gap-1.5 sm:gap-4 md:gap-6 w-full h-full relative z-10 px-1.5 sm:px-6"
            style={{
              gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
            }}
          >
            {rooms.map((room, index) => {
              const isOpen = activeDoor === index;

              return (
                <button
                  key={room.number}
                  type="button"
                  onClick={() => scrollToDoor(index)}
                  aria-label={`Open room ${room.number}: ${room.title}`}
                  className="h-full relative flex items-center justify-center border-r border-brand-dark/5 last:border-r-0 cursor-pointer"
                >
                  {/* Door frame structure */}
                  <div className="relative w-full max-w-[130px] sm:max-w-[170px] md:max-w-[200px] h-[78%] bg-bg-page border-2 border-brand-dark/10 rounded-t-lg shadow-inner flex flex-col justify-between overflow-visible">
                    {/* Transom / room number box */}
                    <div className="w-full bg-brand-dark/5 border-b border-brand-dark/10 py-1.5 sm:py-2 px-1 sm:px-3 text-center">
                      <span className="text-9 sm:text-11 font-mono font-bold uppercase tracking-widest text-text-secondary/70">
                        Room {room.number}
                      </span>
                    </div>

                    {/* Room interior glow, visible when the door is open */}
                    <div
                      className={cn(
                        "absolute inset-x-2 top-8 sm:top-10 bottom-2 bg-gradient-to-r from-brand-blue/20 via-brand-blue/10 to-transparent rounded transition-opacity duration-700 blur-xs",
                        isOpen ? "opacity-100" : "opacity-0",
                      )}
                    />

                    {/* 3D hinged door leaf */}
                    <motion.div
                      initial={false}
                      animate={{ rotateY: isOpen ? -105 : 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "left center" }}
                      className="absolute inset-0 bg-brand-blue border-r-2 border-brand-pressed rounded-t-lg flex flex-col justify-between p-2 sm:p-4 shadow-md z-20"
                    >
                      {/* Vision panel glass */}
                      <div className="w-5 sm:w-8 h-12 sm:h-20 mx-auto bg-gradient-to-b from-white/30 to-white/10 rounded-full border border-white/40 shadow-inner overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/30 -rotate-45" />
                      </div>

                      {/* Lever handle */}
                      <div className="self-end mr-0.5 sm:mr-2 flex items-center gap-1">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/80" />
                        <div className="w-3 sm:w-6 h-1 sm:h-1.5 bg-gradient-to-r from-brand-dark to-black rounded-sm shadow" />
                      </div>

                      {/* Door base kickplate */}
                      <div className="w-full h-2.5 sm:h-4 bg-black/20 rounded-sm" />
                    </motion.div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Focal object: the clinical ambulance ── */}
          <motion.div
            className="absolute bottom-2 sm:bottom-3 z-30 pointer-events-none flex flex-col items-center -translate-x-1/2"
            style={{ left: ambulanceX }}
          >
            <div className="relative">
              <svg
                width="200"
                height="85"
                viewBox="0 0 240 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 sm:w-40 md:w-52 h-auto drop-shadow-xl"
              >
                {/* Emergency beacon light bar */}
                <rect x="95" y="10" width="30" height="6" rx="2" fill="#1A1614" />
                <rect
                  x="97"
                  y="8"
                  width="12"
                  height="6"
                  rx="1"
                  fill="#EA4335"
                  className="animate-pulse"
                />
                <rect
                  x="111"
                  y="8"
                  width="12"
                  height="6"
                  rx="1"
                  fill="#4285F4"
                  className="animate-pulse"
                />

                {/* Beacon glow */}
                <circle
                  cx="103"
                  cy="11"
                  r="8"
                  fill="#EA4335"
                  fillOpacity="0.4"
                  className="animate-ping"
                />
                <circle
                  cx="117"
                  cy="11"
                  r="8"
                  fill="#4285F4"
                  fillOpacity="0.4"
                  className="animate-ping"
                />

                {/* Rear and mid body */}
                <path
                  d="M15 22 C15 18, 18 16, 22 16 L160 16 C165 16, 170 18, 172 22 L172 74 L15 74 Z"
                  fill="#FBF8F6"
                  stroke="#1A1614"
                  strokeWidth="2.5"
                />

                {/* Driver cabin */}
                <path
                  d="M172 28 L195 38 C202 42, 208 48, 212 55 L218 64 C220 67, 222 70, 222 74 L172 74 Z"
                  fill="#FBF8F6"
                  stroke="#1A1614"
                  strokeWidth="2.5"
                />

                {/* Windshield */}
                <path
                  d="M176 34 L192 42 C196 44, 200 48, 202 52 L202 56 L176 56 Z"
                  fill="#1A1614"
                  stroke="#1A1614"
                  strokeWidth="1"
                />
                <path
                  d="M180 37 L192 43"
                  stroke="#FBF8F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                {/* Side compartment window */}
                <rect x="40" y="24" width="35" height="18" rx="3" fill="#1A1614" />
                <line
                  x1="45"
                  y1="28"
                  x2="65"
                  y2="28"
                  stroke="#FBF8F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                {/* Signature medical stripe */}
                <path d="M15 50 L220 50 L220 62 L15 62 Z" fill="#B86851" />

                {/* Medical cross emblem */}
                <circle
                  cx="110"
                  cy="38"
                  r="12"
                  fill="#F9F6F3"
                  stroke="#1A1614"
                  strokeWidth="1.5"
                />
                <rect x="107" y="31" width="6" height="14" rx="1" fill="#B86851" />
                <rect x="103" y="35" width="14" height="6" rx="1" fill="#B86851" />

                {/* Access doors and panel seams */}
                <line
                  x1="85"
                  y1="16"
                  x2="85"
                  y2="74"
                  stroke="#1A1614"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                <line
                  x1="135"
                  y1="16"
                  x2="135"
                  y2="74"
                  stroke="#1A1614"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />

                {/* Door handles */}
                <rect x="78" y="44" width="4" height="2" fill="#1A1614" rx="0.5" />
                <rect x="128" y="44" width="4" height="2" fill="#1A1614" rx="0.5" />

                {/* Rear step bumper */}
                <rect x="8" y="68" width="7" height="8" rx="1" fill="#1A1614" />

                {/* Headlight and beam */}
                <rect
                  x="218"
                  y="60"
                  width="4"
                  height="8"
                  rx="1"
                  fill="#F5C7A9"
                  stroke="#1A1614"
                  strokeWidth="1"
                />
                <path
                  d="M222 62 L240 56 L240 72 Z"
                  fill="#B86851"
                  fillOpacity="0.15"
                />

                {/* Wheel wells */}
                <path d="M40 74 A18 18 0 0 1 76 74" fill="#1A1614" />
                <path d="M160 74 A18 18 0 0 1 196 74" fill="#1A1614" />

                {/* Rear wheel */}
                <circle cx="58" cy="74" r="14" fill="#1A1614" />
                <circle
                  cx="58"
                  cy="74"
                  r="8"
                  fill="#6B625F"
                  stroke="#FBF8F6"
                  strokeWidth="2"
                />
                <circle cx="58" cy="74" r="3" fill="#1A1614" />

                {/* Front wheel */}
                <circle cx="178" cy="74" r="14" fill="#1A1614" />
                <circle
                  cx="178"
                  cy="74"
                  r="8"
                  fill="#6B625F"
                  stroke="#FBF8F6"
                  strokeWidth="2"
                />
                <circle cx="178" cy="74" r="3" fill="#1A1614" />
              </svg>

              {/* Floor cast shadow */}
              <div className="w-20 sm:w-36 md:w-48 h-2 sm:h-3 bg-brand-dark/25 rounded-full blur-sm mx-auto -mt-1" />
            </div>
          </motion.div>
        </div>

        {/* ── Lower reading area ── */}
        <div className="shrink-0 max-w-4xl mx-auto w-full relative z-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDoor}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-white rounded-2xl border border-brand-subtle shadow-lg p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 max-w-2xl">
                <div className="p-2.5 bg-bg-page rounded-xl border border-brand-subtle shrink-0">
                  {activeRoom.iconUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={activeRoom.iconUrl}
                      alt=""
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <ActiveIcon size={20} className="text-brand-blue" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-11 font-mono font-bold text-brand-blue">
                      {activeRoom.number}
                    </span>
                    <h3 className="text-18 sm:text-20 leading-[1.2] font-display font-medium text-text-primary">
                      {activeRoom.title}
                    </h3>
                  </div>
                  <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-medium line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                    {activeRoom.description}
                  </p>
                </div>
              </div>

              <button
                onClick={scrollToAssessmentForm}
                className="w-full md:w-auto shrink-0 flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white text-sm font-bold transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ChevronRight size={16} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer navigation indicators */}
        <footer className="shrink-0 max-w-7xl mx-auto w-full flex justify-center items-center border-t border-brand-subtle pt-3">
          <div className="flex gap-2">
            {rooms.map((room, idx) => (
              /* The bar stays 6px tall; the button around it is a 24px target. */
              <button
                key={room.number}
                onClick={() => scrollToDoor(idx)}
                className="h-6 flex items-center cursor-pointer"
                aria-label={`Go to room ${idx + 1}`}
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeDoor === idx
                      ? "w-8 bg-brand-blue"
                      : "w-2 bg-slate-200 hover:bg-brand-blue/50",
                  )}
                />
              </button>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
