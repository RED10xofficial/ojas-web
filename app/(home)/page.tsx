import type { Metadata } from "next";
import { getHomePage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import SectionRenderer from "@/app/components/SectionRenderer";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";

import HeroSection from "./widgets/HeroSection";
import ScrollerSection from "./widgets/ScrollerSection";
import VideoUploadSection from "./widgets/VideoUploadSection";
import TestimonialSection from "./widgets/TestimonialSection";
import BenchmarksSection from "./widgets/BenchmarksSection";
import DoctorReviewsSection from "./widgets/DoctorReviewsSection";
import ModelsSection from "./widgets/ModelsSection";
import WhyOjasSection from "./widgets/WhyOjasSection";
import AmbientScribingSection from "./widgets/AmbientScribingSection";
import StatsSection from "./widgets/StatsSection";
import AccessPointsSection from "./widgets/AccessPointsSection";
import PublicationsSection from "./widgets/PublicationsSection";
import BlogsSection from "./widgets/BlogsSection";
import FeaturedInSection from "./widgets/FeaturedInSection";
import PricingSection from "./widgets/PricingSection";
import ComplianceSection from "./widgets/ComplianceSection";
import FAQSection from "./widgets/FAQSection";
import { CertifiedAuthorityBoard } from "./widgets/CertifiedAuthorityBoard";

export async function generateMetadata(): Promise<Metadata> {
  const homePageData = await getHomePage();
  return buildSeoMetadata(homePageData?.seo, {
    title: "OJAS",
    description: "The world's first bio-intelligent clinical operating system.",
  });
}

export default async function HomePage() {
  const homePageData = await getHomePage();

  if (homePageData?.sections?.length) {
    return (
      <div data-page-id="home">
        <SeoJsonLd structuredData={homePageData.seo?.structuredData} />
        <PageCustomCss css={homePageData.customCss} pageId="home" />
        <SectionRenderer sections={homePageData.sections} />
      </div>
    );
  }

  /* Fallback: render static widgets when CMS is unavailable */
  return (
    <>
      <HeroSection />
      <ScrollerSection />
      <VideoUploadSection />
      <TestimonialSection />
      <BenchmarksSection />
      <DoctorReviewsSection />
      <ModelsSection />
      <WhyOjasSection />
      <AmbientScribingSection />
      <StatsSection />
      <AccessPointsSection />
      <CertifiedAuthorityBoard />
      <PublicationsSection />
      <BlogsSection />
      <FeaturedInSection />
      <PricingSection />
      <ComplianceSection />
      <FAQSection />
    </>
  );
}
