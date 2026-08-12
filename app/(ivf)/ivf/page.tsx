import type { Metadata } from "next";
import { getIvfPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import SectionRenderer from "@/app/components/SectionRenderer";

import IvfHeroSection from "../widgets/IvfHeroSection";
import IvfProblemSection from "../widgets/IvfProblemSection";
import IvfCapabilitiesSection from "../widgets/IvfCapabilitiesSection";
import IvfImpactSection from "../widgets/IvfImpactSection";
import IvfProofSection from "../widgets/IvfProofSection";
import IvfTeamSection from "../widgets/IvfTeamSection";
import IvfMarqueeSection from "../widgets/IvfMarqueeSection";
import IvfApplySection from "../widgets/IvfApplySection";

export async function generateMetadata(): Promise<Metadata> {
  const ivfPageData = await getIvfPage();
  return buildSeoMetadata(ivfPageData?.seo, {
    title: "IVF Partnership Program | OJAS",
    description:
      "We're selecting 20 IVF centers to pioneer AI-powered fertility care. Ojas AI improves IVF outcomes with continuous monitoring, especially for metabolic patients.",
  });
}

export default async function IvfPage() {
  const ivfPageData = await getIvfPage();

  return (
    <div
      id="ivf"
      className="bg-bg-page text-text-primary selection:bg-brand-blue selection:text-white"
    >
      <SeoJsonLd structuredData={ivfPageData?.seo?.structuredData} />
      <PageCustomCss css={ivfPageData?.customCss} pageId="ivf" />

      {ivfPageData?.sections?.length ? (
        <SectionRenderer sections={ivfPageData.sections} />
      ) : (
        /* Fallback: render static widgets when CMS is unavailable */
        <>
          <IvfHeroSection />
          <IvfProblemSection />
          <IvfCapabilitiesSection />
          <IvfImpactSection />
          <IvfProofSection />
          <IvfTeamSection />
          <IvfMarqueeSection />
          <IvfApplySection />
        </>
      )}
    </div>
  );
}
