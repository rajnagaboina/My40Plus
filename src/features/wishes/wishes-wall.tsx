"use client";

import { Heart, ImagePlus, Send, Video } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { addWish, reactToWish, readWishes, sampleWishes } from "./storage";
import type { Wish } from "./types";
import { trackEvent } from "@/features/analytics/storage";

const MAX_MEDIA_SIZE = 25 * 1024 * 1024;
const acceptedTypes = new Set(["image/jpeg", "image/png", "image/heic", "video/mp4", "video/quicktime"]);

export function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(sampleWishes);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  useEffect(() => setWishes(readWishes()), []);

  const submit = (event: FormEvent) => {
    event.preventDefault(); setError("");
    if (author.trim().length < 2 || message.trim().length < 2) { setError("Please add your name and a birthday message."); return; }
    if (file && (!acceptedTypes.has(file.type) || file.size > MAX_MEDIA_SIZE)) { setError("Choose a JPG, PNG, HEIC, MP4, or MOV file up to 25 MB."); return; }
    const media = file ? { name: file.name, type: file.type, size: file.size } : undefined;
    setWishes(addWish({ author: author.trim(), message: message.trim(), media }));
    trackEvent("wish_post", "/wishes");
    setAuthor(""); setMessage(""); setFile(null);
    const input = document.getElementById("wish-media") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  return (
    <div className="grid items-start gap-7 lg:grid-cols-[.8fr_1.2fr]">
      <GlassCard className="p-5 lg:sticky lg:top-24 sm:p-7">
        <h2 className="font-display text-3xl">Leave some love</h2>
        <p className="mt-2 text-sm text-lilac">Write a message for Lakshmi and optionally attach a memory.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm text-lilac">Your name<input value={author} onChange={event => setAuthor(event.target.value)} maxLength={100} className="mt-2 w-full rounded-xl border border-royal/15 bg-white px-4 py-3 text-ink" /></label>
          <label className="block text-sm text-lilac">Birthday wish<textarea value={message} onChange={event => setMessage(event.target.value)} maxLength={1000} rows={5} className="mt-2 w-full rounded-xl border border-royal/15 bg-white px-4 py-3 text-ink" /></label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-royal/20 p-4 text-sm text-lilac hover:bg-royal/5">
            <ImagePlus className="text-bronze" size={20} /><span>{file ? file.name : "Add a photo or video (optional)"}</span>
            <input id="wish-media" className="sr-only" type="file" accept="image/jpeg,image/png,image/heic,video/mp4,video/quicktime" onChange={event => setFile(event.target.files?.[0] ?? null)} />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <p className="text-xs text-ink/50">Local mode stores only attachment metadata, not the file. Azure Blob upload will require deployment approval.</p>
          <Button type="submit"><Send className="mr-2 inline" size={16} />Post wish</Button>
        </form>
      </GlassCard>

      <section aria-label="Birthday wishes" className="columns-1 gap-4 sm:columns-2">
        {wishes.map(wish => (
          <GlassCard key={wish.id} className="mb-4 break-inside-avoid p-5">
            <p className="whitespace-pre-wrap text-sm leading-6 text-ink/90">“{wish.message}”</p>
            {wish.media && <div className="mt-4 flex items-center gap-2 rounded-xl bg-royal/5 p-3 text-xs text-lilac">{wish.media.type.startsWith("video") ? <Video size={17} /> : <ImagePlus size={17} />}<span className="truncate">{wish.media.name}</span></div>}
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-royal/10 pt-4">
              <div><p className="text-sm font-semibold text-bronze">{wish.author}</p><time className="text-[11px] text-ink/50" dateTime={wish.createdAt}>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(wish.createdAt))}</time></div>
              <button aria-label={`React to ${wish.author}'s wish`} onClick={() => setWishes(reactToWish(wish.id))} className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-2 text-xs text-lavender hover:bg-royal/10"><Heart size={15} />{wish.reactions}</button>
            </div>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
