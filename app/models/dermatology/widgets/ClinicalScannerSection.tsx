"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { DermaClinicalScannerSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultConditions = [
  { label: "Melanoma Screening", sub: "Malignant" },
  { label: "Atopic Dermatitis", sub: "Eczema" },
  { label: "Plaque Psoriasis", sub: "Chronic Plaque" },
  { label: "Basal Cell Carcinoma", sub: "Glassy Nodule" },
];

const skinData = [
  { bgSkin: "#fae7e0", lesionPath: "M 160 140 Q 185 105 215 125 T 255 160 T 215 195 T 165 175 Z", themeAccent: "#f43f5e" },
  { bgSkin: "#f5dcd4", lesionPath: "M 140 145 A 60 55 0 1 1 260 165 A 55 60 0 1 1 140 145", themeAccent: "#1a6fc4" },
  { bgSkin: "#eccfbe", lesionPath: "M 150 135 C 190 120 240 130 255 155 C 270 180 230 200 200 195 C 170 190 140 170 150 135 Z", themeAccent: "#a855f7" },
  { bgSkin: "#fbf0ec", lesionPath: "M 200 150 A 42 42 0 1 1 200 149 Z", themeAccent: "#eab308" },
];

const defaultDiagnosisData = [
  {
    name: "Malignancy Screening: Melanoma",
    riskLevel: "Critical (Triage Red)",
    riskColor: "text-rose-600 bg-rose-50 border-rose-200",
    confidence: "98.4%",
    fitzpatrick: "Type II Skin (Fair / High Burn)",
    diagnosis: "Suspected Malignant Melanoma (SMM)",
    recommendation: "Immediate referral for dermatopathological biopsy staging and wide-margin surgical resection protocol within 24-48 hours.",
    abcd: [
      { crit: "A - Asymmetry Vector", val: "8.9 / 10", level: "Severe" },
      { crit: "B - Border Scalloping", val: "9.2 / 10", level: "Severe" },
      { crit: "C - Color Variegation", val: "3+ Shades", level: "High" },
      { crit: "D - Diameter Dimension", val: "7.2 mm", level: "Severe" },
    ],
    findings: [
      "Asymmetric pigment distribution with off-center regression zones",
      "Irregular branching pseudopods spanning marginal lines",
      "Sub-clinical melanin cluster depth estimated at 0.85mm",
    ],
    beforeImage: null as string | null,
    afterImage: null as string | null,
  },
  {
    name: "Inflammatory Mapping: Atopic Dermatitis",
    riskLevel: "Moderate (Triage Amber)",
    riskColor: "text-amber-600 bg-amber-50 border-amber-200",
    confidence: "96.8%",
    fitzpatrick: "Type III Skin (Cream / Moderate Tan)",
    diagnosis: "Moderate-to-Severe Atopic Dermatitis",
    recommendation: "Administer non-steroidal topical PDE4 inhibitor sequence. Recommend localized moisture-barrier repair schedules.",
    abcd: [
      { crit: "Erythema Level", val: "Grade 3", level: "High" },
      { crit: "Excoriation Index", val: "Grade 2", level: "Moderate" },
      { crit: "Est. SCORAD Score", val: "54.2 / 100", level: "Severe" },
      { crit: "Epidermal Hydration", val: "32% Scale", level: "Critical" },
    ],
    findings: [
      "Dense epidermal micro-exfoliation and scaling textures mapped",
      "Local erythematous capillary expansion visible under multi-spectral scan",
      "Transepidermal moisture loss verified as severely elevated",
    ],
    beforeImage: null as string | null,
    afterImage: null as string | null,
  },
  {
    name: "Hyperkeratosis: Plaque Psoriasis",
    riskLevel: "Moderate (Triage Amber)",
    riskColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    confidence: "97.1%",
    fitzpatrick: "Type IV Skin (Olive / Easy Tan)",
    diagnosis: "Active Plaque Psoriasis (Vulgaris)",
    recommendation: "Schedule phototherapy narrowband (NB-UVB) session. Apply topical calcipotriol base mapping twice daily.",
    abcd: [
      { crit: "Plaque Elevation", val: "3.2 mm", level: "Severe" },
      { crit: "Silvery Flaking Index", val: "Grade 4", level: "Critical" },
      { crit: "PASI Plaque Index", val: "15.4 / 72", level: "Moderate" },
      { crit: "Vascular Congestion", val: "Grade 3", level: "High" },
    ],
    findings: [
      "Silvery-white micaceous hyperkeratosis scaling over red plaque base",
      "Homogenous erythematous plaque delineation exceeds standard control",
      "High Auspitz sign vascular vulnerability flagged near center",
    ],
    beforeImage: null as string | null,
    afterImage: null as string | null,
  },
  {
    name: "Neoplastic Stratification: Basal Cell",
    riskLevel: "High Risk (Triage Orange)",
    riskColor: "text-orange-600 bg-orange-50 border-orange-200",
    confidence: "97.9%",
    fitzpatrick: "Type I Skin (Very Fair / Severe Burn)",
    diagnosis: "Nodular Basal Cell Carcinoma (BCC)",
    recommendation: "Recommend micrographic Mohs or standard narrow-margin excisional excision. Excellent local prognosis with resection.",
    abcd: [
      { crit: "Translucency Rating", val: "Pearly (88%)", level: "Severe" },
      { crit: "Telangiectasia Branch", val: "Detected", level: "Critical" },
      { crit: "Rolled Rim Border", val: "Present", level: "Severe" },
      { crit: "Ulcerative Cratero", val: "Initial", level: "Moderate" },
    ],
    findings: [
      "Classic translucent nodular shiny envelope with pearly reflectivity",
      "Branching arborizing vascular networks (telangiectasias) mapped",
      "Firm rolled boundary envelope detected cleanly on lateral scans",
    ],
    beforeImage: null as string | null,
    afterImage: null as string | null,
  },
];

