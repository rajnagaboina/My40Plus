import { GlassCard } from "@/components/ui/glass-card";
import { LiveEvent } from "@/features/live/live-event";
export default function LivePage() { return <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16"><header className="mb-8 text-center"><p className="text-xs uppercase tracking-[.35em] text-bronze">November 15, 2026</p><h1 className="mt-3 font-display text-5xl">Live celebration</h1></header><GlassCard className="p-6 sm:p-8"><LiveEvent /></GlassCard></main>; }
