"use client";

import { LockKeyhole, LogIn, LogOut } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { clearAdminSession, createLocalAdminSession, readAdminSession, type AdminSession } from "./auth";

export function AdminGuard({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null | undefined>(undefined);
  useEffect(() => setSession(readAdminSession()), []);
  if (session === undefined) return <div className="min-h-80" aria-label="Checking organizer access" />;
  if (!session) return <main className="mx-auto max-w-lg px-5 py-16"><GlassCard className="p-7 text-center sm:p-9"><LockKeyhole className="mx-auto text-bronze" size={48} /><h1 className="mt-5 font-display text-4xl">Organizer portal</h1><p className="mt-3 text-sm leading-6 text-lilac">Use a local preview session to test admin features. This is not production authentication; Microsoft Entra External ID will replace this adapter after deployment approval.</p><Button className="mt-7" onClick={() => setSession(createLocalAdminSession())}><LogIn className="mr-2 inline" size={16} />Enter local preview</Button></GlassCard></main>;
  return <div><div className="mx-auto flex max-w-7xl justify-end px-5 pt-4"><button className="flex items-center gap-2 text-xs text-ink/60 hover:text-ink" onClick={() => { clearAdminSession(); setSession(null); }}><LogOut size={14} />End local session</button></div>{children}</div>;
}