function SkinSvgOverlay({ idx: rawIdx }: { idx: number }) {
  const idx = rawIdx % skinData.length;
  const cond = skinData[idx];
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad-melanoma" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2c1712" />
          <stop offset="45%" stopColor="#542c22" />
          <stop offset="85%" stopColor="#965243" />
          <stop offset="100%" stopColor="#fae7e0" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id="grad-eczema" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#f87171" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#fca5a5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fca5a5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="grad-psoriasis" cx="52%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="55%" stopColor="#dc2626" stopOpacity="0.85" />
          <stop offset="90%" stopColor="#f87171" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fee2e2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="grad-basal" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#fda4af" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#e11d48" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ecf0f1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={cond.bgSkin} />
      <circle cx="80" cy="65" r="1.5" fill="#a16207" opacity="0.15" />
      <circle cx="280" cy="85" r="2.5" fill="#a16207" opacity="0.12" />
      <circle cx="340" cy="225" r="1.5" fill="#a16207" opacity="0.18" />
      <circle cx="95" cy="245" r="2.0" fill="#a16207" opacity="0.1" />

      <path
        d={cond.lesionPath}
        fill={
          idx === 0 ? "url(#grad-melanoma)" :
          idx === 1 ? "url(#grad-eczema)" :
          idx === 2 ? "url(#grad-psoriasis)" :
          "url(#grad-basal)"
        }
      />

      {idx === 3 && (
        <g opacity="0.75">
          <path d="M 185 135 Q 192 145 198 140 T 205 145" fill="none" stroke="#ef4444" strokeWidth="1" />
          <path d="M 215 155 Q 210 162 202 158 T 192 165" fill="none" stroke="#ef4444" strokeWidth="1" />
        </g>
      )}

      {/* AI Overlay */}
      <path d={cond.lesionPath} fill="none" stroke={cond.themeAccent} strokeWidth="3.5" strokeDasharray="6 4" style={{ filter: `drop-shadow(0 0 5px ${cond.themeAccent})` }} />

      <g stroke={cond.themeAccent} strokeWidth="0.8" opacity="0.4" strokeDasharray="3 3">
        <line x1="200" y1="20" x2="200" y2="280" />
        <line x1="30" y1="150" x2="370" y2="150" />
        <circle cx="200" cy="150" r="50" fill="none" />
        <circle cx="200" cy="150" r="95" fill="none" strokeWidth="0.5" />
      </g>

      <g fill={cond.themeAccent} opacity="0.35">
        {[-3, -2, -1, 0, 1, 2, 3].map((x) =>
          [-3, -2, -1, 0, 1, 2, 3].map((y) => {
            const cx = 200 + x * 26;
            const cy = 150 + y * 26;
            const dist = Math.sqrt(x * x + y * y);
            if (dist > 3.0) return null;
            return (
              <circle key={`${x}-${y}`} cx={cx} cy={cy} r={dist < 1.5 ? "2" : "1"} className="animate-pulse" style={{ animationDelay: `${dist * 120}ms` }} />
            );
          })
        )}
      </g>

      {/* Callouts per condition */}
      {idx === 0 && (
        <g className="text-10 font-sans font-semibold" opacity="0.9">
          <line x1="170" y1="120" x2="110" y2="90" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="170" cy="120" r="4" fill={cond.themeAccent} />
          <rect x="30" y="65" width="90" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="35" y="78" fill="#fda4af">Asymmetry Vector</text>
          <line x1="230" y1="180" x2="290" y2="210" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="230" cy="180" r="4" fill={cond.themeAccent} />
          <rect x="280" y="200" width="90" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="285" y="213" fill="#67e8f9">Jagged Margin</text>
        </g>
      )}
      {idx === 1 && (
        <g className="text-10 font-sans font-semibold" opacity="0.9">
          <line x1="165" y1="185" x2="95" y2="215" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="165" cy="185" r="4" fill={cond.themeAccent} />
          <rect x="20" y="205" width="90" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="25" y="218" fill="#93c5fd">Active Erythema</text>
          <line x1="210" y1="120" x2="270" y2="90" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="210" cy="120" r="4" fill={cond.themeAccent} />
          <rect x="255" y="75" width="115" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="260" y="88" fill="#93c5fd">Epidermal Moisture-</text>
        </g>
      )}
      {idx === 2 && (
        <g className="text-10 font-sans font-semibold" opacity="0.9">
          <line x1="230" y1="140" x2="295" y2="100" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="230" cy="140" r="4" fill={cond.themeAccent} />
          <rect x="285" y="85" width="95" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="290" y="98" fill="#c084fc">Silvery Scales</text>
          <line x1="170" y1="180" x2="105" y2="210" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="170" cy="180" r="4" fill={cond.themeAccent} />
          <rect x="35" y="200" width="85" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="40" y="213" fill="#f472b6">Raised Border</text>
        </g>
      )}
      {idx === 3 && (
        <g className="text-10 font-sans font-semibold" opacity="0.9">
          <line x1="195" y1="155" x2="115" y2="195" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="195" cy="155" r="4" fill={cond.themeAccent} />
          <rect x="40" y="185" width="90" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="45" y="198" fill="#fcd34d">Arborizing Blood</text>
          <line x1="235" y1="135" x2="285" y2="100" stroke={cond.themeAccent} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="235" cy="135" r="4" fill={cond.themeAccent} />
          <rect x="275" y="85" width="95" height="20" rx="4" fill="#04080e" stroke={cond.themeAccent} strokeWidth="1" />
          <text x="280" y="98" fill="#fcd34d">Pearly Glass Margin</text>
        </g>
      )}
    </svg>
  );
}

