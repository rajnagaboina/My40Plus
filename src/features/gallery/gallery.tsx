"use client";

import { Clock3, ImagePlus, Upload, Video } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { addGalleryItem, readGallery, sampleGallery } from "./storage";
import { albums, type Album, type GalleryItem } from "./types";
import { validateMedia } from "./validation";
import { trackEvent } from "@/features/analytics/storage";

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(sampleGallery);
  const [filter, setFilter] = useState<Album | "All">("All");
  const [file, setFile] = useState<File | null>(null);
  const [contributor, setContributor] = useState("");
  const [caption, setCaption] = useState("");
  const [album, setAlbum] = useState<Album>("Celebration");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => setItems(readGallery()), []);

  const submit = (event: FormEvent) => {
    event.preventDefault(); setError(""); setNotice("");
    if (!file || contributor.trim().length < 2) { setError("Choose a file and enter your name."); return; }
    const result = validateMedia(file);
    if (!result.valid) { setError(result.error); return; }
    setItems(addGalleryItem({ name: file.name, mimeType: file.type, mediaType: result.mediaType, size: file.size, album, contributor: contributor.trim(), caption: caption.trim() }));
    trackEvent("media_upload", "/gallery");
    setFile(null); setCaption(""); setNotice("Your memory is queued for host approval.");
    const input = document.getElementById("gallery-file") as HTMLInputElement | null; if (input) input.value = "";
  };
  const visible = items.filter(item => filter === "All" || item.album === filter);

  return (
    <>
      <GlassCard className="mb-8 p-5 sm:p-7">
        <h2 className="font-display text-3xl">Share a memory</h2>
        <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-royal/25 bg-white/70 p-5 text-center text-sm text-lilac sm:row-span-2">
            <Upload className="text-bronze" /><span>{file ? file.name : "Choose a photo or video"}</span><input id="gallery-file" type="file" className="sr-only" accept="image/jpeg,image/png,image/heic,video/mp4,video/quicktime" onChange={event => setFile(event.target.files?.[0] ?? null)} />
          </label>
          <input aria-label="Contributor name" value={contributor} onChange={event => setContributor(event.target.value)} maxLength={100} placeholder="Your name" className="rounded-xl border border-royal/15 bg-white px-4 py-3 text-ink" />
          <select aria-label="Album" value={album} onChange={event => setAlbum(event.target.value as Album)} className="rounded-xl border border-royal/15 bg-white px-4 py-3 text-ink">{albums.map(value => <option key={value}>{value}</option>)}</select>
          <input aria-label="Caption" value={caption} onChange={event => setCaption(event.target.value)} maxLength={300} placeholder="Caption (optional)" className="rounded-xl border border-royal/15 bg-white px-4 py-3 text-ink sm:col-span-2" />
          <div className="sm:col-span-2"><p className="mb-3 text-xs text-ink/50">JPG, PNG, HEIC up to 15 MB · MP4 or MOV up to 100 MB. Local mode stores metadata only.</p>{error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="mb-3 text-sm text-green-700">{notice}</p>}<Button type="submit"><ImagePlus className="mr-2 inline" size={17} />Submit memory</Button></div>
        </form>
      </GlassCard>

      <div className="mb-5 flex flex-wrap gap-2" aria-label="Filter by album">{(["All", ...albums] as const).map(value => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-xs ${filter === value ? "bg-gold text-[#24112f]" : "bg-white/70 text-lilac"}`}>{value}</button>)}</div>
      <section aria-label="Shared gallery" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <GlassCard key={item.id} className="overflow-hidden">
            <div className={`grid aspect-[4/3] place-items-center bg-gradient-to-br ${index % 2 ? "from-royal to-fuchsia-900" : "from-deep to-violet-500"}`}>
              {item.mediaType === "video" ? <Video size={38} className="text-white/70" /> : <ImagePlus size={38} className="text-white/70" />}
            </div>
            <div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{item.caption || item.name}</p><p className="mt-1 text-xs text-lilac">{item.album} · {item.contributor}</p></div>{item.status === "pending" && <span className="flex items-center gap-1 rounded-full bg-amber-300/10 px-2 py-1 text-[10px] text-amber-700"><Clock3 size={11} />Pending</span>}</div></div>
          </GlassCard>
        ))}
      </section>
    </>
  );
}
