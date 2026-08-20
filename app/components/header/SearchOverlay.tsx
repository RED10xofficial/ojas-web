"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search, X, Loader2, CornerDownLeft, ArrowRight } from "lucide-react";
import { getSearchResults } from "@/app/lib/api";
import { cn } from "@/app/lib/cn";
import type { SearchResult } from "@/app/lib/types";

/** Matches MIN_QUERY_LENGTH on the search endpoint. */
const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;
const OVERLAY_LIMIT = 8;

const SUGGESTIONS = [
  "Pricing",
  "Scribe",
  "Case studies",
  "Developer API",
  "Careers",
];

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  /**
   * Tagged with the query it answers. Everything on screen derives from that tag, so
   * results from an abandoned query never render and there's nothing to clear as the
   * user keeps typing.
   */
  const [data, setData] = useState<{
    query: string;
    results: SearchResult[];
    total: number;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const trimmed = query.trim();
  const isSearchable = trimmed.length >= MIN_QUERY_LENGTH;

  const current = data && data.query === trimmed ? data : null;
  const results = current?.results ?? [];
  const total = current?.total ?? 0;
  const loading = isSearchable && !current;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* Body scroll is frozen so the page behind the overlay stays put. */
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  /* Escape closes from anywhere, not just while the input holds focus. */
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onClose]);

  /**
   * Debounced so a fast typist fires one request per pause rather than one per
   * keystroke. `cancelled` throws away a slow response that lost the race to a
   * newer query.
   */
  useEffect(() => {
    if (!isSearchable) return;

    let cancelled = false;

    const timer = setTimeout(async () => {
      const response = await getSearchResults(trimmed, OVERLAY_LIMIT);
      if (cancelled) return;

      setData({
        query: trimmed,
        results: response?.results ?? [],
        total: response?.total ?? 0,
      });
      setActiveIndex(0);
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed, isSearchable]);

  const goTo = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const submit = useCallback(() => {
    if (!isSearchable) return;
    goTo(`/search?q=${encodeURIComponent(trimmed)}`);
  }, [goTo, isSearchable, trimmed]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!results.length) return;
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + delta + results.length) % results.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const active = results[activeIndex];
      /* Enter opens the highlighted hit, or the full results page if none. */
      if (active) goTo(active.href);
      else submit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-100 flex justify-center px-4 pt-24 sm:pt-32"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/70 cursor-default"
      />

      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        className="relative w-full max-w-2xl h-fit max-h-[70vh] flex flex-col bg-white rounded-3xl border border-brand-subtle shadow-2xl overflow-hidden"
      >
        {/* Query bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
          <Search size={18} className="text-brand-blue shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search OJAS…"
            aria-label="Search OJAS"
            className="flex-1 min-w-0 bg-transparent text-base text-text-primary placeholder:text-slate-400 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          />
          {loading && <Loader2 size={16} className="text-brand-blue animate-spin shrink-0" />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {!isSearchable && (
            <div className="px-5 py-6">
              <p className="text-10 font-bold uppercase tracking-widest text-text-secondary/70 mb-3">
                Try searching for
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1.5 rounded-full border border-brand-subtle bg-brand-subtle/40 text-xs font-semibold text-text-secondary hover:border-brand-blue/30 hover:text-brand-blue transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isSearchable && !loading && results.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-semibold text-text-primary">
                No results for “{trimmed}”
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Try a different term, or browse the menu.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="py-2">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.href}-${index}`}>
                  <button
                    type="button"
                    onClick={() => goTo(result.href)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "w-full text-left px-5 py-3 flex items-start gap-3 transition-colors cursor-pointer",
                      index === activeIndex ? "bg-brand-subtle/60" : "hover:bg-slate-50",
                    )}
                  >
                    <span className="mt-0.5 shrink-0 px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-9 font-black uppercase tracking-wider">
                      {result.typeLabel}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text-primary truncate">
                        {result.title}
                      </span>
                      {result.description && (
                        <span className="block text-xs text-text-secondary line-clamp-1 mt-0.5">
                          {result.description}
                        </span>
                      )}
                    </span>
                    <ArrowRight
                      size={14}
                      className={cn(
                        "mt-1 shrink-0 text-brand-blue transition-opacity",
                        index === activeIndex ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {isSearchable && results.length > 0 && (
          <button
            type="button"
            onClick={submit}
            className="shrink-0 flex items-center justify-between gap-3 px-5 py-3 border-t border-slate-100 bg-slate-50/60 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold text-text-secondary">
              View all {total} result{total === 1 ? "" : "s"}
            </span>
            <span className="flex items-center gap-1.5 text-10 font-bold uppercase tracking-widest text-brand-blue">
              Enter <CornerDownLeft size={11} />
            </span>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
