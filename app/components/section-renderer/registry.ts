import type { ComponentType } from "react";
import CustomCodeSection from "../CustomCodeSection";

/* ── Home ── */
import HeroSection from "@/app/(home)/widgets/HeroSection";
import ScrollerSection from "@/app/(home)/widgets/ScrollerSection";
import VideoUploadSection from "@/app/(home)/widgets/VideoUploadSection";
import TestimonialSection from "@/app/(home)/widgets/TestimonialSection";
import HomeBenchmarksSection from "@/app/(home)/widgets/BenchmarksSection";
import DoctorReviewsSection from "@/app/(home)/widgets/DoctorReviewsSection";
import ModelsSection from "@/app/(home)/widgets/ModelsSection";
import WhyOjasSection from "@/app/(home)/widgets/WhyOjasSection";
import SymptomTrapSection from "@/app/(home)/widgets/SymptomTrapSection";
import AmbientScribingSection from "@/app/(home)/widgets/AmbientScribingSection";
import StatsSection from "@/app/(home)/widgets/StatsSection";
import AccessPointsSection from "@/app/(home)/widgets/AccessPointsSection";
import { CertifiedAuthorityBoard } from "@/app/(home)/widgets/CertifiedAuthorityBoard";
import PublicationsSection from "@/app/(home)/widgets/PublicationsSection";
import BlogsSection from "@/app/(home)/widgets/BlogsSection";
import FeaturedInSection from "@/app/(home)/widgets/FeaturedInSection";
import PricingSection from "@/app/(home)/widgets/PricingSection";
import ComplianceSection from "@/app/(home)/widgets/ComplianceSection";
import FAQSection from "@/app/(home)/widgets/FAQSection";
import HomeCalculatorSection from "@/app/(home)/widgets/HomeCalculatorSection";

/* ── About ── */
import AboutMissionVision from "@/app/(about-us)/widgets/AboutMissionVision";
import AboutCoreValues from "@/app/(about-us)/widgets/AboutCoreValues";
import AboutMilestones from "@/app/(about-us)/widgets/AboutMilestones";
import AboutTeam from "@/app/(about-us)/widgets/AboutTeam";

/* ── Pricing ── */
import PricingHeroSection from "@/app/(pricing)/widgets/PricingHeroSection";
import PricingROISection from "@/app/(pricing)/widgets/PricingROISection";
import PricingComplianceSection from "@/app/(pricing)/widgets/PricingComplianceSection";
import PricingFAQSection from "@/app/(pricing)/widgets/PricingFAQSection";

/* ── Developer API ── */
import DeveloperHeroSection from "@/app/(developer-api)/widgets/DeveloperHeroSection";
import DeveloperIntegrateSection from "@/app/(developer-api)/widgets/DeveloperIntegrateSection";
import DeveloperMarqueeSection from "@/app/(developer-api)/widgets/DeveloperMarqueeSection";
import DeveloperCapabilitiesSection from "@/app/(developer-api)/widgets/DeveloperCapabilitiesSection";

/* ── Hospitals ── */
import HospitalsHeroSection from "@/app/(hospitals)/widgets/HospitalsHeroSection";
import HospitalsProblemSection from "@/app/(hospitals)/widgets/HospitalsProblemSection";
import HospitalsBuildSection from "@/app/(hospitals)/widgets/HospitalsBuildSection";
import HospitalsProofSection from "@/app/(hospitals)/widgets/HospitalsProofSection";
import HospitalsTrustBarSection from "@/app/(hospitals)/widgets/HospitalsTrustBarSection";
import HospitalsCtaSection from "@/app/(hospitals)/widgets/HospitalsCtaSection";

/* ── IVF ── */
import IvfHeroSection from "@/app/(ivf)/widgets/IvfHeroSection";
import IvfProblemSection from "@/app/(ivf)/widgets/IvfProblemSection";
import IvfCapabilitiesSection from "@/app/(ivf)/widgets/IvfCapabilitiesSection";
import IvfImpactSection from "@/app/(ivf)/widgets/IvfImpactSection";
import IvfProofSection from "@/app/(ivf)/widgets/IvfProofSection";
import IvfTeamSection from "@/app/(ivf)/widgets/IvfTeamSection";
import IvfMarqueeSection from "@/app/(ivf)/widgets/IvfMarqueeSection";
import IvfApplySection from "@/app/(ivf)/widgets/IvfApplySection";

/* ── Contact ── */
import ContactForm from "@/app/(contact-us)/widgets/ContactForm";
import ContactOffices from "@/app/(contact-us)/widgets/ContactOffices";

/* ── Careers ── */
import CareersPerks from "@/app/(careers)/widgets/CareersPerks";
import CareersPositions from "@/app/(careers)/widgets/CareersPositions";
import CareersApplicationForm from "@/app/(careers)/widgets/CareersApplicationForm";

