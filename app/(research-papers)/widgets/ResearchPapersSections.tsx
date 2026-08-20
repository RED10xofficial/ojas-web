import ResearchHero from "./ResearchHero";
import ResearchStats from "./ResearchStats";
import ResearchPapersExplorer from "./ResearchPapersExplorer";
import type { ResearchPapersPageSection } from "@/app/lib/types";

/**
 * Renders the research-papers-only sections in whatever order the CMS has them.
 * Anything shared (FAQ, stats, …) goes through SectionRenderer up on the page.
 */
export default function ResearchPapersSections({
  sections,
}: {
  sections?: ResearchPapersPageSection[];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "research-papers-page.research-hero-section":
            return <ResearchHero key={section.id} section={section} />;
          case "research-papers-page.research-stats-section":
            return <ResearchStats key={section.id} section={section} />;
          case "research-papers-page.research-explorer-section":
            return <ResearchPapersExplorer key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
