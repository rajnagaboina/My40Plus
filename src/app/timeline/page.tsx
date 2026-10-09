import { TimelineGallery } from "@/features/timeline/timeline-gallery";

export default function TimelinePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[.35em] text-bronze">1986 — 2026</p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl">Lakshmi&apos;s life journey</h1>
        <p className="mt-4 text-lilac">Forty years of love, courage, laughter, and unforgettable moments.</p>
      </header>
      <TimelineGallery />
    </main>
  );
}
