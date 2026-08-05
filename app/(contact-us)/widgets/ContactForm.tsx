"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Formik, Form, useField, type FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  Sparkles,
  CheckCircle2,
  SendHorizontal,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import Toast from "@/app/components/Toast";
import type { ContactFormSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";
import { submitContactForm } from "@/app/lib/api";

const DEPARTMENTS = [
  { value: "general", label: "Healthcare Providers Integration" },
  { value: "clinical-scientific", label: "Scientific Advisory / Study Request" },
  { value: "developer", label: "Developer and Sandbox API Limits" },
  { value: "press", label: "Press & Research Release Queries" },
];

const initialValues = {
  name: "",
  institution: "",
  department: "general",
  email: "",
  message: "",
};

type ContactValues = typeof initialValues;

/**
 * Two Yup behaviours this schema depends on:
 *  - `.trim()` runs as a cast (strict is off), so a whitespace-only field is
 *    validated — and submitted — as empty.
 *  - Formik shows the first error per field, so `.required()` is declared
 *    before `.min()`; otherwise an empty field reports the length rule.
 */
const contactSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Your full name is required.")
    .min(2, "Please enter at least 2 characters.")
    .max(80, "Please keep your name under 80 characters."),
  institution: Yup.string()
    .trim()
    .max(120, "Please keep this under 120 characters."),
  department: Yup.string()
    .required("Please choose a department.")
    .oneOf(
      DEPARTMENTS.map((option) => option.value),
      "Choose one of the listed departments.",
    ),
  email: Yup.string()
    .trim()
    .required("A contact email is required.")
    .email("Enter a valid email address, e.g. watson@hospital.org."),
  message: Yup.string()
    .trim()
    .required("A message is required.")
    .min(10, "Please describe your inquiry in at least 10 characters.")
    .max(2000, "Please keep your message under 2000 characters."),
});

const controlClass = (invalid: boolean) =>
  cn(
    "w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-400 text-slate-800 outline-none transition-all focus:bg-white",
    invalid
      ? "border-error/50 focus:border-error"
      : "border-slate-200 focus:border-brand-blue",
  );

/** Label + control + error message, wired together for screen readers. */
function FieldShell({
  name,
  label,
  required,
  error,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="text-xs font-mono font-bold uppercase text-slate-500 block"
      >
        {label} {required && <span className="text-brand-blue">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-11 font-semibold text-error"
        >
          <AlertCircle size={12} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextField({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email";
  required?: boolean;
}) {
  const [field, meta] = useField(name);
  const error = meta.touched ? meta.error : undefined;

  return (
    <FieldShell name={name} label={label} required={required} error={error}>
      <input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={controlClass(Boolean(error))}
      />
    </FieldShell>
  );
}

function TextAreaField({
  name,
  label,
  placeholder,
  rows = 5,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  const [field, meta] = useField(name);
  const error = meta.touched ? meta.error : undefined;

  return (
    <FieldShell name={name} label={label} required={required} error={error}>
      <textarea
        {...field}
        id={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(controlClass(Boolean(error)), "resize-none")}
      />
    </FieldShell>
  );
}

function SelectField({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  const [field, meta] = useField(name);
  const error = meta.touched ? meta.error : undefined;

  return (
    <FieldShell name={name} label={label} required={required} error={error}>
      <select
        {...field}
        id={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={controlClass(Boolean(error))}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

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

  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  /* Drop back to the idle button label a moment after a successful send. */
  useEffect(() => {
    if (!isContactSubmitted) return;
    const timer = setTimeout(() => setIsContactSubmitted(false), 2500);
    return () => clearTimeout(timer);
  }, [isContactSubmitted]);

  const handleContactSubmit = async (
    values: ContactValues,
    { resetForm }: FormikHelpers<ContactValues>,
  ) => {
    /*
     * Formik has already validated, so cast rather than re-validate: cast
     * applies the schema's trims without a throw path, and a rejection here
     * would leave Formik stuck with isSubmitting true.
     */
    const { name, institution, department, email, message } =
      contactSchema.cast(values);

    const result = await submitContactForm({
      name,
      department,
      email,
      message,
      institution: institution || undefined,
    });

    if (!result.ok) {
      triggerToast(result.error);
      return;
    }

    resetForm();
    setIsContactSubmitted(true);
    triggerToast("Secure message delivered to OJAS registry.");
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

              <Formik
                initialValues={initialValues}
                validationSchema={contactSchema}
                onSubmit={handleContactSubmit}
              >
                {({ isSubmitting }) => (
                  /* noValidate: Yup owns validation, not the browser's bubbles. */
                  <Form className="space-y-5" noValidate>
                    <TextField
                      name="name"
                      label="Your Full Name"
                      placeholder="Dr. John Watson"
                      required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        name="institution"
                        label="Institution / Clinic"
                        placeholder="General Medical, London"
                      />
                      <SelectField
                        name="department"
                        label="Target Department"
                        options={DEPARTMENTS}
                        required
                      />
                    </div>

                    <TextField
                      name="email"
                      label="Direct Contact Email"
                      type="email"
                      placeholder="watson@hospital.clinical"
                      required
                    />

                    <TextAreaField
                      name="message"
                      label="Message Body"
                      placeholder="State your operational inquiry or integration scope details..."
                      required
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || isContactSubmitted}
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
                          {isSubmitting
                            ? "Transmitting..."
                            : "Securely Transmit Query"}
                        </>
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <Toast show={showToast} message={toastMessage} />
          </div>
        </div>
      </div>
    </section>
  );
}
