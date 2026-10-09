import { Gallery } from "@/features/gallery/gallery";

export default function GalleryPage() {
  return <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16"><header className="mx-auto mb-10 max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[.35em] text-bronze">Shared moments</p><h1 className="mt-3 font-display text-5xl">Celebration gallery</h1><p className="mt-3 text-lilac">Gather every smile, story, and unforgettable moment in one place.</p></header><Gallery /></main>;
}
