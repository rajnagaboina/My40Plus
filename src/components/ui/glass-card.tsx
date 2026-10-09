import type { HTMLAttributes } from "react";

export function GlassCard({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-3xl border border-royal/15 bg-white/70 shadow-2xl shadow-royal/10 backdrop-blur-xl ${className}`} {...props} />;
}
