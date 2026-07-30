import { getStrapiURL } from "./strapi";
import type {
  HomePageData,
  ModelsPageData,
  ModelsIndexPageData,
  ThemeConfig,
  FooterData,
  HeaderData,
  CareersPageData,
  ContactPageData,
  AboutPageData,
  PricingPageData,
  DeveloperApiPageData,
  JobApplicationPayload,
  BlogsPageData,
  BlogListing,
  BlogDetailData,
  ResearchPapersPageData,
  ResearchPaperListing,
  CaseStudiesPageData,
  CaseStudyListing,
  CaseStudyDetailData,
  WhitePaperPageData,
  UseCasesPageData,
  UseCaseData,
  UseCaseCategoryGroup,
} from "./types";

/**
 * Cache tags used for on-demand revalidation.
 * Strapi webhook hits /api/revalidate?tag=<tag> to purge.
 */
export const CACHE_TAGS = {
  homePage: "home-page",
  theme: "theme-config",
  header: "header",
  footer: "footer",
  modelsPage: (slug: string) => `models-page-${slug}`,
  modelsPages: "models-pages",
  modelsIndexPage: "models-index-page",
  careersPage: "careers-page",
  contactPage: "contact-page",
  aboutPage: "about-page",
  pricingPage: "pricing-page",
  developerApiPage: "developer-api-page",
  blogsPage: "blogs-page",
  blogs: "blogs",
  blog: (slug: string) => `blog-${slug}`,
  researchPapersPage: "research-papers-page",
  researchPapers: "research-papers",
  caseStudiesPage: "case-studies-page",
  caseStudies: "case-studies",
  caseStudy: (slug: string) => `case-study-${slug}`,
  whitePaperPage: "white-paper-page",
  useCasesPage: "use-cases-page",
  useCases: "use-cases",
  /**
   * Named `singleUseCase` rather than `useCase`: a `use`-prefixed callable
   * trips the react-hooks lint rule when invoked outside a component.
   */
  singleUseCase: (slug: string) => `use-case-${slug}`,
} as const;

