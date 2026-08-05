import UseCaseHeroSection from "./UseCaseHeroSection";
import UseCaseVideoSection from "./UseCaseVideoSection";
import ScribeWorkspaceSection from "./ScribeWorkspaceSection";
import ClinicianValidationSection from "./AIPrediction/ClinicianValidationSection";
import LivingHormoneUniverse from "./AIPrediction/LivingHormoneUniverse";
import AmbientScribingV2Section from "./AmbientScribingV2Section";
import FoodReactionSection from "./FoodReactionSection";
import SymptomTrapNarrativeSection from "./SymptomTrapNarrativeSection";
import SectionRenderer from "@/app/components/SectionRenderer";
import type { UseCaseSection } from "@/app/lib/types";

/** Components rendered by this file rather than the shared SectionRenderer. */
const USE_CASE_COMPONENTS = [
  "use-cases-page.use-case-hero-section",
  "use-cases-page.use-case-video-section",
  "use-cases-page.scribe-workspace-section",
  "use-cases-page.clinician-validation-section",
  "use-cases-page.hormone-universe-section",
  "use-cases-page.ambient-scribing-v2-section",
  "use-cases-page.food-reaction-section",
  "use-cases-page.symptom-trap-narrative-section",
];

/**
 * Renders a use case's dynamic zone in CMS order. Use-case-specific widgets
 * render directly; the reused home-page widgets are delegated to the shared
 * SectionRenderer one at a time so ordering is preserved across both sets.
 */
export default function UseCaseSections({
  sections,
  fallbackTitle,
}: {
  sections?: UseCaseSection[];
  fallbackTitle?: string;
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "use-cases-page.use-case-hero-section":
            return (
              <UseCaseHeroSection
                key={section.id}
                title={section.title || fallbackTitle || ""}
                subtitle={section.subtitle}
                description={section.description}
                phrases={(section.phrases ?? []).map((p) => p.text)}
                wrapperClass={section.wrapperClass}
              />
            );
          case "use-cases-page.use-case-video-section":
            return <UseCaseVideoSection key={section.id} section={section} />;
          case "use-cases-page.scribe-workspace-section":
            return <ScribeWorkspaceSection key={section.id} section={section} />;
          case "use-cases-page.clinician-validation-section":
            return <ClinicianValidationSection key={section.id} section={section} />;
          case "use-cases-page.hormone-universe-section":
            return <LivingHormoneUniverse key={section.id} section={section} />;
          case "use-cases-page.ambient-scribing-v2-section":
            return <AmbientScribingV2Section key={section.id} section={section} />;
          case "use-cases-page.food-reaction-section":
            return <FoodReactionSection key={section.id} section={section} />;
          case "use-cases-page.symptom-trap-narrative-section":
            return (
              <SymptomTrapNarrativeSection key={section.id} section={section} />
            );
          default:
            /* Reused home-page widget — delegate to the shared renderer */
            if (USE_CASE_COMPONENTS.includes(section.__component)) return null;
            return <SectionRenderer key={section.id} sections={[section]} />;
        }
      })}
    </>
  );
}
