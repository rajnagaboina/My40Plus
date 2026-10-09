"use client";

import { Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { schedule } from "@/features/calendar/events";

export function LiveEvent() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 30_000); return () => window.clearInterval(timer); }, []);
  const current = schedule.find(item => now >= new Date(item.start) && now < new Date(item.end));
  const next = schedule.find(item => now < new Date(item.start));
  return <div><div className="flex items-center gap-2 text-sm text-bronze"><Radio className={current ? "animate-pulse" : ""} size={18} />{current ? "Happening now" : "Live mode preview"}</div><h2 className="mt-3 font-display text-4xl">{current?.title ?? (next ? "The celebration is coming up" : "Thank you for celebrating!")}</h2><p className="mt-3 text-lilac">{current?.description ?? (next ? `Next: ${next.title} at ${new Date(next.start).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" })} Pacific Time.` : "Live announcements will appear here during the event.")}</p><ol className="mt-7 space-y-3">{schedule.map(item => <li key={item.id} className={`rounded-xl border p-4 ${current?.id === item.id ? "border-gold bg-gold/10" : "border-royal/10 bg-white/70"}`}><p className="text-xs text-bronze">{new Date(item.start).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" })}</p><p className="mt-1 font-semibold">{item.title}</p></li>)}</ol></div>;
}
