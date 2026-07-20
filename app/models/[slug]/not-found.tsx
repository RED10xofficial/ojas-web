import Link from "next/link";

export default function ModelsPageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-display font-black text-brand-blue mb-4">404</h1>
        <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
          Model Not Found
        </h2>
        <p className="text-text-secondary font-medium mb-8">
          The model page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-hover transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
