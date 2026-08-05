import type { Metadata } from "next";
import { getCareersPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import PageTopHeader from "@/app/components/PageTopHeader";
import SectionRenderer from "@/app/components/SectionRenderer";
import CareersSections from "../widgets/CareersSections";

const CAREERS_COMPONENTS = [
  "careers-page.careers-perks-section",
  "careers-page.careers-positions-section",
  "careers-page.careers-application-form-section",
];

export async function generateMetadata(): Promise<Metadata> {
  const careersPageData = await getCareersPage();
  return buildSeoMetadata(careersPageData?.seo, {
    title: "Careers | OJAS",
    description:
      "Join OJAS — build the future of bio-intelligent clinical systems with builders, researchers, and physicians.",
  });
}

export default async function CareersPage() {
  const careersPageData = await getCareersPage();


  /* Any non-careers sections (FAQ, stats, …) render through the shared renderer */
  const extraSections = careersPageData?.sections?.filter(
    (section) => !CAREERS_COMPONENTS.includes(section.__component),
  );

  return (
    <div id="careers">
      <SeoJsonLd structuredData={careersPageData?.seo?.structuredData} />
      <PageCustomCss css={careersPageData?.customCss} pageId="careers" />
      <PageTopHeader />
      <CareersSections sections={careersPageData?.sections} />
      {extraSections && extraSections.length > 0 && (
        <SectionRenderer sections={extraSections} />
      )}
    </div>
  );
}