/* ── Dermatology ── */
import DermaHeroSection from "@/app/models/dermatology/widgets/HeroSection";
import DermaVideoSection from "@/app/models/dermatology/widgets/VideoSection";
import DermaClinicalScannerSection from "@/app/models/dermatology/widgets/ClinicalScannerSection";
import DermaBenchmarksSection from "@/app/models/dermatology/widgets/BenchmarksSection";
import DermaBuiltForCliniciansSection from "@/app/models/dermatology/widgets/BuiltForCliniciansSection";
import DermaROICalculatorSection from "@/app/models/dermatology/widgets/ROICalculatorSection";
import DermaEcosystemAccessSection from "@/app/models/dermatology/widgets/EcosystemAccessSection";
import DermaFooterActionSection from "@/app/models/dermatology/widgets/FooterActionSection";
import DermaFooterSection from "@/app/models/dermatology/widgets/FooterSection";

/* ── Scribe ── */
import ScribeHeroSection from "@/app/models/scribe/widgets/HeroSection";
import ScribeAmbientDemoSection from "@/app/models/scribe/widgets/AmbientScribeDemoSection";
import ScribeCapabilitiesSection from "@/app/models/scribe/widgets/CapabilitiesSection";
import ScribeWhyOjasSection from "@/app/models/scribe/widgets/WhyOjasSection";

/* ── Use cases (via adapters) ── */
import {
  HormoneUniverseAdapter,
  ClinicianValidationAdapter,
  UseCaseHeroAdapter,
  AmbientScribingV2Adapter,
  FoodReactionAdapter,
  SymptomTrapNarrativeAdapter,
} from "./adapters";

/**
 * Every widget gets its raw CMS section as `data`, and the shape differs per
 * widget, so there's nothing meaningful to type here.
 */
export type SectionComponent = ComponentType<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  wrapperClass?: string;
}>;

/** CMS `__component` → widget. */
export const COMPONENT_MAP: Record<string, SectionComponent> = {
  /* ── Home ── */
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
  "developer-api-page.developer-capabilities-section":
    DeveloperCapabilitiesSection,

  /* ── Hospitals ── */
  "hospitals-page.hospitals-hero-section": HospitalsHeroSection,
  "hospitals-page.hospitals-problem-section": HospitalsProblemSection,
  "hospitals-page.hospitals-build-section": HospitalsBuildSection,
  "hospitals-page.hospitals-proof-section": HospitalsProofSection,
  "hospitals-page.hospitals-trust-bar-section": HospitalsTrustBarSection,
  "hospitals-page.hospitals-cta-section": HospitalsCtaSection,

  /* ── IVF ── */
  "ivf-page.ivf-hero-section": IvfHeroSection,
  "ivf-page.ivf-problem-section": IvfProblemSection,
  "ivf-page.ivf-capabilities-section": IvfCapabilitiesSection,
  "ivf-page.ivf-impact-section": IvfImpactSection,
  "ivf-page.ivf-proof-section": IvfProofSection,
  "ivf-page.ivf-team-section": IvfTeamSection,
  "ivf-page.ivf-marquee-section": IvfMarqueeSection,
  "ivf-page.ivf-apply-section": IvfApplySection,

  /* ── Contact ── */
  "contact-page.contact-form-section": ContactForm,
  "contact-page.contact-offices-section": ContactOffices,

  /* ── Careers ── */
  "careers-page.careers-perks-section": CareersPerks,
  "careers-page.careers-positions-section": CareersPositions,
  "careers-page.careers-application-form-section": CareersApplicationForm,

  /* ── Dermatology ── */
  "models-page.derma-hero-section": DermaHeroSection,
  "models-page.derma-video-section": DermaVideoSection,
  "models-page.derma-clinical-scanner-section": DermaClinicalScannerSection,
  "models-page.derma-practitioner-insights-section": TestimonialSection,
  "models-page.derma-benchmarks-section": DermaBenchmarksSection,
  "models-page.derma-built-for-clinicians-section":
    DermaBuiltForCliniciansSection,
  "models-page.derma-roi-calculator-section": DermaROICalculatorSection,
  "models-page.derma-footer-action-section": DermaFooterActionSection,
  "models-page.derma-footer-section": DermaFooterSection,

  /* ── Scribe ── */
  "models-page.scribe-hero-section": ScribeHeroSection,
  "models-page.scribe-ambient-demo-section": ScribeAmbientDemoSection,
  "models-page.scribe-capabilities-section": ScribeCapabilitiesSection,

  /* ── Use cases ── */
  "use-cases-page.hormone-universe-section": HormoneUniverseAdapter,
  "use-cases-page.clinician-validation-section": ClinicianValidationAdapter,
  "use-cases-page.use-case-hero-section": UseCaseHeroAdapter,
  "use-cases-page.ambient-scribing-v2-section": AmbientScribingV2Adapter,
  "use-cases-page.food-reaction-section": FoodReactionAdapter,
  "use-cases-page.symptom-trap-narrative-section": SymptomTrapNarrativeAdapter,

  /* ── Shared ── */
  "widgets.custom-code-section": CustomCodeSection,
};

/**
 * `slug::__component` → widget, for the pages that reuse a CMS component type but
 * want their own visual treatment of it.
 */
export const PAGE_OVERRIDES: Record<string, SectionComponent> = {
  "dermatology::home-page.home-access-points-section":
    DermaEcosystemAccessSection,
  "scribe::home-page.home-why-ojas-section": ScribeWhyOjasSection,
};
