import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint for Strapi webhooks.
 *
 * Usage:
 *   POST /api/revalidate
 *   Header: x-revalidate-secret: <REVALIDATION_SECRET>
 *   Body (JSON): { "tag": "home-page" }
 *
 * Or with query param:
 *   POST /api/revalidate?tag=home-page
 *
 * Valid tags:
 *   - "home-page"
 *   - "theme-config"
 *   - "header"
 *   - "footer"
 *   - "models-page-dermatology"
 *   - "models-page-scribe"
 *   - "models-page-{slug}"
 *   - "all" (purges everything)
 */

const ALL_STATIC_TAGS = [
  "home-page",
  "theme-config",
  "header",
  "footer",
  "models-page-dermatology",
  "models-page-scribe",
];

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;
  console.log(expectedSecret)

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  let tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    try {
      const body = await request.json();
      tag = body.tag ?? null;
    } catch {
      // no body
    }
  }

  if (!tag) {
    return NextResponse.json(
      { error: "Missing 'tag' in query param or request body" },
      { status: 400 },
    );
  }

  if (tag === "all") {
    for (const t of ALL_STATIC_TAGS) {
      revalidateTag(t, "max");
    }
    return NextResponse.json({ revalidated: ALL_STATIC_TAGS, now: Date.now() });
  }

  revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: [tag], now: Date.now() });
}
