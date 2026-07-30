import type {
  HomePageSection,
  ModelsPageSection,
  CareersPageSection,
  ContactPageSection,
  AboutPageSection,
  PricingPageSection,
  DeveloperApiPageSection,
  BlogsPageSection,
  ResearchPapersPageSection,
  CaseStudiesPageSection,
  WhitePaperPageSection,
  UseCasesPageSection,
  UseCaseSection,
  ModelsIndexPageSection,
  HormoneUniverseSectionData,
  ClinicianValidationSectionData,
  UseCaseHeroSectionData,
  AmbientScribingV2SectionData,
  FoodReactionSectionData,
  SymptomTrapNarrativeSectionData,
  SectionStyle,
} from "@/app/lib/types";
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
import SymptomTrapSection from "../(home)/widgets/SymptomTrapSection";
import LivingHormoneUniverse from "../(use-cases)/widgets/AIPrediction/LivingHormoneUniverse";
import ClinicianValidationSection from "../(use-cases)/widgets/AIPrediction/ClinicianValidationSection";
import UseCaseHeroSection from "../(use-cases)/widgets/UseCaseHeroSection";
import AmbientScribingV2Section from "../(use-cases)/widgets/AmbientScribingV2Section";
import FoodReactionSection from "../(use-cases)/widgets/FoodReactionSection";
import SymptomTrapNarrativeSection from "../(use-cases)/widgets/SymptomTrapNarrativeSection";
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

/* ── About Widgets ── */
import AboutMissionVision from "../(about-us)/widgets/AboutMissionVision";
import AboutCoreValues from "../(about-us)/widgets/AboutCoreValues";
import AboutMilestones from "../(about-us)/widgets/AboutMilestones";
import AboutTeam from "../(about-us)/widgets/AboutTeam";

/* ── Pricing Widgets ── */
import PricingHeroSection from "../(pricing)/widgets/PricingHeroSection";
import PricingROISection from "../(pricing)/widgets/PricingROISection";
import PricingComplianceSection from "../(pricing)/widgets/PricingComplianceSection";
import PricingFAQSection from "../(pricing)/widgets/PricingFAQSection";

/* ── Developer API Widgets ── */
import DeveloperHeroSection from "../(developer-api)/widgets/DeveloperHeroSection";
import DeveloperIntegrateSection from "../(developer-api)/widgets/DeveloperIntegrateSection";
import DeveloperMarqueeSection from "../(developer-api)/widgets/DeveloperMarqueeSection";
import DeveloperCapabilitiesSection from "../(developer-api)/widgets/DeveloperCapabilitiesSection";

/* ── Contact Widgets ── */
import ContactForm from "../(contact-us)/widgets/ContactForm";
import ContactOffices from "../(contact-us)/widgets/ContactOffices";

/* ── Careers Widgets ── */
import CareersPerks from "../(careers)/widgets/CareersPerks";
import CareersPositions from "../(careers)/widgets/CareersPositions";
import CareersApplicationForm from "../(careers)/widgets/CareersApplicationForm";

/* ── Scribe Widgets ── */
import ScribeHeroSection from "../models/scribe/widgets/HeroSection";
import ScribeAmbientDemoSection from "../models/scribe/widgets/AmbientScribeDemoSection";
import ScribeCapabilitiesSection from "../models/scribe/widgets/CapabilitiesSection";
import ScribeWhyOjasSection from "../models/scribe/widgets/WhyOjasSection";

/**
 * These two widgets were built for use case pages, where sections are passed
 * as `section`. The shared renderer passes `data`, so they are adapted rather
 * than given a second prop name.
 */
function HormoneUniverseAdapter({ data }: { data?: HormoneUniverseSectionData }) {
  if (!data) return null;
  return <LivingHormoneUniverse section={data} />;
}

function ClinicianValidationAdapter({
  data,
}: {
  data?: ClinicianValidationSectionData;
}) {
  if (!data) return null;
  return <ClinicianValidationSection section={data} />;
}

function AmbientScribingV2Adapter({
  data,
}: {
  data?: AmbientScribingV2SectionData;
}) {
  if (!data) return null;
  return <AmbientScribingV2Section section={data} />;
}

function FoodReactionAdapter({ data }: { data?: FoodReactionSectionData }) {
  if (!data) return null;
  return <FoodReactionSection section={data} />;
}

function SymptomTrapNarrativeAdapter({
  data,
}: {
  data?: SymptomTrapNarrativeSectionData;
}) {
  if (!data) return null;
  return <SymptomTrapNarrativeSection section={data} />;
}

function UseCaseHeroAdapter({ data }: { data?: UseCaseHeroSectionData }) {
  if (!data) return null;
  return (
    <UseCaseHeroSection
      title={data.title ?? ""}
      subtitle={data.subtitle}
      description={data.description}
      phrases={(data.phrases ?? []).map((p) => p.text)}
    />
  );
}

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
  "home-page.home-symptom-trap-section": SymptomTrapSection,
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

  /* ── About ── */
  "about-page.about-mission-vision-section": AboutMissionVision,
  "about-page.about-core-values-section": AboutCoreValues,
  "about-page.about-milestones-section": AboutMilestones,
  "about-page.about-team-section": AboutTeam,

  /* ── Pricing ── */
  "pricing-page.pricing-hero-section": PricingHeroSection,
  "pricing-page.pricing-roi-section": PricingROISection,
  "pricing-page.pricing-compliance-section": PricingComplianceSection,
  "pricing-page.pricing-faq-section": PricingFAQSection,

  /* ── Developer API ── */
  "developer-api-page.developer-hero-section": DeveloperHeroSection,
  "developer-api-page.developer-integrate-section": DeveloperIntegrateSection,
  "developer-api-page.developer-marquee-section": DeveloperMarqueeSection,
  "developer-api-page.developer-capabilities-section": DeveloperCapabilitiesSection,

  /* ── Contact ── */
  "contact-page.contact-form-section": ContactForm,
  "contact-page.contact-offices-section": ContactOffices,

  /* ── Careers ── */
  "careers-page.careers-perks-section": CareersPerks,
  "careers-page.careers-positions-section": CareersPositions,
  "careers-page.careers-application-form-section": CareersApplicationForm,

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

  /* ── Specialist widgets shared with use case pages ── */
  "use-cases-page.hormone-universe-section": HormoneUniverseAdapter,
  "use-cases-page.clinician-validation-section": ClinicianValidationAdapter,
  "use-cases-page.use-case-hero-section": UseCaseHeroAdapter,
  "use-cases-page.ambient-scribing-v2-section": AmbientScribingV2Adapter,
  "use-cases-page.food-reaction-section": FoodReactionAdapter,
  "use-cases-page.symptom-trap-narrative-section": SymptomTrapNarrativeAdapter,
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

type AnySection =
  | HomePageSection
  | ModelsPageSection
  | CareersPageSection
  | ContactPageSection
  | AboutPageSection
  | PricingPageSection
  | DeveloperApiPageSection
  | BlogsPageSection
  | ResearchPapersPageSection
  | CaseStudiesPageSection
  | WhitePaperPageSection
  | UseCasesPageSection
  | UseCaseSection
  | ModelsIndexPageSection;

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
