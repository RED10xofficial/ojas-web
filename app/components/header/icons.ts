import { createElement } from "react";
import {
  Activity,
  Brain,
  Users,
  Apple,
  Dna,
  Eye,
  ShieldAlert,
  Zap,
  Droplet,
  Heart,
  Microscope,
  TrendingUp,
  FileText,
  BookOpen,
  Newspaper,
  CheckCircle2,
  Briefcase,
  Mail,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

/* ─── Maps the icon names stored in Strapi to lucide components ─── */
const iconMap: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Users,
  Apple,
  Dna,
  Eye,
  ShieldAlert,
  Zap,
  Droplet,
  Heart,
  Microscope,
  TrendingUp,
  FileText,
  BookOpen,
  Newspaper,
  CheckCircle2,
  Briefcase,
  Mail,
};

/** Whether `name` resolves to a known icon — useful for layout decisions. */
export const hasIcon = (name?: string): boolean =>
  Boolean(name && iconMap[name]);

/** Renders the icon registered under `name`, or nothing if it is unknown. */
export function Icon({ name, ...props }: { name?: string } & LucideProps) {
  const icon = name ? iconMap[name] : undefined;
  return icon ? createElement(icon, props) : null;
}
