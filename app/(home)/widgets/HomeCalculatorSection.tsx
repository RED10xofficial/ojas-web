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
    <div className="bg-[#F9F6F3] text-[#1A1614] rounded-2xl p-5 sm:p-6 border border-[#B86851]/15 shadow-lg relative overflow-hidden font-sans w-full">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="mb-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B86851]/10 text-[#B86851] border border-[#B86851]/20 rounded-full text-11 font-bold tracking-widest uppercase mb-3 shadow-sm">
          <Sparkles size={11} className="animate-pulse text-[#B86851]" />
          Interactive B2B Value Engine
        </div>
        <h3 className="text-xl sm:text-40 font-display font-medium text-[#1A1614] tracking-tight leading-tight">Hospital ROI calculator</h3>
        <p className="text-[#48403D] text-base mt-1.5 font-medium leading-relaxed">Simulate real-time operational efficiency, capacity unlock, and direct revenue recovery scaled to your patient volume.</p>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-[#B86851]/10 space-y-5">
          <h4 className="text-14 font-bold text-[#48403D] uppercase tracking-wider border-b border-[#B86851]/10 pb-2">Operational Inputs</h4>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-16 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Users size={14} className="text-[#B86851]" />Daily Patients</label>
                <input type="number" min={50} max={2000} value={dailyVisits || ""} onChange={e => setDailyVisits(Math.max(0, Math.min(2000, parseInt(e.target.value) || 0)))} onBlur={() => { if (!dailyVisits || dailyVisits < 50) setDailyVisits(50); }} className="w-16 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-xs font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" min={50} max={2000} step={10} value={dailyVisits} onChange={e => setDailyVisits(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-14 text-[#6B625F] font-mono"><span>50</span><span>2,000 visits / day</span></div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center">
                <label className="text-16 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Clock size={14} className="text-[#B86851]" />Time Saved / Pt</label>
                <div className="flex items-center gap-1">
                  <input type="number" min={1} max={15} value={timeSaved || ""} onChange={e => setTimeSaved(Math.max(0, Math.min(15, parseInt(e.target.value) || 0)))} onBlur={() => { if (!timeSaved || timeSaved < 1) setTimeSaved(1); }} className="w-12 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-xs font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
                  <span className="text-14 text-[#48403D] font-bold">mins</span>
                </div>
              </div>
              <input type="range" min={1} max={15} value={timeSaved} onChange={e => setTimeSaved(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-14 text-[#6B625F] font-mono"><span>1 min</span><span>15 mins</span></div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center">
                <label className="text-16 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Activity size={14} className="text-[#B86851]" />Working Days / Yr</label>
                <input type="number" min={100} max={365} value={workDays || ""} onChange={e => setWorkDays(Math.max(0, Math.min(365, parseInt(e.target.value) || 0)))} onBlur={() => { if (!workDays || workDays < 100) setWorkDays(100); }} className="w-16 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-xs font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <p className="text-14 text-[#6B625F]">Days hospital is operational (100 - 365).</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#B86851] text-white rounded-2xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[140px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <span className="text-14 font-black uppercase tracking-widest text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/15">Top-line Impact</span>
                <h4 className="text-14 font-bold uppercase tracking-wider text-white/80 mt-2">PROJECTED FINANCIAL GAIN</h4>
              </div>
              <Activity size={18} className="text-white/40 animate-pulse" />
            </div>
            <div className="my-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-black tracking-tight text-white flex items-baseline gap-1">
                <AnimatedNumber value={projectedGain} formatter={v => formatIndianCurrency(v, true)} />
              </div>
              <p className="text-14 text-white/85 font-mono mt-0.5 font-bold">or <AnimatedNumber value={projectedGain} formatter={v => formatIndianCurrency(v, false)} /> per year</p>
            </div>
            <div className="text-14 text-white/70 border-t border-white/10 pt-1.5 flex justify-between items-center">
              <span>Formula: Extra Capacity × Avg Revenue per Patient</span>
              <span className="font-bold text-white/80">100% margin recovery</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="bg-white border border-[#B86851]/10 p-3 rounded-xl flex flex-col justify-between hover:shadow-sm transition-all shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-14 font-bold text-[#48403D] uppercase tracking-wider mb-1"><Clock size={10} className="text-[#B86851]" />Time Saved</div>
                <div className="text-16 sm:text-24 font-mono font-black text-[#1A1614] leading-tight"><AnimatedNumber value={savedHoursYear} /> <span className="text-14 text-[#6B625F] font-normal">hrs</span></div>
              </div>
              <p className="text-14 text-[#6B625F] mt-1 font-mono leading-tight">Hours saved / yr</p>
            </div>
            <div className="bg-white border border-[#B86851]/10 p-3 rounded-xl flex flex-col justify-between hover:shadow-sm transition-all shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-14 font-bold text-[#48403D] uppercase tracking-wider mb-1"><Activity size={10} className="text-[#B86851]" />Extra Cap.</div>
                <div className="text-16 sm:text-24 font-mono font-black text-[#B86851] leading-tight">+<AnimatedNumber value={extraCapacityYear} /> <span className="text-14 text-[#6B625F] font-normal">pts</span></div>
              </div>
              <p className="text-14 text-[#6B625F] mt-1 font-mono leading-tight">Capacity unlocked</p>
            </div>
            <div className="bg-white border border-[#B86851]/10 p-3 rounded-xl flex flex-col justify-between hover:shadow-sm transition-all shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-14 font-bold text-[#48403D] uppercase tracking-wider mb-1"><TrendingUp size={10} className="text-[#B86851]" />Avg Patient Rev</div>
                <div className="text-16 sm:text-24 font-mono font-black text-[#1A1614] leading-tight"><AnimatedNumber value={avgRevenuePerPt} formatter={v => formatIndianCurrency(v, false)} /></div>
              </div>
              <p className="text-14 text-[#6B625F] mt-1 font-mono leading-tight">Revenue / visit</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#B86851]/10">
            <div className="flex justify-between items-center mb-3">
              <h5 className="text-14 font-extrabold text-[#48403D] uppercase tracking-widest flex items-center gap-1.5"><Activity size={11} className="text-[#B86851]" />Resource Capacity Unlock</h5>
              <span className="text-14 text-[#B86851] font-bold px-2 py-0.5 bg-[#B86851]/10 rounded-full">+{capacityPctIncrease.toFixed(0)}% Uplift</span>
            </div>
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-14 font-bold text-[#48403D]"><span>Baseline Patient Volume / Year</span><span className="font-mono text-[#1A1614]">{totalPatientsBaseline.toLocaleString()}</span></div>
                <div className="w-full bg-[#F9F6F3] h-5 rounded-md overflow-hidden relative flex items-center px-2 border border-[#B86851]/10">
                  <div className="absolute inset-y-0 left-0 bg-[#6B625F]/20 transition-all duration-300" style={{ width: "100%" }} />
                  <span className="relative text-8 text-[#48403D] font-extrabold font-mono uppercase tracking-wider z-10">Current Baseline (100%)</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-14 font-bold text-[#48403D]">
                  <span className="flex items-center gap-1">Expanded Capacity<Sparkles size={10} className="text-[#B86851] animate-pulse" /></span>
                  <span className="font-mono text-[#B86851] font-black">{(totalPatientsBaseline + extraCapacityYear).toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#F9F6F3] h-5 rounded-md overflow-hidden relative flex items-center px-2 border border-[#B86851]/10">
                  <div className="absolute inset-y-0 left-0 bg-[#B86851]/20 transition-all duration-500" style={{ width: `${Math.min(100, 100 / (1 + capacityPctIncrease / 100))}%` }} />
                  <div className="absolute inset-y-0 bg-[#B86851] transition-all duration-500 animate-pulse" style={{ left: `${Math.min(100, 100 / (1 + capacityPctIncrease / 100))}%`, width: `${Math.min(100, 100 - 100 / (1 + capacityPctIncrease / 100))}%` }} />
                  <span className="relative text-8 text-white font-extrabold font-mono uppercase tracking-wider z-10 flex items-center gap-1 bg-[#B86851] px-1 rounded">Expanded (+{capacityPctIncrease.toFixed(0)}%)</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-14 text-[#6B625F] font-mono mt-3 border-t border-[#B86851]/10 pt-2 leading-tight">
              <span>* Reclaimed admin time converts to clinical throughput.</span>
              <span className="text-right">Baseline: 20m/pt</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-[#B86851]/10 text-center flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-14 text-[#6B625F] font-medium">OJAS Healthcare Platform B2B Value Realization Model. All rights reserved.</p>
        <p className="text-14 text-[#B86851] font-bold tracking-wider uppercase flex items-center gap-1"><ShieldCheck size={11} className="text-[#B86851]" />Verified Secure Integration Standard</p>
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
    <div className="bg-[#F9F6F3] text-[#1A1614] rounded-2xl p-5 sm:p-6 border border-[#B86851]/15 shadow-lg relative overflow-hidden font-sans w-full">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B86851]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="mb-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B86851]/10 text-[#B86851] border border-[#B86851]/20 rounded-full text-11 font-bold tracking-widest uppercase mb-3 shadow-sm"><Zap size={11} className="animate-pulse text-[#B86851]" />Clinical Productivity & ROI Engine</div>
        <h3 className="text-xl sm:text-2xl font-display font-black text-[#1A1614] tracking-tight uppercase leading-tight">Healthcare SaaS company ROI calculator</h3>
        <p className="text-[#48403D] text-xs mt-1.5 font-medium leading-relaxed">Quantify clinical time reclaimed, practice efficiency, and direct financial recovery by optimizing administrative burdens.</p>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-[#B86851]/10 space-y-4">
          <h4 className="text-14 font-bold text-[#48403D] uppercase tracking-wider border-b border-[#B86851]/10 pb-2">Practice Demographics & Inputs</h4>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-16 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Users size={14} className="text-[#B86851]" />Number of Doctors</label>
                <input type="number" min={1} max={100} value={numDoctors || ""} onChange={e => setNumDoctors(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))} onBlur={() => { if (!numDoctors || numDoctors < 1) setNumDoctors(1); }} className="w-16 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-xs font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" min={1} max={100} value={numDoctors} onChange={e => setNumDoctors(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-14 text-[#6B625F] font-mono"><span>1 Doctor</span><span>100 Doctors</span></div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center">
                <label className="text-16 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Clock size={14} className="text-[#B86851]" />Time Saved / Patient</label>
                <div className="flex items-center gap-1">
                  <input type="number" min={1} max={15} value={timeSaved || ""} onChange={e => setTimeSaved(Math.max(0, Math.min(15, parseInt(e.target.value) || 0)))} onBlur={() => { if (!timeSaved || timeSaved < 1) setTimeSaved(1); }} className="w-12 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-xs font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
                  <span className="text-14 text-[#48403D] font-bold">mins</span>
                </div>
              </div>
              <input type="range" min={1} max={15} value={timeSaved} onChange={e => setTimeSaved(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-14 text-[#6B625F] font-mono"><span>1 min</span><span>15 mins</span></div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center">
                <label className="text-16 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Activity size={14} className="text-[#B86851]" />Daily Patients</label>
                <input type="number" min={5} max={50} value={patientsPerDay || ""} onChange={e => setPatientsPerDay(Math.max(0, Math.min(50, parseInt(e.target.value) || 0)))} onBlur={() => { if (!patientsPerDay || patientsPerDay < 5) setPatientsPerDay(5); }} className="w-16 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-xs font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <input type="range" min={5} max={50} value={patientsPerDay} onChange={e => setPatientsPerDay(parseInt(e.target.value))} className="w-full accent-[#B86851] cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none" />
              <div className="flex justify-between text-14 text-[#6B625F] font-mono"><span>5 patients</span><span>50 patients</span></div>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-[#B86851]/10">
              <div className="flex justify-between items-center">
                <label className="text-16 font-bold text-[#48403D] uppercase tracking-wider flex items-center gap-1.5"><Activity size={14} className="text-[#B86851]" />Working Days / Yr</label>
                <input type="number" min={100} max={365} value={workDays || ""} onChange={e => setWorkDays(Math.max(0, Math.min(365, parseInt(e.target.value) || 0)))} onBlur={() => { if (!workDays || workDays < 100) setWorkDays(100); }} className="w-16 bg-white border border-[#B86851]/20 focus:border-[#B86851] focus:ring-2 focus:ring-[#B86851]/20 rounded-md py-0.5 px-1.5 text-right text-xs font-mono font-bold text-[#1A1614] focus:outline-none shadow-sm" />
              </div>
              <p className="text-14 text-[#6B625F]">Days doctor is operational per year (100 - 365).</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#B86851] text-white rounded-2xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[140px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <div><span className="text-14 font-black uppercase tracking-widest text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">OJAS Value Impact</span><h4 className="text-14 font-bold uppercase tracking-wider text-white/80 mt-2.5">RECLAIMED TIME FINANCIAL VALUE</h4></div>
              <TrendingUp size={18} className="text-white/40 animate-pulse" />
            </div>
            <div className="my-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-black tracking-tight text-white flex items-baseline gap-1"><AnimatedNumber value={financialValueReclaimed} formatter={v => formatIndianCurrency(v, true)} /></div>
              <p className="text-14 text-white/85 font-mono mt-0.5 font-bold">or <AnimatedNumber value={financialValueReclaimed} formatter={v => formatIndianCurrency(v, false)} /> Saved per Year</p>
            </div>
            <div className="text-14 text-white/70 border-t border-white/10 pt-1.5 flex justify-between items-center"><span>Formula: Total Practice Hours Saved × Doctor Hourly Value</span><span className="font-bold text-white/80">Productivity Multiplier</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#B86851]/10 p-4 rounded-xl flex flex-col justify-between hover:shadow-sm transition-all shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-14 font-bold text-[#48403D] uppercase tracking-wider mb-2"><Clock size={12} className="text-[#B86851]" />Total Practice Hours Reclaimed</div>
                <div className="text-base font-mono font-black text-[#1A1614] leading-tight flex items-baseline gap-1"><AnimatedNumber value={totalPracticeHoursReclaimed} /><span className="text-14 text-[#6B625F] font-semibold uppercase tracking-wider">Hrs Saved / Yr</span></div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#B86851]/10">
                <span className="text-8 font-bold text-[#6B625F] uppercase tracking-wider block mb-0.5">Equivalent Full-Time Days Saved</span>
                <p className="text-16 sm:text-24 font-mono font-black text-[#B86851]">+<AnimatedNumber value={equivalentFullTimeDaysSaved} /> <span className="text-14 font-bold text-[#6B625F]">Days Saved</span></p>
              </div>
            </div>
            <div className="bg-white border border-[#B86851]/10 p-4 rounded-xl flex flex-col justify-between hover:shadow-sm transition-all shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-14 font-bold text-[#48403D] uppercase tracking-wider mb-2"><Activity size={12} className="text-[#B86851]" />Clinician Productivity Breakdown</div>
                <div className="space-y-1.5 text-14 font-medium text-[#48403D]">
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>Hourly Doctor Value:</span><span className="font-mono text-[#1A1614] font-bold">{formatIndianCurrency(Math.round(doctorHourlyValue), false)}/hr</span></div>
                  <div className="flex justify-between border-b border-slate-100 pb-1"><span>Reclaimed Hours/Doc:</span><span className="font-mono text-[#1A1614] font-bold"><AnimatedNumber value={Math.round(annualHoursReclaimedPerDoctor)} /> hrs</span></div>
                  <div className="flex justify-between"><span>Practice Scale:</span><span className="font-mono text-[#B86851] font-bold">{numDoctors} {numDoctors === 1 ? "Doc" : "Docs"}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#B86851]/10 flex items-center gap-3">
            <div className="p-1.5 bg-[#B86851]/10 rounded-lg text-[#B86851] shrink-0"><ShieldCheck size={16} /></div>
            <div>
              <p className="text-14 font-bold text-[#48403D] uppercase tracking-wider">Value Optimization Summary</p>
              <p className="text-14 text-[#6B625F] mt-0.5 leading-snug">By reclaiming {timeSaved} minutes per patient, each doctor gains <strong className="text-[#48403D] font-bold">{Math.round(annualHoursReclaimedPerDoctor)} hours</strong> of productive focus or crucial rest per year.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-[#B86851]/10 text-center flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-14 text-[#6B625F] font-medium">OJAS Healthcare Platform B2B Value Realization Model. All rights reserved.</p>
        <p className="text-14 text-[#B86851] font-bold tracking-wider uppercase flex items-center gap-1"><ShieldCheck size={11} className="text-[#B86851]" />Verified Secure Integration Standard</p>
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
    <section className={cn("py-16 sm:py-24 overflow-hidden", wrapperClass)}>
      <div className="global-container mx-auto max-w-4xl space-y-8">
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
