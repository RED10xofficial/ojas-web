"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { PILL_BUTTON } from "./styles";

/** Copies the current URL to the clipboard, confirming for two seconds. */
export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      /* Clipboard unavailable (insecure context) — silently ignore. */
    }
  };

  return (
    <button type="button" onClick={copyLink} className={PILL_BUTTON}>
      {copied ? (
        <>
          <Check size={14} className="text-brand-blue" /> Copied
        </>
      ) : (
        <>
          <Link2 size={14} className="text-brand-blue" /> Share
        </>
      )}
    </button>
  );
}
