import WhitePaperHero from "./WhitePaperHero";
import WhitePaperContent from "./WhitePaperContent";
import type { WhitePaperPageSection } from "@/app/lib/types";

/**
 * Renders the white-paper-specific dynamic zone components in the order they
 * are arranged in the CMS. Non-white-paper components (FAQ, stats, …) are
 * handled by the shared SectionRenderer on the page.
 */
export default function WhitePaperSections({
  sections,
}: {
  sections?: WhitePaperPageSection[];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "white-paper-page.white-paper-hero-section":
            return <WhitePaperHero key={section.id} section={section} />;
          case "white-paper-page.white-paper-content-section":
            return <WhitePaperContent key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
