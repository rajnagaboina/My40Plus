export type ScheduleEvent = { id: string; title: string; start: string; end: string; location: string; description: string; provisional?: boolean };

export const schedule: ScheduleEvent[] = [
  { id: "welcome", title: "Guest arrival & welcome", start: "2026-11-15T18:00:00-08:00", end: "2026-11-15T18:30:00-08:00", location: "Las Vegas — venue coming soon", description: "Arrive, check in, and reconnect with family and friends.", provisional: true },
  { id: "dinner", title: "Dinner & celebration", start: "2026-11-15T18:30:00-08:00", end: "2026-11-15T20:00:00-08:00", location: "Las Vegas — venue coming soon", description: "Dinner details and menu are coming soon.", provisional: true },
  { id: "tributes", title: "Stories, wishes & cake", start: "2026-11-15T20:00:00-08:00", end: "2026-11-15T21:00:00-08:00", location: "Las Vegas — venue coming soon", description: "A time for memories, birthday wishes, and cake.", provisional: true },
  { id: "dance", title: "Music & dancing", start: "2026-11-15T21:00:00-08:00", end: "2026-11-15T22:00:00-08:00", location: "Las Vegas — venue coming soon", description: "Music and entertainment details are coming soon.", provisional: true }
];
