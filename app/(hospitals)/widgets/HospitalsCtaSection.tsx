"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Formik, Form, useField, type FormikHelpers } from "formik";
import * as Yup from "yup";
import type { ReactNode } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Loader2,
  SendHorizontal,
} from "lucide-react";
import Toast from "@/app/components/Toast";
import type { HospitalsCtaSection } from "@/app/lib/types";
import { submitContactForm } from "@/app/lib/api";
import MarkdownText from "@/app/(home)/components/MarkdownText";
import { cn } from "@/app/lib/cn";
import { ASSESSMENT_FORM_ID } from "../components/scrollToAssessment";
import { resolveTrustBadges } from "../components/trustBadges";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  projectDescription: "",
};

type AssessmentValues = typeof initialValues;

/**
 * Same conventions as the contact form: `.trim()` casts before validation so
 * whitespace-only fields fail `required`, and `required` comes before the length
 * rules since Formik only shows the first error per field.
 */
const assessmentSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Your full name is required.")
    .min(2, "Please enter at least 2 characters.")
    .max(80, "Please keep your name under 80 characters."),
  email: Yup.string()
    .trim()
    .required("A contact email is required.")
    .email("Enter a valid email address, e.g. watson@hospital.org."),
  phone: Yup.string()
    .trim()
    .required("A contact phone number is required.")
    .min(7, "Please enter a reachable phone number.")
    .max(20, "Please keep the number under 20 characters."),
  organization: Yup.string()
    .trim()
    .required("Your hospital or organisation is required.")
    .max(120, "Please keep this under 120 characters."),
  projectDescription: Yup.string()
    .trim()
    .required("A short project description is required.")
    .min(10, "Please describe your project in at least 10 characters.")
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
  type?: "text" | "email" | "tel";
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

export default function HospitalsCtaSection({
  data,
  wrapperClass,
}: {
  data?: HospitalsCtaSection;
  wrapperClass?: string;
}) {
  const [submitted, setSubmitted] = useState<{
    name: string;
    organization: string;
  } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const title = data?.title ?? "One Conversation. No Obligation.";
  const titleSecondLine =
    data?.titleSecondLine ?? "We Tell You Exactly What It Takes.";
  const description =
    data?.description ??
    "Describe the product you want to build. We'll respond in 48 hours with what it takes, what it costs, and how fast we can move.";
  const buttonText = data?.buttonText ?? "Get Your Free Assessment";
  const noticeText =
    data?.noticeText ??
    "No sales deck. No generic demo.\n**A real conversation with someone who has built this before.**";
  const trustBadges = resolveTrustBadges(data?.trustBadges);

  /* Quadrupled so the ticker loops seamlessly at any viewport width. */
  const repeatedBadges = [
    ...trustBadges,
    ...trustBadges,
    ...trustBadges,
    ...trustBadges,
  ];

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (
    values: AssessmentValues,
    { resetForm }: FormikHelpers<AssessmentValues>,
  ) => {
    /* Cast rather than re-validate: Formik has run the schema already. */
    const { name, email, phone, organization, projectDescription } =
      assessmentSchema.cast(values);

    const result = await submitContactForm({
      name,
      email,
      phone,
      institution: organization,
      department: "general",
      source: "hospitals",
      message: projectDescription,
    });

    if (!result.ok) {
      triggerToast(result.error);
      return;
    }

    resetForm();
    setSubmitted({ name, organization });
  };

  return (
    <section
      id={ASSESSMENT_FORM_ID}
      /* scroll-mt keeps the heading clear of the floating header on CTA jumps. */
      className={cn(
        "scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-24 bg-bg-surface border-t border-brand-subtle",
        wrapperClass,
      )}
    >
      <div className="global-container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">
              <span className="block">{title}</span>
              {titleSecondLine && (
                <span className="block mt-1 sm:mt-2">{titleSecondLine}</span>
              )}
            </h2>
            <p className="text-16 leading-relaxed text-text-secondary font-medium max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          {/* Form container */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-brand-blue/10 rounded-3xl p-6 sm:p-10 shadow-sm relative"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="w-14 h-14 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="text-20 sm:text-28 leading-[1.2] font-display font-medium text-text-primary mb-3">
                  Assessment Request Received
                </h3>
                <p className="text-16 leading-relaxed text-text-secondary font-medium max-w-md mx-auto mb-8">
                  Thank you,{" "}
                  <strong className="text-text-primary">
                    {submitted.name}
                  </strong>
                  . Our engineering lead will review your project requirements
                  for{" "}
                  <strong className="text-text-primary">
                    {submitted.organization || "your organization"}
                  </strong>{" "}
                  and respond within 48 hours with a detailed technical
                  breakdown.
                </p>
                <button
                  onClick={() => setSubmitted(null)}
                  className="bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={assessmentSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  /* noValidate: Yup owns validation, not the browser's bubbles. */
                  <Form className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        name="name"
                        label="Your Full Name"
                        placeholder="Dr. John Watson"
                        required
                      />
                      <TextField
                        name="email"
                        label="Direct Contact Email"
                        type="email"
                        placeholder="watson@hospital.org"
                        required
                      />
                      <TextField
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                      />
                      <TextField
                        name="organization"
                        label="Hospital / Organisation"
                        placeholder="Apollo Hospitals, Chennai"
                        required
                      />
                    </div>

                    <TextAreaField
                      name="projectDescription"
                      label="Your Message"
                      placeholder="Describe the clinical AI or hardware product you want to build..."
                      required
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed disabled:opacity-70 text-white text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processing Your Request...</span>
                        </>
                      ) : (
                        <>
                          <span>{buttonText}</span>
                          <SendHorizontal size={16} />
                        </>
                      )}
                    </button>

                    {/* USP callout */}
                    <div className="bg-bg-page border border-brand-blue/20 rounded-2xl p-5 text-center">
                      <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-semibold [&_strong]:text-brand-blue [&_strong]:font-bold">
                        <MarkdownText markdown={noticeText} />
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </motion.div>

          {/* Credential ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 overflow-hidden relative py-3 border-y border-brand-subtle bg-bg-page/60 rounded-2xl"
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />

            <div
              className="flex whitespace-nowrap overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex items-center gap-2.5 sm:gap-3"
                animate={{ x: isPaused ? undefined : [0, "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 38,
                    ease: "linear",
                  },
                }}
              >
                {repeatedBadges.map((badge, idx) => {
                  const { Icon } = badge;
                  const isSelected = activeItem === badge.id;

                  return (
                    <button
                      key={`cta-ticker-${badge.id}-${idx}`}
                      type="button"
                      onClick={() => setActiveItem(isSelected ? null : badge.id)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200 cursor-pointer",
                        isSelected
                          ? "bg-brand-blue text-white border-brand-blue shadow-md"
                          : "bg-white border-brand-subtle text-text-secondary hover:border-brand-blue/30 hover:text-brand-blue",
                      )}
                    >
                      {badge.iconUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={badge.iconUrl}
                          alt=""
                          className="w-4 h-4 object-contain shrink-0"
                        />
                      ) : (
                        <Icon
                          size={14}
                          className={cn(
                            "shrink-0 transition-colors",
                            isSelected ? "text-white" : "text-brand-blue",
                          )}
                        />
                      )}
                      <span>{badge.label}</span>
                      {isSelected && <Check size={12} className="text-white" />}
                    </button>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          <Toast show={showToast} message={toastMessage} />
        </div>
      </div>
    </section>
  );
}
