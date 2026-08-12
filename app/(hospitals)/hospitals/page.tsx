import type { Metadata } from "next";
import { getHospitalsPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import SectionRenderer from "@/app/components/SectionRenderer";

import HospitalsHeroSection from "../widgets/HospitalsHeroSection";
import HospitalsProblemSection from "../widgets/HospitalsProblemSection";
import HospitalsBuildSection from "../widgets/HospitalsBuildSection";
import HospitalsProofSection from "../widgets/HospitalsProofSection";
import HospitalsCtaSection from "../widgets/HospitalsCtaSection";

export async function generateMetadata(): Promise<Metadata> {
  const hospitalsPageData = await getHospitalsPage();
  return buildSeoMetadata(hospitalsPageData?.seo, {
    title: "Healthcare AI for Hospitals | OJAS",
    description:
      "Custom clinical AI and medical hardware for hospitals. You bring the problem, we deliver the validated solution.",
  });
}

export default async function HospitalsPage() {
  const hospitalsPageData = await getHospitalsPage();

  return (
    <div id="hospitals">
      <SeoJsonLd structuredData={hospitalsPageData?.seo?.structuredData} />
      <PageCustomCss css={hospitalsPageData?.customCss} pageId="hospitals" />

      {hospitalsPageData?.sections?.length ? (
        <SectionRenderer sections={hospitalsPageData.sections} />
      ) : (
        /* Fallback: render static widgets when CMS is unavailable */
        <>
          <HospitalsHeroSection />
          <HospitalsProblemSection />
          <HospitalsBuildSection />
          <HospitalsProofSection />
          <HospitalsCtaSection />
        </>
      )}
    </div>
  );
}
