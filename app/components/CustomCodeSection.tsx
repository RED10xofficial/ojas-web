"use client";

import { useEffect, useRef } from "react";
import type { CustomCodeSection as CustomCodeSectionData } from "@/app/lib/types";

export default function CustomCodeSection({
  data,
}: {
  data?: CustomCodeSectionData;
  wrapperClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data?.js || !containerRef.current) return;

    const script = document.createElement("script");
    script.textContent = data.js;
    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data?.js]);

  if (!data?.html && !data?.css) return null;

  return (
    <div ref={containerRef}>
      {data.css && <style dangerouslySetInnerHTML={{ __html: data.css }} />}
      {data.html && <div dangerouslySetInnerHTML={{ __html: data.html }} />}
    </div>
  );
}
