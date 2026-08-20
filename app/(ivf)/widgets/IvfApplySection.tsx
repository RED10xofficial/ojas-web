"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Formik, Form, useField, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Toast from "@/app/components/Toast";
import type { IvfApplySection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";
import { submitContactForm } from "@/app/lib/api";
import { APPLY_FORM_ID } from "../components/scrollToApply";

const defaultNotes = [
  "We're selecting 20 partner centers for early access to OJAS AI and the MAI Health Band.",
  "Selection is based on patient volume, clinical leadership, and innovation.",
  "Lead an IVF center? Apply below.",
  "We'll respond within 72 hours with partnership details.",
];

const initialValues = {
  name: "",
  email: "",
  phone: "",
  hospital: "",
  message: "",
};

type ApplyValues = typeof initialValues;

/**
 * Same conventions as the contact form: `.trim()` casts before validation so
 * whitespace-only fields fail `required`, and `required` comes before the length
 * rules since Formik only shows the first error per field.
 */
const applySchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Your full name is required.")
    .min(2, "Please enter at least 2 characters.")
    .max(80, "Please keep your name under 80 characters."),
  email: Yup.string()
    .trim()
    .required("A contact email is required.")
    .email("Enter a valid email address, e.g. director@fertilitycentre.in."),
  phone: Yup.string()
    .trim()
    .required("A contact phone number is required.")
    .min(7, "Please enter a reachable phone number.")
    .max(20, "Please keep the number under 20 characters."),
  hospital: Yup.string()
    .trim()
    .required("Your IVF centre or organisation is required.")
    .max(120, "Please keep this under 120 characters."),
  message: Yup.string()
    .trim()
    .required("A message is required.")
    .min(10, "Please describe your centre in at least 10 characters.")
    .max(2000, "Please keep your message under 2000 characters."),
});

const fieldClass = (invalid: boolean) =>
  cn(
    "w-full bg-white border-[1.5px] rounded-lg pt-7 pb-2 px-4 text-16 text-text-primary outline-none transition-all",
    invalid
      ? "border-error/60 focus:border-error"
      : "border-brand-subtle focus:border-brand-blue focus:shadow-[0_0_0_4px_rgba(184,104,81,0.15)]",
  );

const labelClass =
  "absolute left-4 top-2 text-12 font-semibold text-slate-550 uppercase tracking-[0.05em] pointer-events-none";

function FieldError({ name, error }: { name: string; error?: string }) {
  if (!error) return null;

  return (
    <p
      id={`${name}-error`}
      role="alert"
      className="flex items-center gap-1.5 text-11 font-semibold text-error mt-1.5"
    >
      <AlertCircle size={12} className="shrink-0" />
      {error}
    </p>
  );
}

/** Input with the label floated inside the control, as on the landing page. */
function FloatingField({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
}) {
  const [field, meta] = useField(name);
  const error = meta.touched ? meta.error : undefined;

  return (
    <div className="relative">
      <input
        {...field}
        id={name}
        type={type}
        placeholder=" "
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass(Boolean(error))}
      />
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <FieldError name={name} error={error} />
    </div>
  );
}

function FloatingTextArea({
  name,
  label,
  rows = 4,
}: {
  name: string;
  label: string;
  rows?: number;
}) {
  const [field, meta] = useField(name);
  const error = meta.touched ? meta.error : undefined;

  return (
    <div className="relative">
      <textarea
        {...field}
        id={name}
        rows={rows}
        placeholder=" "
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(fieldClass(Boolean(error)), "resize-none")}
      />
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <FieldError name={name} error={error} />
    </div>
  );
}

