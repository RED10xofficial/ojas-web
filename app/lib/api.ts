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
  HospitalsPageData,
  IvfPageData,
  JobApplicationPayload,
  ContactSubmissionPayload,
  NewsletterSubscriptionPayload,
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

/* ─── Cache tags ─── */

/** Strapi webhooks purge these via /api/revalidate?tag=<tag>. */
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
  hospitalsPage: "hospitals-page",
  ivfPage: "ivf-page",
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
  /** Not `useCase`: a `use`-prefixed callable trips the react-hooks lint rule. */
  singleUseCase: (slug: string) => `use-case-${slug}`,
} as const;

/* ─── Fetch helpers ─── */

export type SubmitResult = { ok: true } | { ok: false; error: string };

export type ListingParams = {
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
};

const NETWORK_ERROR = "Network error. Please check your connection.";

/** GETs a Strapi endpoint and unwraps `json.data`. Null on any failure. */
async function get<T>(path: string, tags?: string[]): Promise<T | null> {
  try {
    const res = await fetch(
      getStrapiURL(path),
      tags ? { next: { tags } } : undefined,
    );
    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Same as `get`, but for routes that require the Strapi API token.
 * Server-only: STRAPI_API_TOKEN is never NEXT_PUBLIC_-prefixed, so it
 * resolves to undefined (not the real value) in any client bundle.
 */
async function getSecure<T>(path: string, tags?: string[]): Promise<T | null> {
  try {
    const res = await fetch(getStrapiURL(path), {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      ...(tags ? { next: { tags } } : {}),
    });
    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/** POSTs `{ data: payload }` and normalizes the server's error message. */
async function post(
  path: string,
  payload: unknown,
  failureMessage: string,
): Promise<SubmitResult> {
  try {
    const res = await fetch(getStrapiURL(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      return { ok: false, error: json?.error?.message ?? failureMessage };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}

/** Query string shared by the paginated listing endpoints. */
function listingQuery(params: ListingParams): string {
  const query = new URLSearchParams({ withCategories: "false" });
  if (params.category && params.category !== "all")
    query.set("category", params.category);
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);
  return query.toString();
}

/* ─── Site-wide singles ─── */

export const getThemeConfig = () =>
  getSecure<ThemeConfig>("/api/theme-config", [CACHE_TAGS.theme]);

export const getHeader = () =>
  getSecure<HeaderData>("/api/header", [CACHE_TAGS.header]);

export const getFooter = () =>
  getSecure<FooterData>("/api/footer", [CACHE_TAGS.footer]);

/* ─── Marketing pages ─── */

export const getHomePage = () =>
  getSecure<HomePageData>("/api/home-page", [CACHE_TAGS.homePage]);

export const getAboutPage = () =>
  getSecure<AboutPageData>("/api/about-page/full", [CACHE_TAGS.aboutPage]);

export const getCareersPage = () =>
  getSecure<CareersPageData>("/api/careers-page/full", [
    CACHE_TAGS.careersPage,
  ]);

export const getContactPage = () =>
  getSecure<ContactPageData>("/api/contact-page/full", [
    CACHE_TAGS.contactPage,
  ]);

export const getPricingPage = () =>
  getSecure<PricingPageData>("/api/pricing-page/full", [
    CACHE_TAGS.pricingPage,
  ]);

export const getDeveloperApiPage = () =>
  getSecure<DeveloperApiPageData>("/api/developer-api-page/full", [
    CACHE_TAGS.developerApiPage,
  ]);

export const getHospitalsPage = () =>
  getSecure<HospitalsPageData>("/api/hospitals-page/full", [
    CACHE_TAGS.hospitalsPage,
  ]);

export const getIvfPage = () =>
  getSecure<IvfPageData>("/api/ivf-page/full", [CACHE_TAGS.ivfPage]);

export const getWhitePaperPage = () =>
  getSecure<WhitePaperPageData>("/api/white-paper-page/full", [
    CACHE_TAGS.whitePaperPage,
  ]);

/* ─── Models ─── */

/** Kept so a build never loses the original specialist pages. */
const FALLBACK_MODEL_SLUGS = ["dermatology", "scribe"];

export const getModelsIndexPage = () =>
  getSecure<ModelsIndexPageData>("/api/models-index-page/full", [
    CACHE_TAGS.modelsIndexPage,
  ]);

export const getModelsPage = (slug: string) =>
  getSecure<ModelsPageData>(`/api/models-page/${slug}`, [
    CACHE_TAGS.modelsPage(slug),
  ]);

/** Slugs for pre-rendering the model routes; falls back if the CMS is down. */
export async function getAllModelsPageSlugs(): Promise<string[]> {
  const slugs = await getSecure<string[]>("/api/models-pages/slugs", [
    CACHE_TAGS.modelsPages,
  ]);
  return slugs?.length ? slugs : FALLBACK_MODEL_SLUGS;
}

/* ─── Blogs ─── */

export const getBlogsPage = () =>
  getSecure<BlogsPageData>("/api/blogs-page/full", [
    CACHE_TAGS.blogsPage,
    CACHE_TAGS.blogs,
  ]);

export const getBlogBySlug = (slug: string) =>
  getSecure<BlogDetailData>(`/api/blogs/slug/${slug}`, [
    CACHE_TAGS.blogs,
    CACHE_TAGS.blog(slug),
  ]);

/** Published slugs, used to pre-render blog detail routes. */
export async function getAllBlogSlugs(): Promise<string[]> {
  const listing = await get<BlogListing>(
    "/api/blogs/listing?pageSize=48&withCategories=false",
    [CACHE_TAGS.blogs],
  );
  return listing?.blogs?.map((blog) => blog.slug) ?? [];
}

/** Uncached: driven by "Load more" / category switching in the grid. */
export const getBlogListing = (params: ListingParams) =>
  get<BlogListing>(`/api/blogs/listing?${listingQuery(params)}`);

/* ─── Research papers ─── */

export const getResearchPapersPage = () =>
  getSecure<ResearchPapersPageData>("/api/research-papers-page/full", [
    CACHE_TAGS.researchPapersPage,
    CACHE_TAGS.researchPapers,
  ]);

/** Uncached: driven by paging / domain filtering in the explorer. */
export const getResearchPaperListing = (params: ListingParams) =>
  get<ResearchPaperListing>(
    `/api/research-papers/listing?${listingQuery(params)}`,
  );

/* ─── Case studies ─── */

export const getCaseStudiesPage = () =>
  getSecure<CaseStudiesPageData>("/api/case-studies-page/full", [
    CACHE_TAGS.caseStudiesPage,
    CACHE_TAGS.caseStudies,
  ]);

export const getCaseStudyBySlug = (slug: string) =>
  getSecure<CaseStudyDetailData>(`/api/case-studies/slug/${slug}`, [
    CACHE_TAGS.caseStudies,
    CACHE_TAGS.caseStudy(slug),
  ]);

/** Published slugs, used to pre-render case study detail routes. */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  const listing = await get<CaseStudyListing>(
    "/api/case-studies/listing?pageSize=48&withCategories=false",
    [CACHE_TAGS.caseStudies],
  );
  return listing?.caseStudies?.map((study) => study.slug) ?? [];
}

/** Uncached: driven by "Load more" / category switching in the portfolio. */
export const getCaseStudyListing = (params: ListingParams) =>
  get<CaseStudyListing>(`/api/case-studies/listing?${listingQuery(params)}`);

/* ─── Use cases ─── */

export const getUseCasesPage = () =>
  getSecure<UseCasesPageData>("/api/use-cases-page/full", [
    CACHE_TAGS.useCasesPage,
    CACHE_TAGS.useCases,
  ]);

export const getUseCaseBySlug = (slug: string) =>
  getSecure<UseCaseData>(`/api/use-cases/slug/${slug}`, [
    CACHE_TAGS.useCases,
    CACHE_TAGS.singleUseCase(slug),
  ]);

/** Categories with their use case cards; also the source of the slug list. */
export async function getUseCaseDirectory(): Promise<UseCaseCategoryGroup[]> {
  const categories = await getSecure<UseCaseCategoryGroup[]>(
    "/api/use-cases/directory",
    [CACHE_TAGS.useCases],
  );
  return categories ?? [];
}

export async function getAllUseCaseSlugs(): Promise<string[]> {
  const categories = await getUseCaseDirectory();
  return categories.flatMap((cat) => cat.items.map((item) => item.slug));
}

/* ─── Form submissions (client-side, uncached) ─── */

export const submitJobApplication = (payload: JobApplicationPayload) =>
  post(
    "/api/job-applications/apply",
    payload,
    "Submission failed. Please try again.",
  );

export const submitContactForm = (payload: ContactSubmissionPayload) =>
  post(
    "/api/contact-submissions/submit",
    payload,
    "Submission failed. Please try again.",
  );

export const subscribeToNewsletter = (payload: NewsletterSubscriptionPayload) =>
  post(
    "/api/newsletter-subscribers/subscribe",
    payload,
    "Subscription failed. Please try again.",
  );
