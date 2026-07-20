import type { Metadata } from "next";
import type { SeoData } from "./types";
import { getStrapiMedia } from "./strapi";

interface SeoDefaults {
  title: string;
  description: string;
}

export function buildSeoMetadata(
  seo: SeoData | undefined | null,
  defaults: SeoDefaults
): Metadata {
  const title = seo?.metaTitle || defaults.title;
  const description = seo?.metaDescription || defaults.description;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const ogImageUrl = seo?.ogImage?.url ? getStrapiMedia(seo.ogImage.url) : null;
  const robots = seo?.robots || "index, follow";

  return {
    title,
    description,
    ...(seo?.canonicalURL && {
      alternates: { canonical: seo.canonicalURL },
    }),
    robots,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl && {
        images: [ogImageUrl],
      }),
    },
  };
}
