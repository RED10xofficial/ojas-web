import type { Metadata } from "next";
import { getBlogsPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import ResourcesTopHeader from "@/app/components/ResourcesTopHeader";
import SectionRenderer from "@/app/components/SectionRenderer";
import BlogsSections from "../widgets/BlogsSections";

const BLOGS_COMPONENTS = [
  "blogs-page.blogs-hero-section",
  "blogs-page.blogs-listing-section",
  "blogs-page.blogs-newsletter-section",
];

export async function generateMetadata(): Promise<Metadata> {
  const blogsPageData = await getBlogsPage();
  return buildSeoMetadata(blogsPageData?.seo, {
    title: "Blogs | OJAS Resources",
    description:
      "OJAS Clinical Gazette — peer-reviewed clinical summaries, system breakthroughs, and engineering chronicles.",
  });
}

export default async function BlogsPage() {
  const blogsPageData = await getBlogsPage();

  /* Any non-blogs sections (FAQ, stats, …) render through the shared renderer */
  const extraSections = blogsPageData?.sections?.filter(
    (section) => !BLOGS_COMPONENTS.includes(section.__component),
  );

  return (
    <div data-page-id="blogs">
      <SeoJsonLd structuredData={blogsPageData?.seo?.structuredData} />
      <PageCustomCss css={blogsPageData?.customCss} pageId="blogs" />
      <ResourcesTopHeader />
      <BlogsSections sections={blogsPageData?.sections} />
      {extraSections && extraSections.length > 0 && (
        <SectionRenderer sections={extraSections} />
      )}
    </div>
  );
}
