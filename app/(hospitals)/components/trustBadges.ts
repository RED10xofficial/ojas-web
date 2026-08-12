import {
  Award,
  Building2,
  Car,
  Eye,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { HospitalsTrustBadge } from "@/app/lib/types";
import { getStrapiMedia } from "@/app/lib/strapi";

export interface TrustBadge {
  id: string;
  label: string;
  Icon: LucideIcon;
  iconUrl: string | null;
}

/* Credential ticker shared by the hero and the CTA section. */
const defaultTrustBadges: TrustBadge[] = [
  { id: "rd", label: "10+ Years R&D Experience", Icon: Award, iconUrl: null },
  { id: "patents", label: "47 Granted Patents", Icon: ShieldCheck, iconUrl: null },
  {
    id: "deployments",
    label: "600+ Enterprise Deployments",
    Icon: Building2,
    iconUrl: null,
  },
  {
    id: "iitb",
    label: "Born at IIT Bombay",
    Icon: GraduationCap,
    iconUrl: null,
  },
  { id: "google", label: "Google", Icon: Sparkles, iconUrl: null },
  { id: "tata", label: "TATA", Icon: Landmark, iconUrl: null },
  { id: "mercedes", label: "Mercedes Benz", Icon: Car, iconUrl: null },
  { id: "aiims", label: "AIIMS", Icon: Stethoscope, iconUrl: null },
  { id: "lenskart", label: "Lenskart", Icon: Eye, iconUrl: null },
];

/** CMS badges keep their order and reuse the default icon in the same slot. */
export function resolveTrustBadges(badges?: HospitalsTrustBadge[]): TrustBadge[] {
  if (!badges?.length) return defaultTrustBadges;

  return badges.map((badge, idx) => ({
    id: String(badge.id),
    label: badge.title,
    Icon: defaultTrustBadges[idx % defaultTrustBadges.length].Icon,
    iconUrl: getStrapiMedia(badge.icon?.url),
  }));
}
