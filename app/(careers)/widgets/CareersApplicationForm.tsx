"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import Toast from "@/app/components/Toast";
import type { CareersApplicationFormSection, CareersJobRole } from "@/app/lib/types";
import { submitJobApplication } from "@/app/lib/api";
import { cn } from "@/app/lib/cn";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  portfolio: "",
  statement: "",
};

interface CareersApplicationFormProps {
  data?: CareersApplicationFormSection;
  wrapperClass?: string;
  selectedRole?: string;
  /* Changes on every pick from the positions list, including repeats */
  selectionId?: number;
  /* Open roles from the positions section, used to build the dropdown */
  roles?: CareersJobRole[];
}

export default function CareersApplicationForm({
  data,
  wrapperClass,
  selectedRole,
  selectionId = 0,
  roles,
}: CareersApplicationFormProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const [careerFormData, setCareerFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCareerSubmitted, setIsCareerSubmitted] = useState(false);

  /**
   * Picking a role up in the positions list preselects it here, though the applicant
   * can still change it. Worked out during render rather than synced with an effect,
   * which would only cost another render pass. The manual choice remembers which
   * selection it overrode, so a later pick from the list still wins.
   */
  const [override, setOverride] = useState<{ for: number; value: string } | null>(
    null,
  );
  const role =
    override && override.for === selectionId ? override.value : (selectedRole ?? "");

  const setRole = (value: string) => setOverride({ for: selectionId, value });

  const anchorId = data?.anchorId ?? "apply-form";
  const badgeText = data?.badgeText ?? "Registry Submission";
  const title = data?.title ?? "Transmit an Application Brief";
  const description =
    data?.description ??
    "Submit your details securely to our talent council. We maintain strict compliance for active roles.";

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerFormData.firstName || !careerFormData.email) {
      triggerToast("Please provide your first name and email address.");
      return;
    }

    setIsSubmitting(true);

    /* Link the submission to a real job when the role matches an open one */
    const matched = roles?.find((r) => r.title === role);

    const result = await submitJobApplication({
      firstName: careerFormData.firstName,
      lastName: careerFormData.lastName,
      email: careerFormData.email,
      role,
      jobSlug: matched?.slug ?? undefined,
      portfolio: careerFormData.portfolio,
      statement: careerFormData.statement,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      triggerToast(result.error);
      return;
    }

    setIsCareerSubmitted(true);
    triggerToast(
      "Application successfully queued! Our talent board will reach out shortly.",
    );
    setTimeout(() => {
      setIsCareerSubmitted(false);
      setCareerFormData(emptyForm);
      setRole("");
    }, 2500);
  };

  return (
    <section className={cn("py-16 sm:py-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div
          id={anchorId}
          className="bg-brand-dark text-white rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />

          <div className="max-w-2xl text-left mb-8">
            <span className="text-xs text-brand-blue font-mono font-bold uppercase tracking-widest bg-brand-blue/20 border border-brand-blue/30 px-3 py-1 rounded-full mb-4 inline-block">
              {badgeText}
            </span>
            <h3 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mt-1 text-white">
              {title}
            </h3>
            <p className="text-16 leading-relaxed text-text-secondary mt-2">
              {description}
            </p>
          </div>

          <form onSubmit={handleCareerSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  First Name <span className="text-brand-blue">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={careerFormData.firstName}
                  onChange={(e) =>
                    setCareerFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-500 text-white outline-none focus:border-brand-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={careerFormData.lastName}
                  onChange={(e) =>
                    setCareerFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-500 text-white outline-none focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Secure Email <span className="text-brand-blue">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@hospital.clinical"
                  value={careerFormData.email}
                  onChange={(e) =>
                    setCareerFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-500 text-white outline-none focus:border-brand-blue transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Target Role <span className="text-brand-blue">*</span>
                </label>
                <select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold text-white outline-none focus:border-brand-blue transition-all"
                >
                  <option value="">Select a target vacancy...</option>
                  {roles?.map((role, idx) => (
                    <option key={idx} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                  <option value="General Submission">
                    General Clinical Talent Pool
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Portfolio Link / GitHub Profile
              </label>
              <input
                type="url"
                placeholder="https://github.com/johndoe"
                value={careerFormData.portfolio}
                onChange={(e) =>
                  setCareerFormData((prev) => ({
                    ...prev,
                    portfolio: e.target.value,
                  }))
                }
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-500 text-white outline-none focus:border-brand-blue transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Statement of Purpose / Clinical Motivation
              </label>
              <textarea
                rows={4}
                placeholder="State your unique background intersecting medical workflows, computing power, or disease diagnostics..."
                value={careerFormData.statement}
                onChange={(e) =>
                  setCareerFormData((prev) => ({
                    ...prev,
                    statement: e.target.value,
                  }))
                }
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-500 text-white outline-none focus:border-brand-blue transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isCareerSubmitted}
              className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/90 disabled:bg-indigo-900 text-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-brand-blue/15 flex items-center justify-center gap-2"
            >
              {isCareerSubmitted ? (
                <>
                  <CheckCircle2
                    size={16}
                    className="text-emerald-400 animate-bounce"
                  />
                  Application Registered
                </>
              ) : (
                <>
                  <Send size={14} />
                  {isSubmitting
                    ? "Transmitting..."
                    : "Transmit Brief to Talent Council"}
                </>
              )}
            </button>
          </form>

          <Toast show={showToast} message={toastMessage} />
        </div>
      </div>
    </section>
  );
}
