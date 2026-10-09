"use client";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { moderateGalleryItem, readGallery } from "@/features/gallery/storage";
import type { GalleryItem } from "@/features/gallery/types";
export function ModerationQueue() { const [items, setItems] = useState<GalleryItem[]>([]); useEffect(() => setItems(readGallery()), []); const pending = items.filter(item => item.status === "pending"); return <div className="space-y-3">{pending.map(item => <GlassCard className="flex flex-wrap items-center gap-4 p-5" key={item.id}><div className="min-w-0 flex-1"><p className="truncate font-semibold">{item.caption || item.name}</p><p className="text-xs text-lilac">{item.mediaType} · {item.album} · {item.contributor}</p></div><Button onClick={() => setItems(moderateGalleryItem(item.id, "approved"))}><Check className="mr-1 inline" size={15} />Approve</Button><Button variant="secondary" onClick={() => setItems(moderateGalleryItem(item.id, "rejected"))}><X className="mr-1 inline" size={15} />Reject</Button></GlassCard>)}{!pending.length && <GlassCard className="p-8 text-center text-sm text-ink/55">No uploads awaiting review.</GlassCard>}</div>; }