function RawSkinSvg({ idx: rawIdx }: { idx: number }) {
  const idx = rawIdx % skinData.length;
  const cond = skinData[idx];
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill={cond.bgSkin} />
      <circle cx="80" cy="65" r="1.5" fill="#a16207" opacity="0.15" />
      <circle cx="280" cy="85" r="2.5" fill="#a16207" opacity="0.12" />
      <circle cx="340" cy="225" r="1.5" fill="#a16207" opacity="0.18" />
      <circle cx="95" cy="245" r="2.0" fill="#a16207" opacity="0.1" />
      <path
        d={cond.lesionPath}
        fill={
          idx === 0 ? "url(#grad-melanoma)" :
          idx === 1 ? "url(#grad-eczema)" :
          idx === 2 ? "url(#grad-psoriasis)" :
          "url(#grad-basal)"
        }
      />
      {idx === 3 && (
        <g opacity="0.75">
          <path d="M 185 135 Q 192 145 198 140 T 205 145" fill="none" stroke="#ef4444" strokeWidth="1" />
          <path d="M 215 155 Q 210 162 202 158 T 192 165" fill="none" stroke="#ef4444" strokeWidth="1" />
          <path d="M 180 158 Q 188 152 194 154" fill="none" stroke="#ef4444" strokeWidth="0.8" />
          <path d="M 210 132 Q 206 142 208 150" fill="none" stroke="#ef4444" strokeWidth="0.8" />
        </g>
      )}
    </svg>
  );
}

