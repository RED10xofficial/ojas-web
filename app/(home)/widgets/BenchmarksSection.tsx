"use client";

import ScrollHighlightedText from "./ScrollHighlightedText";
import type { BenchmarksSection as BenchmarksSectionData } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultHeaders = ["Benchmark Layer", "Skin Vision", "Glass Health", "Sully AI", "ZenMD", "Freed AI", "Heidi AI", "DeepScribe", "OJAS INTEL"];
const defaultRows = [
  ["HealthBench 2.0 (Clinical QA)", "82.7%", "75.1%", "69.4%", "68.5%", "71.2%", "65.4%", "62.1%", "96.4%"],
  ["Expert-SWE Medical Core", "73.1%", "68.5%", "70.0%", "75.0%", "68.9%", "70.1%", "64.5%", "94.2%"],
  ["Multi-Omic Convergence", "54.6%", "60.0%", "48.8%", "50.1%", "42.3%", "45.6%", "38.9%", "98.1%"],
  ["Root-Cause Diagnostic Safety", "84.4%", "82.7%", "79.3%", "85.9%", "76.5%", "78.2%", "74.1%", "97.8%"],
];

export default function BenchmarksSection({ data, wrapperClass }: { data?: BenchmarksSectionData; wrapperClass?: string }) {
  const title = data?.title ?? "Frontier Performance Metrics";
  const description = data?.description ?? "Evaluating OJAS against legacy medical models across key diagnostic and multi-omic layers";

  const headers = data?.tableHeaders?.map((h) => h.label) ?? defaultHeaders;
  const rows = data?.tableRows?.map((r) => r.cells?.map((c) => c.value) ?? []) ?? defaultRows;

  const lastColIdx = headers.length - 1;

  return (
    <section className={cn("py-16 sm:py-24 bg-white", wrapperClass)} id="benchmarks">
      <div className="global-container mx-auto text-center">
        <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary">{title}</h2>
        <div className="text-text-secondary max-w-120 mx-auto text-base mb-12 font-medium">
          <ScrollHighlightedText text={description} />
        </div>

        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-brand-subtle shadow-lg bg-white p-2">
          <table className="w-full min-w-[1000px] border-collapse bg-white">
            <thead>
              <tr className="border-b border-brand-subtle">
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className={
                      idx === 0
                        ? "text-left py-6 px-8 font-display font-bold text-text-accent text-sm"
                        : idx === lastColIdx
                          ? "text-center py-6 px-8 bg-brand-blue/5 font-display font-black text-brand-blue rounded-t-2xl text-sm"
                          : "text-center py-6 px-4 font-display font-bold text-text-secondary text-xs uppercase tracking-tight"
                    }
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-subtle">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-brand-subtle/30 transition-colors">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={
                        j === 0
                          ? "py-8 px-8 font-bold text-text-secondary text-left"
                          : j === lastColIdx
                            ? "py-8 px-8 text-center font-black text-brand-blue bg-brand-blue/[0.02] text-xl"
                            : "py-8 px-4 text-center text-text-secondary font-semibold text-sm"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
