"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCw, ArrowLeft } from "lucide-react";
import StatusPage, {
  ACTION_PRIMARY,
  ACTION_SECONDARY,
} from "@/app/components/StatusPage";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  /** Next 16's replacement for `reset`: re-fetches, then re-renders. */
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      {/* Error boundaries are Client Components, so no `metadata` export. */}
      <title>Something went wrong | OJAS</title>

      <StatusPage
        code="500"
        badge="Something went wrong"
        title="This page didn't load."
        description="An unexpected error interrupted the request. Trying again often clears it — if it doesn't, the link below will get you back."
        footer={
          /**
           * Production hides the real error message, so this digest is the only handle
           * support has for finding this exact failure in the logs.
           */
          error.digest ? (
            <div className="mt-10 pt-6 border-t border-slate-200">
              <p className="text-xs font-bold text-text-secondary/70 uppercase tracking-widest font-mono">
                Reference
              </p>
              <p className="mt-2 text-sm font-mono text-text-secondary break-all">
                {error.digest}
              </p>
              <p className="mt-1 text-xs text-text-secondary/70">
                Quote this if you contact support.
              </p>
            </div>
          ) : null
        }
      >
        <button
          type="button"
          onClick={() => unstable_retry()}
          className={ACTION_PRIMARY}
        >
          <RotateCw size={14} />
          Try again
        </button>
        <Link href="/" className={ACTION_SECONDARY}>
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </StatusPage>
    </>
  );
}
