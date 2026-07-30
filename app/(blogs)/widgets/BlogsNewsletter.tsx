"use client";

import { useState } from "react";
import type { BlogsNewsletterSection } from "@/app/lib/types";

interface Props {
  section: BlogsNewsletterSection;
}

const BlogsNewsletter = ({ section }: Props) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="pb-16 sm:pb-24">
      <div className="global-container mx-auto">
        <div className="bg-brand-dark rounded-[2.5rem] p-8 md:p-14 border border-white/5 relative overflow-hidden shadow-2xl text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(26,111,196,0.15),transparent_60%)] pointer-events-none" />
          <div className="max-w-xl space-y-6 relative">
            {section.badgeText && (
              <span className="px-3 py-1.5 bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-lg font-mono inline-block">
                {section.badgeText}
              </span>
            )}
            <h3 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-white uppercase">
              {section.title}
            </h3>
            {section.description && (
              <p className="text-16 leading-relaxed text-slate-400">{section.description}</p>
            )}

            {submitted ? (
              <p className="text-16 leading-relaxed text-brand-blue font-semibold pt-2">
                {section.successMessage ||
                  "Subscription verified. Welcome to our clinical gazette list!"}
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  setEmail("");
                }}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={section.inputPlaceholder || "Enter medical institution email..."}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand-blue transition-all"
                />
                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-hover text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-blue/30 font-display shrink-0 cursor-pointer"
                >
                  {section.buttonText || "Join Gazette"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsNewsletter;
