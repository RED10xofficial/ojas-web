import type { ReactNode } from "react";

/**
 * Shared skeleton for the 404 and 500 screens, so the two don't drift apart from
 * the marketing pages' type scale. Deliberately hook-free: `error.tsx` has to be a
 * Client Component, and this renders inside the server-rendered `not-found.tsx`
 * as well.
 */
export default function StatusPage({
  code,
  badge,
  title,
  description,
  children,
  footer,
}: {
  code: string;
  badge: string;
  title: string;
  description: ReactNode;
  /** Action buttons — the row directly under the copy. */
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    /* pt-35 clears the fixed header, matching the other top-level pages. */
    <section className="pt-35 pb-24">
      <div className="global-container mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
            {badge}
          </span>

          <p
            aria-hidden
            className="mt-2 font-display font-medium text-72 sm:text-96 leading-none tracking-tight text-brand-blue/20 select-none"
          >
            {code}
          </p>

          <h1 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mt-1">
            {title}
          </h1>

          <p className="text-16 leading-relaxed text-text-secondary mt-3">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>

          {footer}
        </div>
      </div>
    </section>
  );
}

/** Shared so the two screens can't drift out of sync. */
export const ACTION_PRIMARY =
  "inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-blue text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-hover active:bg-brand-pressed transition-colors shadow-md shadow-brand-blue/20 cursor-pointer";

export const ACTION_SECONDARY =
  "inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-text-secondary text-xs font-bold uppercase tracking-wider hover:border-brand-blue hover:text-brand-blue transition-colors shadow-sm cursor-pointer";
