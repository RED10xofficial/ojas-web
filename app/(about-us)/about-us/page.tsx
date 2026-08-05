import type { Metadata } from "next";
import { getAboutPage } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import PageCustomCss from "@/app/components/PageCustomCss";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import PageTopHeader from "@/app/components/PageTopHeader";
import SectionRenderer from "@/app/components/SectionRenderer";

import AboutMissionVision from "../widgets/AboutMissionVision";
import AboutCoreValues from "../widgets/AboutCoreValues";
import AboutMilestones from "../widgets/AboutMilestones";
import AboutTeam from "../widgets/AboutTeam";

export async function generateMetadata(): Promise<Metadata> {
  const aboutPageData = await getAboutPage();
  return buildSeoMetadata(aboutPageData?.seo, {
    title: "About Us | OJAS",
    description:
      "Learn about OJAS — our mission, vision, values, milestones, and leadership team.",
  });
}

export default async function AboutUsPage() {
  const aboutPageData = await getAboutPage();

  return (
    <div id="about-us">
      <SeoJsonLd structuredData={aboutPageData?.seo?.structuredData} />
      <PageCustomCss css={aboutPageData?.customCss} pageId="about-us" />
      <PageTopHeader />

      {aboutPageData?.sections?.length ? (
        <SectionRenderer sections={aboutPageData.sections} />
      ) : (
        /* Fallback: render static widgets when CMS is unavailable */
        <>
          <AboutMissionVision />
          <AboutCoreValues />
          <AboutMilestones />
          <AboutTeam />
        </>
      )}
    </div>
  );
}
