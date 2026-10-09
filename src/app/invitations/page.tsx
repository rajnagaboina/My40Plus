import { GlassCard } from "@/components/ui/glass-card";
import { InvitationCreator } from "@/features/guests/invitation-creator";

export default function InvitationsPage() { return <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16"><header className="mb-8 text-center"><p className="text-xs font-semibold uppercase tracking-[.35em] text-bronze">Local organizer preview</p><h1 className="mt-3 font-display text-5xl">Personalized invitations</h1><p className="mt-3 text-lilac">Create a locally testable guest link.</p></header><GlassCard className="p-6 sm:p-8"><InvitationCreator /></GlassCard></main>; }