export default function IvfApplySection({
  data,
  wrapperClass,
}: {
  data?: IvfApplySection;
  wrapperClass?: string;
}) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [submitted, setSubmitted] = useState<{
    name: string;
    hospital: string;
    email: string;
  } | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const title = data?.title ?? "This Is Not Open to Every IVF Center.";
  const description = data?.description;
  const notes = data?.notes?.length
    ? data.notes.map((note) => note.title)
    : defaultNotes;
  const buttonText = data?.buttonText ?? "Get Your Free Assessment";
  const quoteText =
    data?.quoteText ??
    "The IVF centers that adopt clinical AI first will own the next decade of fertility care. The question is whether your center is one of them or is competing against one.";
  const quoteAuthor = data?.quoteAuthor ?? "Pankaj Raut";

  const handleSubmit = async (
    values: ApplyValues,
    { resetForm }: FormikHelpers<ApplyValues>,
  ) => {
    /* Cast rather than re-validate: Formik has run the schema already. */
    const { name, email, phone, hospital, message } = applySchema.cast(values);

    const result = await submitContactForm({
      name,
      email,
      phone,
      institution: hospital,
      department: "general",
      source: "ivf",
      message,
    });

    if (!result.ok) {
      triggerToast(result.error);
      return;
    }

    resetForm();
    setSubmitted({ name, hospital, email });
  };

  return (
    <section
      id={APPLY_FORM_ID}
      className={cn(
        "scroll-mt-28 sm:scroll-mt-32 py-12 md:py-18 bg-bg-surface border-t border-brand-subtle",
        wrapperClass,
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-24 sm:text-32 md:text-48 leading-[1.15] font-display font-medium text-text-primary mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-14 sm:text-16 leading-relaxed text-text-secondary max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <div className="mt-3 space-y-2">
            {notes.map((note, idx) => (
              <p
                key={idx}
                className="text-14 sm:text-16 leading-relaxed text-text-secondary max-w-2xl mx-auto"
              >
                {note}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-brand-subtle rounded-2xl p-5 sm:p-8 shadow-lg relative overflow-hidden"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 px-2 sm:px-4"
            >
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-24 font-display font-medium text-text-primary mb-3">
                Assessment Request Received
              </h3>
              <p className="text-16 leading-relaxed text-text-secondary max-w-md mx-auto mb-3">
                Thank you,{" "}
                <strong className="text-text-primary">{submitted.name}</strong>.
                Your request for{" "}
                <strong className="text-text-primary">
                  {submitted.hospital}
                </strong>{" "}
                has been received.
              </p>
              <p className="text-14 text-text-secondary max-w-md mx-auto mb-8">
                Our clinical leadership team will respond within 72 hours via{" "}
                <span className="text-text-primary font-semibold">
                  {submitted.email}
                </span>
                .
              </p>
              <button
                onClick={() => setSubmitted(null)}
                className="bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white font-semibold rounded-lg px-6 py-2.5 text-14 transition-all cursor-pointer"
              >
                Submit Another Application
              </button>
            </motion.div>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={applySchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                /* noValidate: Yup owns validation, not the browser's bubbles. */
                <Form className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FloatingField name="name" label="Name *" />
                    <FloatingField name="email" label="Email *" type="email" />
                    <FloatingField name="phone" label="Phone *" type="tel" />
                    <FloatingField
                      name="hospital"
                      label="Hospital/Organisation *"
                    />
                  </div>

                  <FloatingTextArea name="message" label="Your message *" />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue hover:bg-brand-hover active:bg-brand-pressed text-white font-semibold rounded-lg py-4 text-16 sm:text-18 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Your Request...</span>
                      </>
                    ) : (
                      <>
                        <span>{buttonText}</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </motion.div>

        {quoteText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 sm:mt-12 bg-bg-page border-2 border-brand-blue/40 rounded-2xl p-6 sm:p-8 shadow-sm text-center"
          >
            <blockquote className="text-16 sm:text-18 md:text-20 leading-relaxed font-bold text-text-primary italic max-w-2xl mx-auto">
              &ldquo;{quoteText}&rdquo;
            </blockquote>
            {quoteAuthor && (
              <p className="mt-3 text-14 sm:text-16 font-bold tracking-wide text-brand-blue">
                — {quoteAuthor}
              </p>
            )}
          </motion.div>
        )}

        <Toast show={showToast} message={toastMessage} />
      </div>
    </section>
  );
}
