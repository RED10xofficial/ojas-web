import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const ALL_STATIC_TAGS = [
  "home-page",
  "theme-config",
  "header",
  "footer",
  "careers-page",
  "contact-page",
  "about-page",
  "pricing-page",
  "developer-api-page",
  "hospitals-page",
  "ivf-page",
  "blogs-page",
  "blogs",
  "research-papers-page",
  "research-papers",
  "case-studies-page",
  "case-studies",
  "white-paper-page",
  "use-cases-page",
  "use-cases",
  "models-page-dermatology",
  "models-page-scribe",
];

export async function POST(request: NextRequest) {

  //revalidation secret
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;
  

  //checking revalidation
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  
  //get tag
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
