"use client";

import { CircleHelp, Download, Search, UserCheck, UserMinus, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { readRsvps } from "@/features/rsvp/storage";
import type { StoredRsvp } from "@/features/rsvp/schema";
import { createRsvpCsv, summarizeRsvps } from "./rsvp-report";

export function RsvpDashboard() {
  const [items, setItems] = useState<StoredRsvp[]>([]); const [query, setQuery] = useState("");
  useEffect(() => setItems(readRsvps()), []);
  const summary = summarizeRsvps(items);
  const visible = useMemo(() => { const needle = query.toLocaleLowerCase(); return items.filter(item => `${item.fullName} ${item.email} ${item.phone ?? ""}`.toLocaleLowerCase().includes(needle)); }, [items, query]);
  const cards = [{ label: "Responses", value: summary.responses, icon: Users }, { label: "Attending guests", value: summary.attending, icon: UserCheck }, { label: "Maybe", value: summary.maybe, icon: CircleHelp }, { label: "Declined", value: summary.declined, icon: UserMinus }];
  const download = () => { const url = URL.createObjectURL(new Blob([createRsvpCsv(items)], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = "my40plus-rsvps.csv"; link.click(); URL.revokeObjectURL(url); };
  return <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({ label, value, icon: Icon }) => <GlassCard className="p-5" key={label}><Icon className="text-bronze" size={20} /><p className="mt-3 text-xs uppercase tracking-widest text-lavender">{label}</p><p className="mt-1 font-display text-3xl">{value}</p></GlassCard>)}</div><div className="mt-6 flex flex-wrap justify-between gap-3"><label className="relative min-w-60 flex-1"><span className="sr-only">Search guests</span><Search className="absolute left-4 top-3.5 text-ink/50" size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search name, email, or phone" className="w-full rounded-full border border-royal/15 bg-white py-3 pl-11 pr-4 text-sm text-ink" /></label><Button variant="secondary" onClick={download} disabled={!items.length}><Download className="mr-2 inline" size={16} />Export CSV</Button></div><GlassCard className="mt-5 overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-royal/10 bg-royal/5 text-xs uppercase tracking-wider text-lavender"><tr><th className="p-4">Guest</th><th className="p-4">Status</th><th className="p-4">Party</th><th className="p-4">Dietary</th><th className="p-4">Submitted</th></tr></thead><tbody className="divide-y divide-royal/10">{visible.map(item => <tr key={item.id}><td className="p-4"><p className="font-semibold">{item.fullName}</p><p className="text-xs text-ink/55">{item.email}</p></td><td className="p-4 capitalize text-bronze">{item.attendance.replace("-", " ")}</td><td className="p-4">{item.guestCount}</td><td className="max-w-56 truncate p-4 text-lilac">{item.dietaryPreferences || "—"}</td><td className="p-4 text-ink/60">{new Date(item.submittedAt).toLocaleDateString()}</td></tr>)}</tbody></table>{!visible.length && <p className="p-8 text-center text-sm text-ink/55">{items.length ? "No guests match your search." : "No local RSVP responses yet."}</p>}</div></GlassCard></>;
}
