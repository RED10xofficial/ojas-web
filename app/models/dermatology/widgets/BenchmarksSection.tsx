"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { DermaBenchmarksSection, TableCell } from "@/app/lib/types";
import { cn } from "@/app/lib/cn";

const defaultHeaders = [
  { id: 1, label: "Benchmark Panels", highlighted: false },
  { id: 2, label: "ojas-derma-model", highlighted: true },
  { id: 3, label: "claude-opus-4.7", highlighted: false },
  { id: 4, label: "claude-sonnet-4.6", highlighted: false },
  { id: 5, label: "gemini-2.5-pro", highlighted: false },
  { id: 6, label: "gpt-5.5", highlighted: false },
];

/* [panel, ojas, opus, sonnet, gemini, gpt] — column 1 is the highlighted model. */
const defaultRowValues = [
  ["Overall Summary", "76.8%", "62.7%", "59.3%", "61.4%", "56.7%"],
  ["aiims - Infectious Diseases", "86.1%", "63.9%", "63.9%", "69.4%", "47.2%"],
  ["aiims - Inflammatory & Autoimmune", "90.0%", "72.0%", "58.0%", "68.0%", "50.0%"],
  ["aiims - Adnexal & Pigmentary", "93.7%", "84.1%", "79.4%", "73.0%", "69.8%"],
  ["dermacon - Neoplastic (Skin Cancer)", "93.3%", "93.3%", "86.7%", "93.3%", "66.7%"],
  ["dermacon - Infectious Diseases", "99.3%", "55.0%", "55.7%", "59.3%", "49.3%"],
  ["dermacon - Inflammatory & Autoimmune", "98.6%", "71.4%", "69.3%", "73.6%", "64.3%"],
  ["dermacon - Adnexal & Pigmentary", "88.8%", "86.2%", "83.8%", "80.6%", "85.6%"],
  ["scin - Infectious Diseases", "47.5%", "22.5%", "35.0%", "25.0%", "32.5%"],
];

const defaultRows = defaultRowValues.map((values, rowIdx) => ({
  id: rowIdx + 1,
  cells: values.map((value, cellIdx) => ({
    id: cellIdx + 1,
    value,
    ...(cellIdx === 1 ? { highlighted: true } : {}),
  })),
}));

/*
 * Fallback heat ramp, used when the CMS supplies no colour for a cell.
 * Written as literal classes so Tailwind emits them — a computed
 * `bg-brand-blue/${n}` would never reach the stylesheet.
 */
const BRAND_SHADES = [
  "bg-brand-blue/10",
  "bg-brand-blue/20",
  "bg-brand-blue/30",
  "bg-brand-blue/40",
  "bg-brand-blue/50",
  "bg-brand-blue/60",
  "bg-brand-blue/70",
  "bg-brand-blue/80",
  "bg-brand-blue/90",
];

/** Scores at/below the floor get the faintest tint, at/above the ceiling the strongest. */
const SHADE_FLOOR = 50;
const SHADE_CEILING = 90;

/** Index into BRAND_SHADES for a "76.8%" style value; null when not a number. */
function shadeIndex(value: string): number | null {
  const score = Number.parseFloat(value);
  if (!Number.isFinite(score)) return null;

  const ratio = (score - SHADE_FLOOR) / (SHADE_CEILING - SHADE_FLOOR);
  return Math.round(Math.min(Math.max(ratio, 0), 1) * (BRAND_SHADES.length - 1));
}

/** From this step up, the tint is solid enough to carry white text. */
const STRONG_SHADE = 4;

/**
 * Resolves a cell's colours. A colour set in the CMS always wins; the
 * score-derived brand ramp only fills in what the CMS left empty, and the two
 * are resolved independently so a cell can take its background from Strapi
 * and still get a legible text colour from the ramp.
 */
function resolveCellColors(cell: TableCell, isHighlighted: boolean) {
  const shade = shadeIndex(cell.value);
  const isStrong = isHighlighted || (shade !== null && shade >= STRONG_SHADE);

  return {
    className: cn(
      !cell.bgColor &&
        (isHighlighted
          ? "bg-brand-blue"
          : shade !== null && BRAND_SHADES[shade]),
      !cell.textColor &&
        (isStrong
          ? "text-white"
          : shade === null
            ? "text-slate-400"
            : "text-slate-300"),
    ),
    style: {
      ...(cell.bgColor ? { backgroundColor: cell.bgColor } : {}),
      ...(cell.textColor ? { color: cell.textColor } : {}),
    },
  };
}

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
          <h2 className="text-32 lg:text-48 leading-[1.15] font-display font-medium mb-4 text-white">{title}</h2>
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

                        const colors = resolveCellColors(cell, !!isHighlighted);

                        return (
                          <td
                            key={cell.id}
                            className={cn(
                              "py-4 px-4 text-center transition-all duration-300",
                              isHighlighted ? "text-sm font-black" : "font-semibold text-xs",
                              colors.className,
                              ojasBorderClass
                            )}
                            style={colors.style}
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
