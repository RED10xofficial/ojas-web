import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogBySlug } from "@/app/lib/api";
import { buildSeoMetadata } from "@/app/lib/seo";
import SeoJsonLd from "@/app/components/SeoJsonLd";
import ResourcesTopHeader from "@/app/components/ResourcesTopHeader";
import BlogDetail from "../../widgets/BlogDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Blog Not Found | OJAS" };
  }

  return buildSeoMetadata(post.seo, {
    title: `${post.title} | OJAS Blogs`,
    description: post.excerpt || "OJAS Clinical Gazette article.",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) notFound();

  return (
    <div id="blog-detail">
      <SeoJsonLd structuredData={post.seo?.structuredData} />
      <ResourcesTopHeader />
      <BlogDetail post={post} />
    </div>
  );
}
