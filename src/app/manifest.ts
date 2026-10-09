import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My40+ — Lakshmi's Celebration",
    short_name: "My40+",
    description: "Invitation and event companion for Lakshmi Srujana Gutta's 40th celebration.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7EEE1",
    theme_color: "#6A0DAD",
    orientation: "portrait-primary",
    categories: ["lifestyle", "social", "events"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
