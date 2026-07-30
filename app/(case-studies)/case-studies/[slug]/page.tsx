import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import ResourcesTopHeader from "@/app/components/ResourcesTopHeader";
import CaseStudyDetail from "../../widgets/CaseStudyDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found | OJAS" };
  }

  return buildSeoMetadata(study.seo, {
    title: `${study.title} | OJAS Case Studies`,
    description: study.summary || "OJAS clinical case study.",
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <div data-page-id="case-study-detail">
      <SeoJsonLd structuredData={study.seo?.structuredData} />
      <ResourcesTopHeader />
      <CaseStudyDetail study={study} />
    </div>
  );
}
