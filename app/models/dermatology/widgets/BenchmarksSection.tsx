"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { DermaBenchmarksSection } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultHeaders = [
  { id: 1, label: "Benchmark Panels", highlighted: false },
  { id: 2, label: "ojas-derma-model", highlighted: true },
  { id: 3, label: "claude-opus-4.7", highlighted: false },
  { id: 4, label: "claude-sonnet-4.6", highlighted: false },
  { id: 5, label: "gemini-2.5-pro", highlighted: false },
  { id: 6, label: "gpt-5.5", highlighted: false },
];

const defaultRows = [
  { id: 1, cells: [{ id: 1, value: "Overall Summary" }, { id: 2, value: "76.8%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "62.7%", bgColor: "#101b2f", textColor: "#cbd5e1" }, { id: 4, value: "59.3%", bgColor: "#0c1424", textColor: "#94a3b8" }, { id: 5, value: "61.4%", bgColor: "#0e1c33", textColor: "#cbd5e1" }, { id: 6, value: "56.7%", bgColor: "#0a101d", textColor: "#94a3b8" }] },
  { id: 2, cells: [{ id: 1, value: "aiims - Infectious Diseases" }, { id: 2, value: "86.1%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "63.9%", bgColor: "#0e1c33", textColor: "#cbd5e1" }, { id: 4, value: "63.9%", bgColor: "#0e1c33", textColor: "#cbd5e1" }, { id: 5, value: "69.4%", bgColor: "#112447", textColor: "#cbd5e1" }, { id: 6, value: "47.2%", bgColor: "#080d19", textColor: "#64748b" }] },
  { id: 3, cells: [{ id: 1, value: "aiims - Inflammatory & Autoimmune" }, { id: 2, value: "90.0%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "72.0%", bgColor: "#172c54", textColor: "#cbd5e1" }, { id: 4, value: "58.0%", bgColor: "#0c1424", textColor: "#94a3b8" }, { id: 5, value: "68.0%", bgColor: "#132447", textColor: "#cbd5e1" }, { id: 6, value: "50.0%", bgColor: "#0d182a", textColor: "#94a3b8" }] },
  { id: 4, cells: [{ id: 1, value: "aiims - Adnexal & Pigmentary" }, { id: 2, value: "93.7%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "84.1%", bgColor: "#214cb2", textColor: "#ffffff" }, { id: 4, value: "79.4%", bgColor: "#1c3f96", textColor: "#ffffff" }, { id: 5, value: "73.0%", bgColor: "#172c54", textColor: "#cbd5e1" }, { id: 6, value: "69.8%", bgColor: "#132447", textColor: "#cbd5e1" }] },
  { id: 5, cells: [{ id: 1, value: "dermacon - Neoplastic (Skin Cancer)" }, { id: 2, value: "93.3%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "93.3%", bgColor: "#2563eb", textColor: "#ffffff" }, { id: 4, value: "86.7%", bgColor: "#214cb2", textColor: "#ffffff" }, { id: 5, value: "93.3%", bgColor: "#2563eb", textColor: "#ffffff" }, { id: 6, value: "66.7%", bgColor: "#132447", textColor: "#cbd5e1" }] },
  { id: 6, cells: [{ id: 1, value: "dermacon - Infectious Diseases" }, { id: 2, value: "99.3%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "55.0%", bgColor: "#0d182a", textColor: "#94a3b8" }, { id: 4, value: "55.7%", bgColor: "#0d182a", textColor: "#94a3b8" }, { id: 5, value: "59.3%", bgColor: "#0e1c33", textColor: "#cbd5e1" }, { id: 6, value: "49.3%", bgColor: "#080d19", textColor: "#64748b" }] },
  { id: 7, cells: [{ id: 1, value: "dermacon - Inflammatory & Autoimmune" }, { id: 2, value: "98.6%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "71.4%", bgColor: "#162a51", textColor: "#cbd5e1" }, { id: 4, value: "69.3%", bgColor: "#122245", textColor: "#cbd5e1" }, { id: 5, value: "73.6%", bgColor: "#172c54", textColor: "#cbd5e1" }, { id: 6, value: "64.3%", bgColor: "#0f1d37", textColor: "#94a3b8" }] },
  { id: 8, cells: [{ id: 1, value: "dermacon - Adnexal & Pigmentary" }, { id: 2, value: "88.8%", highlighted: true, bgColor: "#2563eb", textColor: "#ffffff" }, { id: 3, value: "86.2%", bgColor: "#214cb2", textColor: "#ffffff" }, { id: 4, value: "83.8%", bgColor: "#214cb2", textColor: "#ffffff" }, { id: 5, value: "80.6%", bgColor: "#214cb2", textColor: "#ffffff" }, { id: 6, value: "85.6%", bgColor: "#214cb2", textColor: "#ffffff" }] },
  { id: 9, cells: [{ id: 1, value: "scin - Infectious Diseases" }, { id: 2, value: "47.5%", highlighted: true, bgColor: "#0f1f3b", textColor: "#ffffff" }, { id: 3, value: "22.5%", bgColor: "#080d19", textColor: "#94a3b8" }, { id: 4, value: "35.0%", bgColor: "#0b1424", textColor: "#94a3b8" }, { id: 5, value: "25.0%", bgColor: "#080d19", textColor: "#94a3b8" }, { id: 6, value: "32.5%", bgColor: "#0b1424", textColor: "#94a3b8" }] },
];

export default function BenchmarksSection({ data, wrapperClass }: { data?: DermaBenchmarksSection; wrapperClass?: string }) {
  const preheading = data?.preheading ?? "Part B: Frontier LLM Medical Performance Data Table";
  const title = data?.title ?? "The Competitive Benchmarking";
  const tableTitle = data?.tableTitle ?? "Top-3 Accuracy by Category";
  const headers = data?.tableHeaders?.length ? data.tableHeaders : defaultHeaders;
  const rows = data?.tableRows?.length ? data.tableRows : defaultRows;
  const tableRef = useRef(null);
  useInView(tableRef, { once: true, amount: 0.2 });

  return (
    <section ref={tableRef} className={cn("py-16 bg-[#040814] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24", wrapperClass)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-brand-blue font-medium max-w-2xl mx-auto mb-2">{preheading}</p>
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-text-primary text-white">{title}</h2>
          <div className="w-10 h-0.5 bg-brand-blue mx-auto mt-5 rounded-full opacity-40" />
        </div>

        <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <h3 className="text-lg md:text-xl font-display font-black text-white tracking-wide uppercase">{tableTitle}</h3>
          </div>

          <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-800/80">
            <table className="w-full min-w-[850px] border-collapse text-left text-xs text-slate-300 font-sans">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0F172A]/40 font-semibold text-11 uppercase tracking-wider text-slate-400">
                  {headers.map((header, i) => (
                    <th
                      key={header.id}
                      className={cn(
                        "py-4.5 px-4",
                        i === 0
                          ? "px-5 font-bold tracking-normal normal-case text-slate-300 text-sm"
                          : header.highlighted
                            ? "text-center text-white tracking-widest lowercase font-black text-sm"
                            : "text-center text-slate-400 tracking-normal hover:text-slate-300 transition-colors normal-case font-medium"
                      )}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-medium bg-[#0B0F19]">
                {rows.map((row, rowIdx) => {
                  const cells = row.cells ?? [];
                  const isFirst = rowIdx === 0;
                  const isLast = rowIdx === rows.length - 1;

                  return (
                    <tr key={row.id} className="hover:bg-slate-800/10 transition-colors">
                      {cells.map((cell, cellIdx) => {
                        if (cellIdx === 0) {
                          return (
                            <td key={cell.id} className="py-4 px-5 font-bold text-slate-300 text-12 sm:text-xs">
                              {cell.value}
                            </td>
                          );
                        }

                        const isHighlighted = cell.highlighted || headers[cellIdx]?.highlighted;

                        const ojasBorderClass = isHighlighted
                          ? isFirst
                            ? "border-t-2 border-l-2 border-r-2 border-white rounded-t-2xl shadow-inner"
                            : isLast
                              ? "border-b-2 border-l-2 border-r-2 border-white rounded-b-2xl"
                              : "border-l-2 border-r-2 border-white"
                          : "";

                        return (
                          <td
                            key={cell.id}
                            className={cn(
                              "py-4 px-4 text-center transition-all duration-300",
                              isHighlighted ? "text-sm font-black" : "font-semibold text-xs",
                              ojasBorderClass
                            )}
                            style={{
                              backgroundColor: cell.bgColor ?? (isHighlighted ? "#2563eb" : "#0B0F19"),
                              color: cell.textColor ?? (isHighlighted ? "#ffffff" : "#cbd5e1"),
                            }}
                          >
                            {cell.value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
