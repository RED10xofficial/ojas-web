import type { AboutTeamSection } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";
import { cn } from "@/app/lib/cn";

const defaultMembers = [
  {
    name: "Dr. Anand Verma",
    role: "Co-Founder & Chief Medical Officer",
    credentials: "Former Head of Integrative Derm, Apollo Systems",
    initials: "AV",
  },
  {
    name: "Dr. Sarah Thompson",
    role: "Head of Computational Science",
    credentials: "Computational Biology Research PhD, Stanford",
    initials: "ST",
  },
  {
    name: "Nikhil Deshmukh",
    role: "Chief Technology Officer",
    credentials: "Distributed Systems & Machine Learning Core",
    initials: "ND",
  },
];

/* Falls back to deriving initials when the CMS entry omits them. */
function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter((part) => !part.endsWith("."))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AboutTeam({
  data,
  wrapperClass,
}: {
  data?: AboutTeamSection;
  wrapperClass?: string;
}) {
  const badgeText = data?.badgeText ?? "GOVERNANCE";
  const title = data?.title ?? "OJAS Registry Steering Board";
  const members = data?.members?.length ? data.members : defaultMembers;

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="space-y-10">
          <div className="text-left">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
              {badgeText}
            </span>
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mt-2">
              {title}
            </h2>
            {data?.description && (
              <p className="text-16 leading-relaxed text-text-secondary mt-2 max-w-2xl">
                {data.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {members.map((member, idx) => {
              const photo =
                "photo" in member ? getStrapiMedia(member.photo?.url) : null;

              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 text-left shadow-sm flex flex-col justify-between hover:border-brand-blue transition-all"
                >
                  <div>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo}
                        referrerPolicy="no-referrer"
                        alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover border border-brand-blue/20 mb-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue font-bold tracking-tight mb-4">
                        {member.initials || initialsFor(member.name)}
                      </div>
                    )}
                    <h4 className="text-lg font-display font-bold text-slate-900">
                      {member.name}
                    </h4>
                    {member.role && (
                      <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue mt-1">
                        {member.role}
                      </p>
                    )}
                  </div>
                  {member.credentials && (
                    <p className="text-sm text-slate-400 mt-4 pt-4 border-t border-slate-100 leading-relaxed">
                      {member.credentials}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
