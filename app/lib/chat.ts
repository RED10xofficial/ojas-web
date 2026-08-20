/**
 * Deep links into the OJAS chat product, which seeds its composer from `?query=`.
 *
 * Shared by every hero prompt box so the destination lives in one place rather
 * than being re-typed at each call site.
 */
const CHAT_BASE_URL = "https://chat.ojaslife.ai/";

/** The name the chat app reads its seed prompt from. */
const QUERY_PARAM = "query";

/** Bare base URL when there's no prompt, so the CTA still goes somewhere useful. */
export function buildChatUrl(query?: string): string {
  const trimmed = query?.trim();
  return trimmed
    ? `${CHAT_BASE_URL}?${QUERY_PARAM}=${encodeURIComponent(trimmed)}`
    : CHAT_BASE_URL;
}

/** `noopener,noreferrer` because the opened tab is a separate origin. */
export function openChatWithQuery(query?: string) {
  window.open(buildChatUrl(query), "_blank", "noopener,noreferrer");
}
