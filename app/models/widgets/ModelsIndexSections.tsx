import ModelsIndexHero from "./ModelsIndexHero";
import ModelsGrid from "./ModelsGrid";
import ModelsSafety from "./ModelsSafety";
import type { ModelsIndexPageSection } from "@/app/lib/types";

/**
 * Renders the models-index-specific dynamic zone components in CMS order.
 * Reused components (FAQ, stats, …) go through the shared SectionRenderer
 * on the page.
 */
export default function ModelsIndexSections({
  sections,
}: {
  sections?: ModelsIndexPageSection[];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "models-index-page.models-index-hero-section":
            return <ModelsIndexHero key={section.id} section={section} />;
          case "models-index-page.models-grid-section":
            return <ModelsGrid key={section.id} section={section} />;
          case "models-index-page.models-safety-section":
            return <ModelsSafety key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
