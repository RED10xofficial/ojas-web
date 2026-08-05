import type { Metadata } from "next";
import { getResearchPapersPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import ResourcesTopHeader from "@/app/components/ResourcesTopHeader";
import SectionRenderer from "@/app/components/SectionRenderer";
import ResearchPapersSections from "../widgets/ResearchPapersSections";

const RESEARCH_COMPONENTS = [
  "research-papers-page.research-hero-section",
  "research-papers-page.research-stats-section",
  "research-papers-page.research-explorer-section",
];

export async function generateMetadata(): Promise<Metadata> {
  const researchPapersPageData = await getResearchPapersPage();
  return buildSeoMetadata(researchPapersPageData?.seo, {
    title: "Research Papers | OJAS Resources",
    description:
      "Peer-reviewed scientific literature from the OJAS clinical evidence base — dermatology, maternal health, clinical NLP, and more.",
  });
}

export default async function ResearchPapersPage() {
  const researchPapersPageData = await getResearchPapersPage();

  /* Any non-research sections (FAQ, stats, …) render through the shared renderer */
  const extraSections = researchPapersPageData?.sections?.filter(
    (section) => !RESEARCH_COMPONENTS.includes(section.__component),
  );

  return (
    <div id="research-papers">
      <SeoJsonLd structuredData={researchPapersPageData?.seo?.structuredData} />
      <PageCustomCss
        css={researchPapersPageData?.customCss}
        pageId="research-papers"
      />
      <ResourcesTopHeader />
      <ResearchPapersSections sections={researchPapersPageData?.sections} />
      {extraSections && extraSections.length > 0 && (
        <SectionRenderer sections={extraSections} />
      )}
    </div>
  );
}
