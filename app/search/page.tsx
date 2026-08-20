import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { getSearchResults } from "@/app/lib/api";
import type { SearchResult } from "@/app/lib/types";

/** Deeper than the header overlay, which only previews the top hits. */
const PAGE_LIMIT = 30;

export const metadata: Metadata = {
  title: "Search | OJAS",
  description: "Search across OJAS pages, blogs, case studies, and research.",
  /** A results page has nothing durable to index. */
  robots: "noindex, follow",
};

const ResultRow = ({ result }: { result: SearchResult }) => (
  <Link
    href={result.href}
    className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-brand-subtle hover:border-brand-blue/30 hover:shadow-sm transition-all"
  >
    <span className="mt-0.5 shrink-0 px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-9 font-black uppercase tracking-wider">
      {result.typeLabel}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-base font-semibold text-text-primary group-hover:text-brand-blue transition-colors">
        {result.title}
      </span>
      {result.description && (
        <span className="block text-sm text-text-secondary mt-1 line-clamp-2">
          {result.description}
        </span>
      )}
    </span>
    <ArrowRight
      size={16}
      className="mt-1 shrink-0 text-brand-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
    />
  </Link>
);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";

  const response = query ? await getSearchResults(query, PAGE_LIMIT) : null;
  const results = response?.results ?? [];
  const total = response?.total ?? 0;

  return (
    <div id="search">
      {/* pt-35 clears the fixed header, matching the other top-level pages. */}
      <section className="pt-35 pb-24">
        <div className="global-container max-w-4xl">
          <h1 className="text-32 sm:text-40 font-display font-medium tracking-tight text-text-primary">
            Search
          </h1>

          {/* A plain GET form, so refining a query needs no client JS. */}
          <form action="/search" className="mt-6 flex items-center gap-3 p-2 pl-5 rounded-2xl bg-white border border-brand-subtle shadow-sm focus-within:border-brand-blue/40 transition-colors">
            <Search size={18} className="text-brand-blue shrink-0" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search OJAS…"
              aria-label="Search OJAS"
              className="flex-1 min-w-0 bg-transparent py-2 text-base text-text-primary placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-hover active:bg-brand-pressed transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {query && (
            <p className="mt-6 text-sm text-text-secondary">
              {total === 0 ? (
                <>
                  No results for{" "}
                  <span className="font-semibold text-text-primary">“{query}”</span>.
                </>
              ) : (
                <>
                  <span className="font-semibold text-text-primary">{total}</span> result
                  {total === 1 ? "" : "s"} for{" "}
                  <span className="font-semibold text-text-primary">“{query}”</span>
                  {total > results.length && (
                    <span className="text-text-secondary/70">
                      {" "}
                      — showing the top {results.length}
                    </span>
                  )}
                </>
              )}
            </p>
          )}

          {results.length > 0 && (
            <div className="mt-6 flex flex-col gap-3">
              {results.map((result, index) => (
                <ResultRow key={`${result.type}-${result.href}-${index}`} result={result} />
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <p className="mt-4 text-sm text-text-secondary">
              Check the spelling, try a broader term, or browse from the menu above.
            </p>
          )}

          {!query && (
            <p className="mt-6 text-sm text-text-secondary">
              Enter a term to search across pages, blogs, case studies, use cases, research
              papers, and models.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
