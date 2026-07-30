"use client";

import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
}

export default function Toast({ show, message }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white text-xs font-bold font-sans tracking-wide px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2">
      <CheckCircle2
        className="text-emerald-400 shrink-0 animate-bounce"
        size={16}
      />
      <span>{message}</span>
    </div>
  );
}
