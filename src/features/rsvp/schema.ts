import { z } from "zod";

export const attendanceStatuses = ["attending", "maybe", "not-attending"] as const;

export const rsvpSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().max(30).optional(),
  attendance: z.enum(attendanceStatuses),
  guestCount: z.coerce.number().int().min(1).max(10),
  dietaryPreferences: z.string().trim().max(500).optional(),
  message: z.string().trim().max(1000).optional()
}).superRefine((value, context) => {
  if (value.attendance === "not-attending" && value.guestCount !== 1) {
    context.addIssue({ code: "custom", path: ["guestCount"], message: "Guest count must be 1 when not attending" });
  }
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type StoredRsvp = RsvpInput & { id: string; submittedAt: string };
