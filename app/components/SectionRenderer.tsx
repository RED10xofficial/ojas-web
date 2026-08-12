import type { CSSProperties } from "react";
import type {
  HomePageSection,
  ModelsPageSection,
  ModelsIndexPageSection,
  CareersPageSection,
  ContactPageSection,
  AboutPageSection,
  PricingPageSection,
  DeveloperApiPageSection,
  HospitalsPageSection,
  IvfPageSection,
  BlogsPageSection,
  ResearchPapersPageSection,
  CaseStudiesPageSection,
  WhitePaperPageSection,
  UseCasesPageSection,
  UseCaseSection,
  SectionStyle,
} from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { COMPONENT_MAP, PAGE_OVERRIDES } from "./section-renderer/registry";

type AnySection =
  | HomePageSection
  | ModelsPageSection
  | ModelsIndexPageSection
  | CareersPageSection
  | ContactPageSection
  | AboutPageSection
  | PricingPageSection
  | DeveloperApiPageSection
  | HospitalsPageSection
  | IvfPageSection
  | BlogsPageSection
  | ResearchPapersPageSection
  | CaseStudiesPageSection
  | WhitePaperPageSection
  | UseCasesPageSection
  | UseCaseSection;

/** Presentation fields the CMS adds per section, absent on some section types. */
type StyledSection = AnySection & {
  wrapperClass?: string;
  sectionStyle?: SectionStyle;
  anchorId?: string;
};

interface SectionRendererProps {
  sections: AnySection[];
  /** Page slug, used to look up per-page widget overrides. */
  slug?: string;
}

/** Turns the CMS style block into inline CSS; undefined when nothing is set. */
function buildSectionStyle(
  sectionStyle?: SectionStyle,
): CSSProperties | undefined {
  if (!sectionStyle) return undefined;

  const style: CSSProperties = {};
  if (sectionStyle.bgColor) style.backgroundColor = sectionStyle.bgColor;
  if (sectionStyle.textColor) style.color = sectionStyle.textColor;

  if (sectionStyle.bgImage) {
    const url = getStrapiMedia(sectionStyle.bgImage.url);
    if (url) {
      style.backgroundImage = `url(${url})`;
      style.backgroundSize = "cover";
      style.backgroundPosition = "center";
      style.backgroundRepeat = "no-repeat";
    }
  }

  return Object.keys(style).length > 0 ? style : undefined;
}

export default function SectionRenderer({
  sections,
  slug,
}: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const override = slug
          ? PAGE_OVERRIDES[`${slug}::${section.__component}`]
          : undefined;
        const Component = override ?? COMPONENT_MAP[section.__component];
        if (!Component) return null;

        const { wrapperClass, sectionStyle, anchorId } =
          section as StyledSection;
        const key = `${section.__component}-${section.id}`;
        const style = buildSectionStyle(sectionStyle);

        if (!style && !anchorId) {
          return (
            <Component key={key} data={section} wrapperClass={wrapperClass} />
          );
        }

        return (
          <div key={key} id={anchorId || undefined} style={style}>
            <Component data={section} wrapperClass={wrapperClass} />
          </div>
        );
      })}
    </>
  );
}
