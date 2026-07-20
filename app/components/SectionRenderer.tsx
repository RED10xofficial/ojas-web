import type { HomePageSection, ModelsPageSection, SectionStyle } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import CustomCodeSection from "./CustomCodeSection";

/* ── Home Page Widgets ── */
import HeroSection from "../(home)/widgets/HeroSection";
import ScrollerSection from "../(home)/widgets/ScrollerSection";
import VideoUploadSection from "../(home)/widgets/VideoUploadSection";
import TestimonialSection from "../(home)/widgets/TestimonialSection";
import HomeBenchmarksSection from "../(home)/widgets/BenchmarksSection";
import DoctorReviewsSection from "../(home)/widgets/DoctorReviewsSection";
import ModelsSection from "../(home)/widgets/ModelsSection";
import WhyOjasSection from "../(home)/widgets/WhyOjasSection";
import AmbientScribingSection from "../(home)/widgets/AmbientScribingSection";
import StatsSection from "../(home)/widgets/StatsSection";
import HomeCalculatorSection from "../(home)/widgets/HomeCalculatorSection";
import AccessPointsSection from "../(home)/widgets/AccessPointsSection";
import { CertifiedAuthorityBoard } from "../(home)/widgets/CertifiedAuthorityBoard";
import PublicationsSection from "../(home)/widgets/PublicationsSection";
import BlogsSection from "../(home)/widgets/BlogsSection";
import FeaturedInSection from "../(home)/widgets/FeaturedInSection";
import PricingSection from "../(home)/widgets/PricingSection";
import ComplianceSection from "../(home)/widgets/ComplianceSection";
import FAQSection from "../(home)/widgets/FAQSection";

/* ── Dermatology Widgets ── */
import DermaHeroSection from "../models/dermatology/widgets/HeroSection";
import DermaVideoSection from "../models/dermatology/widgets/VideoSection";
import DermaClinicalScannerSection from "../models/dermatology/widgets/ClinicalScannerSection";
import DermaBenchmarksSection from "../models/dermatology/widgets/BenchmarksSection";
import DermaBuiltForCliniciansSection from "../models/dermatology/widgets/BuiltForCliniciansSection";
import DermaROICalculatorSection from "../models/dermatology/widgets/ROICalculatorSection";
import DermaEcosystemAccessSection from "../models/dermatology/widgets/EcosystemAccessSection";
import DermaFooterActionSection from "../models/dermatology/widgets/FooterActionSection";
import DermaFooterSection from "../models/dermatology/widgets/FooterSection";

/* ── Scribe Widgets ── */
import ScribeHeroSection from "../models/scribe/widgets/HeroSection";
import ScribeAmbientDemoSection from "../models/scribe/widgets/AmbientScribeDemoSection";
import ScribeCapabilitiesSection from "../models/scribe/widgets/CapabilitiesSection";
import ScribeWhyOjasSection from "../models/scribe/widgets/WhyOjasSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENT_MAP: Record<string, React.ComponentType<{ data?: any; wrapperClass?: string }>> = {
  /* ── Home Page ── */
  "home-page.home-hero-section": HeroSection,
  "home-page.home-scroller-section": ScrollerSection,
  "home-page.home-video-upload-section": VideoUploadSection,
  "home-page.home-testimonial-section": TestimonialSection,
  "home-page.home-benchmarks-section": HomeBenchmarksSection,
  "home-page.home-doctor-reviews-section": DoctorReviewsSection,
  "home-page.home-models-section": ModelsSection,
  "home-page.home-why-ojas-section": WhyOjasSection,
  "home-page.home-ambient-scribing-section": AmbientScribingSection,
  "home-page.home-stats-section": StatsSection,
  "home-page.home-access-points-section": AccessPointsSection,
  "home-page.home-certified-authority-board-section": CertifiedAuthorityBoard,
  "home-page.home-publications-section": PublicationsSection,
  "home-page.home-blogs-section": BlogsSection,
  "home-page.home-featured-in-section": FeaturedInSection,
  "home-page.home-pricing-section": PricingSection,
  "home-page.home-compliance-section": ComplianceSection,
  "home-page.home-faq-section": FAQSection,

  /* ── Home Calculator Widget ── */
  "home-page.home-calculator": HomeCalculatorSection,

  /* ── Custom HTML Widget ── */
  "widgets.custom-code-section": CustomCodeSection,

  /* ── Dermatology ── */
  "models-page.derma-hero-section": DermaHeroSection,
  "models-page.derma-video-section": DermaVideoSection,
  "models-page.derma-clinical-scanner-section": DermaClinicalScannerSection,
  "models-page.derma-practitioner-insights-section": TestimonialSection,
  "models-page.derma-benchmarks-section": DermaBenchmarksSection,
  "models-page.derma-built-for-clinicians-section": DermaBuiltForCliniciansSection,
  "models-page.derma-roi-calculator-section": DermaROICalculatorSection,
  "models-page.derma-footer-action-section": DermaFooterActionSection,
  "models-page.derma-footer-section": DermaFooterSection,

  /* ── Scribe ── */
  "models-page.scribe-hero-section": ScribeHeroSection,
  "models-page.scribe-ambient-demo-section": ScribeAmbientDemoSection,
  "models-page.scribe-capabilities-section": ScribeCapabilitiesSection,
};

/*
 * Page-specific widget overrides.
 * Some pages use widgets with the same CMS component type (e.g., home-page.home-faq-section)
 * but render a different visual component. The key format is `slug::__component`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PAGE_OVERRIDES: Record<string, React.ComponentType<{ data?: any; wrapperClass?: string }>> = {
  /* Derma-specific versions of shared home-page components */
  "dermatology::home-page.home-access-points-section": DermaEcosystemAccessSection,

  /* Scribe-specific versions */
  "scribe::home-page.home-why-ojas-section": ScribeWhyOjasSection,
};

type AnySection = HomePageSection | ModelsPageSection;

interface SectionRendererProps {
  sections: AnySection[];
  slug?: string;
}

function buildSectionStyle(section: AnySection) {
  const sectionStyle = "sectionStyle" in section ? (section as { sectionStyle?: SectionStyle }).sectionStyle : undefined;
  if (!sectionStyle) return undefined;

  const style: React.CSSProperties = {};
  if (sectionStyle.bgColor) style.backgroundColor = sectionStyle.bgColor;
  if (sectionStyle.textColor) style.color = sectionStyle.textColor;
  if (sectionStyle.bgImage) {
    const url = getStrapiMedia(sectionStyle.bgImage.url);
    if (url) {
      style.backgroundImage = `url(${url})`;
      style.backgroundSize = "cover";
      style.backgroundPosition = "center";
      style.backgroundRepeat = "no-repeat";
    }
  }
  return Object.keys(style).length > 0 ? style : undefined;
}

export default function SectionRenderer({ sections, slug }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const overrideKey = slug ? `${slug}::${section.__component}` : "";
        const Component =
          (overrideKey && PAGE_OVERRIDES[overrideKey]) ||
          COMPONENT_MAP[section.__component];

        if (!Component) return null;
        const wrapperClass = "wrapperClass" in section ? (section as { wrapperClass?: string }).wrapperClass : undefined;
        const sectionInlineStyle = buildSectionStyle(section);

        return sectionInlineStyle ? (
          <div key={`${section.__component}-${section.id}`} style={sectionInlineStyle}>
            <Component data={section} wrapperClass={wrapperClass} />
          </div>
        ) : (
          <Component key={`${section.__component}-${section.id}`} data={section} wrapperClass={wrapperClass} />
        );
      })}
    </>
  );
}
