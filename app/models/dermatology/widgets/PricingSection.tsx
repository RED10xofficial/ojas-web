import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { PricingSection as PricingSectionType } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

export default function PricingSection({ data, wrapperClass }: { data?: PricingSectionType; wrapperClass?: string }) {
  const sectionSubtitle = data?.subtitle ?? "Flexible Clinical Licensing";
  const sectionTitle = data?.title ?? "Pricing Models";

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page global-container mx-auto", wrapperClass)} id="pricing">
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">{sectionSubtitle}</p>
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">{sectionTitle}</h2>
        <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
        {/* Free */}
        <div className="p-6 rounded-2xl bg-white border border-brand-subtle flex flex-col hover:border-brand-blue/20 hover:shadow-md hover:shadow-brand-blue/5 transition-all relative justify-between">
          <div>
            <h3 className="text-xl font-display font-black mb-1 text-text-primary">Free</h3>
            <p className="text-text-accent text-11 uppercase font-semibold tracking-widest mb-4">BASIC TESTING</p>
            <div className="flex flex-col mb-6">
              <span className="text-3xl font-display font-black text-text-primary">&#8377;0</span>
              <span className="text-11 text-text-secondary/80 font-semibold font-mono uppercase tracking-wider mt-1">INR / Free forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Access to our standard AI engine for quick, daily assistance.",
                "Get instant, clear answers to common everyday questions.",
                "Analyze short files and images to extract summaries.",
                "Standard response speeds depending on system availability.",
                "Remembers recent chat history to easily continue conversations.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-text-secondary/70 leading-relaxed font-medium">
                  <CheckCircle2 size={13} className="text-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button disabled className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 text-sm font-bold transition-all font-display mb-4 cursor-not-allowed">Your current plan</button>
            <p className="text-11 text-text-secondary/60 font-medium text-center italic">Risk-free entry point for casual, daily assistance.</p>
          </div>
        </div>

        {/* Go */}
        <div className="p-6 rounded-2xl bg-white border border-brand-subtle flex flex-col hover:border-brand-blue/30 hover:shadow-md hover:shadow-brand-blue/5 transition-all relative justify-between">
          <div>
            <h3 className="text-xl font-display font-black mb-1 text-text-primary">Go</h3>
            <p className="text-text-accent text-11 uppercase font-semibold tracking-widest mb-4">FOR CASUAL CREATORS</p>
            <div className="flex flex-col mb-6">
              <span className="text-3xl font-display font-black text-text-primary">&#8377;299</span>
              <span className="text-11 text-text-secondary/80 font-semibold font-mono uppercase tracking-wider mt-1">INR / month (inclusive of GST)</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "10x more message volume compared to the Free tier.",
                "Extended chat memory — the AI won&apos;t forget context in longer chats.",
                "Upload and review larger documents, text files, and PDFs.",
                "Faster response times, even during high-traffic peak windows.",
                "Create custom instructions to change the AI&apos;s tone and writing style.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-text-secondary/70 leading-relaxed font-medium">
                  <CheckCircle2 size={13} className="text-brand-blue mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href="/sign-up" className="block w-full py-3 rounded-xl border border-brand-blue text-brand-blue text-sm font-bold hover:bg-brand-blue hover:text-white transition-all font-display mb-4 cursor-pointer text-center">Upgrade to Go</Link>
            <p className="text-11 text-text-secondary/60 font-medium text-center italic">The perfect volume upgrade for students and casual creators without the big price jump.</p>
          </div>
        </div>

        {/* Pro */}
        <div className="p-6 rounded-2xl bg-brand-dark text-white relative flex flex-col shadow-2xl shadow-brand-dark/30 overflow-hidden ring-2 ring-brand-blue/20 hover:scale-[1.01] transition-all justify-between">
          <div className="absolute top-0 right-0 px-4 py-2 bg-brand-blue text-white text-10 font-bold uppercase tracking-widest rounded-bl-xl">POPULAR</div>
          <div>
            <h3 className="text-xl font-display font-black mb-1 text-white">Pro</h3>
            <p className="text-brand-blue text-11 uppercase font-semibold tracking-widest mb-4">FOR POWER USERS</p>
            <div className="flex flex-col mb-6">
              <span className="text-4xl font-display font-black text-white">&#8377;1,499</span>
              <span className="text-11 text-slate-300 font-semibold font-mono uppercase tracking-wider mt-1">INR / month (inclusive of GST)</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Priority Lane Speed: Blazing fast response generation skipping the queue entirely.",
                "Unlock Deep Reasoning Modes for complex math, coding, and deep logic workflows.",
                "Massive context capacity: Analyze entire codebases, long documents, or datasets.",
                "Build and deploy custom Assistants tailored specifically for your workflows.",
                "Early access to next-generation tools and experimental beta models.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed font-medium">
                  <CheckCircle2 size={13} className="text-brand-blue mt-0.5 shrink-0" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href="/sign-up" className="block w-full py-3 rounded-xl bg-brand-blue text-white text-sm font-bold hover:bg-brand-blue/90 transition-all shadow-lg font-display mb-4 cursor-pointer text-center">Upgrade to Pro</Link>
            <p className="text-11 text-slate-300/70 font-medium text-center italic">High-concurrency lane, deep reasoning, and maximum output for power users and professionals.</p>
          </div>
        </div>

        {/* Enterprise */}
        <div className="p-6 rounded-2xl bg-white border border-brand-subtle flex flex-col hover:border-brand-blue/30 hover:shadow-md hover:shadow-brand-blue/5 transition-all relative justify-between">
          <div className="absolute top-0 right-0 px-4 py-2 bg-slate-100 text-text-accent border-l border-b border-brand-subtle text-10 font-bold uppercase tracking-widest rounded-bl-xl">RECOMMENDED</div>
          <div>
            <h3 className="text-xl font-display font-black mb-1 text-text-primary">Enterprise</h3>
            <p className="text-text-accent text-11 uppercase font-semibold tracking-widest mb-4">FOR CLINICS &amp; NETWORKS</p>
            <div className="flex flex-col mb-6">
              <span className="text-3xl font-display font-black text-text-primary">Custom</span>
              <span className="text-11 text-text-secondary/80 font-semibold font-mono uppercase tracking-wider mt-1">INR / Contact us for pricing</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Dedicated active-active server configurations to guarantee zero downtime under heavy team load.",
                "Enterprise-grade privacy: Strict zero-data retention policies — your team&apos;s data is never used for training.",
                "Centralized Admin Console to easily manage licenses, add members, and check usage analytics.",
                "Shared Workspace: Collaborate easily by sharing prompts and custom assistants securely across the company.",
                "Guaranteed SLA response times alongside an assigned Solutions Engineer.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-text-secondary/80 leading-relaxed font-medium">
                  <CheckCircle2 size={13} className="text-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link href="/sign-up" className="block w-full py-3 rounded-xl border border-brand-subtle text-text-accent text-sm font-bold hover:border-text-secondary transition-all font-display mb-4 cursor-pointer text-center">Upgrade to Enterprise</Link>
            <p className="text-11 text-text-secondary/60 font-medium text-center italic">Secure workspace collaboration, data privacy compliance, and dedicated infrastructure for organizations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
