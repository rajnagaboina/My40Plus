"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonLink } from "@/components/ui/button";
import { saveRsvp } from "./storage";
import { trackEvent } from "@/features/analytics/storage";
import { rsvpSchema, type RsvpInput, type StoredRsvp } from "./schema";

const attendanceOptions = [
  { value: "attending", label: "Joyfully attending" },
  { value: "maybe", label: "Maybe" },
  { value: "not-attending", label: "Unable to attend" }
] as const;

const inputStyle = "mt-2 w-full rounded-xl border border-royal/15 bg-white px-4 py-3 text-ink placeholder:text-ink/45 focus:border-gold";

export function RsvpForm() {
  const [confirmation, setConfirmation] = useState<StoredRsvp | null>(null);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { fullName: "", email: "", phone: "", attendance: "attending", guestCount: 1, dietaryPreferences: "", message: "" }
  });
  const attendance = watch("attendance");

  useEffect(() => {
    if (attendance === "not-attending") setValue("guestCount", 1, { shouldValidate: true });
  }, [attendance, setValue]);

  if (confirmation) {
    const attending = confirmation.attendance === "attending";
    return (
      <div className="py-8 text-center" role="status">
        <CheckCircle2 className="mx-auto text-bronze" size={58} />
        <h2 className="mt-5 font-display text-4xl">Thank you, {confirmation.fullName}!</h2>
        <p className="mx-auto mt-3 max-w-md text-lilac">
          {attending ? "Your place at Lakshmi's celebration is saved." : confirmation.attendance === "maybe" ? "We saved your response. You can update it when your plans are certain." : "We will miss you and appreciate your response."}
        </p>
        <ButtonLink className="mt-7" href="/">Return to invitation</ButtonLink>
      </div>
    );
  }

  const onSubmit = (input: RsvpInput) => { setConfirmation(saveRsvp(input)); trackEvent("rsvp_submit", "/rsvp"); };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">Will you join us?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {attendanceOptions.map(option => (
            <label key={option.value} className="cursor-pointer rounded-xl border border-royal/15 bg-white p-3 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold/10">
              <input className="mr-2 accent-[#C97E16]" type="radio" value={option.value} {...register("attendance")} />{option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message} required><input className={inputStyle} autoComplete="name" {...register("fullName")} /></Field>
        <Field label="Email" error={errors.email?.message} required><input className={inputStyle} type="email" autoComplete="email" {...register("email")} /></Field>
        <Field label="Phone number"><input className={inputStyle} type="tel" autoComplete="tel" placeholder="Optional" {...register("phone")} /></Field>
        <Field label="Number of guests" error={errors.guestCount?.message}><input className={inputStyle} type="number" min="1" max="10" disabled={attendance === "not-attending"} {...register("guestCount", { valueAsNumber: true })} /></Field>
      </div>
      <Field label="Dietary preferences" error={errors.dietaryPreferences?.message}><textarea className={inputStyle} rows={3} placeholder="Allergies or preferences (optional)" {...register("dietaryPreferences")} /></Field>
      <Field label="A note for Lakshmi" error={errors.message?.message}><textarea className={inputStyle} rows={4} placeholder="Share a special message (optional)" {...register("message")} /></Field>
      <p className="text-xs text-ink/55">During local development, this response is stored only in this browser. Cloud submission will be enabled after Azure approval.</p>
      <Button className="w-full sm:w-auto" disabled={isSubmitting} type="submit"><Heart className="mr-2 inline" size={17} />Send my RSVP</Button>
    </form>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block text-sm text-lilac"><span>{label}{required && <span className="ml-1 text-bronze" aria-hidden="true">*</span>}</span>{children}{error && <span className="mt-1 block text-xs text-red-700">{error}</span>}</label>;
}
