import Image from "next/image";
import { CalendarDays, Clock3, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { CelebrationEffects } from "@/components/invitation/celebration-effects";
import { Countdown } from "@/components/invitation/countdown";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { eventDetails } from "@/config/event";

const quickActions = [
  { href: "/timeline", label: "Life journey", icon: Sparkles },
  { href: "/calendar", label: "Event calendar", icon: CalendarDays },
  { href: "/assistant", label: "Ask assistant", icon: MessageCircle }
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <CelebrationEffects />
      <div aria-hidden="true" className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <figure className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:order-2 lg:max-w-[24rem]">
            <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/25 via-lavender/15 to-royal/15 blur-2xl" />
            <div className="overflow-hidden rounded-[1.75rem] border border-gold/30 shadow-2xl shadow-royal/20">
              <Image src="/invitation-poster.png" alt="Invitation card for Lakshmi's 40th birthday celebration, hand-illustrated with purple and gold florals" width={1023} height={1537} priority sizes="(min-width: 1024px) 384px, 90vw" className="h-auto w-full" />
            </div>
          </figure>

          <div className="text-center lg:order-1 lg:text-left">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-bronze sm:text-sm">You&apos;re invited</p>
            <h1 className="font-display text-5xl leading-[.95] text-ink sm:text-7xl lg:text-7xl">
              Celebrating <span className="block bg-gradient-to-r from-gold via-[#f7e7a6] to-lavender bg-clip-text text-transparent">Lakshmi&apos;s 40th</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-lilac lg:mx-0 lg:text-lg">{eventDetails.invitationMessage}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <ButtonLink className="min-w-36" href="/rsvp">RSVP now</ButtonLink>
              <ButtonLink href="/timeline" variant="secondary">Discover her journey</ButtonLink>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <GlassCard className="relative mx-auto overflow-hidden p-5 sm:max-w-2xl sm:p-8">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-gold/30" />
            <p className="font-display text-3xl text-ink">Lakshmi Srujana Gutta</p>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-bronze">Forty & flourishing</p>
            <div className="my-7 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <Countdown target={eventDetails.dateTime} />
            <dl className="mt-7 space-y-4 text-sm text-lilac">
              <dt className="sr-only">Date</dt>
              <dd className="flex gap-3"><CalendarDays aria-hidden="true" className="shrink-0 text-bronze" size={19} />{eventDetails.displayDate}</dd>
              <dt className="sr-only">Time</dt>
              <dd className="flex gap-3"><Clock3 aria-hidden="true" className="shrink-0 text-bronze" size={19} />{eventDetails.displayTime}</dd>
              <dt className="sr-only">Location</dt>
              <dd className="flex gap-3"><MapPin aria-hidden="true" className="shrink-0 text-bronze" size={19} /><span>{eventDetails.city}<span className="block text-xs text-ink/60">{eventDetails.venue}</span></span></dd>
            </dl>
          </GlassCard>
        </div>
      </section>

      <section aria-labelledby="quick-actions" className="relative mx-auto max-w-7xl px-5 pb-16">
        <h2 id="quick-actions" className="mb-5 text-center font-display text-3xl">Make yourself at home</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map(({ href, label, icon: Icon }) => (
            <ButtonLink key={href} href={href} variant="secondary" className="gap-2 rounded-2xl py-5"><Icon size={18} />{label}</ButtonLink>
          ))}
        </div>
      </section>
    </main>
  );
}
