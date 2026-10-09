import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the approved invitation artwork (docs/ARCHITECTURE.md).
        royal: "#6A0DAD",
        deep: "#4B0082",
        // lavender/lilac keep their original names for call-site compatibility, but are
        // deepened from the old dark-theme pastels so they read as AA-contrast text/icon
        // colors on the new ivory paper background.
        lavender: "#7A4F87",
        lilac: "#5B3B72",
        // gold stays bright/rich — it is used as a solid background (buttons, badges,
        // borders) where dark ink text sits on top of it.
        gold: "#C97E16",
        // bronze is the same gold family, deepened for use as *text* directly on the
        // ivory background, where the bright `gold` would fail contrast.
        bronze: "#8A5A12",
        ivory: "#F7EEE1",
        "ivory-deep": "#EBD9BE",
        ink: "#24112F"
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
