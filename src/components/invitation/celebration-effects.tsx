"use client";

import { motion } from "framer-motion";
import { Music2, Sparkles } from "lucide-react";
import { useState } from "react";

const pieces = Array.from({ length: 18 }, (_, index) => ({
  id: index, left: `${(index * 37) % 100}%`, delay: (index % 7) * 0.18, color: index % 3 === 0 ? "#C97E16" : index % 3 === 1 ? "#6A0DAD" : "#B5679B"
}));

export function CelebrationEffects() {
  const [celebrating, setCelebrating] = useState(false);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {celebrating && pieces.map(piece => (
          <motion.span key={piece.id} className="absolute -top-4 h-2 w-2 rounded-sm" style={{ left: piece.left, backgroundColor: piece.color }}
            initial={{ y: -20, rotate: 0, opacity: 1 }} animate={{ y: "105vh", rotate: 540, opacity: 0 }}
            transition={{ duration: 2.8, delay: piece.delay, ease: "easeIn" }} />
        ))}
      </div>
      <div className="fixed right-4 top-20 z-30 flex gap-2">
        <button type="button" onClick={() => { setCelebrating(false); window.setTimeout(() => setCelebrating(true), 10); }}
          className="rounded-full border border-royal/15 bg-[#FBF3E6]/90 p-3 text-bronze backdrop-blur-xl" aria-label="Celebrate with confetti">
          <Sparkles size={18} />
        </button>
        <button type="button" disabled title="Music will be added when the audio file is supplied"
          className="cursor-not-allowed rounded-full border border-royal/10 bg-[#FBF3E6]/70 p-3 text-ink/50" aria-label="Background music unavailable; audio coming soon">
          <Music2 size={18} />
        </button>
      </div>
    </>
  );
}
