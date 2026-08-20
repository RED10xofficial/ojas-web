import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllModelsPageSlugs, getModelsPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import SectionRenderer from "@/app/components/SectionRenderer";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";

/* ── Dermatology static fallback imports ── */
import DermaHeroSection from "../dermatology/widgets/HeroSection";
import DermaVideoSection from "../dermatology/widgets/VideoSection";
import DermaClinicalScannerSection from "../dermatology/widgets/ClinicalScannerSection";
import DermaBenchmarksSection from "../dermatology/widgets/BenchmarksSection";
import DermaBuiltForCliniciansSection from "../dermatology/widgets/BuiltForCliniciansSection";
import DermaROICalculatorSection from "../dermatology/widgets/ROICalculatorSection";
import DermaEcosystemAccessSection from "../dermatology/widgets/EcosystemAccessSection";
import DermaFooterActionSection from "../dermatology/widgets/FooterActionSection";
import DermaFooterSection from "../dermatology/widgets/FooterSection";

/* ── Scribe static fallback imports ── */
import ScribeHeroSection from "../scribe/widgets/HeroSection";
import ScribeAmbientDemoSection from "../scribe/widgets/AmbientScribeDemoSection";
import ScribeCapabilitiesSection from "../scribe/widgets/CapabilitiesSection";
import ScribeWhyOjasSection from "../scribe/widgets/WhyOjasSection";

/* ── Shared home page widgets ── */
import TestimonialSection from "../../(home)/widgets/TestimonialSection";
import DoctorReviewsSection from "../../(home)/widgets/DoctorReviewsSection";
import StatsSection from "../../(home)/widgets/StatsSection";
import AccessPointsSection from "../../(home)/widgets/AccessPointsSection";
import { CertifiedAuthorityBoard } from "../../(home)/widgets/CertifiedAuthorityBoard";
import BlogsSection from "../../(home)/widgets/BlogsSection";
import FeaturedInSection from "../../(home)/widgets/FeaturedInSection";
import PricingSection from "../../(home)/widgets/PricingSection";
import ComplianceSection from "../../(home)/widgets/ComplianceSection";
import FAQSection from "../../(home)/widgets/FAQSection";

/**
 * These slugs ship a hardcoded widget fallback for when the CMS is unreachable.
 * Every other model page comes straight from the CMS.
 */
type ValidSlug = "dermatology" | "scribe";

export async function generateStaticParams() {
  const slugs = await getAllModelsPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getModelsPage(slug);

  const title = pageData?.title ?? `OJAS ${slug.charAt(0).toUpperCase() + slug.slice(1)}`;

  return buildSeoMetadata(pageData?.seo, {
    title: `${title} | OJAS`,
    description: `OJAS ${title} — AI-powered clinical intelligence platform.`,
  });
}

/* ── Static fallback components per slug ── */
const STATIC_FALLBACKS: Record<ValidSlug, React.ComponentType[]> = {
  dermatology: [
    DermaHeroSection,
    DermaVideoSection,
    DermaClinicalScannerSection,
    TestimonialSection,
    DermaBenchmarksSection,
    DoctorReviewsSection,
    DermaBuiltForCliniciansSection,
    StatsSection,
    DermaROICalculatorSection,
    DermaEcosystemAccessSection,
    CertifiedAuthorityBoard,
    BlogsSection,
    FeaturedInSection,
    PricingSection,
    ComplianceSection,
    FAQSection,
    DermaFooterActionSection,
    DermaFooterSection,
  ],
  scribe: [
    ScribeHeroSection,
    ScribeAmbientDemoSection,
    TestimonialSection,
    DoctorReviewsSection,
    ScribeCapabilitiesSection,
    ScribeWhyOjasSection,
    StatsSection,
    AccessPointsSection,
    CertifiedAuthorityBoard,
    BlogsSection,
    FeaturedInSection,
    PricingSection,
    ComplianceSection,
    FAQSection,
  ],
};

export default async function ModelsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = await getModelsPage(slug);
  if (pageData?.sections?.length) {
    return (
      <div id={`models-${slug}`}>
        <SeoJsonLd structuredData={pageData.seo?.structuredData} />
        <PageCustomCss css={pageData.customCss} pageId={`models-${slug}`} />
        <SectionRenderer sections={pageData.sections} slug={slug} />
      </div>
    );
  }

  /* Fallback: render static widgets when CMS is unavailable */
  const fallbackComponents = STATIC_FALLBACKS[slug as ValidSlug];

  /* No CMS entry and no hardcoded fallback — the page does not exist. */
  if (!fallbackComponents) {
    notFound();
  }

  return (
    <>
      {fallbackComponents.map((Component, idx) => (
        <Component key={idx} />
      ))}
    </>
  );
}
