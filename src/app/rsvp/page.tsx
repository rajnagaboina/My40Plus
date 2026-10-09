import { GlassCard } from "@/components/ui/glass-card";
import { RsvpForm } from "@/features/rsvp/rsvp-form";

export default function RsvpPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <header className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[.35em] text-bronze">You&apos;re on the guest list</p>
        <h1 className="mt-3 font-display text-5xl">RSVP</h1>
        <p className="mt-3 text-lilac">Please respond for Lakshmi&apos;s celebration by the deadline (coming soon).</p>
      </header>
      <GlassCard className="p-5 sm:p-8"><RsvpForm /></GlassCard>
    </main>
  );
}
