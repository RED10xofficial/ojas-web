import { getStrapiURL } from "./strapi";
import type { HomePageData, ModelsPageData, ThemeConfig, FooterData, HeaderData } from "./types";

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
