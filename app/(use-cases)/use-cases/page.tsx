import type { Metadata } from "next";
import { getUseCasesPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import SectionRenderer from "@/app/components/SectionRenderer";
import UseCasesSections from "../widgets/UseCasesSections";

const USE_CASES_COMPONENTS = [
  "use-cases-page.use-cases-hero-section",
  "use-cases-page.use-cases-directory-section",
];

export async function generateMetadata(): Promise<Metadata> {
  const useCasesPageData = await getUseCasesPage();
  return buildSeoMetadata(useCasesPageData?.seo, {
    title: "Use Cases | OJAS",
    description:
      "Explore the specialized medical workflows and passive documentation environments calibrated for clinical practice.",
  });
}

export default async function UseCasesPage() {
  const useCasesPageData = await getUseCasesPage();

  /* Any non-use-cases sections (FAQ, stats, …) render through the shared renderer */
  const extraSections = useCasesPageData?.sections?.filter(
    (section) => !USE_CASES_COMPONENTS.includes(section.__component),
  );

  return (
    <div data-page-id="use-cases">
      <SeoJsonLd structuredData={useCasesPageData?.seo?.structuredData} />
      <PageCustomCss css={useCasesPageData?.customCss} pageId="use-cases" />
      <UseCasesSections sections={useCasesPageData?.sections} />
      {extraSections && extraSections.length > 0 && (
        <SectionRenderer sections={extraSections} />
      )}
    </div>
  );
}
