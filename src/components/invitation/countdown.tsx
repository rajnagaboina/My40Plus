"use client";

import { useEffect, useState } from "react";
import { getCountdown, type Countdown as CountdownValue } from "@/lib/countdown";

const units: Array<[keyof Omit<CountdownValue, "complete">, string]> = [
  ["days", "Days"], ["hours", "Hours"], ["minutes", "Minutes"], ["seconds", "Seconds"]
];

export function Countdown({ target }: { target: string }) {
  const [value, setValue] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const update = () => setValue(getCountdown(target));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (!value) return <div className="h-20" aria-label="Loading event countdown" />;
  if (value.complete) return <p className="font-display text-2xl text-bronze">The celebration has begun!</p>;

  return (
    <div aria-label="Countdown to the celebration" className="grid grid-cols-4 gap-2 sm:gap-4" role="timer">
      {units.map(([key, label]) => (
        <div className="rounded-2xl border border-royal/10 bg-white px-2 py-3" key={key}>
          <strong className="block font-display text-2xl text-ink sm:text-4xl">{String(value[key]).padStart(2, "0")}</strong>
          <span className="text-[10px] uppercase tracking-wider text-lavender sm:text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}
