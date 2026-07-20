import { CheckCircle2 } from "lucide-react";
import type { PricingSection as PricingSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultPlans = [
  {
    name: "Free",
    tag: "BASIC TESTING",
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
    btnDisabled: true,
    footer: "Risk-free entry point for casual, daily assistance.",
  },
  {
    name: "Go",
    tag: "FOR CASUAL CREATORS",
    price: "₹299",
    priceSub: "INR / month (inclusive of GST)",
    features: [
      "10x more message volume compared to the Free tier.",
      "Extended chat memory — the AI won't forget context in longer chats.",
      "Upload and review larger documents, text files, and PDFs.",
      "Faster response times, even during high-traffic peak windows.",
      "Create custom instructions to change the AI's tone and writing style.",
    ],
    btnText: "Upgrade to Go",
    footer: "The perfect volume upgrade for students and casual creators without the big price jump.",
  },
  {
    name: "Pro",
    tag: "FOR POWER USERS",
    price: "₹1,499",
    priceSub: "INR / month (inclusive of GST)",
    features: [
      "Priority Lane Speed: Blazing fast response generation skipping the queue entirely.",
      "Unlock Deep Reasoning Modes for complex math, coding, and deep logic workflows.",
      "Massive context capacity: Analyze entire codebases, long documents, or datasets.",
      "Build and deploy custom Assistants tailored specifically for your workflows.",
      "Early access to next-generation tools and experimental beta models.",
    ],
    btnText: "Upgrade to Pro",
    footer: "High-concurrency lane, deep reasoning, and maximum output for power users and professionals.",
    dark: true,
    badge: "POPULAR",
  },
  {
    name: "Enterprise",
    tag: "FOR CLINICS & NETWORKS",
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
    footer: "Secure workspace collaboration, data privacy compliance, and dedicated infrastructure for organizations.",
    badge: "RECOMMENDED",
  },
];

export default function PricingSection({ data, wrapperClass }: { data?: PricingSectionData; wrapperClass?: string }) {
  const sectionTitle = data?.title ?? "Unlock Professional Bio-Intelligence";
  const sectionSubtitle = data?.subtitle ?? "Select the infrastructure tier optimized for your clinical operation";

  const plans = data?.plans?.map((p) => ({
    name: p.name,
    tag: p.tag ?? "",
    price: p.price,
    priceSub: p.priceSubtitle ?? "",
    features: p.features?.map((f) => f.label) ?? [],
    btnText: p.buttonText ?? "",
    btnDisabled: p.buttonDisabled ?? false,
    footer: p.footer ?? "",
    dark: p.dark ?? false,
    badge: p.badge,
  })) ?? defaultPlans;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/10", wrapperClass)} id="pricing">
      <div className="global-container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">{sectionTitle}</h2>
          <p className="text-14 sm:text-base text-text-secondary opacity-70 font-medium">{sectionSubtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-2xl flex flex-col relative transition-all justify-between ${
                plan.dark
                  ? "bg-brand-dark text-white shadow-2xl shadow-brand-dark/30 overflow-hidden ring-2 ring-brand-blue/20 hover:scale-[1.01]"
                  : "bg-white border border-brand-subtle hover:border-brand-blue/30 hover:shadow-xl"
              }`}
            >
              {plan.badge && (
                <div className={`absolute top-0 right-0 px-4 py-2 text-10 font-bold uppercase tracking-widest rounded-bl-xl ${
                  plan.dark ? "bg-brand-blue text-white" : "bg-slate-100 text-text-accent border-l border-b border-brand-subtle"
                }`}>
                  {plan.badge}
                </div>
              )}
              <div>
                <h3 className={`text-xl font-display font-black mb-1 ${plan.dark ? "text-white" : "text-text-primary"}`}>{plan.name}</h3>
                <p className={`text-11 uppercase font-bold tracking-widest mb-4 ${plan.dark ? "text-brand-blue" : "text-text-accent"}`}>{plan.tag}</p>
                <div className="flex flex-col mb-6">
                  <span className={`${plan.name === "Pro" ? "text-4xl" : "text-3xl"} font-display font-black ${plan.dark ? "text-white" : "text-text-primary"}`}>{plan.price}</span>
                  <span className={`text-11 font-semibold font-mono uppercase tracking-wider mt-1 ${plan.dark ? "text-slate-300" : "text-text-secondary/80"}`}>{plan.priceSub}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((item) => (
                    <li key={item} className={`flex items-start gap-2.5 text-xs leading-relaxed font-medium ${plan.dark ? "text-slate-300" : "text-text-secondary/70"}`}>
                      <CheckCircle2 size={13} className={`${plan.dark ? "text-brand-blue" : "text-success"} mt-0.5 shrink-0`} />
                      <span className={plan.dark ? "text-white/90" : ""}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  disabled={plan.btnDisabled}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all font-display mb-4 ${
                    plan.btnDisabled
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : plan.dark
                        ? "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg cursor-pointer"
                        : "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white cursor-pointer"
                  }`}
                >
                  {plan.btnText}
                </button>
                <p className={`text-11 font-medium text-center italic ${plan.dark ? "text-slate-300/70" : "text-text-secondary/60"}`}>{plan.footer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
