export const fallbackAnswer = "I could not find that information in the event details.";

type KnowledgeEntry = { keywords: string[]; answer: string; priority?: number };

export const eventKnowledge: KnowledgeEntry[] = [
  { keywords: ["date", "day", "when"], answer: "Lakshmi Srujana Gutta's 40th celebration is on Sunday, November 15, 2026." },
  { keywords: ["time", "start", "begin"], answer: "The current placeholder start time is 6:00 PM Pacific Time. The host still needs to confirm it." },
  { keywords: ["where", "venue", "location", "address"], answer: "The celebration will be in Las Vegas, Nevada. The exact venue and address are coming soon." },
  { keywords: ["park", "parking"], answer: "Parking information has not been provided yet.", priority: 2 },
  { keywords: ["dress", "wear", "attire"], answer: "The dress code has not been provided yet.", priority: 2 },
  { keywords: ["rsvp", "respond", "attend"], answer: "Choose RSVP in the main navigation, select your attendance status, add your contact details, and submit the form." },
  { keywords: ["schedule", "activities", "agenda", "plan"], answer: "The provisional plan includes guest arrival, dinner, stories and wishes, cake, music, and dancing. Check the Event Calendar for the latest placeholder schedule." },
  { keywords: ["who", "honoree", "birthday"], answer: "We are celebrating Lakshmi Srujana Gutta's 40th birthday." }
];

export function answerEventQuestion(question: string): string {
  const normalized = question.toLocaleLowerCase("en-US");
  let best: KnowledgeEntry | undefined;
  let bestScore = 0;
  for (const entry of eventKnowledge) {
    const matches = entry.keywords.filter(keyword => normalized.includes(keyword)).length;
    const score = matches ? matches * 10 + (entry.priority ?? 0) : 0;
    if (score > bestScore) { best = entry; bestScore = score; }
  }
  return best?.answer ?? fallbackAnswer;
}
