"use client";

import { Bell, Download, X } from "lucide-react";
import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> }

export function PwaClient() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPermission | "unsupported">("default");

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    setNotifications("Notification" in window ? Notification.permission : "unsupported");
    const onPrompt = (event: Event) => { event.preventDefault(); setInstallPrompt(event as InstallPromptEvent); setShowNotice(true); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const install = async () => { if (!installPrompt) return; await installPrompt.prompt(); await installPrompt.userChoice; setInstallPrompt(null); setShowNotice(false); };
  const enableNotifications = async () => { if (!("Notification" in window)) return; setNotifications(await Notification.requestPermission()); };

  return <>{showNotice && installPrompt && <aside className="fixed bottom-24 left-4 right-4 z-[55] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-gold/30 bg-[#FBF3E6]/95 p-4 shadow-2xl backdrop-blur-xl md:bottom-5"><Download className="shrink-0 text-bronze" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-ink">Install My40+</p><p className="text-xs text-lilac">Keep the celebration on your home screen.</p></div><button onClick={install} className="rounded-full bg-gold px-3 py-2 text-xs font-semibold text-ink">Install</button><button onClick={() => setShowNotice(false)} aria-label="Dismiss install prompt" className="text-ink"><X size={17} /></button></aside>}<button type="button" onClick={enableNotifications} disabled={notifications !== "default"} title={notifications === "granted" ? "Notifications enabled" : notifications === "denied" ? "Notifications blocked in browser settings" : notifications === "unsupported" ? "Notifications unsupported" : "Enable event notifications"} className="fixed bottom-24 right-4 z-30 rounded-full border border-royal/15 bg-[#FBF3E6]/90 p-3 text-bronze shadow-xl md:bottom-5" aria-label="Enable event notifications"><Bell size={18} /></button></>;
}
