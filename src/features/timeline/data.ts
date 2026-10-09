export type Milestone = {
  year: number;
  title: string;
  description: string;
  story: string;
  accent: string;
  mediaLabel: string;
};

export const milestones: Milestone[] = [
  { year: 1986, title: "A beautiful beginning", description: "Lakshmi's story begins.", story: "Birthplace, family memories, and a favorite childhood photo will be added here.", accent: "from-fuchsia-500 to-deep", mediaLabel: "Childhood photo coming soon" },
  { year: 1995, title: "School days", description: "Friendships, curiosity, and joyful discoveries.", story: "School stories and photos from these formative years will be added here.", accent: "from-violet-400 to-royal", mediaLabel: "School memory coming soon" },
  { year: 2004, title: "Graduation", description: "A proud milestone and a new horizon.", story: "Graduation details, stories, and celebration photos will be added here.", accent: "from-gold to-amber-700", mediaLabel: "Graduation photo coming soon" },
  { year: 2015, title: "A new chapter", description: "Love, partnership, and family adventures.", story: "Wedding and family memories will be added here with Lakshmi's approval.", accent: "from-pink-400 to-fuchsia-800", mediaLabel: "Family photo coming soon" },
  { year: 2026, title: "Forty & flourishing", description: "Celebrating the journey—and everything ahead.", story: "On November 15, family and friends gather in Las Vegas to celebrate Lakshmi's 40th.", accent: "from-gold to-royal", mediaLabel: "Celebration photo coming soon" }
];
