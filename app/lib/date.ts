/**
 * Long-form date used across the resource pages ("January 05, 2026").
 * Returns the raw value when it is not a parseable date, null when empty.
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
