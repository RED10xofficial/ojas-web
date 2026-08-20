/**
 * Long-form date for the resource pages ("January 05, 2026"). Hands back the raw
 * value if it won't parse, and null if there's nothing there.
 */
export function formatLongDate(value?: string | null): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
