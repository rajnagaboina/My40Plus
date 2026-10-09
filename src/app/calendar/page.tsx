import { CalendarView } from "@/features/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <header className="mb-9 text-center"><p className="text-xs font-semibold uppercase tracking-[.35em] text-bronze">The celebration plan</p><h1 className="mt-3 font-display text-5xl">Event schedule</h1><p className="mt-3 text-lilac">Keep the evening close at hand.</p></header>
      <CalendarView />
    </main>
  );
}
