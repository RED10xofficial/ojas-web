import type { Metadata } from "next";
import { getPricingPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import SectionRenderer from "@/app/components/SectionRenderer";

import PricingHeroSection from "../widgets/PricingHeroSection";
import PricingROISection from "../widgets/PricingROISection";
import PricingComplianceSection from "../widgets/PricingComplianceSection";
import PricingFAQSection from "../widgets/PricingFAQSection";

export async function generateMetadata(): Promise<Metadata> {
  const pricingPageData = await getPricingPage();
  return buildSeoMetadata(pricingPageData?.seo, {
    title: "Pricing | OJAS",
    description:
      "Select the infrastructure tier optimized for your clinical operation. Save 20% on annual billing.",
  });
}

export default async function PricingPage() {
  const pricingPageData = await getPricingPage();

  return (
    <div id="pricing">
      <SeoJsonLd structuredData={pricingPageData?.seo?.structuredData} />
      <PageCustomCss css={pricingPageData?.customCss} pageId="pricing" />

      {pricingPageData?.sections?.length ? (
        <SectionRenderer sections={pricingPageData.sections} />
      ) : (
        /* Fallback: render static widgets when CMS is unavailable */
        <>
          <PricingHeroSection />
          <PricingROISection />
          <PricingComplianceSection />
          <PricingFAQSection />
        </>
      )}
    </div>
  );
}
