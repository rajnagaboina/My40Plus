import { GlassCard } from "@/components/ui/glass-card";
import { Chat } from "@/features/assistant/chat";

export default function AssistantPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <header className="mb-8 text-center"><p className="text-xs font-semibold uppercase tracking-[.35em] text-bronze">Here to help</p><h1 className="mt-3 font-display text-5xl">Event assistant</h1><p className="mt-3 text-lilac">Ask about Lakshmi&apos;s celebration.</p></header>
      <GlassCard className="overflow-hidden"><Chat /></GlassCard>
    </main>
  );
}
