import BenchmarksSection from "@/app/(home)/widgets/BenchmarksSection";
import type { BenchmarksSection as BenchmarksSectionData } from "@/app/lib/types";

/*
 * This is the home benchmarks widget, reused as-is. In the CMS it's authored as
 * `home-page.home-benchmarks-section` and SectionRenderer maps it straight to
 * BenchmarksSection, so this wrapper is only here for the static fallback.
 */
export default function DeveloperMetricsSection({
  data,
  wrapperClass,
}: {
  data?: BenchmarksSectionData;
  wrapperClass?: string;
}) {
  return <BenchmarksSection data={data} wrapperClass={wrapperClass} />;
}
