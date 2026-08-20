import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllUseCaseSlugs, getUseCaseBySlug } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import UseCaseSections from "../../widgets/UseCaseSections";
import FAQSection from "@/app/(home)/widgets/FAQSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllUseCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlug(slug);

  if (!useCase) {
    return { title: "Use Case Not Found | OJAS" };
  }

  return buildSeoMetadata(useCase.seo, {
    title: `${useCase.label} | OJAS`,
    description: useCase.description || "OJAS clinical use case.",
  });
}

export default async function UseCaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const useCase = await getUseCaseBySlug(slug);

  if (!useCase) notFound();

  /**
   * FAQs hang off the use case itself rather than the dynamic zone, so if a page has
   * them we tack an FAQ block on the end, unless the zone already includes one.
   */
  const hasFaqSection = useCase.sections?.some(
    (section) => section.__component === "home-page.home-faq-section",
  );
  const faqs = useCase.faqs ?? [];

  return (
    <div id="use-case-detail">
      <SeoJsonLd structuredData={useCase.seo?.structuredData} />
      <PageCustomCss css={useCase.customCss} pageId="use-case-detail" />
      <UseCaseSections sections={useCase.sections} fallbackTitle={useCase.label} />
      {!hasFaqSection && faqs.length > 0 && (
        <FAQSection
          data={{
            __component: "home-page.home-faq-section",
            id: 0,
            title: `${useCase.label} — Frequently Asked Questions`,
            description: `Common clinical questions about OJAS ${useCase.label} and how it fits into your workflow.`,
            faqs: faqs.map((faq) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
            })),
          }}
        />
      )}
    </div>
  );
}
