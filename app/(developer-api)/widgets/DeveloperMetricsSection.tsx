import BenchmarksSection from "@/app/(home)/widgets/BenchmarksSection";
import type { BenchmarksSection as BenchmarksSectionData } from "@/app/lib/types";

/*
 * The metrics block reuses the home benchmarks widget verbatim. In the CMS the
 * section is authored as `home-page.home-benchmarks-section`, which SectionRenderer
 * maps straight to BenchmarksSection — this wrapper backs the static fallback.
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
