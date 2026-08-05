import type {
  HormoneUniverseSectionData,
  ClinicianValidationSectionData,
  UseCaseHeroSectionData,
  AmbientScribingV2SectionData,
  FoodReactionSectionData,
  SymptomTrapNarrativeSectionData,
} from "@/app/lib/types";
import LivingHormoneUniverse from "@/app/(use-cases)/widgets/AIPrediction/LivingHormoneUniverse";
import ClinicianValidationSection from "@/app/(use-cases)/widgets/AIPrediction/ClinicianValidationSection";
import UseCaseHeroSection from "@/app/(use-cases)/widgets/UseCaseHeroSection";
import AmbientScribingV2Section from "@/app/(use-cases)/widgets/AmbientScribingV2Section";
import FoodReactionSection from "@/app/(use-cases)/widgets/FoodReactionSection";
import SymptomTrapNarrativeSection from "@/app/(use-cases)/widgets/SymptomTrapNarrativeSection";

/*
 * Use case widgets take their section as `section`, while the shared renderer
 * passes `data`. These adapters bridge the two rather than teaching every
 * widget a second prop name.
 */

export function HormoneUniverseAdapter({
  data,
  wrapperClass,
}: {
  data?: HormoneUniverseSectionData;
  wrapperClass?: string;
}) {
  if (!data) return null;
  return <LivingHormoneUniverse section={{ ...data, wrapperClass }} />;
}

export function ClinicianValidationAdapter({
  data,
  wrapperClass,
}: {
  data?: ClinicianValidationSectionData;
  wrapperClass?: string;
}) {
  if (!data) return null;
  return <ClinicianValidationSection section={{ ...data, wrapperClass }} />;
}

export function AmbientScribingV2Adapter({
  data,
}: {
  data?: AmbientScribingV2SectionData;
}) {
  if (!data) return null;
  return <AmbientScribingV2Section section={data} />;
}

export function FoodReactionAdapter({
  data,
}: {
  data?: FoodReactionSectionData;
}) {
  if (!data) return null;
  return <FoodReactionSection section={data} />;
}

export function SymptomTrapNarrativeAdapter({
  data,
}: {
  data?: SymptomTrapNarrativeSectionData;
}) {
  if (!data) return null;
  return <SymptomTrapNarrativeSection section={data} />;
}

/** Flattens the CMS `phrases` relation into the plain string[] the hero wants. */
export function UseCaseHeroAdapter({
  data,
  wrapperClass,
}: {
  data?: UseCaseHeroSectionData;
  wrapperClass?: string;
}) {
  if (!data) return null;
  return (
    <UseCaseHeroSection
      title={data.title ?? ""}
      subtitle={data.subtitle}
      description={data.description}
      wrapperClass={wrapperClass}
      phrases={(data.phrases ?? []).map((p) => p.text)}
    />
  );
}
