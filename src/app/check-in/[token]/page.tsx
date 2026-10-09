import { GlassCard } from "@/components/ui/glass-card";
import { CheckIn } from "@/features/guests/check-in";

export default async function CheckInPage({ params }: { params: Promise<{ token: string }> }) { const { token } = await params; return <main className="mx-auto max-w-xl px-5 py-16"><GlassCard className="p-7 sm:p-10"><CheckIn token={token} /></GlassCard></main>; }
