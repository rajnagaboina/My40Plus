"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { milestones } from "./data";

export function TimelineGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const move = (direction: number) => setSelected(current => current === null ? 0 : (current + direction + milestones.length) % milestones.length);

  useEffect(() => {
    if (!playing || selected === null) return;
    const timer = window.setInterval(() => move(1), 4000);
    return () => window.clearInterval(timer);
  }, [playing, selected]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (selected === null) return;
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <div className="relative space-y-7 before:absolute before:bottom-0 before:left-[1.15rem] before:top-0 before:w-px before:bg-gradient-to-b before:from-gold before:via-lavender/40 before:to-transparent sm:before:left-1/2">
        {milestones.map((milestone, index) => (
          <motion.article key={milestone.year} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            className={`relative grid pl-14 sm:grid-cols-2 sm:pl-0 ${index % 2 ? "sm:[&>div]:col-start-2 sm:[&>div]:ml-10" : "sm:[&>div]:mr-10"}`}>
            <span className="absolute left-3 top-8 z-10 h-5 w-5 rounded-full border-4 border-ivory bg-gold shadow-[0_0_20px_rgba(201,126,22,.55)] sm:left-1/2 sm:-translate-x-1/2" />
            <GlassCard className="overflow-hidden">
              <button className={`group relative flex h-44 w-full items-center justify-center bg-gradient-to-br text-white ${milestone.accent}`} onClick={() => setSelected(index)} aria-label={`Open ${milestone.year} ${milestone.title} memory`}>
                <span className="max-w-[15rem] px-4 text-center text-sm font-medium text-white/80">{milestone.mediaLabel}</span>
                <Expand className="absolute right-4 top-4 opacity-70 transition group-hover:scale-110 group-hover:opacity-100" size={20} />
              </button>
              <div className="p-5">
                <p className="text-sm font-semibold tracking-[.25em] text-bronze">{milestone.year}</p>
                <h2 className="mt-1 font-display text-3xl">{milestone.title}</h2>
                <p className="mt-2 text-sm leading-6 text-lilac">{milestone.description}</p>
              </div>
            </GlassCard>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-[#09000f]/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label={`${milestones[selected].year} memory`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => { setSelected(null); setPlaying(false); }} className="absolute right-5 top-5 rounded-full bg-white/70 p-3" aria-label="Close gallery"><X /></button>
            <button onClick={() => move(-1)} className="absolute left-3 rounded-full bg-white/70 p-3 sm:left-8" aria-label="Previous memory"><ChevronLeft /></button>
            <motion.div key={selected} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl text-center">
              <div className={`mx-auto flex aspect-video max-h-[55vh] items-center justify-center rounded-3xl bg-gradient-to-br ${milestones[selected].accent}`}>
                <span className="px-8 text-lg text-white/80">{milestones[selected].mediaLabel}</span>
              </div>
              <p className="mt-6 text-sm tracking-[.3em] text-gold">{milestones[selected].year}</p>
              <h2 className="mt-1 font-display text-4xl text-white">{milestones[selected].title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/70">{milestones[selected].story}</p>
              <Button className="mt-5" variant="secondary" onClick={() => setPlaying(value => !value)}><Play className="mr-2 inline" size={16} />{playing ? "Pause slideshow" : "Play slideshow"}</Button>
            </motion.div>
            <button onClick={() => move(1)} className="absolute right-3 rounded-full bg-white/70 p-3 sm:right-8" aria-label="Next memory"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
