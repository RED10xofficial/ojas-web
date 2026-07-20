export default function ModelsPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
}
