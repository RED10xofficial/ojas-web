"use client";

export default function ModelsPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
          Something went wrong
        </h2>
        <p className="text-text-secondary font-medium mb-8">
          We encountered an error loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-hover transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
