"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import type { PricingHeroSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

type BillingCycle = "monthly" | "annually";

/* Fallback plans, used only when the CMS entry has no plans. */
const getDefaultPlans = (billingCycle: BillingCycle) => {
  const prices = {
    go: billingCycle === "monthly" ? 299 : Math.round(299 * 0.8),
    pro: billingCycle === "monthly" ? 1499 : Math.round(1499 * 0.8),
  };

  return [
    {
      name: "Free",
      tag: "Basic Testing",
      price: "₹0",
      priceSub: "INR / Free forever",
      features: [
        "Access to our standard AI engine for quick, daily assistance.",
        "Get instant, clear answers to common everyday questions.",
        "Analyze short files and images to extract summaries.",
        "Standard response speeds depending on system availability.",
        "Remembers recent chat history to easily continue conversations.",
      ],
      btnText: "Your current plan",
      btnUrl: undefined as string | undefined,
      btnDisabled: true,
      footer: "Risk-free entry point for casual, daily assistance.",
      dark: false,
      badge: null as string | null,
    },
    {
      name: "Go",
      tag: "For Casual Creators",
      price: `₹${prices.go}`,
      priceSub: `INR / month${billingCycle === "annually" ? " (billed annually, 20% off)" : " (inclusive of GST)"}`,
      features: [
        "10x more message volume compared to the Free tier.",
        "Extended chat memory — the AI won't forget context in longer chats.",
        "Upload and review larger documents, text files, and PDFs.",
        "Faster response times, even during high-traffic peak windows.",
        "Create custom instructions to change the AI's tone and writing style.",
      ],
      btnText: "Upgrade to Go",
      btnUrl: undefined as string | undefined,
      btnDisabled: false,
      footer: "The perfect volume upgrade for students and casual creators without the big price jump.",
      dark: false,
      badge: null as string | null,
    },
    {
      name: "Pro",
      tag: "For Power Users",
      price: `₹${prices.pro.toLocaleString()}`,
      priceSub: `INR / month${billingCycle === "annually" ? " (billed annually, 20% off)" : " (inclusive of GST)"}`,
      features: [
        "Priority Lane Speed: Blazing fast response generation skipping the queue entirely.",
        "Unlock Deep Reasoning Modes for complex math, coding, and deep logic workflows.",
        "Massive context capacity: Analyze entire codebases, long documents, or datasets.",
        "Build and deploy custom Assistants tailored specifically for your workflows.",
        "Early access to next-generation tools and experimental beta models.",
      ],
      btnText: "Upgrade to Pro",
      btnUrl: undefined as string | undefined,
      btnDisabled: false,
      footer: "High-concurrency lane, deep reasoning, and maximum output for power users and professionals.",
      dark: true,
      badge: "Popular" as string | null,
    },
    {
      name: "Enterprise",
      tag: "For Clinics & Networks",
      price: "Custom",
      priceSub: "INR / Contact us for pricing",
      features: [
        "Dedicated active-active server configurations to guarantee zero downtime under heavy team load.",
        "Enterprise-grade privacy: Strict zero-data retention policies — your team's data is never used for training.",
        "Centralized Admin Console to easily manage licenses, add members, and check usage analytics.",
        "Shared Workspace: Collaborate easily by sharing prompts and custom assistants securely across the company.",
        "Guaranteed SLA response times alongside an assigned Solutions Engineer.",
      ],
      btnText: "Upgrade to Enterprise",
      btnUrl: undefined as string | undefined,
      btnDisabled: false,
      footer: "Secure workspace collaboration, data privacy compliance, and dedicated infrastructure for organizations.",
      dark: false,
      badge: "Recommended" as string | null,
    },
  ];
};

