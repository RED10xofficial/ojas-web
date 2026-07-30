import type { Metadata } from "next";
import { getModelsIndexPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import SectionRenderer from "@/app/components/SectionRenderer";
import ModelsIndexSections from "./widgets/ModelsIndexSections";

const MODELS_INDEX_COMPONENTS = [
  "models-index-page.models-index-hero-section",
  "models-index-page.models-grid-section",
  "models-index-page.models-safety-section",
];

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getModelsIndexPage();
  return buildSeoMetadata(pageData?.seo, {
    title: "Specialty Models | OJAS",
    description:
      "Explore the OJAS suite of dedicated clinical models, each built with high physiological fidelity for distinct organ layers, disease vectors, and diagnostics.",
  });
}

export default async function ModelsIndexPage() {
  const pageData = await getModelsIndexPage();

  /* Any non-index sections (FAQ, stats, …) render through the shared renderer */
  const extraSections = pageData?.sections?.filter(
    (section) => !MODELS_INDEX_COMPONENTS.includes(section.__component),
  );

  return (
    <div data-page-id="models-index">
      <SeoJsonLd structuredData={pageData?.seo?.structuredData} />
      <PageCustomCss css={pageData?.customCss} pageId="models-index" />
      <ModelsIndexSections sections={pageData?.sections} />
      {extraSections && extraSections.length > 0 && (
        <SectionRenderer sections={extraSections} />
      )}
    </div>
  );
}
