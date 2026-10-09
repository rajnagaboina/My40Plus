import { WifiOff } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
export default function OfflinePage() { return <main className="grid min-h-[calc(100vh-4rem)] place-items-center px-5"><GlassCard className="max-w-lg p-8 text-center"><WifiOff className="mx-auto text-bronze" size={52} /><h1 className="mt-5 font-display text-4xl">You&apos;re offline</h1><p className="mt-3 text-lilac">Previously visited celebration pages remain available. Reconnect to submit new RSVPs, wishes, or uploads after cloud services are enabled.</p><ButtonLink className="mt-7" href="/">Open invitation</ButtonLink></GlassCard></main>; }
