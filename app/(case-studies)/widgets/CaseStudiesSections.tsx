import CaseStudiesMetrics from "./CaseStudiesMetrics";
import CaseStudiesSpotlight from "./CaseStudiesSpotlight";
import CaseStudiesPortfolio from "./CaseStudiesPortfolio";
import CaseStudiesJourney from "./CaseStudiesJourney";
import CaseStudiesTestimonial from "./CaseStudiesTestimonial";
import type { CaseStudiesPageSection } from "@/app/lib/types";

/**
 * Renders the case-studies-only sections in whatever order the CMS has them.
 * Anything shared (FAQ, stats, …) goes through SectionRenderer up on the page.
 */
export default function CaseStudiesSections({
  sections,
}: {
  sections?: CaseStudiesPageSection[];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "case-studies-page.case-studies-metrics-section":
            return <CaseStudiesMetrics key={section.id} section={section} />;
          case "case-studies-page.case-studies-spotlight-section":
            return <CaseStudiesSpotlight key={section.id} section={section} />;
          case "case-studies-page.case-studies-portfolio-section":
            return <CaseStudiesPortfolio key={section.id} section={section} />;
          case "case-studies-page.case-studies-journey-section":
            return <CaseStudiesJourney key={section.id} section={section} />;
          case "case-studies-page.case-studies-testimonial-section":
            return <CaseStudiesTestimonial key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
