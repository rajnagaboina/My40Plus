"use client";

import { CalendarPlus, Clock3, Download, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { schedule } from "./events";
import { createIcs } from "./ics";
import { trackEvent } from "@/features/analytics/storage";

const views = ["Month", "Week", "Day", "Agenda"] as const;

const formatTime = (value: string) => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" }).format(new Date(value));

export function CalendarView() {
  const [view, setView] = useState<typeof views[number]>("Agenda");

  const download = () => {
    trackEvent("calendar_add", "/calendar");
    const url = URL.createObjectURL(new Blob([createIcs(schedule)], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "lakshmi-40th-celebration.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl border border-royal/15 bg-white p-1" aria-label="Calendar view">
          {views.map(item => <button key={item} onClick={() => setView(item)} className={`rounded-lg px-3 py-2 text-xs transition sm:text-sm ${view === item ? "bg-gold text-[#24112f]" : "text-lilac hover:text-ink"}`}>{item}</button>)}
        </div>
        <Button onClick={download} variant="secondary"><Download className="mr-2 inline" size={16} />Download ICS</Button>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="border-b border-royal/10 bg-royal/5 p-5">
          <p className="text-xs uppercase tracking-[.3em] text-bronze">{view} view</p>
          <h2 className="mt-1 font-display text-3xl">Sunday, November 15</h2>
          {view !== "Agenda" && <p className="mt-2 text-sm text-ink/60">A focused {view.toLowerCase()} preview; full scheduling controls will be available to the organizer.</p>}
        </div>
        <ol className="divide-y divide-royal/10">
          {schedule.map(item => (
            <li key={item.id} className="grid gap-3 p-5 sm:grid-cols-[9rem_1fr] sm:p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-bronze"><Clock3 size={16} />{formatTime(item.start)}</p>
              <div><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-1 text-sm leading-6 text-lilac">{item.description}</p><p className="mt-2 flex items-center gap-2 text-xs text-ink/55"><MapPin size={14} />{item.location}</p></div>
            </li>
          ))}
        </ol>
      </GlassCard>

      <div className="mt-6 flex flex-wrap gap-3">
        <a className="inline-flex items-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-[#24112f]" href="https://www.google.com/maps/search/?api=1&query=Las+Vegas%2C+Nevada" target="_blank" rel="noreferrer"><MapPin className="mr-2" size={16} />Directions</a>
        <Button onClick={download} variant="secondary"><CalendarPlus className="mr-2 inline" size={16} />Add all to calendar</Button>
      </div>
      <p className="mt-4 text-xs text-ink/55">All times and activity details are placeholders until confirmed by the host.</p>
    </>
  );
}
