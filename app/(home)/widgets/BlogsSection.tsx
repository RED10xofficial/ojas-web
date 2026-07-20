"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { BlogsSection as BlogsSectionData } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultBlogs = [
  { title: "The Future of Root-Cause Healing", excerpt: "Exploring how multi-omic data is revolutionizing chronic disease management...", date: "May 12, 2026", imageUrl: null as string | null },
  { title: "Vedic Science meets Epigenomics", excerpt: "Bridging ancient wisdom with modern biological transformers for precise diagnostics...", date: "May 08, 2026", imageUrl: null as string | null },
  { title: "Data Privacy in Bio-Intelligence", excerpt: "How OJAS implements zero-trust architecture for sensitive clinical data...", date: "May 01, 2026", imageUrl: null as string | null },
];

export default function BlogsSection({ data, wrapperClass }: { data?: BlogsSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Our Blogs";
  const blogs = data?.blogs?.map((b) => ({
    title: b.title,
    excerpt: b.excerpt ?? "",
    date: b.date ?? "",
    imageUrl: getStrapiMedia(b.image?.url ?? null),
  })) ?? defaultBlogs;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/20", wrapperClass)} id="resources">
      <div className="global-container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">{title}</h2>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {blogs.map((blog, idx) => (
            <motion.div key={idx} whileHover={{ y: -4 }} className="group cursor-pointer">
              <div className="bg-slate-100 rounded-2xl aspect-16/10 mb-5 overflow-hidden">
                {blog.imageUrl ? (
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-110 transition-transform duration-500" />
                )}
              </div>
              <p className="text-11 font-bold text-brand-blue uppercase tracking-widest mb-2">{blog.date}</p>
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-brand-blue transition-colors text-text-primary">{blog.title}</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed mb-4">{blog.excerpt}</p>
              <div className="flex items-center gap-2 text-text-primary font-bold text-xs">
                Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
