import type { Metadata } from "next";
import { getDeveloperApiPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import SectionRenderer from "@/app/components/SectionRenderer";

import DeveloperHeroSection from "../widgets/DeveloperHeroSection";
import DeveloperIntegrateSection from "../widgets/DeveloperIntegrateSection";
import DeveloperMarqueeSection from "../widgets/DeveloperMarqueeSection";
import DeveloperCapabilitiesSection from "../widgets/DeveloperCapabilitiesSection";
import DeveloperMetricsSection from "../widgets/DeveloperMetricsSection";

export async function generateMetadata(): Promise<Metadata> {
  const developerApiPageData = await getDeveloperApiPage();
  return buildSeoMetadata(developerApiPageData?.seo, {
    title: "Developer API | OJAS",
    description:
      "Build with the most advanced clinical artificial intelligence. Integrate OJAS Glass API into your EHR, telehealth, and clinical workflow products.",
  });
}

export default async function DeveloperApiPage() {
  const developerApiPageData = await getDeveloperApiPage();

  return (
    <div id="developer-api">
      <SeoJsonLd structuredData={developerApiPageData?.seo?.structuredData} />
      <PageCustomCss
        css={developerApiPageData?.customCss}
        pageId="developer-api"
      />

      {developerApiPageData?.sections?.length ? (
        <SectionRenderer sections={developerApiPageData.sections} />
      ) : (
        /* Fallback: render static widgets when CMS is unavailable */
        <>
          <DeveloperHeroSection />
          <DeveloperIntegrateSection />
          <DeveloperMarqueeSection />
          <DeveloperCapabilitiesSection />
          <DeveloperMetricsSection />
        </>
      )}
    </div>
  );
}
