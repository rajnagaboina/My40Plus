"use client";

import { CalendarDays, MapPin, TicketCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { eventDetails } from "@/config/event";
import { findInvitation, type GuestInvitation } from "./storage";
import { GuestQrCode } from "./qr-code";

export function PersonalizedInvitation({ token }: { token: string }) {
  const [guest, setGuest] = useState<GuestInvitation | null | undefined>(undefined);
  useEffect(() => setGuest(findInvitation(token) ?? null), [token]);
  const checkInUrl = typeof window !== "undefined" ? `${window.location.origin}/check-in/${token}` : `/check-in/${token}`;
  if (guest === undefined) return <div className="h-96" aria-label="Loading invitation" />;
  return <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><GlassCard className="p-7 text-center sm:p-10"><p className="text-xs uppercase tracking-[.35em] text-bronze">Especially for you</p><h1 className="mt-4 font-display text-5xl">{guest ? `Dear ${guest.name}` : "Dear Honored Guest"}</h1><p className="mx-auto mt-5 max-w-lg text-lilac">You are warmly invited to celebrate Lakshmi Srujana Gutta&apos;s 40th birthday with family and friends.</p><div className="mx-auto mt-7 max-w-md space-y-3 text-left text-sm text-lilac"><p className="flex gap-3"><CalendarDays className="text-bronze" size={19} />{eventDetails.displayDate} · {eventDetails.displayTime}</p><p className="flex gap-3"><MapPin className="text-bronze" size={19} />{eventDetails.city} · {eventDetails.venue}</p></div><ButtonLink className="mt-8" href={`/rsvp?guest=${encodeURIComponent(token)}`}><TicketCheck className="mr-2" size={17} />RSVP for this invitation</ButtonLink>{!guest && <p className="mt-5 text-xs text-amber-700">This guest record is not available in this browser. The invitation remains usable as a generic preview.</p>}</GlassCard><GlassCard className="p-6 text-center"><h2 className="font-display text-3xl">Your check-in pass</h2><p className="mb-5 mt-2 text-sm text-lilac">Present this code when you arrive.</p><GuestQrCode value={checkInUrl} label={`Check-in QR code for ${guest?.name ?? "guest"}`} /><p className="mt-4 text-xs text-ink/50">Unique guest token: {token.slice(0, 8)}…</p></GlassCard></div>;
}
