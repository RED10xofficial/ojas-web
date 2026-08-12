"use client";

import { motion } from "motion/react";
import { User } from "lucide-react";
import type { IvfTeamSection, StrapiMedia } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";
import { getStrapiMedia } from "@/app/lib/strapi";
import ScrollHighlightParagraph from "../components/ScrollHighlightParagraph";

const defaultMembers = [
  {
    name: "Abhishek Tomar",
    role: "CTO",
    description:
      "MIT Media Lab, 20+ years computer vision architect behind every Ojas AI model.",
  },
  {
    name: "Pankaj Raut",
    role: "CEO",
    description:
      "Built 3D scanning recognized by MIT and Harvard, 600+ deployments, brought Lenskart and Indian defence as clients.",
  },
  {
    name: "Abhijit Patil",
    role: "COO",
    description:
      "Set up production for BrahMos Missile, delivered to 600+ institutions, 90%+ retention.",
  },
];

/** "Abhishek Tomar" → "AT", shown on the placeholder headshot. */
function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function IvfTeamSection({
  data,
  wrapperClass,
}: {
  data?: IvfTeamSection;
  wrapperClass?: string;
}) {
  const title = data?.title ?? "The Founding Team";
  const members: {
    name: string;
    role: string;
    description: string;
    photo?: StrapiMedia;
  }[] = data?.members?.length ? data.members : defaultMembers;
  const closingText =
    data?.closingText ??
    "We already sell to hospitals, state governments, and IVF centres. This partnership program is how we bring the full AI and hardware stack to select fertility clinics for the first time.";

  return (
    <section
      id="team"
      className={cn("scroll-mt-28 sm:scroll-mt-32 py-16 sm:py-24 bg-bg-page", wrapperClass)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-24 sm:text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {members.map((member, idx) => {
            const photoUrl = getStrapiMedia(member.photo?.url);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col bg-white border border-brand-subtle rounded-2xl p-5 sm:p-6 shadow-sm hover:border-brand-blue hover:shadow-lg transition-all"
              >
                <div className="relative w-full h-44 sm:h-48 mb-5 rounded-xl overflow-hidden bg-bg-page border border-brand-subtle flex flex-col items-center justify-center">
                  {photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="w-14 h-14 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-2">
                        <User className="w-6 h-6" />
                      </span>
                      <span className="text-14 font-display font-medium text-text-primary">
                        {getInitials(member.name)}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-18 sm:text-20 leading-[1.2] font-display font-medium text-text-primary">
                  {member.name}
                </h3>
                <p className="text-11 uppercase tracking-widest font-semibold text-brand-blue mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-14 sm:text-16 leading-relaxed text-text-secondary font-medium">
                  {member.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {closingText && <ScrollHighlightParagraph text={closingText} />}
      </div>
    </section>
  );
}
