import { PersonalizedInvitation } from "@/features/guests/personalized-invitation";

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) { const { token } = await params; return <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16"><PersonalizedInvitation token={token} /></main>; }