export default function ClinicalScannerSection({ data: sectionData, wrapperClass }: { data?: DermaClinicalScannerSection; wrapperClass?: string }) {
  const sectionPreheading = sectionData?.preheading ?? "Interactive Diagnostic Console";
  const sectionTitle = sectionData?.title ?? "Clinical Multi-Spectral AI Overlay Simulator";
  const sectionDescription = sectionData?.description ?? "Switch clinical condition models and drag the slider across the skin scan to reveal the underlying OJAS computer-vision neural segmentation outline and diagnosis indicators.";
  const conditions = sectionData?.conditions?.map((c) => ({ label: c.label, sub: c.sub ?? "" })) ?? defaultConditions;
  const diagnosisDataItems = sectionData?.diagnosisData?.map((d) => ({
    name: d.name,
    riskLevel: d.riskLevel,
    riskColor: d.riskColor ?? "text-rose-600 bg-rose-50 border-rose-200",
    confidence: d.confidence,
    fitzpatrick: d.fitzpatrick ?? "",
    diagnosis: d.diagnosis,
    recommendation: d.recommendation ?? "",
    abcd: d.abcd?.map((a) => ({ crit: a.crit, val: a.val, level: a.level })) ?? [],
    findings: d.findings?.map((f) => f.text) ?? [],
    beforeImage: getStrapiMedia(d.beforeImage?.url ?? null),
    afterImage: getStrapiMedia(d.afterImage?.url ?? null),
  })) ?? defaultDiagnosisData;
  const [sliderPos, setSliderPos] = useState(50);
  const [selectedConditionIdx, setSelectedConditionIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  useEffect(() => {
    setIsScanning(true);
    setScanProgress(0);
    setSliderPos(100);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 100) {
        setScanProgress(currentProgress);
        if (currentProgress === 100) {
          setTimeout(() => {
            setIsScanning(false);
            const moveSliderInterval = setInterval(() => {
              setSliderPos((prev) => {
                if (prev > 50) return prev - 2;
                clearInterval(moveSliderInterval);
                return 50;
              });
            }, 12);
          }, 300);
        }
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [selectedConditionIdx]);

  const safeIdx = Math.min(selectedConditionIdx, diagnosisDataItems.length - 1, skinData.length - 1);
  const data = diagnosisDataItems[safeIdx] ?? defaultDiagnosisData[0];

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-surface px-6 sm:px-12 md:px-24 global-container mx-auto border-t border-brand-subtle border-b relative", wrapperClass)}>
      <div className="absolute top-1/2 left-[10%] w-[400px] h-[400px] bg-brand-blue/5 blur-3xl rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-[5%] w-[300px] h-[300px] bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">{sectionPreheading}</p>
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">
            {sectionTitle}
          </h2>
          <p className="text-14 sm:text-base text-text-secondary max-w-2xl mx-auto font-medium mt-4">
            {sectionDescription}
          </p>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-3 max-w-4xl mx-auto">
          {conditions.map((tab, idx) => {
            const isActive = selectedConditionIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedConditionIdx(idx)}
                className={`flex flex-col items-center px-6 py-3 rounded-2xl transition-all duration-300 border text-center relative overflow-hidden group ${
                  isActive
                    ? "bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/20"
                    : "bg-white border-brand-subtle text-text-secondary hover:border-brand-blue/30 hover:bg-slate-50"
                }`}
              >
                <span className="text-xs uppercase tracking-widest opacity-60 font-extrabold mb-1">{tab.sub}</span>
                <span className="text-sm font-display font-black tracking-tight">{tab.label}</span>
                {isActive && (
                  <motion.div layoutId="activeTabGlow" className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* LEFT: SLIDER */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[500px] relative rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-slate-900 group aspect-4/3 selection:bg-none">
              <AnimatePresence>
                {isScanning && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-6 text-center select-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full border-4 border-brand-blue/20 border-t-brand-blue animate-spin" />
                      <Sparkles size={24} className="text-brand-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <h4 className="text-brand-subtle font-display font-bold uppercase tracking-widest text-xs mb-1">OJAS NEURAL DECODER CORE</h4>
                    <p className="text-11 text-white/50 font-mono mb-4">MAPPING PIXEL CONTOURS ON COHORT INDEX {safeIdx + 1}...</p>
                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue transition-all duration-75" style={{ width: `${scanProgress}%` }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isScanning && (
                <div className="absolute left-0 right-0 h-[3px] bg-brand-blue shadow-[0_0_12px_#1a6fc4] z-30 animate-[bounce_1.5s_infinite]" />
              )}

              <div className="relative w-full h-full select-none">
                {/* AFTER layer (right / AI overlay) — full width behind */}
                <div className="absolute inset-0 w-full h-full">
                  {data.afterImage ? (
                    <img src={data.afterImage} alt="AI analysis overlay" className="w-full h-full object-cover" draggable={false} />
                  ) : (
                    <SkinSvgOverlay idx={safeIdx} />
                  )}
                </div>

                {/* BEFORE layer (left / raw scan) — clipped by slider */}
                <div className="absolute inset-y-0 left-0 overflow-hidden h-full pointer-events-none z-10" style={{ width: `${sliderPos}%` }}>
                  <div className="absolute inset-0 w-[500px] aspect-4/3 h-full">
                    {data.beforeImage ? (
                      <img src={data.beforeImage} alt="Raw clinical scan" className="w-full h-full object-cover" draggable={false} />
                    ) : (
                      <RawSkinSvg idx={safeIdx} />
                    )}
                  </div>
                </div>

                {/* Slider divider line + handle */}
                <div className="absolute inset-y-0 pointer-events-none z-20 flex flex-col justify-between items-center" style={{ left: `${sliderPos}%` }}>
                  <div className="w-[3px] h-full bg-brand-blue shadow-[0_0_8px_#1a6fc4] opacity-80" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center shadow-2xl pointer-events-none hover:scale-105 active:scale-95 transition-all">
                    <div className="flex gap-0.5 text-brand-blue">
                      <ArrowLeft size={10} className="font-extrabold animate-pulse" />
                      <ArrowRight size={10} className="font-extrabold animate-pulse" />
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  disabled={isScanning}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 pointer-events-auto"
                  aria-label="Before and after comparison slider"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-text-secondary font-bold select-none">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-300" /> {data.beforeImage ? "BEFORE (LEFT)" : "RAW CLINICAL SCAN (LEFT)"}</div>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-subtle" />
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-brand-blue" /> {data.afterImage ? "AFTER (RIGHT)" : "OJAS MULTI-SPECTRAL AI (RIGHT)"}</div>
            </div>
          </div>

          {/* RIGHT: DIAGNOSIS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-bg-page border border-brand-subtle rounded-2xl p-6 sm:p-8 shadow-sm text-left flex flex-col justify-between min-h-115">
              <div>
                <div className="flex justify-between items-start gap-4 mb-5">
                  <div>
                    <h3 className="font-display font-black text-lg text-text-primary uppercase tracking-tight">{data.name}</h3>
                    <p className="text-11 text-text-accent font-semibold uppercase mt-1 font-sans">{data.fitzpatrick}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-11 font-semibold uppercase tracking-widest border shrink-0 ${data.riskColor}`}>
                    {data.riskLevel}
                  </span>
                </div>

                <div className="bg-white border border-brand-subtle rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-baseline mb-2 text-xs font-bold text-text-primary">
                    <span>OJAS DIAGNOSIS</span>
                    <span className="text-brand-blue font-black text-sm">{data.confidence} CONFIDENCE</span>
                  </div>
                  <h4 className="text-sm font-display font-black text-brand-blue leading-tight mb-2 uppercase">{data.diagnosis}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-semibold">{data.recommendation}</p>
                </div>

                <div className="mb-6">
                  <h5 className="text-11 text-text-accent font-semibold uppercase tracking-wider mb-3">CONTOUR ANALYSIS METRICS</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {data.abcd.map((c, i) => (
                      <div key={i} className="bg-white/60 stats-item p-3 border border-brand-subtle/70 rounded-xl flex flex-col justify-between">
                        <span className="text-11 opacity-70 font-semibold block leading-none mb-1 text-text-secondary shrink-0">{c.crit}</span>
                        <div className="flex justify-between items-end">
                          <span className="text-xs font-black text-text-primary leading-none font-sans">{c.val}</span>
                          <span className={`text-10 font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                            c.level === "Severe" || c.level === "Critical" ? "bg-rose-50 text-rose-600" :
                            c.level === "High" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-brand-blue"
                          }`}>{c.level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-11 text-text-accent font-semibold uppercase tracking-wider mb-2.5">OOM-1 CELLULAR FINDINGS</h5>
                  <ul className="space-y-1.5 text-xs text-text-secondary font-medium">
                    {data.findings.map((finding, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <CheckCircle2 size={12} className="text-brand-blue mt-0.5 shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
