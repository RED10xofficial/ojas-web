/** Anchor id of the assessment form every hospitals CTA scrolls to. */
export const ASSESSMENT_FORM_ID = "assessment-form";

/** Every "Get Your Free Assessment" button lands on the same form. */
export function scrollToAssessmentForm() {
  document
    .getElementById(ASSESSMENT_FORM_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
