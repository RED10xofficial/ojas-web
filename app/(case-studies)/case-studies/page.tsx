import type { Metadata } from "next";
import { getCaseStudiesPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import ResourcesTopHeader from "@/app/components/ResourcesTopHeader";
import SectionRenderer from "@/app/components/SectionRenderer";
import CaseStudiesSections from "../widgets/CaseStudiesSections";

const CASE_STUDIES_COMPONENTS = [
  "case-studies-page.case-studies-metrics-section",
  "case-studies-page.case-studies-spotlight-section",
  "case-studies-page.case-studies-portfolio-section",
  "case-studies-page.case-studies-journey-section",
  "case-studies-page.case-studies-testimonial-section",
];

export async function generateMetadata(): Promise<Metadata> {
  const caseStudiesPageData = await getCaseStudiesPage();
  return buildSeoMetadata(caseStudiesPageData?.seo, {
    title: "Case Studies | OJAS Resources",
    description:
      "Real-world OJAS impact — validated outcomes, patient healing journeys, and measurable clinical remissions across dermatology, gynecology, nutrition, and scribe.",
  });
}

export default async function CaseStudiesPage() {
  const caseStudiesPageData = await getCaseStudiesPage();

  /* Any non-case-studies sections (FAQ, stats, …) render through the shared renderer */
  const extraSections = caseStudiesPageData?.sections?.filter(
    (section) => !CASE_STUDIES_COMPONENTS.includes(section.__component),
  );

  return (
    <div data-page-id="case-studies">
      <SeoJsonLd structuredData={caseStudiesPageData?.seo?.structuredData} />
      <PageCustomCss css={caseStudiesPageData?.customCss} pageId="case-studies" />
      <ResourcesTopHeader />
      <CaseStudiesSections sections={caseStudiesPageData?.sections} />
      {extraSections && extraSections.length > 0 && (
        <SectionRenderer sections={extraSections} />
      )}
    </div>
  );
}