export default function PricingHeroSection({
  data,
  wrapperClass,
}: {
  data?: PricingHeroSection;
  wrapperClass?: string;
}) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const badgeText = data?.badgeText ?? "Pricing";
  const title = data?.title ?? "Unlock Professional Bio-Intelligence";
  const description =
    data?.description ??
    "Select the infrastructure tier optimized for your clinical operation. Save 20% on annual billing.";
  const showBillingToggle = data?.showBillingToggle ?? true;
  const monthlyLabel = data?.monthlyLabel ?? "Monthly";
  const annualLabel = data?.annualLabel ?? "Annually";
  const annualSavingsBadge = data?.annualSavingsBadge ?? "Save 20%";

  /* CMS tiers store both price variants; annual falls back to monthly when unset. */
  const plans = data?.plans?.length
    ? data.plans.map((plan) => ({
        name: plan.name,
        tag: plan.tag,
        price:
          billingCycle === "annually"
            ? plan.annualPrice || plan.monthlyPrice
            : plan.monthlyPrice,
        priceSub:
          billingCycle === "annually"
            ? plan.annualPriceSubtitle || plan.monthlyPriceSubtitle
            : plan.monthlyPriceSubtitle,
        features: plan.features?.map((f) => f.label) ?? [],
        btnText: plan.buttonText,
        btnUrl: plan.buttonUrl,
        btnDisabled: plan.buttonDisabled ?? false,
        footer: plan.footer,
        dark: plan.dark ?? false,
        badge: plan.badge ?? null,
      }))
    : getDefaultPlans(billingCycle);

  return (
    <section className={cn("pb-16 sm:pb-24 pt-35", wrapperClass)}>
      <div className="global-container mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-6 inline-block">
            {badgeText}
          </span>
          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">
            {title}
          </h1>
          <p className="text-16 leading-relaxed text-text-secondary font-medium max-w-2xl mx-auto">
            {description}
          </p>

          {/* Billing toggle */}
          {showBillingToggle && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${billingCycle === "monthly" ? "text-brand-blue" : "text-text-secondary opacity-60"}`}>
                {monthlyLabel}
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
                className="w-14 h-7 rounded-full bg-white/80 relative p-1 transition-all focus:outline-none cursor-pointer"
              >
                <motion.div
                  layout
                  className="w-5 h-5 rounded-full bg-brand-blue shadow"
                  animate={{ x: billingCycle === "monthly" ? 0 : 28 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${billingCycle === "annually" ? "text-brand-blue" : "text-text-secondary opacity-60"}`}>
                {annualLabel}
                {annualSavingsBadge && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-600 text-[9px] font-bold uppercase tracking-wider rounded-md">
                    {annualSavingsBadge}
                  </span>
                )}
              </span>
            </div>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`p-6 rounded-[2rem] flex flex-col relative transition-all justify-between ${
                plan.dark
                  ? "bg-brand-dark text-white shadow-2xl shadow-brand-dark/30 overflow-hidden ring-2 ring-brand-blue/20 hover:scale-[1.01]"
                  : "bg-white border border-brand-subtle hover:border-brand-blue/30 hover:shadow-xl"
              }`}
            >
              {plan.badge && (
                <div className={`absolute top-0 right-0 px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-bl-xl z-10 ${
                  plan.dark ? "bg-brand-blue text-white" : "bg-slate-100 text-text-accent border-l border-b border-brand-subtle"
                }`}>
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className={`text-lg sm:text-28 font-display font-medium mb-1 ${plan.dark ? "text-white" : "text-text-primary"}`}>
                  {plan.name}
                </h3>
                <p className={`text-11 uppercase font-bold tracking-widest mb-4 ${plan.dark ? "text-brand-blue" : "text-text-accent"}`}>
                  {plan.tag}
                </p>
                <div className="flex flex-col mb-6">
                  <span className={`text-32 font-display font-medium ${plan.dark ? "text-white" : "text-text-primary"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-11 font-semibold font-mono uppercase tracking-wider mt-1 ${plan.dark ? "text-slate-300" : "text-text-secondary/80"}`}>
                    {plan.priceSub}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm leading-relaxed font-medium ${plan.dark ? "text-slate-300" : "text-text-secondary/80"}`}>
                      <CheckCircle2 size={14} className={`${plan.dark ? "text-brand-blue" : "text-emerald-500"} mt-0.5 shrink-0`} />
                      <span className={plan.dark ? "text-white/90" : ""}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {plan.btnUrl && !plan.btnDisabled ? (
                  <a
                    href={plan.btnUrl}
                    className={`block text-center w-full py-3 rounded-xl text-sm font-bold transition-all font-display mb-4 ${
                      plan.dark
                        ? "bg-brand-blue text-white hover:bg-brand-hover shadow-lg cursor-pointer"
                        : "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white cursor-pointer"
                    }`}
                  >
                    {plan.btnText}
                  </a>
                ) : (
                  <button
                    disabled={plan.btnDisabled}
                    className={`w-full py-3 rounded-xl text-sm font-bold transition-all font-display mb-4 ${
                      plan.btnDisabled
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : plan.dark
                          ? "bg-brand-blue text-white hover:bg-brand-hover shadow-lg cursor-pointer"
                          : "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white cursor-pointer"
                    }`}
                  >
                    {plan.btnText}
                  </button>
                )}
                <p className={`text-xs font-medium text-center italic ${plan.dark ? "text-slate-300/70" : "text-text-secondary/60"}`}>
                  {plan.footer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
