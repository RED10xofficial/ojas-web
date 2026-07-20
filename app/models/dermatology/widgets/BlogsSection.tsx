import { ArrowRight } from "lucide-react";
import type { BlogsSection as BlogsSectionType } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultBlogs = [
  {
    title: "The Epigenomics of Chronic Atopic Skin Lesions",
    desc: "Analyzing the cellular activation thresholds of psoriasis and eczema through gut-lipid and microbiome sequence mapping.",
    date: "MAY 18, 2026",
    time: "6 Min Read",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "The Future of AI Integration in Dermatology Workflows",
    desc: "How real-time medical-grade digital imaging and automated data models are solving clinical overhead and retaining quality patient focus.",
    date: "MAY 12, 2026",
    time: "4 Min Read",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Vedic Constitutional Diagnostics in Modern Preventive Clinics",
    desc: "Synthesizing time-tested whole-systems medical wisdom with high-capacity neural networks to forecast autoimmune risks.",
    date: "APR 28, 2026",
    time: "8 Min Read",
    image: "https://images.unsplash.com/photo-1611073166153-26be24a27574?auto=format&fit=crop&w=600&q=80",
  },
];

export default function BlogsSection({ data, wrapperClass }: { data?: BlogsSectionType; wrapperClass?: string }) {
  const sectionTitle = data?.title ?? "Our Blogs";
  const blogs = data?.blogs?.map((b) => ({
    title: b.title,
    desc: b.excerpt ?? "",
    date: b.date ?? "",
    time: "",
    image: b.image?.url ?? "",
  })) ?? defaultBlogs;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/50 global-container mx-auto border-t border-brand-subtle", wrapperClass)}>
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">Our Latest Scientific Write-ups</p>
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">{sectionTitle}</h2>
        <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
      </div>

      <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
        {blogs.map((blog, idx) => (
          <div key={idx} className="bg-bg-surface rounded-2xl overflow-hidden border border-brand-subtle shadow-sm hover:shadow-md hover:shadow-brand-blue/5 transition-all flex flex-col justify-between group">
            <div className="relative aspect-video overflow-hidden border-b border-brand-subtle/50">
              <img
                src={blog.image}
                referrerPolicy="no-referrer"
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-11 text-brand-blue font-semibold uppercase tracking-wider">{blog.date}</span>
                <span className="text-11 text-text-accent font-semibold uppercase ml-4">{blog.time}</span>
                <h4 className="font-display font-extrabold text-base text-text-primary mt-3 mb-3 leading-tight uppercase">
                  {blog.title}
                </h4>
                <p className="text-xs text-text-secondary opacity-80 leading-relaxed font-semibold mb-6">
                  {blog.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 text-brand-blue font-bold text-xs select-none">
                Read Abstract <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
