/** Anchor id of the partnership form every IVF CTA scrolls to. */
export const APPLY_FORM_ID = "apply";

/** Every "Apply for Early Access" button lands on the same form. */
export function scrollToApplyForm() {
  document
    .getElementById(APPLY_FORM_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
