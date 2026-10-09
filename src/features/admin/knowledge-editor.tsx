"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { readContentDrafts, saveContentDraft } from "./content-store";
export function KnowledgeEditor() { const [value, setValue] = useState(""); const [saved, setSaved] = useState(false); useEffect(() => setValue(readContentDrafts().knowledge ?? ""), []); return <GlassCard className="p-6"><p className="text-sm text-lilac">Add confirmed FAQs and guest instructions, one item per line. These remain drafts until the approved search index is connected.</p><textarea value={value} onChange={event => { setValue(event.target.value); setSaved(false); }} rows={16} placeholder={"Q: Is parking available?\nA: Parking information coming soon."} className="mt-5 w-full rounded-xl border border-royal/15 bg-white p-4 text-sm text-ink" /><Button className="mt-4" onClick={() => { saveContentDraft("knowledge", value); setSaved(true); }}>Save knowledge draft</Button>{saved && <span className="ml-3 text-sm text-green-700">Saved</span>}</GlassCard>; }
