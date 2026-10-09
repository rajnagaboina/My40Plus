import { WishesWall } from "@/features/wishes/wishes-wall";

export default function WishesPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <header className="mx-auto mb-10 max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[.35em] text-bronze">With love</p><h1 className="mt-3 font-display text-5xl">Birthday wishes</h1><p className="mt-3 text-lilac">A wall of love, laughter, and memories for Lakshmi.</p></header>
      <WishesWall />
    </main>
  );
}
