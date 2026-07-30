"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  SendHorizontal,
  ShieldCheck,
} from "lucide-react";
import Toast from "@/app/components/Toast";
import type { ContactFormSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultChannels = [
  {
    department: "Scientific Board & Clinicians",
    email: "steering@ojas.clinical",
    description:
      "For physicians, research professors or medical institutions wishing to participate in validation trials.",
  },
  {
    department: "Enterprise Integrations",
    email: "partnerships@ojas.clinical",
    description:
      "EHR deployment pipelines, private cloud instances, and custom specialty fine-tuning requests.",
  },
  {
    department: "Developer Support",
    email: "api@ojas.clinical",
    description:
      "Issues with local API keys, integration scripts, disease classification endpoints, or testing limits.",
  },
];

export default function ContactForm({
  data,
  wrapperClass,
}: {
  data?: ContactFormSection;
  wrapperClass?: string;
}) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const [contactFormData, setContactFormData] = useState({
    name: "",
    institution: "",
    department: "general",
    email: "",
    message: "",
  });
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !contactFormData.name ||
      !contactFormData.email ||
      !contactFormData.message
    ) {
      triggerToast("Please complete all required fields.");
      return;
    }
    setIsContactSubmitted(true);
    triggerToast("Secure message delivered to OJAS registry.");
    setTimeout(() => {
      setIsContactSubmitted(false);
      setContactFormData({
        name: "",
        institution: "",
        department: "general",
        email: "",
        message: "",
      });
    }, 2500);
  };

  const badgeText = data?.badgeText ?? "Secure Channels";
  const title = data?.title ?? "Deliberate Integration & Clinical Inquiry";
  const description =
    data?.description ??
    "Whether you are a clinic wanting to deploy the Scribe network, a computational team interested in registry trials, or a developer with core integration questions—we are here to support you.";
  const channelsTitle = data?.channelsTitle ?? "Direct Communications";
  const channelsDescription =
    data?.channelsDescription ??
    "Reach our specific scientific guilds directly for faster dispatch processing.";
  const channels = data?.channels?.length ? data.channels : defaultChannels;
  const noticeTitle = data?.noticeTitle ?? "HIPAA-COMPLIANT EXCHANGE";
  const noticeDescription =
    data?.noticeDescription ??
    "Incoming query channels comply strictly with medical data transfer encryption protocols. Never share raw patient identities outside credentialed secure channels.";
  const formBadgeText = data?.formBadgeText ?? "Custom Registry Message";
  const formDescription =
    data?.formDescription ??
    "Your query will be matched to the correct department within 12 standard business hours.";

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="w-full flex flex-col items-start">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-4 inline-block">
            {badgeText}
          </span>
          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-6">
            {title}
          </h1>
          <p className="text-16 leading-relaxed text-text-secondary font-medium max-w-2xl">
            {description}
          </p>
        </div>
        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
                {channelsTitle}
              </h3>
              <p className="text-16 sm:text-20 leading-[1.4] text-text-secondary font-semibold">
                {channelsDescription}
              </p>
            </div>

            <div className="space-y-4">
              {channels.map((channel, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-brand-blue transition-colors"
                >
                  <h4 className="text-lg sm:text-20 font-display font-medium text-text-primary">
                    {channel.department}
                  </h4>
                  {channel.email && (
                    <a
                      href={`mailto:${channel.email}`}
                      className="text-sm font-mono font-bold text-brand-blue mt-1 inline-block hover:underline"
                    >
                      {channel.email}
                    </a>
                  )}
                  <p className="text-16 leading-relaxed text-text-secondary mt-2">
                    {channel.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Safety block */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl flex items-start gap-3.5">
              <ShieldCheck
                className="text-emerald-500 shrink-0 mt-0.5"
                size={16}
              />
              <div>
                <h4 className="text-xs font-bold text-emerald-800 uppercase">
                  {noticeTitle}
                </h4>
                <p className="text-sm text-emerald-700 mt-1 leading-relaxed">
                  {noticeDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white border border-brand-blue/10 rounded-3xl p-6 sm:p-10 shadow-sm relative">
              <div className="mb-6">
                <div className="flex items-center gap-1.5 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles size={11} className="animate-spin" /> {formBadgeText}
                </div>
                <p className="text-16 leading-relaxed text-text-secondary">
                  {formDescription}
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-slate-500 block">
                    Your Full Name <span className="text-brand-blue">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. John Watson"
                    value={contactFormData.name}
                    onChange={(e) =>
                      setContactFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-400 text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-slate-500 block">
                      Institution / Clinic
                    </label>
                    <input
                      type="text"
                      placeholder="General Medical, London"
                      value={contactFormData.institution}
                      onChange={(e) =>
                        setContactFormData((prev) => ({
                          ...prev,
                          institution: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-400 text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-slate-500 block">
                      Target Department{" "}
                      <span className="text-brand-blue">*</span>
                    </label>
                    <select
                      required
                      value={contactFormData.department}
                      onChange={(e) =>
                        setContactFormData((prev) => ({
                          ...prev,
                          department: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    >
                      <option value="general">
                        Healthcare Providers Integration
                      </option>
                      <option value="clinical-scientific">
                        Scientific Advisory / Study Request
                      </option>
                      <option value="developer">
                        Developer and Sandbox API Limits
                      </option>
                      <option value="press">
                        Press & Research Release Queries
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-slate-500 block">
                    Direct Contact Email{" "}
                    <span className="text-brand-blue">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="watson@hospital.clinical"
                    value={contactFormData.email}
                    onChange={(e) =>
                      setContactFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-400 text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-slate-500 block">
                    Message Body <span className="text-brand-blue">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="State your operational inquiry or integration scope details..."
                    value={contactFormData.message}
                    onChange={(e) =>
                      setContactFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-400 text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isContactSubmitted}
                  className="w-full py-3.5 rounded-xl bg-brand-dark hover:bg-brand-blue disabled:bg-slate-700 text-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  {isContactSubmitted ? (
                    <>
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400 animate-pulse"
                      />
                      Message Dispatched Safe
                    </>
                  ) : (
                    <>
                      <SendHorizontal size={14} />
                      Securely Transmit Query
                    </>
                  )}
                </button>
              </form>
            </div>

            <Toast show={showToast} message={toastMessage} />
          </div>
        </div>
      </div>
    </section>
  );
}
