export const translations = {
  en: { home: "Home", rsvp: "RSVP", journey: "Journey", calendar: "Calendar", ask: "Ask", wishes: "Wishes", gallery: "Gallery", language: "తెలుగు" },
  te: { home: "హోమ్", rsvp: "హాజరు", journey: "జీవిత ప్రయాణం", calendar: "కార్యక్రమం", ask: "అడగండి", wishes: "శుభాకాంక్షలు", gallery: "గ్యాలరీ", language: "English" }
} as const;
export type Language = keyof typeof translations;
