"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Users, Clock, Activity, TrendingUp, Zap, Sparkles } from "lucide-react";
import type { HomeCalculatorWidget } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

/* ─── Helpers ─── */
function formatIndianCurrency(num: number, useAbbreviation = false) {
  const rounded = Math.round(num);
  if (useAbbreviation) {
    if (rounded >= 10000000) return `₹${(rounded / 10000000).toFixed(2).replace(/\.00$/, "")}Cr`;
    if (rounded >= 100000) return `₹${(rounded / 100000).toFixed(2).replace(/\.00$/, "")}L`;
    if (rounded >= 1000) return `₹${(rounded / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    return `₹${rounded}`;
  }
  const str = rounded.toString();
  let lastThree = str.substring(str.length - 3);
  const otherParts = str.substring(0, str.length - 3);
  if (otherParts !== "") lastThree = "," + lastThree;
  return `₹${otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree}`;
}

function AnimatedNumber({ value, formatter }: { value: number; formatter?: (val: number) => string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const from = prevRef.current;
    prevRef.current = value;
    if (from === value) return;
    let id: number;
    const animate = (time: number) => {
      const p = Math.min((time - start) / 150, 1);
      setDisplayValue(from + (value - from) * p);
      if (p < 1) id = requestAnimationFrame(animate); else setDisplayValue(value);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [value]);
  return <span>{formatter ? formatter(displayValue) : Math.round(displayValue).toLocaleString()}</span>;
}

/* ─── Hospital ROI ─── */
function HospitalROICalculatorInner() {
  const [dailyVisits, setDailyVisits] = useState(300);
  const [timeSaved, setTimeSaved] = useState(5);
  const [workDays, setWorkDays] = useState(300);
  const annualRevenue = 100000000;
  const savedHoursYear = Math.round((dailyVisits * timeSaved * workDays) / 60);
  const extraCapacityYear = Math.round((dailyVisits * timeSaved * workDays) / 20);
  const totalPatientsBaseline = dailyVisits * workDays;
  const avgRevenuePerPt = totalPatientsBaseline > 0 ? Math.round(annualRevenue / totalPatientsBaseline) : 0;
  const projectedGain = Math.round(extraCapacityYear * avgRevenuePerPt);
  const capacityPctIncrease = totalPatientsBaseline > 0 ? (extraCapacityYear / totalPatientsBaseline) * 100 : 0;

  return (
    <div className="bg-[#F9F6F3] text-[#1A1614] rounded-2xl p-4 sm:p-5 border border-[#B86851]/15 shadow-lg relative overflow-hidden font-sans w-full">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="mb-4 flex flex-col items-center gap-2 text-center lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:text-left">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#B86851]/10 text-[#B86851] border border-[#B86851]/20 rounded-full text-9 font-bold tracking-[0.18em] uppercase mb-2 shadow-sm">
            <Sparkles size={9} className="animate-pulse text-[#B86851]" />
            Interactive B2B Value Engine
          </div>
          <h3 className="text-18 sm:text-24 font-display font-medium text-[#1A1614] tracking-tight leading-tight">Hospital ROI calculator</h3>
          <p className="text-[#48403D] text-11 mt-1 font-medium leading-snug max-w-lg">Simulate operational efficiency, capacity unlock, and revenue recovery scaled to your patient volume.</p>
        </div>
        <p className="hidden lg:flex items-center gap-1 text-9 text-[#B86851] font-bold tracking-[0.14em] uppercase shrink-0 pb-0.5"><ShieldCheck size={10} className="text-[#B86851]" />Verified Secure Integration</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2 lg:gap-4 items-stretch">
        {/* ── Left: inputs ── */}
        <div className="bg-white p-4 rounded-xl border border-[#B86851]/10 flex flex-col">
          <h4 className="text-10 font-bold text-[#48403D] uppercase tracking-[0.14em] border-b border-[#B86851]/10 pb-2">Operational Inputs</h4>
          <div className="flex-1 flex flex-col justify-center gap-3.5 py-3.5">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="hosp-daily-visits" className="text-11 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Users size={12} className="text-[#B86851]" />Daily Patients</label>
                <input id="hosp-daily-visits" type="number" min={50} max={2000} value={dailyVisits || ""} onChange={e => setDailyVisits(Math.max(0, Math.min(2000, parseInt(e.target.value) || 0)))} onBlur={() => { if (!dailyVisits || dailyVisits < 50) setDailyVisits(50); }} className="w-14 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-11 font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" aria-label="Daily patients" min={50} max={2000} step={10} value={dailyVisits} onChange={e => setDailyVisits(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-9 text-[#6B625F] font-mono"><span>50</span><span>2,000 visits / day</span></div>
            </div>
            <div className="space-y-1.5 pt-3 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="hosp-time-saved" className="text-11 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Clock size={12} className="text-[#B86851]" />Time Saved / Pt</label>
                <div className="flex items-center gap-1">
                  <input id="hosp-time-saved" type="number" min={1} max={15} value={timeSaved || ""} onChange={e => setTimeSaved(Math.max(0, Math.min(15, parseInt(e.target.value) || 0)))} onBlur={() => { if (!timeSaved || timeSaved < 1) setTimeSaved(1); }} className="w-11 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-11 font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
                  <span className="text-9 text-[#48403D] font-bold uppercase">mins</span>
                </div>
              </div>
              <input type="range" aria-label="Time saved per patient" min={1} max={15} value={timeSaved} onChange={e => setTimeSaved(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-9 text-[#6B625F] font-mono"><span>1 min</span><span>15 mins</span></div>
            </div>
            <div className="space-y-1.5 pt-3 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="hosp-work-days" className="text-11 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Activity size={12} className="text-[#B86851]" />Working Days / Yr</label>
                <input id="hosp-work-days" type="number" min={100} max={365} value={workDays || ""} onChange={e => setWorkDays(Math.max(0, Math.min(365, parseInt(e.target.value) || 0)))} onBlur={() => { if (!workDays || workDays < 100) setWorkDays(100); }} className="w-14 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-11 font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" aria-label="Working days per year" min={100} max={365} value={workDays} onChange={e => setWorkDays(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-9 text-[#6B625F] font-mono"><span>100 days</span><span>365 days</span></div>
            </div>
          </div>
          <p className="text-10 text-[#6B625F] leading-tight border-t border-[#B86851]/10 pt-2">Assumes a 20 min baseline consult and ₹10Cr annual revenue.</p>
        </div>

        {/* ── Right: results ── */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#B86851] text-white rounded-xl p-4 shadow-md relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start gap-3">
              <div className="min-w-0">
                <span className="inline-block text-8 font-black uppercase tracking-[0.18em] text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/15">Top-line Impact</span>
                <h4 className="text-9 font-bold uppercase tracking-[0.14em] text-white/70 mt-2">Projected financial gain</h4>
                <div className="text-24 sm:text-28 lg:text-32 font-mono font-black tracking-tight text-white leading-none mt-1">
                  <AnimatedNumber value={projectedGain} formatter={v => formatIndianCurrency(v, true)} />
                </div>
                <p className="text-10 text-white/85 font-mono mt-1 font-bold">or <AnimatedNumber value={projectedGain} formatter={v => formatIndianCurrency(v, false)} /> per year</p>
              </div>
              <Activity size={16} className="text-white/40 animate-pulse shrink-0" />
            </div>
            <div className="text-9 text-white/70 border-t border-white/15 mt-3 pt-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
              <span>Extra capacity × avg revenue per patient</span>
              <span className="font-bold text-white/85">100% margin recovery</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border border-[#B86851]/10 p-2.5 rounded-lg flex flex-col gap-1.5 hover:shadow-sm transition-all shadow-sm">
              <div className="flex items-center gap-1 text-9 font-bold text-[#48403D] uppercase tracking-wider"><Clock size={9} className="text-[#B86851] shrink-0" />Time Saved / Yr</div>
              <div className="text-16 lg:text-18 font-mono font-black text-[#1A1614] leading-none"><AnimatedNumber value={savedHoursYear} /><span className="text-9 text-[#6B625F] font-normal ml-0.5">hrs</span></div>
            </div>
            <div className="bg-white border border-[#B86851]/10 p-2.5 rounded-lg flex flex-col gap-1.5 hover:shadow-sm transition-all shadow-sm">
              <div className="flex items-center gap-1 text-9 font-bold text-[#48403D] uppercase tracking-wider"><Activity size={9} className="text-[#B86851] shrink-0" />Extra Capacity</div>
              <div className="text-16 lg:text-18 font-mono font-black text-[#B86851] leading-none">+<AnimatedNumber value={extraCapacityYear} /><span className="text-9 text-[#6B625F] font-normal ml-0.5">pts</span></div>
            </div>
            <div className="bg-white border border-[#B86851]/10 p-2.5 rounded-lg flex flex-col gap-1.5 hover:shadow-sm transition-all shadow-sm">
              <div className="flex items-center gap-1 text-9 font-bold text-[#48403D] uppercase tracking-wider"><TrendingUp size={9} className="text-[#B86851] shrink-0" />Avg Rev / Visit</div>
              <div className="text-16 lg:text-18 font-mono font-black text-[#1A1614] leading-none"><AnimatedNumber value={avgRevenuePerPt} formatter={v => formatIndianCurrency(v, false)} /></div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#B86851]/10 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center gap-2 mb-2.5">
              <h5 className="text-10 font-extrabold text-[#48403D] uppercase tracking-[0.14em] flex items-center gap-1.5"><Activity size={10} className="text-[#B86851]" />Resource Capacity Unlock</h5>
              <span className="text-9 text-[#B86851] font-bold px-2 py-0.5 bg-[#B86851]/10 rounded-full whitespace-nowrap">+{capacityPctIncrease.toFixed(0)}% Uplift</span>
            </div>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex justify-between text-10 font-bold text-[#48403D]"><span>Baseline Volume / Year</span><span className="font-mono text-[#1A1614]">{totalPatientsBaseline.toLocaleString()}</span></div>
                <div className="w-full bg-[#F9F6F3] h-4 rounded-md overflow-hidden relative flex items-center px-2 border border-[#B86851]/10">
                  <div className="absolute inset-y-0 left-0 bg-[#6B625F]/20 transition-all duration-300" style={{ width: "100%" }} />
                  <span className="relative text-8 text-[#48403D] font-extrabold font-mono uppercase tracking-wider z-10">Current Baseline (100%)</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-10 font-bold text-[#48403D]">
                  <span className="flex items-center gap-1">Expanded Capacity<Sparkles size={9} className="text-[#B86851] animate-pulse" /></span>
                  <span className="font-mono text-[#B86851] font-black">{(totalPatientsBaseline + extraCapacityYear).toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#F9F6F3] h-4 rounded-md overflow-hidden relative flex items-center px-2 border border-[#B86851]/10">
                  <div className="absolute inset-y-0 left-0 bg-[#B86851]/20 transition-all duration-500" style={{ width: `${Math.min(100, 100 / (1 + capacityPctIncrease / 100))}%` }} />
                  <div className="absolute inset-y-0 bg-[#B86851] transition-all duration-500 animate-pulse" style={{ left: `${Math.min(100, 100 / (1 + capacityPctIncrease / 100))}%`, width: `${Math.min(100, 100 - 100 / (1 + capacityPctIncrease / 100))}%` }} />
                  <span className="relative text-8 text-white font-extrabold font-mono uppercase tracking-wider z-10 flex items-center gap-1 bg-[#B86851] px-1 rounded">Expanded (+{capacityPctIncrease.toFixed(0)}%)</span>
                </div>
              </div>
            </div>
            <p className="text-10 text-[#6B625F] mt-2.5 border-t border-[#B86851]/10 pt-2 leading-tight">* Reclaimed admin time converts to clinical throughput.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#B86851]/10 flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center">
        <p className="text-10 text-[#6B625F] font-medium">OJAS Healthcare Platform B2B Value Realization Model. All rights reserved.</p>
        <p className="flex lg:hidden items-center gap-1 text-9 text-[#B86851] font-bold tracking-[0.14em] uppercase"><ShieldCheck size={10} className="text-[#B86851]" />Verified Secure Integration</p>
      </div>
    </div>
  );
}

/* ─── SaaS ROI ─── */
function SaasROICalculatorInner() {
  const [numDoctors, setNumDoctors] = useState(12);
  const [timeSaved, setTimeSaved] = useState(4);
  const [patientsPerDay, setPatientsPerDay] = useState(20);
  const [workDays, setWorkDays] = useState(250);
  const [annualIncome] = useState(2400000);
  const annualHoursReclaimedPerDoctor = (patientsPerDay * timeSaved * workDays) / 60;
  const totalPracticeHoursReclaimed = Math.round(annualHoursReclaimedPerDoctor * numDoctors);
  const doctorHourlyValue = workDays > 0 ? annualIncome / (workDays * 8) : 0;
  const financialValueReclaimed = Math.round(totalPracticeHoursReclaimed * doctorHourlyValue);
  const equivalentFullTimeDaysSaved = Math.round(totalPracticeHoursReclaimed / 8);

  return (
    <div className="bg-[#F9F6F3] text-[#1A1614] rounded-2xl p-4 sm:p-5 border border-[#B86851]/15 shadow-lg relative overflow-hidden font-sans w-full">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="mb-4 flex flex-col items-center gap-2 text-center lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:text-left">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#B86851]/10 text-[#B86851] border border-[#B86851]/20 rounded-full text-9 font-bold tracking-[0.18em] uppercase mb-2 shadow-sm">
            <Zap size={9} className="animate-pulse text-[#B86851]" />
            Clinical Productivity & ROI Engine
          </div>
          <h3 className="text-18 sm:text-24 font-display font-medium text-[#1A1614] tracking-tight leading-tight">Healthcare SaaS company ROI calculator</h3>
          <p className="text-[#48403D] text-11 mt-1 font-medium leading-snug max-w-lg">Quantify clinical time reclaimed, practice efficiency, and financial recovery from lifting the admin burden.</p>
        </div>
        <p className="hidden lg:flex items-center gap-1 text-9 text-[#B86851] font-bold tracking-[0.14em] uppercase shrink-0 pb-0.5"><ShieldCheck size={10} className="text-[#B86851]" />Verified Secure Integration</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2 lg:gap-4 items-stretch">
        {/* ── Left: inputs ── */}
        <div className="bg-white p-4 rounded-xl border border-[#B86851]/10 flex flex-col">
          <h4 className="text-10 font-bold text-[#48403D] uppercase tracking-[0.14em] border-b border-[#B86851]/10 pb-2">Practice Demographics & Inputs</h4>
          <div className="flex-1 flex flex-col justify-center gap-3 py-3">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="saas-num-doctors" className="text-11 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Users size={12} className="text-[#B86851]" />Number of Doctors</label>
                <input id="saas-num-doctors" type="number" min={1} max={100} value={numDoctors || ""} onChange={e => setNumDoctors(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))} onBlur={() => { if (!numDoctors || numDoctors < 1) setNumDoctors(1); }} className="w-14 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-11 font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" aria-label="Number of doctors" min={1} max={100} value={numDoctors} onChange={e => setNumDoctors(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-9 text-[#6B625F] font-mono"><span>1 doctor</span><span>100 doctors</span></div>
            </div>
            <div className="space-y-1.5 pt-2.5 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="saas-time-saved" className="text-11 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Clock size={12} className="text-[#B86851]" />Time Saved / Patient</label>
                <div className="flex items-center gap-1">
                  <input id="saas-time-saved" type="number" min={1} max={15} value={timeSaved || ""} onChange={e => setTimeSaved(Math.max(0, Math.min(15, parseInt(e.target.value) || 0)))} onBlur={() => { if (!timeSaved || timeSaved < 1) setTimeSaved(1); }} className="w-11 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-11 font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
                  <span className="text-9 text-[#48403D] font-bold uppercase">mins</span>
                </div>
              </div>
              <input type="range" aria-label="Time saved per patient" min={1} max={15} value={timeSaved} onChange={e => setTimeSaved(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-9 text-[#6B625F] font-mono"><span>1 min</span><span>15 mins</span></div>
            </div>
            <div className="space-y-1.5 pt-2.5 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="saas-patients-per-day" className="text-11 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Activity size={12} className="text-[#B86851]" />Daily Patients / Doc</label>
                <input id="saas-patients-per-day" type="number" min={5} max={50} value={patientsPerDay || ""} onChange={e => setPatientsPerDay(Math.max(0, Math.min(50, parseInt(e.target.value) || 0)))} onBlur={() => { if (!patientsPerDay || patientsPerDay < 5) setPatientsPerDay(5); }} className="w-14 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-11 font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" aria-label="Daily patients per doctor" min={5} max={50} value={patientsPerDay} onChange={e => setPatientsPerDay(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-9 text-[#6B625F] font-mono"><span>5 patients</span><span>50 patients</span></div>
            </div>
            <div className="space-y-1.5 pt-2.5 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="saas-work-days" className="text-11 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Activity size={12} className="text-[#B86851]" />Working Days / Yr</label>
                <input id="saas-work-days" type="number" min={100} max={365} value={workDays || ""} onChange={e => setWorkDays(Math.max(0, Math.min(365, parseInt(e.target.value) || 0)))} onBlur={() => { if (!workDays || workDays < 100) setWorkDays(100); }} className="w-14 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-11 font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" aria-label="Working days per year" min={100} max={365} value={workDays} onChange={e => setWorkDays(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-9 text-[#6B625F] font-mono"><span>100 days</span><span>365 days</span></div>
            </div>
          </div>
          <p className="text-10 text-[#6B625F] leading-tight border-t border-[#B86851]/10 pt-2">Assumes {formatIndianCurrency(annualIncome, true)} annual income per doctor across an 8-hour clinical day.</p>
        </div>

        {/* ── Right: results ── */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#B86851] text-white rounded-xl p-4 shadow-md relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start gap-3">
              <div className="min-w-0">
                <span className="inline-block text-8 font-black uppercase tracking-[0.18em] text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/15">OJAS Value Impact</span>
                <h4 className="text-9 font-bold uppercase tracking-[0.14em] text-white/70 mt-2">Reclaimed time financial value</h4>
                <div className="text-24 sm:text-28 lg:text-32 font-mono font-black tracking-tight text-white leading-none mt-1">
                  <AnimatedNumber value={financialValueReclaimed} formatter={v => formatIndianCurrency(v, true)} />
                </div>
                <p className="text-10 text-white/85 font-mono mt-1 font-bold">or <AnimatedNumber value={financialValueReclaimed} formatter={v => formatIndianCurrency(v, false)} /> saved per year</p>
              </div>
              <TrendingUp size={16} className="text-white/40 animate-pulse shrink-0" />
            </div>
            <div className="text-9 text-white/70 border-t border-white/15 mt-3 pt-2 flex flex-wrap justify-between items-center gap-x-3 gap-y-0.5">
              <span>Practice hours saved × doctor hourly value</span>
              <span className="font-bold text-white/85">Productivity multiplier</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border border-[#B86851]/10 p-2.5 rounded-lg flex flex-col gap-1.5 hover:shadow-sm transition-all shadow-sm">
              <div className="flex items-center gap-1 text-9 font-bold text-[#48403D] uppercase tracking-wider"><Clock size={9} className="text-[#B86851] shrink-0" />Practice Hrs / Yr</div>
              <div className="text-16 lg:text-18 font-mono font-black text-[#1A1614] leading-none"><AnimatedNumber value={totalPracticeHoursReclaimed} /><span className="text-9 text-[#6B625F] font-normal ml-0.5">hrs</span></div>
            </div>
            <div className="bg-white border border-[#B86851]/10 p-2.5 rounded-lg flex flex-col gap-1.5 hover:shadow-sm transition-all shadow-sm">
              <div className="flex items-center gap-1 text-9 font-bold text-[#48403D] uppercase tracking-wider"><Zap size={9} className="text-[#B86851] shrink-0" />Full-Time Days</div>
              <div className="text-16 lg:text-18 font-mono font-black text-[#B86851] leading-none">+<AnimatedNumber value={equivalentFullTimeDaysSaved} /><span className="text-9 text-[#6B625F] font-normal ml-0.5">days</span></div>
            </div>
            <div className="bg-white border border-[#B86851]/10 p-2.5 rounded-lg flex flex-col gap-1.5 hover:shadow-sm transition-all shadow-sm">
              <div className="flex items-center gap-1 text-9 font-bold text-[#48403D] uppercase tracking-wider"><TrendingUp size={9} className="text-[#B86851] shrink-0" />Doctor Value / Hr</div>
              <div className="text-16 lg:text-18 font-mono font-black text-[#1A1614] leading-none">{formatIndianCurrency(Math.round(doctorHourlyValue), false)}</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#B86851]/10 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center gap-2 mb-2.5">
              <h5 className="text-10 font-extrabold text-[#48403D] uppercase tracking-[0.14em] flex items-center gap-1.5"><Activity size={10} className="text-[#B86851]" />Clinician Productivity Breakdown</h5>
              <span className="text-9 text-[#B86851] font-bold px-2 py-0.5 bg-[#B86851]/10 rounded-full whitespace-nowrap">{numDoctors} {numDoctors === 1 ? "Doc" : "Docs"}</span>
            </div>
            <div className="space-y-1.5 text-10 font-bold text-[#48403D]">
              <div className="flex justify-between border-b border-[#B86851]/10 pb-1.5"><span>Reclaimed hours / doctor</span><span className="font-mono text-[#1A1614]"><AnimatedNumber value={Math.round(annualHoursReclaimedPerDoctor)} /> hrs</span></div>
              <div className="flex justify-between border-b border-[#B86851]/10 pb-1.5"><span>Reclaimed hours / practice</span><span className="font-mono text-[#B86851] font-black"><AnimatedNumber value={totalPracticeHoursReclaimed} /> hrs</span></div>
              <div className="flex justify-between"><span>Minutes saved / patient</span><span className="font-mono text-[#1A1614]">{timeSaved} mins</span></div>
            </div>
            <p className="text-10 text-[#6B625F] mt-2.5 border-t border-[#B86851]/10 pt-2 leading-snug">* Each doctor gains <strong className="text-[#48403D] font-bold">{Math.round(annualHoursReclaimedPerDoctor)} hours</strong> of productive focus or rest per year.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#B86851]/10 flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center">
        <p className="text-10 text-[#6B625F] font-medium">OJAS Healthcare Platform B2B Value Realization Model. All rights reserved.</p>
        <p className="flex lg:hidden items-center gap-1 text-9 text-[#B86851] font-bold tracking-[0.14em] uppercase"><ShieldCheck size={10} className="text-[#B86851]" />Verified Secure Integration</p>
      </div>
    </div>
  );
}

/* ─── Tab keys ─── */
const CALCULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  "Hospital ROI calculator": HospitalROICalculatorInner,
  "Healthcare SaaS company ROI calculator": SaasROICalculatorInner,
};

/* ─── Main Section ─── */
export default function HomeCalculatorSection({ data, wrapperClass }: { data?: HomeCalculatorWidget; wrapperClass?: string }) {
  const tabs = data?.calculators?.map(c => c.tabLabel) ?? Object.keys(CALCULATOR_COMPONENTS);
  const [activeTab, setActiveTab] = useState(tabs[0] ?? "Hospital ROI calculator");

  return (
    <section className={cn("py-12 sm:py-16 overflow-hidden", wrapperClass)}>
      <div className="global-container mx-auto max-w-6xl space-y-6">
        {tabs.length > 1 && (
          <div className="flex justify-center">
            <div className="bg-[#1A1614]/5 p-1.5 rounded-2xl border border-[#B86851]/10 inline-flex relative shadow-inner">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 px-5 py-2.5 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === tab ? "bg-[#B86851] text-white shadow-md" : "text-[#48403D] hover:text-[#1A1614]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="w-full max-w-220 mx-auto">
            {activeTab === (tabs[1] ?? "Healthcare SaaS company ROI calculator")
              ? <SaasROICalculatorInner />
              : <HospitalROICalculatorInner />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
