import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meridian Health — Clinical Triage",
  description: "AI-assisted clinical triage and care coordination",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plexSans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}