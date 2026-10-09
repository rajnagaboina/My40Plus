"use client";

import { CalendarDays, Heart, Home, Images, MessageCircle, Sparkles, TicketCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/features/i18n/language-provider";

const navigation = [
  { href: "/", label: "Home", icon: Home },
  { href: "/rsvp", label: "RSVP", icon: TicketCheck },
  { href: "/timeline", label: "Journey", icon: Sparkles },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/assistant", label: "Ask", icon: MessageCircle }
];

const secondaryNavigation = [
  { href: "/wishes", label: "Wishes", icon: Heart },
  { href: "/gallery", label: "Gallery", icon: Images }
];

export function AppShell({ children }: { children: ReactNode }) {
  const { language, setLanguage, text } = useLanguage();
  const labels: Record<string, string> = { Home: text.home, RSVP: text.rsvp, Journey: text.journey, Calendar: text.calendar, Ask: text.ask, Wishes: text.wishes, Gallery: text.gallery };
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-royal/10 bg-[#FBF3E6]/85 backdrop-blur-xl">
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="font-display text-2xl text-ink">My<span className="text-bronze">40+</span></Link>
          <div className="hidden items-center gap-5 md:flex">
            {[...navigation, ...secondaryNavigation].map(({ href, label }) => <Link className="text-sm text-lilac transition hover:text-ink" href={href} key={href}>{labels[label]}</Link>)}
            <button onClick={() => setLanguage(language === "en" ? "te" : "en")} className="rounded-full border border-gold/40 px-3 py-1.5 text-xs text-bronze" aria-label="Switch language">{text.language}</button>
          </div>
        </nav>
      </header>
      <div className="pt-16">{children}</div>
      <nav aria-label="Mobile navigation" className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-2xl border border-royal/15 bg-[#FBF3E6]/95 p-2 shadow-2xl backdrop-blur-xl md:hidden">
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link href={href} key={href} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] text-lilac transition hover:bg-royal/10 hover:text-ink">
            <Icon aria-hidden="true" size={19} /><span>{labels[label]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
