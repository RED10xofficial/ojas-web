"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import type {
  CareersPositionsSection,
  CareersJobDepartment,
  CareersJobRole,
} from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultDepartments: CareersJobDepartment[] = [
  {
    department: "Engineering & Architecture",
    roles: [
      {
        roleId: "ENG-01",
        title: "Lead Bio-Intelligence Engineer",
        type: "Full-Time",
        location: "Bengaluru / Hybrid",
        description:
          "Lead the buildout of custom multimodal model endpoints, working on neural embeddings, image classification, and direct inference scaling.",
        requirements: [
          "5+ years experience with PyTorch & Transformers",
          "Strong experience deploying production model services in Cloud Run / AWS",
          "M.S. or B.S. in Computer Science or similar field",
        ],
      },
      {
        roleId: "ENG-02",
        title: "Senior EHR Integration Engineer",
        type: "Full-Time",
        location: "Remote / Worldwide",
        description:
          "Build bulletproof, HL7/FHIR compliant pipelines to sync ambient transcripts directly into major EHR providers such as Epic, Cerner, and Athena.",
        requirements: [
          "Expertise in healthcare APIs, FHIR standards, and secure tunnels",
          "Familiarity with OAuth 2.0 and HIPAA security protocols",
          "Strong backend Node.js/Python microservices expertise",
        ],
      },
    ],
  },
  {
    department: "Clinical Scientific Research",
    roles: [
      {
        roleId: "SCI-01",
        title: "Principal Clinical Research Scientist",
        type: "Full-Time",
        location: "Mumbai / On-site",
        description:
          "Coordinate and lead medical-scientific validation trials for our skin health classifiers. Draft peer-reviewed reports to state regulatory boards.",
        requirements: [
          "MD/PhD in Clinical Dermatology, Bio-informatics, or Oncology",
          "Proven track record of medical journal indexing (PubMed / Scopus)",
          "Experience interacting with institutional review boards (IRBs)",
        ],
      },
    ],
  },
  {
    department: "Product Design & Strategy",
    roles: [
      {
        roleId: "PROD-01",
        title: "Lead Clinical UX/UI Architect",
        type: "Full-Time",
        location: "Remote / Hybrid (Bengaluru)",
        description:
          "Design the absolute future of ambient medical interfaces. Ensure the physician-symptom-dashboard remains cognitively transparent.",
        requirements: [
          "Expertise designing healthcare tools, mobile platforms or dense clinical charts",
          "Familiarity with motion design guidelines and responsive viewport scales",
          "Strong portfolio demonstrating typography, grid discipline, and complex layout aesthetics",
        ],
      },
    ],
  },
];

interface CareersPositionsProps {
  data?: CareersPositionsSection;
  wrapperClass?: string;
  onRoleSelect?: (roleTitle: string, jobSlug?: string | null) => void;
  /* Anchor of the application form; CMS-configurable, so it is passed in */
  formAnchorId?: string;
}

export default function CareersPositions({
  data,
  wrapperClass,
  onRoleSelect,
  formAnchorId = "apply-form",
}: CareersPositionsProps) {
  const [openRole, setOpenRole] = useState<string | null>(null);

  /**
   * "Proceed to Application" picks the role and scrolls down to the form.
   * If the role has an external applyUrl, that takes over instead.
   */
  const handleProceed = (
    e: React.MouseEvent<HTMLAnchorElement>,
    role: CareersJobRole,
  ) => {
    e.preventDefault();
    onRoleSelect?.(role.title, role.slug);

    document
      .getElementById(formAnchorId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const badgeText = data?.badgeText ?? "Registry Index";
  const title = data?.title ?? "Current Vacant Positions";
  const departments = data?.departments?.length
    ? data.departments
    : defaultDepartments;

  return (
    <section className={cn("pb-16 sm:pb-24", wrapperClass)}>
      <div className="global-container mx-auto">
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
              {badgeText}
            </span>
            <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium text-text-primary mt-1">
              {title}
            </h2>
            {data?.description && (
              <p className="text-16 leading-relaxed text-text-secondary mt-2 max-w-2xl">
                {data.description}
              </p>
            )}
          </div>

          <div className="space-y-8">
            {departments.map((dept, idx) => (
              <div key={idx} className="space-y-4">
                {dept.department && (
                  <h3 className="text-xs font-black uppercase text-brand-blue bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-lg inline-block font-mono tracking-widest">
                    {dept.department}
                  </h3>
                )}

                <div className="grid grid-cols-1 gap-4">
                  {dept.roles.map((role, roleIdx) => {
                    /* roleId is optional in the CMS, so fall back to a positional key */
                    const key = role.roleId || `${idx}-${roleIdx}`;
                    const isOpen = openRole === key;

                    return (
                      <div
                        key={key}
                        className={`border rounded-2xl p-6 transition-all duration-300 bg-white ${
                          isOpen
                            ? "border-brand-blue shadow-md"
                            : "border-slate-200 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-4">
                          <div>
                            {role.roleId && (
                              <span className="text-[9px] font-mono text-brand-blue font-black tracking-widest bg-brand-blue/5 border border-brand-blue/20 rounded px-2 py-0.5">
                                {role.roleId}
                              </span>
                            )}
                            <h4 className="text-lg sm:text-28 font-display font-medium text-text-primary mt-2">
                              {role.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 mt-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              {role.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={12} className="text-brand-blue" />{" "}
                                  {role.location}
                                </span>
                              )}
                              {role.location && role.type && <span>&bull;</span>}
                              {role.type && (
                                <span className="flex items-center gap-1">
                                  <Clock size={12} className="text-emerald-500" />{" "}
                                  {role.type}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setOpenRole(isOpen ? null : key);
                              onRoleSelect?.(role.title, role.slug);
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                              isOpen
                                ? "bg-slate-100 text-slate-800"
                                : "bg-brand-blue text-white shadow-sm hover:bg-brand-dark"
                            }`}
                          >
                            {isOpen ? "Close Details" : "View Scope"}
                          </button>
                        </div>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-6 pt-6 border-t border-slate-100 space-y-4"
                            >
                              {role.description && (
                                <div>
                                  <h5 className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider">
                                    ROLE OVERVIEW
                                  </h5>
                                  <p className="text-16 leading-relaxed text-text-secondary mt-1">
                                    {role.description}
                                  </p>
                                </div>
                              )}

                              {role.requirements &&
                                role.requirements.length > 0 && (
                                  <div>
                                    <h5 className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider mb-2">
                                      EXPECTED STANDARDS
                                    </h5>
                                    <ul className="text-16 leading-relaxed text-text-secondary space-y-1.5 pl-4 list-disc">
                                      {role.requirements.map((req, rIdx) => (
                                        <li key={rIdx}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                              <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <a
                                  href={role.applyUrl || `#${formAnchorId}`}
                                  onClick={(e) => handleProceed(e, role)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline"
                                >
                                  Proceed to Application <ChevronRight size={14} />
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
