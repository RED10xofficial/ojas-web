import { Star } from "lucide-react";
import type { DoctorReviewsSection as DoctorReviewsSectionData } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultReviews: NonNullable<DoctorReviewsSectionData["reviews"]> = [
  { id: 1, rating: 5, quote: "OJAS has fundamentally transformed how I diagnostic chronic eczema. Its ability to map gut biomarkers to skin symptoms is unprecedented.", doctorName: "Dr. Sarah Thompson", doctorTitle: "Head of Dermatology, NY-Med", hospital: "NY-Med" },
  { id: 2, rating: 5, quote: "OJAS has fundamentally transformed how I diagnostic chronic eczema. Its ability to map gut biomarkers to skin symptoms is unprecedented.", doctorName: "Dr. Sarah Thompson", doctorTitle: "Head of Dermatology, NY-Med", hospital: "NY-Med" },
  { id: 3, rating: 5, quote: "OJAS has fundamentally transformed how I diagnostic chronic eczema. Its ability to map gut biomarkers to skin symptoms is unprecedented.", doctorName: "Dr. Sarah Thompson", doctorTitle: "Head of Dermatology, NY-Med", hospital: "NY-Med" },
];

export default function DoctorReviewsSection({ data, wrapperClass }: { data?: DoctorReviewsSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Reviews of Doctors";
  const subtitle = data?.subtitle;
  const reviews = data?.reviews ?? defaultReviews;

  return (
    <section className={cn("py-16 sm:py-24 bg-bg-page/50", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          {subtitle && <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">{subtitle}</p>}
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">{title}</h2>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-subtle shadow-sm shadow-brand-dark/5 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }, (_, s) => (
                  <Star key={s} size={16} className="fill-brand-blue text-brand-blue" />
                ))}
              </div>
              <p className="text-text-secondary mb-6 italic font-medium">
                &quot;{review.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                {review.avatar ? (
                  <img src={getStrapiMedia(review.avatar.url) ?? ""} alt={review.doctorName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-subtle" />
                )}
                <div>
                  <h4 className="font-bold text-sm text-text-secondary">{review.doctorName}</h4>
                  <p className="text-xs text-text-accent font-medium">{review.doctorTitle ?? review.hospital}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
