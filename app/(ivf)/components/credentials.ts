import type { IvfCredential } from "@/app/lib/types";

/* Credential ticker shared by the hero and the pre-apply marquee. */
const defaultCredentials = [
  "AIIMS-Validated AI",
  "Google Research Partner",
  "47 Patents",
  "600+ Deployments",
  "IIT Bombay Origin",
];

/** Quadrupled so the ticker loops seamlessly at any viewport width. */
export function resolveCredentials(credentials?: IvfCredential[]): string[] {
  const labels = credentials?.length
    ? credentials.map((credential) => credential.title)
    : defaultCredentials;

  return [...labels, ...labels, ...labels, ...labels];
}
