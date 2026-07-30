import UseCasesHero from "./UseCasesHero";
import UseCasesCategory from "./UseCasesCategory";
import type { UseCasesPageSection } from "@/app/lib/types";

/**
 * Renders the use-cases-index dynamic zone components in the order they are
 * arranged in the CMS. Non-use-cases components (FAQ, stats, …) are handled by
 * the shared SectionRenderer on the page.
 */
export default function UseCasesSections({
  sections,
}: {
  sections?: UseCasesPageSection[];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "use-cases-page.use-cases-hero-section":
            return <UseCasesHero key={section.id} section={section} />;
          case "use-cases-page.use-cases-directory-section": {
            const categories = section.categories ?? [];

            if (categories.length === 0) {
              return (
                <section key={section.id} className="pb-16 sm:pb-24">
                  <div className="global-container mx-auto">
                    <div className="text-center py-20 bg-white border border-brand-subtle rounded-[2rem] space-y-4">
                      <h3 className="text-lg font-display font-bold">
                        {section.emptyStateTitle || "No Use Cases Published"}
                      </h3>
                      <p className="text-16 leading-relaxed text-text-secondary max-w-sm mx-auto">
                        {section.emptyStateDescription ||
                          "Clinical workflow pages will appear here once published."}
                      </p>
                    </div>
                  </div>
                </section>
              );
            }

            return (
              <div key={section.id}>
                {categories.map((cat) => (
                  <UseCasesCategory key={cat.slug} category={cat} />
                ))}
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}
