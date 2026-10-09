"use client";

import { CheckCircle2, ScanLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { checkInGuest, findInvitation, type GuestInvitation } from "./storage";
import { trackEvent } from "@/features/analytics/storage";

export function CheckIn({ token }: { token: string }) {
  const [guest, setGuest] = useState<GuestInvitation | null | undefined>(undefined);
  useEffect(() => setGuest(findInvitation(token) ?? null), [token]);
  if (guest === undefined) return <p>Loading guest pass…</p>;
  if (!guest) return <div className="text-center"><ScanLine className="mx-auto text-amber-700" size={52} /><h1 className="mt-4 font-display text-4xl">Pass not found</h1><p className="mt-3 text-lilac">This local browser does not have the guest record. Please ask the host for assistance.</p></div>;
  if (guest.checkedInAt) return <div className="text-center" role="status"><CheckCircle2 className="mx-auto text-green-700" size={58} /><h1 className="mt-4 font-display text-4xl">Welcome, {guest.name}!</h1><p className="mt-3 text-lilac">Check-in recorded at {new Date(guest.checkedInAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.</p></div>;
  return <div className="text-center"><ScanLine className="mx-auto text-bronze" size={52} /><h1 className="mt-4 font-display text-4xl">Welcome, {guest.name}</h1><p className="mt-3 text-lilac">Confirm arrival for Lakshmi&apos;s celebration.</p><Button className="mt-7" onClick={() => { const result = checkInGuest(token) ?? null; if (result?.checkedInAt) trackEvent("guest_check_in", `/check-in/${token}`); setGuest(result); }}>Check in now</Button></div>;
}
