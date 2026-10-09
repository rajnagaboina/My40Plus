"use client";

import { Copy, ExternalLink } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { createInvitation, type GuestInvitation } from "./storage";

export function InvitationCreator() {
  const [name, setName] = useState(""); const [guest, setGuest] = useState<GuestInvitation | null>(null); const [copied, setCopied] = useState(false);
  const link = guest && typeof window !== "undefined" ? `${window.location.origin}/invite/${guest.token}` : "";
  const submit = (event: FormEvent) => { event.preventDefault(); if (name.trim().length >= 2) setGuest(createInvitation(name)); };
  return <div><form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="guest-name">Guest name</label><input id="guest-name" value={name} onChange={event => setName(event.target.value)} minLength={2} required placeholder="Guest's full name" className="min-w-0 flex-1 rounded-full border border-royal/15 bg-white px-5 py-3 text-ink" /><Button type="submit">Create invitation</Button></form>{guest && <div className="mt-6 rounded-2xl bg-white p-4"><p className="text-sm text-lilac">Invitation for <strong className="text-ink">{guest.name}</strong></p><p className="mt-2 break-all text-xs text-ink/60">{link}</p><div className="mt-4 flex flex-wrap gap-2"><Button variant="secondary" onClick={async () => { await navigator.clipboard.writeText(link); setCopied(true); }}><Copy className="mr-2 inline" size={15} />{copied ? "Copied" : "Copy link"}</Button><a href={link} className="inline-flex items-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-[#24112f]"><ExternalLink className="mr-2" size={15} />Open preview</a></div></div>}<p className="mt-5 text-xs text-ink/50">Local preview: personalized records exist only in this browser. Production sharing requires the approved guest API.</p></div>;
}
