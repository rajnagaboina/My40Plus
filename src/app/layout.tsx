import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/app-shell";
import { LanguageProvider } from "@/features/i18n/language-provider";
import { PwaClient } from "@/components/pwa/pwa-client";
import { PageTracker } from "@/features/analytics/page-tracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "My40+",
  description: "A celebration of forty wonderful years",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" }
};

export const viewport: Viewport = { themeColor: "#6A0DAD" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><LanguageProvider><PageTracker /><AppShell>{children}</AppShell><PwaClient /></LanguageProvider></body>
    </html>
  );
}