export async function getHomePage(): Promise<HomePageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/home-page"), {
      next: { tags: [CACHE_TAGS.homePage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getThemeConfig(): Promise<ThemeConfig | null> {
  try {
    const res = await fetch(getStrapiURL("/api/theme-config"), {
      next: { tags: [CACHE_TAGS.theme] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getFooter(): Promise<FooterData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/footer"), {
      next: { tags: [CACHE_TAGS.footer] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getHeader(): Promise<HeaderData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/header"), {
      next: { tags: [CACHE_TAGS.header] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getCareersPage(): Promise<CareersPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/careers-page/full"), {
      next: { tags: [CACHE_TAGS.careersPage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getContactPage(): Promise<ContactPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/contact-page/full"), {
      next: { tags: [CACHE_TAGS.contactPage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/about-page/full"), {
      next: { tags: [CACHE_TAGS.aboutPage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getPricingPage(): Promise<PricingPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/pricing-page/full"), {
      next: { tags: [CACHE_TAGS.pricingPage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getDeveloperApiPage(): Promise<DeveloperApiPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/developer-api-page/full"), {
      next: { tags: [CACHE_TAGS.developerApiPage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getBlogsPage(): Promise<BlogsPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/blogs-page/full"), {
      next: { tags: [CACHE_TAGS.blogsPage, CACHE_TAGS.blogs] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDetailData | null> {
  try {
    const res = await fetch(getStrapiURL(`/api/blogs/slug/${slug}`), {
      next: { tags: [CACHE_TAGS.blogs, CACHE_TAGS.blog(slug)] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * All published slugs, used to pre-render blog detail routes.
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      getStrapiURL("/api/blogs/listing?pageSize=48&withCategories=false"),
      { next: { tags: [CACHE_TAGS.blogs] } },
    );

    if (!res.ok) return [];

    const json = await res.json();
    return (json.data?.blogs ?? []).map((blog: { slug: string }) => blog.slug);
  } catch {
    return [];
  }
}

/**
 * Client-side "Load more" / category switching on the blogs listing.
 * Not cached — the grid drives this from user interaction.
 */
export async function getBlogListing(params: {
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<BlogListing | null> {
  const query = new URLSearchParams({ withCategories: "false" });
  if (params.category && params.category !== "all") query.set("category", params.category);
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);

  try {
    const res = await fetch(getStrapiURL(`/api/blogs/listing?${query.toString()}`));

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getResearchPapersPage(): Promise<ResearchPapersPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/research-papers-page/full"), {
      next: { tags: [CACHE_TAGS.researchPapersPage, CACHE_TAGS.researchPapers] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Client-side paging / domain filtering on the research papers explorer.
 * Not cached — the explorer drives this from user interaction.
 */
export async function getResearchPaperListing(params: {
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<ResearchPaperListing | null> {
  const query = new URLSearchParams({ withCategories: "false" });
  if (params.category && params.category !== "all") query.set("category", params.category);
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);

  try {
    const res = await fetch(
      getStrapiURL(`/api/research-papers/listing?${query.toString()}`),
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getCaseStudiesPage(): Promise<CaseStudiesPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/case-studies-page/full"), {
      next: { tags: [CACHE_TAGS.caseStudiesPage, CACHE_TAGS.caseStudies] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyDetailData | null> {
  try {
    const res = await fetch(getStrapiURL(`/api/case-studies/slug/${slug}`), {
      next: { tags: [CACHE_TAGS.caseStudies, CACHE_TAGS.caseStudy(slug)] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * All published slugs, used to pre-render case study detail routes.
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      getStrapiURL("/api/case-studies/listing?pageSize=48&withCategories=false"),
      { next: { tags: [CACHE_TAGS.caseStudies] } },
    );

    if (!res.ok) return [];

    const json = await res.json();
    return (json.data?.caseStudies ?? []).map(
      (study: { slug: string }) => study.slug,
    );
  } catch {
    return [];
  }
}

/**
 * Client-side "Load more" / category switching on the case studies portfolio.
 * Not cached — the grid drives this from user interaction.
 */
export async function getCaseStudyListing(params: {
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<CaseStudyListing | null> {
  const query = new URLSearchParams({ withCategories: "false" });
  if (params.category && params.category !== "all") query.set("category", params.category);
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);

  try {
    const res = await fetch(
      getStrapiURL(`/api/case-studies/listing?${query.toString()}`),
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getWhitePaperPage(): Promise<WhitePaperPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/white-paper-page/full"), {
      next: { tags: [CACHE_TAGS.whitePaperPage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getUseCasesPage(): Promise<UseCasesPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/use-cases-page/full"), {
      next: { tags: [CACHE_TAGS.useCasesPage, CACHE_TAGS.useCases] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getUseCaseBySlug(slug: string): Promise<UseCaseData | null> {
  try {
    const res = await fetch(getStrapiURL(`/api/use-cases/slug/${slug}`), {
      next: { tags: [CACHE_TAGS.useCases, CACHE_TAGS.singleUseCase(slug)] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Grouped categories with their use case cards. Also the source of the slug
 * list used to pre-render detail routes.
 */
export async function getUseCaseDirectory(): Promise<UseCaseCategoryGroup[]> {
  try {
    const res = await fetch(getStrapiURL("/api/use-cases/directory"), {
      next: { tags: [CACHE_TAGS.useCases] },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function getAllUseCaseSlugs(): Promise<string[]> {
  const categories = await getUseCaseDirectory();
  return categories.flatMap((cat) => cat.items.map((item) => item.slug));
}

/**
 * Submits an application to the careers registry.
 * Client-side call — not cached, and errors surface to the form.
 */
export async function submitJobApplication(
  payload: JobApplicationPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(getStrapiURL("/api/job-applications/apply"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      return {
        ok: false,
        error: json?.error?.message ?? "Submission failed. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection." };
  }
}

export async function getModelsIndexPage(): Promise<ModelsIndexPageData | null> {
  try {
    const res = await fetch(getStrapiURL("/api/models-index-page/full"), {
      next: { tags: [CACHE_TAGS.modelsIndexPage] },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Slugs of every published model page, used to pre-render the routes. Falls
 * back to the two original specialist pages when the CMS is unreachable so a
 * build never loses them.
 */
export async function getAllModelsPageSlugs(): Promise<string[]> {
  try {
    const res = await fetch(getStrapiURL("/api/models-pages/slugs"), {
      next: { tags: [CACHE_TAGS.modelsPages] },
    });

    if (!res.ok) return ["dermatology", "scribe"];

    const json = await res.json();
    const slugs = (json.data ?? []) as string[];

    return slugs.length > 0 ? slugs : ["dermatology", "scribe"];
  } catch {
    return ["dermatology", "scribe"];
  }
}

export async function getModelsPage(slug: string): Promise<ModelsPageData | null> {
  try {
    const res = await fetch(
      getStrapiURL(`/api/models-page/${slug}`),
      { next: { tags: [CACHE_TAGS.modelsPage(slug)] } },
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
