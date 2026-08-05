import type { Metadata } from "next";
import { getContactPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import PageTopHeader from "@/app/components/PageTopHeader";
import SectionRenderer from "@/app/components/SectionRenderer";

import ContactForm from "../widgets/ContactForm";
import ContactOffices from "../widgets/ContactOffices";

export async function generateMetadata(): Promise<Metadata> {
  const contactPageData = await getContactPage();
  return buildSeoMetadata(contactPageData?.seo, {
    title: "Contact Us | OJAS",
    description:
      "Get in touch with OJAS — secure channels for clinical inquiries and enterprise integrations.",
  });
}

export default async function ContactUsPage() {
  const contactPageData = await getContactPage();

  return (
    <div id="contact-us">
      <SeoJsonLd structuredData={contactPageData?.seo?.structuredData} />
      <PageCustomCss css={contactPageData?.customCss} pageId="contact-us" />
      <PageTopHeader />

      {contactPageData?.sections?.length ? (
        <SectionRenderer sections={contactPageData.sections} />
      ) : (
        /* Fallback: render static widgets when CMS is unavailable */
        <>
          <ContactForm />
          <ContactOffices />
        </>
      )}
    </div>
  );
}
