import BlogsHero from "./BlogsHero";
import BlogsGrid from "./BlogsGrid";
import BlogsNewsletter from "./BlogsNewsletter";
import type { BlogsPageSection } from "@/app/lib/types";

/**
 * Renders the blogs-specific dynamic zone components in the order they are
 * arranged in the CMS. Non-blogs components (FAQ, stats, …) are handled by
 * the shared SectionRenderer on the page.
 */
export default function BlogsSections({
  sections,
}: {
  sections?: BlogsPageSection[];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case "blogs-page.blogs-hero-section":
            return <BlogsHero key={section.id} section={section} />;
          case "blogs-page.blogs-listing-section":
            return <BlogsGrid key={section.id} section={section} />;
          case "blogs-page.blogs-newsletter-section":
            return <BlogsNewsletter key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
