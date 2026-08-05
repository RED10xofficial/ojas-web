import type { Metadata } from "next";
import { getWhitePaperPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import ResourcesTopHeader from "@/app/components/ResourcesTopHeader";
import SectionRenderer from "@/app/components/SectionRenderer";
import WhitePaperSections from "../widgets/WhitePaperSections";

const WHITE_PAPER_COMPONENTS = [
  "white-paper-page.white-paper-hero-section",
  "white-paper-page.white-paper-content-section",
];

export async function generateMetadata(): Promise<Metadata> {
  const whitePaperPageData = await getWhitePaperPage();
  return buildSeoMetadata(whitePaperPageData?.seo, {
    title: "White Paper | OJAS Resources",
    description:
      "OJAS strategic white paper: The Bio-Intelligent Clinical Core — Engineering the Gut-Skin Reversal.",
  });
}

export default async function WhitePaperPage() {
  const whitePaperPageData = await getWhitePaperPage();

  /* Any non-white-paper sections (FAQ, stats, …) render through the shared renderer */
  const extraSections = whitePaperPageData?.sections?.filter(
    (section) => !WHITE_PAPER_COMPONENTS.includes(section.__component),
  );

  return (
    <div id="white-paper">
      <SeoJsonLd structuredData={whitePaperPageData?.seo?.structuredData} />
      <PageCustomCss css={whitePaperPageData?.customCss} pageId="white-paper" />
      <ResourcesTopHeader />
      <WhitePaperSections sections={whitePaperPageData?.sections} />
      {extraSections && extraSections.length > 0 && (
        <SectionRenderer sections={extraSections} />
      )}
    </div>
  );
}
