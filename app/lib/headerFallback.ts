import type { HeaderData } from "@/app/lib/types";

/* ─── Header fallback data (used when Strapi returns nothing) ─── */
export const defaultHeaderData: HeaderData = {
  logo: { text: "OJAS", linkUrl: "/" },
  navLinks: [
    {
      id: 1,
      label: "Models",
      hasDropdown: true,
      viewAllLabel: "View all models",
      viewAllHref: "/models",
      menuBlocks: [
        {
          id: 1,
          heading: "Specialist Models",
          headingIcon: "Activity",
          links: [
            {
              id: 1,
              title: "Dermatology",
              href: "/models/dermatology",
              icon: "Activity",
              description: "Skin condition analysis",
            },
            {
              id: 2,
              title: "Scribe",
              href: "/models/scribe",
              icon: "Brain",
              description: "Ambient AI documentation",
            },
            {
              id: 3,
              title: "Gynecology",
              href: "/models/gynecology",
              icon: "Users",
              description: "Reproductive health AI",
            },
            {
              id: 4,
              title: "Nutrition",
              href: "/models/nutrition",
              icon: "Apple",
              description: "Dietary analysis",
            },
            {
              id: 5,
              title: "Oncology",
              href: "/models/oncology",
              icon: "Dna",
              description: "Cancer screening",
            },
            {
              id: 6,
              title: "Ophthalmology",
              href: "/models/ophthalmology",
              icon: "Eye",
              description: "Ocular diagnostics",
            },
          ],
        },
        {
          id: 2,
          heading: "More Models",
          headingIcon: "Heart",
          links: [
            {
              id: 7,
              title: "Cardiology",
              href: "/models/cardiology",
              icon: "Heart",
              description: "Cardiac analysis",
            },
            {
              id: 8,
              title: "Pathology",
              href: "/models/pathology",
              icon: "Microscope",
              description: "Lab diagnostics",
            },
            {
              id: 9,
              title: "Nephrology",
              href: "/models/nephrology",
              icon: "Droplet",
              description: "Kidney function AI",
            },
            {
              id: 10,
              title: "Endocrinology",
              href: "/models/endocrinology",
              icon: "Zap",
              description: "Metabolic analysis",
            },
            {
              id: 11,
              title: "Gastroenterology",
              href: "/models/gastroenterology",
              icon: "TrendingUp",
              description: "GI diagnostics",
            },
            {
              id: 12,
              title: "STDs",
              href: "/models/stds",
              icon: "ShieldAlert",
              description: "STI detection",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Developer API",
      href: "/developer-api",
    },
    {
      id: 3,
      label: "Use Cases",
      hasDropdown: true,
      viewAllLabel: "Explore all",
      viewAllHref: "/use-cases",
      menuBlocks: [
        {
          id: 1,
          heading: "Skin Health & Dermatology",
          headingIcon: "Activity",
          links: [
            {
              id: 1,
              title: "AI Skin Lesion Analysis",
              href: "/use-cases/lesion-analysis",
            },
            {
              id: 2,
              title: "Differential Diagnosis",
              href: "/use-cases/differential-diagnosis",
            },
            {
              id: 3,
              title: "Skin Cancer Triage",
              href: "/use-cases/skin-cancer-triage",
            },
            {
              id: 4,
              title: "Wound Assessment",
              href: "/use-cases/wound-assessment",
            },
            {
              id: 5,
              title: "Teledermatology",
              href: "/use-cases/teledermatology",
            },
          ],
        },
        {
          id: 2,
          heading: "Ambient AI & Scribing",
          headingIcon: "Brain",
          links: [
            {
              id: 6,
              title: "Real-Time Documentation",
              href: "/use-cases/realtime-doc",
            },
            { id: 7, title: "Ambient AI Scribe", href: "/use-cases/scribe" },
            {
              id: 8,
              title: "Automated Medical Coding",
              href: "/use-cases/coding",
            },
            { id: 9, title: "EHR-Integrated AI", href: "/use-cases/ehr" },
            { id: 10, title: "Voice Order Entry", href: "/use-cases/voice" },
          ],
        },
        {
          id: 3,
          heading: "Digital Care & Predictions",
          headingIcon: "TrendingUp",
          links: [
            { id: 11, title: "AI Prediction", href: "/use-cases/gynecology" },
            {
              id: 12,
              title: "Pregnancy Monitoring",
              href: "/use-cases/pregnancy",
            },
            { id: 13, title: "MMR Prediction", href: "/use-cases/mmr" },
            {
              id: 14,
              title: "Digital Front Door",
              href: "/use-cases/digital-front-door",
            },
            {
              id: 15,
              title: "Clinical API Gateway",
              href: "/use-cases/api-gateway",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      label: "Pricing",
      href: "/pricing",
    },
    {
      id: 5,
      label: "Company",
      hasDropdown: true,
      menuBlocks: [
        {
          id: 1,
          links: [
            {
              id: 1,
              title: "About Us",
              href: "/about-us",
              icon: "Users",
              description: "Our mission & team",
            },
            {
              id: 2,
              title: "Careers",
              href: "/careers",
              icon: "Briefcase",
              description: "Join the team",
            },
            {
              id: 3,
              title: "Contact",
              href: "/contact-us",
              icon: "Mail",
              description: "Get in touch",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      label: "Resources",
      hasDropdown: true,
      menuBlocks: [
        {
          id: 1,
          links: [
            {
              id: 1,
              title: "White Paper",
              href: "/white-paper",
              icon: "FileText",
              description: "Technical deep-dives",
            },
            {
              id: 2,
              title: "Research Papers",
              href: "/research-papers",
              icon: "BookOpen",
              description: "Peer-reviewed publications",
            },
            {
              id: 3,
              title: "Blogs",
              href: "/blogs",
              icon: "Newspaper",
              description: "Insights & updates",
            },
            {
              id: 4,
              title: "Case Studies",
              href: "/case-studies",
              icon: "CheckCircle2",
              description: "Real-world results",
            },
          ],
        },
      ],
    },
  ],
  loginCta: { title: "Login", url: "/login" },
  signupCta: { title: "Sign Up", url: "/signup" },
};
