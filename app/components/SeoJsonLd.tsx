export default function SeoJsonLd({
  structuredData,
}: {
  structuredData?: Record<string, unknown> | null;
}) {
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
